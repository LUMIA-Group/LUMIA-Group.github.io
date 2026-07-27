const LOGO_BASE = "brand-assets/logos";
const TEMPLATE_BASE = "brand-assets/ppt-templates";

function makeLogoFiles(baseName, sizes) {
  return [
    {
      format: "SVG",
      path: `${LOGO_BASE}/${baseName}.svg`,
      bytes: sizes.svg,
      downloadName: `${baseName}.svg`,
    },
    {
      format: "PNG",
      path: `${LOGO_BASE}/${baseName}.png`,
      bytes: sizes.png,
      downloadName: `${baseName}.png`,
    },
    {
      format: "JPG",
      path: `${LOGO_BASE}/${baseName}.jpg`,
      bytes: sizes.jpg,
      downloadName: `${baseName}.jpg`,
    },
  ];
}

export const brandBundleAsset = {
  name: {
    zh: "完整视觉资产包",
    en: "Complete Visual Asset Pack",
  },
  description: {
    zh: "包含当前页面里的 Logo 源文件、图片版本和 PPT 模板。",
    en: "Includes the logo source files, image exports, and presentation templates on this page.",
  },
  format: "ZIP",
  bytes: 21133429,
  path: "brand-assets/lumia-brand-assets.zip",
  downloadName: "lumia-brand-assets.zip",
};

export const brandColorPalette = [
  {
    name: "LUMIA Blue",
    value: "#1e71f2",
  },
  {
    name: "LUMIA Red",
    value: "#e93c2c",
  },
  {
    name: "LUMIA Purple",
    value: "#5a39a9",
  },
  {
    name: "LUMIA Yellow",
    value: "#feb901",
  },
  {
    name: "LUMIA Green",
    value: "#29a44d",
  },
];

export const brandLogoAssets = [
  {
    id: "lumia-color",
    title: {
      zh: "彩色完整标识",
      en: "Full Color Mark",
    },
    summary: {
      zh: "适合浅色背景和常规展示场景。",
      en: "For light backgrounds and general presentation use.",
    },
    preview: `${LOGO_BASE}/lumia-color-01.svg`,
    previewTone: "light",
    previewShape: "square",
    files: makeLogoFiles("lumia-color-01", {
      svg: 5202,
      png: 178549,
      jpg: 770320,
    }),
  },
  {
    id: "lumia-white",
    title: {
      zh: "白色完整标识",
      en: "Full White Mark",
    },
    summary: {
      zh: "适合深色、摄影或高对比背景。",
      en: "For dark, photographic, or high-contrast backgrounds.",
    },
    preview: `${LOGO_BASE}/lumia-white-01.svg`,
    previewTone: "dark",
    previewShape: "square",
    files: makeLogoFiles("lumia-white-01", {
      svg: 5090,
      png: 155394,
      jpg: 490256,
    }),
  },
  {
    id: "lumia-black",
    title: {
      zh: "黑色完整标识",
      en: "Full Black Mark",
    },
    summary: {
      zh: "适合黑白打印、文档页脚和低彩度场景。",
      en: "For monochrome documents, print, and low-color layouts.",
    },
    preview: `${LOGO_BASE}/lumia-black-01.svg`,
    previewTone: "light",
    previewShape: "square",
    files: makeLogoFiles("lumia-black-01", {
      svg: 4705,
      png: 167666,
      jpg: 496550,
    }),
  },
  {
    id: "lumia-icon",
    title: {
      zh: "单图标",
      en: "Symbol",
    },
    summary: {
      zh: "适合头像、图标、favicon 和紧凑空间。",
      en: "For avatars, icons, favicons, and compact surfaces.",
    },
    preview: `${LOGO_BASE}/lumia-icon-01.svg`,
    previewTone: "light",
    previewShape: "symbol",
    files: makeLogoFiles("lumia-icon-01", {
      svg: 4475,
      png: 193152,
      jpg: 822864,
    }),
  },
  {
    id: "lumia-wordmark",
    title: {
      zh: "纯字标",
      en: "Wordmark",
    },
    summary: {
      zh: "适合页眉、封面标题和只需要文字识别的场景。",
      en: "For headers, cover titles, and wordmark-only placements.",
    },
    preview: `${LOGO_BASE}/lumia-wordmark-01.svg`,
    previewTone: "light",
    previewShape: "wide",
    files: makeLogoFiles("lumia-wordmark-01", {
      svg: 1340,
      png: 45950,
      jpg: 82242,
    }),
  },
  {
    id: "lumia-horizontal-01",
    title: {
      zh: "横版彩色 01",
      en: "Horizontal Color 01",
    },
    summary: {
      zh: "适合网页页眉、报告封面和长条空间。",
      en: "For website headers, report covers, and wide placements.",
    },
    preview: `${LOGO_BASE}/lumia-horizontal-color-01.svg`,
    previewTone: "light",
    previewShape: "wide",
    files: makeLogoFiles("lumia-horizontal-color-01", {
      svg: 5113,
      png: 138893,
      jpg: 566629,
    }),
  },
  {
    id: "lumia-horizontal-02",
    title: {
      zh: "横版彩色 02",
      en: "Horizontal Color 02",
    },
    summary: {
      zh: "包含英文副标题，适合正式对外材料。",
      en: "Includes the English descriptor for external-facing materials.",
    },
    preview: `${LOGO_BASE}/lumia-horizontal-color-02.svg`,
    previewTone: "light",
    previewShape: "wide",
    files: makeLogoFiles("lumia-horizontal-color-02", {
      svg: 34168,
      png: 104754,
      jpg: 189158,
    }),
  },
];

