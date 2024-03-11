<template>
  <div class="news-container">
    <div class="news-content">
      <ul>
        <li v-for="(item, index) in newsData.newsList" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { newsData } from '@/data/news'
export default {
  data() {
    return {
      newsData: newsData
    };
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