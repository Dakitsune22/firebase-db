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
    name: 'Valladolid',
    shortName: 'vll',
    tactic: tactics.find((t) => t.name === TacticList['5-4-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Real Madrid',
    shortName: 'rmd',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Atlético Madrid',
    shortName: 'atm',
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Valencia',
    shortName: 'val',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Villarreal',
    shortName: 'vlr',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
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
    name: 'Betis',
    shortName: 'bet',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Girona',
    shortName: 'gir',
    tactic: tactics.find((t) => t.name === TacticList['5-4-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
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
    name: 'Rayo Vallecano',
    shortName: 'ray',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Getafe',
    shortName: 'gtf',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
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
    name: 'Athletic',
    shortName: 'ath',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'FC Barcelona',
    shortName: 'fcb',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Celta',
    shortName: 'cel',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Alavés',
    shortName: 'alv',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Mallorca',
    shortName: 'mll',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
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
    name: 'Leganés',
    shortName: 'leg',
    tactic: tactics.find(
      (t) => t.name === TacticList['5-4-1-Ofensivo']
    ) as Tactic,
    players: playersSpain1[i++],
  },
];
