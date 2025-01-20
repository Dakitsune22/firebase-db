import { EssentialLinkProps } from 'src/components/EssentialLink.vue';
import { Leagues } from 'src/models';

export const linksList: EssentialLinkProps[] = [
  {
    title: 'Index',
    caption: 'Go to index page',
    icon: 'home',
    link: '/',
  },
  {
    title: 'Fruits',
    caption: 'Some fruits here',
    icon: 'favorite',
    link: '/fruits',
  },
  {
    title: 'Alta de jugador',
    caption: 'La Liga',
    icon: 'person_add',
    link: '/add-player',
  },
  {
    title: 'La Liga: Primera División',
    caption: 'España',
    icon: 'sports_soccer',
    // link: `/soccer/${Leagues.LaLigaPrimeraDivision}`,
    link: '/soccer-spain1',
  },
  // {
  //   title: 'Resultados y clasificación',
  //   caption: 'Premier League',
  //   icon: 'sports_soccer',
  //   link: `/soccer/${Leagues.PremierLeague}`,
  // },
  {
    title: 'Premier League',
    caption: 'Inglaterra',
    icon: 'sports_soccer',
    // link: `/soccer-test/${Leagues.PremierLeague}`,
    link: '/soccer-england1',
  },
  {
    title: 'Bundesliga',
    caption: 'Alemania',
    icon: 'sports_soccer',
    // link: `/soccer-test/${Leagues.Bundesliga}`,
    link: '/soccer-germany1',
  },
];
