import graphLearning from "./graph-learning";
import languageModels from "./language-models";
import multimodalLearning from "./multimodal-learning";
import trustworthyAi from "./trustworthy-ai";

export const researchDirectionPages = [
  languageModels,
  multimodalLearning,
  graphLearning,
  trustworthyAi,
].reduce((pages, page) => {
  pages[page.tagId] = page;
  return pages;
}, {});

export function getResearchDirectionContent(tagId, language = "zh") {
  const page = researchDirectionPages[tagId];
  const content = (page && page.content) || {};
  return content[language] || content.zh || content.en || "";
}
