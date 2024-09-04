<script setup lang="ts">
// import { teamsSpain1 } from 'src/data/teams';
import { Team } from 'src/models/team';

interface Props {
  team: Team;
}
const props = defineProps<Props>();
</script>

<template>
  <div>
    <q-list bordered separator dense>
      <q-item class="item">
        <q-item-section side class="section-team">{{
          // teamsSpain1[props.team.id]
          props.team.name
        }}</q-item-section>
        <q-item-section class="section-value section-value-points">{{
          props.team.points
        }}</q-item-section>
        <q-item class="item-values" dense>
          <q-item-section class="section-value section-value-others">{{
            props.team.matchesPlayed
          }}</q-item-section>
          <q-item-section class="section-value section-value-others">{{
            props.team.wins
          }}</q-item-section>
          <q-item-section class="section-value section-value-others">{{
            props.team.draws
          }}</q-item-section>
          <q-item-section class="section-value section-value-others">{{
            props.team.losses
          }}</q-item-section>
          <q-item-section class="section-value section-value-others">{{
            props.team.goalsScored
          }}</q-item-section>
          <q-item-section class="section-value section-value-others">{{
            props.team.goalsConceded
          }}</q-item-section>
        </q-item>
      </q-item>
    </q-list>
  </div>
</template>

<style lang="scss" scoped>
$x: rgba(42, 42, 42, 0.692);

.item {
  background-color: lightgrey;
  width: 400px;

  &-values {
    width: 200px;
    padding-right: 0;
  }
}

.section {
  &-team {
    //   background-color: aquamarine;
    width: 130px;
    font-size: medium;
    color: $x;
  }

  &-value {
    align-items: center;

    &-points {
      // text-align: center;
      // width: 70px;
      background-color: $x;
      color: whitesmoke;
      font-size: 20px;
      font-weight: 500;
    }

    &-others {
      // background-color: whitesmoke;
      font-size: 14px;
      // width: 10px;
    }
  }
}
</style>
