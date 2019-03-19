<template>
    <div>
        <div class="box" v-if="isLoad">
            <img :src="infoData[page-1].img">
            <p>专辑名：{{infoData[page-1].name}}</p>
            <p>{{infoData[page-1].content}}</p>
        </div>
        <list-table :pData='{data:infoList,total:maxpage,maxpage,count}' class="main" @pageChage='childSearch'></list-table>
    </div>
</template>
<script>
export default {
    data(){
        return {
            infoData: [],
            infoList: [],
            count: 0,
            page: 1,
            isLoad: false
        }
    },
    computed: {
        albumId: function() {
            return this.$route.params.albumid;
        },
        maxpage: function() {
            return this.infoData.length;
        }
    },
    methods: {
        childSearch(page) {
            this.page = page;
            this.getAlbumList(page - 1);
        },
        getAlbumInfo(id, page) {
            let _this = this;
            _this.isLoad = false;
            _this.$axios.get('/albuminfo', {
                params: {
                    r: 'area/share',
                    areaid: id
                }
            })
            .then(function(res) {
                _this.infoData = [];
                let tmp = [];
                res.data.module_info.forEach((value) => {
                    value.module_data.forEach((v) => {
                        tmp.push(v)
                    });
                });
                tmp.forEach(value => {
                    if (value.skip_type === '专辑') {
                        _this.infoData.push({
                            id: value.mark,
                            name: value.name,
                            content: value.content,
                            img: value.images
                        })
                    }
                })
                _this.isLoad = true;
                _this.getAlbumList(page);
            })
            .catch(function(err) {
                console.log(err);
            });
        },
        getAlbumList(page) {
            let _this = this;
            let arr = [];
            _this.$axios.get('/api/app/i/getablum.php', {
                params: {
                    type: 1,
                    ablumid: _this.infoData[page].id
                }
            })
            .then(function(res) {
                _this.infoList = [];
                res.data.list.forEach(v => {
                    arr.push({
                        filename: v.songname,
                        hash: v.hash
                    })
                })
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
                                _this.infoList.push(obj);
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
    },
    watch: {
        albumId: {
            handler: function(val) {
                this.count++;
                this.page = 1;
                this.getAlbumInfo(val, 0);
            },
            immediate: true
        }
    }
}
</script>
<style scoped>
.box{
    text-align: left;
}
.box img{
    float: left;
    height: 10rem;
    margin: 0.5rem;
}
.box p:first-of-type{
    font-size: 1.5rem;
    line-height: 2.5rem;
}
.box p:last-of-type{
    text-indent: 1.8rem;
    font-size: 0.9rem;
    line-height: 1.2rem;
    color: #aaa;
}
</style>
