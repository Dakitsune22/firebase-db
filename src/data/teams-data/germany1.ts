import { initTeamData } from './init-data/init-data';
import { tactics } from '../tactics';
import { playersGermany1 } from '../players';
import { Team, Tactic } from 'src/models';
import { TacticList } from 'src/models/tactic';

let i = 0;

export const teamsGermany1: Team[] = [
  {
    ...initTeamData,
    id: i,
    name: 'Eintracht',
    shortName: 'ein',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Bor. Dortmund',
    shortName: 'dor',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Stuttgart',
    shortName: 'stt',
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Friburgo',
    shortName: 'fri',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Bayern Múnich',
    shortName: 'mun',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Wolfsburgo',
    shortName: 'wlf',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-3-3-Defensivo']
    ) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Heidenheim',
    shortName: 'hdn',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-5-1-Ofensivo']
    ) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'St. Pauli',
    shortName: 'stp',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Bochum',
    shortName: 'bch',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-5-1-Ofensivo']
    ) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'RB Leipzig',
    shortName: 'rbl',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-3-3-Defensivo']
    ) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Kiel',
    shortName: 'kie',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Hoffenheim',
    shortName: 'hof',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'B. Leverkusen',
    shortName: 'lev',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-5-1-Ofensivo']
    ) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: "Bor. M'gladbach",
    shortName: 'mgb',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Unión Berlín',
    shortName: 'ube',
    tactic: tactics.find((t) => t.name === TacticList['5-4-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Mainz',
    shortName: 'mnz',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Werder Bremen',
    shortName: 'wbr',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Augsburgo',
    shortName: 'aug',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
];
