<template>
  <div class="cashSetting">
    <!--头部-->
    <div class="header_top">
      <div @click="back" class="imgBox_header">
        <img  class="header_img"  src="../../../images/logIn/back.png" alt="">
      </div>

      <div class="header">
        提现设置
      </div>
    </div>
    <ul class="setting_ul1">
      <li @click="changePayWay" class="ul1_li2">
        <span class="li_text">类型</span>
        <img class="li1_img" src="../../../images/mine/coin_img1.png" alt="">
        <span class="li1_text">{{payWay}}</span>
      </li>
      <li class="ul1_li2">
        <span class="li_text">开户者</span>
        <input v-model="name" class="li2_text" type="text" placeholder="请输入姓名">
        <!--<span class="li2_text">支付宝</span>-->
      </li>
      <li class="ul1_li2" v-show="showBank">
        <span class="li_text">开户银行</span>
        <input v-model="bank" class="li2_text" type="text" placeholder="请输入银行具体到支行">
        <!--<span class="li2_text">支付宝</span>-->
      </li>
      <li class="ul1_li2" v-show="showBank">
        <span class="li_text">银行账户</span>
        <input v-model="bankUser" class="li2_text" type="text" placeholder="请输入账号">
        <!--<span class="li2_text">支付宝</span>-->
      </li>
      <li class="ul1_li2" v-show="!showBank">
        <span class="li_text">支付宝账号</span>
        <input v-model="ZFB" class="li2_text" type="text" placeholder="请输入账号">
        <!--<span class="li2_text">支付宝</span>-->
      </li>

    </ul>
    <div class="save_btn">
      <mu-raised-button @click="saveBankPay" label="保存" class="pay" />
    </div>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex'
    import {Toast} from 'mint-ui';
    import { Actionsheet } from 'mint-ui';
    export default {
      name: 'cashSetting',
      data(){
        return {
          payWay : '支付宝',
          sheetVisible : false,
          name : '',//开户者
          bank : '',//开户银行
          bankUser : '',//银行账户
          ZFB : '', //支付宝账户
          showBank : false,
          actions : [
            {
              name : '支付宝',
              method : this.changePayWay1
            },
            {
              name : '银行卡',
              method : this.changePayWay2
            },
            ]
        }
      },
      computed: {
        ...mapGetters([
          'pushBankMss'
        ])
      },
      created (){
        this.isSaveED();
        this.mBack('back');
      },
      methods:{
        isSaveED (){
          if(this.payWay === '支付宝')
          {
            this.ZFB = this.pushBankMss.ZFB;
            this.name = this.pushBankMss.name;
          }else {
//            let obj = {
//              name: this.name,
//              bank: this.bank,
//              bankUser: this.bankUser,
//            };
            this.name = this.pushBankMss.name;
            this.bank = this.pushBankMss.bank;
            this.bankUser  = this.pushBankMss.bankUser;
            console.log( this.name, this.bank,  this.bankUser, '呵呵呵呵呵呵');
          }

        },
        saveBankPay(){
          if(this.payWay === '支付宝')
          {
            let obj = {
              name : this.name,
              ZFB : this.ZFB,
              bank : '非银行',
              bankUser : this.ZFB,
              payWay : '支付宝'
            };
            let obc = {
              name : this.name,
              ZFB : this.ZFB
            };
            for(let prop in obc)
            {
              if(this.hasSpace(obc[prop]))
              {
                Toast({message: '支付宝信息不能为空', duration: 1500})
                return;
              }
            }
            Toast({message: '保存成功', duration: 1500});
            this.$store.dispatch('PUSH_BANK_MSS',obj);
            this.$router.push({path:'/coinCash'})

          }else {
            let obj = {
              name : this.name,
              bank : this.bank,
              bankUser : this.bankUser,
              ZFB : '',
              payWay : '银行卡'
            }
            let obc = {
              name : this.name,
              bank : this.bank,
              bankUser : this.bankUser
            }
            for(let prop in obc)
            {
              if(this.hasSpace(obc[prop]))
              {
                Toast({message: '银行卡信息不能为空', duration: 1500})
                return;
              }
            }

            Toast({message: '保存成功', duration: 1500})
            this.$store.dispatch('PUSH_BANK_MSS',obj)
            this.$router.push({path:'/coinCash'})
          }
        },

        changePayWay1(){
          this.payWay = '支付宝';
          this.isSaveED();
          this.showBank = false;
        },
        changePayWay2(){
          this.payWay = '银行卡';
          this.isSaveED();
          this.showBank = true;
        },
        changePayWay(){
          this.sheetVisible = !this.sheetVisible
        },
        back(){
          this.$router.go(-1);
        },
        //判断有无空格 以及空字符串
        hasSpace(obj){
          obj.replace(/\s+/g,"");
          if(obj.replace(/\s+/g,"").length > 0)
          {
            return false
          }
          return true
        },
      },
      component:{Actionsheet}
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../common/sass/factory";
    .cashSetting{
      width: 100vw;
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
  .setting_ul1{
    width: px2vw(713);
    margin: 0 auto;
    min-height: px2vw(10);
  }
    .setting_ul1>li{
      width: 100%;
      border-bottom: px2vw(2) solid #e5e5e5;
      height: px2vw(102);
    }
  .li_text{
    float: left;
    /*width: 56px;*/
    line-height: px2vw(40);
    font-family: PingFangSC;
    font-size: px2vw(28);
    font-weight: 300;
    text-align: left;
    color: #333333;
    margin-top: px2vw(30);
  }
  .li2_text{
    float: right;
    line-height: px2vw(40);
    font-family: PingFangSC;
    font-size: px2vw(28);
    font-weight: 300;
    text-align: left;
    color: #999999;
    margin-right: px2vw(33);
    margin-top: px2vw(30);
    border: none;
    text-align: right;
  }
  .li1_text{
    float: right;
    line-height: px2vw(40);
    font-family: PingFangSC;
    font-size: px2vw(28);
    font-weight: 300;
    text-align: left;
    color: #999999;
    margin-right: px2vw(17);
    margin-top: px2vw(30);
  }
  .li1_img{
    float: right;
    width: px2vw(16);
    height: px2vw(25);
    margin-top: px2vw(38);
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
