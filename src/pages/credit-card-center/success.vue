<template>
  <div class="container">
      <img src="@/images/icon/IOS/content_icon_sucess@3x.png" style="height: 76px;height: 76px;margin-top: 150px;" />
      <p style="margin-top: 4px;font-size: 24px;">{{successObj[success_type]}}</p>
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
        successObj: {
          charge_success: '充值成功',
          withdraw_success: '提现成功',
          credit_card_bind_success: '绑定成功',
          debit_card_bind_success: '绑定成功',
        },
        success_type: 'charge_success',
      }
    },
    beforeMount(){
      this.success_type = this.$route.params.success_type;
      if(this.success_type == 'credit_card_bind_success'){
        sessionStorage.setItem('credit_card_bind', '1');
      }else if(this.success_type == 'debit_card_bind_success'){
        sessionStorage.setItem('debit_card_bind', '1')
      }
    }
  }
</script>