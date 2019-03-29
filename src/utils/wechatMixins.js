import wx from 'weixin-js-sdk';

export default {
  data() {
    return {}
  },
  methods: {
    wxShare(shareObj, data, callBack) {//微信分享
      wx.config({
        debug: false,
        appId: data.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature,// 必填，签名，见附录1
        //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
        jsApiList: [
          'checkJsApi',
          'onMenuShareAppMessage',
          'onMenuShareTimeline',
          'onMenuShareQQ',
          'onMenuShareQZone',
        ]
      });
      let obj = {
        title: shareObj.title,         // 分享标题
        desc: shareObj.ptSummary,      // 分享描述
        link: shareObj.link,           // 分享链接
        imgUrl: shareObj.mainImg,      // 分享图标
        success: function (res) {
          callBack()
        },
        fail: function (res) {
          alert( JSON.stringify(res));
          callBack()
        }
      }
      wx.ready(function () {
        wx.onMenuShareTimeline(obj);        //分享到朋友圈
        wx.onMenuShareAppMessage(obj);      //分享给朋友
        wx.onMenuShareQQ(obj);              //分享到QQ
        wx.onMenuShareQZone(obj);           //分享到QQ空间
      });

    },

  },
  created: function () {
    //this.getWxJsSdk(this.wxShare(shareObj));//调用方式
  },
  mounted: function () {
  }
}
