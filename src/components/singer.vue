<template>
    <div class="main">
        <ul class="lwarp">
            <li v-for="(data, index) in singerData" :key="index" @click="push(data.classid)" :class="{ current_li: data.classid === classId }">
                <p>{{ data.classname }}</p>
            </li>
        </ul>
        <router-view class="rwarp"></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            singerData: []
        }
    },
    beforeCreate() {
        let _this = this
        _this.$axios
            .get('/api/singer/class', {
                params: {
                    json: 'true'
                }
            })
            .then(function(res) {
                res.data.list.forEach(value => {
                    _this.singerData.push({ classid: value.classid, classname: value.classname })
                })
                if (!_this.classId) {
                    _this.push(_this.singerData[0].classid)
                }
            })
            .catch(function(err) {
                console.log(err)
            })
    },
    computed: {
        classId: function() {
            return this.$route.params.classid
        }
    },
    methods: {
        push(id) {
            this.$router.push({
                name: 'singerInfo',
                params: {
                    classid: id
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
