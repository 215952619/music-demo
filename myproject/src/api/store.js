import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        loginBox: false,
        isLog: false,
        current_index: 0,
        songsList: [{
            hash: '23f190b9a04e03086a9f4a158a5c5138',
            name: '风筝',
            singer: '崔子格',
            time: 189000
        }, {
            hash: '9c5f7afc362e4dbc38f71d50b32892fa',
            name: '凉凉',
            singer: '张碧晨',
            time: 333000
        }]
    },
    getters: {
        async resource(state) {
            let res = Axios.get('/info', {
                params: {
                    r: 'play/getdata',
                    hash: state.songsList[state.current_index].hash
                }
            });
            res.then((res) => {
                return {
                    img: res.data.data.img,
                    lrc: res.data.data.lyrics,
                    src: res.data.data.play_url
                }
            })
        }
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
        getResource (state, index) {
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
                // return state.songsList[index]
            })
            .catch(function(err) {
                console.log(err);
            })
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
        }
    }
})
