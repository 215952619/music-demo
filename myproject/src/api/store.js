import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        loginBox: false,
        isLog: false,
        current_index: 0,
        songsList: [],
        storageSongsList: [],
        isPlay: false
    },
    mutations: {
        loginBoxShow (state) {
            state.loginBox = true
        },
        loginBoxHidden (state) {
            state.loginBox = false
        },
        login (state) {
            state.isLog = true
        },
        logout (state) {
            state.isLog = false
        },
        addList(state, obj) {
            let isHas = false;
            if (obj.hasOwnProperty('hash')) {
                if (state.songsList.length > 0) {
                    if (state.songsList.find(value => value.hash === obj.hash)) {
                        console.log('列表已添加');
                        isHas = true;
                    }
                }
                if (!isHas) {
                    state.storageSongsList.push(obj);
                    localStorage.setItem('storageSongsList', JSON.stringify(state.storageSongsList))
                    state.songsList.push(obj);
                }
            } else {
                console.log('数据传入错误');
            }
        },
        removeList(state, hash) {
            state.storageSongsList.forEach((value, index) => {
                if (index === state.current_index) {
                    state.current_index = ++state.current_index > state.songsList.length - 1 ? 0 : state.current_index;
                }
                if (value.hash === hash) {
                    state.storageSongsList.splice(index, 1);
                }
            });
            localStorage.setItem('storageSongsList', JSON.stringify(state.storageSongsList));
            state.songsList = state.storageSongsList;
        },
        changeItem(state, bool) {
            let l = state.songsList.length - 1;
            if (bool) {
                state.current_index = ++state.current_index > l ? 0 : state.current_index;
            } else {
                state.current_index = --state.current_index < 0 ? l : state.current_index;
            }
        },
        listChange(state, index) {
            state.current_index = index;
        },
        startPlay(state, bool) {
            state.isPlay = bool;
        },
        getResource(state, index) {
            Axios.get('/info', {
                params: {
                    r: 'play/getdata',
                    hash: state.songsList[index].hash
                }
            })
            .then(function(res) {
                state.songsList[index] = {
                    ...state.songsList[index],
                    img: res.data.data.img,
                    lrc: res.data.data.lyrics,
                    src: res.data.data.play_url
                };
            })
            .catch(function(err) {
                console.log(err);
            })
        },
        bindData(state, item) {
            if (localStorage.getItem(item)) {
                state[item] = JSON.parse(localStorage.getItem(item));
            } else {
                localStorage.setItem(item, JSON.stringify(state[item]));
            }
        },
        undateFromStorage(state) {
            state.songsList = state.storageSongsList
        }
    }
})
