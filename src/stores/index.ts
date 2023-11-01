import { createPinia } from 'pinia'
import { useStores } from './base';

export default () => {
  const pinia = createPinia();

  if (import.meta.env.SSR) { 
    useStores(pinia);
  }

  return {
    stores: import.meta.env.SSR ? useStores(pinia) : null,
    install: pinia.install,
    state: pinia.state,
    instance: pinia
  }
}
