<template>
    <div class="main">
        <list-table :pData="{ data: searchData, songsList, total, maxpage, count }" @pageChage="childSearch"></list-table>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Details',
    data() {
        return {
            total: null,
            size: 30,
            maxpage: null,
            searchData: [],
            count: 0
        }
    },
    computed: {
        reqWord: function() {
            return this.$route.query.keyword
        },
        ...mapState(['songsList'])
    },
    watch: {
        reqWord: {
            handler(value) {
                this.count++
                this.search(value, 1)
            },
            immediate: true
        }
    },
    methods: {
        search(keyword, page) {
            let _this = this
            _this.$axios
                .get('/search/song', {
                    params: {
                        format: 'json',
                        keyword: keyword,
                        page: page,
                        pagesize: _this.size,
                        showtype: 1
                    }
                })
                .then(function(res) {
                    _this.searchData = []
                    _this.total = res.data.data.total
                    _this.maxpage = Math.ceil(res.data.data.total / _this.size)
                    for (let msg in res.data.data.info) {
                        let obj = {
                            hash: res.data.data.info[msg].hash,
                            songname: res.data.data.info[msg].songname,
                            singername: res.data.data.info[msg].singername,
                            albumname: res.data.data.info[msg].album_name,
                            timelong: res.data.data.info[msg].duration
                        }
                        _this.searchData.push(obj)
                    }
                })
                .catch(function(err) {
                    console.log(err)
                })
        },
        childSearch(page) {
            this.search(this.reqWord, page)
        }
    }
}
</script>

<style scoped>
.main {
    margin: 1rem 10%;
    text-align: center;
}
</style>
