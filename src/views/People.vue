<template>
  <div class="people-container">
    <div class="people-content">
      <el-collapse v-model="activeNames">
        <!-- 在这里修改类目名称，如将“Name 1”改为“students” -->
        <el-collapse-item title="Name 1" name="1">
          <ul class="s-list">
            <li
              class="s-item"
              v-for="(item, index) in peopleData.studentsList"
              :key="index"
            >
              <img :src="item.pic" alt="" srcset="" width="100%"/>
              <h3 class="s-name">{{ item.name }}</h3>
              <p>{{ item.grade }}</p>
            </li>
          </ul>
        </el-collapse-item>
         <!-- 在这里修改类目名称，如将“Name 1”改为“students” -->
        <el-collapse-item title="Name 2" name="2">
          <ul class="s-list">
            <li
              class="s-item"
              v-for="(item, index) in peopleData.teachersList"
              :key="index"
            >
              <img :src="item.pic" alt="" srcset="" width="100%"/>
              <h3 class="s-name">{{ item.name }}</h3>
              <p>{{ item.grade }}</p>
            </li>
          </ul>
        </el-collapse-item>
         <!-- 在这里修改类目名称，如将“Name 1”改为“students” -->
        <el-collapse-item title="Name 3" name="3">
          <ul class="s-list">
            <li
              class="s-item"
              v-for="(item, index) in studentsList"
              :key="index"
            >
              <img :src="item.pic" alt="" srcset="" width="100%"/>
              <h3 class="s-name">{{ item.name }}</h3>
              <p>{{ item.grade }}</p>
            </li>
          </ul>
        </el-collapse-item>
         <!-- 在这里新建一个类目，格式同上 -->
      </el-collapse>
    </div>
  </div>
</template>
<script>
import { peopleData } from '@/data/people'
export default {
  data() {
    return {
      peopleData: peopleData,
      activeNames: "1",
    };
  },
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
    column-gap: 30px; // 列间距
    .s-item {
      width: 100%;
      break-inside: avoid;
      margin-bottom: 30px;
    }
    .s-name {
        font-size: 18px;
        font-weight: 600;
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