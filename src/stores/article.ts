import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { getArticleList, getArticleDetail } from '@/api';
import { useCategoryStore } from './category';
import { useTagStore } from './tag';

interface Ipage {
  page: number,
  pageSize: number,
  categotyId?: number
}

export const useArticleStore = defineStore('article', () => {
  const list: Ref<any[]> = ref([]);
  const detail: Ref<any> = ref({});
  const total = ref(0);
  const defaultParams = {
    page: 1,
    pageSize: 8
  };

  const categoryStore = useCategoryStore();
  const tagStore = useTagStore();
  const fetch = async (params?: Ipage) => {
    defaultParams.page = 1;
    const res = (await getArticleList(params || defaultParams)).data;
    list.value = res.list;
    const categoryList = categoryStore.list;
    for (const item of list.value) {
      if (item?.categoryIdList?.length) {
        item.categoryList = item?.categoryIdList
          .map((id: number | string) => categoryList.find(subItem => subItem.id === id));
      }
    }
    total.value = res.total;
  };

  const fetchDetail = async (id: number) => {
    detail.value = (await getArticleDetail(id)).data;
    const categoryList = categoryStore.list;
    const tagList = tagStore.list;
    detail.value.result.categoryList = detail.value.result.categoryIdList
      .map((id: number | string) => categoryList.find(subItem => subItem.id === id)) || [];

    detail.value.result.tagList = detail.value.result.tagIdList
      .map((id: number | string) => tagList.find(item => item.id === id)) || [];
  };

  const loadMore = async (params?: Ipage) => {
    defaultParams.page++;
    const res = (await getArticleList(params || defaultParams)).data;
    total.value = res.total;
    const categoryList = categoryStore.list;
    for (const item of res.list) {
      if (item?.categoryIdList?.length) {
        item.categoryList = item?.categoryIdList
          .map((id: number | string) => categoryList.find(subItem => subItem.id === id));
      }
    }
    list.value = list.value.concat(res.list);
  };

  return { list, fetch, fetchDetail, detail, loadMore, total }
});
