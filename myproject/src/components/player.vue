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
                img: 'http://singerimg.kugou.com/uploadpic/softhead/400/20180712/20180712170431642.jpg',
                lrc: '[00:00.10]崔子格 - 风筝(电视剧《小情人》片头曲)\n[00:00.14]作词：三皮\n[00:00.43]作曲：三皮\n[00:00.84]你的味道在空气中弥漫\n[00:07.47]像夏天的雨潮湿又温暖\n[00:15.71]泥土的香气穿越记忆\n[00:23.26]飘飘荡荡的我线在你手里\n[00:30.74]忘记说起来很容易\n[00:38.15]对你也许只是游戏\n[00:45.69]风筝在天空飘来荡去\n[00:53.56]连我的样子都随你心意\n[01:34.20]我曾以为思念已经离去\n[01:41.26]像季节变换已经成习惯\n[01:49.49]牵着我的你还记得吗\n[01:57.01]飘飘荡荡的我线在你手里\n[02:04.56]忘记说起来很容易\n[02:11.87]对你也许只是游戏\n[02:19.44]风筝在天空飘来荡去\n[02:27.31]连我的样子都随你心意\n[02:34.73]忘记听起来很容易\n[02:42.09]对你动动手指而已\n[02:49.51]风筝在天空默默叹气\n[02:57.33]连我的样子都随你心意',
                name: '风筝',
                singer: '崔子格',
                src: 'http://fs.w.kugou.com/201903041114/3c58918403d7f10326444048fb64c08c/G098/M08/0F/0B/og0DAFknk66ACoOgAC4p24jcrdg242.mp3',
                time: 189000
            }, {
                img: 'http://singerimg.kugou.com/uploadpic/softhead/400/20170109/20170109150710384221.jpg',
                lrc: '[00:00.76]张碧晨、杨宗纬 - 凉凉\n[00:02.75]作词：刘畅\n[00:03.67]作曲：谭旋\n[00:47.91]入夜渐微凉\n[00:49.85]繁花落地成霜\n[00:52.51]你在远方眺望\n[00:55.16]耗尽所有暮光\n[00:57.96]不思量自难相忘\n[01:08.83]夭夭桃花凉\n[01:11.53]前世你怎舍下\n[01:13.88]这一海心茫茫\n[01:16.74]还故作不痛不痒不牵强\n[01:24.29]都是假象\n[01:30.28]凉凉夜色为你思念成河\n[01:35.85]化作春泥呵护着我\n[01:41.35]浅浅岁月拂满爱人袖\n[01:45.42]片片芳菲入水流\n[01:51.94]凉凉天意潋滟一身花色\n[01:57.12]落入凡尘伤情着我\n[02:02.58]生劫易渡情劫难了\n[02:05.31]折旧的心还有几分前生的恨\n[02:13.17]还有几分\n[02:17.29]前生的恨\n[02:42.87]也曾鬓微霜\n[02:44.61]也曾因你回光\n[02:47.21]悠悠岁月漫长\n[02:49.98]怎能浪费时光\n[02:52.63]去流浪\n[02:54.57]去流浪\n[02:57.38]去换成长\n[03:04.20]灼灼桃花凉\n[03:05.88]今生愈渐滚烫\n[03:08.59]一朵已放心上\n[03:11.55]足够三生三世背影成双\n[03:15.94]背影成双\n[03:18.49]在水一方\n[03:25.34]凉凉夜色为你思念成河\n[03:30.47]化作春泥呵护着我\n[03:35.88]浅浅岁月拂满爱人袖\n[03:40.19]片片芳菲入水流\n[03:46.79]凉凉天意潋滟一身花色\n[03:51.38]落入凡尘伤情着我\n[03:57.43]生劫易渡情劫难了\n[03:59.88]折旧的心还有几分前生的恨\n[04:15.91]凉凉三生三世恍然如梦\n[04:21.21]须臾的年风干泪痕\n[04:26.86]或是回忆不能再相认\n[04:31.12]就让情分落九尘\n[04:37.65]凉凉十里何时还会春盛\n[04:42.48]又见树下一盏风存\n[04:47.90]落花有意流水无情\n[04:50.69]别让恩怨爱恨凉透那花的纯\n[05:01.64]吾生愿牵尘',
                name: '凉凉',
                singer: '张碧晨',
                src: 'http://fs.w.kugou.com/201903041109/76f35b8e9f54fd53abfc6c15fcf1751d/G083/M08/0E/04/kw0DAFhvcJSAAX3SAFFchlFbaO8093.mp3',
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
    created: function() {
        console.log('created');
    },
    mounted: function() {
        console.log('mounted');
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
                        console.log(document.getElementsByClassName('lrcInfo')[0].parentNode.scrollTop)
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
        }
    }
};
</script>
<style scoped>
* {
    padding: 0;
    margin: 0;
}

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
