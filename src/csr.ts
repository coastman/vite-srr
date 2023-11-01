import { Theme } from './composables/theme';
import { createSSRApp } from 'vue';
import { createVueApp } from './main';
// import VueProgressBar from '@aacassandra/vue3-progressbar';
import { useClientStateStore } from './stores/clientState';

export interface InitialSSRContext {
  theme: Theme
  store?: any
}

let initialSSRContext: InitialSSRContext = {
  theme: Theme.Default,
  store: null
};

// @ts-ignore
if (window.__INITIAL_SSR_CONTEXT__) initialSSRContext = window.__INITIAL_SSR_CONTEXT__ || {};

const { app, router, pinia } = createVueApp({
  appCreator: createSSRApp,
  theme: initialSSRContext.theme || Theme.Default
});

if (initialSSRContext.store) pinia.state.value = initialSSRContext.store;

// app.use(VueProgressBar, {
//   color: '#0088f5',
//   failedColor: '#ff5722',
//   autoFinish: true
// });

router.beforeEach((_, __, next) => {
  app.config.globalProperties.$Progress.start();
  next();
});

router.afterEach((_, __, failure) => {
  failure ? app.config.globalProperties.$Progress.fail(failure) : app.config.globalProperties.$Progress.finish();
})

router.isReady().then(() => {
  app.mount('#app').$nextTick(() => {
    // @ts-ignore
    window.isHydrate = true;
    const clientStateStore = useClientStateStore(pinia.instance);
    clientStateStore.init();
    if (process.env.NODE_ENV === 'development') {
      const removeCssHotReloaded = () => {
        const devStyleList = document.querySelectorAll('.vite-dev-ssr');
        devStyleList.forEach((link) => link.remove());
      };
      removeCssHotReloaded();
    }
  });
});
