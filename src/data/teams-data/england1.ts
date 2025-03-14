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
    shortName: 'asv',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Bournemouth',
    shortName: 'bou',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Brentford',
    shortName: 'bre',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Brighton',
    shortName: 'bgt',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Arsenal',
    shortName: 'ars',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-3-3-Defensivo']
    ) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Chelsea',
    shortName: 'che',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Crystal Palace',
    shortName: 'cry',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-5-1-Ofensivo']
    ) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Everton',
    shortName: 'evt',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Fulham',
    shortName: 'fhm',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Ipswich',
    shortName: 'ips',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Leicester',
    shortName: 'lei',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Liverpool',
    shortName: 'lvp',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Manchester City',
    shortName: 'mnc',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-3-3-Defensivo']
    ) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Manchester Utd',
    shortName: 'mnu',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Newcastle',
    shortName: 'nwc',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-3-3-Defensivo']
    ) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Nott. Forest',
    shortName: 'not',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Southampton',
    shortName: 'sth',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Tottenham',
    shortName: 'tth',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'West Ham',
    shortName: 'whm',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-5-1-Ofensivo']
    ) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Wolves',
    shortName: 'wol',
    tactic: tactics.find((t) => t.name === TacticList['4-4-2']) as Tactic,
    players: playersEngland1[i++],
  },
];
