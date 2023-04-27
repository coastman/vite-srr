import { createPinia } from 'pinia'
import { useCounterStore } from './counter'

export default () => {
  const pinia = createPinia();
  if (import.meta.env.SSR) useCounterStore(pinia);
  return pinia;
}
