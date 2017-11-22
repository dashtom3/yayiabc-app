<template>
    <div>
      <div class="box_wrap">
        <div class="header_top">
          <span @click="toBack" class="header_img_box">
          <img class="header_img" src="../../../images/logIn/back.png" alt="">
            </span>
          <div class="header">
            我的乾币
          </div>
        </div>
        <!--乾币余额开始-->
        <div class="header_coin">
          <ul class="coin_balanceBox">
            <li>
              <div>乾币余额</div>
              <div class="qbBox">
                <span class="qbBalance">{{qbNum.sum}}</span>
                <!-- <span class="tiXianButton" @click="toCoinCash">提现</span> -->
              </div>
            </li>
            <li></li>
            <li>
              <div>
                <img src="../../../images/mine/coinMoneyZ.png" alt="">
              </div>
              <div>
                {{qbNum.qbBalance}}
              </div>
            </li>
            <li>
              <div>
                <img src="../../../images/mine/coinMoney95.png" alt="">
              </div>
              <div>
                {{qbNum.aqb}}
              </div>
            </li>
            <!-- <li>
              <div>
                <img src="../../../images/mine/coinMoney9.png" alt="">
              </div>
              <div>
                {{qbNum.bqb}}
              </div>
            </li> -->
            <li>
              <div>
                <img src="../../../images/mine/coinMoney8.png" alt="">
              </div>
              <div>
                {{qbNum.cqb}}
              </div>
            </li>
          </ul>
        </div>
        <!--乾币余额结束-->
        <!--钱币充值开始-->
        <div class="coinPay">
          <ul class="coinPay_box">
            <li @click="changeColor0" :class="{'backBlue':coinColor == 0}">乾币充值</li>
            <li @click="changeColor1" :class="{'backBlue':coinColor == 1}">乾币兑换</li>
            <li @click="changeColor2" :class="{'backBlue':coinColor == 2}">乾币明细</li>
          </ul>
        </div>
        <!--钱币充值结束-->
      </div>
      <div class="view_box">
      <router-view></router-view>
      </div>
      <!--末尾-->
      <div class="moduleM" v-if="moduleShow"></div>
    </div>
</template>

