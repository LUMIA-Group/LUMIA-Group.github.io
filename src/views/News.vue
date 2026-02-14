<template>
  <div class="news-page">
    <section class="mila-section news-hero">
      <div class="mila-container">
        <p class="mila-eyebrow mila-fade-up" style="--delay: 80ms">Updates</p>
        <h1 class="mila-title mila-fade-up" style="--delay: 120ms">News</h1>
        <p class="mila-subtitle mila-fade-up" style="--delay: 160ms">
          Recent publications, awards, and lab milestones.
        </p>
      </div>
    </section>

    <section class="mila-section news-listing">
      <div class="mila-container">
        <ol class="timeline">
          <li
            v-for="(item, index) in newsData.newsList"
            :key="`${index}-${item}`"
            class="timeline-item mila-fade-up"
            :style="{ '--delay': `${100 + index * 70}ms` }"
          >
            <div class="timeline-marker">{{ index + 1 }}</div>
            <p>{{ item }}</p>
          </li>
        </ol>
      </div>
    </section>
  </div>
</template>

<script>
import { newsData } from "@/data/news";

export default {
  data() {
    return {
      newsData,
    };
  },
};
</script>

<style lang="less" scoped>
.news-hero {
  padding-top: 76px;
  border-bottom: 1px solid var(--mila-border);
}

.news-listing {
  .timeline {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .timeline-item {
    background: var(--mila-white);
    border: 1px solid rgba(102, 46, 125, 0.18);
    border-radius: 20px;
    padding: 18px 20px;
    display: grid;
    grid-template-columns: 48px 1fr;
    gap: 14px;
    align-items: center;

    &:nth-child(3n + 1) {
      background: linear-gradient(150deg, #ffffff 0%, #fff6df 100%);
    }

    &:nth-child(3n + 2) {
      background: linear-gradient(150deg, #ffffff 0%, #eef8fd 100%);
    }

    &:nth-child(3n + 3) {
      background: linear-gradient(150deg, #ffffff 0%, #fff0f5 100%);
    }

    .timeline-marker {
      width: 40px;
      height: 40px;
      border-radius: 999px;
      background: var(--mila-primary);
      color: #fff;
      font-size: 13px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      letter-spacing: 0.04em;
    }

    p {
      font-size: 18px;
      line-height: 1.55;
    }
  }
}

@media (max-width: 999px) {
  .news-listing {
    .timeline-item {
      grid-template-columns: 38px 1fr;

      .timeline-marker {
        width: 32px;
        height: 32px;
      }

      p {
        font-size: 16px;
      }
    }
  }
}
</style>
