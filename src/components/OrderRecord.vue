<template>
<main>
  <section @touchmove="scroll" class="distance">
    <section class="user_title">
      <i class="iconfont icon-diancan"></i>
      <h3>我的订餐记录</h3>
    </section>
    <Loading :loading="loading" />
      <div class="order_record_title">
        <label>选择下单日期：</label>
      </div>
      <div class="order_record_orderDay_select">
        <select v-model="orderDay"  name="orderDay">
          <option value="all">全部</option>
          <option v-for="list in this.orderDayList">{{list.orderDay}}</option>
        </select>
      </div>
    <div class="order_record_title">
      <label>选择餐厅：</label>
    </div>
    <div class="order_record_restaurantName_select">
      <select v-model="restaurantName"  name="restaurantName">
        <option value="all">全部</option>
        <option v-for="list in this.restaurantNameLists">{{list.restaurantName}}</option>
      </select>
    </div>
    <div class="order_record_title">
      <label>选择金额区间：</label>
    </div>
    <div class="order_record_cashRange_select">
      <select v-model="cashRange"  name="cashRange">
        <option value="all">全部</option>
        <option value="1">20元及以下</option>
        <option value="2">20元以上，50元及以下</option>
        <option value="3">50元以上，100元及以下</option>
        <option value="4">100元以上，200元及以下</option>
        <option value="5">200元以上</option>
      </select>
    </div>
    <div class="submit" @click="submit">点击查询</div>
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
      <div class="orderDetail">
        <router-link :to="'/orderRecordDetail/'+list.id">
          订单详情
        </router-link>
      </div>
    </li>
  </section>
</main>
</template>

