import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUIStore = defineStore('uiStore', () => {
  if (localStorage.getItem('user-id') === null) {
    localStorage.setItem(
      'user-id',
      (Math.random() * 10000000000).toString().substring(0, 10)
    );
  }

  const userId = ref(localStorage.getItem('user-id'));

  return {
    // State
    userId,

    // Getters

    // Actions
  };
});
