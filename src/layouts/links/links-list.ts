import { EssentialLinkProps } from 'src/components/EssentialLink.vue';

export const linksList: EssentialLinkProps[] = [
  //   {
  //     title: 'Docs',
  //     caption: 'quasar.dev',
  //     icon: 'school',
  //     link: 'https://quasar.dev',
  //   },
  //   {
  //     title: 'Github',
  //     caption: 'github.com/quasarframework',
  //     icon: 'code',
  //     link: 'https://github.com/quasarframework',
  //   },
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
    title: 'Resultados y clasificación',
    caption: 'La Liga',
    icon: 'sports_soccer',
    link: '/soccer',
  },
  {
    title: 'Alta de jugador',
    caption: 'La Liga',
    icon: 'person_add',
    link: '/add-player',
  },
];
