export const DEFAULT_THEME_ID = "plum";

export const themePresets = [
  {
    id: "plum",
    name: "LUMIA 紫",
    primary: "#662e7d",
    primaryStrong: "#4f1d63",
    text: "#662e7d",
    ink: "#271f2c",
    bg: "#f4f5f1",
    border: "#ceb3d3",
    muted: "#e6d9e9",
  },
  {
    id: "indigo",
    name: "深蓝",
    primary: "#2857a6",
    primaryStrong: "#18396f",
    text: "#274e83",
    ink: "#202733",
    bg: "#f4f7fb",
    border: "#b9c7df",
    muted: "#dce6f4",
  },
  {
    id: "teal",
    name: "青绿",
    primary: "#14766f",
    primaryStrong: "#0b514c",
    text: "#185f59",
    ink: "#1e2c2a",
    bg: "#f3f7f4",
    border: "#adcfc9",
    muted: "#d9ebe8",
  },
  {
    id: "brick",
    name: "暖红",
    primary: "#9c3f31",
    primaryStrong: "#6d281f",
    text: "#78362d",
    ink: "#302421",
    bg: "#f7f4ef",
    border: "#d8bab3",
    muted: "#eadbd7",
  },
  {
    id: "slate",
    name: "石墨",
    primary: "#4a5360",
    primaryStrong: "#303843",
    text: "#424c59",
    ink: "#222831",
    bg: "#f4f5f4",
    border: "#bec6cf",
    muted: "#dfe4e8",
  },
];

export function getThemePresetById(themeId) {
  return themePresets.find((theme) => theme.id === themeId) || null;
}
