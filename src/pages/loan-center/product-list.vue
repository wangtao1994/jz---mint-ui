<template>
  <div class="container">
    <div v-if="!search_ing" class="header">
      <div class="tabbar f-m" style="width: 85%;display: inline-block">
        <mt-navbar v-model="selectedNav">
          <mt-tab-item class="xd-tab-item" id="apply-loan">
            <span class="title-wrapper">
              <!-- <img class="mint-tab-item-icon" v-if="selectedNav == 'apply-loan'" slot="icon" src="@/images/icon/IOS/content_icon_apply_pressed@3x.png" >
              <img class="mint-tab-item-icon" v-else slot="icon" src="@/images/icon/IOS/content_icon_apply_normal@3x.png" > -->
              申请贷款
            </span>
          </mt-tab-item>
          <mt-tab-item id="loan-order-list" class="xd-tab-item">
            <span class="title-wrapper">
              <!-- <img class="mint-tab-item-icon" v-if="selectedNav == 'loan-order-list'" slot="icon" src="@/images/icon/IOS/content_icon_loan_data_pressed@3x.png" />
              <img class="mint-tab-item-icon" v-else slot="icon" src="@/images/icon/IOS/content_icon_loan_data_normal@3x.png"> -->
            贷款订单
            </span>
          </mt-tab-item>
        </mt-navbar>
      </div>
      <div style="display: inline-block;margin-left: 8px;vertical-align:middle" @click="togglePopMenu(true)">
        <span><img style="height: 18px;"  src="@/images/icon/IOS/content_icon_home@3x.png"></span>
      </div>
    </div>
      <mt-tab-container v-model="selectedNav">
        <mt-tab-container-item id="apply-loan">
          <div class="block f-m">
            <xd-line-ico lineText="产品列表"/>
          </div>
          <router-link to="/loan/product-detail">
            <div class="product-block">
              <div class="product-image" style="height: 100%;">
                <img src="@/images/icon/IOS/content_icon_loan_pingan@2x.png" style="width: 48px;height:48px;margin-top: 22px;" />
              </div>
              <div class="product-detail" style="margin-left: 35px;">
                <div class="product-name" style="font-size: 18px;">
                  <span class="f-m">新一贷</span>
                  <span style="font-size: 12px;margin-left: 12px;">额度可到</span><span style="color: rgb(237,107,36);font-size: 18px" class="f-m">50万</span>
                </div>
                <div style="margin-top: 13px;">
                  <xd-tag text="返佣高"/>
                  <xd-tag text="可代收"/>
                  <xd-tag text="可操单"/>
                  <!-- <strong><img class="more-img" src="@/images/icon/IOS/content_icon_more_6@3x.png" style="width:6px;height:11.8px;" /></strong> -->
                </div>
                <div class="product-summary" style="opacity: .4;margin-top: 6px;font-size: 14px;">
                  无需抵押 | 无需担保 | 放款快</div>
              </div>
            </div>
          </router-link>
        </mt-tab-container-item>
        <mt-tab-container-item id="loan-order-list">
          <div v-if="!search_ing" class="block f-m" style="margin-bottom:0px;">
            <xd-line-ico lineText="贷款订单"/>
            <span class="f-r" style="font-size: 12px;margin-left: 15px;">订单数</span>
            <span class="f-r" style="font-size: 12px;opacity: .4;">{{orderList.orderCount}}</span>
          </div>
          <div>
            <div v-if="!search_ing" class="search-body">
                <div class="search-div" @click="goSearch">
                    <img class="search-icon" src="@/images/icon/IOS/content_icon_search_2.png" alt="">
                    <span>输入您要搜索的信息</span>
                </div>
            </div>
            <div v-else  class="search-show-body">
              <div class="search" style="line-height: 36px">
                  <img class="search-icon" src="@/images/icon/IOS/content_icon_search_2.png" alt="">
                  <input v-on:input="searchAll" v-model="search_value" class="" placeholder="输入您要搜索的信息" type="text">
              </div>
              <span @click="exitSearch">取消</span>
            </div>
            <xd-table :columns="orderListColumns" :dataSource="orderList.orderList" v-on:goDetail="goDetail"/>
            <div class="no-data" v-if="!orderList.orderCount">
              <img class="no-data-img" src="@/images/icon/IOS/content_icon_no_data@3x.png" width="200" height="200" alt="">
              <p class="no-data-text">暂无相关数据<p/>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    <div style="z-index:2005;position: absolute;">
      <div class="pop-menu">
        <div class="caret"></div>
        <ul>
          <li><img src="@/images/icon/IOS/content_icon_loaning_center_2@3x.png"/><span>贷款中心</span></li>
          <li>
            <router-link :to=" isLogin ? '/exhibition-index' : '/login'"> <img src="@/images/icon/IOS/content_icon_manage_profit@3x.png"/><span>展业中心</span></router-link>
          </li>
          <li>
            <router-link :to=" isLogin ? '/usercenter' : '/login' " ><img src="@/images/icon/IOS/content_icon_my_center_2@3x.png"/><span>个人中心</span></router-link></li>
        </ul>
      </div>
    </div>
    <div class="v-modal" style="z-index: 2000;" @click="togglePopMenu(false)"></div>
  </div>
