<template>
  <div class="research-container">
    <section class="lumia-section research-hero">
      <div class="lumia-container">
        <p class="lumia-eyebrow lumia-fade-up" style="--delay: 80ms">
          {{ text.eyebrow }}
        </p>
        <h1 class="lumia-title lumia-fade-up" style="--delay: 120ms">
          {{ text.title }}
        </h1>
        <p class="lumia-subtitle lumia-fade-up" style="--delay: 160ms">
          {{ text.subtitle }}
        </p>
        <section class="research-guide lumia-fade-up" style="--delay: 200ms">
          <div class="guide-grid">
            <button
              v-for="(tag, index) in localizedTags"
              :key="tag.id"
              type="button"
              class="guide-card"
              :class="{ active: activeDirectionId === tag.id }"
              :aria-pressed="activeDirectionId === tag.id ? 'true' : 'false'"
              :style="{ '--delay': `${90 + index * 50}ms` }"
              @click="selectDirection(tag.id)"
            >
              <p class="guide-card-name">{{ tag.name }}</p>
            </button>
            <button
              v-if="activeDirectionId"
              type="button"
              class="guide-card"
              aria-pressed="false"
              @click="clearDirection"
            >
              <p class="guide-card-name">{{ text.allPublications }}</p>
            </button>
          </div>
        </section>
        <p
          v-if="activeDirection"
          class="direction-intro lumia-fade-up"
          style="--delay: 230ms"
        >
          {{ activeDirection.intro }}
        </p>
        <article
          v-if="activeDirectionContent"
          class="direction-placeholder lumia-fade-up"
          style="--delay: 260ms"
        >
          <div
            class="direction-body"
            v-html="activeDirectionContent"
          ></div>
        </article>
      </div>
    </section>

    <section class="lumia-section research-content">
      <div class="lumia-container">
        <section class="research-workspace">
          <section class="publication-browser">
            <div class="research-toolbar">
              <label class="search-box" for="paper-search">
                <input
                  id="paper-search"
                  v-model.trim="searchKeyword"
                  type="text"
                  :aria-label="text.searchLabel"
                  :placeholder="text.searchPlaceholder"
                />
              </label>
              <div
                class="view-switch"
                :class="{ 'is-compact': viewMode === 'compact' }"
                role="group"
                aria-label="paper view switch"
              >
                <span class="switch-indicator" aria-hidden="true"></span>
                <button
                  type="button"
                  class="switch-btn"
                  :class="{ active: viewMode === 'detailed' }"
                  @click="setViewMode('detailed')"
                >
                  {{ text.detailedView }}
                </button>
                <button
                  type="button"
                  class="switch-btn"
                  :class="{ active: viewMode === 'compact' }"
                  @click="setViewMode('compact')"
                >
                  {{ text.compactView }}
                </button>
              </div>
            </div>
            <p class="result-count">
              {{ resultCountText }}
            </p>

            <section
              id="publications"
              class="section-item"
              v-show="viewMode === 'detailed'"
            >
              <section class="research-section">
                <div
                  v-for="paper in filteredPapers"
                  :key="paper.id"
                  class="row"
                >
                  <div v-if="paper.image" class="paper-image-col col-xs-12 col-sm-4">
                    <img
                      :src="paper.image"
                      :alt="paper.title"
                      loading="lazy"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-8">
                    <h4 v-html="getHighlightedHtml(paper.title)"></h4>
                    <p class="author">{{ paper.authors }}</p>
                    <div class="link-list">
                      <span v-html="getHighlightedHtml(paper.venue)"></span>
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
                        @click="openTagFilter(tagId)"
                      >
                        <span v-html="getHighlightedHtml(getTagLabel(tagId))"></span>
                      </button>
                    </div>
                    <article v-html="getHighlightedHtml(paper.abstract)"></article>
                  </div>
                </div>
              </section>
              <p v-if="!filteredPapers.length" class="empty-state">
                {{ text.noResultsPrefix }} "{{ searchKeyword }}"{{
                  text.noResultsSuffix
                }}
              </p>
            </section>

        <section v-show="viewMode === 'compact'" class="compact-section">
          <article
            v-for="paper in filteredPapers"
            :key="paper.id"
            class="compact-item"
          >
            <h3 v-html="getHighlightedHtml(paper.title)"></h3>
            <p class="compact-author">{{ paper.authors }}</p>
            <div class="link-list compact-venue-row">
              <span v-html="getHighlightedHtml(paper.venue)"></span>
              <template v-for="link in getPaperLinks(paper)">
                <span :key="`${paper.id}-${link.key}-separator`">
                  |
                </span>
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
            <div v-if="paper.tagIds.length" class="paper-tag-list compact-tag-row">
              <button
                v-for="tagId in paper.tagIds"
                :key="`${paper.id}-${tagId}`"
                type="button"
                class="paper-tag-chip"
                @click="openTagFilter(tagId)"
              >
                <span v-html="getHighlightedHtml(getTagLabel(tagId))"></span>
              </button>
            </div>
          </article>
          <p v-if="!filteredPapers.length" class="empty-state">
            {{ text.noResultsPrefix }} "{{ searchKeyword }}"{{
              text.noResultsSuffix
            }}
          </p>
        </section>
          </section>
        </section>
      </div>
    </section>
  </div>
