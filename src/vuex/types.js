// actions types
export const GET_CAROUSEL = 'GET_CAROUSEL'                                // 获取首页轮播图
export const GET_BRAND = 'GET_BRAND'                                      // 获取所有品牌
export const GET_CLASSIFY = 'GET_CLASSIFY'                                // 获取所有分类
export const GET_CLASSIFY_QUERY = 'GET_CLASSIFY_QUERY'                    // 分类查询
export const GET_ITEM_DETAIL = 'GET_ITEM_DETAIL'                          // 获取商品详情
export const REGISTER_MSG = 'REGISTER_MSG'                                // 注册
export const GET_LOGIN = 'GET_LOGIN'                                      // 密码登录
export const GET_LOGIN_MSG = 'GET_LOGIN_MSG'                              // 短信登录
export const GET_LOGIN_OUT = 'GET_LOGIN_OUT'                              // 登出
export const GET_IDENTICODE = 'GET_IDENTICODE'                            // 获取验证码
export const GET_FORGETCODE = 'GET_FORGETCODE'                            // 忘记密码修改
export const ADD_IN_CAR = 'ADD_IN_CAR'                                    // 加入购物车
export const GET_CAR_LIST = 'GET_CAR_LIST'                                // 获取我的购物车
export const GET_PERSON_LIST = 'GET_PERSON_LIST'                          // 获取我的个人信息
export const SAVE_PERSON_LIST = 'SAVE_PERSON_LIST'                        // 保存个人信息
export const SAVE_CERTIFICATION = 'SAVE_CERTIFICATION'                    // 保存资质认证
export const DEL_CAR_GOODS = 'DEL_CAR_GOODS'                              // 删除购物车商品
export const UPDATE_GOODS_NUM = 'UPDATE_GOODS_NUM'                        // 更新购物车数量
export const COLLECT_CARGO = 'COLLECT_CARGO'                              // 添加收藏
export const CANCEL_CARGO = 'CANCEL_CARGO'                                // 取消收藏
export const GET_GOODS_COLLECT = 'GET_GOODS_COLLECT'                      // 获取我的个人收藏信息
export const SEARCH_WORD = 'SEARCH_WORD'                                  // 搜索框搜索
export const GET_ADDRESS = 'GET_ADDRESS'                                  // 获取收货地址列表信息
export const DEL_ADDRESS = 'DEL_ADDRESS'                                  // 删除收货地址列表信息
export const SAVE_TIME_COUNT = 'SAVE_TIME_COUNT'                          // 保存提现页面计时器的时间
export const SAVE_TIME_SHOW = 'SAVE_TIME_SHOW'                            // 保存提现页面计时器的显示开关
export const SAVE_CHANGE_VERIFY = 'SAVE_CHANGE_VERIFY'                    // 保存提现页面验证码
export const GET_DATA_ED = 'GET_DATA_ED'                                  // 提现判断钱币数量

export const PAY_ZFB_COIN = 'PAY_ZFB_COIN'                                // 支付宝充值钱币
export const PAY_WX_COIN = 'PAY_WX_COIN'                                  // 微信充值钱币
export const EDIT_ADDRESS = 'EDIT_ADDRESS'                                // 修改收货地址列表信息
export const SAVE_ADDRESS = 'SAVE_ADDRESS'                                // 保存收货地址列表信息
export const GET_FREIGHT = 'GET_FREIGHT'                                  // 根据地址计算运费
export const GET_SUBMIT = 'GET_SUBMIT'                                    // 用户提交订单
export const GET_QB_NOW = 'GET_QB_NOW'                                    // 用户查询qb余额
export const GET_QB_DK = 'GET_QB_DK'                                      // 查询qb抵扣
export const QUERY_BIND = 'QUERY_BIND'                                    // 查询是否绑定
export const BIND_CUSTOMER = 'BIND_CUSTOMER'                              // 绑定客服代表
export const QB_DISCOUNT = 'QB_DISCOUNT'                                  // 乾币优惠码兑换
export const QB_DETAIL = 'QB_DETAIL'                                      // 获取乾币明细
export const GET_USERS_DATA = 'GET_USERS_DATA'                            // 获取用户乾币
export const ALI_COIN_SEARCH = 'ALI_COIN_SEARCH'                          // 支付宝充值乾币轮询
export const WX_COIN_SEARCH = 'WX_COIN_SEARCH'                            // 微信充值乾币轮询
export const WX_ORDER_SEARCH = 'WX_ORDER_SEARCH'                          // 微信支付订单轮询
export const WX_LOGIN_SEARCH = 'WX_LOGIN_SEARCH'                          // 微信登录是否绑定查询
export const WX_H5_PAY = 'WX_H5_PAY'                                      // 微信H5支付订单

