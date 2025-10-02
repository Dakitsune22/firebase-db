<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import useSoccer from 'src/composables/storeWrappers/useSoccer';
import useRoundsMutation from 'src/composables/useRoundMutation';
// import useRounds from 'src/composables/useRounds';
import useTeamMutation from 'src/composables/useTeamMutation';
import useTeams from 'src/composables/useTeams';
import useUserInfoMutation from 'src/composables/useUserInfoMutation';
import { tactics } from 'src/data/tactics';
import { sleep } from 'src/helpers/functions';
import { Leagues, Team, Player, CountryLeague } from 'src/models';
import { leaguesMap } from 'src/models/leagues';
import { Position } from 'src/models/player';
import { Tactic, TacticList } from 'src/models/tactic';
import { useRoute } from 'vue-router';

defineOptions({
  name: 'MyLeaguePage',
});

const $q = useQuasar();
const route = useRoute();

const xIsMyCup = route.name === 'myCup';

// const pageKey = ref<number>(0);

// const forcePageRender = (): void => {
//   pageKey.value++;
//   console.log('pageKey:', pageKey.value);
// };

// console.log('Route name: ', route.name);
// watch(
//   () => route.name,
//   (newName, oldName) => {
//     console.log({ oldName }, { newName });
//     if (newName !== oldName) {
//       forcePageRender();
//     }
//   }
// );

