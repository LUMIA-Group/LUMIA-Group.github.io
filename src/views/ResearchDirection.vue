<template>
  <div class="direction-page">
    <section class="lumia-section direction-hero">
      <div class="lumia-container">
        <template v-if="direction">
          <p class="lumia-eyebrow lumia-fade-up" style="--delay: 80ms">
            {{ text.eyebrow }}
          </p>
          <h1 class="lumia-title lumia-fade-up" style="--delay: 120ms">
            {{ direction.name }}
          </h1>
          <p class="lumia-subtitle lumia-fade-up" style="--delay: 160ms">
            {{ direction.intro }}
          </p>
          <div class="direction-actions lumia-fade-up" style="--delay: 200ms">
            <button type="button" class="lumia-btn" @click="openDirectionPapers">
              {{ text.viewDirectionPapers }}
            </button>
            <button
              type="button"
              class="lumia-btn ghost"
              @click="openAllPublications"
            >
              {{ text.viewAllPublications }}
            </button>
          </div>
        </template>
        <template v-else>
          <p class="lumia-eyebrow">{{ text.eyebrow }}</p>
          <h1 class="lumia-title">{{ text.notFoundTitle }}</h1>
          <p class="lumia-subtitle">{{ text.notFoundDesc }}</p>
          <div class="direction-actions">
            <button type="button" class="lumia-btn" @click="openAllPublications">
              {{ text.viewAllPublications }}
            </button>
          </div>
        </template>
      </div>
    </section>

    <template v-if="direction">
      <section class="lumia-section direction-story">
        <div class="lumia-container">
          <article class="direction-article lumia-fade-up" style="--delay: 80ms">
            <div
              v-if="directionContent"
              class="direction-body"
              v-html="directionContent"
            ></div>
            <div v-else class="direction-body">
              <section>
                <h2>{{ text.placeholderTitle }}</h2>
                <p>{{ text.placeholderDesc }}</p>
              </section>
            </div>
          </article>
        </div>
      </section>

      <section class="lumia-section direction-publications">
        <div class="lumia-container">
          <div class="publications-header lumia-fade-up" style="--delay: 80ms">
            <div>
              <p class="lumia-eyebrow">{{ text.publicationsEyebrow }}</p>
              <h2>{{ text.publicationsTitle }}</h2>
            </div>
            <button type="button" class="lumia-btn ghost" @click="openDirectionPapers">
              {{ publicationCountText }}
            </button>
          </div>

          <div class="paper-grid">
            <article
              v-for="(paper, index) in directionPapers"
              :key="paper.id"
              class="paper-card lumia-fade-up"
              :style="{ '--delay': `${120 + index * 60}ms` }"
            >
              <p class="paper-venue">{{ paper.venue }}</p>
              <h3>{{ paper.title }}</h3>
              <p class="paper-authors">{{ paper.authors }}</p>
              <div class="paper-links">
                <a
                  v-for="link in getPaperLinks(paper)"
                  :key="`${paper.id}-${link.key}`"
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ link.label }}
                </a>
              </div>
              <button
                type="button"
                class="paper-list-link"
                @click="openPaperInList(paper.id)"
              >
                {{ text.openInPublicationList }}
              </button>
            </article>
          </div>

          <p v-if="!directionPapers.length" class="empty-state">
            {{ text.noDirectionPapers }}
          </p>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
import { publications } from "@/data/publications";
import { getResearchDirectionContent } from "@/data/researchDirections";
import {
  getLocalizedResearchTags,
  normalizeResearchTagIds,
} from "@/data/researchTags";
import { renderMathFormula } from "@/utils/mathRenderer";

const I18N = {
  en: {
    eyebrow: "Research Direction",
    viewDirectionPapers: "View Papers in This Direction",
    viewAllPublications: "All Publications",
    publicationsEyebrow: "Publications",
    publicationsTitle: "Representative Papers",
    openInPublicationList: "Open in publication list",
    placeholderTitle: "Direction page in progress",
    placeholderDesc:
      "This direction page is being organized. It will later collect the overview, representative papers, projects, and resources for this research direction.",
    noDirectionPapers: "No papers have been tagged for this direction yet.",
    papersSuffix: "papers",
    notFoundTitle: "Direction Not Found",
    notFoundDesc:
      "The requested research direction does not exist. Return to the publication list to browse available work.",
  },
  zh: {
    eyebrow: "研究方向",
    viewDirectionPapers: "查看该方向论文",
    viewAllPublications: "全部论文",
    publicationsEyebrow: "论文成果",
    publicationsTitle: "代表论文",
    openInPublicationList: "在完整论文列表中查看",
    placeholderTitle: "方向主页正在整理中",
    placeholderDesc:
      "该方向主页内容正在整理中，后续会在这里展示方向概览、代表论文、项目与相关资源。",
    noDirectionPapers: "该方向暂未关联论文。",
    papersSuffix: "篇论文",
    notFoundTitle: "未找到研究方向",
    notFoundDesc: "当前研究方向不存在。你可以返回完整论文列表浏览已有成果。",
  },
};

