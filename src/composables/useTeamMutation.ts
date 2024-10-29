import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { doc, setDoc } from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import useTeams from './useTeams';

// let numTeam = 0;

interface teamUpdateData {
  league: string;
  id: number;
  goalsScored: number;
  goalsConceded: number;
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

const updateTeam = async (
  league: string,
  id: number,
  goalsScored: number,
  goalsConceded: number
): Promise<void> => {
  const { queryTeamById } = useTeams(id);

  console.log(queryTeamById.data.value);

  //ToDO: Continuar por aquí. Llamar a la función desde fuera para ver si imprime e implementarla.
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
    mutationFn: ({ league, id, goalsScored, goalsConceded }: teamUpdateData) =>
      updateTeam(league, id, goalsScored, goalsConceded),
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
