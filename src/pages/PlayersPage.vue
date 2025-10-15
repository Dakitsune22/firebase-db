<script setup lang="ts">
import useTeams from 'src/composables/useTeams';
import { Leagues, Player } from 'src/models';
import { Team } from 'src/models';
import { computed, onMounted, ref } from 'vue';
import { leaguesMap } from 'src/models/leagues';
import { useWindowScroll } from '@vueuse/core';
import { getAge, sleep } from 'src/helpers/functions';
import { flagMap, Position } from 'src/models/player';

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
const showFilters = ref<boolean>(true);

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

const selectedNationality = ref<string>();
const nationalityOptions: string[] = [];
const x = Array.from(flagMap.keys());
x.forEach((k) => nationalityOptions.push(k));

const selectedFiltersLeague = ref([Leagues.LaLigaPrimeraDivision]);
const selectedFiltersPosition = ref([Position.DC]);

const ageFilter = ref({
  min: 15,
  max: 49,
});
const ageRange = ref({
  min: 15,
  max: 49,
});
const heightFilter = ref({
  min: 160,
  max: 210,
});
const heightRange = ref({
  min: 160,
  max: 210,
});

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
    if (selectedNationality.value) {
      p.push(
        ...allPlayers.value.filter(
          (pe) =>
            filter === pe.leagueCountry + '-' + pe.leagueDivision &&
            selectedFiltersPosition.value.findIndex(
              (pos) => pos === pe.player.position
            ) >= 0 &&
            pe.player.nationality === selectedNationality.value &&
            ((pe.player.height &&
              pe.player.height >= heightFilter.value.min &&
              pe.player.height <= heightFilter.value.max) ||
              pe.player.height === undefined) &&
            ((pe.player.birthDate &&
              getAge(pe.player.birthDate) >= ageFilter.value.min &&
              getAge(pe.player.birthDate) <= ageFilter.value.max) ||
              pe.player.birthDate === undefined)
        )
      );
    } else {
      p.push(
        ...allPlayers.value.filter(
          (pe) =>
            filter === pe.leagueCountry + '-' + pe.leagueDivision &&
            selectedFiltersPosition.value.findIndex(
              (pos) => pos === pe.player.position
            ) >= 0 &&
            ((pe.player.height &&
              pe.player.height >= heightFilter.value.min &&
              pe.player.height <= heightFilter.value.max) ||
              pe.player.height === undefined) &&
            ((pe.player.birthDate &&
              getAge(pe.player.birthDate) >= ageFilter.value.min &&
              getAge(pe.player.birthDate) <= ageFilter.value.max) ||
              pe.player.birthDate === undefined)
        )
      );
    }
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
          v-show="(y > 650 && showFilters) || (y > 150 && !showFilters)"
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
      <q-btn
        color="primary"
        flat
        dense
        size="md"
        :style="
          showFilters
            ? 'position: absolute; translate: 310px 2px; transition: translate .5s ease;'
            : 'position: absolute; translate: 0px -2px; transition: translate .5s ease; z-index: 1;'
        "
        :icon="showFilters ? 'filter_alt' : 'filter_alt_off'"
        @click="showFilters = !showFilters"
      />
      <Transition name="scrollbtn">
        <div v-show="showFilters" class="my-filters">
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
          <div class="q-mt-xs q-mb-md">
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
          <span class="text-primary">Nacionalidad:</span>
          <div class="q-mb-md" style="width: 312px">
            <q-select
              v-model="selectedNationality"
              :options="nationalityOptions"
              :display-value="
                selectedNationality ? flagMap.get(selectedNationality) : ''
              "
              options-dense
              dense
              clearable
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-img
                    :src="`/images/flags/h24/${scope.opt}.png`"
                    spinner-color="white"
                    height="24px"
                    width="40px"
                    fit="fill"
                    class="q-mr-sm"
                    style="border: 1px solid rgba(0, 0, 0, 65%)"
                  />
                  {{ flagMap.get(scope.opt) }}
                </q-item>
              </template>
            </q-select>
          </div>
          <span class="text-primary">Edad:</span>
          <div>
            <q-range
              v-model="ageRange"
              :min="15"
              :max="49"
              :step="1"
              style="width: 302px; padding-top: 30px; padding-left: 10px"
              label-always
              @change="
                (val) => {
                  // console.log(val);
                  ageFilter = val;
                }
              "
              color="primary"
            />
          </div>
          <span class="text-primary">Altura (cm):</span>
          <div>
            <q-range
              v-model="heightRange"
              :min="160"
              :max="210"
              :step="1"
              style="width: 302px; padding-top: 30px; padding-left: 10px"
              label-always
              @change="
                (val) => {
                  // console.log(val);
                  heightFilter = val;
                }
              "
              color="primary"
            />
          </div>
          <!-- {{ heightRange }}
          {{ heightFilter }} -->
        </div>
      </Transition>
      <div :class="showFilters ? '' : 'q-mt-xl'">
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

          <q-card-section class="q-pa-sm">
            <div class="my-card-section">
              <div class="my-card-section-left">
                <q-img
                  :src="`/images/leagues/${item.leagueCountry.replace(
                    '-',
                    ''
                  )}${item.leagueDivision}.png`"
                  spinner-color="primary"
                  width="40px"
                  fit="fill"
                />
                <q-img
                  :src="`/images/teams-${item.leagueCountry}/${item.teamShortName}.png`"
                  spinner-color="white"
                  width="40px"
                  height="40px"
                />
              </div>
              <div class="my-card-section-right">
                <div class="my-card-row">
                  <div>
                    <q-img
                      :src="`/images/flags/h20/${item.player.nationality}.png`"
                      spinner-color="white"
                      width="29px"
                      height="18px"
                      fit="fill"
                      style="border: 1px solid rgba(0, 0, 0, 65%)"
                    />
                  </div>
                  <div class="my-card-section-right-col2w">
                    <div v-if="item.player.nickname">
                      {{ item.player.nickname }}
                    </div>
                    <div v-else>
                      {{ item.player.name + ' ' + item.player.surname }}
                    </div>
                  </div>
                </div>
                <div class="my-card-row q-mt-xs">
                  <div class="my-card-section-right-col1"></div>
                  <div class="my-card-section-right-col2">
                    <!-- <div> -->
                    <span v-if="item.player.birthDate"
                      >{{ getAge(item.player.birthDate) }} años</span
                    >
                    <span v-if="item.player.height" class="q-ml-sm"
                      >{{
                        (item.player.height / 100).toFixed(2).replace('.', ',')
                      }}m</span
                    >
                    <!-- </div> -->
                  </div>
                  <div class="my-card-section-right-col3">
                    <q-badge outline color="primary" style="font-size: 11px">
                      {{ item.player.position }}
                    </q-badge>
                  </div>
                  <div class="my-card-section-right-col4">
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
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
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

  &-section {
    @include flexPosition(center, center);
    // height: 100%;
    // width: 100%;
    // background-color: greenyellow;
    gap: 10px;

    &-left {
      @include flexPosition(center, center);
      width: 30%;
      padding-left: 4px;
      gap: 8px;
      // background-color: pink;
    }
    &-right {
      width: 70%;
      // background-color: palevioletred;

      &-col1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 10%;
        // gap: 5px;
        // background-color: aqua;
      }
      &-col2 {
        width: 50%;
        // padding-top: 3px;
        padding-left: 9px;
        font-size: 11px;
        color: lighten($color: grey, $amount: 10%);
        // background-color: aquamarine;
      }
      &-col2w {
        // width: 50%;
        margin-top: 1px;
        padding-left: 2px;
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
    }
  }

  &-row {
    display: flex;
    flex-direction: row;
    // justify-content: center;
    // align-items: center;
    //   background-color: aqua;
    gap: 5px;
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
