<template>
    <section class="detail" @touchmove="scroll">
        <Loading :loading="loading" />
        <template v-if="lists">
            <header v-if="lists">
                <div class="wrap">
                    <div @click="back" class="back">
                    <i class="iconfont icon-logout23"></i>
                    返回
                    </div>
                    <template>
                        <img v-lazy="baseUrl+lists.image" alt="">
                    </template>
                <!--  <template v-else>
                        <img src="" alt="加载失败">
                    </template> -->
                    <div class="video_name">
                        <h3>{{ lists.dishName }}</h3>
                        <div class="score_wrap">
                            <strong>{{ lists.star }}</strong>
                            <div class="score">
                                <div class="starList" :style="{'background-position-y':-15*(10-lists.star).toFixed(0)+'px'}"></div>
                                <p>{{ likeTotalLength }}人评分/{{pageNeedComments.length}}条评论</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section class="video_txt">
                <div class="video_txt_wrap">
                    <p>
                        {{ lists.endTime }}到期
                        {{ lists.dishType }}
                    </p>
                    <p>单价：{{ lists.price }}元/份， 折扣：{{lists.discount}} 折，剩余 {{lists.quantity}}份</p>
                    <p>{{ lists.actors }}</p>
                </div>
            </section>
            <section class="like_list">
                <template v-if="!Email || Email=== ''">
                    <div class="like" @click="likeNeedLogin">喜欢</div>
                    <div class="like" @click="likeNeedLogin">不喜欢</div>
                    <!-- <p>登录后才可选择哟！</p> -->
                </template>
                <template v-else-if="likes">
                    <div :class="[ likes === 1 ? likeActive : likeDisable, likeCls ]">喜欢</div>
                    <div :class="[ likes === 2 ? likeActive : likeDisable, likeCls ]">不喜欢</div>
                </template>
                <template v-else>
                    <div @click="like(1)" class="like">喜欢</div>
                    <div @click="like(2)" class="like">不喜欢</div>
                </template>
            </section>
            <section class="video_about">
                <h3>{{ lists.dishName }}的描述</h3>
                <p>
                    {{ lists.detail }}
                </p>
            </section>
          <div @click="order" class="order">
            <i class="iconfont icon-gouwuche"></i>
            加入购物车
          </div>
            <section v-move class="fixed_comment">
                <template v-if="Email && Email != ''">
                    <input type="text" v-model="comment" @click="resetScrollTop" @keyup.enter="report" name="comment" placeholder="评论">
                    <button @click="report">评论</button>
                </template>
                <template v-else>
                    <input type="text" v-model="comment" name="comment" placeholder="登陆后才可以评论哟！" readonly>
                    <button class="disabled">评论</button>
                </template>
            </section>
            <section class="video_comments">
                <h3>评论({{pageNeedComments.length}})</h3>
                <ul id="ul">
                    <li :key="comment.id" v-for="comment in comments">
                        <template v-if="comment.avatar != '' ">
                            <div class="avator">
                                <img v-lazy="baseUrl+'/avator/'+ comment.avatar +'.png' " alt="">
                            </div>
                        </template>
                        <template v-else>
                          <div class="avator">
                            {{comment.username.charAt(0)}}
                          </div>
                        </template>
                        <div class="comments_detail">
                            <h4> {{comment.username}}</h4>
                            <p> {{comment.commentDate}}</p>
                            <div>{{comment.content}}</div>
                        </div>
                    </li>
                </ul>
            </section>
            <section class="page">
                <transition name="page-scale">
                    <div @click="goPage(1)" v-if="(commentsPageLength > 1) && page > 1">首页</div>
                </transition>
                <transition name="page-scale">
                    <div @click="prevPage()" v-if="page >= 2">上一页</div>
                </transition>
                <transition name="page-scale">
                    <div @click="nextPage()" v-if="page < commentsPageLength" >下一页</div>
                </transition>
                <transition name="page-scale">
                    <div @click="goPage(commentsPageLength)" v-if="page < commentsPageLength">尾页</div>
                </transition>
                <template v-if="commentsPageLength >= 1">
                    <div class="pageNum">{{page}}/{{commentsPageLength}}页</div>
                </template>
                <template v-else>
                    <div class="pageNum">{{commentLoad}}</div>
                </template>
            </section>
        </template>
    </section>
