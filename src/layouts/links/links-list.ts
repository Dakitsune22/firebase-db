import { EssentialLinkProps } from 'src/components/EssentialLink.vue';
import { Leagues } from 'src/models';

export const linksList: EssentialLinkProps[] = [
  {
    title: 'Inicio',
    caption: 'Página de inicio',
    icon: 'home',
    link: '/',
  },
  // {
  //   title: 'Fruits',
  //   caption: 'Some fruits here',
  //   icon: 'favorite',
  //   link: '/fruits',
  // },
];

export const linksListManage: EssentialLinkProps[] = [
  // {
  //   title: 'Alta de jugador',
  //   caption: 'La Liga',
  //   icon: 'person_add',
  //   link: '/add-player',
  // },
  {
    title: 'Equipos',
    caption: 'Mantenimiento de equipos',
    icon: 'groups',
    link: '/teams-db',
  },
  {
    title: 'My~League',
    caption: 'Configurar My~League',
    icon: 'published_with_changes',
    link: '/myleague',
  },
];

export const linksListLeagues: EssentialLinkProps[] = [
  {
    title: 'My~League',
    caption: 'Liga personalizada',
    // icon: 'stars',
    img: '/images/leagues/myleague.png',
    link: '/soccer-myleague',
  },
  {
    title: 'LaLiga EA Sports',
    caption: 'España',
    img: '/images/leagues/spain1.png',
    link: `/soccer/${Leagues.LaLigaPrimeraDivision}`,
  },
  {
    title: 'Premier League',
    caption: 'Inglaterra',
    img: '/images/leagues/england1.png',
    link: `/soccer/${Leagues.PremierLeague}`,
  },
  {
    title: 'Serie A',
    caption: 'Italia',
    img: '/images/leagues/italy1.png',
    link: `/soccer/${Leagues.SerieA}`,
  },
  {
    title: 'Bundesliga',
    caption: 'Alemania',
    img: '/images/leagues/germany1.png',
    link: `/soccer/${Leagues.Bundesliga}`,
  },
  {
    title: 'Ligue 1',
    caption: 'Francia',
    img: '/images/leagues/france1.png',
    link: `/soccer/${Leagues.Ligue1}`,
  },
];
