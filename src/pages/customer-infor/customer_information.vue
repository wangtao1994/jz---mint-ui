<template>
	<div class="img0">
		<div class="top_img">
			<img src="../../images/icon/IOS/content_pic_banner_1@3x.png"/>
		</div>

		<div class="client_title">
			<img src="../../images/icon/IOS/content_icon_smal_icon_1@3x.png"/>
			填写客户信息
		</div>

		<div class="client_user">
			<div class="client_name">
				<i>姓名:</i>
				<input type="text" placeholder="请输入姓名" v-model="userName">
			</div>
			<div class="client_phone">
				<i>手机号:</i>
				<input type="text" placeholder="请输入手机号" v-model="phoneNumber">
			</div>
		</div>

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

		<div class="btn" @click="client_btn">下一步</div>
		<p class="suoming">点击“下一步”，将自动跳转到“平安银行新一贷”申请贷款页面</p>
	</div>
</template>
<style>
.img0{width: 100%;}
.top_img>img{width: 100%;}
.client_title{width: 100%;box-sizing: border-box;padding: 0 4%;display: flex;align-items: center;padding: 1em 4%;font-weight: 600;font-size: .9em;}
.client_title>img{width: 2em;margin-right: .5em;}

.client_user{width: 80%;padding: 1em 4%;box-sizing: border-box;background: #FFFFFF; margin: 0 auto; border-radius: 8px;}
.client_name{margin-bottom: 1em;}
.client_name ,.client_phone{background: #f7f7f7;border-radius: 5px;display: flex;justify-content: center;align-items: center;}
.client_name>i ,.client_phone>i{font-style: normal;margin-left: .5em;flex: 1;}
.client_name>input ,.client_phone>input{border: none;height: 3em;background: #f7f7f7;flex: 3;}

.oul>ul{display: flex;justify-content: center;align-items: center;width: 80%;margin: 0 auto;}
.oul>ul li{display: flex;justify-content: center;align-items: center;flex-direction: column;width: 34%;font-size: .9em;}
.oul>ul li>p{padding-top: .5em; font-weight: 600;font-size: .9em;}
.raudis{background: #26A2FF;border-radius: 50%;width: 2em;height: 2em;display: block;text-align: center;
display: flex;justify-content: center;align-items: center;
 font-style:normal;color: #FFFFFF;font-size: 1.1em;
font-weight: 600;
}
.first{background: #E6E6E6;}
.secoend{background: #FBDCAA;}
.thrid{background: #E6E6E6;}
.line{width: 5em; border: 1px dotted #E6E6E6;margin-bottom: 1.5em;}
.sub-btn{background: #F5A623;}
.btn-frame{margin-top: 3em;}
.dai_money{width: 100%;padding: 0 4%;box-sizing: border-box;font-weight: normal;padding-bottom: 1.5em;font-size: 1em;display: flex;align-items: center;
padding-top: 1em;
}
.dai_money>span{display: inline-block;width: .3em;height: 1.1em;background: #ff761b;margin: 0 .5em 0 0;line-height: 5em;}
.btn{width: 80%;margin: 0 auto;background: #F5A623;text-align: center;height: 3em;line-height: 3em;color: #FFFFFF;margin-top: 1em;border-radius: 5px;}
.suoming{width: 80%;color: #CCCCCC;font-size: .7em;margin: 0 auto;margin-top: .5em;margin-bottom: .5em;}
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
	    	isLogin:false,//是否登录
	        userName : "",
	        phoneNumber : "",
	     }
	},

    methods:{
    	client_btn(){
    		var self = this;
            if(this.userName.trim().length<1){
                this.showTipFn("姓名不能为空");
                return;
            }
            var namereg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;

            if(!namereg.test(this.userName.trim())){
                this.showTipFn("姓名必需为2-20中文字符");
                return;
            }

            var myreg = /^(((1[0-9]{1}[0-9]{1}))+\d{8})$/;
            if(!myreg.test(this.phoneNumber)){
                this.showTipFn("账号需为手机号码");
                return;
            }
            var option = {
                data : {
                	cus_id: 0,
                    name : self.userName,
                    id_card : '',
					mobile : self.phoneNumber,
                    age: 0,
                    province: null,
                    city: null,
                    remark: '',
                }
            }

            var formData = {
			        product_id: 1,
			        app_amount: 0,
			        city: null,
			        cust_id: '',
			        remark: null,
			        actual_service_fee_rate: 0,
      			}



            if(localStorage){
    			localStorage.setItem("clientinfor",JSON.stringify(option.data));
    		}
            /*
            1.先添加客户信息  接口为cd_add_consumer 传入姓名和手机号作为参数。
            2.点击下一步生成订单  并返回一个订单号传入到平安H5链接作为一个参数。
            */
            var cname=this.userName;
            var phnumber=this.phoneNumber;
            var self = this;
            var islogin=this.isLogin;//判断是否登录。
            if(islogin){
            	this.$store.dispatch("newaddGuest",option.data)//cd_add_consumer
        		.then(function(res){
        			formData.cust_id = res.cust_id;
        			self.$store.dispatch("newapplyLoan",formData)//cd_loan_apply
        				.then(function(res){
        					Toast("已生成订单");
        					var outsours=res.order_id;
        					window.location.href = 'https://b.pingan.com.cn/station/activity/loan/newloan/loantrust.html?source=sa0000451&outerSource='+ outsours +'&username=' + encodeURIComponent(cname)+'&tel='+encodeURIComponent(phnumber)
        				},function(err){
        					Toast("订单生成失败");
        				})
        			//
        		},function(err){
            		Toast(err||"填写失败:"+err);
        		})
            }else{
            	this.$router.push({path: '/newlogin'});
            }
    	},
    	//展示提示方法
        showTipFn(str){
            Toast(str);
        },
        hideTipFn(){
            this.tip = "";
            this.showTip = false;
        },
    },
    created(){
			document.title = '客户信息'
    },
    mounted(){
    	if(localStorage){

    	}
    },
    beforeMount(){
        if(!sessionStorage.getItem('url')){
            if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
              sessionStorage.setItem('url',window.location.href);
            }
        }
        //先判断用户localStorage中是否存储有登录信息
        if(localStorage){
            var userinfo = JSON.parse(localStorage.getItem("userinfo")||"{}")||{};
            if(userinfo.token){
                this.isLogin = true;
            }else{
                this.isLogin = false;
            }
        }
    }
}

</script>
