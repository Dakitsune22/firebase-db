export interface SeasonRound {
  round: number;
  matches: Match[];
}

interface Match {
  team1: string;
  team2: string;
  score1?: number;
  score2?: number;
}
