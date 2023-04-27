import type { CreateAppFunction } from 'vue'
import { type RouterHistory, createRouter } from 'vue-router'
import App from './App.vue'

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
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
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
  historyCreator(base?: string): RouterHistory
}

export const createVueApp = (context: ICreatorContext) => {
  const app = context.appCreator(App)
  const router = createUniversalRouter({
    history: context.historyCreator()
  })

  app.use(router);

  return {
    app,
    router
  }
};
