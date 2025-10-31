<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { createCalendar } from 'src/helpers/league-calendar';
import { Leagues, SeasonRound, Team } from 'src/models';
import {
  teamsEngland1,
  teamsEngland2,
  teamsFrance1,
  teamsGermany1,
  teamsItaly1,
  teamsSpain1,
  teamsSpain2,
} from 'src/data/teams';
import useRoundsMutation from 'src/composables/useRoundMutation';
import useTeamMutation from 'src/composables/useTeamMutation';
import useTeams from 'src/composables/useTeams';
//import useDefaultTeams from 'src/composables/useDefaultTeams';
import usePlayers from 'src/composables/usePlayers';
import useRounds from 'src/composables/useRounds';
import useSoccer from 'src/composables/storeWrappers/useSoccer';
import SoccerMatch from 'src/components/SoccerMatch.vue';
import SoccerTeam from 'src/components/SoccerTeam.vue';
import SoccerPlayerScorer from 'src/components/SoccerPlayerScorer.vue';
import useUserInfoMutation from 'src/composables/useUserInfoMutation';
import { leaguesMap } from 'src/models/leagues';
import { sleep } from 'src/helpers/functions';
import { useRoute, useRouter } from 'vue-router';

defineOptions({
  name: 'SoccerLeague',
});

const $q = useQuasar();
const route = useRoute();
const $router = useRouter();

const { setCurrentLeague, getCurrentLeague, getCurrentRound, setCurrentRound } =
  useSoccer();

// switch (route.params.id.toString()) {
//   case 'spain1':
//     setCurrentLeague(Leagues.LaLigaPrimeraDivision);
//     break;
//   case 'england1':
//     setCurrentLeague(Leagues.PremierLeague);
//     break;
//   case 'italy1':
//     setCurrentLeague(Leagues.SerieA);
//     break;
//   case 'germany1':
//     setCurrentLeague(Leagues.Bundesliga);
//     break;
//   case 'france1':
//     setCurrentLeague(Leagues.Ligue1);
//     break;
//   default:
//     break;
// }
setCurrentLeague(route.params.id.toString() as Leagues);

const { mutateRoundAdd } = useRoundsMutation();
const { mutateTeamAdd } = useTeamMutation();
const { queryTeamsByPoints } = useTeams(getCurrentLeague());
const { queryTopScorers } = usePlayers();
const { queryRound } = useRounds();
const { queryTeamsByName: queryTeamsMyCup } = useTeams(Leagues.MyCup);
const { mutateTeamAddMyCup, mutateTeamDeleteMyCup } = useTeamMutation();
const { mutateMyCupRoundsDelete } = useRoundsMutation();

const roundKey = ref<number>(0);
const pageKey = ref<number>(0);

const forceRender = (): void => {
  // leagueKey.value++;
  roundKey.value++;
};
const forcePageRender = (): void => {
  // leagueKey.value++;
  pageKey.value++;
};

watch(
  () => route.params.id,
  (newId, oldId) => {
    console.log({ oldId }, { newId });
    if (newId !== oldId) {
      forcePageRender();
    }
  }
);

const { mutateUserInfo } = useUserInfoMutation();
mutateUserInfo.mutate();

onBeforeUnmount(async () => {
  // Refrescamos query antes de desmontar, para que esté actualizada a la vuelta:
  await queryRound.refetch();
});

onMounted(async () => {
  await sleep(500);
  console.log('*** TOTAL ROUNDS (computed):', totalRounds.value);
});

const totalRounds = computed(() => {
  if (queryTeamsByPoints.data.value) {
    // Jornadas totales = Número de equipos -1 y x2 (ida y vuelta)
    return (queryTeamsByPoints.data.value.length - 1) * 2;
  }
  return 0;
  // return 2;
});

const isLeagueFinished = computed(() => {
  if (queryRound.data.value === undefined) return false;
  if (queryRound.data.value.round === totalRounds.value) {
    return (
      queryTeamsByPoints.data.value?.filter(
        (team) => team.matchesPlayed === totalRounds.value
      ).length === queryTeamsByPoints.data.value?.length
    );
  }
  return false;
});

