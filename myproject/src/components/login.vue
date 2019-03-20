<template>
    <div class="box" v-if="this.$store.state.loginBox">
        <div class="login">
            <div class="loginclose" @click="close">×</div>
            <p>欢迎您登陆本网站</p>
            <input type="text" placeholder="请输入您的昵称" v-model="username" />
            <input type="password" placeholder="请输入您的密码" v-model="password" />
            <input type="submit" value="点击登陆" @click="Login"/>
            <b v-show="!isPass">您的登录名或者密码输入错误，请重新输入</b>
            <span>还没注册？<router-link :to="{name:'regist'}">点击注册</router-link></span>
        </div>
    </div>
</template>
<script>
import {mapMutations} from 'vuex';
    export default {
        name: 'loginBox',
        data(){
            return {
                isPass: true,
                username: '',
                password: ''
            }
        },
        methods: {
            Login() {
                let _this = this;
                if (this.username === 'lyy' && this.password === '123') {
                    this.loginBoxHidden();
                    this.login();
                } else {
                    this.isPass = false;
                    setTimeout(() => {
                        _this.isPass = true;
                    }, 1000);
                };
                this.$axios.get('/service/login', {
                    params: {
                        name: this.username,
                        pwd: this.password
                    }
                })
                .then(function(res) {
                    console.log(res)
                })
                .catch(function(err) {
                    console.log(err)
                })
            },
            close() {
                this.loginBoxHidden();
            },
            ...mapMutations([
                'login', 'loginBoxHidden'
            ])
        }
    }
</script>
<style scoped>
.box{
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    z-index: 100;
}
.login{
    width: 23rem;
    height: 18rem;
    line-height: 2rem;
    padding: 2rem;
    border: 1px solid #0088CC;
    border-radius: 3%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0 0.25rem 0.25rem #0088CC;
    color: #0088CC;
}
.loginclose{
    width: 2rem;
    line-height: 2rem;
    text-align: center;
    font-size: 2rem;
    border-radius: 1rem;
    position: absolute;
    right: -1rem;
    top: -1rem;
    background: #0088CC;
    color: white;
    cursor: pointer;
}
.loginclose:hover{
    background: red;
}
.login p{
    font-size: 1.5rem;
    line-height: 2rem;
    border-bottom: 2px solid black;
}
.login input{
    width: 100%;
    height: 2.5rem;
    margin: 1rem 0;
}
.login input[type=submit]{
    background: #0088CC;
    cursor: pointer;
    color: white;
    outline-color: #0088CC;
}
.login b{
    position:absolute;
    color:red;
    display:block;
    border:1px solid #0088CC;
    top:35%;
    left:15%;
    padding:1rem;
    font-size:0.8rem;
    border-radius:5px;
    background:white;
}
.login a{
    text-decoration: underline;
    color: red;
}
</style>
