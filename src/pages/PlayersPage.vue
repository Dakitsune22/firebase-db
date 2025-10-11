<script setup lang="ts">
import useTeams from 'src/composables/useTeams';
import { Leagues, Player } from 'src/models';
import { Team } from 'src/models';
import { computed, onMounted, ref } from 'vue';
import { leaguesMap } from 'src/models/leagues';
import { useWindowScroll } from '@vueuse/core';
import { sleep } from 'src/helpers/functions';
import { Position } from 'src/models/player';

defineOptions({
  name: 'PlayersPage',
});

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

const { y } = useWindowScroll();
const loading = ref<boolean>(true);
const reloading = ref<boolean>(false);

interface PlayerExt {
  player: Player;
  teamShortName: string;
  leagueCountry: string;
  leagueDivision: number;
}

const allTeams = ref<Team[]>([]);
const allPlayers = ref<PlayerExt[]>([]);

// const selectedFiltersLeague = ref([
//   Leagues.LaLigaPrimeraDivision,
//   Leagues.LaLigaSegundaDivision,
//   Leagues.PremierLeague,
//   Leagues.Championship,
//   Leagues.SerieA,
//   Leagues.Bundesliga,
//   Leagues.Ligue1,
//   Leagues.OthersEurope,
//   Leagues.OthersWorld,
// ]);

const selectedFiltersLeague = ref([Leagues.LaLigaPrimeraDivision]);
const selectedFiltersPosition = ref([Position.DC]);

// const filteredTeams = computed(() => {
//   const t: Team[] = [];
//   // console.log(selectedFiltersLeague.value[0]);
//   selectedFiltersLeague.value.forEach((leagueFilter) => {
//     if (
//       leagueFilter === Leagues.LaLigaSegundaDivision ||
//       leagueFilter === Leagues.Championship
//     ) {
//       t.push(
//         ...allTeams.value.filter(
//           (te) =>
//             te.country.includes(leagueFilter.replace('-2', '')) &&
//             te.division === 2
//         )
//       );
//     } else {
//       t.push(
//         ...allTeams.value.filter(
//           (te) =>
//             te.country.includes(leagueFilter.replace('-1', '')) &&
//             te.division === 1
//         )
//       );
//     }
//   });
//   return t;
// });

const filteredPlayers = computed(() => {
  const p: PlayerExt[] = [];
  // console.log(selectedFiltersLeague.value[0]);
  selectedFiltersLeague.value.forEach((filter) => {
    p.push(
      ...allPlayers.value.filter(
        (pe) =>
          filter === pe.leagueCountry + '-' + pe.leagueDivision &&
          selectedFiltersPosition.value.findIndex(
            (pos) => pos === pe.player.position
          ) >= 0
      )
    );
  });
  p.sort((a, b) => b.player.overall - a.player.overall);
  return p;
});

const loadAllTeams = (): void => {
  console.log('loadAllTeams -> START');
  if (queryTeamsSpain1.data.value) {
    queryTeamsSpain1.data.value.forEach((team) => {
      allTeams.value.push({ ...team });
    });
  }
  if (queryTeamsSpain2.data.value) {
    queryTeamsSpain2.data.value.forEach((team) => {
      allTeams.value.push({ ...team });
    });
  }
  if (queryTeamsEngland1.data.value) {
    queryTeamsEngland1.data.value.forEach((team) => {
      allTeams.value.push({ ...team });
    });
  }
  if (queryTeamsEngland2.data.value) {
    queryTeamsEngland2.data.value.forEach((team) => {
      allTeams.value.push({ ...team });
    });
  }
  if (queryTeamsItaly.data.value) {
    queryTeamsItaly.data.value.forEach((team) => {
      allTeams.value.push({ ...team });
    });
  }
  if (queryTeamsGermany.data.value) {
    queryTeamsGermany.data.value.forEach((team) => {
      allTeams.value.push({ ...team });
    });
  }
  if (queryTeamsFrance.data.value) {
    queryTeamsFrance.data.value.forEach((team) => {
      allTeams.value.push({ ...team });
    });
  }
  if (queryTeamsOthersWorld.data.value) {
    queryTeamsOthersWorld.data.value.forEach((team) => {
      allTeams.value.push({ ...team });
    });
  }
  if (queryTeamsOthersEurope.data.value) {
    queryTeamsOthersEurope.data.value.forEach((team) => {
      allTeams.value.push({ ...team });
    });
  }
  console.log('loadAllTeams -> END');
};

