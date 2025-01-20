import { storeToRefs } from 'pinia';
import { useSoccerStore } from 'src/stores/soccer';

const useSoccer = () => {
  const { roundMatches } = storeToRefs(useSoccerStore());
  const {
    getCurrentLeague,
    setCurrentLeague,
    getCurrentRound,
    setCurrentRound,
  } = useSoccerStore();

  return {
    // State
    // currentRound,
    roundMatches,

    // Getters
    getCurrentLeague,
    getCurrentRound,

    // Actions
    setCurrentLeague,
    setCurrentRound,
  };
};

export default useSoccer;
