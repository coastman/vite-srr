<template>
  <section>
    <div class="module">
      <div class="item">
        <div class="count">{{ statisticStore.statistic?.hotStatistic?.count }}</div>
        <span class="description">全站文章</span>
      </div>

      <div class="separator" />

      <div class="item">
        <div class="count">{{ statisticStore.statistic?.commentStatistic?.count }}</div>
        <span class="description">全站评论</span>
      </div>

      <div class="separator" />

      <div class="item">
        <div class="count">{{ statisticStore.statistic?.todayViewCount || 0 }}</div>
        <span class="description">今日阅读</span>
      </div>
    </div>
  
    <div class="hot-list">
      <div class="header">热度文章</div>
      <ul class="article-list">
        <li class="item" v-for="(item, index) in statisticStore.statistic?.hotStatistic?.list" :key="index">
          <span :class="{
            'index': true,
            'first': index === 0,
            'second': index === 1,
            'third': index === 2
          }">{{ index + 1 }}</span>
          <div class="content">
            <router-link :to="`/detail/${item.id}`"><span>{{ item.title }}</span></router-link>
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
      <Calendar
        :attributes="attributes"
        :is-dark="isDark"
        expanded
        borderless
        @dayclick="handleDayCilck"
      />
    </client-only>

    <div class="tag">
      <span
        v-for="(item) in statisticStore.statistic?.tagStatistic?.list"
        :key="item.id"
        class="tag-item"
        @click="handleTagClick(item)"
      >
        {{ item.name }}
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, type Ref } from 'vue';
import { useStatisticStore } from '@/stores/statistic';
import { timeAgo, formatDate } from '@/helper/time';
import { Calendar } from 'v-calendar';
import 'v-calendar/style.css';
import { useTheme, Theme } from '@/composables/theme';

const router = useRouter();

const theme = useTheme();
const isDark = computed(() => theme.theme.value === Theme.Dark);

const statisticStore = useStatisticStore();
const activeDateList = computed(() => {
  const date = statisticStore.statistic?.dateList;
  const daySet = new Set();
  (date.deteList || []).forEach((item: any) => {
    const formatDay = formatDate(item.createdAt, 'yyyy-MM-dd');
    if (!daySet.has(formatDay)) {
      daySet.add(formatDay);
    }
  });
  return Array.from(daySet);
});
const attributes: Ref<any[]> = computed(() => {
  const list: any[] = [
    {
      key: 'today',
      highlight: 'gray',
      dates: new Date()
    },
    {
      dot: true,
      dates: activeDateList.value,
    }
  ];
  return list;
});
const handleDayCilck = (date: any) => {
  if (activeDateList.value.includes(date.id)) router.push({ path: `/date/${date.id}`});
};
const handleTagClick = (tag: any) => router.push({ path: `/tag/${tag.id}`});
</script>

<style lang="less" scoped>
.calendar {
  width: 100%;
}
.module {
  background-color: @module-bg-1;
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
      color: @text-color-1;
      font-family: SpecialSymbol;
      margin-bottom: 4px;
    }

    .description {
      color: @text-color-2;
    }

    span {
      font-size: 12px;
      text-transform: uppercase;
    }
  }

  .separator {
    width: 1px;
    background-color: @text-color-2;
    height: 18px;
  }
}  

.hot-list {
  background-color: @module-bg-1;
  margin-bottom: 20px;
  padding: 12px;

  .header {
    color: @text-color-1;
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
      color: @text-color-1;
      font-size: 14px;

      .index {
        margin-right: 8px;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
      }

      .first, .second, .third {
        color: #fff;
        font-size: 12px;
        margin-top: 1px;
      }

      .first {
        background-color: #0088f5;
      }
  
      .second {
        background-color: #4caf50b3;
      }

      .third {
        background-color: #ff572299;
      }

      .meta {
        margin-top: 8px;
        font-size: 12px;
        color: @text-color-2;

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
  background-color: @module-bg-1;
  box-sizing: border-box;
  padding-top: 4px;
  height: 280px;
  overflow-y: scroll;

  .tag-item {
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    background-color: @comment-dark-2;
    padding: 4px;
    margin-top: 8px;
    margin-right: 8px;
    display: inline-flex;
    padding: 6px 8px;
    cursor: pointer;
  }
}
</style>

<style lang="less">
.vc-blue {
  --vc-accent-600: @primary-color;
}

.vc-focus:focus-within {
  box-shadow: none !important;
}

.vc-dark {
  --vc-bg: @module-bg-1 !important;
}
</style>
