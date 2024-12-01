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

    // startingLineup.push(filteredPlayers[0]);

    // filteredPlayers.forEach((player) => {
    //   if (
    //     startingLineup.findIndex((p) => p.shirtNumber === player.shirtNumber) <
    //     0
    //   ) {
    //     startingLineup.push(player);
    //     return false;
    //   }
    // });

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