const initialTeamData: Team = {
  country: CountryLeague.Spain,
  division: 1,
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
const selectedMyXTeams = ref<Team[]>([]);

const initialMyXTeamsId: number[] = [];

// const { queryTeamsByName: queryTeamsSpain1 } = useDefaultTeams(
//   Leagues.LaLigaPrimeraDivision
// );
// const { queryTeams: queryTeamsEngland1 } = useDefaultTeams(
//   Leagues.PremierLeague
// );
// const { queryTeams: queryTeamsGermany1 } = useDefaultTeams(Leagues.Bundesliga);
// const { queryTeams: queryTeamsItaly1 } = useDefaultTeams(Leagues.SerieA);
// const { queryTeams: queryTeamsFrance1 } = useDefaultTeams(Leagues.Ligue1);
// const { queryTeams: queryTeamsMyX } = useDefaultTeams(Leagues.MyLeague);

const { queryTeamsByName: queryTeamsSpain1 } = useTeams(
  Leagues.LaLigaPrimeraDivision
);
const { queryTeamsByName: queryTeamsSpain2 } = useTeams(
  Leagues.LaLigaSegundaDivision
);
const { queryTeamsByName: queryTeamsEngland1 } = useTeams(
  Leagues.PremierLeague
);
const { queryTeamsByName: queryTeamsEngland2 } = useTeams(Leagues.Championship);
const { queryTeamsByName: queryTeamsGermany1 } = useTeams(Leagues.Bundesliga);
const { queryTeamsByName: queryTeamsItaly1 } = useTeams(Leagues.SerieA);
const { queryTeamsByName: queryTeamsFrance1 } = useTeams(Leagues.Ligue1);
const { queryTeamsByName: queryTeamsOthersEurope } = useTeams(
  Leagues.OthersEurope
);
const { queryTeamsByName: queryTeamsOthersWorld } = useTeams(
  Leagues.OthersWorld
);
const { queryTeamsByName: queryTeamsMyX } = xIsMyCup
  ? useTeams(Leagues.MyCup)
  : useTeams(Leagues.MyLeague);

const { setCurrentLeague } = useSoccer();
xIsMyCup ? setCurrentLeague(Leagues.MyCup) : setCurrentLeague(Leagues.MyLeague);
// const { queryCountRounds } = useRounds();
const { mutateMyLeagueRoundsDelete, mutateMyCupRoundsDelete } =
  useRoundsMutation();
// const { mutateTeamAddMyLeague } = useDefaultTeamsMutation();
const {
  mutateTeamAddMyLeague,
  mutateTeamAddMyCup,
  mutateTeamDeleteMyLeague,
  mutateTeamDeleteMyCup,
} = useTeamMutation();

const { mutateUserInfo } = useUserInfoMutation();
mutateUserInfo.mutate();

const currentTeamsReady = ref<boolean>(false);

const getCurrentMyXTeams = (): void => {
  console.log('INSIDE GET CURRENT MYLEAGUE TEAMS...');
  if (queryTeamsMyX.data.value) {
    queryTeamsMyX.data.value.forEach((t) => {
      selectedMyXTeams.value.push({
        ...t,
        // country: t.country,
        // draws: t.draws,
        // goalDifference: t.goalDifference,
        // goalsConceded: t.goalsConceded,
        // goalsScored: t.goalsScored,
        // id: t.id,
        // losses: t.losses,
        // matchesPlayed: t.matchesPlayed,
        // name: t.name,
        // points: t.points,
        // shortName: t.shortName,
        // wins: t.wins,
        // tactic: { ...t.tactic },
        players: [],
      });
      t.players.forEach((p) => {
        selectedMyXTeams.value[selectedMyXTeams.value.length - 1].players.push({
          ...p,
        });
      });
    });
    selectedMyXTeams.value.sort((a, b) => a.id - b.id);
    selectedMyXTeams.value.forEach((t) => {
      initialMyXTeamsId.push(t.id);
    });
  }
  currentTeamsReady.value = true;
};

onMounted(async () => {
  if (queryTeamsMyX.isFetching.value) {
    while (queryTeamsMyX.isFetching.value) {
      console.log('STILL FETCHING...', queryTeamsMyX.isFetching.value);
      await sleep(200);
    }
    console.log('FINALLY FETCHED!');
  }
  getCurrentMyXTeams();
});

const currentTeams = computed(() => {
  // console.log(selectedLeague.value);
  switch (selectedLeague.value) {
    case Leagues.LaLigaPrimeraDivision:
      return queryTeamsSpain1;
    case Leagues.LaLigaSegundaDivision:
      return queryTeamsSpain2;
    case Leagues.PremierLeague:
      return queryTeamsEngland1;
    case Leagues.Championship:
      return queryTeamsEngland2;
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

// const leagueOptions = ref([
//   {
//     label: 'La Liga Primera Division',
//     value: Leagues.LaLigaPrimeraDivision,
//   },
//   {
//     label: 'Premier League',
//     value: Leagues.PremierLeague,
//   },
//   {
//     label: 'Bundesliga',
//     value: Leagues.Bundesliga,
//   },
//   {
//     label: 'Serie A',
//     value: Leagues.SerieA,
//   },
//   {
//     label: 'Ligue 1',
//     value: Leagues.Ligue1,
//   },
// ]);
const leagueOptions = ref(leaguesMap);

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
  }
};

const onSelectTeam = (): void => {
  updateSelectedTeamData();

  if (
    selectedMyXTeams.value.find((t) => t.name === selectedTeamData.value.name)
  ) {
    $q.notify({
      type: 'info',
      message: 'El equipo seleccionado ya está en la lista.',
      progress: true,
    });
    return;
  }

  selectedMyXTeams.value.push({
    ...selectedTeamData.value,
    id: selectedMyXTeams.value.length,
    draws: 0,
    goalDifference: 0,
    goalsConceded: 0,
    goalsScored: 0,
    losses: 0,
    matchesPlayed: 0,
    points: 0,
    wins: 0,
  });

  selectedMyXTeams.value.forEach((t) => {
    t.players.forEach((p) => (p.teamId = t.id));
  });

  // console.log(selectedMyXTeams.value);
};

const onDeleteTeam = (idx: number): void => {
  selectedMyXTeams.value.splice(idx, 1);
  selectedMyXTeams.value.forEach((team, i) => {
    team.id = i;
  });
  selectedMyXTeams.value.forEach((t) => {
    t.players.forEach((p) => (p.teamId = t.id));
  });
  // console.log(selectedMyXTeams.value);
};

const onSubmitMyLeague = () => {
  console.log('ON MY LEAGUE SUBMIT');

  if (initialMyXTeamsId.length > 0) {
    // Delete current DB teams:
    initialMyXTeamsId.forEach((teamId, idx) => {
      // console.log('deleteTeamFromMyLeague');
      mutateTeamDeleteMyLeague.mutate(teamId, {
        onSuccess: () => {
          // Add new teams on last index succeed:
          if (idx + 1 === initialMyXTeamsId.length) {
            selectedMyXTeams.value.forEach((team) => {
              // console.log('addTeamToMyLeague');
              mutateTeamAddMyLeague.mutate({ team });
              // currentTeams.value.refetch();
            });
          }
        },
      });
    });
  } else {
    selectedMyXTeams.value.forEach((team) => {
      // console.log('addTeamToMyLeague');
      mutateTeamAddMyLeague.mutate({ team });
      // currentTeams.value.refetch();
    });
  }
  currentTeams.value.refetch();
  // Delete current league rounds:
  const initialMyLeagueTeamsRounds = initialMyXTeamsId.length * 2 - 2;
  console.log('Jornadas:', initialMyLeagueTeamsRounds);
  mutateMyLeagueRoundsDelete.mutate(initialMyLeagueTeamsRounds);
  // console.log('query rounds:', queryCountRounds.data.value);
  // if (queryCountRounds.data.value) {
  //   console.log('query round count:', queryCountRounds.data.value);
  //   mutateMyLeagueRoundsDelete.mutate(queryCountRounds.data.value);
  // }
};

const onSubmitMyCup = () => {
  console.log('ON MY CUP SUBMIT');

  if (initialMyXTeamsId.length > 0) {
    // Delete current DB teams:
    initialMyXTeamsId.forEach((teamId, idx) => {
      // console.log('deleteTeamFromMyLeague');
      mutateTeamDeleteMyCup.mutate(teamId, {
        onSuccess: () => {
          // Add new teams on last index succeed:
          if (idx + 1 === initialMyXTeamsId.length) {
            selectedMyXTeams.value.forEach((team) => {
              // console.log('addTeamToMyLeague');
              mutateTeamAddMyCup.mutate({ team });
              // currentTeams.value.refetch();
            });
          }
        },
      });
    });
  } else {
    selectedMyXTeams.value.forEach((team) => {
      // console.log('addTeamToMyLeague');
      mutateTeamAddMyCup.mutate({ team });
      // currentTeams.value.refetch();
    });
  }
  currentTeams.value.refetch();

  // Delete current cup rounds:
  // To Do: PENDIENTE, EL NUMERO DE RONDAS PARA COPA NO SIGUE ESTE CRITERIO:
  //   const initialMyCupTeamsRounds = initialMyXTeamsId.length * 2 - 2;
  //   console.log('Jornadas:', initialMyCupTeamsRounds);
  //   mutateMyCupRoundsDelete.mutate(initialMyCupTeamsRounds);

  let initialMyCupTeamsRounds = 0;
  switch (initialMyXTeamsId.length) {
    case 2:
      initialMyCupTeamsRounds = 1;
      break;
    case 4:
      initialMyCupTeamsRounds = 2;
      break;
    case 8:
      initialMyCupTeamsRounds = 3;
      break;
    case 16:
      initialMyCupTeamsRounds = 4;
      break;
    case 32:
      initialMyCupTeamsRounds = 5;
      break;
    case 64:
      initialMyCupTeamsRounds = 6;
      break;
    default:
      break;
  }
  console.log('Jornadas:', initialMyCupTeamsRounds);
  mutateMyCupRoundsDelete.mutate(initialMyCupTeamsRounds);
};

const onReset = () => {
  selectedLeague.value = undefined;
  selectedTeamId.value = undefined;
  selectedTeamData.value = initialTeamData;
};

// function useTeamsMutation(): { mutateTeamAddMyLeague: any } {
//   throw new Error('Function not implemented.');
// }
</script>

<template :key="pageKey">
  <!-- <div class="team-header">
    <q-btn label="Restore teams" color="primary" flat @click="onRestoreTeams" />
  </div> -->
  <div class="team-body">
    <q-form
      @submit="xIsMyCup ? onSubmitMyCup() : onSubmitMyLeague()"
      @reset="onReset"
      class="q-gutter-md q-mb-md"
    >
      <div class="team-body-title">
        <div v-if="xIsMyCup">
          Equipos participantes:<br /><strong>My~Cup</strong>
        </div>
        <div v-else>Equipos participantes:<br /><strong>My~League</strong></div>
        <q-img
          :src="
            xIsMyCup
              ? `/images/leagues/${Leagues.MyCup}.png`
              : `/images/leagues/${Leagues.MyLeague}.png`
          "
          spinner-color="primary"
          width="75px"
          fit="fill"
        />
      </div>
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
        @update:model-value="
          (value) => {
            selectedTeamId = undefined;
            selectedTeamData = initialTeamData;
          }
        "
      />
      <q-select
        filled
        v-model="selectedTeamId"
        :options="currentTeams.data.value?.filter((t) => t.players.length > 0)"
        option-value="id"
        option-label="name"
        options-dense
        label="Equipo"
        emit-value
        map-options
        :disable="!selectedLeague"
        @update:model-value="
          (value) => {
            // console.log(value);
            onSelectTeam();
          }
        "
      />
      <div class="btn-container">
        <q-btn type="reset" color="primary" icon="clear_all" size="18px" flat />
        <q-btn
          type="submit"
          color="primary"
          icon="save"
          size="18px"
          flat
          class="q-ml-sm"
          :disable="
            (!xIsMyCup &&
              (selectedMyXTeams.length < 4 ||
                selectedMyXTeams.length % 2 !== 0)) ||
            (xIsMyCup &&
              selectedMyXTeams.length !== 2 &&
              selectedMyXTeams.length !== 4 &&
              selectedMyXTeams.length !== 8 &&
              selectedMyXTeams.length !== 16 &&
              selectedMyXTeams.length !== 32 &&
              selectedMyXTeams.length !== 64)
          "
        />
      </div>
    </q-form>
    <div v-if="queryTeamsMyX.isFetched.value">
      <div v-if="selectedMyXTeams.length > 0" class="team-body-list">
        <div
          v-for="(t, idx) in selectedMyXTeams"
          :key="t.id"
          class="team-body-list-item"
        >
          <!-- <q-img
            :src="`/images/teams-${selectedLeague?.slice(
              0,
              selectedLeague.length - 2
            )}/${t.shortName}.png`"
            spinner-color="white"
            width="40px"
            height="40px"
            style="margin-right: 10px; cursor: pointer"
          />
          <div>
            {{ t.name }}
          </div> -->
          <q-list bordered separator dense class="qlist">
            <q-item>
              <q-item-section class="qlist-item1" side>{{
                t.id + 1
              }}</q-item-section>
              <q-item-section class="qlist-item2">
                <q-img
                  :src="`/images/teams-${t.country}/${t.shortName}.png`"
                  spinner-color="white"
                  width="40px"
                  height="40px"
                />
              </q-item-section>
              <q-item-section class="qlist-item3" side>{{
                // teamsSpain1[props.team.id]
                t.name
              }}</q-item-section>
              <!-- <q-item-section>{{ 'Delete' }}</q-item-section> -->
            </q-item>
          </q-list>
          <q-btn
            icon="delete"
            color="primary"
            flat
            rounded
            size="lg"
            class="qlist-item4"
            @click="onDeleteTeam(idx)"
          />
        </div>
      </div>
    </div>
    <div class="my-spinner" v-if="queryTeamsMyX.isFetching.value">
      <q-spinner color="primary" size="48px" />
    </div>
    <div v-if="currentTeamsReady">
      <div v-if="selectedMyXTeams.length <= 0">
        <div class="no-teams">
          <q-icon name="info" size="72px" color="primary" />
          <span v-if="xIsMyCup" style="margin-top: 10px">
            No se ha añadido ningún equipo a My~Cup.<br /><br />
            Puedes seleccionar equipos de las diferentes ligas disponibles.<br />
            El número de equipos para iniciar una copa personalizada ha de
            ser:<br />
            <strong>2</strong>, <strong>4</strong>, <strong>8</strong>,
            <strong>16</strong>, <strong>32</strong> o <strong>64</strong>.
          </span>
          <span v-else style="margin-top: 10px">
            No se ha añadido ningún equipo a My~League.<br /><br />
            Puedes seleccionar equipos de las diferentes ligas disponibles.<br />
            El mínimo de equipos para iniciar una liga personalizada es de
            <strong>4</strong>, y no pueden ser impares.
          </span>
        </div>
      </div>
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

    @include response('mobile') {
      min-width: 355px;
      max-width: 390px;
      margin: 10px;
      margin-top: 40px;
    }

    &-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 20px;

      border-left: 6px solid $primary;
      padding-left: 10px;
      margin-bottom: 16px;
    }

    &-list {
      display: flex;
      flex-direction: column;
      font-size: 20px;
      // margin-bottom: 10px;
      // background-color: aqua;

      &-item {
        // @include flexPosition(start, center);
        @include flexPosition(center, center);
      }
    }
  }
}
.qlist {
  border-color: rgb(150, 150, 150);
  border-width: 1px 1px 1px 1px;
  border-radius: 0.2em;
  background-color: darken(whitesmoke, $amount: 5);
  margin-top: 3px;
  padding: 1px;

  @include response('mobile') {
    margin-left: 5px;
  }

  &-item1 {
    width: 30px;
    // background-color: cadetblue;
    @include response('mobile') {
      width: 35px;
    }
  }
  &-item2 {
    width: 40px;
    // background-color: bisque;
    @include response('mobile') {
      width: 35px;
    }
  }
  &-item3 {
    @include flexPosition(center, start);
    width: 230px;
    // background-color: aquamarine;
    @include response('mobile') {
      width: 224px;
    }
  }
  &-item4 {
    // background-color: red;
    width: 40px;
    padding-left: 20px;
    padding-right: 20px;
    margin-left: 5px;
  }
}
.my-spinner {
  @include flexPosition(center, center);
  margin-top: 30px;
}
.no-teams {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 18px;
  margin-top: 50px;
}
</style>
