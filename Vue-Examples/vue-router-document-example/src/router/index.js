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
import Worker from '../components//3.3/worker';
import WorkerHome from  '../components/3.3/worker-home';
import WorkerProfile from '../components/3.3/worker-profile';
import WorkerPosts from '../components/3.3/worker-posts';

// - 3.6 命名视图
import Demo36 from '../components//3.6/3.6';
import Container from '../components//3.6/container';
import FullBlank from '../components/3.6/full-blank';
import NavBar from '../components//3.6/nav-bar';
import TheMain from '../components//3.6/the-main';
// -- 3.6-2 命名视图
import Demo362 from '../components/3.6-2/362';
import UserSettings from '../components/3.6-2/user-settings';
import UserSettingNav from '../components/3.6-2/user-settings-nav';
import UserProfile from '../components/3.6-2/user-profile';
import UserProfileView from '../components/3.6-2/user-profile-view';
import userEmailSubscriptions from '../components/3.6-2/user-email-subscriptions';



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
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
