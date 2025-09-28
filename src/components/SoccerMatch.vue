<script setup lang="ts">
import { ref } from 'vue';
import useSoccer from 'src/composables/storeWrappers/useSoccer';
import { Match } from 'src/models/season-round';
import useRoundsMutation from 'src/composables/useRoundMutation';
import useTeamMutation from 'src/composables/useTeamMutation';
import useTeams from 'src/composables/useTeams';
import { Leagues, Team } from 'src/models';
import {
  getStartingLineup,
  getScorers,
  getMatchResult,
} from 'src/helpers/match-play';
import SoccerMatchStats from './SoccerMatchStats.vue';
import usePlayers from 'src/composables/usePlayers';
import { useRoute } from 'vue-router';

const props = defineProps<Match>();

const emit = defineEmits<{
  (e: 'gamePlayed', matchId: number): void;
}>();

const route = useRoute();

const matchRef = ref<Match>({
  id: props.id,
  played: props.played,
  team1: props.team1,
  team2: props.team2,
  score1: props.score1,
  score2: props.score2,
  startingLineup1: props.startingLineup1,
  startingLineup2: props.startingLineup2,
  scorers1: props.scorers1,
  scorers2: props.scorers2,
});

const { roundMatches, getCurrentRound, getCurrentLeague } = useSoccer();
const { mutateRoundPlay } = useRoundsMutation();
const { mutateTeamUpdateStats } = useTeamMutation();
const { queryTopScorers } = usePlayers();
const { queryTeamsByPoints } = useTeams(getCurrentLeague());

const { queryTeamById: qt1 } = useTeams(
  getCurrentLeague(),
  matchRef.value.team1
);
const { queryTeamById: qt2 } = useTeams(
  getCurrentLeague(),
  matchRef.value.team2
);

const showMatchStats = ref<boolean>(false);

// const mStatsKey = ref<number>(0);
// const forceRender = (): void => {
//   mStatsKey.value++;
//   console.log(matchRef.value.startingLineup1);
// };

const onPlayMatch = async () => {
  if (matchRef.value.played) return;

  // Si estamos en copa, actualizamos la query de datos de ambos equipos,
  // para no perder nos goles del primer partido
  if (
    route.name?.toString().includes(Leagues.MyCup)
    // && matchRef.value.id % 2 === 0
  ) {
    await qt1.refetch();
    // console.log('*** Partido de copa: Esperamos QT1 refetch');
    await qt2.refetch();
    // console.log('*** Partido de copa: Esperamos QT2 refetch');
  }
  // console.log('*** onPlayMatch: Iniciamos tratamiento ***');

  // Obtener onces iniciales:
  matchRef.value.startingLineup1 = getStartingLineup(qt1.data.value as Team);
  matchRef.value.startingLineup2 = getStartingLineup(qt2.data.value as Team);

  // Calcular resultado:
  matchRef.value.played = true;
  const matchResult = getMatchResult(
    matchRef.value.startingLineup1.reduce((a, b) => a + b.overall, 0) / 11,
    matchRef.value.startingLineup2.reduce((a, b) => a + b.overall, 0) / 11
  );
  matchRef.value.score1 = matchResult.localScore;
  matchRef.value.score2 = matchResult.awayScore;

  // Obtener goleadores:
  matchRef.value.scorers1 = getScorers(
    matchRef.value.score1,
    matchRef.value.startingLineup1
  );
  matchRef.value.scorers2 = getScorers(
    matchRef.value.score2,
    matchRef.value.startingLineup2
  );

  // Actualizar datos de los equipos en store y BBDD.
  roundMatches.value[matchRef.value.id - 1].played = matchRef.value.played;
  roundMatches.value[matchRef.value.id - 1].score1 = matchRef.value.score1;
  roundMatches.value[matchRef.value.id - 1].score2 = matchRef.value.score2;
  roundMatches.value[matchRef.value.id - 1].startingLineup1 =
    matchRef.value.startingLineup1;
  roundMatches.value[matchRef.value.id - 1].startingLineup2 =
    matchRef.value.startingLineup2;
  roundMatches.value[matchRef.value.id - 1].scorers1 = matchRef.value.scorers1;
  roundMatches.value[matchRef.value.id - 1].scorers2 = matchRef.value.scorers2;

  mutateRoundPlay.mutate({
    round: getCurrentRound(),
    matches: roundMatches.value,
  });

  mutateTeamUpdateStats.mutate({
    league: getCurrentLeague(),
    id: matchRef.value.team1,
    newGoalsScored: matchRef.value.score1,
    newGoalsConceded: matchRef.value.score2,
    scorers: matchRef.value.scorers1,
    team: qt1.data.value ? qt1.data.value : ({} as Team),
  });

  mutateTeamUpdateStats.mutate(
    {
      league: getCurrentLeague(),
      id: matchRef.value.team2,
      newGoalsScored: matchRef.value.score2,
      newGoalsConceded: matchRef.value.score1,
      scorers: matchRef.value.scorers2,
      team: qt2.data.value ? qt2.data.value : ({} as Team),
    },
    {
      onSuccess: async () => {
        // console.log('Mutate team update successful');

        // Actualizamos query de goleadores, para que se refresquen en pantalla:
        queryTopScorers.refetch();
        queryTeamsByPoints.refetch();

        // Lanzamos emit para que la página principalreciba evento de partido jugado:
        emit('gamePlayed', matchRef.value.id);
      },
    }
  );
};
</script>

