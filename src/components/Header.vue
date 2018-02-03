<template>
  <header>
    <ul class="menu-bar">
      <li class="menu-bar__item">
        <h1 class="primary-header">
          <router-link to="/" class="menu-item">Imagifie</router-link>
        </h1>
      </li>
      <li>
        <router-link to="/about" class="menu-item">About</router-link>
      </li>
    </ul>
  </header>
</template>

<style lang="scss" scoped>
@import "../sass/main.scss";
header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 5.5rem;
  line-height: 5.5rem;
  padding: 0.5rem;
  background-color: rgba($dark-green-color, 0.4);
  padding-left: $gutter-small;
  padding-right: $gutter-small;
}
header ul {
  display: flex;
  line-height: 4rem;
}
li {
  flex: 0 0 auto;
  margin: 0.2em;
}
li:nth-child(1) {
  margin-right: auto;
  font-size: 1.6rem;
  color: $light-text-color;
}
</style>