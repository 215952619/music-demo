<template>
    <div>
        <p>{{text}}</p>
        <input type="text" v-model="testHash">
        <button @click="getSongInfo()">搜索</button>
    </div>
</template>

<script>
export default {
    name: 'get',
    data () {
        return {
            text: 'api测试页面',
            testHash: '0097E5D44B2755AA7BA2DD571F8D085F',
            // testHash: 'http://www.kugou.com/yy/index.php?r=play/getdata&alboum_id=0&hash=?&_=?',
            data: {}
        }
    },
    mounted () {
            // api.myApi.getSongsInfo(this.testHash);
    },
    methods: {
        getSongInfo() {
            this.$axios.get('/info', {
                params: {
                    r: 'play/getdata',
                    hash: this.testHash
                }
            })
            .then(function(res) {
                console.log(res.data);
            })
            .catch(function(err) {
                console.log(err);
            });
        }
    }
}
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
}
</style>
