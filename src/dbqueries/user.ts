import {
  collection,
  getDocs,
  query,
  updateDoc,
  doc,
  setDoc,
} from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import useUI from 'src/composables/storeWrappers/useUI';
// import { UserInfo } from 'src/models/user-info';
import { type UserInfo } from 'src/models/user-info';

const { userId } = useUI();

//! GET QUERIES

export const getUsers = async (): Promise<UserInfo[]> => {
  const q = query(collection(db, 'users'));
  const docs = await getDocs(q);

  const users: UserInfo[] = [];

  docs.forEach((doc) => {
    users.push(doc.data() as UserInfo);
  });

  return users;
};

//! SET QUERIES

export const addSignInUserInfo = async (password: string): Promise<void> => {
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

export const addUserInfo = async (): Promise<void> => {
  const userInfo: UserInfo = {
    id: userId.value ? userId.value : '0000000000',
    lastLogged: new Date().getTime().toString(),
  };
  await setDoc(doc(db, 'users', `${userId.value}-user-info`), {
    ...userInfo,
  });
};

export const updateUserInfo = async (): Promise<void> => {
  const userInfo: UserInfo = {
    id: userId.value ? userId.value : '0000000000',
    lastLogged: new Date().toJSON(),
  };
  await updateDoc(doc(db, 'users', `${userId.value}-user-info`), {
    ...userInfo,
  });
};
