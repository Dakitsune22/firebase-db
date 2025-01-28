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
    name: 'Auxerre',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Saint-Étienne',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Mónaco',
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Stade Rennes',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Estrasburgo',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'LOSC Lille',
    tactic: tactics.find((t) => t.name === TacticList['4-3-3-DEF']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'PSG',
    tactic: tactics.find((t) => t.name === TacticList['4-5-1-OF']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Stade Reims',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Le Havre',
    tactic: tactics.find((t) => t.name === TacticList['5-4-1-OF']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Stade Brest',
    tactic: tactics.find((t) => t.name === TacticList['4-3-3-DEF']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Nantes',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Lyon',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Toulouse',
    tactic: tactics.find((t) => t.name === TacticList['4-5-1-OF']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Montpellier',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Lens',
    tactic: tactics.find((t) => t.name === TacticList['5-4-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Angers',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Niza',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Marsella',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
];
