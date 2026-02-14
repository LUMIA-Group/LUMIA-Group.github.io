<template>
  <div class="people-page">
    <section class="mila-section people-hero">
      <div class="mila-container">
        <p class="mila-eyebrow mila-fade-up" style="--delay: 80ms">Directory</p>
        <h1 class="mila-title mila-fade-up" style="--delay: 120ms">People</h1>
        <p class="mila-subtitle mila-fade-up" style="--delay: 160ms">
          Researchers, students, and collaborators pushing language intelligence
          and trustworthy AI forward.
        </p>
      </div>
    </section>

    <section
      v-for="(section, sectionIndex) in peopleSections"
      :key="section.title"
      class="people-section mila-section"
    >
      <div class="mila-container">
        <div class="section-head mila-fade-up" :style="{ '--delay': `${80 + sectionIndex * 50}ms` }">
          <h2>{{ section.title }}</h2>
          <p>{{ section.list.length }} members</p>
        </div>

        <ul class="people-grid">
          <li
            v-for="(item, index) in section.list"
            :key="`${section.title}-${index}`"
            class="people-card mila-fade-up"
            :style="{ '--delay': `${120 + index * 45}ms` }"
          >
            <div class="avatar-wrap">
              <img :src="item.pic || defaultImg" :alt="item.name" />
            </div>
            <h3 class="name" @click="goto(item.homepage)">{{ item.name }}</h3>
            <p class="bio">{{ item.grade }}</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { peopleData } from "@/data/people";
import defaultImg from "@/assets/default.jpg";

export default {
  data() {
    return {
      peopleData,
      defaultImg,
    };
  },
  computed: {
    peopleSections() {
      return Object.entries(this.peopleData)
        .filter(([, value]) => Array.isArray(value) && value.length > 0)
        .map(([title, list]) => ({ title, list }));
    },
  },
  methods: {
    goto(url) {
      if (url) {
        window.open(url, "_blank");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.people-hero {
  padding-top: 76px;
  border-bottom: 1px solid var(--mila-border);
}

.people-section {
  padding-top: 54px;
  padding-bottom: 54px;

  &:nth-child(even) {
    background: rgba(255, 255, 255, 0.5);
  }

  + .people-section {
    border-top: 1px solid rgba(102, 46, 125, 0.16);
  }
}

.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 24px;

  h2 {
    font-family: "Space Grotesk", sans-serif;
    font-size: clamp(30px, 4vw, 44px);
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  p {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
}

.people-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.people-card {
  background: var(--mila-white);
  border: 1px solid rgba(102, 46, 125, 0.18);
  border-radius: 24px;
  padding: 16px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 28px rgba(102, 46, 125, 0.14);
  }

  &:nth-child(4n + 1) {
    background: linear-gradient(160deg, #ffffff 0%, #fff8e6 100%);
  }

  &:nth-child(4n + 2) {
    background: linear-gradient(160deg, #ffffff 0%, #ecf8fc 100%);
  }

  &:nth-child(4n + 3) {
    background: linear-gradient(160deg, #ffffff 0%, #fff0f7 100%);
  }

  &:nth-child(4n + 4) {
    background: linear-gradient(160deg, #ffffff 0%, #f3f0ff 100%);
  }

  .avatar-wrap {
    border-radius: 18px;
    overflow: hidden;
    aspect-ratio: 1 / 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      filter: saturate(0.92);
    }
  }

  .name {
    margin-top: 16px;
    margin-bottom: 10px;
    font-size: 22px;
    font-family: "Space Grotesk", sans-serif;
    font-weight: 700;
    line-height: 1.15;
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 0.18em;
    transition: text-decoration-color 0.25s ease;

    &:hover {
      text-decoration-color: var(--mila-primary);
    }
  }

  .bio {
    font-size: 15px;
    line-height: 1.55;
    opacity: 0.9;
  }
}

@media (max-width: 1279px) {
  .people-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 999px) {
  .section-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .people-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 649px) {
  .people-grid {
    grid-template-columns: 1fr;
  }

  .people-card .name {
    font-size: 20px;
  }
}
</style>
