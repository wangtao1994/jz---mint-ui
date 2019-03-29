<template>
	<div>
		<div class="search-mask" v-show="searching">
			<div class="search-box">
				<div class="search-wrap tleft mr50 pl10">
					<div class="search-center-wrap ">
						<img class="search-logo" src="@/images/icon/IOS/content_icon_search_2@3x.png" @click="queryIncomeDetail()"/>
						<div class="search-input " >
							<input placeholder="输入您要搜索的信息" v-model="condition" maxlength="16"/>
						</div>
					</div>
				</div>
				<span class="cancel" @click="hideSearch()">取消</span>
			</div>
			<div class="search-btn-wrap">
				<div class="search-btn" @click="search()">
					搜索
				</div>
			</div>
		</div>
		<div class="search-box">
			<div class="search-wrap">
				<div class="search-center-wrap" @click="searching=true">
					<img class="search-logo" src="@/images/icon/IOS/content_icon_search_2@3x.png" />
					<div class="search-input" >
						<input placeholder="输入您要搜索的信息" v-model="condition"/>
					</div>

				</div>
			</div>
		</div>
		<div class="search-result-box">
			<div class="result-header">
				<div class="header-item">
					<div class="result-item width20">
						订单号
					</div>
					<div class="result-item ">
						客户姓名
					</div>
					<div class="result-item width30">
						贷款额(万元)
					</div>
					<div class="result-item ">
						服务费订金(元)
					</div>
				</div>
				<div>
					<div class="result-item width20">
						产品名称
					</div>
					<div class="result-item ">
						身份证后4位
					</div>
					<div class="result-item width30">
						贷款佣金(元)
					</div>
					<div class="result-item ">
						订单日期
					</div>
				</div>
			</div>
			<div class="result-body">
				<div  class="no-result" v-show="incomelist.length<1">
					{{tips}}
				</div>
				<div class="res-item" v-for="item in incomelist">
					<div class="result-item width20">
						{{item.order_id }}
					</div>
					<div class="result-item ">
						{{item.full_name}}
					</div>
					<div class="result-item width30 ">
						{{item.actual_amount}}
					</div>
					<div class="result-item " v-bind:class="item.sfee_status=='未发'?'nopay':''">
						{{item.broker_service_fee}}({{item.sfee_status}})
					</div>
					<div class="result-item width20">
						{{item.product_name}}
					</div>
					<div class="result-item ">
						{{item.id_card}}
					</div>
					<div class="result-item width30" v-bind:class="item.comm_status=='未发'?'nopay':''">
						{{item.broker_com}}({{item.comm_status}})
					</div>
					<div class="result-item">
						{{item.create_time}}
					</div>
				</div>

			</div>
			<div class="search-wrap-bg" v-show="incomelist.length<1">
				<div class="img-mask"></div>
				<img class="search-logo" src="@/images/icon/IOS/361520667470_.pic.jpg" />
			</div>
		</div>
	</div>

</template>

