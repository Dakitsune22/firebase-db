<script setup lang="ts">
import { ref } from 'vue';
import useSoccer from 'src/composables/storeWrappers/useSoccer';
import { teamsSpain1 } from 'src/data/teams';
import { Match } from 'src/models/season-round';
import useRoundsMutation from 'src/composables/useRoundMutation';
import useTeamMutation from 'src/composables/useTeamMutation';
import useTeams from 'src/composables/useTeams';
import { Team } from 'src/models';
import {
  getStartingLineup,
  getScorers,
  getMatchResult,
} from 'src/helpers/match-play';
import SoccerMatchStats from './SoccerMatchStats.vue';

const props = defineProps<Match>();

const matchRef = ref<Match>({
  id: props.id,
  played: props.played,
  team1: props.team1,
  team2: props.team2,
  score1: props.score1,
  score2: props.score2,
  startingLineup1: props.startingLineup1,
  startingLineup2: props.startingLineup2,
  scorers1: props.scorers1,
  scorers2: props.scorers2,
});

const { roundMatches, getCurrentRound } = useSoccer();
const { mutateRoundPlay } = useRoundsMutation();
const { mutateTeamUpdate } = useTeamMutation();

const { queryTeamById: qt1 } = useTeams(matchRef.value.team1);
const { queryTeamById: qt2 } = useTeams(matchRef.value.team2);

const showMatchStats = ref<boolean>(false);

// const mStatsKey = ref<number>(0);
// const forceRender = (): void => {
//   mStatsKey.value++;
//   console.log(matchRef.value.startingLineup1);
// };

const onPlayMatch = () => {
  if (matchRef.value.played) return;

  // Obtener onces iniciales:
  matchRef.value.startingLineup1 = getStartingLineup(qt1.data.value as Team);
  matchRef.value.startingLineup2 = getStartingLineup(qt2.data.value as Team);

  // Calcular resultado:
  matchRef.value.played = true;
  const matchResult = getMatchResult(
    matchRef.value.startingLineup1.reduce((a, b) => a + b.overall, 0) / 11,
    matchRef.value.startingLineup2.reduce((a, b) => a + b.overall, 0) / 11
  );
  matchRef.value.score1 = matchResult.localScore;
  matchRef.value.score2 = matchResult.awayScore;

  // Obtener goleadores:
  matchRef.value.scorers1 = getScorers(
    matchRef.value.score1,
    matchRef.value.startingLineup1
  );
  matchRef.value.scorers2 = getScorers(
    matchRef.value.score2,
    matchRef.value.startingLineup2
  );

  // Actualizar datos de los equipos en store y BBDD.
  roundMatches.value[matchRef.value.id - 1].played = matchRef.value.played;
  roundMatches.value[matchRef.value.id - 1].score1 = matchRef.value.score1;
  roundMatches.value[matchRef.value.id - 1].score2 = matchRef.value.score2;
  roundMatches.value[matchRef.value.id - 1].startingLineup1 =
    matchRef.value.startingLineup1;
  roundMatches.value[matchRef.value.id - 1].startingLineup2 =
    matchRef.value.startingLineup2;
  roundMatches.value[matchRef.value.id - 1].scorers1 = matchRef.value.scorers1;
  roundMatches.value[matchRef.value.id - 1].scorers2 = matchRef.value.scorers2;

  mutateRoundPlay.mutate({
    round: getCurrentRound(),
    matches: roundMatches.value,
  });

  mutateTeamUpdate.mutate({
    league: 'teams-spain-1',
    id: matchRef.value.team1,
    newGoalsScored: matchRef.value.score1,
    newGoalsConceded: matchRef.value.score2,
    scorers: matchRef.value.scorers1,
    team: qt1.data.value ? qt1.data.value : ({} as Team),
  });

  mutateTeamUpdate.mutate({
    league: 'teams-spain-1',
    id: matchRef.value.team2,
    newGoalsScored: matchRef.value.score2,
    newGoalsConceded: matchRef.value.score1,
    scorers: matchRef.value.scorers2,
    team: qt2.data.value ? qt2.data.value : ({} as Team),
  });
};
</script>

<template>
  <div>
    <q-list bordered separator dense class="list">
      <q-item class="item">
        <q-item-section>
          <q-img
            :src="`/images/teams-spain-1/${props.team1}.png`"
            spinner-color="white"
            width="22px"
            height="22px"
          />
        </q-item-section>
        <q-item-section side class="section-team">{{
          teamsSpain1[props.team1].name
        }}</q-item-section>
        <q-item-section class="section-score"
          >{{ matchRef.score1 }}
        </q-item-section>
        <q-item-section class="section-score">{{
          matchRef.score2
        }}</q-item-section>
        <q-item-section style="padding-left: 7px">
          <q-img
            :src="`/images/teams-spain-1/${props.team2}.png`"
            spinner-color="white"
            width="22px"
            height="22px"
          />
        </q-item-section>
        <q-item-section side class="section-team">{{
          teamsSpain1[props.team2].name
        }}</q-item-section>
        <q-item-section
          class="section-sim"
          :class="
            matchRef.played ? 'section-sim-disabled' : 'section-sim-enabled'
          "
          ><q-icon name="play_circle" size="26px" @click="onPlayMatch"
        /></q-item-section>
        <q-item-section
          class="section-sim"
          :class="
            matchRef.played ? 'section-sim-enabled' : 'section-sim-disabled'
          "
          @click="
            matchRef.played
              ? (showMatchStats = !showMatchStats)
              : (showMatchStats = showMatchStats)
          "
          ><q-icon name="query_stats" size="22px"
        /></q-item-section>
      </q-item>
    </q-list>
    <soccer-match-stats
      v-if="showMatchStats"
      :id="matchRef.id"
      :played="matchRef.played"
      :score1="matchRef.score1"
      :score2="matchRef.score2"
      :startingLineup1="matchRef.startingLineup1"
      :startingLineup2="matchRef.startingLineup2"
      :scorers1="matchRef.scorers1"
      :scorers2="matchRef.scorers2"
      :team1="matchRef.team1"
      :team2="matchRef.team2"
    />
  </div>
</template>

<style lang="scss" scoped>
$darkGrey: rgba(42, 42, 42, 0.692);
$midGrey: rgb(150, 150, 150);

.list {
  border: 1px solid $midGrey;
  border-radius: 0.2em;
  margin-top: 2px;
}

.item {
  background-color: lightgrey;
}
.section {
  &-team {
    // background-color: aquamarine;
    align-items: start;
    width: 135px;
    padding-left: 10px;
    font-size: medium;
    color: $darkGrey;
  }
  &-score {
    background-color: $darkGrey;
    color: whitesmoke;
    width: 30px;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
  }
  &-sim {
    // width: 20px;
    // background-color: bisque;

    &-enabled {
      color: $darkGrey;
      cursor: pointer;

      :hover {
        color: $primary;
      }
    }
    &-disabled {
      color: white;
      cursor: default;
    }
  }
}
</style>
