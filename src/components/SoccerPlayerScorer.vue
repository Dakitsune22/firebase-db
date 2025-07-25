<script setup lang="ts">
import useSoccer from 'src/composables/storeWrappers/useSoccer';
import useTeams from 'src/composables/useTeams';
import { Player } from 'src/models';
import { ref } from 'vue';
import SoccerPlayerInfo from './SoccerPlayerInfo.vue';

interface Props {
  player: Player;
  iKey: number;
}

const props = defineProps<Props>();

const { getCurrentLeague } = useSoccer();
const { queryTeamById } = useTeams(getCurrentLeague(), props.player.teamId);

const showPlayerInfo = ref<boolean>(false);
</script>

<template>
  <div>
    <q-list
      bordered
      separator
      dense
      class="list"
      :class="iKey === 1 ? 'list-first' : ''"
    >
      <q-item class="item" :class="iKey === 1 ? 'item-first' : ''">
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
        <q-item-section
          side
          class="section-name"
          @click="showPlayerInfo = true"
          >{{
            props.player.nickname
              ? props.player.nickname
              : props.player.name + ' ' + props.player.surname
          }}</q-item-section
        >
        <div class="section-team">
          <q-img
            :src="`/images/teams-${queryTeamById.data.value?.country}/${queryTeamById.data.value?.shortName}.png`"
            spinner-color="white"
            width="26px"
            height="26px"
          />
        </div>
        <q-item-section class="section-goals">{{
          props.player.seasonStats.goals
        }}</q-item-section>
      </q-item>
      <q-dialog v-model="showPlayerInfo" auto-close persistent>
        <soccer-player-info
          :key="props.iKey"
          :player="props.player"
          :url-team-crest="`/images/teams-${queryTeamById.data.value?.country}/${queryTeamById.data.value?.shortName}.png`"
        />
      </q-dialog>
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

  &-first {
    border-color: darken($color: rgb(253, 206, 88), $amount: 25%);
  }
}

.item {
  background-color: lightgrey;
  height: 30px;
  // border: 1px solid darkgrey;
  //   width: 400px;

  &-first {
    background-color: rgb(253, 206, 88);
  }
}

.section {
  &-rank {
    align-items: center;
    width: 28px;
    font-size: 11px;
    padding-top: 1px;
    color: $darkGrey;
    // background-color: antiquewhite;
  }
  &-nationality {
    width: 20px;
  }
  &-position {
    align-items: start;
    width: 25px;
    padding-left: 5px;
    font-size: 9px;
    padding-top: 1px;
    color: $darkGrey;
    // background-color: aqua;
  }
  &-name {
    align-items: start;
    width: 220px;
    padding-left: 10px;
    font-size: 13px;
    // font-weight: 500;
    padding-top: 2px;
    cursor: pointer;
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
    font-size: 18px;
    font-weight: 500;
  }
}
</style>
