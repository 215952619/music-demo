// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import store from './api/store'
import myHeader from './components/header.vue'
import myNav from './components/nav'
import loginBox from './components/login'
import listTable from './components/listtable'
import list from './components/list'
import lyric from './components/lyric'
import myFooter from './components/footer.vue'

Vue.config.productionTip = false

Vue.prototype.$axios = Axios

Vue.component('myHeader', myHeader)
Vue.component('myNav', myNav)
Vue.component('myFooter', myFooter)
Vue.component('loginBox', loginBox)
Vue.component('listTable', listTable)
Vue.component('list', list)
Vue.component('lyric', lyric)
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store
})
