import { storeToRefs } from 'pinia';
import { useUIStore } from 'src/stores/ui';

const useUI = () => {
  const { userId } = storeToRefs(useUIStore());
  const { setUserId } = useUIStore();

  return {
    // State
    userId,

    // Getters

    // Actions
    setUserId,
  };
};

export default useUI;
