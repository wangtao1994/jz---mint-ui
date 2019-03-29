import config from '../config/app.config'
import { post } from '@/utils/request'

const domain = config.ajax;
/*****贷款中心******/
//
export const getOrderDetail = ({commit}, params) => {
  return post(domain, 'app', 'cd_debt_order_detail_qry', params)
    .done( data => {
      commit('getOrderDetail', data);
    })

  //直接在orderList中取数据
  /*commit('getOrderDetail', params);*/
}

export const getOrderList = ({commit}, params) => {
  return post(domain, 'app', 'cd_debate_order_qry', params)
    .done( data => {
      commit('getOrderList', data);
    })
}

export const getGuestList = ({commit}, params) => {
  return post(domain, 'app', 'cd_my_consumer_qry', params)
    .done( data => {
      commit('getGuestList', data)
    })
}



export const goDetail = ({commit}, data) => {
  commit('exhibitionDetail',data);
}

export const chooseGuest = ({commit}, data ) => {
  commit('chooseGuest', data);
}

export const getProvinceList = ({commit}, data) => {
  return post(domain, 'app', 'cd_province_qry', data)
    .done( data => {
      commit('getProvinceList', data)
    })
}

export const getCityList = ({commit}, data) => {
  return post(domain, 'app', 'cd_city_qry', data)
    .done( data => {
      commit('getCityList', data)
    })
}


// 展业中心
export const getGuestLists = ({commit}, data) => {
  return post(domain, 'app', 'cd_my_consumer_qry', data)

}

export const getAgentList = ({commit}, data) => {
  return post(domain, 'app', 'cd_my_brokers_qry', data)

}

export const getChannelList = ({commit}, data) => {
  return post(domain, 'app', 'cd_channel_buss_qry', data)

}


export const getPovinceName = ({commit}, data) => {
  return post(domain, 'app', 'cd_province_qry', data)

}
export const getCityName = ({commit}, data) => {
  return post(domain, 'app', 'cd_city_qry', data)

}

export const addGuest = ({commit}, data) => {
  return post(domain, 'app', 'cd_add_consumer', data)
}

//获取贷款订单信息(客户页面)
export const getLoanOrderInfo = ({commit}, data) => {
  return post(domain, 'app', 'cd_order_info_qry', data)
    .done( data => {
      commit('getLoanOrderInfo', data)
    })
}

//申请贷款
export const applyLoan = ({commit}, data) => {
  return post(domain, 'app', 'cd_loan_apply', data)
}

//获取产品服务费费率
export const getProductFeeRate = ({commit}, data) => {
  return post(domain, 'app', 'cd_product_fee_qry', data)
}

//更新订单操单
export const updateLoanOrder = ({commit}, data) => {
  return post(domain, 'app', 'cd_edit_order_is_copybill', data)
}

//进件指导查询
export const getIntoChannelInfo = ({commit}, data) => {
  return post(domain, 'app', 'cd_into_guideline_qry', data)
}

//微信授权
export const wxAuthorize = ({commit}, data) => {
  return post(domain, 'api', 'wx_pay_auth', data)
}

//获取用户的openid
export const getWxUserOpenid = ({commit}, data) => {
  return post(domain, 'api', 'wx_pay_openid', data)
    .done( data => {
      commit('getWxUserOpenid', data);
    })
}

//微信预付单
export const wxPrePay = ({commit}, data) => {
  return post(domain, 'api', 'wx_pay_prepaid', data)
}

//微信支付
/*export const */

export const wxShare = ({commit}, data) => {
  return post(domain, 'api', 'wx_share', data)
}

//更新订单状态，已支付--->提交申请
export const updateOrderStatus = ({commit}, data) => {
  return post(domain, 'app', 'cd_order_status_update', data)
}


//2018-5-17新一通

export const newaddGuest = ({commit}, data) => {
  return post(domain, 'app', 'cd_add_consumer', data)
}

export const newapplyLoan = ({commit}, data) => {
  return post(domain, 'app', 'cd_loan_apply', data)
}


export const newcommitdetail = ({commit}, params) => {
  return post(domain, 'app', 'cd_my_income_detail_for_order', params)
    .done( data => {
      commit('newcommitdetail', data);
    })  
}
