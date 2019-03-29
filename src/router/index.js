import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/components/Search'
import Home from '@/components/Home'
import More from '@/components/More'
import Me from '@/components/Me'
import Profile from '@/components/Profile'
import Login from '@/components/Login'
import Detail from '@/components/Detail'
import OrderDetail from '@/components/OrderDetail'
import Signup from '@/components/Signup'
import Setup from '@/components/Setup'
import Money from '@/components/Money'
import Password from '@/components/Password'
import Over from '@/components/Over'
import Order from '@/components/Order'
import OrderCar from '@/components/OrderCar'
import MyOrder from '@/components/MyOrder'
import AlreadyOrder from '@/components/AlreadyOrder'
import CancelOrder from '@/components/CancelOrder'
import SendingOrder from '@/components/SendingOrder'
import BackOrder from '@/components/BackOrder'
import WaitOrder from '@/components/WaitOrder'
import BuyAgain from '@/components/BuyAgain'
import Restaurant from '@/components/Restaurant'
import PayNow from '@/components/PayNow'
import SendingOrderDetail from '@/components/SendingOrderDetail'
import AlreadyDetail from '@/components/AlreadyDetail'
import BackOrderDetail from '@/components/BackOrderDetail'
import OrderRecord from '@/components/OrderRecord'
import OrderRecordDetail from '@/components/OrderRecordDetail'
import BackOrderRecord from '@/components/BackOrderRecord'
import ConsumptionRecord from '@/components/ConsumptionRecord'
// const Home = r => require.ensure([], () => r(require('../components/Home')), 'Home')
// const More = r => require.ensure([], () => r(require('../components/More')), 'More')
// const Me = r => require.ensure([], () => r(require('../components/Me')), 'Me')
// const Login = r => require.ensure([], () => r(require('../components/Login')), 'Login')
// const Search = r => require.ensure([], () => r(require('../components/Search')), 'Search')
// const Detail = r => require.ensure([], () => r(require('../components/Detail')), 'Detail')

Vue.use(Router)

export default new Router({
	mode:'history',
    routes: [
        {
      	    path:'*',
            redirect:'/',
            meta: {
                index: 0
            },
        },
        {
            path: '/',
            name:'home',
            component: Home,
            meta: {
              index: 1
            },
            // children:[
            //     {
            //         name:'search',
            //         path: '/home/search',
            //         component: Search
            //     }
            // ],
            // meta: {
          	// 	keepAlive: true // 需要被缓存
        	// }
        },
        {
           path: '/search',
          name: 'search',
          component: Search,
          meta: {
            index: 2
          },

        },
      //   {
      //   path: '/video/:id',
      //   name: 'video',
      //   component: Detail,
      //   meta: {
      //     index: 3
      //   },
      // },
      {
        path: '/dishes/:id',
        name: 'dishes',
        component: Detail,
        meta: {
          index: 3
        },
      },
      {
        path: '/restaurant/:id',
        name: 'restaurant',
        component: Restaurant,
        meta: {
          index: 3
        },
      },
      {
        path: '/orderDetail/:id',
        name: 'orderDetail',
        component: OrderDetail,
        meta: {
          index: 3
        },
      },
      {
        path: '/buyAgain/:id',
        name: 'buyAgain',
        component: BuyAgain,
        meta: {
          index: 3
        },
      },
      {
        path: '/alreadyDetail/:id',
        name: 'alreadyDetail',
        component: AlreadyDetail,
        meta: {
          index: 3
        },
      },

      {
        path: '/payNow/:id',
        name: 'payNow',
        component: PayNow,
        meta: {
          index: 3
        },
      },
      {
        path: '/sendingOrderDetail/:id',
        name: 'sendingOrderDetail',
        component: SendingOrderDetail,
        meta: {
          index: 3
        },
      },
      {
        path: '/backOrderDetail/:id',
        name: 'backOrderDetail',
        component: BackOrderDetail,
        meta: {
          index: 3
        },
      },
      {
        path: '/orderRecordDetail/:id',
        name: 'orderRecordDetail',
        component: OrderRecordDetail,
        meta: {
          index: 3
        },
      },
      {
        path: '/order',
        name: 'order',
        component: Order,
        meta: {
          index: 4
        },

      },
        {
            path: '/all',
            name: 'all',
            component: More,
            meta: {
              index: 2
            },
        },
        {
            path: '/first',
            name: 'first',
            component: More,
            meta: {
              index: 2
            },

        },
        {
            path: '/second',
            name: 'second',
            component: More,
            meta: {
              index: 2
            },

        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
              index: 4
            },

        },
      {
        path: '/signup',
        name: 'signup',
        component: Signup,
        meta: {
          index: 4
        },

      },
        {
            path: '/me',
            name: 'me',
            component: Me,
            meta: {
              index: 2
            },
        },
      {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
          index: 3
        },
      },
      {
        path: '/orderCar',
        name: 'orderCar',
        component:  OrderCar,
        meta: {
          index: 2
        },
      },
      {
        path: '/cancelOrder',
        name: 'cancelOrder',
        component:  CancelOrder,
        meta: {
          index: 2
        },
      },
      {
        path: '/alreadyOrder',
        name: 'alreadyOrder',
        component:  AlreadyOrder,
        meta: {
          index: 2
        },
      },
      {
        path: '/waitOrder',
        name: 'waitOrder',
        component:  WaitOrder,
        meta: {
          index: 2
        },
      },
      {
        path: '/sendingOrder',
        name: 'sendingOrder',
        component: SendingOrder,
        meta: {
          index: 2
        },
      },
      {
        path: '/backOrder',
        name: 'backOrder',
        component: BackOrder,
        meta: {
          index: 2
        },
      },
      {
        path: '/orderRecord',
        name: 'orderRecord',
        component: OrderRecord,
        meta: {
          index: 2
        },
      },
      {
        path: '/backOrderRecord',
        name: 'backOrderRecord',
        component: BackOrderRecord,
        meta: {
          index: 2
        },
      },
      {
        path: '/consumptionRecord',
        name: 'consumptionRecord',
        component: ConsumptionRecord,
        meta: {
          index: 2
        },
      },
      {
        path: '/myOrder',
        name: 'myOrder',
        component:  MyOrder,
        meta: {
          index: 2
        },
      },
      {
        path: '/setup',
        name: 'setup',
        component: Setup,
        meta: {
          index: 2
        },
      },
      {
        path: '/password',
        name: 'password',
        component: Password,
        meta: {
          index: 3
        },
      },
      {
        path: '/money',
        name: 'money',
        component: Money,
        meta: {
          index: 3
        },
      },
      {
        path: '/over',
        name: 'over',
        component: Over,
        meta: {
          index: 3
        },
      }
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
