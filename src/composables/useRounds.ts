import { SeasonRound } from 'src/models';
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
} from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { useQuery } from '@tanstack/vue-query';
import useSoccer from './storeWrappers/useSoccer';

const { roundMatches, getCurrentRound } = useSoccer();

//const getRound = async (roundNumber: number): Promise<SeasonRound> => {
const getRound = async (): Promise<SeasonRound> => {
  // console.log('current round:', currentRound.value.toString());
  const docRef = doc(db, 'season-rounds', getCurrentRound().toString());
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    roundMatches.value = docSnap.data().matches;
    // console.log('returned round:', docSnap.data());
    return {
      round: docSnap.data().round,
      matches: docSnap.data().matches,
    };
  } else {
    return { round: 0, matches: [] };
  }
};

const countTotalRounds = async (): Promise<number> => {
  const docs = await getCountFromServer(collection(db, 'season-rounds'));
  return docs.data().count;
};

const useRounds = () => {
  const queryRound = useQuery({
    queryKey: ['current-round'],
    queryFn: getRound,
  });

  const queryCountRounds = useQuery({
    queryKey: ['count-rounds'],
    queryFn: countTotalRounds,
  });

  return {
    queryRound,
    queryCountRounds,
  };
};

export default useRounds;
