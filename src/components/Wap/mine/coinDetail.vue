<template>
  <div>
    <div class="wrap">
    <!--选择钱币类型开始-->
    <ul class="coinDetail_box">
      <li>
        <span>选择乾币类型</span>
        <span class="coinClass">(&nbsp;注:&nbsp;&nbsp;1乾币=1元购买力&nbsp;)</span>
      </li>
      <!--1枚起购-->
      <li @click="select_1" :class="{'selectCoin': selectCoinShow == 1}">
      <img class="coinMoney2_img" src="../../../images/mine/coinMoney955.png" alt="img">
      <span>1枚起购&nbsp;&nbsp;(&nbsp;1枚乾币售价:&nbsp;0.95元&nbsp;)</span>
      <img v-show="selectCoinShow == 1" class="yes_img" src="../../../images/mine/yes.png" alt="">
      </li>
      <!--3000枚起购-->
      <!-- <li @click="select_3000" :class="{'selectCoin': selectCoinShow == 3000}">
        <img class="coinMoney2_img" src="../../../images/mine/coinMoney99.png" alt="img">
        <span>2000枚起购&nbsp;&nbsp;(&nbsp;1枚乾币售价:&nbsp;0.9元&nbsp;)</span>
        <img v-show="selectCoinShow == 3000" class="yes_img" src="../../../images/mine/yes.png" alt="">
      </li> -->
      <!--12000枚起购-->
      <li  @click="select_12000" :class="{'selectCoin': selectCoinShow == 12000}">
        <img class="coinMoney2_img" src="../../../images/mine/coinMoney88.png" alt="img">
        <span>5000枚起购&nbsp;&nbsp;(&nbsp;1枚乾币售价:&nbsp;0.8元&nbsp;)</span>
        <img v-show="selectCoinShow == 12000" class="yes_img" src="../../../images/mine/yes.png" alt="">
      </li>
    </ul>
    <!--选择钱币类型结束-->
    <!--充值个数开始-->
    <div class="payCoins pay-one">
      <span>充值的乾币数</span>
      <input  v-model="moneyCoins" type="tel" placeholder="请输入本次充值乾币个数">
    </div>
    <div class="payCoins">
      <span>实际支付金额</span>
      <span class="payCoins_color">{{allprice}}</span>
    </div>
    <!--充值个数结束-->
    <!--支付方式开始-->
    <div class="payWay">
      <div class="payWay_font">
        支付方式
      </div>
      <div @click="zfb_pay" class="payZFB" v-if="webFrom != 'WEIXIN'">
        <img class="zfb_img" src="../../../images/mine/zhifubao.png" alt="">
        <span>支付宝</span>
        <img v-show="payShow" class="yesBlue" src="../../../images/mine/yesBlue.png" alt="">
      </div>
      <div @click="wx_pay" class="payZFB">
        <img class="wx_img" src="../../../images/mine/weixin.png" alt="">
        <span>微信支付</span>
        <img v-show="!payShow" class="yesBlue" src="../../../images/mine/yesBlue.png" alt="">
      </div>
    </div>
    <!--支付方式结束-->
    </div>
    <!--立即支付开始-->
    <mu-raised-button label="立即支付" class="pay" @click="pay"/>
    <!--立即支付结束-->
    <!--末尾-->
  </div>
</template>

