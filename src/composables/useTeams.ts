import { Team } from 'src/models';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
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
    // teams.push({
    //   draws: doc.data().draws,
    //   goalDifference: doc.data().goalDifference,
    //   goalsConceded: doc.data().goalsConceded,
    //   goalsScored: doc.data().goalsScored,
    //   id: doc.data().id,
    //   losses: doc.data().losses,
    //   matchesPlayed: doc.data().matchesPlayed,
    //   name: doc.data().name,
    //   points: doc.data().points,
    //   wins: doc.data().wins,
    // });
    teams.push(doc.data() as Team);
  });
  return teams;
};

const getTeamById = async (teamId: number): Promise<Team> => {
  const docRef = doc(db, 'teams-spain-1', teamId.toString());
  const docSnap = await getDoc(docRef);

  let t: Team;

  if (docSnap.exists()) {
    t = docSnap.data() as Team;
    console.log(t);
    // t= {
    //   draws: docSnap.data().draws,
    //   goalDifference: docSnap.data().goalDifference
    // };
  } else {
    t = {} as Team;
  }
  return t;
};

const useTeams = (id?: number) => {
  const queryTeams = useQuery({
    queryKey: ['teams-spain-1'],
    queryFn: getTeamsByPoints,
  });

  const queryTeamById = useQuery({
    queryKey: ['teams-spain-1', id],
    queryFn: () => getTeamById(id!),
  });

  return {
    queryTeams,
    queryTeamById,
  };
};

export default useTeams;
