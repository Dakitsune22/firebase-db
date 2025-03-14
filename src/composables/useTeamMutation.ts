import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { Leagues, Team } from 'src/models';
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

// let numTeam = 0;

interface teamUpdateData {
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

  // if (team) {
  await setDoc(
    doc(db, `${userId.value}-teams-${league}`, team.id.toString()),
    team
  );
  // } else if (id) {
  //   await setDoc(doc(db, `${userId.value}-teams-${league}`, id.toString()), t!);
  // }
};

const updateTeam = async (t: teamUpdateData): Promise<void> => {
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

const useTeamMutation = () => {
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
    },
  });

  const mutateTeamUpdate = useMutation({
    mutationFn: ({
      league,
      id,
      newGoalsScored,
      newGoalsConceded,
      scorers,
      team,
    }: teamUpdateData) =>
      updateTeam({
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

  return {
    mutateTeamAdd,
    mutateTeamUpdate,
  };
};

export default useTeamMutation;
