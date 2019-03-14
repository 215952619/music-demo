<template>
    <ul>
        <li :class="{current_item:index==current_index}" @click="listChange(index)"
         v-for='(songList,index) in songsList' :key="index">
            <span>{{index+1}}、{{songList.name}} - {{songList.singer}}</span>
            <span>{{getMusicTime(songList.time / 1000 )}}</span>
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
            api.getMusicTime(time)
        },
        ...mapMutations([
            'listChange'
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
</style>
