<template>
	<div class="detail_page">
		<div class="add-header">
            <line-ico class="line-ico" :line-text="lineText"></line-ico>
        </div>
        <ul>
            <li>
                <span class="detail-frist">订单号</span>
                <span class="detail-second">{{ newcommitdetail.order_id }}</span>
            </li>
            <li>
                <span class="detail-frist">产品名</span>
                <span class="detail-second">{{ newcommitdetail.product_name }}</span>
            </li>
            <li>
                <span class="detail-frist">客户姓名</span>
                <span class="detail-second">{{ newcommitdetail.full_name }}</span>
            </li>
            <li>
                <span class="detail-frist">手机号</span>
                <span class="detail-second">{{ newcommitdetail.id_card }}</span>
            </li>
            <li>
                <span class="detail-frist">贷款额（万元）</span>
                <span class="detail-second">{{ newcommitdetail.actual_amount }}</span>
            </li>
            <li>
                <span class="detail-frist">贷款佣金（元）</span>
                <span class="detail-second">{{ newcommitdetail.broker_com }}</span>
            </li>
            <li>
                <span class="detail-frist">发放状态</span>
                <span class="detail-second">{{ newcommitdetail.comm_status }}</span>
            </li>
             <li>
                <span class="detail-frist">订单日期</span>
                <span class="detail-second">{{ newcommitdetail.create_time }}</span>
            </li>
        </ul>
	</div>
</template>
<style scoped>
.detail_page{position: absolute;top: 0;bottom: 0;right: 0;left: 0;background: #FFFFFF;}
.detail_page .add-header {height: 4em;line-height: 4em;background: white;display: flex;align-items: center;font-weight: 600;}
.detail_page .line-ico {margin-left: 15px;}
.detail_page .detail-frist {width: 40%;}
.detail_page .detail-second { width: 50%;color: #999;}
.detail_page {height: 100vh;background: #FFFFFF;}
.detail_page .line-ico {margin-left: 15px;}
.detail_page ul {background: white; margin: 0;overflow: hidden}
.detail_page ul li {height: 3em;padding: 0 4%;font-size: 1em;display: flex;align-items: center; position: relative;}
.detail_page ul li span:first-child{font-weight: 600;}
.detail_page ul li span {display: inline-block;float: left;word-wrap: break-word}
.detail_page .detail-second {width: 50%;color: #999;font-size: .9em;}

</style>
<script>
import {Cell} from 'mint-ui';
import lineIco from '@/components/line-ico.vue'
import {mapGetters} from 'vuex'
export default {
    components: {
      'mt-cell': Cell,
      'line-ico': lineIco,
    },
    computed: {
      ...mapGetters({
      	//["newcommitdetail"]
        newcommitdetail:'newcommitdetail'
      })
    },
    data() {
      return {
        lineText: '佣金明细详情',
        detailData: {},
        detailColumns:[]
      }
    },
    created() {
			document.title = "佣金明细详情"
		},
    mounted(){
    	debugger;
    	//获取URLid
      var order_id = this.$route.params.id;
      order_id = parseInt(order_id);
      debugger;
       this.$store.dispatch('newcommitdetail', { order_id })
    },


}





</script>
