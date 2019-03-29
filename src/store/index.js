import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
	userInfo: '',
	videoData:null,
  restaurantNameData:null,
	meCommentDatas:null,
  addressData:null,
  orderDayData:null,
  OrderRestaurantNameData:null,
  carData:null,
  orderDetailData:null,
  dishesData:null,
  orderRecordData:null
}

export default new Vuex.Store({
	state,
	actions,
	mutations
})
