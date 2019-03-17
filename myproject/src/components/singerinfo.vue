<template>
    <div>
        {{msg}} : {{classId}}
        <ul>
            <li v-for="(data,index) in infoData" :key="index">{{data.singername}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            msg: 'singerinfo',
            page: 1,
            infoData: []
        }
    },
    computed: {
        classId: function() {
            return this.$route.params.classid;
        }
    },
    methods: {
        getSingerInfo(id) {
            let _this = this;
            _this.$axios.get('/api/singer/list/' + id, {
                params: {
                    json: 'true'
                }
            })
            .then(function(res) {
                _this.infoData = [];
                _this.infoData.total = res.data.singers.list.total;
                res.data.singers.list.info.forEach(value => {
                    let obj = {
                        singername: value.singername,
                        singerid: value.singerid,
                        img: value.imgurl
                    };
                    _this.infoData.push(obj);
                });
            })
            .catch(function(err) {
                console.log(err);
            });
        }
    },
    watch: {
        classId: {
            handler: function(val) {
                this.getSingerInfo(val);
            },
            immediate: true
        }
    }
}
</script>
<style scoped>

</style>
