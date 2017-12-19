<template>
  <div class="coinCash">
    <div v-if="!already" class="fixed"></div>
    <!--头部-->
    <div class="box_wrap">
      <div class="header_top">
        <div class="imgBox_header" @click="back">
          <img class="header_img" src="../../../images/logIn/back.png" alt="">
        </div>
        <div class="header">
          乾币提现
        </div>
      </div>
    </div>


    <div class="top_top">
    <!--提示已提现开始-->
    <div v-if="!already" class="tsBox">
      乾币提现申请成功！管理员正在审核，请耐心等待&nbsp;...
    </div>
    <!--提示已提现结束-->

    <!--主题内容部分-->
    <div class="wrap">
      <div :class="{pad : '!already'}" class="checkedNum">选择提现的乾币和个数</div>
      <ul v-if="already" class="coin_ul1">
          <li class="coin_ul1_li" @click="toCoinCashDetail('tqbBalance')">
            <img class="alreadyImg"  src="../../../images/mine/coinMoneyZ.png" alt="">
          <span class="li_coinNum">共{{qbBalance}}个</span>
          <img src="../../../images/mine/coin_img1.png" class="" alt="">
          <span class="li_coinCash">
            <span v-show="qb.tqbBalance !== '不提现'">提现</span>{{qb.tqbBalance}}
            <span v-show="qb.tqbBalance !== '不提现'">个</span>
          </span>
          </li>

        <!--</router-link>-->
        <li  @click="toCoinCashDetail('tcQb')" class="coin_ul1_li">
          <img class="alreadyImg"  src="../../../images/mine/coinMoney95.png" alt="">
          <span class="li_coinNum">共{{cQb}}个</span>
          <img src="../../../images/mine/coin_img1.png" class="" alt="">
          <span class="li_coinCash">
            <span v-show="qb.tcQb !== '不提现'">提现</span>{{qb.tcQb}}
            <span v-show="qb.tcQb !== '不提现'">个</span>
          </span>
        </li>
        <!-- <li  @click="toCoinCashDetail('tbQb')" class="coin_ul1_li">
          <img class="alreadyImg"  src="../../../images/mine/coinMoney9.png" alt="">
          <span class="li_coinNum">共{{bQb}}个</span>
          <img src="../../../images/mine/coin_img1.png" class="" alt="">
          <span class="li_coinCash">
            <span v-show="qb.tbQb !== '不提现'">提现</span>{{qb.tbQb}}
            <span v-show="qb.tbQb !== '不提现'">个</span>
          </span>
        </li> -->
        <li  @click="toCoinCashDetail('taQb')" class="coin_ul1_li">
          <img class="alreadyImg"  src="../../../images/mine/coinMoney8.png" alt="">
          <span class="li_coinNum">共{{aQb}}个</span>
          <img src="../../../images/mine/coin_img1.png" class="" alt="">
          <span class="li_coinCash">
            <span v-show="qb.taQb !== '不提现'">提现</span>{{qb.taQb}}
            <span v-show="qb.taQb !== '不提现'">个</span>
          </span>
        </li>

      </ul>
      <ul v-if="!already" class="coin_ul1">
        <li class="coin_ul1_li">
          <img class="alreadyImg"  src="../../../images/mine/coinMoneyZ.png" alt="">
          <span class="li_coinNum">共{{qbBalance}}个</span>
          <span class="li_coinCash">
            <span v-show="qb.tqbBalance !== '不提现'">提现</span>{{qb3.tqbBalance}}
            <span v-show="qb.tqbBalance !== '不提现'">个</span>
          </span>
        </li>

        <!--</router-link>-->
        <li class="coin_ul1_li">
          <img class="alreadyImg"  src="../../../images/mine/coinMoney95.png" alt="">
          <span class="li_coinNum">共{{cQb}}个</span>
          <span class="li_coinCash">
            <span v-show="qb.tcQb !== '不提现'">提现</span>{{qb3.tcQb}}
            <span v-show="qb.tcQb !== '不提现'">个</span>
          </span>
        </li>
        <!-- <li class="coin_ul1_li">
          <img class="alreadyImg"  src="../../../images/mine/coinMoney9.png" alt="">
          <span class="li_coinNum">共{{bQb}}个</span>
          <span class="li_coinCash">
            <span v-show="qb.tbQb !== '不提现'">提现</span>{{qb3.tbQb}}
            <span v-show="qb.tbQb !== '不提现'">个</span>
          </span>
        </li> -->
        <li  class="coin_ul1_li">
          <img class="alreadyImg"  src="../../../images/mine/coinMoney8.png" alt="">
          <span class="li_coinNum">共{{aQb}}个</span>
          <span class="li_coinCash">
            <span v-show="qb.taQb !== '不提现'">提现</span>{{qb3.taQb}}
            <span v-show="qb.taQb !== '不提现'">个</span>
          </span>
        </li>

      </ul>
      <div class="coin_line"></div>
      <ul class="coin_ul2">
        <li v-if="judgeTX" class="coin_ul2_li">
          <span class="ul2_li_text">提现乾币总数</span>
          <span class="ul2_li_num">{{countQbSum}}</span>
        </li>
        <li v-if="judgeTX" class="coin_ul2_li">
          <span class="ul2_li_text">提现总额（元）</span>
          <span class="ul2_li_num">{{countPriceSum}}</span>
        </li>



        <li v-if="!judgeTX" class="coin_ul2_li">
          <span class="ul2_li_text">提现乾币总数</span>
          <span class="ul2_li_num">{{qb3.allNum}}</span>
        </li>
        <li v-if="!judgeTX" class="coin_ul2_li">
          <span class="ul2_li_text">提现总额（元）</span>
          <span class="ul2_li_num">{{qb3.allPrice}}</span>
        </li>




        <li v-if="already" @click="toCashSetting" class="coin_ul2_li">
          <span class="ul2_li_text">提现方式</span>
          <img src="../../../images/mine/coin_img1.png" class="" alt="">
          <span class="ul2_li_pay  ul2_li_pay2"><span v-if="showKH">(</span>{{userCount}}<span v-if="showKH">)</span></span>
          <span class="ul2_li_pay">{{payWays}}</span>
        </li>
      </ul>
      <div v-if="already" class="coin_line"></div>
      <div v-if="already" class="phone_num">
        <span class="phone_name">手机号</span>
        <span class="phone_user">{{phone}}</span>
      </div>
      <div v-if="already" class="coin_line2"></div>
      <div v-if="already" class="checked_code">
        <span class="checked_code_text">验证码</span>
        <input @change="verifyYZ" v-model="verify" type="text" placeholder="请输入验证码">
        <span @click="getVerify" class="get_checked_code" :class="{'fontColor':TXData.isShowDX == false }">{{TXData.timeTX}}{{TXData.text}}</span>

      </div>
      <div v-if="already" class="save_btn">
        <mu-raised-button @click="saveData" label="申请提现" class="pay" />
      </div>
    </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {Toast} from 'mint-ui';
  import {tokenMethods} from '../../../vuex/util'
    export default {
      name: 'coinCash',
      data(){
        return {
          aQb: 0,
          cQb: 0,
          qbBalance: 0,
          qbNotwtih: 0,
          verify: '',
          phone : '',
          userCount : '',
          isShowDX : true,
//          time : 60,
          payWays : '请选择',
          showKH : false,
          text1 : '提现',
          text2 : '个',
          qb: {
            taQb: 0,
            tcQb: 0,
            tqbNotwtih: 0,
            tqbBalance: 0
          },
          qb2: {
            taQb: 0,
            tcQb: 0,
            tqbNotwtih: 0,
            tqbBalance: 0
          },
          qb3:{
            taQb: 0,
            tcQb: 0,
            tqbBalance: 0,
            tqbNotwtih: 0,
            allNum: 0,
            allPrice: 0
          },
          type : '', //保存所选QB的类型
          already : true, //判断是否已经提现
          judgeTX: true
        }
      },
      created(){
        this.mBack('back');
        this.verify = this.saveChangeVerify;
        this.isGetCoined();
        this.getInitData();
        this.payWayStr();
      },
      computed:{
        ...mapGetters([
          'pushTiXianQbNum',
          'pushBankMss',
          'saveToCoin',
          'TXData',
          'saveChangeVerify'
        ]),
        countQbSum () {
          let sum = 0
          for (let prop in this.qb2)
          {
            sum += Number(this.qb2[prop])
          }
          return sum
        },
        countPriceSum () {
          let sum = Number(this.qb2.tqbBalance) + Number(this.qb2.tcQb) * 0.95 + Number(this.qb2.taQb) * 0.8;
          return sum.toFixed(2)
        }
      },
      methods:{
        verifyYZ (){
         this.$store.dispatch('SAVE_CHANGE_VERIFY', this.verify);
        },
        //判断提现状态
        isGetCoined(){
          let obj = {};
          this.$store.dispatch('GET_USERS_DATA',obj).then((res) => {
            if(res.data.msg === '1') //提过
            {
              this.already = false;
              this.judgeTX = false;
              this.$store.dispatch('GET_DATA_ED',obj).then((res) => {
                if(res.data.callStatus === "SUCCEED")
                {
                  let aqb = Number(res.data.data.cType) / 0.95;
                  let cqb = Number(res.data.data.aType) / 0.8;
                  let zqb = Number(res.data.data.giveType);
                  let allPrice = Number(res.data.data.cType) + Number(res.data.data.aType) + Number(res.data.data.giveType)
                  this.qb3.tqbBalance = zqb;
                  this.qb3.taQb = cqb;
                  this.qb3.tcQb = aqb;
                  this.qb3.allNum = zqb + aqb + cqb;
                  this.qb3.allPrice = allPrice.toFixed(2);
                }else {
                  return
                }
              });
            }else {
              this.already = true;
            }
          })
        },
        //保存按钮
        saveData(){
          let obj = {
            aType: this.qb.taQb,
            cType: this.qb.tcQb,
            giveType: this.qb.tqbBalance,
            vCode : this.verify,
            witType: this.pushBankMss.payWay,
            accountHolder:  this.pushBankMss.name, //开户者
            cardNumber: this.pushBankMss.bankUser, //卡号
            oBank: this.pushBankMss.bank, //什么银行 //支付宝非银行
          };

          console.log(obj);

          for (let prop in obj)
          {
           if(obj[prop] === '不提现')
           {
              obj[prop] = 0
           }
          }
          console.log(obj);
          if(this.verify === '')
          {
            Toast({message: '请您输入短信验证码', duration: 1500})
          }else if(this.userCount === '')
          {
            Toast({message: '请您选择提现方式', duration: 1500})
          }else{
            this.$store.dispatch('SAVE_CASH_BANK', obj).then(res => {
              if(res.data.data === 1)
              {
                if( this.saveToCoin === 2)
                {
                  Toast({message: '提现申请成功', duration: 1500});
                  this.$store.dispatch('SAVE_CHANGE_VERIFY', '');
                  this.$router.push({path:'/coinDetail'})
                }else if(this.saveToCoin === 1)
                {
                  Toast({message: '提现申请成功', duration: 1500});
                  this.$store.dispatch('SAVE_CHANGE_VERIFY', '');
                  this.$router.push({path:'/yayi/mine'})
                }else {
                  Toast({message: '提现申请成功', duration: 1500});
                  this.$store.dispatch('SAVE_CHANGE_VERIFY', '');
                  this.$router.push({path:'/yayi/mine'})
                }
              }else if(res.data.msg === '验证码错误')
              {
                Toast({message: '请输入正确的验证码', duration: 1500})
              }
              else {
                Toast({message: '提现申请失败', duration: 1500})
              }
            })
          }
        },
        getVerify(){
          let obj = {
            phone : this.phone
          };
          this.$store.dispatch('GET_VERIFY',obj).then(res => {
              if(res.data.callStatus === "SUCCEED")
              {
                this.$store.dispatch('SAVE_TIME_SHOW', false);
                this.$store.dispatch('SAVE_TIME_COUNT', {});
                Toast({message: '获取验证码成功,请注意查收', duration: 1500})
              }else if(res.data.callStatus === 'FAILED')
              {
                Toast({message: '5分钟内,请不要重复获取验证码', duration: 2500})
              }
          })
        },
        payWayStr(){
          if(this.pushBankMss.bankUser === undefined)
          {
            return
          }else {
            this.showKH = true;
            this.payWays = this.pushBankMss.bankUser;
            this.userCount = this.pushBankMss.payWay;
            console.log(this.payWays);
          }
        },

        toCashSetting(){ //跳转体现方式
          this.$router.push({path:'/cashSetting'})
        },
        setQB(){ //vuex传值
          let obj = {
            taQb: this.aQb,
            tcQb: this.cQb,
            qb : this.qb,
            tqbBalance: this.qbBalance,
            type : this.type
          }
          this.$store.dispatch('PUSH_QB_NUM', obj)
        },
        toCoinCashDetail(type){
          this.type = type;
          this.setQB();
          this.$router.push({path:'/coinCashDetail', query: {falg: type}})
        },
        back(){
          if(this.$route.query.backJudge === 'coinCash')
          {
            this.$store.dispatch('SAVE_CHANGE_VERIFY', '');
            this.$store.dispatch('PUSH_TQB_NUM_TYPE',{});
            this.$store.dispatch('PUSH_BANK_MSS',{});
            this.$router.push({path:'/coinDetail'});
          }else if(this.$route.query.backJudge === 'mine')
          {
            this.$store.dispatch('SAVE_CHANGE_VERIFY', '');
            this.$store.dispatch('PUSH_TQB_NUM_TYPE',{});
            this.$store.dispatch('PUSH_BANK_MSS',{});
            this.$router.push({path:'/yayi/mine'});
          }else {
            this.$store.dispatch('SAVE_CHANGE_VERIFY', '');
            this.$store.dispatch('PUSH_TQB_NUM_TYPE',{});
            this.$store.dispatch('PUSH_BANK_MSS',{});
            this.$router.push({path:'/yayi/mine'});
          }
        },
        getInitData(){
          var obj = {}
          this.$store.dispatch('GET_USERS_DATA',obj).then((res) => {
            if(res.data.callStatus === 'SUCCEED'){
              if(res.data.msg === 1)
              {
                this.already = false;
              }
              console.log(res.data.data,'啊啊啊啊啊啊啊');
              this.phone = res.data.data.phone;
              this.aQb = res.data.data.aQb;
              this.cQb = res.data.data.cQb;
              this.qbBalance = res.data.data.qbBalance;

              if(this.pushTiXianQbNum.qb === undefined)
              {
                this.qb.taQb = res.data.data.aQb;
                this.qb.tcQb = res.data.data.cQb;
                this.qb.tqbBalance = res.data.data.qbBalance;
                this.qb2 =  this.qb;
                return
              } else {
                this.qb = this.pushTiXianQbNum.qb;
                for(let prop in this.pushTiXianQbNum.qb)
                {
                  console.log(prop);
                  if(this.pushTiXianQbNum.qb[prop] === '不提现')
                  {
                    this.qb2[prop] = 0
                  }
                  else {
                    this.qb2[prop] = this.pushTiXianQbNum.qb[prop]
                  }
                }
              }

            }
          })
        },

      }

    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .fontColor{
    background-color: #e5e5e5 !important;
    color: #999999 !important;
  }
  input {
    outline: none;
    border: none;
  }
  .header_top {
    height: px2vw(72);
    background-color: $themeColor;
  }
  .header_img {
    width: px2vw(18);
    height:  px2vw(29);
    margin-left: 2vw;
    margin-top: 3vw;
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
  .checkedNum{
    width: 100%;
    height: px2vw(45);
    font-size: px2vw(32);
    font-weight: 300;
    text-align: left;
    color: #333333;
    padding: 0 px2vw(23) 0 px2vw(17);
    margin: px2vw(20) 0;
  }
  .coin_ul1{
    width: px2vw(710);
    height: auto;
    background-color:  #e5e5e5;
    margin: 0 px2vw(23) px2vw(30) px2vw(17);
  }
  .coin_ul1_li{
    width: 100%;
    height: px2vw(100);
    overflow: hidden;
    background-color: #f7f7f9;
    margin-bottom: 1px;
  }
  .coin_ul1_li>img{
    float: right;
    width: px2vw(15);
    height: px2vw(25);
    margin-top: px2vw(39.5);
    margin-right: px2vw(20);
  }
  .li_yuan{
    width: px2vw(64);
    height: px2vw(64);
    float: left;
    border: px2vw(2) solid black;
    border-radius: 100%;
    margin-top: px2vw(18);
    margin-left: px2vw(14);
  }

  .li_coinNum{
    float: left;
    /*width: px2vw(107);*/
    height: px2vw(40);
    line-height: px2vw(40);
    font-family: PingFangSC;
    font-size: px2vw(28);
    font-weight: 300;
    text-align: left;
    color: #333333;
    margin: px2vw(32) 0  0 px2vw(14);
  }
  .li_coinCash{
    float: right;
    /*width: px2vw(135);*/
    height: px2vw(40);
    line-height: px2vw(40);
    font-family: PingFangSC;
    font-size: px2vw(28);
    font-weight: 300;
    text-align: left;
    margin: px2vw(32) px2vw(19)  0 px2vw(2);
    color: #999999;
  }
  .coin_line{
    width: 100%;
    height: px2vw(27);
    background-color: #f4f4f4;
    /*margin-top: px2vw(30);*/
  }
  .coin_line2{
    width: 100%;
    height:px2vw(2);
    background-color: #f4f4f4;
    /*margin-top: px2vw(30);*/
  }
  .coin_ul2{
    background-color: #e5e5e5;
    width: 100%;
    height: auto;
  }
  .coin_ul2_li{
    width: 100%;
    height: px2vw(100);
    background: white;
    overflow: hidden;
    margin-bottom: px2vw(2);
  }
  .ul2_li_text{
    float: left;
    margin-left: px2vw(22);
    margin-top: px2vw(30);
    /*width: px2vw(192);*/
    line-height: px2vw(45);
    font-family: PingFangSC;
    font-size: px2vw(32);
    font-weight: 300;
    text-align: left;
    color: #333333;
  }
  .ul2_li_num{
    float: right;
    /*width: px2vw(51);*/
    line-height: px2vw(40);
    font-family: PingFangSC;
    font-size: px2vw(32);
    font-weight: 300;
    text-align: left;
    color: #3676b6;
    margin-right: px2vw(20);
    margin-top: px2vw(30);
  }
  .ul2_li_pay{
    float: right;
    font-size: px2vw(28);
    font-weight: 300;
    color: #999999;
    margin-right: px2vw(20);
    line-height: px2vw(100);

  }
  .ul2_li_pay2{
    margin-top: px2vw(-2);
  }
  .phone_num{
    height: px2vw(100);
    line-height: px2vw(100);
  }
  .phone_name{
    height: px2vw(45);
    font-size: px2vw(32);
    font-weight: 300;
    text-align: left;
    color: #333333;
    margin-left: px2vw(22);
  }

  .checked_code{
    width: 100%;
    padding-top: px2vw(26);
    padding-bottom: px2vw(26);
  }
  .checked_code_text{
    /*width: 96px;*/
    height: px2vw(45);
    font-family: PingFangSC;
    font-size: px2vw(32);
    font-weight: 300;
    text-align: left;
    color: #333333;
    margin-left: px2vw(22);
  }
  .checked_code>input{
    border: none;
    height: px2vw(40);
    width: px2vw(190);
    font-family: PingFangSC;
    font-size: px2vw(28);
    font-weight: 300;
    text-align: left;
    color: #999999;
    margin-left: px2vw(38);
  }
  .get_checked_code{
    padding-left: px2vw(6);
    padding-right: px2vw(6);
    min-width: px2vw(153);
    line-height: px2vw(40);
    font-size: px2vw(28);
    font-weight: 300;
    color: #ffffff;
    background-color: #3676b6;
    border-radius: px2vw(8);
    text-align: center;
    margin-right: px2vw(20);
    float: right;
    margin-top: px2vw(5);
  }
  .save_btn{
    width: 100%;
    height: px2vw(206);
    background-color: #f4f4f4;
    padding-top: px2vw(80);
  }
  .pay{
    display: block;
    font-size: 4.233333vw;
    width: px2vw(580);
    height: px2vw(90);
    /*position: fixed;*/
    /*bottom: 0;*/
    padding: px2vw(21) 0;
    background-color: $themeColor;
    text-align: center;
    color: white;
    margin: 0 auto ;
  }
  .coin_ul2_li>img{
    float: right;
    width: px2vw(15);
    height: px2vw(25);
    margin-top: px2vw(37);
    margin-right: px2vw(20);
  }

  .phone_user {
    float: right;
    font-size: px2vw(28);
    color: #999999;
    margin-right: px2vw(20);
  }

  .closeDx {
    display: inline-block;
    margin-top: px2vw(25);
    border-radius: px2vw(10);
    padding: px2vw(5) px2vw(5);
    float: right;
    font-size: px2vw(28);
    margin-right: px2vw(22);
    background-color: #e5e5e5;
    color: #999999;
  }

  .imgBox_header {
    height: px2vw(72);
    width: px2vw(80);
  }

  .tsBox {

    height: px2vw(80);
    line-height: px2vw(80);
    padding-left: px2vw(22);
    color: #ffffff;
    background-color: #669ccd;
    font-size: px2vw(24);
  }

  .fixed {
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $borderColor !important;
    z-index: -1;
  }

  .wrap {
    background-color: white;
  }
  .pad{
    padding-top: px2vw(20) !important;
    padding-bottom: px2vw(0) !important;
    height: px2vw(68);
    margin-top: px2vw(0) !important;
  }
  .box_wrap{
    position: fixed;
    top:0;
    left: 0;
    width: 100vw;
    z-index: 100;
  }

  .top_top{
    margin-top: px2vw(73);
  }
  .coin_ul1_li>.alreadyImg {
    width: px2vw(50);
    height: px2vw(50);
    float: left;
    margin-top: px2vw(26);
    margin-right: 0;
    margin-left: px2vw(23);
  }
</style>