<style scope>
	.search-wrap-bg{
		position:relative;
	}
	.search-wrap-bg .img-mask{
		position:absolute;
		width:100%;
		height:100%;
		z-index:100;
	}
	.search-wrap-bg img{
		position:relative;
		display:inline-block;
		width:100%;
	}
	.search-mask{
		position:fixed;
		width:100%;
		height:100%;
		z-index:100;
		background:#fff;
	}
	.tleft{
		text-align:left !important;
	}
	.wd250{
		width:250px !important;
	}
	.search-result-box{
		position:relative;

	}
	.search-btn-wrap{
		position:relative;
		margin-top:30px;
		text-align:center;
	}
	.search-btn-wrap .search-btn{
		position:relative;
		display:inline-block;
		background:rgb(57 ,182, 254);
		color:#fff;
		border-radius:5px;
		padding:10px;
		width:75%;
		font-size:18px;
	}
	.result-header{
		color:#000;
		font-size:0px;
		font-weight:bold;
		padding:10px 5px;
		background:rgba(20,20,20,0.05);
	}
	.no-result{
		color:#a1a1a1;
		font-size:16px;
		text-align:center;
		padding:20px;
	}
	.result-header .header-item{
		border-bottom : 1px solid #d1d1d1;
	}
	.result-item{
		position:relative;
		display:inline-block;
		font-size:13px;
		box-sizing : border-box;
		padding:5px 0px;
		text-align:left;
		overflow:hidden;
		width:25%;
	}
	.res-item{
		font-size:0px;
		padding:5px 5px;
		color:#a1a1a1;
		border-bottom : 1px solid #d1d1d1;
	}
	.res-item .nopay {
		color: #f3a71d;
	}
	.res-item .payed {
		color:rgb( 57 ,182, 254);
	}

	.width30{
		width:30% !important;
	}
	.width20{
		width:20% !important;
	}
	.mr50{
		margin-right:50px !important;
	}
	.pl10{
		padding-left: 10px !important;
	}
	/****************************************************/
	.search-box{
		position:relative;
		padding:15px 10px;

	}
	.search-box .search-wrap{
		position:relative;
		height:40px;
		background:rgba(20,20,20,0.05);
		border-radius:6px;
		text-align:center;
		line-height:55px;
	}
	.search-box  .cancel{
		position:absolute;
		color:rgb(57 ,182, 254);
		font-size:16px;
		right:15px;
		top:25px;
	}
	.search-box .search-wrap .search-center-wrap{
		position:relative;
		display:inline-block;
		width:100%;

	}
	.search-box .search-wrap .search-center-wrap .search-logo{
		position:relative;
		display:inline-block;
		width:25px;
		height:25px;
	}
	.search-box .search-wrap .search-center-wrap .search-input{
		position:relative;
		display:inline-block;
		height:25px;
		width:80%;
		padding-left:5px;
	}

	.search-box .search-wrap .search-center-wrap .search-input input{
		position:absolute;
		display:inline-block;
		height:25px;
		width:100%;
		box-sizing:border-box;
		left:0;
		border:none;
		background:transparent;
		font-size:16px;
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
	@media (max-width: 360px) {
		.result-item{
			font-size:12px;
		}
	}
</style>

<script>
	//引入请求方法
	import * as request from "./../../utils/request";
	import { Toast } from 'mint-ui';
	import * as config from "./../../config/app.config";
	export default {
		name: 'manageincomedetail',
	    data () {
	        return {
	            condition:"",
	            searching:false,
	            incomelist : [],//收入列表
	            tips : "没有搜索结果"
	        }
	    },
	    methods:{
	    	//查询收入详情
	    	queryIncomeDetail(){
	    		var self = this;
	    		var option = {
	    			parameters : self.condition||""
	    		};
	    		self.tips = "正在查询";
	    		var res = request.post(config.default.ajax,"app","cd_my_income_detail",option);

	            res.then(function(res){
	            	for(var i in res){
	                	try{
	                		var create_time = res[i]["create_time"]+"";

		                	if(create_time.length>10){
		                		create_time = create_time.slice(0,10);
		                	}
		                	res[i]["create_time"] = create_time;

	                	}catch(e){
	                		console.error(e);
	                	}

	                }
	                self.incomelist = res;
	                if(res.length>1){
	                	self.tips = "";
	                }else{
	                	self.tips = "没有搜索结果";
	                }
	            },function(err){
	                Toast(err||"获取失败");
	                self.tips = "没有搜索结果";
	            });
	    	},
	    	//时间戳转时间
	    	timestampToTime(timestamp){
		        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		        Y = date.getFullYear() + '-';
		        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		        D = date.getDate() + ' ';
		        h = date.getHours() + ':';
		        m = date.getMinutes() + ':';
		        s = date.getSeconds();
		        return Y+M+D+h+m+s;
		    },
		    hideSearch(){
		    	this.searching = false;
		    	this.condition = "";
		    },
		    //搜索
		    search(){
		    	this.searching = false;

		    	this.queryIncomeDetail();
		    },
	    },
	    //页面加载之后调用的hook函数
	    mounted(){
	        this.search();
	    }
	}
</script>
