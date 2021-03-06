import * as types from '../types'
import * as api from './api';
import axios from 'axios'
import global from '../../components/Wap/global/global.js'

const state = {
  direction: 'forward',
  baseUrl: global.baseUrl,
  bannerList: [],
  brandListData: [],
  classifyList: [],
  classifyList2: [],
  //商品列表页请求数据
  queryItemSearchParams: {currentPage: 1},
  //搜索关键词
  searchKeyWord:null,
  productsList: [],
  productsScrollText: '',
  qiNiuToken: {},            //七牛token
  qiNiuConfig: {
    url: 'http://upload-z2.qiniu.com/',
    ShUrl: 'http://orl5769dk.bkt.clouddn.com/'
  },
  goodNum: 1,
  goodSku: '',
  goodStar: null,
  nowStock: '', //商品库存
  qbBalance: '',  //用户乾币余额
  nowGoodDetails: {}, //商品详情
  orderDetails: {},     //用户商品订单
  orderList: [],             //用户商品订单
  addressBack: 0, //判断添加地址页面返回按钮 返回到哪里 1为后退到订单确认页面 0为history -1
  saveRootRouter :0, //判断是从什么页面到的商品列表页。1为首页，2为列表选择页
  saveJumpIndex : 0,
  saveChangeVerify: '',

  pushQbNum : {}, //保存钱币数量以及类型
  pushTiXianQbNum : {}, //保存钱币数量以及类型
  pushBankMss : {},
  brandAndClassify: {oneClassify:null,classifyTwoName:null}, //保存一级和二级分类目录选中项

  TXData: {
    timeTX: '', //保存计时器的缓存
    isShowDX: true, //开关
    text: '获取验证码',
  },
  companyInvoice: {}, //保存普通公司发票信息

  checkedDate: {},//保存创客我的业绩选择的日期
  saveCaseDressing: null,
  saveCaseOrder: 0,
  saveCaseSearching:'',
  caseOfIllness: {},
  saveDatumDressing: null, // 保存资料库筛选的值

  //社区
  video: null, //视频播放唯一性
  casedetail: null,
  videodetail: null,
  shareData: null,
  //资料库关键词
  databaseKeyword: null,
  moduleShow: false, //保存乾币充值页面的模态框状态
}

const getters = {
  TXData:state => {
    return state.TXData
  },
  saveJumpIndex : state => {
    return state.saveJumpIndex
  },
  saveChangeVerify : state => {
    return state.saveChangeVerify
  },
  saveRootRouter : state => {
    return state.saveRootRouter
  },
  pushQbNum : state => {
    return state.pushQbNum
  },
  pushBankMss : state => {
    return state.pushBankMss
  },
  pushTiXianQbNum : state => {
    return state.pushTiXianQbNum
  },
  [types.DONE_INDEX_CAROUSEL]: state => {
    return state.bannerList
  },
  [types.DONE_INDEX_BRAND]: state => {
    return state.brandListData
  },
  [types.COMPANY_INVOICE]: state => {
    return state.companyInvoice
  },
  saveCaseDressing : state => {
    return state.saveCaseDressing
  },
  saveCaseOrder : state => {
    return state.saveCaseOrder
  },
  saveCaseSearching :state => {
    return state.saveCaseSearching
  },
  caseOfIllness : state => {
    return state.caseOfIllness
  },
  moduleShow: state => {
    return state.moduleShow
  }
};

