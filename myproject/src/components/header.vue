<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/Clogo.png" ><span>在线音乐电台</span>
    </div>
    <div class="searchbox">
      <input type="text" v-model="searchWork"  @keyup.enter = 'search(searchWork)'/>
      <img src="../assets/search.jpg" @click = 'search(searchWork)'/>
    </div>
    <div class="centerbox">
      <span><router-link :to="{name:'undefined'}">客服中心</router-link></span>
      <span><router-link :to="{name:'user'}">个人中心</router-link></span>
      <span><router-link :to="{name:'about'}">关于我们</router-link></span>
    </div>
    <div class="loginbox" v-if="!$store.state.isLog">
      <span @click="loginBoxShow">[登录]</span>
      <span><router-link :to="{name:'regist'}">[注册]</router-link></span>
    </div>
    <div class="personbox" v-if="$store.state.isLog">
      <span><router-link :to="{name:'user'}">{{username}}</router-link>欢迎您</span><label @click="logout">[退出]</label>
    </div>
  </div>
</template>

<script>
import jsonp from 'jsonp';
import {mapMutations} from 'vuex';
export default {
  name: 'MyHeader',
  data () {
    return {
      searchWork: '',
      username: ''
    }
  },
  created() {
    if (localStorage.getItem('userInfo')) {
      this.username = JSON.parse(localStorage.getItem('userInfo')).username + '，';
    }
    let PlaceHold = 'http://so.service.kugou.com/v1/word_nofocus';
    let otps = {
        params: 'callback',
        timeout: 10000,
        prefix: 'cb',
        name: 'cbPlaceHold'
    };
    jsonp(PlaceHold, otps, (err, data) => {
        if (!err) {
            this.searchWork = data.data[0].keyword;
        } else {
            console.log(err);
        }
    })
  },
  methods: {
    search(keyword) {
      this.$router.push({
        name: 'details',
        query: {
          keyword: keyword
        }
      })
    },
    ...mapMutations([
      'loginBoxShow', 'logout'
    ])
  }
}
</script>

<style scoped>
.header{
  line-height: 5rem;
  background: rgba(159,125,80,1);
  color: white;
}
.header div{
  display: inline-block;
  height: 100%;
  vertical-align: top;
}
.logo{
  font-size: 2rem;
  color: rgba(51,153,204,1);
  font-weight: bolder;
  padding-left: 2rem;
}
.logo img{
  height: 3rem;
  padding: 1rem 0.5rem;
  animation: logoR 5s linear infinite;
}
@keyframes logoR{
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}
.searchbox{
  padding: 0 1.5rem;
  width: 25%;
  position: relative;
}
.searchbox input{
  width: 100%;
  line-height: 2rem;
  text-indent: 0.3em;
}
.searchbox img{
  height: 1.6rem;
  position: absolute;
  right: 1.5rem;
  top: 1.7rem;
  cursor: pointer;
}
.centerbox{
  margin-left: 5rem;
}
.centerbox span{
  margin: 0 0.5rem;
}
.centerbox span:hover{
  text-decoration: underline;
}
.loginbox, .personbox{
  position: absolute;
  width: 15%;
  right: 4rem;
  text-align: center;
}
.loginbox span{
  cursor: pointer;
}
</style>
