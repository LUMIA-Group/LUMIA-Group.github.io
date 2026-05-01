<template>
  <div class="home-page">
    <section class="hero lumia-section">
      <div class="lumia-container hero-grid">
        <div class="hero-copy lumia-fade-up" style="--delay: 80ms">
          <p class="lumia-eyebrow">{{ text.siteLabel }}</p>
          <h1 class="lumia-title">{{ text.labName }}</h1>
          <p class="lumia-subtitle hero-desc-typing">
            <span>{{ displayedHeroDesc }}</span>
            <span
              v-if="isTypingHeroDesc"
              class="hero-typing-cursor"
              aria-hidden="true"
            ></span>
          </p>
          <div class="hero-actions">
            <button class="hero-action-btn" type="button" @click="go('research')">
              {{ text.seeResearch }}
            </button>
            <button class="hero-action-btn" type="button" @click="go('people')">
              {{ text.meetPeople }}
            </button>
            <button class="hero-action-btn" type="button" @click="go('news')">
              {{ text.latestNewsLink }}
            </button>
            <button class="hero-action-btn" type="button" @click="go('contact')">
              {{ text.contactUs }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="lumia-section news-preview">
      <div class="lumia-container">
        <div class="preview-head lumia-fade-up" style="--delay: 80ms">
          <p class="lumia-eyebrow">{{ text.updates }}</p>
          <h2 class="section-title">{{ text.labNews }}</h2>
        </div>
        <div class="preview-list">
          <article
            v-for="(news, index) in newsItems"
            :key="news.id"
            class="news-item lumia-fade-up"
            :style="{ '--delay': `${120 + index * 70}ms` }"
          >
            <router-link
              v-if="isInternalNews(news)"
              class="news-link"
              :to="newsInternalLink(news)"
            >
              <span class="news-date">{{ formatDisplayDate(news.date) }}:</span>
              <span class="news-text">{{ getDisplayTitle(news) }}</span>
            </router-link>
            <a
              v-else-if="isExternalNews(news)"
              class="news-link"
              :href="newsExternalLink(news)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="news-date">{{ formatDisplayDate(news.date) }}:</span>
              <span class="news-text">{{ getDisplayTitle(news) }}</span>
            </a>
          </article>
        </div>
      </div>
    </section>

    <section class="lumia-section featured-section">
      <div class="lumia-container">
        <p class="lumia-eyebrow lumia-fade-up" style="--delay: 80ms">
          {{ text.featured }}
        </p>
        <h2 class="section-title lumia-fade-up" style="--delay: 120ms">
          {{ text.focusAreas }}
        </h2>
        <div class="lumia-grid-3">
          <article
            v-for="(item, index) in featuredCards"
            :key="item.id"
            class="feature-card lumia-fade-up"
            role="link"
            tabindex="0"
            :aria-label="`${text.readProjects}: ${item.name}`"
            :style="{ '--delay': `${160 + index * 80}ms` }"
            @click="goToResearchTag(item.id)"
            @keydown.enter.prevent="goToResearchTag(item.id)"
            @keydown.space.prevent="goToResearchTag(item.id)"
          >
            <p class="meta">0{{ index + 1 }}</p>
            <h3>{{ item.name }}</h3>
            <p>{{ item.intro }}</p>
            <span class="lumia-link">
              {{ text.readProjects }}
            </span>
          </article>
        </div>
      </div>
    </section>

    <section class="lumia-section partners-section">
      <div class="lumia-container">
        <p class="lumia-eyebrow lumia-fade-up" style="--delay: 80ms">
          {{ text.partnerEyebrow }}
        </p>
        <h2 class="section-title lumia-fade-up" style="--delay: 120ms">
          {{ text.partnerTitle }}
        </h2>
        <div class="partners-panel lumia-fade-up" style="--delay: 160ms">
          <div
            class="partners-orbit"
            role="list"
            :aria-label="text.partnerEyebrow"
          >
            <article
              v-for="item in partnerLogos"
              :key="item.id"
              class="partner-bubble"
              :style="bubbleStyle(item)"
              role="listitem"
            >
              <img :src="item.logo" :alt="item.name" loading="lazy" />
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { homeData } from "@/data/home";
import {
  formatNewsDate,
  getNewsTitle,
  isExternalNews,
  isInternalNews,
  newsData,
} from "@/data/news";
import { RESEARCH_TAGS } from "@/data/researchTags";
import alibabaLogo from "@/assets/partners/阿里巴巴logo.svg";
import huaweiLogo from "@/assets/partners/华为logo.svg";
import tencentLogo from "@/assets/partners/腾讯logo.svg";
import alipayLogo from "@/assets/partners/支付宝_logo.svg";
import tsinghuaLogo from "@/assets/partners/清华大学-logo.svg";
import njuLogo from "@/assets/partners/南京大学-logo.svg";
import horizonLogo from "@/assets/partners/horizonrobotics.png";
import shaiLabLogo from "@/assets/partners/shailab.png";
import siiLogo from "@/assets/partners/sii.png";

const I18N = {
  en: {
    siteLabel: "Shanghai Jiao Tong University",
    labName: "LUMIA Lab",
    heroDesc:
      "We build machine intelligence systems that acquire, reason, and interact with abstract concepts from data.",
    seeResearch: "See Research",
    meetPeople: "Meet People",
    latestWork: "Latest Work",
    openScience: "Open Science",
    researchCommunity: "Research Community",
    featured: "Featured",
    focusAreas: "Current Focus Areas",
    readProjects: "Read projects",
    updates: "Updates",
    labNews: "Lab News",
    latestNewsLink: "Lab News",
    contactUs: "Contact Us (Collab/Admissions)",
    partnerEyebrow: "Partners",
    partnerTitle: "Academic & Industry Collaborators",
  },
  zh: {
    siteLabel: "上海交通大学",
    labName: "LUMIA实验室",
    heroDesc:
      "我们专注于构建能够从数据中学习、推理并与抽象概念交互的智能系统。",
    seeResearch: "查看研究",
    meetPeople: "认识成员",
    latestWork: "最新工作",
    openScience: "开放科学",
    researchCommunity: "研究社区",
    featured: "焦点方向",
    focusAreas: "当前研究重点",
    readProjects: "查看项目",
    updates: "动态",
    labNews: "实验室新闻",
    latestNewsLink: "实验室新闻",
    contactUs: "联系我们（合作/招生）",
    partnerEyebrow: "合作伙伴",
    partnerTitle: "学术与产业合作网络",
  },
};

export default {
  name: "homepage",
  data() {
    return {
      homeData,
      newsData,
      currentLanguage: "zh",
      displayedHeroDesc: "",
      isTypingHeroDesc: false,
      typingTimer: null,
      typingIndex: 0,
    };
  },
  computed: {
    text() {
      return I18N[this.currentLanguage] || I18N.zh;
    },
    featuredCards() {
      const lang = this.currentLanguage === "en" ? "en" : "zh";
      return RESEARCH_TAGS.slice(0, 4).map((tag) => ({
        id: tag.id,
        name: tag.name[lang] || tag.name.zh,
        intro: tag.intro[lang] || tag.intro.zh,
      }));
    },
    newsItems() {
      return this.newsData.newsList || [];
    },
    partnerLogos() {
      return [
        {
          id: "partner-01",
          name: "Tsinghua University",
          logo: tsinghuaLogo,
          x: 17,
          y: 19,
          size: 102,
          duration: 5.6,
          delay: 0.2,
          lift: 14,
          sway: 3,
          logoScale: 1.35,
        },
        {
          id: "partner-02",
          name: "Nanjing University",
          logo: njuLogo,
          x: 44,
          y: 14,
          size: 102,
          duration: 6.0,
          delay: 0.6,
          lift: 12,
          sway: 2,
          logoScale: 1.35,
        },
        {
          id: "partner-03",
          name: "Huawei",
          logo: huaweiLogo,
          x: 80,
          y: 22,
          size: 102,
          duration: 5.4,
          delay: 1.1,
          lift: 16,
          sway: 4,
          logoScale: 1.1,
        },
        {
          id: "partner-04",
          name: "Tencent",
          logo: tencentLogo,
          x: 15,
          y: 49,
          size: 102,
          duration: 6.3,
          delay: 0.8,
          lift: 11,
          sway: 2,
          logoScale: 1.8,
        },
        {
          id: "partner-05",
          name: "Alipay",
          logo: alipayLogo,
          x: 57,
          y: 43,
          size: 102,
          duration: 5.2,
          delay: 0.1,
          lift: 15,
          sway: 3,
          logoScale: 1.6,
        },
        {
          id: "partner-06",
          name: "Horizon Robotics",
          logo: horizonLogo,
          x: 85,
          y: 53,
          size: 102,
          duration: 6.1,
          delay: 1.3,
          lift: 12,
          sway: 3,
          logoScale: 1.55,
        },
        {
          id: "partner-07",
          name: "SHAI Lab",
          logo: shaiLabLogo,
          x: 23,
          y: 80,
          size: 102,
          duration: 5.8,
          delay: 0.5,
          lift: 14,
          sway: 4,
          logoScale: 1.35,
        },
        {
          id: "partner-08",
          name: "SII",
          logo: siiLogo,
          x: 50,
          y: 84,
          size: 102,
          duration: 6.4,
          delay: 0.9,
          lift: 13,
          sway: 2,
          logoScale: 1.1,
        },
        {
          id: "partner-09",
          name: "Alibaba",
          logo: alibabaLogo,
          x: 75,
          y: 74,
          size: 102,
          duration: 5.5,
          delay: 1.0,
          lift: 16,
          sway: 3,
          logoScale: 1.65,
        },
      ];
    },
  },
  mounted() {
    this.initLanguage();
    window.addEventListener("lumia-language-change", this.onLanguageChange);
    window.addEventListener("lumia-preloader-hidden", this.onPreloaderHidden);

    if (this.shouldDeferHeroDescTyping()) {
      this.displayedHeroDesc = "";
      this.isTypingHeroDesc = false;
      return;
    }

    this.startHeroDescTyping();
  },
  beforeDestroy() {
    this.stopHeroDescTyping();
    window.removeEventListener("lumia-language-change", this.onLanguageChange);
    window.removeEventListener("lumia-preloader-hidden", this.onPreloaderHidden);
  },
  methods: {
    shouldDeferHeroDescTyping() {
      if (typeof window === "undefined" || typeof document === "undefined") {
        return false;
      }

      if (window.__lumiaPreloaderHidden === true) {
        return false;
      }

      const preloader = document.getElementById("lumia-preloader");
      if (!preloader) {
        return false;
      }

      if (
        preloader.dataset.hidden === "true" ||
        preloader.classList.contains("is-hidden")
      ) {
        return false;
      }

      return true;
    },
    onPreloaderHidden() {
      this.startHeroDescTyping();
    },
    stopHeroDescTyping() {
      if (this.typingTimer !== null) {
        clearTimeout(this.typingTimer);
        this.typingTimer = null;
      }
    },
    startHeroDescTyping() {
      this.stopHeroDescTyping();

      const sentence = (this.text && this.text.heroDesc) || "";
      const chars = Array.from(sentence);
      this.displayedHeroDesc = "";
      this.typingIndex = 0;

      if (!chars.length) {
        this.isTypingHeroDesc = false;
        return;
      }

      const reduceMotion =
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        this.displayedHeroDesc = sentence;
        this.isTypingHeroDesc = false;
        return;
      }

      this.isTypingHeroDesc = true;

      const typeNext = () => {
        if (this.typingIndex >= chars.length) {
          this.isTypingHeroDesc = false;
          this.typingTimer = null;
          return;
        }

        const char = chars[this.typingIndex];
        this.displayedHeroDesc += char;
        this.typingIndex += 1;

        let delay = 34;
        if (/[，。,\.!?！？；;：:]/.test(char)) {
          delay = 110;
        } else if (/\s/.test(char)) {
          delay = 18;
        }

        this.typingTimer = setTimeout(typeNext, delay);
      };

      this.typingTimer = setTimeout(typeNext, 120);
    },
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
        this.startHeroDescTyping();
      }
    },
    go(name) {
      if (this.$route.name !== name) {
        this.$router.push({ name });
      }
    },
    goToResearchTag(tagId) {
      const nextTag = typeof tagId === "string" ? tagId : "";
      const currentTag =
        typeof this.$route.query.tag === "string" ? this.$route.query.tag : "";
      if (this.$route.name === "research" && currentTag === nextTag) {
        return;
      }
      const query = nextTag ? { tag: nextTag } : {};
      this.$router.push({ name: "research", query }).catch(() => {});
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
    bubbleStyle(item) {
      return {
        "--x": `${item.x}%`,
        "--y": `${item.y}%`,
        "--size": `${item.size}px`,
        "--duration": `${item.duration}s`,
        "--delay": `${item.delay}s`,
        "--lift": `${item.lift}px`,
        "--lift-mid": `${Math.round(item.lift * 0.58)}px`,
        "--sway": `${item.sway}px`,
        "--logo-scale": `${item.logoScale || 1}`,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.hero {
  padding-top: 84px;
}

.hero-grid {
  display: block;
}

.hero-copy {
  .hero-desc-typing {
    min-height: 3.2em;
  }

  .hero-typing-cursor {
    display: inline-block;
    width: 0.52ch;
    margin-left: 2px;
    border-right: 2px solid rgba(102, 46, 125, 0.65);
    animation: heroTypingBlink 0.9s steps(1, end) infinite;
    transform: translateY(2px);
  }

  .hero-actions {
    margin-top: 30px;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
  }

  .hero-action-btn {
    border: 1.5px solid var(--lumia-primary);
    background: transparent;
    color: var(--lumia-primary);
    border-radius: 999px;
    padding: 12px 22px;
    min-height: 46px;
    font-size: 15px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1.2;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.25s ease,
      background-color 0.25s ease, color 0.25s ease;

    &:hover {
      transform: translateY(-1px);
      background: var(--lumia-primary);
      color: var(--lumia-white);
      box-shadow: 0 10px 26px rgba(102, 46, 125, 0.14);
    }
  }
}

@keyframes heroTypingBlink {
  0%,
  45% {
    opacity: 1;
  }
  46%,
  100% {
    opacity: 0;
  }
}

.partners-panel {
  border: 1px solid rgba(102, 46, 125, 0.13);
  border-radius: 26px;
  background: linear-gradient(165deg, #ffffff 0%, #faf7fd 100%);
  min-height: 520px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 210px;
    height: 210px;
    top: -104px;
    right: -80px;
    border-radius: 999px;
    background: radial-gradient(
      circle,
      rgba(102, 46, 125, 0.09) 0%,
      rgba(102, 46, 125, 0) 70%
    );
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    width: 180px;
    height: 180px;
    bottom: -92px;
    left: -64px;
    border-radius: 999px;
    background: radial-gradient(
      circle,
      rgba(161, 217, 232, 0.14) 0%,
      rgba(161, 217, 232, 0) 72%
    );
    pointer-events: none;
  }
}

.featured-section,
.news-preview,
.partners-section {
  padding-top: 56px;
  border-top: 1px solid var(--lumia-border);
}

.partners-section {
  .section-title {
    margin: 12px 0 30px;
  }

  .partners-panel {
    margin-top: 0;
  }
}

.partners-orbit {
  position: relative;
  border-radius: 22px;
  border: 1px solid rgba(102, 46, 125, 0.1);
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.84) 0%,
      rgba(253, 250, 255, 0.82) 100%
    ),
    radial-gradient(
      circle at 22% 12%,
      rgba(255, 255, 255, 0.68) 0%,
      rgba(255, 255, 255, 0) 42%
    );
  min-height: 390px;
  flex: 1;
  overflow: hidden;
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.36) 0%,
      rgba(255, 255, 255, 0) 30%
    );
    pointer-events: none;
  }
}

