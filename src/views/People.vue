<template>
  <div class="people-page">
    <section class="lumia-section people-hero">
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
        <div class="people-nav lumia-fade-up" style="--delay: 200ms">
          <button
            v-for="item in peopleJumpLinks"
            :key="item.key"
            class="people-nav-btn"
            type="button"
            @click="scrollToSection(item.key)"
          >
            {{ item.label }}
          </button>
        </div>
      </div>
    </section>

    <section
      v-for="(section, sectionIndex) in peopleSections"
      :key="section.key"
      :id="sectionAnchor(section.key)"
      class="people-section lumia-section"
    >
      <div class="lumia-container">
        <div
          class="section-head lumia-fade-up"
          :style="{ '--delay': `${80 + sectionIndex * 50}ms` }"
        >
          <h2>{{ section.displayTitle }}</h2>
          <p>{{ memberCountText(section.list.length) }}</p>
        </div>

        <ul class="people-grid">
          <li
            v-for="(item, index) in section.list"
            :key="`${section.key}-${index}`"
            class="people-card-item lumia-fade-up"
            :style="{ '--delay': `${120 + index * 45}ms` }"
          >
            <component
              :is="hasHomepage(item) ? 'a' : 'div'"
              class="people-card"
              :class="{ 'has-homepage': hasHomepage(item) }"
              v-bind="homepageAttrs(item)"
            >
              <div class="avatar-wrap">
                <img :src="item.pic || defaultImg" :alt="item.name" />
              </div>
              <h3 class="name">{{ item.name }}</h3>
              <p class="bio">{{ item.bio }}</p>
            </component>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { peopleData } from "@/data/people";
import { siteTextOverrides } from "@/data/siteText";
import defaultImg from "@/assets/default.jpg";

const I18N = {
  en: {
    eyebrow: "Directory",
    title: "People",
    subtitle:
      "Researchers, students, and collaborators pushing language intelligence and trustworthy AI forward.",
    members: "members",
    sectionTitles: {
      Faculty: "Faculty",
      PhD: "PhD Students",
      Master: "Master Students",
      Undergrads: "Undergraduate Students",
      Alumni: "Alumni",
    },
  },
  zh: {
    eyebrow: "成员目录",
    title: "成员",
    subtitle: "推动语言智能与可信 AI 研究前沿的教师、学生与合作伙伴。",
    members: "名成员",
    sectionTitles: {
      Faculty: "教师",
      PhD: "博士生",
      Master: "硕士生",
      Undergrads: "本科生",
      Alumni: "毕业生",
    },
  },
};

export default {
  data() {
    return {
      peopleData,
      defaultImg,
      currentLanguage: "zh",
    };
  },
  computed: {
    text() {
      const base = I18N[this.currentLanguage] || I18N.zh;
      const overrides =
        ((siteTextOverrides[this.currentLanguage] || {}).people || {});
      return {
        ...base,
        ...overrides,
        sectionTitles: {
          ...base.sectionTitles,
          ...(overrides.sectionTitles || {}),
        },
      };
    },
    peopleSections() {
      return Object.entries(this.peopleData)
        .filter(([, value]) => Array.isArray(value) && value.length > 0)
        .map(([title, list]) => ({
          key: title,
          displayTitle: this.text.sectionTitles[title] || title,
          list,
        }));
    },
    peopleJumpLinks() {
      return ["Faculty", "PhD", "Master", "Undergrads", "Alumni"].map((key) => ({
        key,
        label: this.text.sectionTitles[key] || key,
      }));
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
    memberCountText(count) {
      if (this.currentLanguage === "zh") {
        return `${count} ${this.text.members}`;
      }
      return `${count} ${this.text.members}`;
    },
    sectionAnchor(key) {
      return `people-${String(key).toLowerCase()}`;
    },
    scrollToSection(key) {
      const target = document.getElementById(this.sectionAnchor(key));
      if (!target) {
        return;
      }
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    normalizeHomepage(url) {
      return typeof url === "string" ? url.trim().replace(/&amp;/g, "&") : "";
    },
    hasHomepage(item) {
      return Boolean(item && this.normalizeHomepage(item.homepage));
    },
    homepageAttrs(item) {
      const href = this.normalizeHomepage(item && item.homepage);
      if (!href) {
        return {};
      }
      return {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `${item.name} homepage`,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.people-hero {
  padding-top: 76px;
  border-bottom: 1px solid var(--lumia-border);
}

.people-nav {
  margin-top: 30px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.people-nav-btn {
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

  &:hover,
  &:focus-visible {
    background: var(--lumia-primary);
    color: var(--lumia-white);
    box-shadow: 0 10px 26px rgba(var(--lumia-primary-rgb), 0.14);
    outline: none;
  }
}

.people-section {
  padding-top: 54px;
  padding-bottom: 54px;
  scroll-margin-top: 96px;

  &:nth-child(even) {
    background: rgba(255, 255, 255, 0.5);
  }

  + .people-section {
    border-top: 1px solid rgba(var(--lumia-primary-rgb), 0.16);
  }
}

.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 24px;

  h2 {
    font-family: var(--lumia-heading-font);
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

.people-card-item {
  display: block;
  min-width: 0;

  &:nth-child(5n + 1) .people-card {
    --people-card-border: var(--lumia-card-border-blue);
    --people-card-accent: var(--lumia-logo-blue);
    background: linear-gradient(
      160deg,
      #ffffff 0%,
      var(--lumia-card-blue) 100%
    );
  }

  &:nth-child(5n + 2) .people-card {
    --people-card-border: var(--lumia-card-border-red);
    --people-card-accent: var(--lumia-logo-red);
    background: linear-gradient(
      160deg,
      #ffffff 0%,
      var(--lumia-card-red) 100%
    );
  }

  &:nth-child(5n + 3) .people-card {
    --people-card-border: var(--lumia-card-border-purple);
    --people-card-accent: var(--lumia-logo-purple);
    background: linear-gradient(
      160deg,
      #ffffff 0%,
      var(--lumia-card-purple) 100%
    );
  }

  &:nth-child(5n + 4) .people-card {
    --people-card-border: var(--lumia-card-border-yellow);
    --people-card-accent: var(--lumia-logo-yellow);
    background: linear-gradient(
      160deg,
      #ffffff 0%,
      var(--lumia-card-yellow) 100%
    );
  }

  &:nth-child(5n + 5) .people-card {
    --people-card-border: var(--lumia-card-border-green);
    --people-card-accent: var(--lumia-logo-green);
    background: linear-gradient(
      160deg,
      #ffffff 0%,
      var(--lumia-card-green) 100%
    );
  }
}

.people-card {
  --people-card-border: var(--lumia-card-border-blue);
  --people-card-accent: var(--lumia-logo-blue);
  display: block;
  height: 100%;
  box-sizing: border-box;
  background: var(--lumia-white);
  border: 1px solid var(--people-card-border);
  border-radius: 24px;
  padding: 16px;
  color: inherit;
  text-decoration: none;

  &.has-homepage {
    cursor: pointer;
    transition: transform 0.25s ease, border-color 0.25s ease,
      box-shadow 0.25s ease;
  }

  &.has-homepage:hover,
  &.has-homepage:focus-visible {
    transform: translateY(-4px);
    border-color: var(--people-card-accent);
    box-shadow: 0 14px 28px rgba(var(--lumia-primary-rgb), 0.14);
    outline: none;
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
    font-family: var(--lumia-heading-font);
    font-weight: 700;
    line-height: 1.15;
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
