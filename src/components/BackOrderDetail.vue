<template class="orderDetail">
<section @touchmove="scroll">
  <Loading :loading="loading" />
  <template v-if="lists">
    <header v-if="lists">
      <div @click="back" class="back">
        <i class="iconfont icon-logout23"></i>
        返回
      </div>
      <div class="wrap">
        <li  v-for="list in this.lists">
          <div >
            菜肴编号： {{list.dishID}}
          </div>
          <div>
            菜名： {{list.dishName}}
          </div>
          <template >
            <img   v-lazy="baseUrl+list.image" alt="">
          </template>
        </li>
      </div>
    </header>
  </template>
  <template>
    <main>
      <section class="user">
        <div class="input">
          <div class="address_title">
            <label>餐厅名称：{{restaurantName}}</label>
          </div>
          <div class="address_title">
            <label>收货人姓名：{{username}}</label>
          </div>
          <div class="address_title">
            <label>联系电话：{{telephone}}</label>
          </div>
          <div class="address_title">
            <label>送餐地址：{{sendAddress}}</label>
          </div>
        </div>
        <div class="address_title">
          <label>支付时间：{{payTime}}</label>
        </div>
        <div class="address_title">
          <label>金额：{{totalPrice-discount}}元</label>
        </div>
        <!--<div class="submit" @click="submit">重新购买</div>-->
      </section>
    </main>
  </template>
</section>
</template>

<script>
  import Loading from './common/Loading.vue'
  import {mapState} from 'vuex'
  import {url,findMobileUserByEmail, initOrderDetail, findOrderAddressAndTime, getOrderSendingTime, changeToConfirm, changeToBack, changeBackAndReduceBalance, getUserLevel} from '../data/fetchData'

  export default {
        name: "BackOrderDetail",
    components:{
      Loading
    },
    directives: {
      move: {
        inserted(el){
          document.body.appendChild(el)
        },
        unbind(el){
          document.body.removeChild(el)
        }
      }
    },
    data () {
      return {
        lists: null,
        loading: false,
        Email: localStorage.user,
        dish:'',
        scrollTop:200,
        username:'',
        telephone:'',
        orderTime:'',
        address:'',
        restaurantName:'',
        dishId:'',
        dishName:'',
        destination:'',
        totalPrice:0.00,
        discount:0.00,
        baseUrl:url + '/images/',
        quantity:'',
        sendTime:'',
        sendAddress:'',
        time : '',
        flag : false,
        cashTime:'',
        sendingTime:'',
        payTime:'',
      }
    },
    computed:{
      ...mapState([
        'orderDetailData',
      ]),
    },
    created () {
      this.initData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'initData',
    },
    methods: {
      async initData() {
        await initOrderDetail(this.$route.params.id)
          .then(res => {
            let list = res.data
            this.lists = list
            this.$store.dispatch('initOrderDetailData', {
              initOrderDetailData: list
            })
          })
          .catch(e => {
            this.$toast({
              icon: 'fail',
              message: e.message
            })
          })
        setTimeout(() => {
          this.loading = false;
        }, 500)
        await findMobileUserByEmail(localStorage.user).then(res=>{
          let temp = res.data;
          this.username=temp[0]['username'];
          this.telephone=temp[0]['telephone'];
        });
        await findOrderAddressAndTime(this.$route.params.id).then(res=>{
          let temp = res.data;
          this.sendTime = temp[0]['orderTime'];
          this.sendAddress = temp[0]['address'];
          this.restaurantName = temp[0]['restaurantName'];
        });
        await getOrderSendingTime(this.$route.params.id).then(res => {
          let temp = res.data;
          this.payTime = temp[0]['payTime'];
          this.sendingTime = temp[0]['sendingTime'];
          this.totalPrice = temp[0]['totalPrice'];
        });
        await getUserLevel(localStorage.user).then(res=>{
          let temp = res.data;
          let userLevel = temp[0]['userLevel'];
          if(userLevel===-1 || userLevel ===0){
            this.discount = 0.00;
          }else if(userLevel ===1){
            this.discount = 1.00;
          }else if(userLevel === 2){
            this.discount = 2.00;
          }else if(userLevel ===3){
            this.discount = 3.00;
          }else{
            this.discount = 0.00;
          }
        });
      },
      back(){
        this.$router.go(-1)
      },
      scroll(){
        window.onscroll = function(){
          this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        };
        this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      },
      async submit() {

      },
    }
    }
