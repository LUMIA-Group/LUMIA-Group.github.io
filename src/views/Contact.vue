<template>
  <div class="contact-page">
    <section class="mila-section contact-hero">
      <div class="mila-container">
        <p class="mila-eyebrow mila-fade-up" style="--delay: 80ms">Collaborate</p>
        <h1 class="mila-title mila-fade-up" style="--delay: 120ms">Contact</h1>
        <p class="mila-subtitle mila-fade-up" style="--delay: 160ms">
          Recruitment, collaboration, and advisory opportunities.
        </p>
      </div>
    </section>

    <section class="mila-section contact-content">
      <div class="mila-container">
        <article
          class="contact-card mila-fade-up"
          v-for="(item, index) in contactData.contactList"
          :key="index"
          :style="{ '--delay': `${100 + index * 80}ms` }"
        >
          <header>
            <h2>{{ item.header }}</h2>
            <button class="apply-trigger" @click="gotoApplication">
              <img :src="applicationLogo" alt="application" />
              <span>Apply</span>
            </button>
          </header>
          <p v-for="(line, lineIndex) in item.list" :key="`${index}-${lineIndex}`">
            {{ line }}
          </p>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import { contactData } from "@/data/contact";
import applicationLogo from "@/assets/application.svg";

export default {
  data() {
    return {
      contactData,
      applicationLogo,
    };
  },
  methods: {
    gotoApplication() {
      this.$router.push({ name: "application" });
    },
  },
};
</script>

<style lang="less" scoped>
.contact-hero {
  padding-top: 76px;
  border-bottom: 1px solid var(--mila-border);
}

.contact-content {
  .contact-card {
    border: 1px solid rgba(102, 46, 125, 0.2);
    border-radius: 24px;
    background: var(--mila-white);
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
      font-family: "Space Grotesk", sans-serif;
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

  .apply-trigger {
    border: 1.5px solid var(--mila-primary);
    border-radius: 999px;
    background: transparent;
    color: var(--mila-primary);
    padding: 9px 14px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.25s ease, color 0.25s ease;

    img {
      width: 16px;
      height: 16px;
      filter: hue-rotate(220deg) saturate(0.6);
    }

    &:hover,
    &:focus {
      background: var(--mila-primary);
      color: #fff;
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
