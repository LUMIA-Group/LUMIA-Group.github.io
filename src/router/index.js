import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import People from "../views/People.vue";
import Research from "../views/Research.vue";
import News from "../views/News.vue";
import Contact from "../views/Contact.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "home",
        component: HomeView,
    }, {
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
        name: "news",
        component: News,
    },
    {
        path: "/contact",
        name: "contact",
        component: Contact,
    },
];

const router = new VueRouter({
    // mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;