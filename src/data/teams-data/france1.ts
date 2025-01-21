import { initTeamData } from './init-data/init-data';
import { tactics } from '../tactics';
import { playersFrance1 } from '../players';
import { Team, Tactic } from 'src/models';
import { TacticList } from 'src/models/tactic';

let i = 0;

export const teamsFrance1: Team[] = [
  {
    ...initTeamData,
    id: i,
    name: 'France',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'France',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'France',
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'France',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'France',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'France',
    tactic: tactics.find((t) => t.name === TacticList['4-3-3-DEF']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'France',
    tactic: tactics.find((t) => t.name === TacticList['4-5-1-OF']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'France',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'France',
    tactic: tactics.find((t) => t.name === TacticList['5-4-1-OF']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'France',
    tactic: tactics.find((t) => t.name === TacticList['4-3-3-DEF']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'France',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'France',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'France',
    tactic: tactics.find((t) => t.name === TacticList['4-5-1-OF']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'France',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'France',
    tactic: tactics.find((t) => t.name === TacticList['5-4-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'France',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'France',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'France',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'France',
    tactic: tactics.find((t) => t.name === TacticList['4-3-3-DEF']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'France',
    tactic: tactics.find((t) => t.name === TacticList['5-4-1-OF']) as Tactic,
    players: playersFrance1[i++],
  },
];
