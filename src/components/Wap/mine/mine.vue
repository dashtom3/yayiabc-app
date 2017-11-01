<template>
  <div class="mine">
    <div class="box_wrap"></div>
    <div v-if="showLogin">
      <!--上部开始-->
      <div class="header">
        <img src="../../../images/mine/topBackGround.png" alt="">
      </div>
      <div class="header_shade">
        <img src="../../../images/mine/topBackGround_2.png" alt="">
      </div>
      <div class="top_backGround">
        <div class="top_backGround_shade">
          <div class="top_circle">
            <img class="top_circleImg" src="../../../images/mine/topCircle.png" alt="">
            <!--头像-->
            <img @click="toGoPerson" class="headPortraitsImg" :src="userPic" alt="">
            <!--头像-->
            <div class="phoneUser">{{phone}}</div>
          </div>
        </div>
      </div>
      <!--上部结束-->
      <!--用户名开始-->
      <div class="userName">
        <span class="userName_money">乾币余额 </span>
        <span class="a">:</span>
        <span class="qbBalance">{{qbBalance}}</span>
        <span @click="toPayment" class="payment payFirst">充值</span>
        <span @click="toCoinCash" class="payment paySecond">提现</span>
      </div>
      <!--用户名结束-->
      <!--我的订单开始-->
      <div class="myOrder" @click="goOrders(0)">
        <span>我的订单</span>
        <span class="myOrder_back">
        <img src="../../../images/mine/back.png" alt="">
      </span>
      </div>
      <!--我的订单结束-->
      <!--上部功能区开始-->
      <ul class="mine_function">
        <li @click="goOrders(1)">
          <span class="state-icon" v-if="ordersState[1]">{{ordersState[1]}}</span>
          <img src="../../../images/mine/payment.png" alt="">
          <div>待付款</div>
        </li>
        <li></li>
        <li @click="goOrders(2)">
          <span class="state-icon" v-if="ordersState[2]">{{ordersState[2]}}</span>
          <img src="../../../images/mine/sport.png" alt="">
          <div>待发货</div>
        </li>
        <li></li>
        <li @click="goOrders(3)">
          <span class="state-icon" v-if="ordersState[3]">{{ordersState[3]}}</span>
          <img src="../../../images/mine/waitSports.png" alt="">
          <div>待收货</div>
        </li>
        <li></li>
        <li @click="goOrders(4)">
          <span class="state-icon" v-if="ordersState[4]">{{ordersState[4]}}</span>
          <img src="../../../images/mine/comment.png" alt="">
          <div>待评价</div>
        </li>
      </ul>
      <!--上部功能区结束-->
      <!--下部功能区开始-->
      <ul class="mine_function_bottom">
        <li @click="toMyCoin">
          <img src="../../../images/mine/money.png" alt="">
          <div>我的乾币</div>
        </li>
        <li @click="goToCollect">
          <img src="../../../images/mine/collect.png" alt="">
          <div>我的收藏</div>
        </li>
        <li @click="goToAddress">
          <img src="../../../images/mine/adress.png" alt="">
          <div>我的地址</div>
        </li>
        <li @click="goToMine">
          <img src="../../../images/mine/personal.png" alt="">
          <div>个人资料</div>
        </li>
        <li @click="goToCustomer">
          <img src="../../../images/mine/bind.png" alt="">
          <div>指定客服代表</div>
        </li>
        <li class="settingLi" @click="goToAppSetting">
          <img src="../../../images/mine/setting.png" alt="">
          <div>设置</div>
        </li>
      </ul>
      <!--下部功能区结束-->
      <!--退出按钮开始-->
      <div class="esc_background">
        <mu-raised-button class="esc" label="退出" v-on:click="logOut"/>
      </div>
      <!--退出按钮结束-->
    </div>


    <div v-if="!showLogin">
      <!--上部开始-->
      <div class="header">
        <img src="../../../images/mine/topBackGround.png" alt="">
      </div>
      <div class="header_shade">
        <img src="../../../images/mine/topBackGround_2.png" alt="">
      </div>
      <div class="top_backGround">
        <div class="top_backGround_shade">
          <div class="top_circle">
            <img @click="toLogin" class="top_circleImg" src="../../../images/mine/topCircle.png" alt="">
            <!--头像-->
            <img @click="toLogin" class="headPortraitsImg headPortraitsImg2" :src="userPic" alt="">
            <!--头像-->
            <div class="loginContent">
              <span @click="toLogin" class="loginTo">登录</span>
              <span>/</span>
              <span @click="toLogin" class="loginTo2">注册</span>
            </div>
          </div>
        </div>
      </div>
      <!--上部结束-->
      <!--用户名开始-->
      <div @click="toLogin" class="userName">
      </div>
      <!--用户名结束-->
      <!--我的订单开始-->
      <div @click="toLogin">
        <div class="myOrder">
          <span>我的订单</span>
          <span class="myOrder_back">
            <img src="../../../images/mine/back.png" alt="">
          </span>
        </div>
        <!--我的订单结束-->
        <!--上部功能区开始-->
        <ul class="mine_function">
          <li>
            <img src="../../../images/mine/payment.png" alt="">
            <div>待付款</div>
          </li>
          <li></li>
          <li>
            <img src="../../../images/mine/sport.png" alt="">
            <div>待发货</div>
          </li>
          <li></li>
          <li>
            <img src="../../../images/mine/waitSports.png" alt="">
            <div>待收货</div>
          </li>
          <li></li>
          <li>
            <img src="../../../images/mine/comment.png" alt="">
            <div>待评价</div>
          </li>
        </ul>
        <!--上部功能区结束-->
        <!--下部功能区开始-->
        <ul class="mine_function_bottom">
          <li>
            <img src="../../../images/mine/money.png" alt="">
            <div>我的乾币</div>
          </li>
          <li>
            <img src="../../../images/mine/collect.png" alt="">
            <div>我的收藏</div>
          </li>
          <li>
            <img src="../../../images/mine/adress.png" alt="">
            <div>我的地址</div>
          </li>
          <li>
            <img src="../../../images/mine/personal.png" alt="">
            <div>个人资料</div>
          </li>
          <li>
            <img src="../../../images/mine/bind.png" alt="">
            <div>指定客服代表</div>
          </li>
          <li @click.stop="goToAppSetting" class="settingLi">
            <img src="../../../images/mine/setting.png" alt="">
            <div>设置</div>
          </li>
        </ul>
        <!--下部功能区结束-->
        <!--退出按钮开始-->
        <!--退出按钮结束-->
      </div>
    </div>
    <!--末尾-->
  </div>
