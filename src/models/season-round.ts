export interface SeasonRound {
  round: number;
  matches: Match[];
}

export interface Match {
  id: number;
  team1: number;
  team2: number;
  score1: number;
  score2: number;
}
