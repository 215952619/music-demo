<template>
    <div>
        <p class="capP">新歌抢先听</p>
        <list-table :pData='{data:infoData,nav:navInfo,total,maxpage,count}' class="main"></list-table>
    </div>
</template>
<script>
export default {
    name: 'About',
    data(){
        return {
            infoData: [],
            total: null,
            maxpage: null,
            size: 30,
            count: 0,
            navInfo: ['歌曲名', '添加时间', '专辑', '时长', '操作']
        }
    },
    created(){
        this.getNewsInfo();
    },
    methods: {
        getNewsInfo() {
            let _this = this;
            _this.$axios.get('/api', {
                params: {
                    json: 'true'
                }
            })
            .then(function(res) {
                _this.infoData = [];
                let arr = [];
                _this.total = res.data.data.length;
                _this.infoData.total = res.data.data.length;
                _this.maxpage = Math.ceil(res.data.data.length / _this.size);
                res.data.data.forEach(value => {
                    let obj = {
                        hash: value.hash,
                        filename: value.filename,
                        addtime: value.addtime
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
                                    songname: v.filename,
                                    singername: value.addtime,
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
        }
    }
}
</script>
<style scoped>
.main{
    width: 90%;
    margin: 0 auto;
}
</style>
