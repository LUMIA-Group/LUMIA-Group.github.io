<template>
  <header
    class="lumia-header"
    :class="{ scrolled: isScrolled, open: mobileMenuOpen }"
  >
    <div class="header-main">
      <div class="lumia-container main-inner">
        <button class="brand" @click="clickHeader({ value: 'home' })">
          <img
            class="logo"
            :src="headerData.logo || defaultLogo"
            alt="LUMIA logo"
          />
          <span class="name">{{ brandName }}</span>
        </button>

        <button
          class="mobile-toggle"
          type="button"
          :aria-label="mobileMenuOpen ? localeText.close : localeText.menu"
          :aria-expanded="mobileMenuOpen ? 'true' : 'false'"
          aria-controls="site-main-nav"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <span class="mobile-toggle-icon" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <nav id="site-main-nav" class="main-nav" :class="{ show: mobileMenuOpen }">
          <div ref="navListWrap" class="nav-list-wrap">
            <ul ref="navList">
              <li
                v-for="item in mainMenu"
                :key="item.value"
                ref="menuNodes"
                class="menu-node"
                :class="{
                  active: isActive(item),
                  hasChildren: item.children && item.children.length,
                }"
              >
                <button
                  class="menu-link"
                  type="button"
                  @click="clickHeader(item)"
                >
                  {{ item.label }}
                </button>

                <ul v-if="item.children && item.children.length" class="submenu">
                  <li
                    v-for="child in item.children"
                    :key="`${item.value}-${child.value}`"
                  >
                    <button
                      class="submenu-link"
                      type="button"
                      @click.stop="clickHeader(child)"
                    >
                      {{ child.label }}
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
            <span
              class="active-indicator"
              :style="activeIndicatorStyle"
              aria-hidden="true"
            ></span>
          </div>

          <div class="language-switcher" aria-label="language switcher">
            <button
              type="button"
              :class="{ active: currentLanguage === 'en' }"
              @click="setLanguage('en')"
            >
              EN
            </button>
            <span>/</span>
            <button
              type="button"
              :class="{ active: currentLanguage === 'zh' }"
              @click="setLanguage('zh')"
            >
              中文
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { headerData } from "@/data/header";
import { siteTextOverrides } from "@/data/siteText";

const I18N = {
  en: {
    home: "Home",
    people: "People",
    research: "Research",
    news: "News",
    contact: "Contact",
    directory: "Directory",
    insights: "Insights",
    menu: "Menu",
    close: "Close",
    labName: "LUMIA Lab",
  },
  zh: {
    home: "主页",
    people: "成员",
    research: "研究",
    news: "新闻",
    contact: "联系我们",
    directory: "成员目录",
    insights: "研究方向",
    menu: "菜单",
    close: "关闭",
    labName: "LUMIA实验室",
  },
};