</template>
<script>
import { publications } from "@/data/publications";
import { getResearchDirectionContent } from "@/data/researchDirections";
import {
  getLocalizedResearchTags,
  getResearchTagSearchText,
  isResearchTagId,
  normalizeResearchTagIds,
} from "@/data/researchTags";

const I18N = {
  en: {
    eyebrow: "Publications",
    title: "Research",
    subtitle:
      "Selected papers across differentiable memory, concept-level language models, latent pondering, generative flow networks and reinforcement learning, LLM efficiency, and graph learning.",
    directionPlaceholder:
      "This direction page is being organized. It will later collect the overview, representative papers, projects, and resources for this research direction.",
    searchLabel: "Search",
    searchPlaceholder: "Search any keyword across papers...",
    detailedView: "Detailed View",
    compactView: "Compact View",
    results: "results",
    allPublications: "All Publications",
    noResultsPrefix: "No papers found for",
    noResultsSuffix: ".",
  },
  zh: {
    eyebrow: "论文成果",
    title: "研究",
    subtitle:
      "展示实验室在可微记忆、概念级语言模型、隐思考机制、生成流网络与强化学习、高效化和图学习方向的代表性论文。",
    directionPlaceholder:
      "该方向主页内容正在整理中，后续会在这里展示方向概览、代表论文、项目与相关资源。",
    searchLabel: "搜索",
    searchPlaceholder: "按任意关键词搜索（标题/作者/会议/摘要等）...",
    detailedView: "详细视图",
    compactView: "简要视图",
    results: "条结果",
    allPublications: "全部论文",
    noResultsPrefix: "未找到与",
    noResultsSuffix: "相关的论文。",
  },
};

const PAPER_LINK_FIELDS = [
  { key: "pdf", label: "PDF" },
  { key: "github", label: "GitHub" },
  { key: "huggingface", label: "Hugging Face" },
  { key: "homepage", label: "Project Page" },
];

const MATH_COMMANDS = {
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  theta: "θ",
  lambda: "λ",
  mu: "μ",
  pi: "π",
  sigma: "σ",
  phi: "φ",
  omega: "ω",
  Gamma: "Γ",
  Delta: "Δ",
  Theta: "Θ",
  Lambda: "Λ",
  Pi: "Π",
  Sigma: "Σ",
  Phi: "Φ",
  Omega: "Ω",
  sum: "∑",
  prod: "∏",
  infty: "∞",
  leq: "≤",
  geq: "≥",
  neq: "≠",
  approx: "≈",
  times: "×",
  cdot: "·",
  mid: "|",
  lt: "<",
  gt: ">",
};

const MATH_OPERATORS = new Set(["argmax", "argmin", "log", "max", "min"]);
const MATH_LIMIT_OPERATORS = new Set([
  "argmax",
  "argmin",
  "max",
  "min",
  "prod",
  "sum",
]);

function escapeMathHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function readBalancedGroup(source, startIndex) {
  let depth = 1;
  let cursor = startIndex + 1;
  let value = "";
  while (cursor < source.length && depth > 0) {
    const char = source[cursor];
    if (char === "{") {
      depth += 1;
      value += char;
    } else if (char === "}") {
      depth -= 1;
      if (depth > 0) {
        value += char;
      }
    } else {
      value += char;
    }
    cursor += 1;
  }
  return { value, endIndex: cursor };
}

