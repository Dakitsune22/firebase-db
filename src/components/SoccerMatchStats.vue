<script setup lang="ts">
import { ref } from 'vue';
import { Match, Player } from 'src/models';
import SoccerPlayerInfo from './SoccerPlayerInfo.vue';
import useSoccer from 'src/composables/storeWrappers/useSoccer';
import { shortenText } from 'src/helpers/functions';
const { getCurrentRound } = useSoccer();
// import { Flag, Position } from 'src/models/player';
// import { initialSeasonStats } from 'src/data/players-data/initial-season-stats';

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

const showPlayerInfo = ref<boolean>(false);
const playerInfo = ref<Player>();
const isPlayerLocale = ref<boolean>(false);

const onShowPlayerInfo = (selectedPlayer: Player, isLocale: boolean): void => {
  showPlayerInfo.value = true;
  playerInfo.value = selectedPlayer;
  isPlayerLocale.value = isLocale;
};
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
            width="26px"
            height="14px"
            fit="fill"
            style="border: 1px solid rgba(0, 0, 0, 65%)"
          />
          <div class="matchstats-container-player-shirt">
            {{ p.shirtNumber }}
          </div>
          <div class="matchstats-container-player-position">
            {{ p.position }}
          </div>
          <div
            class="matchstats-container-player-name"
            @click="onShowPlayerInfo(p, true)"
          >
            {{
              p.nickname
                ? shortenText(p.nickname, 15)
                : shortenText(p.name.charAt(0) + '. ' + p.surname, 15)
            }}
          </div>
          <div class="matchstats-container-player-overall">
            {{ p.overall }}
          </div>
          <div
            v-if="
              matchRef.scorers1.filter((s) => s === p.shirtNumber).length < 4
            "
            class="matchstats-container-player-goals"
          >
            <q-icon
              v-for="g in matchRef.scorers1.filter((s) => s === p.shirtNumber)
                .length"
              :key="g"
              name="sports_soccer"
              color="grey-9"
            ></q-icon>
          </div>
          <div v-else class="matchstats-container-player-goals">
            <q-icon name="sports_soccer" color="grey-9" />
            <span class="text-grey-9 matchstats-container-player-goals-number"
              ><span style="font-size: 10px">x</span
              >{{
                matchRef.scorers1.filter((s) => s === p.shirtNumber).length
              }}</span
            >
          </div>
        </div>
      </div>
      <q-dialog
        v-if="isPlayerLocale"
        v-model="showPlayerInfo"
        auto-close
        persistent
      >
        <!-- <q-dialog v-model="showPlayerInfo" auto-close seamless> -->
        <!-- <soccer-player-info
          :key="playerInfo?.shirtNumber"
          :shirt-number="playerInfo?.shirtNumber || 99"
          :name="playerInfo?.name || ''"
          :surname="playerInfo?.surname || ''"
          :nickname="playerInfo?.nickname || ''"
          :position="playerInfo?.position || Position.POR"
          :nationality="playerInfo?.nationality || Flag.Spain"
          :overall="playerInfo?.overall || 0"
          :birth-date="playerInfo?.birthDate"
          :height="playerInfo?.height"
          :season-stats="playerInfo?.seasonStats || initialSeasonStats"
          :team-id="playerInfo?.teamId || 0"
        /> -->
        <soccer-player-info
          v-if="playerInfo"
          :key="playerInfo?.shirtNumber"
          :player="playerInfo"
          :round-number="getCurrentRound()"
          :round-goals="
            matchRef.scorers1.filter((s) => s === playerInfo?.shirtNumber)
              .length
          "
          :round-goals-conceded="matchRef.score2"
        />
      </q-dialog>
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
            width="26px"
            height="14px"
            fit="fill"
            style="border: 1px solid rgba(0, 0, 0, 65%)"
          />
          <div class="matchstats-container-player-shirt">
            {{ p.shirtNumber }}
          </div>
          <div class="matchstats-container-player-position">
            {{ p.position }}
          </div>
          <div
            class="matchstats-container-player-name"
            @click="onShowPlayerInfo(p, false)"
          >
            <!-- {{ p.nickname ? p.nickname : p.name.charAt(0) + '. ' + p.surname }} -->
            {{
              p.nickname
                ? shortenText(p.nickname, 15)
                : shortenText(p.name.charAt(0) + '. ' + p.surname, 15)
            }}
          </div>
          <div class="matchstats-container-player-overall">
            {{ p.overall }}
          </div>
          <!-- <div class="matchstats-container-player-goals">
            <q-icon
              v-for="g in matchRef.scorers2.filter((s) => s === p.shirtNumber)
                .length"
              :key="g"
              name="sports_soccer"
              color="grey-9"
            ></q-icon>
          </div> -->
          <div
            v-if="
              matchRef.scorers2.filter((s) => s === p.shirtNumber).length < 4
            "
            class="matchstats-container-player-goals"
          >
            <q-icon
              v-for="g in matchRef.scorers2.filter((s) => s === p.shirtNumber)
                .length"
              :key="g"
              name="sports_soccer"
              color="grey-9"
            ></q-icon>
          </div>
          <div v-else class="matchstats-container-player-goals">
            <q-icon name="sports_soccer" color="grey-9" />
            <span class="text-grey-9 matchstats-container-player-goals-number"
              ><span style="font-size: 10px">x</span
              >{{
                matchRef.scorers2.filter((s) => s === p.shirtNumber).length
              }}</span
            >
          </div>
        </div>
      </div>
      <q-dialog
        v-if="!isPlayerLocale"
        v-model="showPlayerInfo"
        auto-close
        persistent
      >
        <!-- <q-dialog v-model="showPlayerInfo" auto-close seamless> -->
        <!-- <soccer-player-info
          :key="playerInfo?.shirtNumber"
          :shirt-number="playerInfo?.shirtNumber || 99"
          :name="playerInfo?.name || ''"
          :surname="playerInfo?.surname || ''"
          :nickname="playerInfo?.nickname || ''"
          :position="playerInfo?.position || Position.POR"
          :nationality="playerInfo?.nationality || Flag.Spain"
          :overall="playerInfo?.overall || 0"
          :birth-date="playerInfo?.birthDate"
          :height="playerInfo?.height"
          :season-stats="playerInfo?.seasonStats || initialSeasonStats"
          :team-id="playerInfo?.teamId || 0"
        /> -->
        <soccer-player-info
          v-if="playerInfo"
          :key="playerInfo?.shirtNumber"
          :player="playerInfo"
          :round-number="getCurrentRound()"
          :round-goals="
            matchRef.scorers2.filter((s) => s === playerInfo?.shirtNumber)
              .length
          "
          :round-goals-conceded="matchRef.score1"
        />
      </q-dialog>
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
    gap: 4px;

    &-shirt {
      width: 9%;
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
      width: 53%;
      font-size: 11px;
      text-align: left;
      cursor: pointer;
      // background-color: aqua;
    }
    &-overall {
      width: 10%;
      color: $primary;
      font-size: 11px;
      // position: relative;
      // font-weight: 500;
      padding-top: 1px;
      text-align: center;
      // background-color: aqua;
    }
    &-goals {
      font-size: 10px;
      width: 17%;
      // background-color: pink;

      &-number {
        font-size: 12px;
        padding-left: 1px;
      }
    }
  }
}
</style>
