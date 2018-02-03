<template>
  <div class="result">
    <h2 class="secondary-header">Result</h2>

    <div class="result_props">
      <img :src="imageUrl" class="result_props__image"/>

      <ul class="result_props__list">
        <li v-for="concept in concepts">
          {{concept.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters(["concepts", "imageUrl", "cloudinaryBaseUrl"])
  }
}

</script>

<style lang="scss" scoped>
@import "../sass/main.scss";

.result {
  margin-top: 8rem;
}

.result_props {
  margin-top: 3rem;
  display: flex;
  flex-direction: row;
  justify-conten: center;
  align-items: space-evenly;
  

  &__image {
    display:block;
    margin: 0 auto;
    border-radius: 8px;
    padding: 3rem;
    box-shadow: 0 0 .7rem .7rem rgba($color-black, .4);
  }

  &__list {
    list-style: square;
    text-transform: capitalize;
    background-color: $background-color-dark;
    display: block;
    margin: 0 auto;
    font-size: 1.8rem;
    font-weight: 400;
    border-radius: 8px;
    padding: 3rem 20rem 3rem 3rem;
    box-shadow: 0 0 .7rem .7rem rgba($color-black, .4);
  }
}
</style>