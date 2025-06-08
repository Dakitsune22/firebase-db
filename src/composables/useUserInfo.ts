import { useQuery } from '@tanstack/vue-query';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { UserInfo } from 'src/models/user-info';

const getUsers = async (): Promise<UserInfo[]> => {
  const q = query(collection(db, 'users'));
  const docs = await getDocs(q);

  const users: UserInfo[] = [];

  docs.forEach((doc) => {
    users.push(doc.data() as UserInfo);
  });

  return users;
};

const useUserInfo = () => {
  const queryUsers = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  return {
    queryUsers,
  };
};

export default useUserInfo;
