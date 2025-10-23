<script setup lang="ts">
import { Team } from 'src/models/team';

interface Props {
  team: Team;
  iKey: number;
  classified?: boolean;
}
const props = defineProps<Props>();
</script>

<template>
  <div>
    <q-list bordered dense class="list">
      <q-item class="item">
        <div side class="section-rank">{{ iKey }}</div>
        <div class="section-img">
          <q-img
            :src="`/images/teams-${props.team.country}/${props.team.shortName}.png`"
            spinner-color="white"
            width="24px"
            height="24px"
          />
        </div>
        <div class="section-team">{{ props.team.name }}</div>
        <div class="section-classified">
          <q-icon
            v-if="props.classified"
            name="check"
            size="20px"
            color="positive"
            style="font-weight: bold"
          />
          <q-icon
            v-else
            name="block"
            size="16px"
            color="negative"
            style="font-weight: bold"
          />
        </div>
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
  // margin-top: 2px;
}
.item {
  background-color: lightgrey;
  // border: 1px solid darkgrey;
  width: 236px;
  padding-left: 5px;
  padding-right: 5px;
}

.section {
  &-rank {
    @include flexPosition(center, center);
    width: 15%;
    font-size: 11px;
    color: $darkGrey;
    padding-top: 2px;
    // background-color: aquamarine;
  }
  &-img {
    @include flexPosition(center, center);
    // background-color: pink;
    width: 15%;
    margin-right: 5px;
  }
  &-team {
    @include flexPosition(start, center);
    width: 60%;
    font-size: 13px;
    color: $darkGrey;
    padding-top: 2px;
  }
  &-classified {
    @include flexPosition(center, center);
  }
}
</style>
