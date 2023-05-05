import { onServerPrefetch, onBeforeMount } from 'vue';

export const usePrefetch = (fetch: () => Promise<any>) => {
  if (import.meta.env.SSR) {
    onServerPrefetch(async () => {
      await fetch().catch(err => {
        console.log(err);
      });
    })
    return;
  }

  // @ts-ignore
  if (window && window.isHydrate) {
    onBeforeMount(async () => await fetch());
  }
};
