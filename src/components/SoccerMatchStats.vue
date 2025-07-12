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

const ratingTeam1 = ref<number>(
  matchRef.value.startingLineup1.reduce((a, b) => a + b.overall, 0) / 11 / 10
);
const ratingTeam2 = ref<number>(
  matchRef.value.startingLineup2.reduce((a, b) => a + b.overall, 0) / 11 / 10
);
</script>

<template>
  <div class="matchstats-container">
    <div class="matchstats-container-left">
      <div class="matchstats-container-rating">
        <q-rating
          v-model="ratingTeam1"
          size="15px"
          color="amber-11"
          readonly
          icon="star_border"
          icon-selected="star"
          icon-half="star_half"
          max="10"
        />
        <div class="matchstats-container-rating-overall">
          {{
            (
              matchRef.startingLineup1.reduce((a, b) => a + b.overall, 0) / 11
            ).toFixed(1)
          }}
        </div>
      </div>
      <div v-for="p in matchRef.startingLineup1" :key="p.shirtNumber">
        <div class="matchstats-container-player">
          <q-img
            :src="`/images/flags/h20/${p.nationality}.png`"
            spinner-color="white"
            width="27px"
            height="14px"
            style="border: 1px solid rgba(0, 0, 0, 65%)"
          />
          <div class="matchstats-container-player-shirt">
            {{ p.shirtNumber }}
          </div>
          <div class="matchstats-container-player-position">
            {{ p.position }}
          </div>
          <div class="matchstats-container-player-name">
            {{ p.nickname ? p.nickname : p.name.charAt(0) + '. ' + p.surname }}
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
      <div class="matchstats-container-rating">
        <q-rating
          v-model="ratingTeam2"
          size="15px"
          color="amber-11"
          readonly
          icon="star_border"
          icon-selected="star"
          icon-half="star_half"
          max="10"
        />
        <div class="matchstats-container-rating-overall">
          {{
            (
              matchRef.startingLineup2.reduce((a, b) => a + b.overall, 0) / 11
            ).toFixed(1)
          }}
        </div>
      </div>
      <div v-for="p in matchRef.startingLineup2" :key="p.shirtNumber">
        <div class="matchstats-container-player">
          <q-img
            :src="`/images/flags/h20/${p.nationality}.png`"
            spinner-color="white"
            width="27px"
            height="14px"
            style="border: 1px solid rgba(0, 0, 0, 65%)"
          />
          <div class="matchstats-container-player-shirt">
            {{ p.shirtNumber }}
          </div>
          <div class="matchstats-container-player-position">
            {{ p.position }}
          </div>
          <div class="matchstats-container-player-name">
            {{ p.nickname ? p.nickname : p.name.charAt(0) + '. ' + p.surname }}
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
  // padding-top: 4px;
  border: 1px solid $midGrey;
  border-radius: 0.2em;
  margin-top: 1px;
  font-size: 12px;
  // height: 100px;

  &-left {
    width: 50%;
    padding-left: 10px;
    // background-color: aquamarine;
  }
  &-right {
    width: 50%;
    padding-left: 6px;
    // background-color: bisque;
  }

  &-rating {
    @include flexPosition(start, center);
    gap: 8px;
    margin-bottom: 4px;
    font-weight: bold;
    font-size: 14px;
    // background-color: aquamarine;

    &-overall {
      font-size: small;
      font-weight: 400;
      margin-left: 2px;
      padding-top: 1px;
      padding-left: 5px;
      padding-right: 5px;
      border-radius: 10%;
      color: $amber-11;
      background-color: $darkGrey;
    }
  }

  &-player {
    @include flexPosition(start, center);
    // align-items: center;
    gap: 5px;

    &-shirt {
      width: 8%;
      text-align: right;
      font-size: 11px;
      // background-color: aqua;
    }
    &-position {
      width: 11%;
      font-size: 8px;
      text-align: center;
      color: $darkGrey;
      // background-color: antiquewhite;
    }
    &-name {
      width: 55%;
      font-size: 11px;
      text-align: left;
      // background-color: aqua;
    }
    &-overall {
      width: 8%;
      color: $primary;
      font-size: 11px;
      position: relative;
      // font-weight: 500;
      padding-top: 1px;
      text-align: right;
      // background-color: aqua;
    }
    &-goals {
      font-size: 10px;
      width: 18%;
    }
  }
}
</style>
