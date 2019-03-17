<template>
    <ul>
        <li :class="{current_item:index==current_index}" @click.stop="listChange(index)"
         v-for='(songList,index) in songsList' :key="index">
            <span>{{index+1}}、{{songList.songname}} - {{songList.singername}}</span>
            <span>{{getMusicTime(songList.timelong)}}</span>
            <span @click.stop="deleteList(songList.hash, index)"></span>
        </li>
    </ul>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import api from '../api/storage'
export default {
    name: 'List',
    data(){
        return {
            msg: 'list'
        }
    },
    computed: {
        ...mapState([
            'songsList', 'current_index'
        ])
    },
    methods: {
        getMusicTime(time) {
            return api.getMusicTime(time)
        },
        deleteList(hash, index) {
            if (index <= this.current_index) {
                // this.changeItem(true);
                this.changeItem(false);
            }
            this.removeList(hash);
        },
        ...mapMutations([
            'listChange', 'removeList', 'changeItem'
        ])
    }
}
</script>
<style scoped>
.current_item {
    background: red;
}
li {
    list-style: none;
    line-height: 1.5rem;
    position: relative;
}
li span:first-of-type{
    width: 60%;
}
li span:last-of-type{
    display: inline-block;
    width: 0.75rem;
    height: 0.75rem;
    background: url(../assets/icon_splice.png) no-repeat;
    background-position: -420px 0px;
    margin: 0.375rem;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
}
li span:last-of-type:hover{
    background-position: -420px -60px;
}
</style>
