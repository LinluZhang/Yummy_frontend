<template>
  <main>
    <section @touchmove="scroll" class="distance">
      <section class="home">
        <div id="search">
          <router-link to="/search">
            <div class="search_input">
              <i class="iconfont icon-sousuo1"></i>搜索菜名
            </div>
          </router-link>
        </div>
        <Loading :loading="loading" />
        <li v-for="restaurant in restaurantNameLists">
          <section class="video_list">
            <div class="video_list_header">
              <h3>{{restaurant.restaurantName}}
              </h3>
              <router-link :to="'/restaurant/'+restaurant.id">查看 <i class="iconfont icon-jiantouyou"></i></router-link>
            </div>
          </section>
        </li>
      </section>
    </section>
  </main>
</template>

<script>
  import Loading from './common/Loading.vue'
  import { url,initRestaurantNameLists} from '../data/fetchData'
  import { mapActions ,mapState } from 'vuex'
  export default {
    name: 'home',
    components:{
      Loading
    },
    data () {
      return {
        lists: '',
        restaurantNameLists:'',
        loading: true,
        baseUrl:url + '/images/',
        scrollTop:200,
      }
    },
    computed:{
      ...mapState([
        'restaurantNameData'
      ]),
    },
    created () {
        this.initData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      //'$route': 'initData'
    },
    methods:{
      async initData () {
        this.loading = true
        await initRestaurantNameLists().then(res=>{
          let list = res.data
          this.restaurantNameLists = list
            this.$store.dispatch('initRestaurantNameData',{
              initRestaurantNameData: list
            })
        }).catch(e => {
          this.$toast({
            icon: 'fail',
            message: e.message
          })
        })
        setTimeout(()=>{
          this.loading = false;
        },500)
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../src/style/home';
</style>
