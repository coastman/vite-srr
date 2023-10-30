<template>
  <div class="comment-box">
    <topbar />
    <div class="divider"></div>
    <editor />
  </div>
</template>

<script setup>
import Topbar from './Topbar.vue';
import Editor from './Editor.vue';
</script>

<style lang="less" scoped>
.comment-box {
  padding: 10px 20px;
  background-color: @module-bg-1;

  .divider {
    margin: 14px 0px;
    border-top: 1px solid rgba(0, 0, 0, .2);
  }
}
</style>
