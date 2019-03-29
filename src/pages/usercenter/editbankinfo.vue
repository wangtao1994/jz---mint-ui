<template>
	<div>
		<div class="title-wrap">
			<span class="wall">

			</span>
			<span class="title">
				结佣银行账号信息
			</span>
			<div class="edit" v-show="state==1" @click="changeState()">
				<img src="@/images/icon/IOS/content_icon_apply_pressed@3x.png" />
			</div>
		</div>
		<div class="bankinfo-list-wrap">
			<div class="list-item">
				<div class="item-half">开户名</div>
				<div class="item-half light hidden">张三</div>
				<div class="item-half item60">
					<div class="input-wrap">
						<input placeholder="请输入开户名" v-model="username"/>
					</div>
				</div>
			</div>
			<div class="list-item">
				<div class="item-half">开户行</div>
				<div class="item-half light hidden">中国平安银行</div>
				<div class="item-half item60">
					<div class="input-wrap">
						<input placeholder="请输入开户行" v-model="bank"/>
					</div>
				</div>
			</div>
			<div class="list-item">
				<div class="item-half">银行账号</div>
				<div class="item-half light hidden">1234567890</div>
				<div class="item-half item60">
					<div class="input-wrap">
						<input placeholder="请输入银行账号" v-model="banknumber"/>
					</div>
				</div>
			</div>
				
		</div>
		<div class="sub-wrap" v-show="state==2">
        	<div class="sub-btn" @click="updateBankInfo()">
        		完成
        	</div>
        </div>
	</div>

</template>

<style scope>
	.title-wrap{
		position : relative;
		padding : 15px 15px;
	}
	.title-wrap .wall{
		position : relative;
		display : inline-block;
		width : 3px;
		height : 14px;
		background : rgb( 57 ,182, 254);
	}
	.title-wrap .title{
		position : relative;
		display : inline-block;
		font-size : 18px;
		color : #000;
		font-weight : bold;
	}
	.title-wrap .edit{
		position:absolute;
		display:inline-block;
		right:10px;
		top:10px;
		width:22px;
		height:22px;
	}
	.title-wrap .edit img{
		position:absolute;
		display:inline-block;
		width:100%;
		height:100%;
	}
	.bankinfo-list-wrap .list-item{
		position : relative;
		padding : 12px;
		border-bottom : 1px solid #f1f1f1;
		font-size : 0px;
		background:#fff;
	}
	.bankinfo-list-wrap .list-item .item-half{
		position : relative;
		display:inline-block;
		width : 50%;
		font-size : 16px;
		box-sizing:border-box;
		padding-left:5px;
		font-weight:bold;
	}
	.bankinfo-list-wrap .space{
		margin-top:10px !important;
		border:none !important;
	}
	.bankinfo-list-wrap .list-item .light{
		color:#818181;
		font-weight:normal;
	}
	.bankinfo-list-wrap .list-item .item-half .input-wrap{
		position:relative;
		display:inline-block;
		height:100%;
		width:100%;
	}
	.bankinfo-list-wrap .list-item .item-half .input-wrap input{
		position:relative;
		display:inline-block;
		border:none;
		padding-left:5px;
		height:100%;
		font-size:16px;
		width:100%;
		box-sizing: border-box;

	}
	.item-half{
		width:30% !important;
	}
	.item60{
		width:60% !important;
	}
	.sub-wrap{
		position:relative;
		margin-top:80px;
		text-align:center;
	}
	.sub-wrap .sub-btn{
		position:relative;
		display:inline-block;
		width:80%;
		height:48px;
		line-height:48px;
		color:#fff;
		background:rgb(57 ,182 ,254);
		font-size:18px;
		font-weight:bold;
		border-radius:5px;
	}
	
</style>

<script>
	//引入请求方法
	import * as request from "./../../utils/request";
	import { Toast } from 'mint-ui';
	import * as config from "./../../config/app.config";
	export default {
		name: 'editbankinfo',
	    data () {
	        return {
	           	state : 2,//1为查看，2为编辑
	           	bank : "",
	           	username : "",
	           	banknumber : ""
	        }
	    },
	    methods:{
	    	//查询银行信息
	    	queryBankInfo(){
	    		var self = this;
	            var option = {
	                data : {
	                	parameters : ""
	                }
	            }
	            
	            
	            var res = request.post(config.default.ajax,"app","cd_individual_center_info_qry",option.data);
	            
	            res.then(function(res){
	                self.username = res.acc_name;
	                self.bank = res.bank_name;
	                self.banknumber = res.bank_account;

	            },function(err,msg){
	                Toast(err||"获取信息失败");
	            });
	    	},
	    	//修改银行信息
	    	updateBankInfo(){
	    		var self = this;
	            if(this.username.trim().length<1){
	                Toast("开户名不能为空");
	                return;
	            }

	            if(this.bank.trim().length<1){
	                Toast("开户行必填");
	                return;
	            }
	            var banknumber = this.banknumber + "";
	            var myreg = /^[0-9]*$/;
	            if(!myreg.test(banknumber)||banknumber.trim()==""){
	                
	                Toast("银行账号不能为空,且只能为数字");
	                return;
	            }
	            
	            var option = {
	                data : {
	                    acc_name : self.username,
	                    bank_name : self.bank,
	                    bank_account : self.banknumber,
	                } 
	            }
	            
	            var res = request.post(config.default.ajax,"app","cd_bank_info_edit",option.data);
	            
	            res.then(function(res){
	                Toast("设置成功");
	               
	            },function(err){
	                Toast("设置失败");
	            });
	    	},


	    	changeState(){
	    		this.state = 2;
	    	}
	    },
	    //页面加载之后调用的hook函数
	    mounted(){
	       
	       //先判断是否有登录
	        var userinfo = {};
	        try{
	            userinfo = JSON.parse(localStorage.userinfo||"{}")||{};
	        }catch(e){
	        }
	        if(userinfo.token){
	            //先得获取用户的信息
	       		this.queryBankInfo();
	        }
	    }
	}
</script>