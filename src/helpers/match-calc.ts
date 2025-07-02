enum MatchResultValue {
  Draw = 'draw',
  Win = 'win',
  Lose = 'lose',
}

export interface MatchResult {
  localScore: number;
  awayScore: number;
}

interface WinnerInfo {
  winner: 1 | 2 | 0;
  winnerOverallDiff: number;
}

const getWinner = (localOverall: number, awayOverall: number): WinnerInfo => {
  let mrv: MatchResultValue;
  let homeBonus: number;
  let overallDiff: number = localOverall - awayOverall;

  // Calculamos bonus para equipo local. Posibilidad de ser mayor si el equipo es muy inferior.
  if (overallDiff < -5) {
    homeBonus = Math.random() * 2;
  } else if (overallDiff < -3) {
    homeBonus = Math.random() * 1.5;
  } else if (overallDiff > 5) {
    homeBonus = 0;
  } else if (overallDiff > 3) {
    homeBonus = Math.random() * 0.5;
  } else {
    homeBonus = Math.random() * 1;
  }
  // Actualizamos la diferencia de nivel entre equipos aplicando el bonus local calculado:
  overallDiff += homeBonus;
  // console.log({ homeBonus });
  // console.log({ overallDiff });

  // Guardamos la diferencia de nivel en positivo:
  const positiveOverallDiff: number = Math.abs(overallDiff);
  // console.log({ positiveOverallDiff });
  //   if (overallDiff < 0) {
  //     overallDiff = overallDiff * -1;
  //   }

  // Calculamos, según diferencia de nivel, si el resultado es victoria, empate o derrota:
  const dice = Math.floor(Math.random() * 100);
  // console.log({ dice });

  if (positiveOverallDiff >= 9) {
    mrv =
      dice > 20
        ? MatchResultValue.Win
        : dice <= 10
        ? MatchResultValue.Lose
        : MatchResultValue.Draw;
  } else if (positiveOverallDiff >= 7) {
    mrv =
      dice > 25
        ? MatchResultValue.Win
        : dice <= 12
        ? MatchResultValue.Lose
        : MatchResultValue.Draw;
  } else if (positiveOverallDiff >= 5) {
    mrv =
      dice > 30
        ? MatchResultValue.Win
        : dice <= 15
        ? MatchResultValue.Lose
        : MatchResultValue.Draw;
  } else if (positiveOverallDiff >= 3) {
    mrv =
      dice > 35
        ? MatchResultValue.Win
        : dice <= 17
        ? MatchResultValue.Lose
        : MatchResultValue.Draw;
  } else if (positiveOverallDiff >= 2) {
    mrv =
      dice > 40
        ? MatchResultValue.Win
        : dice <= 20
        ? MatchResultValue.Lose
        : MatchResultValue.Draw;
  } else if (positiveOverallDiff >= 1) {
    mrv =
      dice > 50
        ? MatchResultValue.Win
        : dice <= 25
        ? MatchResultValue.Lose
        : MatchResultValue.Draw;
  } else {
    // >= 0 y < 1
    mrv =
      dice > 66
        ? MatchResultValue.Win
        : dice <= 33
        ? MatchResultValue.Lose
        : MatchResultValue.Draw;
  }

  // Retornamos si la victoria/derrota corresponde al equipo local (1) o visitante (2):
  // (o hay empate (0))
  switch (mrv) {
    case MatchResultValue.Win:
      return overallDiff >= 0
        ? { winner: 1, winnerOverallDiff: overallDiff }
        : { winner: 2, winnerOverallDiff: overallDiff };

    case MatchResultValue.Lose:
      return overallDiff >= 0
        ? { winner: 2, winnerOverallDiff: overallDiff }
        : { winner: 1, winnerOverallDiff: overallDiff };

    case MatchResultValue.Draw:
      return { winner: 0, winnerOverallDiff: overallDiff };
  }
};

export const getResult = (
  localOverall: number,
  awayOverall: number
  // matchWinner: number,
  // winnerOverallDiff: number
): MatchResult => {
  let localScore: number;
  let awayScore: number;
  let winnerScore: number;
  let loserScore: number;

  // Calculamos ganador:
  const { winner: matchWinner, winnerOverallDiff } = getWinner(
    localOverall,
    awayOverall
  );

  // console.log({ matchWinner });
  switch (matchWinner) {
    // Empate:
    case 0:
      const drawDice = Math.floor(Math.random() * 100) + 1;
      if (drawDice > 90) {
        return { localScore: 3, awayScore: 3 };
      } else if (drawDice > 60) {
        return { localScore: 2, awayScore: 2 };
      } else if (drawDice > 30) {
        return { localScore: 1, awayScore: 1 };
      } else {
        return { localScore: 0, awayScore: 0 };
      }
    // Victoria local o visitante:
    case 1:
    case 2:
      if (winnerOverallDiff > 7) {
        winnerScore = Math.floor(Math.random() * 6) + 1;
        loserScore = Math.floor(Math.random() * (winnerScore / 2));
      } else if (winnerOverallDiff > 5) {
        winnerScore = Math.floor(Math.random() * 5) + 1;
        loserScore = Math.floor(Math.random() * (winnerScore / 2));
      } else if (winnerOverallDiff > 3) {
        winnerScore = Math.floor(Math.random() * 4) + 1;
        loserScore = Math.floor(Math.random() * winnerScore);
      } else if (winnerOverallDiff > 1) {
        winnerScore = Math.floor(Math.random() * 4) + 1;
        loserScore = Math.floor(Math.random() * winnerScore);
      } else {
        winnerScore = Math.floor(Math.random() * 3) + 1;
        loserScore = Math.floor(Math.random() * winnerScore);
      }
      if (matchWinner === 1) {
        localScore = winnerScore;
        awayScore = loserScore;
      } else {
        localScore = loserScore;
        awayScore = winnerScore;
      }
      return { localScore, awayScore };

    default: {
      localScore = 9;
      awayScore = 9;
      return { localScore, awayScore };
    }
  }
};
