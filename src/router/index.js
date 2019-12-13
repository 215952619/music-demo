import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Rank from '@/components/rank'
import RankInfo from '@/components/rankinfo'
import Plist from '@/components/plist'
import PlistInfo from '@/components/plistinfo'
import Singer from '@/components/singer'
import SingerInfo from '@/components/singerInfo'
import Album from '@/components/album'
import AlbumInfo from '@/components/albuminfo'
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
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/rank',
            name: 'rank',
            component: Rank,
            children: [
                {
                    path: '/rank/info/:rankid',
                    name: 'rankInfo',
                    component: RankInfo
                }
            ]
        },
        {
            path: '/plist',
            name: 'plist',
            component: Plist,
            children: [
                {
                    path: '/plist/info/:specialid',
                    name: 'plistInfo',
                    component: PlistInfo
                }
            ]
        },
        {
            path: '/singer',
            name: 'singer',
            component: Singer,
            children: [
                {
                    path: '/singer/info/:classid',
                    name: 'singerInfo',
                    component: SingerInfo
                }
            ]
        },
        {
            path: '/album',
            name: 'album',
            component: Album,
            children: [
                {
                    path: '/album/info/:albumid',
                    name: 'albumInfo',
                    component: AlbumInfo
                }
            ]
        },
        {
            path: '/player',
            name: 'player',
            component: Player
        },
        {
            path: '/details',
            name: 'details',
            component: Details
        },
        {
            path: '/user',
            name: 'user',
            component: User
        },
        {
            path: '/regist',
            name: 'regist',
            component: Regist
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/get',
            name: 'get',
            component: Get
        },
        {
            path: '*',
            name: 'undefined',
            component: Undefined
        }
    ]
})
