import { Leagues, Team, Player } from 'src/models';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  setDoc,
  updateDoc,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import useUI from 'src/composables/storeWrappers/useUI';
// import useSoccer from './storeWrappers/useSoccer';
import { Position } from 'src/models/player';
import { teamUpdateData, teamUpdateStatsData } from 'src/models/team';

const { userId } = useUI();
// const { getCurrentLeague } = useSoccer();

//! GET QUERIES

export const getTeamsByPoints = async (league: Leagues): Promise<Team[]> => {
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

export const getTeamsByName = async (league: Leagues): Promise<Team[]> => {
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

export const getTeamsById = async (league: Leagues): Promise<Team[]> => {
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

export const getTeamById = async (
  league: Leagues,
  teamId: number
): Promise<Team> => {
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

//! SET QUERIES

// let numTeam = 0;

// const addTeam = async (
//   league: Leagues,
//   id?: number,
//   team?: Team
// ): Promise<void> => {
//   //  await setDoc(doc(db, league, name), {
//   console.log({ id });
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
//       if (team) {
//         console.log('*** addTeam: Equipo añadido desde la tabla maestra ***');
//       } else if (id) {
//         t = teamsSpain1[id];
//         console.log(
//           '*** addTeam: Equipo añadido desde los datos por defecto de la app ***'
//         );
//       }
//       break;

//     // case Leagues.PremierLeague:
//     //   t = teamsEngland1[id];
//     //   break;

//     // case Leagues.Bundesliga:
//     //   t = teamsGermany1[id];
//     //   break;

//     // case Leagues.SerieA:
//     //   t = teamsItaly1[id];
//     //   break;

//     // case Leagues.Ligue1:
//     //   t = teamsFrance1[id];
//     //   break;

//     // default:
//     //   t = teamsSpain1[id];
//     //   break;
//   }

//   if (team) {
//     await setDoc(
//       doc(db, `${userId.value}-teams-${league}`, team.id.toString()),
//       team
//     );
//   } else if (id) {
//     await setDoc(doc(db, `${userId.value}-teams-${league}`, id.toString()), t!);
//   }
// };

export const addTeam = async (league: Leagues, team: Team): Promise<void> => {
  //  await setDoc(doc(db, league, name), {
  // console.log({ id });
  // await setDoc(doc(db, league, id.toString()), {
  //   // await setDoc(doc(db, league, (++numTeam).toString()), {
  //   id,
  //   name,
  //   points: 0,
  //   goalsScored: 0,
  //   goalsConceded: 0,
  //   goalDifference: 0,
  //   matchesPlayed: 0,
  //   wins: 0,
  //   draws: 0,
  //   losses: 0,
  //   players: players[id],
  // });
  // let t: Team;

  // switch (league) {
  // case Leagues.LaLigaPrimeraDivision:
  //   if (team) {
  //     console.log('*** addTeam: Equipo añadido desde la tabla maestra ***');
  //   } else if (id) {
  //     t = teamsSpain1[id];
  //     console.log(
  //       '*** addTeam: Equipo añadido desde los datos por defecto de la app ***'
  //     );
  //   }
  //   break;

  // case Leagues.PremierLeague:
  //   t = teamsEngland1[id];
  //   break;

  // case Leagues.Bundesliga:
  //   t = teamsGermany1[id];
  //   break;

  // case Leagues.SerieA:
  //   t = teamsItaly1[id];
  //   break;

  // case Leagues.Ligue1:
  //   t = teamsFrance1[id];
  //   break;

  // default:
  //   t = teamsSpain1[id];
  //   break;
  // }
  const players: Player[] = [];
  team.players.forEach((p) => {
    players.push({
      ...p,
      seasonStats: {
        playedGames: 0,
        playedGamesStart: 0,
        playedGamesSub: 0,
        cleanSheets: 0,
        mvps: 0,
        goalsConceded: 0,
        assists: 0,
        goals: 0,
        injured: 0,
      },
    });
  });

  // if (team) {
  await setDoc(doc(db, `${userId.value}-teams-${league}`, team.id.toString()), {
    ...team,
    points: 0,
    goalsScored: 0,
    goalsConceded: 0,
    goalDifference: 0,
    matchesPlayed: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    players,
  });

  // } else if (id) {
  //   await setDoc(doc(db, `${userId.value}-teams-${league}`, id.toString()), t!);
  // }
};

export const updateTeamStats = async (
  t: teamUpdateStatsData
): Promise<void> => {
  // const { queryTeamById } = useTeams(id);

  // console.log(t);

  const ut: Team = { ...t.team };
  ut.players = t.team.players.map((p) => ({ ...p }));
  // if (queryTeamById.data.value) {
  //   t = queryTeamById.data.value;
  //   t.goalsScored += goalsScored;
  //   console.log(t);
  // }

  // console.log('before update', ut);

  ut.matchesPlayed++;
  ut.goalsScored += t.newGoalsScored;
  ut.goalsConceded += t.newGoalsConceded;
  ut.goalDifference += t.newGoalsScored - t.newGoalsConceded;

  if (t.newGoalsScored > t.newGoalsConceded) {
    ut.wins++;
    ut.points += 3;
  } else if (t.newGoalsScored < t.newGoalsConceded) {
    ut.losses++;
  } else {
    ut.draws++;
    ut.points++;
  }
  // Actualizamos goles de jugador en BD:
  t.scorers.forEach((scorer) => {
    const pIdx = ut.players.findIndex((p) => p.shirtNumber === scorer);
    if (pIdx === -1) return;
    ut.players[pIdx].seasonStats = {
      ...ut.players[pIdx].seasonStats,
      goals: ut.players[pIdx].seasonStats.goals + 1,
    };
  });
  // Actualizamos asistencias de jugador en BD:
  t.assistants.forEach((assistant) => {
    const pIdx = ut.players.findIndex((p) => p.shirtNumber === assistant);
    if (pIdx === -1) return;
    ut.players[pIdx].seasonStats = {
      ...ut.players[pIdx].seasonStats,
      assists: ut.players[pIdx].seasonStats.assists + 1,
    };
  });
  // Actualizamos MVPs de jugador en BD:
  const pIdxMvp = ut.players.findIndex(
    (p) => p.teamId === t.mvp.playerTeamId && p.shirtNumber === t.mvp.playerId
  );
  if (pIdxMvp >= 0) {
    ut.players[pIdxMvp].seasonStats = {
      ...ut.players[pIdxMvp].seasonStats,
      mvps: ut.players[pIdxMvp].seasonStats.mvps + 1,
    };
  }
  // Incrementamos en uno los partidos jugados del jugador en BD (titular):
  // Incrementamos al portero titular los goles encajados:
  // Incrementamos al portero titular los partidos a cero en caso de no haber encajado goles:
  t.startingLineup.forEach((slPlayer) => {
    const pIdx = ut.players.findIndex(
      (p) => p.shirtNumber === slPlayer.shirtNumber
    );
    if (pIdx === -1) return;
    ut.players[pIdx].seasonStats = {
      ...ut.players[pIdx].seasonStats,
      playedGames: ut.players[pIdx].seasonStats.playedGames + 1,
      playedGamesStart: ut.players[pIdx].seasonStats.playedGamesStart + 1,
      goalsConceded:
        ut.players[pIdx].position === Position.POR
          ? ut.players[pIdx].seasonStats.goalsConceded + t.newGoalsConceded
          : ut.players[pIdx].seasonStats.goalsConceded,
      cleanSheets:
        ut.players[pIdx].position === Position.POR && t.newGoalsConceded === 0
          ? ut.players[pIdx].seasonStats.cleanSheets + 1
          : ut.players[pIdx].seasonStats.cleanSheets,
    };
  });

  // Incrementamos en uno los partidos jugados del jugador en BD (suplente):
  t.substitutes.forEach((subPlayer) => {
    const pIdx = ut.players.findIndex(
      (p) => p.shirtNumber === subPlayer.shirtNumber
    );
    if (pIdx === -1) return;
    ut.players[pIdx].seasonStats = {
      ...ut.players[pIdx].seasonStats,
      playedGames: ut.players[pIdx].seasonStats.playedGames + 1,
      playedGamesSub: ut.players[pIdx].seasonStats.playedGamesSub + 1,
    };
  });

  // console.log('after update', ut);

  await updateDoc(
    doc(db, `${userId.value}-teams-${t.league}`, t.id.toString()),
    {
      ...ut,
    }
  );
};

export const updateTeam = async (t: teamUpdateData): Promise<void> => {
  // const { queryTeamById } = useTeams(id);

  // console.log(t);

  // const ut: Team = { ...t.team };
  // console.log('before update', ut);
  // ut.players = t.team.players.map((p) => ({ ...p }));
  // console.log('after update', ut);

  await updateDoc(
    doc(db, `${userId.value}-teams-${t.league}`, t.id.toString()),
    {
      ...t.team,
    }
  );
};

export const addTeamToMyLeague = async (team: Team): Promise<void> => {
  await setDoc(doc(db, `${userId.value}-teams-myleague`, team.id.toString()), {
    ...team,
    points: 0,
    goalsScored: 0,
    goalsConceded: 0,
    goalDifference: 0,
    matchesPlayed: 0,
    wins: 0,
    draws: 0,
    losses: 0,
  });
};

export const addTeamToMyCup = async (team: Team): Promise<void> => {
  await setDoc(doc(db, `${userId.value}-teams-mycup`, team.id.toString()), {
    ...team,
    points: 0,
    goalsScored: 0,
    goalsConceded: 0,
    goalDifference: 0,
    matchesPlayed: 0,
    wins: 0,
    draws: 0,
    losses: 0,
  });
};

export const deleteTeamMyLeague = async (teamId: number): Promise<void> => {
  const docRef = doc(db, `${userId.value}-teams-myleague`, teamId.toString());
  await deleteDoc(docRef);
};

export const deleteTeamMyCup = async (teamId: number): Promise<void> => {
  const docRef = doc(db, `${userId.value}-teams-mycup`, teamId.toString());
  await deleteDoc(docRef);
};
