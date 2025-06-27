<script setup lang="ts">
import { md5 } from 'js-md5';
import { useQuasar } from 'quasar';
import useDefaultTeams from 'src/composables/useDefaultTeams';
import useDefaultTeamsMutation from 'src/composables/useDefaultTeamsMutation';
import useRoundsMutation from 'src/composables/useRoundMutation';
import useTeamMutation from 'src/composables/useTeamMutation';
import useTeams from 'src/composables/useTeams';
import { tactics } from 'src/data/tactics';
import {
  teamsEngland1,
  teamsFrance1,
  teamsGermany1,
  teamsItaly1,
  teamsSpain1,
  teamsOthersEurope,
  teamsOthersWorld,
} from 'src/data/teams';
import { getAge, isValidBirthDate } from 'src/helpers/functions';
import { Leagues, Team, Player, CountryLeague } from 'src/models';
import { leaguesMap } from 'src/models/leagues';
import { Flag, flagMap, Position } from 'src/models/player';
import { Tactic, TacticList } from 'src/models/tactic';
import {
  teamCrestOptionsEngland,
  teamCrestOptionsFrance,
  teamCrestOptionsGermany,
  teamCrestOptionsItaly,
  teamCrestOptionsSpain,
  teamCrestOptionsOthersEurope,
  teamCrestOptionsOthersWorld,
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

const { queryTeamsByName: queryTeamsSpain1 } = useTeams(
  Leagues.LaLigaPrimeraDivision
);
const { queryTeamsByName: queryTeamsEngland1 } = useTeams(
  Leagues.PremierLeague
);
const { queryTeamsByName: queryTeamsGermany1 } = useTeams(Leagues.Bundesliga);
const { queryTeamsByName: queryTeamsItaly1 } = useTeams(Leagues.SerieA);
const { queryTeamsByName: queryTeamsFrance1 } = useTeams(Leagues.Ligue1);
const { queryTeamsByName: queryTeamsOthersEurope } = useTeams(
  Leagues.OthersEurope
);
const { queryTeamsByName: queryTeamsOthersWorld } = useTeams(
  Leagues.OthersWorld
);
const { mutateTeamAdd, mutateTeamUpdate } = useTeamMutation();

const { queryTeams: queryMDBTeamsSpain1 } = useDefaultTeams(
  Leagues.LaLigaPrimeraDivision
);
const { queryTeams: queryMDBTeamsEngland1 } = useDefaultTeams(
  Leagues.PremierLeague
);
const { queryTeams: queryMDBTeamsGermany1 } = useDefaultTeams(
  Leagues.Bundesliga
);
const { queryTeams: queryMDBTeamsItaly1 } = useDefaultTeams(Leagues.SerieA);
const { queryTeams: queryMDBTeamsFrance1 } = useDefaultTeams(Leagues.Ligue1);
const { queryTeams: queryMDBTeamsOthersEurope } = useDefaultTeams(
  Leagues.OthersEurope
);
const { queryTeams: queryMDBTeamsOthersWorld } = useDefaultTeams(
  Leagues.OthersWorld
);
const {
  mutateTeamAdd: mutateMDBTeamAdd,
  mutateTeamUpdate: mutateMDBTeamUpdate,
} = useDefaultTeamsMutation();

const { mutateRoundsDelete } = useRoundsMutation();

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
    case Leagues.OthersEurope:
      return queryTeamsOthersEurope;
    case Leagues.OthersWorld:
      return queryTeamsOthersWorld;
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
    case Leagues.OthersEurope:
      return queryTeamsOthersEurope;
    case Leagues.OthersWorld:
      return queryTeamsOthersWorld;
    default:
      return queryTeamsSpain1;
  }
});

