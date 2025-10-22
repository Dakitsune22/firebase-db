import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Leagues } from 'src/models';
import useSoccer from './storeWrappers/useSoccer';
import {
  addRound,
  deleteMyCupRounds,
  deleteMyLeagueRounds,
  deleteRounds,
  playRound,
} from 'src/dbqueries/rounds';

const { getCurrentLeague } = useSoccer();

const useRoundsMutation = () => {
  const queryClient = useQueryClient();

  const refreshData = (): void => {
    // queryClient.invalidateQueries({
    //   // queryKey: [`season-rounds-${getCurrentLeague()}`],
    //   queryKey: ['rounds'],
    //   exact: false,
    // });
    // queryClient.refetchQueries({
    //   queryKey: [`season-rounds-${getCurrentLeague()}`],
    //   exact: true,
    // });

    // ! Por algún motivo no funciona el invalidate con 'rounds' y exact false
    // ! para que invalide todas las queries que empiecen por 'rounds'...

    queryClient.invalidateQueries({
      queryKey: [`rounds-current-${getCurrentLeague()}`],
      exact: true,
    });
    queryClient.invalidateQueries({
      queryKey: [`rounds-total-${getCurrentLeague()}`],
      exact: true,
    });
    queryClient.invalidateQueries({
      queryKey: [`rounds-count-${getCurrentLeague()}`],
      exact: true,
    });
  };

  const mutateRoundAdd = useMutation({
    mutationFn: addRound,
    onSuccess: () => {
      refreshData();
    },
  });

  const mutateRoundPlay = useMutation({
    mutationFn: playRound,
    onSuccess: () => {
      refreshData();
    },
  });

  const mutateMyLeagueRoundsDelete = useMutation({
    mutationFn: (numRounds: number) => deleteMyLeagueRounds(numRounds),
    onSuccess: () => {
      refreshData();
    },
  });

  const mutateMyCupRoundsDelete = useMutation({
    mutationFn: (numRounds: number) => deleteMyCupRounds(numRounds),
    onSuccess: () => {
      refreshData();
    },
  });

  const mutateRoundsDelete = useMutation({
    mutationFn: (league: Leagues) => deleteRounds(league),
    onSuccess: () => {
      refreshData();
    },
  });

  return {
    mutateRoundAdd,
    mutateRoundPlay,
    mutateMyLeagueRoundsDelete,
    mutateMyCupRoundsDelete,
    mutateRoundsDelete,
  };
};

export default useRoundsMutation;