.partner-bubble {
  --bubble-scale: 1;
  --bubble-hover-scale: 1.08;
  --bubble-render-size: calc(var(--size) * var(--bubble-scale));
  --bubble-hover-size: calc(
    var(--size) * var(--bubble-scale) * var(--bubble-hover-scale)
  );
  --bubble-safe-x: calc((var(--bubble-hover-size) * 0.5) + var(--sway) + 16px);
  --bubble-safe-y: calc((var(--bubble-hover-size) * 0.5) + var(--lift) + 18px);
  position: absolute;
  left: clamp(var(--bubble-safe-x), var(--x), calc(100% - var(--bubble-safe-x)));
  top: clamp(var(--bubble-safe-y), var(--y), calc(100% - var(--bubble-safe-y)));
  width: var(--bubble-render-size);
  height: var(--bubble-render-size);
  transform: translate(-50%, -50%);
  border-radius: 999px;
  border: 1px solid rgba(102, 46, 125, 0.11);
  background: linear-gradient(
    155deg,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(248, 245, 252, 0.97) 100%
  );
  box-shadow: 0 10px 24px rgba(102, 46, 125, 0.075),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: partnerFloat var(--duration) cubic-bezier(0.37, 0.01, 0.29, 1)
    infinite;
  animation-delay: var(--delay);
  transition: width 0.25s ease, height 0.25s ease, box-shadow 0.25s ease,
    border-color 0.25s ease;
  backdrop-filter: blur(1.5px);
  -webkit-backdrop-filter: blur(1.5px);

  &::after {
    content: "";
    position: absolute;
    inset: 7px;
    border-radius: 999px;
    border: 1px solid rgba(102, 46, 125, 0.06);
    pointer-events: none;
  }

  &:hover {
    width: var(--bubble-hover-size);
    height: var(--bubble-hover-size);
    border-color: rgba(102, 46, 125, 0.17);
    box-shadow: 0 14px 28px rgba(102, 46, 125, 0.11),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
    z-index: 2;
  }

  img {
    width: 76%;
    height: 76%;
    object-fit: contain;
    display: block;
    opacity: 1;
    filter: none;
    transition: transform 0.25s ease;
    transform: scale(var(--logo-scale, 1));
  }

  &:hover img {
    transform: scale(calc(var(--logo-scale, 1) * 1.09));
  }
}

