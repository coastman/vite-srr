import type { Pinia } from 'pinia'
import { useArticleStore } from './article'; 
import { useCounterStore } from './counter';
import { useCommentStore } from './comment';

export const useStores = (pinia: Pinia) => ({
  article: useArticleStore(pinia),
  counter: useCounterStore(pinia),
  comment: useCommentStore(pinia)
});
