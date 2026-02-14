<template>
  <div class="home-page">
    <section class="hero mila-section">
      <div class="mila-container hero-grid">
        <div class="hero-copy mila-fade-up" style="--delay: 80ms">
          <p class="mila-eyebrow">Quebec-Inspired Research Website</p>
          <h1 class="mila-title">{{ homeData.name }}</h1>
          <p class="mila-subtitle">
            {{ homeData.desc }}
          </p>
          <div class="hero-actions">
            <button class="mila-btn" @click="go('research')">See Research</button>
            <button class="mila-btn ghost" @click="go('people')">Meet People</button>
          </div>
        </div>

        <div class="hero-visual mila-fade-up" style="--delay: 180ms">
          <article class="visual-card primary">
            <img :src="heroImage" alt="project" />
            <p>Latest Work</p>
          </article>
          <article class="visual-card secondary">
            <img src="/static/testimg2.png" alt="activity" />
            <p>Open Science</p>
          </article>
          <article class="visual-card tertiary">
            <img src="/static/testpeople.png" alt="team" />
            <p>Research Community</p>
          </article>
        </div>
      </div>
    </section>

    <section class="mila-section featured-section">
      <div class="mila-container">
        <p class="mila-eyebrow mila-fade-up" style="--delay: 80ms">Featured</p>
        <h2 class="section-title mila-fade-up" style="--delay: 120ms">
          Current Focus Areas
        </h2>
        <div class="mila-grid-3">
          <article
            v-for="(item, index) in featuredCards"
            :key="item.id"
            class="feature-card mila-fade-up"
            :style="{ '--delay': `${160 + index * 80}ms` }"
          >
            <p class="meta">0{{ index + 1 }}</p>
            <h3>{{ item.name }}</h3>
            <p>{{ item.intro }}</p>
            <button class="mila-link" @click="go('research')">Read projects</button>
          </article>
        </div>
      </div>
    </section>

    <section class="mila-section news-preview">
      <div class="mila-container preview-grid">
        <div class="preview-left mila-fade-up" style="--delay: 80ms">
          <p class="mila-eyebrow">Updates</p>
          <h2 class="section-title">Lab News</h2>
          <button class="mila-link" @click="go('news')">Open all news</button>
        </div>
        <div class="preview-list">
          <article
            v-for="(news, index) in latestNews"
            :key="`${index}-${news}`"
            class="news-item mila-fade-up"
            :style="{ '--delay': `${120 + index * 70}ms` }"
          >
            <p>{{ news }}</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { homeData } from "@/data/home";
import { newsData } from "@/data/news";

export default {
  name: "homepage",
  data() {
    return {
      homeData,
      newsData,
    };
  },
  computed: {
    featuredCards() {
      const fallback = [
        {
          id: "f1",
          name: "Foundation Models",
          intro: "Efficient training and adaptation of large language models for real-world use.",
        },
        {
          id: "f2",
          name: "Multimodal Intelligence",
          intro: "Cross-modal reasoning across text, speech, and visual signals.",
        },
        {
          id: "f3",
          name: "Trustworthy AI",
          intro: "Interpretability, safety, and robust evaluation for deployment.",
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
    latestNews() {
      return (this.newsData.newsList || []).slice(0, 4);
    },
    heroImage() {
      const fromData =
        this.homeData.projectList &&
        this.homeData.projectList[0] &&
        this.homeData.projectList[0].img;
      return fromData || "/static/testimg.png";
    },
  },
  methods: {
    go(name) {
      if (this.$route.name !== name) {
        this.$router.push({ name });
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
      color: var(--mila-primary);
    }

    &.primary {
      grid-row: span 2;
      min-height: 390px;
    }

    &.secondary {
      background: var(--mila-card-a);
    }

    &.tertiary {
      background: var(--mila-card-b);
    }
  }
}

.featured-section {
  border-top: 1px solid var(--mila-border);
  border-bottom: 1px solid var(--mila-border);

  .section-title {
    margin: 12px 0 30px;
  }

  .feature-card {
    border-radius: 24px;
    border: 1px solid rgba(102, 46, 125, 0.2);
    background: var(--mila-white);
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

    .mila-link {
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
    background: var(--mila-white);
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