// mutstions types
export const TOGGLE_INDEX_CAROUSEL = 'TOGGLE_INDEX_CAROUSEL'              // 获取首页轮播图
export const TOGGLE_INDEX_BRAND = 'TOGGLE_INDEX_BRAND'                    // 获取首页品牌库
export const SAVE_ORDERS_DETAILS = 'SAVE_ORDERS_DETAILS'                  // 存放用户单个订单详情
export const UPDATE_DIRECTION = 'UPDATE_DIRECTION'                        // 更新路由方向

export const PUSH_QB_NUM = 'PUSH_QB_NUM'                                  // 保存我的钱币类型
export const PUSH_TQB_NUM_TYPE = 'PUSH_TQB_NUM_TYPE'                      // 选择提现的数量
export const PUSH_BANK_MSS = 'PUSH_BANK_MSS'                             // 提现银行信息
                      // 保存用户提现银行的信息
export const GET_VERIFY = 'GET_VERIFY'                                    // 提现获取验证码
export const SAVE_CASH_BANK = 'SAVE_CASH_BANK'                            // 保存提现的钱币数量
export const SAVE_TO_COIN = 'SAVE_TO_COIN'                                // 保存之前跳转页面1为mine
export const SAVE_JUMP_INDEX = 'SAVE_JUMP_INDEX'                                // 保存之前跳转页面1为mine
export const SAVE_CLASSIFY_BACK = 'SAVE_CLASSIFY_BACK'                    // 商品详情保存之前跳转页面
export const SAVE_ROOT_ROUTER = 'SAVE_ROOT_ROUTER'                        // 什么页面到的商品列表页


export const SAVE_BRAND_AND_CLASSIFY = 'SAVE_BRAND_AND_CLASSIFY'             // 保存标签和分类信息
export const SAVE_CK_CHECKED_DATE = 'SAVE_CK_CHECKED_DATE'                  // 保存创客我的业绩选择的日期
export const SAVE_SEARCH_WORD = 'SAVE_SEARCH_WORD'

export const COMPANY_INVOICE = 'COMPANY_INVOICE'                          // 存取普通公司发票信息
export const ADDRESS_SELECT = 'ADDRESS_SELECT'                             //存取地址的选择index


//  getters types
export const DONE_INDEX_CAROUSEL = 'DONE_INDEX_CAROUSEL'                  // 获取首页轮播图
export const DONE_INDEX_BRAND = 'DONE_INDEX_BRAND'                        // 获取首页品牌库


export const GET_PRODUCT_LEFT = 'GET_PRODUCT_LEFT'          // 获取左侧边栏列表
export const SHOW_CLASSIFY = 'SHOW_CLASSIFY'          // 展示商品分类
export const GET_BRAND_LIST = 'GET_BRAND_LIST'          // 获取品牌列表
export const QUERY_ITEM_SEARCH_POST = 'QUERY_ITEM_SEARCH_POST'             // 商品根据分类和品牌以及排序查询(Post)
export const GET_MAIN_PULL_PRODUCT = 'GET_MAIN_PULL_PRODUCT'             // 获取主推产品


export const GET_ORDER_NUM = 'GET_ORDER_NUM'                                // 查询订单的数量
export const CANCEL_USER_ORDER = 'CANCEL_USER_ORDER'                        // 取消用户订单
export const GET_ORDER_LIST = 'GET_ORDER_LIST'                              // 获取用户的商品订单
export const QUERY_ORDER_LOG = 'QUERY_ORDER_LOG'                            // 查看订单的物流
export const CONFIRM_ORDER = 'CONFIRM_ORDER'                                // 支付订单
export const QUERY_ORDER_INVOICE = 'QUERY_ORDER_INVOICE'                    // 查询发票


export const QUERY_ORDER_DEATILS = 'QUERY_ORDER_DEATILS'                  // 获取订单详情
export const PUBLISH_COMMENT = 'PUBLISH_COMMENT'                         // 发表评论
export const APP_FEEDBACK = 'APP_FEEDBACK'                         // 发表评论


export const GET_LOGIN_CAPTCHA = 'GET_LOGIN_CAPTCHA'              // 获取获取登录信息验证码
export const GET_USER_WX_STATE = 'GET_USER_WX_STATE'              // 获取微信端用户登录的状态信息
export const WX_BIND_USER = 'WX_BIND_USER'                        // 获取微信端用户登录的状态信息
export const WX_USER_REGISTER = 'USER_REGISTER'                   // 牙医用户注册
export const WX_SALE_REGISTER = 'SALE_REGISTER'                   // 创客用户注册
export const QUERY_SALE_NAME = 'QUERY_SALE_NAME'                  // 查询销售名字
export const BIND_SALE = 'BIND_SALE'                              // 绑定销售
export const WX_SCAN_QRCODE = 'WX_SCAN_QRCODE'                    // 微信扫码登录


export const UPLOAD_CASE = 'UPLOAD_CASE'                          //上传病例

