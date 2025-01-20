import { Team, Tactic } from 'src/models';
import { TacticList } from 'src/models/tactic';
import { tactics } from './tactics';
import { playersSpain1, playersEngland1 } from './players';

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
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Real Madrid',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Atlético Madrid',
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Valencia',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Villarreal',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Sevilla',
    tactic: tactics.find((t) => t.name === TacticList['4-3-3-DEF']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Real Sociedad',
    tactic: tactics.find((t) => t.name === TacticList['4-5-1-OF']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Betis',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Girona',
    tactic: tactics.find((t) => t.name === TacticList['5-4-1-OF']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Osasuna',
    tactic: tactics.find((t) => t.name === TacticList['4-3-3-DEF']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Rayo Vallecano',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Getafe',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Espanyol',
    tactic: tactics.find((t) => t.name === TacticList['4-5-1-OF']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Athletic',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Valladolid',
    tactic: tactics.find((t) => t.name === TacticList['5-4-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Celta',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Alavés',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Mallorca',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Las Palmas',
    tactic: tactics.find((t) => t.name === TacticList['4-3-3-DEF']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Leganés',
    tactic: tactics.find((t) => t.name === TacticList['5-4-1-OF']) as Tactic,
    players: playersSpain1[i++],
  },
];

i = 0;

export const teamsEngland1: Team[] = [
  {
    ...initTeamData,
    id: i,
    name: 'Aston Villa',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Bournemouth',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Brentford',
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Brighton',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Arsenal',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Chelsea',
    tactic: tactics.find((t) => t.name === TacticList['4-3-3-DEF']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Crystal Palace',
    tactic: tactics.find((t) => t.name === TacticList['4-5-1-OF']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Everton',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Fulham',
    tactic: tactics.find((t) => t.name === TacticList['5-4-1-OF']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Ipswich',
    tactic: tactics.find((t) => t.name === TacticList['4-3-3-DEF']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Leicester',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Liverpool',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Manchester City',
    tactic: tactics.find((t) => t.name === TacticList['4-5-1-OF']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Manchester Utd',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Newcastle',
    tactic: tactics.find((t) => t.name === TacticList['5-4-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Nott. Forest',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Southampton',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Tottenham',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'West Ham',
    tactic: tactics.find((t) => t.name === TacticList['4-3-3-DEF']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Wolves',
    tactic: tactics.find((t) => t.name === TacticList['5-4-1-OF']) as Tactic,
    players: playersEngland1[i++],
  },
];
