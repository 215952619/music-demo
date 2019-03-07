import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Rank from '@/components/rank'
import Plist from '@/components/plist'
import Singer from '@/components/singer'
import Player from '@/components/player'
import Get from '@/components/get'
import Undefined from '@/components/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, {
      path: '/rank',
      name: 'rank',
      component: Rank
    }, {
      path: '/plist',
      name: 'plist',
      component: Plist
    }, {
      path: '/singer',
      name: 'singer',
      component: Singer
    }, {
      path: '/home',
      name: 'home',
      component: Home
    }, {
      path: '/player',
      name: 'player',
      component: Player
    }, {
      path: '/get',
      name: 'get',
      component: Get
    }, {
      path: '*',
      name: 'undefined',
      component: Undefined
    }
  ]
})