export default {
  data() {
    return {
      headerData,
      defaultLogo: `${process.env.BASE_URL || "/"}loading-logo.png`,
      mobileMenuOpen: false,
      isScrolled: false,
      currentLanguage: "zh",
      activeIndicatorStyle: {
        opacity: 0,
        transform: "translateX(0px)",
        width: "0px",
      },
    };
  },
  computed: {
    localeText() {
      const base = I18N[this.currentLanguage] || I18N.zh;
      const overrides = siteTextOverrides[this.currentLanguage] || {};
      return {
        ...base,
        labName: (overrides.home || {}).labName || base.labName,
        home: (overrides.home || {}).home || base.home,
        people: (overrides.people || {}).title || base.people,
        research: (overrides.research || {}).title || base.research,
        news: (overrides.news || {}).title || base.news,
        contact: (overrides.contact || {}).title || base.contact,
      };
    },
    brandName() {
      return this.localeText.labName;
    },
    mainMenu() {
      return [
        { value: "home", label: this.localeText.home },
        { value: "people", label: this.localeText.people },
        { value: "research", label: this.localeText.research },
        { value: "news", label: this.localeText.news },
        { value: "contact", label: this.localeText.contact },
      ];
    },
  },
  watch: {
    $route() {
      this.scheduleActiveIndicatorUpdate();
    },
    currentLanguage() {
      this.scheduleActiveIndicatorUpdate();
    },
    mobileMenuOpen() {
      this.scheduleActiveIndicatorUpdate();
    },
  },
  mounted() {
    this.initLanguage();
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    window.addEventListener("resize", this.scheduleActiveIndicatorUpdate, {
      passive: true,
    });
    this.handleScroll();
    this.scheduleActiveIndicatorUpdate();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.scheduleActiveIndicatorUpdate);
  },
  methods: {
    initLanguage() {
      let lang = "zh";
      const saved = localStorage.getItem("lumia_lang");
      if (saved === "en" || saved === "zh") {
        lang = saved;
      } else if (
        typeof navigator !== "undefined" &&
        navigator.language &&
        !navigator.language.toLowerCase().startsWith("zh")
      ) {
        lang = "en";
      }
      this.currentLanguage = lang;
      this.broadcastLanguage();
    },
    setLanguage(lang) {
      if (lang !== "en" && lang !== "zh") {
        return;
      }
      this.currentLanguage = lang;
      localStorage.setItem("lumia_lang", lang);
      this.broadcastLanguage();
    },
    broadcastLanguage() {
      window.dispatchEvent(
        new CustomEvent("lumia-language-change", {
          detail: this.currentLanguage,
        })
      );
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 12;
    },
    isActive(item) {
      if (item.type === "link") {
        return false;
      }
      if (this.$route.name === item.value) {
        return true;
      }
      if (item.value === "news" && this.$route.name === "news-detail") {
        return true;
      }
      if (!item.children || !item.children.length) {
        return false;
      }
      return item.children.some(
        (child) => child.type !== "link" && child.value === this.$route.name
      );
    },
    clickHeader(item) {
      if (item.type === "link") {
        window.open(item.value, "_blank");
      } else if (this.$route.name !== item.value) {
        this.$router.push({ name: item.value });
      }
      this.mobileMenuOpen = false;
    },
    scheduleActiveIndicatorUpdate() {
      this.$nextTick(() => {
        if (typeof window !== "undefined" && window.requestAnimationFrame) {
          window.requestAnimationFrame(this.updateActiveIndicator);
          return;
        }
        this.updateActiveIndicator();
      });
    },
    updateActiveIndicator() {
      const wrap = this.$refs.navListWrap;
      const nodes = this.$refs.menuNodes || [];
      const activeIndex = this.mainMenu.findIndex((item) => this.isActive(item));
      const activeNode = Array.isArray(nodes) ? nodes[activeIndex] : nodes;

      if (!wrap || !activeNode) {
        this.activeIndicatorStyle = {
          opacity: 0,
          transform: "translateX(0px)",
          width: "0px",
        };
        return;
      }

      const activeLink = activeNode.querySelector(".menu-link");
      if (!activeLink) {
        return;
      }

      const wrapRect = wrap.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      this.activeIndicatorStyle = {
        opacity: 1,
        transform: `translateX(${linkRect.left - wrapRect.left}px)`,
        width: `${linkRect.width}px`,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.lumia-header {
  position: sticky;
  top: 0;
  z-index: 90;
  background: linear-gradient(
    90deg,
    var(--lumia-primary-strong) 0%,
    var(--lumia-primary) 56%,
    #522267 100%
  );
  backdrop-filter: blur(10px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &.scrolled {
    border-bottom-color: rgba(255, 255, 255, 0.14);
    box-shadow: 0 10px 28px rgba(39, 21, 56, 0.34);
  }

  &.open {
    .mobile-toggle-icon {
      span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }

      span:nth-child(2) {
        opacity: 0;
      }

      span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }
    }
  }
}

.header-main {
  .main-inner {
    min-height: 84px;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    gap: 24px;
  }

  .brand {
    border: none;
    background: transparent;
    display: inline-flex;
    align-items: center;
    align-self: center;
    gap: 12px;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.96);

    .logo {
      width: 52px;
      height: 52px;
      object-fit: contain;
      object-position: center;
      filter: drop-shadow(0 3px 10px rgba(244, 194, 57, 0.3));
    }

    .name {
      font-family: var(--lumia-heading-font);
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.01em;
    }
  }

  .mobile-toggle {
    display: none;
    width: 44px;
    height: 44px;
    border: 1px solid rgba(255, 255, 255, 0.26);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.08);
    align-self: center;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.94);
    cursor: pointer;
    transition: background-color 0.2s ease, border-color 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.14);
      border-color: rgba(255, 255, 255, 0.42);
    }
  }

  .mobile-toggle-icon {
    width: 20px;
    height: 16px;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;

    span {
      display: block;
      width: 100%;
      height: 2px;
      border-radius: 999px;
      background: currentColor;
      transform-origin: center;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }
  }

  .main-nav {
    display: flex;
    align-items: stretch;
    align-self: stretch;
    gap: 24px;

    .nav-list-wrap {
      position: relative;
      display: flex;
      align-items: stretch;
      height: 100%;
    }

    .nav-list-wrap > ul {
      display: flex;
      align-items: stretch;
      gap: 28px;
      height: 100%;
    }

    .active-indicator {
      position: absolute;
      left: 0;
      bottom: 22px;
      height: 3px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.96);
      pointer-events: none;
      transition: transform 0.28s cubic-bezier(0.2, 0.72, 0.18, 1),
        width 0.28s cubic-bezier(0.2, 0.72, 0.18, 1), opacity 0.2s ease;
    }

    .menu-node {
      position: relative;
      display: flex;
      align-items: stretch;
      height: 100%;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 22px;
        height: 3px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.58);
        opacity: 0;
        transform: scaleX(0.55);
        transition: opacity 0.18s ease, transform 0.22s ease;
        pointer-events: none;
      }

      .menu-link {
        cursor: pointer;
        border: none;
        background: transparent;
        padding: 0 2px;
        height: 100%;
        min-height: 100%;
        display: inline-flex;
        align-items: center;
        font-size: 18px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.9);
        text-decoration: underline;
        text-decoration-color: transparent;
        text-decoration-thickness: 1.4px;
        text-underline-offset: 0.25em;
        transition: color 0.18s ease, opacity 0.15s ease;
      }

      &:not(.active):hover::after,
      &:not(.active):focus-within::after {
        opacity: 1;
        transform: scaleX(1);
      }

      &.active .menu-link {
        color: rgba(255, 255, 255, 0.98);
      }

      .submenu {
        position: absolute;
        left: 0;
        top: calc(100% + 14px);
        min-width: 170px;
        background: #fff;
        border: 1px solid rgba(102, 46, 125, 0.24);
        border-radius: 14px;
        padding: 8px;
        box-shadow: 0 10px 24px rgba(102, 46, 125, 0.14);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateY(8px);
        transition: opacity 0.25s ease, transform 0.25s ease;

        .submenu-link {
          width: 100%;
          border: none;
          background: transparent;
          text-align: left;
          font-size: 15px;
          font-weight: 600;
          color: var(--lumia-primary);
          border-radius: 10px;
          padding: 9px 10px;
          cursor: pointer;

          &:hover {
            background: rgba(102, 46, 125, 0.09);
          }
        }
      }

      &:hover .submenu,
      &:focus-within .submenu {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateY(0);
      }
    }
  }

  .language-switcher {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin-left: 6px;
    padding-left: 18px;
    border-left: 1px solid rgba(255, 255, 255, 0.18);

    button {
      border: none;
      background: transparent;
      color: rgba(255, 255, 255, 0.86);
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      opacity: 0.78;
      padding: 0;
      transition: opacity 0.25s ease, text-decoration-color 0.25s ease;

      &:hover {
        opacity: 1;
      }

      &.active {
        opacity: 1;
        text-decoration: underline;
        text-decoration-thickness: 1.5px;
        text-underline-offset: 0.2em;
      }
    }

    span {
      opacity: 0.45;
      font-size: 12px;
      transform: translateY(-1px);
      color: rgba(255, 255, 255, 0.78);
    }
  }
}

