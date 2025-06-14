import type { Player } from 'src/models';
import { Flag as Nationality, Position } from 'src/models/player';
import { initialSeasonStats } from './initial-season-stats';

export const playersData: Player[] = [
  {
    shirtNumber: 1,
    name: 'Lucas',
    surname: 'Perri',
    birthDate: '10/12/1997',
    nationality: Nationality.Brazil,
    position: Position.POR,
    overall: 78,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 40,
    name: 'Rémy',
    surname: 'Descamps',
    birthDate: '25/06/1996',
    nationality: Nationality.France,
    position: Position.POR,
    overall: 74,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 55,
    name: 'Duje',
    surname: 'Caleta-Car',
    birthDate: '17/09/1996',
    nationality: Nationality.Croatia,
    position: Position.DF,
    overall: 78,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 19,
    name: 'Moussa',
    surname: 'Niakhaté',
    birthDate: '08/03/1996',
    nationality: Nationality.Senegal,
    position: Position.DF,
    overall: 80,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 27,
    name: 'Warmed',
    surname: 'Omari',
    birthDate: '23/04/2000',
    nationality: Nationality.Comoras,
    position: Position.DF,
    overall: 74,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 16,
    name: '',
    surname: '',
    nickname: 'Abner',
    birthDate: '27/05/2000',
    nationality: Nationality.Brazil,
    position: Position.LI,
    overall: 76,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 3,
    name: 'Nicolás',
    surname: 'Tagliafico',
    birthDate: '31/08/1992',
    nationality: Nationality.Argentina,
    position: Position.LI,
    overall: 79,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 20,
    name: 'Saël',
    surname: 'Kumbedi',
    birthDate: '26/03/2005',
    nationality: Nationality.France,
    position: Position.LD,
    overall: 73,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 22,
    name: '',
    surname: '',
    nickname: 'Clinton Mata',
    birthDate: '07/11/1992',
    nationality: Nationality.Angola,
    position: Position.LD,
    overall: 76,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 98,
    name: 'Ainsley',
    surname: 'Maitland-Niles',
    birthDate: '29/08/1997',
    nationality: Nationality.England,
    position: Position.LD,
    overall: 78,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 15,
    name: 'Tanner',
    surname: 'Tessmann',
    birthDate: '24/09/2001',
    nationality: Nationality.UnitedStates,
    position: Position.MCD,
    overall: 75,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 31,
    name: 'Nemanja',
    surname: 'Matic',
    birthDate: '01/08/1988',
    nationality: Nationality.Serbia,
    position: Position.MCD,
    overall: 76,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 8,
    name: 'Corentin',
    surname: 'Tolisso',
    birthDate: '03/08/1994',
    nationality: Nationality.France,
    position: Position.MC,
    overall: 80,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 7,
    name: 'Jordan',
    surname: 'Veretout',
    birthDate: '01/03/1993',
    nationality: Nationality.France,
    position: Position.MC,
    overall: 77,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 23,
    name: 'Thiago',
    surname: 'Almada',
    birthDate: '26/04/2001',
    nationality: Nationality.Argentina,
    position: Position.MCO,
    overall: 80,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 11,
    name: 'Malick',
    surname: 'Fofana',
    birthDate: '31/03/2005',
    nationality: Nationality.Belgium,
    position: Position.EI,
    overall: 78,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 37,
    name: 'Ernest',
    surname: 'Nuamah',
    birthDate: '01/11/2003',
    nationality: Nationality.Ghana,
    position: Position.ED,
    overall: 78,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 18,
    name: 'Rayan',
    surname: 'Cherki',
    birthDate: '17/08/2003',
    nationality: Nationality.France,
    position: Position.ED,
    overall: 81,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 69,
    name: 'Georges',
    surname: 'Mikautadze',
    birthDate: '31/10/2000',
    nationality: Nationality.Georgia,
    position: Position.DC,
    overall: 78,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
  {
    shirtNumber: 10,
    name: 'Alexandre',
    surname: 'Lacazette',
    birthDate: '28/05/1991',
    nationality: Nationality.France,
    position: Position.DC,
    overall: 80,
    seasonStats: initialSeasonStats,
    teamId: 11,
  },
];
