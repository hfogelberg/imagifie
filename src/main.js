import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router';
import App from './App.vue'
import { store } from "./store/store.js";

Vue.use(VueRouter);

new Vue({
      router,
      store,
      el: '#app',
      render: h => h(App)
});