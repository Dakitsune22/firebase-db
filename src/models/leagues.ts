export enum Leagues {
  LaLigaPrimeraDivision = 'spain-1',
  PremierLeague = 'england-1',
  SerieA = 'italy-1',
  Bundesliga = 'germany-1',
  Ligue1 = 'france-1',
  MyLeague = 'myleague',
}

export enum CountryLeague {
  England = 'england',
  France = 'france',
  Germany = 'germany',
  Italy = 'italy',
  Spain = 'spain',
}

export const leaguesMap = [
  {
    label: 'La Liga Primera Division',
    value: Leagues.LaLigaPrimeraDivision,
  },
  {
    label: 'Premier League',
    value: Leagues.PremierLeague,
  },
  {
    label: 'Bundesliga',
    value: Leagues.Bundesliga,
  },
  {
    label: 'Serie A',
    value: Leagues.SerieA,
  },
  {
    label: 'Ligue 1',
    value: Leagues.Ligue1,
  },
];
