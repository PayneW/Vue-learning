import Vue from 'vue'
import Router from 'vue-router'

import Recommend from "components/recommend/recommend";
import Rank from "components/rank/rank";
import Search from "components/search/search";
import Singer from "components/singer/singer";

// 6-2 add
import SingerDetail from "components/singer-detail/singer-detail";


Vue.use(Router);

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            redirect: "/recommend",
        },
        {
            path: "/recommend",
            component: Recommend,
        },
        {
            path: "/rank",
            component: Rank,
        },
        {
            path: "/search",
            component: Search,
        },
        {
            path: "/singer",
            component: Singer,
            // 6-2 add:  配置子路由
            children: [
                {
                    path: ":id",
                    // 子路由对应的组件
                    component: SingerDetail
                }
            ]
        }
    ]
})
