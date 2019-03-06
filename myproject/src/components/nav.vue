<template>
    <div class="nav">
        <div class="bg"></div>
        <ul class="shadow">
            <li><div></div></li>
            <li><div></div></li>
            <li><div></div></li>
            <li><div></div></li>
            <li><div></div></li>
        </ul>
        <ul class="navbox">
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/rank">榜单</router-link></li>
            <li><router-link to="/plist">歌单</router-link></li>
            <li><router-link to="/singer">歌手</router-link></li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'nav',
        data(){
            return {

            }
        }
    }
</script>
<style scoped>
.nav{
    width: 100%;
    height: 6rem;
    color: white;
    position: relative;
    line-height: 2rem;
    z-index: 10;
    text-align: center;
    top: 10rem;
}
.bg{
    background: rgba(24,24,24,1);
    position: absolute;
    width: 90%;
    height: 33%;
    bottom: 0;
    left: 5%;
    transform: skew(-30deg);
}
ul{
    position: absolute;
    width: 70%;
    height: 33%;
    left: 3%;
    bottom: 0;
    overflow: hidden;
}
li{
    float: left;
    width: 16%;
    background: rgba(24,24,24,1);
    transform: skew(-30deg);
    cursor: pointer;
}
li:first-child{
    margin-left: 3%;
}
.navbox li{
    border-right: 2px dotted white;
}
.shadow{
    top: 20px;
    height: 80px;
}
.shadow li{
    width: 155px;
    height: 40px;
    margin: 30px -10px 10px;
    transform-origin: 0 100%;
    transform: rotateZ(-7deg) skew(0deg);
    background: rgba(21,21,19,1);
    text-align: center;
    line-height: 40px;
}
.shadow li:first-child{
    margin-left: 5%;
}
.shadow li:hover{
    background: rgba(21,21,19,1);
}
.shadow div{
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background: white;
    top: 5px;
    right: 5px;
}
</style>
