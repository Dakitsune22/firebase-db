import { initTeamData } from './init-data/init-data';
import { tactics } from '../tactics';
import { playersEngland1 } from '../players';
import { Team, Tactic, CountryLeague } from 'src/models';
import { TacticList } from 'src/models/tactic';

let i = 0;

export const teamsEngland1: Team[] = [
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.England,
    name: 'Aston Villa',
    shortName: 'asv',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.England,
    name: 'Bournemouth',
    shortName: 'bou',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.England,
    name: 'Brentford',
    shortName: 'bre',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.England,
    name: 'Brighton',
    shortName: 'bgt',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.England,
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
    country: CountryLeague.England,
    name: 'Chelsea',
    shortName: 'che',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.England,
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
    country: CountryLeague.England,
    name: 'Everton',
    shortName: 'evt',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.England,
    name: 'Fulham',
    shortName: 'fhm',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.England,
    name: 'Ipswich',
    shortName: 'ips',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.England,
    name: 'Leicester',
    shortName: 'lei',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.England,
    name: 'Liverpool',
    shortName: 'lvp',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.England,
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
    country: CountryLeague.England,
    name: 'Manchester Utd',
    shortName: 'mnu',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.England,
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
    country: CountryLeague.England,
    name: 'Nott. Forest',
    shortName: 'not',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.England,
    name: 'Southampton',
    shortName: 'sth',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.England,
    name: 'Tottenham',
    shortName: 'tth',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersEngland1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.England,
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
    country: CountryLeague.England,
    name: 'Wolves',
    shortName: 'wol',
    tactic: tactics.find((t) => t.name === TacticList['4-4-2']) as Tactic,
    players: playersEngland1[i++],
  },
];
