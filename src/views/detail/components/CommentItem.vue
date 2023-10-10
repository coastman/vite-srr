<template>
  <div class="comment-item">
    <div class="avatar">
      <img src="@/assets/img/default.jpeg" alt="">
    </div>

    <div class="comment-content">
      <div class="commentator">
        <span class="bold">{{ commentItem.commentator }}</span>
        <span v-if="commentItem.ipLocation?.countryName" class="commentator-item">
          <span class="emoji">{{ countryCodeToEmoji(commentItem.ipLocation.countryCode) }}</span>
          <span class="ml-8">{{ commentItem.ipLocation?.countryName }}</span>
          <span class="separator">•</span>
          <span>{{ commentItem.ipLocation?.city }}</span>
        </span>
        <span v-if="ua?.os?.name" class="ml-8 commentator-item">
          {{ ua?.os?.name }}
        </span>
        <span v-if="ua?.browser?.name" class="ml-8 commentator-item">
          {{ ua?.browser?.name }}
        </span>
      </div>
      <div class="content">{{ commentItem.content }}</div>
      <div class="meta">
        <span class="mr-12"><i class="iconfont icon-shijian"></i>{{ timeAgo(commentItem.createdAt) }}</span>
        <client-only>
          <button class="mr-12" @click="handleLike(1)" :disabled="disabled(commentItem)">赞</button>
          <!-- <button class="mr-12" @click="handleDown">踩</button> -->
        </client-only>
        <button v-if="!commentItem.relayBoxShow" @click="handleReply">回复</button>
        <button v-else @click="handleCacelReply(commentItem)">取消回复</button>
      </div>

      <div class="input-comment" v-if="commentItem.relayBoxShow">
        <div class="user-info">
          <input type="text" v-model="commentForm.commentator" placeholder="昵称 *">
          <input type="text" v-model="commentForm.email" placeholder="邮箱">
        </div>

        <div class="post-box">
          <div class="avatar">
            <img src="@/assets/img/default.jpeg" alt="">
          </div>

          <div
            ref="commentInput"
            contenteditable
            :class="{
              'content': true,
            }"
            placeholder="请输入你的见解"
          >
          </div>
        </div>
        <div class="comment-tools">
          <button class="submit" type="submit" @click="handleConfirm(commentItem)">发 布</button>
        </div>
      </div>
      <div class="reply-list" v-if="commentItem?.children?.length">
        <div class="reply-item" v-for="(subItem, index) in commentItem.children" :key="index">
          <div class="comment-box">
            <div class="avatar">
              <img src="@/assets/img/default.jpeg" alt="">
            </div>
            <div class="comment-content">
              <div class="commentator">
                <span class="bold">{{ subItem.commentator }}</span>
                <span v-if="subItem.ipLocation?.countryName" class="commentator-item">
                  <span class="emoji">{{ countryCodeToEmoji(subItem.ipLocation.countryCode) }}</span>
                  <span class="ml-8">{{ subItem.ipLocation?.countryName }}</span>
                  <span class="separator">•</span>
                  <span>{{ subItem.ipLocation?.city }}</span>
                </span>
                <span v-if="getUa(subItem).os" class="ml-8 commentator-item">
                  {{ getUa(subItem).os.name }}
                </span>
                <span v-if="getUa(subItem).browser" class="ml-8 commentator-item">
                  {{ getUa(subItem).browser.name }}
                </span>
              </div>
              <div class="content">{{ subItem.content }}</div>
              <div class="meta">
                <span class="mr-12"><i class="iconfont icon-shijian"></i>{{ timeAgo(subItem.createdAt) }}</span>
                <client-only>
                  <button class="mr-12" @click="handleLike(2, subItem)" :disabled="disabled(subItem)">赞</button>
                  <!-- <button class="mr-12" @click="handleDown">踩</button> -->
                </client-only>
                <button v-if="!(subItem.relayBoxShow && commentItem.replyChild)" @click="handleReplyChild(subItem)">回复</button>
                <button v-else @click="handleCacelReply(subItem)">取消回复</button>`
              </div>
            </div>
          </div>
          <div class="input-comment" v-if="subItem.relayBoxShow && commentItem.replyChild">
            <div class="user-info">
              <input type="text" v-model="commentForm.commentator" placeholder="昵称 *">
              <input type="text" v-model="commentForm.email" placeholder="邮箱">
            </div>

            <div class="post-box">
              <div class="avatar">
                <img src="@/assets/img/default.jpeg" alt="">
              </div>

              <div
                ref="commentInput"
                contenteditable
                :class="{
                  'content': true,
                }"
                placeholder="请输入你的见解"
              >
              </div>
            </div>
            <div class="comment-tools">
              <button class="submit" type="submit" @click="handleConfirm(commentItem, subItem)">发 布</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { likeComment } from '@/api';
import { set } from '@/helper/storage';
import { timeAgo } from '@/helper/time';
import parser from 'ua-parser-js'

const props = defineProps({
  commentItem: {
    type: Object,
    default: () => {}
  },
  commentForm: {
    type: Object,
    default: () => {}
  },
  likeOptions: {
    type: Object,
    default: () => {}
  }
});

const emit = defineEmits(['handleReply', 'handleReplyChild', 'handleConfirm']);
const handleReply = () => emit('handleReply');
const handleCacelReply = (item: any) => {
  item.relayBoxShow = false;
};

const OFFSET = 127397;
const countryCodeToEmoji = (countryCode: string): string => {
  return countryCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + OFFSET))
}

const getUa = computed(() => {
  return (item) => {
    if (item?.agent) return parser(item.agent);
    return {};
  }
});

const ua = computed(() => {
  if (props?.commentItem?.agent) return parser(props.commentItem.agent);
  return {};
});

const commentInput = ref(null);
const handleReplyChild = (subItem: any) => {
  (props.commentItem.children || []).forEach((item) => item.relayBoxShow = false);
  subItem.relayBoxShow = true;
  emit('handleReplyChild')
};

const handleConfirm = (item: any, subItem?: any) => {
  if (subItem) {
    // eslint-disable-next-line vue/no-mutating-props
    props.commentForm.content = (commentInput.value as any)[0].innerText
  } else {
    // eslint-disable-next-line vue/no-mutating-props
    props.commentForm.content = (commentInput.value as any).innerText
  }
  emit('handleConfirm', item, subItem);
};

const disabled = computed(() => (comment: any) => props.likeOptions.commentIdList.includes(comment.id))

const handleLike = async (type: number, item?: any) => {
  const res = await likeComment({
    refId: type === 1 ? props.commentItem.id : item.id,
    type: 2,
    status: 1
  });
  // eslint-disable-next-line vue/no-mutating-props
  (props.likeOptions.commentIdList ? props.likeOptions.commentIdList : props.likeOptions.commentIdList = []).push(res?.data?.result?.refId);
  set('like', JSON.stringify(props.likeOptions))
};

const handleDown = () => {

};
</script>

<style lang="less" scoped>
  .comment-item {
    margin-top: 12px;
    display: flex;

    .avatar {
      width: 48px;
      height: auto;

      img {
        width: 100%;
      }
    }

    .comment-content {
      margin-left: 12px;
      width: 100%;
      background-color: @comment-dark-1;
      padding: 8px 12px;
      font-size: 14px;

      .commentator {
        margin-bottom: 14px;

        &-item {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.5);

          .emoji {
            color: initial;
          }
        }
  
        .bold {
          font-weight: bolder;
          margin-right: 8px;
        }
        .separator {
          margin-left: 4px;
          margin-right: 4px;
        }
      }

      > .content {
        margin-bottom: 14px;
      }

      .meta {
        font-size: 12px;
        .iconfont {
          font-size: 12px;
          margin-right: 8px;
        }
      }

      .input-comment {
        margin-top: 20px;
  
        input {
          border: 1px solid @comment-dark-3;
          border-radius: 1px;
        }

        .content {
          border: 1px solid @comment-dark-3;
          border-radius: 1px;
        }

        .user-info {
          margin-bottom: 12px;
          margin-left: 56px;

          input {
            background-color: @comment-dark-1;
            outline: none;
            padding: 6px 8px;
            font-size: 14px;
          }

          input + input {
            margin-left: 12px;
          }
        }

        .post-box {
          display: flex;

          .avatar {
            width: 48px;
            height: auto;

            img {
              width: 100%;
            }
          }

          .content {
            padding: 8px 12px;
            margin-left: 12px;
            // color: #252933;
            outline: none;
            box-sizing: border-box;
            resize: both;
            background-color: @comment-dark-1;
            min-height: 90px;
            max-height: 200px;
            overflow-y: scroll;
            width: 100%;
            font-size: 14px;

            &:empty:before {
              content: attr(placeholder);
              color: @comment-placeholder-color;
              font-size: 14px;
            }

            &:focus {
              content: none;
            }
          }
        }

        .comment-tools {
          height: 30px;
          background-color: @comment-dark-2;
          margin-left: 56px;

          .submit {
            float: right;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            padding: 0px 16px;
            background-color: @comment-dark-3;
          }
        }
      }

      .reply-list {
        .reply-item {
          margin-top: 14px;

          .comment-box {
            display: flex;
          }
        }
      }
    }
  }
</style>
