import type { Player } from 'src/models';
import { Flag as Nationality, Position } from 'src/models/player';
import { initialSeasonStats } from './initial-season-stats';

export const playersData: Player[] = [
  {
    shirtNumber: 1,
    name: 'Antonio',
    surname: 'Sivera',
    nationality: Nationality.Spain,
    position: Position.POR,
    overall: 75,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 13,
    name: 'Jesús',
    surname: 'Owono',
    nationality: Nationality.GuineaEquatorial,
    position: Position.POR,
    overall: 69,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 5,
    name: 'Abdel',
    surname: 'Abqar',
    nationality: Nationality.Morocco,
    position: Position.DF,
    overall: 76,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 12,
    name: 'Santiago',
    surname: 'Mouriño',
    nationality: Nationality.Uruguay,
    position: Position.DF,
    overall: 72,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 22,
    name: 'Mousa',
    surname: 'Diarra',
    nationality: Nationality.Mali,
    position: Position.DF,
    overall: 72,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 4,
    name: 'Aleksandar',
    surname: 'Sedlar',
    nationality: Nationality.Serbia,
    position: Position.DF,
    overall: 70,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 3,
    name: 'Manu',
    surname: 'Sánchez',
    nationality: Nationality.Spain,
    position: Position.LI,
    overall: 73,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 14,
    name: 'Nahuel',
    surname: 'Tenaglia',
    nationality: Nationality.Argentina,
    position: Position.LD,
    overall: 74,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 16,
    name: 'Hugo',
    surname: 'Novoa',
    nationality: Nationality.Spain,
    position: Position.LD,
    overall: 72,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 8,
    name: 'Antonio',
    surname: 'Blanco',
    nationality: Nationality.Spain,
    position: Position.MCD,
    overall: 75,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 23,
    name: 'Carlos',
    surname: 'Protesoni',
    nationality: Nationality.Uruguay,
    position: Position.MCD,
    overall: 71,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 6,
    name: 'Ander',
    surname: 'Guevara',
    nationality: Nationality.Spain,
    position: Position.MC,
    overall: 73,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 18,
    name: 'Jon',
    surname: 'Guridi',
    nationality: Nationality.Spain,
    position: Position.MC,
    overall: 76,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 24,
    name: 'Joan',
    surname: 'Jordán',
    nationality: Nationality.Spain,
    position: Position.MC,
    overall: 75,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 10,
    name: 'Tomás',
    surname: 'Conechny',
    nationality: Nationality.Argentina,
    position: Position.EI,
    overall: 75,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 21,
    name: 'Abde',
    surname: 'Rebbach',
    nationality: Nationality.Argelia,
    position: Position.EI,
    overall: 71,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 7,
    name: 'Carlos',
    surname: 'Vicente',
    nationality: Nationality.Spain,
    position: Position.ED,
    overall: 76,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 20,
    name: 'Luka',
    surname: 'Romero',
    nationality: Nationality.Argentina,
    position: Position.ED,
    overall: 74,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 19,
    name: '',
    surname: '',
    nickname: 'Stoichkov',
    nationality: Nationality.Spain,
    position: Position.MCO,
    overall: 74,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 11,
    name: 'Toni',
    surname: 'Martínez',
    nationality: Nationality.Spain,
    position: Position.DC,
    overall: 76,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 15,
    name: 'Carlos',
    surname: 'Martín',
    nationality: Nationality.Spain,
    position: Position.DC,
    overall: 73,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 9,
    name: 'Asier',
    surname: 'Villalibre',
    nationality: Nationality.Spain,
    position: Position.DC,
    overall: 72,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 17,
    name: 'Kike',
    surname: 'García',
    nickname: 'Kike',
    nationality: Nationality.Spain,
    position: Position.DC,
    overall: 72,
    seasonStats: initialSeasonStats,
  },
];
