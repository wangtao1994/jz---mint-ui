<template>
  <a :class="{'mint-cell': true, 'mint-field' :true, 'mint-cell-long': data.namelist}">
    <div class="mint-cell-left">
    </div>
    <div :class="{'mint-cell-wrapper': true, 'short' :data.namelist}">
      <div class="mint-cell-title">
        <img :src="data.icon" />
        <span class="mint-cell-text">{{ data.label}}</span>
      </div>
      <!-- 客户列表 -->
      <div class="mint-cell-value" v-if="data.namelist ">
        <div style="width: 100px;">
          <input :placeholder="data.placeholder" :type="data.type" class="mint-field-core" maxlength="10" v-on:input="handleInput" :value="data.info" :disabled="data.disabled">
        </div>
        <span style="width: 1px;height: 70px;background-color: #f7f7f7;"></span>
        <div style="margin-left: 10px;">
          <router-link to="/loan/guest-list"><img src="@/images/icon/IOS/content_icon_customers@3x.png"/><span style="color:#000;">客户列表 </span><img src="@/images/icon/IOS/content_icon_more_2@3x.png" style="width: 6px;height:10px;" /></router-link>
        </div>
        <div class="mint-field-clear" style="display: none;">
          <i class="mintui mintui-field-error"></i>
        </div>

        <span :class="['mint-field-state', {'is-error': data.state == 'error', 'is-default' : data.state != 'error'}]">
          <i :class="['mintui', { 'mintui-field-default' : data.state != 'error', 'mintui-field-error' : data.state == 'error' } ]"></i>
        </span>
        <div class="mint-field-other"></div>
      </div>
      <!-- - -->
      <!-- 普通域 -->
      <div class="mint-cell-value" v-if="!data.namelist && !data.address">
        <input :placeholder="data.placeholder" :type="data.type" class="mint-field-core" v-on:input="handleInput" :value="data.info" :disabled="data.disabled">
        <div class="mint-field-clear" style="display: none;">
          <i class="mintui mintui-field-error"></i>
        </div>
        <span :class="['mint-field-state', {'is-error': data.state == 'error', 'is-default' : data.state != 'error'}]">
          <i :class="['mintui', { 'mintui-field-default' : data.state != 'error', 'mintui-field-error' : data.state == 'error' } ]"></i>
        </span>
        <div class="mint-field-other"></div>
      </div>
      <!-- - -->
      <div class="mint-cell-value" v-if="data.address" style="color: #919191;">
        <template v-if="data.disabled">
          <span>{{ data.province_name }}</span>　
          <span style="margin-left: 5px;">{{ data.city_name}}</span>
        </template>
        <template v-else>
          <span @click="data.chooseProvince" >{{ data.province_name }}</span>　
          <span @click="data.chooseCity" style="margin-left: 5px;">{{ data.city_name}}</span>
        </template>
        <div class="mint-field-clear" style="display: none;">
          <i class="mintui mintui-field-error"></i>
        </div>
        <span :class="['mint-field-state', {'is-error': data.state == 'error', 'is-default' : data.state != 'error'}]">
          <i :class="['mintui', { 'mintui-field-default' : data.state != 'error', 'mintui-field-error' : data.state == 'error' } ]"></i>
        </span>
      </div>
    </div>
    <div class="mint-cell-right">
    </div>
  </a>
</template>
<style scoped>
  .mint-cell img{
    width: 21px;
    height: 21px;
  }
  .mint-cell-long{
    height: 70px;
    border-radius: 10px 10px 0 0;
    border-bottom: 1px solid #f7f7f7;
  }
  .mint-cell-wrapper{
    background-image: none;
    border-bottom: 1px solid #f7f7f7;
  }
  .mint-field .mint-cell-title{
    width: 120px;
  }
  .mint-cell:last-child .mint-cell-wrapper{
    border-bottom: 0px solid #f7f7f7;
  }
  .short .mint-cell-title{
    width: 70px;
  }
  .mint-cell{
    min-height: 50px;
  }
  .mint-field-state.is-error{
    position: absolute;
    right: 10px;
  }
  .mint-cell:last-child{
    background-image: none;
  }
  .mint-cell-value input{
    color: #888;
  }
  .mint-cell-value input:disabled, .mint-cell-value input[disabled]{
    color: #888;
    -webkit-text-fill-color:#888;
    -webkit-opacity:1;
    opacity: 1;
  }
</style>
<script>
import { Field } from 'mint-ui';
  export default {
    data(){
      return {
        city: '城市 >',
        province: '省份 >',
        currentValue: this.value ,
      }
    },
    methods: {
      handleInput(event){
        var value = event.target.value;
        this.$emit('changeInfo', value); //触发 input 事件，并传入新值
      }
    },
    props: ["data"],
    model: {
      event: 'changeInfo',
      props: ['data']
    },
  }
</script>