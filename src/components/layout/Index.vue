<template>
  <div class="layout">
    <app-header />

    <main class="main">
      <left-menu />

      <div class="main-content">
        <router-view :key="$route.fullPath"/>
      </div>

      <right-box class="right-box" />
    </main>

    <div class="footer">
      footer
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppHeader from './Header.vue';
import LeftMenu from './LeftMenu.vue';
import RightBox from './RightBox.vue';

</script>

<style lang="less" scoped>
.layout {

  .main {
    width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;

    .main-content {
      width: 720px;
      margin-right: 20px;
    }

    .right-box {
      flex: 1;
    }
  }

  .footer {
    margin-top: 20px;
    background-color: @module-bg-1;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
