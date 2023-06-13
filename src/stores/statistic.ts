import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getStatistic } from '@/api';

export interface IStatisticItem {
  count?: number
  list?: Array<any>
}
export interface IStatistic {
  hotStatistic?: IStatisticItem
  tagStatistic?: IStatisticItem
  commentStatistic?: IStatisticItem 
}

export const useStatisticStore = defineStore('statistic', () => {
  const statistic = ref<IStatistic>({});

  const fetch = async () => {
    statistic.value = (await getStatistic()).data || {};
  };

  return {
    fetch, statistic
  };
});
