import { createRouter as _createRouter, createWebHistory, createMemoryHistory } from 'vue-router';
const Home = () => import('../views/Home.vue');
const Detail = () => import('../views/Detail.vue');
const Code = () => import('../views/Code.vue');
const Mind = () => import('../views/Mind.vue');
const Comments = () => import('../views/Comments.vue');
const Me = () => import('../views/Me.vue');

export const createRouter = () => {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/detail/:id',
        name: 'detail',
        component: Detail
      },
      {
        path: '/code',
        name: 'code',
        component: Code
      },
      {
        path: '/mind',
        name: 'mind',
        component: Mind
      },
      {
        path: '/comments',
        name: 'comments',
        component: Comments
      },
      {
        path: '/me',
        name: 'me',
        component: Me
      }
    ]
  });
};

