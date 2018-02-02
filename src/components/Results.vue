<template>
  <div class="">
    <h2>Results</h2>

  <img :src="imageUrl" />

    <ul class="list">
      <li v-for="concept in concepts">
        {{concept.name}}
      </li>
    </ul>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters(["concepts", "imageUrl"])
  }
}

</script>

<style lang="scss" scoped>
@import "../sass/main.scss";

.list {
  list-style: square;
  text-transform: capitalize;
  background-color: $background-color-dark;
  max-width: 20ch;
  display: block;
  margin: 0 auto;
  font-size: 1.8rem;
  font-weight: 400;
  border-radius: 8px;
  padding: 3rem;
  box-shadow: 0 0 .7rem .7rem rgba($color-black, .4);
}
</style>