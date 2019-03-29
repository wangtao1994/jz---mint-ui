<template>
    <div>
        <div class="add-header">
            <line-ico class="line-ico" :line-text="lineText"></line-ico>
        </div>
        <section class="add-body">
            <div class="add-text">
                <div class="add-cell">
                    <div class="cell-left">
                        <img class="slot-ico" src="@/images/icon/IOS/content_icon_name.png">
                        <span class="text-colums">姓名</span>
                    </div>
                    <input v-model="addFrom.name" maxlength="12" type="text" placeholder="真实姓名">
                </div>
                <div class="add-cell">
                    <div class="cell-left">
                        <img class="slot-ico" src="@/images/icon/IOS/content_icon_id_card.png">
                        <span class="text-colums">身份证后四位</span>
                    </div>
                    <input v-model="addFrom.id_card"
                           onKeyUp="if(this.value.length>4){this.value=this.value.substr(0,4)}" type="text"
                           placeholder="输入身份证后四位">
                </div>
                <div class="add-cell">
                    <div class="cell-left">
                        <img class="slot-ico" src="@/images/icon/IOS/content_icon_city.png">
                        <span class="text-colums">城市</span>
                    </div>
                    <div class="no-input-left">
                        <span @click="chooseProvince">{{provinceName}}<img
                                src="@/images/icon/IOS/content_icon_more_6.png" alt=""></span>
                        <span @click="chooseCity" style="margin-left: 3%">{{cityName}}<img
                                src="@/images/icon/IOS/content_icon_more_6.png" alt=""></span>
                    </div>
                </div>
                <div class="add-cell">
                    <div class="cell-left">
                        <img class="slot-ico" src="@/images/icon/IOS/content_icon_note.png">
                        <span class="text-colums">备注</span>
                    </div>
                    <textarea v-model="addFrom.remark"
                              placeholder="输入备注信息" maxlength="120"></textarea>
                </div>
            </div>
            <mt-button class="sure-btn" @click="addGuest">录入</mt-button>
            <div :class="{'mypick-animate':showAnimate , 'hide-animate':hideAnimate}" class="pick-choose">
                <span @click="chooseProvince">取消</span>
                <span @click="sureProvince">确定</span>
                <mt-picker v-if="type == 'province'" :slots="slots" value-key="province_name"
                           @change="onValuesChange"></mt-picker>
                <mt-picker v-if="type == 'city'" :slots="slots" value-key="city_name"
                           @change="onValuesChange"></mt-picker>
            </div>
        </section>
    </div>
