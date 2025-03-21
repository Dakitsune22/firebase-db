import type { Player } from 'src/models';
import { Flag as Nationality, Position } from 'src/models/player';
import { initialSeasonStats } from './initial-season-stats';

export const playersData: Player[] = [
  {
    shirtNumber: 1,
    name: 'Marc-André',
    surname: 'Ter Stegen',
    nationality: Nationality.Germany,
    position: Position.POR,
    overall: 85,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 13,
    name: 'Iñaki',
    surname: 'Peña',
    nationality: Nationality.Spain,
    position: Position.POR,
    overall: 77,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 25,
    name: 'Wojciech',
    surname: 'Szczęsny',
    nationality: Nationality.Poland,
    position: Position.POR,
    overall: 79,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 4,
    name: 'Ronald',
    surname: 'Araujo',
    nationality: Nationality.Uruguay,
    position: Position.DF,
    overall: 85,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 2,
    name: 'Pau',
    surname: 'Cubarsí',
    nationality: Nationality.Spain,
    position: Position.DF,
    overall: 79,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 15,
    name: 'Andreas',
    surname: 'Christensen',
    nationality: Nationality.Denmark,
    position: Position.DF,
    overall: 82,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 24,
    name: 'Eric',
    surname: 'Garcia',
    nationality: Nationality.Spain,
    position: Position.DF,
    overall: 79,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 5,
    name: 'Iñigo',
    surname: 'Martínez',
    nationality: Nationality.Spain,
    position: Position.DF,
    overall: 82,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 3,
    name: 'Alejandro',
    surname: 'Balde',
    nationality: Nationality.Spain,
    position: Position.LI,
    overall: 79,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 35,
    name: 'Gerard',
    surname: 'Martín',
    nationality: Nationality.Spain,
    position: Position.LI,
    overall: 72,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 23,
    name: 'Jules',
    surname: 'Koundé',
    nationality: Nationality.France,
    position: Position.LD,
    overall: 82,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 32,
    name: 'Héctor',
    surname: 'Fort',
    nationality: Nationality.Spain,
    position: Position.LD,
    overall: 72,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 17,
    name: 'Marc',
    surname: 'Casadó',
    nationality: Nationality.Spain,
    position: Position.MC,
    overall: 77,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 28,
    name: 'Marc',
    surname: 'Bernal',
    nationality: Nationality.Spain,
    position: Position.MCD,
    overall: 71,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 6,
    name: '',
    surname: '',
    nickname: 'Gavi',
    nationality: Nationality.Spain,
    position: Position.MC,
    overall: 79,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 8,
    name: '',
    surname: '',
    nickname: 'Pedri',
    nationality: Nationality.Spain,
    position: Position.MC,
    overall: 83,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 21,
    name: 'Frenkie',
    surname: 'De Jong',
    nationality: Nationality.Netherlands,
    position: Position.MC,
    overall: 83,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 16,
    name: 'Fermín',
    surname: 'López',
    nationality: Nationality.Spain,
    position: Position.MCO,
    overall: 77,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 20,
    name: 'Dani',
    surname: 'Olmo',
    nationality: Nationality.Spain,
    position: Position.MCO,
    overall: 84,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 14,
    name: 'Pablo',
    surname: 'Torre',
    nationality: Nationality.Spain,
    position: Position.MC,
    overall: 74,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 11,
    name: '',
    surname: '',
    nickname: 'Raphinha',
    nationality: Nationality.Brazil,
    position: Position.EI,
    overall: 84,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 10,
    name: 'Ansu',
    surname: 'Fati',
    nationality: Nationality.Spain,
    position: Position.EI,
    overall: 77,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 19,
    name: 'Lamine',
    surname: 'Yamal',
    nationality: Nationality.Spain,
    position: Position.ED,
    overall: 83,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 7,
    name: 'Ferran',
    surname: 'Torres',
    nationality: Nationality.Spain,
    position: Position.ED,
    overall: 80,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 9,
    name: 'Robert',
    surname: 'Lewandowski',
    nationality: Nationality.Poland,
    position: Position.DC,
    overall: 84,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
  {
    shirtNumber: 18,
    name: 'Pau',
    surname: 'Victor',
    nickname: 'Pau Victor',
    nationality: Nationality.Spain,
    position: Position.DC,
    overall: 74,
    seasonStats: initialSeasonStats,
    teamId: 0,
  },
];
