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
            <button type="button" class="lumia-btn" @click="scrollToDirectionPapers">
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

      <section
        id="direction-publications"
        ref="directionPublications"
        class="lumia-section direction-publications"
      >
        <div class="lumia-container">
          <div class="publications-header lumia-fade-up" style="--delay: 80ms">
            <div>
              <p class="lumia-eyebrow">{{ text.publicationsEyebrow }}</p>
              <h2>{{ text.publicationsTitle }}</h2>
            </div>
            <button
              type="button"
              class="lumia-btn ghost"
              @click="openDirectionPublicationList"
            >
              {{ text.viewInPublicationList }}
            </button>
          </div>

          <section class="research-section">
            <div
              v-for="(paper, index) in directionPapers"
              :key="paper.id"
              class="row lumia-fade-up"
              :style="{ '--delay': `${120 + index * 60}ms` }"
              :class="{ 'has-image': paper.image }"
              :data-paper-id="paper.id"
            >
              <div v-if="paper.image" class="paper-image-col col-xs-12 col-sm-4">
                <img :src="paper.image" :alt="paper.title" loading="lazy" />
              </div>
              <div class="paper-copy col-xs-12 col-sm-8">
                <h4>{{ paper.title }}</h4>
                <p class="author">{{ paper.authors }}</p>
                <div class="link-list">
                  <span>{{ paper.venue }}</span>
                  <template v-for="link in getPaperLinks(paper)">
                    <span :key="`${paper.id}-${link.key}-separator`"> | </span>
                    <a
                      :key="`${paper.id}-${link.key}`"
                      :href="link.href"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{{ link.label }}</span>
                    </a>
                  </template>
                </div>
                <div
                  v-if="paper.tagIds.length"
                  class="paper-tag-list detail-tag-row"
                >
                  <button
                    v-for="tagId in paper.tagIds"
                    :key="`${paper.id}-${tagId}`"
                    type="button"
                    class="paper-tag-chip"
                    @click="openTagDirection(tagId)"
                  >
                    {{ getTagLabel(tagId) }}
                  </button>
                </div>
                <article v-if="paper.abstract">{{ paper.abstract }}</article>
              </div>
            </div>
          </section>

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
    viewInPublicationList: "View in Full Publication List",
    placeholderTitle: "Direction page in progress",
    placeholderDesc:
      "This direction page is being organized. It will later collect the overview, representative papers, projects, and resources for this research direction.",
    noDirectionPapers: "No papers have been tagged for this direction yet.",
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
    viewInPublicationList: "在完整论文列表中查看",
    placeholderTitle: "方向主页正在整理中",
    placeholderDesc:
      "该方向主页内容正在整理中，后续会在这里展示方向概览、代表论文、项目与相关资源。",
    noDirectionPapers: "该方向暂未关联论文。",
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
    tagNameById() {
      return this.localizedTags.reduce((acc, tag) => {
        acc[tag.id] = tag.name;
        return acc;
      }, {});
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
          authors: paper.authors || "",
          abstract: paper.abstract || "",
          tagIds: normalizeResearchTagIds(paper.tagIds),
        }))
        .filter((paper) => paper.tagIds.includes(this.tagId));
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
    getTagLabel(tagId) {
      return this.tagNameById[tagId] || tagId;
    },
    openAllPublications() {
      this.$router.push({ name: "research" }).catch(() => {});
    },
    openDirectionPublicationList() {
      this.$router
        .push({
          name: "research",
          query: { tag: this.tagId },
        })
        .catch(() => {});
    },
    scrollToDirectionPapers() {
      const publicationsSection =
        this.$refs.directionPublications ||
        this.$el.querySelector("#direction-publications");
      if (!publicationsSection) {
        return;
      }
      publicationsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    openTagDirection(tagId) {
      this.$router
        .push({
          name: "research-direction",
          params: { tagId },
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
  padding-bottom: 52px;

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

  .lumia-btn {
    min-height: 46px;
    background: transparent;
    color: var(--lumia-primary);
    line-height: 1.2;
    cursor: pointer;
    transition: box-shadow 0.25s ease, background-color 0.25s ease,
      color 0.25s ease, border-color 0.25s ease;

    &:hover,
    &:focus,
    &:focus-visible {
      background: var(--lumia-primary);
      color: var(--lumia-white);
      border-color: var(--lumia-primary);
      box-shadow: 0 10px 26px rgba(102, 46, 125, 0.14);
      outline: none;
      transform: none;
    }
  }
}

.direction-story {
  padding-top: 32px;
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
    min-width: 0;
  }

  :deep(.direction-body section) {
    min-width: 0;
    margin: 0;
  }

  :deep(.direction-body .concept-blog) {
    display: block;
    width: 100%;
    min-width: 0;
    max-width: none;
    margin: 0;
  }

  :deep(.direction-body .concept-blog-header) {
    min-width: 0;
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
    overflow-wrap: break-word;
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
    overflow-wrap: break-word;
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
    overflow-wrap: break-word;
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
    min-width: 0;
    max-width: 100%;
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
  scroll-margin-top: 88px;
}

.publications-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 26px;

  .lumia-btn {
    min-height: 46px;
    background: transparent;
    color: var(--lumia-primary);
    line-height: 1.2;
    cursor: pointer;
    transition: box-shadow 0.25s ease, background-color 0.25s ease,
      color 0.25s ease, border-color 0.25s ease;

    &:hover,
    &:focus,
    &:focus-visible {
      background: var(--lumia-primary);
      color: var(--lumia-white);
      border-color: var(--lumia-primary);
      box-shadow: 0 10px 26px rgba(102, 46, 125, 0.14);
      outline: none;
      transform: none;
    }
  }

  h2 {
    margin: 10px 0 0;
    font-family: var(--lumia-heading-font);
    font-size: clamp(34px, 4vw, 46px);
    line-height: 1.12;
  }
}

.research-section {
  .row {
    margin-top: 0 !important;
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: minmax(220px, 320px) 1fr;
    gap: 22px;
    padding: 18px;
    border: 1px solid rgba(102, 46, 125, 0.18);
    border-radius: 22px;
    background: linear-gradient(160deg, #ffffff 0%, #fdf6ff 100%);

    &:nth-child(3n + 2) {
      background: linear-gradient(160deg, #ffffff 0%, #eef8fc 100%);
    }

    &:nth-child(3n + 3) {
      background: linear-gradient(160deg, #ffffff 0%, #fff7e8 100%);
    }

    &:not(.has-image) {
      grid-template-columns: 1fr;
    }
  }

  .paper-image-col {
    min-height: 0;
    max-height: 240px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.62);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      max-height: 240px;
      object-fit: contain;
      display: block;
    }
  }

  .paper-copy {
    width: 100%;
    padding-left: 0;
    box-sizing: border-box;
  }

  h4 {
    margin: 0 0 10px;
    font-family: var(--lumia-heading-font);
    font-size: clamp(23px, 2.4vw, 34px);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.02em;
  }

  .author {
    margin-bottom: 8px;
    font-size: 15px;
    line-height: 1.55;
    opacity: 0.92;
  }

  .link-list {
    margin-bottom: 10px;
    line-height: 1.4;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;

    > span:first-child {
      font-weight: 700;
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--lumia-primary);
      font-weight: 600;
      text-decoration: underline;
      text-decoration-color: transparent;
      text-underline-offset: 0.3em;
      transition: text-decoration-color 0.25s ease, opacity 0.25s ease;

      &::after {
        content: "↗";
        font-size: 12px;
        transform: translate(0, -1px);
        transition: transform 0.25s ease;
      }

      &:hover,
      &:focus-visible {
        outline: none;
        opacity: 0.75;
        text-decoration-color: currentColor;
      }

      &:hover::after,
      &:focus-visible::after {
        transform: translate(4px, -3px);
      }
    }
  }

  .paper-tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .detail-tag-row {
    margin-bottom: 10px;
  }

  .paper-tag-chip {
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    border: 1px solid rgba(102, 46, 125, 0.24);
    background: rgba(255, 255, 255, 0.82);
    padding: 4px 10px;
    color: var(--lumia-primary);
    font-size: 12px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease,
      transform 0.2s ease;
    appearance: none;
    -webkit-appearance: none;

    &:hover,
    &:focus-visible {
      border-color: var(--lumia-primary);
      background: var(--lumia-primary);
      color: #fff;
      outline: none;
      transform: translateY(-1px);
    }
  }

  article {
    font-size: 15px;
    line-height: 1.62;
    opacity: 0.95;
  }

  .col-sm-4 {
    width: 100%;

    img {
      width: 100%;
      height: 100%;
      min-height: 180px;
      border-radius: 16px;
      object-fit: cover;
      display: block;
    }
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
  .research-section {
    .row {
      grid-template-columns: 1fr;
    }

    h4 {
      font-size: 24px;
    }
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

  .research-section {
    .row {
      padding: 16px;
    }

    .paper-image-col,
    .paper-image-col img {
      max-height: 200px;
    }

    article,
    .author,
    .link-list {
      font-size: 14px;
    }

    .paper-tag-chip {
      font-size: 11px;
    }
  }
}
</style>
