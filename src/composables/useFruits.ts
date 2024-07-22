import { useQuery } from '@tanstack/vue-query';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { Fruit } from 'src/models/fruit';

const getFruitById = async (fruitId: string): Promise<Fruit> => {
  const docRef = doc(db, 'fruits', fruitId);
  const docSnap = await getDoc(docRef);

  let f: Fruit;

  if (docSnap.exists()) {
    f = {
      id: docSnap.id,
      name: docSnap.data().name,
      color: docSnap.data().color,
      size: docSnap.data().size,
    };
  } else {
    f = { id: fruitId, name: '', color: '', size: '' };
  }
  return f;
};

const getFruits = async (): Promise<Fruit[]> => {
  const docs = await getDocs(collection(db, 'fruits'));
  const fruits: Fruit[] = [];
  docs.forEach((doc) => {
    fruits.push({
      id: doc.id,
      name: doc.data().name,
      color: doc.data().color,
      size: doc.data().size,
    });
  });
  // Ordenar ascendentemente:
  fruits.sort((a, b) => {
    if (a.name && b.name) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
    }
    return 0;
  });
  return fruits;
};

const useFruits = () => {
  const fruitQuery = useQuery({
    queryKey: ['get-fruit', 'DP0cES6b8yjA98QpzjsA'],
    queryFn: () => getFruitById('DP0cES6b8yjA98QpzjsA'),
  });

  const fruitsQuery = useQuery({
    queryKey: ['get-fruits'],
    queryFn: getFruits,
    refetchInterval: 10000,
  });

  return {
    fruitQuery,
    fruitsQuery,
  };
};

export default useFruits;
