<script setup lang="ts">
import useTeams from 'src/composables/useTeams';
import { Leagues, Player } from 'src/models';
import { Team } from 'src/models';
import { onMounted, ref } from 'vue';

const { queryTeamsByName: queryTeamsSpain } = useTeams(
  Leagues.LaLigaPrimeraDivision
);
const { queryTeamsByName: queryTeamsEngland } = useTeams(Leagues.PremierLeague);
const { queryTeamsByName: queryTeamsItaly } = useTeams(Leagues.SerieA);
const { queryTeamsByName: queryTeamsGermany } = useTeams(Leagues.Bundesliga);
const { queryTeamsByName: queryTeamsFrance } = useTeams(Leagues.Ligue1);
const { queryTeamsByName: queryTeamsOthersWorld } = useTeams(
  Leagues.OthersWorld
);
const { queryTeamsByName: queryTeamsOthersEurope } = useTeams(
  Leagues.OthersEurope
);

const topElement = ref(document.getElementById('topElement'));

interface TeamExt {
  team: Team;
  ovr: number;
}

const loading = ref<boolean>(true);
const expanded = ref<boolean[]>([]);
const allTeams: TeamExt[] = [];

const loadAllTeams = (): void => {
  console.log('loadAllTeams -> START');
  if (queryTeamsSpain.data.value) {
    queryTeamsSpain.data.value.forEach((team) => {
      allTeams.push({
        team: { ...team },
        ovr:
          team.players.reduce((a, b) => a + b.overall, 0) /
          team.players.length /
          10,
      });
    });
  }
  if (queryTeamsEngland.data.value) {
    queryTeamsEngland.data.value.forEach((team) => {
      allTeams.push({
        team: { ...team },
        ovr:
          team.players.reduce((a, b) => a + b.overall, 0) /
          team.players.length /
          10,
      });
    });
  }
  if (queryTeamsItaly.data.value) {
    queryTeamsItaly.data.value.forEach((team) => {
      allTeams.push({
        team: { ...team },
        ovr:
          team.players.reduce((a, b) => a + b.overall, 0) /
          team.players.length /
          10,
      });
    });
  }
  if (queryTeamsGermany.data.value) {
    queryTeamsGermany.data.value.forEach((team) => {
      allTeams.push({
        team: { ...team },
        ovr:
          team.players.reduce((a, b) => a + b.overall, 0) /
          team.players.length /
          10,
      });
    });
  }
  if (queryTeamsFrance.data.value) {
    queryTeamsFrance.data.value.forEach((team) => {
      allTeams.push({
        team: { ...team },
        ovr:
          team.players.reduce((a, b) => a + b.overall, 0) /
          team.players.length /
          10,
      });
    });
  }
  if (queryTeamsOthersWorld.data.value) {
    queryTeamsOthersWorld.data.value.forEach((team) => {
      allTeams.push({
        team: { ...team },
        ovr:
          team.players.reduce((a, b) => a + b.overall, 0) /
          team.players.length /
          10,
      });
    });
  }
  if (queryTeamsOthersEurope.data.value) {
    queryTeamsOthersEurope.data.value.forEach((team) => {
      allTeams.push({
        team: { ...team },
        ovr:
          team.players.reduce((a, b) => a + b.overall, 0) /
          team.players.length /
          10,
      });
    });
  }
  //   allTeams.sort(
  //     (teamA, teamB) =>
  //       teamB.players.reduce((a, b) => a + b.overall, 0) / teamB.players.length -
  //       teamA.players.reduce((a, b) => a + b.overall, 0) / teamA.players.length
  //   );
  allTeams.sort((teamA, teamB) => teamB.ovr - teamA.ovr);
  console.log('loadAllTeams -> END');
};

const getPlayersSortedbyOverall = (players: Player[]): Player[] => {
  const p: Player[] = [];
  players.forEach((player) => {
    p.push(player);
  });
  return p.sort((a, b) => b.overall - a.overall);
};

// const getTeamOverall = (players: Player[]): number => {
//   return players.reduce((a, b) => a + b.overall, 0);
// };

onMounted(() => {
  console.log('On mounted -> START');
  loadAllTeams();
  //   console.log(allTeams);
  console.log('On mounted -> END');
  loading.value = false;
});
</script>

