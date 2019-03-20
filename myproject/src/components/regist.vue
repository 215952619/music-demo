<template>
    <div class="main">
        <p class="cap">欢迎您注册本网站</p>
        <b>以下为您必须填写的内容</b>
        <input type="text" v-model="regname" placeholder="请输入您的登录名" />
        <input type="password" v-model="regpwd" placeholder="请输入您的密码" />
        <input type="password" v-model="regpwd2" placeholder="请再次输入您的密码" />
        <input type="text" v-model="regtel" placeholder="请输入您的电话号码" />
        <input type="text" v-model="regqq" placeholder="请输入您想关联的QQ" />
        <b>请继续完善您的个人信息</b>
        <input type="number" min="1" max="120" v-model="regage" placeholder="请输入您的年龄" />
        <p class="sexbox">
            请选择您的性别：
            <label for="man"><input type="radio" id="man" v-model="regsex" value="男" />男</label>
            <label for="woman"><input type="radio" id="woman" v-model="regsex" value="女" />女</label>
        </p>
        <input type="submit" value="注册" @click="regist" />
        <div class="errorbox" :class="{show:isMsg}">
            <p>{{msg}}</p>
        </div>
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
    data(){
        return {
            regname: '',
            regpwd: '',
            regpwd2: '',
            regtel: '',
            regqq: '',
            regage: '',
            regsex: '',
            msg: '',
            isMsg: false
        }
    },
    computed: {
        sexcode: function() {
            if (this.regsex) {
                if (this.regsex === '男'){
                    return 1
                } else {
                    return 2
                }
            } else {
                return 0
            }
        }
    },
    methods: {
        regist: function() {
            let _this = this;
            if (_this.regpwd === _this.regpwd2) {
                if (_this.regname !== '' && _this.regpwd !== '' && _this.regtel !== '' & _this.regqq !== '') {
                    _this.$axios.post('/service/regist', {
                        params: {
                            name: _this.regname,
                            pwd: _this.regpwd,
                            age: _this.regage || 1,
                            sex: _this.sexcode,
                            tel: _this.regtel,
                            qq: _this.regqq
                        }
                    })
                    .then(function(res) {
                        console.log(res.data)
                        if (res.data.code === 'warn') {
                            _this.msg = res.data.data.msg;
                            _this.msgShow();
                        }
                        if (res.data.code === 'ok' && res.data.data.rowsAffected === 1) {
                            _this.msg = '恭喜您注册成功';
                            _this.msgShow();
                        };
                        _this.loginSuccess({
                            name: _this.regname,
                            isVip: false,
                            vipStage: 0
                        });
                        _this.login();
                        _this.$router.go(-1);
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
                } else {
                    _this.msg = '您有选项未填完整';
                    this.msgShow();
                }
            } else {
                _this.msg = '两次密码不一致';
                this.msgShow();
            }
        },
        msgShow() {
            this.isMsg = true;
            setTimeout(() => {
                this.isMsg = false;
            }, 1500);
        },
        ...mapMutations([
            'loginSuccess', 'login'
        ])
    }
}
</script>
<style scoped>
.main{
    width: 80%;
    border: 2px solid #0088CC;
    border-radius: 5% 5% 0 0;
    margin: 0.5rem auto 2rem;
    box-shadow:0px 0px 0.25rem 0.25rem #0088CC;
    color:#0088cc;
}
.cap{
    font-size:2rem;
    font-weight:bolder;
    line-height:4rem;
    text-indent:3rem;
    color: #666;
}
.main b{
    width:80%;
    margin:0 auto;
    font-size:0.8rem;
    color:#d3d3d3;
    display:block;
    padding:0.5rem 0;
    border-bottom:1px dashed #d3d3d3;
}
.main>input{
    display:block;
    width:60%;
    margin: 0.8rem auto;
    line-height:3rem;
    text-indent:1rem;
}
.main input::-webkit-input-placeholder{
    color:#2434ed;
}
.sexbox{
    width:60%;
    margin:0 auto;
}
.sexbox label{
    margin:0 1rem;
    cursor:pointer;
}
.main input[type=submit]{
    height:3rem;
    text-indent:0;
    cursor:pointer;
}
.errorbox{
    width:30%;
    background:rgba(255,255,255,0.8);
    position:fixed;
    left:35%;
    top:20%;
    padding:0.5rem;
    border:1px solid #0088cc;
    border-radius:10px;
    line-height:1.5rem;
    box-shadow:3px 3px 3px 3px lightgray;
    text-align: center;
    display:none;
}
.errorbox p{
    margin: 1.5rem 0;
}
.show{
    display: block;
}
</style>
