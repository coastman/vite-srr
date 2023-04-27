import { createSSRApp } from 'vue';
import { createWebHistory } from 'vue-router';
import { createVueApp } from './main';

import './assets/main.css'
// import './styles/variables.less'

import { Theme } from './composables/theme';

const { app, router, pinia } = createVueApp({
  historyCreator: createWebHistory,
  appCreator: createSSRApp,
  // @ts-ignore
  theme: JSON.parse(window.__INITIAL_SSR_CONTEXT__).theme || Theme.Default
});

// @ts-ignore
if (window.__INITIAL_SSR_CONTEXT__) pinia.state.value = JSON.parse(window.__INITIAL_SSR_CONTEXT__).store;

router.isReady().then(() => {
  app.mount('#app');
})
