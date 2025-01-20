import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'index',
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        name: 'fruits',
        path: '/fruits',
        component: () => import('pages/FruitsPage.vue'),
      },
      {
        name: 'soccer-spain1',
        // path: '/soccer/:leagueId',
        path: '/soccer-spain1',
        component: () => import('pages/SoccerPageSpain1.vue'),
      },
      {
        name: 'soccer-england1',
        // path: '/soccer-test/:leagueId',
        path: '/soccer-england1',
        component: () => import('pages/SoccerPageEngland1.vue'),
      },
      {
        name: 'addPlayer',
        path: '/add-player',
        component: () => import('pages/AddPlayerPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
