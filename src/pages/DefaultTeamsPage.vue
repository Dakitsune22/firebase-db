<script setup lang="ts">
import { useQuasar } from 'quasar';
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
import { Leagues, Team, Player, CountryLeague } from 'src/models';
import { Flag, flagMap, Position } from 'src/models/player';
import { Tactic, TacticList } from 'src/models/tactic';
import {
  teamCrestOptionsEngland,
  teamCrestOptionsFrance,
  teamCrestOptionsGermany,
  teamCrestOptionsItaly,
  teamCrestOptionsSpain,
} from 'src/models/team';
import { computed, ref } from 'vue';

defineOptions({
  name: 'DefaultTeamsPage',
});

const $q = useQuasar();

const initialTeamData: Team = {
  country: CountryLeague.Spain,
  draws: 0,
  goalDifference: 0,
  goalsConceded: 0,
  goalsScored: 0,
  id: -1,
  losses: 0,
  matchesPlayed: 0,
  name: '',
  points: 0,
  shortName: '',
  wins: 0,
  tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
  players: [],
};

const selectedLeague = ref<Leagues>();
const selectedTeamId = ref<number>();
const selectedTeamData = ref<Team>(initialTeamData);
const selectedTeamOriginalData = ref<Team>(initialTeamData);

const transferSelectedLeague = ref<Leagues>();
const transferSelectedTeamId = ref<number>();

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

let teamCrestOptions: string[] = [];

const positionOptions = Object.values(Position);
const tacticOptions = Object.values(TacticList);

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

