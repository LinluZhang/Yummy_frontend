<template>
  <section class="video" @touchmove="scroll">
    <Loading :loading="loading" />
    <section class="video_list">
      <h1>{{ restaurantName }}</h1>
      <ul>
        <li v-for="list in this.lists">
          <router-link :to="'/dishes/' + list.id">
            <div><img v-lazy="baseUrl+list.image" alt=""></div>
            <h3>{{list.dishName}}</h3>
            <div>
              <div class="starList" :style="{'background-position-y':-15*(10-list.star).toFixed(0)+'px'}"></div>
              <span>{{list.star}}</span>
            </div>
          </router-link>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
  import Loading from './common/Loading.vue'
  import {mapState} from 'vuex'
  import {initRestaurantDishLists, getRestaurantNameById, url} from '../data/fetchData'

  export default {
    name: 'Restaurant',
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
        icon: 'iconfont',
        iconStyle: 'icon-wjx',
        iconStyleCopy: 'icon-wjx-copy',
        loading: false,
        restaurantName:'',
        scrollTop:200,
        restaurantId:this.$route.params.id,
        baseUrl:url+'/images/'
      }
    },
    computed:{
      ...mapState([
        'dishesData'
      ])
    },
    created () {
      this.initData()
    },
    mounted(){
      this.initData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'initData',
    },
    methods:{
      async initData(){
        const restaurantId =this.$route.params.id
          this.loading = true;
          await initRestaurantDishLists(restaurantId)
            .then(res => {
              this.lists = res.data;
            this.$store.dispatch('initDishesData', {
              initDishesData:res.data
            });
            this.loading = false
          }).catch(e => {
              this.loading = false;
              this.$toast({
                icon:'fail',
                message: e.message
              })
            });
        setTimeout(() => {
          this.loading = false;
        }, 500);
        await getRestaurantNameById(restaurantId)
          .then(res=>{
            this.restaurantName =  res.data[0]['restaurantName']
          })
          .catch(e=>{
            this.$toast({
              icon:'fail',
              message: e.message
            })
        })

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
  .video {
    a{
      color: #444;
    }
    padding:0 0.15rem;
    padding-bottom: 1.2rem;
    margin-bottom: 1rem;
    font-size: 12px;
    .icon-wjx {
      color: rgb(255, 172, 45);
    }
    .icon-wjx-copy{
      color: #ccc;
    }
    .video_list {
      text-align: center;
      h1 {
        font-weight: bold;
        color: #666;
        font-size:25px;
        margin-top: 0.5rem;
        color: #0fce0f;
        padding-bottom: 0.15rem;
        border-bottom: 1px solid #f1eaea;
      }
      ul {
        display: flex;
        width: 100%;
        flex-wrap:wrap;
        li {
          margin-top: 0.15rem;
          width: 2.3rem;
          h3 {
            font-size: 16px;
            margin: 0.1rem 0;
            text-align:left;
            height: 0.5rem;
            line-height: 0.5rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          img {
            width: 100%;
            height: 3.4rem;
          }
          .color {
            color: yellow;
          }
          div{
            color: #333;
            display: flex;
            span{
              margin-left: 0.1rem;
            }
          }
          &:nth-child(3n-1){
            margin:0.15rem .15rem;
          }
        }
      }
    }
    .icon-my1{
      color: #4ebf60
    }
  }
</style>
