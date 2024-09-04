<script setup lang="ts">
import { teamsSpain1 } from 'src/data/teams';
import { Match } from 'src/models/season-round';
import { ref } from 'vue';

const props = defineProps<Match>();

const matchRef = ref<Match>({
  id: props.id,
  team1: props.team1,
  team2: props.team2,
  score1: props.score1,
  score2: props.score2,
});

const onPlayMatch = () => {
  matchRef.value.score1 = Number((Math.random() * 5).toFixed(0));
  matchRef.value.score2 = Number((Math.random() * 5).toFixed(0));

  // ToDo: Actualizar datos de los equipos en BBDD.
};
</script>

<template>
  <div>
    <q-list bordered separator dense>
      <q-item class="item">
        <q-item-section side class="section-team">{{
          teamsSpain1[props.team1]
        }}</q-item-section>
        <q-item-section class="section-score"
          >{{ matchRef.score1 }}
        </q-item-section>
        <q-item-section class="section-score">{{
          matchRef.score2
        }}</q-item-section>
        <q-item-section side class="section-team">{{
          teamsSpain1[props.team2]
        }}</q-item-section>
        <q-item-section side class="section-sim"
          ><q-icon name="play_circle" @click="onPlayMatch"
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
    //   background-color: aquamarine;
    width: 130px;
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
    color: white;
    cursor: pointer;
    // align-items: center;
    // font-size: 20px;
    // font-weight: 500;

    :hover {
      color: $darkGrey;
    }
  }
}
</style>