<template>
  <div ref="topElement" id="topElement" />
  <div class="stats">
    <div v-if="!loading">
      <!-- <div v-for="(team, rank) in allTeams" :key="team.name">
        {{ rank + 1 + ' - ' + team.name }}
        {{
          (
            team.players.reduce((a, b) => a + b.overall, 0) /
            team.players.length
          ).toFixed(2)
        }}
      </div> -->
      <q-btn
        color="primary"
        round
        size="md"
        style="position: fixed; top: 60px; right: 10px; z-index: 1"
        :icon="'vertical_align_top'"
        @click="
          topElement?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
          })
        "
      />
      <q-card
        v-for="(teamExt, rank) in allTeams"
        :key="rank"
        class="my-card q-mb-md"
        flat
        bordered
      >
        <q-badge
          color="grey-5"
          style="width: 100%; display: flex; justify-content: center"
        >
          {{ rank + 1 }}
        </q-badge>
        <q-card-section>
          <!-- <div class="text-overline text-orange-9">{{ '#' + (rank + 1) }}</div> -->
          <div class="my-card-content">
            <div class="my-card-content-left">
              <q-img
                :src="`/images/teams-${teamExt.team.country}/${teamExt.team.shortName}.png`"
                spinner-color="white"
                width="40px"
                height="40px"
              />
            </div>
            <div class="my-card-content-right">
              <div class="text-h5 q-ml-sm">{{ teamExt.team.name }}</div>
              <div class="text-primary q-ml-xs">
                <q-rating
                  v-model="teamExt.ovr"
                  size="17px"
                  color="amber-12"
                  readonly
                  icon="star_border"
                  icon-selected="star"
                  icon-half="star_half"
                  max="10"
                  class="q-pb-xs q-ml-xs q-mr-xs"
                />
                <!-- {{
                  (
                    teamExt.team.players.reduce((a, b) => a + b.overall, 0) /
                    teamExt.team.players.length
                  ).toFixed(2)
                }} -->
                {{ (teamExt.ovr * 10).toFixed(2) }}
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions>
          <span style="color: grey; padding-left: 8px">Mejores jugadores</span>

          <q-space />

          <q-btn
            color="grey"
            round
            flat
            dense
            :icon="expanded[rank] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="expanded[rank] = !expanded[rank]"
          />
        </q-card-actions>

        <q-slide-transition>
          <div v-show="expanded[rank]">
            <q-separator />
            <q-card-section class="my-card-expand text-subtitle2">
              <div
                v-for="(player, i) in 3"
                :key="player"
                class="my-card-expand-row"
              >
                <div class="my-card-expand-col1">
                  <q-img
                    :src="`/images/flags/h20/${
                      getPlayersSortedbyOverall(teamExt.team.players)[i]
                        .nationality
                    }.png`"
                    spinner-color="white"
                    width="29px"
                    height="18px"
                    fit="fill"
                    style="border: 1px solid rgba(0, 0, 0, 65%)"
                  />
                </div>
                <div class="my-card-expand-col2">
                  <div
                    v-if="
                      !getPlayersSortedbyOverall(teamExt.team.players)[i]
                        .nickname
                    "
                  >
                    {{
                      getPlayersSortedbyOverall(teamExt.team.players)[i].name +
                      ' ' +
                      getPlayersSortedbyOverall(teamExt.team.players)[i].surname
                    }}
                  </div>
                  <div v-else>
                    {{
                      getPlayersSortedbyOverall(teamExt.team.players)[i]
                        .nickname
                    }}
                  </div>
                </div>
                <div class="my-card-expand-col3">
                  <q-badge outline color="primary" style="font-size: 11px">
                    {{
                      getPlayersSortedbyOverall(teamExt.team.players)[i]
                        .position
                    }}
                  </q-badge>
                </div>
                <div class="my-card-expand-col4">
                  <q-badge
                    color="primary"
                    style="
                      font-size: 11px;
                      margin-top: 3px;
                      /* padding-right: 8px; */
                      min-width: 46px;
                    "
                  >
                    <q-icon
                      name="star_rate"
                      color="amber-6"
                      size="12px"
                      style="
                        padding-bottom: 2px;
                        margin-right: 3px;
                        /* background-color: blueviolet;
              border-radius: 50%; */
                      "
                    />
                    {{
                      getPlayersSortedbyOverall(teamExt.team.players)[i].overall
                    }}
                  </q-badge>
                </div>
              </div>
              <!-- <div class="my-card-expand-player2">
                {{ getPlayersSortedbyOverall(teamExt.team.players)[1].surname }}
              </div>
              <div class="my-card-expand-player3">
                {{ getPlayersSortedbyOverall(teamExt.team.players)[2].surname }}
              </div> -->
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
      <!-- {{ allTeams }} -->
    </div>
    <div v-else><q-spinner color="primary" size="48px" /></div>
  </div>
</template>

<style lang="scss" scoped>
$darkGrey: rgba(42, 42, 42, 0.692);
.stats {
  @include flexPosition(center, center);
  margin-top: 30px;
  margin-bottom: 20px;
}
.my-card {
  width: 370px;
  color: $darkGrey;
  background-color: darken(whitesmoke, $amount: 0.5);

  &-content {
    @include flexPosition(start, center);
    margin-top: 2px;
    // background-color: aqua;

    &-left {
      //   background-color: aquamarine;
      padding-top: 2px;
    }

    &-right {
      //   margin-top: 15px;
      margin-left: 4px;
      //   background-color: bisque;
    }
  }

  &-expand {
    // @include flexPosition(center, start);
    display: flex;
    flex-direction: column;
    background-color: darken(whitesmoke, $amount: 5.5);
    // color: grey;

    &-row {
      display: flex;
      flex-direction: row;
      //   justify-content: end;
      //   background-color: aqua;
      gap: 5px;
    }
    &-col1 {
      width: 10%;
    }
    &-col2 {
      width: 65%;
      padding-top: 1px;
    }
    &-col3 {
      width: 46px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    // &-col4 {
    //   width: 15%;
    // }
  }
}
</style>
