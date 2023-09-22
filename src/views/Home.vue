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
          <router-link :to="`/detail/${item.id}`" class="swiper-link">
            <img :src="item.thumbnailUrl" alt="" />
          </router-link>
        </swiper-slide>
      </swiper>
    </div>
    <article-list
      :articleList="articleStore.list"
      :total="articleStore.total"
      @loadMore="handleLoadMore"
    />
  </main>
</template>

<script setup lang="ts">
  import { useArticleStore } from '@/stores/article';
  import { usePrefetch } from '@/composables/prefeth';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Navigation, Pagination, Autoplay } from 'swiper';
  import ArticleList from '@/components/article/Index.vue';

  const articleStore = useArticleStore();
  usePrefetch(() => articleStore.fetch());
  const onSwiper = (swiper: any) => {
    console.log(swiper);
  };

  const onSlideChange = () => {
    console.log('slide change');
  };

  const handleLoadMore = () => {
    articleStore.loadMore();
  };
</script>

<style lang="less" scoped>
  .home {
    .carousel {
      padding: 10px;
      background-color: @module-bg-1;
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

      .swiper-link {
        opacity: 1;
      }

      img {
        width: 100%;
        object-fit: contain;
        height: auto;
      }
    }
  }
</style>
