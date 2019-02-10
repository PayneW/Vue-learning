import Vue from 'vue'
import Router from 'vue-router'

import ElementUi from "./components/ElementUi"

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
        path: "/showRouter",
        name: "element",
        component: ElementUi
    }
  ]
})
