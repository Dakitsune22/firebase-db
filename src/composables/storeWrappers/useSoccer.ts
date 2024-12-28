import { storeToRefs } from 'pinia';
import { useSoccerStore } from 'src/stores/soccer';

const useSoccer = () => {
  const { roundMatches } = storeToRefs(useSoccerStore());
  const { getCurrentRound, setCurrentRound } = useSoccerStore();

  return {
    // State
    // currentRound,
    roundMatches,

    // Getters
    getCurrentRound,

    // Actions
    setCurrentRound,
  };
};

export default useSoccer;
