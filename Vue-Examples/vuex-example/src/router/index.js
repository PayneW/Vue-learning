import Vue from 'vue'
import VueRouter from 'vue-router'
import Count from '../views/count'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/count'
    },
    {
        path: '/count',
        name: 'Count',
        component: Count
    },
    {
        path: '/shopping-cart',
        name: 'ShoppingCart',
        // - router level code-splitting(路由及代码拆分)
        // - this generates a separate chunk (about.[hash].js) for this
        //   route which is lazy-loaded when the route is visited. (这会为
        //   此路由生成一个单独的块(about.[hash].js), 当访问该路由时会被延迟加载.)
        // - 将 `/shopping-cart` 路由下的所有组件都打包在 ShoppingCart 异步块中.
        component: () => import(/* webpackChunkName: 'ShoppingCart' */ '../views/shopping-cart')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
