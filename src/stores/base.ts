import type { Pinia } from 'pinia'
import { useArticleStore } from './article'; 
import { useCounterStore } from './counter';

export const useStores = (pinia: Pinia) => ({
  '/': useArticleStore(pinia),
  counter: useCounterStore(pinia)
});