</template>
<style scoped>
    .add-header {
        height: 57px;
        line-height: 57px;
    }

    .add-header .line-ico {
        margin-left: 15px;
    }

    .add-body {
        height: calc(100vh - 57px);
        background: #f7f7f7;
        overflow: auto;
    }

    .add-cell {
        border-bottom: 2px solid #f7f7f7;
        height: 50px;
        line-height: 50px;
        position: relative;
    }

    .add-cell .text-colums {
        margin-left: 41px;
    }

    .add-cell:last-child {
        border-bottom: 0;
        height: 85px;
        line-height: 50px;
    }

    .add-cell:last-child .cell-left {
        border-bottom: 0;
        height: 85px;
        line-height: 50px;
        width: 30%;
    }

    .add-cell .cell-left {
        width: 48%;
        float: left;
    }

    .add-body .add-text {
        width: 90%;
        margin-left: 5%;
        background: white;
        height: 240px;
        border-radius: 10px;
        margin-top: 29px;
    }

    .add-body .add-text .slot-ico {
        margin-left: 19px;
        width: 18px;
        height: 18px;
        position: absolute;
        top: 16px;
    }

    .add-body .add-text input {
        outline: none;
        border: 0;
        height: 40px;
        font-size: 16px;
        width: 45%;
        margin-left: 2%;
    }

    .add-body .add-text textarea {
        outline: none;
        border: 0;
        height: 62px;
        font-size: 16px;
        width: 60%;
        margin-left: 3%;
        margin-top: 14px;
        text-align: center;
    }

    .no-input-left {
        display: inline-block;
        width: 45%;
        margin-left: 2%;
        color: #a6a6a6;
    }

    .mint-cell-text {
        font-size: 16px;
    }

    .add-body .sure-btn {
        width: 76%;
        margin-left: 13%;
        margin-top: 50px;
        background: rgb(57, 182, 254);
        color: white;
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
  import {Button, Cell, Picker, Toast} from 'mint-ui';
  import lineIco from '@/components/line-ico.vue'
  import {post} from "@/utils/request";

  export default {
    components: {
      'mt-button': Button,
      'mt-cell': Cell,
      'line-ico': lineIco,
      'mt-picker': Picker,
    },
    data() {
      return {
        lineText: '录入客户信息',
        province: '',
        city: '',
        type: "province",
        cityName: "选择市",
        cityList: '',
        city_id: '',
        provinceName: "选择省",
        provinceList: [],
        province_id: '',
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
        addFrom: {
          "name": "",
          "id_card": "",
          "age": 10,
          "province": null,
          "city": null,
          "remark": ""
        }
      }
    },
    methods: {
      getPovinceName() {
        let that = this;
        this.$store.dispatch('getPovinceName', {})
          .then(function (res) {
            that.slots[0].values = res;
            that.provinceList = res;
          }, function (err, msg) {
            
          });
      },
      getCityName() {
        let that = this;
        this.$store.dispatch('getCityName', {province_id: this.province_id})
          .then(function (res) {
            that.slots[0].values = res;
            that.cityList = res;
          }, function (err, msg) {

          });
      },
      addGuest() {
        this.addFrom.province = Number(this.province_id)
        this.addFrom.city = Number(this.city_id)
        if(this.addFrom.name == ''){
          Toast({
            message: '姓名不可为空',
            position: 'bottom',
            duration: 2000
          });
          return false
        }
        let reg = /^(\d{3})(\d{1}|[X]{1}|[x]{1})?$/;
        if(this.addFrom.id_card.length !== 4){
          Toast({
            message: '请输入正确的身份证格式',
            position: 'bottom',
            duration: 2000
          });
          return false
        }else if(!reg.test(this.addFrom.id_card)){
          Toast({
            message: '请输入正确的身份证格式',
            position: 'bottom',
            duration: 2000
          });
          return false
        }
        if(!this.addFrom.city){
          Toast({
            message: '请选择城市',
            position: 'bottom',
            duration: 2000
          });
          return false
        }
        var regEn = /[`~!@#$%^&*()_+<>?:"{}.\/;'[\]]/im,
          regCn = /[·！#￥（——）：；“”‘、|《》？、【】[\]]/im;

        if (regEn.test(this.addFrom.remark) || regCn.test(this.addFrom.remark)) {
          Toast({
            message: '备注不能包含特殊字符',
            position: 'bottom',
            duration: 2000
          });
          return false
        }
        this.addFrom.id_card = this.addFrom.id_card.toLocaleUpperCase()
        let that = this
        this.$store.dispatch('addGuest', this.addFrom)
          .then(function (res) {
            Toast({
              message: '操作成功',
              position: 'bottom',
              duration: 2000
            });
            setTimeout(() => {
              history.go(-1)
            }, 1500)

          })
          .fail(msg => {
            Toast({
              message: msg,
              duration: 2000
            });
          })
      },
      onValuesChange(picker, values) {
        if (this.type == "province") {
          this.province = values[0].province_name;
          this.province_id = values[0].province_id
          this.city = ''
          this.city_id = ''
        }
        if (this.type == "city") {
          this.city = values[0].city_name
          this.city_id = values[0].city_id
        }
        
        // if (values[0] > values[1]) {
        //   picker.setSlotValue(1, values[0]);
        // }
      },
      sureProvince() {
        if (this.type == "province") {
          this.provinceName = this.province;
          this.cityName = '选择市'

        }
        if (this.type == "city") {
          this.cityName = this.city
        }
        this.showAnimate = false;
        this.hideAnimate = true;
      },
      chooseProvince() {
        this.type = "province"
        this.slots[0].values = this.provinceList;
        if (this.showAnimate == true) {
          this.showAnimate = false;
          this.hideAnimate = true;
        }
        else {
          this.showAnimate = true;
          this.hideAnimate = false;
        }
      },
      chooseCity() {
        if(this.provinceName == '选择省'){
          Toast({
            message: '请先选择省',
            position: 'bottom',
            duration: 2000
          });
          return false
        }
        this.getCityName();
        this.type = "city";
        if (this.showAnimate == true) {
          this.showAnimate = false;
          this.hideAnimate = true
        }
        else {
          this.showAnimate = true;
          this.hideAnimate = false
        }
      }
    },
    beforeMount() {
      this.getPovinceName()
    }
  }
</script>