import { Player } from './player';

export interface SeasonRound {
  round: number;
  matches: Match[];
}

export interface Match {
  id: number;
  played: boolean;
  team1: number;
  team2: number;
  score1: number;
  score2: number;
  startingLineup1: Player[];
  startingLineup2: Player[];
  scorers1: number[];
  scorers2: number[];
  assistants1: number[];
  assistants2: number[];
}
