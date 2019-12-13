<template>
    <div>
        <ul>
            <li v-for="(data, index) in infoData" :key="index" @click="push(data.singername)">
                <img :src="data.img" />
                <span>{{ data.singername }}</span>
            </li>
        </ul>
        <p class="main">
            <span @click="pageChange(1)" :class="{ disable: page === 1 }">首页</span>
            <span @click="pageChange(false)" :class="{ disable: page === 1 }">上一页</span>
            <input type="text" :max="maxpage" min="0" v-model="page" @keyup.enter="pageChange(page)" />
            <span @click="pageChange(page)">跳转</span> <i>共{{ total }}个结果</i>
            <span @click="pageChange(true)" :class="{ disable: page === maxpage }">下一页</span>
            <span @click="pageChange(maxpage)" :class="{ disable: page === maxpage }">尾页</span>
        </p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            page: 1,
            size: 30,
            maxpage: null,
            total: null,
            infoData: []
        }
    },
    computed: {
        classId: function() {
            return this.$route.params.classid
        }
    },
    methods: {
        push(singername) {
            this.$router.push({
                name: 'details',
                query: {
                    keyword: singername
                }
            })
        },
        pageChange(arg) {
            if (typeof arg === 'boolean') {
                if (arg === true) {
                    this.page = ++this.page >= this.maxpage ? this.maxpage : this.page
                } else {
                    this.page = --this.page <= 1 ? 1 : this.page
                }
            } else {
                if (arg < 1) {
                    this.page = 1
                } else if (arg >= 1 && arg <= this.maxpage) {
                    this.page = arg
                } else {
                    this.page = this.maxpage
                }
            }
            this.getSingerInfo(this.classId, this.page)
            window.scrollTo(0, 0)
        },
        getSingerInfo(id, page) {
            let _this = this
            _this.$axios
                .get('/api/singer/list/' + id, {
                    params: {
                        json: 'true',
                        page: page
                    }
                })
                .then(function(res) {
                    _this.infoData = []
                    _this.total = res.data.singers.list.total
                    _this.infoData.total = res.data.singers.list.total
                    _this.maxpage = Math.ceil(res.data.singers.list.total / _this.size)
                    res.data.singers.list.info.forEach(value => {
                        let obj = {
                            singername: value.singername,
                            singerid: value.singerid,
                            img: value.imgurl.replace('/{size}/', '/')
                        }
                        _this.infoData.push(obj)
                    })
                })
                .catch(function(err) {
                    console.log(err)
                })
        }
    },
    watch: {
        classId: {
            handler: function(val) {
                this.page = 1
                this.getSingerInfo(val, 1)
            },
            immediate: true
        }
    }
}
</script>
<style scoped>
ul {
    width: calc(100% - 2px);
    display: flex;
    flex-flow: row wrap;
    border: 1px solid black;
}
li {
    width: calc(20% - 1rem);
    padding: 0.25rem;
    margin: 0.25rem;
    flex: 0 1 auto;
    justify-content: space-evenly;
    align-items: baseline;
    cursor: pointer;
}
li:hover {
    width: calc(20% - 1rem - 2px);
    border: 1px solid #ccc;
}
li img {
    height: 5rem;
}
li span {
    line-height: 5rem;
    font-size: 0.8rem;
}
.main {
    height: 3rem;
    color: gray;
}
.main input {
    width: 2rem;
    text-align: center;
}
.main span {
    display: inline-block;
    width: 5rem;
    line-height: 2rem;
    margin: 0.5rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    background: #158fe1;
    color: white;
}
.disable {
    color: #888;
    background-color: #ddd;
}
</style>
