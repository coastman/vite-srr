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

    <div class="article-list">
      <div class="article-list-item" v-for="(item) in articleStore.list" :key="item.id">
        <router-link :to="`/detail/${item.id}`">
          <div class="item">
            <div class="image-box">
              <img :src="item.thumbnailUrl" alt="">
            </div>
            <div class="item-body">
              <div class="title">
                <div class="title-main">{{ item.title }}</div>
                <div class="description">{{ item.description }}</div>
              </div>
              <div class="meta">
                <span><i class="iconfont icon-shijian"></i>{{ timeAgo(item.createdAt) }}</span>
                <span><i class="iconfont icon-chakan"></i>{{ item.viewCount }}</span>
                <span><i class="iconfont icon-xiaoxi"></i>{{ item.commentCount }}</span>
                <span><i class="iconfont icon-dianzan"></i>{{ item.likeCount }}</span>
                <span><i class="iconfont icon-yingyongzhongxin"></i>{{ item.categoryList[0]?.name || '' }}</span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCategoryStore } from '@/stores/category';
import { useArticleStore } from '@/stores/article';
import { usePrefetch } from '@/composables/prefeth';
import { timeAgo } from '@/helper/time';

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

.article-list {
  width: 100%;
  margin-top: 20px;

  &-item {
    width: 100%;
    height: 140px;
    margin-bottom: 20px;
    color: @text-color-1;
    background-color: @module-bg-2;
    cursor: pointer;

    &:hover {
      background-color: @module-bg-1;
    }

    .item {
      padding: 10px;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
    }

    .image-box {
      width: 230px;
      z-index: 6;

      img {
        width: 100%;
        object-fit: cover;
        height: 100%;
      }
      margin-right: 14px;
    }

    .item-body {
      flex: 1;

      .title {
        margin-bottom: 50px;
      }

      .title-main {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 16px;
      }

      .meta {
        // display: flex;
        span + span {
          margin-left: 42px;
        }
        span {
          i { margin-right: 8px; }
        }
        // justify-content: space-between;
      }
    }
  }
}
</style>
