import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Rank from '@/components/rank'
import Plist from '@/components/plist'
import Singer from '@/components/singer'
import Player from '@/components/player'
import Details from '@/components/details'
import Undefined from '@/components/404'
import Get from '@/components/get'
import User from '@/components/user'
import Regist from '@/components/regist'
import About from '@/components/about'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, {
      path: '/home',
      name: 'home',
      component: Home
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
      path: '/player',
      name: 'player',
      component: Player
    }, {
      path: '/details',
      name: 'details',
      component: Details
    }, {
      path: '/user',
      name: 'user',
      component: User
    }, {
        path: '/regist',
        name: 'regist',
        component: Regist
    }, {
      path: '/about',
      name: 'about',
      component: About
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
