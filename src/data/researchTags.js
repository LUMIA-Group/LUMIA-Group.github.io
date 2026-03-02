export function normalizePaperTitle(title) {
  if (typeof title !== "string") {
    return "";
  }
  return title
    .toLowerCase()
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

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

const PAPER_TAG_TITLE_MAP = {
  "Fourier Transformer: Fast Long Range Modeling by Removing Sequence Redundancy with FFT Operator":
    ["trustworthy-ai"],
  "Text Classification In The Wild: A Large-Scale Long-Tailed Name Normalization Dataset":
    ["language-models"],
  "Ordered GNN: Ordering Message Passing to Deal with Heterophily and Over-smoothing":
    ["graph-learning"],
  "RASAT: Integrating Relational Structures into Pretrained Seq2Seq Model for Text-to-SQL":
    ["language-models"],
  "Syntax-guided Localized Self-attention by Constituency Syntactic Distance":
    ["language-models"],
  "Leveraging Unimodal Self-Supervised Learning for Multimodal Audio-Visual Speech Recognition":
    ["multimodal-learning"],
  "Block-Skim: Efficient Question Answering for Transformer": ["trustworthy-ai"],
  "Exploiting Syntactic Structure for Better Language Modeling: A Syntactic Distance Approach":
    ["language-models"],
  "Straight to the Tree: Constituency Parsing with Neural Syntactic Distance":
    ["language-models"],
  "Neural Language Modeling by Jointly Learning Syntax and Lexicon":
    ["language-models"],
  "A structured self-attentive Sentence Embedding": ["language-models"],
  "Neural networks with few multiplications": ["trustworthy-ai"],
  "Deep learning-based classification of hyperspectral data":
    ["multimodal-learning"],
};

export const PAPER_TAGS_BY_TITLE = Object.keys(PAPER_TAG_TITLE_MAP).reduce(
  (acc, title) => {
    acc[normalizePaperTitle(title)] = PAPER_TAG_TITLE_MAP[title];
    return acc;
  },
  {}
);

// Backward-compatible alias for legacy single-tag use.
export const PAPER_TAG_BY_TITLE = Object.keys(PAPER_TAGS_BY_TITLE).reduce(
  (acc, title) => {
    const tags = PAPER_TAGS_BY_TITLE[title];
    acc[title] = Array.isArray(tags) && tags.length ? tags[0] : "";
    return acc;
  },
  {}
);
