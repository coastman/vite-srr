<template>
  <div class="topbar">
    <div class="statistics">
      <div class="total">
        共 <span class="count">10</span> 条看法
      </div>
      <select class="sort" v-model="sort">
        <option :value="SortType.Desc">
          最新
        </option>
        <option :value="SortType.Hottest">
          最热
        </option>
        <option :value="SortType.Asc">
          最早
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

enum SortType {
  Asc = 1, // 升序
  Desc = -1, // 降序
  Hottest = 2 // 热序
}
const sort = ref(1);
</script>

<style lang="less" scoped>
.topbar {
  .statistics {
    height: 32px;
    line-height: 32px;
    display: flex;
    font-size: 14px;

    .total, .sort {
      background-color: @comment-dark-1;
      padding: 0 4px;
    }

    .sort {
      margin-left: 8px;
      border-radius: 2px;
      -webkit-appearance: menulist-button;
      border-width: 0;
      padding: 0 4px;

      &:focus-visible {
        outline: none;
      }
    }
  }
}  
</style>
