<template>
  <div class="content-wrapper">
    <div class="content">
      <mt-field label="姓名" placeholder="请输入姓名"></mt-field>
      <mt-field label="身份证号" placeholder="请输入身份证号"></mt-field>
      <mt-field label="银行卡号" :placeholder="placeholder"></mt-field>
      <mt-field label="所属银行" placeholder="填写开户行名称"></mt-field>
      <mt-field label="预留手机号" placeholder="请填写预留手机号"></mt-field>
      <router-link :to="'/card/success/' + type + '_bind_success'"><mt-button class="submit-btn">添加</mt-button></router-link>
    </div>
  </div>
</template>
<style scoped>
  .content{
    padding-top: 80px;
  }
  .content-wrapper{
    min-height: 100vh;
    background-color: #fff;
  }
  .mint-cell{
    min-height: 60px;
  }
  .submit-btn{
    margin: 60px auto 0 auto;
    background-color: #26a2ff;
    width: 80%;
    display: block;
    color: #fff;
    height: 50px;
  }
</style>
<script>
import { Field, Button } from 'mint-ui';
  export default {
    data(){
      return{
        placeholder: '请输入信用卡号',
        type: 'credit_card'
      }
    },
    components: {
      'mt-field': Field,
      'mt-button': Button,
    },
    beforeMount(){
      var type = this.$route.params.card_type;
      this.type = type;
      if( type === 'credit_card'){
        this.placeholder = '请输入信用卡卡号'
      }else{
        this.placeholder = '请输入借记卡卡号'
      }
    }
  }
</script>