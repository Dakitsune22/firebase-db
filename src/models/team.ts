import { Player } from './player';
import { Tactic } from './tactic';

export interface Team {
  draws: number;
  goalDifference: number;
  goalsConceded: number;
  goalsScored: number;
  id: number;
  losses: number;
  matchesPlayed: number;
  name: string;
  points: number;
  wins: number;
  tactic: Tactic;
  players: Player[];
}
