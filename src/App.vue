<template>
  <div id="app">
    <app-header v-show="!hideHeaderList.includes($route.name)" />
    <main class="site-main">
      <router-view />
    </main>
    <theme-switcher />
    <footer v-if="!hideHeaderList.includes($route.name)" class="site-footer">
      <div class="lumia-container">
        <div class="footer-top lumia-fade-up" style="--delay: 80ms">
          <div>
            <p class="lumia-eyebrow">{{ text.groupName }}</p>
            <h2>{{ text.footerHeadline }}</h2>
          </div>
          <a
            class="lumia-link"
            href="https://github.com/LUMIA-Group"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ text.visitGithub }}
          </a>
        </div>
        <ul class="footer-links lumia-fade-up" style="--delay: 160ms">
          <li v-for="item in footerLinks" :key="item.value" @click="go(item)">
            {{ item.label }}
          </li>
        </ul>
        <p class="footer-note">© 2026 {{ text.groupName }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import appHeader from "@/components/Header.vue";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import { siteTextOverrides } from "@/data/siteText";

const I18N = {
  en: {
    groupName: "LUMIA Group",
    footerHeadline: "Machine Learning, Language Intelligence, and Applications",
    visitGithub: "Visit Github",
    home: "Home",
    people: "People",
    research: "Research",
    news: "News",
    contact: "Contact",
  },
  zh: {
    groupName: "LUMIA实验室",
    footerHeadline: "机器学习、语言智能与应用",
    visitGithub: "访问 Github",
    home: "主页",
    people: "成员",
    research: "研究",
    news: "新闻",
    contact: "联系我们",
  },
};

export default {
  components: {
    appHeader,
    ThemeSwitcher,
  },
  data() {
    return {
      hideHeaderList: [],
      currentLanguage: "zh",
    };
  },
  computed: {
    text() {
      return {
        ...(I18N[this.currentLanguage] || I18N.zh),
        ...((siteTextOverrides[this.currentLanguage] || {}).app || {}),
      };
    },
    footerLinks() {
      return [
        { value: "home", label: this.text.home },
        { value: "people", label: this.text.people },
        { value: "research", label: this.text.research },
        { value: "news", label: this.text.news },
        { value: "contact", label: this.text.contact },
      ];
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
    go(item) {
      if (item.type === "link") {
        window.open(item.value, "_blank");
        return;
      }
      if (this.$route.name !== item.value) {
        this.$router.push({ name: item.value });
      }
    },
  },
};
</script>

<style>
@import url("./reset.css");
@import url("./styles/theme.css");
</style>

<style lang="less">
#app {
  color: var(--lumia-text);
}

.site-main {
  min-height: calc(100vh - 300px);
}

.site-footer {
  margin-top: 90px;
  border-top: 1px solid var(--lumia-border);
  border-bottom: 1px solid var(--lumia-border);
  padding: 54px 0 34px;

  .footer-top {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;

    h2 {
      margin-top: 12px;
      font-family: var(--lumia-heading-font);
      font-size: clamp(26px, 3.5vw, 44px);
      font-weight: 600;
      line-height: 1.15;
      max-width: 760px;
      letter-spacing: -0.02em;
    }
  }

  .footer-links {
    margin-top: 34px;
    margin-bottom: 34px;
    display: flex;
    flex-wrap: wrap;
    gap: 14px 36px;

    li {
      font-size: 16px;
      font-weight: 600;
      text-decoration: underline;
      text-decoration-color: transparent;
      text-underline-offset: 0.28em;
      cursor: pointer;
      transition: text-decoration-color 0.25s ease;

      &:hover {
        text-decoration-color: var(--lumia-primary);
      }
    }
  }

  .footer-note {
    font-size: 13px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.75;
  }
}

@media (max-width: 999px) {
  .site-main {
    min-height: calc(100vh - 240px);
  }

  .site-footer {
    margin-top: 60px;
    padding-top: 42px;

    .footer-top {
      flex-direction: column;
      align-items: flex-start;
    }

    .footer-links {
      gap: 12px 20px;
    }
  }
}
</style>
