<template>
  <div class="bg-gray">
    <div class="top-header">
      <div style="height: 100%;text-align: center;">
        <span style="line-height: 160px;font-size: 16px;">余额：</span>
        <span style="font-size: 28px;">0元</span>
      </div>
    </div>
    <div class="functions-wrap">
      <router-link to="/card/charge-withdraw/charge">
        <div class="function">
          <div class="function-name">
            <img src="@/images/icon/IOS/content_icon_setting@3x.png" />
            <span>充值</span>
          </div>
          <div class="right-logo" >
              <img src="@/images/icon/IOS/content_icon_more_6@3x.png" />
          </div>
        </div>
      </router-link>
      <router-link to="/card/charge-withdraw/withdraw">
        <div class="function">
          <div class="function-name">
            <img src="@/images/icon/IOS/content_icon_setting@3x.png" />
            <span>提现</span>
          </div>
          <div class="right-logo" >
              <img src="@/images/icon/IOS/content_icon_more_6@3x.png" />
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<style scoped>
  .top-header{
    min-height: 160px;
    background-color: #26a2ff;
    color: #fff;
  }
  .user-header-layer{
      margin-top:-1px;
  }
  .function-name{
      padding : 10px 5px;
  }

  
  /********************媒体查询begin**********************/
  @media (max-width: 360px) {
      .functions-wrap .function .function-name{
          line-height:15px;
          font-size:16px;
      }
      .functions-wrap .function .right-logo{
          line-height:45px;
      }
  }
  /********************媒体查询end**********************/
</style>
<script>
  export default {
    methods: {
      //充值
    }
  }
</script>