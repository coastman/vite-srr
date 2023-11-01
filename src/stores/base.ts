import type { Pinia } from 'pinia'
import { useArticleStore } from './article'; 
import { useCounterStore } from './counter';
import { useCommentStore } from './comment';
import { useCategoryStore } from './category';
import { useTagStore } from './tag';
import { useStatisticStore } from './statistic';
import { useClientStateStore } from './clientState';

export const useStores = (pinia: Pinia) => ({
  article: useArticleStore(pinia),
  counter: useCounterStore(pinia),
  comment: useCommentStore(pinia),
  tag: useTagStore(pinia),
  category: useCategoryStore(pinia),
  statistic: useStatisticStore(pinia),
  clientState: useClientStateStore(pinia)
});
