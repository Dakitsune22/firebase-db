<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { Leagues, SeasonRound } from 'src/models';
import useRoundsMutation from 'src/composables/useRoundMutation';
import useTeamMutation from 'src/composables/useTeamMutation';
import useTeams from 'src/composables/useTeams';
//import useDefaultTeams from 'src/composables/useDefaultTeams';
import usePlayers from 'src/composables/usePlayers';
import useRounds from 'src/composables/useRounds';
import useSoccer from 'src/composables/storeWrappers/useSoccer';
import SoccerMatch from 'src/components/SoccerMatch.vue';
import SoccerTeamSimple from 'src/components/SoccerTeamSimple.vue';
import SoccerPlayerScorer from 'src/components/SoccerPlayerScorer.vue';
import useUserInfoMutation from 'src/composables/useUserInfoMutation';
import { sleep } from 'src/helpers/functions';

defineOptions({
  name: 'SoccerPageMyCup',
});

const $q = useQuasar();

const { setCurrentLeague, getCurrentLeague, getCurrentRound, setCurrentRound } =
  useSoccer();

setCurrentLeague(Leagues.MyCup);

const { mutateRoundAdd, mutateMyCupRoundsDelete } = useRoundsMutation();
const { mutateTeamAdd } = useTeamMutation();
const { queryTeamsById: queryCupTeams } = useTeams(getCurrentLeague());
// const { queryTeams: queryTeamsMasterDB } = useDefaultTeams(getCurrentLeague());
// const { queryTeamById } = useTeams(2);
const { queryTopScorers } = usePlayers();
const { queryRound, queryTotalRounds } = useRounds();

const roundKey = ref<number>(0);
// const leagueKey = ref<number>(0);
const showTeams = ref<boolean>(true);
const isLottery = ref<boolean>(true);
const isLoadingNextCupRound = ref<boolean>(false);

const forceRender = (): void => {
  // leagueKey.value++;
  roundKey.value++;
};

const { mutateUserInfo } = useUserInfoMutation();
mutateUserInfo.mutate();

onBeforeUnmount(async () => {
  // Refrescamos query antes de desmontar, para que esté actualizada a la vuelta:
  await queryRound.refetch();
});

onMounted(async () => {
  await sleep(500);
  console.log('*** TOTAL ROUNDS (computed):', totalRounds.value);
  console.log(queryRound.data.value);
  if (queryRound.data.value?.round === 0) {
    onFirstRound();
  }
});

const totalRounds = computed(() => {
  if (queryCupTeams.data.value) {
    // Jornadas totales depende de los equipos participantes en copa:
    // return (queryCupTeams.data.value.length - 1) * 2;
    switch (queryCupTeams.data.value.length) {
      case 2:
        return 1; // 1 ronda: Final

      case 4:
        return 2; // 2 rondas: Semis y Final

      case 8:
        return 3; // 3 rondas: Cuartos, Semis y Final

      case 16:
        return 4; // 4 rondas: Octavos, Cuartos, Semis y Final

      case 32:
        return 5; // 5 rondas: Dieciseisavos, Octavos, Cuartos, Semis y Final

      case 64:
        return 6; // 6 rondas: Treintaidoseavos, Dieciseisavos, Octavos, Cuartos, Semis y Final

      default:
        break;
    }
  }
  return 0;
});

const isCupRoundFinished = computed(() => {
  if (!queryRound.data.value) {
    console.log('isCupRoundFinished --> queryRound.data.value = UNDEFINED');
    return false;
  }
  console.log(
    'isCupRoundFinished --> ¿Se han jugado todos los partidos?',
    queryRound.data.value?.matches.findIndex((m) => m.played === false) < 0
  );
  return (
    queryRound.data.value?.matches.findIndex((m) => m.played === false) < 0
  );
});

const isCupRoundCompleted = computed(() => {
  if (!queryRound.data.value) {
    console.log('isCupRoundCompleted --> queryRound.data.value = UNDEFINED');
    return false;
  }
  console.log(
    'isCupRoundCompleted --> ¿Se han jugado todos los partidos?',
    queryRound.data.value?.matches.findIndex((m) => m.played === false) < 0
  );
  return (
    queryRound.data.value?.matches.findIndex((m) => m.played === false) < 0
  );
});

