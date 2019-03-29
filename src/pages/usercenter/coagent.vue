<template>
	<div class="coagent-wrap">
		<div class="coagent-header">
			如何成为合伙经纪人
		</div>
		<div class="description">
			合伙经纪人，当普通经纪人展业业绩达到100万，自动升级为合伙经纪人。普通经纪人展业业绩包括本人直客贷款总额，和其所有推荐经纪人的直客贷款总额。
			成为合伙经纪人后，按照奖励规则，其所有推荐经纪人直客成功贷款后，享有管理收入。
			
		</div>
	</div>

</template>

<style scoped>
	.coagent-wrap{
		position:relative;
		padding:0px 15px;

	}
	.coagent-wrap .coagent-header{
		position:relative;
		color:#000;
		font-size:18px;
		font-weight:bold;
		padding : 15px;
		text-align:center;
	}
	.coagent-wrap .description{
		position:relative;
		color:#000;
		font-size:16px;
		color:#818181;
	}
</style>

<script>
	import * as config from "./../../config/app.config";
	export default {
		name: 'coagent',
	    data () {
	        return {
	            month : 0,
	            year : 0
	        }
	    },
	    methods:{
	    	//查询合伙经纪人
	    	queryCoagentInfo(){

	    	}
	    }
	}
</script>