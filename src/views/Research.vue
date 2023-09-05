<template>
  <div class="research-container">
    <div class="research-content">
      <el-row v-for="(item, index) in researchData.researchList" :key="index" :gutter="36">
        <el-col :span="6">
          <img :src="item.img" width="100%" alt="" srcset="" />
        </el-col>
        <el-col :span="18">
          <section>
            <h3 class="name">{{ item.name }}</h3>
            <p class="author">{{ item.author }}</p>
            <div class="list">
                <span v-for="(l, lindex) in item.list" :key="lindex">
                    <span v-if="!l.link">{{ l.name }}</span>
                    <a v-else :href="l.link">{{l.name}}</a>
                    <span v-if="lindex !== item.list.length - 1" class="list-gap"> | </span>
                </span>
            </div>
            <article class="abstract">
              {{ item.abstract }}
            </article>
          </section>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { researchData } from '@/data/research'
export default {
  data() {
    return {
        researchData: researchData
    };
  },
};
</script>
<style lang="less" scoped>
.research-content {
  max-width: 1280px;
  margin: auto;
  padding-top: 40px;
  text-align: left;
  .el-row {
    padding: 48px 0;
    border-bottom: 1px solid #004d4c;
    &:last-child {
        border-bottom: none
    }
  }
  .name {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 18px;
  }
  .author {
    margin-bottom: 12px;
    color: #004d4c;
    font-weight: 500;
    font-size: 15px;
  }
  .abstract {
    line-height: 18px;
    text-align: justify;
  }
  .list {
      margin-bottom: 16px;
      a {
          color: #004d4c;;
      }
      .list-gap {
          padding: 0 6px;
      }
  }
}
</style>