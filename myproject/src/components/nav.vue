<template>
    <div class="nav">
        <ul class="shadow">
            <li v-for="(link,index) in links" :key="index">
                <div></div>
            </li>
        </ul>
        <ul class="navlist">
            <li v-for="(link,index) in links" :key="index" @mouseover="mouseover(index)" @mouseout="mouseout(index)">
                <router-link :to="{name:link.path}">{{link.name}}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'myNav',
        data(){
            return {
                links: [{
                    path: 'home',
                    name: '首页'
                }, {
                    path: 'rank',
                    name: '榜单'
                }, {
                    path: 'plist',
                    name: '歌单'
                }, {
                    path: 'singer',
                    name: '歌手'
                }, {
                    path: 'player',
                    name: '播放器'
                }]
            }
        },
        methods: {
            mouseover (index) {
                let shadowBoxes = document.getElementsByClassName('shadow')[0].getElementsByTagName('li');
                let shadowRadius = shadowBoxes[index].getElementsByTagName('div')[0];
                shadowBoxes[index].style.transform = 'rotateZ(-12deg) skew(15deg)';
                shadowRadius.style.width = '0.8rem';
                shadowRadius.style.height = '0.8rem';
                shadowRadius.style.borderRadius = '0.4rem';
            },
            mouseout (index) {
                let shadowBoxes = document.getElementsByClassName('shadow')[0].getElementsByTagName('li');
                let shadowRadius = shadowBoxes[index].getElementsByTagName('div')[0];
                shadowBoxes[index].style.transform = 'rotateZ(-8deg) skew(20deg)';
                shadowRadius.style.width = '0.5rem';
                shadowRadius.style.height = '0.5rem';
                shadowRadius.style.borderRadius = '0.25rem';
            }
        }
    }
</script>
<style scoped>
.nav{
    width: 90%;
    color: white;
    position: relative;
    line-height: 3rem;
    text-align: center;
    left: 5%;
}
ul{
    position: absolute;
    width: 90%;
    height: 3rem;
    background: rgba(24,24,24,1);
    transform: skew(-30deg);
    left: 5%;
    bottom: 0;
}
li{
    float: left;
    width: 15%;
    cursor: pointer;
}
.navlist li{
    border-right: 2px dotted white;
}
.navlist li:hover{
    box-shadow: rgba(0, 0, 255, 0.8) 0 0 2rem inset;
}
.shadow li{
    display: block;
    height: 100%;
    background: rgba(24,24,24,1);
    transform-origin: left top;
    transform: rotateZ(-8deg) skew(20deg);
}
.shadow div{
    position: absolute;
    width: 0.5rem;
    height: .5rem;
    border-radius: 0.25rem;
    background: white;
    top: 0.25rem;
    right: 0.25rem;
}
</style>
