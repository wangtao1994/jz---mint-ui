import Vue from 'vue';
import Router from 'vue-router';


import config from '@/config/app.config';

// require("./pages/usercenter/css/login.css");
// require("./pages/usercenter/css/rscu.css");
// require("./pages/usercenter/css/userinfo.css");
const routes = [
  {
    path: '/loan/product-list',
    name: 'productlist',
    component: resolve => require(['./pages/loan-center/product-list.vue'], resolve)
  },{
    path: '/loan/order-detail/:id',
    name: 'orderDetail',
    component: resolve => require(['./pages/loan-center/order-detail.vue'], resolve)
  },{
    path: '/loan/product-detail',
    name: 'productDetail',
    component: resolve => require(['./pages/loan-center/product-detail.vue'], resolve)
  },{
    path: '/loan/add-loan-guest/:flag',
    name: 'addLoanGuest',
    component: resolve => require(['./pages/loan-center/add-loan-guest.vue'], resolve)
  },{
    path: '/loan/add-loan-guest/:cid/:idcard/:cname/:province/:provincename/:city/:cityname',
    name: 'addLoanGuestParam',
    component: resolve => require(['./pages/loan-center/add-loan-guest.vue'], resolve)
  },{
    path: '/loan/guest-list',
    name: 'guestList',
    component: resolve => require(['./pages/loan-center/guest-list.vue'], resolve)
  },{
    path: '/loan/into-channel/:intochannel/:productid/:city',
    name: 'intoChannel',
    component: resolve => require(['./pages/loan-center/into-channel.vue'], resolve)
  },{
    path: '/loan/service-fee/:order_id',
    name: 'serviceFee',
    component: resolve => require(['./pages/loan-center/service-fee.vue'], resolve)
  },{
    path: '/loan/update-service-fee',
    name: 'updateServiceFee',
    component: resolve => require(['./pages/loan-center/update-service-fee.vue'], resolve)
  },{
    path: '/loan/guest-loan-order-detail/:order_id',
    name: 'guestLoanOrderDetail',
    component: resolve => require(['./pages/loan-center/guest-loan-order-detail.vue'], resolve)
  },{
    path: '/loan/authorize-page/:order_id',
    name: 'authorizePage',
    //修改为微信授权页面
    component: resolve => require(['./pages/loan-center/authorize-page.vue'], resolve)

  },{
    path: '/loan/pay-success/:fee_amount',
    name: 'paySuccess',
    component: resolve => require(['./pages/loan-center/pay-success.vue'], resolve),
  },{
    path: '/loan/service-fee-agreement',
    name: 'serviceFeeAgreement',
    component: resolve => require(['./pages/loan-center/service-fee-agreement.vue'],resolve),
  },{
    path: '/loan/apply-success',
    name: 'applySuccess',
    component: resolve => require(['./pages/loan-center/apply-success.vue'], resolve),
  },{
    path: '/card/card-home',
    component: resolve => require(['./pages/credit-card-center/card-home.vue'], resolve),
  },{
    path: '/card/charge-withdraw/:type',
    component: resolve => require(['./pages/credit-card-center/charge-withdraw.vue'], resolve),
  },{
    path: '/card/bind-card/:card_type',
    component: resolve => require(['./pages/credit-card-center/bind-card.vue'], resolve)
  },{
    path: '/card/success/:success_type',
    component: resolve => require(['./pages/credit-card-center/success.vue'], resolve)
  },{
    path: '/exhibition-index',
    name: 'exhibition',
    component: resolve => require(['./pages/exhibition-center/exhibition-index.vue'], resolve)
  },{
    path: '/addGuest',
    name: 'addGuest',
    component: resolve => require(['./pages/exhibition-center/add-guest.vue'], resolve)
  },{
    path: '/exhibitionDetail',
    name: 'exhibitionDetail',
    component: resolve => require(['./pages/exhibition-center/exhibition-detail.vue'], resolve)
  },{
    path: '/login',
    name: 'login',
    component: resolve => require(['./pages/usercenter/login.vue'], resolve)
  },{
    path: '/register',
    name: 'register',
    component: resolve => require(['./pages/usercenter/register.vue'], resolve)
  },{
    path: '/forget',
    name: 'forget',
    component: resolve => require(['./pages/usercenter/forget.vue'], resolve)
  },{
    path: '/agreement',
    name: 'agreement',
    component: resolve => require(['./pages/usercenter/agreement.vue'], resolve)
  },{
    path: '/rsuc',
    name: 'rsuc',
    component: resolve => require(['./pages/usercenter/rsuccess.vue'], resolve)
  },{
    path: '/accountqr',
    name: 'accountqr',
    component: resolve => require(['./pages/usercenter/accountqr.vue'], resolve)
  },{
    path: '/myachievement',
    name: 'myachievement',
    component: resolve => require(['./pages/usercenter/myachievement.vue'], resolve)
  },{
    path: '/achieverecord',
    name: 'achieverecord',
    component: resolve => require(['./pages/usercenter/achieverecord.vue'], resolve)
  },{
    path: '/setting',
    name: 'setting',
    component: resolve => require(['./pages/usercenter/setting.vue'], resolve)
  },{
    path: '/userinfo',
    name: 'userinfo',
    component: resolve => require(['./pages/usercenter/userinfo.vue'], resolve)
  },{
    path: '/pwdreset',
    name: 'pwdreset',
    component: resolve => require(['./pages/usercenter/pwdreset.vue'], resolve)
  },{
    path: '/editbankinfo',
    name: 'editbankinfo',
    component: resolve => require(['./pages/usercenter/editbankinfo.vue'], resolve)
  },{
    path: '/coagent',
    name: 'coagent',
    component: resolve => require(['./pages/usercenter/coagent.vue'], resolve)
  },{
    path: '/myincome',
    name: 'myincome',
    component: resolve => require(['./pages/usercenter/myincome.vue'], resolve)
  },{
    path: '/incomedetail',
    name: 'incomedetail',
    component: resolve => require(['./pages/usercenter/incomedetail.vue'], resolve)
  },{
    path: '/manageincomedetail',
    name: 'manageincomedetail',
    component: resolve => require(['./pages/usercenter/manageincomedetail.vue'], resolve)
  },{
    path: '/usercenter',
    name: 'usercenter',
    component: resolve => require(['./pages/usercenter/usercenter.vue'], resolve)
  },{
    path: '/main',
    name: 'main',
    component: resolve => require(['./pages/usercenter/index.vue'], resolve),
  },{//新项目的开始-注册
    path: '/newregister',
    name: 'newregister',
    component: resolve => require(['./pages/new-usercenter/new-register.vue'], resolve),
  },{//新项目的开始-注册成功
    path: '/register-success',
    name: 'register-success',
    component: resolve => require(['./pages/new-usercenter/register-success.vue'], resolve),
  },{//新项目的开始-登陆
    path: '/newlogin',
    name: 'newlogin',
    component: resolve => require(['./pages/new-usercenter/newlogin.vue'], resolve),
  },{//新项目的开始-登陆
    path: '/login_agent',
    name: 'login_agent',
    component: resolve => require(['./pages/new-usercenter/login_agent.vue'], resolve),
  },{//新项目的开始-忘记密码
    path: '/new_forget',
    name: 'new_forget',
    component: resolve => require(['./pages/new-usercenter/new_forget.vue'], resolve),
  },{//新项目的开始-客户信息
    path: '/customer_information',
    name: 'customer_information',
    component: resolve => require(['./pages/customer-infor/customer_information.vue'], resolve),
  },{//新项目的开始-我的佣金
    path: '/my_commission',
    name: 'my_commission',
    component: resolve => require(['./pages/my-commission/my_commission.vue'], resolve),
  },{//新项目的开始-我的佣金列表
    path: '/commission_list',
    name: 'commission_list',
    component: resolve => require(['./pages/my-commission/commission_list.vue'], resolve),
  },{//新项目的开始-我的佣金列表
    path: '/commission_detail/:id',
    name: 'commission_detail',
    component: resolve => require(['./pages/my-commission/commission_detail.vue'], resolve),
  }
]

Vue.use(Router);

const router = new Router({
  mode: config.routerMode,
  routes,
})

export default router;
