<template>
  <div class="hello">
    <login-box v-if="$store.state.loginBox"></login-box>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      userInfo: {
        username: '游客',
        isVip: false,
        vipStage: 0
      }
    }
  }
}
</script>

<style scoped>
</style>