</script>

<style lang="scss" scoped>
  .back{
    position: absolute;
    top: 0.2rem;
    left: 0.3rem;
    font-size: 20px;
    i{
      font-size: 20px	;
    }
    border:1px solid #4ebf60;
    padding:0.06rem 0.14rem;
    border-radius:4px;
    background: #4ebf60;
  }
  .wrap{
    position: relative;
    margin-top: 1.2rem;
    margin-left: 0.6rem;
    li{
      margin-top: 0.3rem;
      margin-left: 0.42rem;
      width: 80%;
      border-left:0.2px solid  #1ABC9C;
      border-right:0.2px solid  #1ABC9C;
      border-top:0.2px solid  #1ABC9C;
      border-bottom:0.2px solid  #1ABC9C;
      div{
        font-size: 15px;
        margin-left: 0.1rem;
      }
      img{
        width: 60%;
        height: 2.4rem;
        margin-top: 0.2rem;
        position: relative;
        margin-left: 0.3rem;
      }
    }
  }
  .user {
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
    .input_wrap {
      position: relative;
      margin-top: 0;
      margin-left: 2rem;
      align-content: center;
      i {
        font-size: 15px;
        color: #1ABC9C;
        position: absolute;
        left: 0.3rem;
        top: 50%;
        transform: translateY(-50%)
      }
      input {
        width: 63%;
        padding: 0.25rem;
        border-left: 0.2px solid #1ABC9C;
        border-right: 0.2px solid #1ABC9C;
        border-top: 0.2px solid #1ABC9C;
        border-bottom: 0.2px solid #1ABC9C;
        font-size: 6px;
        padding-left: 0.7rem;
        background: transparent;
      }
      img {
        position: absolute;
        right: 0;
        transform: translateY(-50%);
        height: 50%;
      }
      p {
        position: absolute;
        top: 0;
        right: 0;
        color: #ec5051;
      }
    }
    .input_select {
      position: relative;
      margin-top: 0.1rem;
      margin-left: 1.5rem;
      align-content: center;
      border-left: 0.2px solid #1ABC9C;
      border-right: 0.2px solid #1ABC9C;
      border-top: 0.2px solid #1ABC9C;
      border-bottom: 0.2px solid #1ABC9C;
      height: 0.5rem;
      width: 65%;
    }
    .address_title {
      position: relative;
      margin-top: 0;
      margin-left: 0.5rem;
      align-content: center;
      height: 0.3rem;
    }
    .orderTime {
      i {
        font-size: 15px;
        color: #1ABC9C;
        position: absolute;
        left: 0.3rem;
        top: 50%;
        transform: translateY(-50%)
      }
      input {
        width: 50%;
        padding: 0.15rem;
        border-left: 0.2px solid #1ABC9C;
        border-right: 0.2px solid #1ABC9C;
        border-top: 0.2px solid #1ABC9C;
        border-bottom: 0.2px solid #1ABC9C;
        font-size: 6px;
        padding-left: 0.65rem;
        background: transparent;
      }
      img {
        position: absolute;
        right: 0;
        transform: translateY(-50%);
        height: 50%;
      }
      p {
        position: absolute;
        top: 0;
        right: 1rem;
        color: #ec5051;
      }
      position: relative;
      margin-top: 0.1rem;
      margin-left: 2rem;
      align-content: center;
      width: 92%;
    }
    .submit {
      margin-top: 0.5rem;
      width: 40%;
      background: #1ABC9C;
      padding: 0.2rem 0.3rem;
      border-radius: 10px;
      text-align: center;
      font-size: 8px;
      color: #fff;
      margin: 0.5rem auto;
      margin-bottom: 1.5rem;
    }
  }
</style>