const loadAllPlayers = () => {
  console.log('loadAllPlayers -> START');
  allTeams.value.forEach((team) => {
    team.players.forEach((player) => {
      allPlayers.value.push({
        player: { ...player },
        leagueCountry: team.country,
        leagueDivision: team.division,
        teamShortName: team.shortName,
      });
    });
  });
  // allPlayers.value.sort((a, b) => b.player.overall - a.player.overall);
  // console.log(allPlayers.value);
  console.log('loadAllPlayers -> END');
};

// const getPlayersSortedbyOverall = (players: Player[]): Player[] => {
//   const p: Player[] = [];
//   players.forEach((player) => {
//     p.push(player);
//   });
//   return p.sort((a, b) => b.overall - a.overall);
// };

const onSelectAllLeagues = async () => {
  reloading.value = true;
  console.log(reloading.value);
  await sleep(500);
  selectedFiltersLeague.value = [
    Leagues.LaLigaPrimeraDivision,
    Leagues.LaLigaSegundaDivision,
    Leagues.PremierLeague,
    Leagues.Championship,
    Leagues.SerieA,
    Leagues.Bundesliga,
    Leagues.Ligue1,
    Leagues.OthersEurope,
    Leagues.OthersWorld,
  ];
  reloading.value = false;
  console.log(reloading.value);
};

const onSelectAllPositions = async () => {
  reloading.value = true;
  console.log(reloading.value);
  await sleep(500);
  selectedFiltersPosition.value = [
    Position.POR,
    Position.DF,
    Position.LD,
    Position.LI,
    Position.MCD,
    Position.MC,
    Position.MCO,
    Position.ED,
    Position.EI,
    Position.DC,
  ];
  reloading.value = false;
  console.log(reloading.value);
};

onMounted(async () => {
  console.log('On mounted -> START');
  while (queryTeamsOthersEurope.isFetching.value) {
    console.log('STILL FETCHING...', queryTeamsOthersEurope.isFetching.value);
    await sleep(200);
  }
  console.log('FINALLY FETCHED!');
  loadAllTeams();
  console.log('Loaded teams:', allTeams.value.length);
  loadAllPlayers();
  console.log('Loaded players:', allPlayers.value.length);
  console.log('On mounted -> END');
  loading.value = false;
});
</script>

