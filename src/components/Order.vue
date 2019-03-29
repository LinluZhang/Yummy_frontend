<template>
  <main>
    <section class="main_wrap">
  <div id="container">
  </div>
  <section class="user">
    <form  enctype='multipart/form-data'>
      <div class="input">
        <div class="address_title">
          <label>收货人姓名：</label>
        </div>
        <div class="input_wrap">
          <i class="iconfont icon-name"></i>
          <input type="text" v-model.trim="username" @keyup.enter="orderConfirm" name="username" placeholder="收货人姓名">
        </div>
        <div class="address_title">
          <label>联系电话：</label>
        </div>
        <div class="input_wrap">
          <i class="iconfont icon-dianhua"></i>
          <input type="text" v-model.trim="telephone" @keyup.enter="orderConfirm" name="telephone" placeholder="电话">
        </div>
        <div class="address_title">
        <label>期望送餐时间：</label>
        </div>
        <div class="orderTime">
          <i class="iconfont icon-shijian"></i>
          <input type="date" v-model="orderTime" @keyup.enter="orderConfirm" name="orderTime" placeholder="期望送餐时间">
        </div>   
        <div class="address_title">
         <label>送餐地址：</label>
        </div>
        <div class="input_select">
          <select v-model="address" @keyup.enter="orderConfirm" name="address">
            <option v-for="list in this.addressLists">{{list.address}}</option>
          </select>
        </div>
      </div>
      <div class="submit" @click="orderConfirm">确认下单</div>
    </form>
  </section>
    </section>
  </main>
</template>
<script>
  import Loading from './common/Loading.vue'
  import { TMap } from '../TMap'
  import {initAddressData} from '../data/fetchData'
  import { mapActions ,mapState } from 'vuex'
  export default {
    name: "Order",
    components:{
      Loading
    },
    data () {
      return {
        addressLists:'',
        loading: true,
        Email: localStorage.user,
        username:'',
        telephone:'',
        orderTime:'',
        address:'',
        restaurantName:'',
        dishId:'',
        dishName:'',
        destination:'',
        totalPrice:0.00,
      }
    },
    computed:{
      ...mapState([
        'addressData',
      ]),
    },
    created () {
        this.initData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      //'$route': 'initData'
    },
    mounted() {
      TMap('DPHBZ-FUECD-ZO74D-HYJWT-3FJE7-ENFYD').then(qq => {
        var map = new qq.maps.Map(document.getElementById("container"), {
          // 地图的中心地理坐标。
          center: new qq.maps.LatLng(39.916527, 116.397128),
          zoom: 8
        });
      });
    },
    methods:{
      async initData() {
        const Email = localStorage.user;
        this.loading = true
        await initAddressData(Email)
          .then(res =>  {
            let list = res.data
            this.addressLists = list
          if(list.length ===0 ||list===null){
            this.$toast({
              icon: 'fail',
              message: '还未添加地址！'
            })
          }
            this.$store.dispatch('initAddressData',{
              initAddressData: list
            })
        })
          .catch(e => {
          this.$toast({
            icon: 'fail',
            message: e.message
          })
        })
        setTimeout(()=>{
          this.loading = false;
        },500)
      },
      orderConfirm(){
        alert(this.username);
        alert(this.telephone);
        alert(this.orderTime);
        alert(this.address);
      }
    },
  }
</script>
<style lang="scss" scoped>
  #container {
    min-width:300px;
    min-height:400px;
  }
  .user{
    .input_wrap{
      position: relative;
      margin-top: 0;
      margin-left: 2rem;
      align-content: center;
      i{
        font-size: 15px;
        color: #1ABC9C;
        position: absolute;
        left: 0.3rem;
        top: 50%;
        transform: translateY(-50%)
      }
      input{
        width: 63%;
        padding:0.25rem ;
        border-left:0.2px solid  #1ABC9C;
        border-right:0.2px solid  #1ABC9C;
        border-top:0.2px solid  #1ABC9C;
        border-bottom:0.2px solid  #1ABC9C;
        font-size: 6px;
        padding-left: 0.7rem;
        background: transparent;
      }
      img{
        position: absolute;
        right: 0;
        transform: translateY(-50%);
        height: 50%;
      }
      p{
        position: absolute;
        top: 0;
        right: 0;
        color: #ec5051;
      }
    }
    .input_select{
      position: relative;
      margin-top: 0.1rem;
      margin-left: 1.5rem;
      align-content: center;
      border-left:0.2px solid  #1ABC9C;
      border-right:0.2px solid  #1ABC9C;
      border-top:0.2px solid  #1ABC9C;
      border-bottom:0.2px solid  #1ABC9C;
      height: 0.5rem;
      width: 65%;
    }
    .address_title{
      position: relative;
      margin-top: 0;
      margin-left: 0.5rem;
      align-content: center;
      height: 0.3rem;
    }
    .orderTime{
      i{
        font-size: 15px;
        color: #1ABC9C;
        position: absolute;
        left: 0.3rem;
        top: 50%;
        transform: translateY(-50%)
      }
      input{
        width: 50%;
        padding:0.25rem;
        border-left:0.2px solid  #1ABC9C;
        border-right:0.2px solid  #1ABC9C;
        border-top:0.2px solid  #1ABC9C;
        border-bottom:0.2px solid  #1ABC9C;
        font-size: 6px;
        padding-left: 0.65rem;
        background: transparent;
      }
      img{
        position: absolute;
        right: 0;
        transform: translateY(-50%);
        height: 50%;
      }
      p{
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
    .submit{
      margin-top: 0.5rem;
      width: 40%;
      background: #1ABC9C;
      padding:0.2rem 0.3rem;
      border-radius:10px;
      text-align: center;
      font-size: 8px;
      color: #fff;
      margin:0.5rem auto;
    }
  }
</style>
