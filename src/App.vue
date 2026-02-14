<template>
  <div id="app">
    <app-header v-show="!hideHeaderList.includes($route.name)" />
    <main class="site-main">
      <router-view />
    </main>
    <footer v-if="!hideHeaderList.includes($route.name)" class="site-footer">
      <div class="mila-container">
        <div class="footer-top mila-fade-up" style="--delay: 80ms">
          <div>
            <p class="mila-eyebrow">LUMIA Group</p>
            <h2>Machine Learning, Language Intelligence, and Applications</h2>
          </div>
          <a
            class="mila-link"
            href="https://github.com/LUMIA-Group"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Github
          </a>
        </div>
        <ul class="footer-links mila-fade-up" style="--delay: 160ms">
          <li
            v-for="item in footerLinks"
            :key="item.value"
            @click="go(item)"
          >
            {{ item.label }}
          </li>
        </ul>
        <p class="footer-note">© 2026 LUMIA Group</p>
      </div>
    </footer>
  </div>
</template>

<script>
import appHeader from "@/components/Header.vue";

export default {
  components: {
    appHeader,
  },
  data() {
    return {
      hideHeaderList: [],
      footerLinks: [
        { value: "home", label: "Home" },
        { value: "people", label: "People" },
        { value: "research", label: "Research" },
        { value: "news", label: "News" },
        { value: "contact", label: "Contact" },
        {
          value: "https://github.com/LUMIA-Group",
          label: "Github",
          type: "link",
        },
      ],
    };
  },
  methods: {
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
  color: var(--mila-text);
}

.site-main {
  min-height: calc(100vh - 300px);
}

.site-footer {
  margin-top: 90px;
  border-top: 1px solid var(--mila-border);
  border-bottom: 1px solid var(--mila-border);
  padding: 54px 0 34px;

  .footer-top {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;

    h2 {
      margin-top: 12px;
      font-family: "Space Grotesk", sans-serif;
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
        text-decoration-color: var(--mila-primary);
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