@keyframes partnerFloat {
  0%,
  100% {
    transform: translate(-50%, -50%) translateY(0);
  }
  25% {
    transform: translate(-50%, -50%)
      translate(var(--sway), calc(var(--lift-mid) * -1));
  }
  50% {
    transform: translate(-50%, -50%) translateY(calc(var(--lift) * -1));
  }
  75% {
    transform: translate(-50%, -50%)
      translate(calc(var(--sway) * -1), calc(var(--lift-mid) * -1));
  }
}

.featured-section {
  border-bottom: 1px solid var(--lumia-border);

  .lumia-grid-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .section-title {
    margin: 12px 0 30px;
  }

  .feature-card {
    border-radius: 24px;
    border: 1px solid rgba(102, 46, 125, 0.2);
    background: var(--lumia-white);
    padding: 26px;
    cursor: pointer;
    transition: transform 0.2s ease, border-color 0.2s ease,
      box-shadow 0.2s ease;

    &:hover,
    &:focus-visible {
      transform: translateY(-2px);
      border-color: rgba(102, 46, 125, 0.34);
      box-shadow: 0 14px 30px rgba(102, 46, 125, 0.1);
      outline: none;
    }

    &:hover .lumia-link,
    &:focus-visible .lumia-link {
      text-decoration-color: var(--lumia-primary);
    }

    &:nth-child(3n + 1) {
      background: linear-gradient(155deg, #ffffff 0%, #fff9eb 100%);
    }

    &:nth-child(3n + 2) {
      background: linear-gradient(155deg, #ffffff 0%, #eef9fd 100%);
    }

    &:nth-child(3n + 3) {
      background: linear-gradient(155deg, #ffffff 0%, #fff1f7 100%);
    }

    .meta {
      margin-bottom: 22px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.12em;
      opacity: 0.8;
    }

    h3 {
      font-family: "Space Grotesk", sans-serif;
      font-size: 28px;
      line-height: 1.15;
      margin-bottom: 14px;
    }

    p {
      line-height: 1.65;
      margin-bottom: 18px;
    }

    .lumia-link {
      color: inherit;
      display: inline-flex;
      text-decoration: underline;
      text-decoration-color: transparent;
      text-underline-offset: 0.24em;
      transition: text-decoration-color 0.25s ease;
    }
  }
}

.news-preview {
  .section-title {
    margin: 12px 0 22px;
  }

  .preview-list {
    margin: 34px 0 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .news-item {
    min-height: 86px;
    padding: 22px 24px;
    border: 1px solid rgba(102, 46, 125, 0.2);
    border-radius: 24px;
    background: var(--lumia-white);
    display: flex;
    align-items: stretch;

    &:nth-child(3n + 1) {
      background: linear-gradient(155deg, #ffffff 0%, #fff9eb 100%);
    }

    &:nth-child(3n + 2) {
      background: linear-gradient(155deg, #ffffff 0%, #eef9fd 100%);
    }

    &:nth-child(3n + 3) {
      background: linear-gradient(155deg, #ffffff 0%, #fff1f7 100%);
    }

    .news-link {
      color: inherit;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 18px;
      line-height: 1.45;
      font-size: 19px;
      font-weight: 600;
      text-decoration: none;
      transition: color 0.25s ease;

      &:hover {
        color: var(--lumia-primary-strong);

        .news-text {
          text-decoration-color: var(--lumia-primary);
        }
      }
    }

    .news-date {
      display: block;
      flex: 0 0 104px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.08em;
      line-height: 1.2;
      text-transform: uppercase;
      opacity: 0.72;
    }

    .news-text {
      flex: 1;
      text-decoration: underline;
      text-decoration-color: transparent;
      text-underline-offset: 0.22em;
      transition: text-decoration-color 0.25s ease;
    }
  }
}

.section-title {
  font-family: "Space Grotesk", sans-serif;
  font-size: clamp(28px, 3.8vw, 52px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

@media (max-width: 1100px) {
  .news-preview .preview-list {
    grid-template-columns: 1fr;
  }

  .hero {
    padding-top: 62px;
  }

  .featured-section {
    .lumia-grid-3 {
      grid-template-columns: 1fr;
    }
  }
}

@media (max-width: 649px) {
  .hero-copy {
    .hero-action-btn {
      min-width: 140px;
    }
  }

  .partners-panel {
    min-height: 420px;
    padding: 18px;
  }

  .partners-orbit {
    min-height: 320px;
  }

  .partner-bubble {
    --bubble-scale: 0.78;
    --bubble-hover-scale: 1.05;
  }

  .featured-section {
    .feature-card h3 {
      font-size: 24px;
    }
  }

  .news-preview {
    .news-item {
      min-height: 0;
      padding: 20px;
    }

    .news-link {
      align-items: flex-start;
      flex-direction: column;
      gap: 8px;
      font-size: 16px;
    }

    .news-date {
      flex-basis: auto;
    }
  }
}
</style>
