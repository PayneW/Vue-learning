import Vue from 'vue'
import VueRouter from 'vue-router'

import App from '../App';

// - 导入需要在 <router-view></router-view> 显示的组件
import Foo from '../components/3.1/foo.vue';
import Bar from '../components/3.1/bar.vue';



Vue.use(VueRouter)



const routes = [
    // - (3) 定义路由
    {
        path: '/',
        redirect: '/app'
    },
    {
        path: '/foo',
        component: Foo,
    },
    {
        path: '/bar',
        component: Bar,
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
