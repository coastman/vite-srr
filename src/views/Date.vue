<template>
  <main class="date">
    <div class="date-desc">
      <div 
        class="backgroud" 
        :style="{
        'background-image': `url(${currentCategory?.backgroundUrl})`
        }"
      >
        <div class="desc">
          <!-- <i :class="currentCategory.icon"></i> -->
          <div>{{ currentCategory.description.replace('{date}', currentRoute.params.date) }}</div>
        </div>
      </div>
    </div>

    <article-list
      :articleList="articleStore.list"
      :total="articleStore.total"
      @loadMore="handleLoadMore"
    />
  </main>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import ArticleList from '@/components/article/Index.vue';
import { useCategoryStore } from '@/stores/category';
import { useArticleStore } from '@/stores/article';
import { usePrefetch } from '@/composables/prefeth';

const currentRoute = useRoute();
const categoryStore = useCategoryStore();
const articleStore = useArticleStore();
const currentCategory = computed(() => (categoryStore.list || []).find(item => item?.code === 'date'));

const dateRange = computed(() => {
  const params: any = Object.assign(currentRoute.params, currentRoute.query);
  const time = new Date(params.date);
  return [
    time.setHours(0, 0, 0, 0),
    time.setHours(23, 59, 59, 999),
  ];
});

usePrefetch(() => articleStore.fetch({
  page: 1,
  pageSize: 8,
  dateRange: dateRange.value
}));

const handleLoadMore = () => {};
</script>

<style lang="less" scoped>
.date-desc {
  padding: 10px;
  background-color: @module-bg-1;
  
  .backgroud {
    background-size: cover;
    height: 240px;
    color: #FFF;
    .desc {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      i {
        font-size: 60px;
        font-weight: 900;
        margin-bottom: 24px;
      }
    }
  }
}
</style>
