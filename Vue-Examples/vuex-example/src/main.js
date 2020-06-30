import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "./assets/typo.css";

Vue.config.productionTip = false

// - 自定义全局过滤器 currency
Vue.filter('currency', function(value){
    return '$' + value
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
