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
  substitutes1: props.substitutes1,
  substitutes2: props.substitutes2,
  scorers1: props.scorers1,
  scorers2: props.scorers2,
  assistants1: props.assistants1,
  assistants2: props.assistants2,
  mvp: props.mvp,
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
const showMvpIcon = ref<boolean>(false);

const onShowPlayerInfo = (selectedPlayer: Player, isLocale: boolean): void => {
  showPlayerInfo.value = true;
  playerInfo.value = selectedPlayer;
  isPlayerLocale.value = isLocale;
};

const fullLineup1 = props.startingLineup1.concat(props.substitutes1);
const fullLineup2 = props.startingLineup2.concat(props.substitutes2);
// console.log('SoccerMatchStats s1:', matchRef.value.scorers1);
// console.log('SoccerMatchStats a1:', matchRef.value.assistants1);

setInterval(() => (showMvpIcon.value = !showMvpIcon.value), 3000);
</script>

<template>
  <div class="matchstats-container">
    <div class="matchstats-container-left">
      <div class="matchstats-container-rating">
        <q-rating
          v-model="ratingTeam1"
          size="15px"
          color="amber-12"
          readonly
          icon="star_border"
          icon-selected="star"
          icon-half="star_half"
          max="10"
        />
        <div class="matchstats-container-rating-overall">
          {{
            (matchRef.startingLineup1.reduce((a, b) => a + b.overall, 0) / 11)
              .toFixed(1)
              .replace('.', ',')
          }}
        </div>
      </div>
      <!-- <div v-for="p in matchRef.startingLineup1" :key="p.shirtNumber"> -->
      <div v-for="(p, idx) in fullLineup1" :key="p.shirtNumber">
        <div
          v-if="idx === matchRef.startingLineup1.length"
          class="text-primary q-pt-xs"
        >
          Sustituciones:
        </div>
        <div class="matchstats-container-player">
          <q-img
            :src="`/images/flags/h20/${p.nationality}.png`"
            spinner-color="white"
            width="26px"
            height="14px"
            fit="fill"
            style="border: 1px solid rgba(0, 0, 0, 65%)"
          />
          <div
            class="matchstats-container-player-shirt"
            :class="
              matchRef.mvp.playerId === p.shirtNumber &&
              matchRef.mvp.playerTeamId === matchRef.team1 &&
              showMvpIcon
                ? 'text-primary'
                : ''
            "
          >
            {{ p.shirtNumber }}
          </div>
          <div class="matchstats-container-player-position">
            <q-icon
              v-if="
                matchRef.mvp.playerId === p.shirtNumber &&
                matchRef.mvp.playerTeamId === matchRef.team1 &&
                showMvpIcon
              "
              name="star"
              color="primary"
              size="14px"
              style="translate: 0px -1px"
            >
            </q-icon>
            <!-- <Transition name="mvp">
              <div
                v-if="
                  matchRef.mvp.playerId === p.shirtNumber &&
                  matchRef.mvp.playerTeamId === matchRef.team1 &&
                  showMvpIcon
                "
              >
                <span style="font-size: 11px">⭐</span>
              </div>
              <div v-else>
                {{ p.position }}
              </div>
            </Transition> -->
            <!-- <div
              v-if="
                matchRef.mvp.playerId === p.shirtNumber &&
                matchRef.mvp.playerTeamId === matchRef.team1 &&
                showMvpIcon
              "
            >
              <span style="font-size: 11px">⭐</span>
            </div> -->
            <div v-else>
              {{ p.position }}
            </div>
          </div>
          <div
            class="matchstats-container-player-name"
            :class="
              matchRef.mvp.playerId === p.shirtNumber &&
              matchRef.mvp.playerTeamId === matchRef.team1 &&
              showMvpIcon
                ? 'text-primary'
                : ''
            "
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
          <div class="matchstats-container-player-goals">
            <!-- <q-icon
              v-for="g in matchRef.scorers1.filter((s) => s === p.shirtNumber)
                .length"
              :key="g"
              name="sports_soccer"
              color="grey-9"
            >
              <q-badge color="orange">{{
                matchRef.scorers1.filter((s) => s === p.shirtNumber).length
              }}</q-badge>
            </q-icon> -->
            <q-btn
              v-if="
                matchRef.scorers1.filter((s) => s === p.shirtNumber).length > 0
              "
              icon="sports_soccer"
              color="grey-9"
              size="7px"
              dense
              flat
              style="cursor: default; translate: -2px 0px; z-index: 1"
            >
              <q-badge
                v-if="
                  matchRef.scorers1.filter((s) => s === p.shirtNumber).length >
                  1
                "
                style="
                  zoom: 65%;
                  font-size: 14px;
                  padding-top: 3px;
                  padding-bottom: 2px;
                  padding-left: 4px;
                  padding-right: 4px;
                  translate: 3px 0px;
                  z-index: 2;
                "
                floating
                color="negative"
                >{{
                  matchRef.scorers1.filter((s) => s === p.shirtNumber).length
                }}</q-badge
              >
            </q-btn>
            <q-btn
              v-if="
                matchRef.assistants1.filter((a) => a === p.shirtNumber).length >
                0
              "
              icon="hdr_auto"
              color="grey-9"
              size="7px"
              dense
              flat
              style="cursor: default; translate: -2px 0px; z-index: 1"
            >
              <q-badge
                v-if="
                  matchRef.assistants1.filter((a) => a === p.shirtNumber)
                    .length > 1
                "
                style="
                  zoom: 65%;
                  font-size: 14px;
                  padding-top: 3px;
                  padding-bottom: 2px;
                  padding-left: 4px;
                  padding-right: 4px;
                  translate: 3px 0px;
                  z-index: 2;
                "
                floating
                color="negative"
                >{{
                  matchRef.assistants1.filter((a) => a === p.shirtNumber).length
                }}</q-badge
              >
            </q-btn>
          </div>
          <!-- <div v-else class="matchstats-container-player-goals">
            <q-icon name="sports_soccer" color="grey-9" />
            <span class="text-grey-9 matchstats-container-player-goals-number"
              ><span style="font-size: 10px">x</span
              >{{
                matchRef.scorers1.filter((s) => s === p.shirtNumber).length
              }}</span
            >
          </div> -->
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
          :round-assists="
            matchRef.assistants1.filter((a) => a === playerInfo?.shirtNumber)
              .length
          "
          :round-substitute="
            matchRef.substitutes1.findIndex(
              (sp) => sp.shirtNumber === playerInfo?.shirtNumber
            ) >= 0
          "
          :round-mvp="
            matchRef.mvp.playerId === playerInfo.shirtNumber &&
            matchRef.mvp.playerTeamId === matchRef.team1
          "
          :match-id="matchRef.id"
        />
      </q-dialog>
    </div>
    <div class="matchstats-container-right">
      <div class="matchstats-container-rating">
        <q-rating
          v-model="ratingTeam2"
          size="15px"
          color="amber-12"
          readonly
          icon="star_border"
          icon-selected="star"
          icon-half="star_half"
          max="10"
        />
        <div class="matchstats-container-rating-overall">
          {{
            (matchRef.startingLineup2.reduce((a, b) => a + b.overall, 0) / 11)
              .toFixed(1)
              .replace('.', ',')
          }}
        </div>
      </div>
      <div v-for="(p, idx) in fullLineup2" :key="p.shirtNumber">
        <div
          v-if="idx === matchRef.startingLineup2.length"
          class="text-primary q-pt-xs"
        >
          Sustituciones:
        </div>
        <div class="matchstats-container-player">
          <q-img
            :src="`/images/flags/h20/${p.nationality}.png`"
            spinner-color="white"
            width="26px"
            height="14px"
            fit="fill"
            style="border: 1px solid rgba(0, 0, 0, 65%)"
          />
          <div
            class="matchstats-container-player-shirt"
            :class="
              matchRef.mvp.playerId === p.shirtNumber &&
              matchRef.mvp.playerTeamId === matchRef.team2 &&
              showMvpIcon
                ? 'text-primary'
                : ''
            "
          >
            {{ p.shirtNumber }}
          </div>
          <div class="matchstats-container-player-position">
            <q-icon
              v-if="
                matchRef.mvp.playerId === p.shirtNumber &&
                matchRef.mvp.playerTeamId === matchRef.team2 &&
                showMvpIcon
              "
              name="star"
              color="primary"
              size="14px"
              style="translate: 0px -1px"
            >
            </q-icon>
            <!-- <div
              v-if="
                matchRef.mvp.playerId === p.shirtNumber &&
                matchRef.mvp.playerTeamId === matchRef.team2 &&
                showMvpIcon
              "
            >
              <span style="font-size: 11px">⭐</span>
            </div> -->
            <div v-else>
              {{ p.position }}
            </div>
          </div>
          <div
            class="matchstats-container-player-name"
            :class="
              matchRef.mvp.playerId === p.shirtNumber &&
              matchRef.mvp.playerTeamId === matchRef.team2 &&
              showMvpIcon
                ? 'text-primary'
                : ''
            "
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
          <div class="matchstats-container-player-goals">
            <!-- <q-icon
              v-for="g in matchRef.scorers2.filter((s) => s === p.shirtNumber)
                .length"
              :key="g"
              name="sports_soccer"
              color="grey-9"
            ></q-icon> -->
            <q-btn
              v-if="
                matchRef.scorers2.filter((s) => s === p.shirtNumber).length > 0
              "
              icon="sports_soccer"
              color="grey-9"
              size="7px"
              dense
              flat
              style="cursor: default; translate: -2px 0px; z-index: 1"
            >
              <q-badge
                v-if="
                  matchRef.scorers2.filter((s) => s === p.shirtNumber).length >
                  1
                "
                style="
                  zoom: 65%;
                  font-size: 14px;
                  padding-top: 3px;
                  padding-bottom: 2px;
                  padding-left: 4px;
                  padding-right: 4px;
                  translate: 3px 0px;
                  z-index: 2;
                "
                floating
                color="negative"
                >{{
                  matchRef.scorers2.filter((s) => s === p.shirtNumber).length
                }}</q-badge
              >
            </q-btn>
            <q-btn
              v-if="
                matchRef.assistants2.filter((a) => a === p.shirtNumber).length >
                0
              "
              icon="hdr_auto"
              color="grey-9"
              size="7px"
              dense
              flat
              style="cursor: default; translate: -2px 0px; z-index: 1"
              :style="
                matchRef.scorers2.filter((s) => s === p.shirtNumber).length > 0
                  ? 'translate: -3px 0px;'
                  : ''
              "
            >
              <q-badge
                v-if="
                  matchRef.assistants2.filter((a) => a === p.shirtNumber)
                    .length > 1
                "
                style="
                  zoom: 65%;
                  font-size: 14px;
                  padding-top: 3px;
                  padding-bottom: 2px;
                  padding-left: 4px;
                  padding-right: 4px;
                  translate: 3px 0px;
                  z-index: 2;
                "
                floating
                color="negative"
                >{{
                  matchRef.assistants2.filter((a) => a === p.shirtNumber).length
                }}</q-badge
              >
            </q-btn>
          </div>
          <!-- <div v-else class="matchstats-container-player-goals">
            <q-icon name="sports_soccer" color="grey-9" />
            <span class="text-grey-9 matchstats-container-player-goals-number"
              ><span style="font-size: 10px">x</span
              >{{
                matchRef.scorers2.filter((s) => s === p.shirtNumber).length
              }}</span
            >
          </div> -->
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
          :round-assists="
            matchRef.assistants2.filter((a) => a === playerInfo?.shirtNumber)
              .length
          "
          :round-substitute="
            matchRef.substitutes2.findIndex(
              (sp) => sp.shirtNumber === playerInfo?.shirtNumber
            ) >= 0
          "
          :round-mvp="
            matchRef.mvp.playerId === playerInfo.shirtNumber &&
            matchRef.mvp.playerTeamId === matchRef.team2
          "
          :match-id="matchRef.id"
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
  background-color: lighten($color: lightgrey, $amount: 6%);
  padding: 6px;
  // padding-top: 4px;
  border: 1px solid $midGrey;
  border-radius: 0.2em;
  margin-top: -1px;
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
      color: $amber-12;
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
      max-height: 16px;
      font-size: 8px;
      text-align: center;
      color: $darkGrey;
      // background-color: antiquewhite;
    }
    &-name {
      width: 55%;
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
      @include flexPosition(start, center);
      font-size: 10px;
      // width: 17%;
      width: 40px;
      // background-color: pink;

      &-number {
        font-size: 11px;
        padding-left: 1px;
        // translate: 0p 12px;
        // background-color: aqua;
      }
    }
  }
}
/* Transition */
.mvp-enter-active,
.mvp-leave-active {
  // transform: translateX(-50px) translateY(-10px);
  transition: all 0.25s ease-in;
}
.mvp-enter-from {
  opacity: 0;
  // transform: translateY(15px);
  transform: translateY(8px);
}
.mvp-leave-to {
  opacity: 0;
  transform: translateY(-18px);
}
// .mvp-move {
//   transition: all 1s ease;
// }
</style>
