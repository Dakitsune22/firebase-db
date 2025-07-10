<script setup lang="ts">
import { useQuasar } from 'quasar';
import useSoccer from 'src/composables/storeWrappers/useSoccer';
import useRoundsMutation from 'src/composables/useRoundMutation';
import useRounds from 'src/composables/useRounds';
import useTeamMutation from 'src/composables/useTeamMutation';
import useTeams from 'src/composables/useTeams';
import useUserInfoMutation from 'src/composables/useUserInfoMutation';
import { tactics } from 'src/data/tactics';
import { sleep } from 'src/helpers/functions';
import { Leagues, Team, Player, CountryLeague } from 'src/models';
import { leaguesMap } from 'src/models/leagues';
import { Position } from 'src/models/player';
import { Tactic, TacticList } from 'src/models/tactic';
import { computed, onMounted, ref } from 'vue';

defineOptions({
  name: 'MyLeaguePage',
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
const selectedMyLeagueTeams = ref<Team[]>([]);

const initialMyLeagueTeamsId: number[] = [];

// const { queryTeamsByName: queryTeamsSpain1 } = useDefaultTeams(
//   Leagues.LaLigaPrimeraDivision
// );
// const { queryTeams: queryTeamsEngland1 } = useDefaultTeams(
//   Leagues.PremierLeague
// );
// const { queryTeams: queryTeamsGermany1 } = useDefaultTeams(Leagues.Bundesliga);
// const { queryTeams: queryTeamsItaly1 } = useDefaultTeams(Leagues.SerieA);
// const { queryTeams: queryTeamsFrance1 } = useDefaultTeams(Leagues.Ligue1);
// const { queryTeams: queryTeamsMyLeague } = useDefaultTeams(Leagues.MyLeague);

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
const { queryTeamsByName: queryTeamsMyLeague } = useTeams(Leagues.MyLeague);

const { setCurrentLeague } = useSoccer();
setCurrentLeague(Leagues.MyLeague);
const { queryCountRounds } = useRounds();
const { mutateMyLeagueRoundsDelete } = useRoundsMutation();
// const { mutateTeamAddMyLeague } = useDefaultTeamsMutation();
const { mutateTeamAddMyLeague, mutateTeamDeleteMyLeague } = useTeamMutation();

const { mutateUserInfo } = useUserInfoMutation();
mutateUserInfo.mutate();

const currentTeamsReady = ref<boolean>(false);

const getCurrentMyLeagueTeams = (): void => {
  console.log('INSIDE GET CURRENT MYLEAGUE TEAMS...');
  if (queryTeamsMyLeague.data.value) {
    queryTeamsMyLeague.data.value.forEach((t) => {
      selectedMyLeagueTeams.value.push({
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
        selectedMyLeagueTeams.value[
          selectedMyLeagueTeams.value.length - 1
        ].players.push({ ...p });
      });
    });
    selectedMyLeagueTeams.value.sort((a, b) => a.id - b.id);
    selectedMyLeagueTeams.value.forEach((t) => {
      initialMyLeagueTeamsId.push(t.id);
    });
  }
  currentTeamsReady.value = true;
};
onMounted(async () => {
  if (queryTeamsMyLeague.isFetching.value) {
    while (queryTeamsMyLeague.isFetching.value) {
      console.log('STILL FETCHING...', queryTeamsMyLeague.isFetching.value);
      await sleep(200);
    }
    console.log('FINALLY FETCHED!');
  }
  getCurrentMyLeagueTeams();
});

const currentTeams = computed(() => {
  // console.log(selectedLeague.value);
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
    selectedMyLeagueTeams.value.find(
      (t) => t.name === selectedTeamData.value.name
    )
  ) {
    $q.notify({
      type: 'info',
      message: 'El equipo seleccionado ya está en la lista.',
      progress: true,
    });
    return;
  }

  selectedMyLeagueTeams.value.push({
    ...selectedTeamData.value,
    id: selectedMyLeagueTeams.value.length,
    draws: 0,
    goalDifference: 0,
    goalsConceded: 0,
    goalsScored: 0,
    losses: 0,
    matchesPlayed: 0,
    points: 0,
    wins: 0,
  });

  selectedMyLeagueTeams.value.forEach((t) => {
    t.players.forEach((p) => (p.teamId = t.id));
  });

  // console.log(selectedMyLeagueTeams.value);
};

const onDeleteTeam = (idx: number): void => {
  selectedMyLeagueTeams.value.splice(idx, 1);
  selectedMyLeagueTeams.value.forEach((team, i) => {
    team.id = i;
  });
  selectedMyLeagueTeams.value.forEach((t) => {
    t.players.forEach((p) => (p.teamId = t.id));
  });
  // console.log(selectedMyLeagueTeams.value);
};

const onSubmit = () => {
  // Delete current DB teams:
  initialMyLeagueTeamsId.forEach((teamId) => {
    // console.log('deleteTeamFromMyLeague');
    mutateTeamDeleteMyLeague.mutate(teamId);
    currentTeams.value.refetch();
  });
  // Add teams:
  selectedMyLeagueTeams.value.forEach((team) => {
    // console.log('addTeamToMyLeague');
    mutateTeamAddMyLeague.mutate({ team });
    currentTeams.value.refetch();
  });
  // Delete current league rounds:
  if (queryCountRounds.data.value) {
    console.log('query round count:', queryCountRounds.data.value);
    mutateMyLeagueRoundsDelete.mutate(queryCountRounds.data.value);
  }
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

<template>
  <!-- <div class="team-header">
    <q-btn label="Restore teams" color="primary" flat @click="onRestoreTeams" />
  </div> -->
  <div class="team-body">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-mb-md">
      <div class="team-body-title">Gestión de My~League</div>
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
            selectedMyLeagueTeams.length < 4 ||
            selectedMyLeagueTeams.length % 2 !== 0
          "
        />
      </div>
    </q-form>
    <div v-if="queryTeamsMyLeague.isFetched.value">
      <div v-if="selectedMyLeagueTeams.length > 0" class="team-body-list">
        <div
          v-for="(t, idx) in selectedMyLeagueTeams"
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
    <div class="my-spinner" v-if="queryTeamsMyLeague.isFetching.value">
      <q-spinner color="primary" size="48px" />
    </div>
    <div v-if="currentTeamsReady">
      <div v-if="selectedMyLeagueTeams.length <= 0">
        <div class="no-teams">
          <q-icon name="info" size="72px" color="primary" />
          <span style="margin-top: 10px">
            No se ha añadido ningún equipo a My~League®.<br /><br />
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

  &-item1 {
    width: 30px;
    // background-color: cadetblue;
    @include response('mobile') {
      width: 22px;
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
    // @include response('mobile') {
    //   width: 218px;
    // }
  }
  &-item4 {
    // background-color: red;
    width: 40px;
    padding-left: 20px;
    padding-right: 20px;
    margin-left: 8px;
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
