import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import { categoryList } from '@/api';

export const useCategoryStore = defineStore('category', () => {
  const list: Ref<any[]> =  ref([]);

  const fetch = async () => {
    const res = await categoryList();
    list.value = res.data.list || [];
  }

  return { list, fetch }
});