export const GET_ALL_CLASSIFY_AND_BRAND = 'GET_ALL_CLASSIFY_AND_BRAND'                    // 获取所有商品分类和品牌列表
export const QUERY_ITEM_SEARCH = 'QUERY_ITEM_SEARCH'                                      // 商品根据分类和品牌以及排序查询
export const SAVE_CLASSIFY_AND_BRAND_INFO = 'SAVE_CLASSIFY_AND_BRAND_INFO'                // 保存分类和商标的请求信息
export const SAVE_PRODUCTS_LIST = 'SAVE_PRODUCTS_LIST'                                    // 保存商品列表
export const GET_UPLOAD_TOKEN = 'GET_UPLOAD_TOKEN'                                        // 获取七牛云上传token
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'                                        // 更新用户信息
export const UPDATE_SALE_INFO = 'UPDATE_SALE_INFO'                                        // 更新销售信息

export const YAYI_CIRCLE = 'YAYI_CIRCLE'                                              //获取牙医圈数据
export const NEW_TREND = 'NEW_TREND'                                                //牙医圈发布新内容
export const ADD_COMMENT = 'ADD_COMMENT'                                            //添加评论
export const DELETE_TREND = 'DELETE_TREND'                                          //牙医圈删除动态
export const LIKE = 'LIKE'                                                          //点赞
export const DELETE_COMMENT = 'DELETE_COMMENT'                                      //删除评论

/*
* 创客系统管理模块
* */

export const SALEINFO_QUERY = 'SALEINFO_QUERY'                            // 更新销售信息
export const SALE_REGISTER = 'SALE_REGISTER'                              // 创客注册
export const SALE_LOGIN = 'SALE_LOGIN'                                    // 创客登录
export const SALE_MSG_LOGIN = 'SALE_MSG_LOGIN'                            // 短信登录
export const GET_SALE_IDENTICODE = 'GET_SALE_IDENTICODE'                  // 创客获取验证码
export const SALE_FORGET_PWD = 'SALE_FORGET_PWD'                          // 创客忘记密码
export const SALE_CHARTS_BANNER = 'SALE_CHARTS_BANNER'                    // 创客排行榜banner
export const SALE_RANKING_DATA = 'SALE_RANKING_DATA'                      // 创客排行榜文字数据
export const SALE_RANKING_LIST = 'SALE_RANKING_LIST'                      // 创客排行榜TABLE数据
export const SALE_USER_LOGOUT = 'SALE_USER_LOGOUT'                        // 创客用户登出
export const SALE_UPDATE_POSTAL = 'SALE_UPDATE_POSTAL'                    // 创客体现设置
export const GET_SALE_CAPTCHA = 'GET_SALE_CAPTCHA'                        // 创客获取验证码
export const SALE_SUBMIT_WITHDRAW = 'SALE_SUBMIT_WITHDRAW'                // 创客提现申请

export const GET_WALLET_DETAIL = 'GET_WALLET_DETAIL'                      // 创客钱包详情
export const SAVE_BALANCE_ID = 'SAVE_BALANCE_ID'                          // 保存创客钱包的balanceId
export const POST_EDIT_SALEINFO = 'POST_EDIT_SALEINFO'                    // 创客修改个人信息
export const POST_BILL_DETAIL = 'POST_BILL_DETAIL'                  // 创客账单详情


export const GET_LOGINED = 'GET_LOGINED'                                  //获取已注册的信息
export const GET_NO_LOGINED = 'GET_NO_LOGINED'                            //获取未注册的信息
export const GET_MY_CUSTOMER = 'GET_MY_CUSTOMER'                          //获取我客户信息
export const GET_CUSTOMER_DETAIL = 'GET_CUSTOMER_DETAIL'                  //获取客户详情信息

export const CUSTOMER_IPHONE_DETAIL = 'CUSTOMER_IPHONE_DETAIL'            //保存客户详情手机号

export const IS_MINE_FIND = 'IS_MINE_FIND'                                //判断返回事件



export const GET_SALES_MY_ORDER = 'GET_SALES_MY_ORDER'                    // 创客获取我的业绩
export const GET_SALES_ECHARTS = 'GET_SALES_ECHARTS'                      // 获取Echarts数据
export const GET_SALES_ORDERLIST = 'GET_SALES_ORDERLIST'                  // 获取业绩订单列表
export const GET_SALES_ORDERDETAIL = 'GET_SALES_ORDERDETAIL'              // 获取业绩订单详情




export const GET_CASE_LIST = 'GET_CASE_LIST';                               //发现病例
export const SAVE_CASE_DRESSING = 'SAVE_CASE_DRESSING';                     //保存发现病例筛选按钮的值
export const SAVE_CASE_ORDER = 'SAVE_CASE_ORDER';                         //保存发现病例排序按钮的值
export const GET_CASE_DETAIL = 'GET_CASE_DETAIL';                         //保存病例详情
export const GET_CASE_COMMENT = 'GET_CASE_COMMENT';                         //保存病例评论





