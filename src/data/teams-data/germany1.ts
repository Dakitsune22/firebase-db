import { initTeamData } from './init-data/init-data';
import { tactics } from '../tactics';
import { playersGermany1 } from '../players';
import { Team, Tactic, CountryLeague } from 'src/models';
import { TacticList } from 'src/models/tactic';

let i = 0;

export const teamsGermany1: Team[] = [
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.Germany,
    name: 'Eintracht',
    shortName: 'ein',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.Germany,
    name: 'Bor. Dortmund',
    shortName: 'dor',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.Germany,
    name: 'Stuttgart',
    shortName: 'stt',
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.Germany,
    name: 'Friburgo',
    shortName: 'fri',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.Germany,
    name: 'Bayern Múnich',
    shortName: 'mun',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.Germany,
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
    country: CountryLeague.Germany,
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
    country: CountryLeague.Germany,
    name: 'St. Pauli',
    shortName: 'stp',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.Germany,
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
    country: CountryLeague.Germany,
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
    country: CountryLeague.Germany,
    name: 'Kiel',
    shortName: 'kie',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.Germany,
    name: 'Hoffenheim',
    shortName: 'hof',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.Germany,
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
    country: CountryLeague.Germany,
    name: "Bor. M'gladbach",
    shortName: 'mgb',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.Germany,
    name: 'Unión Berlín',
    shortName: 'ube',
    tactic: tactics.find((t) => t.name === TacticList['5-4-1']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.Germany,
    name: 'Mainz',
    shortName: 'mnz',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.Germany,
    name: 'Werder Bremen',
    shortName: 'wbr',
    tactic: tactics.find((t) => t.name === TacticList['5-3-2']) as Tactic,
    players: playersGermany1[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.Germany,
    name: 'Augsburgo',
    shortName: 'aug',
    tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
    players: playersGermany1[i++],
  },
];
