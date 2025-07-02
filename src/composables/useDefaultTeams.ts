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

const getTeamsByName = async (league: Leagues): Promise<Team[]> => {
  const q = query(collection(db, `teams-${league}`), orderBy('name', 'asc'));
  const docs = await getDocs(q);
  const teams: Team[] = [];

  docs.forEach((doc) => {
    teams.push(doc.data() as Team);
  });
  // Ordenamos equipos por nombre (asc):
  teams.sort((a, b) => {
    if (a.name && b.name) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
    }
    return 0;
  });
  return teams;
};

const getTeamById = async (league: Leagues, teamId: number): Promise<Team> => {
  const docRef = doc(db, `teams-${league}`, teamId.toString());
  const docSnap = await getDoc(docRef);

  let t: Team;

  if (docSnap.exists()) {
    t = docSnap.data() as Team;
    //console.log(t);
  } else {
    t = {} as Team;
  }
  return t;
};

const useDefaultTeams = (league: Leagues, teamId?: number) => {
  const queryTeams = useQuery({
    queryKey: [`default-teams-${league}`],
    queryFn: () => getTeamsByName(league),
  });

  const queryTeamById = useQuery({
    queryKey: [`default-team-${league}`, teamId],
    queryFn: () => getTeamById(league, teamId!),
  });

  return {
    queryTeams,
    queryTeamById,
  };
};

export default useDefaultTeams;
