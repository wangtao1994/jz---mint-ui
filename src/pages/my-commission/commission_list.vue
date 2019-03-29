<template>
	<div class="page_list">
		<commission-Table :columns="commissionColumns" :detailelist="incomelist" v-on:goDetail="goDetail"></commission-Table>
	</div>
</template>

<style scoped>
	.page_list{width: 100%;height: 100%;position: absolute;left: 0;top: 0;right: 0;bottom: 0;background: #FFFFFF;}
	.list_title{display: flex;justify-content: center;align-items: center;width: 100%;height: 4em;background: #f7f7f7;}
	.list_title>span{width: 20%;text-align: center;display: inline-block;font-size: .9em;font-weight: 600;}

	.list_detail{width: 100%;}
	.list_detail ul{display: flex;justify-content: center;}
	.list_detail ul li{color: #CCCCCC;width: 100%;display: flex;justify-content: space-around;align-items: center; border-bottom: 1px solid #CCCCCC;padding: 1em 0;}
	.list_detail ul li>span{display: inline-block;width: 20%;text-align: center;}
</style>

<script>
	//引入请求方法
import * as request from "./../../utils/request";
import { Toast } from 'mint-ui';
import {Button, Cell, Picker} from 'mint-ui';
import lineIco from '@/components/line-ico.vue';
import * as config from "./../../config/app.config";
import commissionTable from '@/components/commission-table.vue';
import md5 from 'js-md5';


const commissionColumns = [{
	title: '订单号',
	dataIndex: 'full_number',
  }, {
    title: '客户姓名',
	dataIndex: 'full_name'
  }, {
    title: '贷款佣金（元）',
	dataIndex: 'commiss_money'
  }, {
    title: '发放状态',
	dataIndex: 'created_date'
  }, {
    title: '订单日期',
	dataIndex: 'list_time'
}]

export default {
	components: {
      'mt-button': Button,
      'line-ico': lineIco,
      'commission-Table':commissionTable,
    },

	name:"commission_list",
	data(){
		return{
			commissionColumns:commissionColumns,
			incomelist:[],
		}

	},

	methods:{

		goDetail(item){
      		this.$router.push('/commission_detail/' + item.order_id)
    	},

	},

	mounted(){
		var self = this;
		var option = {
	    	parameters: ""
	    };

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
        },function(err){
            // Toast(err||"获取失败");

        });
	},
	created() {
		document.title = "佣金明细列表"
	}





}

</script>
