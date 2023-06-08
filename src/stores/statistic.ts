import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getStatistic } from '@/api';


export const useStatisticStore = defineStore('statistic', () => {
  const statistic = ref({});

  const fetch = async () => {
    statistic.value = (await getStatistic()).data || {};
  };

  return {
    fetch, statistic
  };
});
