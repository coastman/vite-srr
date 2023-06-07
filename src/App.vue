<template>
  <div class="root">
    <client-only>
      <vue-progress-bar />
    </client-only>
  
    <layout />
  </div>
</template>

<script setup lang="ts">
import Layout from '@/components/layout/Index.vue'
import { useCategoryStore } from './stores/category';
import { useTagStore } from './stores/tag';
import { usePrefetch } from '@/composables/prefeth';

const categoryStore = useCategoryStore();
const tagStore = useTagStore();

usePrefetch(() => Promise.all([
  categoryStore.fetch(),
  tagStore.fetch()
]));
</script>

<style scoped lang="less">
.root {

}
</style>
