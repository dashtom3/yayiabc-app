import Vue from 'vue'
import Router from 'vue-router'

const Tab = resolve => require(['@/components/Wap/tab'], resolve)
const Index = resolve => require(['@/components/Wap/index/index'], resolve)
const classifyIndex = resolve => require(['@/components/Wap/classify/classifyIndex'], resolve)
const shoppingCar = resolve => require(['@/components/Wap/shoppingCar/shoppingCar'], resolve)
const shoppingCarEntry = resolve => require(['@/components/Wap/shoppingCar/shoppingCarEntry'], resolve)
const suborder = resolve => require(['@/components/Wap/shoppingCar/suborder'], resolve)
const pay = resolve => require(['@/components/Wap/shoppingCar/pay'], resolve)
const mine = resolve => require(['@/components/Wap/mine/mine'], resolve)
const details = resolve => require(['@/components/Wap/brandDes/brandDes'], resolve)
const logIn = resolve => require(['@/components/Wap/logIn/logIn'], resolve)
const wxlogIn = resolve => require(['@/components/Wap/index/wxlogIn'], resolve)
const wxBind = resolve => require(['@/components/Wap/index/wxBind'], resolve)
const register = resolve => require(['@/components/Wap/register/register'], resolve)
const logInMsg = resolve => require(['@/components/Wap/logIn/logInMsg'], resolve)
const forgetPwd = resolve => require(['@/components/Wap/logIn/forgetPwd'], resolve)
const personalData = resolve => require(['@/components/Wap/mine/personalData'], resolve)

const searchWord = resolve => require(['@/components/Wap/index/searchWord'], resolve)
const confirmAddress = resolve => require(['@/components/Wap/shoppingCar/confirmAddress'], resolve)
const myCoin = resolve => require(['@/components/Wap/mine/myCoin'], resolve)
const invoice = resolve => require(['@/components/Wap/shoppingCar/invoice'], resolve)
const customerService = resolve => require(['@/components/Wap/mine/customerService'], resolve)
const paySucced = resolve => require(['@/components/Wap/shoppingCar/paySucced'], resolve)
const exchange = resolve => require(['@/components/Wap/mine/exchange'], resolve)
const exchangeDetail = resolve => require(['@/components/Wap/mine/exchangeDetail'], resolve)
const appSetting = resolve => require(['@/components/Wap/mine/appSetting'], resolve)
const aboutApp = resolve => require(['@/components/Wap/mine/aboutApp'], resolve)
const comIntro = resolve => require(['@/components/Wap/mine/comIntro'], resolve)
const caseOfIllness = resolve => require(['@/components/Wap/community/case/caseOfIllness'], resolve)
const feedback = resolve => require(['@/components/Wap/mine/feedback'], resolve)
const caseIllness = resolve => require(['@/components/Wap/community/case/caseIllness'], resolve)

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

const collect = resolve => require(['@/components/Wap/mine/collect/collect'], resolve)
const datumDetail = resolve => require(['@/components/Wap/mine/collect/datumDetail'], resolve)
const goodCollect = resolve => require(['@/components/Wap/mine/collect/goodCollect'], resolve)
const datum = resolve => require(['@/components/Wap/mine/collect/datum'], resolve)
const datumBase = resolve => require(['@/components/Wap/index/datumBase'], resolve)

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
const communitySearch = resolve => require(['@/components/Wap/community/communitySearch'], resolve)
const QandAList = resolve => require(['@/components/Wap/community/QandA/QandAList'], resolve)
const QandADetail = resolve => require(['@/components/Wap/community/QandA/QandADetail'], resolve)
const newQuest = resolve => require(['@/components/Wap/community/QandA/newQuest'], resolve)

//牙医圈
const newTrend = resolve => require(['@/components/Wap/yayiCircle/newTrend'], resolve)
const yayiCircle = resolve => require(['@/components/Wap/yayiCircle/yayiCircle'], resolve)
const videoDetailed = resolve => require(['@/components/Wap/community/video/videoDetailed'], resolve)
const video = resolve => require(['@/components/Wap/community/video/video'], resolve)
const shareToYayiCircle = resolve => require(['@/components/Wap/yayiCircle/shareToYayiCircle'], resolve)

//我的消息
const infoIndex = resolve => require(['@/components/Wap/mine/information/infoIndex'], resolve)
const infoList = resolve => require(['@/components/Wap/mine/information/infoList'], resolve)
const infoDetail = resolve => require(['@/components/Wap/mine/information/infoDetail'], resolve)
const myQandA = resolve => require(['@/components/Wap/mine/myQandA/myQandA'], resolve)
const myAnswerList = resolve => require(['@/components/Wap/mine/myQandA/myAnswerList'], resolve)