<template>
  <div ref="topElement" id="topElement" />
  <div class="stats">
    <div v-if="!loading">
      <Transition name="scrollbtn">
        <q-btn
          v-show="y > 150"
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
      </Transition>
      <div class="my-filters">
        <span class="text-primary">Ligas:</span><br />
        <q-checkbox
          v-for="(option, i) in leaguesMap.length"
          :key="option"
          v-model="selectedFiltersLeague"
          :val="leaguesMap[i].value"
          :label="leaguesMap[i].label"
          color="primary"
          dense
          class="q-mb-sm q-mr-lg"
        />
        <div class="q-mt-xs q-mb-md">
          <q-btn
            color="primary"
            label="Seleccionar todas"
            class="q-mr-sm"
            unelevated
            @click="onSelectAllLeagues()"
            :loading="reloading"
          />
          <q-btn
            color="primary"
            label="Ninguna"
            unelevated
            @click="selectedFiltersLeague = []"
          />
        </div>
        <span class="text-primary">Posiciones:</span><br />
        <q-checkbox
          v-for="option in Position"
          :key="option"
          v-model="selectedFiltersPosition"
          :val="option"
          :label="option"
          color="primary"
          dense
          class="q-mb-sm q-mr-lg"
        />
        <div class="q-mt-xs">
          <q-btn
            color="primary"
            label="Seleccionar todas"
            class="q-mr-sm"
            unelevated
            @click="onSelectAllPositions()"
            :loading="reloading"
          />
          <q-btn
            color="primary"
            label="Ninguna"
            unelevated
            @click="selectedFiltersPosition = []"
          />
        </div>
      </div>
      <q-card
        v-for="(item, rank) in filteredPlayers"
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
          <div class="my-card-row">
            <div class="my-card-col1">
              <q-img
                :src="`/images/leagues/${item.leagueCountry.replace('-', '')}${
                  item.leagueDivision
                }.png`"
                spinner-color="primary"
                width="24px"
                fit="fill"
              />
              <q-img
                :src="`/images/teams-${item.leagueCountry}/${item.teamShortName}.png`"
                spinner-color="white"
                width="26px"
                height="26px"
              />
              <q-img
                :src="`/images/flags/h20/${item.player.nationality}.png`"
                spinner-color="white"
                width="29px"
                height="18px"
                fit="fill"
                style="border: 1px solid rgba(0, 0, 0, 65%)"
              />
            </div>
            <div class="my-card-col2">
              <div v-if="item.player.nickname">
                {{ item.player.nickname }}
              </div>
              <div v-else>
                {{ item.player.name + ' ' + item.player.surname }}
              </div>
            </div>
            <div class="my-card-col3">
              <q-badge outline color="primary" style="font-size: 11px">
                {{ item.player.position }}
              </q-badge>
            </div>
            <div class="my-card-col4">
              <q-badge
                color="primary"
                style="
                  font-size: 11px;
                  /* margin-top: 3px; */
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
                {{ item.player.overall }}
              </q-badge>
            </div>
          </div>
          <!-- <div class="my-card-footer">
            <q-img
              :src="`/images/teams-${item.leagueCountry}/${item.teamShortName}.png`"
              spinner-color="white"
              width="40px"
              height="40px"
            />
            <q-img
              :src="`/images/leagues/${item.leagueCountry}${item.leagueDivision}.png`"
              spinner-color="primary"
              width="40px"
              fit="fill"
            />
          </div> -->
        </q-card-section>
      </q-card>
    </div>
    <div class="loading-container" v-else>
      <q-spinner color="primary" size="48px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$darkGrey: rgba(42, 42, 42, 0.692);
.stats {
  @include flexPosition(center, center);
  margin-top: 20px;
  margin-bottom: 10px;
}
.my-filters {
  width: 370px;
  // padding-top: 8px;
  padding-left: 16px;
  margin-bottom: 30px;
  border-left: 6px solid $primary;
  color: $darkGrey;
}
.my-card {
  width: 370px;
  color: $darkGrey;
  background-color: darken(whitesmoke, $amount: 0.5);

  &-row {
    display: flex;
    flex-direction: row;
    // justify-content: center;
    // align-items: center;
    //   background-color: aqua;
    gap: 5px;
  }
  &-col1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 35%;
    // gap: 5px;
    // background-color: aqua;
  }
  &-col2 {
    width: 55%;
    padding-top: 3px;
    padding-left: 3px;
  }
  &-col3 {
    width: 46px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // background-color: aquamarine;
  }
  &-col4 {
    // width: 40px;
    // height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: aqua;
  }
  // &-footer {
  //   @include flexPosition(center, center);
  //   margin-top: 10px;
  //   gap: 20px;
  //   // background-color: aqua;
  // }
}
.loading-container {
  @include flexPosition(center, center);
  margin-top: 30px;
  // width: 100vw;
  // height: fit-content;
  // background-color: aquamarine;
}
/* Transition */
.scrollbtn-enter-active,
.scrollbtn-leave-active {
  transition: all 1s ease;
}
.scrollbtn-enter-from,
.scrollbtn-leave-to {
  opacity: 0;
  transform: translateX(80px);
  transition: all 1s ease;
}
</style>
