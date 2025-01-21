<script setup lang="ts">
// import { teamsSpain1 } from 'src/data/teams';
import useSoccer from 'src/composables/storeWrappers/useSoccer';
import { Leagues } from 'src/models';
import { Team } from 'src/models/team';

interface Props {
  team: Team;
  iKey: number;
}
const props = defineProps<Props>();

const { getCurrentLeague } = useSoccer();

const getRankClass = (iKey: number) => {
  if (iKey === 1) {
    return 'best';
  } else if (iKey >= 2 && iKey <= 4) {
    return 'champions';
  } else if (iKey === 5) {
    return 'uefa';
  } else if (iKey === 6) {
    return 'conference';
  } else if (
    (iKey === 16 && getCurrentLeague() === Leagues.Bundesliga) ||
    (iKey === 18 && getCurrentLeague() === Leagues.Ligue1)
  ) {
    return 'relegation-playoff';
  } else if (
    (iKey >= 18 &&
      getCurrentLeague() !== Leagues.Bundesliga &&
      getCurrentLeague() !== Leagues.Ligue1) ||
    (iKey >= 17 && getCurrentLeague() === Leagues.Bundesliga) ||
    (iKey >= 19 && getCurrentLeague() === Leagues.Ligue1)
  ) {
    return 'relegation';
  }
};
</script>

<template>
  <div>
    <q-list
      bordered
      separator
      dense
      class="list"
      :class="`list-rank-${getRankClass(iKey)}`"
    >
      <q-item class="item" :class="`item-rank-${getRankClass(iKey)}`">
        <q-item-section side class="section-rank">{{ iKey }}</q-item-section>
        <q-item-section class="section-img">
          <q-img
            :src="`/images/teams-${getCurrentLeague()}/${props.team.id}.png`"
            spinner-color="white"
            width="30px"
            height="30px"
          />
        </q-item-section>
        <q-item-section side class="section-team">{{
          // teamsSpain1[props.team.id]
          props.team.name
        }}</q-item-section>
        <q-item-section class="section-value section-value-points">{{
          props.team.points
        }}</q-item-section>
        <q-item class="item-values" dense>
          <q-item-section class="section-value section-value-others">{{
            props.team.matchesPlayed
          }}</q-item-section>
          <q-item-section class="section-value section-value-others">{{
            props.team.wins
          }}</q-item-section>
          <q-item-section class="section-value section-value-others">{{
            props.team.draws
          }}</q-item-section>
          <q-item-section class="section-value section-value-others">{{
            props.team.losses
          }}</q-item-section>
          <q-item-section class="section-value section-value-others">{{
            props.team.goalsScored
          }}</q-item-section>
          <q-item-section class="section-value section-value-others">{{
            props.team.goalsConceded
          }}</q-item-section>
        </q-item>
      </q-item>
    </q-list>
  </div>
</template>

<style lang="scss" scoped>
$darkGrey: rgba(42, 42, 42, 0.692);

.list {
  border-color: rgb(150, 150, 150);
  border-width: 1px 1px 1px 1px;
  border-radius: 0.2em;
  margin-top: 2px;

  &-rank {
    &-best {
      border-color: rgb(228, 170, 25);
    }
    &-champions {
      border-color: rgb(233, 181, 50);
    }
    &-uefa {
      border-color: rgb(83, 194, 245);
    }
    &-conference {
      border-color: rgb(90, 197, 140);
    }
    &-relegation {
      border-color: rgb(201, 61, 61);
    }
    &-relegation-playoff {
      border-color: rgb(212, 99, 99);
    }
  }
}

.item {
  background-color: lightgrey;
  // border: 1px solid darkgrey;
  // width: 400px;

  &-values {
    width: 200px;
    padding-right: 0;
  }

  &-rank {
    &-best {
      background-color: rgb(253, 206, 88);
    }
    &-champions {
      background-color: rgb(255, 220, 133);
    }
    &-uefa {
      background-color: rgb(152, 220, 252);
    }
    &-conference {
      background-color: rgb(172, 231, 200);
    }
    &-relegation {
      background-color: rgb(241, 169, 169);
    }
    &-relegation-playoff {
      background-color: rgb(243, 194, 194);
    }
  }
}

.section {
  &-rank {
    align-items: end;
    width: 28px;
    font-size: 12px;
    color: $darkGrey;
  }
  &-img {
    // width: 30px;
    // height: 40px;
    // background-color: aqua;
  }
  &-team {
    // background-color: aquamarine;
    align-items: start;
    width: 140px;
    padding-left: 5px;
    font-size: larger;
    // font-weight: 500;
    color: $darkGrey;
  }

  &-value {
    align-items: center;

    &-points {
      // text-align: center;
      width: 50px;
      background-color: $darkGrey;
      color: whitesmoke;
      font-size: 20px;
      font-weight: 500;
    }

    &-others {
      // background-color: whitesmoke;
      font-size: 14px;
      // width: 10px;
    }
  }
}
</style>
