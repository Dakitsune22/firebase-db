import { RouteRecordRaw } from 'vue-router';
// import { Leagues } from 'src/models';

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
      // {
      //   name: 'fruits',
      //   path: '/fruits',
      //   component: () => import('pages/FruitsPage.vue'),
      // },
      {
        name: 'soccer',
        path: '/soccer/:id',
        component: () => import('pages/SoccerPage.vue'),
      },
      {
        name: 'soccer-myleague',
        path: '/soccer-myleague',
        component: () => import('pages/SoccerPageMyLeague.vue'),
      },
      {
        name: 'soccer-mycup',
        path: '/soccer-mycup',
        component: () => import('pages/SoccerPageMyCup.vue'),
      },
      // {
      //   name: 'addPlayer',
      //   path: '/add-player',
      //   component: () => import('pages/AddPlayerPage.vue'),
      // },
      {
        name: 'teamsDB',
        path: '/teams-db',
        component: () => import('pages/DefaultTeamsPage.vue'),
      },
      {
        name: 'myLeague',
        path: '/myleague',
        component: () => import('pages/MyLeaguePage.vue'),
      },
      {
        name: 'myCup',
        path: '/mycup',
        // component: () => import('pages/MyCupPage.vue'),
        component: () => import('pages/MyLeaguePage.vue'),
      },
      {
        name: 'user',
        path: '/user',
        component: () => import('pages/UserPage.vue'),
      },
      {
        name: 'stats',
        path: '/stats',
        component: () => import('pages/StatsPage.vue'),
      },
      {
        name: 'players',
        path: '/players',
        component: () => import('pages/PlayersPage.vue'),
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
