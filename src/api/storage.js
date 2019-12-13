export default {
    getMusicTime(time) {
        let timeMin = Math.floor(time / 60) < 10 ? '0' + Math.floor(time / 60) : Math.floor(time / 60)
        let timeSec = Math.floor(time % 60) < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60)
        return timeMin + ':' + timeSec
    },
    getRandomNum(min, max) {
        return Math.round(Math.random() * (max - min) + min)
    }
}
