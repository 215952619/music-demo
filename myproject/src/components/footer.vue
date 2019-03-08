<template>
  <div class="foot">
    <p class="capP">友情链接</p>
    <ul class="linkbox">
      <li v-for="(link,index) in links" :key="index">
        <a :href="link.path" target="_blank">{{link.name}}</a>
      </li>
    </ul>
    <div class="bottom">
      <p>联系方式：18435186204(18435186204@163.com)</p>
      <p>本站资源来自互联网，仅供学习使用</p>
      <p>提倡正版资源</p>
      <p>{{now}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      links: [{
        path: 'http://www.kugou.com/',
        name: '酷狗音乐'
      }, {
        path: 'http://www.kuwo.cn/',
        name: '酷我音乐'
      }, {
        path: 'http://music.baidu.com/',
        name: '百度音乐'
      }, {
        path: 'https://y.qq.com/',
        name: 'QQ音乐'
      }, {
        path: 'http://music.163.com/',
        name: '网易云音乐'
      }, {
        path: 'http://www.xiami.com/',
        name: '虾米音乐'
      }, {
        path: 'href="http://www.ithome.com/',
        name: 'IT之家'
      }, {
        path: 'http://www.htmleaf.com/',
        name: 'JQ之家'
      }, {
        path: 'http://www.w3school.com.cn/',
        name: 'W3Cschool'
      }, {
        path: 'http://www.sina.com.cn/',
        name: '新浪网'
      }, {
        path: 'http://www.baidu.com',
        name: '百度'
      }]
    }
  },
  computed: {
    now() {
      return new Date().toLocaleString()
    }
  }
}
</script>

<style scoped>
.linkbox{
  width: 100%;
  line-height: 1.8rem;
  text-align: center;
  overflow: hidden;
}
.linkbox li{
  float: left;
  width: 15%;
  color: #666;
}
.linkbox li:hover{
  text-decoration: underline;
  color: red;
}
.bottom{
  background: rgba(0,0,0,0.6) url(../assets/footbg.jpg) no-repeat;
  text-align: center;
  color: white;
  line-height: 2.5rem;
  font-size: 1rem;
  user-select: none;
}
</style>
