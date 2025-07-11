import type { Player } from 'src/models';
import { Flag as Nationality, Position } from 'src/models/player';
import { initialSeasonStats } from './initial-season-stats';

export const playersData: Player[] = [
  {
    shirtNumber: 1,
    name: 'Guglielmo',
    surname: 'Vicario',
    birthDate: '07/10/1996',
    nationality: Nationality.Italy,
    position: Position.POR,
    overall: 82,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 31,
    name: 'Antonín',
    surname: 'Kinský',
    birthDate: '13/03/2003',
    nationality: Nationality.CzechRepublic,
    position: Position.POR,
    overall: 76,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 17,
    name: 'Cristian',
    surname: 'Romero',
    birthDate: '27/04/1998',
    nationality: Nationality.Argentina,
    position: Position.DF,
    overall: 84,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 37,
    name: 'Micky',
    surname: 'van de Ven',
    birthDate: '19/04/2001',
    nationality: Nationality.Netherlands,
    position: Position.DF,
    overall: 82,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 4,
    name: 'Kevin',
    surname: 'Danso',
    birthDate: '19/09/1998',
    nationality: Nationality.Austria,
    position: Position.DF,
    overall: 80,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 6,
    name: 'Radu',
    surname: 'Drăgușin',
    birthDate: '03/02/2002',
    nationality: Nationality.Romania,
    position: Position.DF,
    overall: 80,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 33,
    name: 'Ben',
    surname: 'Davies',
    birthDate: '24/04/1993',
    nationality: Nationality.Wales,
    position: Position.DF,
    overall: 78,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 13,
    name: 'Destiny',
    surname: 'Udogie',
    birthDate: '28/11/2002',
    nationality: Nationality.Italy,
    position: Position.LI,
    overall: 79,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 24,
    name: 'Djed',
    surname: 'Spence',
    birthDate: '09/08/2000',
    nationality: Nationality.England,
    position: Position.LI,
    overall: 75,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 23,
    name: 'Pedro',
    surname: 'Porro',
    birthDate: '13/09/1999',
    nationality: Nationality.Spain,
    position: Position.LD,
    overall: 81,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 14,
    name: 'Archie',
    surname: 'Gray',
    birthDate: '12/03/2006',
    nationality: Nationality.England,
    position: Position.LD,
    overall: 77,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 8,
    name: 'Yves',
    surname: 'Bissouma',
    birthDate: '30/08/1996',
    nationality: Nationality.Mali,
    position: Position.MCD,
    overall: 81,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 30,
    name: 'Rodrigo',
    surname: 'Bentancur',
    birthDate: '25/06/1997',
    nationality: Nationality.Uruguay,
    position: Position.MC,
    overall: 82,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 29,
    name: 'Pape Matar',
    surname: 'Sarr',
    birthDate: '14/09/2002',
    nationality: Nationality.Senegal,
    position: Position.MC,
    overall: 80,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 15,
    name: 'Lucas',
    surname: 'Bergvall',
    birthDate: '02/02/2006',
    nationality: Nationality.Sweden,
    position: Position.MC,
    overall: 74,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 10,
    name: 'James',
    surname: 'Maddison',
    birthDate: '23/11/1996',
    nationality: Nationality.England,
    position: Position.MCO,
    overall: 83,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 21,
    name: 'Dejan',
    surname: 'Kulusevski',
    birthDate: '25/04/2000',
    nationality: Nationality.Sweden,
    position: Position.MCO,
    overall: 83,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 7,
    name: '',
    surname: '',
    nickname: 'Heung-min Son',
    birthDate: '08/07/1992',
    nationality: Nationality.SouthKorea,
    position: Position.EI,
    overall: 83,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 16,
    name: 'Timo',
    surname: 'Werner',
    birthDate: '06/03/1996',
    nationality: Nationality.Germany,
    position: Position.EI,
    overall: 80,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 47,
    name: 'Mikey',
    surname: 'Moore',
    birthDate: '11/08/2007',
    nationality: Nationality.England,
    position: Position.EI,
    overall: 75,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 22,
    name: 'Brennan',
    surname: 'Johnson',
    birthDate: '23/05/2001',
    nationality: Nationality.Wales,
    position: Position.ED,
    overall: 80,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 28,
    name: 'Wilson',
    surname: 'Odobert',
    birthDate: '28/11/2004',
    nationality: Nationality.France,
    position: Position.ED,
    overall: 76,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 19,
    name: 'Dominic',
    surname: 'Solanke',
    birthDate: '14/09/1997',
    nationality: Nationality.England,
    position: Position.DC,
    overall: 82,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 9,
    name: '',
    surname: '',
    nickname: 'Richarlison',
    birthDate: '10/05/1997',
    nationality: Nationality.Brazil,
    position: Position.DC,
    overall: 82,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
  {
    shirtNumber: 11,
    name: 'Mathys',
    surname: 'Tel',
    birthDate: '27/04/2005',
    nationality: Nationality.France,
    position: Position.DC,
    overall: 79,
    seasonStats: initialSeasonStats,
    teamId: 17,
  },
];
