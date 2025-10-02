<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import EssentialLink from 'components/EssentialLink.vue';
import {
  linksList,
  linksListManage,
  linksListLeagues,
  linksListCups,
} from './links/links-list';
import useUI from 'src/composables/storeWrappers/useUI';
import { Leagues, leaguesMap } from 'src/models/leagues';

defineOptions({
  name: 'MainLayout',
});

const route = useRoute();

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
const { userId } = useUI();

const pageKey = ref<number>(0);

// const forceRender = (): void => {
//   pageKey.value++;
// };

const currentTitle = ref<string>('');

const setCurrentTitle = (newPath: string): void => {
  switch (newPath) {
    case '/':
      currentTitle.value = 'My~Soccer by Dak';
      break;
    case '/':
      currentTitle.value = 'My~Soccer by Dak';
      break;
    case '/user':
      currentTitle.value = 'Usuario';
      break;
    case '/stats':
      currentTitle.value = 'Ranking: Equipos';
      break;
    case '/mycup':
      currentTitle.value = 'Gestión: My~Cup';
      break;
    case '/myleague':
      currentTitle.value = 'Gestión: My~League';
      break;
    case '/soccer-myleague':
      currentTitle.value = 'My~League';
      break;
    case '/soccer-mycup':
      currentTitle.value = 'My~Cup';
      break;
    case `/soccer/${Leagues.LaLigaPrimeraDivision}`:
      currentTitle.value = `${
        Object.values(leaguesMap).find(
          (league) => league.value === Leagues.LaLigaPrimeraDivision
        )?.label
      }`;
      break;
    case `/soccer/${Leagues.PremierLeague}`:
      currentTitle.value = `${
        Object.values(leaguesMap).find(
          (league) => league.value === Leagues.PremierLeague
        )?.label
      }`;
      break;
    case `/soccer/${Leagues.SerieA}`:
      currentTitle.value = `${
        Object.values(leaguesMap).find(
          (league) => league.value === Leagues.SerieA
        )?.label
      }`;
      break;
    case `/soccer/${Leagues.Bundesliga}`:
      currentTitle.value = `${
        Object.values(leaguesMap).find(
          (league) => league.value === Leagues.Bundesliga
        )?.label
      }`;
      break;
    case `/soccer/${Leagues.Ligue1}`:
      currentTitle.value = `${
        Object.values(leaguesMap).find(
          (league) => league.value === Leagues.Ligue1
        )?.label
      }`;
      break;
    default:
      break;
  }
};

watch(
  () => route.path,
  (newPath, oldPath) => {
    console.log({ oldPath }, { newPath });
    if (newPath !== oldPath) {
      setCurrentTitle(newPath);
    }
  }
);

onBeforeMount(() => setCurrentTitle(route.path));
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

        <!-- <span style="margin-left: 10px">®</span> -->
        <q-toolbar-title class="title"> {{ currentTitle }}</q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <router-link :to="{ name: 'user' }" class="user-menu">
          <div>
            <q-icon name="account_circle" size="sm" color="amber-5" />
            <span class="user-menu-text">{{ userId }}</span>
          </div>
        </router-link>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list class="q-mt-md">
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
        <q-separator class="q-mt-md q-mb-sm" />
        <q-item-label header> Gestión </q-item-label>

        <EssentialLink
          v-for="link in linksListManage"
          :key="link.title"
          v-bind="link"
        />
        <q-separator class="q-mt-md q-mb-sm" />
        <q-item-label header> Ligas </q-item-label>

        <EssentialLink
          v-for="link in linksListLeagues"
          :key="link.title"
          v-bind="link"
        />
        <q-separator class="q-mt-md q-mb-sm" />
        <q-item-label header> Eliminatorias </q-item-label>

        <EssentialLink
          v-for="link in linksListCups"
          :key="link.title"
          v-bind="link"
        />
        <q-separator class="q-mt-md" />
        <q-item-label
          header
          style="font-size: 80%; margin-top: 20px; display: flex"
        >
          <div
            style="
              font-family: Verdana, Geneva, Tahoma, sans-serif;
              margin-right: 2px;
            "
          >
            ©
          </div>
          <div style="padding-top: 1px">2025, ~by Dakitsune22</div>
        </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container :key="pageKey">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.title {
  font-size: 20px;
}
.user-menu {
  color: white;
  text-decoration: none;
  font-size: 11px;

  &-text {
    color: $amber-4;
    margin-left: 3px;
  }
}
</style>
