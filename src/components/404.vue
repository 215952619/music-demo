<template>
    <div>
        {{ msg }}
        <router-link :to="{ name: 'home' }">返回首页</router-link>
    </div>
</template>

<script>
export default {
    name: 'Undefined',
    data() {
        return {
            msg: `您要找的页面没有找到！`
        }
    }
}
</script>

<style scoped>
a {
    color: gray;
}
a:hover {
    text-decoration: underline;
    color: red;
}
</style>
