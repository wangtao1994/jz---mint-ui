<template>
	<div class="commission">
		<div class="comm_section">
			<div class="title">
				<img src="../../images/icon/IOS/content_icon_smal_icon_2@3x.png"/>
				我的佣金
			</div>
			<div class="money_list">
				<p>
					<span>总佣金</span>
					<span class="money_number color_list">{{myIncome.total}}(元)</span>
				</p>
				<p>
					<span>已发放佣金</span>
					<span class="money_number">{{myIncome.payed}}(元)</span>
				</p>
				<p>
					<span>未发放佣金</span>
					<span class="money_number">{{myIncome.unpayed}}(元)</span>
				</p>
			</div>

			<div class="linex"></div>
			<div class="yon_money" @click="getlist">
				佣金明细
				<img src="../../images/icon/IOS/content_icon_more_6@3x.png"/>
			</div>

		</div>


	</div>


</template>

<style scoped>
	.commission{width: 100%;height: 100%;position: absolute;left: 0;top: 0;right: 0;bottom: 0;background: #FFFFFF;}
	.title{width: 100%;padding: 1em 4%; box-sizing: border-box;display: flex;align-items: center;border-bottom: 1px solid #CCCCCC;}
	.title>img{width: 2em;margin-right: .5em;}

	.money_list{width: 100%;padding: 0em 0%;box-sizing: border-box;position: relative;}
	.money_list>p{padding: 1em 4%;border-bottom: 1px solid #CCCCCC;}
	.money_list>p:last-child{border: none;}
	.money_number{position: absolute;right: 25%;color: #CCCCCC;}
	.color_list{color: #F5A623;}
	.linex{width: 100%;height: .5em;background: #f7f7f7;}
	.yon_money{position: relative;width: 100%;padding: 0 4%;box-sizing: border-box;display: flex;align-items: center;justify-content: space-between;
	height: 4em;border-bottom: 1px solid #CCCCCC;
	}
	.yon_money>img{width: 1.2em;border: none;}
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
    data () {
	    return {
	        userName : "",
	        phoneNumber : "",
	        myIncome:{
            	total:0,
            	payed :0,
            	unpayed : 0
            },
	     }
	},
	methods:{
		getlist(){
			 this.$router.push({path: '/commission_list'});
		},		
		getUserInfo(){					
			var self=this;
			var option = {
	
	    	};
	    	var res = request.post(config.default.ajax,"app","cd_individual_center_info_qry",option);
	    	res.then(function(res){
	            	var total_income = res.total_income || 0;
	            	var total_issued = res.total_issued || 0;
	            	var unpayed = total_income - total_issued;
	            	unpayed = unpayed.toFixed(2);
	            	var myIncome = {
	            		total:total_income,
		            	payed :total_issued,
		            	unpayed : unpayed
	            	}
	                self.myIncome = myIncome;
	            },function(err){
	                Toast(err||"获取失败");
	        });
		},

	},
	mounted(){
		//先判断是否有登录
        var userinfo = {};
        try{
            userinfo = JSON.parse(localStorage.userinfo||"{}")||{};
        }catch(e){
            
        }
        if(userinfo.token){
            this.getUserInfo();
        }else{
           Toast("未登入，请登入查看");
        }
        localStorage.setItem('typeIndex' , 0)	
		
	},
	created() {
		document.title = "我的佣金"
	},		
}
</script>
