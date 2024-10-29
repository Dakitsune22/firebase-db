import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Match } from 'src/models';

export const useSoccerStore = defineStore('soccerStore', () => {
  const currentRound = ref<number>(1);
  const roundMatches = ref<Match[]>([]);

  return {
    // State
    currentRound,
    roundMatches,

    // Getters

    // Actions
  };
});
