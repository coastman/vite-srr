import type { CreateAppFunction } from 'vue'
import { type RouterHistory, createRouter } from 'vue-router'
import createStore from '@/stores';
import { createHead, useHead } from '@unhead/vue';
import App from './App.vue'
import { createTheme, Theme } from './composables/theme';

export const createUniversalRouter = (options: any) => {
  const router = createRouter({
    routes: [
      {
        path: '/',
        name: 'home',
        component: () => import('./views/HomeView.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('./views/AboutView.vue')
      }
    ],
    strict: true,
    history: options.history,
    linkActiveClass: 'link-active',
  })

  return router;
}

export interface ICreatorContext {
  appCreator: CreateAppFunction<Element>
  historyCreator(base?: string): RouterHistory,
  theme: Theme
}

export const createVueApp = (context: ICreatorContext) => {
  const app = context.appCreator(App)

  const pinia = createStore()
  app.use(pinia);

  const router = createUniversalRouter({
    history: context.historyCreator()
  })
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
