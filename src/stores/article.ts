import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getArticleList } from '@/api';

export const useArticleStore = defineStore('article', () => {
  const list = ref([]);
  const defaultParams = {
    page: 1,
    pageSize: 8
  };

  const fetch = async (params?: any) => {
    list.value = (await getArticleList(params || defaultParams)).data.list;
  };

  return { list, fetch }
});
