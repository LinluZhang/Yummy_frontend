import axios from 'axios'
//npm run export const url = 'http://vue.wclimb.site';
export const url = 'http://localhost:3000';
let $axios = axios.create({
  baseURL: url + '/vi/',
});
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function $fetch(method,url,data){
    return new Promise((reslove,reject)=>{
        $axios({
            method,
            url,
            data:data,
            headers:{
                token: getCookie('token')
            }
        }).then(res=>{
            let body = res.data
            if (body.code == 200 || body.code == 201) {
                reslove(body)
            }else{
                reject(body)
            }
        }).catch(err=>{
            reject(err)
        })

    })
}

//初始化用户的点餐记录
export const initOrderRecordData = (Email) => $fetch('post', 'orderRecord',{Email})

//初始化用户满足金额区间的点餐记录
export const initOrderRecordDataCashRange = (cashRange, Email) => $fetch('post', 'orderRecordCashRange',{cashRange,Email})

//初始化用户满足餐厅名称的点餐记录
export const initOrderRecordDataRestaurantName = (restaurantName, Email) => $fetch('post', 'orderRecordRestaurantName',{restaurantName,Email})

//初始化用户满足餐厅名称和金额区间的点餐记录
export const initOrderRecordDataRestaurantAndCashRange = (cashRange, restaurantName, Email) => $fetch('post', 'orderRecordCashRangeAndRestaurantName',{cashRange, restaurantName,Email})

//初始化用户满足日期的点餐记录
export const initOrderRecordDataOrderDay = (orderDay, Email) => $fetch('post', 'orderRecordOrderDay',{orderDay, Email})

//初始化用户满足日期和金额区间的点餐记录
export const initOrderRecordDataOrderDayAndCashRange = (cashRange, orderDay, Email) => $fetch('post', 'orderRecordOrderDayAndCashRange',{cashRange, orderDay, Email})

//初始化用户满足日期和餐厅名称的点餐记录
export const initOrderRecordDataOrderDayAndRestaurant = (orderDay, restaurantName, Email) => $fetch('post', 'orderRecordOrderDayAndRestaurantName',{ orderDay, restaurantName, Email})

//初始化用户满足日期，餐厅名称和金额区间的点餐记录
export const initOrderRecordDataOrderDayAndRestaurantNameAndCashRange = (cashRange, orderDay, restaurantName, Email) => $fetch('post', 'orderRecordOrderDayAndRestaurantNameAndCashRange',{cashRange,  orderDay, restaurantName, Email})

//初始化用户满足日期，餐厅名称和金额区间的退订记录
export const initBackOrderRecordDataOrderDayAndRestaurantNameAndCashRange = (cashRange, orderDay, restaurantName, Email) => $fetch('post', 'backOrderRecordOrderDayAndRestaurantNameAndCashRange',{cashRange,  orderDay, restaurantName, Email})

//初始化用户总消费
export const initConsumptionTotal = (Email) => $fetch('post', 'consumptionTotal',{Email})

//初始化用户的购物车
export const initCarData = (Email) => $fetch('post', 'car',{Email})

//初始化用户的取消订单列表
export const initCancelData = (Email) => $fetch('post', 'cancelOrderLists',{Email})

//初始化用户的待支付订单列表
export const initWaitingData = (Email) => $fetch('post', 'waitingOrderLists',{Email})

//初始化用户的已完成订单列表
export const initAlreadyData = (Email) => $fetch('post', 'alreadyOrderLists',{Email})

//初始化用户的配送中的订单列表
export const initSendingData = (Email) => $fetch('post', 'sendingOrderLists',{Email})

//初始化用户的退订订单列表
export const initBackData = (Email) => $fetch('post', 'backOrderLists',{Email})

//初始化用户的地址
export const initAddressData = (Email) => $fetch('post', 'addressLists',{Email})

//初始化用户的订单时间
export const initOrderDayListData = (Email) => $fetch('post', 'orderDayList',{Email})

//初始化用户的订单时间
export const initRestaurantNameListData = (Email) => $fetch('post', 'restaurantNameData',{Email})

//初始化订单详情
export const initOrderDetail = (orderId) => $fetch('post', 'orderDetail',{orderId})

// 首页初始化数据
export const initHome = () => $fetch('get', 'list')

// 初始化餐厅数据
export const initRestaurantDishLists = (restaurantId) => $fetch('post', 'restaurantDishLists', {restaurantId})

// 根据餐厅编号获取餐厅名称
export const getRestaurantNameById = (restaurantId) => $fetch('post', 'restaurantNameByRestaurantId', {restaurantId})

// 首页初始化餐厅名称数据
export const initRestaurantNameLists = () => $fetch('get', 'restaurantNameLists')