</template>

<script>
  import {tokenMethods} from '../../../vuex/util'
  import {Toast, Indicator} from 'mint-ui'
  import {GET_ORDER_NUM} from '@vuex/types'

  export default {
    name: 'mine',
    data() {
      return {
        qbBalance: '',
        phone: '',
        userPic: '',
        alreadyLog: true,
        showLogin: true,
        ordersState: [],
        token: ''
      }
    },
    components: {},
    created: function () {
      var that = this
      // plus.navigator.setFullscreen(true);
      that.$emit('listenToChildEvent', 'mine')
      if (tokenMethods.getWapUser() === null || tokenMethods.getWapUser() === undefined) {
        that.showLogin = false
        that.userPic = 'static/images/defaultPic.png'
      }
      // if (tokenMethods.getWapToken() === null) {

      // }
      that.init();
      that.gBack();
    },
    methods: {
      goToAppSetting(){
        this.$router.push({path: '/appSetting'})
      },
      toGoPerson() {
        this.$router.push({path: '/personalData'})
      },
      toPayment() {
        this.$router.push({path: '/coinDetail'})
      },
      toLogin() {
        this.$router.push({path: '/logIn', query: {backName: '/yayi/mine'}})
      },
      toCoinCash() {
        this.$router.push({path: '/coinCash', query: {backJudge: 'mine'}});
      },
      goToAddress: function () {
        sessionStorage.setItem('backJudgeAddress', 'fromAddressMine');
        this.$router.push({path: '/address'});
      },
      goToCollect: function () {
        this.$router.push({path: '/collect'});
      },
      goToMine: function () {
        this.$router.push({path: '/personalData'})
      },
      goToCustomer: function () {
        this.$router.push({path: '/customerService'})
      },
      goOrders(state) {
        let go = this.$router.push.bind(this.$router)
        sessionStorage.setItem('ORDER_STATE', state)
        go({name: 'orderSubpage', params: {order_state: state}})
      },
      //获取个人信息
      init: function () {
        let that = this
        // console.log(tokenMethods.getWapUser())
        if (!tokenMethods.getWapUser()) return
        var obj = {
          phone: tokenMethods.getWapUser().phone,
          token: tokenMethods.getWapToken()
        }
        Indicator.open();
        //添加不同订单列表的数量状态
        this.$store.dispatch(GET_ORDER_NUM)
          .then(res => {
            let temp = 0
            this.ordersState = res.data.reduce((obj, item) => {
              if (item.state === 2 || item.state === 5) {
                temp += item.counts
                obj[2] = temp
              } else {
                obj[item.state] = item.counts
              }
              return obj
            }, {})
          })
          .catch(e => Toast(e))
        //查询个人信息
        that.$store.dispatch('GET_PERSON_LIST', obj).then((res) => {
          // console.log(res);
          // console.log(JSON.stringify(res), '绑定完微信')
          this.showLogin = true;
          if (res.errorCode === 'RE_LOGIN') {
            this.showLogin = false;
            this.userPic = 'static/images/defaultPic.png';
            tokenMethods.removeMsg();
            if (tokenMethods.getWapUser() === null || tokenMethods.getWapUser() === undefined) {
              this.showLogin = false;
              this.userPic = 'static/images/defaultPic.png';
              return
            }
            return false
          }
          if (res.data.userPic === '' || res.data.userPic === null || res.data.userPic === undefined) {
            this.userPic = 'static/images/defaultPic.png'
          } else {
            that.userPic = res.data.userPic
          }
          if (res.callStatus === 'SUCCEED') {
            that.qbBalance = res.data.qbBalance
            that.phone = res.data.phone
          }
        })
      },
      toMyCoin() {
        this.$store.dispatch('SAVE_JUMP_INDEX', 2)
        this.$router.push({path: '/myCoin'})
        // this.$store.dispatch('SAVE_JUMP_INDEX', 2)
        // this.$router.push({path: '/myCoin'})
      },
      //微信登录注销
      authLogout: function () {
        for (var i in auths) {
          var s = auths[i];
          if (s.authResult) {
            s.logout(function (e) {
              console.log("注销登录认证成功！");
            }, function (e) {
              console.log("注销登录认证失败！");
            });
          }
        }
      },
      // 登出
      logOut: function () {
        var that = this;
        var obj = {
          token: tokenMethods.getWapToken()
        }
        that.$store.dispatch('GET_LOGIN_OUT', obj).then((res) => {
          // console.log("1111"+res);
          if (res.callStatus === 'FAILED') {
            tokenMethods.removeMsg()
            this.$router.push({path: '/logIn'})
          }
          if (res.callStatus === 'SUCCEED') {
            tokenMethods.removeMsg()
            Toast({message: '退出成功！', duration: 1500});
            this.$router.push({path: '/logIn', query: {backName: '/yayi/mine'}});
            try {
              that.authLogout()
            } catch (e) {
              console.log(e)
            }
          } else {
            this.$router.push({path: '/logIn'})
            tokenMethods.removeMsg()
            try {
              that.authLogout()
            } catch (e) {
              console.log(e)
            }
            // Toast({message: '退出失败！', duration: 3000})
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .header {
    position: fixed;
    z-index: -2;
    width: 100vw;
    height: px2vw(369);
    top: 0;
  }

  .settingLi img{
    width: px2vw(40) !important;
    height: px2vw(43) !important;
  }
  .header img {
    width: 100%;
    height: 120%;
  }

  .header_shade {
    position: fixed;
    top: 0;
    z-index: -1;
    width: 100vw;
    height: px2vw(370);
  }

  .header_shade img {
    width: 100%;
    height: 200%;
  }

  .top_backGround_shade {
    position: relative;
    width: 100vw;
    height: px2vw(370);
  }

  .top_backGround {
    width: 100vw;
    background-size: 100vw px2vw(460);
    height: px2vw(369);
  }

  .top_circle {
    position: absolute;
    bottom: px2vw(0);
    left: px2vw(-5);
    width: 100vw;
    height: px2vw(109);
  }

  .top_circleImg {
    width: 101vw;
    height: px2vw(109);
  }

  .headPortraitsImg {
    border-radius: 50%;
    position: absolute;
    top: px2vw(-87);
    left: 41.6vw;
    width: px2vw(132);
    height: px2vw(132);
  }

  .headPortraitsImg.headPortraitsImg2 {
    border-radius: 50%;
    position: absolute;
    top: px2vw(-60);
    left: 41.6vw;
    width: px2vw(132);
    height: px2vw(132);
    border: none;
  }

  .userName {
    margin-top: px2vw(-1);
    background-color: white;
    font-size: 3.48vw;
    height: px2vw(85);
    line-height: px2vw(85);
  }

  .userName_money {
    font-size: px2vw(28);
    margin-left: px2vw(99);
  }

  .qbBalance {
    color: $themeColor;
    display: inline-block;
    width: px2vw(130);
    font-size: px2vw(28);
    vertical-align: top;
    margin-top: px2vw(2);
  }

  .tixian {
    float: left;
    width: px2vw(110);
    height: px2vw(40);
    line-height: px2vw(40);
    border-radius: px2vw(8);
    background-color: #3676b6;
    margin-top: px2vw(29);
    margin-left: px2vw(49);
    text-align: center;
    color: white;
    font-size: px2vw(28);
    font-weight: 300;
  }

  .mine {

    font-weight: 300;
  }

  .userName_money span {
    color: $themeColor;
    vertical-align: middle;
  }

  .myOrder {
    background-color: white;
    border-top: px2vw(1) solid $borderColor;
    border-bottom: px2vw(1) solid $borderColour;
    padding: px2vw(30) 3.7vw px2vw(30) 6.8vw;
    font-size: 3.73333vw;
  }

  .myOrder_back {
    margin-left: 69.5vw;
  }

  .myOrder_back img {
    width: 2vw;
    height: px2vw(25);
  }

  .mine_function {
    background-color: white;
    font-size: 3.73333vw;
    padding: px2vw(30) 6.8vw;
    border-bottom: px2vw(20) solid #f4f4f4;
  }

  .mine_function:after {
    content: "";
    display: block;
    clear: both;
  }

  .mine_function img {
    width: px2vw(47);
    height: px2vw(47);
  }

  .mine_function li {
    position: relative;
    float: left;
    text-align: center;
    .state-icon {
      transform: scale(0.5);
      transform-origin: 0 0;
      position: absolute;
      top: px2vw(-14);
      right: px2vw(-29);
      width: px2vw(68);
      height: px2vw(68);
      line-height: px2vw(68);
      text-align: center;
      font-size: px2vw(56);
      color: #fff;
      background-color: #d81e06;
      border-radius: 50%;
    }
  }

  .mine_function li:nth-child(odd) {
    width: 11.4vw;
  }

  .mine_function li:nth-child(even) {
    border-left: px2vw(1) solid $borderColor;
    margin-left: 6.6vw;
    margin-right: 6.6vw;
    height: px2vw(45);
    margin-top: px2vw(21);
  }

  .mine_function_bottom {
    background-color: white;
    /*margin-bottom: px2vw(130);*/
    margin-bottom: px2vw(70);
    font-size: 3.73333vw;
    padding: px2vw(28) 4.6666667vw;
  }

  .mine_function_bottom:after {
    content: "";
    display: block;
    clear: both;
  }

  .mine_function_bottom li {
    text-align: center;
    float: left;
    width: 28.6vw;
  }

  .mine_function_bottom li img {
    width: px2vw(45);
    height: px2vw(42);
  }

  .mine_function_bottom li:nth-child(-n+3) {
    border-bottom: px2vw(1) solid $borderColor;
    padding-top: px2vw(14);
    padding-bottom: px2vw(41);
  }

  .mine_function_bottom li:nth-child(2) {
    border-right: px2vw(1) solid $borderColor;
    border-left: px2vw(1) solid $borderColor;
    box-sizing: content-box;
    padding-left: px2vw(15);
    padding-right: px2vw(15);
  }

  .mine_function_bottom li:nth-child(n+4) {
    padding-top: px2vw(41);
    padding-bottom: px2vw(14);
  }

  .mine_function_bottom li:nth-child(5) {
    border-right: px2vw(1) solid $borderColor;
    border-left: px2vw(1) solid $borderColor;
    box-sizing: content-box;
    padding-left: px2vw(15);
    padding-right: px2vw(15);
  }

  .esc {
    margin-left: px2vw(124);
    text-align: center;
    height: px2vw(100);
    font-size: 3.733333vw;
    line-height: normal;
    background-color: $themeColor;
    color: white;
    width: 66.8vw;
    box-shadow: 0 0 px2vw(25) $themeColor;
    margin-bottom: px2vw(150);
  }

  .noLog {
    z-index: 999;
    width: px2vw(200);
    height: px2vw(100);
    line-height: px2vw(100);
    border: 1px solid #dcdcdc;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .esc_background {
    height: 120px;
  }

  .box_wrap {
    z-index: -100;
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background-color: #f4f4f4;
  }

  .payment {
    display: inline-block;

    vertical-align: middle;

    /*font-size: px2vw(28);*/
    /*height: px2vw(42);*/
    /*line-height: px2vw(42) !important;*/
    line-height: px2vw(80) !important;
    height: px2vw(80);
    font-size: px2vw(50);
    transform: scale(0.5, 0.5);

    color: white;
    padding-left: px2vw(54);
    padding-right: px2vw(54);
    background-color: $themeColor;
    border-radius: px2vw(16);
    font-weight: 300;
  }

  .payFirst {
    margin-left: px2vw(-40);
    margin-top: px2vw(-4);
  }

  .paySecond {
    margin-left: px2vw(-50);
    margin-top: px2vw(-4);
  }

  .phoneUser {
    display: block;
    letter-spacing: px2vw(3);
    position: absolute;
    left: px2vw(288);
    bottom: 0;
    font-weight: 300;
    font-size: px2vw(26);
  }

  .loginContent {
    position: absolute;
    left: px2vw(261);
    bottom: px2vw(-60);
    font-size: px2vw(28);
    font-weight: 300;
  }

  .loginTo {
    display: inline-block;
    line-height: px2vw(80);
    padding-left: px2vw(50);
  }

  .loginTo2 {
    display: inline-block;
    line-height: px2vw(80);
    padding-right: px2vw(50);
  }

  .a {
    vertical-align: top;
  }
</style>

