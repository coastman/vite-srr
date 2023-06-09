<template>
  <section>
    <div class="module">
      <div class="item">
        <div class="count">{{ statisticStore.statistic.hotStatistic.count }}</div>
        <span>全站文章</span>
      </div>

      <div class="separator" />

      <div class="item">
        <div class="count">{{ statisticStore.statistic.commentStatistic.count }}</div>
        <span>全站评论</span>
      </div>

      <div class="separator" />

      <div class="item">
        <div class="count">13</div>
        <span>今日阅读</span>
      </div>
    </div>
  
    <div class="hot-list">
      <div class="header">热度文章</div>
      <ul class="article-list">
        <li class="item" v-for="(item, index) in statisticStore.statistic.hotStatistic.list" :key="index">
          <span class="index">{{  index + 1 }}</span>
          <div class="content">
            <span>123333</span>
            <div class="meta">
              <span><i class="iconfont icon-shijian"></i>{{ timeAgo(item.createdAt) }}</span>
              <span><i class="iconfont icon-chakan"></i>{{ item.viewCount }}</span>
              <span><i class="iconfont icon-xiaoxi"></i>{{ item.commentCount }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <client-only>
      <Calendar :attributes="attributes" expanded borderless />
    </client-only>

    <div class="tag">
      <span v-for="(item) in statisticStore.statistic.tagStatistic.list" :key="item.id" class="tag-item">
        {{ item.name }}
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStatisticStore } from '@/stores/statistic';
import { timeAgo } from '@/helper/time';
import { Calendar } from 'v-calendar';
import 'v-calendar/style.css';
const statisticStore = useStatisticStore();

const attributes = ref<any[]>([
  {
    key: 'today',
    highlight: true,
    dates: new Date()
  }
]);
</script>


<style lang="less" scoped>
.calendar {
  width: 100%;
}
.module {
  background-color: @header-bg;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;

    .count {
      padding: 8px;
      font-size: 24px;
      font-weight: 700;
      color: @text-color;
      font-family: SpecialSymbol;
      margin-bottom: 4px;
    }

    span {
      font-size: 12px;
      color: rgba(0, 0, 0, .5);
      text-transform: uppercase;
    }
  }

  .separator {
    width: 1px;
    background-color: rgba(0, 0, 0, .26);
    height: 18px;
  }
}  

.hot-list {
  background-color: @header-bg;
  margin-bottom: 20px;
  padding: 12px;

  .header {
    color: @text-color;
    font-size: 14px;
    font-weight: 700;
    padding-left: 8px;
  }

  .article-list {
    list-style: none;
    margin: 0;
    padding: 0;
  
    .item {
      padding: 8px;
      margin-top: 8px;
      display: flex;
      color: @text-color;

      .index {
        margin-right: 8px;
      }

      .meta {
        margin-top: 4px;
        font-size: 12px;
        color: rgba(0, 0, 0, .7);

        span + span {
          margin-left: 16px;
        }
        span {
          i {
            margin-right: 6px; 
            font-size: 14px;
          }
        }
      }
    }
  }
}

.tag {
  margin-top: 20px;
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  padding: 12px;
  background-color: @header-bg;
  box-sizing: border-box;
  padding-top: 4px;

  .tag-item {
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    background-color: @comment-dark-2;
    padding: 4px;
    margin-top: 8px;
    margin-right: 8px;
    display: inline-flex;
  }
}
</style>