// 验证码
export const yzmChange = () => $fetch('get','getYzm')

// 登录
export const signin = (userName, password) => $fetch('post','signin', {userName,password})

  // 注册
export const signup = (email) => $fetch('post','signup', {email})

// 个人评论
export const meComment = (userName) => $fetch('post', 'getUserComment', {userName})

// 获取用户喜欢不喜欢数据
export const meLike = ( userName ) => $fetch('post','getUserLikeData',{userName})

// 删除评论---
export const meDelete = (commentId, userName) => $fetch('post','deleteComment',{userName,commentId})

// 获取用户个人信息---
export const findMobileUserByEmail = (Email) => $fetch('post','findMobileUserByEmail',{Email})

// 获取餐厅名称---
export const findRestaurantNameByDishIdAndDishName = (dishId, dishName) => $fetch('post','getRestaurantName',{dishId, dishName})

// 上传头像----
export const uploadAvator = ( userName , avator ) => $fetch('post','uploadAvator',{avator,userName})

// 获取头像
export const getAvator = (userName) => $fetch('post', 'getUserAvator' ,{userName})

// 编辑用户名
export const editNameData = ( oldName , newName) =>  $fetch('post','editUserName', {newName,userName: oldName})

// 编辑用户信息
export const editData = (Email,telephone,username,address) =>  $fetch('post','editUser', {Email,telephone,username,address})

// 编辑用户密码
export const editPassword = (Email,oldPassword,newPassword) =>  $fetch('post','editPassword', {Email,oldPassword,newPassword})

// 编辑用户余额
export const editBalance = (Email,balance) =>  $fetch('post','editBalance', {Email,balance})

// 注销用户
export const overUser = (Email) =>  $fetch('post','overUser', {Email})

// 搜索
export const search = ( val ) =>  $fetch('post','search', {val})

// 获取单个dish数据
export const singleDishData = (dishId) => $fetch('post','getDishById', {dishId})

// 获取评论
export const getDishComment = (dishId) => $fetch('post','getDishComment', {dishId})

// 初始化单个dish的like信息（判断用户当前的选项）
export const getInitDishLikeData = ( dishId , Email ) =>$fetch('post','getUserSingleLike',{dishId,Email})

// 提交用户选择like数据
export const postDishLikeData = (dishId, like, Email, restaurantName, dishName, dishImage, star) => $fetch('post', 'postUserLike', {like,Email,restaurantName, dishName,dishImage, star,dishId})

// 发表评论
export const reportComment = (Email, content, restaurantName, dishName, avatar, dishId) => $fetch('post', 'postComment', {Email, content, restaurantName, dishName, avatar, dishId})

// 添加购物车
export const orderDish = (username, restaurantName, dishID, dishName, price, discount,  image) => $fetch('post', 'postOrder', {username, restaurantName, dishID, dishName, price, discount,  image})

// 取消订单
export const cancelOrder = (orderId) => $fetch('post', 'cancelOrder', {orderId})

// 确认订单
export const confirmOrder = (totalPrice, orderTime, address, orderId) => $fetch('post', 'confirmOrder', {totalPrice, orderTime, address, orderId})

// 获取订单总价
export const getTotalPrice = ( orderId) => $fetch('post', 'orderTotalPrice', {orderId})

// 获取订单地址与送餐时间
export const findOrderAddressAndTime = ( orderId) => $fetch('post', 'orderAddressAndTime', {orderId})

// 获取订单确认时间
export const getOrderCashTime = ( orderId) => $fetch('post', 'orderCashTime', {orderId})

// 获取订单确认时间
export const getOrderSendingTime = ( orderId) => $fetch('post', 'orderSendingTime', {orderId})

// 自动取消订单
export const changeToCancel = ( orderId) => $fetch('post', 'changeToCancel', {orderId})

// 默认确认订单
export const changeToConfirm = ( orderId) => $fetch('post', 'changeToConfirm', {orderId})

// 获取用户级别
export const getUserLevel = (Email) => $fetch('post', 'getUserLevel', {Email})

// 确认支付
export const confirmPay = (orderId, Email, restaurantName, orderTime, address, totalPrice, discount) => $fetch('post', 'confirmPay', {orderId, Email, restaurantName, orderTime, address, totalPrice, discount})

// 全额退订
export const changeToBack= (orderId) => $fetch('post', 'changeToBack', {orderId})

// 退订订单，退款80%金额
export const changeBackAndReduceBalance= (orderId, backCash) => $fetch('post', 'changeBackAndReduceBalance', {orderId, backCash})

// 增加餐厅和经理的收入
export const addRestaurantAndManagerProfit= (restaurantName, totalPrice) => $fetch('post', 'addRestaurantAndManagerProfit', {restaurantName, totalPrice})





