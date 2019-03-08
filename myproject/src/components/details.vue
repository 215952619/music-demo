<template>
  <div class="main">
    <table>
        <thead>
            <td>歌曲名</td>
            <td>歌手</td>
            <td>专辑</td>
            <td>时长</td>
            <td>操作</td>
        </thead>
        <tbody>
            <tr v-for="(data,index) in searchData" :key="index">
                <td>{{data.songname}}</td>
                <td>{{data.singername}}</td>
                <td>{{data.albumname}}</td>
                <td>{{data.timelong}}</td>
                <td>
                    <a @click="play(data.hash)"><span></span></a>
                    <a><span></span></a>
                    <a><span></span></a>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="5">
                    <span @click="pageChange(1)">首页</span>
                    <span @click="pageChange(false)">上一页</span>
                    <input type="text" :max="maxpage" min="0" id="page" v-model="page" @keyup.enter="pageChange(page)" />
                    <span @click="pageChange(page)">跳转</span>
                    <span @click="pageChange(true)">下一页</span>
                    <span @click="pageChange(maxpage)">尾页</span>
                </td>
            </tr>
        </tfoot>
    </table>
    </div>
</template>

<script>
export default {
  name: 'Details',
  data () {
    return {
        keyword: '',
        page: 1,
        maxpage: null,
        size: 10,
        searchData: []
    }
  },
    created() {
        this.keyword = this.$route.query.keyword;
        this.search(this.keyword, 1);
    },
    methods: {
        pageChange(arg) {
            if (typeof arg === 'boolean') {
                if (arg === true) {
                    this.page = ++this.page >= this.maxpage ? this.maxpage : this.page;
                } else {
                    this.page = --this.page <= 1 ? 1 : this.page;
                }
            } else {
                if (arg < 1) {
                    this.page = 1;
                } else if (arg >= 1 && arg <= this.maxpage) {
                    this.page = arg;
                } else {
                    this.page = this.maxpage;
                }
            }
            this.search(this.keyword, this.page);
        },
        search(keyword, page) {
            let _this = this;
            _this.$axios.get('/search/song', {
                params: {
                    format: 'json',
                    keyword: keyword,
                    page: page,
                    pagesize: _this.size,
                    showtype: 1
                }
            })
            .then(function(res) {
                console.log(res.data.data.info)
                _this.searchData = [];
                _this.maxpage = Math.ceil(res.data.data.total / _this.size);
                for (let msg in res.data.data.info) {
                    let obj = {};
                    obj.hash = res.data.data.info[msg].hash;
                    obj.songname = res.data.data.info[msg].songname;
                    obj.singername = res.data.data.info[msg].singername;
                    obj.albumname = res.data.data.info[msg].album_name;
                    obj.timelong = res.data.data.info[msg].duration;
                    _this.searchData.push(obj);
                }
            })
            .catch(function(err) {
                console.log(err);
            });
        },
        play(hash) {
            this.$router.push({
                name: 'player'
            })
        }
    }
}
</script>

<style scoped>
.main{
    margin: 1rem 10%;
    text-align: center;
}
table{
    width: 100%;
    border-collapse: collapse;
    line-height: 2.5rem;
    font-size: 0.8rem;
}
thead{
    background: lightslategray;
    color: white;
}
tbody tr{
    border-bottom: 1px dotted black;
}
tbody tr:hover{
    background: rgba(50,50,50,0.1);
    cursor: pointer;
}
tbody span{
    display: inline-block;
    width: 14px;
    height: 13px;
    background: url(../assets/icon_splice.png) no-repeat;
    margin: 0 2px;
}
tbody a:nth-of-type(1) span{
    background-position: 0 0;
}
tbody a:nth-of-type(1):hover span{
    background-position: 0 -60px;
}
tbody a:nth-of-type(2) span{
    background-position: -120px -150px;
}
tbody a:nth-of-type(2):hover span{
    background-position: -120px -180px;
}
tbody a:nth-of-type(3) span{
    background-position: -210px -150px;
}
tbody a:nth-of-type(3):hover span{
    background-position: -210px -210px;
}
tfoot td{
    height: 3rem;
    color: gray;
}
input{
    width: 2rem;
    text-align: center
}
tfoot span{
    display: inline-block;
    width: 5rem;
    line-height: 2rem;
    margin: 0.5rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    background: #158fe1;
    color: white;
}
</style>
