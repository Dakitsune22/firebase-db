<script setup lang="ts">
import { ref } from 'vue';
import { Match } from 'src/models';

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
</script>

<template>
  <div class="matchstats-container">
    <div class="matchstats-container-left">
      <div>
        Once incial. Media:
        {{
          (
            matchRef.startingLineup1.reduce((a, b) => a + b.overall, 0) / 11
          ).toFixed(1)
        }}
      </div>
      <div v-for="p in matchRef.startingLineup1" :key="p.shirtNumber">
        <div class="matchstats-container-player">
          <q-img
            :src="`/public/images/flags/h20/${p.nationality}.png`"
            spinner-color="white"
            width="20px"
            height="14px"
          />
          <div class="matchstats-container-player-shirt">
            {{ p.shirtNumber }}
          </div>
          <div class="matchstats-container-player-position">
            {{ p.position }}
          </div>
          <div class="matchstats-container-player-name">
            {{ p.name }}
          </div>
          <div class="matchstats-container-player-overall">
            {{ p.overall }}
          </div>
          <div class="matchstats-container-player-goals">
            <q-icon
              v-for="g in matchRef.scorers1.filter((s) => s === p.shirtNumber)
                .length"
              :key="g"
              name="sports_soccer"
              color="grey-9"
            ></q-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="matchstats-container-right">
      <div>
        Once inicial. Media:
        {{
          (
            matchRef.startingLineup2.reduce((a, b) => a + b.overall, 0) / 11
          ).toFixed(1)
        }}
      </div>
      <div v-for="p in matchRef.startingLineup2" :key="p.shirtNumber">
        <div class="matchstats-container-player">
          <q-img
            :src="`/public/images/flags/h20/${p.nationality}.png`"
            spinner-color="white"
            width="20px"
            height="14px"
          />
          <div class="matchstats-container-player-shirt">
            {{ p.shirtNumber }}
          </div>
          <div class="matchstats-container-player-position">
            {{ p.position }}
          </div>
          <div class="matchstats-container-player-name">
            {{ p.name }}
          </div>
          <div class="matchstats-container-player-overall">
            {{ p.overall }}
          </div>
          <div class="matchstats-container-player-goals">
            <q-icon
              v-for="g in matchRef.scorers2.filter((s) => s === p.shirtNumber)
                .length"
              :key="g"
              name="sports_soccer"
              color="grey-9"
            ></q-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- {{ p.overall >= 80 ? '⭐' : '' }} -->

<style lang="scss" scoped>
$darkGrey: rgba(42, 42, 42, 0.692);
$midGrey: rgb(150, 150, 150);

.matchstats-container {
  @include flexPosition(start, start);
  background-color: lightgrey;
  padding: 6px;
  padding-top: 4px;
  border: 1px solid $midGrey;
  border-radius: 0.2em;
  margin-top: 1px;
  font-size: 12px;
  // height: 100px;

  &-left {
    width: 50%;
    // background-color: aquamarine;
  }
  &-right {
    width: 50%;
    // background-color: bisque;
  }

  &-player {
    @include flexPosition(start, center);
    // align-items: center;
    gap: 5px;

    &-shirt {
      width: 8%;
      text-align: right;
      // background-color: aqua;
    }
    &-position {
      width: 9%;
      font-size: 8px;
      text-align: center;
      // background-color: antiquewhite;
    }
    &-name {
      width: 55%;
      font-size: 12px;
    }
    &-overall {
      width: 8%;
      color: $primary;
      font-weight: bold;
    }
    &-goals {
      font-size: 11px;
      width: 20%;
    }
  }
}
</style>
