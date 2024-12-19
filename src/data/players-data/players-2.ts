import type { Player } from 'src/models';
import { Flag as Nationality, Position } from 'src/models/player';
import { initialSeasonStats } from './initial-season-stats';

export const playersData: Player[] = [
  {
    shirtNumber: 13,
    name: 'Jan',
    surname: 'Oblak',
    nationality: Nationality.Slovenia,
    position: Position.POR,
    overall: 85,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 1,
    name: 'Juan',
    surname: 'Musso',
    nationality: Nationality.Argentina,
    position: Position.POR,
    overall: 79,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 2,
    name: 'José María',
    surname: 'Giménez',
    nationality: Nationality.Uruguay,
    position: Position.DF,
    overall: 83,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 3,
    name: 'César',
    surname: 'Azpilicueta',
    nationality: Nationality.Spain,
    position: Position.DF,
    overall: 80,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 20,
    name: 'Axel',
    surname: 'Witsel',
    nationality: Nationality.Belgium,
    position: Position.DF,
    overall: 81,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 24,
    name: 'Robin',
    surname: 'Le Normand',
    nationality: Nationality.Spain,
    position: Position.DF,
    overall: 83,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 15,
    name: 'Clément',
    surname: 'Lenglet',
    nationality: Nationality.France,
    position: Position.DF,
    overall: 81,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 23,
    name: 'Reinildo',
    surname: 'Mandava',
    nationality: Nationality.Mozambique,
    position: Position.LI,
    overall: 81,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 21,
    name: 'Javi',
    surname: 'Galán',
    nationality: Nationality.Spain,
    position: Position.LI,
    overall: 79,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 16,
    name: 'Nahuel',
    surname: 'Molina',
    nationality: Nationality.Argentina,
    position: Position.LD,
    overall: 82,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 6,
    name: '',
    surname: '',
    nickname: 'Koke',
    nationality: Nationality.Spain,
    position: Position.MC,
    overall: 79,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 14,
    name: 'Marcos',
    surname: 'Llorente',
    nationality: Nationality.Spain,
    position: Position.MC,
    overall: 82,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 5,
    name: 'Rodrigo',
    surname: 'De Paul',
    nationality: Nationality.Argentina,
    position: Position.MC,
    overall: 82,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 4,
    name: 'Conor',
    surname: 'Gallagher',
    nationality: Nationality.England,
    position: Position.MC,
    overall: 83,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 8,
    name: 'Pablo',
    surname: 'Barrios',
    nationality: Nationality.Spain,
    position: Position.MC,
    overall: 79,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 11,
    name: 'Thomas',
    surname: 'Lemar',
    nationality: Nationality.France,
    position: Position.MC,
    overall: 79,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 12,
    name: 'Samuel',
    surname: 'Lino',
    nationality: Nationality.Brazil,
    position: Position.EI,
    overall: 81,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 17,
    name: 'Rodrigo',
    surname: 'Riquelme',
    nationality: Nationality.Spain,
    position: Position.EI,
    overall: 78,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 10,
    name: 'Ángel',
    surname: 'Correa',
    nationality: Nationality.Argentina,
    position: Position.ED,
    overall: 81,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 22,
    name: 'Giuliano',
    surname: 'Simeone',
    nationality: Nationality.Argentina,
    position: Position.ED,
    overall: 76,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 7,
    name: 'Antoine',
    surname: 'Griezmann',
    nationality: Nationality.France,
    position: Position.DC,
    overall: 84,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 19,
    name: 'Julián',
    surname: 'Álvarez',
    nationality: Nationality.Argentina,
    position: Position.DC,
    overall: 84,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 9,
    name: 'Alexander',
    surname: 'Sörloth',
    nationality: Nationality.Norway,
    position: Position.DC,
    overall: 82,
    seasonStats: initialSeasonStats,
  },
];
