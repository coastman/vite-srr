<template>
  <main class="home">
    <div class="carousel">
      <swiper
        class="swiper"
        :slides-per-view="1"
        :space-between="50"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        :modules="[Navigation, Pagination, Autoplay]"
        :autoplay="{ delay: 3500, disableOnInteraction: false }"
        :pagination="{
          clickable: true
        }"
      >
        <swiper-slide v-for="(item, index) in articleStore.list" :key="index">
          <img :src="item.thumbnailUrl" alt="" />
        </swiper-slide>
      </swiper>
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
                <span><i class="iconfont icon-shijian"></i>5个月前</span>
                <span><i class="iconfont icon-chakan"></i>{{ item.viewCount }}</span>
                <span><i class="iconfont icon-xiaoxi"></i>4</span>
                <span><i class="iconfont icon-dianzan"></i>1</span>
                <span><i class="iconfont icon-yingyongzhongxin"></i>无色庵</span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { useArticleStore } from '@/stores/article';
  import { usePrefetch } from '@/composables/prefeth';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Navigation, Pagination, Autoplay } from 'swiper';

  const articleStore = useArticleStore();
  usePrefetch(() => articleStore.fetch());
  const onSwiper = (swiper: any) => {
    console.log(swiper);
  };

  const onSlideChange = () => {
    console.log('slide change');
  };
</script>

<style lang="less" scoped>
  .home {
    .carousel {
      padding: 10px;
      background-color: @header-bg;
    }
  
    .swiper {
      width: 100%;
      height: 240px;
      overflow: hidden;

      :deep(.swiper-pagination-bullet) {
        width: 10px;
        background-color: rgba(255, 255, 255);
        opacity: .5;
        border-radius: 1px;
      }
    
      :deep(.swiper-pagination-bullet-active) {
        width: 20px;
        background-color: #FFF;
        opacity: 1;
        border-radius: 2px;
      }

      img {
        width: 100%;
        object-fit: contain;
        height: auto;
      }
    }

    .article-list {
      width: 100%;
      margin-top: 20px;

      &-item {
        width: 100%;
        height: 140px;
        margin-bottom: 20px;
        color: @text-color;
        background-color: @module-bg;
        cursor: pointer;

        &:hover {
          background-color: @header-bg;
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
  }
</style>