// 企业录
const enterpriseRecord = resolve => require(['@/components/salesWap/enterpriseRecord/enterpriseRecord'], resolve)
const enterpriseList = resolve => require(['@/components/salesWap/enterpriseRecord/enterpriseList'], resolve)

const myCase = resolve => require(['@/components/Wap/mine/case/myCase'], resolve);
// const casePublish = resolve => require(['@/components/Wap/mine/case/casePublish'], resolve);
// const casePurchase = resolve => require(['@/components/Wap/mine/case/casePurchase'], resolve);
// const caseDrafts = resolve => require(['@/components/Wap/mine/case/caseDrafts'], resolve);

// 账户信息
const accountInfo = resolve => require(['@/components/Wap/mine/accountInfo'], resolve)
const qualifications = resolve => require(['@/components/Wap/mine/qualifications'], resolve)
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
        {
          path: '/yayi/find',
          component: caseIllness,
          name: 'find',
          redirect: {name: 'caseOfIllness'},
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
            {
              name: 'QandAList',
              path: '/QandAList',
              component: QandAList
            }
          ],
        },
        {path: '/yayi/yayiCircle', component: yayiCircle, name: 'yayiCircle'},
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
      name: 'datumBase',
      path: '/datumBase',
      component: datumBase
    },
    {
      name: 'collect',
      path: '/collect',
      component: collect,
      redirect: {name: 'goodCollect'},
      children:[
        {
          name: 'goodCollect',
          path: '/collect/goodCollect',
          component: goodCollect,
        },
        {
          name: 'caseOfIllnessCollect',
          path: '/collect/caseOfIllnessCollect',
          component: caseOfIllness
        },
        {
          name: 'videoCollect',
          path: '/collect/videoCollect',
          component: video
        },
        {
          name: 'questCollect',
          path: '/collect/questCollect',
          component: QandAList
        },
        {
          name: 'datumcollect',
          path: '/collect/datumcollect',
          component: datum
        },




      ]
    },
    {
      name: 'datumDetail',
      path: '/datumDetail',
      component: datumDetail
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
      name: 'videoDetailed',
      path: '/videoDetailed',
      component: videoDetailed
    },
    {
      name: 'shareToYayiCircle',
      path: '/shareToYayiCircle',
      component: shareToYayiCircle
    },
    {
      name: 'myYayiCircle',
      path: '/myYayiCircle',
      component: yayiCircle
    },
    {
      name: 'communitySearch',
      path: '/communitySearch',
      component: communitySearch,
      redirect: {name: 'caseOfIllnessSearch'},
      children: [
        {
          name: 'caseOfIllnessSearch',
          path: '/communitySearch/caseOfIllness',
          component: caseOfIllness
        },
        {
          name: 'videoSearch',
          path: '/communitySearch/video',
          component: video
        },
        {
          name: 'QASearch',
          path: '/communitySearch/QAndASearch',
          component: QandAList
        },
      ]
    },
    {
      name:'myQandA',
      path:'myQandA',
      component:myQandA,
      redirect: {name: '/myQandA/myQuestion'},
      children: [
        {
          name: 'myQuestion',
          path: '/myQandA/myQuestion',
          component: QandAList
        },
        {
          name: 'myAnswer',
          path: '/myQandA/myAnswer',
          component: myAnswerList
        },
      ]
    },
    {
      name: 'QandADetail',
      path: '/QandADetail',
      component: QandADetail,
    },
    {
      name: 'newQuest',
      path: '/newQuest',
      component: newQuest,
    },
    {
      name: 'myCase',
      path: '/myCase',
      component: myCase,
      children: [
        // {
        //   name: 'caseDrafts',
        //   path: '/caseDrafts',
        //   component: caseDrafts
        // },
        // {
        //   name: 'casePublish',
        //   path: '/casePublish',
        //   component: casePublish
        // },
        // {
        //   name: 'casePurchase',
        //   path: '/casePurchase',
        //   component: casePurchase
        // },
      ]
    },
    {
      name: 'accountInfo',
      path: '/account',
      component: accountInfo,
    },
    {
      name: 'editor',
      path: '/account/editor',
      component: personalData
    },
    {
      name: 'qualifications',
      path: '/account/qualifications',
      component: qualifications
    },
    {
      name: 'enterpriseRecord',
      path: '/enterpriseRecord',
      component: enterpriseRecord,
      children: [
        {
          name: 'enterpriseList',
          path: '/enterpriseList',
          component: enterpriseList
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
