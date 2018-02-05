<template>
  <section class="about">
    <h2 class="secondary-header">About</h2>

    <div class="about-text">
      <p>
      Imagifie is an experiment in image recoognition, written in Node.js and Vue.js. The image handling is powered by Clarifie.
      </p>
    </div>
  </section>
</template>

<script>

</script>

<style lang="scss" scoped>
@import "../sass/main.scss";

.about {
  margin-top: 10rem;
  position: relative;
}

.about-text {
  margin-top: 10rem;
  font-size: 2rem;
  postion: absolute;
  display: block;
  max-width: 70ch;
  margin: 0 auto;
}
</style>