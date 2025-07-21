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
      // {
      //   name: `soccer-${Leagues.LaLigaPrimeraDivision}`,
      //   // path: '/soccer/:leagueId',
      //   path: `/soccer-${Leagues.LaLigaPrimeraDivision}`,
      //   component: () => import('pages/SoccerPageSpain1.vue'),
      // },
      // {
      //   name: `soccer-${Leagues.PremierLeague}`,
      //   path: `/soccer-${Leagues.PremierLeague}`,
      //   component: () => import('pages/SoccerPageEngland1.vue'),
      // },
      // {
      //   name: `soccer-${Leagues.SerieA}`,
      //   path: `/soccer-${Leagues.SerieA}`,
      //   component: () => import('pages/SoccerPageItaly1.vue'),
      // },
      // {
      //   name: `soccer-${Leagues.Bundesliga}`,
      //   path: `/soccer-${Leagues.Bundesliga}`,
      //   component: () => import('pages/SoccerPageGermany1.vue'),
      // },
      // {
      //   name: `soccer-${Leagues.Ligue1}`,
      //   path: `/soccer-${Leagues.Ligue1}`,
      //   component: () => import('pages/SoccerPageFrance1.vue'),
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
        name: 'user',
        path: '/user',
        component: () => import('pages/UserPage.vue'),
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
