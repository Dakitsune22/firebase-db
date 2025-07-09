import { SeasonRound } from 'src/models';
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
} from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { useQuery } from '@tanstack/vue-query';
import useSoccer from './storeWrappers/useSoccer';
import useUI from './storeWrappers/useUI';

const { userId } = useUI();
const { roundMatches, getCurrentRound, getCurrentLeague } = useSoccer();

//const getRound = async (roundNumber: number): Promise<SeasonRound> => {
const getRound = async (): Promise<SeasonRound> => {
  // console.log('current round:', currentRound.value.toString());
  const docRef = doc(
    db,
    `${userId.value}-season-rounds-${getCurrentLeague()}`,
    getCurrentRound().toString()
  );
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

// Función creada para obtener el número de rondas de forma alternativa a getCountFromServer.
// A veces esa forma falla, por límite de peticiones, en tal caso llamaremos a esta.
const getTotalRounds = async (): Promise<number> => {
  const q = query(
    collection(db, `${userId.value}-season-rounds-${getCurrentLeague()}`)
  );
  const docs = await getDocs(q);
  const rounds: SeasonRound[] = [];

  docs.forEach((doc) => {
    rounds.push(doc.data() as SeasonRound);
  });

  return rounds.length;
};

const countTotalRounds = async (): Promise<number> => {
  const docs = await getCountFromServer(
    collection(db, `${userId.value}-season-rounds-${getCurrentLeague()}`)
  );
  if (docs.data().count <= 0) {
    console.error('Error recuperando el contador de jornadas.');
    console.log('Obtenemos de forma alternativa el número de jornadas.');
    const tRounds = await getTotalRounds();
    console.log('Número de jornadas:', tRounds);
    // Por si a caso el await no funciona:
    // if (tRounds < 10) {
    //   sleep(500);
    // }
    return tRounds;
  }
  console.log('Contador de jornadas recuperado con éxito.');
  console.log('Contador de jornadas:', docs.data().count);
  return docs.data().count;
};

const useRounds = () => {
  const queryRound = useQuery({
    queryKey: [`current-round-${getCurrentLeague()}`],
    queryFn: getRound,
  });

  // const queryTotalRounds = useQuery({
  //   queryKey: [`total-rounds-${getCurrentLeague()}`],
  //   queryFn: getTotalRounds,
  // });

  const queryCountRounds = useQuery({
    queryKey: [`count-rounds-${getCurrentLeague()}`],
    queryFn: countTotalRounds,
  });

  return {
    queryRound,
    // queryTotalRounds,
    queryCountRounds,
  };
};

export default useRounds;
