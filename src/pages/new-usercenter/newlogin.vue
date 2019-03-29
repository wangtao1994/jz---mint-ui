<template>
	<div class="her_se">
		<div class="title">
			<h3>登录</h3>
		</div>

		<div class="loginlist">
			<i>手机号</i>
			<input  v-model="phone" placeholder="请输入手机号" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'') " maxlength="11"/>
		</div>

		<div class="loginlist">
			<i>密码</i>
			<input  type="password" maxlength=16 v-model="pwd" placeholder="请输入密码" />
		</div>
		<div class="normal-framex">
            <span class="left" @click="goregister()">注册</span>
            <span class="right" @click="goforget()">找回密码</span>
            <div class="clear"></div>
        </div>
        <div class="liney"></div>
		<h3 class="dai_money"><span></span>贷款提单流程</h3>
		<div class="oul">
			<ul>
				<li>
					<i class="raudis first">1</i>
					<p>登录</p>
				</li>
				<div class="line"></div>
				<li>
					<i class="raudis secoend">2</i>
					<p>客户信息</p>
				</li>
				<div class="line"></div>
				<li>
					<i class="raudis thrid">3</i>
					<p>申请贷款</p>
				</li>

			</ul>
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
.her_se{min-width: 320px;max-width: 750px; margin: 0 auto;	margin: auto;}
.title{padding: 1em 4% 0;font-size: 1.1em;}
.title h3{
	text-align: left;
	color: #484848;
	letter-spacing: 5px;
}
.loginlist{width: 100%; padding: 1em 4%; box-sizing: border-box;display: flex;justify-content: center;align-items: center;border-bottom: 1px solid #F1F1F1;}
.loginlist>i{font-style: normal;padding: 0em 0em 0em 0;flex: 1;font-weight: 600;}
.loginlist>input{flex: 3;border: none;height: 3em;padding-left: .5em;background: #F7F7F7;}
.normal-framex{width: 100%;padding: 0 4%;padding-top: 1.5em;position: relative;box-sizing: border-box;padding-bottom: 1.5em; color: #F6B342;font-size: .8em;}
.normal-framex .right{position: absolute;right: 4%;}

.oul>ul{display: flex;justify-content: center;align-items: center;width: 90%;margin: 0 auto;}
.oul>ul li{display: flex;justify-content: center;align-items: center;flex-direction: column;width: 34%;font-size: .9em;}
.oul>ul li>p{padding-top: .5em; font-weight: 600;}
.raudis{background: #26A2FF;border-radius: 50%;width: 2em;height: 2em;display: block;text-align: center;
display: flex;justify-content: center;align-items: center;
 font-style:normal;color: #FFFFFF;font-size: 1.1em;
	font-weight: 600;
}
.first{background: #FBDCAA;}
.secoend{background: #E6E6E6;}
.thrid{background: #E6E6E6;}
.line{width: 5em; border: 1px dotted #E6E6E6;margin-bottom: 1.5em;}
.sub-btn{background: #F5A623;}
.btn-frame{margin-top: 2em;}
.dai_money{width: 100%;padding: 0 4%;box-sizing: border-box;font-weight: normal;padding-bottom: 1.5em;font-size: 1em;display: flex;align-items: center; padding-top: 1.5em;}
.dai_money>span{display: inline-block;width: .3em;height: 1.1em;background: #ff761b;margin: 0 .5em 0 0;line-height: 5em;}
.liney{width: 100%;height: .5em; background: #F1F1F1;}
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

                self.$router.push({path: '/customer_information',query:{role:role_name}});
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
            this.$router.push({path: '/new_forget'});
        },
        goregister(){
            this.$router.push({path: '/newregister'});
        }

    },
    created(){
			document.title = '贷款提单'
    }
}

</script>
