import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import player from '@/components/player'
import get from '@/components/get'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/player',
      name: 'player',
      component: player
    },
    {
      path: '/get',
      name: 'get',
      component: get
    }
  ]
})
