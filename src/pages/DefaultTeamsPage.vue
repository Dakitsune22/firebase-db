<script setup lang="ts">
import useDefaultTeams from 'src/composables/useDefaultTeams';
import useDefaultTeamsMutation from 'src/composables/useDefaultTeamsMutation';
import { tactics } from 'src/data/tactics';
import {
  teamsEngland1,
  teamsFrance1,
  teamsGermany1,
  teamsItaly1,
  teamsSpain1,
} from 'src/data/teams';
import { Leagues, Team, Player } from 'src/models';
import { Flag, flagMap, Position } from 'src/models/player';
import { Tactic, TacticList } from 'src/models/tactic';
import { computed, ref } from 'vue';

const selectedLeague = ref<Leagues>(Leagues.PremierLeague);
const selectedTeamId = ref<number>(0);
const selectedTeamData = ref<Team>({
  draws: 0,
  goalDifference: 0,
  goalsConceded: 0,
  goalsScored: 0,
  id: 0,
  losses: 0,
  matchesPlayed: 0,
  name: '',
  points: 0,
  wins: 0,
  tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
  players: [],
});

const { queryTeams: queryTeamsSpain1 } = useDefaultTeams(
  Leagues.LaLigaPrimeraDivision
);
const { queryTeams: queryTeamsEngland1 } = useDefaultTeams(
  Leagues.PremierLeague
);
const { queryTeams: queryTeamsGermany1 } = useDefaultTeams(Leagues.Bundesliga);
const { queryTeams: queryTeamsItaly1 } = useDefaultTeams(Leagues.SerieA);
const { queryTeams: queryTeamsFrance1 } = useDefaultTeams(Leagues.Ligue1);
const { mutateTeamAdd, mutateTeamUpdate } = useDefaultTeamsMutation();

// const nationalityOptions = Object.values(Flag);
// interface nacOptions {
//   value: string;
//   label: string;
// }
const nationalityOptions: string[] = [];
flagMap.keys().forEach((k) => nationalityOptions.push(k));
// console.log(nationalityOptions);
// const nationalityOptions: nacOptions[] = [];
// flagMap
//   .entries()
//   .forEach((e) => nationalityOptions.push({ value: e[0], label: e[1] }));
// console.log(nationalityOptions);

const positionOptions = Object.values(Position);

const currentTeams = computed(() => {
  console.log(selectedLeague.value);
  switch (selectedLeague.value) {
    case Leagues.LaLigaPrimeraDivision:
      return queryTeamsSpain1;
    case Leagues.PremierLeague:
      return queryTeamsEngland1;
    case Leagues.Bundesliga:
      return queryTeamsGermany1;
    case Leagues.SerieA:
      return queryTeamsItaly1;
    case Leagues.Ligue1:
      return queryTeamsFrance1;
    default:
      return queryTeamsSpain1;
  }
});

// const currentTeamData = computed(() => {
//   let team: Team;
//   if (currentTeams.value.data.value) {
//     team = currentTeams.value.data.value[
//                   currentTeams.value.data.value.findIndex(
//                     (t) => t.id === selectedTeamId.value
//                   )
//                 ];
//   }
//   return team;
// })

const options = ref([
  {
    label: 'La Liga Primera Division',
    value: Leagues.LaLigaPrimeraDivision,
  },
  {
    label: 'Premier League',
    value: Leagues.PremierLeague,
  },
  {
    label: 'Bundesliga',
    value: Leagues.Bundesliga,
  },
  {
    label: 'Serie A',
    value: Leagues.SerieA,
  },
  {
    label: 'Ligue 1',
    value: Leagues.Ligue1,
  },
]);

// interface Columns {
//   name: string;
//   label: string;
//   field: string;
//   align?: string;
// }

// const tableColumns: Columns[] = [
//   { name: 'shirtNumber', label: '#', align: 'center', field: 'shirtNumber' },
//   { name: 'name', label: 'Nombre', align: 'center', field: 'name' },
//   { name: 'surname', label: 'Apellido', align: 'center', field: 'surname' },
//   { name: 'nickname', label: 'Apodo', align: 'center', field: 'nickname' },
//   {
//     name: 'nationality',
//     label: 'Nac.',
//     align: 'center',
//     field: 'nationality',
//   },
//   { name: 'position', label: 'Pos.', align: 'center', field: 'position' },
//   { name: 'overall', label: 'Pot.', align: 'center', field: 'overall' },
// ];

