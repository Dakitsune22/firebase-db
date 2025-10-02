import { initTeamData } from './init-data/init-data';
import { tactics } from '../tactics';
import { playersSpain1 } from '../players';
import { Team, Tactic } from 'src/models';
import { TacticList } from 'src/models/tactic';

let i = 0;

export const teamsSpain1: Team[] = [
  {
    ...initTeamData,
    id: i,
    division: 1,
    name: 'Valladolid',
    shortName: 'vll',
    tactic: tactics.find((t) => t.name === TacticList['5-4-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    division: 1,
    name: 'Real Madrid',
    shortName: 'rmd',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    division: 1,
    name: 'Atlético Madrid',
    shortName: 'atm',
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    division: 1,
    name: 'Valencia',
    shortName: 'val',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    division: 1,
    name: 'Villarreal',
    shortName: 'vlr',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    division: 1,
    name: 'Sevilla',
    shortName: 'sev',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-3-3-Defensivo']
    ) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    division: 1,
    name: 'Real Sociedad',
    shortName: 'rso',
    tactic: tactics.find(
      (t) => t.name === TacticList['5-4-1-Ofensivo']
    ) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    division: 1,
    name: 'Betis',
    shortName: 'bet',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    division: 1,
    name: 'Girona',
    shortName: 'gir',
    tactic: tactics.find((t) => t.name === TacticList['5-4-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    division: 1,
    name: 'Osasuna',
    shortName: 'osa',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-3-3-Defensivo']
    ) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    division: 1,
    name: 'Rayo Vallecano',
    shortName: 'ray',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    division: 1,
    name: 'Getafe',
    shortName: 'gtf',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    division: 1,
    name: 'Espanyol',
    shortName: 'esp',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-5-1-Ofensivo']
    ) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    division: 1,
    name: 'Athletic',
    shortName: 'ath',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    division: 1,
    name: 'FC Barcelona',
    shortName: 'fcb',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    division: 1,
    name: 'Celta',
    shortName: 'cel',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    division: 1,
    name: 'Alavés',
    shortName: 'alv',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    division: 1,
    name: 'Mallorca',
    shortName: 'mll',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    division: 1,
    name: 'Las Palmas',
    shortName: 'pal',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-3-3-Defensivo']
    ) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    division: 1,
    name: 'Leganés',
    shortName: 'leg',
    tactic: tactics.find(
      (t) => t.name === TacticList['5-4-1-Ofensivo']
    ) as Tactic,
    players: playersSpain1[i++],
  },
];
