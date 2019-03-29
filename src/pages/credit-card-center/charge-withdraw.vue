<template>
  <div class="bg-gray">
    <div class="top-header">
      <div class="left-side">
        <div style="width: 60px;height: 60px;background-color: #ccc;"></div>
      </div>
      <router-link v-if=" bind === 0" :to="'/card/bind-card/' + card_type">
        <div class="right-side">
          <p style="font-size: 24px;">点击绑定银行卡</p>
          <p>首次进入，请先绑定{{card_obj[card_type]}}</p>
        </div>
      </router-link>
      <div v-else class="right-side">
        <p style="font-size: 24px;">中国建设银行</p>
        <p v-if="type == 'charge'">本次最多转入20000元</p>
        <p v-else>本次最多转入20000元</p>
      </div>
    </div>
    <div class="body-block">
      <p v-if=" type == 'charge'">充值金额（元）</p>
      <p v-else>提现金额（元）</p>
      <div>
        <input type="number" name="" class="input-number">
      </div>
      <mt-button :disabled=" bind === 0" @click="onClick" class="submit-btn" type="primary">
        <span v-if="type == 'charge'">充值</span>
        <span v-else>提现</span>
      </mt-button>
    </div>
  </div>
</template>
<style scoped>
  .top-header{
    min-height: 90px;
    box-sizing: border-box;
    background-color: #fff;
    vertical-align: middle;
  }
  .left-side{
    width: 100px;
    float: left;
    margin-top: 15px;
    margin-left: 20px;
  }
  .right-side{
    float: left;
    padding: 20px 0;
  }
  .right-side p:last-child{
    letter-spacing: 2px;
    color: #ccc;
  }
  .body-block{
    margin-top: 10px;
    background-color: #fff;
    min-height: calc(100vh - 100px) ;
    padding: 20px 10px;
  }
  .input-number{
    height: 60px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    position: relative;
    display: inline-block;
    padding: 4px 11px;
    width: 100%;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(0,0,0,.65);
    background-color: #fff;
    background-image: none;
    border: none;
    border-bottom: 1px solid #d9d9d9;
    -webkit-transition: all .3s;
    transition: all .3s;
    margin-top: 80px;
  }
  .submit-btn{
    width: 60%;
    margin: 60px auto;
    display: block;
    border-radius: 0;
    color: #fff;
    height: 50px;
    border: none;
  }
  a{
    color: #000;
  }
</style>
<script>
import { Button, Toast } from 'mint-ui';

export default {
  data(){
    return {
      type: 'charge',
      credit_card_bind: 0,
      debit_card_bind: 0,
      card_type: 'credit_card',
      card_obj: {
        credit_card: '信用卡',
        debit_card: '借记卡'
      },
      bind: 0
    }
  },
  components: {
    'mt-button': Button,
  },
  beforeMount(){
    var type = this.$route.params.type;
    this.type = type;
    if( type === 'charge'){
      this.card_type = 'credit_card'
    }else{
      this.card_type = 'debit_card'
    }
    if(sessionStorage.getItem('credit_card_bind')){
      this.credit_card_bind = 1;
    }else{
      this.credit_card_bind = 0;
    }
    if(sessionStorage.getItem('debit_card_bind')){
      this.debit_card_bind = 1;
    }else{
      this.debit_card_bind = 0;
    }
    if(this.card_type === 'credit_card' &&this.credit_card_bind === 0 || this.card_type === 'debit_card' && this.debit_card_bind === 0){
      this.bind = 0;
    }else{
      this.bind = 1;
    }
  },
  methods: {
    onClick(){
      this.$router.push('/card/success/' + this.type + '_success');
    }
  }
  }
</script>