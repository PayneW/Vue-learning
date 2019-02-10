import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import News from '@/components/News';

Vue.use(Router);

export default new Router({

  // 20180314 终于把 Vue-route 的第一个示例给改对了
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: "/news",
      name: "News",
      component: News
    }
  ]
})
