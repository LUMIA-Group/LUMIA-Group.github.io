<template>
  <header
    class="lumia-header"
    :class="{ scrolled: isScrolled, open: mobileMenuOpen }"
  >
    <div class="header-topbar">
      <div class="lumia-container topbar-inner">
        <ul class="utility-nav">
          <li
            v-for="item in utilityMenu"
            :key="`utility-${item.value}`"
            @click="clickHeader(item)"
          >
            {{ item.label }}
          </li>
        </ul>

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
      </div>
    </div>

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

        <button class="mobile-toggle" @click="mobileMenuOpen = !mobileMenuOpen">
          {{ mobileMenuOpen ? localeText.close : localeText.menu }}
        </button>

        <nav class="main-nav" :class="{ show: mobileMenuOpen }">
          <ul>
            <li
              v-for="item in mainMenu"
              :key="item.value"
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
        </nav>
      </div>
    </div>

  </header>
</template>

<script>
import { headerData } from "@/data/header";

const I18N = {
  en: {
    home: "Home",
    people: "People",
    research: "Research",
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
    };
  },
  computed: {
    localeText() {
      return I18N[this.currentLanguage] || I18N.zh;
    },
    brandName() {
      return this.localeText.labName;
    },
    mainMenu() {
      return [
        { value: "home", label: this.localeText.home },
        { value: "people", label: this.localeText.people },
        { value: "research", label: this.localeText.research },
        { value: "contact", label: this.localeText.contact },
      ];
    },
    utilityMenu() {
      return [
        { value: "people", label: this.localeText.directory },
        { value: "research", label: this.localeText.insights },
        { value: "contact", label: this.localeText.contact },
      ];
    },
  },
  mounted() {
    this.initLanguage();
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.handleScroll();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
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
  },
};
</script>

<style lang="less" scoped>
.lumia-header {
  position: sticky;
  top: 0;
  z-index: 90;
  background: rgba(244, 245, 241, 0.96);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &.scrolled {
    border-bottom-color: rgba(102, 46, 125, 0.22);
    box-shadow: 0 8px 25px rgba(102, 46, 125, 0.12);
  }
}

.header-topbar {
  background: var(--lumia-primary);
  color: #fff;

  .topbar-inner {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .utility-nav {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;

    li {
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      line-height: 1.2;
      text-decoration: underline;
      text-decoration-color: transparent;
      text-underline-offset: 0.26em;
      transition: text-decoration-color 0.25s ease;

      &:hover {
        text-decoration-color: #fff;
      }
    }
  }

  .language-switcher {
    display: inline-flex;
    align-items: center;
    gap: 7px;

    button {
      border: none;
      background: transparent;
      color: #fff;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      opacity: 0.72;
      padding: 0;

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
    }
  }
}

.header-main {
  .main-inner {
    min-height: 92px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

    .brand {
    border: none;
    background: transparent;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    color: var(--lumia-primary);

    .logo {
      width: 52px;
      height: 52px;
      object-fit: contain;
      object-position: center;
      filter: drop-shadow(0 3px 10px rgba(244, 194, 57, 0.3));
    }

    .name {
      font-family: "Space Grotesk", sans-serif;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.01em;
    }
  }

  .mobile-toggle {
    display: none;
    border: none;
    background: transparent;
    color: var(--lumia-primary);
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    cursor: pointer;
  }

  .main-nav {
    display: flex;
    align-items: center;
    gap: 24px;

    > ul {
      display: flex;
      align-items: center;
      gap: 28px;
    }

    .menu-node {
      position: relative;

      .menu-link {
        cursor: pointer;
        border: none;
        background: transparent;
        padding: 0;
        font-size: 18px;
        font-weight: 600;
        color: var(--lumia-primary);
        text-decoration: underline;
        text-decoration-color: transparent;
        text-underline-offset: 0.25em;
        transition: text-decoration-color 0.25s ease, opacity 0.25s ease;
      }

      &:hover .menu-link,
      &.active .menu-link {
        text-decoration-color: var(--lumia-primary);
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
}

@media (max-width: 1099px) {
  .header-main {
    .mobile-toggle {
      display: inline-block;
      margin-left: auto;
    }

    .main-nav {
      position: fixed;
      left: 0;
      right: 0;
      top: 136px;
      background: #fff;
      border-top: 1px solid rgba(102, 46, 125, 0.2);
      border-bottom: 1px solid rgba(102, 46, 125, 0.2);
      padding: 24px 30px 30px;
      transform: translateY(-10px);
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: transform 0.25s ease, opacity 0.25s ease;
      flex-direction: column;
      align-items: flex-start;

      > ul {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px 20px;
      }

      .menu-node {
        .menu-link {
          font-size: 20px;
        }

        .submenu {
          position: static;
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: none;
          box-shadow: none;
          border: none;
          border-left: 2px solid rgba(102, 46, 125, 0.2);
          border-radius: 0;
          margin-top: 6px;
          padding: 0 0 0 8px;
          min-width: auto;

          .submenu-link {
            padding: 6px 8px;
            font-size: 15px;
          }
        }
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
  .header-topbar {
    .topbar-inner {
      min-height: 42px;
    }

    .utility-nav {
      gap: 12px;
      li {
        font-size: 12px;
      }
    }
  }

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
      top: 122px;
      padding: 22px;

      > ul {
        grid-template-columns: 1fr;
      }

      .menu-node .menu-link {
        font-size: 18px;
      }
    }
  }
}
</style>