</template>
<style>
  .header{
    background-color: #fff;
  }
  .mint-navbar .mint-tab-item.is-selected{
    border: none;
  }
  .mint-navbar .mint-tab-item .title-wrapper{
    padding-bottom: 5px;
  }
  .xd-tab-item:last-child:before,.xd-tab-item:last-child:after{
    content: '|';
    color: #919191;
  }
  .xd-tab-item:last-child:after{
    float: right;
  }
  .mint-navbar .mint-tab-item.is-selected .title-wrapper{
    border-bottom: 2px solid #26a2ff;
  }
  .xd-tab-item .mint-tab-item-icon{
    vertical-align: middle;
    width: 19px;
    height: 22px;
  }
  .xd-tab-item .mint-tab-item-label, .xd-tab-item .mint-tab-item-icon{
    display: inline-block;
    font-size: 16px;
    letter-spacing: .2px;
  }
  .mint-navbar .mint-tab-item{
    color: #919191;
  }
  a{
    color: #000;
  }
  .block{
    margin: 5px 0;
    padding: 12px 15px;
    background-color: #fff;
  }
  .product-block{
    width: 100%;
    position: relative;
    box-sizing: border-box;
    margin-top: 10px;
    padding: 10px 15px;
    background-color: #fff;
    height: 112px;
  }
  .product-block:after {
    clear: both;
  }
  .product-block:after, .product-block:before {
    display: table;
    content: '';
  }
  .product-image,.product-detail{
    float: left;
    box-sizing: border-box;
  }
  .product-image img{
    border-radius: 5px;
  }
  .pop-menu{
    background-color: #fff;
    width: 110px;
    position: fixed;
    top: 60px;
    right: 5px;
    display: none;
    font-size: 14px;
  }
  .pop-menu li{
    text-align: center;
    padding: 15px 10px;
  }
  .pop-menu li:not(:last-child){
    border-bottom: 1px solid rgba(0, 0, 0, .2);
  }
  .pop-menu li span{
    opacity: 0.4;
    text-indent: 1em;
    padding-left: 5px;
  }
  .pop-menu li img{
    vertical-align: middle;
    width: auto;
    height: 15px;
  }
  .pop-menu .caret{
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    position: absolute;
    top: -5px;
    right: 12px;
    border-bottom: 6px solid #fff;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
  }
  .more-img{
    margin-left: 40px;
  }
  @media screen and (max-width: 320px) {
      .more-img{
        margin-left: 0px;
      }
  }

  /*.pop-menu .arrow:after{
    content: ' ';
    border-width: 6px;
    top: 1px;
    margin-left: -6px;
    border-top-width: 0;
    border-bottom-color: #fff
  }*/
  .search-body {
      height: 56px;
      background: white;
      overflow: hidden;
  }

  .search-body .search-div {
      height: 36px;
      width: 90%;
      margin: 10px 0 0 5%;
      border-radius: 5px;
      background: #eee;
  }

  .search-body .search-div .search-icon {
      float: left;
      width: 17px;
      height: 17px;
      margin: 10px 0 0 25%;
  }

  .search-body .search-div span {
      font-size: 14px;
      line-height: 36px;
      margin-left: 16px;
      color: #aaa;
  }

  .search-show-body {
      background: white;
      overflow: auto;
  }

  .search-show-body span {
      display: inline-block;
      float: left;
      color: rgb(57, 182, 254);
      font-size: 16px;
      line-height: 56px;
      margin-left: 10px;
  }

  .search {
      width: 80%;
      border-radius: 5px;
      height: 36px;
      margin: 12px 0 0 2%;
      background: #f1f1f1;
      float: left;
  }

  .search .search-icon {
      float: left;
      width: 17px;
      height: 17px;
      margin: 10px 0 0 17px;
  }

  .search input {
      margin: 0;
      padding: 0;
      vertical-align: middle;
      width: 70%;
      float: left;
      outline: none;
      font-size: 14px;
      border: 0;
      margin-left: 16px;
      color: #999;
      background: #f1f1f1;
      height: 36px;

  }

