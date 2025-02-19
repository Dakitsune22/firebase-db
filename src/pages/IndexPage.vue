<script setup lang="ts">
import useUserInfoMutation from 'src/composables/useUserInfoMutation';

const { mutateUserInfo } = useUserInfoMutation();

mutateUserInfo.mutate();
</script>

<template>
  <q-page class="row items-center justify-evenly"> INDEX </q-page>
</template>
