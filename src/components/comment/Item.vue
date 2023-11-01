<template>
  <div :class="{
    'item': true,
    'is-child': isChild,
  }">
    <div class="avatar">
      <img src="@/assets/img/default.jpeg" alt="">
    </div>
  
    <div class="body">
      <div class="header">
        <div class="left">
          <span class="name">{{ commentItem.commentator }}</span>
          <span v-if="commentItem?.ipLocation?.countryName" class="location">
            <span class="emoji">{{ countryCodeToEmoji(commentItem.ipLocation.countryCode) }}</span>
            <span>{{ commentItem.ipLocation?.countryName }}</span>
            <span>.</span>
            <span>{{ commentItem.ipLocation?.city }}</span>
          </span>
          <span v-if="userAgent?.os && userAgent?.browser" class="user-agent">
            <span class="os">{{ userAgent.os.name }}</span>
            <span class="browser"> {{ userAgent.browser.name }}</span>
          </span>
        </div>
        <div class="right">
          <span class="sort">#{{ commentItem.id }}</span>
        </div>
      </div>
      <div v-if="isChild" class="reply-mark">
        回复 #{{ commentItem.parentId }} @{{ commentItem.parentName }}
      </div>
      <div class="content">
        <span>{{ commentItem.content }}</span>
      </div>
      <div class="footer">
        <span class="create-date">
          2 个月前
        </span>
        <button>赞(1)</button>
        <button>踩(0)</button>
        <button v-if="isReply" @click="handleCancelReply">取消回复</button>
        <button v-else @click="handleReply(commentItem.id)">回复</button>
      </div>
  
      <div v-if="isReply" class="reply">
        <slot name="reply" />
      </div>
      <div v-if="commentItem.children && commentItem.children.length" class="children">
        <slot name="children"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import parser from 'ua-parser-js';

const props = defineProps({
  isChild: {
    type: Boolean,
    default: false
  },
  commentItem: {
    type: Object,
    default: () => {}
  },
  isReply: {
    type: Boolean,
    default: false
  }
});

const OFFSET = 127397;
const countryCodeToEmoji = (countryCode: string): string => {
  return countryCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + OFFSET))
};
const userAgent = computed(() => {
  if (props?.commentItem?.agent) return parser(props.commentItem.agent);
  return {};
});
const emit = defineEmits(['reply', 'cancelReply']);
const handleReply = (id) => {
  emit('reply', id);
};
const handleCancelReply = () => {
  emit('cancelReply');
};
</script>

<style lang="less" scoped>
.item {
  padding-left: 24px;
  position: relative;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0px;
  }
  
  .avatar {
    position: absolute;
    left: 0px;
    top: 24px;
    
    img {
      width: 48px;
      height: 48px;
    }
  }
  
  > .body {
    background-color: #e8e8e8;
    padding: 8px 8px 8px 36px;

    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .content {
      margin-bottom: 12px;
    }

    .reply {
      margin-top: 12px;
    }

    .children {
      margin-top: 8px;
    }
  }
}

.is-child {
  margin-bottom: 0px;
  border-top: 1px solid rgba(0, 0, 0, .2);
}

.is-child:last-child {
  > .body {
    padding-bottom: 0px;
  }
}
</style>
