import Vue from 'vue'
import VueRouter from 'vue-router'

import Demo31 from '../components/3.1/3.1.vue';
// - 导入需要在 <router-view></router-view> 显示的组件
import Foo from '../components/3.1/foo.vue';
import Bar from '../components/3.1/bar.vue';

// - 3.2 动态路由匹配
import Demo32 from '../components/3.2/3.2.vue';
import User from '../components/3.2/user.vue';

Vue.use(VueRouter)

const routes = [
    // - (3) 定义路由
    {
        path: '/',
        redirect: '/Demo31'
    },
    {
        path: '/Demo31',
        component: Demo31,
        children: [
            {
                path: '/foo',
                component: Foo
            },
            {
                path: '/bar',
                component: Bar
            },
        ]
    },
    {
        path: '/Demo32',
        component: Demo32,
        children: [
            {
                path: '/user/:id',
                component: User
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
