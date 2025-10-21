export enum Leagues {
  LaLigaPrimeraDivision = 'spain-1',
  LaLigaSegundaDivision = 'spain-2',
  PremierLeague = 'england-1',
  Championship = 'england-2',
  SerieA = 'italy-1',
  Bundesliga = 'germany-1',
  Ligue1 = 'france-1',
  MyLeague = 'myleague',
  MyCup = 'mycup',
  OthersEurope = 'others-europe-1',
  OthersWorld = 'others-world-1',
}

export enum CountryLeague {
  England = 'england',
  France = 'france',
  Germany = 'germany',
  Italy = 'italy',
  Spain = 'spain',
  OthersEurope = 'others-europe',
  OthersWorld = 'others-world',
}

export enum SeasonId {
  Season_2025_2026_Summer = '2025-2026-summer',
  Season_2025_2026_Winter = '2025-2026-winter',
  Season_2026_2027_Summer = '2026-2027-summer',
  Season_2026_2027_Winter = '2026-2027-winter',
}

export const leaguesMap = [
  {
    label: 'LaLiga EA Sports',
    value: Leagues.LaLigaPrimeraDivision,
  },
  {
    label: 'LaLiga Hypermotion',
    value: Leagues.LaLigaSegundaDivision,
  },
  {
    label: 'Premier League',
    value: Leagues.PremierLeague,
  },
  {
    label: 'Championship',
    value: Leagues.Championship,
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
  {
    label: 'Otros equipos: Europa',
    value: Leagues.OthersEurope,
  },
  {
    label: 'Otros equipos: Mundo',
    value: Leagues.OthersWorld,
  },
];
