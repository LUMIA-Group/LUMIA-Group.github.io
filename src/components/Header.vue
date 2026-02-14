<template>
  <header
    class="mila-header"
    :class="{ scrolled: isScrolled, open: mobileMenuOpen }"
  >
    <div class="header-topbar">
      <div class="mila-container topbar-inner">
        <ul class="utility-nav">
          <li
            v-for="item in utilityMenu"
            :key="`utility-${item.value}`"
            @click="clickHeader(item)"
          >
            {{ item.label }}
          </li>
        </ul>
        <span class="language-hint">EN / 中文</span>
      </div>
    </div>

    <div class="header-main">
      <div class="mila-container main-inner">
        <button class="brand" @click="clickHeader({ value: 'home' })">
          <img
            class="logo"
            :src="headerData.logo || 'https://mila.quebec/sites/default/themes/mila_v1/logo.svg'"
            alt="logo"
          />
          <span class="name">{{ headerData.name }}</span>
        </button>

        <button class="mobile-toggle" @click="mobileMenuOpen = !mobileMenuOpen">
          {{ mobileMenuOpen ? "Close" : "Menu" }}
        </button>

        <nav class="main-nav" :class="{ show: mobileMenuOpen }">
          <ul>
            <li
              v-for="item in mainMenu"
              :key="item.value"
              :class="{ active: isActive(item) }"
              @click="clickHeader(item)"
            >
              {{ item.label }}
            </li>
          </ul>
          <a
            class="mila-btn ghost"
            href="https://github.com/LUMIA-Group"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore Projects
          </a>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { headerData } from "@/data/header";

export default {
  data() {
    return {
      headerData,
      mobileMenuOpen: false,
      isScrolled: false,
    };
  },
  computed: {
    mainMenu() {
      return [{ value: "home", label: "Home" }, ...this.headerData.headerList];
    },
    utilityMenu() {
      return [
        { value: "people", label: "Directory" },
        { value: "research", label: "Insights" },
        { value: "news", label: "News" },
        {
          value: "https://github.com/LUMIA-Group",
          label: "Careers",
          type: "link",
        },
      ];
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.handleScroll();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 12;
    },
    isActive(item) {
      return item.type !== "link" && this.$route.name === item.value;
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
.mila-header {
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
  background: var(--mila-primary);
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

  .language-hint {
    font-size: 13px;
    font-weight: 600;
    opacity: 0.92;
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
    gap: 14px;
    cursor: pointer;
    color: var(--mila-primary);

    .logo {
      width: 74px;
      height: 31px;
      object-fit: contain;
      object-position: left center;
      filter: saturate(0.75);
    }

    .name {
      font-family: "Space Grotesk", sans-serif;
      font-size: 21px;
      font-weight: 700;
      letter-spacing: -0.01em;
    }
  }

  .mobile-toggle {
    display: none;
    border: none;
    background: transparent;
    color: var(--mila-primary);
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

    ul {
      display: flex;
      align-items: center;
      gap: 28px;
    }

    li {
      cursor: pointer;
      font-size: 18px;
      font-weight: 600;
      text-decoration: underline;
      text-decoration-color: transparent;
      text-underline-offset: 0.25em;
      transition: text-decoration-color 0.25s ease, opacity 0.25s ease;

      &:hover {
        text-decoration-color: var(--mila-primary);
      }

      &.active {
        text-decoration-color: var(--mila-primary);
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

      ul {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px 20px;
      }

      li {
        font-size: 20px;
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

    .language-hint {
      font-size: 12px;
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
      width: 60px;
      height: 25px;
    }

    .main-nav {
      top: 122px;
      padding: 22px;

      ul {
        grid-template-columns: 1fr;
      }

      li {
        font-size: 18px;
      }
    }
  }
}
</style>
