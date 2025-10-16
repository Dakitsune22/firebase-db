<script setup lang="ts">
import { getAge } from 'src/helpers/functions';
import { Leagues, Player } from 'src/models';
import { Position } from 'src/models/player';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
// import { ref } from 'vue';

interface Props {
  player: Player;
  roundNumber?: number;
  roundGoals?: number;
  roundGoalsConceded?: number;
  urlTeamCrest?: string;
  matchId?: number;
}

const props = defineProps<Props>();
// const props = defineProps<Props>();
// console.log(props.player.surname);
// console.log(props.roundNumber);
// console.log(props.roundGoals);

const route = useRoute();

const isCup = route.name?.toString().includes(Leagues.MyCup);
const isCupSecondLeg = isCup && props.matchId && props.matchId % 2 === 0;

// const player = ref<Player>({ ...props });
// const player = ref<Player>({...props});
const percentPlayedGames = ref<number>(
  ((props.player.seasonStats.playedGames + 1) /
    (props.roundNumber && !isCup
      ? props.roundNumber
      : props.roundNumber && isCup && !isCupSecondLeg
      ? props.roundNumber * 2 - 1
      : props.roundNumber && isCup && isCupSecondLeg
      ? props.roundNumber * 2
      : 0)) *
    100
);
// R1 -> 1 y 2
// R2 -> 3 y 4
// R3 -> 5 y 6
// R4 -> 7 y 8
// R5 -> 9 y 10
// R6 -> 11 y 12
// console.log('Played games:', props.player.seasonStats.playedGames);
// console.log('Round:', props.roundNumber);
// console.log('Match Id:', props.matchId);
// console.log(props.matchId && props.matchId % 2 === 0 ? 'Vuelta' : 'Ida');
</script>

<template>
  <q-card class="main-container">
    <q-card-section class="main-container-section1">
      <div class="main-container-section1-shirt">
        <span class="main-container-section1-shirt-span">#</span>
        {{ player.shirtNumber }}
      </div>
      <div class="main-container-section1-name">
        <div v-if="!player.nickname">
          {{ player.name + ' ' + player.surname }}
        </div>
        <div v-else>{{ player.nickname }}</div>
      </div>
      <div class="main-container-section1-overall">
        <q-badge color="primary" style="font-size: 13px">
          <q-icon
            name="star_rate"
            color="amber-6"
            size="14px"
            style="
              padding-bottom: 2px;
              margin-right: 2px;
              /* background-color: blueviolet;
              border-radius: 50%; */
            "
          />
          {{ player.overall }}
        </q-badge>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="main-container-section2">
      <div
        v-if="urlTeamCrest && urlTeamCrest?.length > 0"
        class="main-container-section2-team"
      >
        <q-img
          :src="urlTeamCrest"
          spinner-color="white"
          width="40px"
          height="40px"
        />
      </div>
      <div class="main-container-section2-position">
        <q-badge outline color="primary" style="font-size: 13px">
          {{ player.position }}
        </q-badge>
      </div>
      <div class="main-container-section2-nationality">
        <q-img
          :src="`/images/flags/h20/${player.nationality}.png`"
          spinner-color="white"
          width="29px"
          height="18px"
          fit="fill"
          style="border: 1px solid rgba(0, 0, 0, 65%)"
        />
      </div>
      <div v-if="player.birthDate" class="main-container-section2-birthDate">
        {{ getAge(player.birthDate) + ' años' }}
      </div>
      <div v-if="player.height" class="main-container-section2-height">
        {{ (player.height / 100).toFixed(2).replace('.', ',') + 'm' }}
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div v-if="roundNumber">
        <div class="main-container-section3 q-pb-xs">
          <span v-if="isCup" class="main-container-section3-span"
            >Estadísticas en copa tras este partido:</span
          >
          <span v-else class="main-container-section3-span"
            >Estadísticas en liga tras
            <span class="main-container-section3-span-round"
              >Jornada {{ roundNumber }}</span
            >:</span
          >
        </div>
        <div class="main-container-section3">
          <q-icon
            name="subdirectory_arrow_right"
            color="primary"
            style="translate: 0px -1px"
          />
          <span class="main-container-section3-span">Partidos disputados:</span>
          <div class="main-container-section3-goals">
            {{ player.seasonStats.playedGames + 1 }}
          </div>
          <!-- <span class="main-container-section3-percent"
            ><span class="text-primary">(</span
            >{{
              ((player.seasonStats.playedGames + 1) / roundNumber) * 100
            }}%<span class="text-primary">)</span></span
          > -->
          <q-knob
            show-value
            font-size="10px"
            v-model="percentPlayedGames"
            size="45px"
            :thickness="0.25"
            color="primary"
            track-color="grey-4"
            center-color="deep-purple-5"
            class="text-white"
            readonly
          >
            {{ Math.round(percentPlayedGames) }}%
          </q-knob>
        </div>
        <div
          v-if="player.position !== Position.POR"
          class="main-container-section3"
        >
          <q-icon
            name="subdirectory_arrow_right"
            color="primary"
            style="translate: 0px -1px"
          />
          <span class="main-container-section3-span">Goles:</span>
          <div class="main-container-section3-goals">
            {{ player.seasonStats.goals + (roundGoals || 0) }}
          </div>
          <span
            v-if="player.seasonStats.goals + (roundGoals || 0) > 0"
            class="main-container-section3-percent"
            ><span class="text-primary">(</span
            >{{
              (
                (player.seasonStats.goals + (roundGoals || 0)) /
                (player.seasonStats.playedGames + 1)
              )
                .toFixed(2)
                .replace('.', ',')
            }}
            p.p.<span class="text-primary">)</span></span
          >
        </div>
        <div v-else class="main-container-section3">
          <q-icon
            name="subdirectory_arrow_right"
            color="primary"
            style="translate: 0px -1px"
          />
          <span class="main-container-section3-span">Goles encajados:</span>
          <div class="main-container-section3-goals">
            {{ player.seasonStats.goalsConceded + (roundGoalsConceded || 0) }}
          </div>
          <span
            v-if="
              player.seasonStats.goalsConceded + (roundGoalsConceded || 0) > 0
            "
            class="main-container-section3-percent"
            ><span class="text-primary">(</span
            >{{
              (
                (player.seasonStats.goalsConceded + (roundGoalsConceded || 0)) /
                (player.seasonStats.playedGames + 1)
              )
                .toFixed(2)
                .replace('.', ',')
            }}
            p.p.<span class="text-primary">)</span></span
          >
        </div>
      </div>
      <div v-else>
        <div class="main-container-section3 q-pb-xs">
          <span v-if="isCup" class="main-container-section3-span"
            >Estadísticas totales en copa:</span
          >
          <span v-else class="main-container-section3-span"
            >Estadísticas totales en liga:</span
          >
        </div>
        <div class="main-container-section3">
          <q-icon
            name="subdirectory_arrow_right"
            color="primary"
            style="translate: 0px -1px"
          />
          <span class="main-container-section3-span">Partidos disputados:</span>
          <div class="main-container-section3-goals">
            {{ player.seasonStats.playedGames }}
          </div>
        </div>
        <div class="main-container-section3">
          <q-icon
            name="subdirectory_arrow_right"
            color="primary"
            style="translate: 0px -1px"
          />
          <span class="main-container-section3-span">Goles:</span>
          <div class="main-container-section3-goals">
            {{ player.seasonStats.goals }}
          </div>
          <span
            v-if="player.seasonStats.goals > 0"
            class="main-container-section3-percent"
            ><span class="text-primary">(</span
            >{{
              (player.seasonStats.goals / player.seasonStats.playedGames)
                .toFixed(2)
                .replace('.', ',')
            }}
            p.p.<span class="text-primary">)</span></span
          >
        </div>
        <!-- <div v-else class="main-container-section3">
          <q-icon
            name="subdirectory_arrow_right"
            color="primary"
            style="translate: 0px -1px"
          />
          <span class="main-container-section3-span">Goles encajados:</span>
          <div class="main-container-section3-goals">
            {{ player.seasonStats.goalsConceded }}
          </div>
        </div> -->
      </div>
    </q-card-section>
    <q-card-section class="main-container-section4">
      <q-icon name="info" size="16px" />
      <div>Clica en esta ventana para cerrar</div>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
