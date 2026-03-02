import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import People from "../views/People.vue";
import Research from "../views/Research.vue";
import Contact from "../views/Contact.vue";
import Application from "../views/Application.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/people",
    name: "people",
    component: People,
  },
  {
    path: "/research",
    name: "research",
    component: Research,
  },
  {
    path: "/news",
    redirect: {
      name: "home",
    },
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact,
  },
  {
    path: "/application",
    name: "application",
    component: Application,
  },
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
