<template>
    <div class="main">
        <ul class="lwarp">
            <li v-for="(data,index) in rankData" :key='index' @click="push(data.id)">{{data.name}}</li>
        </ul>
        <router-view class="rwarp"></router-view>
    </div>
</template>
<script>
export default {
    data(){
        return {
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
.main{
    overflow: hidden;
    min-height: 20rem;
}
.lwarp{
    float: left;
    width: 23%;
    margin-top: 0.5rem;
    margin-left: 5%;
    font-size: 0.8rem;
    line-height: 1.5rem;
}
.lwarp li{
    border: 1px solid black;
    cursor: pointer;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
}
.rwarp{
    float: left;
    width: 65%;
    margin-top: 0.5rem;
    margin-left: 2%;
}
</style>
