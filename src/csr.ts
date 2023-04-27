import { createSSRApp } from 'vue';
import { createWebHistory } from 'vue-router';
import { createVueApp } from './main';

import './assets/main.css'

const { app, router } = createVueApp({
  historyCreator: createWebHistory,
  appCreator: createSSRApp,
});

router.isReady().then(() => {
  app.mount('#app');
})
