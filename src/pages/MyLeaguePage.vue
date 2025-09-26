<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ManageMyX from 'src/components/ManageMyX.vue';

defineOptions({
  name: 'MyLeaguePage',
});

const route = useRoute();

const pageKey = ref<number>(0);

const forcePageRender = (): void => {
  pageKey.value++;
  console.log('pageKey:', pageKey.value);
};

// console.log('Route name: ', route.name);
watch(
  () => route.name,
  (newName, oldName) => {
    console.log({ oldName }, { newName });
    if (newName !== oldName) {
      forcePageRender();
    }
  }
);
</script>

<template>
  <ManageMyX :key="pageKey" />
</template>

<style lang="scss" scoped></style>
