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
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Bor. Dortmund',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Stuttgart',
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Friburgo',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Bayern Múnich',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Wolfsburgo',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-3-3-Defensivo']
    ) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Heidenheim',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-5-1-Ofensivo']
    ) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'St. Pauli',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Bochum',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-5-1-Ofensivo']
    ) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'RB Leipzig',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-3-3-Defensivo']
    ) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Kiel',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Hoffenheim',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'B. Leverkusen',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-5-1-Ofensivo']
    ) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: "Bor. M'gladbach",
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Unión Berlín',
    tactic: tactics.find((t) => t.name === TacticList['5-4-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Mainz',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Werder Bremen',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Augsburgo',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
];
