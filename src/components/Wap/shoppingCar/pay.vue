<template>
  <div class="pay">
    <div class="logIn_header">
      <div class="header_box" @click="back">
        <img class="header_back" src="../../../images/logIn/back.png" alt="img">
      </div>
      <span class="logWithCode">支付订单</span>
    </div>
    <div class="coinPaySuccess">
      <div>
        <img class="warningPay" src="../../../images/order/pay.png" alt="img">
      </div>
      <p class="pay_word">
        请在30分钟内支付，超时系统会自动关闭订单～
      </p>
      <div class="moneys">
        <div class="money_num">
          <div class="circle_top_top">
            <div class="circle">
              <img src="../../../images/mine/circleBlue.png" alt="img">
            </div>
            <span class="marginLeft">订单号&nbsp;:&nbsp;<span class="orderNum">{{orderId}}</span></span>
          </div>
          <div class="circle_top">
            <div class="circle_box">
              <div class="circle">
                <img src="../../../images/mine/circleBlue.png" alt="img">
              </div>
              <span class="marginLeft">您共需支付:&nbsp;</span>
              <span class="fontBlue"> ¥&nbsp;{{payMoney}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--支付方式开始-->
    <div class="payWay">
      <div class="payWay_font">
        选择支付方式
      </div>
      <div @click="zfb_pay" class="payZFB" v-if="webFrom != 'WEIXIN'">
        <img class="zfb_img" src="../../../images/mine/zhifubao.png" alt="">
        <span :class="{ active: isActive1 }">支付宝</span>
        <img v-show="payShow" class="yesBlue" src="../../../images/mine/yesBlue.png" alt="">
      </div>
      <div @click="wx_pay" class="payWX">
        <img class="wx_img" src="../../../images/mine/weixin.png" alt="">
        <span :class="{ active: isActive2 }">微信支付</span>
        <img v-show="!payShow" class="yesBlue" src="../../../images/mine/yesBlue.png" alt="">
      </div>
    </div>
    <!--支付方式结束-->
    <mu-raised-button label="确认支付" class="confirmPay" @click="confirmPay"/>
  </div>
</template>

<script>
  import {tokenMethods} from '../../../vuex/util'
  import {Toast, MessageBox, Indicator} from 'mint-ui'
  import global from '../global/global.js'
  export default {
    name: 'pay',
    data() {
      return {
        orderId: '',
        payMoney: '',
        canHasCoin: '',
        payShow: true,
        isActive1: true,
        isActive2: false,
        kk: null,
        webFrom:'',
        moduleShow:false
      }
    },
    created() {
      if(global.webFrom() == 'WEIXIN'){
        this.webFrom = 'WEIXIN';
      }
      this.mBack('back');
      var that = this
      var order = JSON.parse(window.sessionStorage.getItem('order'))
      var code = this.queryToArgs()['code']
      // alert(window.location.search)
      // window.sessionStorage.removeItem('suborderData')
      that.orderId = order.OrderId
      that.payMoney = order.actualPay
      that.canHasCoin = order.giveQbNum
      // console.log(Number(order.giveQbNum));
      var wx_state = JSON.parse(window.sessionStorage.getItem('wxState'))
      if(wx_state ==1) {
        Indicator.open({
          text: '支付数据处理中...',
          spinnerType: 'fading-circle'
        });
        that.moduleShow = true;
        // alert('wxstate',wx_state)
        if (code && wx_state == 1) {
          // alert('openPay',code)
          that.wxOpenPay()
        }
      }
    },
    methods: {
      back() {
        MessageBox({
          title: '确定要离开支付页面？',
          message: '您的订单在30分钟内未支付将被取消，请尽快完成支付。',
          showCancelButton: true
        }).then(action => {
          this.$router.push({name: 'orderSubpage', params: {order_state: 0}})
          that.moduleShow = false;
          window.sessionStorage.removeItem('wxState')
          // this.$router.go(-1)
        }).catch(err => {
        })
      },
      isWeiXin(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          return true;
        }else{
          return false;
        }
      },
      wx_pay() {
        this.payShow = false
        this.isActive1 = false
        this.isActive2 = true
      },
      zfb_pay() {
        this.payShow = true
        this.isActive1 = true
        this.isActive2 = false
      },
      queryToArgs() {
        let query = window.location.search.substr(1),
          args = {}
        if (!query) return {}
        query.split('&').forEach(item => {
          let temp = item.split('=')
          args[temp[0]] = temp[1]
        })
        return args
      },
      confirmPay() {
        var that = this
        //支付宝支付
        if(this.webFrom == "WEIXIN") {
          // 微信手机网站支付
            var wxUrl = 'http://wap.yayiabc.com/#/pay'
            // var wxUrl = 'http://test.yayiabc.com/#/pay'
            var payData = {
              orderId: that.orderId,
              payMoney: that.payMoney,
              canHasCoin: that.canHasCoin
            }
          var wxState = 1
          window.sessionStorage.setItem('wxState', JSON.stringify(wxState))
          window.sessionStorage.setItem('wxPay', JSON.stringify(payData))
          window.location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4b1a6fde77626a32&redirect_uri=http%3A%2F%2Fwap.yayiabc.com%2F%23%2Fpay&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"

        }else {
        if (this.payShow == true) {
          //支付宝支付app端
          plus.nativeUI.showWaiting()
          mui.post(this.$store.state.index.baseUrl +  "/appPay/appPay", {
            orderId: that.orderId,
          }, function (data) {
            console.log(JSON.stringify(data), 'data')
            plus.nativeUI.closeWaiting()
            if (data.callStatus == 'SUCCEED') {
              plus.payment.request(aliChannel, data.data, function () {
                plus.nativeUI.showWaiting()
                that.kk = 1
                var timer = setInterval(function () {
                  if (that.kk == 600) {
                    clearInterval(timer)
                    return false
                  }
                  var obj = {
                    sign: 'orderPay',
                    id: data.msg,
                  }
                  that.$store.dispatch('ALI_COIN_SEARCH', obj).then((res) => {
                    console.log(JSON.stringify(res.msg), 'lihui')
                    if (res.msg == '成功') {
                      clearInterval(timer)
                      plus.nativeUI.closeWaiting()
                      that.$router.push({name: 'paySucced', params: {orderId: that.orderId, payMoney: that.payMoney, canHasCoin:that.canHasCoin}})
                      // plus.nativeUI.alert("支付成功")
                    } else {
                      console.log('支付失败')
                    }
                  })
                }, 2000)
              }, function (e) {
                console.log(JSON.stringify(e), 'hui')
                // alert(JSON.stringify(e))
                plus.nativeUI.alert("支付失败")
              });
            } else {
              plus.nativeUI.alert("支付失败")
            }
          });
        }
        // 微信支付
        else {
          //微信支付app端
          plus.nativeUI.showWaiting()
          mui.post(this.$store.state.index.baseUrl + "/appPay/unifiedOrderReturnUrl", {
            orderId: that.orderId,
          }, function (data) {
            var obj = {
              appid: data.data.appid,
              noncestr: data.data.noncestr,
              package: 'Sign=WXPay',
              partnerid: data.data.partnerid,
              prepayid: data.data.prepayid,
              timestamp: data.data.timestamp,
              sign: data.data.sign,
            }
            var dataPay = JSON.stringify(obj)
            plus.nativeUI.closeWaiting();
            if (data.callStatus == 'SUCCEED') {
              plus.payment.request(wxChannel, dataPay, function () {
                plus.nativeUI.showWaiting()
                that.kk = 1
                var timer = setInterval(function () {
                  if (that.kk == 600) {
                    clearInterval(timer)
                    return false
                  }
                  var obj = {
                    out_trade_no: that.orderId,
                  }
                  that.$store.dispatch('WX_ORDER_SEARCH', obj).then((res) => {
                    // plus.nativeUI.alert(JSON.stringify(res),'lihui')
                    if (res.num == 2) {
                      clearInterval(timer)
                      plus.nativeUI.closeWaiting()
                      that.$router.push({name: 'paySucced', params: {orderId: that.orderId, payMoney: that.payMoney,canHasCoin:that.canHasCoin}})
                      // plus.nativeUI.alert("支付成功")
                    } else {
                      plus.nativeUI.closeWaiting()
                      console.log("支付失败")
                    }
                  })
                }, 2000)
              }, function (e) {
                console.log(JSON.stringify(e));
                // alert(JSON.stringify(e));
                plus.nativeUI.alert("支付失败")
              })
            } else {
              plus.nativeUI.alert("支付失败，请稍后再试！")
            }
          })
        }
        }
      },
      wxOpenPay() {
        var that = this
        var code = this.queryToArgs()['code']
        var wxDataPay = JSON.parse(window.sessionStorage.getItem('wxPay'))
          var obj = {
            orderId: wxDataPay.orderId,
            code: code,
          }
          // alert(JSON.stringify(obj),'2323')
          that.$store.dispatch('WX_ORDER_PAY',obj).then((res) => {
            // alert(res.data)
            if (res.data.callStatus == 'SUCCEED') {
              wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.data.data.appid, // 必填，公众号的唯一标识
                timestamp: String(res.data.data.timestamp), // 必填，生成签名的时间戳
                nonceStr: res.data.data.noncestr, // 必填，生成签名的随机串
                signature: res.data.data.partnerid,// 必填，签名，见附录1
                jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              });
              wx.ready(function(){
                wx.chooseWXPay({
                  "timestamp": String(res.data.data.timestamp), // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                  "nonceStr": res.data.data.noncestr, // 支付签名随机串，不长于 32 位
                  "package": 'prepay_id=' + res.data.data.prepayid, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                  "signType": 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                  "paySign": res.data.data.sign, // 支付签名
                  success: function (res) {
                    // 支付成功后的回调函数
//                    if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                      that.kk = 1
                      var timer = setInterval(function () {
                        if (that.kk == 600) {
                          clearInterval(timer)
                          that.moduleShow = false;
                          Indicator.close()
                          return false
                        }
                        var obj = {
                          out_trade_no: wxDataPay.orderId
                        }
                        that.$store.dispatch('WX_ORDER_SEARCH', obj).then((res) => {
                          // plus.nativeUI.alert(JSON.stringify(res),'lihui')
                          if (res.num == 2) {
                            clearInterval(timer)
                            that.moduleShow = false;
                            Indicator.close()
                            that.$router.push({name: 'paySucced', params: {orderId: wxDataPay.orderId, payMoney: wxDataPay.payMoney,canHasCoin:wxDataPay.canHasCoin}})
                            window.sessionStorage.removeItem('wxCoin')
                            window.sessionStorage.removeItem('wxState')
                            // plus.nativeUI.alert("支付成功")
                          } else {
                            that.moduleShow = false;
                            Indicator.close()
                            window.sessionStorage.removeItem('wxState')
                            console.log("支付失败")
                          }
                        })
                      }, 2000)
                      //Toast({message: '支付成功', duration: 1500})
//                    }
                    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
//                    else{
//                      that.$router.go(-1)
//                    }
                  },
                  cancel: function (res) {
                    that.moduleShow = false;
                    window.sessionStorage.removeItem('wxState')
                    that.$router.go(-1)
                    Indicator.close()
                  }
                });
              });
              wx.error(function(res){
                that.moduleShow = false;
                Indicator.close()
                window.sessionStorage.removeItem('wxState')
                return false;
              });
            } else {
              that.moduleShow = false;
              console.log("支付失败")
              Indicator.close()
              window.sessionStorage.removeItem('wxState')
            }
          })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .active {
    color: $themeColor;
  }

  .pay {
    width: 100vw;
    height: 100vh;
    background-color: #F4F4F4;
  }

  .logIn_header {
    width: 100vw;
    height: px2vw(88);
    line-height: px2vw(88);
    z-index: 999;
    padding-bottom: 10vw;
    border-bottom: px2vw(1) solid $borderColor;
    text-align: center;
    background-color: $themeColor;
  }

  .header_box {
    width: px2vw(70);
    height: px2vw(73);
    float: left;
  }

  .header_back {
    width: px2vw(18);
    height: px2vw(29);
    margin-left: 2vw;
    margin-top: 4vw;
    float: left;
  }

  .logWithCode {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 80vw;
    height: px2vw(88);
    line-height: px2vw(88);
    display: inline-block;
    text-align: center;
    font-size: px2vw(32);
    color: #fff;
  }

  .coinPaySuccess {
    background-color: #fff;
    text-align: center;
  }

  .warningPay {
    width: px2vw(90);
    height: px2vw(90);
    margin-top: px2vw(60);
    margin-bottom: px2vw(20);
  }

  .pay_word {
    font-size: px2vw(32);
    color: #d81e06;
    margin-bottom: px2vw(30);
  }

  .moneys {
    padding-left: 11.5vw;
    padding-right: 11.5vw;
    padding-bottom: px2vw(30);
    // width: px2vw(595);
    // height: px2vw(177);
    // margin: 0 auto;
    // background-color: #eefafb;
  }

  .money_num {
    font-size: 3.7333336vw;
    position: relative;
    background-color: #eefafb;
    border: 1px solid #d1f1f4;
    padding: px2vw(34) px2vw(0) px2vw(37) px2vw(0);
  }

  .circle {
    margin-top: px2vw(-7);
    vertical-align: middle;
    display: inline-block;
    position: relative;
    width: px2vw(19);
    height: px2vw(19);
  }

  .circle img {
    position: absolute;
    top: px2vw(0);
    width: px2vw(19);
    height: px2vw(19);
  }

  .fontBlue {
    color: $themeColor;
  }

  .circle_top {
    margin-top: px2vw(36);
    text-align: left;
    padding-left: px2vw(80);
  }

  .marginLeft {
    margin-left: px2vw(20);
  }

  .payWay {
    margin-top: px2vw(20);
    margin-bottom: px2vw(90);
    background-color: #fff;
  }

  .payWay_font {
    font-size: px2vw(28);
    padding: px2vw(30) px2vw(20) 0 px2vw(20);
  }

  .payZFB {
    padding: px2vw(30) px2vw(20);
    border-bottom: px2vw(1) solid #E5E5E5;
    font-size: px2vw(28);
  }

  .payWX {
    padding: px2vw(30) px2vw(20);
    font-size: px2vw(28);
  }

  .zfb_img {
    vertical-align: middle;
    width: px2vw(40);
    height: px2vw(40);
    margin-right: px2vw(26);
  }

  .wx_img {
    vertical-align: middle;
    width: px2vw(47);
    height: px2vw(40);
    margin-right: px2vw(19);
  }

  .yesBlue {
    float: right;
    margin-top: px2vw(15);
    width: px2vw(26);
    height: px2vw(21);
  }

  .confirmPay {
    width: px2vw(580);
    height: px2vw(90);
    background-color: $themeColor;
    color: #fff;
    display: block;
    margin: 0 auto;
  }

  .orderNum {
    display: inline-block;
    max-width: px2vw(350);
    word-wrap: break-word;
    vertical-align: top;
    text-align: left;
  }

  .circle_top_top {
    text-align: left;
    padding-left: px2vw(80);
  }

</style>
