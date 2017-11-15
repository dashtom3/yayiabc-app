import Vue from 'vue'
import Router from 'vue-router'
import Tab from '@/components/Wap/tab'
import Index from '@/components/Wap/index/index'
import classifyIndex from '@/components/Wap/classify/classifyIndex'
import shoppingCar from '@/components/Wap/shoppingCar/shoppingCar'
import shoppingCarEntry from '@/components/Wap/shoppingCar/shoppingCarEntry'
import suborder from '@/components/Wap/shoppingCar/suborder'
import pay from '@/components/Wap/shoppingCar/pay'
import mine from '@/components/Wap/mine/mine'
import details from '@/components/Wap/brandDes/brandDes'
import logIn from '@/components/Wap/logIn/logIn'
import wxlogIn from '@/components/Wap/index/wxlogIn'
import wxBind from '@/components/Wap/index/wxBind'
import register from '@/components/Wap/register/register'
import logInMsg from '@/components/Wap/logIn/logInMsg'
import forgetPwd from '@/components/Wap/logIn/forgetPwd'
import personalData from '@/components/Wap/mine/personalData'
import collect from '@/components/Wap/mine/collect'
import searchWord from '@/components/Wap/index/searchWord'
import confirmAddress from '@/components/Wap/shoppingCar/confirmAddress'
import myCoin from '@/components/Wap/mine/myCoin'
import invoice from '@/components/Wap/shoppingCar/invoice'
import customerService from '@/components/Wap/mine/customerService'
import paySucced from '@/components/Wap/shoppingCar/paySucced'

import exchange from '@/components/Wap/mine/exchange'
import exchangeDetail from '@/components/Wap/mine/exchangeDetail'
import appSetting from '@/components/Wap/mine/appSetting'
import aboutApp from '@/components/Wap/mine/aboutApp'
import comIntro from '@/components/Wap/mine/comIntro'
import feedback from '@/components/Wap/mine/feedback'
import caseOfIllness from '@/components/Wap/community/case/caseOfIllness'
import video from '@/components/Wap/community/video/video'
import caseIllness from '@/components/Wap/community/case/caseIllness'

const coinDetail = resolve => require(['@/components/Wap/mine/coinDetail'], resolve)
const payResult = resolve => require(['@/components/Wap/mine/payResult'], resolve)
const coinCash = resolve => require(['@/components/Wap/mine/coinCash'], resolve)
const coinCashDetail = resolve => require(['@/components/Wap/mine/coinCashDetail'], resolve)
const cashSetting = resolve => require(['@/components/Wap/mine/cashSetting'], resolve)
const yyMP = resolve => require(['@/components/Wap/register/yyMP'], resolve)

/*order页面组件*/
const Order = resolve => require(['@/components/Wap/order/order'], resolve)
const OrderDetail = resolve => require(['@/components/Wap/order/children/orderDetail'], resolve)
const OrderSubpage = resolve => require(['@/components/Wap/order/children/orderSubpage'], resolve)
const Logistics = resolve => require(['@/components/Wap/order/children/logistics'], resolve)
const Comment = resolve => require(['@/components/Wap/order/children/comment'], resolve)

const address = resolve => require(['@/components/Wap/mine/adress'], resolve)
const addAddress = resolve => require(['@/components/Wap/mine/addAddress'], resolve)

/*wx_user组件*/
const User = resolve => require(['@/components/wx_user/user'], resolve)
const UserBindWx = resolve => require(['@/components/wx_user/children/userBindWx'], resolve)
const Bindinfo = resolve => require(['@/components/wx_user/children/bindinfo'], resolve)
const UserRegisterWx = resolve => require(['@/components/wx_user/children/userRegisterWx'], resolve)
const QrCode = resolve => require(['@/components/wx_user/qrcode'], resolve)

//创客组件
const salesIndex = resolve => require(['@/components/salesWap/index/index'], resolve)
const indexDetail = resolve => require(['@/components/salesWap/index/indexDetail'], resolve)
const salesCustomer = resolve => require(['@/components/salesWap/customer/salesCustomer'], resolve)
const salesLogin = resolve => require(['@/components/salesWap/login/login'], resolve)
const salesForgetPwd = resolve => require(['@/components/salesWap/login/forgetPwd'], resolve)
const salesRegister = resolve => require(['@/components/salesWap/register/saleRegister'], resolve)
const salesRange = resolve => require(['@/components/salesWap/saleCharts/saleCharts'], resolve)
const SalePersonal = resolve => require(['@/components/salesWap/personal/salePersonal'], resolve)
const SaleWallet = resolve => require(['@/components/salesWap/personal/subpage/saleWallet'], resolve)
const WalletDetail = resolve => require(['@/components/salesWap/personal/subpage/walletDetail'], resolve)
const WithdrawSetting = resolve => require(['@/components/salesWap/personal/subpage/withdrawSetting'], resolve)
const SaleWithdraw = resolve => require(['@/components/salesWap/personal/subpage/saleWithdraw'], resolve)
const SalePersonalData = resolve => require(['@/components/salesWap/personal/subpage/personalData'], resolve)
const myCustomer = resolve => require(['@/components/salesWap/customer/myCustomer'], resolve)
const customerDetails = resolve => require(['@/components/salesWap/customer/customerDetails'], resolve)
const billDetails = resolve => require(['@/components/salesWap/personal/subpage/billingDetails'], resolve)
const wxLogBindPhone = resolve => require(['@/components/salesWap/login/wxLogBindPhone'], resolve)
const wxBindCount = resolve => require(['@/components/salesWap/login/wxBindCount'], resolve)
const ckMP = resolve => require(['@/components/salesWap/ckMP'], resolve)
const Standard = resolve => require(['@/components/salesWap/index/standard'], resolve)

