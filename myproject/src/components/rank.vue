<template>
    <div>
        {{msg}}
        <ul>
            <li v-for="(data,index) in rankData" :key='index' @click="push(data.id)">{{data.name}}</li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data(){
        return {
            msg: 'rank',
            rankData: []
        }
    },
    beforeCreate() {
        let _this = this;
        _this.$axios.get('/api/rank/list', {
            params: {
                json: 'true'
            }
        })
        .then(function(res) {
            res.data.rank.list.forEach((value) => {
                _this.rankData.push({id: value.rankid, name: value.rankname});
            });
        })
        .catch(function(err) {
            console.log(err);
        });
    },
    methods: {
        push(id) {
            this.$router.push({
                name: 'rankInfo',
                params: {
                    rankid: id
                }
            })
        }
    }
}
</script>
<style scoped>

</style>
