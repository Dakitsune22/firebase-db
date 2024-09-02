import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSoccerStore = defineStore('soccerStore', () => {
  const currentRound = ref<number>(1);

  return {
    // State
    currentRound,

    // Getters

    // Actions
  };
});
