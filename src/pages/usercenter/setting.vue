<template>
    <div class="bg-gray">
    	<div class="exit-mask" v-show="isExit">
    		<div class="mask">
    		</div>
    		<div class="exit-wrap">
    			<div class="title">
    				确定要退出?
    			</div>
    			<div>
    				<div class="btn cancel" @click="cancel()">
    					取消
    				</div>
    				<div class="btn" @click="confirm()">
    					确定
    				</div>
    			</div>
    		</div>
    	</div>
        <div class="setting-list-wrap">
        	<div class="list-item" @click="goToPwdSet()">
        		<div class="item-name" >
        			<img src="@/images/icon/IOS/content_icon_password_1@3x.png" />
        			<span>密码修改</span>
        		</div>
        		<div class="item-more">
        			<img src="@/images/icon/IOS/content_icon_more_6@3x.png" />
        		</div>
        	</div>
        	<div class="list-item" @click="exitFn()">
        		<div class="item-name" >
        			<img src="@/images/icon/IOS/content_icon_exit@3x.png" />
        			<span>退出登录</span>
        		</div>
        		<div class="item-more">
        			<img src="@/images/icon/IOS/content_icon_more_6@3x.png" />
        		</div>
        	</div>
        </div>
    </div>
</template>
<style scoped>
	.exit-mask{
		position:fixed;
		width:100%;
		height:100%;
		z-index:100;
	}
	.exit-mask .mask{
		postion:relative;
		width:100%;
		height:100%;
		background:#000;
		opacity:0.3;
	}
	.exit-wrap {
		position:absolute;
		display:inline-block;
		margin:auto;
		width:250px;
		min-height:80px;
		max-height:105px;
		background:#fff;
		left:0;
		right:0;
		top:0;
		bottom:0;
		border-radius:10px;
		box-sizing:border-box;
	}
	.exit-wrap .title{
		position:relative;
		text-align:center;
		font-size:18px;
		font-weight:bold;
		padding:15px;
		border-bottom:1px solid #a1a1a1;
	}
	.exit-wrap .cancel{
		border-right:1px solid #a1a1a1;
	}
	.exit-wrap .btn{
		position:relative;
		display:inline-block;
		width:47%;
		box-sizing:border-box;
		padding : 12px;
		color:rgb(57 ,182 ,254);
		text-align:center;
		font-size:18px;
	}
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
	.setting-list-wrap .list-item .item-more{
		position:relative;
		display:inline-block;
		float:right;
		line-height:30px;
		width:15px;
		height:15px;
		margin-right:10px;

	}
	.setting-list-wrap .list-item .item-name{
		position: relative;
	    display: inline-block;
	    font-size: 18px;
	    color: #a6a6a6;
	    height: 30px;
	    line-height: 30px;
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
	.setting-list-wrap .list-item .item-more img{
		position:relative;
		display:inline-block;
		width:100%;
		height:100%;
	}
</style>
<script>
//引入请求方法
import * as request from "./../../utils/request";
import * as config from "./../../config/app.config";

export default {
    name: 'userinfo',
    data () {
        return {
            isExit : false,
        }
    },
    methods:{

        //进入修改密码页面
        goToPwdSet(){
        	this.$router.push({path: '/pwdreset'});
        },
        //退出登录
        exitFn(){
        	this.isExit = true;
        },
        cancel(){
        	this.isExit = false;
        },
        
        confirm(){
        	localStorage.clear();
        	this.$router.push({path: '/login'});
        },
        //获取个人中心信息
        getUserInfo(){
            var self = this;
            var option = {
                data : {

                }
            }
            
            var res = request.post(config.default.ajax,"app","cd_individual_center_info_qry",option.data);
            
            res.then(function(res){
                

            },function(err,msg){
                self.$router.push({path: '/login'});
            });
        }

    },
    //页面加载之后调用的hook函数
    mounted(){
        this.getUserInfo();
    }



}
</script>