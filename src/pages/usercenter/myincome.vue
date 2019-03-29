<template>
	<div>
		<div class="title-wrap">
			<span class="wall">

			</span>
			<span class="title">
				我的收入
			</span>
		</div>
		<div class="income-nav-wrap">
			<div class="navs">
				<div class="nav " v-bind:class="navActive==1?'active':''" @click="queryDetail(1)">
					我的收入
				</div>
				<div class="nav centernav" v-bind:class="navActive==2?'active':''" @click="queryDetail(2)">
					直客收入
				</div>
				<div class="nav " v-bind:class="navActive==3?'active':''" @click="queryDetail(3)">
					管理收入
				</div>
			</div>
		</div>
		<div class="info-list-wrap" v-show="navActive==1">
			<div class="info-list">
			
				<div class="four info-name">
					总收入
				</div>
				<div class="three info-important">
					{{myIncome.total}}(元)
				</div>
				<div class="three">

				</div>
			</div>
			<div class="info-list">
			
				<div class="four info-name">
					已发放收入
				</div>
				<div class="three info-light">
					{{myIncome.payed}}(元)
				</div>
				<div class="three info-warnning">
					
				</div>
			</div>
			<div class="info-list">
			
				<div class="four info-name">
					待发放收入
				</div>
				<div class="three info-light">
					{{myIncome.unpayed}}(元)
				</div>
				<div class="three info-warnning" @click="showDescFn()">
					收入说明
					<img class="open" src="@/images/icon/IOS/content_icon_more_5@3x.png" v-show="!showDesc"/>
					<img class="open" src="@/images/icon/IOS/content_icon_more_4@3x.png" v-show="showDesc"/>
				</div>
			</div>
			
		</div>
		<div class="info-list-wrap" v-show="navActive==2">
			<div class="info-list">
			
				<div class="four info-name">
					贷款佣金总额
				</div>
				<div class="three info-important">
					{{myAgent.pession}}(元)
				</div>
				<div class="three">

				</div>
			</div>
			<div class="info-list">
			
				<div class="four info-name">
					服务费订金总额
				</div>
				<div class="three info-light">
					{{myAgent.service}}(元)
				</div>
				<div class="three info-warnning">
					
				</div>
			</div>
			<div class="info-list">
			
				<div class="four info-name">
					客户数
				</div>
				<div class="three info-light">
					{{myAgent.client}}(位)
				</div>
				<div class="three info-warnning" @click="showDescFn()">
					收入明细
					<img class="open" src="@/images/icon/IOS/content_icon_more_5@3x.png" v-show="!showDesc"/>
					<img class="open" src="@/images/icon/IOS/content_icon_more_4@3x.png" v-show="showDesc"/>
				</div>
			</div>
			
		</div>
		<div class="info-list-wrap" v-show="navActive==3">
			<div class="info-list">
			
				<div class="four info-name">
					贷款管理佣金总额
				</div>
				<div class="three info-important">
					{{myManagement.pession}}(元)
				</div>
				<div class="three">

				</div>
			</div>
			<div class="info-list">
			
				<div class="four info-name">
					服务管理费总额
				</div>
				<div class="three info-light">
					{{myManagement.service}}(元)
				</div>
				<div class="three info-warnning">
					
				</div>
			</div>
			<div class="info-list">
			
				<div class="four info-name">
					经纪人数
				</div>
				<div class="three info-light">
					{{myManagement.client}}(位)
				</div>
				<!--<div class="three info-warnning" @click="showDescFn()" v-show="dh==3">-->
				<div class="three info-warnning" @click="showDescFn()" >
					收入明细
					<img class="open" src="@/images/icon/IOS/content_icon_more_5@3x.png" v-show="!showDesc"/>
					<img class="open" src="@/images/icon/IOS/content_icon_more_4@3x.png" v-show="showDesc"/>
				</div>
			</div>
			
		</div>
		
		
		<div class="income-intro" v-show="showDesc&&navActive==1">
			收入相关名词定义：</br>

				&nbsp&nbsp&nbsp&nbsp1）总收入：等于已发放收入和未发放收入之和，也等于直客收入和管理收入之和。</br>
				&nbsp&nbsp&nbsp&nbsp2）已发放收入：已经通过转账或其它方式支付给经纪人的收入。</br>
				&nbsp&nbsp&nbsp&nbsp3）待发放收入：已确定但未支付给经纪人的收入。</br>
				&nbsp&nbsp&nbsp&nbsp4）直客收入：由本人发展的客户成功申请贷款带来的收入，包括贷款佣金和服务费订金。</br>
				&nbsp&nbsp&nbsp&nbsp5）贷款佣金：经纪人的客户成功申请贷款后，平台返给经纪人的佣金。</br>
				&nbsp&nbsp&nbsp&nbsp6）服务费订金：经纪人的客户成功申请贷款，向客户收取的服务费订金按照平台设置的比例返给经纪人的费用。</br>
				&nbsp&nbsp&nbsp&nbsp7）管理收入条件：本人等级为合伙经纪人。</br>
				&nbsp&nbsp&nbsp&nbsp8）管理收入：满足管理收入条件，邀请经纪人的客户成功申请贷款带来的收入，包括贷款管理佣金和服务管理费。</br>
				&nbsp&nbsp&nbsp&nbsp9）贷款管理佣金：满足管理收入的条件，邀请经纪人的客户成功申请贷款后，平台额外奖励给合伙经纪人佣金。</br>
				&nbsp&nbsp&nbsp&nbsp10）服务管理费：满足管理收入的条件，邀请经纪人的客户成功申请贷款后，向客户收取的服务费订金按照平台设置的比例返给合伙经纪人的费用。</br>
		</div>
		<div class="income-intro" v-show="showDesc&&navActive==3">
			注：只有合伙经纪人才有此项收入，如何升级合伙经纪人，详见【个人中心】-【合伙经纪人】）
		</div>
	</div>

