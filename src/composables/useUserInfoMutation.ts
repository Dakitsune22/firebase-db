import { useMutation } from '@tanstack/vue-query';
import { type UserInfo } from 'src/models/user-info';
import useUI from './storeWrappers/useUI';
import { updateDoc, doc, setDoc } from 'firebase/firestore';
import { db } from 'src/boot/firebase';

const { userId } = useUI();

const addSignInUserInfo = async (password: string): Promise<void> => {
  const userInfo: UserInfo = {
    id: userId.value ? userId.value : '0000000000',
    lastLogged: new Date().getTime().toString(),
    password,
    admin: false,
  };
  await setDoc(doc(db, 'users', `${userId.value}-user-info`), {
    ...userInfo,
  });
};

const addUserInfo = async (): Promise<void> => {
  const userInfo: UserInfo = {
    id: userId.value ? userId.value : '0000000000',
    lastLogged: new Date().getTime().toString(),
  };
  await setDoc(doc(db, 'users', `${userId.value}-user-info`), {
    ...userInfo,
  });
};

const updateUserInfo = async (): Promise<void> => {
  const userInfo: UserInfo = {
    id: userId.value ? userId.value : '0000000000',
    lastLogged: new Date().toJSON(),
  };
  await updateDoc(doc(db, 'users', `${userId.value}-user-info`), {
    ...userInfo,
  });
};

const useUserInfoMutation = () => {
  //   const queryClient = useQueryClient();

  const mutateUserInfo = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      console.log('User info updated successfully!');
    },
    onError: (error) => {
      console.error(error);
      addUserInfo();
    },
  });

  const mutateUserInfoSignIn = useMutation({
    mutationFn: (password: string) => addSignInUserInfo(password),
    onSuccess: () => {
      console.log('User signed in successfully!');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    mutateUserInfo,
    mutateUserInfoSignIn,
  };
};

export default useUserInfoMutation;
