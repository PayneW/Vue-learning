import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Home from "./components/Home";

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },

  ]
})
