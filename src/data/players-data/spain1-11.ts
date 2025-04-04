import type { Player } from 'src/models';
import { Flag as Nationality, Position } from 'src/models/player';
import { initialSeasonStats } from './initial-season-stats';

export const playersData: Player[] = [
  {
    shirtNumber: 13,
    name: 'David',
    surname: 'Soria',
    nationality: Nationality.Spain,
    position: Position.POR,
    overall: 76,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 1,
    name: 'Jiri',
    surname: 'Letacek',
    nationality: Nationality.CzechRepublic,
    position: Position.POR,
    overall: 74,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 15,
    name: 'Omar',
    surname: 'Alderete',
    nationality: Nationality.Paraguay,
    position: Position.DF,
    overall: 77,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 2,
    name: '',
    surname: '',
    nickname: 'Djené',
    nationality: Nationality.Togo,
    position: Position.DF,
    overall: 76,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 4,
    name: 'Juan',
    surname: 'Berrocal',
    nationality: Nationality.Spain,
    position: Position.DF,
    overall: 74,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 22,
    name: 'Domingos',
    surname: 'Duarte',
    nationality: Nationality.Portugal,
    position: Position.DF,
    overall: 72,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 27,
    name: 'Nabil',
    surname: 'Aberdin',
    nationality: Nationality.Morocco,
    position: Position.DF,
    overall: 72,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 16,
    name: 'Diego',
    surname: 'Rico',
    nationality: Nationality.Spain,
    position: Position.LI,
    overall: 75,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 3,
    name: 'Fabrizio',
    surname: 'Angileri',
    nationality: Nationality.Argentina,
    position: Position.POR,
    overall: 73,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 21,
    name: 'Juan',
    surname: 'Iglesias',
    nationality: Nationality.Spain,
    position: Position.LD,
    overall: 74,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 12,
    name: 'Allan',
    surname: 'Nyom',
    nationality: Nationality.Cameroon,
    position: Position.LD,
    overall: 71,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 8,
    name: 'Mauro',
    surname: 'Arambarri',
    nationality: Nationality.Uruguay,
    position: Position.MC,
    overall: 76,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 5,
    name: 'Luis',
    surname: 'Milla',
    nationality: Nationality.Spain,
    position: Position.MC,
    overall: 75,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 11,
    name: 'Carles',
    surname: 'Aleñá',
    nationality: Nationality.Spain,
    position: Position.MC,
    overall: 75,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 20,
    name: 'Yellu',
    surname: 'Santiago',
    nationality: Nationality.Spain,
    position: Position.MC,
    overall: 69,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 6,
    name: 'Chrisantus',
    surname: 'Uche',
    nationality: Nationality.Nigeria,
    position: Position.MCO,
    overall: 77,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 7,
    name: 'Álex',
    surname: 'Sola',
    nationality: Nationality.Spain,
    position: Position.ED,
    overall: 73,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 17,
    name: 'Carles',
    surname: 'Pérez',
    nickname: 'Carles Pérez',
    nationality: Nationality.Spain,
    position: Position.ED,
    overall: 75,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 19,
    name: 'Peter',
    surname: 'Federico',
    nationality: Nationality.DominicanRepublic,
    position: Position.ED,
    overall: 72,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 9,
    name: 'Borja',
    surname: 'Mayoral',
    nationality: Nationality.Spain,
    position: Position.DC,
    overall: 78,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 10,
    name: 'Bertuğ',
    surname: 'Yıldırım',
    nationality: Nationality.Turkey,
    position: Position.DC,
    overall: 74,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 18,
    name: 'Álvaro',
    surname: 'Rodríguez',
    nationality: Nationality.Uruguay,
    position: Position.DC,
    overall: 73,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
];
