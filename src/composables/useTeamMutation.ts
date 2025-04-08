import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { Leagues, Team, Player } from 'src/models';
// import players from 'src/data/players';
import {
  teamsEngland1,
  teamsSpain1,
  teamsGermany1,
  teamsItaly1,
  teamsFrance1,
} from 'src/data/teams';
import useSoccer from './storeWrappers/useSoccer';
import useUI from './storeWrappers/useUI';
import { useQuasar } from 'quasar';

// let numTeam = 0;

interface teamUpdateData {
  league: Leagues;
  id: number;
  team: Team;
}

interface teamUpdateStatsData {
  league: Leagues;
  id: number;
  newGoalsScored: number;
  newGoalsConceded: number;
  scorers: number[];
  team: Team;
}

const { userId } = useUI();
const { getCurrentLeague } = useSoccer();

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

const addTeam = async (league: Leagues, team: Team): Promise<void> => {
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

const updateTeamStats = async (t: teamUpdateStatsData): Promise<void> => {
  // const { queryTeamById } = useTeams(id);

  console.log(t);

  const ut: Team = { ...t.team };
  ut.players = t.team.players.map((p) => ({ ...p }));
  // if (queryTeamById.data.value) {
  //   t = queryTeamById.data.value;
  //   t.goalsScored += goalsScored;
  //   console.log(t);
  // }

  console.log('before update', ut);

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

  console.log('after update', ut);

  await updateDoc(
    doc(db, `${userId.value}-teams-${t.league}`, t.id.toString()),
    {
      ...ut,
    }
  );
};

const updateTeam = async (t: teamUpdateData): Promise<void> => {
  // const { queryTeamById } = useTeams(id);

  console.log(t);

  // const ut: Team = { ...t.team };
  // ut.players = t.team.players.map((p) => ({ ...p }));

  // console.log('before update', ut);

  // console.log('after update', ut);

  await updateDoc(
    doc(db, `${userId.value}-teams-${t.league}`, t.id.toString()),
    {
      ...t.team,
    }
  );
};

const addTeamToMyLeague = async (team: Team): Promise<void> => {
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

const deleteTeamMyLeague = async (teamId: number): Promise<void> => {
  const docRef = doc(db, `${userId.value}-teams-myleague`, teamId.toString());
  await deleteDoc(docRef);
};

const useTeamMutation = () => {
  const $q = useQuasar();
  const queryClient = useQueryClient();

  const refreshData = (): void => {
    queryClient.invalidateQueries({
      queryKey: [`teams-${getCurrentLeague()}`],
      exact: true,
    });
    queryClient.refetchQueries({
      queryKey: [`teams-${getCurrentLeague()}`],
      exact: true,
    });
    queryClient.invalidateQueries({
      queryKey: [`${getCurrentLeague()}-top-scorers`],
      exact: true,
    });
    queryClient.refetchQueries({
      queryKey: [`${getCurrentLeague()}-top-scorers`],
      exact: true,
    });
  };

  const mutateTeamAdd = useMutation({
    mutationFn: ({ league, team }: { league: Leagues; team: Team }) =>
      addTeam(league, team),
    onSuccess: () => {
      refreshData();
      $q.notify({
        type: 'positive',
        message: 'Equipo reiniciado con éxito',
      });
    },
    onError: () => {
      $q.notify({
        type: 'negative',
        message: 'No se ha podido reiniciar el equipo',
      });
    },
  });

  const mutateTeamUpdateStats = useMutation({
    mutationFn: ({
      league,
      id,
      newGoalsScored,
      newGoalsConceded,
      scorers,
      team,
    }: teamUpdateStatsData) =>
      updateTeamStats({
        league,
        id,
        newGoalsScored,
        newGoalsConceded,
        scorers,
        team,
      }),
    onSuccess: () => {
      refreshData();
    },
  });

  const mutateTeamUpdate = useMutation({
    mutationFn: ({ league, id, team }: teamUpdateData) =>
      updateTeam({
        league,
        id,
        team,
      }),
    onSuccess: () => {
      refreshData();
      $q.notify({
        type: 'positive',
        message: 'Equipo actualizado con éxito',
      });
    },
    onError: () => {
      $q.notify({
        type: 'negative',
        message: 'No se ha podido actualizar el equipo',
      });
    },
  });

  const mutateTeamAddMyLeague = useMutation({
    mutationFn: ({ team }: { team: Team }) => addTeamToMyLeague(team),
    onSuccess: () => {
      refreshData();
      $q.notify({
        type: 'positive',
        message: 'Equipo añadido con éxito a MyLeague',
      });
    },
    onError: () => {
      $q.notify({
        type: 'negative',
        message: 'No se ha podido añadir el equipo a MyLeague',
      });
    },
  });

  const mutateTeamDeleteMyLeague = useMutation({
    mutationFn: (teamId: number) => deleteTeamMyLeague(teamId),
    // onSuccess: (fruit) => {
    onSuccess: () => {
      refreshData();
      $q.notify({
        type: 'info',
        message: 'Equipo eliminado de MyLeague',
      });
    },
    onError: () => {
      $q.notify({
        type: 'negative',
        message: 'No se ha podido eliminar el equipo de MyLeague',
      });
    },
    onSettled: () => {
      console.log('Team deleted');
    },
  });

  return {
    mutateTeamAdd,
    mutateTeamUpdate,
    mutateTeamUpdateStats,
    mutateTeamAddMyLeague,
    mutateTeamDeleteMyLeague,
  };
};

export default useTeamMutation;
