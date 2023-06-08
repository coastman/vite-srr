<template>
  <div class="detail">
    <div class="article-detail">
      <div class="title">
        <h2>{{ articleStore.detail.title }}</h2>
      </div>
      <div class="content" v-html="markdown.render(articleStore.detail.content || '')"></div>
      <div class="extra">
        <client-only>
          <button class="like-button" @click="handleLike" :disabled="disabled">
            <i></i>
            <span>真棒！ </span>
          </button>
        </client-only>
        <div style="width: 100%;">
          本文于 {{ new Date(articleStore.detail.createdAt).toLocaleString() }} 
          发布在 {{ articleStore.detail.categoryList[0].name || '未知' }} | {{ tagStrs }}
        </div>
      </div>
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
          >
          </div>
        </div>
        <div class="comment-tools" v-if="showUserInfo">
          <button class="submit" type="submit" @click="handleConfirm()">发 布</button>
        </div>
      </div>

      <div class="comment-list">
        <comment-item
          v-for="(item) in commentStore.list" 
          :key="item.id"
          :commentItem="item"
          :commentForm="commentForm"
          :likeOptions="likeOptions"
          @handleReply="handleReply(item)"
          @handleReplyChild="handleReplyChild(item)"
          @handleConfirm="handleConfirm"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { get, set } from '@/helper/storage';
import { addComment, likeArticle } from '@/api';
import CommentItem from './components/CommentItem.vue';
import { ref, reactive, onBeforeMount, type Ref, computed } from 'vue';
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

const tagStrs = computed(() => {
  return articleStore.detail.tagList.map((item: any) => `#${item.name}`).join('、');
});

const disabled = computed(() => {
  const boolean = likeOptions.value.articleIdList.includes(Number(currentRoute.params.id));
  return boolean;
});

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
const handleReply = (comment: any) => {
  commentStore.list.forEach((item) => { 
    item.relayBoxShow = false;
    item.replyChild = false;
  });
  comment.relayBoxShow = true;
};

const handleReplyChild = (comment: any) => {
  commentStore.list.forEach((item) => { 
    item.replyChild = false;
    item.relayBoxShow = false;
  });
  comment.replyChild = true;
};

const user: Ref<IUser> = ref({
  commentator: '',
  commentatorId: null
});

const likeOptions = ref({
  articleIdList: [],
  commentIdList: []
});

onBeforeMount(() => { 
  user.value = JSON.parse(get('user') as string) || {};
  commentForm.commentator = user.value.commentator;
  commentForm.commentatorId = user.value.commentatorId;
  likeOptions.value = JSON.parse(get('like') as string) || {};
});

const handleConfirm = async (comment?: any, subComment?: any) => {
  if (!comment && !subComment) { 
    commentForm.content = (commentInput.value as any).innerText;
    (commentInput.value as any).innerText = '';
  }
  const res = await addComment({
    ...commentForm,
    parentId: (subComment ? subComment?.id : comment?.id) || 0,
    articleId: currentRoute.params.id
  });

  set('user', JSON.stringify({
    commentator: res.data.result.commentator,
    commentatorId: res.data.result.commentatorId,
  }));

  commentStore.fetch(Number(currentRoute.params.id))
};

const handleLike = async () => {
  const res = await likeArticle({
    refId: Number(currentRoute.params.id),
    type: 1,
    status: 1
  });
  (likeOptions.value.articleIdList ? likeOptions.value.articleIdList : likeOptions.value.articleIdList = []).push(res?.data?.result?.refId);
  set('like', JSON.stringify(likeOptions.value))
};
</script>

<style lang="less" scoped>
.extra {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  margin-bottom: 20px;
}
.like-button {
  color: #ff6838;
  padding: 6px 8px;
  border: 1px solid #ff6838;
  border-radius: 3px;
  padding-left: 16px;
  margin-bottom: 16px;
}
.children-list {
  .children-item {
    margin-top: 20px;
  }
}
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

    &-item {
      margin-top: 12px;
    }
  }
}
</style>