const columns = [
  {
    name: 'shirtNumber',
    label: '#',
    align: 'center',
    field: 'shirtNumber',
    sortable: true,
  },
  {
    name: 'name',
    label: 'Nombre',
    align: 'center',
    field: 'name',
    sortable: true,
  },
  {
    name: 'surname',
    label: 'Apellido',
    align: 'center',
    field: 'surname',
    sortable: true,
  },
  { name: 'nickname', label: 'Apodo', align: 'center', field: 'nickname' },
  {
    name: 'nationality',
    label: 'Nac.',
    align: 'center',
    field: 'nationality',
  },
  {
    name: 'position',
    label: 'Pos.',
    align: 'center',
    field: 'position',
    sortable: true,
  },
  {
    name: 'overall',
    label: 'Pot.',
    align: 'center',
    field: 'overall',
    sortable: true,
  },
];

const errorShirtNumber = ref(false);
const errorShirtNumberMessage = ref('');

const shirtNumberRangeValidation = (val: number): boolean => {
  console.log(val);
  if (
    selectedTeamData.value.players.findIndex((p) => p.shirtNumber === val) >= 0
  ) {
    errorShirtNumber.value = true;
    errorShirtNumberMessage.value = `El dorsal (${val}) ya está asignado`;
    return false;
  } else if (val < 1 || val >= 100) {
    errorShirtNumber.value = true;
    errorShirtNumberMessage.value =
      'El dorsal debe estar comprendido entre 1 y 99';
    return false;
  } else {
    errorShirtNumber.value = false;
    errorShirtNumberMessage.value = '';
    return true;
  }
};

const shirtNumberErrorReset = (): void => {
  errorShirtNumber.value = false;
  errorShirtNumberMessage.value = '';
};

const errorOverall = ref(false);
const errorOverallMessage = ref('');

const overallRangeValidation = (val: number): boolean => {
  if (val < 50 || val >= 100) {
    errorOverall.value = true;
    errorOverallMessage.value =
      'El potencial del jugador debe estar entre 50 y 99';
    return false;
  } else {
    errorOverall.value = false;
    errorOverallMessage.value = '';
    return true;
  }
};

const onRestoreTeams = () => {
  console.log(selectedLeague.value);

  switch (selectedLeague.value) {
    case Leagues.LaLigaPrimeraDivision:
      teamsSpain1.forEach((team) => {
        mutateTeamAdd.mutate({
          league: selectedLeague.value,
          id: team.id,
        });
      });
      break;

    case Leagues.PremierLeague:
      teamsEngland1.forEach((team) => {
        mutateTeamAdd.mutate({
          league: selectedLeague.value,
          id: team.id,
        });
      });
      break;

    case Leagues.Bundesliga:
      teamsGermany1.forEach((team) => {
        mutateTeamAdd.mutate({
          league: selectedLeague.value,
          id: team.id,
        });
      });
      break;

    case Leagues.SerieA:
      teamsItaly1.forEach((team) => {
        mutateTeamAdd.mutate({
          league: selectedLeague.value,
          id: team.id,
        });
      });
      break;

    case Leagues.Ligue1:
      teamsFrance1.forEach((team) => {
        mutateTeamAdd.mutate({
          league: selectedLeague.value,
          id: team.id,
        });
      });
      break;
  }
};

const updateSelectedTeamData = (): void => {
  if (currentTeams.value.data.value) {
    selectedTeamData.value =
      currentTeams.value.data.value[
        currentTeams.value.data.value.findIndex(
          (t) => t.id === selectedTeamId.value
        )
      ];

    const playersToUpdate: Player[] = [];
    selectedTeamData.value.players.forEach((player) => {
      playersToUpdate.push({ ...player });
    });

    selectedTeamData.value = {
      ...selectedTeamData.value,
      players: playersToUpdate,
    };
  }
};

