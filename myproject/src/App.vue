<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
</style>
