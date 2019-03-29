<template>
  <div class="container">
      <img src="@/images/icon/IOS/content_icon_sucess@3x.png" style="height: 76px;height: 76px;margin-top: 150px;" />
      <p style="margin-top: 23px;color: #919191;">成功支付 贷款服务费订金</p>
      <p style="margin-top: 4px;font-size: 24px;">{{fee_amount}}元</p>
  </div>
</template>
<style scoped>
  .container{
    height: 100vh;
    display: flex;
    flex-direction:column;
    align-items: center;
  }
</style>
<script>
  export default {
    data(){
      return {
        fee_amount: 0,
      }
    },
    beforeMount(){
      var fee_amount = this.$route.params.fee_amount
      try{
        fee_amount = parseFloat(fee_amount).toFixed(2);
      }catch(e){

      }
      this.fee_amount = fee_amount;
    }
  }
</script>