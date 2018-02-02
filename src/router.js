import VueRouter from "vue-router"
import Index from "./components/Index.vue";
import Results from "./components/Results.vue";
import NotFound from "./components/NotFound.vue";
import HasError from "./components/HasError.vue";

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Index },
    { path: "/results", component: Results },
    { path: "/error", component: HasError },
    { path: "*", component: NotFound }
  ]
});

export default router;