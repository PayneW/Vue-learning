import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import VueLazyload from "vue-lazyload";

import "Vue-learning/黄奕/慕课-Vue 2.0 独立开发音乐WebApp/vue-music-webapp/src/assets/stylus/index.styl"


Vue.config.productionTip = false;

Vue.use(VueLazyload, {
   loading: require("assets/image/default.png")
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
