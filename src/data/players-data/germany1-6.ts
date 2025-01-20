import type { Player } from 'src/models';
import { Flag as Nationality, Position } from 'src/models/player';
import { initialSeasonStats } from './initial-season-stats';

export const playersData: Player[] = [
  {
    shirtNumber: 1,
    name: 'Álex',
    surname: 'Remiro',
    nationality: Nationality.Spain,
    position: Position.POR,
    overall: 80,
    seasonStats: initialSeasonStats,
    teamId: 6,
  },
  {
    shirtNumber: 13,
    name: 'Unai',
    surname: 'Marrero',
    nationality: Nationality.Spain,
    position: Position.POR,
    overall: 70,
    seasonStats: initialSeasonStats,
    teamId: 6,
  },
  {
    shirtNumber: 21,
    name: 'Nayef',
    surname: 'Aguerd',
    nationality: Nationality.Morocco,
    position: Position.DF,
    overall: 82,
    seasonStats: initialSeasonStats,
    teamId: 6,
  },
  {
    shirtNumber: 5,
    name: 'Igor',
    surname: 'Zubeldia',
    nationality: Nationality.Spain,
    position: Position.DF,
    overall: 79,
    seasonStats: initialSeasonStats,
    teamId: 6,
  },
  {
    shirtNumber: 20,
    name: 'Jon',
    surname: 'Pacheco',
    nationality: Nationality.Spain,
    position: Position.DF,
    overall: 76,
    seasonStats: initialSeasonStats,
    teamId: 6,
  },
  {
    shirtNumber: 6,
    name: 'Aritz',
    surname: 'Elustondo',
    nationality: Nationality.Spain,
    position: Position.DF,
    overall: 76,
    seasonStats: initialSeasonStats,
    teamId: 6,
  },
  {
    shirtNumber: 12,
    name: 'Javi',
    surname: 'López',
    nationality: Nationality.Spain,
    position: Position.LI,
    overall: 76,
    seasonStats: initialSeasonStats,
    teamId: 6,
  },
  {
    shirtNumber: 3,
    name: 'Aihen',
    surname: 'Muñoz',
    nickname: 'Aihen Muñoz',
    nationality: Nationality.Spain,
    position: Position.LI,
    overall: 75,
    seasonStats: initialSeasonStats,
    teamId: 6,
  },
  {
    shirtNumber: 27,
    name: 'Jon',
    surname: 'Aramburu',
    nationality: Nationality.Venezuela,
    position: Position.LD,
    overall: 77,
    seasonStats: initialSeasonStats,
    teamId: 6,
  },
  {
    shirtNumber: 18,
    name: 'Hamari',
    surname: 'Traoré',
    nationality: Nationality.Mali,
    position: Position.LD,
    overall: 79,
    seasonStats: initialSeasonStats,
    teamId: 6,
  },
  {
    shirtNumber: 4,
    name: 'Martín',
    surname: 'Zubimendi',
    nationality: Nationality.Spain,
    position: Position.MCD,
    overall: 82,
    seasonStats: initialSeasonStats,
    teamId: 6,
  },
  {
    shirtNumber: 22,
    name: 'Beñat',
    surname: 'Turrientes',
    nationality: Nationality.Spain,
    position: Position.MC,
    overall: 78,
    seasonStats: initialSeasonStats,
    teamId: 6,
  },
  {
    shirtNumber: 24,
    name: 'Luka',
    surname: 'Sucic',
    nationality: Nationality.Croatia,
    position: Position.MC,
    overall: 79,
    seasonStats: initialSeasonStats,
    teamId: 6,
  },
  {
    shirtNumber: 23,
    name: 'Brais',
    surname: 'Méndez',
    nationality: Nationality.Spain,
    position: Position.MCO,
    overall: 81,
    seasonStats: initialSeasonStats,
    teamId: 6,
  },
  {
    shirtNumber: 8,
    name: 'Arsen',
    surname: 'Zakharyan',
    nationality: Nationality.Russia,
    position: Position.MCO,
    overall: 78,
    seasonStats: initialSeasonStats,
    teamId: 6,
  },
  {
    shirtNumber: 7,
    name: 'Ander',
    surname: 'Barrenetxea',
    nationality: Nationality.Spain,
    position: Position.EI,
    overall: 78,
    seasonStats: initialSeasonStats,
    teamId: 6,
  },
  {
    shirtNumber: 11,
    name: 'Sheraldo',
    surname: 'Becker',
    nationality: Nationality.Surinam,
    position: Position.EI,
    overall: 76,
    seasonStats: initialSeasonStats,
    teamId: 6,
  },
  {
    shirtNumber: 17,
    name: 'Sergio',
    surname: 'Gómez',
    nickname: 'Sergio Gómez',
    nationality: Nationality.Spain,
    position: Position.ED,
    overall: 79,
    seasonStats: initialSeasonStats,
    teamId: 6,
  },
  {
    shirtNumber: 14,
    name: 'Takefusa',
    surname: 'Kubo',
    nationality: Nationality.Japan,
    position: Position.ED,
    overall: 81,
    seasonStats: initialSeasonStats,
    teamId: 6,
  },
  {
    shirtNumber: 10,
    name: 'Mikel',
    surname: 'Oyarzabal',
    nationality: Nationality.Spain,
    position: Position.DC,
    overall: 80,
    seasonStats: initialSeasonStats,
    teamId: 6,
  },
  {
    shirtNumber: 19,
    name: 'Umar',
    surname: 'Sadiq',
    nationality: Nationality.Nigeria,
    position: Position.DC,
    overall: 75,
    seasonStats: initialSeasonStats,
    teamId: 6,
  },
  {
    shirtNumber: 9,
    name: 'Orri',
    surname: 'Óskarsson',
    nationality: Nationality.Iceland,
    position: Position.DC,
    overall: 78,
    seasonStats: initialSeasonStats,
    teamId: 6,
  },
];
