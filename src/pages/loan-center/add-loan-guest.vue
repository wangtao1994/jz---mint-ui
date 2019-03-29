<template>
  <div class="container">
    <div class="header-block f-m">
      <xd-line-ico lineText="填写客户资料"/>
    </div>
    <div class="xd-form">
      <!-- <div>
        <span style="display: inline-block;width: 50%;" class="xd-short-field">
          <xd-field :data="{label: '姓名', placeholder: '真实姓名', icon: IconMyCenter, namelist: true}"/>
        </span><span style="display: inline-block;width: 50%;">
          <div class="mint-cell mint-field" style="background-image: none;">
            <div class="mint-cell-wrapper">
              <img src="@/images/icon/IOS/content_icon_customers.png"/>客户列表<img src="@/images/icon/IOS/content_icon_more_2.png"/>
            </div>
          </div>
        </span>
      </div> -->
      <!-- <mt-field label="邮箱" state="error" v-model="email"></mt-field> -->
      <xd-field
        :data="{
          label: '姓名',
          placeholder: '真实姓名',
          icon: IconMyCenter,
          namelist: true,
          info: formData.name,
          state: fieldState.name,
          disabled: !isNewGuest,
          }"
        v-on:changeInfo="changeInfo('name', $event)"
        v-model="formData.name"
       />
      <xd-field
        :data="{
          label: '身份证后4位',
          placeholder: '输入身份证后4位, 大写X',
          icon: IconIdCard,
          info: formData.id_card,
          state: fieldState.id_card,
          disabled: !isNewGuest,
          }"
        v-model="formData.id_card"
        v-on:changeInfo = "changeInfo('id_card', $event)"/>
      <xd-field
        :data="{
          label: '城市',
          icon: IconCity,
          address: true,
          province_name: formData.addrInfo.show_province_name,
          city_name: formData.addrInfo.show_city_name,
          chooseProvince, chooseCity,
          state: fieldState.address,
          disabled: !isNewGuest,
          }" />
      <xd-field
        :data="{
          label: '申请额度',
          placeholder: '填写要申请的额度（万元）',
          icon: IconLoan,
          info: formData.appl_amount,
          type: 'number',
          state: fieldState.appl_amount,
          }"
          v-model="formData.appl_amount"
          v-on:changeInfo = "changeInfo('appl_amount', $event)"/>
      <xd-field
        :data="{
          label: '备注',
          placeholder: '输入备注信息',
          icon: IconNote,
          info: formData.remark,
          state: fieldState.remark,
          }"
        v-model="formData.remark"
        v-on:changeInfo = "changeInfo('remark', $event)"/>
    </div>
    <mt-button class="submit-btn" :disabled="submit_ing" style="margin-top: 60px;" type="primary" @click="addGuest">下一步</mt-button>
    <div :class="{'mypick-animate':showAnimate , 'hide-animate':hideAnimate}" class="pick-choose">
        <span @click="chooseProvince">取消</span>
        <span @click="sureProvince">确定</span>
        <!--<mt-picker :slots="slots"  value-key="name" @change="onValuesChange"></mt-picker>-->
        <mt-picker v-if="type == 'province'" :slots="slots" value-key="province_name"
                   @change="onValuesChange"></mt-picker>
        <mt-picker v-if="type == 'city'" :slots="slots" value-key="city_name"
                   @change="onValuesChange"></mt-picker>

    </div>
  </div>
</template>
<style scoped>
  .xd-form {
      width: 90%;
      margin-left: 5%;
      background: white;
      /*height: 240px;*/
      border-radius: 10px;
      margin-top: 23px;
      padding: 0px 0px 20px 0px;
  }
  .xd-short-field .mint-cell{
    background-image: none;
  }
  .pick-choose {
    height: 211px;
    background: white;
    position: fixed;
    width: 100%;
    bottom: -211px;
  }

  .mypick-animate {
    animation: mypick 0.5s;
    animation-fill-mode: forwards
  }

  .hide-animate {
      animation: mypickhide 0.5s;
      animation-fill-mode: forwards
  }

  @keyframes mypickhide {
      from {
          bottom: 0;
      }
      to {
          bottom: -211px;
      }
  }

  @keyframes mypick {
      from {
          bottom: -211px;
      }
      to {
          bottom: 0;
      }
  }

  .pick-choose span {
      color: rgb(57, 182, 254);
      display: inline-block;
      margin-top: 10px;
  }

  .pick-choose span:nth-of-type(1) {
      margin-left: 10%;
  }

  .pick-choose span:nth-of-type(2) {
      float: right;
      margin-right: 10%;
  }
