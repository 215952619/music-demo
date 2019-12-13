import jsonp from 'jsonp'
import Axios from 'axios'

export default {
    myApi: {
        getPlaceHold() {
            let PlaceHold = 'http://so.service.kugou.com/v1/word_nofocus'
            let otps = {
                params: 'callback',
                timeout: 10000,
                prefix: 'cb',
                name: 'cbPlaceHold'
            }
            jsonp(PlaceHold, otps, (err, data) => {
                if (!err) {
                    console.log(data.data[0].keyword)
                } else {
                    console.log(err)
                }
            })
        },
        getSongsInfo(hash) {
            // 根据hash获取歌曲详细信息
            let time = new Date().getTime()
            let SongsInfo = 'http://www.kugou.com/yy/index.php?r=play/getdata&alboum_id=0&hash=' + hash + '&_=' + time
            let otps = {
                params: 'callback',
                timeout: 10000,
                prefix: 'cb',
                name: 'cbSongsInfo'
            }
            jsonp(SongsInfo, otps, (err, data) => {
                if (!err) {
                    console.log(data.data)
                } else {
                    console.log(err)
                }
            })
        },
        getNewSongs() {
            // 获取首发新歌
            let NewSongs = '/api?json=true'
            // let otps = {
            //     params: 'callback',
            //     timeout: 10000,
            //     prefix: 'cb',
            //     name: 'cbNewSongs'
            // };
            // jsonp(NewSongs, otps, (err, data) => {
            //     if (!err) {
            //         console.log(data.data);
            //     } else {
            //         console.log(err);
            //     }
            // })
            Axios.get(NewSongs)
                .then(function(response) {
                    console.log(response)
                })
                .then(function(error) {
                    console.log(error)
                })
        },
        getRanksInfo() {
            // 获取音乐榜单
            let RanksInfo = 'http://m.kugou.com/rank/list&json=true'
            let otps = {
                params: 'callback',
                timeout: 10000,
                prefix: 'cb',
                name: 'cbRanks'
            }
            jsonp(RanksInfo, otps, (err, data) => {
                if (!err) {
                    console.log(data.data)
                } else {
                    console.log(err)
                }
            })
        },
        getRankInfo(rankid, page) {
            // 根据榜单id，页码获取榜单详细信息
            let RankInfo = 'http://m.kugou.com/rank/info/?rankid=' + rankid + '&page=' + page + '&json=true'
            let otps = {
                params: 'callback',
                timeout: 10000,
                prefix: 'cb',
                name: 'cbRankInfo'
            }
            jsonp(RankInfo, otps, (err, data) => {
                if (!err) {
                    console.log(data.data)
                } else {
                    console.log(err)
                }
            })
        },
        getPlists() {
            // 获取歌单信息
            let Plists = 'http://m.kugou.com/plist/index&json=true'
            let otps = {
                params: 'callback',
                timeout: 10000,
                prefix: 'cb',
                name: 'cbPlists'
            }
            jsonp(Plists, otps, (err, data) => {
                if (!err) {
                    console.log(data.data)
                } else {
                    console.log(err)
                }
            })
        },
        getPlistInfo(specialid) {
            // 根据歌单id获取歌单详细信息
            let PlistInfo = 'http://m.kugou.com/plist/list/' + specialid + '?json=true'
            let otps = {
                params: 'callback',
                timeout: 10000,
                prefix: 'cb',
                name: 'cbPlistInfo'
            }
            jsonp(PlistInfo, otps, (err, data) => {
                if (!err) {
                    console.log(data.data)
                } else {
                    console.log(err)
                }
            })
        },
        getSingerClass() {
            // 获取歌手分类
            let SingerClass = 'http://m.kugou.com/singer/class&json=true'
            let otps = {
                params: 'callback',
                timeout: 10000,
                prefix: 'cb',
                name: 'cbSingerClass'
            }
            jsonp(SingerClass, otps, (err, data) => {
                if (!err) {
                    console.log(data.data)
                } else {
                    console.log(err)
                }
            })
        },
        getSingerList(classid) {
            // 根据歌手分类id获取详细分类信息
            let SingerList = 'http://m.kugou.com/singer/list/' + classid + '?json=true'
            let otps = {
                params: 'callback',
                timeout: 10000,
                prefix: 'cb',
                name: 'cbSingerList'
            }
            jsonp(SingerList, otps, (err, data) => {
                if (!err) {
                    console.log(data.data)
                } else {
                    console.log(err)
                }
            })
        },
        getSearch(keyword, page) {
            // 搜索
            let Search = 'http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=' + keyword + '&page=' + page + '&pagesize=10&showtype=1'
            let otps = {
                params: 'callback',
                timeout: 10000,
                prefix: 'cb',
                name: 'cbSearch'
            }
            jsonp(Search, otps, (err, data) => {
                if (!err) {
                    console.log(data.data)
                } else {
                    console.log(err)
                }
            })
        }
    }
}
