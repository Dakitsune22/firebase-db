<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import { linksList } from './links/links-list';
import useUI from 'src/composables/storeWrappers/useUI';

defineOptions({
  name: 'MainLayout',
});

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
const { userId } = useUI();

const pageKey = ref<number>(0);

// const forceRender = (): void => {
//   pageKey.value++;
// };
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> My~League </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <router-link :to="{ name: 'user' }" class="user-menu">
          <div>
            <q-icon name="account_circle" size="md" color="white" />
            <span style="margin-left: 3px">{{ userId }}</span>
          </div>
        </router-link>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menú </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />

        <q-item-label header style="font-size: 80%; margin-top: 40px">
          ® ~by Dakitsune22, 2025
        </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container :key="pageKey">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.user-menu {
  color: white;
  text-decoration: none;
}
</style>
