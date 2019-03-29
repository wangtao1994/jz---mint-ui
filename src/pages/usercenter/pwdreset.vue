<template>
    <div >
        <div class="setting-list-wrap">
        	<div class="list-item">
        		<div class="item-name">
        			<img src="@/images/icon/IOS/content_icon_password_1@3x.png" />
        			<div class="input-wrap">
        				<input placeholder="请输入原密码" v-model="pwd" type="password" maxlength="16"/>
        			</div>
        		</div>
        	</div>
        	<div class="list-item">
        		<div class="item-name">
        			<img src="@/images/icon/IOS/content_icon_password_1@3x.png" />
        			<div class="input-wrap">
        				<input placeholder="请输入新密码(8-16位字母和数字组合)" v-model="newpwd" type="password" maxlength="16"/>
        			</div>
        		</div>
        	</div>
        	<div class="list-item">
        		<div class="item-name">
        			<img src="@/images/icon/IOS/content_icon_password_1@3x.png" />
        			<div class="input-wrap">
        				<input placeholder="请确认您的新密码" v-model="newpwdtwice" type="password" maxlength="16"/>
        			</div>
        		</div>
        	</div>
        </div>
        <div class="sub-wrap">
        	<div class="sub-btn" @click="updatePwd()">
        		确认修改
        	</div>
        </div>
    </div>
</template>
<style scoped>
	.setting-list-wrap .list-item{
		position:relative;
		padding :9px 6px;
		background:#fff;
		border-bottom: 1px solid #d0d0d0;
	}
	.setting-list-wrap .list-item .item-name{
		position:relative;
		display:inline-block;
		height:30px;
	}
	
	.setting-list-wrap .list-item .item-name{
		position: relative;
	    display: inline-block;
	    font-size: 18px;
	    color: #a6a6a6;
	    height: 30px;
	    line-height: 30px;
	    width:100%;
	}
	.setting-list-wrap .list-item .item-name img{
		position:relative;
		display:inline-block;
		width:25px;
		height:25px;
		vertical-align: text-top;
	    margin-right: 5px;
	    margin-left: 8px;
	}
	.setting-list-wrap .list-item .item-name .input-wrap{
		position:relative;
		display:inline-block;
		height:100%;
		width:70%;

	}
	.setting-list-wrap .list-item .item-name .input-wrap input{
		position:relative;
		display:inline-block;
		border:none;
		padding-left:5px;
		height:100%;
		font-size:16px;
		width:100%;
	}
	.sub-wrap{
		position:relative;
		margin-top:50px;
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
import md5 from 'js-md5';
import { Toast } from 'mint-ui';
import * as config from "./../../config/app.config";

export default {
    name: 'pwdrest',
    data () {
        return {
            pwd : "",
            newpwd : "",
            newpwdtwice : "",
            userid : "",
        }
    },
    methods:{
        //修改密码
        updatePwd(){
        	var self = this;

        	var pwdreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,116}$/;
        	if(this.pwd.trim().length<8||this.pwd.trim().length>16){
                Toast("旧密码为8-16位数字字母组合");
                return;
            }
            
            if(!pwdreg.test(this.newpwd)){
                Toast("密码需要为8-16位数字字母组合");
                return;
            }
            
            if(this.newpwd.trim().length<8||this.newpwd.trim().length>16){
                Toast("密码需要为8-16位数字字母组合");
                return;
            }
            
            if(this.newpwdtwice!=this.newpwd){
                Toast("两次密码不同");
                return;
            }
            if(this.pwd==this.newpwd){
                Toast("新旧密码不能相同");
                return;
            }

        	//md5加密
            var newpwd = md5(self.newpwd);
            var oldpwd = md5(self.pwd);
            var option = {
                data : {
                    new_pwd : newpwd,
                    old_pwd : oldpwd, 
                } 
            }
            var res = request.post(config.default.ajax,"app","cd_edit_pwd",option.data);
            
            res.then(function(res){
                Toast("密码修改成功,请重新登录");
                if(localStorage){
                    localStorage.setItem("userinfo","{}");
                }
                self.$router.push({path: '/login'});

            },function(err){
                Toast(err||"修改密码失败");
            });
        }

    },
    //页面加载之后调用的hook函数
    mounted(){
        
    }



}
</script>