/*ProductList组件*/
const ProductList = resolve => require(['@/components/Wap/ProductList/ProductList.vue'], resolve)

//病例
const newCase = resolve => require(['@/components/Wap/community/case/newCase'], resolve)
const caseDetailed = resolve => require(['@/components/Wap/community/case/caseDetailed'], resolve)

//牙医圈
const newTrend = resolve => require(['@/components/Wap/yayiCircle/newTrend'], resolve)
const yayiCircle = resolve => require(['@/components/Wap/yayiCircle/yayiCircle'], resolve)

//我的消息
const infoIndex = resolve => require(['@/components/Wap/mine/information/infoIndex'], resolve)
const infoList = resolve => require(['@/components/Wap/mine/information/infoList'], resolve)
const infoDetail = resolve => require(['@/components/Wap/mine/information/infoDetail'], resolve)

Vue.use(Router)

let router = new Router({
  // mode: 'history',
  // scrollBehavior () {
  //   return { x: 0, y: 0 }
  // },
  routes: [
    {path: '/', redirect: {name: 'index'}},
    {
      path: '/yayi',
      component: Tab,
      name: 'tab',
      children: [
        {path: '/yayi/index', component: Index, name: 'index'},
        {path: '/yayi/classify', component: classifyIndex, name: 'classifyIndex'},
        {path: '/yayi/shoppingCar', component: shoppingCar, name: 'shoppingCar'},
        {path: '/yayi/mine', component: mine, name: 'mine'},
      ]
    },
    {
      path: '/logIn',
      name: 'logIn',
      component: logIn,
    },
    {
      path: '/wxlogIn',
      name: 'wxlogIn',
      component: wxlogIn
    },
    {
      path: '/wxBind',
      name: 'wxBind',
      component: wxBind
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      mate: {keepAlive: true}
    },
    {
      path: '/customerService',
      name: 'customerService',
      component: customerService,
    },
    {
      path: '/logInMsg',
      name: 'logInMsg',
      component: logInMsg,
    },
    {
      path: '/suborder',
      name: 'suborder',
      component: suborder,
    },
    {
      path: '/shoppingCarEntry',
      name: 'shoppingCarEntry',
      component: shoppingCarEntry,
    },
    {
      path: '/pay',
      name: 'pay',
      component: pay,
    },
    {
      path: '/forgetPwd',
      name: 'forgetPwd',
      component: forgetPwd,
    },
    {
      path: '/details/:goodId',
      name: 'details',
      component: details,
    },
    {
      name: 'wx_user',
      path: '/wx_user',
      component: User,
      children: [
        {path: '/wx_user/userBindWx', component: UserBindWx, name: 'userBindWx'},
        {path: '/wx_user/bindinfo', component: Bindinfo, name: 'bindinfo'},
        {path: '/wx_user/userRegisterWx', component: UserRegisterWx, name: 'userRegisterWx'}
      ]
    },
    {
      name: 'qrcode',
      path: '/qrcode',
      component: QrCode
    },
    {
      name: 'personalData',
      path: '/personalData',
      component: personalData
    },
    {
      name: 'collect',
      path: '/collect',
      component: collect
    },
    {
      name: 'searchWord',
      path: '/searchWord',
      component: searchWord
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      children: [
        {path: '/order/orderSubpage/:order_state', component: OrderSubpage, name: 'orderSubpage'}
      ]
    },
    {
      name: 'orderDetail',
      path: '/orderDetail',
      component: OrderDetail
    },
    {
      name: 'address',
      path: '/address',
      component: address
    },
    {
      name: 'addAddress',
      path: '/addAddress',
      component: addAddress
    },
    {
      name: 'payResult',
      path: '/payResult',
      component: payResult
    },
    {
      name: 'confirmAddress',
      path: '/confirmAddress',
      component: confirmAddress
    },
    {
      name: 'myCoin', redirect: {name: 'coinDetail'},
      path: '/myCoin',
      component: myCoin,
      children: [
        {
          name: 'coinDetail',
          path: '/coinDetail',
          component: coinDetail
        },
        {
          name: 'exchange',
          path: '/exchange',
          component: exchange
        },
        {
          name: 'exchangeDetail',
          path: '/exchangeDetail',
          component: exchangeDetail
        }
      ]
    },
    {
      name: 'productList',
      path: '/productList',
      component: ProductList,

    },
    {
      name: 'logistics',
      path: '/logistics',
      component: Logistics
    },
    {
      name: 'comment',
      path: '/comment',
      component: Comment
    },
    {
      name: 'invoice',
      path: '/invoice',
      component: invoice
    },
    {
      name: 'salesIndex',
      path: '/salesIndex',
      component: salesIndex
    },
    {
      name: 'salesCustomer',
      path: '/salesCustomer',
      component: salesCustomer
    },
    {
      name: 'paySucced',
      path: '/paySucced',
      component: paySucced
    },
    {
      name: 'salesLogin',
      path: '/salesLogin',
      component: salesLogin
    },
    {
      name: 'salesForgetPwd',
      path: '/salesForgetPwd',
      component: salesForgetPwd
    },
    {
      name: 'salesRegister',
      path: '/salesRegister',
      component: salesRegister,
    },
    {
      name: 'salesRange',
      path: '/salesRange',
      component: salesRange
    },
    {
      name: 'salePersonal',
      path: '/salePersonal',
      component: SalePersonal
    },
    {
      name: 'saleWallet',
      path: '/salePersonal/saleWallet',
      component: SaleWallet
    },
    {
      name: 'withdrawSetting',
      path: '/salePersonal/withdrawSetting',
      component: WithdrawSetting
    },
    //todo
    {
      name: 'walletDetail',
      path: '/salePersonal/walletDetail',
      component: WalletDetail
    },
    {
      name: 'saleWithdraw',
      path: '/salePersonal/saleWithdraw',
      component: SaleWithdraw
    },
    {
      name: 'salePersonalData',
      path: '/salePersonal/personalData',
      component: SalePersonalData
    },
    {
      name: 'myCustomer',
      path: '/myCustomer',
      component: myCustomer
    },
    {
      name: 'customerDetails',
      path: '/customerDetails',
      component: customerDetails
    },
    {
      name: 'coinCash',
      path: '/coinCash',
      component: coinCash
    },
    {
      name: 'coinCashDetail',
      path: '/coinCashDetail',
      component: coinCashDetail
    },
    {
      name: 'cashSetting',
      path: '/cashSetting',
      component: cashSetting
    },
    {
      name: 'standard',
      path: '/standard',
      component: Standard
    },
    {
      name: 'indexDetail',
      path: '/indexDetail',
      component: indexDetail
    },
    {
      name: 'billDetails',
      path: '/salePersonal/billDetails',
      component: billDetails
    }, {
      name: 'wxLogBindPhone',
      path: '/wxLogBindPhone',
      component: wxLogBindPhone
    }, {
      name: 'ckMP',
      path: '/ckMP',
      component: ckMP
    }, {
      name: 'wxBindCount',
      path: '/wxBindCount',
      component: wxBindCount
    }, {
      name: 'yyMP',
      path: '/yyMP',
      component: yyMP,
      mate: {keepAlive: true}
    },
    {
      name: 'appSetting',
      path: '/appSetting',
      component: appSetting
    },
    {
      name: 'aboutApp',
      path: '/aboutApp',
      component: aboutApp
    },
    {
      name: 'comIntro',
      path: '/comIntro',
      component: comIntro
    },
    {
      name: 'feedback',
      path: '/feedback',
      component: feedback
    },
    {
      name: 'newCase',
      path: '/newCase',
      component: newCase
    },
    {

      name: 'newTrend',
      path: '/newTrend',
      component: newTrend
    },
    {
      name: 'caseDetailed',
      path: '/caseDetailed',
      component: caseDetailed
    },
    {
      name: 'yayiCircle',
      path: '/yayiCircle',
      component: yayiCircle
    },
    {
      name: 'infoIndex',
      path: '/infoIndex',
      component: infoIndex
    },
    {
      name: 'infoList',
      path: '/infoList',
      component: infoList
    },
    {
      name: 'infoDetail',
      path: '/infoDetail',
      component: infoDetail
    },
    {
      name: 'caseIllness', redirect: {name: 'caseOfIllness'},
      path: '/caseIllness',
      component: caseIllness,
      children: [
        {
          name: 'caseOfIllness',
          path: '/caseOfIllness',
          component: caseOfIllness
        },
        {
          name: 'video',
          path: '/video',
          component: video
        },
      ]
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (window.navigator.onLine == true) {
    next()
  } else {
    plus.nativeUI.alert("网络请求失败，请检查网络！")
  }
})

export default router
