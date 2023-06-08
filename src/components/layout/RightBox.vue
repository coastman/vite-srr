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
  </section>
</template>

<script setup lang="ts">
import { useStatisticStore } from '@/stores/statistic';
const statisticStore = useStatisticStore();

</script>


<style lang="less" scoped>
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
</style>
