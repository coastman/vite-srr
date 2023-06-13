import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { getArticleList, getArticleDetail } from '@/api';
import { useCategoryStore } from './category';
import { useTagStore } from './tag';

export const useArticleStore = defineStore('article', () => {
  const list = ref([]);
  const detail: Ref<any> = ref({});
  const defaultParams = {
    page: 1,
    pageSize: 8
  };

  const categoryStore = useCategoryStore();
  const tagStore = useTagStore();
  const fetch = async (params?: any) => {
    list.value = (await getArticleList(params || defaultParams)).data.list;
    const categoryList = categoryStore.list;
    for (const item of list.value) {
      if (item?.categoryIdList?.length) {
        item.categoryList = item?.categoryIdList.map((id: any) => categoryList.find(subItem => subItem.id === id));
      }
    }
  };

  const fetchDetail = async (id: number) => {
    detail.value = (await getArticleDetail(id)).data.result;
    const categoryList = categoryStore.list;
    const tagList = tagStore.list;
    detail.value.categoryList = detail.value.categoryIdList.map((id: any) => categoryList.find(subItem => subItem.id === id)) || [];
    detail.value.tagList = detail.value.tagIdList.map((id: any) => tagList.find(item => item.id === id)) || [];
  };

  return { list, fetch, fetchDetail, detail }
});
