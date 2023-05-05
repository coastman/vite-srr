<template>
  <div class="detail">
    <div class="article-detail">
      <div class="title">
        <h2>{{ articleStore.detail.title }}</h2>
      </div>
      <div class="content" v-html="markdown.render(articleStore.detail.content || '')"></div>
    </div>

    <div class="comment">
      <div class="input-comment">
        <div class="user-info" v-if="showUserInfo">
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
            @focus="showUserInfo = true"
            @input="handleInput"
          >
          </div>
        </div>
        <div class="comment-tools" v-if="showUserInfo">
          <button class="submit" type="submit" @click="handleConfirm">发 布</button>
        </div>
      </div>

      <div class="comment-list">
        <div class="comment-item" v-for="item in commentStore.list" :key="item.id">
          <div class="avatar">
            <img src="@/assets/img/default.jpeg" alt="">
          </div>
          <div class="comment-content">
            <div class="header">
              {{ item.commentator }}
            </div>
            <div class="content">
              {{ item.content }}
            </div>
            <div class="meta">
              <span class="mr-12"><i class="iconfont icon-shijian"></i>5个月前</span>
              <button class="mr-12">赞</button>
              <button class="mr-12">踩</button>
              <button @click="handleReply">回复</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { get, set } from '@/helper/storage';
import { addComment } from '@/api';
import { ref, reactive, onBeforeMount, type Ref } from 'vue';
import { useArticleStore } from '@/stores/article';
import { useCommentStore } from '@/stores/comment';
import { usePrefetch } from '@/composables/prefeth';
import { useRoute } from 'vue-router';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

const articleStore = useArticleStore();
const commentStore = useCommentStore();
const currentRoute = useRoute();
const markdown = new MarkdownIt({
  html: true,
  xhtmlOut: true, 
  highlight(str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (ex) {
        console.warn(ex);
      }
    }
    return '';
  }
});

usePrefetch(
  () => {
    return Promise.all([
      articleStore.fetchDetail(Number(currentRoute.params.id)),
      commentStore.fetch(Number(currentRoute.params.id))
    ])
  }
);

const showUserInfo = ref(false);

interface IUser {
  commentator: string
  commentatorId: number | null
}

interface ICommentForm extends IUser {
  email: string
  content: string
}

const commentForm: ICommentForm = reactive({
  commentator: '',
  email: '',
  content: '',
  commentatorId: null
});

const commentInput = ref(null);
const handleInput = () => {
  const text = (commentInput?.value as any)?.innerText;
  commentForm.content = text;
};

const user: Ref<IUser> = ref({
  commentator: '',
  commentatorId: null
});

onBeforeMount(() => { 
  user.value = JSON.parse(get('user') as string) || {};
  commentForm.commentator = user.value.commentator;
  commentForm.commentatorId = user.value.commentatorId;
});

const handleConfirm = async () => {
  const res = await addComment({
    ...commentForm,
    parentId: 0,
    articleId: currentRoute.params.id
  });

  set('user', JSON.stringify({
    commentator: res.data.result.commentator,
    commentatorId: res.data.result.commentatorId,
  }));

  commentStore.addComment(res.data.result);
};
const handleReply = () => {};
</script>

<style lang="less" scoped>
.mr-12 {
  margin-right: 12px;
}

.article-detail {
  padding: 10px 20px;
  background-color: @header-bg;
  margin-bottom: 20px;

  .title {
    text-align: center;
  }

  .content {
    width: 100%;

    :deep(img) {
      width: 100%;
    }

    :deep(p) {
      text-indent: 2em;
      color: @article-text-color;
      line-height: 28px;
      font-size: 15px;

      img {
        display: block;
      }
    }
  }
}

.comment {
  padding: 10px 20px;
  background-color: @header-bg;

  .user-info {
    margin-bottom: 12px;
    margin-left: 56px;

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

  .comment-list {
    margin-top: 12px;

    .comment-item {
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

        .header {
          font-weight: bolder;
          margin-bottom: 14px;
        }
        .content {
          margin-bottom: 14px;
        }
        .meta {
          font-size: 12px;
          .iconfont {
            font-size: 12px;
            margin-right: 8px;
          }
        }
      }

      &:not(:first-child) {
        margin-top: 12px;
      }
    }
  }
}
</style>
