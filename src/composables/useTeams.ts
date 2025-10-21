import { Leagues, Team } from 'src/models';
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
// import useSoccer from './storeWrappers/useSoccer';
import useUI from './storeWrappers/useUI';

const { userId } = useUI();
// const { getCurrentLeague } = useSoccer();

const getTeamsByPoints = async (league: Leagues): Promise<Team[]> => {
  const q = query(
    collection(db, `${userId.value}-teams-${league}`),
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

const getTeamsByName = async (league: Leagues): Promise<Team[]> => {
  const q = query(
    collection(db, `${userId.value}-teams-${league}`),
    orderBy('name', 'asc')
  );
  const docs = await getDocs(q);
  const teams: Team[] = [];

  docs.forEach((doc) => {
    teams.push(doc.data() as Team);
  });
  // Ordenamos equipos por nombre (asc):
  // teams.sort((a, b) => {
  //   if (a.name && b.name) {
  //     if (a.name > b.name) {
  //       return 1;
  //     }
  //     if (a.name < b.name) {
  //       return -1;
  //     }
  //   }
  //   return 0;
  // });
  return teams;
};

const getTeamsById = async (league: Leagues): Promise<Team[]> => {
  const q = query(
    collection(db, `${userId.value}-teams-${league}`),
    orderBy('id', 'asc')
  );
  const docs = await getDocs(q);
  const teams: Team[] = [];

  docs.forEach((doc) => {
    teams.push(doc.data() as Team);
  });
  return teams;
};

const getTeamById = async (league: Leagues, teamId: number): Promise<Team> => {
  const docRef = doc(db, `${userId.value}-teams-${league}`, teamId.toString());
  const docSnap = await getDoc(docRef);

  let t: Team;

  if (docSnap.exists()) {
    t = docSnap.data() as Team;
    // console.log(t);
    // t= {
    //   draws: docSnap.data().draws,
    //   goalDifference: docSnap.data().goalDifference
    // };
  } else {
    t = {} as Team;
  }
  return t;
};

const useTeams = (league: Leagues, id?: number) => {
  const queryTeamsByPoints = useQuery({
    queryKey: [`teams-by-points-${league}`],
    queryFn: () => getTeamsByPoints(league),
  });

  const queryTeamsByName = useQuery({
    queryKey: [`teams-by-name-${league}`],
    queryFn: () => getTeamsByName(league),
  });

  const queryTeamsById = useQuery({
    queryKey: [`teams-by-id-${league}`],
    queryFn: () => getTeamsById(league),
  });

  const queryTeamById = useQuery({
    queryKey: [`team-${league}`, id],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => getTeamById(league, id!),
  });

  return {
    queryTeamsByPoints,
    queryTeamsByName,
    queryTeamsById,
    queryTeamById,
  };
};

export default useTeams;
