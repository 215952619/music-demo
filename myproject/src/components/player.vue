<template>
    <div>
        <ul>
            <li :class="{current_item:index==current_index}" @click="current_index=index" v-for='(songList,index) in songsList' :key="index">
                <span>{{index+1}}、{{songList.name}} - {{songList.singer}}</span>
                <span>{{getMusicTime(songList.time / 1000 )}}</span>
            </li>
        </ul>
        <ul>
            <li v-for="(value,index) in getLrc.lrcTexts" :key="index" class="lrcInfo" :class="{current_lrc:index==current_lrc}">
                {{value}}
            </li>
        </ul>
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
export default {
    name: 'player',
    data() {
        return {
            songsList: [{
                hash: '23f190b9a04e03086a9f4a158a5c5138',
                name: '风筝',
                singer: '崔子格',
                time: 189000
            }, {
                hash: '9c5f7afc362e4dbc38f71d50b32892fa',
                name: '凉凉',
                singer: '张碧晨',
                time: 333000
            }],
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
            current_index: 0,
            current_lrc: 0,
            play_mode: 0,
            is_start: true,
            song_time: 0,
            current_time: 0
        }
    },
    created() {
        this.getResource(this.current_index);
    },
    mounted: function() {
        console.log('mounted');
        console.log(this.songsList);
        this.bindData();
    },
    updated: function() {
        // console.log('updated');
        // this.getPlayData();
    },
    computed: {
        getLrc() {
            let lrcInfo = this.songsList[this.current_index].lrc.split('\n');
            let lrcTime = [];
            let lrcText = [];
            for (let lrcs of lrcInfo) {
                let tmp = lrcs.split(']');
                let tmp2 = tmp[0].split(':');
                let time = (parseFloat(tmp2[0].replace('[', '')) * 60 + parseFloat(tmp2[1])).toFixed(2);
                lrcText.push(tmp[1]);
                lrcTime.push(time);
            }
            lrcTime.push(1 + lrcTime[lrcTime.length - 1]);
            return {
                lrcTimes: lrcTime,
                lrcTexts: lrcText
            }
        }
    },
    methods: {
        getMusicTime(time) {
            let timeMin = Math.floor(time / 60) < 10 ? '0' + Math.floor(time / 60) : Math.floor(time / 60);
            let timeSec = Math.floor(time % 60) < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60);
            return timeMin + ':' + timeSec;
        },
        changeItem(bool) {
            let l = this.songsList.length - 1;
            if (bool) {
                this.current_index = ++this.current_index > l ? 0 : this.current_index;
            } else {
                this.current_index = --this.current_index < 0 ? l : this.current_index;
            }
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
                _this.bindLrcTime(_audio);
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
                        break;
                    case 2:
                        let maxNum = this.songsList.length;
                        let n = Math.floor(Math.random() * maxNum);
                        this.current_index = n;
                        e.currentTime = 0;
                        break;
                    default:
                        this.changeItem(true);
                        break;
                }
            }
        },
        bindLrcTime(e) {
            let _this = this;
            for (let i = 0; i < _this.getLrc.lrcTimes.length; i++) {
                if (e.currentTime > _this.getLrc.lrcTimes[i] && e.currentTime < _this.getLrc.lrcTimes[i + 1]) {
                    _this.current_lrc = i;
                    if (i >= 5) {
                        document.getElementsByClassName('lrcInfo')[0].parentNode.scrollTop = parseInt(window.getComputedStyle(document.getElementsByClassName('lrcInfo')[0]).height) * (i - 5)
                    }
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
        getResource(index) {
            let _this = this;
            this.$axios.get('/info', {
                params: {
                    r: 'play/getdata',
                    hash: _this.songsList[index].hash
                }
            })
            .then(function(res) {
                _this.songsList[index] = {
                    ..._this.songsList[index],
                    img: res.data.data.img,
                    lrc: res.data.data.lyrics,
                    src: res.data.data.play_url
                };
            })
            .catch(function(err) {
                console.log(err);
            })
        }
    },
    watch: {
        current_index: {
            handler(value) {
                this.getResource(value);
            },
            immediate: true
        }
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

.current_item {
    background: red;
}

.current_lrc {
    color: red;
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
