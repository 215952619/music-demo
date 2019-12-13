<template>
    <div class="main">
        <list></list>
        <lyric :current_time="current_time" v-if="loaded" :current_song="current_song"></lyric>
        <div class="player">
            <div class="button">
                <button @click="changeItem(false)"></button>
                <button @click="changeStatus()" :class="{ pause: paused }"></button>
                <button @click="changeItem(true)"></button>
            </div>
            <div class="img">
                <img :src="current_song.img" />
            </div>
            <div class="info">
                <p>{{ songsList[current_index].songname }} - {{ songsList[current_index].singername }}</p>
                <p>
                    <span>{{ getMusicTime(current_time) }}</span
                    >/<span>{{ getMusicTime(song_time) }}</span>
                </p>
                <p class="progress" @click="jumpTime()"><span class="bar" :style="{ width: (current_time / song_time) * 100 + '%' }"></span></p>
            </div>
            <div class="mode" @mouseover="mouseover = true" @mouseout="mouseover = false">
                <button @click="changeMode(index)" v-for="(mode, index) in modes" :key="index" v-show="index === current_mode || mouseover"></button>
            </div>
            <div class="volume">
                <button @click="muted" :class="{ muted: mute }"></button>
                <p class="progress" @click="changeVolume">
                    <span class="bar" :style="{ width: current_volume * 100 + '%' }"></span>
                </p>
            </div>
        </div>
        <audio id="myAudio" :src="current_song.src" autoplay ref="myAudio"></audio>
    </div>