<script>
  import Loading from './common/Loading.vue'
  import {initOrderRecordData, initOrderDayListData, initRestaurantNameListData, initOrderRecordDataCashRange,
    initOrderRecordDataRestaurantName, initOrderRecordDataRestaurantAndCashRange, initOrderRecordDataOrderDay,
    initOrderRecordDataOrderDayAndCashRange, initOrderRecordDataOrderDayAndRestaurant,
    initOrderRecordDataOrderDayAndRestaurantNameAndCashRange} from '../data/fetchData'
  import {mapState} from 'vuex'
    export default {
        name: "OrderRecord",
      components: {
        Loading
      },
      data() {
        return {
          lists: '',
          loading: true,
          Email: localStorage.user,
          scrollTop:200,
          orderDayList:null,
          restaurantNameLists:null,
          orderDay:'',
          restaurantName:'',
          cashRange:''
        }
      },
      computed: {
        ...mapState([
          'orderRecordData',
          'orderDayData',
          'orderRestaurantNameData'
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
          await initOrderDayListData(Email)
            .then(res=>{
              let list = res.data;
              this.orderDayList = list;
              if (list.length === 0 || list === null) {
                this.$toast({
                  icon: 'fail',
                  message: '还没有订单信息！'
                })
              }
              this.$store.dispatch('initOrderDayData', {
                initOrderDayData: list
              })
            })
            .catch(err=>{
              this.$toast({
                icon: 'fail',
                message: err.message
              })
            });
          await initRestaurantNameListData(Email)
            .then(res=>{
              let list = res.data;
              this.restaurantNameLists = list;
              if (list.length === 0 || list === null) {
                this.$toast({
                  icon: 'fail',
                  message: '还没有订单信息！'
                })
              }
              this.$store.dispatch('initOrderRestaurantNameData', {
                initOrderRestaurantNameData: list
              })
            })
            .catch(err=>{
              this.$toast({
                icon: 'fail',
                message: err.message
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
        async submit() {
          if(this.orderDay ===''||this.orderDay === null) this.orderDay = 'all';
          if(this.restaurantName ==='' || this.restaurantName === null) this.restaurantName = 'all';
          if(this.cashRange === '' || this.cashRange === null) this.cashRange = 'all';
          const searchDay = this.orderDay;
          const searchRestaurant = this.restaurantName;
          const searchCashRange = this.cashRange;
          if(searchDay === 'all'){
            if(searchRestaurant === 'all'){
              if(searchCashRange === 'all'){//查询所有订单000
                await initOrderRecordData(localStorage.user)
                  .then(res => {
                    let list = res.data;
                    this.lists = list;
                    this.$store.dispatch('initOrderRecordData', {
                      initOrderRecordData: list
                    })
                  })
                  .catch(e => {
                  this.$toast({
                    icon: 'fail',
                    message: e.message
                  })
                });
              }else{//查询满足金额区间的所有日期所有餐厅的订单001
                    if(searchCashRange === '1'){
                      await initOrderRecordDataCashRange(1, localStorage.user)
                        .then(res => {
                          let list = res.data;
                          this.lists = list;
                          this.$store.dispatch('initOrderRecordData', {
                            initOrderRecordData: list
                          })
                        })
                        .catch(e => {
                          this.$toast({
                            icon: 'fail',
                            message: e.message
                          })
                        });
                    }else if(searchCashRange === '2'){
                      await initOrderRecordDataCashRange(2, localStorage.user)
                        .then(res => {
                          let list = res.data;
                          this.lists = list;
                          this.$store.dispatch('initOrderRecordData', {
                            initOrderRecordData: list
                          })
                        })
                        .catch(e => {
                          this.$toast({
                            icon: 'fail',
                            message: e.message
                          })
                        });
                    }else if(searchCashRange === '3'){
                      await initOrderRecordDataCashRange(3, localStorage.user)
                        .then(res => {
                          let list = res.data;
                          this.lists = list;
                          this.$store.dispatch('initOrderRecordData', {
                            initOrderRecordData: list
                          })
                        })
                        .catch(e => {
                          this.$toast({
                            icon: 'fail',
                            message: e.message
                          })
                        });
                    }else if(searchCashRange === '4'){
                      await initOrderRecordDataCashRange(4, localStorage.user)
                        .then(res => {
                          let list = res.data;
                          this.lists = list;
                          this.$store.dispatch('initOrderRecordData', {
                            initOrderRecordData: list
                          })
                        })
                        .catch(e => {
                          this.$toast({
                            icon: 'fail',
                            message: e.message
                          })
                        });
                    }else if(searchCashRange === '5'){
                      await initOrderRecordDataCashRange(5, localStorage.user)
                        .then(res => {
                          let list = res.data;
                          this.lists = list;
                          this.$store.dispatch('initOrderRecordData', {
                            initOrderRecordData: list
                          })
                        })
                        .catch(e => {
                          this.$toast({
                            icon: 'fail',
                            message: e.message
                          })
                        });
                    }
              }
            }else{
              if(searchCashRange === 'all'){//查询满足餐厅的所有日期所有金额区间的订单010
                await initOrderRecordDataRestaurantName(searchRestaurant, localStorage.user)
                  .then(res => {
                    let list = res.data;
                    this.lists = list;
                    this.$store.dispatch('initOrderRecordData', {
                      initOrderRecordData: list
                    })
                  })
                  .catch(e => {
                    this.$toast({
                      icon: 'fail',
                      message: e.message
                    })
                  });
              }else{//查询满足餐厅和金额区间的所有日期的订单011
                if(searchCashRange === '1'){
                  await initOrderRecordDataRestaurantAndCashRange(1, searchRestaurant, localStorage.user)
                    .then(res => {
                      let list = res.data;
                      this.lists = list;
                      this.$store.dispatch('initOrderRecordData', {
                        initOrderRecordData: list
                      })
                    })
                    .catch(e => {
                      this.$toast({
                        icon: 'fail',
                        message: e.message
                      })
                    });
                }else if(searchCashRange === '2'){
                  await initOrderRecordDataRestaurantAndCashRange(2, searchRestaurant, localStorage.user)
                    .then(res => {
                      let list = res.data;
                      this.lists = list;
                      this.$store.dispatch('initOrderRecordData', {
                        initOrderRecordData: list
                      })
                    })
                    .catch(e => {
                      this.$toast({
                        icon: 'fail',
                        message: e.message
                      })
                    });
                }else if(searchCashRange === '3'){
                  await initOrderRecordDataRestaurantAndCashRange(3, searchRestaurant, localStorage.user)
                    .then(res => {
                      let list = res.data;
                      this.lists = list;
                      this.$store.dispatch('initOrderRecordData', {
                        initOrderRecordData: list
                      })
                    })
                    .catch(e => {
                      this.$toast({
                        icon: 'fail',
                        message: e.message
                      })
                    });
                }else if(searchCashRange === '4'){
                  await initOrderRecordDataRestaurantAndCashRange(4, searchRestaurant, localStorage.user)
                    .then(res => {
                      let list = res.data;
                      this.lists = list;
                      this.$store.dispatch('initOrderRecordData', {
                        initOrderRecordData: list
                      })
                    })
                    .catch(e => {
                      this.$toast({
                        icon: 'fail',
                        message: e.message
                      })
                    });
                }else if(searchCashRange === '5'){
                  await initOrderRecordDataRestaurantAndCashRange(1, searchRestaurant, localStorage.user)
                    .then(res => {
                      let list = res.data;
                      this.lists = list;
                      this.$store.dispatch('initOrderRecordData', {
                        initOrderRecordData: list
                      })
                    })
                    .catch(e => {
                      this.$toast({
                        icon: 'fail',
                        message: e.message
                      })
                    });
                }
              }
            }
          }else{
            if(searchRestaurant === 'all'){
              if(searchCashRange === 'all'){//查询满足日期的所有订单100
                await initOrderRecordDataOrderDay(searchDay, localStorage.user)
                  .then(res => {
                    let list = res.data;
                    this.lists = list;
                    this.$store.dispatch('initOrderRecordData', {
                      initOrderRecordData: list
                    })
                  })
                  .catch(e => {
                    this.$toast({
                      icon: 'fail',
                      message: e.message
                    })
                  });
              }else{//查询满足日期和金额区间的所有餐厅的订单101
                if(searchCashRange === '1'){
                  await initOrderRecordDataOrderDayAndCashRange(1, searchDay, localStorage.user)
                    .then(res => {
                      let list = res.data;
                      this.lists = list;
                      this.$store.dispatch('initOrderRecordData', {
                        initOrderRecordData: list
                      })
                    })
                    .catch(e => {
                      this.$toast({
                        icon: 'fail',
                        message: e.message
                      })
                    });
                }else if(searchCashRange === '2'){
                  await initOrderRecordDataOrderDayAndCashRange(2, searchDay, localStorage.user)
                    .then(res => {
                      let list = res.data;
                      this.lists = list;
                      this.$store.dispatch('initOrderRecordData', {
                        initOrderRecordData: list
                      })
                    })
                    .catch(e => {
                      this.$toast({
                        icon: 'fail',
                        message: e.message
                      })
                    });
                }else if(searchCashRange === '3'){
                  await initOrderRecordDataOrderDayAndCashRange(3, searchDay, localStorage.user)
                    .then(res => {
                      let list = res.data;
                      this.lists = list;
                      this.$store.dispatch('initOrderRecordData', {
                        initOrderRecordData: list
                      })
                    })
                    .catch(e => {
                      this.$toast({
                        icon: 'fail',
                        message: e.message
                      })
                    });
                }else if(searchCashRange === '4'){
                  await initOrderRecordDataOrderDayAndCashRange(4, searchDay, localStorage.user)
                    .then(res => {
                      let list = res.data;
                      this.lists = list;
                      this.$store.dispatch('initOrderRecordData', {
                        initOrderRecordData: list
                      })
                    })
                    .catch(e => {
                      this.$toast({
                        icon: 'fail',
                        message: e.message
                      })
                    });
                }else if(searchCashRange === '5'){
                  await initOrderRecordDataOrderDayAndCashRange(5, searchDay, localStorage.user)
                    .then(res => {
                      let list = res.data;
                      this.lists = list;
                      this.$store.dispatch('initOrderRecordData', {
                        initOrderRecordData: list
                      })
                    })
                    .catch(e => {
                      this.$toast({
                        icon: 'fail',
                        message: e.message
                      })
                    });
                }
              }
            }else{
              if(searchCashRange === 'all'){//查询满足日期和餐厅的所有金额区间的订单110
                await initOrderRecordDataOrderDayAndRestaurant(searchDay, searchRestaurant,  localStorage.user)
                  .then(res => {
                    let list = res.data;
                    this.lists = list;
                    this.$store.dispatch('initOrderRecordData', {
                      initOrderRecordData: list
                    })
                  })
                  .catch(e => {
                    this.$toast({
                      icon: 'fail',
                      message: e.message
                    })
                  });
              }else{//查询满足日期，餐厅和金额区间的所有的订单111
                if(searchCashRange === '1'){
                  await initOrderRecordDataOrderDayAndRestaurantNameAndCashRange(1, searchDay, searchRestaurant, localStorage.user)
                    .then(res => {
                      let list = res.data;
                      this.lists = list;
                      this.$store.dispatch('initOrderRecordData', {
                        initOrderRecordData: list
                      })
                    })
                    .catch(e => {
                      this.$toast({
                        icon: 'fail',
                        message: e.message
                      })
                    });
                }else if(searchCashRange === '2'){
                  await initOrderRecordDataOrderDayAndRestaurantNameAndCashRange(2, searchDay, searchRestaurant, localStorage.user)
                    .then(res => {
                      let list = res.data;
                      this.lists = list;
                      this.$store.dispatch('initOrderRecordData', {
                        initOrderRecordData: list
                      })
                    })
                    .catch(e => {
                      this.$toast({
                        icon: 'fail',
                        message: e.message
                      })
                    });
                }else if(searchCashRange === '3'){
                  await initOrderRecordDataOrderDayAndRestaurantNameAndCashRange(3, searchDay, searchRestaurant, localStorage.user)
                    .then(res => {
                      let list = res.data;
                      this.lists = list;
                      this.$store.dispatch('initOrderRecordData', {
                        initOrderRecordData: list
                      })
                    })
                    .catch(e => {
                      this.$toast({
                        icon: 'fail',
                        message: e.message
                      })
                    });
                }else if(searchCashRange === '4'){
                  await initOrderRecordDataOrderDayAndRestaurantNameAndCashRange(4, searchDay, searchRestaurant, localStorage.user)
                    .then(res => {
                      let list = res.data;
                      this.lists = list;
                      this.$store.dispatch('initOrderRecordData', {
                        initOrderRecordData: list
                      })
                    })
                    .catch(e => {
                      this.$toast({
                        icon: 'fail',
                        message: e.message
                      })
                    });
                }else if(searchCashRange === '5'){
                  await initOrderRecordDataOrderDayAndRestaurantNameAndCashRange(5, searchDay, searchRestaurant, localStorage.user)
                    .then(res => {
                      let list = res.data;
                      this.lists = list;
                      this.$store.dispatch('initOrderRecordData', {
                        initOrderRecordData: list
                      })
                    })
                    .catch(e => {
                      this.$toast({
                        icon: 'fail',
                        message: e.message
                      })
                    });
                }
              }
            }
          }
        }
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
  .orderDetail{
    color:blue;
    font-size: 12px;
    margin-left: 80%;
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
  .order_record_title{
    position: relative;
    margin-top: 0.1rem;
    margin-left: 0.5rem;
    align-content: center;
    height: 0.3rem;
    label{
      color: blue;
    }
  }
  .order_record_orderDay_select{
    position: relative;
    margin-top: 0.1rem;
    margin-left: 0.5rem;
    align-content: center;
    border-left: 0.2px solid #1ABC9C;
    border-right: 0.2px solid #1ABC9C;
    border-top: 0.2px solid #1ABC9C;
    border-bottom: 0.2px solid #1ABC9C;
    height: 0.5rem;
    width: 18%;
  }
  .order_record_restaurantName_select{
    position: relative;
    margin-top: 0.1rem;
    margin-left: 0.5rem;
    align-content: center;
    border-left: 0.2px solid #1ABC9C;
    border-right: 0.2px solid #1ABC9C;
    border-top: 0.2px solid #1ABC9C;
    border-bottom: 0.2px solid #1ABC9C;
    height: 0.5rem;
    width: 32%;
  }
  .order_record_cashRange_select{
    position: relative;
    margin-top: 0.1rem;
    margin-left: 0.5rem;
    align-content: center;
    border-left: 0.2px solid #1ABC9C;
    border-right: 0.2px solid #1ABC9C;
    border-top: 0.2px solid #1ABC9C;
    border-bottom: 0.2px solid #1ABC9C;
    height: 0.5rem;
    width: 32%;
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
</style>