const isCupRoundStarted = computed(() => {
  if (!queryRound.data.value) {
    console.log('isCupRoundStarted --> queryRound.data.value = UNDEFINED');
    return false;
  }
  console.log(
    'isCupRoundStarted --> ¿Se ha jugado algún partido de la ronda?',
    queryRound.data.value?.matches.findIndex((m) => m.played === true) >= 0
  );
  return (
    queryRound.data.value?.matches.findIndex((m) => m.played === true) >= 0
  );
});

const isPlayingAllMatches = ref<boolean>(false);

const lottery = (): number[] => {
  let indexList: number[] = [];

  // Generamos lista de índices:
  queryCupTeams.data.value?.forEach((t) => {
    indexList.push(t.id);
  });
  // Si está desmarcado el checkbox de sortear, devolvemos la lista en el orden original:
  if (!isLottery.value) {
    return indexList;
  }
  // Si está marcado el checkbox de sortear, devolvemos la lista barajada:
  return indexList.sort(() => Math.random() - 0.5); // shuffle

  // console.log(indexList);
};

const getRoundWinnerIds = (): number[] => {
  if (!queryRound.data.value) return [0];
  let indexList: number[] = [];

  for (let i = 0; i < queryRound.data.value?.matches.length - 1; i += 2) {
    let goalsT1 =
      queryRound.data.value?.matches[i].score1 +
      queryRound.data.value?.matches[i + 1].score2;
    let goalsT2 =
      queryRound.data.value?.matches[i].score2 +
      queryRound.data.value?.matches[i + 1].score1;

    // Si los equipos han empatado en la ida y en la vuelta, echamos a suerte el clasificado:
    if (goalsT1 === goalsT2) {
      let message = '';
      let dice = Math.floor(Math.random() * 2);
      console.log('Eliminatoria empatada. Clasificado (0 o 1):', { dice }); // 0 o 1
      // dice === 0 ? goalsT1++ : goalsT2++;
      // Informamos del clasificado, y de si ha sido por prórroga o penalties:
      // const extraTime = Math.floor(Math.random() * 2) === 0; // 0 = prórroga, 1 = penalties
      // console.log('¿Prórroga (0) o penaltis (1)?:', { extraTime }); // 0 o 1
      if (dice === 0) {
        goalsT1++;
        message = `<span><strong>${
          // queryRound.data.value?.matches[i].team1
          queryCupTeams.data.value?.find(
            (t) => t.id === queryRound.data.value?.matches[i].team1
          )?.name
        }</strong> ha eliminado a <strong>${
          // queryRound.data.value?.matches[i].team2
          queryCupTeams.data.value?.find(
            (t) => t.id === queryRound.data.value?.matches[i].team2
          )?.name
        }</strong> en los penaltis</span>.`;
        // }</strong> en ${extraTime ? 'la prórroga' : 'los penaltis'}</span>.`;
      } else {
        goalsT2++;
        message = `<span><strong>${
          // queryRound.data.value?.matches[i].team2
          queryCupTeams.data.value?.find(
            (t) => t.id === queryRound.data.value?.matches[i].team2
          )?.name
        }</strong> ha eliminado a <strong>${
          // queryRound.data.value?.matches[i].team1
          queryCupTeams.data.value?.find(
            (t) => t.id === queryRound.data.value?.matches[i].team1
          )?.name
        }</strong> en los penaltis</span>.`;
        // }</strong> en ${extraTime ? 'la prórroga' : 'los penaltis'}</span>.`;
      }
      $q.notify({
        type: 'info',
        // icon: 'announcement',
        // icon: 'info',
        // color: 'primary',
        // textColor: 'white',
        html: true,
        message,
        progress: true,
        timeout: 10000,
      });
    }
    if (goalsT1 > goalsT2) {
      indexList.push(queryRound.data.value?.matches[i].team1);
    } else {
      indexList.push(queryRound.data.value?.matches[i].team2);
    }
  }
  // console.log(indexList);
  // console.log(indexList.sort(() => Math.random() - 0.5));

  // Si está desmarcado el checkbox de sortear, devolvemos la lista en el orden original:
  if (!isLottery.value) {
    return indexList;
  }
  // Si está marcado el checkbox de sortear, devolvemos la lista barajada:
  return indexList.sort(() => Math.random() - 0.5); // shuffle
};

