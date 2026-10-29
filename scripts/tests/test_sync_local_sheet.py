import contextlib
import importlib.util
import io
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import xml.etree.ElementTree as ET
from zipfile import ZipFile


SCRIPT = Path(__file__).resolve().parents[1] / "sync-local-sheet.py"
SPEC = importlib.util.spec_from_file_location("sync_local_sheet", SCRIPT)
sync = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(sync)


class PeopleOnlySyncTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name)
        self.workbook = self.root / "people.xlsx"
        paths = patch.multiple(sync, ROOT=self.root, WORKBOOK=self.workbook)
        paths.start()
        self.addCleanup(paths.stop)
        self.manual_files = {
            "src/data/publications.js": b"manual publication entries",
            "src/data/siteText.js": b"manual site text",
            "src/assets/research/memsft.png": b"manual publication figure",
        }
        for name, content in self.manual_files.items():
            path = self.root / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(content)

    def write_workbook(self, names):
        main_ns = sync.NS["m"]
        book = ET.Element(f"{{{main_ns}}}workbook")
        sheets = ET.SubElement(book, f"{{{main_ns}}}sheets")
        relationships = ET.Element(f"{{{sync.NS['rel']}}}Relationships")
        with ZipFile(self.workbook, "w") as archive:
            for index, name in enumerate(names, 1):
                rel_id = f"rId{index}"
                target = f"worksheets/sheet{index}.xml"
                ET.SubElement(
                    sheets,
                    f"{{{main_ns}}}sheet",
                    {"name": name, "sheetId": str(index), f"{{{sync.NS['r']}}}id": rel_id},
                )
                ET.SubElement(
                    relationships,
                    f"{{{sync.NS['rel']}}}Relationship",
                    {"Id": rel_id, "Target": target},
                )
                content = b"unrelated sheets must not be parsed"
                if name == "成员页面":
                    sheet = ET.Element(f"{{{main_ns}}}worksheet")
                    data = ET.SubElement(sheet, f"{{{main_ns}}}sheetData")
                    rows = [
                        {"A": "请在下方添加成员数据"},
                        {
                            "A": "101",
                            "B": "Test Member",
                            "C": "Faculty/Alumni",
                            "E": "Machine Learning",
                            "F": "example.com/member",
                        },
                    ]
                    for row_number, values in enumerate(rows, 1):
                        row = ET.SubElement(data, f"{{{main_ns}}}row", {"r": str(row_number)})
                        for column, value in values.items():
                            cell = ET.SubElement(
                                row,
                                f"{{{main_ns}}}c",
                                {"r": f"{column}{row_number}", "t": "inlineStr"},
                            )
                            inline = ET.SubElement(cell, f"{{{main_ns}}}is")
                            ET.SubElement(inline, f"{{{main_ns}}}t").text = value
                    content = ET.tostring(sheet)
                archive.writestr(f"xl/{target}", content)
            archive.writestr("xl/workbook.xml", ET.tostring(book))
            archive.writestr("xl/_rels/workbook.xml.rels", ET.tostring(relationships))

    def assert_manual_files_unchanged(self):
        for name, content in self.manual_files.items():
            self.assertEqual((self.root / name).read_bytes(), content, name)

    def run_sync(self):
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            sync.main()
        return output.getvalue()

    def test_only_people_sheet_is_required_and_manual_content_is_preserved(self):
        self.write_workbook(["成员页面"])
        photo = self.root / "public/static/people/101.png"
        photo.parent.mkdir(parents=True)
        photo.write_bytes(b"existing avatar")
        self.assertIn("Synced 1 people", self.run_sync())
        generated = (self.root / "src/data/people.js").read_text(encoding="utf-8")
        people = json.loads(generated.split("export const peopleData = ", 1)[1].strip()[:-1])
        member = people["Faculty"][0]
        self.assertEqual(member["sections"], ["Faculty", "Alumni"])
        self.assertEqual(member["homepage"], "https://example.com/member")
        self.assertEqual(member["pic"], "./static/people/101.png")
        self.assertEqual(photo.read_bytes(), b"existing avatar")
        self.assert_manual_files_unchanged()

    def test_unrelated_sheets_are_not_read(self):
        self.write_workbook(["研究和论文", "成员页面", "网页主要文本"])
        self.run_sync()
        self.assert_manual_files_unchanged()

    def test_missing_people_sheet_fails_without_writing(self):
        self.write_workbook(["研究和论文"])
        with self.assertRaisesRegex(SystemExit, "Missing sheet.*成员页面"):
            self.run_sync()
        self.assertFalse((self.root / "src/data/people.js").exists())
        self.assert_manual_files_unchanged()

    def test_missing_workbook_fails_without_writing(self):
        with self.assertRaisesRegex(SystemExit, "Workbook not found"):
            self.run_sync()
        self.assertFalse((self.root / "src/data/people.js").exists())
        self.assert_manual_files_unchanged()

    def test_member_image_import_is_preserved(self):
        image = b"\x89PNG\r\n\x1a\nmember image"
        sheet = {
            "rows": {5: {"values": {0: "101", 1: "Test Member", 2: "Faculty"}}},
            "images": [{"row": 5, "col": 4, "media": "xl/media/avatar.png"}],
        }
        with ZipFile(io.BytesIO(), "w") as archive:
            archive.writestr("xl/media/avatar.png", image)
            people = sync.build_people(archive, sheet)
        self.assertEqual(people["Faculty"][0]["pic"], "./static/people/101.png")
        self.assertEqual((self.root / "public/static/people/101.png").read_bytes(), image)
        self.assert_manual_files_unchanged()


if __name__ == "__main__":
    unittest.main()
