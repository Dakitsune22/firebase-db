<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import {
  linksList,
  linksListManage,
  linksListLeagues,
} from './links/links-list';
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

        <!-- <span style="margin-left: 10px">®</span> -->
        <q-toolbar-title class="title"> My~League </q-toolbar-title>

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
