<template>
  <div class="coinCashDetail">
    <!--头部-->
    <div class="header_top">
      <div  class="imgBox_header" @click="back">
        <img class="header_img"  src="../../../images/logIn/back.png" alt="">
      </div>
      <div class="header">
        乾币提现
      </div>
    </div>
    <ul class="detail_ul1">
      <li @click="cashBoole(true)" class="detail_ul1_li">
        <img v-if="cash" class="li_img1" src="../../../images/mine/cashDetail_img2.png" alt="">
        <img v-else class="li_img11" src="../../../images/mine/cashDetail_img1.png" alt="">
        <span class="li_text" :class="{active_li:cash}">不提现</span>
      </li>
      <li @click="cashBoole(false)" class="detail_ul1_li">
        <img v-if="cash" class="li_img1" src="../../../images/mine/cashDetail_img1.png" alt="">
        <img v-else class="li_img11" src="../../../images/mine/cashDetail_img2.png" alt="">
        <span class="li_text" :class="{active_li:!cash}">提现</span><span class="red-fz" v-if="types === 'tqbBalance'">(*仅购物成功，获得的乾币可提现！)</span>
      </li>
    </ul>
    <div v-show="!cash" class="writeNum">
      <input v-model="inputNums" @change="ifInputText" type="text"><span>最多可提现{{qBnum}}个乾币</span>
    </div>
    <div class="save_btn">
      <mu-raised-button @click="toSaveCoin" label="确定" class="pay" />
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
    export default {
      name: 'coinCashDetail',
      data(){
        return{
          cash:false,//是否提现
          qBnum : 0,//保存可提取的数量总额
          inputNums : 0,//保存输入的总额
          type: '', //保存类型
          qb : {},
          types: ''
        }
      },
      created(){
        this.mBack('back');
        console.log(this.pushQbNum);
        this.setQbNum();
        this.types = this.$route.query.falg;
        console.log(this.types)
      },
      computed:{
        ...mapGetters([
          'pushQbNum',
        ])
      },
      watch:{
        inputNums :function (val, oldval) {
          console.log(val);
          if(val > this.qBnum)
          {
            this.inputNums = this.qBnum
          } else if( !new RegExp(/^[1-9]([0-9]*)$|^[0-9]$/).test(val))
          {
             this.inputNums = ''
          }
        }
      },
      methods:{
        toSaveCoin(){
          if(!this.cash)
          {
            this.qb[this.type] =  this.inputNums
            let obj = {
              qb : this.qb
            }
            this.$store.dispatch('PUSH_TQB_NUM_TYPE',obj)
            this.$router.push({path:'/coinCash'})
          }else {
            this.qb[this.type] = '不提现'
            let obj = {
              qb : this.qb
            }
            this.$store.dispatch('PUSH_TQB_NUM_TYPE',obj)
            this.$router.push({path:'/coinCash'})
          }
        },
        ifInputText(){
          if(this.inputNums === '')
          {
            this.inputNums = 0
          }
        },
        setQbNum(){
          this.type = this.pushQbNum['type']
          this.qBnum = this.pushQbNum[this.type]
          this.qb = this.pushQbNum['qb']
          this.inputNums = this.pushQbNum[this.type]
        },
        back(){
//          this.$store.dispatch('PUSH_TQB_NUM_TYPE',{})
          this.$router.go(-1);
        },
        cashBoole(boole){
          this.cash=boole;
        }
      }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../common/sass/factory";
    .red-fz{
      display: inline-block;
      height: px2vw(40);
      line-height: px2vw(40);
      margin-top: px2vw(30);
      margin-left: px2vw(20);
      font-size: px2vw(24);
      color: #d81e06;
    }
    .coinCashDetail{
      width: 100vw;
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
      float: left;
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
  .detail_ul1{
    background-color: #e5e5e5;
    width: 100%;
    height: auto;
    overflow: hidden;
  }
  .detail_ul1_li{
    width: 100%;
    height: px2vw(100);background: white;
    margin-top: px2vw(2);
  }
  .detail_ul1_li>.active_li{
    color: #3676b6;
  }
  .li_img1{
    float: left;
    width: px2vw(31);
    margin-top: px2vw(35);
    margin-left: px2vw(21);
  }
  .li_img11{
    float: left;
    width: px2vw(31);
    margin-top: px2vw(35);
    margin-left: px2vw(21);
  }
  .li_text{
    float: left;
    /*width: 84px;*/
    height: px2vw(40);
    font-family: PingFangSC;
    font-size: px2vw(28);
    font-weight: 300;
    text-align: left;
    color: #333333;
    margin-top: px2vw(30);
    margin-left: px2vw(20);
  }
  .writeNum{
    width: 100%;
    height: px2vw(90);
  }
    .writeNum>input{
      border: px2vw(1) solid #dcdcdc;
      width: px2vw(350);
      height: px2vw(90);
      margin-left: px2vw(72);
      padding-left: px2vw(20);
      font-size: px2vw(32);
      vertical-align: middle;
    }
    .writeNum>span{
      display: inline-block;
      max-width: px2vw(280);
      margin-left: px2vw(20);
      font-size: px2vw(28);
      font-weight: 300;
      color: #d81e06;
      vertical-align: middle;

    }
    .save_btn{
      width: 100%;
      height: px2vw(206);
      /*background-color: #f4f4f4;*/
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
    .imgBox_header {
      height: px2vw(72);
      width: px2vw(80);
    }
</style>