function readMathArgument(source, startIndex) {
  let cursor = startIndex;
  while (/\s/.test(source[cursor] || "")) {
    cursor += 1;
  }
  if (source[cursor] === "{") {
    return readBalancedGroup(source, cursor);
  }
  if (source[cursor] === "\\") {
    const command = source.slice(cursor + 1).match(/^[A-Za-z]+/);
    if (command) {
      const value = `\\${command[0]}`;
      return { value, endIndex: cursor + command[0].length + 1 };
    }
  }
  return {
    value: source[cursor] || "",
    endIndex: Math.min(cursor + 1, source.length),
  };
}

function readMathScripts(source, startIndex) {
  let cursor = startIndex;
  let subscript = "";
  let superscript = "";
  let hasScripts = false;

  while (cursor < source.length) {
    let scriptCursor = cursor;
    while (/\s/.test(source[scriptCursor] || "")) {
      scriptCursor += 1;
    }

    const marker = source[scriptCursor];
    if (marker !== "_" && marker !== "^") {
      break;
    }

    const argument = readMathArgument(source, scriptCursor + 1);
    if (marker === "_") {
      subscript = argument.value;
    } else {
      superscript = argument.value;
    }
    cursor = argument.endIndex;
    hasScripts = true;
  }

  return {
    endIndex: cursor,
    hasScripts,
    subscript,
    superscript,
  };
}

function renderMathCommand(command) {
  if (MATH_OPERATORS.has(command)) {
    return `<span class="math-op">${escapeMathHtml(command)}</span>`;
  }
  if (Object.prototype.hasOwnProperty.call(MATH_COMMANDS, command)) {
    return escapeMathHtml(MATH_COMMANDS[command]);
  }
  return escapeMathHtml(command);
}

function renderMathLimitOperator(command, scripts) {
  const core =
    command === "sum" || command === "prod"
      ? MATH_COMMANDS[command]
      : command;
  const classes = [
    "math-limit-op",
    command === "sum" || command === "prod"
      ? "math-symbol-op"
      : "math-word-op",
  ];
  if (scripts.superscript) {
    classes.push("has-sup");
  }

  const top = scripts.superscript
    ? `<span class="math-limit math-limit-top">${renderMathFormula(
        scripts.superscript
      )}</span>`
    : "";
  const bottom = scripts.subscript
    ? `<span class="math-limit math-limit-bottom">${renderMathFormula(
        scripts.subscript
      )}</span>`
    : "";
  return `<span class="${classes.join(
    " "
  )}">${top}<span class="math-limit-core">${escapeMathHtml(
    core
  )}</span>${bottom}</span>`;
}

function renderMathFormula(source) {
  let cursor = 0;
  let result = "";
  while (cursor < source.length) {
    const char = source[cursor];
    if (/\s/.test(char)) {
      result += " ";
      while (/\s/.test(source[cursor + 1] || "")) {
        cursor += 1;
      }
      cursor += 1;
    } else if (char === "\\") {
      const command = source.slice(cursor + 1).match(/^[A-Za-z]+/);
      if (command) {
        const commandName = command[0];
        const commandEndIndex = cursor + commandName.length + 1;
        const scripts = readMathScripts(source, commandEndIndex);
        if (MATH_LIMIT_OPERATORS.has(commandName) && scripts.hasScripts) {
          result += renderMathLimitOperator(commandName, scripts);
          cursor = scripts.endIndex;
        } else {
          result += renderMathCommand(commandName);
          cursor = commandEndIndex;
        }
      } else {
        result += escapeMathHtml(source[cursor + 1] || "");
        cursor += 2;
      }
    } else if (char === "_" || char === "^") {
      const argument = readMathArgument(source, cursor + 1);
      const tag = char === "_" ? "sub" : "sup";
      result += `<${tag}>${renderMathFormula(argument.value)}</${tag}>`;
      cursor = argument.endIndex;
    } else if (char === "{" || char === "}") {
      cursor += 1;
    } else {
      result += escapeMathHtml(char);
      cursor += 1;
    }
  }
  return result.trim();
}

