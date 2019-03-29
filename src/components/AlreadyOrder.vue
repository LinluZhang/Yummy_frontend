<template>
<main>
  <section @touchmove="scroll" class="distance">
    <section class="user_title">
      <i class="iconfont icon-wancheng"></i>
      <h3>已完成的订单</h3>
    </section>
    <Loading :loading="loading" />
    <li  v-for="list in this.lists" class="order_set">
      <div class="order_list_header">
        <h3>订单编号： {{list.id}}</h3>
      </div>
      <div class="order_list_content">
        <h6>餐厅名称： {{list.restaurantName}}</h6>
      </div>
      <div class="order_list_content">
        <h6>下单时间： {{list.orderDate}}</h6>
      </div>
      <div class="link">
        <div>
          <router-link :to="'/alreadyDetail/'+list.id">
            订单详情
          </router-link>
        </div>
        <template>
          <router-link :to="'/buyAgain/'+list.id">
            再来一单
          </router-link>
        </template>
      </div>
    </li>
  </section>
</main>
</template>

<script>
  import Loading from './common/Loading.vue'
  import {initAlreadyData} from '../data/fetchData'
  import {mapState} from 'vuex'
    export default {
        name: "AlreadyOrder",
      components: {
        Loading
      },
      data() {
        return {
          lists: '',
          loading: true,
          Email: localStorage.user,
          scrollTop:200,
        }
      },
      computed: {
        ...mapState([
          'carData',
        ]),
      },
      created() {
        this.initData()
      },
      watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'initData'
      },
      methods: {
        async initData() {
          const Email = localStorage.user;
          this.loading = true;
          await initAlreadyData(Email)
            .then(res => {
              let list = res.data;
              this.lists = list;
              this.$store.dispatch('initCarData', {
                initCarData: list
              })
            })
            .catch(e => {
              this.$toast({
                icon: 'fail',
                message: e.message
              })
            });
          setTimeout(() => {
            this.loading = false;
          }, 500)
        },
        scroll(){
          window.onscroll = function(){
            this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
          };
          this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        },
      }
    }
</script>

<style lang="scss" scoped>
  .distance{
    margin-bottom: 1.8rem;
  }
  .order_list_header {
    background-color: #89e498;
    display: flex;
    justify-content: space-between;
    padding-right: 0.3rem;
    font-size: 17px;
    margin-bottom: 0.3rem;
    h3 {
      font-weight: bold;
      border-left: 3px solid #0fce0f;
      padding-left: 0.2rem;
      color: #000000;
    }
  }
  .order_list_content {
    display: flex;
    justify-content: space-between;
    padding-right: 0.3rem;
    font-size: 10px;
    margin-bottom: 0.1rem;
    h6 {
      border-left: 3px solid #0fce0f;
      padding-left: 0.2rem;
      color: #666;
    }
  }
  .order_set{
    margin-top: 0.8rem;
    margin-left: 0.6rem;
    width: 80%;
    border-left:0.2px solid  #1ABC9C;
    border-right:0.2px solid  #1ABC9C;
    border-top:0.2px solid  #1ABC9C;
    border-bottom:0.2px solid  #1ABC9C;
  }
  .user_title{
    display:flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.3rem;
    i{
      color: #1ABC9C;
      font-size: 40px;
    }
    h3{
      font-size: 15px;
      color: #1ABC9C;
    }
  }
  .link{
    margin-left: 10%;
    margin-right: 10%;
    div{
      color:blue;
      font-size: 12px;
      float:right;
    }
    template{
      color:blue;
      font-size: 12px;
    }
  }
</style>
