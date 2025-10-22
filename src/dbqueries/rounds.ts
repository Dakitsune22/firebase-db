import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  deleteDoc,
  setDoc,
  updateDoc,
  query,
} from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import useUI from 'src/composables/storeWrappers/useUI';
import useSoccer from 'src/composables/storeWrappers/useSoccer';
import { Leagues, SeasonRound } from 'src/models';

const { userId } = useUI();
const { roundMatches, getCurrentRound, getCurrentLeague } = useSoccer();

//! GET QUERIES

//const getRound = async (roundNumber: number): Promise<SeasonRound> => {
export const getRound = async (): Promise<SeasonRound> => {
  // console.log('current round:', getCurrentRound().toString());
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
    // } else if (
    //   (getCurrentLeague() === Leagues.MyLeague ||
    //     getCurrentLeague() === Leagues.MyCup) &&
    //   getCurrentRound() > 1
    // ) {
    //   console.error(
    //     `${getCurrentLeague().toUpperCase()} round ${getCurrentRound()} does not exist.`
    //   );
    //   console.log("Let's check if first round does.");
    //   setCurrentRound(1);
    //   const cupFirstRound = await getRound();
    //   return cupFirstRound;
    // }
  } else {
    console.error('GetRound failed to get data');
    return { round: 0, matches: [] };
  }
};

// Función creada para obtener el número de rondas de forma alternativa a getCountFromServer.
// A veces esa forma falla, por límite de peticiones, en tal caso llamaremos a esta.
export const getTotalRounds = async (): Promise<number> => {
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

export const countTotalRounds = async (): Promise<number> => {
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

//! SET QUERIES

export const addRound = async (newRound: SeasonRound): Promise<void> => {
  await setDoc(
    doc(
      db,
      `${userId.value}-season-rounds-${getCurrentLeague()}`,
      newRound.round.toString()
    ),
    newRound
  );
};

export const playRound = async (playedRound: SeasonRound): Promise<void> => {
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

export const deleteMyLeagueRounds = async (
  numRounds: number
): Promise<void> => {
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

export const deleteMyCupRounds = async (numRounds: number): Promise<void> => {
  for (let i = 0; i < numRounds; i++) {
    // const element = queryCountRounds[i];
    const docRef = doc(
      db,
      `${userId.value}-season-rounds-${Leagues.MyCup}`,
      (i + 1).toString()
    );
    await deleteDoc(docRef);
    // console.log('delete doc', i + 1);
  }
};

export const deleteRounds = async (league: Leagues): Promise<void> => {
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
