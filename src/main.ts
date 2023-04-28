import type { CreateAppFunction } from 'vue'
import createStore from '@/stores';
import { createHead, useHead } from '@unhead/vue';
import App from './App.vue'
import { createTheme, Theme } from './composables/theme';
import { createRouter } from '@/router';

import './assets/main.css';

export interface ICreatorContext {
  appCreator: CreateAppFunction<Element>
  theme: Theme
}

export const createVueApp = (context: ICreatorContext) => {
  const app = context.appCreator(App)

  const pinia = createStore()
  app.use(pinia);

  const router = createRouter()
  app.use(router);

  const theme = createTheme(context.theme);
  app.use(theme);

  const head = createHead();
  app.use(head);
  useHead({
    htmlAttrs: {
      'class': theme.theme
    }
  })

  return {
    app,
    router,
    pinia,
    head,
    theme
  }
};
