import type { Player } from 'src/models';
import { Flag as Nationality, Position } from 'src/models/player';
import { initialSeasonStats } from './initial-season-stats';

export const playersData: Player[] = [
  {
    shirtNumber: 1,
    name: 'Timo',
    surname: 'Horn',
    birthDate: '12/05/1993',
    nationality: Nationality.Germany,
    position: Position.POR,
    overall: 76,
    seasonStats: initialSeasonStats,
    teamId: 8,
  },
  {
    shirtNumber: 27,
    name: 'Patrick',
    surname: 'Drewes',
    birthDate: '04/02/1993',
    nationality: Nationality.Germany,
    position: Position.POR,
    overall: 74,
    seasonStats: initialSeasonStats,
    teamId: 8,
  },
  {
    shirtNumber: 3,
    name: '',
    surname: '',
    nickname: 'Bernardo',
    birthDate: '14/05/1995',
    nationality: Nationality.Brazil,
    position: Position.DF,
    overall: 75,
    seasonStats: initialSeasonStats,
    teamId: 8,
  },
  {
    shirtNumber: 14,
    name: 'Tim',
    surname: 'Oermann',
    birthDate: '06/10/2003',
    nationality: Nationality.Germany,
    position: Position.DF,
    overall: 74,
    seasonStats: initialSeasonStats,
    teamId: 8,
  },
  {
    shirtNumber: 4,
    name: 'Erhan',
    surname: 'Masovic',
    birthDate: '22/11/1998',
    nationality: Nationality.Serbia,
    position: Position.DF,
    overall: 73,
    seasonStats: initialSeasonStats,
    teamId: 8,
  },
  {
    shirtNumber: 13,
    name: 'Jakob',
    surname: 'Medic',
    birthDate: '07/09/1998',
    nationality: Nationality.Croatia,
    position: Position.DF,
    overall: 72,
    seasonStats: initialSeasonStats,
    teamId: 8,
  },
  {
    shirtNumber: 20,
    name: 'Ivan',
    surname: 'Ordets',
    birthDate: '08/07/1992',
    nationality: Nationality.Ukraine,
    position: Position.DF,
    overall: 73,
    seasonStats: initialSeasonStats,
    teamId: 8,
  },
  {
    shirtNumber: 32,
    name: 'Maximilian',
    surname: 'Wittek',
    birthDate: '21/08/1995',
    nationality: Nationality.Germany,
    position: Position.LI,
    overall: 73,
    seasonStats: initialSeasonStats,
    teamId: 8,
  },
  {
    shirtNumber: 15,
    name: 'Felix',
    surname: 'Passlack',
    birthDate: '29/05/1998',
    nationality: Nationality.Germany,
    position: Position.LD,
    overall: 73,
    seasonStats: initialSeasonStats,
    teamId: 8,
  },
  {
    shirtNumber: 2,
    name: 'Cristian',
    surname: 'Gamboa',
    birthDate: '24/10/1989',
    nationality: Nationality.CostaRica,
    position: Position.LD,
    overall: 72,
    seasonStats: initialSeasonStats,
    teamId: 8,
  },
  {
    shirtNumber: 6,
    name: 'Ibrahima',
    surname: 'Sissoko',
    birthDate: '27/10/1997',
    nationality: Nationality.Mali,
    position: Position.MCD,
    overall: 76,
    seasonStats: initialSeasonStats,
    teamId: 8,
  },
  {
    shirtNumber: 8,
    name: 'Anthony',
    surname: 'Losilla',
    birthDate: '10/03/1986',
    nationality: Nationality.France,
    position: Position.MCD,
    overall: 71,
    seasonStats: initialSeasonStats,
    teamId: 8,
  },
  {
    shirtNumber: 17,
    name: 'Tom',
    surname: 'Krauß',
    birthDate: '22/06/2001',
    nationality: Nationality.Germany,
    position: Position.MC,
    overall: 74,
    seasonStats: initialSeasonStats,
    teamId: 8,
  },
  {
    shirtNumber: 19,
    name: 'Matus',
    surname: 'Bero',
    birthDate: '06/09/1995',
    nationality: Nationality.Slovakia,
    position: Position.MC,
    overall: 74,
    seasonStats: initialSeasonStats,
    teamId: 8,
  },
  {
    shirtNumber: 23,
    name: 'Koji',
    surname: 'Miyoshi',
    birthDate: '26/03/1997',
    nationality: Nationality.Japan,
    position: Position.MC,
    overall: 72,
    seasonStats: initialSeasonStats,
    teamId: 8,
  },
  {
    shirtNumber: 10,
    name: 'Dani',
    surname: 'de Wit',
    birthDate: '28/01/1998',
    nationality: Nationality.Netherlands,
    position: Position.MCO,
    overall: 74,
    seasonStats: initialSeasonStats,
    teamId: 8,
  },
  {
    shirtNumber: 11,
    name: 'Georgios',
    surname: 'Masouras',
    birthDate: '01/01/1994',
    nationality: Nationality.Greece,
    position: Position.EI,
    overall: 74,
    seasonStats: initialSeasonStats,
    teamId: 8,
  },
  {
    shirtNumber: 21,
    name: 'Gerrit',
    surname: 'Holtmann',
    birthDate: '25/03/1995',
    nationality: Nationality.Philippines,
    position: Position.EI,
    overall: 71,
    seasonStats: initialSeasonStats,
    teamId: 8,
  },
  {
    shirtNumber: 33,
    name: 'Philipp',
    surname: 'Hofmann',
    birthDate: '30/03/1993',
    nationality: Nationality.Germany,
    position: Position.DC,
    overall: 73,
    seasonStats: initialSeasonStats,
    teamId: 8,
  },
  {
    shirtNumber: 29,
    name: 'Moritz',
    surname: 'Broschinski',
    birthDate: '23/09/2000',
    nationality: Nationality.Germany,
    position: Position.DC,
    overall: 72,
    seasonStats: initialSeasonStats,
    teamId: 8,
  },
  {
    shirtNumber: 9,
    name: 'Myron',
    surname: 'Boadu',
    birthDate: '14/01/2001',
    nationality: Nationality.Netherlands,
    position: Position.DC,
    overall: 76,
    seasonStats: initialSeasonStats,
    teamId: 8,
  },
];