<script>
  import {tokenMethods} from '../../../vuex/util'
  import {mapGetters} from 'vuex'
  export default {
    name: 'coinDetail',
    data(){
      return{
        coinColor: 0,
        qbNum: {
          qbBalance: 0,
          aqb: 0,
          bqb: 0,
          cqb: 0,
          sum: 0
        }
      }
    },
    //*******导航钩子*********//
    beforeRouteEnter (to, from, next) {
      // 通过 `vm` 访问组件实例
      next(vm => {
        var that = vm;
        if (that.$router.history.current.name == 'coinDetail') {
          that.coinColor = 0
        } else if(that.$router.history.current.name == 'exchange') {
          that.coinColor = 1
        } else if(that.$router.history.current.name == 'exchangeDetail') {
          that.coinColor = 2
        }
      })
    },
    created(){
      this.getSave()
      this.mBack('toBack');
    },
    computed:{
      ...mapGetters([
        'saveJumpIndex',
        'moduleShow'
      ])
    },
    methods:{
      toCoinCash(){
//        this.$store.dispatch('SAVE_TO_COIN', 2);
        this.$router.push({path:'/coinCash', query: {backJudge: 'coinCash'}})
      },
      getSave(){
        let obj = {
          token: tokenMethods.getWapToken()
        }
        this.$store.dispatch('GET_USERS_DATA',obj).then((res) => {
          // console.log(res.data.data,'哈哈');
          if (!res.data.data) {
            this.qbNum.qbBalance = 0;
            this.qbNum.aqb = 0;
            this.qbNum.bqb = 0;
            this.qbNum.cqb = 0;
            this.qbNum.sum = this.qbNum.cqb + this.qbNum.bqb + this.qbNum.aqb + this.qbNum.qbBalance;
            tokenMethods.removeMsg()
          } else {
            this.qbNum.qbBalance = res.data.data.qbBalance;
            this.qbNum.aqb = res.data.data.cQb;
            this.qbNum.bqb = res.data.data.bQb;
            this.qbNum.cqb = res.data.data.aQb;
            this.qbNum.sum = this.qbNum.cqb + this.qbNum.bqb + this.qbNum.aqb + this.qbNum.qbBalance;
          }
        })
      },
      toBack(){
        if(this.saveJumpIndex === 1)
        {
          this.$router.push({path:"/yayi/index"});
        }else if(this.saveJumpIndex === 2)
        {
          this.$router.push({path:'/yayi/mine'})
        }else {
          this.$router.push({path:"/yayi/mine"});
        }

      },
      changeColor0(){
        this.coinColor = 0;
        this.$router.push({path:'/coinDetail'})
      },
      changeColor1(){
        this.coinColor = 1;
        this.$router.push({path:'/exchange'})
      },
      changeColor2(){
        this.coinColor = 2;
        this.$router.push({path:'/exchangeDetail'})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../common/sass/factory";
    .box_wrap{
      position: absolute;
      top:0;
      left: 0;
      width: 100vw;
      z-index: 3000;
    }
    .header{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 80vw;
      height: px2vw(73);
      line-height: px2vw(73);
      display: inline-block;
      text-align: center;
      font-size: 4.26667vw;
      color: white;
    }
    .header_img {
      width: px2vw(18);
      height:  px2vw(29);
    }
    .header_top {
      height: px2vw(72);
      background-color: $themeColor;
    }

    .header_coin {
      font-size: 3.73333vw;
      padding: px2vw(16) 0 px2vw(25) 0;
      background-color: $themeColor;
      width: 100vw;
      margin-top: px2vw(-2);

    }
    .header_coin:after{
      content: '';
      display: block;
      clear: both;
    }
    .coin_balanceBox li{
      margin-left: px2vw(55);
      text-align: center;
      color: white;
      float: left;
      max-width: px2vw(250);
    }
    .coin_balanceBox li:nth-child(n+3){
      width: px2vw(110);
    }
    .coin_balanceBox li:nth-child(2){
      border-left-style:dashed;
      border-left-width: 1px;
      height: px2vw(73);
      margin-top: px2vw(12);
      margin-left:px2vw(50);
      margin-right:px2vw(16);
    }
    .coin_balanceBox li img{
      width: px2vw(50);
      height: px2vw(50);
    }


    .coinPay{
      width: 100vw;
      background-color: white;
      padding:px2vw(35) 6vw px2vw(35) 6vw;
      font-size: px2vw(32);
      border-bottom: 1px solid $borderColor;
    }
    .coinPay:after{
      content: '';
      display: block;
      clear: both;
    }
    .coinPay_box{
      font-size:4.266667vw;
    }
    .coinPay_box li{
      text-align: center;
      float: left;
    }
    .coin_balanceBox li:nth-child(1){
      text-align: left;
    }
    .coinPay_box li:nth-child(1){
      border: 1px solid $borderColor;
      border-top-left-radius: px2vw(10);
      border-bottom-left-radius: px2vw(10);
      padding: px2vw(11) 6vw px2vw(11) 5.2vw ;
    }
    .coinPay_box li:nth-child(2){
      border-top: 1px solid $borderColor;
      border-bottom: 1px solid $borderColor;
      padding: px2vw(11) 6vw;
    }
    .coinPay_box li:nth-child(3){
      border: 1px solid $borderColor;
      border-top-right-radius: px2vw(10);
      border-bottom-right-radius: px2vw(10);
      padding: px2vw(11) 5.2vw px2vw(11) 6vw;
    }

    .backBlue {
      color: white;
      padding-bottom: px2vw(13) !important;
      padding-top: px2vw(12) !important;
      margin-top: px2vw(-1);
     /* padding-top: px2vw(22) !important;
      padding-bottom: px2vw(21) !important;
      margin-top: px2vw(-1);*/
      background-color: $themeColor;
    }
    .coin_balanceBox li:nth-child(1){
      font-size: px2vw(28);
    }

    .tiXianButton {
      padding: px2vw(1) px2vw(12);
      color: white;
      border-radius: px2vw(8);
      background-color: #329af0;
    }

    .qbBox {
      margin-top: px2vw(13);
    }
  .header_img_box{
    display: inline-block;
    box-sizing: border-box;
    height: px2vw(73);
    padding-left: px2vw(15);
    padding-top: px2vw(20);
    width: px2vw(65);
  }
    .qbBalance {
      display: inline-block;
      text-align: center;
      min-width: px2vw(108);
    }

    .view_box {
      position: fixed;
      top: px2vw(380);
      left: 0;
      width: 100%;
      height: 72vh;
      overflow: scroll;
      bottom: 0;
      -webkit-overflow-scrolling: touch;
    }

    .color_button {
      background-color: #b4b4b4 !important;

    }
    .moduleM{
      background-color: rgba(0,0,0,0.5);
      position: absolute;
      top:0;
      left:0;
      bottom: 0;
      right: 0;
      width: 100vw;
      height:100vh;
      z-index: 110;
    }
</style>

