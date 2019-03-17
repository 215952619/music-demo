<template>
  <div id="app">
    <my-header id="header"></my-header>
    <login-box v-if="$store.state.loginBox"></login-box>
    <my-nav id="nav"></my-nav>
    <router-view/>
    <my-footer v-show="!isPlay"></my-footer>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      msg: 'App'
    }
  },
  computed: {
    ...mapState([
      'songsList', 'isPlay'
    ])
  },
  created() {
    this.bindData('userInfo');
    this.bindData('songsList');
  },
  methods: {
    ...mapMutations([
      'bindData'
    ])
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  font-family: "微软雅黑";
}
li{
  list-style: none;
}
img{
  vertical-align: top;
}
a{
  color: inherit;
  text-decoration: none;
}
html,body{
  height: 100%;
}
.capP{
  line-height: 4rem;
  font-size: 2rem;
  text-indent: 0.5rem;
  margin: 0.5rem 1rem;
  border-bottom: 1px dashed gray;
  position: relative;
}
.capS{
  position: absolute;
  right: 0.5rem;
  bottom: -1rem;
  font-size: 0.5rem;
  color: darkgray;
}
.capS:hover{
  color: red;
  text-decoration: underline;
}
#header{
  width: 100%;
  height: 5rem;
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: 99;
}
#nav{
  height: 6rem;
  padding-top: 5rem;
}
</style>
