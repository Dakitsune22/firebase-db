import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { SeasonRound } from 'src/models';

const addRound = async (newRound: SeasonRound): Promise<void> => {
  await setDoc(doc(db, 'season-rounds', newRound.round.toString()), newRound);
};

const playRound = async (playedRound: SeasonRound): Promise<void> => {
  await updateDoc(doc(db, 'season-rounds', playedRound.round.toString()), {
    ...playedRound,
  });
};

const useRoundsMutation = () => {
  const queryClient = useQueryClient();

  const refreshData = (): void => {
    queryClient.invalidateQueries({
      queryKey: ['season-rounds'],
      exact: true,
    });
    // queryClient.refetchQueries({
    //   queryKey: ['season-rounds'],
    //   exact: true,
    // });
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

  return {
    mutateRoundAdd,
    mutateRoundPlay,
  };
};

export default useRoundsMutation;
