<template>
    <div class="main">
        <ul class="lwarp">
            <li v-for="(data, index) in albumData" :key="index" @click="push(data.id)" :class="{ current_li: albumId === data.id }">
                <p>{{ data.name }}</p>
            </li>
        </ul>
        <router-view class="rwarp"></router-view>
    </div>
</template>

<script>
export default {
    name: 'Album',
    data() {
        return {
            albumData: []
        }
    },
    beforeCreate() {
        let _this = this
        _this.$axios
            .get('/hot', {
                params: {
                    json: 'true'
                }
            })
            .then(function(res) {
                res.data.data.info.forEach(value => {
                    let areaid = value.jumpurl.split('=')[1]
                    if (areaid) {
                        _this.albumData.push({ id: areaid, name: value.keyword })
                    }
                })
                if (!_this.albumId) {
                    _this.push(_this.albumData[0].id)
                }
            })
            .catch(function(err) {
                console.log(err)
            })
    },
    computed: {
        albumId: function() {
            return this.$route.params.albumid
        }
    },
    methods: {
        push(id) {
            this.$router.push({
                name: 'albumInfo',
                params: {
                    albumid: id
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
    text-align: center;
}
.lwarp {
    float: left;
    width: 15%;
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
.current_li {
    font-size: 1.5rem;
    line-height: 2rem;
    color: white;
    background-color: darkturquoise;
}
.rwarp {
    float: left;
    width: 73%;
    margin-top: 0.5rem;
    margin-left: 2%;
}
</style>
