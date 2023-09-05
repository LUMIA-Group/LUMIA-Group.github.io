<template>
  <div class="header-container">
    <el-row class="header-content">
      <el-col :span="8">
        <div class="header-logo" @click="clickHeader({ value: 'home' })">
          <img
            class="logo"
            :src="headerData.logo || 'https://vi.sjtu.edu.cn/img/brand-logo-s-w.png'"
            alt=""
            srcset=""
          />
          <span class="name">{{ headerData.name }}</span>
        </div>
      </el-col>
      <el-col :span="16">
        <ul class="header-list">
          <li
            class="header-item"
            :class="{ active: activeHeader === item.value }"
            v-for="item in headerData.headerList"
            :key="item.value"
            @click="clickHeader(item)"
          >
            {{ item.label }}
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { headerData } from '@/data/header'
export default {
  data() {
    return {
        headerData: headerData,
      activeHeader: "",
    };
  },
  mounted() {
      this.activeHeader = this.$route.name
  },
  methods: {
    clickHeader(item) {
      this.activeHeader = item.value;
      if (item.type === "link") {
        window.open(item.value, "_blank");
      } else {
        if (this.$route.name !== item.value) {
          this.$router.push({
            name: item.value,
          });
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.header-container {
  height: 78px;
  line-height: 78px;
  background: #004d4c;
  color: #fff;
  .header-content {
    max-width: 1280px;
    margin: auto;
  }
  .header-logo {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .logo {
    width: 50px;
    margin-right: 12px;
  }
  .name {
    font-weight: 500;
    font-size: 20px;
  }
  .header-list {
    display: flex;
    justify-content: flex-end;
    .header-item {
      padding: 0 24px;
      font-weight: 600;
      font-size: 18px;
      cursor: pointer;
      &.active {
        box-shadow: inset 0 -4px #fff;
      }
      &:hover {
        box-shadow: inset 0 -4px #fff;
      }
    }
  }
}
</style>