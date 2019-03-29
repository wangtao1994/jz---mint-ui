<template>
  <div class="container" style="background-color: #fff;height: 100vh;">
    <div class="block f-m">
      <xd-line-ico lineText="订单详情"/>
    </div>
    <div class="detail-block">
      <div class="property-block">
        <div class="property-item">
          <span class="name">订单号</span>
          <span class="info">{{orderDetail.order_id}}</span>
        </div>
        <div class="property-item">
          <span class="name">产品名称</span>
          <span class="info">{{orderDetail.product_name}}</span>
        </div>
        <div class="property-item">
          <span class="name">申请额（万元）</span>
          <span class="info">{{orderDetail.app_amount}}</span>
        </div>
        <div class="property-item">
          <span class="name">放款额（万元）</span>
          <span class="info">{{orderDetail.actual_amount}}</span>
        </div>
      </div>
      <div class="property-block">
        <div class="property-item">
          <span class="name">客户姓名</span>
          <span class="info">{{orderDetail.consumer_name}}</span>
        </div>
        <div class="property-item">
          <span class="name">身份证后4位</span>
          <span class="info">{{orderDetail.id_card}}</span>
        </div>
        <div class="property-item">
          <span class="name">城市</span>
          <span class="info">{{orderDetail.city_name}}</span>
        </div>
      </div>
      <div class="property-block">
        <div class="property-item">
          <span class="name">提交时间</span>
          <span class="info">{{ orderDetail.create_time }}</span>
        </div>
        <div class="property-item">
          <span class="name">订单状态</span>
          <span class="info">{{orderDetail.status_name}}
          <img v-if="orderDetail.status" src="@/images/icon/IOS/content_icon_finished.png" style="vertical-align:middle;" />
          </span>
        </div>
      </div>
      <div v-if="orderDetail.status === 0 || orderDetail.status === 1 " class="property-block" style="padding: 60px 0;">
        <mt-button class="submit-btn" style="display: block" type="primary" @click="goOrder">进入</mt-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.block{
  margin: 5px 0;
  padding: 12px 15px;
  background-color: #fff;
}
.property-item{
  padding: 7px 0;
}
.property-item span{
  width: 45%;
  display: inline-block;
}
.property-item .info{
  color: #999;
  margin-right: 20px;
}
.property-block{
  border-bottom: 1px solid #c2c2c2;
  padding: 20px 15px;
  font-size: 13px;
}
</style>
<script>
import XDLineIco from '@/components/line-ico.vue';
import { mapGetters } from 'vuex';
import { Button } from 'mint-ui';
  export default {
    components: {
    'xd-line-ico': XDLineIco,
    'mt-button': Button,
    },
    computed: {
      ...mapGetters({
        orderDetail:'OrderDetail'
      })
    },
    mounted(){
      var order_id = this.$route.params.id;
      order_id = parseInt(order_id);
      this.$store.dispatch('getOrderDetail', { order_id })
    },
    methods: {
      goOrder(){
        sessionStorage.setItem('xd_cname', this.orderDetail.consumer_name);
        this.$router.push('/loan/service-fee/' + this.$route.params.id);
      }
    }
  }
</script>