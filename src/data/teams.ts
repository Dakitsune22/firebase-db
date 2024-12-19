import { Team, Tactic } from 'src/models';
import { TacticList } from 'src/models/tactic';
import { tactics } from './tactics';
import players from './players';

// export const teamsSpain1: string[] = [
//   'FC Barcelona',
//   'Real Madrid',
//   'Atlético Madrid',
//   'Valencia',
//   'Villarreal',
//   'Sevilla',
//   'Real Sociedad',
//   'Betis',
//   'Girona',
//   'Osasuna',
//   'Rayo Vallecano',
//   'Getafe',
//   'Espanyol',
//   'Athletic',
//   'Valladolid',
//   'Celta',
//   'Alavés',
//   'Mallorca',
//   'Las Palmas',
//   'Leganés',
// ];

const initTeamData: Team = {
  id: 0,
  name: '',
  tactic: tactics.find((t) => t.name === TacticList['4-4-2']) as Tactic,
  matchesPlayed: 0,
  points: 0,
  wins: 0,
  draws: 0,
  losses: 0,
  goalsScored: 0,
  goalsConceded: 0,
  goalDifference: 0,
  players: [],
};

let i = 0;

export const teamsSpain1: Team[] = [
  {
    ...initTeamData,
    id: i,
    name: 'FC Barcelona',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: players[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Real Madrid',
    players: players[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Atlético Madrid',
    players: players[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Valencia',
    players: players[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Villarreal',
    players: players[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Sevilla',
    players: players[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Real Sociedad',
    players: players[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Betis',
    players: players[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Girona',
    players: players[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Osasuna',
    players: players[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Rayo Vallecano',
    players: players[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Getafe',
    players: players[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Espanyol',
    players: players[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Athletic',
    players: players[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Valladolid',
    players: players[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Celta',
    players: players[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Alavés',
    players: players[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Mallorca',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: players[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Las Palmas',
    players: players[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Leganés',
    players: players[i++],
  },
];
