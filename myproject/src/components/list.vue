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
    font-size: 0.8rem;
    line-height: 1.5rem;
    position: relative;
    cursor: pointer;
}
li span:nth-of-type(1){
    padding-left: 0.5rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
li span:nth-of-type(2){
    position: absolute;
    right: 3rem;
}
li span:last-of-type{
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background: url(../assets/btn.png) no-repeat;
    background-position: -272px -63px;
    margin: 0.25rem;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
}
li span:last-of-type:hover{
    background-position: -256px -63px;
}
</style>
