import { initTeamData } from './init-data/init-data';
import { tactics } from '../tactics';
import { playersEngland1 } from '../players';
import { Team, Tactic } from 'src/models';
import { TacticList } from 'src/models/tactic';

let i = 0;

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
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
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
    tactic: tactics.find(
      (t) => t.name === TacticList['4-3-3-Defensivo']
    ) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Chelsea',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Crystal Palace',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-5-1-Ofensivo']
    ) as Tactic,
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
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Ipswich',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
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
    tactic: tactics.find(
      (t) => t.name === TacticList['4-3-3-Defensivo']
    ) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Manchester Utd',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Newcastle',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-3-3-Defensivo']
    ) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Nott. Forest',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
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
    tactic: tactics.find(
      (t) => t.name === TacticList['4-5-1-Ofensivo']
    ) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Wolves',
    tactic: tactics.find((t) => t.name === TacticList['4-4-2']) as Tactic,
    players: playersEngland1[i++],
  },
];
