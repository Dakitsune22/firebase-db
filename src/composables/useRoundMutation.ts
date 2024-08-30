import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { doc, setDoc } from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { SeasonRound } from 'src/models';

const addRound = async (newRound: SeasonRound): Promise<void> => {
  await setDoc(doc(db, 'season-rounds', newRound.round.toString()), newRound);
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

  return {
    mutateRoundAdd,
  };
};

export default useRoundsMutation;
