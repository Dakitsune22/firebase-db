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
    shortName: 'axr',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Saint-Étienne',
    shortName: 'set',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Mónaco',
    shortName: 'mon',
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Stade Rennes',
    shortName: 'ren',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Estrasburgo',
    shortName: 'est',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'LOSC Lille',
    shortName: 'lil',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-3-3-Defensivo']
    ) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'PSG',
    shortName: 'psg',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-5-1-Ofensivo']
    ) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Stade Reims',
    shortName: 'sre',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Le Havre',
    shortName: 'hav',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-5-1-Ofensivo']
    ) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Stade Brest',
    shortName: 'sbr',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-3-3-Defensivo']
    ) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Nantes',
    shortName: 'nan',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Lyon',
    shortName: 'lyo',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Toulouse',
    shortName: 'tou',
    tactic: tactics.find(
      (t) => t.name === TacticList['4-5-1-Ofensivo']
    ) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Montpellier',
    shortName: 'mpl',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Lens',
    shortName: 'len',
    tactic: tactics.find((t) => t.name === TacticList['5-4-1']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Angers',
    shortName: 'ang',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Niza',
    shortName: 'niz',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersFrance1[i++],
  },
  {
    ...initTeamData,
    id: i,
    name: 'Marsella',
    shortName: 'mrs',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersFrance1[i++],
  },
];
