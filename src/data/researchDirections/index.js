import higherLevelLm from "./higher-level-lm";
import latentPonder from "./latent-ponder";

export const researchDirectionPages = [
  higherLevelLm,
  latentPonder,
].reduce((pages, page) => {
  pages[page.tagId] = page;
  return pages;
}, {});

export function getResearchDirectionContent(tagId, language = "zh") {
  const page = researchDirectionPages[tagId];
  const content = (page && page.content) || {};
  return content[language] || content.zh || content.en || "";
}
