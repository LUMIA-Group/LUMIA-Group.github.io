import higherLevelLm from "./higher-level-lm";
import latentPonder from "./latent-ponder";
import gfnRl from "./gfn-rl";
import graphLearning from "./graph-learning";

export const researchDirectionPages = [
  higherLevelLm,
  latentPonder,
  gfnRl,
  graphLearning,
].reduce((pages, page) => {
  pages[page.tagId] = page;
  return pages;
}, {});

export function getResearchDirectionContent(tagId, language = "zh") {
  const page = researchDirectionPages[tagId];
  const content = (page && page.content) || {};
  return content[language] || content.zh || content.en || "";
}
