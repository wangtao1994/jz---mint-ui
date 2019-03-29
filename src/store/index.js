import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import getters from './getters'
import mutations from './mutations'
import * as actions from './actions'

const state = {
  exhibition:{
    exhibitionDetail:{},
    exhibitionColumns:[]
  },  
  loanCenter: {
    orderList: [],
    orderDetail: {},
    guestList: [],
    area: {},
    loanOrderInfo: {},
    newcommitdetail:{},
  },  
  loanGuestInfo: {
    
  },
  wxUserInfo: {
    
  }
}

export const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})








//理解
/*export const store = new Vuex.Store({
  state:{
  	  exhibition:{
		    exhibitionDetail:{},
		    exhibitionColumns:[]
  	},
  }
  getters:{
  	  exhibitionDetail(state){
    			return state.exhibition.exhibitionDetail
  		},
  }
  mutations:{
  	 exhibitionDetail(state, data){
    		state.exhibition.exhibitionDetail = data
  		},
  }
  actions{
  	getOrderDetail = ({commit}, params) => {
  		return post(domain, 'app', 'cd_debt_order_detail_qry', params)
    		.done( data => {
      	commit('exhibitionDetail', data);
    	}) 
		}  	
  }
  
})*/

//1.this.$store.state.openId = "111" 直接访问state。
 //2.getters
//getter里的函数就是vuex里的计算属性
/*computed: {
     ...mapGetters{
     		["exhibitionDetail"]     	
     }     
}*/

/*store.commit('exhibitionDetail')//直接提交mutations
actions通过commit来提交一个mutations(也就是exhibitionDetail)
store.dispatch('getOrderDetail')//在组件中也可以用dispatch触发actions来获取

*/