@media (max-width: 1099px) {
  .header-main {
    .mobile-toggle {
      display: inline-flex;
      margin-left: auto;
    }

    .main-nav {
      position: fixed;
      left: 0;
      right: 0;
      top: 84px;
      background: linear-gradient(
        180deg,
        var(--lumia-primary-strong) 0%,
        #602d78 100%
      );
      border-top: 1px solid rgba(255, 255, 255, 0.12);
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      padding: 24px 30px 30px;
      transform: translateY(-10px);
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: transform 0.25s ease, opacity 0.25s ease;
      flex-direction: column;
      align-items: flex-start;

      .nav-list-wrap {
        width: 100%;
        height: auto;
      }

      .nav-list-wrap > ul {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px 20px;
      }

      .active-indicator {
        display: none;
      }

      .menu-node {
        &::after {
          display: none;
        }

        .menu-link {
          font-size: 20px;
        }

        &.active .menu-link {
          text-decoration-color: rgba(255, 255, 255, 0.96);
          text-decoration-thickness: 2.8px;
        }

        .submenu {
          position: static;
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: none;
          box-shadow: none;
          border: none;
          border-left: 2px solid rgba(255, 255, 255, 0.22);
          border-radius: 0;
          margin-top: 6px;
          padding: 0 0 0 8px;
          min-width: auto;

          .submenu-link {
            padding: 6px 8px;
            font-size: 15px;
            color: rgba(255, 255, 255, 0.82);

            &:hover {
              background: rgba(255, 255, 255, 0.08);
            }
          }
        }
      }

      .language-switcher {
        margin-left: 0;
        margin-top: 8px;
        padding-left: 0;
        border-left: none;
        border-top: 1px solid rgba(255, 255, 255, 0.14);
        padding-top: 16px;
      }

      &.show {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }
    }
  }
}

@media (max-width: 649px) {
  .header-main {
    .main-inner {
      min-height: 80px;
      gap: 12px;
    }

    .brand .name {
      font-size: 18px;
    }

    .brand .logo {
      width: 44px;
      height: 44px;
    }

    .main-nav {
      top: 80px;
      padding: 22px;

      .nav-list-wrap > ul {
        grid-template-columns: 1fr;
      }

      .menu-node .menu-link {
        font-size: 18px;
      }
    }
  }
}
</style>
