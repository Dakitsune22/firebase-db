import { useQuery } from '@tanstack/vue-query';
import { getUsers } from 'src/dbqueries/user';

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
