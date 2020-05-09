import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

import App from './App';
import BaseCarousel from './base-components/base-carousel'

export default new Router({
    // mode:'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/app'
        },
        {
            path: '/app',
            component: App
        },
        {
            path: '/carousel',
            component: BaseCarousel
        }
    ]
})

