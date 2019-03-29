<template>
  <main>
    <section class="main_wrap">
      <section class="user_title">
        <i class="iconfont icon-denglu"></i>
        <h3>注册</h3>
      </section>
      <section class="user">
        <form  enctype='multipart/form-data'>
          <div class="input">
            <div class="input_wrap">
              <i class="iconfont icon-youxiang"></i>
              <input type="text" v-model.trim="email" @keyup.enter="signin" name="userName" placeholder="邮箱">
            </div>
            <div class="input_wrap">
              <i class="iconfont icon-yanzhengma1"></i>
              <input type="text" v-model="yzm" @keyup.enter="signin" name="yzm" placeholder="验证码">
              <img @click="changYzm" :src="url" alt="">
              <!-- <p>点击更换</p> -->
            </div>
          </div>
          <div class="submit" @click="signup">立即注册</div>
        </form>
      </section>
    </section>
  </main>
</template>

<script>
  import {mapActions,mapState} from 'vuex'
  import { signup , yzmChange, checkUser,url } from '../data/fetchData.js'
  export default {
    name: 'signup',
    data () {
      return {
        lists: '',
        loading: false,
        email: '',
        userName: '',
        password: '',
        yzm: '',
        yzmTest: '',
        url: ''
      }
    },
    computed:{
      ...mapState([
        'userInfo',
      ]),
    },
    mounted () {
      if(localStorage.user && localStorage.user != ''){
        this.$router.push('/me')
      }
      this.url = url + '/images/yzm.jpg'
      this.changYzm()
    },
    methods:{
      // 注册
      signup(){
        var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(!pattern.test(this.email)){
          this.$toast({
            icon:'fail',
            message:'用户名须为邮箱格式!'
          })
          return
        }
        signup(this.email).then(data => {
          // 用户存在
          if (data.code == 200) {
            this.$toast({
              icon:'fail',
              message:'用户已存在！',
            })
          }else if(data.code == 201){
            //注册成功
            this.$toast({
              icon:'success',
              message:'注册成功',
              success:()=>{
                this.$router.push({path:'/me'})
              }
            })
            document.cookie = `token=${data.token};max-age=${30*24*60*60*1000}`
            localStorage.setItem('user', "新用户")
          }
        }).catch(e=>{
          this.$toast({
            icon:'fail',
            message: e.message
          })
        })
      },
      // 验证码切换
      changYzm () {
        yzmChange().then(res=>{
          this.yzmTest = res.data;
          this.url = url+'/images/yzm.jpg'+'?v='+ (new Date).getTime()
          console.log('验证码',this.yzmTest)
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