</style>

<script>
import { Navbar, TabItem, MessageBox, TabContainer, TabContainerItem, Toast } from 'mint-ui';
import XDTag from '@/components/tag.vue';
import XDLineIco from '@/components/line-ico.vue';
import XDTable from '@/components/table.vue';
/*const PressedLoadImg = */
import { mapGetters } from 'vuex'

require('@/lib/transition.min.js')

const orderListColumns = [{
  title: '客户姓名',
  dataIndex: 'consumer_name',
},{
  title: '产品名称',
  dataIndex: 'product_name'
},{
  title: '身份证后4位',
  dataIndex: 'id_card'
}
/*,{
  title: '备注',
  dataIndex: 'remark'
}*/
]

export default {
  data(){
    return {
      selectedNav: 'apply-loan',
      orderListColumns,
      isLogin: false,
      search_ing: false,
      search_value: '',
    }
  },
  computed: {
    ...mapGetters({
      orderList:'OrderList'
    })
  },
  components: {
    'mt-navbar': Navbar,
    'mt-tab-item': TabItem,
    'xd-tag': XDTag,
    'xd-line-ico': XDLineIco,
    'xd-table': XDTable,
    'mt-tab-container-item': TabContainerItem,
    'mt-tab-container': TabContainer
  },
  methods: {
    togglePopMenu(showflag){
      /*if(showflag){
        $('.pop-menu').show();
        $('.v-modal').show();
      }else{
        $('.pop-menu').hide();
        $('.v-modal').hide();
      }*/
      this.$router.push('/main');
    },
    goDetail(item){
      this.$router.push('/loan/order-detail/' + item.order_id)
    },
    getOrderList(parameters){
      this.$store.dispatch('getOrderList', { parameters })
        .fail( msg => {
          Toast({
            message: '浏览更多内容请登录',
            duration: 2000
          });
        })
    },
    goSearch(){
      this.search_ing = true;
    },
    exitSearch(){
      this.search_ing = false;
      this.search_value = "";
      this.getOrderList("");
    },
    searchAll(){
      this.getOrderList(this.search_value);
    },
    //判断是否为受邀
    checkIsInvited(){
        //主页分享到产品列表
        var query = this.$route.query||{};
        if(query.inner!="inner"){
            localStorage.removeItem("invite");
            localStorage.removeItem("invitename");
        }
        //如果有邀请码，则是邀请注册
        if(query.invite){
            this.invitecode = query.invite;
            this.inviteName = query.invitename;
            localStorage.setItem("invite",this.invitecode);
            localStorage.setItem("invitename",this.inviteName);
        }
    }
  },
  mounted(){
    this.getOrderList("");
    this.checkIsInvited();
  },
  beforeMount(){
    //先判断用户localStorage中是否存储有登录信息
    if(!sessionStorage.getItem('url')){
        if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
          sessionStorage.setItem('url',window.location.href)
        }
    }
    if(localStorage){
        var userinfo = JSON.parse(localStorage.getItem("userinfo")||"{}")||{};
        if(userinfo.token){
            this.isLogin = true;
        }else{
            this.isLogin = false;
        }
    }
  }
}
</script>
