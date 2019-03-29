<template>
  <div class="container" style="background-color: #fff;min-height: 100vh;padding-bottom:60px;">
    <!-- <div class="header-block f-m">
      <xd-line-ico lineText="平安银行“新一贷”贷款申请进件流程如下："/>

    </div> -->
    <div class="attr-title" style="padding-top: 20px;">
      <img style="width: 10px;height:10px;" src="@/images/icon/IOS/content_icon_small_point@3x.png"/>
      <span class="title-name">平安银行“新一贷”贷款申请进件流程如下：</span>
    </div>
    <div class="attr-detail propic">
      <div class="apply-flow-guide img">
        <ul>
          <li class="apply-flow guest-info-fill">
            <div class="img">
              <img v-if="intochannel === 1" src="@/images/icon/IOS/content_icon_online.png" />
              <img v-else src="@/images/icon/IOS/content_icon_personal_information.png" />
            </div>
          </li>
          <li class="arrow arrow-left">
            <div class="img">
              <img src="@/images/icon/IOS/content_icon_arrow_2.png"/>
            </div>
          </li>
          <li class="apply-flow guest-pay">
            <div class="img">
              <img v-if="intochannel === 1" src="@/images/icon/IOS/content_icon_personal_information.png" />
              <img v-else src="@/images/icon/IOS/content_icon_call.png" />
            </div>
          </li>
          <li class="arrow arrow-left">
            <div class="img">
              <img src="@/images/icon/IOS/content_icon_arrow_2.png"/>
            </div>
          </li>
          <li class="apply-flow submit-form">
            <div class="img">
              <img src="@/images/icon/IOS/content_icon_apply_face_to_face.png" />
            </div>
          </li>
        </ul>
      </div>
      <div class="apply-flow-guide">
        <ul v-if="intochannel === 1">
          <li class="text-flow">
            <div class="text">1.线上申请</div>
          </li>
          <li class="text-flow">
            <div class="text">2.准备资料</div>
          </li>
          <li class="text-flow">
            <div class="text">3.面签</div>
          </li>
        </ul>
        <ul v-else>
          <li class="text-flow">
            <div class="text">1.准备资料</div>
          </li>
          <li class="text-flow">
            <div class="text">2.预约</div>
          </li>
          <li class="text-flow">
            <div class="text">3.面签</div>
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
          <!-- <li class="arrow arrow-right">
            <div class="img">
              <img src="@/images/icon/IOS/content_icon_arrow_2.png"/>
            </div>
          </li>
          <li class="apply-flow guest-info-fill">
            <div class="img">
              <img src="@/images/icon/IOS/content_icon_apply.png" />
            </div>
          </li> -->
          <li class="arrow">
            <div class="img">
              <img src="@/images/icon/IOS/content_icon_arrow_5.png" style="width: 200px;" />
            </div>
          </li>
          <li class="apply-flow guest-info-fill">
            <div class="img">
              <img src="@/images/icon/IOS/content_icon_imsge_searc_2.png" />
            </div>
          </li>
        </ul>
      </div>
      <div class="apply-flow-guide">
        <ul>
          <li class="text-flow">
            <div class="text">5.放款</div>
          </li>
          <li class="text-flow">
            <div class="text"></div>
          </li>
          <li class="text-flow">
            <div class="text">4.审核</div>
          </li>
        </ul>
      </div>
      
    </div>
    <template v-if="intochannel === 0">
      <div class="attr-title" style="margin-top: 20px;">
        <img style="width: 10px;height:10px;" src="@/images/icon/IOS/content_icon_small_point@3x.png"/>
        <span class="title-name">需要准备如下资料：</span>
      </div>
      <div class="attr-detail" style="padding-left: 25px;color:#000;">
        <p>1.第二代身份证；</p>
        <p>2.收入证明，资产证明等；</p>
        <p>3.贷款用途证明等；</p>
        <p>4.企业经营材料（自雇人士适用）</p>
      </div>
      <div class="attr-title" style="margin-top: 20px;">
        <img style="width: 10px;height:10px;" src="@/images/icon/IOS/content_icon_small_point@3x.png"/>
        <span class="title-name">预约联系方式如下：</span>
      </div>
      <div class="attr-detail" style="padding-left: 25px;color:#000;flex-direction:unset;font-size:16px;">
        <span>{{bookname}}</span>
        <span style="margin-left: 10px;">{{bookmobile}}</span>
        <span style="margin-left: 10px;">{{bookpost}}</span>
      </div>
    </template>
    <div style="font-size: 14px; color: #919191;margin-left: 20px;margin-top: 20px;" >
      <input type="checkbox" v-model="copyorder" id="copyOrder"/><label for="copyOrder"> 是否选择操单服务</label>
    </div>
    <div class="instruction-block" v-if="copyorder">
      <p class="f-m" style="font-size: 14px;color: #919191;">
        <img style="vertical-align: middle;width: 21px;height: 21px;" src="@/images/icon/IOS/content_icon_finished@3x.png" />
      您已选择操单服务，操单客服联系方式如下：</p>
      <p class="f-l" style="font-size: 14px;color: #919191;margin-top: 10px;"><span>联系人：</span><span>{{contactname}}</span><span style="margin-left: 5px;">{{contactmobile}}</span></p>
      <p class="f-r" style="font-size: 12px;color: rgb(255,166,28);margin-top: 10px;">温馨提示：为了便于操单的服务，请关注公众号“金证金服”</p>
    </div>
    <template v-if="intochannel ===  1">
      <mt-button type="primary" class="submit-btn" style="margin-top: 60px;" @click="submit">下一步</mt-button>
      <p class="f-r remark" style="color: #919191;font-size:12px;text-align:center;margin-top: 20px;">点击“下一步”’，将自动跳转到平安银行新一贷申请贷款的页面。</p>
    </template>
    <template v-else>
    <mt-button type="primary" :disabled="submit_ing" class="submit-btn" style="margin-top: 60px;" @click="submit">完成</mt-button>
    </template>
  </div>
