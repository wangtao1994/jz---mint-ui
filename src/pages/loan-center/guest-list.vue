<template>
  <div>
    <template v-if="guestList && guestList.length != 0">
      <div :key="item.consumer_id" v-for="item in guestList" @click="chooseGuest(item)">
        <a class="mint-cell">
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-value" style="width: 90%;">
              <div class="width: 100%;height: 100%">
                <img slot="icon" class="guest-icon" src="http://via.placeholder.com/40x40" />
                <span class="guest-name">{{item.full_name}}</span>
                <span class="guest-id">{{item.id_card}}（身份证后4位）</span>
              </div>

            </div>
            <span class="mint-radio" >
              <input type="radio" class="mint-radio-input" :checked="active == item.consumer_id" />
              <span class="mint-radio-core"></span>
            </span>
              
          </div>
        </a>
      </div>
    </template>
    <template v-else>
      <div class="no-data">
        <img class="no-data-img" src="@/images/icon/IOS/content_icon_no_data.png" alt="" />
        <p class="no-data-text">暂无相关数据<p/>
      </div>
    </template>
  </div>

</template>
<style scoped>
.mint-cell{
  min-height: 50px;
}
.mint-cell-value{
  color: #000;
}
  .guest-icon{
    border-radius: 20px;
    vertical-align: middle;
  }
  .mint-tab-item-icon{
    width: 40px;
    height: 40px;
  }
  .guest-name{
    font-size: 16px;
    margin-left: 15px;
  }
  /*.mint-tab-item-icon, .mint-tab-item-label{
    display: inline-block;
  }*/
  .guest-id{
    font-size: 12px;
    color: #919191;
    margin-left: 20px;
  }
</style>
<script>
import { TabContainer, TabContainerItem, Cell, Radio, Toast } from 'mint-ui';
import { mapGetters } from 'vuex';
  export default {
    data(){
      return {
        active: '',
      }
    },
    computed: {
      ...mapGetters({
        guestList:'GuestList',
        guestListOptions: 'GuestListOptions',
      })
    },
    components: {
      'mt-tab-container': TabContainer,
      'mt-tab-container-item': TabContainerItem,
      'mt-cell': Cell,
      'mt-radio': Radio,
    },
    methods: {
      chooseGuest(item){
        var self = this;
        this.active = item.consumer_id;
        this.$store.dispatch('chooseGuest', { cus_id: item.consumer_id });
        setTimeout( () => {
          self.$router.push('/loan/add-loan-guest/edit');
          sessionStorage.setItem('xd_cid', item.consumer_id)
          sessionStorage.setItem('xd_id_card', item.id_card);
          sessionStorage.setItem('xd_cname', item.full_name);
          sessionStorage.setItem('xd_province', item.province);
          sessionStorage.setItem('xd_province_name', item.province_name);
          sessionStorage.setItem('xd_city', item.city);
          sessionStorage.setItem('xd_city_name', item.city_name);
        }, 1000)
      }
    },
    mounted(){
      this.$store.dispatch('getGuestList', { parameters: ''})
        .fail( msg => {
          Toast({
            message: msg,
            duration: 2000
          });
        })
    }
  }
</script>