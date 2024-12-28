import type { Player } from 'src/models';
import { Flag as Nationality, Position } from 'src/models/player';
import { initialSeasonStats } from './initial-season-stats';

export const playersData: Player[] = [
  {
    shirtNumber: 1,
    name: 'Joan',
    surname: 'García',
    nickname: 'Joan García',
    nationality: Nationality.Spain,
    position: Position.POR,
    overall: 78,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 13,
    name: 'Fernando',
    surname: 'Pacheco',
    nationality: Nationality.Spain,
    position: Position.POR,
    overall: 75,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 3,
    name: 'Sergi',
    surname: 'Gómez',
    nickname: 'Sergi Gómez',
    nationality: Nationality.Spain,
    position: Position.DF,
    overall: 73,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 4,
    name: 'Marash',
    surname: 'Kumbulla',
    nationality: Nationality.Albania,
    position: Position.DF,
    overall: 76,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 5,
    name: 'Fernando',
    surname: 'Calero',
    nationality: Nationality.Spain,
    position: Position.DF,
    overall: 73,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 6,
    name: 'Leandro',
    surname: 'Cabrera',
    nationality: Nationality.Uruguay,
    position: Position.DF,
    overall: 75,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 14,
    name: 'Brian',
    surname: 'Oliván',
    nationality: Nationality.Spain,
    position: Position.LI,
    overall: 72,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 22,
    name: 'Carlos',
    surname: 'Romero',
    nationality: Nationality.Spain,
    position: Position.LI,
    overall: 72,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 23,
    name: 'Omar',
    surname: 'El Hilali',
    nationality: Nationality.Morocco,
    position: Position.LD,
    overall: 73,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 12,
    name: 'Álvaro',
    surname: 'Tejero',
    nationality: Nationality.Spain,
    position: Position.LD,
    overall: 72,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 20,
    name: 'Alex',
    surname: 'Král',
    nationality: Nationality.CzechRepublic,
    position: Position.MC,
    overall: 75,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 10,
    name: 'Pol',
    surname: 'Lozano',
    nationality: Nationality.Spain,
    position: Position.MC,
    overall: 72,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 18,
    name: 'Álvaro',
    surname: 'Aguado',
    nationality: Nationality.Spain,
    position: Position.MC,
    overall: 71,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 8,
    name: 'Edu',
    surname: 'Expósito',
    nickname: 'Edu Expósito',
    nationality: Nationality.Spain,
    position: Position.MC,
    overall: 72,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 15,
    name: 'José',
    surname: 'Gragera',
    nationality: Nationality.Spain,
    position: Position.MC,
    overall: 73,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 40,
    name: 'Justin',
    surname: 'Smith',
    nationality: Nationality.Canada,
    position: Position.MC,
    overall: 70,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 7,
    name: 'Javi',
    surname: 'Puado',
    nationality: Nationality.Spain,
    position: Position.EI,
    overall: 76,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 11,
    name: 'Pere',
    surname: 'Milla',
    nationality: Nationality.Spain,
    position: Position.EI,
    overall: 73,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 17,
    name: 'Jofre',
    surname: 'Carreras',
    nickname: 'Jofre',
    nationality: Nationality.Spain,
    position: Position.ED,
    overall: 75,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 37,
    name: 'Naci',
    surname: 'Ünüvar',
    nationality: Nationality.Turkey,
    position: Position.ED,
    overall: 72,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 19,
    name: 'Salvi',
    surname: 'Sánchez',
    nickname: 'Salvi',
    nationality: Nationality.Spain,
    position: Position.ED,
    overall: 72,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 9,
    name: 'Alejo',
    surname: 'Veliz',
    nationality: Nationality.Argentina,
    position: Position.DC,
    overall: 75,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 16,
    name: 'Walid',
    surname: 'Cheddira',
    nationality: Nationality.Morocco,
    position: Position.DC,
    overall: 74,
    seasonStats: initialSeasonStats,
  },
  {
    shirtNumber: 24,
    name: 'Irvin',
    surname: 'Cardona',
    nationality: Nationality.France,
    position: Position.MCO,
    overall: 75,
    seasonStats: initialSeasonStats,
  },
];
