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
import useSoccer from './storeWrappers/useSoccer';

const { getCurrentLeague } = useSoccer();

const getTeamsByPoints = async (): Promise<Team[]> => {
  const q = query(
    collection(db, `teams-${getCurrentLeague()}`),
    orderBy('points', 'desc')
    // orderBy('goalDifference', 'desc')
  );
  const docs = await getDocs(q);
  //   const docs = await getDocs(collection(db, 'teams-${getCurrentLeague()}'));
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
  // Ordenamos equipos por puntos (desc), por diferencia de goles (desc) y por goles a favor (desc):
  teams.sort(
    (a, b) =>
      b.points - a.points ||
      b.goalDifference - a.goalDifference ||
      b.goalsScored - a.goalsScored
  );
  return teams;
};

const getTeamById = async (teamId: number): Promise<Team> => {
  const docRef = doc(db, `teams-${getCurrentLeague()}`, teamId.toString());
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
    queryKey: [`teams-${getCurrentLeague()}`],
    queryFn: getTeamsByPoints,
  });

  const queryTeamById = useQuery({
    queryKey: [`teams-${getCurrentLeague()}`, id],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => getTeamById(id!),
  });

  return {
    queryTeams,
    queryTeamById,
  };
};

export default useTeams;
