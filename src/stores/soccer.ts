import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Match } from 'src/models';

export const useSoccerStore = defineStore('soccerStore', () => {
  const currentRound = ref<number>(1);
  const roundMatches = ref<Match[]>([]);

  if (localStorage.getItem('current-round') === null) {
    currentRound.value = 1;
    localStorage.setItem('current-round', currentRound.value.toString());
  } else {
    currentRound.value = Number(localStorage.getItem('current-round'));
  }

  return {
    // State
    // currentRound,
    roundMatches,

    // Getters
    getCurrentRound() {
      return currentRound.value;
    },

    // Actions
    setCurrentRound(round: number) {
      currentRound.value = round;
      localStorage.setItem('current-round', round.toString());
    },
  };
});
