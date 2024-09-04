<script setup lang="ts">
import { createCalendar } from 'src/helpers/league-calendar';
import { SeasonRound } from 'src/models';
import { teamsSpain1 } from 'src/data/teams';
import useRoundsMutation from 'src/composables/useRoundMutation';
import useTeamMutation from 'src/composables/useTeamMutation';
import useTeams from 'src/composables/useTeams';
import useRounds from 'src/composables/useRounds';
import useSoccer from 'src/composables/storeWrappers/useSoccer';
import SoccerMatch from 'src/components/SoccerMatch.vue';
import SoccerTeam from 'src/components/SoccerTeam.vue';

defineOptions({
  name: 'SoccerPage',
});

const { mutateRoundAdd } = useRoundsMutation();
const { mutateTeamAdd } = useTeamMutation();
const { queryTeams } = useTeams();
const { queryRound, queryCountRounds } = useRounds();

const { currentRound } = useSoccer();

const onRestartLeague = () => {
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
        team1: Number(r[i].split('-')[0]),
        team2: Number(r[i].split('-')[1]),
        score1: 0,
        score2: 0,
      });
    }
    console.log(sr);
    mutateRoundAdd.mutate(sr);
  });
  // Teams:
  teamsSpain1.forEach((team, i) => {
    mutateTeamAdd.mutate({ league: 'teams-spain-1', id: i, name: team });
  });
};

const onPreviousRound = () => {
  if (currentRound.value > 1) {
    currentRound.value--;
    queryRound.refetch();
  }
};

const onNextRound = () => {
  if (
    queryCountRounds.data.value &&
    currentRound.value < queryCountRounds.data.value
  ) {
    currentRound.value++;
    queryRound.refetch();
  }
};
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <div>
      <q-btn
        label="Reiniciar liga"
        color="negative"
        icon="restart_alt"
        class="q-pl-sm"
        @click="onRestartLeague"
      />
    </div>
    <div>
      <div v-if="queryTeams.isLoading.value">CARGANDO...</div>
      <div v-else>
        <div v-for="team in queryTeams.data.value" :key="team.name">
          <!-- {{ team.name }} {{ team.points }} {{ team.goalDifference }}
          {{ team.goalsConceded }} -->
          <soccer-team :team="team" />
        </div>
      </div>
    </div>
    <div>
      <!-- <div v-if="queryCountRounds.isFetched">
        {{ queryCountRounds.data.value }}
      </div> -->
      <div class="round-header">
        <q-btn icon="remove" size="sm" @click="onPreviousRound" />
        <span class="q-ma-md text-bold">{{ currentRound }}</span>
        <q-btn icon="add" size="sm" @click="onNextRound" />
      </div>
      <div v-if="queryRound.isLoading.value">CARGANDO...</div>
      <div v-else class="round-matches">
        <div v-for="match in queryRound.data.value?.matches" :key="match.id">
          <!-- {{ teamsSpain1[match.team1] }} {{ match.score1 }} -
          {{ match.score2 }} {{ teamsSpain1[match.team2] }} -->
          <soccer-match
            :id="match.id"
            :team1="match.team1"
            :team2="match.team2"
            :score1="match.score1"
            :score2="match.score2"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>
