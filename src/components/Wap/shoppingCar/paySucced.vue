<template>
  <div>
    <div class="logIn_header">
      <div class="header_box" @click="back">
        <img class="header_back" src="../../../images/logIn/back.png" alt="img">
      </div>
      <span class="logWithCode">支付结果</span>
    </div>
    <div class="coinPaySuccess">
      <div>
        <img src="../../../images/mine/paySuccssed.png" alt="">
      </div>
      <div>
        订单支付成功!
      </div>
    </div>
    <div class="moneys">
      <div class="money_num">
        <div>
          <div class="circle">
            <img src="../../../images/mine/circleBlue.png" alt="">
          </div>
          <span class="marginLeft">订单号&nbsp;:&nbsp;{{orderId}}</span>
        </div>
        <div class="circle_top">
          <div class="circle">
            <img src="../../../images/mine/circleBlue.png" alt="">
          </div>
          <span class="marginLeft">实际支付金额:&nbsp;</span>
          <span class="fontBlue"> ¥&nbsp;{{payMoney}}</span>
        </div>
      </div>
      <!--查看订单-->
      <mu-raised-button label="查看订单" class="watchDetail" @click="seeDetail"/>
    </div>
    <!--末尾-->
    <!-- 弹出红包模态框 -->
    <div class="dailog-success" v-if="showDailog">
      <div class="dailog-content">
        <div class="content">
          <h1 class="title">订单支付成功！本次下单获得</h1>
          <div class="red-box">
            <img class="bg-img" src="../../../images/order/hongbao.png" alt="背景">
            <span class="number">{{canHasCoin}}</span>
            <span class="text">乾币</span>
          </div>
          <p class="info">付款时可抵扣{{canHasCoin}}元</p>
          <div class="mine-info">可在"个人中心-我的乾币"查看</div>
          <div class="continue-shop" @click="gotoShoping">
            <span>继续购物</span>
          </div>
        </div>
        <div class="close" @click="showDailog = false">
          <img src="../../../images/order/close.png" alt="关闭">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'paySucced',
    data(){
      return{
        orderId: '',
        payMoney: '',
        canHasCoin: '',
        showDailog: true
      }
    },
    created () {
      var that = this;
      this.mBack('back');
      if (that.$route.params.orderId) {
        that.orderId = that.$route.params.orderId
        that.payMoney = that.$route.params.payMoney
        that.canHasCoin = that.$route.params.canHasCoin
      } else {
        // that.$router.push({path: '/'})
      }
    },
    methods: {
      back(){
        this.$router.push({path: '/yayi/index'})
      },
      seeDetail: function() {
        var that = this
        that.$router.push({name: 'orderSubpage', params: {order_state: 0}})
        sessionStorage.setItem('ORDER_STATE', 0)
      },
      gotoShoping() {
        this.$router.push({path: '/productList'});
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .header_top {
    height: px2vw(72);
    background-color: $themeColor;
  }
  .header{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 80vw;
    height: 9.73333vw;
    line-height: 9.73333vw;
    display: inline-block;
    text-align: center;
    font-size: 4.26667vw;
    color: white;
  }
  .header_img {
    width: 2.4vw;
    height: 3.86667vw;
    margin-left: 2vw;
    margin-top: 3vw;
    float: left;
  }
  .coinPaySuccess{
    padding: px2vw(59) 11.5vw px2vw(40) 11.5vw;
    text-align: center;
    font-size: 4.2666667vw;
    color: $themeColor;
  }
  .coinPaySuccess div:nth-child(2){
    margin-top: px2vw(15);
  }
  .coinPaySuccess img{
    width: px2vw(91);
    height: px2vw(83);
  }
  .money_num {
    font-size: 3.7333336vw;
    position: relative;
    padding: px2vw(44) 0 px2vw(54) 9.3vw ;
    background-color: #eefafb;
    border: 1px solid #d1f1f4;
  }

  .moneys {
    padding: 0 11.5vw;
  }

  .circle {
    margin-top: px2vw(-7);
    vertical-align: middle;
    display: inline-block;
    position: relative;
    width: px2vw(19);
    height: px2vw(19);
  }

  .circle img{
    position: absolute;
    top:px2vw(0);
    width: px2vw(19);
    height: px2vw(19);
  }

  .fontBlue {
    color: $themeColor;
  }

  .circle_top {
    margin-top: px2vw(36);
  }

  .marginLeft {
    margin-left: px2vw(20);
  }

  .watchDetail {
    display: block;
    margin-bottom: px2vw(30);
    box-shadow: 0 2px 10px $themeColor;
    margin-top: px2vw(80);
    width: 100%;
    height: px2vw(80);
    padding: px2vw(30) 0;
    text-align: center;
    color: white;
    font-size: 4.533333vw;
    background-color: $themeColor;
  }
  .dailog-success{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .2);
  }
  .dailog-content{
    height: 100vh;
    .content{
      position: absolute;
      top: px2vw(280);
      left: px2vw(85);
      width: px2vw(580);
      height: px2vw(700);
      background: #fff;
      border-radius: px2vw(20);
      .title{
        margin: px2vw(67) 0 px2vw(80) 0;
        height: px2vw(34);
        line-height: px2vw(34);
        text-align: center;
        font-size: px2vw(36);
      }
      .red-box{
        position: relative;
        width: px2vw(213);
        height: px2vw(215);
        margin: 0 auto;
        img{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        span{
          position: absolute;
        }
        .number{
          top: px2vw(45);
          left: 0;
          width: 100%;
          height: px2vw(56);
          line-height: px2vw(56);
          text-align: center;
          font-size: px2vw(75);
          color: rgb(252,255,0);
        }
        .text{
          left: px2vw(68);
          bottom: px2vw(17);
          height: px2vw(38);
          line-height: px2vw(38);
          font-size: px2vw(40);
          color: #fff;
        }
      }
      .info{
        margin: px2vw(21) 0 0 0;
        text-align: center;
        height: px2vw(34);
        line-height: px2vw(34);
        font-size: px2vw(36);
        color: rgb(216,30,6);
      }
      .mine-info{
        margin: px2vw(87) 0 px2vw(30) 0;
        text-align: center;
        height: px2vw(29);
        line-height: px2vw(29);
        font-size: px2vw(30);
        color: rgb(51,51,51);
      }
      .continue-shop{
        width: px2vw(261);
        height: px2vw(60);
        line-height: px2vw(60);
        margin: 0 auto;
        background: rgb(250,194,0);
        border-radius: px2vw(30);
        color: #fff;
        text-align: center;
      }
    }
    .close{
      position: absolute;
      top: px2vw(1023);
      left: px2vw(345);
      width: px2vw(60);
      height: px2vw(60);
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>