</template>

<script>
import Loading from './common/Loading.vue'
import {mapState,mapActions} from 'vuex'
import { url, findMobileUserByEmail, findRestaurantNameByDishIdAndDishName, singleDishData , getDishComment , getInitDishLikeData , postDishLikeData ,reportComment, orderDish} from '../data/fetchData.js'

export default {
    name: 'detail',
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
            comments: '',
            pageNeedComments:'',
            likes: '',
            star:'',
            baseUrl:url + '/images/',
            likeTotalLength:0,
            loading: false,
            comment: '',
            likeActive: 'like_active',
            likeCls: 'like',
            likeDisable: 'likeDisable',
            scrollTop:200,
            page:1,
            commentLoad:'评论正在加载中......',
            Email: localStorage.user,
            dish:''
        }
    },
    computed:{
        ...mapState([
            'userInfo',
            'meCommentDatas'
        ]),
        comment_allow(){
          return localStorage.user ? true : false
        },
        avator(){
          return localStorage.avatar;
        },
        commentsPageLength(){
            return Math.ceil(this.pageNeedComments.length / 5)
        }
    },
    mounted(){
        this.initData()
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'initData',
    },
    methods:{

        async initData () {
            this.loading = true
            console.log(this.loading)
            // 获取dish数据
            var routerId = this.$route.params.id;
            var Email = this.Email
                setTimeout(()=>{
                    this.loading = false;
                },500)
            await singleDishData(routerId).then(res =>  {
                var data = res.data
                console.log(data[0],'lists')
                if(data[0].length === 0){
                    this.$toast({
                        icon:'fail',
                        message: '菜肴不存在',
                        success:()=>{
                            this.$router.push({path:'/'})
                        }
                    })
                }
                this.lists = data[0][0];
                // 喜欢的数量
                var likeLength = data[1][0]["count(*)"];
                // 该dish总的评价数量
                var likeTotalLength = data[2][0]["count(*)"];
                this.likeTotalLength = likeTotalLength
                if (likeTotalLength > 0 && likeLength >= 0) {
                    this.star = likeLength / likeTotalLength * 10
                }
            })
            .catch(e => {
                this.loading = false;
                this.$toast({
                    icon:'fail',
                    message: e.message
                })
            });

            // 获取评论
            await getDishComment(routerId).then( res =>  {
                this.comments = res.data.slice(0,5);
                this.pageNeedComments = res.data;
                this.commentLoad = '暂时没有相关评论.......'
            }).catch(e => {
                this.$toast({
                    icon:'fail',
                    message: e.message
                })
            });
            setTimeout(()=>{
                this.loading = false;
            },500);
            if(Email !== '' || !Email){
                // 获取like参数
                await getInitDishLikeData(routerId ,Email).then(res =>  {
                    this.likes = res.data[0] ? res.data[0]['iLike'] : null
                }).catch(e => {
                    this.$toast({
                        icon:'fail',
                        message: e.message
                    })
                })
            }
        },
        // 点击like操作
        like (likeData) {
            // 提交like信息
            postDishLikeData(
                    this.$route.params.id,
                    likeData,
                    this.Email,
                    this.lists.restaurantName,
                    this.lists.dishName,
                    this.lists.image,
                    this.lists.star
                ).then(data=>{
                    console.log('data',data);
                    if (likeData === 1) {
                        this.likes = 1;
                        this.$toast({
                            icon:'success',
                            message:'标记为喜欢'
                        })
                    } else if (likeData === 2) {
                        this.likes = 2;
                        this.$toast({
                            icon:'success',
                            message:'标记为不喜欢'
                        })

                    }
            }).catch(e=>{
                this.$toast({
                    icon:'fail',
                    message:e.message,
                    success:()=>{
                        if(e.code === 404) this.$router.push({path:'/login'});localStorage.clear()
                    }
                })
            })
        },
        // 监听滚动，动态更新scrollTop
        scroll(){
            window.onscroll = function(){
                this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
            };
            this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        },
        // 评论后滚动到底部
        scrollToBottom () {
          let scrollHeight = document.documentElement.scrollHeight;
          console.log(scrollHeight);
            scrollTo(0,scrollHeight);
        },
        // 解决键盘抬起遮挡问题(现在是直接滚动到底部评论）
        resetScrollTop(){
            // document.body.scrollTop = document.documentElement.scrollTop = document.body.scrollHeight + 600;
        },
        date(x, y){
          let z = {
            y: x.getFullYear(),
            M: x.getMonth() + 1,
            d: x.getDate(),
            h: x.getHours(),
            m: x.getMinutes(),
            s: x.getSeconds()
          };
          return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function(v) {
            return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2))
          });
        },
        // 发表评论
        async report() {
          if (this.comment === '') {
            this.$toast({
              icon: 'fail',
              message: '请输入评论内容'
            });
            this.comment = '';
            return
          }
          await findMobileUserByEmail(this.Email).then(async res => {
            let userData = res.data;
            if (userData[0].length === 0) {
              this.$toast({
                icon: 'fail',
                message: '用户不存在',
                success: () => {
                  this.$router.push({path: '/'})
                }
              })
            }
            let avatar = userData[0].avatar;
            await findRestaurantNameByDishIdAndDishName(this.$route.params.id, this.lists.dishName).then(res => {
              let restaurantData = res.data;
              if (restaurantData[0].length === 0) {
                this.$toast({
                  icon: 'fail',
                  message: '餐厅不存在',
                  success: () => {
                    this.$router.push({path: '/'})
                  }
                })
              }
              let restaurantName = restaurantData[0].restaurantName;
              let date = this.date(new Date(), 'yyyy-M-d h:m:s');
              reportComment(this.Email, this.comment, restaurantName, this.lists.dishName, avatar, this.$route.params.id).then(data => {
                console.log(data);
                this.pageNeedComments.push({
                  "Email": localStorage.getItem('user'),
                  "date": date,//现在由服务端处理
                  "content": this.comment,
                  "avatar": avatar
                });
                this.goPage(Math.ceil(this.pageNeedComments.length / 5));
                this.$toast({
                  icon: 'success',
                  message: '评论成功'
                });
                this.comment = '';
                this.$nextTick(() => {
                  this.scrollToBottom()
                })
              }).catch(e => {
                this.$toast({
                  icon: 'fail',
                  message: e.message,
                  success: () => {
                    if (e.code === 404) this.$router.push({path: '/login'});
                    localStorage.clear()
                  }
                });
                this.comment = ''
              })
            })
          })
        },
        nextPage(){
            if (this.page !== this.commentsPageLength) {
               this.page++
            }
           this.comments = this.pageNeedComments.slice((this.page-1)*5,this.page*5)
        },
        prevPage(){
           if (this.page !== 1) {
               this.page--
           }
           this.comments = this.pageNeedComments.slice((this.page-1)*5,this.page*5)
        },
        goPage(page){
           this.page = page;
           this.comments = this.pageNeedComments.slice((page-1)*5,page*5)
        },
        likeNeedLogin(){
            this.$toast({
                icon:'fail',
                message:'请先登录！'
            })
        },
        back(){
            this.$router.go(-1)
        },
      //加入购物车
      async order() {
        const dishId = this.$route.params.id;
        const Email = this.Email;
        await singleDishData(dishId).then(async res => {
          const data = res.data;
          if (data[0].length === 0) {
            this.$toast({
              icon: 'fail',
              message: '菜肴不存在',
              success: () => {
                this.$router.push({path: '/'})
              }
            })
          }
          let date = this.date(new Date(), 'yyyy-M-d h:m:s');
          const username = Email;
          const restaurantName = data[0][0].restaurantName;
          const dishID = dishId;
          const dishName = data[0][0].dishName;
          const image = data[0][0].image;
          const price = data[0][0].price;
          const discount=data[0][0].discount;
          //加入购物车默认数量为1
          await orderDish(username, restaurantName, dishID, dishName, price, discount,  image).then(data => {
            console.log(data);
            this.$toast({
              icon: 'success',
              message: '添加成功！'
            })
          })
            .catch(e => {
            this.$toast({
              icon: 'fail',
              message: e.message,
              success: () => {
                if (e.code === 404) this.$router.push({path: '/login'});
                localStorage.clear()
              }
            });
            this.comment = ''
          })
        })
          .catch(e => {
            this.loading = false;
            this.$toast({
              icon:'fail',
              message: e.message
            })
          });
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../src/style/detail';
</style>
