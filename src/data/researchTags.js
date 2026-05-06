export const RESEARCH_TAGS = [
  {
    id: "differentiable-memory",
    name: {
      zh: "可微记忆",
      en: "Differentiable Memory",
    },
    intro: {
      zh: "关注可微记忆结构、长期状态存储与可学习读写机制。",
      en: "Differentiable memory structures, long-term state storage, and learnable read-write mechanisms.",
    },
  },
  {
    id: "higher-level-lm",
    name: {
      zh: "概念级语言模型",
      en: "Concept-Level Language Models",
    },
    intro: {
      zh: "探索从 token 级预测走向概念、状态与更高层语义结构建模。",
      en: "Moving beyond token-level prediction toward concepts, states, and higher-level semantic structures.",
    },
  },
  {
    id: "latent-ponder",
    name: {
      zh: "隐思考机制",
      en: "Latent Pondering",
    },
    intro: {
      zh: "研究模型在隐空间中的推理、计划、反思与中间状态演化。",
      en: "Latent-space reasoning, planning, reflection, and intermediate state evolution.",
    },
  },
  {
    id: "gfn-rl",
    name: {
      zh: "生成流网络与强化学习",
      en: "Generative Flow Networks & Reinforcement Learning",
    },
    intro: {
      zh: "研究超越奖励最大化的大语言模型强化学习范式。",
      en: "Research on reinforcement learning paradigms for large language models beyond reward maximization.",
    },
  },
  {
    id: "efficient-lm",
    name: {
      zh: "高效化",
      en: "LLM Efficiency & Context Compression and Memory",
    },
    intro: {
      zh: "研究大模型的高效训练与推理，长文本的压缩记忆机制。",
      en: "Efficient training and inference of LLMs, as well as compression and memory mechanism of long contexts.",
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
];

const LEGACY_RESEARCH_TAG_IDS = {
  "language-models": "higher-level-lm",
  "multimodal-learning": "latent-ponder",
  "trustworthy-ai": "efficient-lm",
};

function normalizeResearchTagId(tagId) {
  const id = typeof tagId === "string" ? tagId.trim() : "";
  return LEGACY_RESEARCH_TAG_IDS[id] || id;
}

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
    .map((tagId) => normalizeResearchTagId(tagId))
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
