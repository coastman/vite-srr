import { Theme } from './composables/theme';
import { createSSRApp } from 'vue';
import { createVueApp } from './main';

// import './assets/main.css'
// import './styles/variables.less'

export interface InitialSSRContext {
  theme: Theme
  store?: any
}

let initialSSRContext: InitialSSRContext = {
  theme: Theme.Default,
  store: null
};

// @ts-ignore
if (window.__INITIAL_SSR_CONTEXT__) initialSSRContext = JSON.parse(window.__INITIAL_SSR_CONTEXT__) || {};

const { app, router, pinia } = createVueApp({
  appCreator: createSSRApp,
  theme: initialSSRContext.theme || Theme.Default
});

if (initialSSRContext.store) pinia.state.value = initialSSRContext.store;

router.isReady().then(() => {
  app.mount('#app');
})
