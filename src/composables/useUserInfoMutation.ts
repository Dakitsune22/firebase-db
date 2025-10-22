import { useMutation, useQueryClient } from '@tanstack/vue-query';
import {
  addSignInUserInfo,
  addUserInfo,
  updateUserInfo,
} from 'src/dbqueries/user';

const useUserInfoMutation = () => {
  const queryClient = useQueryClient();

  const refreshData = (): void => {
    queryClient.invalidateQueries({
      queryKey: ['users'],
      exact: true,
    });
  };

  const mutateUserInfo = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      console.log('User info updated successfully!');
      refreshData();
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
      refreshData();
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
