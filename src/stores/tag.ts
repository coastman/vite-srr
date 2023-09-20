import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import { tagList } from '@/api';

export const useTagStore = defineStore('tag', () => {
  const list: Ref<any[]> = ref([]);

  const fetch = async () => {
    const res = await tagList({
      page: 1,
      pageSize: 100
    });
    list.value = res.data.list || [];
  }

  return { list, fetch }
});
