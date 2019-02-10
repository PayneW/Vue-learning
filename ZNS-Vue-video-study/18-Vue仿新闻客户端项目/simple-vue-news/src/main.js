import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'


import axios from "axios";

// Vue.prototype.$axios = axios;

// axios 的一些配置，比如发送请求显示 loading, 请求回来 loading 消失之类的
// axios.interceptors.request.use(function (config) { // 配置发送请求的信息
// // dispatch 内的参数对应 store.js -> actions 下的方法名
//     store.dispatch("loadingShowActs");
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });
//
// axios.interceptors.response.use(function (response) { // 配置请求回来的信息
//     store.dispatch("loadingHiddenActs");
//     return response;
// }, function (error) {
//     return Promise.reject(error)
// });


// 这里写的不对,看完 vue music app 再回来改
// import Loading from "./components/loading/load.js";
// Vue.use(Loading);
// console.log(Loading);


// 引入全局的 css 文件
require("./assets/css/reset.css");

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