const onAdvanceCupRound = async (): Promise<void> => {
  isLoadingNextCupRound.value = true;
  // Rounds:
  if (queryCupTeams.data.value) {
    const teamsIdSortedList = getRoundWinnerIds();
    const sr: SeasonRound = {
      round: getCurrentRound() + 1,
      matches: [],
    };
    for (let i = 0; i < teamsIdSortedList.length - 1; i += 2) {
      console.log({ i });
      sr.matches.push({
        id: i + 1,
        played: false,
        team1: teamsIdSortedList[i],
        team2: teamsIdSortedList[i + 1],
        score1: 0,
        score2: 0,
        scorers1: [],
        scorers2: [],
        assistants1: [],
        assistants2: [],
        startingLineup1: [],
        startingLineup2: [],
        substitutes1: [],
        substitutes2: [],
        mvp: {
          playerId: 0,
          playerTeamId: 0,
        },
      });
      if (teamsIdSortedList.length > 2) {
        // Omitimos partido de vuelta si es la final
        sr.matches.push({
          id: i + 2,
          played: false,
          team1: teamsIdSortedList[i + 1],
          team2: teamsIdSortedList[i],
          score1: 0,
          score2: 0,
          scorers1: [],
          scorers2: [],
          assistants1: [],
          assistants2: [],
          startingLineup1: [],
          startingLineup2: [],
          substitutes1: [],
          substitutes2: [],
          mvp: {
            playerId: 0,
            playerTeamId: 0,
          },
        });
      }
    }
    mutateRoundAdd.mutate(sr, {
      onSuccess: async () => {
        // Incrementamos ronda y refrescamos query:
        // setCurrentRound(getCurrentRound() + 1);
        // await queryTotalRounds.refetch();
        // // Cambiamos valor a roundkey para forzar repintado de rondas:
        // roundKey.value > 0 ? (roundKey.value = 0) : forceRender();
        await sleep(1000);
        isLoadingNextCupRound.value = false;
        onNextRound();
      },
    });
    // Teams:
    // console.log(
    //   '*** addTeam: Se van a añadir los equipos desde la tabla maestra ***'
    // );
    // queryCupTeams.data.value.forEach((team) => {
    //   mutateTeamAdd.mutate({
    //     league: getCurrentLeague(),
    //     team,
    //   });
    // });
  } else {
    console.error(
      '*** Error: No se han podido recuperar los equipos de la tabla maestra ***'
    );
  }
};

// const deleteDBRounds = () => {
//   mutateMyCupRoundsDelete.mutate(totalRounds.value, {
//     onSuccess: async () => {
//     },
//   });
// };

const restartCup = () => {
  console.log('Total rounds query:', queryTotalRounds.data.value);
  console.log('Total rounds computed:', totalRounds.value);
  // Rounds:
  if (queryCupTeams.data.value) {
    const teamsIdSortedList = lottery();
    // const rounds = createCalendar(queryCupTeams.data.value.length);
    // console.log('Jornadas a generar:', rounds);
    // rounds.forEach((r, index) => {
    const sr: SeasonRound = {
      round: 1,
      matches: [],
    };
    for (let i = 0; i < teamsIdSortedList.length - 1; i += 2) {
      console.log({ i });
      sr.matches.push({
        id: i + 1,
        played: false,
        team1: teamsIdSortedList[i],
        team2: teamsIdSortedList[i + 1],
        score1: 0,
        score2: 0,
        scorers1: [],
        scorers2: [],
        assistants1: [],
        assistants2: [],
        startingLineup1: [],
        startingLineup2: [],
        substitutes1: [],
        substitutes2: [],
        mvp: {
          playerId: 0,
          playerTeamId: 0,
        },
      });
      if (teamsIdSortedList.length > 2) {
        // Omitimos partido de vuelta si es la final
        sr.matches.push({
          id: i + 2,
          played: false,
          team1: teamsIdSortedList[i + 1],
          team2: teamsIdSortedList[i],
          score1: 0,
          score2: 0,
          scorers1: [],
          scorers2: [],
          assistants1: [],
          assistants2: [],
          startingLineup1: [],
          startingLineup2: [],
          substitutes1: [],
          substitutes2: [],
          mvp: {
            playerId: 0,
            playerTeamId: 0,
          },
        });
      }
    }
    // console.log(sr);
    console.log('Jornadas generadas:', sr.matches.length);
    mutateRoundAdd.mutate(sr, {
      onSuccess: () => {
        if (!queryCupTeams.data.value) return;
        // Teams:
        console.log(
          '*** addTeam: Se van a añadir los equipos desde la tabla maestra ***'
        );
        queryCupTeams.data.value.forEach((team) => {
          mutateTeamAdd.mutate(
            {
              league: getCurrentLeague(),
              team,
            },
            {
              onSuccess: async () => {
                // Inicializamos ronda a 1 y refrescamos query:
                // currentRound.value = 1;
                // sleep(2000);
                setCurrentRound(1);
                await queryRound.refetch();
                await queryTotalRounds.refetch();
                // await queryCupTeams.refetch();
                // await queryTopScorers.refetch();
                // sleep(1000);
                // Cambiamos valor a roundkey para forzar repintado de rondas:
                roundKey.value > 0 ? (roundKey.value = 0) : forceRender();

                // console.log('*** TOTAL ROUNDS AFTER RESTART (computed):', totalRounds.value);
                // console.log(
                //   '*** TOTAL ROUNDS AFTER RESTART (query):',
                //   queryTotalRounds.data.value
                // );
                // console.log(
                //   '*** TOTAL ROUNDS AFTER 1s (query):',
                //   queryTotalRounds.data.value
                // );
              },
            }
          );
        });
      },
    });
    // });
  } else {
    console.error(
      '*** Error: No se han podido recuperar los equipos de la tabla maestra ***'
    );
  }

  // Inicializamos ronda a 1 y refrescamos query:
  // currentRound.value = 1;
  // sleep(2000);
  // setCurrentRound(1);
  // sleep(1000);
  // Cambiamos valor a roundkey para forzar repintado de rondas:
  // roundKey.value > 0 ? (roundKey.value = 0) : forceRender();

  // console.log('*** TOTAL ROUNDS AFTER RESTART (computed):', totalRounds.value);
  // console.log(
  //   '*** TOTAL ROUNDS AFTER RESTART (query):',
  //   queryTotalRounds.data.value
  // );
  // console.log(
  //   '*** TOTAL ROUNDS AFTER 1s (query):',
  //   queryTotalRounds.data.value
  // );
};

