// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store/store"

import "Vue-learning/黄奕/慕课-Vue 2.0 独立开发音乐WebApp/Music-WebApp/src/assets/stylus/index.styl"

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: {App},
    template: '<App/>'
});
