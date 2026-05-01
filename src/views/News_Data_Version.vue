<template>
  <div class="news-container">
    <div class="news-content">
      <ul>
        <li v-for="item in newsData.newsList" :key="item.id">
          {{ formatDisplayDate(item.date) }}: {{ getDisplayTitle(item) }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { formatNewsDate, getNewsTitle, newsData } from "@/data/news";
export default {
  data() {
    return {
      newsData: newsData,
    };
  },
  methods: {
    formatDisplayDate(date) {
      return formatNewsDate(date, "zh");
    },
    getDisplayTitle(news) {
      return getNewsTitle(news, "zh");
    },
  },
};
</script>
<style lang="less" scoped>
.news-content {
  max-width: 1280px;
  margin: auto;
  padding-top: 80px;
  text-align: left;
  li {
    list-style: circle;
    line-height: 36px;
  }
}
</style>
