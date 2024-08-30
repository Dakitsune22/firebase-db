<script setup lang="ts">
import {
  createCalendar,
  //  generateLeagueCalendar,
} from 'src/helpers/league-calendar';
import { SeasonRound } from 'src/models';
import { teamsSpain1 } from 'src/data/teams';
import useRoundsMutation from 'src/composables/useRoundMutation';
import useTeamMutation from 'src/composables/useTeamMutation';
import useTeams from 'src/composables/useTeams';

defineOptions({
  name: 'SoccerPage',
});

const { mutateRoundAdd } = useRoundsMutation();
const { mutateTeamAdd } = useTeamMutation();
const { queryTeams } = useTeams();

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
        team1: r[i].split('-')[0],
        team2: r[i].split('-')[1],
      });
    }
    console.log(sr);
    mutateRoundAdd.mutate(sr);
  });
  // Teams:
  teamsSpain1.forEach((team) => {
    mutateTeamAdd.mutate({ league: 'teams-spain-1', name: team });
  });
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
    <div v-if="queryTeams.isLoading.value">CARGANDO...</div>
    <div v-else>
      <div v-for="team in queryTeams.data.value" :key="team.name">
        {{ team.name }} {{ team.points }} {{ team.goalDifference }}
        {{ team.goalsConceded }}
      </div>
    </div>
  </q-page>
</template>
