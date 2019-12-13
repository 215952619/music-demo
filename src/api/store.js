import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        loginBox: false,
        isLog: false,
        current_index: 0,
        songsList: [],
        isPlay: false,
        userInfo: {
            username: '',
            isVip: false,
            vipStage: 0
        }
    },
    mutations: {
        loginBoxShow(state) {
            state.loginBox = true
        },
        loginBoxHidden(state) {
            state.loginBox = false
        },
        login(state) {
            state.isLog = true
        },
        logout(state) {
            state.isLog = false
        },
        addList(state, obj) {
            let isHas = false
            if (obj.hasOwnProperty('hash')) {
                if (state.songsList.length > 0) {
                    if (state.songsList.find(value => value.hash === obj.hash)) {
                        console.log('列表已添加')
                        isHas = true
                    }
                }
                if (!isHas) {
                    state.songsList.push(obj)
                    localStorage.setItem('songsList', JSON.stringify(state.songsList))
                }
            } else {
                console.log('数据传入错误')
            }
        },
        removeList(state, hash) {
            state.songsList.forEach((value, index) => {
                if (value.hash === hash) {
                    state.songsList.splice(index, 1)
                }
            })
            localStorage.setItem('songsList', JSON.stringify(state.songsList))
        },
        changeItem(state, bool) {
            let l = state.songsList.length - 1
            if (bool) {
                state.current_index = ++state.current_index > l ? 0 : state.current_index
            } else {
                state.current_index = --state.current_index < 0 ? l : state.current_index
            }
        },
        listChange(state, index) {
            state.current_index = index
        },
        startPlay(state, bool) {
            state.isPlay = bool
        },
        bindData(state, item) {
            if (localStorage.getItem(item)) {
                state[item] = JSON.parse(localStorage.getItem(item))
            } else {
                localStorage.setItem(item, JSON.stringify(state[item]))
            }
        },
        loginSuccess(state, obj) {
            state.userInfo.username = obj.name
            state.userInfo.isVip = obj.isVip
            state.userInfo.vipStage = obj.vipStage
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
        }
    }
})
