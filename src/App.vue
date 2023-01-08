<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <repair></repair> -->
  </div>
</template>
<script>
import Repair from './views/Repair.vue';
export default {
  components: { Repair },
  name: 'App'
};
</script>
<style lang="scss">
// html {
//     -webkit-filter: grayscale(100%);
//     filter: grayscale(100%);
// }
</style>
