<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { createCalendar } from 'src/helpers/league-calendar';
import { Leagues, SeasonRound } from 'src/models';
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
import { sleep } from 'src/helpers/functions';

defineOptions({
  name: 'SoccerPageMyLeague',
});

const $q = useQuasar();

const { setCurrentLeague, getCurrentLeague, getCurrentRound, setCurrentRound } =
  useSoccer();

setCurrentLeague(Leagues.MyLeague);

const { mutateRoundAdd } = useRoundsMutation();
const { mutateTeamAdd } = useTeamMutation();
const { queryTeamsByPoints } = useTeams(getCurrentLeague());
// const { queryTeams: queryTeamsMasterDB } = useDefaultTeams(getCurrentLeague());
// const { queryTeamById } = useTeams(2);
const { queryTopScorers } = usePlayers();
const { queryRound } = useRounds();

const roundKey = ref<number>(0);
// const leagueKey = ref<number>(0);

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
  // console.log(queryRound.data.value?.matches);
  console.log(queryRound.data.value);
  if (queryRound.data.value?.round === 0) {
    onFirstRound();
  }
});

const totalRounds = computed(() => {
  if (queryTeamsByPoints.data.value) {
    // Jornadas totales = Número de equipos -1 y x2 (ida y vuelta)
    return (queryTeamsByPoints.data.value.length - 1) * 2;
  }
  return 0;
});

const restartLeague = async () => {
  // Rounds:
  if (queryTeamsByPoints.data.value) {
    const rounds = createCalendar(queryTeamsByPoints.data.value.length);
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
    console.log(
      '*** addTeam: Se van a añadir los equipos desde la tabla maestra ***'
    );
    queryTeamsByPoints.data.value.forEach((team) => {
      mutateTeamAdd.mutate({
        league: getCurrentLeague(),
        team,
      });
    });
  } else {
    console.error(
      '*** Error: No se han podido recuperar los equipos de la tabla maestra ***'
    );
  }

  // Inicializamos ronda a 1 y refrescamos query:
  // currentRound.value = 1;
  setCurrentRound(1);
  await queryRound.refetch();
  // Cambiamos valor a roundkey para forzar repintado de rondas:
  roundKey.value > 0 ? (roundKey.value = 0) : forceRender();

  console.log('*** TOTAL ROUNDS AFTER RESTART (computed):', totalRounds.value);
};

const onRestartLeague = () => {
  $q.dialog({
    html: true,
    // title: '<span class="text-primary">Reiniciar MyLeague</span>',
    title:
      '<span class="text-primary">Reiniciar My~League</span> <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;"><img style="width: 30%; height: 30%; margin-top: 15px;" src="/images/leagues/myleague.png" /></div>',
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
</script>

<template>
  <!-- <q-page class="row items-center justify-evenly"> -->
  <q-page
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
      >No existen equipos para <strong>My~League</strong>.</span
    >
    <span style="margin-bottom: 10px"
      >Puedes seleccionar los equipos participantes en:</span
    >
    <Router-link :to="{ name: 'myLeague' }">Gestión de My~League</Router-link>
  </q-page>
  <q-page v-else class="page-body">
    <div>
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
            unelevated
            @click="restartLeague"
          />
        </div>
      </div>
    </div>
    <div
      v-if="queryRound.data.value && queryRound.data.value?.round > 0"
      class="round"
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
        <span class="text-primary q-mr-xs">············ [</span>
        <!-- <q-img
          src="/images/leagues/england1.png"
          spinner-color="white"
          width="30px"
          height="30px"
          class="q-ma-sm"
        /> -->
        <!-- <q-icon name="stars" /> -->
        <q-img
          src="/images/leagues/myleague.png"
          spinner-color="white"
          width="36px"
          height="36px"
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
          :disable="getCurrentRound() === totalRounds"
          @click="onNextRound"
        />
        <q-btn
          icon="keyboard_double_arrow_right"
          size="sm"
          color="primary"
          class="q-ml-xs"
          unelevated
          :disable="getCurrentRound() === totalRounds"
          @click="onLastRound"
        />
      </div>
      <div class="my-spinner" v-if="queryRound.isLoading.value">
        <q-spinner color="primary" size="48px" />
      </div>
      <div v-else class="round-matches">
        <div v-for="match in queryRound.data.value?.matches" :key="match.id">
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
          />
        </div>
      </div>
    </div>
    <div v-if="queryRound.data.value && queryRound.data.value?.round > 0">
      <div class="my-spinner" v-if="queryTopScorers.isLoading.value">
        <q-spinner color="primary" size="48px" />
      </div>
      <div v-else>
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
        <div
          v-if="queryTopScorers.data.value!.length < 1"
          style="display: flex; justify-content: center"
        >
          <q-icon
            name="hourglass_top"
            size="lg"
            class="q-ml-sm"
            color="primary"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.page-body {
  @include flexPosition(center, start);
  flex-wrap: wrap;
  gap: 34px;
  padding-top: 20px;
  padding-bottom: 10px;
  // padding: 16px;
  // padding-top: 0;
  // padding-bottom: 0;

  @include response('mobile') {
    // display: flex;
    // flex-direction: column;
    // width: 497px;
    padding-top: 10px;
    // padding-left: 5px;
    zoom: 78%;
    // background-color: red;
  }
}
.round-header {
  @include flexPosition(space-between, center);
  // @include flexPosition(center, center);
  height: 34px;
  // background-color: aqua;
}
.teams-header {
  @include flexPosition(start, center);
  padding-top: 13px;
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
.scorers-header {
  @include flexPosition(start, center);
  padding-top: 15px;
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
}
.no-teams {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 18px;
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
.my-spinner {
  @include flexPosition(center, center);
  margin-top: 30px;
}
</style>
