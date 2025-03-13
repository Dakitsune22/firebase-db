import { initTeamData } from './init-data/init-data';
import { tactics } from '../tactics';
import { playersItaly1 } from '../players';
import { Team, Tactic } from 'src/models';
import { TacticList } from 'src/models/tactic';

let i = 0;

export const teamsItaly1: Team[] = [
  {
    ...initTeamData,
    id: i,
    name: 'Torino',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersItaly1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Cagliari',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersItaly1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Como',
    players: playersItaly1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Atalanta',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersItaly1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Nápoles',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersItaly1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Juventus',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersItaly1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Empoli',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersItaly1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Bolonia',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersItaly1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'AC Milan',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersItaly1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Parma',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersItaly1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Génova',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersItaly1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Monza',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersItaly1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Venezia',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersItaly1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Hellas Verona',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersItaly1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Lazio',
    tactic: tactics.find((t) => t.name === TacticList['5-4-1']) as Tactic,
    players: playersItaly1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Fiorentina',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersItaly1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Lecce',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersItaly1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Inter',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersItaly1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Udinese',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersItaly1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'AS Roma',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersItaly1[i++],
  },
];
