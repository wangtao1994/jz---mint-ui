<template>
	<div>
		<div class="title-wrap">
			<span class="wall">

			</span>
			<span class="title">
				我的业绩
			</span>
		</div>
		<div class="load-list">
			<div class="list-item">
				<span>
					{{month}}月贷款总额(万元)
				</span>
				<div class="load-amounts">
					{{monthamount}}
				</div>
			</div>
			<div class="list-item">
				<span>
					{{year}}年贷款总额(万元)
				</span>
				<div class="load-amounts">
					{{yearamount}}
				</div>
			</div>
		</div>
	</div>

</template>

<style scoped>
	.title-wrap{
		position : relative;
		padding : 15px 15px;
		border-bottom : 1px solid #f1f1f1;
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
	
	.load-list .list-item{
		position:relative;
		text-align : center;
		padding : 20px;
		font-size : 18px;
		color : #a1a1a1;
		border-bottom : 1px solid #f1f1f1;
	}
	.load-amounts{
		margin-top : 2px;
		font-size : 24px;
		color :rgb( 57 ,182, 254);
	}
</style>

<script>
	import * as request from "./../../utils/request";
	import { Toast } from 'mint-ui';
	import * as config from "./../../config/app.config";
	
	export default {
		name: 'achievement',
	    data () {
	        return {
	        	monthamount : 0,
	        	yearamount : 0,
	            year : "",
	            month : "",
	        }
	    },
	    methods:{
	    	//查询业绩
	    	queryAchievement(){
	    		var self = this;
	            var option = {
	                data : {
	                	parameters : ""
	                }
	            }
	            
	            
	            var res = request.post(config.default.ajax,"app","cd_individual_center_info_qry",option.data);
	            
	            res.then(function(res){
	                self.monthamount = res.month_amount;
	                self.yearamount = res.year_amount;
	            },function(err,msg){
	                Toast(err||"获取信息失败");
	            });
	    	}
	    },
	    //页面加载之后调用的hook函数
	    mounted(){
	    	var myDate = new Date();//获取系统当前时间
            //当前年份
            this.year = myDate.getFullYear();
            //当前月份
            this.month =  myDate.getMonth() + 1;

	        this.queryAchievement();
	    }
	}
</script>