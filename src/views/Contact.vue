<template>
  <div class="contact-container">
    <div class="contact-content">
      <section
        class="contact-list"
        v-for="(item, index) in contactData.contactList"
        :key="index"
      >
        <h2>{{ item.header }}</h2>
        <p v-for="(l, lindex) in item.list" :key="lindex + 'l'">{{ l }}</p>
      </section>
    </div>
  </div>
</template>
<script>
import { contactData } from '@/data/contact'
export default {
  data() {
    return {
      contactData: contactData
    };
  },
};
</script>
<style lang="less" scoped>
.contact-content {
  max-width: 1280px;
  margin: auto;
  padding-top: 48px;
  text-align: left;
  .contact-list {
    padding: 32px 0;
    border-bottom: 1px solid #004d4c;
    &:last-child {
        border: none;
    }
  }
  p {
    line-height: 20px;
    margin-bottom: 12px;
    text-align: justify;
  }
  h2 {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 18px;
    color: #004d4c;
  }
}
</style>