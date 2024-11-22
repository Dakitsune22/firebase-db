import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { Team } from 'src/models';

// let numTeam = 0;

interface teamUpdateData {
  league: string;
  id: number;
  newGoalsScored: number;
  newGoalsConceded: number;
  team: Team;
}

const addTeam = async (
  league: string,
  id: number,
  name: string
): Promise<void> => {
  //  await setDoc(doc(db, league, name), {
  console.log({ id });
  await setDoc(doc(db, league, id.toString()), {
    // await setDoc(doc(db, league, (++numTeam).toString()), {
    id,
    name,
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

const updateTeam = async (t: teamUpdateData): Promise<void> => {
  // const { queryTeamById } = useTeams(id);

  console.log(t);

  //ToDO: Continuar por aquí. Hacer el update de los datos del equipo (t.team) a partir de los goles marcados y encajados.

  const ut: Team = { ...t.team };
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

  console.log('after update', ut);

  await updateDoc(doc(db, t.league, t.id.toString()), {
    ...ut,
  });
};

const useTeamMutation = () => {
  const queryClient = useQueryClient();

  const refreshData = (): void => {
    queryClient.invalidateQueries({
      queryKey: ['teams-spain-1'],
      exact: true,
    });
    queryClient.refetchQueries({
      queryKey: ['teams-spain-1'],
      exact: true,
    });
  };

  const mutateTeamAdd = useMutation({
    mutationFn: ({
      league,
      id,
      name,
    }: {
      league: string;
      id: number;
      name: string;
    }) => addTeam(league, id, name),
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
      team,
    }: teamUpdateData) =>
      updateTeam({ league, id, newGoalsScored, newGoalsConceded, team }),
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
