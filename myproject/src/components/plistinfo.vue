<template>
    <list-table :pData='{data:infoData,total,maxpage,count}' class="main" @pageChage='childSearch'></list-table>
</template>
<script>
export default {
    data(){
        return {
            infoData: [],
            total: null,
            maxpage: null,
            size: 30,
            count: 0
        }
    },
    computed: {
        specialId: function() {
            return this.$route.params.specialid;
        }
    },
    methods: {
        getPlistInfo(id, page) {
            let _this = this;
            _this.$axios.get('/api/plist/list/' + id, {
                params: {
                    json: 'true',
                    page: page
                }
            })
            .then(function(res) {
                _this.infoData = [];
                let arr = [];
                _this.total = res.data.list.list.total;
                _this.infoData.total = res.data.list.list.total;
                _this.maxpage = Math.ceil(res.data.list.list.total / _this.size);
                res.data.list.list.info.forEach(value => {
                    let obj = {
                        hash: value.hash,
                        filename: value.filename
                    };
                    arr.push(obj);
                });
                return arr
            })
            .then(function(res) {
                res.forEach(value => {
                    _this.$axios.get('/search/song', {
                        params: {
                            format: 'json',
                            keyword: value.filename,
                            page: 1,
                            pagesize: 5,
                            showtype: 1
                        }
                    })
                    .then(function(msg) {
                        msg.data.data.info.forEach(v => {
                            if (v.hash.toUpperCase() === value.hash.toUpperCase()) {
                                let obj = {
                                    hash: v.hash,
                                    songname: v.songname,
                                    singername: v.singername,
                                    albumname: v.album_name,
                                    timelong: v.duration
                                };
                                _this.infoData.push(obj);
                            }
                        })
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
                })
            })
            .catch(function(err) {
                console.log(err);
            });
        },
        childSearch(page) {
            this.getPlistInfo(this.specialId, page);
        }
    },
    watch: {
        specialId: {
            handler: function(val) {
                this.count++;
                this.getPlistInfo(val, 1);
            },
            immediate: true
        }
    }
}
</script>
<style scoped>
.main{
    text-align: center;
}
</style>
