<template>
  <div class="home-container">
    <div class="home-content">
      <section class="introduction">
        <h1>{{ homeData.name }}</h1>
        <h2>
          {{ homeData.desc }}
        </h2>
      </section>
      <section class="project-list">
        <el-row :gutter="32">
          <el-col class="peoject-container" :span="12" v-for="item in homeData.projectList" :key="item.id">
            <section class="project-item">
              <div>
                <img :src="item.img" alt="" srcset="" width="100%">
              </div>
              <h3>{{ item.name }}</h3>
              <p>{{ item.intro }}</p>
            </section>
          </el-col>
        </el-row>
      </section>
    </div>
  </div>
</template>

<script>
import { homeData } from '@/data/home'
export default {
  name: "homepage",
  data() {
    return {
      homeData: homeData
    }
  }
};
</script>

<style lang="less" scoped>
.home-content {
  max-width: 1280px;
  margin: auto;
}
.introduction {
  padding-top: 120px;
  padding-bottom: 120px;
  text-align: left;
  width: 60%;
  h1 {
    font-size: 68px;
    font-weight: 700;
    margin-bottom: 32px;
  }
  h2 {
    font-size: 26px;
    line-height: 40px;
  }
}
.project-item {
  padding: 18px;
  text-align: left;
  &:hover {
    border: 1px solid #000;
    cursor: pointer;
  }
  h3 {
    font-size: 22px;
    font-weight: 600;
    margin: 24px 0;
  }
}
.peoject-container {
  margin-bottom: 36px;
  &:nth-child(2n - 1) {
    padding-top: 64px;
  }
}
</style>