</template>

<style scope>
	.info-list-wrap{
		border-bottom : 1px solid #f1f1f1;
	}
	.info-list-wrap .info-list{
		position :relative;
		padding : 10px 15px;	
		font-size:0px;
	}
	.info-list-wrap .info-list .three{
		display:inline-block;
		width:30%;
		font-size:14px;
		box-sizing:border-box;
		padding-left:20px;
	}
	.info-list-wrap .info-list .four{
		display:inline-block;
		width:40%;
		font-size:16px;
		box-sizing:border-box;

	}
	.info-list-wrap .info-list .info-name{
		font-size:14px;
		font-weight:bold;
		color:#000;
	}
	.info-list-wrap .info-list .info-important{
		color:rgb( 57 ,182, 254);
	}
	.info-list-wrap .info-list .info-light{
		color:#a1a1a1;
	}
	.info-list-wrap .info-list .info-warnning{
		color:rgb( 255 ,166, 28);
		font-size:14px;
		line-height:14px;
		text-align:right;
	}
	.open{
		position : relative;
		display:inline-block;
		width:14px;
		height:14px;
		vertical-align:middle;

	}
	.income-intro{
		position : relative;
		padding:15px;
		font-size:12px;
		color:#818181;
	}
	.title-wrap{
		position : relative;
		padding : 15px 15px;
		/*border-bottom : 1px solid #f1f1f1;*/
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

	.income-nav-wrap{
		position:relative;
		padding:15px;
		
	}
	.income-nav-wrap .navs{
		position:relative;
		border-radius:6px;
		font-size:0px;
		overflow:hidden;
		border: 1px solid rgb(57 ,182, 254);
	}
	.income-nav-wrap .navs .centernav{
		position:relative;
		display:inline-block;
		width:34% !important;
		border-left: 1px solid rgb(57 ,182, 254) !important;
		border-right: 1px solid rgb(57 ,182, 254) !important;

	}
	.income-nav-wrap .navs .nav{
		position:relative;
		display:inline-block;
		padding: 10px 0px;
		width:33%;
		font-size:16px;
		color:rgb(57 ,182, 254);
		box-sizing:border-box;
		text-align:center;
		
		backgound:#fff;
	}
	.income-nav-wrap .navs .active{
		position:relative;
		display:inline-block;
		color:#fff;
		background:rgb(57 ,182, 254);

	}
	@media (max-width: 360px) {
		.open{
			height:12px;
			width:12px;
		}
		.info-list-wrap .info-list .info-warnning{
			padding-left:0px;
		}
	}
</style>

<script>
//引入请求方法
import * as request from "./../../utils/request";
import { Toast } from 'mint-ui';
import * as config from "./../../config/app.config";

export default {
	name: 'myincome',
    data () {
        return {
            navActive : 1,//默认选中我的收入,1为我的收入，2为直客收入，3为管理收入
            showDesc : false,//是否显示描述
            myIncome:{
            	total:0,
            	payed :0,
            	unpayed : 0
            },
            myAgent:{
            	pession: 0,
            	service :0,
            	client : 0
            },
            myManagement:{
            	pession:0,
            	service :0,
            	client : 0
            },
            dh : 0,
        }
    },
    methods:{
    	//查询具体想起
    	queryDetail(index){
    		index = index || 1;
    		this.navActive = index;
    		this.showDesc = false;
    		//this.getManageDetail();
    		//this.getZhikeDetail();
    		this.getDetailInfo();
    	},
    	getZhikeDetail(){
    		var self = this;
    		var option = {

    		};

    		var res = request.post(config.default.ajax,"app","cd_my_income_detail",option);

            res.then(function(res){
                self.myAgent = res;
            },function(err){
                Toast(err||"获取失败");
            });
    	},
    	getManageDetail(){
    		var self = this;
    		var option = {

    		};

    		var res = request.post(config.default.ajax,"app","cd_my_income_man_fee",option);
    		
            res.then(function(res){
                self.myManagement = res;
            },function(err){
                Toast(err||"获取失败");
            });
    	},
    	//获取信息
    	getDetailInfo(){
    		
    		var self = this;
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
                
                var myAgent = {
                	pession: res.total_comm||0,
	            	service :res.total_service_fee||0,
	            	client : res.total_consumers||0
                }

                self.myAgent = myAgent;

                var myManagement = {
                	pession: res.total_man_comm||0,
	            	service :res.total_man_service_fee||0,
	            	client : res.total_brokers||0
                }
                self.myManagement = myManagement;
                self.dh = res.dh;

            },function(err){
                Toast(err||"获取失败");
            });
    	},
    	//是否显示描述
    	showDescFn(){
    		if(this.navActive==1){
    			this.showDesc = !this.showDesc;
    		}
    		if(this.navActive==2){
    			this.$router.push({path: '/incomedetail'});
    		}
    		if(this.navActive==3){
    			if(this.dh!=3){
    				//Toast("非合伙经纪人不能查看");
    				this.showDesc = !this.showDesc;
    				return;
    			}
    			this.$router.push({path: '/manageincomedetail'});
    		}

    	}

    },
    //页面加载之后调用的hook函数
    mounted(){
        this.queryDetail();
    }
}
</script>