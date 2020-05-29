import Vue from 'vue'
import Router from 'vue-router'

import Recommend from "Vue-learning/黄奕/慕课-Vue 2.0 独立开发音乐WebApp/vue-music-webapp/src/components/recommend/recommend";
import Rank from "Vue-learning/黄奕/慕课-Vue 2.0 独立开发音乐WebApp/vue-music-webapp/src/components/rank/rank";
import Search from "Vue-learning/黄奕/慕课-Vue 2.0 独立开发音乐WebApp/vue-music-webapp/src/components/search/search";
import Singer from "Vue-learning/黄奕/慕课-Vue 2.0 独立开发音乐WebApp/vue-music-webapp/src/components/singer/singer";

// 6-2 add
import SingerDetail from "Vue-learning/黄奕/慕课-Vue 2.0 独立开发音乐WebApp/vue-music-webapp/src/components/singer-detail/singer-detail";

// 8-1 add
import Disc from "Vue-learning/黄奕/慕课-Vue 2.0 独立开发音乐WebApp/vue-music-webapp/src/components/disc/disc";

// 9-2 排行榜歌曲列表页面，rank 排行榜组件的子路由
import topList from "Vue-learning/黄奕/慕课-Vue 2.0 独立开发音乐WebApp/vue-music-webapp/src/components/top-list/top-list";

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
        },
        {
            path: "/search",
            component: Search,
            // 10-6 add: 这里的搜索跳转，默认二级路由跳转是点击搜索列表中歌手来跳转的；如果点击的是歌曲，
            // 不存在 id 值那么 url 默认还是到 search (e.g.: localhost: 7400/#/search)，但是我们写了
            // 当前的二级路由，页面还是会跳转到 singer-detail.vue 组件来。
            children: [
                {
                    path: ":id",
                    component: SingerDetail
                }
            ]
        },
    ]
})
