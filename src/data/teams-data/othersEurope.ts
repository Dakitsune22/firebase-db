import { initTeamData } from './init-data/init-data';
import { tactics } from '../tactics';
import { playersOthersEurope } from '../players';
import { Team, Tactic, CountryLeague } from 'src/models';
import { TacticList } from 'src/models/tactic';

let i = 0;

export const teamsOthersEurope: Team[] = [
  {
    ...initTeamData,
    id: i,
    country: CountryLeague.OthersEurope,
    name: 'Oporto',
    shortName: 'por',
    tactic: tactics.find((t) => t.name === TacticList['4-4-2']) as Tactic,
    players: playersOthersEurope[i++],
  },
];
