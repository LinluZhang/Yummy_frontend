export default {
	createUser ({commit},user) {
		commit('ADD_USER',user)
	},
	initVideoData ({commit},data) {
		commit('INIT_VDIEO_DATA',data)
	},
  initDishesData ({commit},data) {
    commit('INIT_DISHES_DATA',data)
  },
  initRestaurantNameData ({commit},data) {
    commit('INIT_RESTAURANTNAME_DATA',data)
  },
	initMeCommentData ({commit},data) {
		commit('INIT_COMMENT_DATA',data)
	},
  initAddressData({commit},data){
	  commit('INIT_ADDRESS_DATA', data)
  },
  initOrderDayData({commit},data){
    commit('INIT_ORDERDAY_DATA', data)
  },
  initOrderRestaurantNameData({commit},data){
    commit('INIT_ORDERRESTAURANTNAME_DATA', data)
  },
  initOrderDetailData({commit},data){
    commit('INIT_ORDERDETAIL_DATA', data)
  },
  initCarData({commit},data){
    commit('INIT_CAR_DATA', data)
  },
  initOrderRecordData({commit},data){
    commit('INIT_ORDERRECORD_DATA', data)
  }
}
