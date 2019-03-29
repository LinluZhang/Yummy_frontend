<template>
  <main>
    <section class="user_title">
      <i class="iconfont icon-dingdan"></i>
      <h3>我的订单</h3>
    </section>
    <section class="orders">
      <router-link to="/orderCar">
        <div>
          <i class="iconfont icon-gouwuche"></i>
          <span>购物车</span>
        </div>
      </router-link>
      <router-link to="/waitOrder">
      <div>
          <i class="iconfont icon-dengdai"></i>
          <span>待支付的订单</span>
      </div>
      </router-link>
      <router-link to="/sendingOrder">
        <div>
          <i class="iconfont icon-peisong"></i>
          <span>配送中的订单</span>
        </div>
      </router-link>
      <router-link to="/alreadyOrder">
        <div>
          <i class="iconfont icon-wancheng"></i>
          <span>已完成的订单</span>
        </div>
      </router-link>
      <router-link to="/cancelOrder">
        <div>
          <i class="iconfont icon-quxiaodingdan"></i>
          <span>已取消的订单</span>
        </div>
      </router-link>
      <router-link to="/backOrder">
        <div>
          <i class="iconfont icon-tuihuo"></i>
          <span>退订的订单</span>
        </div>
      </router-link>
    </section>
  </main>
</template>

<script>
    export default {
        name: "MyOrder"
    }
</script>

<style lang="scss" scoped>
  .icon-gouwuche,.icon-quxiaodingdan,.icon-dengdai,.icon-peisong,.icon-tuihuo,.icon-wancheng{
    font-size: 28px;
    color: #333
  }
  .user_title{
    display:flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.5rem;
    i{
      color: #1ABC9C;
      font-size: 40px;
    }
    h3{
      font-size: 15px;
      color: #1ABC9C;
    }
  }
  .orders{
    margin-top: 0.5rem;
    margin-left: 1.2rem;
    div{
      margin-top: 0.5rem;
      width: 80%;
      border-left:0.2px solid  #1ABC9C;
      border-right:0.2px solid  #1ABC9C;
      border-top:0.2px solid  #1ABC9C;
      border-bottom:0.2px solid  #1ABC9C;
      padding: 2px;
      i{
        color: #4ebf60;
      }
      span{
        margin-top: 0.1rem;
        margin-left: 1rem;
        font-size: 18px;
        color: blue;
      }
    }
  }
</style>