const mutations = {
  // 更新路由方向
  [types.UPDATE_DIRECTION](state,payload) {
    state.direction = payload.direction
  },
  // [types.SET](state,payload) {
  //   state.direction = payload.direction
  // },
  [types.VIDEO_PLAY](state,payload) {
    if(state.video != null && payload != state.video) {
      state.video.centerPlayImg = true;
      state.video.controlShow = false;
      state.video.currentTime = state.video.video.currentTime
      state.video.video.preload = 'none';
      state.video.video.load();
      state.video.videoState = 1;
    }
    state.video = payload
  },
  [types.SAVE_SHARE_DATA](state,all) {
    state.shareData = all
  },
  [types.SAVE_DATABASE_KEYWORD](state,all) {
    state.databaseKeyword = all
  },
  [types.SAVE_CASE_ORDER](state,all) {
    state.saveCaseOrder = all
  },

  [types.SAVE_TIME_SHOW](state,all) {
    state.TXData.isShowDX = all;
  },
  [types.SAVE_CASE_DRESSING](state,params) {
    state.saveCaseDressing = params;
  },
  [types.SAVE_DATUM_DRESSING](state,params) {
    state.saveDatumDressing = params;
  },
  [types.SAVE_CASE_SEARCHING](state,all) {
    state.saveCaseSearching = all;
  },
  [types.SAVE_CHANGE_VERIFY](state,all) {
    state.saveChangeVerify = all;
  },
  [types.SAVE_TIME_COUNT](state,time) {
    state.TXData.timeTX = 60;
    state.TXData.text = '秒后重发验证码';

    var timer = setInterval(function(){

      state.TXData.timeTX--;
      if(state.TXData.timeTX === 0)
      {
        state.TXData.isShowDX = true;
        state.TXData.timeTX = '';
        state.TXData.text = '获取验证码';
        clearInterval(timer);
      }
    },1000);
  },
  [types.SAVE_JUMP_INDEX](state, all){
    state.saveJumpIndex = all
  },


  [types.SAVE_SEARCH_WORD](state, all){
    state.searchKeyWord = all
  },
  [types.SAVE_ROOT_ROUTER](state, all){
    state.saveRootRouter = all
  },
  [types.PUSH_TQB_NUM_TYPE](state, all){
    state.pushTiXianQbNum = all
  },
  [types.PUSH_BANK_MSS](state, all){
    state.pushBankMss = all
  },
  [types.PUSH_QB_NUM](state, all){
    state.pushQbNum = all
  },
  //保存普通公司发票信息
  [types.COMPANY_INVOICE](state, all) {
    state.companyInvoice = all
  },
  [types.TOGGLE_INDEX_CAROUSEL](state, all) {
    state.bannerList = all
  },
  [types.TOGGLE_INDEX_BRAND](state, all) {
    state.brandListData = all
  },
  //存储分类和商标的请求参数信息
  [types.SAVE_CLASSIFY_AND_BRAND_INFO](state, all) {
    //将合并后的参数传给state
    state.queryItemSearchParams = Object.assign(state.queryItemSearchParams, all)
  },
  //存储分类和商标的请求参数信息
  [types.SAVE_PRODUCTS_LIST](state, all) {
    //将合并后的参数传给state
    state.productsList = all
  },
  // [types.TOGGLE_INDEX_CLASSIFY](state, all) {
  //     for (var i = 0; i < state.classifyItems.length; i++) {
  //         state.classifyItems[i].items = all
  //     }
  // },
  //存放用户的订全部单列表
  [types.SAVE_ORDERS_DETAILS](state, all) {
    state.orderDetails = all
  },
  //保存标签和分类
  [types.SAVE_BRAND_AND_CLASSIFY](state, all) {
    state.brandAndClassify = all
  },

  //保存创客我的业绩选择的日期
  [types.SAVE_CK_CHECKED_DATE](state, all) {
    state.checkedDate = all
  },
  // 保存病例信息
  [types.SAVE_CASEOFILLNESS](state, all){
    state.caseOfIllness = all
  },
  [types.SET_MODULE_STATUS](state, status) {
    state.moduleShow = status
  }
}