</template>
<style>
  .attr-title{
    padding-left: 20px;
  }
  .attr-detail{
    color: #919191;
    margin-top: 10px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
  }
  .product-title{
    text-align: center;
    font-size: 18px;
  }
  .product-title img{
    vertical-align: middle;
  }
  .propic{
    padding: 16px 10px;
    color: #39B6FE;
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
  .vt-arrow img{
    float: right;
    width: 42px;
    margin-right: 35px;
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
    margin-left: 15px;
  }
  .submit-btn{
    width: 80%;
    margin: 40px auto 20px auto;
    display: block;
  }
  .instruction-block{
    padding: 10px 20px;
  }
  .apply-flow-guide.img{
    padding: 0px 20px;
  }
  @media screen and (min-width: 400px) {
    .apply-flow-guide.img{
      padding: 0px 40px;
    }
    .vt-arrow img{
      margin-right: 55px;
    }
  }
  @media screen and (max-width: 320px) {
    .apply-flow-guide.img{
      padding: 0px;
    }
    .vt-arrow img{
      margin-right: 0px;
    }
    .apply-flow-guide>ul .text-flow:first-child{
      text-align: left;
    }
    .apply-flow-guide>ul .text-flow:last-child{
      text-align: right;
    }
    .remark{
      padding: 0 20px;
      text-align: left;
    }
  }
</style>
<script>
  import XDLineIco from '@/components/line-ico.vue';
  import { Button, Toast } from 'mint-ui';
  export default {
    data(){
      return {
        copyorder: 0, //1操单 0不操单
        productid: 1,
        intochannel: 0,
        contactname: '',
        contactmobile: '',

        bookname: '',
        bookmobile: '',
        bookpost: '',

        submit_ing: false,
      }
    },
    components: {
      'xd-line-ico': XDLineIco,
      'mt-button': Button
    },
    beforeMount(){
      this.copyorder = this.$route.params.copyorder;
      var city = parseInt(this.$route.params.city);
      var productid = parseInt(this.$route.params.productid);
      this.intochannel = parseInt(this.$route.params.intochannel);
      var userinfo = {}
      try{
          userinfo = JSON.parse(localStorage.userinfo||"{}")||{};

      }catch(e){
      }
      this.$store.dispatch('getIntoChannelInfo', {city, product_id: productid, user_name: userinfo.user_name})
        .done( data => {
          this.contactname = data[0].cb_name;
          this.contactmobile = data[0].cb_mobile;
          this.bookname = data[0].into_contact;
          this.bookmobile = data[0].it_contact_mobile;
          this.bookpost = data[0].contact_post;
        })
        .fail( msg => {
          Toast({
            message: msg,
            duration: 2000
          })
        })
    },
    methods: {
      updateLoanOrder(e){
        var order_id = sessionStorage.getItem('order_id');
        return this.$store.dispatch('updateLoanOrder', { order_id, is_cp: this.copyorder ? 1 : 0})
          .fail( msg => {
            Toast({
              message: msg,
              duration: 2000
            })
          })
      },
      submit(){
        var self = this;
        this.submit_ing = true;
        this.updateLoanOrder()
          .done( () => {
            self.submit_ing = false;
            try{
              if(self.intochannel === 1){
                var cname = sessionStorage.getItem('xd_cname');
                window.location.href = 'https://b.pingan.com.cn/station/activity/loan/newloan/loantrust.html?source=sa0000451&outerSource=jzwechat005&username=' + encodeURIComponent(cname)
              }else{
                self.$router.push('/loan/apply-success');
              }
            }catch(e){
            }
          })
          .fail( () => {
            self.submit_ing = false
          })
      }
    }
  }
</script>