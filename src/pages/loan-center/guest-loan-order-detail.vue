<template>
  <div class="container">
    <div class="header-block f-m">
      <xd-line-ico lineText="服务费订金订单信息"/>
    </div>
    <div class="fee-wrapper">
      <div class="property-block">
        <div class="property-item">
          <span>订单号</span>
          <span class="info">{{loanOrderInfo.order_id}}</span>
        </div>
        <div class="property-item">
          <span>产品名称</span>
          <span class="info">{{loanOrderInfo.product_name}}</span>
        </div>
        <div class="property-item">
          <span>申请额度</span>
          <span class="info">{{loanOrderInfo.app_amount}}（万元）</span>
        </div>
        <div class="property-item">
          <span>服务费订金比例</span>
          <span class="info">{{loanOrderInfo.service_fee_rate}} %</span>
        </div>
        <div class="property-item">
          <span>服务费订金金额</span>
          <span class="f-s" style="font-size: 20px;color: rgb(255, 166,28)">{{ loanOrderInfo.fee_amount }}元</span>
        </div>
        <div class="property-item">
          <div class="note f-l">备注：1）服务费订金：是客户与经纪人确定贷款服务意向时，客户预先支付的订金，是属于服务费一部分。在贷款成功放款后，客户需要支付剩余的服务费（剩余服务费=服务费-服务费订金），剩余服务费采用其它方式支付，包括不限于：现金、转账、刷卡等方式，具体参考相关协议。2）如贷款未成功，服务费订金将全额原路退回给客户帐号；如放款后，服务费订金金额大于实际支付服务费金额，超过部分将原路退回到客户的帐号。</div>
        </div>
      </div>
      <div class="property-block">
        <div class="property-item">
          <span>客户姓名</span>
          <span class="info">{{loanOrderInfo.consumer_name}}</span>
        </div>
        <div class="property-item">
          <span>身份证后4位</span>
          <span class="info">{{loanOrderInfo.id_card}}</span>
        </div>
        <div class="property-item">
          <span>经纪人</span>
          <span class="info">{{loanOrderInfo.broker_name}}</span>
        </div>
        <div class="property-item">
          <span>手机号</span>
          <span class="info">{{loanOrderInfo.mobile}}</span>
        </div>

      </div>
      <div class="property-block" style="margin-top: 10px;">
        <div class="property-item" style="font-size: 14px;color:#919191;">
          <input type="checkbox" v-model="agree" />
          我已阅读并同意<router-link to="/loan/service-fee-agreement"><font class="action">《金证通贷款服务费订金支付协议》</font></router-link>
        </div>
      </div>
      <div class="property-block" style="padding: 60px 0;">
        <mt-button :disabled="loanOrderInfo.order_status_id != 0 || agree != 1 || submit_ing" @click="prePay" class="submit-btn" style="display: block" type="primary">{{ loanOrderInfo.order_status_id != 0 ? '已支付' : '支付'}}</mt-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.property-item{
  padding: 6px 0;
}
.property-item>span{
  width: 40%;
  display: inline-block;
}
.property-item .info{
  color: #999;
  width: 58%;
}
.property-item .action{
  color: rgb(57, 182, 254);
}
.property-item .note{
  font-size: 10px;
  color: #919191;
}
.property-block{
  border-bottom: 1px solid #c2c2c2;
  padding: 20px 15px;
  font-size: 13px;
  background-color: #fff;
}

</style>
<script>
import XDLineIco from '@/components/line-ico.vue';
import { mapGetters } from 'vuex';
import { Button, Toast } from 'mint-ui';
import { get } from '@/utils/request.js';
import { getUrlParam } from '@/utils/utils.js';

  export default{
    data(){
      return{
        agree: 1,
        wxPostData: {},
        submit_ing: false,
      }
    },
    components: {
      'xd-line-ico': XDLineIco,
      'mt-button': Button,
    },
    mounted(){
      var order_id = this.$route.params.order_id;
      this.$store.dispatch('getLoanOrderInfo', { order_id})
    },
    computed: {
      ...mapGetters({
        loanOrderInfo:'loanOrderInfo',
        wxUserInfo: 'wxUserInfo'
      })
    },
    methods: {
      onBridgeReady(){
        var self = this
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', this.wxPostData,
            function(res){
                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                  self.$router.push('/loan/pay-success/' + self.loanOrderInfo.fee_amount);
                }else{
                  Toast({
                    message: '支付失败',
                    duration: 2000
                  })
                }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            }
        );
      },
      prePay(){
          var openid = this.wxUserInfo.openid || localStorage.getItem("openid");
          if(!!openid){
              var out_trade_no = this.loanOrderInfo.order_id.toString();
              var total_fee = this.loanOrderInfo.fee_amount;
              var self = this;
              this.submit_ing = true;
              this.$store.dispatch('wxPrePay', { openid, out_trade_no, total_fee })
                .done( data => {
                  self.submit_ing = false;
                  self.wxPostData = data;
                  if (typeof WeixinJSBridge == "undefined"){
                     if( document.addEventListener ){
                         document.addEventListener('WeixinJSBridgeReady', self.onBridgeReady, false);
                     }else if (document.attachEvent){
                         document.attachEvent('WeixinJSBridgeReady', self.onBridgeReady);
                         document.attachEvent('onWeixinJSBridgeReady', self.onBridgeReady);
                     }
                  }else{
                     self.onBridgeReady();
                  }

                })
                .fail( msg => {
                  self.submit_ing = false;
                  Toast({
                    message: msg,
                    duration: 2000
                  })
                })
          }else{
            Toast({
              message: '微信用户未授权',
              duration: 2000
            })
          }
      }

    },
    beforeMount(){
      try{
        var order_id = this.$route.params.order_id;
        if(!this.wxUserInfo.openid && !localStorage.getItem('openid')){
            var code = getUrlParam('code');
            if(code){
              this.$store.dispatch('getWxUserOpenid', { code })
                .done( data => {
                  localStorage.setItem('openid', data.openid)
                })
                .fail( msg => {
                  Toast({
                    message: msg,
                    duration: 2000
                  })
                })
            }else{
              //调微信授权
              var  authorBackUrl = location.protocol + '//' + window.location.host + '/loan/guest-loan-order-detail/' + order_id;
              this.$store.dispatch('wxAuthorize',  { backUri : authorBackUrl })
                .done( data => {
                  var backUri = decodeURI(data.backUri);
                  window.location.href = backUri;
                })
                .fail( msg => {
                  Toast({
                    message: msg,
                    duration: 2000
                  })
                })
            }
        }
      }catch(e){
        Toast({
          message: e,
          duration: 2000
        });
      }
    }

  }
</script>
