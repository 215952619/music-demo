<template>
    <list-table :pData="{ data: infoData, total, maxpage, count }" class="main" @pageChage="childSearch"></list-table>
</template>
<script>
export default {
    data() {
        return {
            infoData: [],
            total: null,
            maxpage: null,
            size: 30,
            count: 0
        }
    },
    computed: {
        rankId: function() {
            return this.$route.params.rankid
        }
    },
    methods: {
        getRankInfo(id, page) {
            let _this = this
            _this.$axios
                .get('/api/rank/info', {
                    params: {
                        json: 'true',
                        rankid: id,
                        page: page
                    }
                })
                .then(function(res) {
                    _this.infoData = []
                    let arr = []
                    _this.total = res.data.songs.total
                    _this.infoData.total = res.data.songs.total
                    _this.maxpage = Math.ceil(res.data.songs.total / _this.size)
                    res.data.songs.list.forEach(value => {
                        let obj = {
                            hash: value.hash,
                            filename: value.filename
                        }
                        arr.push(obj)
                    })
                    return arr
                })
                .then(function(res) {
                    res.forEach(value => {
                        _this.$axios
                            .get('/search/song', {
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
                                        }
                                        _this.infoData.push(obj)
                                    }
                                })
                            })
                            .catch(function(err) {
                                console.log(err)
                            })
                    })
                })
                .catch(function(err) {
                    console.log(err)
                })
        },
        childSearch(page) {
            this.getRankInfo(this.rankId, page)
        }
    },
    watch: {
        rankId: {
            handler: function(val) {
                this.count++
                this.getRankInfo(val, 1)
            },
            immediate: true
        }
    }
}
</script>
<style scoped>
.main {
    text-align: center;
}
</style>
