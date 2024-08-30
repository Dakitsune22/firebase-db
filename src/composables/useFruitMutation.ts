import { useMutation, useQueryClient } from '@tanstack/vue-query';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { Fruit } from 'src/models';

const addFruit = async ({
  name = '',
  color = '',
  size = '',
}: Fruit): Promise<void> => {
  const docRef = await addDoc(collection(db, 'fruits'), {
    name,
    color,
    size,
  });
  console.log('Document added with ID:', docRef.id);
};

const updateFruit = async ({
  id,
  name = '',
  color = '',
  size = '',
}: Fruit): Promise<void> => {
  const docRef = doc(db, 'fruits', id);
  await updateDoc(docRef, { name, color, size });
};

const deleteFruit = async (docId: string): Promise<void> => {
  const docRef = doc(db, 'fruits', docId);
  await deleteDoc(docRef);
};

const useFruitMutation = () => {
  const queryClient = useQueryClient();

  const refreshData = (): void => {
    queryClient.invalidateQueries({
      queryKey: ['get-fruits'],
      exact: false,
    });
    queryClient.refetchQueries({
      queryKey: ['get-fruits'],
      exact: false,
    });
  };

  const fruitMutationAdd = useMutation({
    mutationFn: addFruit,
    // onSuccess: (fruit) => {
    onSuccess: () => {
      refreshData();
      //   queryClient.setQueryData(['fruit', 1], fruit);
    },
    onSettled: () => {
      console.log('Fruit added');
    },
  });

  const fruitMutationUpdate = useMutation({
    mutationFn: updateFruit,
    // onSuccess: (fruit) => {
    onSuccess: () => {
      refreshData();
      //   queryClient.setQueryData(['fruit', 1], fruit);
    },
    onSettled: () => {
      console.log('Fruit updated');
    },
  });

  const fruitMutationDelete = useMutation({
    mutationFn: deleteFruit,
    // onSuccess: (fruit) => {
    onSuccess: () => {
      refreshData();
      //   queryClient.setQueryData(['fruit', 1], fruit);
    },
    onSettled: () => {
      console.log('Fruit deleted');
    },
  });

  return {
    fruitMutationAdd,
    fruitMutationUpdate,
    fruitMutationDelete,
  };
};

export default useFruitMutation;
