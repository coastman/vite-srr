<template>
  <div>
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
import { useStatisticStore } from './stores/statistic';
import { usePrefetch } from '@/composables/prefeth';

const categoryStore = useCategoryStore();
const tagStore = useTagStore();
const statisticStore = useStatisticStore();

usePrefetch(() => Promise.all([
  categoryStore.fetch(),
  tagStore.fetch(),
  statisticStore.fetch()
]));
</script>
