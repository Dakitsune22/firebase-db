import { useQuery } from '@tanstack/vue-query';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { Player, Team } from 'src/models';

const getPlayersByGoalsScored = async (): Promise<Player[]> => {
  const q = query(collection(db, 'teams-spain-1'));
  const docs = await getDocs(q);
  const teams: Team[] = [];
  const players: Player[] = [];

  docs.forEach((doc) => {
    teams.push(doc.data() as Team);
  });

  teams.forEach((team) => {
    team.players.forEach((player) => {
      if (player.seasonStats.goals > 0) {
        players.push(player);
      }
    });
  });

  // return players.sort((a, b) => {
  //   if (a.seasonStats.goals && b.seasonStats.goals) {
  //     if (a.seasonStats.goals > b.seasonStats.goals) {
  //       return -1;
  //     }
  //     if (a.seasonStats.goals < b.seasonStats.goals) {
  //       return 1;
  //     }
  //   }
  //   return 0;
  // });

  players.sort((a, b) => {
    if (a.seasonStats.goals && b.seasonStats.goals) {
      if (a.seasonStats.goals > b.seasonStats.goals) {
        return -1;
      }
      if (a.seasonStats.goals < b.seasonStats.goals) {
        return 1;
      }
    }
    return 0;
  });

  console.log('Players length:', players.length);
  if (players.length >= 50) {
    return players.slice(0, 50);
  } else {
    return players;
  }
};

const usePlayers = () => {
  const queryTopScorers = useQuery({
    queryKey: ['spain-1-top-scorers'],
    queryFn: getPlayersByGoalsScored,
  });

  return {
    queryTopScorers,
  };
};

export default usePlayers;
