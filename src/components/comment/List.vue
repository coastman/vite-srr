<template>
  <div class="comment-list">
    <div class="list">
      <item
        v-for="item in list"
        :is-reply="replyPid === item.id"
        :key="item.id"
        :isChild="false"
        :comment-item="item"
        v-bind="$attrs"
      >
        <template #reply>
          <editor :visible="true" />
        </template>
        <template #children>
          <item
            v-for="child in (item?.children || [])"
            :key="child.id"
            :isChild="true"
            :comment-item="child"
            :is-reply="replyPid === child.id"
            v-bind="$attrs"
          >
            <template #reply>
              <editor :visible="true" />
            </template>
          </item>
        </template>
      </item>
    </div>
  </div>
</template>

<script setup lang="ts">
import Item from './Item.vue';
import Editor from './Editor.vue';

defineProps({
  list: {
    type: Array,
    default: () => []
  },
  replyPid: {
    type: Number,
    default: -1
  }
})
</script>

<style lang="less" scoped>
.comment-list {
  > .list {
    padding: 0;
    margin: 0;

    .divider {
      margin: 14px 0px;
      border-top: 1px solid rgba(0, 0, 0, .2);
    }
  }
}
</style>
