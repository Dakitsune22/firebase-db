<script setup lang="ts">
import { ref } from 'vue';
import useSoccer from 'src/composables/storeWrappers/useSoccer';
import { teamsSpain1 } from 'src/data/teams';
import { Match } from 'src/models/season-round';
import useRoundsMutation from 'src/composables/useRoundMutation';
import useTeamMutation from 'src/composables/useTeamMutation';
import useTeams from 'src/composables/useTeams';
import { Team } from 'src/models';

const props = defineProps<Match>();

const matchRef = ref<Match>({
  id: props.id,
  played: props.played,
  team1: props.team1,
  team2: props.team2,
  score1: props.score1,
  score2: props.score2,
});

const { currentRound, roundMatches } = useSoccer();
const { mutateRoundPlay } = useRoundsMutation();
const { mutateTeamUpdate } = useTeamMutation();

const { queryTeamById: qt1 } = useTeams(matchRef.value.team1);
const { queryTeamById: qt2 } = useTeams(matchRef.value.team2);

const onPlayMatch = () => {
  if (matchRef.value.played) return;

  matchRef.value.score1 = Number((Math.random() * 5).toFixed(0));
  matchRef.value.score2 = Number((Math.random() * 5).toFixed(0));
  matchRef.value.played = true;

  // ToDo: Actualizar datos de los equipos en store y BBDD.
  roundMatches.value[matchRef.value.id - 1].score1 = matchRef.value.score1;
  roundMatches.value[matchRef.value.id - 1].score2 = matchRef.value.score2;
  roundMatches.value[matchRef.value.id - 1].played = matchRef.value.played;

  mutateRoundPlay.mutate({
    round: currentRound.value,
    matches: roundMatches.value,
  });

  mutateTeamUpdate.mutate({
    league: 'teams-spain-1',
    id: matchRef.value.team1,
    newGoalsScored: matchRef.value.score1,
    newGoalsConceded: matchRef.value.score2,
    team: qt1.data.value ? qt1.data.value : ({} as Team),
  });

  mutateTeamUpdate.mutate({
    league: 'teams-spain-1',
    id: matchRef.value.team2,
    newGoalsScored: matchRef.value.score2,
    newGoalsConceded: matchRef.value.score1,
    team: qt2.data.value ? qt2.data.value : ({} as Team),
  });
};
</script>

<template>
  <div>
    <q-list bordered separator dense>
      <q-item class="item">
        <q-item-section>
          <q-img
            :src="`/public/images/teams-spain-1/${props.team1}.png`"
            spinner-color="white"
            width="22px"
            height="22px"
          />
        </q-item-section>
        <q-item-section side class="section-team">{{
          teamsSpain1[props.team1]
        }}</q-item-section>
        <q-item-section class="section-score"
          >{{ matchRef.score1 }}
        </q-item-section>
        <q-item-section class="section-score">{{
          matchRef.score2
        }}</q-item-section>
        <q-item-section style="padding-left: 7px">
          <q-img
            :src="`/public/images/teams-spain-1/${props.team2}.png`"
            spinner-color="white"
            width="22px"
            height="22px"
          />
        </q-item-section>
        <q-item-section side class="section-team">{{
          teamsSpain1[props.team2]
        }}</q-item-section>
        <q-item-section
          class="section-sim"
          :class="
            matchRef.played ? 'section-sim-disabled' : 'section-sim-enabled'
          "
          ><q-icon name="play_circle" size="26px" @click="onPlayMatch"
        /></q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<style lang="scss" scoped>
$darkGrey: rgba(42, 42, 42, 0.692);

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
