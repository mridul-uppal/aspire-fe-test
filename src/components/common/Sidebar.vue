<!-- Sidebar component in desktop view -->
<template>
  <div>
    <div class="p-30 pt-50">
      <div class="flex-row align-center free-letter-spacing">
        <img :src="require('@assets/images/brand.svg')">
      </div>
      <div class="mt-10">
        <span class="font-small-med text-secondary">
          Trusted way of banking for 3000+ SMEs and startups in Singapore.
        </span>
      </div>
      <div class="pt-10">
        <div v-for="sidebarRoute in sidebarRoutes" :key="sidebarRoute['name']"
          :class="$route['name'] === sidebarRoute['route'] ? 'text-success text-bold' : 'text-white'"
          class="mt-50 pointer-cursor hover-text-success free-letter-spacing">
          <div class="flex-row align-center">
            <img :src="getSidebarIcon(sidebarRoute['icon'])">
            <span class="ml-10">{{ sidebarRoute['label'] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'Sidebar',
  setup() {
    const sidebarRoutes = ref([
      {
        name: 'home',
        label: 'Home',
        icon: 'home',
        route: 'Home'
      },
      {
        name: 'cards',
        label: 'Cards',
        icon: 'card',
        route: 'Cards'
      },
      {
        name: 'payments',
        label: 'Payments',
        icon: 'payments',
        route: 'Payments'
      },
      {
        name: 'credit',
        label: 'Credit',
        icon: 'credits',
        route: 'Credit'
      },
      {
        name: 'settings',
        label: 'Settings',
        icon: 'user',
        route: 'Settings'
      }
    ]);
    function getSidebarIcon(iconName) {
      return require('@assets/images/' + iconName + '.svg');
    }
    return {
      sidebarRoutes,
      getSidebarIcon
    };
  }
};
</script>

<style lang="scss" scoped></style>
