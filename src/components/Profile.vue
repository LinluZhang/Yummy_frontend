<template>
<main>
  <section class="user_title">
    <i class="iconfont icon-gerenxinxi"></i>
    <h3>个人统计信息</h3>
  </section>
  <section class="orders">
    <router-link to="/orderRecord">
      <div>
        <i class="iconfont icon-diancan"></i>
        <span>点餐记录</span>
      </div>
    </router-link>
    <router-link to="/backOrderRecord">
      <div>
        <i class="iconfont icon-tuihuo"></i>
        <span>退订记录</span>
      </div>
    </router-link>
    <router-link to="/consumptionRecord">
      <div>
        <i class="iconfont icon-xiaofei"></i>
        <span>消费情况</span>
      </div>
    </router-link>
  </section>
</main>
</template>

<script>
    export default {
        name: "Profile"
    }
</script>

<style lang="scss" scoped>
  .icon-gerenxinxi{
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
        font-size: 25px;
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
