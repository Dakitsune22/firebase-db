<script setup lang="ts">
import { getAge } from 'src/helpers/functions';
import { Player } from 'src/models';
// import { ref } from 'vue';

interface Props {
  player: Player;
  roundNumber?: number;
  roundGoals?: number;
  urlTeamCrest?: string;
}

defineProps<Props>();
// const props = defineProps<Props>();
// console.log(props.player.surname);
// console.log(props.roundNumber);
// console.log(props.roundGoals);

// const player = ref<Player>({ ...props });
// const player = ref<Player>({...props});
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
          width="27px"
          height="17px"
          style="border: 1px solid rgba(0, 0, 0, 65%)"
        />
      </div>
      <div v-if="player.birthDate" class="main-container-section2-birthDate">
        {{ getAge(player.birthDate) + ' años' }}
      </div>
      <div v-if="player.height" class="main-container-section2-height">
        {{ (player.height / 100).toFixed(2) + 'm' }}
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div v-if="roundNumber" class="main-container-section3">
        <span class="main-container-section3-span"
          >Goles hasta la jornada {{ roundNumber }}:</span
        >
        <div class="main-container-section3-goals">
          {{ player.seasonStats.goals + (roundGoals || 0) }}
        </div>
      </div>
      <div v-else class="main-container-section3">
        <span class="main-container-section3-span">Goles esta temporada:</span>
        <div class="main-container-section3-goals">
          {{ player.seasonStats.goals }}
        </div>
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
  }
  &-section3 {
    @include flexPosition(start, center);
    gap: 12px;

    &-span {
      font-size: 13px;
    }
    &-goals {
      color: $primary;
      //   font-weight: bold;
      //   font-size: 16px;
    }
  }
  &-section4 {
    @include flexPosition(center, center);
    gap: 5px;
    font-size: 11px;
    color: $darkGrey;
  }
}
</style>
