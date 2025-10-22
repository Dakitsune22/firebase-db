import { Leagues, Team } from 'src/models';
import {
  collection,
  doc,
  // getDoc,
  getDocs,
  setDoc,
  // updateDoc,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { SeasonId } from 'src/models/leagues';

//! GET QUERIES

export const getTeamsByName = async (
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

// export const getTeamById = async (league: Leagues, teamId: number): Promise<Team> => {
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

//! SET QUERIES

// interface teamUpdateData {
//   league: Leagues;
//   id: number;
//   team: Team;
// }

// export const addTeam = async (league: Leagues, id: number): Promise<void> => {
//   //  await setDoc(doc(db, league, name), {
//   // console.log({ id });
//   // await setDoc(doc(db, league, id.toString()), {
//   //   // await setDoc(doc(db, league, (++numTeam).toString()), {
//   //   id,
//   //   name,
//   //   points: 0,
//   //   goalsScored: 0,
//   //   goalsConceded: 0,
//   //   goalDifference: 0,
//   //   matchesPlayed: 0,
//   //   wins: 0,
//   //   draws: 0,
//   //   losses: 0,
//   //   players: players[id],
//   // });
//   let t: Team;

//   switch (league) {
//     case Leagues.LaLigaPrimeraDivision:
//       t = teamsSpain1[id];
//       break;

//     case Leagues.PremierLeague:
//       t = teamsEngland1[id];
//       break;

//     case Leagues.Bundesliga:
//       t = teamsGermany1[id];
//       break;

//     case Leagues.SerieA:
//       t = teamsItaly1[id];
//       break;

//     case Leagues.Ligue1:
//       t = teamsFrance1[id];
//       break;

//     default:
//       t = teamsSpain1[id];
//       break;
//   }

//   await setDoc(doc(db, `teams-${league}`, id.toString()), t);
// };

export const addTeam = async (
  league: Leagues,
  team: Team,
  seasonId: SeasonId
): Promise<void> => {
  await setDoc(
    doc(db, `teams-${seasonId}-${league}`, team.id.toString()),
    team
  );
};

// export const updateTeam = async (t: teamUpdateData): Promise<void> => {
//   // const { queryTeamById } = useTeams(id);

//   console.log(t);

//   // const ut: Team = { ...t.team };
//   // ut.players = t.team.players.map((p) => ({ ...p }));

//   // console.log('before update', ut);

//   // console.log('after update', ut);

//   await updateDoc(doc(db, `teams-${t.league}`, t.id.toString()), {
//     ...t.team,
//   });
// };

// export const addTeamToMyLeague = async (team: Team): Promise<void> => {
//   await setDoc(doc(db, 'teams-myleague', team.id.toString()), team);
// };
