import type { CreateAppFunction } from 'vue'
import createStore from '@/stores';
import { createHead, useHead } from '@unhead/vue';
import App from './App.vue'
import { createTheme, Theme } from './composables/theme';
import { createRouter } from '@/router';
import ClientOnly from './components/ClientOnly';
import VueProgressBar from '@aacassandra/vue3-progressbar';

import '@/styles/app.less';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

export interface ICreatorContext {
  appCreator: CreateAppFunction<Element>
  theme: Theme
}

export const createVueApp = (context: ICreatorContext) => {
  const app = context.appCreator(App);

  const pinia = createStore();
  app.use(pinia);

  const router = createRouter();
  app.use(router);

  const theme = createTheme(context.theme);
  app.use(theme);

  const head = createHead();
  app.use(head);

  useHead({
    htmlAttrs: {
      'class': theme.theme
    }
  });

  app.component(ClientOnly.name, ClientOnly);

  app.use(VueProgressBar, {
    color: '#0088f5',
    failedColor: '#ff5722',
    autoFinish: true
  });

  return {
    app,
    router,
    pinia,
    head,
    theme
  };
};
