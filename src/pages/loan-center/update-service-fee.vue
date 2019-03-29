<template>
  <div class="container">
    <div class="update-block">
      <input class="number-input" type="number" name="" placeholder="输入要修改的比例" v-model="feeRate" step="0.1">%
    </div>
    <p style="font-size:12px;color: rgb(255, 166, 28);text-indent: 1em;margin-top: 10px;">提示：修改的比例不得小于限定比例</p>
    <mt-button class="submit-btn" type="primary" style="display: block; margin-top: 40px;" @click="submit">确定</mt-button>
  </div>
</template>
<style>
  .update-block{
    background-color: #fff;
    margin-top: 13px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    font-size: 16px;
    color: #919191;
  }
  .number-input{
    -webkit-appearance:none;
    border: none;
    border-bottom: 1px solid #c2c2c2;
    height: 20px;
    font-size: 16px;
    text-indent: 2em;
    border-radius: 0px;
  }
  .number-input:focus{
    outline: none;
  }
</style>
<script>
  import { Button, Toast } from 'mint-ui';
  export default {
    components: {
      'mt-button': Button,
    },
    data(){
      return{
        feeRate: 0,
      }
    },
    beforeMount(){
      this.feeRate = sessionStorage.getItem('feeRate');
    },
    methods: {
      submit(){
        var rates = this.feeRate.split('.');
        var feeRate = this.feeRate;
        var maxFeeRate;
        try{
          feeRate = parseFloat(this.feeRate);
          maxFeeRate = parseFloat(sessionStorage.getItem('maxFeeRate'));
        }catch(e){

        }
        if( feeRate !== 0){
          if(parseFloat(this.feeRate) > maxFeeRate  || parseFloat(this.feeRate) < 0.1){
            Toast({
              message: '需收取服务费订金时，服务费订金率只能低于' + maxFeeRate + '且不得小于0.1',
              duration: 2000,
            })
          }else{
            if(rates[1] && rates[1].length > 2){
              Toast({
                message: '比例限定为小数点后两位',
                duration: 2000,
              })
            }else{
              sessionStorage.setItem('actualFeeRate', this.feeRate);
              this.$router.push('/loan/service-fee/-1');
            }
          }
        }else{
          sessionStorage.setItem('actualFeeRate', this.feeRate);
          this.$router.push('/loan/service-fee/-1');
        }
      }
    }
  }
</script>