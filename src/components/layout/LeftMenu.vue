<template>
  <div class="left-menu">
    <router-link 
      class="menu-item"
      v-for="(item, index) in list"
      :key="index"
      :to="item.link"
    >
      <i :class="['iconfont', item.iconfont]" />
      <span>{{ item.text }}</span>
    </router-link>
    <a
      class="menu-item"
      href="https://github.com/coastman"
      target="_blank"
    >
      <i class="iconfont icon-caozuo_chuangxiang" />
      <span>Github</span>
    </a>
    <a
      class="menu-item"
      href="https://cloud.tencent.com"
      target="_blank"
    >
      <i class="iconfont icon-dianzan" />
      <span>AD</span>
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const list = ref([
  {
    text: '明殿',
    link: '/',
    iconfont: 'icon-shouye'
  },
  {
    text: '宁静寺',
    link: '/code',
    iconfont: 'icon-code'
  },
  {
    text: '无色庵',
    link: '/mind',
    iconfont: 'icon-caozuo_chuangxiang'
  },
  {
    text: '四方馆',
    link: '/comments',
    iconfont: 'icon-pinglun'
  },
  {
    text: '狂浪生',
    link: '/me',
    iconfont: 'icon-wo2'
  },
  {
    text: '乐库',
    link: '/music',
    iconfont: 'icon-yingyongzhongxin'
  }
]);
</script>

<style lang="less" scoped>
.left-menu {
  width: 180px;
  margin-right: 20px;

  .menu-item {
    height: 46px;
    line-height: 46px;
    color: @text-color-1;
    display: flex;
    align-items: center;
    padding-left: 14px;
    opacity: .5;
    margin-bottom: 10px;

    &:hover {
      opacity: 1;
      background-color: @module-bg-1;
      cursor: pointer;
      color: @primary-color;
    }

    &.router-link-active {
      opacity: 1;
      background-color: @module-bg-1;
      color: @primary-color;
    }

    .iconfont {
      margin-right: 16px;
    }
  }
}
</style>
