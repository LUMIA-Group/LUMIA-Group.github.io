<template>
  <div id="app">
    <app-header v-show="!hideHeaderList.includes($route.name)" />
    <main class="site-main">
      <router-view />
    </main>
    <theme-switcher />
    <footer v-if="!hideHeaderList.includes($route.name)" class="site-footer">
      <div class="lumia-container footer-main">
        <div class="footer-content">
          <div class="footer-actions lumia-fade-up" style="--delay: 80ms">
            <div class="footer-social-links" aria-label="social links">
              <component
                v-for="item in socialLinks"
                :is="item.qr ? 'button' : 'a'"
                :key="item.value"
                class="footer-social-link"
                :class="{ 'has-qr': item.qr }"
                :href="item.href"
                :target="item.href ? '_blank' : null"
                :rel="item.href ? 'noopener noreferrer' : null"
                :type="item.qr ? 'button' : null"
                :aria-describedby="item.qr ? `footer-${item.value}-qr` : null"
              >
                <img
                  class="footer-social-icon"
                  :src="item.icon"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />
                <span class="footer-social-label">{{ item.label }}</span>
                <span
                  v-if="item.qr"
                  :id="`footer-${item.value}-qr`"
                  class="footer-qr-popover"
                  role="tooltip"
                >
                  <img :src="item.qr" :alt="text.wechatQrAlt" loading="lazy" />
                  <span class="footer-qr-caption">{{ text.followUs }}</span>
                </span>
              </component>
            </div>
          </div>
          <p class="footer-note">© 2026 {{ text.groupName }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import appHeader from "@/components/Header.vue";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import { siteTextOverrides } from "@/data/siteText";
import githubIcon from "@/assets/social/github.svg";
import wechatIcon from "@/assets/social/wechat.svg";
import xiaohongshuIcon from "@/assets/social/xiaohongshu.svg";
import xIcon from "@/assets/social/x.svg";
import wechatQrImage from "@/assets/social/wechat-qr.png";

const I18N = {
  en: {
    groupName: "LUMIA Group",
    githubLabel: "GitHub",
    wechatLabel: "WeChat Official Account",
    followUs: "Follow Us",
    xiaohongshuLabel: "Xiaohongshu",
    xLabel: "X",
    wechatQrAlt: "LUMIA Lab WeChat official account QR code",
  },
  zh: {
    groupName: "LUMIA实验室",
    githubLabel: "GitHub",
    wechatLabel: "微信公众号",
    followUs: "关注我们",
    xiaohongshuLabel: "小红书",
    xLabel: "X",
    wechatQrAlt: "LUMIA实验室微信公众号二维码",
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
    socialLinks() {
      return [
        {
          value: "github",
          label: this.text.githubLabel,
          href: "https://github.com/LUMIA-Group",
          icon: githubIcon,
        },
        {
          value: "wechat",
          label: this.text.wechatLabel,
          qr: wechatQrImage,
          icon: wechatIcon,
        },
        {
          value: "xiaohongshu",
          label: this.text.xiaohongshuLabel,
          href: "https://xhslink.cn/m/AQWNeVZWM4O",
          icon: xiaohongshuIcon,
        },
        {
          value: "x",
          label: this.text.xLabel,
          href: "https://x.com/zhouhan_lin",
          icon: xIcon,
        },
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
  padding: 54px 0 34px;

  .footer-main {
    display: flex;
    align-items: flex-start;
  }

  .footer-content {
    min-width: 0;
  }

  .footer-actions {
    display: block;
  }

  .footer-social-links {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 14px 28px;
  }

  .footer-social-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 0;
    padding: 0;
    background: transparent;
    min-height: 30px;
    color: var(--lumia-primary);
    font-family: inherit;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.2;
    text-decoration: none;
    cursor: pointer;
    appearance: none;

    .footer-social-label {
      text-decoration: underline;
      text-decoration-color: transparent;
      text-underline-offset: 0.28em;
      transition: text-decoration-color 0.2s ease, opacity 0.2s ease;
    }

    &:hover .footer-social-label,
    &:focus-visible .footer-social-label {
      text-decoration-color: currentColor;
    }

    &:focus-visible {
      outline: 2px solid rgba(var(--lumia-primary-rgb), 0.28);
      outline-offset: 4px;
      border-radius: 6px;
    }
  }

  .footer-qr-popover {
    position: absolute;
    left: 50%;
    bottom: calc(100% + 14px);
    z-index: 10;
    width: 148px;
    padding: 10px 10px 8px;
    border: 1px solid rgba(var(--lumia-primary-rgb), 0.16);
    border-radius: 10px;
    background: var(--lumia-bg);
    box-shadow: 0 16px 34px rgba(var(--lumia-primary-rgb), 0.16);
    color: var(--lumia-primary);
    text-align: center;
    pointer-events: none;
    opacity: 0;
    transform: translate(-50%, 6px);
    transition: opacity 0.18s ease, transform 0.18s ease;

    &::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: -7px;
      width: 12px;
      height: 12px;
      border-right: 1px solid rgba(var(--lumia-primary-rgb), 0.16);
      border-bottom: 1px solid rgba(var(--lumia-primary-rgb), 0.16);
      background: var(--lumia-bg);
      transform: translateX(-50%) rotate(45deg);
    }

    img {
      display: block;
      width: 128px;
      height: 128px;
      object-fit: cover;
      border-radius: 8px;
    }
  }

  .footer-social-link:hover .footer-qr-popover,
  .footer-social-link:focus-visible .footer-qr-popover,
  .footer-social-link:focus-within .footer-qr-popover {
    opacity: 1;
    transform: translate(-50%, 0);
  }

  .footer-qr-caption {
    display: block;
    margin-top: 8px;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.2;
    color: rgba(var(--lumia-primary-rgb), 0.72);
    text-decoration: none;
  }

  .footer-social-icon {
    width: 22px;
    height: 22px;
    object-fit: contain;
    flex: 0 0 auto;
  }

  .footer-note {
    margin-top: 24px;
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

    .footer-main {
      display: block;
    }
  }
}

@media (max-width: 649px) {
  .site-footer {
    .footer-social-links {
      gap: 12px 22px;
    }

    .footer-qr-popover {
      left: 0;
      transform: translate(0, 6px);
    }

    .footer-social-link:hover .footer-qr-popover,
    .footer-social-link:focus-visible .footer-qr-popover,
    .footer-social-link:focus-within .footer-qr-popover {
      transform: translate(0, 0);
    }
  }
}
</style>