<script>

  import {tokenMethods} from '../../../vuex/util'
  import {Toast,Indicator} from 'mint-ui'
  import global from '../global/global.js'
  import {mapActions} from 'vuex'
  // import {mapActions} from 'vuex'
  export default {
    name: 'coinDetail',
    data(){
      return{
        moneyCoins: '',
        selectCoinShow : 1,
        payShow: true,
        amount : '',
        qbType : 'c_qb',
        kk: null,
        webFrom:''
      }
    },
    watch:{
      moneyCoins:function (val, valold) {
        console.log(val);
        if(val < 2000)
        {
          this.selectCoinShow = 1
          this.qbType = 'c_qb'
        }else if(val >= 5000)
        {
          this.selectCoinShow = 12000
          this.qbType = 'a_qb'
        }
        // else if(val >= 2000 && val < 5000)
        // {
        //   this.selectCoinShow = 3000
        //   this.qbType = 'b_qb'
        // }
        if( !new RegExp(/^[1-9]([0-9]*)$|^[0-9]$/).test(val))
        {
          this.moneyCoins = ''
        }
      }
    },
    computed:{
      allprice(){
        let reg = /^([1-9]\d{0,9}|0)$/;
        if(reg.test(this.moneyCoins))
        {
          if(this.selectCoinShow === 1)
          {
            this.amount = 0.95 * this.moneyCoins;
            return this.amount.toFixed(2)
          }
          else if(this.selectCoinShow === 3000)
          {
            if(this.moneyCoins >= 2000)
            {
              this.amount = 0.9 * this.moneyCoins;
              return this.amount.toFixed(2)
            }else {
              return '请输入大于2000的乾币数量'
            }
          }
          else if(this.selectCoinShow === 12000)
          {
            if(this.moneyCoins >= 5000)
            {
              this.amount = 0.8 * this.moneyCoins;
              return this.amount.toFixed(2)
            }else {
              return '请输入大于5000的乾币数量'
            }

          }
        }else {
          this.amount = 0;
          return this.amount
        }

      }
    },
    created: function() {
      // var that = this
      if(global.webFrom() == 'WEIXIN') {
        this.webFrom = 'WEIXIN'
      }
      var that = this
  var code = this.queryToArgs()['code']
    //  alert('code',code);
  var wx_state = JSON.parse(window.sessionStorage.getItem('wxState'))
  if(wx_state ==1){
    Indicator.open({
      text: '支付数据处理中...',
      spinnerType: 'fading-circle'
    });
    // alert('wx_state',wx_state);
    that.setModuleStatus(true)
    // that.moduleShow = true;
    if (code && wx_state == 1) {
      var wxData = JSON.parse(window.sessionStorage.getItem('wxCoin'))
//        Indicator.open()
      var obj = {
        token: tokenMethods.getWapToken(),
        qbType: wxData.qbType,
        code: code,
        money: parseInt(wxData.money),
      }
      that.placeH = wxData.money
      that.coin = false
      that.qbType = wxData.qbType;
      that.coinallprice = wxData.amount
      that.moneyCoins = wxData.money
      //  alert(JSON.stringify(obj))

      that.$store.dispatch('WX_COIN_PAY',obj).then((res) => {
        //  alert(JSON.stringify(res.data))
//          window.location.reload();
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
                that.kk = 1
                var timer = setInterval(function(){
                  if (that.kk == 600) {
                    clearInterval(timer)
                    // that.moduleShow = false;
                    that.setModuleStatus(false)
                    Indicator.close()
                    return false
                  }
                  that.$store.dispatch('WX_COIN_SEARCH').then((res) => {
                    if (res.num == 2) {
                      clearInterval(timer)
//                          alert(window.location.href);
                      that.$router.push({ name: 'payResult', params: {moneyCoins: wxData.money, amount: wxData.amount}})
                      // that.moduleShow = false;
                      that.setModuleStatus(false)
                      Indicator.close()
                      window.sessionStorage.removeItem('wxState')
                      window.sessionStorage.removeItem('wxCoin')
                    } else {
                      // that.moduleShow = false;
                      that.setModuleStatus(false)
                      Indicator.close()
                      window.sessionStorage.removeItem('wxState')
                      console.log("充值失败")
                    }
                  })
                },2000)
              },
              cancel: function (res) {
                // that.moduleShow = false;
                that.setModuleStatus(false)
                Indicator.close()
                that.$router.go(-1)
                window.sessionStorage.removeItem('wxState')
              }
            });
          });
          wx.error(function(res){
//              alert(res.err_msg);
//              alert('aa');
            // that.moduleShow = false;
            that.setModuleStatus(false)
            Indicator.close()
            window.sessionStorage.removeItem('wxState')
            return false;
          });
        } else {
          // that.moduleShow = false;
          that.setModuleStatus(false)
          Indicator.close()
          console.log("充值失败")
          window.sessionStorage.removeItem('wxState')
        }
      })
    } else {
      that.placeH = '请输入本次充值乾币个数'
      that.coin = true
      window.sessionStorage.removeItem('wxCoin');
      // that.moduleShow = false;
      that.setModuleStatus(false)
      Indicator.close()
    }
  }
},
    methods:{
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
      ...mapActions([
        'setModuleStatus'
      ]),
      pay(){
        var that = this
        //判断总价钱是否为0
        if(that.amount == 0) {
          Toast({message: '请输入正确的充值的数量', duration: 800})
        } else {
          //微信网页公众号充值
          if(this.webFrom == 'WEIXIN') {
            var wxUrl = 'http://wap.yayiabc.com/?#/coinDetail'
            // var wxUrl = 'http://test.yayiabc.com/?#/coinDetail'
            var data = {
              money: that.moneyCoins,
              amount: that.amount,
              qbType: that.qbType
            }
            // +encodeURI(wxUrl)+
            window.sessionStorage.setItem('wxCoin', JSON.stringify(data))
            var wxState = 1
            window.sessionStorage.setItem('wxState', JSON.stringify(wxState))
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4b1a6fde77626a32&redirect_uri=http%3A%2F%2Fwap.yayiabc.com%2F%23%2FcoinDetail&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
          } else {
            //支付宝支付app端
          if(that.payShow == true) {
            //查询个人信息
            console.log(that.qbType)
            console.log(this.$store.state.index.baseUrl);
            plus.nativeUI.showWaiting();
            mui.post(this.$store.state.index.baseUrl + "/pay/appRecharge", {
              token: tokenMethods.getWapToken(),
              qbNum: that.moneyCoins,
              qbType: that.qbType,
            }, function(data) {
              console.log(JSON.stringify(data),'data')
              plus.nativeUI.closeWaiting();
              if (data.callStatus == 'SUCCEED') {
                plus.payment.request(aliChannel, data.data, function() {
                  plus.nativeUI.showWaiting()
                  that.kk = 1
                  var timer = setInterval(function(){
                    if (that.kk == 600) {
                      clearInterval(timer)
                      return false
                    }
                    var obj = {
                      sign: 'coinPay',
                      id: data.msg,
                    }
                    that.$store.dispatch('ALI_COIN_SEARCH', obj).then((res) => {
                      console.log(JSON.stringify(res.msg),'lihui')
                      if (res.msg == '成功') {
                        clearInterval(timer)
                        plus.nativeUI.closeWaiting()
                        that.$router.push({ name: 'payResult', params: {moneyCoins: that.moneyCoins, amount: that.amount}})
                      } else {
                        plus.nativeUI.alert("充值失败")
                      }
                    })
                  },2000)
                }, function(e) {
                    console.log(JSON.stringify(e),'hui');
                    // alert(JSON.stringify(e));
                    plus.nativeUI.alert("充值失败");
                });
              } else {
                  plus.nativeUI.alert("支付失败");
              }
            });

          } else {
            // 微信充值乾币app端
            plus.nativeUI.showWaiting()
            mui.post( this.$store.state.index.baseUrl + "/appPay/unifiedOrderCharge", {
              token: tokenMethods.getWapToken(),
              money: this.moneyCoins,
              qbType: this.qbType,
            }, function(data) {
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
//                  plus.nativeUI.alert(JSON.stringify(data),'huihui')
                  plus.payment.request(wxChannel, dataPay, function() {
                    plus.nativeUI.showWaiting()
                    that.kk = 1
                    var timer = setInterval(function(){
                      if (that.kk == 600) {
                        clearInterval(timer)
                        return false
                      }
                      that.$store.dispatch('WX_COIN_SEARCH').then((res) => {
//                        plus.nativeUI.alert(JSON.stringify(res),'lihui')
                        if (res.num == 2) {
                          clearInterval(timer)
                          plus.nativeUI.closeWaiting()
                          that.$router.push({ name: 'payResult', params: {moneyCoins: that.moneyCoins, amount: that.amount}})
                          // plus.nativeUI.alert("充值成功")
                        } else {
                          plus.nativeUI.closeWaiting()
                          console.log("充值失败")
                        }
                      })
                    },2000)
                  }, function(e) {
                      console.log(JSON.stringify(e));
                      // alert(JSON.stringify(e));
                      plus.nativeUI.alert("充值失败");
                  });
              } else {
                  plus.nativeUI.alert("充值失败，请稍后再试！");
              }
            })
          }

          }
        }
      },
      wx_pay(){
        this.payShow = false
      },
      zfb_pay(){
        this.payShow = true
      },
      select_1(){
        this.selectCoinShow = 1;
        this.qbType = 'c_qb';
      },
      select_3000(){
        this.selectCoinShow = 3000;
        this.qbType = 'b_qb'
      },
      select_12000(){
        this.selectCoinShow = 12000;
        this.qbType = 'a_qb'
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .wrap{
    overflow: scroll;
    height: 65vh;
  }
  .coinDetail_box {
    font-size: 3.73333vw;
    margin-top: px2vw(-15);
    width: 100vw;
    padding: 0 2.8vw;
    border-bottom: px2vw(20) solid #f4f4f4;
  }
  .coinDetail_box li{
    padding: px2vw(26) 0;
  }
  .coinDetail_box li:nth-child(1){
    background-color: white;
  }
  .coinDetail_box li:last-child{
    margin-bottom: px2vw(24);
  }
  .coinClass {
    color: #d81e06;
    font-size: 4vw;
  }

  .coinDetail_box li:nth-child(n+2){
    background-color: #f7f7f9;
  }
  .coinDetail_box li:nth-child(3){
    border-bottom: px2vw(1) solid $borderColor;
    border-top: px2vw(1) solid $borderColor;
  }
  .coinMoney2_img {
    margin-left: 2.78vw;
    vertical-align: middle;
    width: px2vw(36);
    height: px2vw(36);
  }

  .yes_img {
    float: right;
    width: px2vw(26);
    height: px2vw(21);
    margin-top: px2vw(14);
    margin-right: 2.7vw;
  }
  .selectCoin{
    background-color:#eeeeee !important;
  }
  .payCoins {
    font-size: 4.2666667vw;
    padding: px2vw(30) px2vw(20);
    border-bottom: px2vw(20) solid #f7f7f9;
  }
  .pay-one{
    border-bottom: px2vw(1) solid #e5e5e5;
  }
  .payCoins input{
    width: 42vw;
    padding-top: px2vw(7);
    float: right;
    border: none;
    font-size: 3.7333333vw;
    outline: none;
    text-align: right;
  }

  .payCoins_color {
    float: right;
    color: red;
  }

  .payWay {
    border-bottom: px2vw(20) solid #f7f7f9;
  }
  .payWay_font {
    font-size: 4.266667vw;
    padding: px2vw(30) px2vw(20) 0 px2vw(20);
  }

  .payZFB {
    padding: px2vw(30) px2vw(20);
  }
  .payZFB{
    font-size: 3.73333vw;
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

  .pay {
    display: block;
    font-size: 4.233333vw;
    width: 100vw;
    height: px2vw(90);
    position: fixed;
    bottom: 0;
    padding: px2vw(21) 0;
    background-color: $themeColor;
    text-align: center;
    color: white;
  }

  .yesBlue {
    float: right;
    margin-top: px2vw(15);
    width: px2vw(26);
    height: px2vw(21);
  }
</style>
