import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { getArticleList, getArticleDetail } from '@/api';
import { useCategoryStore } from './category';
import { useTagStore } from './tag';

export const useArticleStore = defineStore('article', () => {
  const list = ref([]);
  const detail: Ref<any> = ref({});
  const total = ref(0);
  const defaultParams = {
    page: 1,
    pageSize: 8
  };

  const categoryStore = useCategoryStore();
  const tagStore = useTagStore();
  const fetch = async (params?: any) => {
    defaultParams.page = 1;
    const res = (await getArticleList(params || defaultParams)).data;
    list.value = res.list;
    const categoryList = categoryStore.list;
    for (const item of list.value) {
      if (item?.categoryIdList?.length) {
        item.categoryList = item?.categoryIdList.map((id: any) => categoryList.find(subItem => subItem.id === id));
      }
    }
    total.value = res.total;
  };

  const fetchDetail = async (id: number) => {
    detail.value = (await getArticleDetail(id)).data;
    const categoryList = categoryStore.list;
    const tagList = tagStore.list;
    detail.value.result.categoryList = detail.value.result.categoryIdList.map((id: any) => categoryList.find(subItem => subItem.id === id)) || [];
    detail.value.result.tagList = detail.value.result.tagIdList.map((id: any) => tagList.find(item => item.id === id)) || [];
  };

  const loadMore = async (params?: any) => {
    defaultParams.page++;
    const res = (await getArticleList(params || defaultParams)).data;
    total.value = res.total;
    const categoryList = categoryStore.list;
    for (const item of res.list) {
      if (item?.categoryIdList?.length) {
        item.categoryList = item?.categoryIdList.map((id: any) => categoryList.find(subItem => subItem.id === id));
      }
    }
    list.value = list.value.concat(res.list);
  };

  return { list, fetch, fetchDetail, detail, loadMore, total }
});