export const brandTemplateAssets = [
  {
    id: "lumia-stream",
    name: {
      zh: "LUMIA Stream 模板",
      en: "LUMIA Stream Template",
    },
    summary: {
      zh: "轻量、流线型汇报模板。",
      en: "A lightweight presentation template with a flowing visual rhythm.",
    },
    path: `${TEMPLATE_BASE}/lumia-stream-template.pptx`,
    bytes: 695906,
    downloadName: "lumia-stream-template.pptx",
  },
  {
    id: "lumia-deep",
    name: {
      zh: "LUMIA Deep 模板",
      en: "LUMIA Deep Template",
    },
    summary: {
      zh: "适合深色风格的研究汇报。",
      en: "A deep-tone template for research presentations.",
    },
    path: `${TEMPLATE_BASE}/lumia-deep-template.pptx`,
    bytes: 738684,
    downloadName: "lumia-deep-template.pptx",
  },
  {
    id: "lumia-research",
    name: {
      zh: "LUMIA Research 模板",
      en: "LUMIA Research Template",
    },
    summary: {
      zh: "适合论文分享、项目进展与组会汇报。",
      en: "For paper talks, project updates, and lab meetings.",
    },
    path: `${TEMPLATE_BASE}/lumia-research-template.pptx`,
    bytes: 194416,
    downloadName: "lumia-research-template.pptx",
  },
  {
    id: "lumia-white",
    name: {
      zh: "LUMIA White 模板",
      en: "LUMIA White Template",
    },
    summary: {
      zh: "适合浅色背景与正式汇报。",
      en: "A light-background template for formal presentations.",
    },
    path: `${TEMPLATE_BASE}/lumia-white-template.pptx`,
    bytes: 197555,
    downloadName: "lumia-white-template.pptx",
  },
  {
    id: "lumia-aurora",
    name: {
      zh: "LUMIA Aurora 模板",
      en: "LUMIA Aurora Template",
    },
    summary: {
      zh: "视觉表现更强的封面与展示模板。",
      en: "A more expressive template for visual-first decks.",
    },
    path: `${TEMPLATE_BASE}/lumia-aurora-template.pptx`,
    bytes: 7046745,
    downloadName: "lumia-aurora-template.pptx",
  },
  {
    id: "lumia-ppt-design",
    name: {
      zh: "PPT 设计推荐",
      en: "PPT Design Recommendations",
    },
    summary: {
      zh: "实验室 PPT 视觉风格参考。",
      en: "A reference deck for LUMIA presentation visual style.",
    },
    path: `${TEMPLATE_BASE}/lumia-ppt-design-recommendations.pptx`,
    bytes: 9259570,
    downloadName: "lumia-ppt-design-recommendations.pptx",
  },
];
