<template>
  <div>
    <p>{{msg}}</p>
    <nav></nav>
  </div>
</template>

<script>
// import nav from './nav.vue'
export default {
  name: 'MyHeader',
  data () {
    return {
      msg: 'header'
    }
  }
}
</script>

<style scoped>

</style>
