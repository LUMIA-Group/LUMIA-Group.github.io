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
import { getLocalizedResearchTags } from "@/data/researchTags";
import { siteTextOverrides } from "@/data/siteText";
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
      currentLanguage: "zh",
      displayedHeroDesc: "",
      isTypingHeroDesc: false,
      typingTimer: null,
      typingIndex: 0,
    };
  },
  computed: {
    text() {
      return {
        ...(I18N[this.currentLanguage] || I18N.zh),
        ...((siteTextOverrides[this.currentLanguage] || {}).home || {}),
      };
    },
    featuredCards() {
      return getLocalizedResearchTags(this.currentLanguage).slice(0, 4);
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
.home-page {
  --home-surface: rgba(255, 255, 255, 0.62);
  --home-surface-hover: rgba(255, 255, 255, 0.9);
  --home-border: rgba(102, 46, 125, 0.13);
  --home-border-hover: rgba(102, 46, 125, 0.4);
  --home-hover-shadow: 0 8px 18px rgba(102, 46, 125, 0.05);
}

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
    transition: box-shadow 0.25s ease, background-color 0.25s ease,
      color 0.25s ease;

    &:hover {
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
  border: 1px solid var(--home-border);
  border-radius: 18px;
  background: var(--home-surface);
  min-height: 520px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.featured-section,
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
  border-radius: 14px;
  border: 1px solid rgba(102, 46, 125, 0.09);
  background: rgba(255, 255, 255, 0.42);
  min-height: 390px;
  flex: 1;
  overflow: hidden;
  position: relative;
  z-index: 1;
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
  border: 1px solid rgba(102, 46, 125, 0.12);
  background: rgba(255, 255, 255, 0.86);
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: partnerFloat var(--duration) cubic-bezier(0.37, 0.01, 0.29, 1)
    infinite;
  animation-delay: var(--delay);
  transition: width 0.25s ease, height 0.25s ease, border-color 0.25s ease;

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
    border-color: var(--home-border-hover);
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
    border-radius: 16px;
    border: 1px solid var(--home-border);
    background: var(--home-surface);
    padding: 26px;
    cursor: pointer;
    transition: background-color 0.2s ease, border-color 0.2s ease,
      box-shadow 0.2s ease;

    &:hover,
    &:focus-visible {
      background: var(--home-surface-hover);
      border-color: var(--home-border-hover);
      box-shadow: var(--home-hover-shadow);
      outline: none;
    }

    &:hover .lumia-link,
    &:focus-visible .lumia-link {
      text-decoration-color: var(--lumia-primary);
    }

    .meta {
      margin-bottom: 22px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.12em;
      opacity: 0.8;
    }

    h3 {
      font-family: var(--lumia-heading-font);
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

.section-title {
  font-family: var(--lumia-heading-font);
  font-size: clamp(28px, 3.8vw, 52px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

@media (max-width: 1100px) {
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

}
</style>