const isLeagueRoundCompleted = computed(() => {
  if (!queryRound.data.value) {
    console.log('isLeagueRoundCompleted --> queryRound.data.value = UNDEFINED');
    return false;
  }
  console.log(
    'isLeagueRoundCompleted --> ¿Se han jugado todos los partidos?',
    queryRound.data.value?.matches.findIndex((m) => m.played === false) < 0
  );
  return (
    queryRound.data.value?.matches.findIndex((m) => m.played === false) < 0
  );
});

const isLeagueRoundStarted = computed(() => {
  if (!queryRound.data.value) {
    console.log('isLeagueRoundStarted --> queryRound.data.value = UNDEFINED');
    return false;
  }
  console.log(
    'isLeagueRoundStarted --> ¿Se ha jugado algún partido de la jornada?',
    queryRound.data.value?.matches.findIndex((m) => m.played === true) >= 0
  );
  return (
    queryRound.data.value?.matches.findIndex((m) => m.played === true) >= 0
  );
});

const isPlayingAllMatches = ref<boolean>(false);

const restartLeague = async () => {
  // Rounds:
  let rounds: string[][];

  switch (getCurrentLeague()) {
    case Leagues.LaLigaPrimeraDivision:
      rounds = createCalendar(teamsSpain1.length);
      break;
    case Leagues.LaLigaSegundaDivision:
      rounds = createCalendar(teamsSpain2.length);
      break;
    case Leagues.PremierLeague:
      rounds = createCalendar(teamsEngland1.length);
      break;
    case Leagues.Championship:
      rounds = createCalendar(teamsEngland2.length);
      break;
    case Leagues.SerieA:
      rounds = createCalendar(teamsItaly1.length);
      break;
    case Leagues.Bundesliga:
      rounds = createCalendar(teamsGermany1.length);
      break;
    case Leagues.Ligue1:
      rounds = createCalendar(teamsFrance1.length);
      break;
    default:
      rounds = createCalendar(teamsSpain1.length);
      break;
  }

  console.log('Jornadas a generar:', rounds);
  rounds.forEach((r, index) => {
    const sr: SeasonRound = {
      round: index + 1,
      matches: [],
    };
    for (let i = 0; i < r.length; i++) {
      sr.matches.push({
        id: i + 1,
        played: false,
        team1: Number(r[i].split('-')[0]),
        team2: Number(r[i].split('-')[1]),
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
    // console.log(sr);
    console.log('Jornadas generadas:', sr.matches.length);
    mutateRoundAdd.mutate(sr);
  });
  // Teams:
  if (queryTeamsByPoints.data.value) {
    console.log(
      '*** addTeam: Se van a añadir los equipos desde la tabla maestra ***'
    );
    queryTeamsByPoints.data.value.forEach((team) => {
      mutateTeamAdd.mutate(
        {
          league: getCurrentLeague(),
          team,
        },
        {
          onSuccess: () => {
            onFirstRound();
          },
        }
      );
    });
  } else {
    console.error(
      '*** Error: No se han podido recuperar los equipos de la tabla maestra ***'
    );
    console.log(
      '*** addTeam: Se van a añadir los equipos desde los datos por defecto de la app ***'
    );
    teamsEngland1.forEach((team) => {
      mutateTeamAdd.mutate({
        league: getCurrentLeague(),
        team,
      });
    });
  }

  // Inicializamos ronda a 1 y refrescamos query:
  // currentRound.value = 1;
  // setCurrentRound(1);
  // await queryRound.refetch();
  // // Cambiamos valor a roundkey para forzar repintado de rondas:
  // roundKey.value > 0 ? (roundKey.value = 0) : forceRender();

  // console.log('*** TOTAL ROUNDS AFTER RESTART (computed):', totalRounds.value);
};

const onRestartLeague = () => {
  let leagueName = '';
  switch (getCurrentLeague()) {
    case Leagues.LaLigaPrimeraDivision:
      leagueName = 'LaLiga EA Sports';
      break;
    case Leagues.LaLigaSegundaDivision:
      leagueName = 'LaLiga Hypermotion';
      break;
    case Leagues.PremierLeague:
      leagueName = 'Premier League';
      break;
    case Leagues.Championship:
      leagueName = 'Championship';
      break;
    case Leagues.SerieA:
      leagueName = 'Serie A';
      break;
    case Leagues.Bundesliga:
      leagueName = 'Bundesliga';
      break;
    case Leagues.Ligue1:
      leagueName = 'Ligue 1';
      break;
    default:
      break;
  }
  $q.dialog({
    html: true,
    title: `<span class="text-primary">Reiniciar ${leagueName}</span> <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;"><img style="width: 30%; height: 30%; margin-top: 15px;" src="/images/leagues/${route.params.id
      .toString()
      .replace('-', '')}.png" /></div>`,
    message:
      'Todos los datos actuales (clasificación, resultados, etc.) se eliminarán. <strong>¿Estás seguro de continuar?</strong>',
    cancel: { label: 'Volver', flat: true },
    ok: { icon: 'warning', label: 'Continuar', flat: true },
    persistent: true,
  })
    .onOk(() => {
      restartLeague();
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

const onStartPlayoff = () => {
  console.log('ON START PLAYOFF');
  console.log(queryTeamsMyCup.data.value?.length);

  // console.log(
  //   'Finisher teams:',
  //   queryTeamsByPoints.data.value?.filter((t) => t.matchesPlayed === 1).length
  // );
  // return;

  $q.dialog({
    html: true,
    title: `<span class="text-primary">Playoff: ${
      Object.values(leaguesMap).find(
        (league) => league.value === getCurrentLeague()
      )?.label
    }</span> <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;"><img style="width: 30%; height: 30%; margin-top: 15px;" src="/images/leagues/${route.params.id
      .toString()
      .replace('-', '')}.png" /></div>`,
    message:
      'Se usará <strong>My~Cup</strong> para simular el playoff de ascenso.<br><br>Se perderán todos los datos de la actual competición <strong>My~Cup</strong> (en caso de haberla), y los equipos participantes se sustituirán por los clasificados para el playoff de esta liga.<br><br><strong>¿Estás seguro de continuar?</strong>',
    cancel: { label: 'Volver', flat: true },
    ok: { icon: 'warning', label: 'Continuar', flat: true },
    persistent: true,
  })
    .onOk(() => {
      startPlayoff();
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

const startPlayoff = () => {
  const addTeamsToPlayoff = () => {
    if (queryTeamsByPoints.data.value) {
      let teamToAdd: Team = { ...queryTeamsByPoints.data.value[5] };
      teamToAdd.id = 0;
      mutateTeamAddMyCup.mutate({
        team: teamToAdd,
      });
      teamToAdd = { ...queryTeamsByPoints.data.value[2] };
      teamToAdd.id = 1;
      mutateTeamAddMyCup.mutate({
        team: teamToAdd,
      });
      teamToAdd = { ...queryTeamsByPoints.data.value[4] };
      teamToAdd.id = 2;
      mutateTeamAddMyCup.mutate({
        team: teamToAdd,
      });
      teamToAdd = { ...queryTeamsByPoints.data.value[3] };
      teamToAdd.id = 3;
      mutateTeamAddMyCup.mutate(
        {
          team: teamToAdd,
        },
        {
          onSuccess: () => {
            // queryTeamsMyCup.refetch();
          },
        }
      );
    }
  };

  if (!queryTeamsMyCup.data.value) {
    console.error('No se han podido recuperar los datos originales de MyCup');
    return;
  }
  const currentMyCupNumTeams = queryTeamsMyCup.data.value.length;

  if (currentMyCupNumTeams > 0) {
    // Delete current DB teams:
    queryTeamsMyCup.data.value.forEach((team, idx) => {
      mutateTeamDeleteMyCup.mutate(team.id, {
        onSuccess: () => {
          // Add new teams on last index succeed:
          if (idx + 1 === currentMyCupNumTeams) {
            addTeamsToPlayoff();
          }
        },
      });
    });
  } else {
    addTeamsToPlayoff();
  }

  let currentMyCupNumRounds = 0;
  switch (currentMyCupNumTeams) {
    case 2:
      currentMyCupNumRounds = 1;
      break;
    case 4:
      currentMyCupNumRounds = 2;
      break;
    case 8:
      currentMyCupNumRounds = 3;
      break;
    case 16:
      currentMyCupNumRounds = 4;
      break;
    case 32:
      currentMyCupNumRounds = 5;
      break;
    case 64:
      currentMyCupNumRounds = 6;
      break;
    default:
      break;
  }
  mutateMyCupRoundsDelete.mutate(currentMyCupNumRounds, {
    onSuccess: () => {
      $router.push({ name: 'soccer-mycup' });
    },
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
  if (getCurrentRound() < totalRounds.value) {
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
  if (totalRounds.value > 0) {
    setCurrentRound(totalRounds.value);
    await queryRound.refetch();
    forceRender();
  }
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
    :key="pageKey"
    v-if="
      queryTeamsByPoints.isFetched.value &&
      (!queryTeamsByPoints.data.value ||
        (queryTeamsByPoints.data.value &&
          queryTeamsByPoints.data.value.length <= 0))
    "
    class="no-teams"
  >
    <q-icon name="info" size="72px" color="primary" />
    <span style="margin-top: 10px"
      >No existen equipos para
      <strong>
        {{
          Object.values(leaguesMap).find(
            (league) => league.value === getCurrentLeague()
          )?.label
        }}</strong
      >.</span
    >
    <span style="margin-bottom: 10px"
      >Puedes importar los equipos por defecto o desde la BD en:</span
    >
    <Router-link :to="{ name: 'teamsDB' }">Gestión de equipos</Router-link>
  </q-page>
  <q-page v-else class="page-body">
    <div class="wrapper">
      <div class="teams-header">
        <div class="teams-header-coleq">Equipo</div>
        <div class="teams-header-colpts">Puntos</div>
        <div class="teams-header-colval">PJ</div>
        <div class="teams-header-colvalaux">PG</div>
        <div class="teams-header-colvalaux">PE</div>
        <div class="teams-header-colvalaux">PP</div>
        <div class="teams-header-colvalaux">GF</div>
        <div class="teams-header-colvalaux">GC</div>
      </div>
      <div class="my-spinner" v-if="queryTeamsByPoints.isLoading.value">
        <q-spinner color="primary" size="48px" />
      </div>
      <div v-else>
        <TransitionGroup name="rank">
          <div
            v-for="(team, idx) in queryTeamsByPoints.data.value"
            :key="team.id"
          >
            <!-- {{ team.name }} {{ team.points }} {{ team.goalDifference }}
            {{ team.goalsConceded }} -->
            <soccer-team :team="team" :i-key="idx + 1" />
          </div>
        </TransitionGroup>
        <div class="restart-league">
          <q-btn
            v-if="queryRound.data.value && queryRound.data.value?.round > 0"
            label="Reiniciar liga"
            color="negative"
            icon="restart_alt"
            unelevated
            @click="onRestartLeague"
          />
          <q-btn
            v-else
            label="Iniciar liga"
            color="primary"
            icon="restart_alt"
            @click="restartLeague"
            unelevated
          />
          <q-btn
            v-if="
              getCurrentLeague() === Leagues.LaLigaSegundaDivision ||
              getCurrentLeague() === Leagues.Championship
            "
            label="Iniciar playoff ascenso"
            color="primary"
            icon="play_arrow"
            @click="onStartPlayoff"
            :disable="
              queryTeamsByPoints.data.value?.filter(
                (t) => t.matchesPlayed === totalRounds
              ).length !== queryTeamsByPoints.data.value?.length
            "
            unelevated
          />
        </div>
      </div>
    </div>
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
          :disable="getCurrentRound() === 1 || isPlayingAllMatches"
          @click="onFirstRound"
        />
        <q-btn
          icon="chevron_left"
          size="sm"
          color="primary"
          unelevated
          :disable="getCurrentRound() === 1 || isPlayingAllMatches"
          @click="onPreviousRound"
        />
        <span class="text-primary">············ [</span>
        <q-img
          :src="`/images/leagues/${route.params.id
            .toString()
            .replace('-', '')}.png`"
          spinner-color="white"
          width="30px"
          height="30px"
          class="q-ma-sm"
        />
        <span class="q-mr-sm text-bold text-primary"
          >JORNADA {{ getCurrentRound() }}</span
        >
        <span class="text-primary">] ············</span>
        <q-btn
          icon="chevron_right"
          size="sm"
          color="primary"
          unelevated
          :disable="getCurrentRound() === totalRounds || isPlayingAllMatches"
          @click="onNextRound"
        />
        <q-btn
          icon="keyboard_double_arrow_right"
          size="sm"
          color="primary"
          class="q-ml-xs"
          unelevated
          :disable="getCurrentRound() === totalRounds || isPlayingAllMatches"
          @click="onLastRound"
        />
      </div>
      <div class="my-spinner" v-if="queryRound.isLoading.value">
        <q-spinner color="primary" size="48px" />
      </div>
      <div v-else>
        <div
          v-for="(match, i) in queryRound.data.value?.matches"
          :key="match.id"
        >
          <soccer-match
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
            :ref="(el) => (soccerMatchRef[i] = el)"
          />
        </div>
      </div>
      <div class="champion">
        <Transition name="transbtn">
          <q-btn
            v-show="!isLeagueRoundCompleted"
            :label="
              isLeagueRoundStarted
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
        </Transition>
        <Transition name="winner">
          <div class="champion-container" v-if="isLeagueFinished">
            <div class="champion-container-img">
              <q-img
                src="/images/leagues/cupwinner.png"
                spinner-color="white"
                width="256px"
                fit="fill"
              />
              <div class="champion-container-img-team">
                <q-img
                  v-if="queryTeamsByPoints.data.value"
                  :src="`/images/teams-${queryTeamsByPoints.data.value[0].country}/${queryTeamsByPoints.data.value[0].shortName}.png`"
                  spinner-color="white"
                  width="40px"
                  height="40px"
                  class="champion-container-imgfront"
                />
              </div>
              <div class="champion-container-img-tname">
                <span v-if="queryTeamsByPoints.data.value">{{
                  queryTeamsByPoints.data.value[0].name
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
  // gap: 34px;
  padding-top: 20px;
  padding-bottom: 10px;
  padding-left: 6px;
  padding-right: 6px;
  // padding: 16px;
  // padding-top: 0;
  // padding-bottom: 0;

  @include response('mobile') {
    @include flexPosition(center, start);
    // display: flex;
    // flex-direction: column;
    // width: 497px;
    padding-top: 10px;
    // padding-left: 5px;
    zoom: 78%;
    // background-color: red;
  }
}
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
.teams-header {
  @include flexPosition(start, center);
  padding-top: 14px;
  // width: 100%;
  color: $primary;
  font-weight: 500;
  font-size: small;

  &-coleq {
    width: 196px;
    padding-left: 48px;
    // background-color: aquamarine;
  }
  &-colpts {
    width: 40px;
    padding-left: 24px;
    // background-color: bisque;
    text-align: center;
  }
  &-colval {
    width: 30px;
    margin-left: 42px;
    // background-color: aquamarine;
    text-align: center;
  }
  &-colvalaux {
    width: 32px;
    margin-left: 1px;
    // background-color: bisque;
    text-align: center;
  }
}
.round-header {
  @include flexPosition(space-between, center);
  // @include flexPosition(center, center);
  height: 34px;
  // background-color: aqua;
}
.round-container {
  width: 480px;
}
.scorers-header {
  @include flexPosition(start, center);
  padding-top: 14px;
  color: $primary;
  font-weight: 500;
  font-size: small;

  @include response('mobile') {
    padding-top: 0px;
  }
}
.restart-league {
  @include flexPosition(center, center);
  padding-top: 10px;
  gap: 6px;
  // background-color: aqua;
}
.champion {
  @include flexPosition(center, center);

  &-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;

    &-img {
      height: 250px;

      &-team {
        position: relative;
        left: 108px;
        top: -163px;
      }

      &-tname {
        position: relative;
        top: -80px;
        font-size: 20px;
        text-align: center;
        border-radius: 12px;
        background-color: $primary;
        color: gold;
      }
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
/* Transition */
.transbtn-enter-active,
.transbtn-leave-active {
  transition: all 1s ease;
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
