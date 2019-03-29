<template>
  <div class="container">
    <div class="header-block f-m" style="margin-top: 0;">
      <xd-line-ico lineText="产品详情"/>
    </div>
    <div class="product-info-wrapper">
      <div class="product-info">
        <div class="attr-block product-title f-s " style="padding: 15px 20px;">
          <img src="@/images/icon/IOS/content_icon_pingan_logo_2@3x.png" style="width: 40px;height: 40px;" />
          平安新一贷
        </div>
        <div class="attr-block">
          <xd-tag text="返佣高"/>
          <xd-tag text="可代收"/>
          <xd-tag text="可操单"/>
        </div>
        <div class="attr-block">
          <div class="attr-title">
            <img style="width: 10px;height:10px;" src="@/images/icon/IOS/content_icon_small_point@3x.png"/>
            <span class="title-name">产品特点</span>
          </div>
          <div class="attr-detail">
            额度高达50万，无需抵押，无需担保，放款快(资料齐全，快至1天放款)，利率低(月利率1.1%起)，还款灵活(支持12/24/36/48个月还款)。
          </div>
        </div>
        <div class="attr-block">
          <div class="attr-title">
            <img style="width: 10px;height:10px;" src="@/images/icon/IOS/content_icon_small_point@3x.png"/>
            <span class="title-name">申请条件</span>
          </div>
          <div class="attr-detail">
            <p>1.具有完全民事行为能力的中国公民,并持有二代身份证;</p>
            <p>2.年龄23周岁(含）~55周岁(含) ;</p>
            <p>3.月平均收入4000元及以上(一线城市不低于5000元);</p>
            <p>4.平安银行要求的其它条件。</p>
          </div>
        </div>
        <div :class="['attr-block', showApplyFlow? 'attr-block-visible' : '']" style="padding-left:0px;padding-right:0px;">
          <div class="attr-title" style="padding-left: 20px;">
            <img style="width: 10px;height:10px;" src="@/images/icon/IOS/content_icon_small_point@3x.png"/>
            <span class="title-name">申请流程</span>
            <span v-if="!showApplyFlow" class="show-btn" @click="showApplyFlow=!showApplyFlow;">
              <a href="javascript:;">点击查看申请流程
                <img src="@/images/icon/IOS/content_icon_more_5.png" />
              </a>
            </span>
            <span v-else class="show-btn" @click="showApplyFlow=!showApplyFlow;">
              <a href="javascript:;">点击收起
                <img src="@/images/icon/IOS/content_icon_more_4.png" />
              </a>
            </span>
          </div>
          <div class="attr-detail propic" v-show="showApplyFlow">
            <div class="apply-flow-guide img">
              <ul>
                <li class="apply-flow guest-info-fill">
                  <div class="img">
                    <img src="@/images/icon/IOS/content_icon_write.png" />
                  </div>
                </li>
                <li class="arrow arrow-left">
                  <div class="img">
                    <img src="@/images/icon/IOS/content_icon_arrow_2.png"/>
                  </div>
                </li>
                <li class="apply-flow guest-pay">
                  <div class="img">
                    <img src="@/images/icon/IOS/content_icon_get_cash.png" />
                  </div>
                </li>
                <li class="arrow arrow-left">
                  <div class="img">
                    <img src="@/images/icon/IOS/content_icon_arrow_2.png"/>
                  </div>
                </li>
                <li class="apply-flow submit-form">
                  <div class="img">
                    <img src="@/images/icon/IOS/content_icon_imsge_submits.png" />
                  </div>
                </li>
              </ul>
            </div>
            <div class="apply-flow-guide">
              <ul>
                <li class="text-flow">
                  <div class="text">1.填写客户资料</div>
                </li>
                <li class="text-flow">
                  <div class="text">2.客户支付服务费订金</div>
                </li>
                <li class="text-flow">
                  <div class="text">3.提交申请</div>
                </li>
              </ul>
            </div>
            <div class="apply-flow-guide">
              <div class="vt-arrow">
                <img src="@/images/icon/IOS/content_icon_arrow_1.png"/>
              </div>
            </div>
            <div class="apply-flow-guide img">
              <ul>
                <li class="apply-flow guest-info-fill">
                  <div class="img">
                    <img src="@/images/icon/IOS/content_icon_apply.png" />
                  </div>
                </li>
                <li class="arrow arrow-right">
                  <div class="img">
                    <img src="@/images/icon/IOS/content_icon_arrow_2.png"/>
                  </div>
                </li>
                <li class="apply-flow guest-info-fill">
                  <div class="img">
                    <img src="@/images/icon/IOS/content_icon_imsge_searc_2.png" />
                  </div>
                </li>
                <li class="arrow arrow-right">
                  <div class="img">
                    <img src="@/images/icon/IOS/content_icon_arrow_2.png"/>
                  </div>
                </li>
                <li class="apply-flow guest-info-fill">
                  <div class="img">
                    <img src="@/images/icon/IOS/content_icon_apply_face_to_face.png" />
                  </div>
                </li>
                </ul>
            </div>
            <div class="apply-flow-guide">
              <ul>
                <li class="text-flow">
                  <div class="text">6.放款</div>
                </li>
                <li class="text-flow">
                  <div class="text">5.审核</div>
                </li>
                <li class="text-flow">
                  <div class="text">4.面签</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="attr-block">
          <div class="attr-title">
            <img style="width: 10px;height:10px;" src="@/images/icon/IOS/content_icon_small_point@3x.png"/>
            <span class="title-name">所需资料</span>
          </div>
          <div class="attr-detail">
            <p>1.第二代身份证;</p>
            <p>2.收入证明、资产证明等;</p>
            <p>3.贷款用途证明等;</p>
            <p>4.企业经营材料等（自雇人士适用）</p>
          </div>
        </div>
        <div :class="['attr-block', showReward1 ? 'attr-block-visible' : '']" style="padding-left:0px;padding-right:0px;">
          <div class="attr-title" style="padding-left: 20px;padding-right: 10px;">
            <img style="width: 10px;height:10px;" src="@/images/icon/IOS/content_icon_small_point@3x.png"/>
            <span class="title-name">奖励规则</span>
          </div>
          <div class="attr-detail">
            <div style="padding-left: 20px;padding-right: 20px;margin-top:10px;">
              <table border="1px solid #c2c2c2" style="text-align: center;" width="100%" height="90px">
                <tr>
                  <td></td>
                  <td colspan="2">您的收入（收入=贷款佣金+服务费订金）</td>
                </tr>
                <tr>
                  <td>收入类别</td>
                  <td>贷款佣金</td>
                  <td>服务费订金</td>
                </tr>
                <tr>
                  <td>奖励公式</td>
                  <td>贷款额*{{rateData.debate_commission_rate}}%</td>
                  <td style="font-size:10px;">客户实际支付服务费订金*{{rateData.csf_broker_rate}}%</td>
                </tr>
              </table>
            </div>
            <p style="margin-left: 20px;margin-top: 10px;">例如：{{'　　'}}
            <span v-if="!showReward1" class="show-btn" @click="showReward1=!showReward1;">
              <a href="javascript:;">点击展开更多
                <img src="@/images/icon/IOS/content_icon_more_5.png" />
              </a>
            </span>
            <span v-else class="show-btn" @click="showReward1=!showReward1;">
              <a href="javascript:;">点击收起
                <img src="@/images/icon/IOS/content_icon_more_4.png" />
              </a>
            </span>
            </p>
            <div v-show="showReward1" class="propic" style="color: #919191;margin-top: 10px;">
              您的客户贷款额（放款额）是50万，实际支付服务费订金是{{service_fee_amount}}元，您的收入是{{income_amount}}元（50万*{{rateData.debate_commission_rate}}%+{{service_fee_amount}}*{{rateData.csf_broker_rate}}%={{income_amount}}元）。
如您的推荐人等级是合伙经纪人，您的推荐人也有额外的奖励，具体如下：

            </div>
            </div>
        </div>
        <div :class="['attr-block', showReward2 ? 'attr-block-visible' : '']"style="padding-left:0px;padding-right:0px;">
          <div class="attr-detail" style="margin-top: 0px;">
            <div style="padding-left: 20px;padding-right: 20px;">
              <table border="1px solid #c2c2c2" style="text-align: center;width: 100%;height:90px;">
                <tr>
                  <td></td>
                  <td colspan="2">您的推荐人的收入（等级为合伙经纪人）</td>
                </tr>
                <tr>
                  <td>收入类别</td>
                  <td colspan="2">贷款管理佣金</td>
                </tr>
                <tr>
                  <td>奖励公式</td>
                  <td colspan="2">贷款额*{{rateData.manage_commission_rate}}%</td>
                </tr>
              </table>
            </div>
            <p style="margin-left: 20px;margin-top: 10px;">例如：{{'　　'}}
            <span v-if="!showReward2" class="show-btn" @click="showReward2=!showReward2;">
              <a href="javascript:;">点击展开更多
                <img src="@/images/icon/IOS/content_icon_more_5.png" />
              </a>
            </span>
            <span v-else class="show-btn" @click="showReward2=!showReward2;">
              <a href="javascript:;">点击收起
                <img src="@/images/icon/IOS/content_icon_more_4.png" />
              </a>
            </span>
            </p>
            <div v-show="showReward2" class="propic" style="color: #919191;margin-top: 10px;">
              您的客户贷款额（放款额）是50万，您的推荐人收入是{{broker_income_amount}}元（50万*{{rateData.manage_commission_rate}}%={{broker_income_amount}}元）。

            </div>
          </div>
        </div>
        <div class="attr-block">
          <div style="font-size: 12px;color:#000;">
            备注：贷款管理佣金是平台额外给予合伙经纪人的奖励，只有成为合伙经纪人才享有此收入，如何升级为合伙经纪人，详见：【个人中心】-【合伙经纪人】。
          </div>
        </div>
        <div style="margin-top: 38px; margin-bottom: 52px;text-align:center;">
          <mt-button @click="nextPage" type="primary" style="width: 60%;">申请贷款</mt-button>
          <mt-button style="background-color:rgb(255, 166, 28);color:#fff;" @click="shareFunc">分享</mt-button>
        </div>
        <div class="mask" v-if="maskShow" @click="exitMask">
            <img src="@/images/icon/IOS/finger-point.png" alt="">
            <div>点此分享给用户</div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
  .block{
    margin: 5px 0;
    padding: 12px 15px;
    background-color: #fff;
  }
  .product-info-wrapper{
    padding: 10px 0px 0 0px;
  }
  .product-info{
    width: 100%;
    background-color: #fff;
    padding-bottom: 10px;
  }
  .attr-block{
    padding: 10px 20px;
    border-bottom: 1px solid #f7f7f7;
  }
  .attr-block-visible{
    padding: 10px 0px 0px 0px;
  }
  .xd-tag{
    font-size: 16px;
    margin-right: 17px;
  }
  .attr-title{
    font-size: 16px;
  }
  .attr-title .title-name{
    margin-left: 5px;
  }
  .attr-detail{
    color: #919191;
    margin-top: 10px;
    font-size: 14px;
  }
  .product-title{
    text-align: center;
    font-size: 18px;
  }
  .product-title img{
    vertical-align: middle;
  }
  .apply-flow-guide.img{
    padding: 0px 10px;
  }
  .propic{
    background-color: #EAEAEA;
    padding: 10px 20px;
    color: #39B6FE;
  }
  .vt-arrow img{
    float: right;
    width: 42px;
    margin-right: 25px;
  }
  @media screen and (max-width: 320px) {
    .propic{
      padding: 10px;
    }
    .apply-flow-guide.img{
      padding: 0px 0px;
    }
    .vt-arrow img{
      margin-right: 0px
    }
  }
  .apply-flow-guide{

  }
  .apply-flow-guide li{
    display: inline-block;
    text-align: center;
    float: left;
  }
  li.text-flow{
    width: 33%;
  }
  li.arrow{
    margin-left: 5px;
    margin-right: 5px;
  }
  .arrow-right img{
    transform: rotateY(180deg);
  }
  .apply-flow-guide ul:after, .vt-arrow:after{
    clear: both;
    content: '';
    display: block;
  }
    .text{
    margin-top: 12px;
    font-size: 12px;
    margin-bottom: 12px;
  }
  .show-btn a{
    font-size: 12px;
    color: rgb(255, 166, 28);
    text-decoration: none;
  }
  .show-btn{
    margin-left: 33px;
  }
  .mask {
      width: 100%;
      height: 100vh;
      position: fixed;
      z-index: 99;
      background: black;
      opacity: 0.5;
      top: 0;
  }
  .mask img {
      width: 100px;
      float: right;
      margin-right: 9%;
  }

  .mask div {
      color: #fff;
      margin-top: 80px;
      text-align: center;
  }
  /*.guest-info-fill .img{
    background: url('@/images/icon/IOS/content_icon_small_point@3x.png');
    background-size: cover;
  }*/
</style>
<script>
import XDLineIco from '@/components/line-ico.vue';
import XDTag from '@/components/tag.vue';
import { Button, Toast } from 'mint-ui';
import config from '@/config/app.config';
import wxConfig from '@/utils/wechatMixins';
var productImg = require('@/images/product.jpg');
var clone = require('clone');

export default {
  data(){
    return {
      productInfo: config.productInfo,
      showApplyFlow: false,
      showReward1: false,
      showReward2: false,
      maskShow: false,

      rateData: {
        consumer_service_fee_rate: 0,
        csf_broker_rate: 0,
        debate_commission_rate: 0,
        manage_commission_rate: 0,
      },
      service_fee_amount: 0,
      income_amount: 0,
      broker_income_amount: 0,
    }
  },
  components: {
    'xd-line-ico': XDLineIco,
    'xd-tag': XDTag,
    'mt-button': Button,
  },
  mounted(){
    //将相关数据重置
    sessionStorage.removeItem('feeRate');
    var self = this;
    this.$store.dispatch('getProductFeeRate', {product_id: 1})
      .done( data => {
        data = clone(data);
        try{
          data.consumer_service_fee_rate = parseFloat(data.consumer_service_fee_rate).toFixed(2);
          data.csf_broker_rate = parseFloat(data.csf_broker_rate).toFixed(2);
          data.debate_commission_rate = parseFloat(data.debate_commission_rate).toFixed(2);
          data.manage_commission_rate = parseFloat(data.manage_commission_rate).toFixed(2);
          data.service_man_fee_rate = parseFloat(data.service_man_fee_rate).toFixed(2);
        }catch(e){
          Toast({
            message: e,
            duration: 2000
          })
        }
        //默认值从配置文件中去拿
        sessionStorage.setItem('feeRate', self.productInfo.feeRate);
        //2018-04-12修改，从后台获取的feeRate为最大值
        sessionStorage.setItem('maxFeeRate', data.consumer_service_fee_rate);
        self.rateData = data;
        self.service_fee_amount = 500000 * parseFloat(data.consumer_service_fee_rate) / 100;
        self.income_amount = 500000 * parseFloat( data.debate_commission_rate ) / 100 + self.service_fee_amount * data.csf_broker_rate / 100;
        self.broker_income_amount = 500000 * parseFloat( data.manage_commission_rate) / 100
      })
  },
  methods: {
    nextPage(){
      var userinfo = {}
      try{
          userinfo = JSON.parse(localStorage.userinfo||"{}")||{};

      }catch(e){
      }
      if(userinfo.token){
        this.$router.push('/loan/add-loan-guest/add')
      }else{
        this.$router.push('/login')
      }
    },
    shareFunc(){
      var that = this;
      let myUrl = '';
      if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
        //myUrl = window.sessionStorage.getItem('url').split('#')[0];
        //修改为首页url
        myUrl = 'https://' + window.location.host +  '/loan/product-list'
      } else {
        myUrl = window.location.href.split('#')[0];
      }
      /*myUrl = 'https://' + window.location.host + '/loan/service-fee/-1';*/
      return this.$store.dispatch('wxShare', {url: myUrl})
        .then(res => {
          that.maskShow = true;
          let shareObj = {
            title: "平安银行新一贷",
            ptSummary: '平安银行新一贷，贷款额度最高可达50万，快至一天放款，无抵押无担保，无手续费',
            link: 'https://' + window.location.host + '/product.jpg',
            mainImg: 'https://' + window.location.host  + '/kingdom.png'
          }
          // wxConfig.wxShare(shareObj)
          wxConfig.methods.wxShare(shareObj, res, function () {
            that.maskShow = false
          })
        }).fail(msg => {
        Toast({
          message: '获取分享信息失败',
          duration: 2000
        });
      })
    },
    exitMask() {
      this.maskShow = false
    },
  }
}
</script>