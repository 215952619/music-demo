<template>
    <div>
        {{msg}}
        <ul>
            <li v-for="(data,index) in plistData" :key='index' @click="push(data.specialid)">{{data.specialname}}</li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data(){
        return {
            msg: 'plist',
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

</style>
