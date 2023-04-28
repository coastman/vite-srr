<template>
  <div class="layout">
    <app-header />

    <main class="main">
      <div class="left-nenu">
      </div>

      <div class="main-content">
        <router-view />
      </div>

      <div class="right-box">

      </div>
    </main>

    <div class="footer">
      footer
    </div>
  </div>
</template>

<script lang="ts" setup>
  import AppHeader from './Header.vue';

</script>

<style lang="less" scoped>
.layout {

  .main {
    width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;

    .left-nenu {
      width: 180px;
      margin-right: 20px;
    }

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
    background-color: @header-bg;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
