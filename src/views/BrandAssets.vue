<template>
  <div class="brand-assets-page">
    <section class="lumia-section brand-hero">
      <div class="lumia-container brand-hero-grid">
        <div class="brand-hero-copy lumia-fade-up" style="--delay: 80ms">
          <p class="lumia-eyebrow">{{ text.eyebrow }}</p>
          <h1 class="lumia-title">{{ text.title }}</h1>
          <p class="lumia-subtitle">{{ text.subtitle }}</p>
          <div class="brand-hero-actions">
            <a
              class="brand-download-primary"
              :href="assetUrl(bundle.path)"
              :download="bundle.downloadName"
            >
              {{ text.downloadBundle }}
              <span>{{ formatBytes(bundle.bytes) }}</span>
            </a>
            <button type="button" class="brand-jump-link" @click="scrollTo('brand-templates')">
              {{ text.jumpTemplates }}
            </button>
          </div>
        </div>

        <aside class="brand-preview-panel lumia-fade-up" style="--delay: 160ms">
          <img
            :src="assetUrl(featuredLogo.preview)"
            :alt="localized(featuredLogo.title)"
          />
          <div class="brand-palette" :aria-label="text.palette">
            <span
              v-for="color in palette"
              :key="color.value"
              :style="{ backgroundColor: color.value }"
              :title="`${color.name} ${color.value}`"
            ></span>
          </div>
        </aside>
      </div>
    </section>

    <section id="brand-logo-assets" class="lumia-section brand-library">
      <div class="lumia-container">
        <div class="brand-section-head lumia-fade-up" style="--delay: 80ms">
          <div>
            <p class="lumia-eyebrow">{{ text.logoEyebrow }}</p>
            <h2>{{ text.logoTitle }}</h2>
          </div>
          <p>{{ logoCountText }}</p>
        </div>

        <div class="logo-asset-grid">
          <article
            v-for="(asset, index) in logoAssets"
            :key="asset.id"
            class="logo-asset-card lumia-fade-up"
            :style="{ '--delay': `${120 + index * 45}ms` }"
          >
            <div
              class="logo-preview"
              :class="[
                `tone-${asset.previewTone}`,
                `shape-${asset.previewShape}`,
              ]"
            >
              <img :src="assetUrl(asset.preview)" :alt="localized(asset.title)" />
            </div>
            <div class="asset-card-copy">
              <h3>{{ localized(asset.title) }}</h3>
              <p>{{ localized(asset.summary) }}</p>
            </div>
            <div class="asset-downloads" :aria-label="text.downloadFormats">
              <a
                v-for="file in asset.files"
                :key="file.path"
                :href="assetUrl(file.path)"
                :download="file.downloadName"
                class="asset-download-link"
              >
                <strong>{{ file.format }}</strong>
                <span>{{ formatBytes(file.bytes) }}</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="brand-templates" class="lumia-section template-library">
      <div class="lumia-container">
        <div class="brand-section-head lumia-fade-up" style="--delay: 80ms">
          <div>
            <p class="lumia-eyebrow">{{ text.templateEyebrow }}</p>
            <h2>{{ text.templateTitle }}</h2>
          </div>
          <p>{{ templateCountText }}</p>
        </div>

        <div class="template-grid">
          <article
            v-for="(template, index) in templateAssets"
            :key="template.id"
            class="template-card lumia-fade-up"
            :style="{ '--delay': `${120 + index * 45}ms` }"
          >
            <div class="template-token">PPTX</div>
            <div class="template-copy">
              <h3>{{ localized(template.name) }}</h3>
              <p>{{ localized(template.summary) }}</p>
            </div>
            <a
              class="template-download"
              :href="assetUrl(template.path)"
              :download="template.downloadName"
            >
              {{ text.download }}
              <span>{{ formatBytes(template.bytes) }}</span>
            </a>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  brandBundleAsset,
  brandColorPalette,
  brandLogoAssets,
  brandTemplateAssets,
} from "@/data/brandAssets";

