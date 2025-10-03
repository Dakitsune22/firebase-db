<script setup lang="ts">
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
  if (
    iKey === 1 &&
    getCurrentLeague() !== Leagues.LaLigaSegundaDivision &&
    getCurrentLeague() !== Leagues.Championship
  ) {
    return 'best';
  } else if (
    iKey >= 2 &&
    iKey <= 4 &&
    getCurrentLeague() !== Leagues.MyLeague &&
    getCurrentLeague() !== Leagues.LaLigaSegundaDivision &&
    getCurrentLeague() !== Leagues.Championship
  ) {
    return 'champions';
  } else if (iKey === 2 && getCurrentLeague() === Leagues.MyLeague) {
    return 'champions';
  } else if (
    (iKey === 5 && getCurrentLeague() !== Leagues.MyLeague) ||
    (iKey >= 3 &&
      iKey <= 6 &&
      (getCurrentLeague() === Leagues.LaLigaSegundaDivision ||
        getCurrentLeague() === Leagues.Championship))
  ) {
    return 'uefa';
  } else if (
    (iKey === 6 && getCurrentLeague() !== Leagues.MyLeague) ||
    (iKey <= 2 &&
      (getCurrentLeague() === Leagues.LaLigaSegundaDivision ||
        getCurrentLeague() === Leagues.Championship))
  ) {
    return 'conference';
  } else if (
    iKey === 16 &&
    (getCurrentLeague() === Leagues.Bundesliga ||
      getCurrentLeague() === Leagues.Ligue1)
  ) {
    return 'relegation-playoff';
  } else if (
    (iKey >= 18 &&
      getCurrentLeague() !== Leagues.Bundesliga &&
      getCurrentLeague() !== Leagues.Ligue1 &&
      getCurrentLeague() !== Leagues.LaLigaSegundaDivision &&
      getCurrentLeague() !== Leagues.Championship &&
      getCurrentLeague() !== Leagues.MyLeague) ||
    (iKey >= 17 &&
      (getCurrentLeague() === Leagues.Bundesliga ||
        getCurrentLeague() === Leagues.Ligue1)) ||
    (iKey >= 19 && getCurrentLeague() === Leagues.LaLigaSegundaDivision) ||
    (iKey >= 22 && getCurrentLeague() === Leagues.Championship)
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
            :src="`/images/teams-${props.team.country}/${props.team.shortName}.png`"
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
      border-color: darken($color: rgb(253, 206, 88), $amount: 25%);
    }
    &-champions {
      border-color: darken($color: rgb(255, 220, 133), $amount: 32%);
    }
    &-uefa {
      border-color: darken($color: rgb(152, 220, 252), $amount: 25%);
    }
    &-conference {
      border-color: darken($color: rgb(172, 231, 200), $amount: 25%);
    }
    &-relegation {
      border-color: darken($color: rgb(241, 169, 169), $amount: 25%);
    }
    &-relegation-playoff {
      border-color: darken($color: rgb(243, 194, 194), $amount: 25%);
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
    align-items: center;
    width: 28px;
    font-size: 11px;
    color: $darkGrey;
    padding-top: 2px;
    // background-color: aquamarine;
  }
  //&-img {
  // width: 30px;
  // height: 40px;
  // background-color: aqua;
  //}
  &-team {
    // background-color: aquamarine;
    align-items: start;
    width: 140px;
    padding-left: 3px;
    font-size: 13px;
    // font-weight: 500;
    color: $darkGrey;
    padding-top: 2px;
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
      // font-size: 14px;
      font-size: small;
      color: $darkGrey;
      padding-top: 2px;
      // width: 10px;
    }
  }
}
</style>
