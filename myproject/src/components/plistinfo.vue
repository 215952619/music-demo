<template>
    <div>
        {{msg}} : {{specialId}}
        <ul>
            <li v-for="(data,index) in infoData" :key="index">{{data.filename}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            msg: 'specialid',
            page: 1,
            infoData: []
        }
    },
    computed: {
        specialId: function() {
            return this.$route.params.specialid;
        }
    },
    methods: {
        getPlistInfo(id) {
            let _this = this;
            _this.$axios.get('/api/plist/list/' + id, {
                params: {
                    json: 'true'
                }
            })
            .then(function(res) {
                _this.infoData.total = res.data.list.list.total;
                res.data.list.list.info.forEach(value => {
                    let obj = {
                        hash: value.hash,
                        filename: value.filename,
                        duration: value.duration,
                        album_id: value.album_id,
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
        specialId: {
            handler: function(val) {
                this.getPlistInfo(val);
            },
            immediate: true
        }
    }
}
</script>
<style scoped>

</style>
