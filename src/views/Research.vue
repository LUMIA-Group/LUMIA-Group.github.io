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
              @click="openDirectionPage(tag.id)"
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
      </div>
    </section>

    <section class="lumia-section research-content">
      <div class="lumia-container">
        <section class="research-workspace">
          <section class="publication-browser">
            <div class="research-toolbar">
              <div class="filter-controls">
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
                  class="direction-select"
                  :class="{ 'is-open': isDirectionDropdownOpen }"
                >
                  <button
                    id="direction-filter"
                    type="button"
                    class="direction-select-trigger"
                    :aria-label="text.directionFilterLabel"
                    aria-haspopup="listbox"
                    :aria-expanded="isDirectionDropdownOpen ? 'true' : 'false'"
                    aria-controls="direction-filter-list"
                    @pointerdown="captureDirectionDropdownScrollPosition"
                    @click.stop="toggleDirectionDropdown"
                    @keydown="onDirectionDropdownKeydown"
                  >
                    <span>{{ directionFilterText }}</span>
                  </button>
                  <div
                    v-if="isDirectionDropdownOpen"
                    id="direction-filter-list"
                    class="direction-select-menu"
                    role="listbox"
                    :aria-label="text.directionFilterLabel"
                  >
                    <button
                      v-for="option in directionFilterOptions"
                      :key="option.id || 'all-directions'"
                      type="button"
                      class="direction-select-option"
                      :class="{ active: activeDirectionId === option.id }"
                      :data-direction-id="option.id || 'all'"
                      role="option"
                      :aria-selected="
                        activeDirectionId === option.id ? 'true' : 'false'
                      "
                      @click.stop="setDirectionFilter(option.id)"
                    >
                      <span>{{ option.name }}</span>
                    </button>
                  </div>
                </div>
                <button
                  v-if="activeDirectionHasPage"
                  type="button"
                  class="direction-detail-link"
                  @click="openActiveDirectionPage"
                >
                  <span>{{ text.directionIntro }}</span>
                </button>
              </div>
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
                  :class="{ 'is-target-paper': targetPaperId === paper.id }"
                  :data-paper-id="paper.id"
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
                        :class="{ active: activeDirectionId === tagId }"
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
            :class="{ 'is-target-paper': targetPaperId === paper.id }"
            :data-paper-id="paper.id"
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
                :class="{ active: activeDirectionId === tagId }"
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
import { siteTextOverrides } from "@/data/siteText";
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
    searchLabel: "Search",
    searchPlaceholder: "Search any keyword across papers...",
    directionFilterLabel: "Filter by direction",
    allDirections: "All Directions",
    directionIntro: "Direction Overview",
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
    searchLabel: "搜索",
    searchPlaceholder: "按任意关键词搜索（标题/作者/会议/摘要等）...",
    directionFilterLabel: "按研究方向筛选",
    allDirections: "全部方向",
    directionIntro: "方向介绍",
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

