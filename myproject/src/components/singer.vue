<template>
    <div>
        {{msg}}
        <ul>
            <li v-for="(data,index) in singerData" :key='index' @click="push(data.classid)">{{data.classname}}</li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data(){
        return {
            msg: 'rank',
            singerData: []
        }
    },
    beforeCreate() {
        let _this = this;
        _this.$axios.get('/api/singer/class', {
            params: {
                json: 'true'
            }
        })
        .then(function(res) {
            res.data.list.forEach(value => {
                _this.singerData.push({classid: value.classid, classname: value.classname});
            });
        })
        .catch(function(err) {
            console.log(err);
        });
    },
    methods: {
        push(id) {
            this.$router.push({
                name: 'singerInfo',
                params: {
                    classid: id
                }
            })
        }
    }
}
</script>
<style scoped>

</style>