const transferCurrentTeams = computed(() => {
  console.log(transferSelectedLeague.value);
  switch (transferSelectedLeague.value) {
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

const leagueOptions = ref([
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
    label: 'Dorsal',
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
  {
    name: 'delete',
    label: 'Eliminar',
    align: 'center',
    field: 'delete',
  },
  {
    name: 'transfer',
    label: 'Traspasar',
    align: 'center',
    field: 'transfer',
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

const getNextAvailableShirtNumber = (team: Team): number => {
  let shirtNumber = 0;
  for (let i = 1; i < 100; i++) {
    if (team.players.findIndex((p) => p.shirtNumber === i) < 0) {
      shirtNumber = i;
      break;
    }
  }
  return shirtNumber;
};

const onAddPlayer = (): void => {
  selectedTeamData.value.players.push({
    teamId: selectedTeamData.value.id,
    shirtNumber: getNextAvailableShirtNumber(selectedTeamData.value),
    name: '',
    surname: '',
    nickname: '',
    overall: 75,
    position: Position.POR,
    nationality: Flag.Spain,
    seasonStats: {
      assists: 0,
      goals: 0,
      injured: 0,
    },
  });
};

const onRestoreTeams = () => {
  const labelLeague = Object.values(leagueOptions.value).find(
    (league) => league.value === selectedLeague.value
  )?.label;

  $q.dialog({
    html: true,
    title: `<span class="text-primary">Reiniciar ${labelLeague}</span>`,
    message: `Se van a reiniciar los datos de todos los equipos de <strong>${labelLeague}</strong>, recuperando los valores por defecto y perdiendo, por lo tanto, cualquier cambio que se haya realizado (nombre, táctica, jugadores...)<br><br><strong>¿Estás seguro de continuar?</strong>`,
    cancel: { label: 'Volver', flat: true },
    ok: { icon: 'warning', label: 'Continuar', color: 'negative', flat: true },
    persistent: true,
  })
    .onOk(() => {
      switch (selectedLeague.value) {
        case Leagues.LaLigaPrimeraDivision:
          teamsSpain1.forEach((team) => {
            mutateTeamAdd.mutate({
              league: Leagues.LaLigaPrimeraDivision,
              id: team.id,
            });
          });
          break;

        case Leagues.PremierLeague:
          teamsEngland1.forEach((team) => {
            mutateTeamAdd.mutate({
              league: Leagues.PremierLeague,
              id: team.id,
            });
          });
          break;

        case Leagues.Bundesliga:
          teamsGermany1.forEach((team) => {
            mutateTeamAdd.mutate({
              league: Leagues.Bundesliga,
              id: team.id,
            });
          });
          break;

        case Leagues.SerieA:
          teamsItaly1.forEach((team) => {
            mutateTeamAdd.mutate({
              league: Leagues.SerieA,
              id: team.id,
            });
          });
          break;

        case Leagues.Ligue1:
          teamsFrance1.forEach((team) => {
            mutateTeamAdd.mutate({
              league: Leagues.Ligue1,
              id: team.id,
            });
          });
          break;
      }
    })
    .onOk(() => {
      selectedTeamId.value = undefined;
      selectedTeamData.value = initialTeamData;
      if (selectedLeague.value) {
        refetchQueryLeague(selectedLeague.value);
      }
    })
    .onCancel(() => {
      return;
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
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

    const tacticPositionsToUpdate: Position[] = [];
    selectedTeamData.value.tactic.formation.forEach((position) => {
      tacticPositionsToUpdate.push(position);
    });

    selectedTeamData.value = {
      ...selectedTeamData.value,
      players: playersToUpdate,
      tactic: {
        name: selectedTeamData.value.tactic.name,
        formation: tacticPositionsToUpdate,
      },
    };

    const selectedTeamDefaultPlayers: Player[] = [];
    selectedTeamData.value.players.forEach((player) => {
      selectedTeamDefaultPlayers.push({ ...player });
    });

    const selectedTeamDefaultFormation: Position[] = [];
    selectedTeamData.value.tactic.formation.forEach((position) => {
      selectedTeamDefaultFormation.push(position);
    });

    selectedTeamOriginalData.value = {
      ...initialTeamData,
      id: selectedTeamData.value.id,
      name: selectedTeamData.value.name,
      shortName: selectedTeamData.value.shortName,
      // ...selectedTeamData.value,
      players: selectedTeamDefaultPlayers,
      tactic: {
        name: selectedTeamData.value.tactic.name,
        formation: selectedTeamDefaultFormation,
      },
    };
  }
};

// const onChangeNameClick = (playerIdx: number) => {
//   const playerToUpdate: Player = {
//     ...selectedTeamData.value.players[playerIdx],
//     name: 'Updated-Name',
//   };

//   const updatedPlayers = selectedTeamData.value.players.map((p) =>
//     p.shirtNumber !== playerToUpdate.shirtNumber ? p : playerToUpdate
//   );

//   // console.log(updatedPlayers);

//   selectedTeamData.value = {
//     ...selectedTeamData.value,
//     players: updatedPlayers,
//   };
//   console.log(selectedTeamData.value);
// };

const updateCurrentTeamCrests = (): void => {
  teamCrestOptions = [];
  // console.log(selectedLeague.value);
  switch (selectedLeague.value) {
    case Leagues.LaLigaPrimeraDivision:
      // crestMapSpain.keys().forEach((k) => teamCrestOptions.push(k));
      // teamCrestOptionsSpain.forEach(option => teamCrestOptions.push(option))
      teamCrestOptions = teamCrestOptionsSpain;
      break;
    case Leagues.PremierLeague:
      //crestMapEngland.keys().forEach((k) => teamCrestOptions.push(k));
      teamCrestOptions = teamCrestOptionsEngland;
      break;
    case Leagues.Bundesliga:
      //crestMapGermany.keys().forEach((k) => teamCrestOptions.push(k));
      teamCrestOptions = teamCrestOptionsGermany;
      break;
    case Leagues.SerieA:
      //crestMapItaly.keys().forEach((k) => teamCrestOptions.push(k));
      teamCrestOptions = teamCrestOptionsItaly;
      break;
    case Leagues.Ligue1:
      //crestMapFrance.keys().forEach((k) => teamCrestOptions.push(k));
      teamCrestOptions = teamCrestOptionsFrance;
      break;
  }
};

// const getTeamNameFromCrest = (teamShortName: string): string | undefined => {
//   switch (selectedLeague.value) {
//     case Leagues.LaLigaPrimeraDivision:
//       return crestMapSpain.entries().find((e) => e[0] == teamShortName)?.[1];
//     case Leagues.PremierLeague:
//       crestMapEngland.keys().forEach((k) => teamCrestOptions.push(k));
//     case Leagues.Bundesliga:
//       crestMapGermany.keys().forEach((k) => teamCrestOptions.push(k));
//     case Leagues.SerieA:
//       crestMapItaly.keys().forEach((k) => teamCrestOptions.push(k));
//     case Leagues.Ligue1:
//       crestMapFrance.keys().forEach((k) => teamCrestOptions.push(k));
//   }
// };

const refetchQueryLeague = (league: Leagues): void => {
  switch (league) {
    case Leagues.LaLigaPrimeraDivision:
      queryTeamsSpain1.refetch();
    case Leagues.PremierLeague:
      queryTeamsEngland1.refetch();
    case Leagues.Bundesliga:
      queryTeamsGermany1.refetch();
    case Leagues.SerieA:
      queryTeamsItaly1.refetch();
    case Leagues.Ligue1:
      queryTeamsFrance1.refetch();
  }
};

const isSelectedTeamDataChanged = (): boolean => {
  let infoTeamOriginal =
    selectedTeamOriginalData.value.name +
    selectedTeamOriginalData.value.shortName +
    selectedTeamOriginalData.value.tactic.name;

  selectedTeamOriginalData.value.players.forEach(
    (p) =>
      (infoTeamOriginal =
        infoTeamOriginal +
        p.shirtNumber.toString() +
        p.name +
        p.surname +
        (p.nickname ? p.nickname : '') +
        p.nationality +
        p.position +
        p.overall.toString())
  );
  // console.log('infoTeamOriginal', infoTeamOriginal);

  let infoTeam =
    selectedTeamData.value.name +
    selectedTeamData.value.shortName +
    selectedTeamData.value.tactic.name;

  selectedTeamData.value.players.forEach(
    (p) =>
      (infoTeam =
        infoTeam +
        p.shirtNumber.toString() +
        p.name +
        p.surname +
        (p.nickname ? p.nickname : '') +
        p.nationality +
        p.position +
        p.overall.toString())
  );
  // console.log('infoTeam:', infoTeam);
  console.log('Is team data equal?', infoTeam === infoTeamOriginal);
  return infoTeam !== infoTeamOriginal;
};

// const continueLosingTeamChanges = async (): Promise<boolean> => {
//   $q.dialog({
//     html: true,
//     title: '<span class="text-primary">Before update</span>',
//     message:
//       'Este mensaje es antes de actualizar la página.<br><br><strong>¿Estás seguro de continuar?</strong>',
//     cancel: { label: 'Volver', flat: true },
//     ok: {
//       icon: 'warning',
//       label: 'Continuar',
//       flat: true,
//     },
//     persistent: true,
//   })
//     .onOk(() => {
//       return true
//     })
//     .onCancel(() => {
//       // console.log('I am triggered on Cancel')
//       return false
//     })
//     .onDismiss(() => {
//       // console.log('I am triggered on both OK and Cancel')
//     });
// };

// const catchLeagueChange = (newValue: Leagues): void => {
//   $q.dialog({
//     html: true,
//     title: '<span class="text-primary">Datos no guardados</span>',
//     message:
//       'Se han realizado cambios en el equipo, que se perderán si se sigue adelante.<br><br><strong>¿Estás seguro de continuar?</strong>',
//     cancel: { label: 'Volver', flat: true },
//     ok: {
//       color: 'negative',
//       icon: 'warning',
//       label: 'Continuar',
//       flat: true,
//     },
//     persistent: true,
//   })
//     .onOk(() => {
//       selectedTeamId.value = undefined;
//       selectedTeamData.value = initialTeamData;
//       selectedTeamOriginalData.value = initialTeamData;
//       updateCurrentTeamCrests();
//     })
//     .onCancel(() => {
//       selectedLeague.value = newValue;
//       // console.log('I am triggered on Cancel')
//     })
//     .onDismiss(() => {
//       // console.log('I am triggered on both OK and Cancel')
//     });
// };

const onTransferPlayer = (squadIndex: number): void => {
  console.log('To Do: On transfer player');
  console.log({ squadIndex });
  const player = { ...selectedTeamData.value.players[squadIndex] };
  console.log(player);

  let transferTargetTeamData: Team = initialTeamData;
  let auxTeamData: Team = initialTeamData;
  if (transferCurrentTeams.value.data.value) {
    auxTeamData =
      transferCurrentTeams.value.data.value[
        transferCurrentTeams.value.data.value.findIndex(
          (t) => t.id === transferSelectedTeamId.value
        )
      ];
    transferTargetTeamData = { ...auxTeamData };
    transferTargetTeamData.players = [];
    auxTeamData.players.forEach((p) => {
      transferTargetTeamData.players.push({ ...p });
    });
  }
  console.log(transferTargetTeamData);

  $q.dialog({
    html: true,
    title: '<span class="text-primary">Traspasar jugador</span>',
    message: `Se va a traspasar a <strong>${
      player.nickname ? player.nickname : player.name + ' ' + player.surname
    }</strong> a:<BR><BR><div><img src="/public/images/teams-${
      transferTargetTeamData.country
    }/${transferTargetTeamData.shortName}.png" /></div><div><strong>${
      transferTargetTeamData.name
    }</strong></div><BR>
        Este cambio se guardará directamente en la base de datos maestra.<br><br>
        <strong>¿Estás seguro de continuar?</strong>`,
    cancel: { label: 'Volver', flat: true },
    ok: {
      icon: 'check_circle',
      label: 'Continuar',
      flat: true,
    },
    persistent: true,
  })
    .onOk(() => {
      player.teamId = transferTargetTeamData.id;
      player.shirtNumber = getNextAvailableShirtNumber(transferTargetTeamData);
      transferTargetTeamData.players.push(player);
      console.log(transferTargetTeamData.name);
      console.log(transferTargetTeamData.players);

      selectedTeamData.value.players.splice(squadIndex, 1);
      selectedTeamOriginalData.value.players.splice(squadIndex, 1);
      console.log(selectedTeamData.value.name);
      console.log(selectedTeamData.value.players);
      if (transferSelectedLeague.value && transferSelectedTeamId.value) {
        mutateTeamUpdate.mutate({
          league: transferSelectedLeague.value,
          id: transferSelectedTeamId.value,
          team: transferTargetTeamData,
        });
        refetchQueryLeague(transferSelectedLeague.value);
      }
      if (selectedLeague.value && selectedTeamId.value) {
        mutateTeamUpdate.mutate({
          league: selectedLeague.value,
          id: selectedTeamId.value,
          team: selectedTeamData.value,
        });
        refetchQueryLeague(selectedLeague.value);
      }
    })
    .onCancel(() => {
      return;
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};

const onSubmit = () => {
  // console.log(selectedTeamOriginalData.value);
  // console.log(selectedTeamData.value);
  // // console.log(Object.is(selectedTeamData.value, selectedTeamOriginalData));
  // console.log(
  //   Object.entries(selectedTeamData.value).sort().toString() ===
  //     Object.entries(selectedTeamOriginalData.value).sort().toString()
  // );
  // console.log(Object.entries(selectedTeamOriginalData.value).sort().toString());
  // console.log(Object.entries(selectedTeamData.value).sort().toString());
  // console.log(
  //   Object.entries(selectedTeamData.value.players).sort().toString() ===
  //     Object.entries(selectedTeamOriginalData.value.players).sort().toString()
  // );
  // console.log(
  //   Object.entries(selectedTeamOriginalData.value.players).sort().toString()
  // );
  // console.log(Object.entries(selectedTeamData.value.players).sort().toString());
  // let tInfo = '';
  // selectedTeamData.value.tactic.formation.forEach()

  if (!isSelectedTeamDataChanged()) {
    $q.notify({
      type: 'info',
      message:
        'Ningún dato del equipo ni de ningún jugador ha variado, no guardarán en base de datos.',
      progress: true,
    });
  } else {
    $q.dialog({
      html: true,
      title: '<span class="text-primary">Guardar cambios</span>',
      message:
        'Se van a actualizar los datos del equipo en la base de datos maestra.<br><br><strong>¿Estás seguro de continuar?</strong>',
      cancel: { label: 'Volver', flat: true },
      ok: {
        icon: 'warning',
        label: 'Continuar',
        flat: true,
      },
      persistent: true,
    })
      .onOk(() => {
        let error = false;
        if (selectedLeague.value && selectedTeamId.value !== undefined) {
          selectedTeamData.value.players.forEach((p) => {
            if (
              (p.name.trim().length === 0 || p.surname.trim().length === 0) &&
              p.nickname?.trim().length === 0
            ) {
              $q.notify({
                type: 'negative',
                message: `El jugador #${p.shirtNumber} debe tener nombre y apellido o bien apodo`,
              });
              error = true;
            }
          });

          if (error) return;

          mutateTeamUpdate.mutate({
            league: selectedLeague.value,
            id: selectedTeamId.value,
            team: selectedTeamData.value,
          });
          refetchQueryLeague(selectedLeague.value);
        } else {
          console.error('Error: No se pueden guardar los datos');
        }
      })
      .onCancel(() => {
        return;
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
  }
};

const onReset = () => {
  if (isSelectedTeamDataChanged()) {
    $q.dialog({
      html: true,
      title: '<span class="text-primary">Datos no guardados</span>',
      message:
        'Se han realizado cambios en el equipo, que se perderán si se sigue adelante.<br><br><strong>¿Estás seguro de continuar?</strong>',
      cancel: { label: 'Volver', flat: true },
      ok: {
        color: 'negative',
        icon: 'warning',
        label: 'Continuar',
        flat: true,
      },
      persistent: true,
    })
      .onOk(() => {
        selectedLeague.value = undefined;
        selectedTeamId.value = undefined;
        selectedTeamData.value = initialTeamData;
        selectedTeamOriginalData.value = initialTeamData;
      })
      .onCancel(() => {
        // console.log('I am triggered on Cancel')
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
  } else {
    selectedLeague.value = undefined;
    selectedTeamId.value = undefined;
    selectedTeamData.value = initialTeamData;
    selectedTeamOriginalData.value = initialTeamData;
  }
};
</script>

<template>
  <!-- <div class="team-header">
    <q-btn label="Restore teams" color="primary" flat @click="onRestoreTeams" />
  </div> -->
  <div class="team-body">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-mb-md">
      <div class="team-body-league">
        <q-select
          class="team-body-league-left"
          filled
          v-model="selectedLeague"
          :options="leagueOptions"
          option-value="value"
          option-label="label"
          options-dense
          label="Liga"
          emit-value
          map-options
          @popup-show="
            () => {
              if (isSelectedTeamDataChanged()) {
                $q.notify({
                  type: 'warning',
                  message:
                    'Se han modificado datos del equipo actual y no se han guardado. Si se selecciona otra liga, estos datos se perderán.',
                  progress: true,
                  position: 'top',
                });
              }
            }
          "
          @update:model-value="
            (value) => {
              // if (isSelectedTeamDataChanged()) {
              //   catchLeagueChange(value);
              // } else {
              selectedTeamId = undefined;
              selectedTeamData = initialTeamData;
              selectedTeamOriginalData = initialTeamData;
              updateCurrentTeamCrests();
              // }
            }
          "
        />
        <q-btn
          class="team-body-league-right"
          color="negative"
          icon="restart_alt"
          flat
          @click="onRestoreTeams"
          :disable="!selectedLeague"
        />
      </div>
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
        :disable="!selectedLeague"
        @popup-show="
          () => {
            if (isSelectedTeamDataChanged()) {
              $q.notify({
                type: 'warning',
                message:
                  'Se han modificado datos del equipo actual y no se han guardado. Si se selecciona otro equipo, estos datos se perderán.',
                progress: true,
                position: 'top',
              });
            }
          }
        "
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
        <!-- <q-btn
          label="Reiniciar Liga"
          color="negative"
          icon="restart_alt"
          flat
          @click="onAddPlayer"
        /> -->
        <q-btn type="reset" color="primary" icon="clear_all" flat />
        <q-btn
          type="submit"
          color="primary"
          icon="save"
          flat
          class="q-ml-sm"
          :disable="selectedTeamId == undefined"
        />
      </div>
    </q-form>
    <!-- <div v-if="currentTeams.data.value">
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
    </div> -->
    <div v-if="selectedTeamData.id >= 0">
      <div class="team-body-info">
        <div class="team-body-info-left">
          <div>
            <q-img
              :src="`/images/teams-${selectedLeague?.slice(
                0,
                selectedLeague.length - 2
              )}/${selectedTeamData.shortName}.png`"
              spinner-color="white"
              width="40px"
              height="40px"
              style="margin-right: 10px; cursor: pointer"
            />
            <q-popup-edit
              v-model.number="selectedTeamData.shortName"
              v-slot="scope"
            >
              <q-badge outline color="primary" class="q-mt-sm">
                Escudo
              </q-badge>
              <q-select
                v-model="selectedTeamData.shortName"
                :options="teamCrestOptions"
                options-dense
                dense
                @update:model-value="scope.set"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-img
                      :src="`/images/teams-${selectedLeague?.slice(
                        0,
                        selectedLeague.length - 2
                      )}/${scope.opt}.png`"
                      spinner-color="white"
                      height="40px"
                      width="40px"
                      class="q-mr-sm"
                    />
                    <!-- {{ Object.values(scope.opt)[1] }} -->
                    <!-- {{ flagMap.get(scope.opt) }} -->
                    <!-- {{ getTeamNameFromCrest(scope.opt) }} -->
                  </q-item>
                </template>
              </q-select>
            </q-popup-edit>
          </div>
          Plantilla del
          <div style="font-weight: bold; margin-left: 7px; cursor: alias">
            {{ selectedTeamData.name }}
            <q-popup-edit
              v-model.number="selectedTeamData.name"
              buttons
              label-set="Guardar"
              label-cancel="Cerrar"
              v-slot="scope"
            >
              <q-badge outline color="primary" class="q-mt-sm">
                Nombre del equipo
              </q-badge>
              <q-input
                type="text"
                v-model.number="scope.value"
                hint="Introduce el nombre del equipo"
                bottom-slots
                dense
                autofocus
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </div>
          <q-btn
            icon="person_add"
            color="primary"
            round
            class="q-ml-lg"
            @click="onAddPlayer"
          />
        </div>
        <div class="team-body-info-right">
          <q-img
            :src="`/images/tactics/${selectedTeamData.tactic.name}.png`"
            spinner-color="white"
            height="56px"
            width="90px"
            class="q-mr-sm"
          />
          <q-select
            filled
            v-model="selectedTeamData.tactic.name"
            :options="tacticOptions"
            options-dense
            label="Táctica actual"
            emit-value
            style="width: 160px"
            @update:model-value="
              (value: TacticList) => {
                console.log('selected value: ', value)
                const tempTactic = tactics.find((t) => t.name === value) as Tactic;
                selectedTeamData.tactic = {
                  name: value,
                  formation: [...tempTactic.formation]
                }
              }
            "
          />
        </div>
      </div>
      <q-table
        :rows="selectedTeamData.players"
        :columns="columns"
        row-key="shirtNumber"
        dense
        bordered
        rows-per-page-label="Jugadores por página: "
        :rows-per-page-options="[10, 20, 0]"
        class="table-header"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              key="shirtNumber"
              :props="props"
              class="table table-value table-col1"
            >
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
            <q-td
              key="name"
              :props="props"
              class="table table-value table-col2"
            >
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
            <q-td
              key="surname"
              :props="props"
              class="table table-value table-col3"
            >
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
            <q-td
              key="nickname"
              :props="props"
              class="table table-value table-col4"
            >
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
            <q-td key="nationality" :props="props" class="table table-col5">
              <!-- {{ props.row.nationality }} -->
              <q-img
                :src="`/images/flags/h20/${props.row.nationality}.png`"
                spinner-color="white"
                width="27px"
                height="17px"
                style="border: 1px solid rgba(0, 0, 0, 65%)"
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
            <q-td
              key="position"
              :props="props"
              class="table table-value table-col6"
            >
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
            <q-td
              key="overall"
              :props="props"
              class="table table-value table-col7"
            >
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
            <q-td key="delete" :props="props" class="table table-col8">
              <q-btn
                icon="delete"
                color="primary"
                flat
                @click="selectedTeamData.players.splice(props.rowIndex, 1)"
              />
            </q-td>
            <q-td
              key="transfer"
              :props="props"
              class="table table-value table-col9"
            >
              <q-btn icon="output" color="primary" flat />
              <q-popup-edit
                v-model.number="props.row.transfer"
                style="width: 250px"
              >
                <q-badge outline color="primary" class="q-mt-sm">
                  Traspaso
                </q-badge>
                <q-select
                  filled
                  v-model="transferSelectedLeague"
                  :options="leagueOptions"
                  option-value="value"
                  option-label="label"
                  options-dense
                  label="Liga destino"
                  emit-value
                  map-options
                  class="q-mt-md q-mb-xs"
                />
                <q-select
                  filled
                  v-model="transferSelectedTeamId"
                  :options="transferCurrentTeams.data.value"
                  option-value="id"
                  option-label="name"
                  options-dense
                  label="Equipo destino"
                  emit-value
                  map-options
                  :disable="!transferSelectedLeague"
                />
                <div class="transfer-btn">
                  <q-btn
                    icon="handshake"
                    color="primary"
                    size="lg"
                    flat
                    dense
                    :disable="!transferSelectedTeamId"
                    @click="onTransferPlayer(props.rowIndex)"
                  />
                </div>
              </q-popup-edit>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.team {
  &-header {
    margin: 20px;
  }
  &-body {
    margin: 20px;
    margin-top: 40px;
    min-width: 600px;
    max-width: 900px;

    &-league {
      @include flexPosition(center, center);

      &-left {
        // @include flexPosition(start, end);
        width: 95%;
        // background-color: bisque;
      }
      &-right {
        width: 5%;
        // background-color: burlywood;
      }
    }

    &-info {
      @include flexPosition(center, center);
      font-size: 24px;
      margin-bottom: 10px;
      // background-color: aqua;

      &-left {
        @include flexPosition(start, end);
        width: 71%;
        // background-color: bisque;
      }
      &-right {
        @include flexPosition(end, end);
        width: 29%;
        // padding-bottom: 5px;
        // background-color: burlywood;
      }
    }
  }
}
.table {
  background-color: darken(whitesmoke, $amount: 0.5);
  &-header {
    background-color: darken(whitesmoke, $amount: 5.5);
  }
  &-value {
    &:hover {
      color: $primary;
      font-size: 18px;
      font-weight: 500;
      transition: 0.2s all;
    }
  }
  &-col1 {
    width: 5%;
    cursor: alias;
  }
  &-col2 {
    width: 25%;
    cursor: alias;
  }
  &-col3 {
    width: 25%;
    cursor: alias;
  }
  &-col4 {
    width: 14%;
    cursor: alias;
  }
  &-col5 {
    width: 7cm;
    cursor: pointer;
  }
  &-col6 {
    width: 7%;
    cursor: pointer;
  }
  &-col7 {
    width: 7%;
    cursor: pointer;
  }
  &-col8 {
    width: 5%;
    cursor: pointer;
  }
  &-col9 {
    width: 5%;
    cursor: pointer;
  }
}
.transfer-btn {
  @include flexPosition(center, center);
  margin-top: 8px;
}
</style>
