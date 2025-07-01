<script setup lang="ts">
import useUserInfoMutation from 'src/composables/useUserInfoMutation';

const { mutateUserInfo } = useUserInfoMutation();

mutateUserInfo.mutate();
</script>

<template>
  <q-page class="index-main">
    <q-img
      :src="'/images/MyLeagueDog550x800.png'"
      spinner-color="primary"
      width="550px"
      height="800px"
      fit="fill"
    />
    <div class="index-leagues">
      <div class="index-leagues-img">
        <q-img
          :src="'/images/leagues/spain1.png'"
          spinner-color="primary"
          width="100px"
          fit="fill"
        />
      </div>
      <div class="index-leagues-img">
        <q-img
          :src="'/images/leagues/england1.png'"
          spinner-color="primary"
          width="100px"
          fit="fill"
        />
      </div>
      <div class="index-leagues-img">
        <q-img
          :src="'/images/leagues/italy1.png'"
          spinner-color="primary"
          width="100px"
          fit="fill"
        />
      </div>
      <div class="index-leagues-img">
        <q-img
          :src="'/images/leagues/germany1.png'"
          spinner-color="primary"
          width="100px"
          fit="fill"
        />
      </div>
      <div class="index-leagues-img">
        <q-img
          :src="'/images/leagues/france1.png'"
          spinner-color="primary"
          width="100px"
          fit="fill"
        />
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.index-main {
  // display: flex;
  @include flexPosition(center, center);
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  // background-color: aqua;

  @include response('mobile') {
    zoom: 60%;
    margin-top: 100px;
  }
}
.index-leagues {
  @include flexPosition(space-between, center);
  width: 550px;
  margin-left: 20px;
  // background-color: aqua;

  &-img {
    // background-color: aquamarine;
  }
}
</style>
