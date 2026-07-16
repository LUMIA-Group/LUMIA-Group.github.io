<template>
  <aside v-if="isEnabled" class="theme-switcher" :class="{ open: isOpen }">
    <button
      type="button"
      class="theme-toggle"
      :aria-expanded="isOpen ? 'true' : 'false'"
      aria-label="切换主题"
      @click="isOpen = !isOpen"
    >
      主题
    </button>
    <div v-if="isOpen" class="theme-panel">
      <div class="theme-panel-header">
        <strong>主题色</strong>
        <button type="button" aria-label="关闭" @click="isOpen = false">
          ×
        </button>
      </div>
      <div class="theme-options">
        <button
          v-for="theme in presets"
          :key="theme.id"
          type="button"
          class="theme-option"
          :class="{ active: activeThemeId === theme.id }"
          @click="selectTheme(theme)"
        >
          <span
            class="theme-swatch"
            :style="{ backgroundColor: theme.primary }"
            aria-hidden="true"
          ></span>
          <span>{{ theme.name }}</span>
        </button>
      </div>
      <label class="custom-theme">
        <span>自定义</span>
        <input v-model="customColor" type="color" @input="applyCustomTheme" />
      </label>
      <button type="button" class="reset-theme" @click="resetTheme">
        恢复默认
      </button>
    </div>
  </aside>
</template>

<script>
import {
  DEFAULT_THEME_ID,
  getThemePresetById,
  themePresets,
} from "@/data/themePresets";

const STORAGE_KEY = "lumia_theme_id";
const CUSTOM_STORAGE_KEY = "lumia_theme_custom";

function hexToRgb(hex) {
  const value = typeof hex === "string" ? hex.replace("#", "").trim() : "";
  if (!/^[0-9a-fA-F]{6}$/.test(value)) {
    return null;
  }
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }) {
  return [r, g, b]
    .map((channel) => {
      const next = Math.max(0, Math.min(255, Math.round(channel)));
      return next.toString(16).padStart(2, "0");
    })
    .join("");
}

function mixRgb(base, target, weight) {
  return {
    r: base.r * (1 - weight) + target.r * weight,
    g: base.g * (1 - weight) + target.g * weight,
    b: base.b * (1 - weight) + target.b * weight,
  };
}

function makeHex(base, target, weight) {
  return `#${rgbToHex(mixRgb(base, target, weight))}`;
}

function makeThemeFromPrimary(primary) {
  const rgb = hexToRgb(primary);
  if (!rgb) {
    return null;
  }
  const white = { r: 255, g: 255, b: 255 };
  const black = { r: 0, g: 0, b: 0 };
  return {
    id: "custom",
    name: "自定义",
    primary,
    primaryStrong: makeHex(rgb, black, 0.28),
    text: makeHex(rgb, black, 0.12),
    ink: makeHex(rgb, black, 0.68),
    bg: makeHex(rgb, white, 0.93),
    border: makeHex(rgb, white, 0.58),
    muted: makeHex(rgb, white, 0.78),
  };
}

function getRouteQueryValue(key) {
  if (typeof window === "undefined") {
    return "";
  }
  const search = new URLSearchParams(window.location.search);
  if (search.has(key)) {
    return search.get(key) || "";
  }
  const hash = window.location.hash || "";
  const queryIndex = hash.indexOf("?");
  if (queryIndex === -1) {
    return "";
  }
  return new URLSearchParams(hash.slice(queryIndex + 1)).get(key) || "";
}

