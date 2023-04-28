<template>
  <main class="home">
    <div class="carousel">
      carousel
      <span v-for="(item, index) in articleStore.list" :key="index">
        {{ item.title }}
      </span>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { useArticleStore } from '@/stores/article';
  import { usePrefetch } from '@/composables/prefeth';
  const articleStore = useArticleStore();
  usePrefetch(() => articleStore.fetch())
</script>

<style lang="less" scoped>
  .home {

  }
</style>