export default {
  data() {
    return {
      currentLanguage: "zh",
      searchKeyword: "",
      viewMode: "detailed",
      activeTags: [],
      isDirectionDropdownOpen: false,
      directionDropdownScrollPosition: null,
    };
  },
  computed: {
    text() {
      return {
        ...(I18N[this.currentLanguage] || I18N.zh),
        ...((siteTextOverrides[this.currentLanguage] || {}).research || {}),
      };
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
    directionFilterOptions() {
      return [
        {
          id: "",
          name: this.text.allDirections,
        },
        ...this.localizedTags,
      ];
    },
    directionFilterText() {
      return this.activeDirection
        ? this.activeDirection.name
        : this.text.allDirections;
    },
    activeDirectionHasPage() {
      return Boolean(
        this.activeDirectionId && this.hasDirectionPage(this.activeDirectionId)
      );
    },
    targetPaperId() {
      return typeof this.$route.query.paper === "string"
        ? this.$route.query.paper
        : "";
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
    "$route.query": {
      immediate: true,
      handler() {
        this.syncTagsFromRoute();
        this.$nextTick(this.scrollToTargetPaper);
      },
    },
  },
  mounted() {
    this.initLanguage();
    window.addEventListener("lumia-language-change", this.onLanguageChange);
    document.addEventListener("click", this.onDocumentClick);
    this.$nextTick(this.scrollToTargetPaper);
  },
  beforeDestroy() {
    window.removeEventListener("lumia-language-change", this.onLanguageChange);
    document.removeEventListener("click", this.onDocumentClick);
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
    onDocumentClick(event) {
      if (!this.isDirectionDropdownOpen || !this.$el) {
        return;
      }
      const dropdown = this.$el.querySelector(".direction-select");
      if (dropdown && !dropdown.contains(event.target)) {
        this.closeDirectionDropdown();
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
    hasDirectionPage(tagId) {
      return Boolean(
        getResearchDirectionContent(tagId, this.currentLanguage).trim()
      );
    },
    openDirectionPage(tagId) {
      if (!this.isValidTag(tagId)) {
        return;
      }
      if (!this.hasDirectionPage(tagId)) {
        this.selectDirection(tagId);
        this.$nextTick(() => {
          const publicationsSection = this.$el.querySelector(
            ".research-content"
          );
          if (publicationsSection) {
            publicationsSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
        return;
      }
      this.$router
        .push({
          name: "research-direction",
          params: { tagId },
        })
        .catch(() => {});
    },
    openActiveDirectionPage() {
      if (!this.activeDirectionHasPage) {
        return;
      }
      this.closeDirectionDropdown();
      this.$router
        .push({
          name: "research-direction",
          params: { tagId: this.activeDirectionId },
        })
        .catch(() => {});
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
    captureDirectionDropdownScrollPosition() {
      if (!this.isDirectionDropdownOpen) {
        this.directionDropdownScrollPosition = this.getScrollPosition();
      }
    },
    toggleDirectionDropdown() {
      if (this.isDirectionDropdownOpen) {
        this.closeDirectionDropdown();
        return;
      }
      this.directionDropdownScrollPosition = this.getScrollPosition();
      this.isDirectionDropdownOpen = true;
    },
    closeDirectionDropdown(options = {}) {
      this.isDirectionDropdownOpen = false;
      if (!options.preserveScrollPosition) {
        this.directionDropdownScrollPosition = null;
      }
    },
    getScrollPosition() {
      if (typeof window === "undefined") {
        return { x: 0, y: 0 };
      }
      return {
        x:
          window.pageXOffset ||
          document.documentElement.scrollLeft ||
          document.body.scrollLeft ||
          0,
        y:
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0,
      };
    },
    restoreScrollPosition(position) {
      if (typeof window === "undefined" || !position) {
        return;
      }
      window.scrollTo(position.x, position.y);
    },
    restoreScrollAfterUpdate(position) {
      this.$nextTick(() => {
        this.restoreScrollPosition(position);
        if (typeof window === "undefined") {
          return;
        }
        window.requestAnimationFrame(() => {
          this.restoreScrollPosition(position);
          window.setTimeout(() => {
            this.restoreScrollPosition(position);
            if (this.directionDropdownScrollPosition === position) {
              this.directionDropdownScrollPosition = null;
            }
          }, 0);
        });
      });
    },
    onDirectionDropdownKeydown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        this.closeDirectionDropdown();
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this.toggleDirectionDropdown();
        return;
      }

      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
        return;
      }

      event.preventDefault();
      const options = this.directionFilterOptions;
      const currentIndex = Math.max(
        0,
        options.findIndex((option) => option.id === this.activeDirectionId)
      );
      const step = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex = (currentIndex + step + options.length) % options.length;
      if (!this.isDirectionDropdownOpen) {
        this.directionDropdownScrollPosition = this.getScrollPosition();
      }
      this.isDirectionDropdownOpen = true;
      this.setDirectionFilter(options[nextIndex].id);
    },
    setDirectionFilter(tagId) {
      const scrollPosition =
        this.directionDropdownScrollPosition || this.getScrollPosition();
      this.closeDirectionDropdown({ preserveScrollPosition: true });
      if (!tagId) {
        this.clearDirection();
        this.restoreScrollAfterUpdate(scrollPosition);
        return;
      }
      if (!this.isValidTag(tagId) || this.activeDirectionId === tagId) {
        this.restoreScrollAfterUpdate(scrollPosition);
        return;
      }
      this.activeTags = [tagId];
      this.restoreScrollAfterUpdate(scrollPosition);
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
    scrollToTargetPaper() {
      if (!this.targetPaperId || !this.$el) {
        return;
      }

      const target = Array.from(
        this.$el.querySelectorAll("[data-paper-id]")
      ).find(
        (node) =>
          node.dataset.paperId === this.targetPaperId && node.offsetParent !== null
      );
      if (!target) {
        return;
      }

      target.scrollIntoView({ behavior: "smooth", block: "center" });
    },
  },
};
</script>
<style lang="less" scoped>
.research-hero {
  padding-top: 76px;
  padding-bottom: 52px;

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

.research-content {
  padding-top: 32px;
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

  .filter-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    flex: 0 1 clamp(840px, 72vw, 920px);
    min-width: min(840px, 100%);
  }

  .search-box {
    display: block;
    flex: 0 1 clamp(300px, 32vw, 420px);
    min-width: min(300px, 100%);
    max-width: clamp(300px, 32vw, 420px);

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

  .direction-select {
    position: relative;
    display: block;
    flex: 0 1 216px;
    min-width: min(208px, 100%);
    z-index: 4;

    &.is-open {
      z-index: 18;
    }

    &.is-open .direction-select-trigger {
      border-color: rgba(102, 46, 125, 0.56);
      background: #fff;
      box-shadow: 0 0 0 3px rgba(102, 46, 125, 0.12);

      &::after {
        transform: translateY(2px) rotate(225deg);
      }
    }

    .direction-select-trigger {
      position: relative;
      width: 100%;
      min-height: 48px;
      border-radius: 14px;
      border: 1px solid rgba(102, 46, 125, 0.24);
      padding: 0 42px 0 14px;
      background: rgba(255, 255, 255, 0.88);
      color: var(--lumia-text);
      font-size: 15px;
      font-weight: 600;
      line-height: 1.2;
      text-align: left;
      outline: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: border-color 0.25s ease, box-shadow 0.25s ease,
        background-color 0.25s ease;

      &::after {
        content: "";
        position: absolute;
        right: 17px;
        top: 50%;
        width: 8px;
        height: 8px;
        border-right: 2px solid var(--lumia-primary);
        border-bottom: 2px solid var(--lumia-primary);
        transform: translateY(-6px) rotate(45deg);
        transition: transform 0.25s ease;
      }

      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &:hover,
      &:focus-visible {
        border-color: rgba(102, 46, 125, 0.56);
        box-shadow: 0 0 0 3px rgba(102, 46, 125, 0.12);
      }
    }

    .direction-select-menu {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      width: max(100%, 232px);
      max-width: min(360px, calc(100vw - 32px));
      padding: 8px;
      border: 1px solid rgba(102, 46, 125, 0.2);
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.96);
      box-shadow: 0 18px 34px rgba(102, 46, 125, 0.16);
      backdrop-filter: blur(10px);
      display: grid;
      gap: 4px;
    }

    .direction-select-option {
      width: 100%;
      min-height: 38px;
      border: 0;
      border-radius: 10px;
      padding: 9px 12px;
      background: transparent;
      color: var(--lumia-primary);
      font-size: 14px;
      font-weight: 700;
      line-height: 1.25;
      text-align: left;
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: background-color 0.2s ease, color 0.2s ease,
        box-shadow 0.2s ease;

      span {
        overflow-wrap: anywhere;
      }

      &:hover,
      &:focus-visible,
      &.active {
        background: var(--lumia-primary);
        color: #fff;
        box-shadow: 0 8px 18px rgba(102, 46, 125, 0.12);
        outline: none;
      }
    }
  }

  .direction-detail-link {
    min-height: 46px;
    border: 1.5px solid var(--lumia-primary);
    border-radius: 999px;
    padding: 12px 22px;
    background: transparent;
    color: var(--lumia-primary);
    font-family: var(--lumia-heading-font);
    font-size: 15px;
    font-weight: 700;
    line-height: 1.2;
    white-space: nowrap;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: box-shadow 0.25s ease, background-color 0.25s ease,
      color 0.25s ease, border-color 0.25s ease;

    &::after {
      content: "↗";
      font-size: 13px;
      line-height: 1;
      transform: translateY(-1px);
    }

    &:hover,
    &:focus-visible {
      background: var(--lumia-primary);
      color: var(--lumia-white);
      border-color: var(--lumia-primary);
      box-shadow: 0 10px 26px rgba(102, 46, 125, 0.14);
      outline: none;
    }
  }

  .view-switch {
    --switch-width: 112px;
    display: inline-flex;
    position: relative;
    margin-left: auto;
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

      &.active {
        border-color: var(--lumia-primary);
        background: var(--lumia-primary);
        color: #fff;
      }

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

      &.is-target-paper {
        border-color: var(--lumia-primary);
        box-shadow: 0 0 0 3px rgba(102, 46, 125, 0.12);
      }

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

      &.is-target-paper {
        border-color: var(--lumia-primary);
        box-shadow: 0 0 0 3px rgba(102, 46, 125, 0.12);
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
    .filter-controls {
      flex: 1 1 100%;
      min-width: 100%;
    }

    .search-box {
      flex-basis: 100%;
      min-width: 100%;
      max-width: none;
    }

    .direction-select {
      flex: 0 0 216px;
      min-width: min(216px, 100%);
    }

    .direction-detail-link {
      flex: 0 0 auto;
      width: auto;
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

@media (max-width: 999px) and (min-width: 700px) {
  .research-content {
    .research-toolbar {
      display: grid;
      grid-template-columns: 216px auto minmax(0, 1fr) auto;
      align-items: center;
      justify-content: stretch;
      column-gap: 12px;
      row-gap: 12px;
    }

    .filter-controls {
      display: contents;
      min-width: 0;
    }

    .search-box {
      grid-column: 1 / -1;
      grid-row: 1;
      width: 100%;
    }

    .direction-select {
      grid-column: 1;
      grid-row: 2;
    }

    .direction-detail-link {
      grid-column: 2;
      grid-row: 2;
    }

    .view-switch {
      grid-column: 4;
      grid-row: 2;
      justify-self: end;
    }
  }
}

@media (max-width: 649px) {
  .research-content {
    .view-switch {
      width: auto;
    }

    .direction-select {
      flex-basis: 100%;
      min-width: 100%;
    }

    .direction-detail-link {
      width: 100%;
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
