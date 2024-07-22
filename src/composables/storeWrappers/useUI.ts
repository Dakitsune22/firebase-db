import { storeToRefs } from 'pinia';
import { useUIStore } from 'src/stores/ui';

const useUI = () => {
  const { userId } = storeToRefs(useUIStore());

  return {
    // State
    userId,

    // Getters

    // Actions
  };
};

export default useUI;
