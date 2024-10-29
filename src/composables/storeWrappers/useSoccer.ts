import { storeToRefs } from 'pinia';
import { useSoccerStore } from 'src/stores/soccer';

const useSoccer = () => {
  const { currentRound, roundMatches } = storeToRefs(useSoccerStore());

  return {
    // State
    currentRound,
    roundMatches,

    // Getters

    // Actions
  };
};

export default useSoccer;
