<template>
    <div class="main">
        <ul class="lwarp">
            <li v-for="(data,index) in plistData" :key='index' @click="push(data.specialid)">
                {{data.specialname}}
            </li>
        </ul>
        <router-view class="rwarp"></router-view>
    </div>
</template>
<script>
export default {
    data(){
        return {
            plistData: []
        }
    },
    beforeCreate() {
        let _this = this;
        _this.$axios.get('/api/plist/index', {
            params: {
                json: 'true'
            }
        })
        .then(function(res) {
            _this.plistData.total = res.data.plist.list.total;
            res.data.plist.list.info.forEach(value => {
                let obj = {
                    specialid: value.specialid,
                    specialname: value.specialname,
                    user: value.username,
                    info: value.intro,
                    img: value.imgurl
                };
                _this.plistData.push(obj);
            });
        })
        .catch(function(err) {
            console.log(err);
        });
    },
    methods: {
        push(id) {
            this.$router.push({
                name: 'plistInfo',
                params: {
                    specialid: id
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
