<script setup lang="ts">
import { Player } from 'src/models';

interface Props {
  player: Player;
  iKey: number;
}

const props = defineProps<Props>();
</script>

<template>
  <div>
    <q-list bordered separator dense class="list">
      <q-item class="item">
        <q-item-section side class="section-rank">{{ iKey }}</q-item-section>
        <q-item-section class="section-nationality">
          <q-img
            :src="`/images/flags/h20/${props.player.nationality}.png`"
            spinner-color="white"
            width="27px"
            height="17px"
            style="border: 1px solid rgba(0, 0, 0, 65%)"
          />
        </q-item-section>
        <q-item-section side class="section-position">{{
          props.player.position
        }}</q-item-section>
        <q-item-section side class="section-name">{{
          props.player.nickname
            ? props.player.nickname
            : props.player.name + ' ' + props.player.surname
        }}</q-item-section>
        <div class="section-team">
          <q-img
            :src="`/images/teams-spain-1/${props.player.teamId}.png`"
            spinner-color="white"
            width="26px"
            height="26px"
          />
        </div>
        <q-item-section class="section-goals">{{
          props.player.seasonStats.goals
        }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<style lang="scss" scoped>
$darkGrey: rgba(42, 42, 42, 0.692);

.list {
  border-color: rgb(150, 150, 150);
  border-width: 1px 1px 1px 1px;
  border-radius: 0.2em;
  margin-top: 2px;
}

.item {
  background-color: lightgrey;
  height: 30px;
  // border: 1px solid darkgrey;
  //   width: 400px;
}

.section {
  &-rank {
    align-items: end;
    width: 28px;
    font-size: 12px;
    color: $darkGrey;
  }
  &-nationality {
    width: 20px;
  }
  &-position {
    align-items: start;
    width: 25px;
    padding-left: 0px;
    font-size: 10px;
    color: $darkGrey;
  }
  &-name {
    align-items: start;
    width: 180px;
    padding-left: 0px;
    font-size: medium;
    // font-weight: 500;
    color: $darkGrey;
  }
  &-team {
    @include flexPosition(center, center);
    width: 30px;
    margin-right: 10px;
  }
  &-goals {
    align-items: center;
    margin-top: 2px;
    width: 50px;
    height: 24px;
    background-color: $darkGrey;
    color: whitesmoke;
    font-size: 20px;
    font-weight: 500;
  }
}
</style>
