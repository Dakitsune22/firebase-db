import { initTeamData } from './init-data/init-data';
import { tactics } from '../tactics';
import { playersOthersWorld } from '../players';
import { Team, Tactic, CountryLeague } from 'src/models';
import { TacticList } from 'src/models/tactic';

let i = 0;

export const teamsOthersWorld: Team[] = [
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.OthersWorld,
    name: 'Boca Juniors',
    shortName: 'bca',
    tactic: tactics.find((t) => t.name === TacticList['4-4-2']) as Tactic,
    players: playersOthersWorld[i++],
  },
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.OthersWorld,
    name: 'River Plate',
    shortName: 'riv',
    tactic: tactics.find((t) => t.name === TacticList['4-3-3']) as Tactic,
    players: playersOthersWorld[i++],
  },
];
