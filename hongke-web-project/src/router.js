import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// 首页
import HomepageContent from "./components/web-front-end/pages/homepage/homepage-content/ContentWall";

// 登陆
import Login from "./components/web-front-end/pages/login/Login";

// 注册
import Register from "./components/web-front-end/pages/register/Register";

// 品牌列表
import BrandList from "./components/web-front-end/pages/brand-list/BrandList";

// 搜索为空或找不到时
import SearchNothing from "./components/web-front-end/pages/brand-list/SearchNothing";


// 寄修服务
import ShippingRepairService from "./components/web-front-end/pages/shipping-repair-service/ShippingRepairService";
// 寄修申请成功
import RepairApplicationSuccessful from "./components/web-front-end/pages/repair-successful-application/RepairApplSuccess";

// 上门安装
import HomeInstallation from "./components/web-front-end/pages/home-installation/HomeInstallation";
// 上门维修
import HomeMaintenance from "./components/web-front-end/pages/home-maintenance/HomeMaintenance";
// 上门移机
import HomeMachineMove from "./components/web-front-end/pages/home-machine-move/HomeMachineMove";

// 品牌详情页
import BrandDetail from "./components/web-front-end/pages/brand-detail/BrandDetail";





export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    // 语法讲解: ({}) 加括号的函数体返回对象字面量表达式
    scrollBehavior: () => ({ y: 0 }),

    routes: [
        { path: "/home", component: HomepageContent, },

        { path: "/user-login", component: Login },

        { path: '/user-register', component: Register },

        // 搜索到匹配项展示搜索结果
        { path: "/brand-list", component: BrandList },
        // 搜索为空时展示
        { path: "/search-nothing", component: SearchNothing },



        // 首页 - 品牌推荐 - 服务大厅: 暂时先跳转到--> 寄修服务(shipping repair service) 以后再改
        { path: "/shipping-repair-service", component: ShippingRepairService },
        // 寄修申请成功
        { path: "/repair-application-successful", component: RepairApplicationSuccessful },


        // 上门维修
        { path: "/home-maintenance", component: HomeMaintenance },
        // 上门安装
        { path: "/home-installation", component: HomeInstallation },
        // 上门移机
        { path: "/home-machine-move", component: HomeMachineMove },


        // 品牌详情页
        { path: "/brand-detail", component: BrandDetail },



        // catch all redirect 捕获所有重定向
        { path: "*", redirect: "/home" },
        { path: '/', redirect: "/home", },

        /*{
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/!* webpackChunkName: "about" *!/ './views/About.vue')
        }*/
    ]
})
