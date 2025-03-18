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
import { Leagues, Team, Player } from 'src/models';
import { Flag, flagMap, Position } from 'src/models/player';
import { Tactic, TacticList } from 'src/models/tactic';
import {
  teamCrestOptionsEngland,
  teamCrestOptionsFrance,
  teamCrestOptionsGermany,
  teamCrestOptionsItaly,
  teamCrestOptionsSpain,
} from 'src/models/team';
import { computed, onBeforeUnmount, onBeforeUpdate, ref } from 'vue';

defineOptions({
  name: 'MyLeaguePage',
});

const $q = useQuasar();

const initialTeamData: Team = {
  draws: 0,
  goalDifference: 0,
  goalsConceded: 0,
  goalsScored: 0,
  id: -1,
  losses: 0,
  matchesPlayed: 0,
  name: '',
  shortName: '',
  points: 0,
  wins: 0,
  tactic: tactics.find((t) => t.name === TacticList['4-2-3-1']) as Tactic,
  players: [],
};

const selectedLeague = ref<Leagues>();
const selectedTeamId = ref<number>();
const selectedTeamData = ref<Team>(initialTeamData);
const selectedMyLeagueTeams = ref<Team[]>([]);

const { queryTeams: queryTeamsSpain1 } = useDefaultTeams(
  Leagues.LaLigaPrimeraDivision
);
const { queryTeams: queryTeamsEngland1 } = useDefaultTeams(
  Leagues.PremierLeague
);
const { queryTeams: queryTeamsGermany1 } = useDefaultTeams(Leagues.Bundesliga);
const { queryTeams: queryTeamsItaly1 } = useDefaultTeams(Leagues.SerieA);
const { queryTeams: queryTeamsFrance1 } = useDefaultTeams(Leagues.Ligue1);
const { mutateTeamAdd, mutateTeamUpdate, mutateTeamAddMyLeague } =
  useDefaultTeamsMutation();

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
  });
};

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

const onSubmit = () => {
  console.log('To Do: Submit');
};

const onReset = () => {
  selectedLeague.value = undefined;
  selectedTeamId.value = undefined;
  selectedTeamData.value = initialTeamData;
};
</script>

<template>
  <!-- <div class="team-header">
    <q-btn label="Restore teams" color="primary" flat @click="onRestoreTeams" />
  </div> -->
  <div class="team-body">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-mb-md">
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
        :options="currentTeams.data.value"
        option-value="id"
        option-label="name"
        options-dense
        label="Equipo"
        emit-value
        map-options
        :disable="!selectedLeague"
        @update:model-value="
          (value) => {
            console.log(value);
            onSelectTeam();
          }
        "
      />
      <div class="btn-container">
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
    <div v-if="selectedMyLeagueTeams.length > 0">
      <div class="team-body-list">
        <div
          v-for="t in selectedMyLeagueTeams"
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
                  :src="`/images/teams-${selectedLeague?.slice(
                    0,
                    selectedLeague.length - 2
                  )}/${t.shortName}.png`"
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
          <q-btn icon="delete" color="primary" flat rounded size="lg" />
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

    &-list {
      display: flex;
      flex-direction: column;
      font-size: 20px;
      // margin-bottom: 10px;
      // background-color: aqua;

      &-item {
        @include flexPosition(start, center);
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
  }
  &-item2 {
    width: 40px;
    // background-color: bisque;
  }
  &-item3 {
    @include flexPosition(center, start);
    width: 300px;
    // background-color: aquamarine;
  }
}
</style>
