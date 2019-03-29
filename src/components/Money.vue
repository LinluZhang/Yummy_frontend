<template>
  <main>
    <section class="main_wrap">
      <section class="user_title">
        <i class="iconfont icon-qian"></i>
        <h3>充值</h3>
      </section>
      <section class="user">
        <form  enctype='multipart/form-data'>
          <div class="input">
            <div class="input_wrap">
              <i class="iconfont icon-qian"></i>
              <input type="text" v-model="balance" name="balance" placeholder="充值金额">
            </div>
          </div>
          <div class="submit" @click="setup">充值</div>
        </form>
      </section>
    </section>
  </main>
</template>

<script>
  import {editBalance} from '../data/fetchData.js'
  export default {
    name: "Money",
    data () {
      return {
       balance:''
      }
    },
    methods:{
      //充值
      setup(){
        editBalance(localStorage.user,this.balance).then(res=>{
          console.log('edit',res)
          this.$toast({
            icon:'success',
            message:'充值成功！'
          })
          this.$router.push({path:'/me'})
        }).catch(e=>{
          this.$toast({
            icon:'fail',
            message:e.message
          })
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .main_wrap{
    // position: absolute;
    // top: 50%;
    // width: 100%;
    // transform: translateY(-55%)
    margin-top: 2rem;
  }
  .user_title{
    display:flex;
    flex-direction: column;
    align-items: center;
    i{
      color: #1ABC9C;
      font-size: 60px;
    }
    h3{
      font-size: 18px;
      color: #1ABC9C;
    }
  }
  .user{
    .input_wrap{
      position: relative;
      margin-top: 0.5rem;
      i{
        font-size: 30px;
        color: #1ABC9C;
        position: relative;
        left: 0.6rem;
        top: 50%;
        transform: translateY(-50%)
      }
      input{
        width: 85%;
        padding:0.25rem 0;
        border-top:1px solid  #1ABC9C;
        border-bottom:1px solid  #1ABC9C;
        border-left:1px solid  #1ABC9C;
        border-right:1px solid  #1ABC9C;
        font-size: 16px;
        padding-left: 0.8rem;
        background: transparent;
      }
      img{
        position: absolute;
        right: 10%;
        top:50%;
        transform: translateY(-50%);
        height: 90%;
      }
      p{
        position: absolute;
        top: 0;
        right: 0;
        color: #ec5051;
      }
    }
    .submit{
      width: 50%;
      background: #1ABC9C;
      padding:0.2rem 0.3rem;
      border-radius:10px;
      text-align: center;
      font-size: 18px;
      color: #fff;
      margin:0.5rem auto;
    }
  }
</style>

