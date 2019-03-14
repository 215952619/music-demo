<template>
    <ul>
        <li :class="{current_item:index==current_index}" @click.stop="listChange(index)"
         v-for='(songList,index) in songsList' :key="index">
            <span>{{index+1}}、{{songList.songname}} - {{songList.singername}}</span>
            <span>{{getMusicTime(songList.timelong)}}</span>
            <a @click.stop="removeList(songList.hash)">移除</a>
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
        ...mapMutations([
            'listChange', 'removeList'
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
}
a{
    cursor: pointer;
}
a:hover{
    color: red;
    text-decoration: underline;
}
</style>
