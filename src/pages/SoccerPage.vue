<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import SoccerLeague from 'src/components/SoccerLeague.vue';

const route = useRoute();

const pageKey = ref<number>(0);

const forcePageRender = (): void => {
  pageKey.value++;
};

watch(
  () => route.params.id,
  (newId, oldId) => {
    console.log({ oldId }, { newId });
    if (newId !== oldId) {
      forcePageRender();
    }
  }
);
</script>

<template>
  <soccer-league :key="pageKey" />
</template>

<style lang="scss" scoped></style>
