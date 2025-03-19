import { Team, Tactic, CountryLeague } from 'src/models';
import { TacticList } from 'src/models/tactic';
import { tactics } from '../../tactics';

export const initTeamData: Team = {
  id: 0,
  name: '',
  shortName: '',
  country: CountryLeague.Spain,
  tactic: tactics.find((t) => t.name === TacticList['4-4-2']) as Tactic,
  matchesPlayed: 0,
  points: 0,
  wins: 0,
  draws: 0,
  losses: 0,
  goalsScored: 0,
  goalsConceded: 0,
  goalDifference: 0,
  players: [],
};
