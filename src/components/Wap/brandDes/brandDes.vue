<template>
  <div class="brandDes">

    <div class="brandDesHeadWrap_a">
    <div class="logIn_header">
      <div class="header_box" @click="back">
        <img class="header_back" src="../../../images/logIn/back.png" alt="img">
      </div>
      <span class="logWithCode">{{brandName}}</span>
    </div>
    <div class="tab_box">
      <div class="tab_item" :class="{spe: isActive1}" @click="changeActive1(tab01Text);">商品</div>
      <div class="tab_item" :class="{spe: isActive2}" @click="changeActive2(tab02Text);">介绍</div>
      <div class="tab_item" :class="{spe: isActive3}" @click="changeActive3(tab03Text);">使用说明</div>
      <div class="tab_item" :class="{spe: isActive4}" @click="changeActive4(tab04Text);">评论</div>
    </div>
    </div>

    <div class="brandDesWrap">
    <!-- 点击导航后要切换的内容 -->
      <transition name="component-fade" mode="out-in">
        <component :is="currentView" keep-alive></component>
      </transition>
    </div>

    <div class="bottom_box_a">
      <div class="collectCargo" @click="collectCargo">
        <img v-if="starImg" src="../../../images/details/star.png" alt="img">
        <img v-else src="../../../images/details/star_blue.png" alt="img">
      </div>
      <div class="seeCar" @click="goToCar">
        <span class="carNum">{{num}}</span>
        <img src="../../../images/details/shoppinpCar.png" alt="img">
    </div>
      <div class="inCar" v-if="!isNot" @click="addGoodInCar">加入购物车</div>
      <div v-else class="inCar" :class="{active1: isNot}">加入购物车</div>
      <div class="nowBuy" v-if="!isNot" @click="nowBuy">立即购买</div>
      <div v-else class="nowBuy" :class="{active2: isNot}">立即购买</div>
    </div>
    </div>
</template>

