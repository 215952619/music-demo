<template>
    <div>
        {{msg}} : {{rankId}}
        <ul>
            <li v-for="(data,index) in infoData.list" :key="index">{{data.filename}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            msg: 'rankinfo',
            page: 1,
            infoData: {}
        }
    },
    computed: {
        rankId: function() {
            return this.$route.params.rankid;
        }
    },
    methods: {
        getRankInfo(id) {
            let _this = this;
            _this.$axios.get('/api/rank/info', {
                params: {
                    json: 'true',
                    rankid: id,
                    page: _this.page
                }
            })
            .then(function(res) {
                console.log(res.data);
                _this.infoData = {
                    ..._this.infoData,
                    total: res.data.songs.total,
                    list: res.data.songs.list
                }
            })
            .catch(function(err) {
                console.log(err);
            });
        }
    },
    watch: {
        rankId: {
            handler: function(val) {
                this.getRankInfo(val);
            },
            immediate: true
        }
    }
}
</script>
<style scoped>

</style>