<template>
  <div>
    <q-list bordered separator dense class="list">
      <q-item class="item">
        <q-item-section>
          <q-img
            :src="`/images/teams-${qt1.data.value?.country}/${qt1.data.value?.shortName}.png`"
            spinner-color="white"
            width="22px"
            height="22px"
          />
        </q-item-section>
        <q-item-section side class="section-team">{{
          // getCurrentLeague() === Leagues.LaLigaPrimeraDivision
          //   ? teamsSpain1[props.team1].name
          //   : getCurrentLeague() === Leagues.PremierLeague
          //   ? teamsEngland1[props.team1].name
          //   : getCurrentLeague() === Leagues.Bundesliga
          //   ? teamsGermany1[props.team1].name
          //   : getCurrentLeague() === Leagues.SerieA
          //   ? teamsItaly1[props.team1].name
          //   : getCurrentLeague() === Leagues.Ligue1
          //   ? teamsFrance1[props.team1].name
          //   : 'No team'
          qt1.data.value?.name
        }}</q-item-section>
        <q-item-section class="section-score"
          >{{ matchRef.score1 }}
        </q-item-section>
        <q-item-section class="section-score">{{
          matchRef.score2
        }}</q-item-section>
        <q-item-section style="padding-left: 7px">
          <q-img
            :src="`/images/teams-${qt2.data.value?.country}/${qt2.data.value?.shortName}.png`"
            spinner-color="white"
            width="22px"
            height="22px"
          />
        </q-item-section>
        <q-item-section side class="section-team">{{
          // getCurrentLeague() === Leagues.LaLigaPrimeraDivision
          //   ? teamsSpain1[props.team2].name
          //   : getCurrentLeague() === Leagues.PremierLeague
          //   ? teamsEngland1[props.team2].name
          //   : getCurrentLeague() === Leagues.Bundesliga
          //   ? teamsGermany1[props.team2].name
          //   : getCurrentLeague() === Leagues.SerieA
          //   ? teamsItaly1[props.team2].name
          //   : getCurrentLeague() === Leagues.Ligue1
          //   ? teamsFrance1[props.team2].name
          //   : 'No team'
          qt2.data.value?.name
        }}</q-item-section>
        <q-item-section
          class="section-sim"
          :class="
            matchRef.played ? 'section-sim-disabled' : 'section-sim-enabled'
          "
          ><q-icon name="play_circle" size="26px" @click="onPlayMatch"
        /></q-item-section>
        <q-item-section
          class="section-sim"
          :class="
            matchRef.played ? 'section-sim-enabled' : 'section-sim-disabled'
          "
          @click="
            matchRef.played
              ? (showMatchStats = !showMatchStats)
              : (showMatchStats = showMatchStats)
          "
          ><q-icon name="query_stats" size="22px"
        /></q-item-section>
      </q-item>
    </q-list>
    <soccer-match-stats
      v-if="showMatchStats"
      :id="matchRef.id"
      :played="matchRef.played"
      :score1="matchRef.score1"
      :score2="matchRef.score2"
      :startingLineup1="matchRef.startingLineup1"
      :startingLineup2="matchRef.startingLineup2"
      :scorers1="matchRef.scorers1"
      :scorers2="matchRef.scorers2"
      :team1="matchRef.team1"
      :team2="matchRef.team2"
    />
  </div>
</template>

<style lang="scss" scoped>
$darkGrey: rgba(42, 42, 42, 0.692);
$midGrey: rgb(150, 150, 150);

.list {
  border: 1px solid $midGrey;
  border-radius: 0.2em;
  margin-top: 2px;
}

.item {
  background-color: lightgrey;
}
.section {
  &-team {
    // background-color: aquamarine;
    align-items: start;
    width: 135px;
    padding-left: 3px;
    font-size: 13px;
    padding-top: 2px;
    color: $darkGrey;
  }
  &-score {
    background-color: $darkGrey;
    color: whitesmoke;
    width: 30px;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
  }
  &-sim {
    // width: 20px;
    // background-color: bisque;

    &-enabled {
      color: $darkGrey;
      cursor: pointer;

      :hover {
        color: $primary;
      }
    }
    &-disabled {
      color: white;
      cursor: default;
    }
  }
}
</style>
