
import { dateFormatUTC } from '@/utils/utils.js';
export default {
  exhibitionDetail(state, data){
    state.exhibition.exhibitionDetail = data
  },
  getOrderDetail(state, data){
    var formData = data;
    formData.create_time = dateFormatUTC(new Date(formData.create_time), 'yyyy-MM-dd hh:mm:ss');
    state.loanCenter.orderDetail = formData;
  },
  getOrderList(state, data){
    state.loanCenter.orderList = data;
    state.loanCenter.orderCount = data.length ? data[0].total_orders : 0;
  },
  getGuestList(state, data){
    state.loanCenter.guestList = data;
  },
  chooseGuest(state, data){
    state.loanCenter.loanGuestInfo = { ...state.loanCenter.loanGuestInfo, ...data };
  },
  getProvinceList(state, data){
    state.loanCenter.area.provinceList = data;
  },
  getCityList(state, data){
    state.loanCenter.area.cityList = data;
  },
  getLoanOrderInfo(state, data){
    var data = data;
    try{
      data.fee_amount = parseFloat(data.fee_amount).toFixed(2);
      data.service_fee_rate = parseFloat(data.service_fee_rate).toFixed(2);
    }catch(e){

    }
    state.loanCenter.loanOrderInfo = data;
  },
  getWxUserOpenid(state, data){
    state.wxUserInfo = data;
  },
  
  
  //新
  newcommitdetail(state,data){
  	debugger;
  	var newformData = data;
    newformData.create_time = dateFormatUTC(new Date(newformData.create_time), 'yyyy-MM-dd');
  	state.loanCenter.newcommitdetail = newformData;
  	debugger;
  }
  
  
  
  
  
  
}