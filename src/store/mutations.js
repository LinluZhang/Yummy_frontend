import * as type  from './mutation-types.js'

export default {
	[type.ADD_USER](state,user){
		state.userInfo = user.userName
	},
	[type.INIT_VDIEO_DATA](state,data){
		state.videoData = data['initVideoData']
	},
  [type.INIT_DISHES_DATA](state,data){
    state.dishesData = data['initDishesData']
  },
  [type.INIT_RESTAURANTNAME_DATA](state,data){
    state.restaurantNameData = data['initRestaurantNameData']
  },
  [type.INIT_ADDRESS_DATA](state,data){
    state.addressData = data['initAddressData']
  },
  [type.INIT_ORDERDAY_DATA](state,data){
    state.orderDayData = data['initOrderDayData']
  },
  [type.INIT_ORDERRESTAURANTNAME_DATA](state,data){
    state.orderRestaurantNameData = data['initOrderRestaurantNameData']
  },
  [type.INIT_ORDERDETAIL_DATA](state,data){
    state.orderDetailData = data['initOrderDetailData']
  },
  [type.INIT_CAR_DATA](state,data){
    state.carData = data['initCarData']
  },
	[type.INIT_COMMENT_DATA](state,data){
		state.meCommentDatas = {...state.meCommentDatas,...data}
	},
  [type.INIT_ORDERRECORD_DATA](state,data){
    state.orderRecordData = data['initOrderRecordData']
  },
}
