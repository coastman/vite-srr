<template>
  <div class="comment-box">
    <topbar />
    <div class="divider"></div>
    <editor v-model:visible="visible" />
    <div class="divider"></div>
    <list
      :list="list"
      :reply-pid="state.replyPId" 
      @reply="handleReply"
      @cancelReply="handleCancelReply"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Topbar from './Topbar.vue';
import Editor from './Editor.vue';
import List from './List.vue';

defineProps({
  list: {
    type: Array,
    default: () => []
  }
})

const state = reactive({
  replyPId: -1
});
const visible = ref(false);
const handleReply = (id) => {
  state.replyPId = id;
}
const handleCancelReply = () => {
  state.replyPId = -1;
}
</script>

<style lang="less" scoped>
.comment-box {
  padding: 10px 20px;
  background-color: @module-bg-1;

  .divider {
    margin: 14px 0px;
    border-top: 1px solid rgba(0, 0, 0, .2);
  }
}
</style>
