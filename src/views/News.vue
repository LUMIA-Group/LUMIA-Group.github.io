<template>
  <div class="news-page">
    <section class="lumia-section news-hero">
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
      </div>
    </section>

    <section class="lumia-section news-listing">
      <div class="lumia-container">
        <ul class="timeline">
          <li
            v-for="(item, index) in newsData.newsList"
            :key="item.id"
            class="timeline-item lumia-fade-up"
            :style="{ '--delay': `${100 + index * 70}ms` }"
          >
            <router-link
              v-if="isInternalNews(item)"
              class="timeline-link"
              :to="newsInternalLink(item)"
            >
              <span class="date">{{ formatDisplayDate(item.date) }}:</span>
              <span class="news-text">{{ getDisplayTitle(item) }}</span>
            </router-link>
            <a
              v-else-if="isExternalNews(item)"
              class="timeline-link"
              :href="newsExternalLink(item)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="date">{{ formatDisplayDate(item.date) }}:</span>
              <span class="news-text">{{ getDisplayTitle(item) }}</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import {
  formatNewsDate,
  getNewsTitle,
  isExternalNews,
  isInternalNews,
  newsData,
} from "@/data/news";

const I18N = {
  en: {
    eyebrow: "Updates",
    title: "News",
    subtitle: "Recent publications, awards, and lab milestones.",
  },
  zh: {
    eyebrow: "动态",
    title: "新闻",
    subtitle: "近期论文发表、获奖信息与实验室动态。",
  },
};

export default {
  data() {
    return {
      newsData,
      currentLanguage: "zh",
    };
  },
  computed: {
    text() {
      return I18N[this.currentLanguage] || I18N.zh;
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
    formatDisplayDate(date) {
      return formatNewsDate(date, this.currentLanguage);
    },
    getDisplayTitle(news) {
      return getNewsTitle(news, this.currentLanguage);
    },
    isExternalNews(news) {
      return isExternalNews(news);
    },
    isInternalNews(news) {
      return isInternalNews(news);
    },
    newsInternalLink(news) {
      if (news && news.link) {
        return news.link;
      }
      return {
        name: "news-detail",
        params: {
          id: news.id,
        },
      };
    },
    newsExternalLink(news) {
      return (news && news.link) || "#";
    },
  },
};
</script>

<style lang="less" scoped>
.news-hero {
  padding-top: 76px;
  border-bottom: 1px solid var(--lumia-border);
}

.news-listing {
  .timeline {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .timeline-item {
    background: var(--lumia-white);
    border: 1px solid rgba(102, 46, 125, 0.18);
    border-radius: 20px;
    padding: 18px 20px;
    display: block;

    &:nth-child(3n + 1) {
      background: linear-gradient(150deg, #ffffff 0%, #fff6df 100%);
    }

    &:nth-child(3n + 2) {
      background: linear-gradient(150deg, #ffffff 0%, #eef8fd 100%);
    }

    &:nth-child(3n + 3) {
      background: linear-gradient(150deg, #ffffff 0%, #fff0f5 100%);
    }

    .timeline-link {
      color: inherit;
      display: block;
      font-size: 18px;
      line-height: 1.55;
      text-decoration: none;
      transition: color 0.25s ease;

      &:hover {
        color: var(--lumia-primary-strong);

        .news-text {
          text-decoration-color: var(--lumia-primary);
        }
      }
    }

    .date {
      font-weight: 700;
      margin-right: 8px;
    }

    .news-text {
      text-decoration: underline;
      text-decoration-color: transparent;
      text-underline-offset: 0.24em;
      transition: text-decoration-color 0.25s ease;
    }
  }
}

@media (max-width: 999px) {
  .news-listing {
    .timeline-item {
      .timeline-link {
        font-size: 16px;
      }
    }
  }
}
</style>
