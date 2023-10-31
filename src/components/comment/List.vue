<template>
  <div class="comment-list">
    <ul class="list">
      <item />
    </ul>
  </div>
</template>

<script setup lang="ts">
import Item from './Item.vue';
</script>

<style lang="less" scoped>
.comment-list {
  > .list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
</style>
