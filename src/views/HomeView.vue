<template>
  <div class="home-page">
    <section class="hero lumia-section">
      <div class="lumia-container hero-grid">
        <div class="hero-copy lumia-fade-up" style="--delay: 80ms">
          <p class="lumia-eyebrow">{{ text.siteLabel }}</p>
          <h1 class="lumia-title">{{ text.labName }}</h1>
          <p class="lumia-subtitle">
            {{ text.heroDesc }}
          </p>
          <div class="hero-actions">
            <button class="lumia-btn" @click="go('research')">{{ text.seeResearch }}</button>
            <button class="lumia-btn ghost" @click="go('people')">{{ text.meetPeople }}</button>
            <div class="hero-related">
              <button class="related-pill" type="button" @click="scrollToNews">
                <span class="pill-dot" aria-hidden="true"></span>
                {{ text.latestNewsLink }}
                <span class="pill-arrow" aria-hidden="true">-&gt;</span>
              </button>
              <button class="related-pill contact" type="button" @click="go('contact')">
                <span class="pill-dot" aria-hidden="true"></span>
                {{ text.contactUs }}
                <span class="pill-arrow" aria-hidden="true">-&gt;</span>
              </button>
            </div>
          </div>
        </div>

        <div class="hero-visual lumia-fade-up" style="--delay: 180ms">
          <article class="visual-card primary">
            <img :src="heroImage" alt="project" />
            <p>{{ text.latestWork }}</p>
          </article>
          <article class="visual-card secondary">
            <img src="/static/testimg2.png" alt="activity" />
            <p>{{ text.openScience }}</p>
          </article>
          <article class="visual-card tertiary">
            <img src="/static/testpeople.png" alt="team" />
            <p>{{ text.researchCommunity }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="lumia-section featured-section">
      <div class="lumia-container">
        <p class="lumia-eyebrow lumia-fade-up" style="--delay: 80ms">{{ text.featured }}</p>
        <h2 class="section-title lumia-fade-up" style="--delay: 120ms">
          {{ text.focusAreas }}
        </h2>
        <div class="lumia-grid-3">
          <article
            v-for="(item, index) in featuredCards"
            :key="item.id"
            class="feature-card lumia-fade-up"
            :style="{ '--delay': `${160 + index * 80}ms` }"
          >
            <p class="meta">0{{ index + 1 }}</p>
            <h3>{{ item.name }}</h3>
            <p>{{ item.intro }}</p>
            <button class="lumia-link" @click="go('research')">{{ text.readProjects }}</button>
          </article>
        </div>
      </div>
    </section>

    <section class="lumia-section news-preview">
      <div class="lumia-container preview-grid">
        <div class="preview-left lumia-fade-up" style="--delay: 80ms">
          <p class="lumia-eyebrow">{{ text.updates }}</p>
          <h2 class="section-title">{{ text.labNews }}</h2>
        </div>
        <div class="preview-list">
          <article
            v-for="(news, index) in newsItems"
            :key="`news-${index}`"
            class="news-item lumia-fade-up"
            :style="{ '--delay': `${120 + index * 70}ms` }"
          >
            <p v-html="news"></p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { homeData } from "@/data/home";

const I18N = {
  en: {
    siteLabel: "LUMIA Research Group Website",
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
  },
  zh: {
    siteLabel: "LUMIA 实验室网站",
    labName: "LUMIA实验室",
    heroDesc: "我们专注于构建能够从数据中学习、推理并与抽象概念交互的智能系统。",
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
  },
};

export default {
  name: "homepage",
  data() {
    return {
      homeData,
      currentLanguage: "zh",
    };
  },
  computed: {
    text() {
      return I18N[this.currentLanguage] || I18N.zh;
    },
    featuredCards() {
      const fallback =
        this.currentLanguage === "zh"
          ? [
              {
                id: "f1",
                name: "基础模型",
                intro: "高效训练与适配大语言模型，推动实际场景落地。",
              },
              {
                id: "f2",
                name: "多模态智能",
                intro: "在文本、语音、视觉信号之间建立更强的跨模态推理能力。",
              },
              {
                id: "f3",
                name: "可信 AI",
                intro: "从可解释性、安全性与鲁棒评测支撑系统化部署。",
              },
            ]
          : [
              {
                id: "f1",
                name: "Foundation Models",
                intro:
                  "Efficient training and adaptation of large language models for real-world use.",
              },
              {
                id: "f2",
                name: "Multimodal Intelligence",
                intro:
                  "Cross-modal reasoning across text, speech, and visual signals.",
              },
              {
                id: "f3",
                name: "Trustworthy AI",
                intro:
                  "Interpretability, safety, and robust evaluation for deployment.",
              },
            ];

      const source = this.homeData.projectList || [];
      return fallback.map((item, index) => ({
        ...item,
        ...(source[index] || {}),
        id: source[index] ? source[index].id : item.id,
        name: source[index] && source[index].name ? source[index].name : item.name,
        intro:
          source[index] && source[index].intro ? source[index].intro : item.intro,
      }));
    },
    newsItems() {
      return [
        'Sep 2023: <a href=\"https://openreview.net/pdf?id=t2hEZadBBk\" target=\"_blank\" rel=\"noopener noreferrer\">One paper</a> got accepted at NeurIPS 2023!',
        'May 2023: Two papers (<a href=\"https://aclanthology.org/2023.acl-long.281/\" target=\"_blank\" rel=\"noopener noreferrer\">[1]</a><a href=\"https://aclanthology.org/2023.findings-acl.570/\" target=\"_blank\" rel=\"noopener noreferrer\">[2]</a>) are accepted at ACL 2023!',
        'Mar. 2023: <a href=\"https://scholar.google.com/citations?user=C-TqDNsAAAAJ\" target=\"_blank\" rel=\"noopener noreferrer\">Yunchong Song</a> has got the ICLR Travel Award, congratulations!',
        'Feb. 2023: Two papers (<a href=\"https://arxiv.org/abs/2302.09509\" target=\"_blank\" rel=\"noopener noreferrer\">[1]</a><a href=\"https://arxiv.org/abs/2304.05361\" target=\"_blank\" rel=\"noopener noreferrer\">[2]</a>) are accepted at ICASSP 2023!',
        'Jan. 2023: <a href=\"https://openreview.net/forum?id=wKPmPBHSnT6\" target=\"_blank\" rel=\"noopener noreferrer\">One paper</a> is accepted at ICLR 2023!',
        'Oct. 2022: Three papers (<a href=\"https://aclanthology.org/2022.emnlp-main.211/\" target=\"_blank\" rel=\"noopener noreferrer\">[1]</a><a href=\"https://aclanthology.org/2022.findings-emnlp.173/\" target=\"_blank\" rel=\"noopener noreferrer\">[2]</a><a href=\"https://aclanthology.org/2022.findings-emnlp.114/\" target=\"_blank\" rel=\"noopener noreferrer\">[3]</a>) are accepted at EMNLP 2022!',
        'Feb. 2022: Two papers (<a href=\"https://aclanthology.org/2022.acl-long.308/\" target=\"_blank\" rel=\"noopener noreferrer\">[1]</a><a href=\"https://aclanthology.org/2022.acl-long.502/\" target=\"_blank\" rel=\"noopener noreferrer\">[2]</a>) are accepted at ACL 2022!',
      ];
    },
    heroImage() {
      const fromData =
        this.homeData.projectList &&
        this.homeData.projectList[0] &&
        this.homeData.projectList[0].img;
      return fromData || "/static/testimg.png";
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
      if (event && event.detail && (event.detail === "en" || event.detail === "zh")) {
        this.currentLanguage = event.detail;
      }
    },
    go(name) {
      if (this.$route.name !== name) {
        this.$router.push({ name });
      }
    },
    scrollToNews() {
      const section = this.$el.querySelector(".news-preview");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.hero {
  padding-top: 84px;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 32px;
  align-items: center;
}

.hero-copy {
  .hero-actions {
    margin-top: 30px;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
  }

  .hero-related {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-left: 8px;
    flex-wrap: wrap;
  }

  .related-pill {
    border: 1px solid rgba(102, 46, 125, 0.24);
    background: rgba(255, 255, 255, 0.8);
    color: var(--lumia-primary);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0;
    border-radius: 999px;
    padding: 9px 13px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    line-height: 1;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.25s ease,
      border-color 0.25s ease,
      background-color 0.25s ease;

    .pill-dot {
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: var(--lumia-primary);
      flex: 0 0 auto;
    }

    .pill-arrow {
      font-size: 11px;
      opacity: 0.75;
      transition: transform 0.2s ease;
    }

    &:hover {
      transform: translateY(-1px);
      border-color: rgba(102, 46, 125, 0.42);
      background: rgba(255, 255, 255, 0.98);
      box-shadow: 0 10px 26px rgba(102, 46, 125, 0.14);

      .pill-arrow {
        transform: translateX(2px);
      }
    }

    &.contact {
      border-color: rgba(181, 95, 41, 0.32);
      color: #8c3d19;

      .pill-dot {
        background: #c65c24;
      }

      &:hover {
        border-color: rgba(181, 95, 41, 0.48);
        box-shadow: 0 10px 24px rgba(198, 92, 36, 0.16);
      }
    }
  }
}

.hero-visual {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  .visual-card {
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid rgba(102, 46, 125, 0.22);
    min-height: 180px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      filter: saturate(0.85);
    }

    p {
      position: absolute;
      left: 14px;
      bottom: 14px;
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.92);
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.09em;
      color: var(--lumia-primary);
    }

    &.primary {
      grid-row: span 2;
      min-height: 390px;
    }

    &.secondary {
      background: var(--lumia-card-a);
    }

    &.tertiary {
      background: var(--lumia-card-b);
    }
  }
}

.featured-section {
  border-top: 1px solid var(--lumia-border);
  border-bottom: 1px solid var(--lumia-border);

  .section-title {
    margin: 12px 0 30px;
  }

  .feature-card {
    border-radius: 24px;
    border: 1px solid rgba(102, 46, 125, 0.2);
    background: var(--lumia-white);
    padding: 26px;

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
      border: none;
      background: transparent;
      padding: 0;
      cursor: pointer;
      color: inherit;
    }
  }
}

.news-preview {
  .preview-grid {
    display: grid;
    grid-template-columns: 0.78fr 1.22fr;
    gap: 24px;
  }

  .section-title {
    margin: 10px 0 22px;
  }

  .preview-list {
    border: 1px solid rgba(102, 46, 125, 0.2);
    border-radius: 24px;
    overflow: hidden;
    background: var(--lumia-white);
  }

  .news-item {
    padding: 22px 24px;
    border-bottom: 1px solid rgba(102, 46, 125, 0.16);

    &:last-child {
      border-bottom: none;
    }

    p {
      line-height: 1.6;
      font-size: 17px;
    }

    :deep(a) {
      text-decoration: underline;
      text-decoration-color: transparent;
      text-underline-offset: 0.22em;
      transition: text-decoration-color 0.25s ease;

      &:hover {
        text-decoration-color: var(--lumia-primary);
      }
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
  .hero-grid,
  .news-preview .preview-grid {
    grid-template-columns: 1fr;
  }

  .hero {
    padding-top: 62px;
  }

  .hero-visual {
    order: -1;
  }
}

@media (max-width: 649px) {
  .hero-copy {
    .hero-related {
      margin-left: 0;
      width: 100%;
    }
  }

  .hero-visual {
    grid-template-columns: 1fr;

    .visual-card.primary {
      min-height: 260px;
      grid-row: auto;
    }

    .visual-card {
      min-height: 180px;
    }
  }

  .featured-section {
    .feature-card h3 {
      font-size: 24px;
    }
  }

  .news-preview {
    .news-item p {
      font-size: 16px;
    }
  }
}
</style>
