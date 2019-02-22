import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import VueLazyload from "vue-lazyload";

import "assets/stylus/index.styl"


Vue.config.productionTip = false;

Vue.use(VueLazyload, {
   loading: require("assets/image/default.png")
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
