
export default {
  exhibitionDetail(state){
    return state.exhibition.exhibitionDetail
  },
  OrderList(state){
    return { orderList: state.loanCenter.orderList, orderCount: state.loanCenter.orderCount }
  },
  OrderDetail(state){
    return state.loanCenter.orderDetail;
  },
  GuestList(state){
    return state.loanCenter.guestList;
  },
  GuestListOptions(state){
    return state.loanCenter.guestListOptions;
  },
  area(state){
    return state.loanCenter.area;
  },
  loanOrderInfo(state){
    return state.loanCenter.loanOrderInfo;
  },
  wxUserInfo(state){
    return state.wxUserInfo;
  },
  
  //新  
  newcommitdetail(state){
  	 return state.loanCenter.newcommitdetail;
  }
}