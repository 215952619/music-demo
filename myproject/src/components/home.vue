<template>
  <div class="hello">
    <my-header id="header" :homeData='{isLogin,loginboxState}' @loginClick='isLogin=!isLogin'></my-header>
    <login-box></login-box>
    <my-nav id="nav"></my-nav>
    <ul>
      <li>
        <a href="#/get">get</a>
      </li>
      <li>
        <a href="#/player">player</a>
      </li>
    </ul>
    <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      isLogin: false,
      loginboxState: false,
      isShow: false,
      userInfo: {
        username: '游客',
        isVip: false,
        vipStage: 0
      },
      tempSongsList: []
    }
  },
  created() {
    if (localStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    } else {
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
    }
    if (localStorage.getItem('tempSongsList')) {
      this.tempSongsList = localStorage.getItem('tempSongsList');
    } else {
      localStorage.setItem('tempSongsList', this.tempSongsList);
    }
  }
}
</script>

<style scoped>
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
