import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Player from '@/components/player'
import Get from '@/components/get'
import Nav from '@/components/nav'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/player',
      name: 'player',
      component: Player
    },
    {
      path: '/get',
      name: 'get',
      component: Get
    },
    {
      path: '/nav',
      name: 'nav',
      component: Nav
    },
    {
      path: '*',
      name: 'undefined',
      component: Home
    }
  ]
})
