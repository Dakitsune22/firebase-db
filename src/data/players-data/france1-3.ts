import type { Player } from 'src/models';
import { Flag as Nationality, Position } from 'src/models/player';
import { initialSeasonStats } from './initial-season-stats';

export const playersData: Player[] = [
  {
    shirtNumber: 1,
    name: 'Brice',
    surname: 'Samba',
    nationality: Nationality.France,
    position: Position.POR,
    overall: 80,
    seasonStats: initialSeasonStats,
    teamId: 3,
  },
  {
    shirtNumber: 80,
    name: 'Doğan',
    surname: 'Alemdar',
    nationality: Nationality.Turkey,
    position: Position.POR,
    overall: 72,
    seasonStats: initialSeasonStats,
    teamId: 3,
  },
  {
    shirtNumber: 5,
    name: 'Lilian',
    surname: 'Brassier',
    nationality: Nationality.France,
    position: Position.DF,
    overall: 77,
    seasonStats: initialSeasonStats,
    teamId: 3,
  },
  {
    shirtNumber: 24,
    name: 'Anthony',
    surname: 'Rouault',
    nationality: Nationality.France,
    position: Position.DF,
    overall: 76,
    seasonStats: initialSeasonStats,
    teamId: 3,
  },
  {
    shirtNumber: 36,
    name: 'Alidu',
    surname: 'Seidu',
    nationality: Nationality.Ghana,
    position: Position.DF,
    overall: 76,
    seasonStats: initialSeasonStats,
    teamId: 3,
  },
  {
    shirtNumber: 15,
    name: 'Mikayil',
    surname: 'Faye',
    nationality: Nationality.Senegal,
    position: Position.DF,
    overall: 74,
    seasonStats: initialSeasonStats,
    teamId: 3,
  },
  {
    shirtNumber: 4,
    name: 'Christopher',
    surname: 'Wooh',
    nationality: Nationality.Cameroon,
    position: Position.DF,
    overall: 75,
    seasonStats: initialSeasonStats,
    teamId: 3,
  },
  {
    shirtNumber: 97,
    name: 'Jérémy',
    surname: 'Jacquet',
    nationality: Nationality.France,
    position: Position.DF,
    overall: 73,
    seasonStats: initialSeasonStats,
    teamId: 3,
  },
  {
    shirtNumber: 3,
    name: 'Adrien',
    surname: 'Truffert',
    nationality: Nationality.France,
    position: Position.LI,
    overall: 77,
    seasonStats: initialSeasonStats,
    teamId: 3,
  },
  {
    shirtNumber: 22,
    name: 'Lorenz',
    surname: 'Assignon',
    nationality: Nationality.France,
    position: Position.LD,
    overall: 76,
    seasonStats: initialSeasonStats,
    teamId: 3,
  },
  {
    shirtNumber: 33,
    name: 'Hans',
    surname: 'Hateboer',
    nationality: Nationality.Netherlands,
    position: Position.LD,
    overall: 75,
    seasonStats: initialSeasonStats,
    teamId: 3,
  },
  {
    shirtNumber: 6,
    name: 'Azor',
    surname: 'Matusiwa',
    nationality: Nationality.Netherlands,
    position: Position.MCD,
    overall: 77,
    seasonStats: initialSeasonStats,
    teamId: 3,
  },
  {
    shirtNumber: 8,
    name: 'Seko',
    surname: 'Fofana',
    nationality: Nationality.IvoryCoast,
    position: Position.MC,
    overall: 80,
    seasonStats: initialSeasonStats,
    teamId: 3,
  },
  {
    shirtNumber: 90,
    name: 'Ismaël',
    surname: 'Koné',
    nationality: Nationality.Canada,
    position: Position.MC,
    overall: 76,
    seasonStats: initialSeasonStats,
    teamId: 3,
  },
  {
    shirtNumber: 17,
    name: 'Jordan',
    surname: 'James',
    nationality: Nationality.Wales,
    position: Position.MC,
    overall: 74,
    seasonStats: initialSeasonStats,
    teamId: 3,
  },
  {
    shirtNumber: 38,
    name: 'Djaoui',
    surname: 'Cissé',
    nationality: Nationality.France,
    position: Position.MC,
    overall: 74,
    seasonStats: initialSeasonStats,
    teamId: 3,
  },
  {
    shirtNumber: 19,
    name: 'Kazeem',
    surname: 'Olaigbe',
    nationality: Nationality.Belgium,
    position: Position.EI,
    overall: 73,
    seasonStats: initialSeasonStats,
    teamId: 3,
  },
  {
    shirtNumber: 10,
    name: 'Ludovic',
    surname: 'Blas',
    nationality: Nationality.France,
    position: Position.ED,
    overall: 79,
    seasonStats: initialSeasonStats,
    teamId: 3,
  },
  {
    shirtNumber: 11,
    name: 'Mousa',
    surname: 'Tamari',
    nationality: Nationality.Jordania,
    position: Position.ED,
    overall: 76,
    seasonStats: initialSeasonStats,
    teamId: 3,
  },
  {
    shirtNumber: 20,
    name: 'Carlos Andrés',
    surname: 'Gómez',
    nationality: Nationality.Colombia,
    position: Position.ED,
    overall: 74,
    seasonStats: initialSeasonStats,
    teamId: 3,
  },
  {
    shirtNumber: 7,
    name: 'Kyogo',
    surname: 'Furuhashi',
    nationality: Nationality.Japan,
    position: Position.DC,
    overall: 77,
    seasonStats: initialSeasonStats,
    teamId: 3,
  },
  {
    shirtNumber: 9,
    name: 'Arnaud',
    surname: 'Kalimuendo',
    nationality: Nationality.France,
    position: Position.DC,
    overall: 80,
    seasonStats: initialSeasonStats,
    teamId: 3,
  },
];
