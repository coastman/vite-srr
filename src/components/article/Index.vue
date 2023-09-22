<template>
  <div class="article-list">
    <div class="article-list-item" v-for="(item) in articleList" :key="item.id">
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

  <button 
    class="load-more" 
    :disabled="articleList.length === total" 
    @click="handleLoad"
  >
    <div class="background">
      <span class="left"></span>
      <span class="right"></span>
    </div>
    <div class="content">
      <span class="left">{{ articleList.length }} / {{ total }}</span>
      <span class="right">{{ articleList.length === total ? '暂无更多' : '加载更多' }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { timeAgo } from '@/helper/time';
import type { PropType } from 'vue'

defineProps({
  articleList: {
    type: Array as PropType<any []>,
    default: () => []
  },
  total: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['loadMore']);
const handleLoad = () => emit('loadMore');
</script>

<style lang="less" scoped>
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

.load-more {
  width: 100%;
  height: 48px;
  position: relative;

  &:disabled {
    cursor: not-allowed;
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    overflow: hidden;

    .left {
      background: @module-bg-1;
      transform: skew(-20deg);
      flex: 1;
      margin-left: -16px;
      margin-right: 16px;
    }
    .right {
      width: 200px;
      margin-right: -16px;
      background: @module-bg-1;
      transform: skew(-20deg);
    }
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: @text-color-1;
    opacity: .6;

    .left {
      margin-left: 16px;
    }
    .right {
      margin-right: 16px;
    }
  }
}
</style>