</style>
<script>
  import {Button, Cell, Picker, Field, Toast } from 'mint-ui';
  import XDLineIco from '@/components/line-ico.vue';
  import XDField from '@/components/xd-field.vue';
  import IconMyCenter from '@/images/icon/IOS/content_icon_name_2@3x.png';
  import IconIdCard from '@/images/icon/IOS/content_icon_id_card@3x.png'
  import IconCity from '@/images/icon/IOS/content_icon_city@3x.png';
  import IconNote from '@/images/icon/IOS/content_icon_note@3x.png';
  import IconLoan from '@/images/icon/IOS/content_icon_amount_of_loanning@3x.png';
  import { mapGetters } from 'vuex';
  var clone = require('clone');

  export default {
    components: {
      'mt-button': Button,
      'mt-cell': Cell,
      'xd-line-ico': XDLineIco,
      'mt-picker': Picker,
      'mt-field': Field,
      'xd-field': XDField,
    },
    data() {
      return {
        formData: {
          name: '',
          id_card: '',
          addrInfo: {
            city: '',
            province: '',
            show_province_name: '省份 > ',
            show_city_name: '城市 > ',
            province_name: '',
            city_name: '',
          },
          remark: '',
          appl_amount: '',
        },
        fieldState: {
          name: '',
          id_card: '',
          appl_amount: '',
          address: '',
          remark: '',
        },
        valid: true,
        isNewGuest: 1,
        pickerOptions: [],
        IconMyCenter,
        IconIdCard,
        IconCity,
        IconNote,
        IconLoan,
        province: '',
        city: '',
        type: "province",
        cityName: '选择市>',
        provinceName: '选择省>',
        showAnimate: false,
        hideAnimate: false,
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        submit_ing: false,
      }
    },
    computed: {
      ...mapGetters({
        area:'area'
      })
    },
    methods: {
      changeInfo(label, value){
        this.fieldState[label] = '';
        this.formData[label] = value;
      },
      onValuesChange(picker, values) {
        if(values && values[0]){
          if (this.type == "province") {
            this.formData.addrInfo.province_name = values[0].province_name;
            this.formData.addrInfo.province = values[0].province_id;
          }
          if (this.type == "city") {
            this.formData.addrInfo.city_name = values[0].city_name;
            this.formData.addrInfo.city = values[0].city_id;
          }
        }
        // if (values[0] > values[1]) {
        //   picker.setSlotValue(1, values[0]);
        // }
      },
      sureProvince() {
        if (this.type == "province") {
          this.formData.addrInfo.show_province_name = this.formData.addrInfo.province_name;
          this.formData.addrInfo.show_city_name = "城市 > ";
          this.formData.addrInfo.city = "";
        }
        if (this.type == "city") {
          this.fieldState.address = '';
          if(!this.formData.addrInfo.city_name){
            Toast({
              message: '请选择城市',
              duration: 2000
            })
          }else{
            this.formData.addrInfo.show_city_name = this.formData.addrInfo.city_name
          }
        }
        this.showAnimate = false;
        this.hideAnimate = true;
      },
      chooseProvince() {
        this.type = "province"
        var self = this;
        this.$store.dispatch('getProvinceList', {})
          .done( data => {
            self.slots[0].values = data;
          })
          .fail( msg => {
            Toast({
              message: msg,
              duration: 2000
            });
          })
        if (this.showAnimate == true) {
          this.showAnimate = false;
          this.hideAnimate = true
        }
        else {
          this.showAnimate = true;
          this.hideAnimate = false
        }
      },
      chooseCity() {
        var self = this;
        this.type = "city";
        if(this.formData.addrInfo.show_province_name != '省份 > '){
          this.$store.dispatch('getCityList', {province_id: this.formData.addrInfo.province})
            .done( data => {
              self.slots[0].values = data;
            })
            .fail( msg => {
              Toast({
                message: msg,
                duration: 2000
              });
            })
          if (this.showAnimate == true) {
            this.showAnimate = false;
            this.hideAnimate = true
          }
          else {
            this.showAnimate = true;
            this.hideAnimate = false
          }
        }else{
          Toast({
            message: '请先选择省份',
            duration: 2000
          })
        }
      },
      addGuest(){
        var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
          regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        if(!this.formData.name
          || regCn.test(this.formData.name)
          || regEn.test(this.formData.name)
          || this.formData.name.length > 12){
          this.fieldState.name = 'error'
          this.valid = false;
        }
        if(!this.formData.addrInfo.city){
          this.fieldState.address = 'error';
          this.valid = false;
        }
        /*if(regEn.test(this.formData.remark) || regCn.test(this.formData.remark)){
          this.fieldState.remark = 'error';
          this.valid = false;
        }*/
        if(!this.formData.appl_amount ){
          this.fieldState.appl_amount = 'error';
          this.valid = false;
        }else if(this.formData.appl_amount >50 || this.formData.appl_amount <= 0){
          this.fieldState.appl_amount = 'error';
          this.valid = false;
          Toast({
            message: '贷款额度不得大于50万元，不得小于0万元',
            duration: 2000
          })
        }else{
          //金额只能到小数点后两位
          var appl_amount = this.formData.appl_amount.split('.');
          if(appl_amount[1] && appl_amount[1].length > 2){
            this.fieldState.appl_amount = 'error';
            this.valid = false;
            Toast({
              message: '贷款额度最小单位为100元',
              duration: 2000
            })
          }
        }
        if( !(/(^\d{3}([0-9]|X)$)/.test(this.formData.id_card)) ){
          this.fieldState.id_card = 'error';
          this.valid = false;
        }
        if(this.valid){
          var self = this;
          sessionStorage.setItem('xd_appl_amount', this.formData.appl_amount)
          sessionStorage.setItem('xd_remark', this.formData.remark)
          if(this.isNewGuest){
            this.submit_ing = true;
            var formData = clone(this.formData);
            formData.city = formData.addrInfo.city;
            formData.province = formData.addrInfo.province;
            delete formData.addrInfo;
            delete formData.appl_amount;
            delete formData.remark;
            this.$store.dispatch('addGuest', formData)
              .done( data => {
                /*var feeRate = sessionStorage.getItem('feeRate');
                if(parseFloat(feeRate) == 0){
                  self.$router.push()
                }*/
                this.submit_ing = false;
                sessionStorage.setItem('xd_id_card', formData.id_card);
                sessionStorage.setItem('xd_cname', formData.name);
                sessionStorage.setItem('xd_cid', data.cust_id);
                sessionStorage.setItem('xd_city', formData.city);
                self.$router.push('/loan/service-fee/-1');

              })
              .fail( msg => {
                this.submit_ing = false;
                Toast({
                  message: msg,
                  duration: 2000,
                })
              })
          }else{
            /*var cid = this.$route.params.cid;
            sessionStorage.setItem('xd_id_card', this.formData.id_card);
            sessionStorage.setItem('xd_cname', this.formData.name);
            sessionStorage.setItem('xd_cid', cid);*/
            self.$router.push('/loan/service-fee/-1');

          }
        }else{
          //重置valid
          this.valid = true;
        }
      },

    },
    mounted(){
      if(this.$route.params.flag != 'add'){
        if(sessionStorage.getItem('xd_cid')){
          this.isNewGuest = 0;
          this.formData.name = sessionStorage.getItem('xd_cname');
          this.formData.id_card = sessionStorage.getItem('xd_id_card');
          this.formData.addrInfo = {
            province: sessionStorage.getItem('xd_province'),
            city: sessionStorage.getItem('xd_city'),
            show_city_name: sessionStorage.getItem('xd_city_name'),
            show_province_name: sessionStorage.getItem('xd_province_name'),
            province_name: sessionStorage.getItem('xd_province_name'),
            city_name: sessionStorage.getItem('xd_city_name'),
          }
        }
      }
    }

  }
</script>