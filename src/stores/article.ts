import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { getArticleList, getArticleDetail } from '@/api';

export const useArticleStore = defineStore('article', () => {
  const list = ref([]);
  const detail: Ref<any> = ref({});
  const defaultParams = {
    page: 1,
    pageSize: 8
  };

  const fetch = async (params?: any) => {
    list.value = (await getArticleList(params || defaultParams)).data.list;
  };

  const fetchDetail = async (id: number) => {
    detail.value = (await getArticleDetail(id)).data.result;
  };

  return { list, fetch, fetchDetail, detail }
});
