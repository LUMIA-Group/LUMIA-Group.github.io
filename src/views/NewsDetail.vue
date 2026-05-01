<template>
  <div class="news-detail-page">
    <section class="lumia-section news-detail-hero">
      <div class="lumia-container">
        <p class="lumia-eyebrow lumia-fade-up" style="--delay: 80ms">
          {{ text.eyebrow }}
        </p>
        <template v-if="hasDetailContent">
          <h1 class="lumia-title lumia-fade-up" style="--delay: 120ms">
            {{ displayTitle }}
          </h1>
          <p class="lumia-subtitle lumia-fade-up" style="--delay: 160ms">
            {{ displayDate }}
          </p>
        </template>
        <template v-else>
          <h1 class="lumia-title lumia-fade-up" style="--delay: 120ms">
            {{ text.notFoundTitle }}
          </h1>
          <p class="lumia-subtitle lumia-fade-up" style="--delay: 160ms">
            {{ text.notFoundSubtitle }}
          </p>
        </template>
      </div>
    </section>

    <section class="lumia-section news-detail-content">
      <div class="lumia-container">
        <article v-if="hasDetailContent" class="detail-card lumia-fade-up">
          <div class="detail-body" v-html="newsContent"></div>
        </article>
        <router-link class="back-link lumia-fade-up" :to="{ name: 'news' }">
          {{ text.backToNews }}
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import {
  formatNewsDate,
  getNewsContent,
  getNewsTitle,
  hasInternalNewsContent,
  newsData,
} from "@/data/news";

const I18N = {
  en: {
    eyebrow: "Lab News",
    notFoundTitle: "News item not found",
    notFoundSubtitle: "The requested lab news item does not exist.",
    backToNews: "Back to news",
  },
  zh: {
    eyebrow: "实验室新闻",
    notFoundTitle: "未找到新闻",
    notFoundSubtitle: "请求的实验室新闻不存在，或该新闻没有站内详情内容。",
    backToNews: "返回新闻列表",
  },
};

export default {
  data() {
    return {
      currentLanguage: "zh",
    };
  },
  computed: {
    text() {
      return I18N[this.currentLanguage] || I18N.zh;
    },
    newsItem() {
      const newsId = this.$route.params.id;
      return (newsData.newsList || []).find((item) => item.id === newsId);
    },
    hasDetailContent() {
      return hasInternalNewsContent(this.newsItem);
    },
    newsContent() {
      return getNewsContent(this.newsItem, this.currentLanguage);
    },
    displayTitle() {
      return getNewsTitle(this.newsItem, this.currentLanguage);
    },
    displayDate() {
      return this.newsItem
        ? formatNewsDate(this.newsItem.date, this.currentLanguage)
        : "";
    },
  },
  mounted() {
    this.initLanguage();
    window.addEventListener("lumia-language-change", this.onLanguageChange);
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
  },
};
</script>

<style lang="less" scoped>
.news-detail-hero {
  padding-top: 76px;
  border-bottom: 1px solid var(--lumia-border);
}

.news-detail-content {
  .detail-card {
    border: 1px solid rgba(102, 46, 125, 0.18);
    border-radius: 22px;
    background: var(--lumia-white);
    padding: 26px;
  }

  .detail-body {
    max-width: 900px;
    font-size: 18px;
    line-height: 1.7;
  }

  .back-link {
    display: inline-flex;
    margin-top: 24px;
    color: var(--lumia-primary);
    font-weight: 700;
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 0.24em;
    transition: text-decoration-color 0.25s ease, opacity 0.25s ease;

    &:hover {
      opacity: 0.78;
      text-decoration-color: var(--lumia-primary);
    }
  }
}

@media (max-width: 649px) {
  .news-detail-content {
    .detail-card {
      padding: 20px;
    }

    .detail-body {
      font-size: 16px;
    }
  }
}

::v-deep .detail-body p {
  margin: 0 0 18px;
}

::v-deep .detail-body h2 {
  margin: 28px 0 12px;
  font-family: "Space Grotesk", sans-serif;
  font-size: 28px;
  line-height: 1.15;
  font-weight: 700;
}

::v-deep .detail-body ul {
  display: grid;
  gap: 12px;
}

::v-deep .detail-body li {
  line-height: 1.45;
}

::v-deep .detail-body a {
  color: var(--lumia-primary);
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 0.24em;
  transition: text-decoration-color 0.25s ease, opacity 0.25s ease;
}

::v-deep .detail-body a:hover {
  opacity: 0.78;
  text-decoration-color: var(--lumia-primary);
}
</style>