const onChangeNameClick = (playerIdx: number) => {
  // selectedTeamData.value.players[playerIdx] = {
  //   name: 'xxx',
  //   nationality: selectedTeamData.value.players[playerIdx].nationality,
  //   overall: selectedTeamData.value.players[playerIdx].overall,
  //   position: selectedTeamData.value.players[playerIdx].position,
  //   seasonStats: selectedTeamData.value.players[playerIdx].seasonStats,
  //   shirtNumber: selectedTeamData.value.players[playerIdx].shirtNumber,
  //   surname: selectedTeamData.value.players[playerIdx].surname,
  //   teamId: selectedTeamData.value.players[playerIdx].teamId,
  //   nickname: selectedTeamData.value.players[playerIdx].nickname,
  // };

  const playerToUpdate: Player = {
    ...selectedTeamData.value.players[playerIdx],
    name: 'Updated-Name',
  };

  const updatedPlayers = selectedTeamData.value.players.map((p) =>
    p.shirtNumber !== playerToUpdate.shirtNumber ? p : playerToUpdate
  );

  // console.log(updatedPlayers);

  selectedTeamData.value = {
    ...selectedTeamData.value,
    players: updatedPlayers,
  };
  console.log(selectedTeamData.value);

  // selectedTeamData.value.players[playerIdx].name = 'ZzZzZ';
  // console.log(selectedTeamData.value.players[playerIdx].name);

  // selectedTeamData.value.players.splice(playerIdx, 1, xxx);

  // console.log(selectedTeamData.value.players[playerIdx]);
};

const onSubmit = () => {
  console.log('To Do: On submit');
  mutateTeamUpdate.mutate({
    league: selectedLeague.value,
    id: selectedTeamId.value,
    team: selectedTeamData.value,
  });
};

const onReset = () => {
  console.log('To Do: On reset');
};
</script>

