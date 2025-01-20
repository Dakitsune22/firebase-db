import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Leagues, Match } from 'src/models';

export const useSoccerStore = defineStore('soccerStore', () => {
  const currentLeague = ref<Leagues>(Leagues.LaLigaPrimeraDivision);
  // const currentRound = ref<number>(1);
  const roundMatches = ref<Match[]>([]);

  // Comprobamos si existe liga actual en local storage.
  // Si no, la creamos poniendo por defecto la liga primera división.
  if (localStorage.getItem('current-league') === null) {
    // currentLeague.value = Leagues.LaLigaPrimeraDivision;
    localStorage.setItem('current-league', currentLeague.value);
  } else {
    // Si existe liga actual en local storage, la recuperamos:
    currentLeague.value = localStorage.getItem('current-league') as Leagues;
  }

  // Comprobamos si existe jornada actual para cada liga en local storage.
  // Si no, la creamos a 1.
  if (
    localStorage.getItem(`current-round-${Leagues.LaLigaPrimeraDivision}`) ===
    null
  ) {
    localStorage.setItem(`current-round-${Leagues.LaLigaPrimeraDivision}`, '1');
  }
  if (localStorage.getItem(`current-round-${Leagues.PremierLeague}`) === null) {
    localStorage.setItem(`current-round-${Leagues.PremierLeague}`, '1');
  }
  if (localStorage.getItem(`current-round-${Leagues.Bundesliga}`) === null) {
    localStorage.setItem(`current-round-${Leagues.Bundesliga}`, '1');
  }

  // Recuperamos de local store la jornada correspondiente a la liga actual:
  const currentRound = ref<number>(
    Number(localStorage.getItem(`current-round-${currentLeague.value}`))
  );

  return {
    // State
    currentLeague,
    currentRound,
    roundMatches,

    // Getters
    getCurrentLeague() {
      return currentLeague.value;
    },
    getCurrentRound() {
      return currentRound.value;
    },

    // Actions
    setCurrentLeague(league: Leagues) {
      currentLeague.value = league;
      localStorage.setItem('current-league', league);
      currentRound.value = Number(
        localStorage.getItem(`current-round-${league}`)
      );
    },
    setCurrentRound(round: number) {
      currentRound.value = round;
      localStorage.setItem(
        `current-round-${currentLeague.value}`,
        round.toString()
      );
    },
  };
});
