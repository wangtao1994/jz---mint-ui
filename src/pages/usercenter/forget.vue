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
                        <input placeholder="请输入手机号" v-model="useraccount" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'') " maxlength="11" @change="checkPhone()" />
                    </div>
                </div>
            </div>
            
            <div class="login-item">
                <div class="item-left">
                    新密码
                </div>
                <div class="item-right">
                    <div class="input-wrap">
                        <input placeholder="8-16位字母和数字组合" v-model="userpwd" type="password" maxlength="16"/>
                    </div>
                </div>
            </div>
            <div class="login-item">
                <div class="item-left">
                    再次输入密码
                </div>
                <div class="item-right">
                    <div class="input-wrap">
                        <input placeholder="请再次输入新密码" v-model="userpwdtwice" type="password" maxlength="16"/>
                    </div>
                </div>
            </div>
           
            <div class="login-item verify-item">
                <div class="item-left">
                    验证码
                </div>
                <div class="item-right">
                    <div class="input-wrap verify-input">
                        <input placeholder="请输入验证码" v-model="verifycode"/>
                    </div>
                    <div class="verify-input-btn">
                        <div class="get-verify" @click="getVerifyCode()">
                           <span> {{verifytip||"获取验证码"}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="btn-frame">
            <div class="btn-box">
                <div class="sub-btn" @click="resetPwd()">完成</div>
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

        .item-right .verify-input{
            font-size:0px !important;
        }
        .item-right .verify-input-btn{
            margin-top:-2px !important;
            width:45%;
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
</style>
<script>
//引入请求方法
import * as request from "./../../utils/request";
import { Toast } from 'mint-ui';
import md5 from 'js-md5';
import * as config from "./../../config/app.config";

export default {
    name: 'forget',
    data () {
        return {
            userpwd : "",
            userpwdtwice : "",
            verifycode : "",
            useraccount : "",
            isgettingverify : false,//是否正在获取验证码
            countdown : 60,//获取验证码倒计时
            verifytip : "",//验证码提示
        }
    },
    methods:{
        //检查手机是否注册
        checkPhone(){
            var self = this;
            var mobile = self.useraccount+"";
            var myreg = /^(((1[0-9]{1}[0-9]{1}))+\d{8})$/;
            if(!myreg.test(mobile.trim())){
                this.showTipFn("账号需为手机号码");
                return;
            }
            //验证是否已经被注册
            self.checkIsRegister(mobile,function(){
                Toast("该账户不存在");
            });
        },
        //检测是否已经被注册
        checkIsRegister(phone,callback){
            var option = {
                mobile : phone
            };

            var res = request.post(config.default.ajax,"app","cd_check_mobile",option);
            res.then(function(res){
                callback();
            },function(err){
                //Toast(err);
            });
        },
        resetPwd(){
            var self = this;
            if(this.useraccount.trim().length<1){
                Toast("用户名不能为空");
                return;
            }

            var myreg = /^(((1[0-9]{1}[0-9]{1}))+\d{8})$/;
            if(!myreg.test(this.useraccount)){
                Toast("用户名需为手机号码");
                return;
            }
            /*
            var pwdreg = /^[a-zA-Z0-9]*([a-zA-Z][0-9]|[0-9][a-zA-Z])[a-zA-Z0-9]*$/;
             */
            var pwdreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
            if(!pwdreg.test(this.userpwd)){
                Toast("密码需要为8-16位数字字母组合");
                return;
            }
            
            if(this.userpwd.trim().length<8||this.userpwd.trim().length>16){
                Toast("密码需要为8-16位");
                return;
            }
            if(this.userpwdtwice!=this.userpwd){
                Toast("两次密码不同");
                return;
            }
            
            if(this.verifycode.trim().length<1){
                Toast("请填写验证码");
                return;
            }
            
            //md5加密
            var userpwd = md5(self.userpwd);
            
            var option = {
                data : {
                    mobile : self.useraccount,
                    newpwd : userpwd, 
                    smsCode : self.verifycode
                } 
            }

            
            var res = request.post(config.default.ajax,"app","cd_reset_pwd",option.data);

            res.then(function(res){
                Toast("重设成功");
                self.$router.push({path: '/login'});
                
            },function(err){
                Toast(err||"重设失败:"+err);
            });
        },
        
        //获取验证码
        getVerifyCode(){
            var self = this;
            var myreg = /^(((1[0-9]{1}[0-9]{1}))+\d{8})$/;
            if(!myreg.test(this.useraccount)){
                Toast("用户名需为手机号码");
                return;
            }

            if(this.isgettingverify){
                return;
            }
            self.isgettingverify = true;
            

            self.isgettingverify = true;
            self.verifytip = "正在获取...";
            var option = {
                data : {
                    mobile : self.useraccount
                } 
            }
            //发送请求
            var res = request.post(config.default.ajax,"app","get_Sms_Code",option.data);
            
            res.then(function(res){
                self.countFn();
            },function(error_msg,error_code){
                self.isgettingverify = false;
                self.showTipFn(error_msg||"获取验证码失败");
                self.verifytip = "重新获取";
            });

        },
        //倒计时方法
        countFn(){
            var self = this;
            var iterval =  setInterval(function(){
                self.countdown--;
                if(self.countdown<1){
                    self.isgettingverify = false;
                    self.verifytip = "获取验证码";
                    clearInterval(iterval);
                    self.countdown = 60;
                }else{
                    self.verifytip = self.countdown + "S";
                }
            },1000)
        },
        
        //展示提示方法
        showTipFn(str){
            Toast(str);
        },
        hideTipFn(){
            this.tip = "";
            this.showTip = false;
        },
    }
}
</script>