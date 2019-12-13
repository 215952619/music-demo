<template>
    <ul>
        <li v-for="(value, index) in lrcTexts" :key="index" class="lrcInfo" :class="{ current_lrc: index == current_lrc }">
            {{ value }}
        </li>
    </ul>
</template>
<script>
export default {
    name: 'Lyric',
    data() {
        return {
            current_lrc: 0,
            lrcTimes: [],
            lrcTexts: []
        }
    },
    computed: {},
    props: ['current_time', 'current_song'],
    watch: {
        current_song: {
            handler: function(newValue, oldValue) {
                if (newValue.lrc) {
                    let lrcInfo = newValue.lrc.split('\n') || ''
                    let lrcText = []
                    let lrcTime = []
                    for (let lrcs of lrcInfo) {
                        let tmp = lrcs.split(']')
                        let tmp2 = tmp[0].split(':')
                        let time = (parseFloat(tmp2[0].replace('[', '')) * 60 + parseFloat(tmp2[1])).toFixed(2)
                        lrcText.push(tmp[1])
                        lrcTime.push(time)
                    }
                    this.lrcTimes = lrcTime
                    this.lrcTexts = lrcText
                }
            },
            immediate: true
        },
        current_time: {
            handler: function(newValue, oldValue) {
                for (let i = 0; i < this.lrcTimes.length; i++) {
                    if (newValue > this.lrcTimes[i] && oldValue < this.lrcTimes[i]) {
                        let parentNode = document.getElementsByClassName('lrcInfo')[0].parentNode
                        let lineHeight = window.getComputedStyle(document.getElementsByClassName('lrcInfo')[0]).height
                        this.current_lrc = i
                        if (i >= 5) {
                            parentNode.scrollTop = parseInt(lineHeight) * (i - 5)
                        }
                    }
                }
            },
            immediate: true
        }
    }
}
</script>
<style scoped>
li {
    text-align: center;
    font-size: 0.8rem;
    line-height: 1.5rem;
    color: #aaa;
}
.current_lrc {
    font-size: 1.5rem;
    color: red;
}
</style>
