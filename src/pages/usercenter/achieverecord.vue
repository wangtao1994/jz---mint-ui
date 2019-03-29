<template>
	<div>
		<div class="title-wrap ">
			<div class="left title">
				月份
			</div>
			<div class="right title">
				贷款额(万元)
			</div>
		</div>
		<div class="info-wrap" v-for="item in recordlist">
			<div>
				<div class="left year">
					{{item.year}}年
				</div>
				<div class="right">
					
				</div>
			</div>
			<div v-if="item.month.length>0">
				<div v-for="mitem in item.month">
					<div class="left detail" >
						{{mitem.month}}月
					</div>
					<div class="right detail">
						{{mitem.loan}}
					</div>
				</div>
				
			</div>
		</div>


	</div>

</template>

<style scoped>
	.title-wrap{
		padding : 30px;
		padding-bottom : 10px;
		font-size : 0px;
		border-bottom : 1px solid #f1f1f1;
	}
	.title{
		font-size : 18px;
		color:#000;
		font-weight:bold;
	}
	.year{
		font-size : 14px;
		color:rgb( 57 ,182, 254);
	}
	.left{
		position : relative;
		display : inline-block;
		width : 50%;
		text-align:left;
		padding-left:30px;
		box-sizing : border-box;
	}
	.right{
		position : relative;
		display : inline-block;
		width : 50%;
		text-align:left;
		padding-left:20px;
		box-sizing : border-box;
	}
	.info-wrap{
		padding : 10px 30px;
		font-size : 0px;
		border-bottom : 1px solid #f1f1f1;
	}
	.detail{
		font-size : 14px;
		color:#d1d1d1;
	}

</style>

<script>
import * as request from "./../../utils/request";
import { Toast } from 'mint-ui';
import * as config from "./../../config/app.config";
	export default {
		name: 'achievementrecord',
	    data () {
	        return {
	            recordlist : []
	        }
	    },
	    methods:{
	    	//查询业绩记录
	    	queryAchievementRecord(){
	    		var record = this.recordlist||[];
	    		var option = {
	    			
	    		}
	    		
	    		var self = this;
	    		var res = request.post(config.default.ajax,"app","cd_my_performance_his",option);

	    		
	            res.then(function(res){
	            	

	                var temp = [];
	                for(var i in res){
	                	var item = res[i];
	                	var year = item.years;
	                	if(year){
	                		var index = 0;
		                	for(var j in record){
		                		var ritem = record[j];
		                		if(year==ritem.year){
		                			index++;
		                			var obj = {
	                					month : item.months,
	                					loan : item.total_amount
	                				}
	                				ritem.month.push(obj);
	                			}

	                			
		                	}
		                	if(index<1){
		                		var obj = {
		                			year : item.years,
		                			month : [{month : item.months,loan : item.total_amount}],
		                		}
		                		record.push(obj);
		                	}
	                	}
	                }
	                console.log("record",record);
	                self.recordlist = record;
	            },function(err){
	                Toast(err||"查询失败");
	            });
	    	}
	    },
	    //页面加载之后调用的hook函数
	    mounted(){
	    	
	        this.queryAchievementRecord();
	    }
	}
</script>