const PAPER_LINK_FIELDS = [
  { key: "pdf", label: "PDF" },
  { key: "github", label: "GitHub" },
  { key: "huggingface", label: "Hugging Face" },
  { key: "homepage", label: "Project Page" },
];

export default {
  name: "ResearchDirection",
  data() {
    return {
      currentLanguage: "zh",
    };
  },
  computed: {
    text() {
      return I18N[this.currentLanguage] || I18N.zh;
    },
    tagId() {
      return typeof this.$route.params.tagId === "string"
        ? this.$route.params.tagId
        : "";
    },
    localizedTags() {
      return getLocalizedResearchTags(this.currentLanguage);
    },
    direction() {
      return this.localizedTags.find((tag) => tag.id === this.tagId) || null;
    },
    directionContent() {
      if (!this.direction) {
        return "";
      }
      return getResearchDirectionContent(this.tagId, this.currentLanguage);
    },
    directionPapers() {
      if (!this.direction) {
        return [];
      }
      return publications
        .map((paper) => ({
          ...paper,
          tagIds: normalizeResearchTagIds(paper.tagIds),
        }))
        .filter((paper) => paper.tagIds.includes(this.tagId));
    },
    publicationCountText() {
      if (this.currentLanguage === "en") {
        return `${this.directionPapers.length} ${this.text.papersSuffix}`;
      }
      return `${this.directionPapers.length}${this.text.papersSuffix}`;
    },
  },
  watch: {
    directionContent: {
      immediate: true,
      handler() {
        this.$nextTick(this.renderDirectionMath);
      },
    },
  },
  mounted() {
    this.initLanguage();
    window.addEventListener("lumia-language-change", this.onLanguageChange);
    this.$nextTick(this.renderDirectionMath);
  },
  beforeDestroy() {
    window.removeEventListener("lumia-language-change", this.onLanguageChange);
  },
  methods: {
    initLanguage() {
      const saved = localStorage.getItem("lumia_lang");
      if (saved === "en" || saved === "zh") {
        this.currentLanguage = saved;
      }
    },
    onLanguageChange(event) {
      if (
        event &&
        event.detail &&
        (event.detail === "en" || event.detail === "zh")
      ) {
        this.currentLanguage = event.detail;
      }
    },
    getPaperLinks(paper) {
      return PAPER_LINK_FIELDS.map((field) => ({
        ...field,
        href:
          typeof paper[field.key] === "string" ? paper[field.key].trim() : "",
      })).filter((link) => link.href);
    },
    openAllPublications() {
      this.$router.push({ name: "research" }).catch(() => {});
    },
    openDirectionPapers() {
      this.$router
        .push({
          name: "research",
          query: { tag: this.tagId },
        })
        .catch(() => {});
    },
    openPaperInList(paperId) {
      this.$router
        .push({
          name: "research",
          query: { tag: this.tagId, paper: paperId },
        })
        .catch(() => {});
    },
    renderDirectionMath() {
      if (!this.$el) {
        return;
      }
      const mathNodes = this.$el.querySelectorAll(
        ".direction-body .math-render[data-formula]"
      );
      mathNodes.forEach((node) => {
        const formula = node.getAttribute("data-formula") || "";
        node.innerHTML = renderMathFormula(formula);
        node.setAttribute("aria-label", formula);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.direction-hero {
  padding-top: 76px;
  border-bottom: 1px solid var(--lumia-border);

  .lumia-subtitle {
    max-width: 920px;
    white-space: normal;
  }
}

.direction-actions {
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.direction-story {
  padding-top: 46px;
}

.direction-article {
  width: 100%;
  max-width: none;
  box-sizing: border-box;
  padding: 34px;
  border: 1px solid rgba(102, 46, 125, 0.18);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.82);

  :deep(.direction-body) {
    display: grid;
    gap: 18px;
  }

  :deep(.direction-body section) {
    margin: 0;
  }

  :deep(.direction-body .concept-blog) {
    display: block;
    max-width: none;
    margin: 0;
  }

  :deep(.direction-body .concept-blog-header) {
    margin-bottom: 0;
    padding-bottom: 32px;
    border-bottom: 1px solid rgba(102, 46, 125, 0.14);
  }

  :deep(.direction-body .concept-meta) {
    margin: 0 0 12px;
    color: var(--lumia-primary);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  :deep(.direction-body .concept-blog-header h1) {
    margin: 0;
    font-family: var(--lumia-heading-font);
    font-size: 48px;
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: 0;
  }

  :deep(.direction-body .concept-blog-header .lead) {
    max-width: none;
    margin: 22px 0 0;
    color: rgba(102, 46, 125, 0.84);
    font-size: 20px;
    line-height: 1.72;
  }

  :deep(.direction-body .concept-blog section) {
    padding: 38px 0;
    border-bottom: 1px solid rgba(102, 46, 125, 0.12);
  }

  :deep(.direction-body h2),
  :deep(.direction-body h3) {
    margin: 0 0 14px;
    font-family: var(--lumia-heading-font);
    font-size: 26px;
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: 0;
  }

  :deep(.direction-body p) {
    max-width: none;
    margin: 0 0 14px;
    font-size: 17px;
    line-height: 1.7;
  }

  :deep(.direction-body strong) {
    color: var(--lumia-primary-strong);
    font-weight: 700;
  }

  :deep(.direction-body ul) {
    margin: 0;
    padding-left: 20px;
    display: grid;
    gap: 8px;
  }

  :deep(.direction-body li) {
    font-size: 16px;
    line-height: 1.65;
  }

  :deep(.direction-body figure) {
    margin: 24px 0;
    padding: 20px;
    border: 1px solid rgba(102, 46, 125, 0.14);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.7);
  }

  :deep(.direction-body figcaption) {
    margin-top: 12px;
    color: rgba(102, 46, 125, 0.68);
    font-size: 14px;
    line-height: 1.6;
  }

  :deep(.direction-body .table-wrap) {
    width: 100%;
    margin: 24px 0;
    overflow-x: auto;
  }

  :deep(.direction-body table) {
    width: 100%;
    min-width: 760px;
    border-collapse: collapse;
    border: 1px solid rgba(102, 46, 125, 0.16);
    border-radius: 14px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.76);
    font-size: 15px;
    line-height: 1.58;
  }

  :deep(.direction-body th),
  :deep(.direction-body td) {
    padding: 13px 14px;
    border-bottom: 1px solid rgba(102, 46, 125, 0.12);
    text-align: left;
    vertical-align: top;
  }

  :deep(.direction-body th) {
    background: rgba(102, 46, 125, 0.08);
    color: var(--lumia-primary-strong);
    font-weight: 700;
  }

  :deep(.direction-body tr:last-child td) {
    border-bottom: 0;
  }

  :deep(.direction-body .flow) {
    display: grid;
    gap: 14px;
  }

  :deep(.direction-body .row) {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  :deep(.direction-body .label) {
    flex: 0 0 130px;
    color: rgba(102, 46, 125, 0.68);
    font-size: 14px;
    font-weight: 700;
  }

  :deep(.direction-body .pill) {
    display: inline-flex;
    align-items: center;
    min-height: 34px;
    padding: 6px 10px;
    border: 1px solid rgba(102, 46, 125, 0.16);
    border-radius: 9px;
    background: rgba(244, 245, 241, 0.88);
    color: var(--lumia-primary);
    font-size: 14px;
    font-weight: 650;
    line-height: 1.35;
    white-space: nowrap;
  }

  :deep(.direction-body .pill.high) {
    border-color: rgba(102, 46, 125, 0.28);
    background: rgba(102, 46, 125, 0.08);
    color: var(--lumia-primary-strong);
  }

  :deep(.direction-body .var),
  :deep(.direction-body code) {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", monospace;
  }

  :deep(.direction-body .var) {
    font-size: 14px;
    font-weight: 700;
  }

  :deep(.direction-body .idx) {
    position: relative;
    top: 0.18em;
    margin-left: 1px;
    font-size: 0.72em;
    font-weight: 600;
  }

  :deep(.direction-body .arrow) {
    color: rgba(102, 46, 125, 0.5);
    font-weight: 700;
  }

  :deep(.direction-body .formula) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    margin: 24px 0;
  }

  :deep(.direction-body .formula-box) {
    padding: 16px;
    border: 1px solid rgba(102, 46, 125, 0.14);
    border-radius: 12px;
    background: rgba(244, 245, 241, 0.72);
    overflow-x: auto;
  }

  :deep(.direction-body .formula-title) {
    margin-bottom: 10px;
    color: rgba(102, 46, 125, 0.68);
    font-size: 13px;
    font-weight: 700;
  }

  :deep(.direction-body .math-render) {
    display: inline-flex;
    flex-wrap: nowrap;
    align-items: baseline;
    gap: 0 3px;
    color: var(--lumia-primary-strong);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", monospace;
    font-size: 16px;
    line-height: 1.8;
    white-space: nowrap;
  }

  :deep(.direction-body .math-render sub),
  :deep(.direction-body .math-render sup) {
    margin-left: -2px;
    margin-right: 1px;
    font-size: 0.72em;
    line-height: 1;
  }

  :deep(.direction-body .math-render sup) {
    align-self: flex-start;
  }

  :deep(.direction-body .math-op) {
    font-style: normal;
  }

  :deep(.direction-body .math-limit-op) {
    display: inline-grid;
    grid-template-rows: auto auto;
    justify-items: center;
    align-items: center;
    margin: 0 2px;
    vertical-align: middle;
    line-height: 1;
    transform: translateY(0.05em);
  }

  :deep(.direction-body .math-limit-op.has-sup) {
    grid-template-rows: auto auto auto;
  }

  :deep(.direction-body .math-limit-core) {
    display: block;
    line-height: 1;
  }

  :deep(.direction-body .math-symbol-op .math-limit-core) {
    font-size: 1.46em;
    font-weight: 600;
  }

  :deep(.direction-body .math-word-op .math-limit-core) {
    font-size: 0.95em;
    font-weight: 700;
  }

  :deep(.direction-body .math-limit) {
    display: block;
    font-size: 0.64em;
    font-weight: 650;
    line-height: 1;
  }

  :deep(.direction-body .math-limit-top) {
    margin-bottom: 1px;
  }

  :deep(.direction-body .math-limit-bottom) {
    margin-top: 1px;
  }

  :deep(.direction-body code) {
    color: var(--lumia-primary-strong);
    font-size: 15px;
  }

  :deep(.direction-body .quote) {
    margin: 22px 0 0;
    padding: 18px 20px;
    border-left: 4px solid rgba(102, 46, 125, 0.7);
    border-radius: 0 12px 12px 0;
    background: rgba(102, 46, 125, 0.06);
  }

  :deep(.direction-body .quote p) {
    margin: 0;
    color: var(--lumia-primary-strong);
  }

  :deep(.direction-body .end) {
    padding-bottom: 0;
    border-bottom: 0;
  }

  :deep(.direction-body a) {
    color: var(--lumia-primary);
    font-weight: 700;
    text-decoration: underline;
    text-decoration-color: rgba(102, 46, 125, 0.28);
    text-underline-offset: 0.24em;
    transition: text-decoration-color 0.2s ease;

    &:hover {
      text-decoration-color: var(--lumia-primary);
    }
  }
}

.direction-publications {
  padding-top: 46px;
  border-top: 1px solid var(--lumia-border);
}

.publications-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 26px;

  h2 {
    margin: 10px 0 0;
    font-family: var(--lumia-heading-font);
    font-size: clamp(28px, 3.2vw, 46px);
    line-height: 1.12;
  }
}

.paper-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.paper-card {
  min-height: 100%;
  padding: 22px;
  border: 1px solid rgba(102, 46, 125, 0.18);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.86);

  .paper-venue {
    margin: 0 0 12px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.72;
  }

  h3 {
    margin: 0;
    font-family: var(--lumia-heading-font);
    font-size: clamp(21px, 2vw, 28px);
    line-height: 1.2;
  }

  .paper-authors {
    margin: 12px 0 0;
    font-size: 14px;
    line-height: 1.58;
    opacity: 0.86;
  }
}

.paper-links {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  a {
    color: var(--lumia-primary);
    font-size: 13px;
    font-weight: 700;
    text-decoration: underline;
    text-decoration-color: rgba(102, 46, 125, 0.28);
    text-underline-offset: 0.24em;

    &:hover,
    &:focus-visible {
      text-decoration-color: var(--lumia-primary);
    }
  }
}

.paper-list-link {
  margin-top: 18px;
  border: none;
  background: transparent;
  padding: 0;
  color: var(--lumia-primary);
  font-size: 14px;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 0.24em;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    outline: none;
    text-decoration-color: var(--lumia-primary);
  }
}

.empty-state {
  margin-top: 12px;
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px dashed rgba(102, 46, 125, 0.28);
  background: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  opacity: 0.82;
}

@media (max-width: 999px) {
  .paper-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 649px) {
  .direction-article {
    padding: 24px;

    :deep(.direction-body .concept-blog-header) {
      padding-bottom: 24px;
    }

    :deep(.direction-body .concept-blog-header h1) {
      font-size: 34px;
    }

    :deep(.direction-body .concept-blog-header .lead) {
      font-size: 18px;
    }

    :deep(.direction-body .concept-blog section) {
      padding: 30px 0;
    }

    :deep(.direction-body h2),
    :deep(.direction-body h3) {
      font-size: 22px;
    }

    :deep(.direction-body p) {
      font-size: 16px;
    }

    :deep(.direction-body figure) {
      padding: 16px;
    }

    :deep(.direction-body table) {
      min-width: 680px;
      font-size: 14px;
    }

    :deep(.direction-body .label) {
      flex-basis: 100%;
    }

    :deep(.direction-body .pill) {
      white-space: normal;
    }

    :deep(.direction-body .formula) {
      grid-template-columns: 1fr;
    }
  }

  .publications-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
