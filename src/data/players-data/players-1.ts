import type { Player } from 'src/models';
import { Flag as Nationality, Position } from 'src/models/player';
import { initialSeasonStats } from './initial-season-stats';

export const playersData: Player[] = [
  {
    shirtNumber: 1,
    name: 'Thibaut',
    surname: 'Courtois',
    nationality: Nationality.Belgium,
    position: Position.POR,
    overall: 86,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 13,
    name: 'Andriy',
    surname: 'Lunin',
    nationality: Nationality.Ukraine,
    position: Position.POR,
    overall: 80,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 3,
    name: 'Éder',
    surname: 'Militão',
    nationality: Nationality.Brazil,
    position: Position.DF,
    overall: 85,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 4,
    name: 'David',
    surname: 'Alaba',
    nationality: Nationality.Austria,
    position: Position.DF,
    overall: 82,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 22,
    name: 'Antonio',
    surname: 'Rüdiger',
    nationality: Nationality.Germany,
    position: Position.DF,
    overall: 84,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 35,
    name: 'Raúl',
    surname: 'Asencio',
    nationality: Nationality.Spain,
    position: Position.DF,
    overall: 75,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 23,
    name: 'Ferland',
    surname: 'Mendy',
    nationality: Nationality.France,
    position: Position.LI,
    overall: 82,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 20,
    name: 'Fran',
    surname: 'García',
    nationality: Nationality.Spain,
    position: Position.LI,
    overall: 77,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 2,
    name: 'Dani',
    surname: 'Carvajal',
    nationality: Nationality.Spain,
    position: Position.LD,
    overall: 84,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 17,
    name: 'Lucas',
    surname: 'Vázquez',
    nationality: Nationality.Spain,
    position: Position.LD,
    overall: 78,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 14,
    name: 'Aurélien',
    surname: 'Tchouaméni',
    nationality: Nationality.France,
    position: Position.MCD,
    overall: 83,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 8,
    name: 'Federico',
    surname: 'Valverde',
    nationality: Nationality.Uruguay,
    position: Position.MC,
    overall: 85,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 6,
    name: 'Eduardo',
    surname: 'Camavinga',
    nationality: Nationality.France,
    position: Position.MC,
    overall: 83,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 10,
    name: 'Luka',
    surname: 'Modric',
    nationality: Nationality.Croatia,
    position: Position.MC,
    overall: 82,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 19,
    name: 'Dani',
    surname: 'Ceballos',
    nationality: Nationality.Spain,
    position: Position.MC,
    overall: 80,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 5,
    name: 'Jude',
    surname: 'Bellingham',
    nationality: Nationality.England,
    position: Position.MCO,
    overall: 88,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 7,
    name: 'Vinicius',
    surname: 'Junior',
    nickname: 'Vinicius Jr.',
    nationality: Nationality.Brazil,
    position: Position.EI,
    overall: 88,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 11,
    name: '',
    surname: '',
    nickname: 'Rodrygo',
    nationality: Nationality.Brazil,
    position: Position.ED,
    overall: 84,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 21,
    name: 'Brahim',
    surname: 'Díaz',
    nickname: 'Brahim Díaz',
    nationality: Nationality.Morocco,
    position: Position.ED,
    overall: 82,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 15,
    name: 'Arda',
    surname: 'Güler',
    nationality: Nationality.Turkey,
    position: Position.MCO,
    overall: 81,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 9,
    name: 'Kylian',
    surname: 'Mbappé',
    nationality: Nationality.France,
    position: Position.DC,
    overall: 89,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 16,
    name: '',
    surname: '',
    nickname: 'Endrick',
    nationality: Nationality.Brazil,
    position: Position.DC,
    overall: 77,
    seasonStats: initialSeasonStats,
  },
];