<script>
import Vue from 'vue'
import cargoDes from './cargoDes'
import cargoIntro from './cargoIntro'
import cargoUse from './cargoUse'
import cargoComment from './cargoComment'
import { tokenMethods } from '../../../vuex/util'
import { GET_CAR_ROUTERSTATE } from '@vuex/types'
import { Toast, MessageBox, Indicator } from 'mint-ui';
import {mapGetters} from 'vuex'
export default {
  name: 'details',
  data () {
    return {
      switchs: false,
      imgBoxShow: false,
      brandName: '',
      itemId: '',
      isActive1: true,
      isActive2: false,
      isActive3: false,
      isActive4: false,
      tab01Text: "tab01",
      tab02Text: "tab02",
      tab03Text: "tab03",
      tab04Text: "tab04",
      currentView: 'tab01', //默认选中的导航栏
      num: null,
      starImg: true,
      nowGoodDetails: {},
      isNot: false,
      nowGoodDetails: {},
    }
  },
  components: {
    tab01: cargoDes,
    tab02: cargoIntro,
    tab03: cargoUse,
    tab04: cargoComment,
  },
  computed:{
    ...mapGetters([
      'saveToCoin',
    ]),
  },
  created: function() {
    var that = this
    that.mBack('back');
    that.brandName = that.$route.query.name
    that.itemId = that.$route.query.itemId
    that.getNowGoodDetail()
    that.getGwcList()
    var obj = {
      itemId: that.itemId,
      token: tokenMethods.getWapToken(),
    };
    that.$store.dispatch('GET_ITEM_DETAIL', obj).then((res) => {
      if (res.data.callStatus === 'SUCCEED') {
        if (res.data.num == 0) {
          that.starImg = true
        } else {
          that.starImg = false
        }
      }
    })
  },
  methods: {
    switchClose(switchs){
      this.switchs = switchs;
    },
      // 获取商品详情
      getNowGoodDetail: function() {
        var that = this;
        var obj = {
          itemId: that.itemId,
          token: tokenMethods.getWapToken(),
        };
        that.$store.dispatch('GET_ITEM_DETAIL', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.nowGoodDetails = res.data.data;
            if (that.nowGoodDetails.state == 0) {
              that.isNot = true
            };
          }
        })
      },
    getGwcList:function(){
      var that = this;
      var obj = {
        token: tokenMethods.getWapToken()
      };
      Indicator.open()
      that.$store.dispatch('GET_CAR_LIST', obj).then((res) => {
        Indicator.close()
        if (res.callStatus === 'SUCCEED') {
          that.num = res.data.length
        }
      })
    },
    // 立即购买
    nowBuy:function() {
      var that = this
      that.nowGoodDetails = that.$store.state.index.nowGoodDetails
      var userToken = tokenMethods.getWapToken()
      var nowSku = that.$store.state.index.goodSku
      if(userToken) {
        if (that.$store.state.index.nowStock == 0) {
          Toast({message: '该商品库存为0！', duration: 1500})
          return false
        }
        if(nowSku) {
          var sendData = {}
          sendData.details = []
          let certData = tokenMethods.getWapUser().certification
          //第30天是否完善资质信息
          if( (tokenMethods.getWapUser().created && new Date().getTime() > tokenMethods.getWapUser().created + 30 * 24 * 3600 * 1000) ){
            if((certData.type === 1 && (certData.doctorPic === '' || certData.doctorPic === null)) || (certData.type === 2 && (certData.businessLicense === '' || certData.businessLicense === null || certData.medicalLicense === '' || certData.medicalLicense === null || certData.taxRegistration === '' || certData.taxRegistration === null))){
              MessageBox.confirm('', {
                message: '请先完善资质信息！',
                title: '',
                confirmButtonText: '立即完善',
                cancelButtonText: '下次再说'
              }).then(action => {
                if (action == 'confirm') {
                  window.scroll(0, 0)
                  this.$router.push({path: '/personalData'})
                }
              }).catch(err => {
                if (err == 'cancel') {
                }
              });
            } else{
              if(tokenMethods.getWapUser().certification.state != 2){
                var obj = {
                  phone: tokenMethods.getWapUser().phone,
                  token: tokenMethods.getWapToken()
                }
                that.$store.dispatch('GET_PERSON_LIST', obj).then((res) => {
                  if(res.data.state != 2){
                    Toast('资质审核中')
                    return
                  }else {
                    that.nowBuyIt();
                  }
                })
              }else {
                that.nowBuyIt();
              }
            }
          }else {
            that.nowBuyIt();
          }
        }else{
          Toast({message: '请选择正确的商品属性！', duration: 1500})
        }
      } else {
        MessageBox.confirm('请先登录!').then(action => {
          that.$router.push({path: '/logIn'})
        });
      }
    },
    //提取的方法
    nowBuyIt:function () {
      let that = this;
      that.nowGoodDetails = that.$store.state.index.nowGoodDetails
      var nowSku = that.$store.state.index.goodSku
      var sendData = {}
      sendData.details = []
      var obj = {
        itemId: that.nowGoodDetails.itemId,
        itemName: that.nowGoodDetails.itemName,
        picPath: that.nowGoodDetails.itemDetail.itemPica,
        num: that.$store.state.index.goodNum ? that.$store.state.index.goodNum : 1,
        itemSKU: nowSku,
        price: that.nowGoodDetails.itemPrice,
        goodBrandName: that.nowGoodDetails.itemBrand.itemBrandName,
        goodSort: that.nowGoodDetails.itemSort
      }
      sendData.allMoney = that.nowGoodDetails.itemPrice * 100 * that.$store.state.index.goodNum / 100;
      var list = that.nowGoodDetails.itemValueList;
      for(let i in list){
        if(nowSku==list[i].itemSKU){
          obj.itemPropertyInfo = list[i].itemPropertyInfo;
          obj.itemPropertyTwoValue = list[i].itemPropertyTwoValue;
          obj.itemPropertyThreeValue = list[i].itemPropertyThreeValue;
          obj.itemPropertyFourValue = list[i].itemPropertyFourValue;
          obj.itemPropertyFiveValue = list[i].itemPropertyFiveValue;
          obj.itemPropertySixValue = list[i].itemPropertySixValue;
          break;
        }
      }
      sendData.haveSelectedGoodNum = that.$store.state.index.goodNum;
      sendData.details.push(obj)
      window.sessionStorage.setItem("suborderData",JSON.stringify(sendData))


      window.scroll(0,0)
      var backParams = {
        brandName: that.brandName,
        itemId: that.itemId
      }
      sessionStorage.setItem('backJudgeDS', 'details');
      sessionStorage.setItem('backParamsDetailsID', backParams.itemId);
      sessionStorage.setItem('backParamsDetailsName', backParams.brandName);
      that.$router.push({path: '/suborder'})
    },
    // 加入购物车
    addGoodInCar: function() {
      var that = this;
      if(tokenMethods.getWapToken()) {
          if (that.$store.state.index.nowStock == 0) {
            Toast({message: '该商品库存为0！', duration: 1500})
            return false
          }
          if(that.$store.state.index.goodSku) {
            var obj = {
              num: that.$store.state.index.goodNum,
              itemSKU: that.$store.state.index.goodSku,
              token: tokenMethods.getWapToken()
            }
            that.$store.dispatch('ADD_IN_CAR', obj).then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                Toast({message: '商品成功加入购物车！', duration: 1500})
                that.getGwcList()
              }
            });
          }else{
            Toast({message: '请选择正确的商品属性！', duration: 1500})
          }
        // }
      } else {
        MessageBox.confirm('请先登录!').then(action => {
          that.$router.push({path: '/logIn'})
        })
      }
    },
    // 收藏商品
    collectCargo: function() {
      var that = this
      if(tokenMethods.getWapToken()) {
        if (that.starImg == true) {
          var obj = {
            itemId: that.itemId,
            token: tokenMethods.getWapToken(),
            itemSKU: parseInt(Math.random()*100000),
          }
          that.$store.dispatch('COLLECT_CARGO', obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              Toast({message: '收藏成功！', duration: 1500})
              that.starImg = false
            }
          });
        } else {
          var obj = {
            itemId: that.itemId,
            token: tokenMethods.getWapToken(),
          }
          that.$store.dispatch('CANCEL_CARGO', obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              Toast({message: '取消成功！', duration: 1500})
              that.starImg = true
            }
          });
        }
      } else {
        MessageBox.confirm('请先登录!').then(action => {
          that.$router.push({path: '/logIn'})
        })
      }
    },

