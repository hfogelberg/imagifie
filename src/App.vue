<template>
  <div id="app">
    <appHeader></appHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  mounted() {
    this.$store.dispatch('getAppSettings');
  },
  components: {
    appHeader: Header
  },
}
</script>

<style lang="scss">
@import 'sass/main.scss';
</style>