import Vue from 'vue'
import VueRouter from 'vue-router'

import Demo31 from '../components/3.1/3.1.vue';
// - 导入需要在 <router-view></router-view> 显示的组件
import Foo from '../components/3.1/foo.vue';
import Bar from '../components/3.1/bar.vue';

// - 3.2 动态路由匹配
import Demo32 from '../components/3.2/3.2.vue';
import User from '../components/3.2/user.vue';

// - 3.3 嵌套路由
import Demo33 from '../components/3.3/3.3';
import Worker from '../components/3.3/worker';
import WorkerHome from  '../components/3.3/worker-home';
import WorkerProfile from '../components/3.3/worker-profile';
import WorkerPosts from '../components/3.3/worker-posts';

// - 3.4 编程式导航
import Demo34 from '../components/3.4/3.4';
import Runner from '../components/3.4/runner';

// - 3.6 命名视图
import Demo36 from '../components/3.6/3.6';
import Container from '../components/3.6/container';
import FullBlank from '../components/3.6/full-blank';
import NavBar from '../components/3.6/nav-bar';
import TheMain from '../components/3.6/the-main';
// -- 3.6-2 命名视图
import Demo362 from '../components/3.6-2/362';
import UserSettings from '../components/3.6-2/user-settings';
import UserProfile from '../components/3.6-2/user-profile';
import UserProfileView from '../components/3.6-2/user-profile-view';
import userEmailSubscriptions from '../components/3.6-2/user-email-subscriptions';

// - 3.8 传递 Props 到路由组件
import Demo38 from '../components/3.8/3.8';
import RouterProps from '../components/3.8/router-props';


Vue.use(VueRouter)


function dynamicPropsFn(route) {
    const now = new Date();
    return {
        name: (now.getFullYear() + parseInt(route.params.years)) + '!'
    }
}

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
    },
    {
        path: '/Demo33',
        component: Demo33,
        children: [
            {
                path: '/worker/:id',
                component: Worker,
                children: [
                    {
                        path: '',
                        component: WorkerHome
                    },
                    {
                        path: 'profile',
                        component: WorkerProfile
                    },
                    {
                        path: 'posts',
                        component: WorkerPosts
                    }
                ]
            }
        ]
    },
    {
        path: '/Demo34',
        component: Demo34,
        children: [
            {
                path: '/runner/:id',
                component: Runner,
            }
        ]
    },
    {
        path: '/Demo36',
        component: Demo36,
        children: [
            {
                path: '/container',
                component: Container,
                children: [
                    {
                        path: 'full-blank',
                        component: FullBlank,
                    },
                    {
                        path: 'other',
                        components: {
                            NavBar: NavBar,
                            TheMain: TheMain
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/Demo362',
        component: Demo362,
        children: [
            {
                path: '/settings',
                component: UserSettings,
                children: [
                    {
                        path: 'emails',
                        component: userEmailSubscriptions
                    },
                    {
                        path: 'profile',
                        components: {
                            default: UserProfile,
                            helper: UserProfileView
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/Demo38',
        component: Demo38,
        children: [
            // { path: '/', component: RouterProps},
            // - Pass route.params to props (通过 route.params 到 props)
            { path: '/hello/:name', component: RouterProps, props: true },
            // - static values (静态值)
            // - 问题: 目前还不知道这个静态值, 在子路由(router-props.vue)
            //   中如何获取. 待解决.
            { path: '/static', component: RouterProps, props: {name: 'world'}},
            // - custom logic for mapping between route and props
            //   (用于在 route 和 props 之间进行映射的自定义逻辑)
            { path: '/dynamic/:years', component: RouterProps, props: dynamicPropsFn},
            { path: '/attrs', component: RouterProps, props: {name: 'attrs'}}
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
