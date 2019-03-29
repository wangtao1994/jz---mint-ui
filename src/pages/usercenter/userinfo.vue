<template>
	<div>
		<div class="userinfo-list-wrap">
			<div class="list-item">
				<div class="item-half userinfo">个人信息</div>
			</div>
			<div class="list-item">
				<div class="item-half">头像</div>
				<div class="item-half light">
					<div class="user-img">
						<img src="@/images/icon/IOS/content_icon_imsge_nor@3x.png" />
						<span class="head-click">
							点击修改头像
						</span>
					</div>
					<div class="user-img-more">
	        			<img src="@/images/icon/IOS/content_icon_more_6@3x.png" />
	        		</div>
				</div>
			</div>
			<div class="list-item">
				<div class="item-half">姓名</div>
				<div class="item-half light">{{userinfo.username}}</div>
			</div>
			<div class="list-item">
				<div class="item-half">城市</div>
				<div class="item-half light">{{userinfo.usercity}}</div>
			</div>
			<div class="list-item ">
				<div class="item-half">等级</div>
				<div class="item-half light">{{userinfo.level}}</div>
			</div>
			<div class="list-item space">
				<div class="item-half">手机号</div>
				<div class="item-half light">{{userinfo.phone}}</div>
			</div>
			<div class="list-item ">
				<div class="item-half">登录账号</div>
				<div class="item-half light">{{userinfo.account}}</div>
			</div>
			<div class="list-item ">
				<div class="item-half">邀请码</div>
				<div class="item-half light">{{userinfo.invitecode}}</div>
			</div>
			<div class="list-item space">
				<div class="item-half">注册时间</div>
				<div class="item-half light">{{userinfo.registertime}}</div>
			</div>
		</div>
	</div>

</template>

<style scope>
	.userinfo-list-wrap .list-item{
		position : relative;
		padding : 12px;
		border-top : 1px solid #f1f1f1;
		font-size : 0px;
		background:#fff;
	}
	.userinfo-list-wrap .list-item .item-half{
		position : relative;
		display:inline-block;
		width : 50%;
		font-size : 16px;
		box-sizing:border-box;
		padding-left:5px;
		font-weight:bold;
	}
	.userinfo-list-wrap .space{
		margin-top:10px !important;
		border:none !important;
	}
	.userinfo-list-wrap .list-item .light{
		color:#818181;
		font-weight:normal;
	}
	.userinfo-list-wrap .list-item .userinfo{
		font-size:18px;
		font-weight:bold;
		color:#000;
		line-height:30px;
	}
	.userinfo-list-wrap .list-item .item-half .user-img{
		position:relative;
		display:inline-block;
	}
	.userinfo-list-wrap .list-item .item-half .user-img img{
		position:relative;
		display:inline-block;
		width:30px;
		height:30px;
		vertical-align: middle;
	}
	.userinfo-list-wrap .list-item .item-half .user-img-more{
		position:relative;
		display:inline-block;
		float:right;
		width:15px;
		height:15px;
		line-height:30px;
	}
	.userinfo-list-wrap .list-item .item-half .user-img-more img{
		position:relative;
		display:inline-block;
		width:100%;
		height:100%;
	}
	.userinfo-list-wrap .list-item .item-half .head-click{
		position:relative;
		display:inline-block;
		font-size:12px;
	}
</style>

<script>
	//引入请求方法
	import * as request from "./../../utils/request";
	import { Toast } from 'mint-ui';
	import * as config from "./../../config/app.config";
	
	export default {
		name: 'userinfo',
	    data () {
	        return {
	            userinfo : {
	            	username : "",
	            	usercity :"",
	            	userpro:"",
	            	level : "",
	            	phone:"",
	            	account:"",
	            	invitecode:"",
	            	registertime:"",
	            }
	        }
	    },
	    methods:{
	    	//查询用户信息
	    	queryUserInfo(){
	    		
	    		var self = this;
	            var option = {
	                data : {
	                	parameters : ""
	                }
	            }
	            
	            
	            var res = request.post(config.default.ajax,"app","cd_individual_center_info_qry",option.data);
	            
	            res.then(function(res){
	            	var time = res.created_date+"";
	            	try{

	            		time = time.slice(0,10);
	            		
	            	}catch(e){

	            	}
	            	var userRoleName = res.dh == 1?"渠道经理":res.dh == 2?"普通经纪人":"合伙经纪人";
	                var obj = {
		            	username : res.user_name,
		            	usercity :res.city_name,
		            	userpro:res.province_name,
		            	level : userRoleName,
		            	phone:res.mobile,
		            	account:res.account,
		            	invitecode:res.qc_code,
		            	registertime:time,
		            }
	                self.userinfo = obj;

	            },function(err,msg){
	                Toast(err||"获取信息失败");
	            });
	    	},
	    	//时间戳转时间
	    	timestampToTime(timestamp) {
		        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		        Y = date.getFullYear() + '-';
		        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		        D = date.getDate() + ' ';
		        h = date.getHours() + ':';
		        m = date.getMinutes() + ':';
		        s = date.getSeconds();
		        return Y+M+D+h+m+s;
		    },
	    },
	    //页面加载之后调用的hook函数
	    mounted(){
	        this.queryUserInfo();
	        
	    }
	}
</script>