</template>
<script>
import api from '../api/storage'
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'player',
    data() {
        return {
            modes: [
                {
                    modeid: 0,
                    modename: '列表循环'
                },
                {
                    modeid: 1,
                    modename: '单曲循环'
                },
                {
                    modeid: 2,
                    modename: '随机播放'
                }
            ],
            is_start: true,
            paused: false,
            mute: false,
            loaded: false,
            mouseover: false,
            current_mode: 0,
            current_volume: 1,
            song_time: 0,
            current_time: 0,
            current_song: {}
        }
    },
    watch: {
        hash: {
            handler(newVal, oldVal) {
                let res = false
                this.songsList.forEach((value, index) => {
                    if (value.hash === newVal) {
                        this.listChange(index)
                        res = true
                    }
                })
                if (!res) {
                    this.listChange(0)
                }
            },
            immediate: true
        },
        current_index: {
            handler(newVal, oldVal) {
                let _this = this
                this.loaded = false
                _this.$axios
                    .get('/info', {
                        params: {
                            r: 'play/getdata',
                            hash: _this.songsList[newVal].hash
                        }
                    })
                    .then(function(res) {
                        _this.current_song = {
                            img: res.data.data.img,
                            lrc: res.data.data.lyrics,
                            src: res.data.data.play_url
                        }
                        _this.bindData()
                        _this.audioElement.load()
                        _this.loaded = true
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
                this.$router.push({
                    name: 'player',
                    query: {
                        hash: this.songsList[newVal].hash
                    }
                })
            },
            immediate: true
        }
    },
    created() {
        this.startPlay(true)
    },
    mounted: function() {
        // this.bindData();
    },
    computed: {
        hash: function() {
            return this.$route.query.hash
        },
        audioElement: function() {
            // let ele = document.getElementById('myAudio');
            // return ele
            return this.$refs.myAudio
        },
        ...mapState(['songsList', 'current_index'])
    },
    beforeDestroy() {
        this.startPlay(false)
    },
    methods: {
        getMusicTime(time) {
            return api.getMusicTime(time)
        },
        changeStatus() {
            if (this.audioElement.paused) {
                this.paused = false
                this.audioElement.play()
            } else {
                this.paused = true
                this.audioElement.pause()
            }
        },
        muted() {
            this.mute = !this.mute
            this.audioElement.muted = !this.audioElement.muted
        },
        changeMode(index) {
            this.current_mode = index
            console.log('循环模式已切换为：' + this.modes[index].modename)
        },
        bindData() {
            let _this = this
            _this.audioElement.addEventListener('timeupdate', function() {
                _this.song_time = _this.audioElement.duration
                _this.current_time = _this.audioElement.currentTime
                _this.current_volume = _this.audioElement.volume
                _this.getNext(_this.audioElement)
            })
        },
        getNext(e) {
            if (e.ended) {
                switch (this.current_mode) {
                    case 0:
                        this.changeItem(true)
                        break
                    case 1:
                        e.currentTime = 0
                        e.play()
                        break
                    case 2:
                        let maxNum = this.songsList.length
                        let n = Math.floor(Math.random() * maxNum)
                        this.listChange(n)
                        e.currentTime = 0
                        break
                    default:
                        this.changeItem(true)
                        break
                }
            }
        },
        jumpTime() {
            let ele = document.getElementsByClassName('progress')[0]
            let x = event.offsetX
            let w = window.getComputedStyle(ele).width
            this.audioElement.currentTime = (this.audioElement.duration * x) / parseFloat(w)
        },
        changeVolume() {
            let ele = document.getElementsByClassName('progress')[1]
            let x = event.offsetX
            let w = window.getComputedStyle(ele).width
            this.audioElement.volume = x / parseFloat(w)
            console.log(this.audioElement.volume)
        },
        ...mapMutations(['changeItem', 'listChange', 'startPlay'])
    }
}
</script>
<style scoped>
.main {
    height: calc(100% - 11rem);
}
ul {
    box-sizing: border-box;
    display: inline-block;
    width: 41%;
    height: calc(100% - 10rem);
    padding: 0.5rem 0;
    border: 1px solid #ccc;
    margin: 0.5rem 0;
    vertical-align: top;
    overflow: auto;
}
ul:nth-of-type(1) {
    margin: 0.5rem 6%;
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
    width: 90%;
    height: 7rem;
    padding: 0.5rem 5%;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
}
.player div {
    float: left;
    height: 100%;
}
.player button {
    width: 16px;
    height: 16px;
    background: url(../assets/btn.png) repeat;
    border: none;
    outline: none;
    vertical-align: middle;
    cursor: pointer;
}
.button button {
    width: 36px;
    height: 36px;
    margin: calc(25% - 18px) 0.5rem;
}
.button button:nth-of-type(1) {
    background-position: 0px -143px;
}
.button button:nth-of-type(1):hover {
    background-position: -72px -143px;
}
.player .button .pause {
    background-position: 0px 0px;
}
.player .button .pause:hover {
    background-position: -120px 0px;
}
.button button:nth-of-type(2) {
    width: 60px;
    height: 60px;
    background-position: 0px -60px;
}
.button button:nth-of-type(2):hover {
    background-position: -120px -60px;
}
.button button:nth-of-type(3) {
    background-position: -144px -143px;
}
.button button:last-of-type:hover {
    background-position: -216px -143px;
}
.img {
    margin: 0 3rem;
}
.img img {
    height: calc(100% - 1rem);
    margin: 0.5rem;
}
.info {
    width: 35%;
}
.info p {
    line-height: 2rem;
}
.progress {
    width: 100%;
    height: 0.5rem;
    border: 1px solid #ccc;
    margin: 0.5rem 0;
    text-align: left;
    cursor: pointer;
    background-color: white;
}
.bar {
    display: inline-block;
    width: 0%;
    height: 100%;
    background: rgb(58, 61, 236);
    vertical-align: top;
}
.mode {
    width: 8rem;
    text-align: center;
}
.mode button {
    background-position-y: -179px;
    margin: 3rem 0.5rem;
}
.mode button:nth-of-type(1) {
    background-position-x: -80px;
}
.mode button:nth-of-type(2) {
    background-position-x: -16px;
}
.mode button:nth-of-type(3) {
    background-position-x: -144px;
}
.volume {
    width: 15%;
    position: relative;
}
.volume button {
    margin: 3rem 0;
    background-position: -80px -195px;
}
.volume .muted {
    background-position: -144px -195px;
}
.volume p {
    position: absolute;
    width: calc(100% - 20px);
    left: 20px;
    top: calc(50% - 0.8rem);
}
</style>
