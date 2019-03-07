// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import myHeader from './components/header.vue'
import myNav from './components/nav'
import loginBox from './components/login'
import myFooter from './components/footer.vue'

Vue.config.productionTip = false

Vue.prototype.$axios = Axios

Vue.component('myHeader', myHeader)
Vue.component('myNav', myNav)
Vue.component('myFooter', myFooter)
Vue.component('loginBox', loginBox)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
