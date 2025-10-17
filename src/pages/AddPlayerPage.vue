<script setup lang="ts">
import { ref } from 'vue';
// import { useQuasar } from 'quasar';
import { type Player, Flag, Position } from 'src/models/player';
import useTeams from 'src/composables/useTeams';
import useSoccer from 'src/composables/storeWrappers/useSoccer';

defineOptions({
  name: 'AddPlayerPage',
});

const { getCurrentLeague } = useSoccer();
const { queryTeamsByPoints } = useTeams(getCurrentLeague());

// const $q = useQuasar();
const player = ref<Player>({
  name: '',
  surname: '',
  nickname: '',
  shirtNumber: 1,
  nationality: Flag.Spain,
  position: Position.POR,
  overall: 75,
  seasonStats: {
    playedGames: 0,
    cleanSheets: 0,
    goalsConceded: 0,
    goals: 0,
    assists: 0,
    injured: 0,
  },
  teamId: 0,
});

const selectedTeamId = ref<number>(0);
const positionOptions = Object.values(Position);
const nationalityOptions = Object.values(Flag);

const onSubmit = () => {
  //   if (accept.value !== true) {
  //     $q.notify({
  //       color: 'red-5',
  //       textColor: 'white',
  //       icon: 'warning',
  //       message: 'You need to accept the license and terms first',
  //     });
  //   } else {
  //     $q.notify({
  //       color: 'green-4',
  //       textColor: 'white',
  //       icon: 'cloud_done',
  //       message: 'Submitted',
  //     });
  //   }
};

const onReset = () => {
  player.value = {
    name: '',
    surname: '',
    nickname: '',
    shirtNumber: 1,
    nationality: Flag.Spain,
    position: Position.POR,
    overall: 75,
    seasonStats: {
      playedGames: 0,
      cleanSheets: 0,
      goalsConceded: 0,
      goals: 0,
      assists: 0,
      injured: 0,
    },
    teamId: 0,
  };
};
</script>

<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-select
        filled
        v-model="selectedTeamId"
        :options="queryTeamsByPoints.data.value"
        option-value="id"
        option-label="name"
        options-dense
        label="Equipo"
        emit-value
        map-options
        @update:model-value="
          (value) => {
            console.log(value);
          }
        "
      />
      <q-input
        filled
        hide-bottom-space
        v-model="player.name"
        label="Nombre *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
      />
      <q-input
        filled
        hide-bottom-space
        v-model="player.surname"
        label="Apellido *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
      />
      <q-input filled v-model="player.nickname" label="Alias" />
      <q-input
        filled
        hide-bottom-space
        v-model="player.shirtNumber"
        label="Dorsal"
        type="number"
        lazy-rules
        :rules="[
          (val) =>
            (val && val > 0 && val <= 49) ||
            'El dorsal ha de estar entre 1 y 49',
        ]"
      />
      <div class="row-elements">
        <q-select
          filled
          v-model="player.position"
          :options="positionOptions"
          options-dense
          label="Posición"
          class="small-option-box"
        />
        <q-select
          filled
          v-model="player.nationality"
          :options="nationalityOptions"
          options-dense
          label="Nacionalidad"
          class="small-option-box"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <!-- <q-item-section avatar> -->
              <q-img
                :src="`/images/flags/h24/${scope.opt}.png`"
                spinner-color="white"
                height="24px"
                width="36px"
                fit="contain"
                class="q-mr-md"
              />
              {{ scope.opt }}
              <!-- </q-item-section> -->
            </q-item>
          </template>
        </q-select>
      </div>
      <div>
        <q-badge outline color="primary" class="q-mt-sm">
          Potencial del jugador
        </q-badge>
        <q-slider
          v-model="player.overall"
          :min="50"
          :max="99"
          :color="
            player.overall < 55
              ? 'red-10'
              : player.overall < 60
              ? 'red-8'
              : player.overall < 65
              ? 'red'
              : player.overall < 70
              ? 'yellow-10'
              : player.overall < 75
              ? 'yellow-9'
              : player.overall < 80
              ? 'yellow-8'
              : player.overall < 85
              ? 'green-6'
              : player.overall < 90
              ? 'green-7'
              : player.overall < 95
              ? 'green-8'
              : 'green-9'
          "
          label-always
          :switch-label-side="player.overall < 70 ? true : false"
          :markers="10"
          thumb-size="30px"
          track-size="8px"
        />
      </div>
      <div class="bottom-btn-container">
        <q-btn label="Reset" type="reset" color="primary" flat />
        <q-btn label="Submit" type="submit" color="primary" class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<style lang="scss" scoped>
.small-option-box {
  width: 50%;
}
.row-elements {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
.bottom-btn-container {
  display: flex;
  justify-content: flex-end;
}
</style>
