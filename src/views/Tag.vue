<template>
  <main class="tag">
    <div class="tag-desc">
      <div 
        class="backgroud" 
        :style="{
        'background-image': `url(${currentCategory?.backgroundUrl})`
        }"
      >
        <div class="desc">
          <!-- <i :class="currentCategory.icon"></i> -->
          <div>{{ currentTag.name }} | {{ currentTag.description }}</div>
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

<script setup lang="ts">
import { computed } from 'vue';
import ArticleList from '@/components/article/Index.vue';
import { useRoute } from 'vue-router';
import { useCategoryStore } from '@/stores/category';
import { useArticleStore } from '@/stores/article';
import { useTagStore } from '@/stores/tag';
import { usePrefetch } from '@/composables/prefeth';

const currentRoute = useRoute();
const categoryStore = useCategoryStore();
const articleStore = useArticleStore();
const tagStore = useTagStore();
const currentCategory = computed(() => (categoryStore.list || []).find(item => item?.code === 'tag'));
const currentTag = computed(() => (tagStore.list || []).find(item => String(item.id) === currentRoute.params.id));

usePrefetch(() => articleStore.fetch({
  page: 1,
  pageSize: 8,
  tagId: currentRoute.params.id
}));

const handleLoadMore = () => {};
</script>

<style lang="less" scoped>
.tag-desc {
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
