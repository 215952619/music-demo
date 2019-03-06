<template>
  <div class="hello">
    <my-header></my-header>
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
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>

</style>
