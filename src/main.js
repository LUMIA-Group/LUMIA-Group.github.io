import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");

if (typeof window !== "undefined") {
    const emitMounted = () => {
        if (typeof window.dispatchEvent === "function") {
            window.dispatchEvent(new CustomEvent("lumia-app-mounted"));
        }
    };

    if (typeof window.requestAnimationFrame === "function") {
        window.requestAnimationFrame(emitMounted);
    } else {
        window.setTimeout(emitMounted, 0);
    }
}
