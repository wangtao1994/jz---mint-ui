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
                    姓名
                </div>
                <div class="item-right">
                    <div class="input-wrap">
                        <input  placeholder="填写真实信息" v-model="username" @change="checkName()" maxlength="20"/>
                    </div>
                </div>
            </div>
            <div class="login-item">
                <div class="item-left">
                    账号
                </div>
                <div class="item-right">
                    <div class="input-wrap">
                        <input placeholder="请输入手机号码" v-model="phoneNumber" @change="checkPhone()" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'') "/>
                    </div>
                </div>
            </div>
            <div class="login-item">
                <div class="item-left">
                    密码
                </div>
                <div class="item-right">
                    <div class="input-wrap">
                        <input placeholder="8-16位字母和数字组合" v-model="userpwd" type="password" maxlength="16"/>
                    </div>
                </div>
            </div>
            <div class="login-item" v-show="state==1">
                <div class="item-left">
                    邀请码
                </div>
                <div class="item-right">
                    <div class="input-wrap">
                        <input placeholder="填写推荐经纪人邀请码(选填)" v-model="invitecode" maxlength="11" v-show="state==1" @change="checkInvite()" />

                        <input placeholder="填写推荐经纪人邀请码(选填)" v-model="invitecode" maxlength="11" v-show="state==2" readonly=true/>
                    </div>
                </div>
            </div>
            <div class="login-item" v-show="state==2">
                <div class="item-left">
                    邀请人
                </div>
                <div class="item-right">
                    <div class="input-wrap">
                        <input placeholder="填写推荐经纪人邀请人(选填)" v-model="invitecode" maxlength="11" @change="checkInvite()" readonly=true/>
                    </div>
                </div>
            </div>
            <div class="login-item">
                <div class="item-left">
                    业务区域
                </div>
                <div class="item-right">
                    <div class="item-select-box">
                        <div class="input-select-wrap">
                            <input placeholder="选择省" v-model="province.name" readonly/>
                        </div>
                        <div class="input-select-more" @click="chooseProvince()">
                            <img src="@/images/icon/IOS/content_icon_more_6@3x.png" width="60%" height="60%"/>
                        </div>
                    </div>
                    <div class="item-select-box">
                        <div class="input-select-wrap">
                            <input placeholder="选择市" v-model="city.cityname" readonly/>
                            
                        </div>
                        <div class="input-select-more" @click="chooseCity()">
                            <img src="@/images/icon/IOS/content_icon_more_6@3x.png" width="60%" height="60%"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="login-item verify-item">
                <div class="item-left">
                    验证码
                </div>
                <div class="item-right">
                    <div class="input-wrap verify-input">
                        <input placeholder="请输入验证码" v-model="verifycode" maxlength="6"/>
                    </div>
                    <div class="verify-input-btn">
                        <div class="get-verify" @click="getVerifyCode()">
                            {{verifytip||"获取验证码"}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="normal-agree-frame">
            <div>
                <span class="agreebtn">
                    <input type="checkbox" class="show-box" v-model="isagree" v-show="false"/>
                    <img src="@/images/icon/IOS/content_icon_rectangle2_nor@3x.png"  v-show="!isagree" @click="isagree=true"/>
                    <img src="@/images/icon/IOS/content_icon_rectangle2_selected@3x.png" v-show="isagree" @click="isagree=false"/>
                </span>
                <span>已阅读并同意</span>
                <span class="agreement" @click="goAgreement()">《金证通服务协议》</span>
            </div>
        </div>
        <div class="btn-frame">
            <div class="btn-box">
                
                <div class="sub-btn" @click="register()">注册</div>
            </div>
        </div>
        
        <div :class="{'mypick-animate':showAnimate , 'hide-animate':hideAnimate}" class="pick-choose">
            <span @click="chooseProvince">取消</span>
            <span @click="sureConfirm">确定</span>
            <mt-picker v-if="type == 'province'" :slots="slots" value-key="name"
                       @change="onValuesChange"></mt-picker>
            <mt-picker v-if="type == 'city'" :slots="slots" value-key="cityname"
                       @change="onValuesChange"></mt-picker>
        </div>
        
    </div>
</template>
<style scoped>
    
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

    .agreebtn{
        position:relative;
        display:inline-block;
        width:14px;
        height:14px;

    }
    .agreebtn img{
        position:relative;
        display:inline-block;
        width:100%;
        height:100%;
        margin-top:1px;
    }
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
    .pick-choose {
        height: 211px;
        background: white;
        position: fixed;
        width: 100%;
        bottom: -211px;
    }
    .mypick-animate {
        animation: mypick 0.5s;
        animation-fill-mode: forwards
    }

    .hide-animate {
        animation: mypickhide 0.5s;
        animation-fill-mode: forwards
    }

    @keyframes mypickhide {
        from {
            bottom: 0;
        }
        to {
            bottom: -211px;
        }
    }

    @keyframes mypick {
        from {
            bottom: -211px;
        }
        to {
            bottom: 0;
        }
    }
    .pick-choose span {
        color: rgb(57, 182, 254);
        display: inline-block;
        margin-top: 10px;
    }

    .pick-choose span:nth-of-type(1) {
        margin-left: 10%;
    }

    .pick-choose span:nth-of-type(2) {
        float: right;
        margin-right: 10%;
    }

</style>
<script>
//引入请求方法
import * as request from "./../../utils/request";
import { Toast } from 'mint-ui';
import {Button, Cell, Picker} from 'mint-ui';
import lineIco from '@/components/line-ico.vue';
import * as config from "./../../config/app.config";

import md5 from 'js-md5';
export default {
    name: 'register',
    components: {
      'mt-button': Button,
      'mt-cell': Cell,
      'line-ico': lineIco,
      'mt-picker': Picker,
    },
    data () {
        return {
            username : "",
            phoneNumber : "",
            userpwd : "",
            invitecode : "",
            inviteName : "",//邀请人
            province : "",
            city : "",
            verifycode : "",
            isagree : true,//是否同意服务协议
            provincelist : [],
            citylist : [],
            isgettingverify : false,//是否正在获取验证码
            countdown : 60,//获取验证码倒计时
            verifytip : "",//验证码提示
            showpro:false,//显示省份
            showcity:false,//显示城市
            state : 1,//1为主动注册，2为邀请注册
            showAnimate: false,
            hideAnimate: false,
            temppro : {},//临时省份
            tempcity : {},//临时城市
            slots : [{
                flex: 1,
                values: [],
                className: 'slot1',
                textAlign: 'center'
            }],
            type : "",
        }
    },
    methods:{
        //进入服务协议
        goAgreement(){
            var registerObj = {
                username : this.username,
                phoneNumber : this.phoneNumber,
                userpwd : this.userpwd,
                invitecode : this.invitecode,
                inviteName : this.inviteName,//邀请人
                province : this.province,
                city : this.city,
                verifycode : this.verifycode,
                isagree : this.isagree,//是否同意服务协议
                provincelist : this.provincelist,
                citylist : this.citylist,
                showpro:this.showpro,//显示省份
                showcity:this.showcity,//显示城市
                state : this.state,//1为主动注册，2为邀请注册
                showAnimate: this.showAnimate,
                hideAnimate: this.hideAnimate,
                temppro : this.temppro,//临时省份
                tempcity : this.tempcity,//临时城市
                slots : this.slots,
                type : this.type,
            }
            if(localStorage){
                
                localStorage.setItem("agreesource","2");
                localStorage.setItem("registerObj",JSON.stringify(registerObj));
            }
            this.$router.push({path: '/agreement'});
        },
        onValuesChange(picker, values) {
            console.log(values);
            if (this.type == "province") {
                //this.province = values[0].name
                this.temppro = values[0];
                this.tempcity = {};

            }
            if (this.type == "city") {
                //this.city = values[0].name
                this.tempcity = values[0];
            }
        },
        sureConfirm() {
            if (this.type == "province") {
                this.province = this.temppro;

                this.choosePro(this.province);
            }
            if (this.type == "city") {
                this.city = this.tempcity;
            }
            this.showAnimate = false;
            this.hideAnimate = true;

        },
        chooseProvince() {
            this.type = "province";
            
            if (this.showAnimate == true) {
                this.showAnimate = false;
                this.hideAnimate = true;
                
            }
            else {
                this.showAnimate = true;
                this.hideAnimate = false;
                this.slots[0].values = this.provincelist;
            }
        },
        chooseCity() {
            this.type = "city";

            if (this.showAnimate == true) {
                this.showAnimate = false;
                this.hideAnimate = true;
                //this.slots[0].values = this.citylist;

            }else {
                if(this.slots[0].values.length>0){
                    this.tempcity = this.slots[0].values[0];
                }
                this.showAnimate = true;
                this.hideAnimate = false;

                this.slots[0].values = this.citylist;

                
            }
        },
        //------------------------------
        register(){

            var self = this;
            console.log(self);
            
            if(this.username.trim().length<1){
                this.showTipFn("姓名不能为空");
                return;
            }
            if(this.username.indexOf(" ")>-1){
                this.showTipFn("姓名不能有空格");
                return;
            }
            var namereg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
            
            if(!namereg.test(this.username.trim())){
                this.showTipFn("姓名必需为2-20中文字符");
                return;
            }


            var myreg = /^(((1[0-9]{1}[0-9]{1}))+\d{8})$/;
            if(!myreg.test(this.phoneNumber)){
                this.showTipFn("账号需为手机号码");
                return;
            }
            
            var pwdreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,116}$/;
            if(!pwdreg.test(this.userpwd)){
                this.showTipFn("密码需要为8-16位数字字母组合");
                return;
            }
            if(this.userpwd.trim().length<8||this.userpwd.trim().length>16){
                this.showTipFn("密码需要为8-16位数字字母组合");
                return;
            }
            
            if(typeof this.invitecode!="undefined"&&this.invitecode.trim()!=""){
                if(!myreg.test(this.invitecode)){
                    this.showTipFn("邀请码需为手机号码");
                    return;
                }
            }
            
            
            if(typeof this.province.id =="undefined"){
                this.showTipFn("请选择省份");
                return;
            }
            if(typeof this.city.id =="undefined"){
                this.showTipFn("请选择城市");
                return;
            }
            if(this.verifycode.trim().length<1){
                this.showTipFn("请填写验证码");
                return;
            }
            
            if(!this.isagree){
                this.showTipFn("注册需要同意服务协议");
                return;
            }
            var userpwd = md5(self.userpwd);
            var option = {
                data : {
                    name : self.username,
                    mobile : self.phoneNumber,
                    pwhash : userpwd,
                    pcode : self.invitecode,
                    province : self.province.id,
                    city : self.city.id,
                    //channel_manager : self.channel_manager,
                    register_source : self.register_source,
                    smsCode : self.verifycode,
                    //acc_name : self.acc_name||"",
                    //bank_name : self.acc_name||"",
                    //account : self.acc_name||"",s
                } 
            }
            
            //验证是否已经被注册
            self.checkIsRegister(self.phoneNumber,function(){
                
                var res = request.post(config.default.ajax,"app","cd_broker_register",option.data);

                res.then(function(res){
                    var option = {
                        account : self.phoneNumber,
                        pwhsh : userpwd, 
                    } 
                    self.loginFn(option);

                },function(err){
                    self.showTipFn("注册失败:"+err);
                });
            });
        },
        //检查手机是否注册
        checkPhone(){
            var self = this;
            var mobile = self.phoneNumber+"";
            var myreg = /^(((1[0-9]{1}[0-9]{1}))+\d{8})$/;
            if(!myreg.test(mobile.trim())){
                this.showTipFn("账号需为手机号码");
                return;
            }
            //验证是否已经被注册
            self.checkIsRegister(mobile,function(){});
        },
        checkName(){
            var namereg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
            if(!namereg.test(this.username.trim())){
                this.showTipFn("姓名必需为2-20中文字符");
                return;
            }
        },
        //检查邀请人是否存在
        checkInvite(flag){
            var option = {
                mobile : this.invitecode
            };
            if(!flag){
                var mobile = this.invitecode + "";
                var myreg = /^(((1[0-9]{1}[0-9]{1}))+\d{8})$/;
                if(!myreg.test(mobile.trim())){
                    this.showTipFn("邀请人需为手机号码");
                    return;
                }
                var res = request.post(config.default.ajax,"app","cd_check_mobile",option);
                res.then(function(res){
                    Toast("该邀请人手机号未注册");
                },function(err){
                    
                });
            }
            
        },
        //登录方法
        loginFn(option){
            var self = this;
            //option.data.pwhsh="e10adc3949ba59abbe56e057f20f883e";
            var res = request.post(config.default.ajax,"app","cd_user_login",option);
            
            res.then(function(res){
                var data = res;
                if(localStorage){
                    localStorage.setItem("userinfo",JSON.stringify(data));
                }
                //如果是邀请注册，则带上参数
                if(self.inviteName){
                    self.$router.push({path: '/rsuc',query:{type:1}});
                }else{
                    self.$router.push({path: '/rsuc'});
                }
                
            },function(err,msg){
                if(self.inviteName){
                    self.$router.push({path: '/rsuc',query:{type:1}});
                }else{
                    self.$router.push({path: '/rsuc'});
                }

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
                Toast(err);
            });
        },
        choosePro(item){
            var key = "id";
            
            for(var i in this.provincelist){
                var pro = this.provincelist[i];
                if(pro[key] == item[key]){
                    this.province = pro;
                    this.city = {};
                    this.showpro = false;
                    this.getCityListByPro(this.province);
                }
            }
            this.showpro = false;
        },
        //通过省份获取城市列表
        getCityListByPro(pro){
            this.citylist = [];
            
            this.getCityList(pro.id);           
        },
        
        //获取验证码
        getVerifyCode(){
            var self = this;
            var myreg = /^(((1[0-9]{1}[0-9]{1}))+\d{8})$/;
            if(!myreg.test(this.phoneNumber)){
                this.showTipFn("账号需为手机号码");
                return;
            }

            if(this.isgettingverify){
                return;
            }
            self.isgettingverify = true;
            self.verifytip = "正在获取...";
            var option = {
                data : {
                    mobile : self.phoneNumber
                } 
            }
            //检测条件
            var coption = {
                mobile : self.phoneNumber
            };

            var cres = request.post(config.default.ajax,"app","cd_check_mobile",coption);
            
            cres.then(function(res){
                //发送请求
                var res = request.post(config.default.ajax,"app","get_Sms_Code",option.data);
                
                res.then(function(res){
                    self.countFn();
                },function(error_msg,error_code){
                    self.isgettingverify = false;
                    self.showTipFn(error_msg||"获取验证码失败");
                    self.verifytip = "重新获取";
                });
            },function(err,err_code){
                self.showTipFn(err||"获取验证码失败");
                self.isgettingverify = false;
                self.verifytip = "获取验证码";
            });

        },
        //倒计时方法
        countFn(){
            var self = this;

            var iterval = setInterval(function(){
                self.countdown--;
                if(self.countdown<1){
                    self.isgettingverify = false;
                    self.verifytip = "获取验证码";
                    self.countdown = 60;
                    clearInterval(iterval);
                }else{
                    self.verifytip = self.countdown + "S";
                }
            },1000)

        },
        //获取省份
        getProvinceList(){
            var self = this;
            var option = {};
            //发送请求
            var res = request.post(config.default.ajax,"app","cd_province_qry",option);
            res.then(function(res){
                
                var data = res;
                for(var i in data){
                    data[i]["name"] = data[i]["province_name"];
                    data[i]["id"] = data[i]["province_id"];
                }
                self.provincelist = data;
                self.citylist=[];
                self.slots[0].values = self.provincelist;
            },function(error_msg,error_code){
                self.provincelist = [];
                self.citylist=[];
                self.slots[0].values = self.provincelist;
            });
        },
        //获取城市
        getCityList(proid){
            var self = this;
            var option = {
                province_id : proid
            };
            //发送请求
            var res = request.post(config.default.ajax,"app","cd_city_qry",option);

            res.then(function(res){
                var data = res;
                for(var i in data){
                    data[i]["cityname"] = data[i]["city_name"];
                    data[i]["id"] = data[i]["city_id"];
                }
                
                self.slots[0].values = data;
                self.citylist = data;
                
            },function(error_msg,error_code){
                self.citylist=[];
                self.slots[0].values = self.citylist;
            });
        },

        //展示提示方法
        showTipFn(str){
            Toast(str);
        },
        hideTipFn(){
            this.tip = "";
            this.showTip = false;
        },
        //获取url上的参数
        getUrlParam(){

        },

    },
    //页面加载之后调用的hook函数
    mounted(){
        this.getProvinceList();
        //先判断注册是主动还是被邀请注册
        
        var query = this.$route.query||{};
        
        //如果有邀请码，则是邀请注册
        /*if(query.invite){
            this.state = 2;
            this.invitecode = query.invite || localStorage.getItem("invite");
            this.inviteName = query.invitename || localStorage.getItem("invitename");
            this.checkInvite(true);//检查邀请人
            
        }*/
        
        this.invitecode = query.invite || localStorage.getItem("invite") || "";
        this.inviteName = query.invitename || localStorage.getItem("invitename") || "";
        
        if(this.invitecode){
            this.checkInvite(true);//检查邀请人
            this.state = 2;
        }

        if(localStorage){
            var agreesource = localStorage.getItem("agreesource");
            if(agreesource){
                var registerObj = JSON.parse(localStorage.getItem("registerObj")||"{}")||{};
                
                for(var i in registerObj){
                    this[i] = registerObj[i];
                }
                
            }
            localStorage.setItem("agreesource","");
            localStorage.setItem("registerObj","");
        }
        
        
    }
}
</script>