import { positionReplacements } from 'src/data/tactics';
import { Team, Player } from 'src/models';
import { getResult, type MatchResult } from './match-calc';
import { Position } from 'src/models/player';

export const getStartingLineup = (team: Team): Player[] => {
  const startingLineup: Player[] = [];

  //   console.log(team.tactic.formation);
  team.tactic.formation.forEach((position) => {
    const filteredPlayers = team.players.filter(
      (p) =>
        p.position === position &&
        startingLineup.findIndex((psl) => psl.shirtNumber === p.shirtNumber) < 0
    );

    if (filteredPlayers.length === 0) {
      const posRep = positionReplacements.find(
        (pr) => pr.position === position
      );
      if (posRep) {
        posRep.replacements.forEach((pr) => {
          filteredPlayers.push(
            ...team.players.filter(
              (player) =>
                player.position === pr.position &&
                startingLineup.findIndex(
                  (psl) => psl.shirtNumber === player.shirtNumber
                ) < 0
            )
          );
        });
      }
    }
    filteredPlayers.sort((a, b) => b.overall - a.overall);
    // console.log('Filtered players:');
    // console.log(filteredPlayers);

    // for (let i = 0; i < filteredPlayers.length; i++) {
    //   if (
    //     startingLineup.findIndex(
    //       (p) => p.shirtNumber === filteredPlayers[i].shirtNumber
    //     ) < 0
    //   ) {
    // startingLineup.push(filteredPlayers[0]);
    //     break;
    //   }
    // }
    if (filteredPlayers.length > 0) {
      startingLineup.push(filteredPlayers[0]);
    }
  });

  startingLineup.forEach((player) => {
    console.log(player.position, player.shirtNumber, player.overall);
  });
  return startingLineup;
};

export const getMatchResult = (
  homeTeamOverall: number,
  awayTeamOverall: number
): MatchResult => {
  return getResult(homeTeamOverall, awayTeamOverall);
};

export const getScorers = (goals: number, players: Player[]): number[] => {
  const scorers: number[] = [];
  // console.log('Players:');
  // console.log(players);
  for (let i = 0; i < goals; i++) {
    // const iPlayer = Math.floor(Math.random() * players.length);
    // console.log('Index player:', iPlayer);
    // scorers.push(players[iPlayer].shirtNumber);
    scorers.push(getScorerByRate(players).shirtNumber);
  }
  return scorers;
};

const getScorerByRate = (players: Player[]): Player => {
  const diceResults: number[] = [];
  let dice: number;

  // Tiramos dado para cada jugador, con diferente probabilidad por demarcación:
  players.forEach((player) => {
    switch (player.position) {
      case Position.POR:
        dice = Math.floor(Math.random() * 10) + 1;
        break;
      case Position.DF:
      case Position.LD:
      case Position.LI:
      case Position.MCD:
        dice = Math.floor(Math.random() * 100) + 1;
        break;
      case Position.MC:
        dice = Math.floor(Math.random() * 80) + 21;
        break;
      case Position.MCO:
      case Position.ED:
      case Position.EI:
        dice = Math.floor(Math.random() * 70) + 31;
        break;
      case Position.DC:
        dice = Math.floor(Math.random() * 60) + 41;
        break;
      // default:
      //   break;
    }
    diceResults.push(dice);
    console.log(player.position, player.surname, '-->', dice);
  });
  // Comprobamos el jugador que ha saco el dado más alto y lo retornamos como goleador:
  const maxDice = Math.max(...diceResults);
  console.log({ maxDice });
  const maxDiceIndex = diceResults.findIndex((d) => d === maxDice);
  console.log({ maxDiceIndex });
  console.log(players[maxDiceIndex]);

  return players[maxDiceIndex];
};
