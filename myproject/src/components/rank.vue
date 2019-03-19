<template>
    <div class="main">
        <ul class="lwarp">
            <li v-for="(data,index) in rankData" :key='index' @click="push(data.id)"
             :class="{current_li:data.id===rankId}">{{data.name}}</li>
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
            if (!_this.rankId) {
                _this.push(_this.rankData[0].id);
            }
        })
        .catch(function(err) {
            console.log(err);
        });
    },
    computed: {
        rankId: function() {
            return this.$route.params.rankid;
        }
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
    width: 18%;
    margin-top: 0.5rem;
    margin-left: 7%;
    font-size: 0.8rem;
    line-height: 1.5rem;
    border: 1px solid black;
}
.lwarp li{
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    border-bottom: 1px solid black;
}
.current_li{
    font-size: 1.5rem;
    line-height: 2rem;
    color: white;
    background-color: darkturquoise;
}
.rwarp{
    float: left;
    width: 65%;
    margin-top: 0.5rem;
    margin-left: 2%;
}
</style>
