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
    tactic: tactics.find(
      (t) => t.name === TacticList['4-3-3-Defensivo']
    ) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Real Sociedad',
    tactic: tactics.find(
      (t) => t.name === TacticList['5-4-1-Ofensivo']
    ) as Tactic,
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
    tactic: tactics.find((t) => t.name === TacticList['5-4-1']) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Osasuna',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-3-3-Defensivo']
    ) as Tactic,
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
    tactic: tactics.find(
      (t) => t.name === TacticList['4-5-1-Ofensivo']
    ) as Tactic,
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
    tactic: tactics.find(
      (t) => t.name === TacticList['4-3-3-Defensivo']
    ) as Tactic,
    players: playersSpain1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Leganés',
    tactic: tactics.find(
      (t) => t.name === TacticList['5-4-1-Ofensivo']
    ) as Tactic,
    players: playersSpain1[i++],
  },
];
