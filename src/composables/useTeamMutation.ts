import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { doc, setDoc } from 'firebase/firestore';
import { db } from 'src/boot/firebase';

let numTeam = 0;

const addTeam = async (league: string, name: string): Promise<void> => {
  //  await setDoc(doc(db, league, name), {
  await setDoc(doc(db, league, (++numTeam).toString()), {
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
    mutationFn: ({ league, name }: { league: string; name: string }) =>
      addTeam(league, name),
    onSuccess: () => {
      refreshData();
    },
  });

  return {
    mutateTeamAdd,
  };
};

export default useTeamMutation;