$darkGrey: rgba(42, 42, 42, 0.692);

.main-container {
  max-width: 380px;
  max-height: 300px;
  background-color: lightgrey;
  cursor: pointer;

  &-section1 {
    @include flexPosition(start, center);
    gap: 10px;
    font-size: 16px;

    &-shirt {
      //   background-color: aqua;
      &-span {
        color: $primary;
      }
    }
    // &-name {
    //   background-color: aqua;
    // }
    &-overall {
      //   background-color: aqua;
      @include flexPosition(center, center);
      margin-left: 5px;
    }
  }
  &-section2 {
    @include flexPosition(start, center);
    gap: 12px;
    font-size: 13px;
    margin-right: 5px;

    &-team {
      margin-right: 2px;
    }
    &-position {
      //   background-color: aqua;
      //   @include flexPosition(center, center);
      //   font-size: 18px;
      margin-right: 3px;
    }
    &-nationality {
      margin-bottom: 2px;
    }
  }
  &-section3 {
    @include flexPosition(start, center);
    // font-size: 15px;
    gap: 12px;

    &-span {
      // padding-top: 2px;
      font-size: 13px;
      // padding-top: 3px;

      &-round {
        color: $primary;
        font-size: 12px;
        padding-left: 1px;
        padding-right: 2px;
      }
    }
    &-goals {
      color: $primary;
      //   font-weight: bold;
      //   font-size: 16px;
      // padding-top: 3px;
    }
    &-percent {
      color: $darkGrey;
      font-size: 11px;
      padding-top: 2px;
    }
  }
  &-section4 {
    @include flexPosition(center, center);
    gap: 5px;
    font-size: 11px;
    color: $darkGrey;
  }
}

.my-knob {
  border: 1px solid $primary;
  border-radius: 50%;
}
</style>
