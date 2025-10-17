import { positionReplacements } from 'src/data/tactics';
import { Team, Player } from 'src/models';
import { getResult, type MatchResult } from './match-calc';
import { Position } from 'src/models/player';
import { TacticList } from 'src/models/tactic';

export const getStartingLineup = (team: Team): Player[] => {
  const startingLineup: Player[] = [];

  //   console.log(team.tactic.formation);
  team.tactic.formation.forEach((position, posIdx) => {
    const filteredPlayers = team.players.filter(
      (p) =>
        (p.position === position || // El jugador juega en la posición iterada
          ((team.tactic.name == TacticList['4-2-3-1'] || // Excepción 1: Aceptamos jugador MCD para posición MC en las tacticas señaladas
            team.tactic.name == TacticList['4-4-2']) &&
            position === Position.MC &&
            p.position === Position.MCD) ||
          (team.tactic.name == TacticList['5-3-2'] && // Excepción 2: Aceptamos jugador MCD para primera/segunda posición MC de un 5-3-2 y MCO para tercera posición MC
            position === Position.MC &&
            (((posIdx === 6 || posIdx === 7) && p.position === Position.MCD) ||
              (posIdx === 8 && p.position === Position.MCO)))) &&
        startingLineup.findIndex((psl) => psl.shirtNumber === p.shirtNumber) < 0
    );
    // console.log(filteredPlayers);
    // Si no hay ningún jugador de la posición requerida, o bien solo hay uno
    // y necesita "descanso", añadimos alternativas a la lista:
    if (
      filteredPlayers.length === 0 ||
      (filteredPlayers.length === 1 && Math.random() * 10 >= 7) // 0 a 6 no descansa, 7 a 9 descansa
    ) {
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
    // filteredPlayers.sort((a, b) => b.overall - a.overall);
    filteredPlayers.sort((a, b) => a.overall - b.overall);
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
      // Elegimos el jugador titular de entre los candidatos por posición (y reemplazos).
      // Se da prioridad a los jugadores segun su nivel:
      const diceResults: number[] = [];
      let bonus = 0;

      for (let i = 0; i < filteredPlayers.length; i++) {
        // console.log({ bonus });
        diceResults.push(
          Math.floor(Math.random() * (100 - filteredPlayers[i].overall) - bonus)
        );
        if (filteredPlayers[i].position === Position.POR) {
          bonus += 5;
        } else {
          bonus += 1;
        }
        // console.log(
        //   filteredPlayers[i].name,
        //   filteredPlayers[i].surname,
        //   '-',
        //   diceResults[i]
        // );
      }
      // Comprobamos el jugador que saco el dado más alto y lo añadimos como titular:
      const minDice = Math.min(...diceResults);
      // console.log({ minDice });
      const minDiceIndex = diceResults.findIndex((d) => d === minDice);
      // console.log({ minDiceIndex });
      // console.log(filteredPlayers[minDiceIndex]);
      startingLineup.push(filteredPlayers[minDiceIndex]);
    }
  });

  // startingLineup.forEach((player) => {
  //   console.log(player.position, player.shirtNumber, player.overall);
  // });
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
        dice = Math.floor(Math.random() * 70) + 1;
        break;
      case Position.MC:
        dice = Math.floor(Math.random() * 60) + 21;
        break;
      case Position.MCO:
      case Position.ED:
      case Position.EI:
        dice = Math.floor(Math.random() * 60) + 31;
        break;
      case Position.DC:
        dice = Math.floor(Math.random() * 60) + 41;
        break;
      // default:
      //   break;
    }
    diceResults.push(dice);
    // console.log(player.position, player.surname, '-->', dice);
  });
  // Comprobamos el jugador que ha saco el dado más alto y lo retornamos como goleador:
  const maxDice = Math.max(...diceResults);
  // console.log({ maxDice });
  const maxDiceIndex = diceResults.findIndex((d) => d === maxDice);
  // console.log({ maxDiceIndex });
  // console.log(players[maxDiceIndex]);

  return players[maxDiceIndex];
};

export const getAssistants = (
  players: Player[],
  scorers: number[]
): number[] => {
  const assistants: number[] = [];
  // console.log('Players:');
  // console.log(players);
  // for (let i = 0; i < scorers.length; i++) {
  //   // const iPlayer = Math.floor(Math.random() * players.length);
  //   // console.log('Index player:', iPlayer);
  //   // scorers.push(players[iPlayer].shirtNumber);
  //   assistants.push(getAssistantByRate(players, scorers[i]).shirtNumber);
  // }
  scorers.forEach((scorer) => {
    const dice = Math.floor(Math.random() * 100) + 1;
    console.log(dice);
    // Tiramos dado para ver si el gol tiene asistente
    // (Según estudio, el 65% de los goles provienen de una asistencia)
    if (dice <= 65) {
      // console.log('Gol con asistente');
      assistants.push(getAssistantByRate(players, scorer).shirtNumber);
    }
    // } else {
    //   console.log('Gol sin asistente');
    // }
  });
  return assistants;
};

const getAssistantByRate = (
  players: Player[],
  goalScorerShirtNumber: number
): Player => {
  const diceResults: number[] = [];
  let dice: number;

  // Tiramos dado para cada jugador, con diferente probabilidad por demarcación:
  players.forEach((player) => {
    if (player.shirtNumber === goalScorerShirtNumber) {
      // Si el jugador coincide con el goleador, le asignamos puntuación cero,
      // para que no salga elegido como asistente.
      dice = 0;
    } else {
      switch (player.position) {
        case Position.POR:
          dice = Math.floor(Math.random() * 15) + 1;
          break;
        case Position.DF:
          dice = Math.floor(Math.random() * 70) + 1;
          break;
        case Position.LD:
        case Position.LI:
        case Position.MCD:
          dice = Math.floor(Math.random() * 60) + 11;
          break;
        case Position.MC:
          dice = Math.floor(Math.random() * 60) + 31;
          break;
        case Position.MCO:
        case Position.ED:
        case Position.EI:
          dice = Math.floor(Math.random() * 60) + 41;
          break;
        case Position.DC:
          dice = Math.floor(Math.random() * 60) + 21;
          break;
        // default:
        //   break;
      }
    }
    diceResults.push(dice);
    // console.log(player.position, player.surname, '-->', dice);
  });
  // Comprobamos el jugador que ha saco el dado más alto y lo retornamos como asistente:
  const maxDice = Math.max(...diceResults);
  // console.log({ maxDice });
  const maxDiceIndex = diceResults.findIndex((d) => d === maxDice);
  // console.log({ maxDiceIndex });
  // console.log(players[maxDiceIndex]);

  return players[maxDiceIndex];
};