const onRestartCup = () => {
  $q.dialog({
    html: true,
    // title: '<span class="text-primary">Reiniciar MyCup</span>',
    title:
      '<span class="text-primary">Reiniciar My~Cup</span> <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;"><img style="width: 30%; height: 30%; margin-top: 15px;" src="/images/leagues/mycup.png" /></div>',
    message:
      'Todos los datos actuales (rondas, resultados, etc.) se eliminarán. <strong>¿Estás seguro de continuar?</strong>',
    cancel: { label: 'Volver', flat: true },
    ok: { icon: 'warning', label: 'Continuar', flat: true },
    persistent: true,
  })
    .onOk(() => {
      // deleteDBRounds();
      mutateMyCupRoundsDelete.mutate(totalRounds.value, {
        onSuccess: async () => {
          // await queryTotalRounds.refetch();
          // onFirstRound();
          console.log(queryTotalRounds.data.value);
          console.log(isCupRoundFinished.value);
          // sleep(1000);
          // console.log(queryTotalRounds.data.value);
          restartCup();
        },
      });
    })
    .onOk(() => {
      // console.log('>>>> second OK catcher')
    })
    .onCancel(() => {
      return;
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};

const onPreviousRound = async () => {
  if (getCurrentRound() > 1) {
    // currentRound.value--;
    setCurrentRound(getCurrentRound() - 1);
    await queryRound.refetch();
    // console.log(queryRound.data.value);
    forceRender();
  }
};

const onNextRound = async () => {
  console.log('Count round:', queryTotalRounds.data.value);
  // if (getCurrentRound() < totalRounds.value) {
  if (
    queryTotalRounds.data.value &&
    getCurrentRound() < queryTotalRounds.data.value
  ) {
    // currentRound.value++;
    setCurrentRound(getCurrentRound() + 1);
    await queryRound.refetch();
    // console.log(queryRound.data.value);
    forceRender();
  }
};

const onFirstRound = async () => {
  setCurrentRound(1);
  await queryRound.refetch();
  forceRender();
};

const onLastRound = async () => {
  // if (totalRounds.value > 0) {
  if (queryTotalRounds.data.value) {
    // setCurrentRound(totalRounds.value);
    setCurrentRound(queryTotalRounds.data.value);
    await queryRound.refetch();
    forceRender();
  }
};

const getCupWinnerIndex = (): number => {
  if (!queryRound.data.value) return -1;

  const teamOneWinner =
    queryRound.data.value?.matches[0].score1 >
    queryRound.data.value?.matches[0].score2;

  const teamWinnerIdx = teamOneWinner
    ? queryCupTeams.data.value?.findIndex(
        (t) => t.id === queryRound.data.value?.matches[0].team1
      )
    : queryCupTeams.data.value?.findIndex(
        (t) => t.id === queryRound.data.value?.matches[0].team2
      );

  if (teamWinnerIdx === undefined) return -1;
  console.log({ teamWinnerIdx });
  return teamWinnerIdx;
};

const getCupRoundName = (): string => {
  if (totalRounds.value - getCurrentRound() === 0) {
    return 'FINAL';
  } else if (totalRounds.value - getCurrentRound() === 1) {
    return 'SEMIFINAL';
  } else if (totalRounds.value - getCurrentRound() === 2) {
    return 'RONDA 1/4s';
  } else if (totalRounds.value - getCurrentRound() === 3) {
    return 'RONDA 1/8s';
  } else if (totalRounds.value - getCurrentRound() === 4) {
    return 'RONDA 1/16s';
  } else if (totalRounds.value - getCurrentRound() === 5) {
    return 'RONDA 1/32s';
  }
  return 'RONDA X';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const soccerMatchRef: any[] = []; // Aquí guardaremos las refs de los hijos

const onPlayAllMatches = async () => {
  isPlayingAllMatches.value = true;
  await sleep(500);
  if (soccerMatchRef.length > 0) {
  }
  soccerMatchRef.forEach((child, i) => {
    console.log(i);
    child?.onPlayMatch(); // Llamamos la función de cada hijo expuesta
  });
  isPlayingAllMatches.value = false;
};
</script>

<template>
  <!-- <q-page class="row items-center justify-evenly"> -->
  <q-page
    v-if="
      queryCupTeams.isFetched.value &&
      (!queryCupTeams.data.value ||
        (queryCupTeams.data.value && queryCupTeams.data.value.length <= 0))
    "
    class="no-teams"
  >
    <q-icon name="info" size="72px" color="primary" />
    <span style="margin-top: 10px"
      >No existen equipos para <strong>My~Cup</strong>.</span
    >
    <span style="margin-bottom: 10px"
      >Puedes seleccionar los equipos participantes en:</span
    >
    <Router-link :to="{ name: 'myCup' }">Gestión de My~Cup</Router-link>
  </q-page>
  <q-page v-else class="page-body">
    <div class="wrapper">
      <div class="page-body-title">
        <div class="page-body-title-text">Equipos clasificados</div>
        <q-icon
          :name="showTeams ? 'visibility' : 'visibility_off'"
          size="30px"
          color="primary"
          style="cursor: pointer"
          @click="showTeams = !showTeams"
        />
      </div>
      <!-- <div class="teams-header">
        <div class="teams-header-coleq">Equipo</div>
        <div class="teams-header-colpts">Puntos</div>
        <div class="teams-header-colval">PJ</div>
        <div class="teams-header-colvalaux">PG</div>
        <div class="teams-header-colvalaux">PE</div>
        <div class="teams-header-colvalaux">PP</div>
        <div class="teams-header-colvalaux">GF</div>
        <div class="teams-header-colvalaux">GC</div>
      </div> -->
      <div class="my-spinner" v-if="queryCupTeams.isLoading.value">
        <q-spinner color="primary" size="48px" />
      </div>
      <div v-else-if="showTeams" class="teams-list">
        <TransitionGroup name="rank">
          <div v-for="(team, idx) in queryCupTeams.data.value" :key="team.id">
            <soccer-team-simple
              :team="team"
              :i-key="idx + 1"
              :classified="
                queryRound.data.value &&
                (queryRound.data.value?.matches.length === 0 ||
                  queryRound.data.value?.matches.findIndex(
                    (match) =>
                      match.team1 === team.id || match.team2 === team.id
                  ) >= 0)
              "
            />
          </div>
        </TransitionGroup>
        <div class="restart-league">
          <q-btn
            v-if="queryRound.data.value && queryRound.data.value?.round > 0"
            :label="
              queryCupTeams.data.value && queryCupTeams.data.value?.length > 2
                ? 'Reiniciar copa'
                : 'Reiniciar final'
            "
            color="negative"
            icon="restart_alt"
            unelevated
            @click="onRestartCup"
          />
          <q-btn
            v-else
            :label="
              queryCupTeams.data.value && queryCupTeams.data.value?.length > 2
                ? 'Iniciar copa'
                : 'Iniciar final'
            "
            color="primary"
            icon="play_arrow"
            unelevated
            @click="restartCup"
          />
          <q-checkbox
            v-model="isLottery"
            :label="isLottery ? 'Sorteo activo' : 'Sorteo inactivo'"
            color="primary"
            dense
            left-label
            size="lg"
            checked-icon="shuffle_on"
          />
        </div>
      </div>
    </div>
    <!-- <div v-for="team in queryCupTeams.data.value" :key="team.name">
      <div v-if="queryRound.data.value">
        {{
          queryRound.data.value?.matches.findIndex(
            (match) => match.team1 === team.id || match.team2 === team.id
          ) >= 0
        }}
      </div>
    </div> -->
    <div
      v-if="queryRound.data.value && queryRound.data.value?.round > 0"
      class="wrapper round-container"
    >
      <!-- <div v-if="queryCountRounds.isFetched">
        {{ queryCountRounds.data.value }}
      </div> -->
      <div class="round-header">
        <q-btn
          icon="keyboard_double_arrow_left"
          size="sm"
          color="primary"
          class="q-mr-xs"
          unelevated
          :disable="getCurrentRound() === 1"
          @click="onFirstRound"
        />
        <q-btn
          icon="chevron_left"
          size="sm"
          color="primary"
          unelevated
          :disable="getCurrentRound() === 1"
          @click="onPreviousRound"
        />
        <span class="text-primary q-mr-xs">·········· [</span>
        <!-- <q-img
          src="/images/leagues/england1.png"
          spinner-color="white"
          width="30px"
          height="30px"
          class="q-ma-sm"
        /> -->
        <!-- <q-icon name="stars" /> -->
        <q-img
          src="/images/leagues/mycup.png"
          spinner-color="white"
          width="36px"
          height="36px"
          class="q-ma-sm"
        />
        <span class="q-mr-sm text-bold text-primary">{{
          getCupRoundName()
        }}</span>
        <span class="text-primary">] ··········</span>
        <q-btn
          icon="chevron_right"
          size="sm"
          color="primary"
          unelevated
          :disable="
            !queryTotalRounds.data.value ||
            getCurrentRound() >= queryTotalRounds.data.value
          "
          @click="onNextRound"
        />
        <q-btn
          icon="keyboard_double_arrow_right"
          size="sm"
          color="primary"
          class="q-ml-xs"
          unelevated
          :disable="
            !queryTotalRounds.data.value ||
            getCurrentRound() >= queryTotalRounds.data.value
          "
          @click="onLastRound"
        />
      </div>
      <div class="my-spinner" v-if="queryRound.isLoading.value">
        <q-spinner color="primary" size="48px" />
      </div>
      <div v-else>
        <div
          v-for="(match, idx) in queryRound.data.value?.matches"
          :key="match.id"
        >
          <soccer-match
            @game-played="
              async (matchId) => {
                // console.log({ matchId });
                await queryRound.refetch();
              }
            "
            :class="
              match.id % 2 === 0 &&
              idx < queryRound.data.value?.matches.length - 1
                ? 'q-mb-md'
                : ''
            "
            :key="roundKey"
            :id="match.id"
            :played="match.played"
            :team1="match.team1"
            :team2="match.team2"
            :score1="match.score1"
            :score2="match.score2"
            :scorers1="match.scorers1"
            :scorers2="match.scorers2"
            :assistants1="match.assistants1"
            :assistants2="match.assistants2"
            :startingLineup1="match.startingLineup1"
            :startingLineup2="match.startingLineup2"
            :substitutes1="match.substitutes1"
            :substitutes2="match.substitutes2"
            :mvp="match.mvp"
            :ref="(el) => (soccerMatchRef[idx] = el)"
          />
        </div>
      </div>
      <div class="next-round">
        <TransitionGroup name="transbtn">
          <q-btn
            key="1"
            v-if="
              (queryTotalRounds.data.value &&
                getCurrentRound() >= queryTotalRounds.data.value &&
                queryTotalRounds.data.value < totalRounds &&
                isCupRoundFinished) ||
              isLoadingNextCupRound
            "
            :label="
              getCurrentRound() >= totalRounds - 1
                ? 'Avanzar a la final'
                : 'Avanzar a la siguiente ronda'
            "
            class="next-round-btn"
            color="primary"
            icon="chevron_right"
            unelevated
            style="padding-right: 23px; width: 100%"
            :loading="isLoadingNextCupRound"
            @click="onAdvanceCupRound"
          />
          <!-- </Transition>
        <Transition name="transbtn"> -->
          <q-btn
            key="2"
            v-else-if="!isCupRoundCompleted && getCurrentRound() < totalRounds"
            :label="
              isCupRoundStarted
                ? 'Simular partidos restantes'
                : 'Simular todos los partidos'
            "
            color="primary"
            icon="play_arrow"
            unelevated
            style="margin-top: 10px; padding-right: 23px; width: 100%"
            :loading="isPlayingAllMatches"
            @click="onPlayAllMatches"
          />
        </TransitionGroup>
        <Transition name="winner">
          <div
            class="champion-container"
            v-if="
              queryRound.data.value.round === totalRounds &&
              queryRound.data.value.matches[0].played
            "
          >
            <div
              class="champion-container-subtitle"
              v-if="
                queryRound.data.value.matches[0].score1 ===
                queryRound.data.value.matches[0].score2
              "
            >
              <!-- <span v-if="Math.floor(Math.random() * 2) === 0"
                >(victoria en la prórroga)</span
              > -->
              <!-- <span v-else>(victoria por penaltis)</span> -->
              <span>(victoria por penaltis)</span>
            </div>
            <!-- <div
              class="champion-container-subtitle"
              v-else-if="
                Math.abs(
                  queryRound.data.value.matches[0].score1 -
                    queryRound.data.value.matches[0].score2
                ) === 1 && Math.floor(Math.random() * 3) === 0
              "
            >
              <span>(victoria en la prórroga)</span>
            </div> -->
            <div class="champion-container-img">
              <q-img
                src="/images/leagues/cupwinner.png"
                spinner-color="white"
                width="256px"
                fit="fill"
              />
              <!-- <q-icon name="crown" size="32px" color="primary" /> -->
              <!-- Campeón -->
              <!-- <q-icon name="crown" size="32px" color="primary" /> -->
              <div class="champion-container-img-team">
                <q-img
                  v-if="queryCupTeams.data.value"
                  :src="`/images/teams-${
                    queryCupTeams.data.value[getCupWinnerIndex()].country
                  }/${
                    queryCupTeams.data.value[getCupWinnerIndex()].shortName
                  }.png`"
                  spinner-color="white"
                  width="40px"
                  height="40px"
                  class="champion-container-imgfront"
                />
              </div>
              <div class="champion-container-img-tname">
                <span v-if="queryCupTeams.data.value">{{
                  queryCupTeams.data.value[getCupWinnerIndex()].name
                }}</span>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
    <div
      v-if="queryRound.data.value && queryRound.data.value?.round > 0"
      class="wrapper"
    >
      <div class="my-spinner" v-if="queryTopScorers.isLoading.value">
        <q-spinner color="primary" size="48px" />
      </div>
      <div v-else>
        <div v-if="queryTopScorers.data.value!.length > 0">
          <div class="scorers-header q-ml-md">Máximos goleadores:</div>
          <TransitionGroup name="scorer">
            <div
              v-for="(player, idx) in queryTopScorers.data.value"
              :key="
                player.name +
                player.surname +
                player.position +
                player.shirtNumber
              "
            >
              <!-- {{ player.name }} {{ player.surname }}: {{ player.seasonStats.goals }} -->
              <soccer-player-scorer
                :player="player"
                :i-key="idx + 1"
                :top-scorer-goals="
                  idx > 0
                    ? queryTopScorers.data.value &&
                      queryTopScorers.data.value[0].seasonStats.goals
                    : undefined
                "
              />
            </div>
          </TransitionGroup>
        </div>
        <!-- <div
          v-if="queryTopScorers.data.value!.length < 1"
          style="display: flex; justify-content: center"
        >
          <q-icon
            name="hourglass_top"
            size="lg"
            class="q-ml-sm"
            color="primary"
          />
        </div> -->
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.page-body {
  @include flexPosition(start, start);
  flex-wrap: wrap;
  // gap: 0px 34px;
  padding-top: 30px;
  padding-bottom: 10px;
  padding-left: 6px;
  padding-right: 6px;
  // padding: 16px;
  // padding-bottom: 0;

  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // width: 500px;
    width: 482px;
    font-size: 20px;
    // margin-left: 26px;
    // padding-right: 13px;
    // border-left: 6px solid $primary;
    // padding-left: 13px;
    margin-bottom: 10px;
    // background-color: aqua;

    &-text {
      border-left: 6px solid $primary;
      padding-left: 10px;
    }
  }

  @include response('mobile') {
    @include flexPosition(center, start);
    // display: flex;
    // flex-direction: column;
    // width: 497px;
    padding-top: 25px;
    // padding-left: 5px;
    zoom: 78%;
    // background-color: red;
  }
}
// .wrapper {
//   // background-color: aqua;
//   margin-left: 14px;
//   margin-right: 14px;
//   margin-bottom: 20px;

//   @include response('mobile') {
//     margin-left: 0px;
//     margin-right: 0px;
//     margin-bottom: 40px;
//   }

//   &-scorer {
//     margin-left: 26px;
//     margin-right: 26px;

//     @include response('mobile') {
//       margin-left: 0px;
//       margin-right: 0px;
//     }
//   }
// }
.wrapper {
  // background-color: aqua;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;

  @include response('mobile') {
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 40px;
  }
}
.round-header {
  @include flexPosition(space-between, center);
  // @include flexPosition(center, center);
  height: 34px;
  margin-top: 4px;
  // background-color: aqua;
}
.teams-list {
  // width: 500px;
  width: 482px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
  // background-color: palevioletred;
}
// .teams-header {
//   @include flexPosition(start, center);
//   padding-top: 13px;
//   // width: 100%;
//   color: $primary;
//   font-weight: 500;
//   font-size: small;

//   &-coleq {
//     width: 196px;
//     padding-left: 48px;
//     // background-color: aquamarine;
//   }
//   &-colpts {
//     width: 40px;
//     padding-left: 24px;
//     // background-color: bisque;
//     text-align: center;
//   }
//   &-colval {
//     width: 30px;
//     margin-left: 42px;
//     // background-color: aquamarine;
//     text-align: center;
//   }
//   &-colvalaux {
//     width: 32px;
//     margin-left: 1px;
//     // background-color: bisque;
//     text-align: center;
//   }
// }
.scorers-header {
  @include flexPosition(start, center);
  padding-top: 18px;
  color: $primary;
  font-weight: 500;
  font-size: small;

  @include response('mobile') {
    padding-top: 0px;
  }
}
.restart-league {
  @include flexPosition(space-between, center);
  width: 482px;
  padding-top: 10px;
  // background-color: aqua;
}
.next-round {
  // @include flexPosition(center, center);
  // flex-direction: column;
  // background-color: aqua;
  align-self: center;
  height: 46px;

  &-btn {
    margin-top: 10px;
  }
}
.round-container {
  max-width: 480px;
}
.champion-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  // gap: 3px;
  // background-color: aqua;

  // &-title {
  //   @include flexPosition(center, center);
  // }
  &-img {
    // background-color: pink;
    height: 250px;
    // position: static;

    &-team {
      // background-color: blanchedalmond;
      position: relative;
      // top: 0px;
      left: 108px;
      top: -163px;
    }

    &-tname {
      position: relative;
      top: -80px;
      font-size: 20px;
      text-align: center;
      // background-color: rgb(245, 142, 8);
      border-radius: 12px;
      background-color: $primary;
      color: gold;
    }
  }

  &-subtitle {
    font-size: 13px;
    color: gray;
  }
}
.no-teams {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 18px;
}
.my-spinner {
  @include flexPosition(center, center);
  margin-top: 30px;
}
/* Transition Group */
.rank-move {
  transition: all 1s ease;
}
.scorer-enter-active,
.scorer-leave-active {
  transition: all 1s ease;
}
.scorer-enter-from,
.scorer-leave-to {
  opacity: 0;
  transform: translateX(50px);
  transition: all 1s ease;
}
.scorer-move {
  transition: all 1s ease;
}
/* Transition */
.winner-enter-active,
.winner-leave-active {
  transition: all 2s ease;
}
.winner-enter-from,
.winner-leave-to {
  opacity: 0;
  transform: translateY(500px);
  transition: all 2s ease;

  @include response('mobile') {
    transform: translateX(400px);
  }
}
/* Transition Group */
.transbtn-enter-active,
.transbtn-leave-active {
  transition: all 1s ease;
  transition-delay: 1s;
}
.transbtn-enter-from {
  opacity: 0;
  transform: translateY(500px);
  transition: all 1s ease;

  @include response('mobile') {
    transform: translateX(-500px);
  }
}
.transbtn-leave-to {
  opacity: 0;
  transform: translateY(500px);
  transition: all 1s ease;

  @include response('mobile') {
    transform: translateX(500px);
  }
}
</style>
