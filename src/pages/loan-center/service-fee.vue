<template>
  <div class="container">
    <div class="header-block f-m" style="margin-bottom: 0px;">
      <xd-line-ico lineText="代收服务费订金订单信息"/>
    </div>
    <div class="fee-wrapper">
      <div class="property-block" style="padding-top: 5px;">
        <div class="property-item">
          <span>订单号</span>
          <span class="info">{{guestInfo.order_id}}</span>
        </div>
        <div class="property-item">
          <span>产品名称</span>
          <span class="info">{{guestInfo.product_name}}</span>
        </div>
        <div class="property-item">
          <span>申请额度</span>
          <span class="info">{{guestInfo.appl_amount}}（万元）</span>
        </div>
      </div>
      <div class="property-block">
        <div class="property-item">
          <span>客户姓名</span>
          <span class="info">{{guestInfo.cname}}</span>
        </div>
        <div class="property-item">
          <span>身份证后4位</span>
          <span class="info">{{guestInfo.id_card}}</span>
        </div>
        <div class="property-item">
          <span>经纪人</span>
          <span class="info">{{guestInfo.agent_name}}</span>
        </div>
        <div class="property-item">
          <span>手机号</span>
          <span class="info">{{guestInfo.agent_mobile}}</span>
        </div>
      </div>
      <div class="property-block" style="margin-top: 10px;">
        <div class="property-item">
          <span>服务费订金比例</span>
          <span class="info" style="width: 38%;">{{ guestInfo.feeRate }}%<span v-if="editable">（点击可修改）</span></span>
          <span @click="updateFeeRate" class="action" style="width: 10%;" v-if="editable">修改</span>
        </div>
        <div class="property-item">
          <span>服务费订金金额</span>
          <span class="f-s" style="font-size: 20px;color: rgb(255, 166,28)">{{ guestInfo.service_fee }}元</span>
        </div>
        <div class="property-item">
          <span>服务费订金状态</span>
          <span class="info" v-if="guestInfo.service_fee == 0">
            <!-- <img src="@/images/icon/IOS/content_icon_finished.png" style="vertical-align:middle;" /> -->
            已支付
          </span>
          <span class="info" v-else style="width: 68%;">
          <!-- <img src="@/images/icon/IOS/content_icon_not_finished@3x.png" style="vertical-align:middle;width: 13px;height:13px;" /> -->
           {{guestInfo.order_status_name}}<span  @click="refreshOrderStatus"  v-show="!editable" style="font-size: 8px;margin-left: 10px;"><img src="@/images/icon/IOS/content_icon_refresh@3x.png" style="vertical-align: middle;width:13px;height: 13px;"/>点击刷新</span>
          </span>
        </div>
        <div class="property-item">
          <span>协议</span>
          <span class="info action" ><router-link to="/loan/service-fee-agreement">《金证通贷款服务费订金支付协议》</router-link></span>
        </div>
        <div class="property-item">
          <div class="note f-l">备注：1）服务费订金：是客户与经纪人确定贷款服务意向时，客户预先支付的订金，是属于服务费一部分。在贷款成功放款后，客户需要支付剩余的服务费（剩余服务费=服务费-服务费订金），剩余服务费采用其它方式支付，包括不限于：现金、转账、刷卡等方式，具体参考相关协议。2）如贷款未成功，服务费订金将全额原路退回给客户帐号；如放款后，服务费订金金额大于实际支付服务费金额，超过部分将原路退回到客户的帐号。</div>
        </div>
        <div v-if="guestInfo.feeRate == 0" class="property-item">
          <div class="note f-l" style="color: rgb(255, 166, 28)">
            您的服务费订金比例为0，不用推送。如要向客户收取服务费订金，请修改服务费订金比例，再点击下方按钮，推送给客户。
          </div>
        </div>
        <div class="property-item" style="margin-top: 20px;margin-bottom: 20px;">
          <mt-button type="primary" style="display: block;" class="submit-btn" :disabled="this.guestInfo.order_status != 0 || guestInfo.service_fee == 0 || submit_ing " @click="toShare">
          <span>
            推送给客户
            <img src="@/images/icon/IOS/content_icon_send.png" height="20" width="20" slot="icon" style="vertical-align: middle">
          </span>
          </mt-button>
        </div>
        
      </div>
      <div class="property-block" style="padding: 60px 0;">
       <!-- 下一步跳到线下进件，其禁用的状态应该是 服务费订金不为0，且在申请状态时 -->
        <mt-button class="submit-btn" style="display: block" :disabled="guestInfo.service_fee != 0 && guestInfo.order_status === 0 || go_next_submit_ing " type="primary" @click="goNext">下一步</mt-button>
      </div>
      <div class="mask" v-if="maskShow" @click="exitMask">
          <img src="@/images/icon/IOS/finger-point.png" alt="">
          <div>点此分享给客户支付</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.property-item{
  padding: 6px 0;
}
.property-item>span{
  width: 30%;
  display: inline-block;
}
.property-item .info{
  color: #999;
  width: 68%;
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
  padding: 15px 20px;
  font-size: 13px;
  background-color: #fff;
}
.mask {
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 99;
    background: black;
    opacity: 0.5;
    top: 0;
}