const selectedTeamRating = computed(() => {
  // return (
  //   selectedTeamData.value.players.reduce((a, b) => a + b.overall, 0) /
  //   selectedTeamData.value.players.length
  // ).toFixed(1);
  return (
    selectedTeamData.value.players.reduce((a, b) => a + b.overall, 0) /
    selectedTeamData.value.players.length /
    10
  );
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

const leagueOptions = ref(leaguesMap);

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
    name: 'birthDate',
    label: 'Fec. Nac.',
    align: 'center',
    field: 'birthDate',
  },
  {
    name: 'age',
    label: 'Edad',
    align: 'center',
    field: 'age',
    // sortable: true,
  },
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

const errorBirthDate = ref(false);
const errorBirthDateMessage = ref('');

const birthDateValidation = (val: string): boolean => {
  console.log(val);
  if (val.length < 10) {
    errorBirthDate.value = true;
    errorBirthDateMessage.value = 'Introduce la fecha completa';
    return false;
  }
  // if (getAge(val) > 99 || getAge(val) < 1) {
  if (!isValidBirthDate(val)) {
    errorBirthDate.value = true;
    errorBirthDateMessage.value = 'La fecha introducida no es válida';
    return false;
  } else {
    errorBirthDate.value = false;
    errorBirthDateMessage.value = '';
    return true;
  }
};

const birthDateErrorReset = (): void => {
  errorBirthDate.value = false;
  errorBirthDateMessage.value = '';
};

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
    title: `<span class="text-primary">Restaurar equipos</span> <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;"><img style="width: 30%; height: 30%; margin-top: 15px;" src="/public/images/leagues/${selectedLeague.value?.replaceAll(
      '-',
      ''
    )}.png" /></div>`,
    message: `Se van a restaurar los equipos de <strong>${labelLeague}</strong>.<BR><BR>Se perderá cualquier cambio que se haya realizado hasta la fecha (nombres, escudos, tácticas, jugadores...), sustituyéndose por los datos por defecto de los equipos.<br><br>También se reiniciarán todos los datos de la liga en curso (clasificación, resultados, goleadores).<br><br>Este cambio es permanente.<br><br><strong>¿Estás seguro de continuar?</strong>`,
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
              team,
            });
          });
          break;

        case Leagues.PremierLeague:
          teamsEngland1.forEach((team) => {
            mutateTeamAdd.mutate({
              league: Leagues.PremierLeague,
              team,
            });
          });
          break;

        case Leagues.Bundesliga:
          teamsGermany1.forEach((team) => {
            mutateTeamAdd.mutate({
              league: Leagues.Bundesliga,
              team,
            });
          });
          break;

        case Leagues.SerieA:
          teamsItaly1.forEach((team) => {
            mutateTeamAdd.mutate({
              league: Leagues.SerieA,
              team,
            });
          });
          break;

        case Leagues.Ligue1:
          teamsFrance1.forEach((team) => {
            mutateTeamAdd.mutate({
              league: Leagues.Ligue1,
              team,
            });
          });
          break;

        case Leagues.OthersEurope:
          teamsOthersEurope.forEach((team) => {
            mutateTeamAdd.mutate({
              league: Leagues.OthersEurope,
              team,
            });
          });
          break;

        case Leagues.OthersWorld:
          teamsOthersWorld.forEach((team) => {
            mutateTeamAdd.mutate({
              league: Leagues.OthersWorld,
              team,
            });
          });
          break;
      }
    })
    .onOk(() => {
      selectedTeamId.value = undefined;
      selectedTeamData.value = initialTeamData;
      if (selectedLeague.value) {
        mutateRoundsDelete.mutate(selectedLeague.value);
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

const onGetMasterDBTeams = () => {
  const labelLeague = Object.values(leagueOptions.value).find(
    (league) => league.value === selectedLeague.value
  )?.label;

  $q.dialog({
    html: true,
    title: `<span class="text-primary">Actualizar equipos</span> <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;"><img style="width: 30%; height: 30%; margin-top: 15px;" src="/public/images/leagues/${selectedLeague.value?.replaceAll(
      '-',
      ''
    )}.png" /></div>`,
    message: `Se van a actualizar los equipos de <strong>${labelLeague}</strong>, recuperando de la tabla maestra la última versión de estos.<BR><BR>Se perderá cualquier cambio que se haya realizado hasta la fecha (nombres, escudos, tácticas, jugadores...).<br><br>También se reiniciarán todos los datos de la liga en curso (clasificación, resultados, goleadores).<br><br>Este cambio es permanente.<br><br><strong>¿Estás seguro de continuar?</strong>`,
    cancel: { label: 'Volver', flat: true },
    ok: { icon: 'warning', label: 'Continuar', color: 'negative', flat: true },
    persistent: true,
  })
    .onOk(() => {
      switch (selectedLeague.value) {
        case Leagues.LaLigaPrimeraDivision:
          if (queryMDBTeamsSpain1.data.value) {
            queryMDBTeamsSpain1.data.value.forEach((team) => {
              mutateTeamAdd.mutate({
                league: Leagues.LaLigaPrimeraDivision,
                team,
              });
            });
          }
          break;

        case Leagues.PremierLeague:
          if (queryMDBTeamsEngland1.data.value) {
            queryMDBTeamsEngland1.data.value.forEach((team) => {
              mutateTeamAdd.mutate({
                league: Leagues.PremierLeague,
                team,
              });
            });
          }
          break;

        case Leagues.Bundesliga:
          if (queryMDBTeamsGermany1.data.value) {
            queryMDBTeamsGermany1.data.value.forEach((team) => {
              mutateTeamAdd.mutate({
                league: Leagues.Bundesliga,
                team,
              });
            });
          }
          break;

        case Leagues.SerieA:
          if (queryMDBTeamsItaly1.data.value) {
            queryMDBTeamsItaly1.data.value.forEach((team) => {
              console.log(team.name);
              mutateTeamAdd.mutate({
                league: Leagues.SerieA,
                team,
              });
            });
          }
          break;

        case Leagues.Ligue1:
          if (queryMDBTeamsFrance1.data.value) {
            queryMDBTeamsFrance1.data.value.forEach((team) => {
              mutateTeamAdd.mutate({
                league: Leagues.Ligue1,
                team,
              });
            });
          }
          break;

        case Leagues.OthersEurope:
          if (queryMDBTeamsOthersEurope.data.value) {
            queryMDBTeamsOthersEurope.data.value.forEach((team) => {
              mutateTeamAdd.mutate({
                league: Leagues.OthersEurope,
                team,
              });
            });
          }
          break;

        case Leagues.OthersWorld:
          if (queryMDBTeamsOthersWorld.data.value) {
            queryMDBTeamsOthersWorld.data.value.forEach((team) => {
              mutateTeamAdd.mutate({
                league: Leagues.OthersWorld,
                team,
              });
            });
          }
          break;
      }
    })
    .onOk(() => {
      selectedTeamId.value = undefined;
      selectedTeamData.value = initialTeamData;
      if (selectedLeague.value) {
        mutateRoundsDelete.mutate(selectedLeague.value);
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

const onSetMasterDBTeams = () => {
  const labelLeague = Object.values(leagueOptions.value).find(
    (league) => league.value === selectedLeague.value
  )?.label;

  $q.dialog({
    html: true,
    title: `<span class="text-primary">Subir cambios</span> <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;"><img style="width: 30%; height: 30%; margin-top: 15px;" src="/public/images/leagues/${selectedLeague.value?.replaceAll(
      '-',
      ''
    )}.png" /></div>`,
    message: `Se van a subir todos los equipos de <strong>${labelLeague}</strong> a la tabla maestra.<BR><BR>Cualquier dato existente será reemplazado por los nuevos datos (nombres, escudos, tácticas, jugadores...).<br><br>Este cambio es permanente.<br><br><strong>¿Estás seguro de continuar?</strong><br><br>Se requiere contraseña de administrador.`,
    cancel: { label: 'Volver', flat: true },
    ok: { icon: 'warning', label: 'Continuar', color: 'negative', flat: true },
    prompt: {
      model: '',
      isValid: (val) => val.length > 0, // << here is the magic
      type: 'password', // optional
    },
    persistent: true,
  })
    .onOk((data) => {
      if (md5(data) !== '32e90b4f00b8f0be4394f9f03d6e50d7') {
        $q.notify({
          type: 'negative',
          message:
            'Se require cuenta de administrador para poder modificar la tabla maestra.',
        });
      } else {
        currentTeams.value.data.value?.forEach((team) => {
          if (selectedLeague.value !== undefined) {
            // console.log(team.name);
            mutateMDBTeamAdd.mutate({
              league: selectedLeague.value,
              team,
            });
          }
        });
        if (selectedLeague.value) {
          refetchQueryLeague(selectedLeague.value);
        }
      }
    })
    .onOk(() => {
      // selectedTeamId.value = undefined;
      // selectedTeamData.value = initialTeamData;
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
    case Leagues.OthersEurope:
      //crestMapFrance.keys().forEach((k) => teamCrestOptions.push(k));
      teamCrestOptions = teamCrestOptionsOthersEurope;
      break;
    case Leagues.OthersWorld:
      //crestMapFrance.keys().forEach((k) => teamCrestOptions.push(k));
      teamCrestOptions = teamCrestOptionsOthersWorld;
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
      queryMDBTeamsSpain1.refetch();
    case Leagues.PremierLeague:
      queryTeamsEngland1.refetch();
      queryMDBTeamsEngland1.refetch();
    case Leagues.Bundesliga:
      queryTeamsGermany1.refetch();
      queryMDBTeamsGermany1.refetch();
    case Leagues.SerieA:
      queryTeamsItaly1.refetch();
      queryMDBTeamsItaly1.refetch();
    case Leagues.Ligue1:
      queryTeamsFrance1.refetch();
      queryMDBTeamsFrance1.refetch();
    case Leagues.OthersEurope:
      queryTeamsOthersEurope.refetch();
      queryMDBTeamsOthersEurope.refetch();
    case Leagues.OthersWorld:
      queryTeamsOthersWorld.refetch();
      queryMDBTeamsOthersWorld.refetch();
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
        (p.birthDate ? p.birthDate : '') +
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
        (p.birthDate ? p.birthDate : '') +
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
    message: `Se va a traspasar a <strong class="text-primary">${
      player.nickname ? player.nickname : player.name + ' ' + player.surname
    }</strong> a:<BR><BR><div style="display: flex; flex-direction: column; justify-content: center; align-items: center;"><div><img src="/public/images/teams-${
      transferTargetTeamData.country
    }/${transferTargetTeamData.shortName}.png" /></div><div><strong>${
      transferTargetTeamData.name
    }</strong></div></div><BR>
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
      if (
        transferSelectedLeague.value &&
        transferSelectedTeamId.value !== undefined
      ) {
        mutateTeamUpdate.mutate({
          league: transferSelectedLeague.value,
          id: transferSelectedTeamId.value,
          team: transferTargetTeamData,
        });
      }
      if (selectedLeague.value && selectedTeamId.value !== undefined) {
        mutateTeamUpdate.mutate({
          league: selectedLeague.value,
          id: selectedTeamId.value,
          team: selectedTeamData.value,
        });
      }
      if (
        transferSelectedLeague.value &&
        transferSelectedTeamId.value !== undefined
      ) {
        refetchQueryLeague(transferSelectedLeague.value);
      }
      if (selectedLeague.value && selectedTeamId.value !== undefined) {
        refetchQueryLeague(selectedLeague.value);
      }
      // // Init data:
      // transferSelectedLeague.value = undefined;
      // transferSelectedTeamId.value = undefined;
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

          const selectedTeamDefaultPlayers: Player[] = [];
          selectedTeamData.value.players.forEach((player) => {
            selectedTeamDefaultPlayers.push({ ...player });
          });

          const selectedTeamDefaultFormation: Position[] = [];
          selectedTeamData.value.tactic.formation.forEach((position) => {
            selectedTeamDefaultFormation.push(position);
          });

          selectedTeamOriginalData.value = {
            ...selectedTeamData.value,
            // id: selectedTeamData.value.id,
            // name: selectedTeamData.value.name,
            // shortName: selectedTeamData.value.shortName,
            players: selectedTeamDefaultPlayers,
            tactic: {
              name: selectedTeamData.value.tactic.name,
              formation: selectedTeamDefaultFormation,
            },
          };
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
      <div class="team-body-title">Gestión de equipos</div>
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
              // console.log(queryTeamsItaly1.data.value);
              // console.log(queryMDBTeamsItaly1.data.value);
              // }
            }
          "
        />
        <q-btn
          class="team-body-league-right q-ml-xs"
          color="negative"
          icon="restart_alt"
          size="lg"
          flat
          @click="onRestoreTeams"
          :disable="!selectedLeague"
        >
          <q-tooltip style="font-size: 12px" class="bg-negative"
            >Restaurar equipos</q-tooltip
          >
        </q-btn>
        <q-btn
          class="team-body-league-right"
          color="primary"
          icon="cloud_download"
          size="lg"
          flat
          @click="onGetMasterDBTeams"
          :disable="!selectedLeague"
        >
          <q-tooltip style="font-size: 12px" class="bg-primary"
            >Actualizar equipos</q-tooltip
          >
        </q-btn>
        <q-btn
          class="team-body-league-right"
          color="primary"
          icon="cloud_upload"
          size="lg"
          flat
          @click="onSetMasterDBTeams"
          :disable="
            !selectedLeague ||
            (currentTeams.data.value && currentTeams.data.value?.length <= 0)
          "
        >
          <q-tooltip style="font-size: 12px" class="bg-primary"
            >Subir cambios</q-tooltip
          >
        </q-btn>
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
        <q-btn type="reset" color="primary" icon="clear_all" size="18px" flat />
        <q-btn
          type="submit"
          color="primary"
          icon="save"
          size="18px"
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
            <q-td
              key="birthDate"
              :props="props"
              class="table table-value table-col10"
            >
              {{ props.row.birthDate }}
              <q-popup-edit
                v-model="props.row.birthDate"
                buttons
                label-set="Guardar"
                label-cancel="Cerrar"
                :validate="birthDateValidation"
                @before-show="birthDateErrorReset"
                @update:model-value="birthDateValidation"
                v-slot="scope"
              >
                <q-badge outline color="primary" class="q-mt-sm">
                  Fecha de nacimiento
                </q-badge>
                <q-input
                  mask="##/##/####"
                  v-model="scope.value"
                  hint="Introduce la fecha de nacimiento del jugador"
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                  :error="errorBirthDate"
                  :error-message="errorBirthDate ? errorBirthDateMessage : ''"
                />
              </q-popup-edit>
            </q-td>
            <q-td
              key="age"
              :props="props"
              class="table table-value table-col11"
            >
              {{ props.row.birthDate ? getAge(props.row.birthDate) : '?' }}
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
                v-slot="scope"
                @hide="
                  // Init data:
                  transferSelectedLeague = undefined;
                  transferSelectedTeamId = undefined;
                "
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
                  :options="
                    transferCurrentTeams.data.value?.filter(
                      (t) => t.id !== selectedTeamData.id
                    )
                  "
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
                    :disable="transferSelectedTeamId === undefined"
                    @click="
                      {
                        onTransferPlayer(props.rowIndex);
                        scope.set;
                      }
                    "
                  />
                </div>
              </q-popup-edit>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <div class="footer-container">
        Potencial medio de la plantilla:
        <q-rating
          v-model="selectedTeamRating"
          size="17px"
          color="amber-12"
          readonly
          icon="star_border"
          icon-selected="star"
          icon-half="star_half"
          max="10"
          class="q-pb-xs q-ml-xs q-mr-xs"
        />
        <span class="text-bold text-primary">{{
          (selectedTeamRating * 10).toFixed(1)
        }}</span>
      </div>
    </div>
    <div
      v-if="
        selectedLeague &&
        currentTeams.data.value &&
        currentTeams.data.value?.length < 1
      "
      class="no-teams"
    >
      <q-icon name="info" size="72px" color="primary" />
      <span style="margin-top: 10px"
        >No existen equipos para
        <strong>
          {{
            Object.values(leaguesMap).find(
              (league) => league.value === selectedLeague
            )?.label
          }}</strong
        >.</span
      >
      <span style="margin-bottom: 10px"
        >Restaura o actualiza para cargarlos.</span
      >
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

    &-title {
      font-size: 20px;
      border-left: 6px solid $primary;
      padding-left: 10px;
      margin-bottom: 16px;
    }

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
    width: 20%;
    cursor: alias;
  }
  &-col3 {
    width: 20%;
    cursor: alias;
  }
  &-col4 {
    width: 10%;
    cursor: alias;
  }
  &-col5 {
    width: 5cm;
    cursor: pointer;
  }
  &-col6 {
    width: 5%;
    cursor: pointer;
  }
  &-col7 {
    width: 5%;
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
  &-col10 {
    width: 15%;
    cursor: alias;
  }
  &-col11 {
    width: 5%;
    cursor: default;
  }
}
.transfer-btn {
  @include flexPosition(center, center);
  margin-top: 8px;
}
.footer-container {
  @include flexPosition(center, center);
  margin-top: 15px;
  font-size: 15px;
}
.no-teams {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
</style>
