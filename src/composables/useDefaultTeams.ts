import { Leagues, Team } from 'src/models';
import {
  collection,
  // doc,
  // getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { useQuery } from '@tanstack/vue-query';
import { SeasonId } from 'src/models/leagues';

const getTeamsByName = async (
  league: Leagues,
  seasonId: string
): Promise<Team[]> => {
  const q = query(
    collection(db, `teams-${seasonId}-${league}`),
    orderBy('name', 'asc')
  );
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

// const getTeamById = async (league: Leagues, teamId: number): Promise<Team> => {
//   const docRef = doc(db, `teams-${league}`, teamId.toString());
//   const docSnap = await getDoc(docRef);

//   let t: Team;

//   if (docSnap.exists()) {
//     t = docSnap.data() as Team;
//     //console.log(t);
//   } else {
//     t = {} as Team;
//   }
//   return t;
// };

// const useDefaultTeams = (league: Leagues, teamId?: number) => {
const useDefaultTeams = (league: Leagues) => {
  const queryTeams2526summer = useQuery({
    queryKey: [`default-teams-${SeasonId.Season_2025_2026_Summer}-${league}`],
    queryFn: () => getTeamsByName(league, SeasonId.Season_2025_2026_Summer),
  });
  const queryTeams2526Winter = useQuery({
    queryKey: [`default-teams-${SeasonId.Season_2025_2026_Winter}-${league}`],
    queryFn: () => getTeamsByName(league, SeasonId.Season_2025_2026_Winter),
  });
  const queryTeams2627summer = useQuery({
    queryKey: [`default-teams-${SeasonId.Season_2026_2027_Summer}-${league}`],
    queryFn: () => getTeamsByName(league, SeasonId.Season_2026_2027_Summer),
  });
  const queryTeams2627Winter = useQuery({
    queryKey: [`default-teams-${SeasonId.Season_2026_2027_Winter}-${league}`],
    queryFn: () => getTeamsByName(league, SeasonId.Season_2026_2027_Winter),
  });

  // const queryTeamById = useQuery({
  //   queryKey: [`default-team-${league}`, teamId],
  //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //   queryFn: () => getTeamById(league, teamId!),
  // });

  return {
    // queryTeams,
    // queryTeamById,
    queryTeams2526summer,
    queryTeams2526Winter,
    queryTeams2627summer,
    queryTeams2627Winter,
  };
};

export default useDefaultTeams;
