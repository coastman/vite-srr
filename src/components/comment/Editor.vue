<template>
  <div class="input-box">
    <div v-show="visible" class="profile">
      <input type="text" v-model="commentForm.commentator" placeholder="昵称 *">
      <input type="text" v-model="commentForm.email" placeholder="邮箱">
    </div>

    <div class="post-box">
      <div class="avatar">
        <img src="@/assets/img/default.jpeg" alt="">
      </div>
      <div v-if="visible" class="editor">
        <div class="input-wrapper">
          <textarea
            v-model="commentForm.content"
            class="editor-input"
            placeholder="请输入"
          ></textarea>
        </div>
        <div class="tool-box">
          <div class="tool">
            <button class="emoji" title="emoji" type="button">
              表 情
              <div class="emoji-box">
                <ul class="emoji-list">
                  <li v-for="(emoji, index) in EMOJIS" v-once class="item" :key="index">
                    <span>{{ emoji }}</span>
                  </li>
                </ul>
              </div>
            </button>
          </div>
    
          <button type="submit" class="submit" @click="handleSubmit">
            发 布
          </button>
        </div>
      </div>
      <div v-else class="placeholder" @click="handleUseEditor">有趣的评论...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

interface IUser {
  commentator: string
  commentatorId: number | null
}

interface ICommentForm extends IUser {
  email: string
  content: string
}

const EMOJIS = [
  '😃', '😂', '😅', '😉', '😌', '😔', '😓', '😢', '😍', '😘', '😜', '😡',
  '😤', '😭', '😱', '😳', '😵', '🌚', '🙏', '💪', '👌', '🤘', '👍', '👎', '👏',
  '🌻', '🌹', '💊', '🐶', '🐈', '✨', '❤️‍🔥', '💔', '💩', '👻', '🚩'
];

const commentForm = reactive({
  commentator: '',
  commentatorId: '',
  email: '',
  content: ''
});

const visible = ref(false);
const handleUseEditor = () => {
  visible.value = true;
};
</script>

<style lang="less" scoped>
.input-box {
  .profile {
    margin-left: 60px;

    input {
      background-color: @comment-dark-1;
      border: none;
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
    margin-top: 12px;
  
    .avatar {
      width: 48px;
      height: 48px;
      img {
        width: 100%;
      }
    }
    .editor {
      margin-left: 12px;
      flex: 1;
      textarea {
        box-sizing: border-box;
        width: 100%;
        background-color: @comment-dark-1;
        border: none;
        outline: none;
        padding: 6px 8px;
        font-size: 14px;
        min-height: 90px;
        max-height: 200px;
        padding-bottom: 0px;
      }
      .tool-box {
        display: flex;
        justify-content: space-between;
        background-color: #dedede;
        height: 32px;
        line-height: 32px;
        margin-top: -3px;
        position: relative;
        font-size: 14px;
    
        .tool {
          .emoji {
            &:hover {
              .emoji-box {
                display: block;
              }
            }
            .emoji-box {
              display: none;
              position: absolute;
              left: 0;
              top: 100%;
              width: 100%;
              background-color: #c2c2c2;
    
              .emoji-list {
                list-style: none;
                padding: 0;
                margin: 0;
                font-size: 18px;
                display: grid;
                grid-template-columns: repeat(12, 1fr);
              }
            }
          }
        }
      }
    }

    .placeholder {
      background-color: #e8e8e8;
      padding: 0px 12px;
      font-size: 18px;
      flex: 1;
      margin-left: 10px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