export default {
  name: "ThemeSwitcher",
  data() {
    return {
      presets: themePresets,
      isOpen: false,
      isEnabled: false,
      activeThemeId: DEFAULT_THEME_ID,
      customColor: "#662e7d",
    };
  },
  watch: {
    "$route.fullPath"() {
      this.applyRouteTheme();
    },
  },
  mounted() {
    this.isEnabled = this.shouldEnable();
    this.isOpen = getRouteQueryValue("themePanel") === "1";
    this.applyInitialTheme();
  },
  methods: {
    shouldEnable() {
      if (getRouteQueryValue("themePanel") === "1") {
        return true;
      }
      if (typeof window === "undefined") {
        return false;
      }
      return ["localhost", "127.0.0.1"].includes(window.location.hostname);
    },
    getStoredTheme() {
      try {
        return localStorage.getItem(STORAGE_KEY) || "";
      } catch (error) {
        return "";
      }
    },
    getStoredCustomColor() {
      try {
        return localStorage.getItem(CUSTOM_STORAGE_KEY) || "";
      } catch (error) {
        return "";
      }
    },
    storeTheme(themeId, customColor = "") {
      try {
        localStorage.setItem(STORAGE_KEY, themeId);
        if (customColor) {
          localStorage.setItem(CUSTOM_STORAGE_KEY, customColor);
        }
      } catch (error) {
        // Local storage is optional for preview-only controls.
      }
    },
    applyInitialTheme() {
      if (this.applyRouteTheme()) {
        return;
      }
      const storedThemeId = this.getStoredTheme();
      if (storedThemeId === "custom") {
        const storedColor = this.getStoredCustomColor();
        const theme = makeThemeFromPrimary(storedColor);
        if (theme) {
          this.customColor = storedColor;
          this.applyTheme(theme);
          return;
        }
      }
      this.applyTheme(
        getThemePresetById(storedThemeId) || getThemePresetById(DEFAULT_THEME_ID)
      );
    },
    applyRouteTheme() {
      const customPrimary = getRouteQueryValue("primary");
      if (customPrimary) {
        const normalized = customPrimary.startsWith("#")
          ? customPrimary
          : `#${customPrimary}`;
        const theme = makeThemeFromPrimary(normalized);
        if (theme) {
          this.customColor = normalized;
          this.applyTheme(theme);
          return true;
        }
      }
      const themeId = getRouteQueryValue("theme");
      const theme = getThemePresetById(themeId);
      if (theme) {
        this.applyTheme(theme);
        return true;
      }
      return false;
    },
    applyTheme(theme) {
      if (!theme) {
        return;
      }
      const root = document.documentElement;
      const rgb = hexToRgb(theme.primary);
      const strongRgb = hexToRgb(theme.primaryStrong);
      root.dataset.lumiaTheme = theme.id;
      root.style.setProperty("--lumia-primary", theme.primary);
      root.style.setProperty("--lumia-primary-strong", theme.primaryStrong);
      root.style.setProperty("--lumia-text", theme.text);
      root.style.setProperty("--lumia-ink", theme.ink);
      root.style.setProperty("--lumia-bg", theme.bg);
      root.style.setProperty("--lumia-border", theme.border);
      root.style.setProperty("--lumia-muted", theme.muted);
      if (rgb) {
        root.style.setProperty(
          "--lumia-primary-rgb",
          `${rgb.r}, ${rgb.g}, ${rgb.b}`
        );
      }
      if (strongRgb) {
        root.style.setProperty(
          "--lumia-primary-strong-rgb",
          `${strongRgb.r}, ${strongRgb.g}, ${strongRgb.b}`
        );
      }
      this.activeThemeId = theme.id;
      this.storeTheme(theme.id, theme.id === "custom" ? theme.primary : "");
    },
    selectTheme(theme) {
      this.applyTheme(theme);
    },
    applyCustomTheme() {
      const theme = makeThemeFromPrimary(this.customColor);
      if (theme) {
        this.applyTheme(theme);
      }
    },
    resetTheme() {
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(CUSTOM_STORAGE_KEY);
      } catch (error) {
        // Ignore unavailable storage.
      }
      this.applyTheme(getThemePresetById(DEFAULT_THEME_ID));
    },
  },
};
</script>

<style lang="less" scoped>
.theme-switcher {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 80;
  color: var(--lumia-primary);
  font-family: var(--lumia-font);
}

.theme-toggle,
.theme-panel button,
.custom-theme {
  font: inherit;
}

.theme-toggle {
  min-height: 40px;
  border: 1px solid rgba(var(--lumia-primary-rgb), 0.32);
  border-radius: 999px;
  padding: 0 16px;
  background: rgba(255, 255, 255, 0.92);
  color: var(--lumia-primary);
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(var(--lumia-primary-rgb), 0.12);
}

.theme-panel {
  position: absolute;
  right: 0;
  bottom: 50px;
  width: 260px;
  border: 1px solid rgba(var(--lumia-primary-rgb), 0.2);
  border-radius: 18px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 18px 40px rgba(var(--lumia-primary-rgb), 0.16);
  backdrop-filter: blur(12px);
}

.theme-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;

  button {
    width: 28px;
    height: 28px;
    border: 0;
    border-radius: 50%;
    background: rgba(var(--lumia-primary-rgb), 0.08);
    color: var(--lumia-primary);
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
  }
}

.theme-options {
  display: grid;
  gap: 6px;
}

.theme-option {
  width: 100%;
  min-height: 36px;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 0 10px;
  background: transparent;
  color: var(--lumia-primary);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 9px;
  cursor: pointer;

  &.active,
  &:hover,
  &:focus-visible {
    border-color: rgba(var(--lumia-primary-rgb), 0.24);
    background: rgba(var(--lumia-primary-rgb), 0.08);
    outline: none;
  }
}

.theme-swatch {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
}

.custom-theme {
  margin-top: 10px;
  min-height: 38px;
  border-top: 1px solid rgba(var(--lumia-primary-rgb), 0.12);
  padding-top: 10px;
  color: var(--lumia-primary);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    width: 42px;
    height: 28px;
    border: 0;
    padding: 0;
    background: transparent;
    cursor: pointer;
  }
}

.reset-theme {
  width: 100%;
  min-height: 34px;
  border: 1px solid rgba(var(--lumia-primary-rgb), 0.24);
  border-radius: 999px;
  margin-top: 10px;
  background: transparent;
  color: var(--lumia-primary);
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 720px) {
  .theme-switcher {
    right: 12px;
    bottom: 12px;
  }

  .theme-panel {
    width: min(260px, calc(100vw - 24px));
  }
}
</style>
