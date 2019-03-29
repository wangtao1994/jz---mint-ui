export default {
  routerMode: process.env.NODE_ENV == 'production' ? 'history' : 'hash',
  ajax: process.env.NODE_ENV == 'production' ? 'https://jzjf-t.kingdomfax.com/kiop-privilege-management' : 'https://jzjf-t.kingdomfax.com/kiop-privilege-management',
  productInfo: {
    name: '平安新一贷',
    feeRate: 0,
    productId: 1,
  },
  wxConfig: {
    appId: "wx2581dd9848dc15ba", // 和获取Ticke的必须一样------必填，公众号的唯一标识
    timestamp: "1520853377632", // 必填，生成签名的时间戳
    nonceStr: "e8c0653fea13f91bf3c48159f7c24f78", // 必填，生成签名的随机串
    signature: "84DA98CB4B7DD2332D5BCE0E61B4B7E1",// 必填，签名，见附录1
  },
  into_channel: [{ value: 0, text: '线下进件'}, {value: 1, text: '线上进件'}],
  order_status: [{ value: 0, text: '填写申请'},
                  { value: 1, text: '已填写服务费'},
                  { value: 2, text: '提交申请'},
                  { value: 3, text: '已放款'},
                  { value: 4, text: '已结算'}]
  }