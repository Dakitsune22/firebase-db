import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUIStore = defineStore('uiStore', () => {
  if (localStorage.getItem('user-id') === null) {
    localStorage.setItem(
      'user-id',
      'Invitado-' + (Math.random() * 10000000000).toString().substring(0, 10)
    );
  }

  const userId = ref(localStorage.getItem('user-id'));

  const setUserId = (newUserId: string): void => {
    userId.value = newUserId;
    localStorage.setItem('user-id', newUserId);
  };

  return {
    // State
    userId,

    // Getters

    // Actions
    setUserId,
  };
});