const actions = {
  [types.SAVE_TIME_SHOW]({commit}, all) {
      commit(types.SAVE_TIME_SHOW,all);
  },
  [types.SAVE_CHANGE_VERIFY]({commit}, all) {
      commit(types.SAVE_CHANGE_VERIFY,all);
  },
  [types.SAVE_TIME_COUNT]({commit}, state) {
      commit(types.SAVE_TIME_COUNT);
  },
  [types.SAVE_JUMP_INDEX]({commit}, all) {
    commit(types.SAVE_JUMP_INDEX, all);
  },
  [types.SAVE_ROOT_ROUTER]({commit}, all) {
    commit(types.SAVE_ROOT_ROUTER, all);
  },
  [types.PUSH_BANK_MSS]({commit}, all) {
    commit(types.PUSH_BANK_MSS, all);
  },
  [types.COMPANY_INVOICE]({commit}, all) {
    commit(types.COMPANY_INVOICE, all);
  },

  //保存钱币类型传值
  [types.PUSH_QB_NUM]({commit}, all){
    commit(types.PUSH_QB_NUM, all)
  },
  //保存钱币提现的数量
  [types.PUSH_TQB_NUM_TYPE]({commit}, all){
    commit(types.PUSH_TQB_NUM_TYPE,all)
  },
  setModuleStatus({commit}, status) {
    commit(types.SET_MODULE_STATUS, status)
  },
  // 获取首页轮播图
  [types.GET_CAROUSEL]() {
    return new Promise((resolve, reject) => {
      api.getCarousel().then((data) => {
        Promise.resolve(data).then(function (value) {
          state.bannerList = value.splice(6, 4)
        }, function (value) {
          // 不会被调用
        });
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取所有品牌
  [types.GET_BRAND]() {
    return new Promise((resolve, reject) => {
      api.getBrand().then((data) => {
        Promise.resolve(data).then(function (value) {
          state.brandListData = value
        }, function (value) {
          // 不会被调用
        });
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取用户信息钱币数量
  [types.GET_USERS_DATA]() {
    return new Promise((resolve, reject) => {
      api.getUsersData().then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 微信公众号内qian乾币支付
  [types.WX_COIN_PAY](context, params) {
    return new Promise((resolve, reject) => {
      api.wxCoinPay(params).then((data) => {
        console.log(JSON.stringify(data))
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 获取所有分类信息
  // [types.GET_CLASSIFY]() {
  //   return new Promise((resolve, reject) =>  {
  //     api.getClassify().then((data) => {
  //       Promise.resolve(data).then(function (value) {
  //         state.classifyList = value
  //       }, function (value) {
  //         // 不会被调用
  //       });
  //     }).catch((err) => {
  //       reject(err);
  //     });
  //   });
  // },
  // 获取所有分类信息
  [types.GET_CLASSIFY](context, params) {
    return new Promise((resolve, reject) => {
      api.getClassify(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取分类查询
  [types.GET_CLASSIFY_QUERY](context, params) {
    return new Promise((resolve, reject) => {
      api.getClassify(params).then((data) => {
        Promise.resolve(data).then(function (value) {
          state.classifyList = value
          for (var i = 0; i < state.classifyList.length; i++) {
            let index = i
            var obj = {
              oneClassify: state.classifyList[i].oneClassify,
            };
            // api.getItemQuery(obj).then((res) => {
            //   state.classifyList[index].classifyTwoList = res.data.data
            // }).catch((err) => {
            //   reject(err);
            // });
          }
        }, function (value) {
          // 不会被调用
        });
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取商品详情
  [types.GET_ITEM_DETAIL](context, params) {
    return new Promise((resolve, reject) => {
      api.getItemDetail(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取地址列表信息
  [types.GET_ADDRESS](context, params) {
    return new Promise((resolve, reject) => {
      api.getAddress(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 修改地址列表信息
  [types.EDIT_ADDRESS](context, params) {
    return new Promise((resolve, reject) => {
      api.editAddress(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  // 提现获取验证码
  [types.GET_VERIFY](context, params) {
    return new Promise((resolve, reject) => {
      api.getVerify(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 提现获取验证码
  [types.SAVE_CASH_BANK](context, params) {
    return new Promise((resolve, reject) => {
      api.saveCashBank(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 保存地址列表信息
  [types.SAVE_ADDRESS](context, params) {
    return new Promise((resolve, reject) => {
      api.saveAddress(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 判断提现钱币数量
  [types.GET_DATA_ED](context, params) {
    return new Promise((resolve, reject) => {
      api.getDaraEd(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 删除地址列表信息
  [types.DEL_ADDRESS](context, params) {
    return new Promise((resolve, reject) => {
      api.delAddress(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 用户注册
  [types.REGISTER_MSG](context, params) {
    return new Promise((resolve, reject) => {
      api.postRegister(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 用户密码登录
  [types.GET_LOGIN](context, params) {
    return new Promise((resolve, reject) => {
      api.getLogIn(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 用户登出
  [types.GET_LOGIN_OUT](context, params) {
    return new Promise((resolve, reject) => {
      api.getPersonList(params).then((data) => {
        // console.log("222"+data);
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 用户短信验证码登录
  [types.GET_LOGIN_MSG](context, params) {
    return new Promise((resolve, reject) => {
      api.getLogInMsg(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 获取用户订单
  [types.GET_ORDER_LIST](context, params) {
    return new Promise((resolve, reject) => {
      api.getOrderList(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 获取短信登录验证码
  [types.GET_IDENTICODE](context, params) {
    return new Promise((resolve, reject) => {
      api.getIdentiCode(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 查询是否绑定
  [types.QUERY_BIND](context, params) {
    return new Promise((resolve, reject) => {
      api.queryBind(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 绑定客服代表
  [types.BIND_CUSTOMER](context, params) {
    return new Promise((resolve, reject) => {
      api.bindCustomer(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 获取忘记密码修改
  [types.GET_FORGETCODE](context, params) {
    return new Promise((resolve, reject) => {
      api.getForgetCode(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  //app意见反馈
  [types.APP_FEEDBACK](context, params) {
    return new Promise((resolve, reject) => {
      api.appFeedback(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  //查询销售姓名
  [types.QUERY_SALE_NAME](context, params) {
    return new Promise((resolve, reject) => {
      api.querySaleName(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //绑定销售
  [types.BIND_SALE](context, params) {
    return new Promise((resolve, reject) => {
      api.bindSale(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  //获取品牌和商标列表
  [types.GET_ALL_CLASSIFY_AND_BRAND](context, params) {
    return new Promise((resolve, reject) => {
      api.getAllClassifyAndBrand(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //商品根据分类和品牌以及排序查询
  [types.QUERY_ITEM_SEARCH](context, params) {
    //提交请求信息
    context.commit(types.SAVE_CLASSIFY_AND_BRAND_INFO, params)
    return new Promise((resolve, reject) => {
      api.queryItemSearch(context.state.queryItemSearchParams).then((data) => {
        if (context.state.queryItemSearchParams.currentPage === 1) {
          context.commit(types.SAVE_PRODUCTS_LIST, data)
        } else {
          if (data.length) {
            context.state.productsScrollText = '正在加载更多'
          } else {
            context.state.productsScrollText = '没有更多内容了'
          }
          let temp = context.state.productsList
          data.forEach(item => {
            temp.push(item)
          })
          context.commit(types.SAVE_PRODUCTS_LIST, temp)
        }
        resolve(data)
      }).catch((err) => {
        console.error(err)
      });
    });
  },
  //获取七牛云上传token
  [types.GET_UPLOAD_TOKEN](context, params) {
    return new Promise((resolve, reject) => {
      api.getUpToken(params).then((data) => {
        context.state.qiNiuToken = {
          token: data.msg
        }
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //更新用户信息
  [types.UPDATE_USER_INFO](context, params) {
    return new Promise((resolve, reject) => {
      api.updateUserInfo(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  [types.GET_USER_INVITELIST](context, params) {
    return new Promise((resolve, reject) => {
      api.getUserInviteList(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //更新销售的信息
  [types.UPDATE_SALE_INFO](context, params) {
    return new Promise((resolve, reject) => {
      api.updateSaleInfo(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      })
    })
  },
  // 获取加入购物车
  [types.ADD_IN_CAR](context, params) {
    return new Promise((resolve, reject) => {
      api.addInCar(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 获取加入购物车
  [types.GET_CAR_LIST](context, params) {
    return new Promise((resolve, reject) => {
      api.getCarList(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 获取我的个人资料
  [types.GET_PERSON_LIST](context, params) {
    return new Promise((resolve, reject) => {
      api.getPersonList(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 保存个人资料
  [types.SAVE_PERSON_LIST](context, params) {
    return new Promise((resolve, reject) => {
      api.savePersonList(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 保存资质认证
  [types.SAVE_CERTIFICATION](context, params) {
    return new Promise((resolve, reject) => {
      api.saveCertification(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 获取收藏商品的信息
  [types.GET_GOODS_COLLECT](context, params) {
    return new Promise((resolve, reject) => {
      api.getGoodsCollect(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  //删除购物车商品
  [types.DEL_CAR_GOODS](context, params) {
    return new Promise((resolve, reject) => {
      api.delCarGoods(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  //更新购物车数量
  [types.UPDATE_GOODS_NUM](context, params) {
    return new Promise((resolve, reject) => {
      api.updateGoodsNum(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  //添加收藏
  [types.COLLECT_CARGO](context, params) {
    return new Promise((resolve, reject) => {
      api.collectCargo(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  //取消收藏
  [types.CANCEL_CARGO](context, params) {
    return new Promise((resolve, reject) => {
      api.cancelCargo(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  //搜索框搜索
  [types.SEARCH_WORD](context, params) {
    return new Promise((resolve, reject) => {
      api.searchWord(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  [types.CANCEL_USER_ORDER](context, params) {
    return new Promise((resolve, reject) => {
      api.cancelOrder(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  [types.QUERY_ORDER_DEATILS](context, params) {
    return new Promise((resolve, reject) => {
      api.queryOrderDetails(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },
  // 支付宝支付充值乾币
  [types.PAY_ZFB_COIN](context, params) {
    return new Promise((resolve, reject) => {
      api.payZfbCoin(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 支付宝支付充值轮询
  [types.ALI_COIN_SEARCH](context, params) {
    return new Promise((resolve, reject) => {
      api.aliCoinSearch(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 微信支付充值乾币
  [types.PAY_WX_COIN](context, params) {
    return new Promise((resolve, reject) => {
      api.payWxCoin(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 微信乾币支付充值轮询
  [types.WX_COIN_SEARCH](context, params) {
    return new Promise((resolve, reject) => {
      api.wxCoinSearch(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 微信订单支付充值轮询
  [types.WX_ORDER_SEARCH](context, params) {
    return new Promise((resolve, reject) => {
      api.wxOrderSearch(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 微信登录是否绑定查询
  [types.WX_LOGIN_SEARCH](context, params) {
    return new Promise((resolve, reject) => {
      api.wxLoginSearch(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 微信H5支付订单
  [types.WX_H5_PAY](context, params) {
    return new Promise((resolve, reject) => {
      api.wxH5Pay(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 微信公众号内订单支付
[types.WX_ORDER_PAY](context, params) {
  return new Promise((resolve, reject) => {
    api.wxOrderPay(params).then((data) => {
      resolve(data);
    }).catch((err) => {
      resolve(data);
    });
  });
},
  // 充值乾币优惠码
  [types.QB_DISCOUNT](context, params) {
    return new Promise((resolve, reject) => {
      api.QbDiscount(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 获取乾币明细
  [types.QB_DETAIL](context, params) {
    return new Promise((resolve, reject) => {
      api.QbDetail(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 根据地址计算运费
  [types.GET_FREIGHT](context, params) {
    return new Promise((resolve, reject) => {
      api.getFreight(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 用户提交订单
  [types.GET_SUBMIT](context, params) {
    return new Promise((resolve, reject) => {
      api.getSubmit(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 用户查询qb余额
  [types.GET_QB_NOW](context, params) {
    return new Promise((resolve, reject) => {
      api.getQbNow(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 查询qb抵扣
  [types.GET_QB_DK](context, params) {
    return new Promise((resolve, reject) => {
      api.getQbDk(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  //发表评论
  [types.PUBLISH_COMMENT](context, params) {
    return new Promise((resolve, reject) => {
      api.publishCommit(params).then((data) => {
        resolve(data);
        console.log(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  [types.QUERY_ORDER_LOG](context, params) {
    return new Promise((resolve, reject) => {
      api.queryOrderLog(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  [types.CONFIRM_ORDER](context, params) {
    return new Promise((resolve, reject) => {
      api.confirmOrder(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //查询发票
  [types.QUERY_ORDER_INVOICE](context, params) {
    return new Promise((resolve, reject) => {
      api.queryOrderInvoice(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },


  //获取左侧边栏列表
  [types.GET_PRODUCT_LEFT](context, params) {
    return new Promise((resolve, reject) => {
      api.getProductLeft(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  //展示商品分类
  [types.SHOW_CLASSIFY](context, params) {
    return new Promise((resolve, reject) => {
      api.showClassify(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 获取品牌列表
  [types.GET_BRAND_LIST](context, params) {
    return new Promise((resolve, reject) => {
      api.getBrandList(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  // 商品根据分类和品牌以及排序查询(Post)
  [types.QUERY_ITEM_SEARCH_POST](context, params) {
    return new Promise((resolve, reject) => {
      api.queryItemSearchPost(params).then((data) => {
        // state.productData = data.data.data
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },

  // 获取主推产品
  [types.GET_MAIN_PULL_PRODUCT](context, params) {
    return new Promise((resolve, reject) => {
      api.getMainPullProduct(params).then((data) => {
        // state.productData = data.data.data
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },

  // 获取不同的订单的数量
  [types.GET_ORDER_NUM](context, params) {
    return new Promise((resolve, reject) => {
      api.queryOrderNums(params).then((data) => {
        // state.productData = data.data.data
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  //
  [types.GET_SHARE_CODE](context, params) {
    return new Promise((resolve, reject) => {
      api.getShareCode(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //发布新的牙医圈
  [types.NEW_TREND](context, params) {
    return new Promise((resolve, reject) => {
      api.newTrend(params).then((data) => {
        // state.productData = data.data.data
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },

  //获取牙医圈列表
  [types.YAYI_CIRCLE](context, params) {
    return new Promise((resolve, reject) => {
      api.yayiCircle(params).then((data) => {
        // state.productData = data.data.data
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },

  //获取我的牙医圈列表
  [types.MY_YAYI_CIRCLE](context, params) {
    return new Promise((resolve, reject) => {
      api.myYayiCircle(params).then((data) => {
        // state.productData = data.data.data
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },

  //获取单条牙医圈列表
  [types.ONE_YAYI_CIRCLE](context, params) {
    return new Promise((resolve, reject) => {
      api.oneYayiCircle(params).then((data) => {
        // state.productData = data.data.data
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },

  //删除牙医圈的动态
  [types.DELETE_TREND](context, params) {
    return new Promise((resolve, reject) => {
      api.deleteTrend(params).then((data) => {
        // state.productData = data.data.data
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },

  //发布评论
  [types.ADD_COMMENT](context, params) {
    return new Promise((resolve, reject) => {
      api.addComment(params).then((data) => {
        // state.productData = data.data.data
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },

  //删除评论
  [types.DELETE_COMMENT](context, params) {
    return new Promise((resolve, reject) => {
      api.deleteComment(params).then((data) => {
        // state.productData = data.data.data
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },

  //搜索病例列表
  [types.SEARCH_CASE_LIST](context, params) {
    return new Promise((resolve, reject) => {
      api.searchCaseList(params).then((data) => {
        // state.productData = data.data.data
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },

  //点赞
  [types.LIKE](context, params) {
    return new Promise((resolve, reject) => {
      api.like(params).then((data) => {
        // state.productData = data.data.data
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },

  //获取消息列表
  [types.GET_INFO_DETAIL](context, params) {
    return new Promise((resolve, reject) => {
      api.getInfoDetail(params).then((data) => {
        // state.productData = data.data.data
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },

  //获取消息数量
  [types.GET_INFO_NUM](context, params) {
    return new Promise((resolve, reject) => {
      api.getInfoNum(params).then((data) => {
        // state.productData = data.data.data
        resolve(data);
      }).catch((err) => {
        resolve(err);
      });
    });
  },

  //创客登录
  [types.SALE_LOGIN](context, params) {
    return new Promise((resolve, reject) => {
      api.saleLogin(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  //创客短信登录
  [types.SALE_MSG_LOGIN](context, params) {
    return new Promise((resolve, reject) => {
      api.saleMsgLogin(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  //创客获取验证码
  [types.GET_SALE_IDENTICODE](context, params) {
    return new Promise((resolve, reject) => {
      api.getSaleCaptcha(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  //创客忘记密码
  [types.SALE_FORGET_PWD](context, params) {
    return new Promise((resolve, reject) => {
      api.saleFrogetPwd(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },
  //创客排行榜banner
  [types.SALE_CHARTS_BANNER](context, params) {
    return new Promise((resolve, reject) => {
      api.getCarousel(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },


  //创客我的业绩
  [types.GET_SALES_MY_ORDER](context, params) {
    return new Promise((resolve, reject) => {
      api.GetSaleMyOrder(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        resolve(data);
      });
    });
  },

  //获取创客发现在创客页面的已注册信息
  [types.GET_LOGINED](context, params) {
    return new Promise((resolve, reject) => {
      api.getLogin(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //获取创客发现在创客页面的未注册信息
  [types.GET_NO_LOGINED](context, params) {
    return new Promise((resolve, reject) => {
      api.getNoLogin(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  //获取创客我的客户页面的注册信息
  [types.GET_MY_CUSTOMER](context, params) {
    return new Promise((resolve, reject) => {
      api.getMyCustomer(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取发票信息
  [types.GET_ORDER_INVOICE](context, params) {
    return new Promise((resolve, reject) => {
      api.getOrderInvoice(params).then((data) => {
        resolve(data);
        // console.log(data)
      }).catch((err) => {
        reject(err);
      });
      })
  },
  //上传病例
  [types.UPLOAD_CASE](context, params) {
    return new Promise((resolve, reject) => {
      api.upLoadCase(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
      })
  },
  // 获取发现病例列表信息
  [types.GET_CASE_LIST](context, params) {
    return new Promise((resolve, reject) => {
      api.getCaseList(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  // 获取收藏病例列表信息
  [types.COLLECT](context, params) {
    return new Promise((resolve, reject) => {
      api.collect(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  // 收藏病例
  [types.CASE_COLLECT](context, params) {
    return new Promise((resolve, reject) => {
      api.caseCollect(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  // 获取病例详情信息
  [types.GET_CASE_DETAIL](context, params) {
    return new Promise((resolve, reject) => {
      api.getCaseDetail(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取病例评论
  [types.GET_CASE_COMMENT](context, params) {
    return new Promise((resolve, reject) => {
      api.getCaseComment(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 视频播放
  [types.GET_PLAY_VIDEOS](context, params) {
    return new Promise((resolve, reject) => {
      api.getPlayComment(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 视频详情播放
  [types.GET_VIDEOS_DETAIL](context, params) {
    return new Promise((resolve, reject) => {
      api.getVideosDetail(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 视频病例收藏
  [types.SAVE_M_COLLECT](context, params) {
    return new Promise((resolve, reject) => {
      api.saveMCollect(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 视频播放
  [types.GET_VIDEO_LIST](context, params) {
    return new Promise((resolve, reject) => {
      api.getVideoList(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 视频收藏
  [types.SAVE_COLLECT](context, params) {
    return new Promise((resolve, reject) => {
      api.saveCollect(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 我的病例
  [types.GET_MY_CASE](context, params) {
    return new Promise((resolve, reject) => {
      api.getMyCase(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 我的病例
  [types.GET_PAY_CASE](context, params) {
    return new Promise((resolve, reject) => {
      api.getPayCase(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 问答列表
  [types.FAQ_LIST](context, params) {
    return new Promise((resolve, reject) => {
      api.FAQList(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 我的问答
  [types.MY_QUESTION](context, params) {
    return new Promise((resolve, reject) => {
      api.myQuestion(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 我的回答
  [types.MY_ANSWER](context, params) {
    return new Promise((resolve, reject) => {
      api.myAnswer(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 发布问题
  [types.ADD_QUESTION](context, params) {
    return new Promise((resolve, reject) => {
      api.addQuestion(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 回答问题
  [types.ADD_ANSWER](context, params) {
    return new Promise((resolve, reject) => {
      api.addAnswer(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 收藏问题
  [types.FAQ_STAR](context, params) {
    return new Promise((resolve, reject) => {
      api.FAQStar(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 问答列表
  [types.FAQ_DETAIL](context, params) {
    return new Promise((resolve, reject) => {
      api.faqDetail(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取资料列表
  [types.GET_MATER_LIST](context, params) {
    return new Promise((resolve, reject) => {
      api.getMaterList(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    })
  },
  // 收藏资料
  [types.COLLECT_MATER](context, params) {
    return new Promise((resolve, reject) => {
      api.collectMater(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    })
  },
  // 资料详情
  [types.MATER_DETAIL](context, params) {
    return new Promise((resolve, reject) => {
      api.materDetail(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    })
  },
  // 资料收藏列表
  [types.COLLECT_MATER_LIST](context, params) {
    return new Promise((resolve, reject) => {
      api.collectMaterList(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    })
  },
  // 我的病例乾币
  [types.GET_USER_PAY](context, params) {
    return new Promise((resolve, reject) => {
      api.getUserPay(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 删除病例
  [types.DELETE_MYCASE](context, params) {
    return new Promise((resolve, reject) => {
      api.deleteMyCase(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 删除病例
  [types.PAY_CASE_DETAIL](context, params) {
    return new Promise((resolve, reject) => {
      api.payCaseDetail(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
   // 资料库列表
   [types.DATUMBASE_LIST](context, params) {
    return new Promise((resolve, reject) => {
      api.getDatumBaseList(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取企业录
  [types.GET_ENTERPRISE_DATA](context, params) {
    return new Promise((resolve, reject) => {
      api.getEnterpriseList(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取牙医的列表
  [types.GET_YAYI_DATA](context, params) {
    return new Promise((resolve, reject) => {
      api.getYayiList(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取消息列表
  [types.GET_TIPS_LIST](context, params) {
    return new Promise((resolve, reject) => {
      api.getTipsList(params).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 保存发现病分类筛选的值
  [types.SAVE_CASE_DRESSING]({commit}, params) {
    commit(types.SAVE_CASE_DRESSING,params);
  },
  [types.SAVE_CASE_ORDER]({commit}, params) {
    commit(types.SAVE_CASE_ORDER,params);
  },
  [types.SAVE_CASE_SEARCHING]({commit}, params) {
    commit(types.SAVE_CASE_SEARCHING,params);
  },
  // 保存资料库筛选的值
  [types.SAVE_DATUM_DRESSING]({commit}, params) {
    commit(types.SAVE_DATUM_DRESSING,params);
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
