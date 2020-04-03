import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Recommend = () => import('todo-components/recommend/recommend')
const Singer = () => import('todo-components/singer/singer')
const Rank = () => import('todo-components/rank/rank')
const Search = () => import('todo-components/search/search')
const SingerDetail = () => import('todo-components/singer-detail/singer-detail')
const Disc = () => import('todo-components/disc/disc')
const TopList = () => import('todo-components/top-list/top-list')
const UserCenter = () => import('todo-components/user-center/user-center')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/user',
      component: UserCenter
    }
  ]
})
