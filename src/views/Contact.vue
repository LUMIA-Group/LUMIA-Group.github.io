<template>
  <div class="contact-page">
    <section class="lumia-section contact-hero">
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
      </div>
    </section>

    <section class="lumia-section contact-content">
      <div class="lumia-container">
        <article
          class="contact-card lumia-fade-up"
          v-for="(item, index) in sectionList"
          :key="index"
          :style="{ '--delay': `${100 + index * 80}ms` }"
        >
          <header>
            <h2>{{ item.header }}</h2>
          </header>
          <p
            v-for="(line, lineIndex) in item.list"
            :key="`${index}-${lineIndex}`"
          >
            {{ line }}
          </p>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import { contactData } from "@/data/contact";
import { siteTextOverrides } from "@/data/siteText";

const I18N = {
  en: {
    eyebrow: "Collaborate",
    title: "Contact",
    subtitle: "Recruitment, collaboration, and advisory opportunities.",
    sections: [
      {
        header: "Graduate Recruitment",
        list: [
          "We are continuously recruiting PhD students, master students, and interns interested in natural language processing research and real-world impact. We value initiative, persistence, and long-term ambition in building frontier AI systems.",
          "Email: xxx@sjtu.edu.cn, Phone: xxxx",
        ],
      },
      {
        header: "Industry Collaboration / Advisory",
        list: [
          "In the AGI era, meaningful breakthroughs require long-term collaboration among academia and industry.",
          "Our team keeps investing in foundational and applied research, and we welcome opportunities to co-develop practical systems and products.",
          "If you are interested in strategic collaboration, applied research partnership, or technical advisory, please reach out.",
          "Email: xxx@sjtu.edu.cn, Phone: xxxx",
        ],
      },
    ],
  },
  zh: {
    eyebrow: "合作联系",
    title: "联系我们",
    subtitle: "招生、合作与顾问咨询相关信息。",
  },
};

export default {
  data() {
    return {
      contactData,
      currentLanguage: "zh",
    };
  },
  computed: {
    text() {
      return {
        ...(I18N[this.currentLanguage] || I18N.zh),
        ...((siteTextOverrides[this.currentLanguage] || {}).contact || {}),
      };
    },
    sectionList() {
      if (this.currentLanguage === "en") {
        return I18N.en.sections;
      }
      return this.contactData.contactList;
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

<style lang="less" scoped>
.contact-hero {
  padding-top: 76px;
  border-bottom: 1px solid var(--lumia-border);
}

.contact-content {
  .contact-card {
    border: 1px solid rgba(var(--lumia-primary-rgb), 0.2);
    border-radius: 24px;
    background: var(--lumia-white);
    padding: 26px;
    margin-bottom: 20px;

    &:nth-child(odd) {
      background: linear-gradient(160deg, #ffffff 0%, #fef6ff 100%);
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 14px;
    }

    h2 {
      font-family: var(--lumia-heading-font);
      font-size: clamp(24px, 3vw, 34px);
      line-height: 1.15;
      font-weight: 700;
    }

    p {
      line-height: 1.7;
      margin-bottom: 12px;
      opacity: 0.92;
      text-align: left;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

}

@media (max-width: 649px) {
  .contact-content {
    .contact-card {
      padding: 20px;

      header {
        flex-direction: column;
        align-items: flex-start;
      }

      p {
        font-size: 15px;
      }
    }
  }
}
</style>
