<template>
    <table>
        <thead>
            <td v-for="(navdata,index) in nav" :key="index">{{navdata}}</td>
        </thead>
        <tbody>
            <tr v-for="(data,index) in pData.data" :key="index">
                <td>{{data.songname}}</td>
                <td>{{data.singername}}</td>
                <td>{{data.albumname}}</td>
                <td>{{data.timelong}}</td>
                <td>
                    <a @click="play(index, data.hash)"><span></span></a>
                    <a @click="addCollection(index)"><span></span></a>
                    <a><span></span></a>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="5">
                    <span @click="pageChange(1)" :class="{disable:page===1}">首页</span>
                    <span @click="pageChange(false)" :class="{disable:page===1}">上一页</span>
                    <input type="text" :max="pData.maxpage" min="0" v-model="page" @keyup.enter="pageChange(page)" />
                    <span @click="pageChange(page)">跳转</span> <i>共{{pData.total}}个结果</i>
                    <span @click="pageChange(true)" :class="{disable:page===pData.maxpage}">下一页</span>
                    <span @click="pageChange(pData.maxpage)" :class="{disable:page===pData.maxpage}">尾页</span>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    name: 'ListTable',
    data () {
        return {
            page: 1,
            navInfo: ['歌曲名', '歌手名', '专辑', '时长', '操作']
        }
    },
    computed: {
        nav: function() {
            return this.pData.nav || this.navInfo
        }
    },
    props: ['pData'],
    methods: {
        pageChange(arg) {
            if (typeof arg === 'boolean') {
                if (arg === true) {
                    this.page = ++this.page >= this.pData.maxpage ? this.pData.maxpage : this.page;
                } else {
                    this.page = --this.page <= 1 ? 1 : this.page;
                }
            } else {
                if (arg < 1) {
                    this.page = 1;
                } else if (arg >= 1 && arg <= this.pData.maxpage) {
                    this.page = arg;
                } else {
                    this.page = this.pData.maxpage;
                }
            }
            this.$emit('pageChage', this.page);
            window.scrollTo(0, 0);
        },
        play(index, hash) {
            this.addCollection(index);
            this.$router.push({
                name: 'player',
                query: {
                    hash: hash
                }
            });
        },
        addCollection(index) {
            this.addList(this.pData.data[index]);
        },
        ...mapMutations([
            'addList'
        ])
    },
    watch: {
        'pData.count': {
            handler: function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.page = 1;
                    window.scrollTo(0, 0);
                }
            },
            deep: true,
            immediate: true
        }
    }
}
</script>

<style scoped>
table{
    width: 100%;
    border-collapse: collapse;
    line-height: 2.5rem;
    font-size: 0.8rem;
    text-align: center;
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
tbody tr:nth-of-type(2n){
    background-color: #eee;
}
tbody a:nth-of-type(1) span{
    background-position: 0 0;
}
tbody a:nth-of-type(1):hover span{
    background-position: 0 -60px;
}
tbody a:nth-of-type(2) span{
    background-position: -60px 0px;
}
tbody a:nth-of-type(2):hover span{
    background-position: -60px -60px;
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
.disable{
    color: #888;
    background-color: #ddd;
}
</style>
