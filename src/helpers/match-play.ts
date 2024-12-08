import { positionReplacements } from 'src/data/tactics';
import { Team, Player } from 'src/models';

export const getStartingLineup = (team: Team): Player[] => {
  const startingLineup: Player[] = [];

  //   console.log(team.tactic.formation);
  team.tactic.formation.forEach((position) => {
    const filteredPlayers = team.players.filter((p) => p.position === position);
    if (filteredPlayers.length === 0) {
      const posRep = positionReplacements.find(
        (pr) => pr.position === position
      );
      //   console.log(filteredPlayers);
      if (posRep) {
        posRep.replacements.forEach((pr) => {
          filteredPlayers.push(
            ...team.players.filter((player) => player.position === pr.position)
          );
        });
      }
    }
    filteredPlayers.sort((a, b) => b.overall - a.overall);
    console.log(filteredPlayers);

    for (let i = 0; i < filteredPlayers.length; i++) {
      if (
        startingLineup.findIndex(
          (p) => p.shirtNumber === filteredPlayers[i].shirtNumber
        ) < 0
      ) {
        startingLineup.push(filteredPlayers[i]);
        break;
      }
    }
  });

  startingLineup.forEach((player) => {
    console.log(player.position, player.shirtNumber, player.overall);
  });
  return startingLineup;
};

export const getScorers = (goals: number, players: Player[]): number[] => {
  const scorers: number[] = [];
  console.log('Players:');
  console.log(players);
  for (let i = 0; i < goals; i++) {
    const iPlayer = Math.floor(Math.random() * players.length);
    console.log('Index player:', iPlayer);
    scorers.push(players[iPlayer].shirtNumber);
  }
  return scorers;
};