const I18N = {
  en: {
    eyebrow: "Brand Assets",
    title: "LUMIA Visual Identity Files",
    subtitle:
      "Download the lab logo system, production image exports, and presentation templates from one stable page.",
    downloadBundle: "Download All",
    jumpTemplates: "PPT Templates",
    logoEyebrow: "Logo System",
    logoTitle: "Logo Files",
    templateEyebrow: "Presentation",
    templateTitle: "PPT Templates",
    palette: "LUMIA color palette",
    downloadFormats: "Available file formats",
    download: "Download",
    logoFiles: "logo files",
    templates: "templates",
  },
  zh: {
    eyebrow: "视觉资产",
    title: "LUMIA 标准识别文件",
    subtitle: "集中下载实验室 Logo 系统、常用图片版本和 PPT 模板。",
    downloadBundle: "下载全部",
    jumpTemplates: "PPT 模板",
    logoEyebrow: "Logo 系统",
    logoTitle: "Logo 文件",
    templateEyebrow: "演示文稿",
    templateTitle: "PPT 模板",
    palette: "LUMIA 色彩",
    downloadFormats: "可下载格式",
    download: "下载",
    logoFiles: "个 logo 文件",
    templates: "个模板",
  },
};

export default {
  name: "BrandAssets",
  data() {
    return {
      bundle: brandBundleAsset,
      palette: brandColorPalette,
      logoAssets: brandLogoAssets,
      templateAssets: brandTemplateAssets,
      currentLanguage: "zh",
    };
  },
  computed: {
    text() {
      return I18N[this.currentLanguage] || I18N.zh;
    },
    featuredLogo() {
      return this.logoAssets.find((asset) => asset.id === "lumia-horizontal-02");
    },
    logoFileCount() {
      return this.logoAssets.reduce(
        (total, asset) => total + asset.files.length,
        0
      );
    },
    logoCountText() {
      if (this.currentLanguage === "zh") {
        return `${this.logoFileCount} ${this.text.logoFiles}`;
      }
      return `${this.logoFileCount} ${this.text.logoFiles}`;
    },
    templateCountText() {
      if (this.currentLanguage === "zh") {
        return `${this.templateAssets.length} ${this.text.templates}`;
      }
      return `${this.templateAssets.length} ${this.text.templates}`;
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
    localized(value) {
      if (typeof value === "string") {
        return value;
      }
      if (!value) {
        return "";
      }
      return value[this.currentLanguage] || value.zh || value.en || "";
    },
    assetUrl(path) {
      const base = (process.env.BASE_URL || "/").replace(/\/$/, "");
      return `${base}/${path}`;
    },
    formatBytes(bytes) {
      if (!bytes || Number.isNaN(Number(bytes))) {
        return "";
      }
      const value = Number(bytes);
      if (value >= 1024 * 1024) {
        return `${(value / 1024 / 1024).toFixed(value >= 10 * 1024 * 1024 ? 0 : 1)} MB`;
      }
      return `${Math.round(value / 1024)} KB`;
    },
    scrollTo(id) {
      const target = document.getElementById(id);
      if (!target) {
        return;
      }
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.brand-hero {
  padding-top: 82px;
}

.brand-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
  gap: 48px;
  align-items: center;
}

.brand-hero-copy {
  .lumia-title {
    max-width: 900px;
  }
}

.brand-hero-actions {
  margin-top: 34px;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
}

.brand-download-primary,
.brand-jump-link,
.asset-download-link,
.template-download {
  border: 1.5px solid var(--lumia-primary);
  border-radius: 999px;
  min-height: 44px;
  padding: 11px 18px;
  color: var(--lumia-primary);
  background: transparent;
  font: inherit;
  font-weight: 700;
  text-decoration: none;
  display: inline-flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease,
    border-color 0.2s ease;
}

.brand-download-primary {
  background: var(--lumia-primary);
  color: var(--lumia-white);
  box-shadow: 0 18px 34px rgba(var(--lumia-primary-rgb), 0.2);
}

.brand-download-primary:hover,
.brand-download-primary:focus,
.brand-jump-link:hover,
.brand-jump-link:focus,
.asset-download-link:hover,
.asset-download-link:focus,
.template-download:hover,
.template-download:focus {
  background: var(--lumia-primary-strong);
  border-color: var(--lumia-primary-strong);
  color: var(--lumia-white);
  transform: translateY(-1px);
}

.brand-preview-panel {
  background: var(--lumia-white);
  border: 1px solid rgba(var(--lumia-primary-rgb), 0.16);
  border-radius: 26px;
  padding: 42px;
  display: grid;
  gap: 34px;
  box-shadow: var(--lumia-shadow);

  img {
    width: 100%;
    max-height: 260px;
    object-fit: contain;
  }
}

.brand-palette {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;

  span {
    display: block;
    height: 16px;
    border-radius: 999px;
  }
}

.brand-library,
.template-library {
  padding-top: 38px;
}

.brand-section-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 28px;

  h2 {
    margin: 8px 0 0;
    font-size: clamp(32px, 4vw, 52px);
    line-height: 1.05;
    color: var(--lumia-primary);
  }

  > p {
    margin: 0;
    color: rgba(var(--lumia-primary-rgb), 0.72);
    font-weight: 700;
  }
}

.logo-asset-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.logo-asset-card,
.template-card {
  background: var(--lumia-white);
  border: 1px solid rgba(var(--lumia-primary-rgb), 0.16);
  border-radius: 22px;
  box-shadow: var(--lumia-shadow);
}

.logo-asset-card {
  padding: 18px;
  display: grid;
  gap: 18px;
}

.logo-preview {
  min-height: 224px;
  border-radius: 16px;
  border: 1px solid rgba(var(--lumia-primary-rgb), 0.12);
  display: grid;
  place-items: center;
  padding: 28px;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 168px;
    object-fit: contain;
  }

  &.tone-light {
    background: linear-gradient(145deg, #ffffff 0%, var(--lumia-bg) 100%);
  }

  &.tone-dark {
    background: linear-gradient(145deg, #161017 0%, #382244 100%);
  }

  &.shape-symbol img {
    max-width: 152px;
    max-height: 152px;
  }

  &.shape-wide img {
    max-height: 108px;
  }
}

.asset-card-copy {
  min-height: 96px;

  h3 {
    margin: 0 0 10px;
    color: var(--lumia-primary);
    font-size: 24px;
    line-height: 1.18;
  }

  p {
    margin: 0;
    color: rgba(var(--lumia-primary-rgb), 0.78);
    line-height: 1.55;
  }
}

.asset-downloads {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.asset-download-link {
  min-height: 38px;
  padding: 8px 12px;
  font-size: 13px;

  span {
    font-size: 12px;
    opacity: 0.74;
  }
}

.template-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.template-card {
  padding: 22px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 18px;
  align-items: start;
}

.template-token {
  width: 62px;
  height: 62px;
  border-radius: 18px;
  background: var(--lumia-primary);
  color: var(--lumia-white);
  display: grid;
  place-items: center;
  font-size: 13px;
  font-weight: 800;
}

.template-copy {
  h3 {
    margin: 0 0 8px;
    color: var(--lumia-primary);
    font-size: 22px;
    line-height: 1.22;
  }

  p {
    margin: 0;
    color: rgba(var(--lumia-primary-rgb), 0.76);
    line-height: 1.5;
  }
}

.template-download {
  grid-column: 1 / -1;
  justify-self: start;
  min-height: 40px;
  padding: 9px 14px;
  font-size: 14px;

  span {
    font-size: 12px;
    opacity: 0.76;
  }
}

@media (max-width: 1199px) {
  .brand-hero-grid {
    grid-template-columns: 1fr;
  }

  .logo-asset-grid,
  .template-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 749px) {
  .brand-hero {
    padding-top: 58px;
  }

  .brand-hero-grid {
    gap: 28px;
  }

  .brand-preview-panel {
    padding: 24px;
    border-radius: 20px;

    img {
      max-height: 180px;
    }
  }

  .brand-section-head {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }

  .logo-asset-grid,
  .template-grid {
    grid-template-columns: 1fr;
  }

  .logo-preview {
    min-height: 188px;
  }

  .asset-card-copy {
    min-height: auto;
  }

  .template-card {
    grid-template-columns: 1fr;
  }

  .template-token {
    width: 58px;
    height: 58px;
  }
}
</style>
