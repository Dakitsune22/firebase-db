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
    link: `/soccer-${Leagues.LaLigaPrimeraDivision}`,
  },
  {
    title: 'Premier League',
    caption: 'Inglaterra',
    icon: 'sports_soccer',
    link: `/soccer-${Leagues.PremierLeague}`,
  },
  {
    title: 'Serie A',
    caption: 'Italia',
    icon: 'sports_soccer',
    link: `/soccer-${Leagues.SerieA}`,
  },
  {
    title: 'Bundesliga',
    caption: 'Alemania',
    icon: 'sports_soccer',
    link: `/soccer-${Leagues.Bundesliga}`,
  },
  {
    title: 'Ligue 1',
    caption: 'Francia',
    icon: 'sports_soccer',
    link: `/soccer-${Leagues.Ligue1}`,
  },
];
