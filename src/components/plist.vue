<template>
    <div class="main">
        <ul class="lwarp">
            <li v-for="(data, index) in plistData" :key="index" @click="push(data.specialid)" :class="{ current_li: data.specialid === specialId }">
                <p>{{ data.specialname }}</p>
                <div v-show="data.specialid === specialId">
                    <img :src="data.img" />
                    <p>
                        提供用户：<span>{{ data.user }}</span>
                    </p>
                    <p>{{ data.info }}</p>
                </div>
            </li>
        </ul>
        <router-view class="rwarp"></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            plistData: []
        }
    },
    beforeCreate() {
        let _this = this
        _this.$axios
            .get('/api/plist/index', {
                params: {
                    json: 'true'
                }
            })
            .then(function(res) {
                _this.plistData.total = res.data.plist.list.total
                res.data.plist.list.info.forEach(value => {
                    let obj = {
                        specialid: value.specialid,
                        specialname: value.specialname,
                        user: value.username,
                        info: value.intro,
                        img: value.imgurl.replace('/{size}/', '/')
                    }
                    _this.plistData.push(obj)
                })
                if (!_this.specialId) {
                    _this.push(_this.plistData[0].specialid)
                }
            })
            .catch(function(err) {
                console.log(err)
            })
    },
    computed: {
        specialId: function() {
            return this.$route.params.specialid
        }
    },
    methods: {
        push(id) {
            this.$router.push({
                name: 'plistInfo',
                params: {
                    specialid: id
                }
            })
        }
    }
}
</script>
<style scoped>
.main {
    overflow: hidden;
    min-height: 20rem;
}
.lwarp {
    float: left;
    width: 23%;
    margin-top: 0.5rem;
    margin-left: 5%;
    font-size: 0.8rem;
    line-height: 1.5rem;
    border: 1px solid black;
}
.lwarp li {
    cursor: pointer;
    border-bottom: 1px solid black;
}
.lwarp li p {
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
}
.lwarp li > p:hover {
    color: red;
}
.current_li div {
    overflow: hidden;
    border-top: 1px dashed black;
    margin: 0.25rem;
}
.current_li div p:last-child:hover {
    text-decoration: underline;
}
.current_li img {
    height: 8rem;
    float: left;
    margin: 0.25rem 0.5rem;
}
.rwarp {
    float: left;
    width: 65%;
    margin-top: 0.5rem;
    margin-left: 2%;
}
</style>