export default {
  data() {
    return {
      currentLanguage: "zh",
      searchKeyword: "",
      viewMode: "detailed",
      activeTags: [],
    };
  },
  computed: {
    text() {
      return I18N[this.currentLanguage] || I18N.zh;
    },
    normalizedKeyword() {
      return this.searchKeyword.toLowerCase().trim();
    },
    localizedTags() {
      return getLocalizedResearchTags(this.currentLanguage);
    },
    tagNameById() {
      return this.localizedTags.reduce((acc, tag) => {
        acc[tag.id] = tag.name;
        return acc;
      }, {});
    },
    papers() {
      return publications.map((paper) => {
        const normalizedPaper = {
          ...paper,
          authors: paper.authors || "",
          abstract: paper.abstract || "",
          tagIds: this.normalizeTagIds(paper.tagIds),
        };
        return {
          ...normalizedPaper,
          searchText: this.getPaperSearchText(normalizedPaper),
        };
      });
    },
    activeDirectionId() {
      return this.activeTags[0] || "";
    },
    activeDirection() {
      if (!this.activeDirectionId) {
        return null;
      }
      return (
        this.localizedTags.find((tag) => tag.id === this.activeDirectionId) ||
        null
      );
    },
    activeDirectionContent() {
      if (!this.activeDirectionId) {
        return "";
      }
      return getResearchDirectionContent(
        this.activeDirectionId,
        this.currentLanguage
      );
    },
    filteredPapers() {
      return this.papers.filter((paper) => this.matchesPaper(paper));
    },
    resultCountText() {
      if (!this.activeDirection) {
        return `${this.filteredPapers.length} ${this.text.results}`;
      }
      if (this.currentLanguage === "en") {
        return `In ${this.activeDirection.name}, ${this.filteredPapers.length} ${this.text.results}`;
      }
      return `在${this.activeDirection.name}方向下，${this.filteredPapers.length}${this.text.results}`;
    },
  },
  watch: {
    activeTags() {
      this.syncRouteFromTags();
    },
    activeDirectionContent: {
      immediate: true,
      handler() {
        this.$nextTick(this.renderDirectionMath);
      },
    },
    "$route.query": {
      immediate: true,
      handler() {
        this.syncTagsFromRoute();
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
    isValidTag(tagId) {
      return isResearchTagId(tagId);
    },
    normalizeTagIds(tagIds) {
      return normalizeResearchTagIds(tagIds);
    },
    sameTagIds(a, b) {
      if (!Array.isArray(a) || !Array.isArray(b)) {
        return false;
      }
      if (a.length !== b.length) {
        return false;
      }
      return a.every((tagId, index) => tagId === b[index]);
    },
    buildQueryWithTags(tagIds) {
      const nextQuery = { ...this.$route.query };
      delete nextQuery.tag;
      delete nextQuery.tags;

      if (tagIds.length === 1) {
        nextQuery.tag = tagIds[0];
      } else if (tagIds.length > 1) {
        nextQuery.tags = tagIds.join(",");
      }

      return nextQuery;
    },
    isSameQuery(queryA, queryB) {
      const keysA = Object.keys(queryA).sort();
      const keysB = Object.keys(queryB).sort();
      if (keysA.length !== keysB.length) {
        return false;
      }
      return keysA.every((key, index) => {
        if (key !== keysB[index]) {
          return false;
        }
        return String(queryA[key]) === String(queryB[key]);
      });
    },
    extractTagsFromRoute() {
      const queryTags =
        typeof this.$route.query.tags === "string" && this.$route.query.tags
          ? this.$route.query.tags.split(",")
          : [];
      const legacyTag =
        typeof this.$route.query.tag === "string" && this.$route.query.tag
          ? [this.$route.query.tag]
          : [];
      const rawTags = queryTags.length ? queryTags : legacyTag;
      return this.normalizeTagIds(rawTags);
    },
    getTagLabel(tagId) {
      return this.tagNameById[tagId] || tagId;
    },
    escapeHtml(value) {
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    },
    escapeRegExp(value) {
      return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    },
    getHighlightedHtml(value) {
      const text = typeof value === "string" ? value : "";
      const keyword = this.searchKeyword.trim();
      if (!keyword) {
        return this.escapeHtml(text);
      }

      const pattern = this.escapeRegExp(keyword);
      if (!pattern) {
        return this.escapeHtml(text);
      }

      const regex = new RegExp(pattern, "gi");
      let cursor = 0;
      let result = "";
      let match = regex.exec(text);
      while (match) {
        result += this.escapeHtml(text.slice(cursor, match.index));
        result += `<mark class="search-hit">${this.escapeHtml(match[0])}</mark>`;
        cursor = match.index + match[0].length;
        match = regex.exec(text);
      }
      result += this.escapeHtml(text.slice(cursor));
      return result;
    },
    getTagSearchText(tagIds) {
      return getResearchTagSearchText(tagIds);
    },
    getPaperSearchText(paper) {
      return [
        paper.title,
        paper.venue,
        paper.authors,
        paper.abstract,
        this.getTagSearchText(paper.tagIds),
      ]
        .filter(Boolean)
        .join(" ")
        .replace(/\s+/g, " ")
        .toLowerCase();
    },
    getPaperLinks(paper) {
      return PAPER_LINK_FIELDS.map((field) => ({
        ...field,
        href:
          typeof paper[field.key] === "string" ? paper[field.key].trim() : "",
      })).filter((link) => link.href);
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
    matchesPaper(paper) {
      if (!paper) {
        return false;
      }
      const matchesKeyword =
        !this.normalizedKeyword ||
        (paper.searchText && paper.searchText.includes(this.normalizedKeyword));
      const matchesDirection =
        !this.activeDirectionId || paper.tagIds.includes(this.activeDirectionId);
      return matchesKeyword && matchesDirection;
    },
    setViewMode(mode) {
      this.viewMode = mode === "compact" ? "compact" : "detailed";
    },
    selectDirection(tagId) {
      if (!this.isValidTag(tagId)) {
        return;
      }
      if (this.activeDirectionId === tagId) {
        this.activeTags = [];
        return;
      }
      this.activeTags = [tagId];
    },
    clearDirection() {
      this.activeTags = [];
    },
    openTagFilter(tagId) {
      if (!this.isValidTag(tagId)) {
        return;
      }
      this.selectDirection(tagId);
    },
    syncTagsFromRoute() {
      const routeTagIds = this.extractTagsFromRoute().slice(0, 1);
      if (!this.sameTagIds(this.activeTags, routeTagIds)) {
        this.activeTags = routeTagIds;
      }

      const canonicalQuery = this.buildQueryWithTags(routeTagIds);
      if (this.isSameQuery(canonicalQuery, this.$route.query)) {
        return;
      }
      this.$router
        .replace({ name: this.$route.name, query: canonicalQuery })
        .catch(() => {});
    },
    syncRouteFromTags() {
      const canonicalQuery = this.buildQueryWithTags(this.activeTags.slice(0, 1));
      if (this.isSameQuery(canonicalQuery, this.$route.query)) {
        return;
      }
      this.$router
        .replace({ name: this.$route.name, query: canonicalQuery })
        .catch(() => {});
    },
  },
};
</script>
<style lang="less" scoped>
.research-hero {
  padding-top: 76px;
  border-bottom: 1px solid var(--lumia-border);

  .lumia-subtitle {
    max-width: 860px;
    white-space: normal;
  }

}

.research-guide {
  margin-top: 30px;
  display: grid;
  gap: 14px;

  .guide-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    align-items: center;
  }

  .guide-card {
    min-height: 46px;
    border: 1.5px solid var(--lumia-primary);
    border-radius: 999px;
    background: transparent;
    padding: 12px 22px;
    text-align: center;
    color: var(--lumia-primary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: box-shadow 0.25s ease, background-color 0.25s ease,
      color 0.25s ease, border-color 0.25s ease;

    &:hover,
    &.active {
      background: var(--lumia-primary);
      color: var(--lumia-white);
      box-shadow: 0 10px 26px rgba(102, 46, 125, 0.14);
    }
  }

  .guide-card-name {
    margin: 0;
    font-family: var(--lumia-heading-font);
    font-size: 15px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: 0;
  }
}

.direction-intro {
  max-width: 860px;
  margin: 22px 0 0;
  color: rgba(102, 46, 125, 0.78);
  font-size: 17px;
  line-height: 1.72;
}

.direction-placeholder {
  width: 100%;
  max-width: none;
  box-sizing: border-box;
  margin-top: 24px;
  padding: 34px;
  border: 1px solid rgba(102, 46, 125, 0.18);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.82);

  > p {
    max-width: none;
    margin: 0;
    font-size: 17px;
    line-height: 1.68;
  }

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

.research-content {
  padding-top: 46px;
  text-align: left;

  .research-workspace {
    min-height: 360px;
  }

  .research-toolbar {
    margin-bottom: 12px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: 14px;
  }

  .search-box {
    display: block;
    min-width: min(560px, 100%);

    input {
      width: 100%;
      min-height: 48px;
      border-radius: 14px;
      border: 1px solid rgba(102, 46, 125, 0.24);
      padding: 0 14px;
      background: rgba(255, 255, 255, 0.88);
      font-size: 15px;
      color: var(--lumia-text);
      outline: none;
      transition: border-color 0.25s ease, box-shadow 0.25s ease;

      &:focus {
        border-color: rgba(102, 46, 125, 0.56);
        box-shadow: 0 0 0 3px rgba(102, 46, 125, 0.12);
      }
    }
  }

  .view-switch {
    --switch-width: 112px;
    display: inline-flex;
    position: relative;
    padding: 4px;
    border-radius: 999px;
    border: 1px solid rgba(102, 46, 125, 0.24);
    background: rgba(255, 255, 255, 0.8);
    overflow: hidden;

    &.is-compact {
      .switch-indicator {
        transform: translateX(var(--switch-width));
      }
    }
  }

  .switch-indicator {
    position: absolute;
    top: 4px;
    left: 4px;
    width: var(--switch-width);
    height: calc(100% - 8px);
    border-radius: 999px;
    background: var(--lumia-primary);
    transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
    z-index: 0;
  }

  .switch-btn {
    position: relative;
    z-index: 1;
    width: var(--switch-width);
    border: none;
    background: transparent;
    color: var(--lumia-text);
    border-radius: 999px;
    padding: 8px 14px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: color 0.25s ease;

    &.active {
      color: #fff;
    }
  }

  .result-count {
    margin-bottom: 18px;
    font-size: 13px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.72;
  }

  :deep(mark.search-hit) {
    background: rgba(102, 46, 125, 0.22);
    color: var(--lumia-primary-strong);
    border-radius: 4px;
    padding: 0 2px;
  }

  :deep(.paper-tag-list) {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .paper-tag-chip {
      display: inline-flex;
      align-items: center;
      border-radius: 999px;
      border: 1px solid rgba(102, 46, 125, 0.24);
      background: rgba(255, 255, 255, 0.82);
      padding: 4px 10px;
      font-size: 12px;
      line-height: 1.2;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--lumia-primary);
      cursor: pointer;
      transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease,
        transform 0.2s ease;
      appearance: none;
      -webkit-appearance: none;

      &:hover {
        border-color: var(--lumia-primary);
        background: var(--lumia-primary);
        color: #fff;
        transform: translateY(-1px);
      }

      &:focus-visible {
        border-color: var(--lumia-primary);
        background: var(--lumia-primary);
        color: #fff;
        outline: none;
      }
    }
  }

  :deep(.detail-tag-row) {
    margin-bottom: 10px;
  }

  :deep(.compact-tag-row) {
    margin-top: 10px;
  }

  :deep(.link-list) {
    line-height: 1.4;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;

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

      &:hover {
        opacity: 0.75;
        text-decoration-color: currentColor;
      }

      &:hover::after {
        transform: translate(4px, -3px);
      }

      &:focus-visible {
        outline: none;
        opacity: 0.75;
        text-decoration-color: currentColor;
      }

      &:focus-visible::after {
        transform: translate(4px, -3px);
      }
    }
  }

  .compact-section {
    display: grid;
    gap: 12px;

    .compact-item {
      padding: 16px 18px;
      border: 1px solid rgba(102, 46, 125, 0.18);
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.9);

      h3 {
        margin: 0;
        font-family: var(--lumia-heading-font);
        font-size: clamp(20px, 2vw, 26px);
        line-height: 1.2;
        letter-spacing: -0.01em;
      }

      .compact-venue-row {
        margin-top: 8px;
        margin-bottom: 0;
        font-size: 14px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        opacity: 0.72;

        > span:first-child {
          font-weight: 700;
        }
      }

      .compact-author {
        margin: 8px 0 0;
        font-size: 14px;
        line-height: 1.5;
        opacity: 0.88;
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

    .author {
      margin-bottom: 8px;
      line-height: 1.55;
      font-size: 15px;
      opacity: 0.92;
    }

    .link-list {
      margin-bottom: 10px;

      > span:first-child {
        font-weight: 700;
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
        border-radius: 16px;
        min-height: 180px;
        object-fit: cover;
        display: block;
      }
    }

    .col-sm-8 {
      width: 100%;
      padding-left: 0;
      box-sizing: border-box;
    }

    h4 {
      font-family: var(--lumia-heading-font);
      font-size: clamp(23px, 2.4vw, 34px);
      line-height: 1.15;
      font-weight: 700;
      margin-bottom: 10px;
      letter-spacing: -0.02em;
    }
  }
}

@media (max-width: 999px) {
  .research-content {
    .search-box {
      min-width: 100%;
    }

    .research-section {
      .row {
        grid-template-columns: 1fr;
      }

      h4 {
        font-size: 24px;
      }
    }
  }
}

@media (max-width: 649px) {
  .direction-placeholder {
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

  .research-content {
    .view-switch {
      width: auto;
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
}
</style>
