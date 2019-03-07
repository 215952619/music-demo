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
</style>
