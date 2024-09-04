import { Team } from 'src/models';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { useQuery } from '@tanstack/vue-query';

const getTeamsByPoints = async (): Promise<Team[]> => {
  const q = query(
    collection(db, 'teams-spain-1'),
    orderBy('points', 'desc')
    // orderBy('goalDifference', 'desc')
  );
  const docs = await getDocs(q);
  //   const docs = await getDocs(collection(db, 'teams-spain-1'));
  const teams: Team[] = [];
  docs.forEach((doc) => {
    teams.push({
      draws: doc.data().draws,
      goalDifference: doc.data().goalDifference,
      goalsConceded: doc.data().goalsConceded,
      goalsScored: doc.data().goalsScored,
      id: doc.data().id,
      losses: doc.data().losses,
      matchesPlayed: doc.data().matchesPlayed,
      name: doc.data().name,
      points: doc.data().points,
      wins: doc.data().wins,
    });
  });
  return teams;
};

const useTeams = () => {
  const queryTeams = useQuery({
    queryKey: ['teams-spain-1'],
    queryFn: getTeamsByPoints,
  });

  return {
    queryTeams,
  };
};

export default useTeams;
