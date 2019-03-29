<template>
    <div class="login-bg">
        <div class="login-header">
            <div class="login-header-icon">
                <div class="login-header-icon-box">
                    <div class="kd-icon">
                        <img src="@/images/icon/IOS/kingdom.png"/>
                    </div>
                    <div class="kd-word">
                        金证通
                    </div>
                </div>
            </div>
        </div>
        <div class="login-frame">
            <div class="login-item">
                <div class="item-left">
                    账号
                </div>
                <div class="item-right">
                    <div class="input-wrap">
                        <input  v-model="phone" placeholder="请输入账号" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'') " maxlength="11"/>
                    </div>
                </div>
            </div>
            <div class="login-item">
                <div class="item-left">
                    密码
                </div>
                <div class="item-right">
                    <div class="input-wrap">
                        <input  type="password" maxlength=16 v-model="pwd" placeholder="请输入密码" />
                    </div>
                </div>
            </div>
        </div>
        <div class="normal-frame">
            <span class="left" @click="goregister()">注册</span>
            <span class="right" @click="goforget()">找回密码</span>
            <div class="clear"></div>
        </div>
        <div class="btn-frame">
            <div class="btn-box">
                <div class="loading-tip">
                    
                    <span>{{tip}}</span>
                </div>
                <div class="sub-btn" @click="login()">登录</div>
            </div>
        </div>
        
    </div>
</template>
<style scoped>
    /*****************媒体查询start******************/
    @media (max-width: 360px) {
        .login-header{
            height:90px;
        }
        .login-header-icon-box{
            margin-top:10px;
        }
        .login-header-icon .kd-icon{
            width:40px;
            height:40px;
        }
        .login-header-icon .kd-word{
            font-size:24px;
            line-height:40px;
        }
        .login-item{
            height:40px;
            line-height:30px;
        }
        .login-item .item-left{
            font-size:13px;
            padding-left:10px;
            width:35%;
        }
        .login-item .item-right{
            line-height:30px;
            font-size:13px;
            width:65%;
        }
        .login-item .item-right .input-wrap {
            margin-top:0px;
        }
        .login-item .item-right .input-wrap input{
            font-size:13px;
        }
        .login-item .item-right .input-select-wrap input{
            font-size:13px !important;
        }
        .login-item .item-right .input-select-wrap{
            margin-top:0px !important;
        }
        .login-frame .login-item .item-right .item-select-box .input-select-more{
            height:16px;
            width:16px;
            margin-top:0px;
            line-height:30px;
        }
        .verify-item{
            height:50px !important;
            padding-top:10px !important;
        }
        .item-right .verify-input-btn{
            margin-top:-2px !important;
        }
        .item-right .verify-input-btn .get-verify{
            line-height:22px !important;
            font-size:12px !important;
            height:22px !important;
            padding:2px 2px;;
        }
        .normal-agree-frame{
            margin-top:10px !important;
            font-size:13px !important;
        }
        .btn-frame{
            margin-top:10px;
        }
        .btn-frame .sub-btn{
            font-size:18px !important;
            height:40px;
            line-height:40px;
        }
    }
    /*****************媒体查询end******************/
    input::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #b1b1b1;
    }
    input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color:  #b1b1b1;
    }
    input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color:  #b1b1b1;
    }
    input::-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color:  #b1b1b1;
    }

</style>
<script>
//引入请求方法
import * as request from "./../../utils/request";
import md5 from 'js-md5';
import { Toast } from 'mint-ui';
import { Spinner  } from 'mint-ui';

import * as config from "./../../config/app.config";
export default {
    name: 'login',
    data () {
        return {
            phone : "",//手机
            pwd : "",//密码
            tip : "",
            showTip : false,//是否展示提示
        }
    },
    methods:{
        login(){
            var self = this;
            this.hideTipFn();
            //条件判断
            var myreg = /^(((1[0-9]{1}[0-9]{1}))+\d{8})$/;
            if(!myreg.test(this.phone)){
                this.showTipFn("请填写正确手机号码格式");
                return;
            }
            
            var pwdreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
            if(!pwdreg.test(this.pwd)){
                this.showTipFn("密码需要为8-16位数字字母组合");
                return;
            }
            if(this.pwd.trim().length<8){
                this.showTipFn("密码需8-16位");
                return;
            }
            
            this.showTipFn("正在验证，请稍后");
            //md5加密
            var pwd = md5(self.pwd);
            
            var option = {
                data : {
                    account : self.phone,
                    pwhsh : pwd, 
                } 
            }
            
            //option.data.pwhsh="e10adc3949ba59abbe56e057f20f883e";
            var res = request.post(config.default.ajax,"app","cd_user_login",option.data);
            
            res.then(function(res){
                self.hideTipFn();
                
                var data = res;
                self.saveUserInfoIntoLocalStorage(data);
                var role_name = data["role_name"];

                self.$router.push({path: '/main',query:{role:role_name}});
            },function(err,msg){
                self.showTipFn(err||"登录失败");
            });

        },
        //存储用户信息到localstorage
        saveUserInfoIntoLocalStorage(data){
            
            if(localStorage){
                localStorage.setItem("userinfo",JSON.stringify(data));
            }
        },
        //手机输入修改
        phoneInputChange(){
            self.hideTipFn();
        },
        //展示提示方法
        showTipFn(str){
            //Toast(str);
            this.tip = str;
            this.showTip = true;
        },
        hideTipFn(){
            this.tip = "";
            this.showTip = false;
        },
        goforget(){
            this.$router.push({path: '/forget'});
        },
        goregister(){
            this.$router.push({path: '/register'});
        }

    },
    //页面加载之后调用的hook函数
    mounted(){

    }



}
</script>