<template>
    <div>
        <list></list>
        <lyric :current_time='current_time'></lyric>
        <div class="player">
            <div class="button">
                <button @click="changeItem(false)">上一首</button>
                <button @click="changeStatus()">播放</button>
                <button @click="changeItem(true)">下一首</button>
                <button @click="changeMode()">{{mode[current_mode].modename}}</button>
            </div>
            <div class="info">
                <p>{{songsList[current_index].name}} - {{songsList[current_index].singer}}</p>
                <span>{{getMusicTime(current_time)}}</span>/<span>{{getMusicTime(song_time)}}</span>
                <p class="progress" @click="jumpTime()"><span class="bar" :style="{ width : current_time / song_time * 100 + '%'}"></span></p>
            </div>
        </div>
        <audio id="myAudio" :src="songsList[current_index].src" autoplay ref="myAudio"></audio>
    </div>
</template>
<script>
import api from '../api/storage'
import {mapState, mapMutations} from 'vuex'
export default {
    name: 'player',
    data() {
        return {
            mode: [{
                modeid: 0,
                modename: '列表循环'
            }, {
                modeid: 1,
                modename: '单曲循环'
            }, {
                modeid: 2,
                modename: '随机播放'
            }],
            current_mode: 0,
            play_mode: 0,
            is_start: true,
            song_time: 0,
            current_time: 0
        }
    },
    watch: {
        current_index: {
            handler(newVal, oldVal) {
                this.getResource(newVal);
                this.$forceUpdate();
            },
            immediate: true
        }
    },
    // created() {
    //     this.getResource(this.current_index);
    // },
    mounted: function() {
        this.bindData();
    },
    updated: function() {
        // console.log('updated');
        // this.getPlayData();
    },
    computed: {
        ...mapState([
            'songsList', 'current_index'
        ])
    },
    methods: {
        getMusicTime(time) {
            api.getMusicTime(time);
        },
        changeStatus() {
            let audio = document.getElementById('myAudio');
            if (audio.paused) {
                audio.play();
                this.is_start = true;
            } else {
                audio.pause();
                this.is_start = false;
            }
        },
        changeMode() {
            let l = this.mode.length - 1;
            this.current_mode = ++this.current_mode > l ? 0 : this.current_mode;
        },
        bindData() {
            let _audio = document.getElementById('myAudio');
            let _this = this;
            _audio.addEventListener('timeupdate', function() {
                _this.bindTime(_audio);
                _this.getNext(_audio);
            })
        },
        bindTime(e) {
            this.song_time = e.duration;
            this.current_time = e.currentTime;
        },
        getNext(e) {
            if (e.ended) {
                switch (this.current_mode) {
                    case 0:
                        this.changeItem(true);
                        break;
                    case 1:
                        e.currentTime = 0;
                        e.play();
                        break;
                    case 2:
                        let maxNum = this.songsList.length;
                        let n = Math.floor(Math.random() * maxNum);
                        this.listChange(n);
                        e.currentTime = 0;
                        break;
                    default:
                        this.changeItem(true);
                        break;
                }
            }
        },
        jumpTime() {
            let _audio = document.getElementById('myAudio');
            let ele = document.getElementsByClassName('progress')[0];
            let x = event.offsetX;
            let w = window.getComputedStyle(ele).width;
            _audio.currentTime = _audio.duration * x / parseFloat(w);
        },
        ...mapMutations([
            'getResource', 'changeItem', 'listChange'
        ])
    }
};
</script>
<style scoped>
ul {
    display: inline-block;
    width: 40%;
    height: 20rem;
    border: 1px solid #ccc;
    margin: 0 4%;
    vertical-align: top;
    overflow: auto;
}

ul::-webkit-scrollbar {
    display: none;
}

li {
    list-style: none;
    line-height: 1.5rem;
}

.player {
    color: white;
    position: fixed;
    width: 100%;
    height: 20%;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 1);
}

.progress {
    border: 1px solid #ccc;
    width: 100%;
    height: 0.5rem;
    text-align: left;
    cursor: pointer;
}

.bar {
    display: inline-block;
    width: 0%;
    height: 100%;
    background: rgb(58, 61, 236);
    vertical-align: top;
}
</style>