.mask img {
    width: 100px;
    float: right;
    margin-right: 9%;
}

.mask div {
    color: #fff;
    margin-top: 80px;
    text-align: center;
}
a{
  color: rgb(57, 182, 254);
}
</style>
<script>
import XDLineIco from '@/components/line-ico.vue';
import { Button, Checklist, TabContainer, TabContainerItem, Toast  } from 'mint-ui';
import config from '@/config/app.config';
import { mapGetters } from 'vuex';
import wxConfig from '@/utils/wechatMixins'
var clone = require('clone');

export default {
  data(){
    return{
      container: 'service-fee',
      productInfo: config.productInfo,
      guestInfo: {
        order_id: '********',
        order_status_name: '填写申请',
        order_status: 0,
      },
      copyOrder: false,
      editable: true,
      maskShow: false,
      into_channel: 1,

      submit_ing: false,
      go_next_submit_ing: false,
    }
  },
  computed: {
    ...mapGetters({
      loanOrderInfo:'loanOrderInfo'
    })
  },
  components: {
    'xd-line-ico': XDLineIco,
    'mt-button': Button,
    'mt-checklist': Checklist,
    'mt-tab-container': TabContainer,
    'mt-tab-container-item': TabContainerItem,
  },
  methods: {
    updateFeeRate(){
      if(!sessionStorage.getItem('feeRate')){
        sessionStorage.setItem('feeRate', this.guestInfo.feeRate);
      }
      this.$router.push('/loan/update-service-fee');
    },
    //当服务费订金不为0时在分享给客户时生成订单
    toShare() {
      let that = this;
      this.submit_ing = true;
      if(this.$route.params.order_id === '-1'){
        this.applyLoan().done( data => {
          that.submit_ing = false;
          sessionStorage.removeItem('feeRate');
          sessionStorage.removeItem('actualFeeRate');
          sessionStorage.setItem('order_id', data.order_id);
          that.guestInfo.order_id = data.order_id;
          that.into_channel = data.into_channel;
          that.editable = false;
          that.guestInfo.order_status = 0;
          that.shareFunc().
            done(() => {
              that.refreshOrderStatus();
            })
        })
        .fail( msg => {
          Toast({
            message: msg,
            duration: 2000
          })
        })
      }else{
        this.shareFunc()
          .done( () => {
            that.refreshOrderStatus();
            that.submit_ing = false;
          })
          .fail( () => {
            that.submit_ing = false;
          })
      }
    },
    shareFunc(){
      var that = this;
      let myUrl = '';
      if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
        //myUrl = window.sessionStorage.getItem('url').split('#')[0];
        //修改为首页url
        myUrl = 'https://' + window.location.host +  '/loan/product-list'
      } else {
        myUrl = window.location.href.split('#')[0];
      }
      /*myUrl = 'https://' + window.location.host + '/loan/service-fee/-1';*/

      return this.$store.dispatch('wxShare', {url: myUrl})
        .then(res => {
          that.maskShow = true;
          let shareObj = {
            title: "代收服务费订金，点击完成贷款服务费订金的支付",
            ptSummary: '点击进去完成贷款服务费订金的支付，再完成系列操作',
            link: 'https://' + window.location.host + '/loan/guest-loan-order-detail/' + this.guestInfo.order_id,
            mainImg: 'https://jzjf.kingdomfax.com/kingdom.png'
          }
          // wxConfig.wxShare(shareObj)
          wxConfig.methods.wxShare(shareObj, res, function () {
            that.maskShow = false
          })
        }).fail(msg => {
        Toast({
          message: '获取分享信息失败',
          duration: 2000
        });
      })
    },
    exitMask() {
      this.maskShow = false
    },
    applyLoan(){
      var formData = {
        product_id: this.productInfo.productId,
        app_amount: this.guestInfo.appl_amount,
        city: parseInt(sessionStorage.getItem('xd_city')),
        cust_id: parseInt(sessionStorage.getItem('xd_cid')) ,
        remark: sessionStorage.getItem('xd_remark'),
        id_card: parseInt(this.guestInfo.id_card) ,
        actual_service_fee_rate: this.guestInfo.feeRate,
        //service_fee: this.guestInfo.service_fee 去掉
      }
      return this.$store.dispatch('applyLoan', formData)

    },
    goNext(){
      var city = sessionStorage.getItem('xd_city');
      var product_id = this.productInfo.productId;
      this.go_next_submit_ing = true;
      if(this.$route.params.order_id === '-1' && this.guestInfo.service_fee == 0){
        this.applyLoan().done( data => {
          this.go_next_submit_ing = false;
          sessionStorage.removeItem('feeRate');
          sessionStorage.removeItem('actualFeeRate');
          sessionStorage.setItem('order_id', data.order_id);
          this.$router.push('/loan/into-channel/' + data.into_channel + '/'  + product_id + '/' + city);
        })
        .fail( msg => {
          this.go_next_submit_ing = false;
          Toast({
            message: msg,
            duration: 2000
          })
        })
      }else{
        this.go_next_submit_ing = false;
        sessionStorage.setItem('order_id', this.guestInfo.order_id);
        this.$router.push('/loan/into-channel/' + this.into_channel + '/' + product_id + '/' + city);
      }
    },
    refreshOrderStatus(){
      var self = this;
      this.$store.dispatch('getLoanOrderInfo', {order_id: this.guestInfo.order_id})
        .done( data => {
          self.guestInfo.order_status = data.order_status_id;
          self.guestInfo.order_status_name = data.order_status_name;
        })
    },
    

  },
  beforeMount(){
    var order_id = this.$route.params.order_id;
    if( order_id == "-1"){
      this.guestInfo = {
        ...this.guestInfo,
        cname: sessionStorage.getItem('xd_cname'),
        cid: sessionStorage.getItem('xd_cid'),
        id_card: sessionStorage.getItem('xd_id_card'),
        appl_amount: parseFloat(sessionStorage.getItem('xd_appl_amount')),
        product_name: this.productInfo.name
      }
      if(localStorage.getItem('userinfo')){
        try{
          var jdata = JSON.parse(localStorage.getItem('userinfo'))
          //this.guestInfo.agent_name = jdata.user_name;
          this.guestInfo.agent_name = localStorage.getItem('xd_user_name');
          this.guestInfo.agent_mobile = jdata.mobile;
        }catch(e){

        }
      }
      if(sessionStorage.getItem('feeRate')){
        if(sessionStorage.getItem('actualFeeRate')){
          //修改过后的费率
          this.guestInfo.feeRate = parseFloat( sessionStorage.getItem('actualFeeRate') ).toFixed(2);
        }else{
          this.guestInfo.feeRate = parseFloat( sessionStorage.getItem('feeRate') ).toFixed(2);
        }
        this.guestInfo.service_fee = ( this.guestInfo.feeRate / 100 * parseFloat(sessionStorage.getItem('xd_appl_amount')) * 10000).toFixed(2);
      }else{
        Toast({
          message: '获取费率失败',
          duration: 2000
        })
      }
    }else{
      this.editable = false;
      this.$store.dispatch('getLoanOrderInfo', { order_id})
        .done( data => {
          this.guestInfo =  {
            order_id: order_id,
            cname: data.consumer_name,
            appl_amount: data.app_amount,
            feeRate: parseFloat(data.service_fee_rate).toFixed(2),
            id_card: data.id_card,
            product_name: data.product_name,
            agent_name: data.broker_name,
            agent_mobile: data.mobile,
            service_fee: parseFloat(data.fee_amount).toFixed(2),
            order_status: data.order_status_id,
            order_status_name: data.order_status_name,
          }
          this.into_channel = data.into_channel;
          sessionStorage.setItem('xd_city', data.city);
        })
    }
  }
}
</script>