<template>
  <div class="header">
    <q-btn label="Restore teams" color="primary" flat @click="onRestoreTeams" />
  </div>
  <div>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-select
        filled
        v-model="selectedLeague"
        :options="options"
        option-value="value"
        option-label="label"
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
      <q-select
        filled
        v-model="selectedTeamId"
        :options="currentTeams.data.value"
        option-value="id"
        option-label="name"
        options-dense
        label="Equipo"
        emit-value
        map-options
        @update:model-value="
          (value) => {
            console.log(value);
            updateSelectedTeamData();
            // if (currentTeams.data.value) {
            //   selectedTeamData =
            //     currentTeams.data.value[
            //       currentTeams.data.value.findIndex(
            //         (t) => t.id === selectedTeamId
            //       )
            //     ];
            // }
          }
        "
      />
      <div class="btn-container">
        <q-btn label="Reset" type="reset" color="primary" flat />
        <q-btn label="Submit" type="submit" color="primary" class="q-ml-sm" />
      </div>
    </q-form>
    <!-- <div v-for="team in currentTeams.data.value" :key="team.id">
      <div v-for="player in team.players" :key="player.shirtNumber">
        {{ player.name + player.surname }}
      </div>
    </div> -->
    <div v-if="currentTeams.data.value">
      <!-- <div
        v-for="player in currentTeams.data.value[
          currentTeams.data.value.findIndex((t) => t.id === selectedTeamId)
        ].players"
        :key="player.shirtNumber"
      >
        {{ player.name + player.surname }}
      </div> -->
      <div
        v-for="(player, idx) in selectedTeamData?.players"
        :key="player.shirtNumber"
      >
        {{
          player.shirtNumber +
          ' ' +
          player.name +
          ' ' +
          player.surname +
          ' ' +
          player.overall +
          ' ' +
          player.nationality +
          ' ' +
          player.position
        }}
        <q-btn
          label="Change name"
          color="primary"
          @click="onChangeNameClick(idx)"
          flat
        />
      </div>
    </div>
    <div>
      <q-table
        :rows="selectedTeamData.players"
        :columns="columns"
        :title="`Plantilla del ${selectedTeamData.name}`"
        row-key="shirtNumber"
        dense
        bordered
        rows-per-page-label="Número de jugadores por página"
        :rows-per-page-options="[10, 20, 0]"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="shirtNumber" :props="props">
              {{ props.row.shirtNumber }}
              <q-popup-edit
                v-model.number="props.row.shirtNumber"
                buttons
                label-set="Guardar"
                label-cancel="Cerrar"
                :validate="shirtNumberRangeValidation"
                @before-show="shirtNumberErrorReset"
                @update:model-value="shirtNumberRangeValidation"
                v-slot="scope"
              >
                <q-badge outline color="primary" class="q-mt-sm">
                  Dorsal
                </q-badge>
                <q-input
                  type="number"
                  v-model.number="scope.value"
                  hint="Introduce el dorsal del jugador. (Valores permitidos: del 1 al 99)"
                  bottom-slots
                  :error="errorShirtNumber"
                  :error-message="
                    errorShirtNumber ? errorShirtNumberMessage : ''
                  "
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="name" :props="props">
              {{ props.row.name }}
              <q-popup-edit
                v-model.number="props.row.name"
                buttons
                label-set="Guardar"
                label-cancel="Cerrar"
                v-slot="scope"
              >
                <q-badge outline color="primary" class="q-mt-sm">
                  Nombre
                </q-badge>
                <q-input
                  type="text"
                  v-model.number="scope.value"
                  hint="Introduce el nombre del jugador"
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="surname" :props="props">
              {{ props.row.surname }}
              <q-popup-edit
                v-model.number="props.row.surname"
                buttons
                label-set="Guardar"
                label-cancel="Cerrar"
                v-slot="scope"
              >
                <q-badge outline color="primary" class="q-mt-sm">
                  Apellido
                </q-badge>
                <q-input
                  type="text"
                  v-model.number="scope.value"
                  hint="Introduce el apellido del jugador"
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="nickname" :props="props">
              {{ props.row.nickname }}
              <q-popup-edit
                v-model.number="props.row.nickname"
                buttons
                label-set="Guardar"
                label-cancel="Cerrar"
                v-slot="scope"
              >
                <q-badge outline color="primary" class="q-mt-sm">
                  Apodo
                </q-badge>
                <q-input
                  type="text"
                  v-model.number="scope.value"
                  hint="Introduce el apodo del jugador (opcional)"
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="nationality" :props="props">
              <!-- {{ props.row.nationality }} -->
              <q-img
                :src="`/images/flags/h20/${props.row.nationality}.png`"
                spinner-color="white"
                width="27px"
                height="17px"
                style="border: 1px solid rgba(0, 0, 0, 65%); cursor: pointer"
              />
              <q-popup-edit
                v-model.number="props.row.nationality"
                v-slot="scope"
              >
                <q-badge outline color="primary" class="q-mt-sm">
                  Nacionalidad
                </q-badge>
                <q-select
                  v-model="props.row.nationality"
                  :options="nationalityOptions"
                  options-dense
                  dense
                  @update:model-value="scope.set"
                >
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-img
                        :src="`/images/flags/h24/${scope.opt}.png`"
                        spinner-color="white"
                        height="24px"
                        width="42px"
                        class="q-mr-sm"
                        style="border: 1px solid rgba(0, 0, 0, 65%)"
                      />
                      <!-- {{ Object.values(scope.opt)[1] }} -->
                      {{ flagMap.get(scope.opt) }}
                    </q-item>
                  </template>
                </q-select>
              </q-popup-edit>
            </q-td>
            <q-td key="position" :props="props">
              {{ props.row.position }}
              <q-popup-edit v-model.number="props.row.position" v-slot="scope">
                <q-badge outline color="primary" class="q-mt-sm">
                  Posición
                </q-badge>
                <q-select
                  v-model="props.row.position"
                  :options="positionOptions"
                  dense
                  options-dense
                  @update:model-value="scope.set"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="overall" :props="props">
              {{ props.row.overall }}
              <q-popup-edit
                v-model.number="props.row.overall"
                buttons
                label-set="Guardar"
                label-cancel="Cerrar"
                style="width: 260px"
                :validate="overallRangeValidation"
                v-slot="scope"
              >
                <!-- <q-input
                  type="number"
                  v-model.number="scope.value"
                  hint="Introduce el potencial del jugador. (Rango: del 50 al 99)"
                  bottom-slots
                  :error="errorOverall"
                  :error-message="errorOverallMessage"
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                /> -->
                <q-badge outline color="primary" class="q-mt-sm q-mb-sm">
                  Potencial
                </q-badge>
                <q-slider
                  v-model="scope.value"
                  :min="50"
                  :max="99"
                  :color="
                    scope.value < 55
                      ? 'red-10'
                      : scope.value < 60
                      ? 'red-8'
                      : scope.value < 65
                      ? 'red'
                      : scope.value < 70
                      ? 'yellow-10'
                      : scope.value < 75
                      ? 'yellow-9'
                      : scope.value < 80
                      ? 'yellow-8'
                      : scope.value < 85
                      ? 'green-6'
                      : scope.value < 90
                      ? 'green-7'
                      : scope.value < 95
                      ? 'green-8'
                      : 'green-9'
                  "
                  label-always
                  :switch-label-side="scope.value < 70 ? true : false"
                  :markers="5"
                  thumb-size="30px"
                  track-size="8px"
                  class="q-pl-sm q-pr-sm q-mb-lg"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="position" :props="props" auto-width>
              <q-btn
                icon="delete"
                color="primary"
                flat
                @click="console.log(props.rowIndex)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<style scoped></style>
