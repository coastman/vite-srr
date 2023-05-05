import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { fetchCommentByArticle } from '@/api'

export const useCommentStore = defineStore('comment', () => {
  const list: Ref<any> = ref([]);

  const fetch = async (id: number) => {
    list.value = (await fetchCommentByArticle(id)).data.list;
  };

  const addComment = (comment: any) => {
    list.value.unshift(comment);
    console.log(list.value);
  };

  return { list, fetch, addComment }
});
