<template>
    <ul>
        <li v-for="(value,index) in getLrc.lrcTexts" :key="index" class="lrcInfo" :class="{current_lrc:index==current_lrc}">
            {{value}}
        </li>
    </ul>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
export default {
    name: 'Lyric',
    data(){
        return {
            current_lrc: 0
        }
    },
    computed: {
        getLrc() {
            let lrcTime = [];
            let lrcText = [];
            if (typeof this.songsList[this.current_index].lrc !== 'string') {
                lrcText = ['歌词加载中'];
            } else {
                let lrcInfo = this.songsList[this.current_index].lrc.split('\n') || '';
                for (let lrcs of lrcInfo) {
                    let tmp = lrcs.split(']');
                    let tmp2 = tmp[0].split(':');
                    let time = (parseFloat(tmp2[0].replace('[', '')) * 60 + parseFloat(tmp2[1])).toFixed(2);
                    lrcText.push(tmp[1]);
                    lrcTime.push(time);
                }
                lrcTime.push(1 + lrcTime[lrcTime.length - 1]);
            }
            return {
                lrcTimes: lrcTime,
                lrcTexts: lrcText
            }
        },
        ...mapState([
            'songsList', 'current_index'
        ]),
        ...mapGetters([
            'resource'
        ])
    },
    props: ['current_time'],
    beforeMount() {
        console.log(typeof this.songsList[this.current_index]);
        console.log(this.getLrc.lrcTimes)
    },
    created() {
        console.log(11)
    },
    watch: {
        current_time: function(newValue, oldValue) {
            for (let i = 0; i < this.getLrc.lrcTimes.length; i++) {
                if (newValue > this.getLrc.lrcTimes[i] && newValue < this.getLrc.lrcTimes[i + 1]) {
                    this.current_lrc = i;
                    if (i >= 5) {
                        document.getElementsByClassName('lrcInfo')[0].parentNode.scrollTop = parseInt(window.getComputedStyle(document.getElementsByClassName('lrcInfo')[0]).height) * (i - 5)
                    }
                }
            }
        }
    }
}
</script>
<style scoped>
.current_lrc {
    color: red;
}
</style>
