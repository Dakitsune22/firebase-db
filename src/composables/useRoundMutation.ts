import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { Leagues, SeasonRound } from 'src/models';
import useSoccer from './storeWrappers/useSoccer';
import useUI from './storeWrappers/useUI';

const { userId } = useUI();
const { getCurrentLeague } = useSoccer();

const addRound = async (newRound: SeasonRound): Promise<void> => {
  await setDoc(
    doc(
      db,
      `${userId.value}-season-rounds-${getCurrentLeague()}`,
      newRound.round.toString()
    ),
    newRound
  );
};

const playRound = async (playedRound: SeasonRound): Promise<void> => {
  await updateDoc(
    doc(
      db,
      `${userId.value}-season-rounds-${getCurrentLeague()}`,
      playedRound.round.toString()
    ),
    {
      ...playedRound,
    }
  );
};

const deleteMyLeagueRounds = async (numRounds: number): Promise<void> => {
  for (let i = 0; i < numRounds; i++) {
    // const element = queryCountRounds[i];
    const docRef = doc(
      db,
      `${userId.value}-season-rounds-${Leagues.MyLeague}`,
      (i + 1).toString()
    );
    await deleteDoc(docRef);
    // console.log('delete doc', i + 1);
  }
};

const deleteRounds = async (league: Leagues): Promise<void> => {
  for (let i = 0; i < 18; i++) {
    // To Do: Cargar rondas según liga
    // const element = queryCountRounds[i];
    const docRef = doc(
      db,
      `${userId.value}-season-rounds-${league}`,
      (i + 1).toString()
    );
    await deleteDoc(docRef);
    // console.log('delete doc', i + 1);
  }
};

const useRoundsMutation = () => {
  const queryClient = useQueryClient();

  const refreshData = (): void => {
    queryClient.invalidateQueries({
      queryKey: [`season-rounds-${getCurrentLeague()}`],
      exact: true,
    });
    queryClient.refetchQueries({
      queryKey: [`season-rounds-${getCurrentLeague()}`],
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
    mutateRoundsDelete,
  };
};

export default useRoundsMutation;
