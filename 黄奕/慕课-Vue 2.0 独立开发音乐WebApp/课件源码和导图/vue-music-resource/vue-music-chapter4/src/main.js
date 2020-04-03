import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import 'Vue-learning/黄奕/慕课-Vue 2.0 独立开发音乐WebApp/课件源码和导图/vue-music-resource/vue-music-chapter4/src/common/stylus/index.styl'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
