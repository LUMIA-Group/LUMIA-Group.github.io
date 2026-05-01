export const RESEARCH_TAGS = [
  {
    id: "language-models",
    name: {
      zh: "语言建模与基础模型",
      en: "Language & Foundation Models",
    },
    intro: {
      zh: "关注语言建模、结构化语义表示与基础模型能力提升。",
      en: "Language modeling, structured representations, and foundation model capability.",
    },
  },
  {
    id: "multimodal-learning",
    name: {
      zh: "多模态学习",
      en: "Multimodal Learning",
    },
    intro: {
      zh: "聚焦文本、语音、视觉等信号的跨模态理解与融合。",
      en: "Cross-modal understanding and fusion across text, speech, and vision.",
    },
  },
  {
    id: "graph-learning",
    name: {
      zh: "图学习与结构化推理",
      en: "Graph Learning & Structured Reasoning",
    },
    intro: {
      zh: "研究图神经网络、关系建模与结构化消息传递。",
      en: "Graph neural networks, relational modeling, and structured message passing.",
    },
  },
  {
    id: "trustworthy-ai",
    name: {
      zh: "可信与高效 AI",
      en: "Trustworthy & Efficient AI",
    },
    intro: {
      zh: "覆盖高效推理、压缩优化、鲁棒性与可解释性。",
      en: "Efficient inference, model optimization, robustness, and interpretability.",
    },
  },
];

export function getLocalizedResearchTags(language = "zh") {
  const lang = language === "en" ? "en" : "zh";
  return RESEARCH_TAGS.map((tag) => ({
    ...tag,
    name: tag.name[lang] || tag.name.zh,
    intro: tag.intro[lang] || tag.intro.zh,
  }));
}

export function getResearchTagById(tagId) {
  return RESEARCH_TAGS.find((tag) => tag.id === tagId) || null;
}

export function isResearchTagId(tagId) {
  return Boolean(getResearchTagById(tagId));
}

export function normalizeResearchTagIds(tagIds) {
  const list = Array.isArray(tagIds) ? tagIds : [];
  const seen = new Set();
  return list
    .map((tagId) => (typeof tagId === "string" ? tagId.trim() : ""))
    .filter((tagId) => tagId && isResearchTagId(tagId))
    .filter((tagId) => {
      if (seen.has(tagId)) {
        return false;
      }
      seen.add(tagId);
      return true;
    });
}

export function getResearchTagSearchText(tagIds) {
  return normalizeResearchTagIds(tagIds)
    .map((tagId) => {
      const tag = getResearchTagById(tagId);
      if (!tag) {
        return "";
      }
      return [tag.id, tag.name.zh, tag.name.en, tag.intro.zh, tag.intro.en]
        .filter(Boolean)
        .join(" ");
    })
    .join(" ");
}
