<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("App mounted");
    this.$store.dispatch('getAppSettings');
  }
}
</script>

<style lang="scss">
@import 'sass/main.scss';
</style>