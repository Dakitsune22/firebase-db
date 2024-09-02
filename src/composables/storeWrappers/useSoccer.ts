import { storeToRefs } from 'pinia';
import { useSoccerStore } from 'src/stores/soccer';

const useSoccer = () => {
  const { currentRound } = storeToRefs(useSoccerStore());

  return {
    // State
    currentRound,

    // Getters

    // Actions
  };
};

export default useSoccer;
