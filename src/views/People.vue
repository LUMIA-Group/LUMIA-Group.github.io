<template>
  <div class="people-container">
    <div class="people-content">
      <el-collapse v-model="activeNames">
        <!-- 在这里修改类目名称，如将“Name 1”改为“students” -->
        <el-collapse-item :title="key" :name="key" v-for="(value, key) in peopleData" :key="key">
          <ul class="s-list">
            <li
              class="s-item"
              v-for="(item, index) in value"
              :key="index"
            >
              <img :src="item.pic || defaultImg" alt="" srcset="" width="100%"/>
              <h3 class="s-name" @click="goto(item.homepage)">{{ item.name }}</h3>
              <p>{{ item.grade }}</p>
            </li>
          </ul>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import { peopleData } from '@/data/people'
import defaultImg from '@/assets/default.jpg'
export default {
  data() {
    return {
      peopleData: peopleData,
      activeNames: ["Faculty", "PhD", "Master", "Undergrads"],
      defaultImg
    };
  },
  methods: {
    goto(url) {
      window.open(url, '_blank')
    }
  }
};
</script>
<style lang="less" scoped>
.people-container {
  max-width: 1280px;
  margin: auto;
  padding-top: 80px;
  .s-list {
    width: 100%; // 默认宽度
    margin: 20px auto; // 剧中
    columns: 4; // 默认列数
    column-gap: 48px; // 列间距
    .s-item {
      width: 100%;
      break-inside: avoid;
      margin-bottom: 50px;
      img {
        border-radius: 12px;
      }
    }
    .s-name {
        font-size: 18px;
        font-weight: 600;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
    }
  }
}
</style>
<style lang="less">
.people-container {
  .el-collapse-item__header {
    color: #004d4c;
    font-size: 18px;
    font-weight: 600;
  }
}
</style>