import Vue from 'vue'
import Router from 'vue-router'

import Recommend from "components/recommend/recommend";
import Rank from "components/rank/rank";
import Search from "components/search/search";
import Singer from "components/singer/singer";

// 6-2 add
import SingerDetail from "components/singer-detail/singer-detail";

// 8-1 add
import Disc from "components/disc/disc";

// 9-2 排行榜歌曲列表页面，rank 排行榜组件的子路由
import topList from "components/top-list/top-list";

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
            // 添加推荐 recommend 下的二级路由
            children: [
                {
                    path: ":id",
                    component: Disc
                }
            ]
        },
        {
            path: "/rank",
            component: Rank,
            children: [
                {
                    path: ':id',
                    component: topList,
                }
            ]
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
