<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { createCalendar } from 'src/helpers/league-calendar';
import { SeasonRound } from 'src/models';
import { teamsSpain1 } from 'src/data/teams';
import useRoundsMutation from 'src/composables/useRoundMutation';
import useTeamMutation from 'src/composables/useTeamMutation';
import useTeams from 'src/composables/useTeams';
import usePlayers from 'src/composables/UsePlayers';
import useRounds from 'src/composables/useRounds';
import useSoccer from 'src/composables/storeWrappers/useSoccer';
import SoccerMatch from 'src/components/SoccerMatch.vue';
import SoccerTeam from 'src/components/SoccerTeam.vue';
import SoccerPlayerScorer from 'src/components/SoccerPlayerScorer.vue';

defineOptions({
  name: 'SoccerPage',
});

const $q = useQuasar();

const { mutateRoundAdd } = useRoundsMutation();
const { mutateTeamAdd } = useTeamMutation();
const { queryTeams } = useTeams();
// const { queryTeamById } = useTeams(2);
const { queryTopScorers } = usePlayers();
const { queryRound, queryCountRounds } = useRounds();

const { getCurrentRound, setCurrentRound } = useSoccer();

const roundKey = ref<number>(0);

const forceRender = (): void => {
  roundKey.value++;
};

// watch(() => currentRound.value,
//       (newId, oldId) => {
//         console.log({oldId}, {newId})
//         if (newId !== oldId) {
//             forceRender();
//         }
//       }
// );

const restartLeague = async () => {
  // Rounds:
  // const rounds = generateLeagueCalendar(teamsSpain1);
  const rounds = createCalendar(teamsSpain1.length);
  console.log(rounds);
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
        startingLineup1: [],
        startingLineup2: [],
      });
    }
    console.log(sr);
    mutateRoundAdd.mutate(sr);
  });
  // Teams:
  teamsSpain1.forEach((team) => {
    mutateTeamAdd.mutate({ league: 'teams-spain-1', id: team.id });
  });

  // Inicializamos ronda a 1 y refrescamos query:
  // currentRound.value = 1;
  setCurrentRound(1);
  await queryRound.refetch();
  // Cambiamos valor a roundkey para forzar repintado de rondas:
  roundKey.value > 0 ? (roundKey.value = 0) : forceRender();
};

const onRestartLeague = () => {
  $q.dialog({
    html: true,
    title: '<span class="text-primary">Reiniciar liga</span',
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
  if (
    queryCountRounds.data.value &&
    getCurrentRound() < queryCountRounds.data.value
  ) {
    // currentRound.value++;
    setCurrentRound(getCurrentRound() + 1);
    await queryRound.refetch();
    // console.log(queryRound.data.value);
    forceRender();
  }
};

// const onSaveRound = () => {
//   console.log('save round');
//   if (queryRound.data.value) {
//     // console.log(queryRound.data.value);
//     mutateRoundPlay.mutate(queryRound.data.value);
//   }
// };
</script>

<template>
  <div class="page-bar">
    <div>
      <q-btn
        label="Reiniciar liga"
        color="negative"
        icon="restart_alt"
        class="q-pl-sm"
        @click="onRestartLeague"
      />
    </div>
  </div>
  <!-- <q-page class="row items-center justify-evenly"> -->
  <q-page class="page-body">
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
      <div v-if="queryTeams.isLoading.value">CARGANDO...</div>
      <div v-else>
        <div v-for="(team, idx) in queryTeams.data.value" :key="team.id">
          <!-- {{ team.name }} {{ team.points }} {{ team.goalDifference }}
          {{ team.goalsConceded }} -->
          <soccer-team :team="team" :i-key="idx + 1" />
        </div>
      </div>
    </div>
    <div class="round">
      <!-- <div v-if="queryCountRounds.isFetched">
        {{ queryCountRounds.data.value }}
      </div> -->
      <div class="round-header">
        <q-btn
          icon="arrow_back"
          size="sm"
          color="primary"
          @click="onPreviousRound"
        />
        <span class="text-primary">····························· [</span>
        <span class="q-ma-md text-bold text-primary"
          >JORNADA {{ getCurrentRound() }}</span
        >
        <span class="text-primary">] ·····························</span>
        <q-btn
          icon="arrow_forward"
          size="sm"
          color="primary"
          @click="onNextRound"
        />
        <!-- <q-btn
          label="Guardar jornada"
          color="primary"
          icon="save"
          class="round-header-savebtn q-pl-sm"
          @click="onSaveRound"
        /> -->
      </div>
      <div v-if="queryRound.isLoading.value">CARGANDO...</div>
      <div v-else class="round-matches">
        <div v-for="match in queryRound.data.value?.matches" :key="match.id">
          <!-- {{ teamsSpain1[match.team1] }} {{ match.score1 }} -
          {{ match.score2 }} {{ teamsSpain1[match.team2] }} -->
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
            :startingLineup1="match.startingLineup1"
            :startingLineup2="match.startingLineup2"
          />
        </div>
      </div>
    </div>
    <div>
      <div v-if="queryTopScorers.isLoading.value">LOADING TOP SCORERS...</div>
      <div v-else>
        <div class="scorers-header q-ml-md">Máximos goleadores:</div>
        <div
          v-for="(player, idx) in queryTopScorers.data.value"
          :key="
            player.name + player.surname + player.position + player.shirtNumber
          "
        >
          <!-- {{ player.name }} {{ player.surname }}: {{ player.seasonStats.goals }} -->
          <soccer-player-scorer :player="player" :i-key="idx + 1" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.page-bar {
  @include flexPosition(end, center);
  width: 100%;
  padding-top: 6px;
  padding-right: 4px;
  // padding: 0 16px;
  // margin-bottom: 16px;
  // background-color: aqua;
}
.page-body {
  @include flexPosition(center, start);
  flex-wrap: wrap;
  gap: 34px;
  padding-bottom: 10px;
  // padding: 16px;
  // padding-top: 0;
  // padding-bottom: 0;
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
    padding-left: 18px;
    // background-color: aquamarine;
  }
  &-colpts {
    width: 40px;
    // background-color: bisque;
    text-align: center;
  }
  &-colval {
    width: 30px;
    margin-left: 12px;
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
}
</style>
