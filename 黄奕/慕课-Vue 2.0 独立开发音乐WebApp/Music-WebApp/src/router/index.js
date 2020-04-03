import Vue from 'vue'
import Router from 'vue-router'

import Recommend from "todo-components/recommend/recommend";
import Rank from "todo-components/rank/rank";
import Search from "todo-components/search/search";
import Singer from "todo-components/singer/singer";

Vue.use(Router);

export default new Router({

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
        }
    ]
})