//商品详情前进判断  ----------------------------------------------------

    //商品详情跳转new购物车 (backJudgeSKL) passSecond
    goToCar: function() {
      let backParams = {
        brandName: this.brandName,
        itemId: this.itemId
      };
      sessionStorage.setItem('backJudgeSKL', 'passSecond');
      sessionStorage.setItem('backParamsDetailsID', backParams.itemId);
      sessionStorage.setItem('backParamsDetailsName', backParams.brandName);
      this.$router.push({path: '/shoppingCarEntry'});
    },

    back: function() {
        this.$router.push({path:'/productList'});
      },
    changeActive1: function(tabText) {
      this.currentView = tabText;
      this.isActive1 = true;
      this.isActive2 = false;
      this.isActive3 = false;
      this.isActive4 = false;
    },
    changeActive2: function(tabText) {
      this.currentView = tabText;
      this.isActive1 = false;
      this.isActive2 = true;
      this.isActive3 = false;
      this.isActive4 = false;
    },
    changeActive3: function(tabText) {
      this.currentView = tabText;
      this.isActive1 = false;
      this.isActive2 = false;
      this.isActive3 = true;
      this.isActive4 = false;
    },
    changeActive4: function(tabText) {
      this.currentView = tabText;
      this.isActive1 = false;
      this.isActive2 = false;
      this.isActive3 = false;
      this.isActive4 = true;
    },
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  body {
    &.full-body{
      position: fixed !important;
      top: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
      overflow: hidden !important;
      .bottom_box_a{
        position: absolute !important;
      }
      .brandDesHeadWrap_a{
        position: absolute !important;
      }
    }
  }
</style>

<style scoped lang="scss" rel="stylesheet/scss">
@import "../../../common/sass/factory";

.logIn_header {
  width: 100vw;
  height: px2vw(88);
  line-height: px2vw(88);
  padding-bottom: 10vw;
  border-bottom:  px2vw(1) solid $borderColor;
  text-align: center;
  background-color: $themeColor;
}
.brandDesHeadWrap_a{
  position: fixed;
  top:0;
  left: 0;
  z-index: 999;
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
.brandDesWrap{
  position: fixed;
  top: 12.33vh;
  height: 81vh;
  bottom: 0;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  z-index: 1000;
}
.spe {
  cursor: pointer;
  color: $themeColor !important;
  border-bottom: 1px solid $themeColor;
}
.myOrder {
  width: 100%;
  height: 100%;
/*  background-color: #A08F65;*/
}
.tab_box {
  width: 100vw;
  height: 10vw;
  border-bottom: 1px solid $borderColor;
}
.tab_item {
  width: 25vw;
  height: 10vw;
  line-height: 10vw;
  text-align: center;
  font-size: 14px;
  float: left;
}
.bottom_box_a {
  width: 100vw;
  height: 12vw;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #DBDBDB;
}
.collectCargo {
  width: 11.8vw;
  height: 12vw;
  line-height: 12vw;
  float: left;
  border-right: 1px solid #DBDBDB;
  background-color: #fff;
}
.collectCargo > img {
  width: 5.2vw;
  height: 4.9vw;
  float: left;
  margin-left: 3vw;
  margin-top: 3.7vw;
}
.seeCar {
  width: 12vw;
  height: 12vw;
  line-height: 12vw;
  float: left;
  background-color: #fff;
  position: relative;
}
.seeCar > img {
  width: 5.2vw;
  height: 4.9vw;
  position: absolute;
  top: 4vw;
  left: 3vw;
}
.seeCar .carNum {
  color: #D81E06;
  position: absolute;
  top: -2vw;
  right: 1vw;
  font-size: 12px;
  border-radius: 50%;
}
.inCar {
  display: block;
  width: 38.1vw;
  height: 12vw;
  line-height: 12vw;
  text-align: center;
  color: #fff;
  background-color: #009AF5;
  font-size: 3.7vw;
  float: left;
}
.nowBuy {
  display: block;
  width: 38.1vw;
  height: 12vw;
  line-height: 12vw;
  text-align: center;
  color: #fff;
  background-color: $themeColor;
  font-size: 3.7vw;
  float: left;
}
.active1 {
  background-color: rgb(209, 209, 209)!important;
}
.active2 {
  background-color: rgb(189, 189, 189)!important;
}
</style>

