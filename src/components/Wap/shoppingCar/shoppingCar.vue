<template>
  <div class="shoppingCar">
    <div class="logIn_header">
      <span class="logWithCode">购物车<span v-if="alreadyLog">（{{gwcGoods.length}}）</span></span>
    </div>
    <div class="empty_car" v-if="!gwcGoods.length">
      <img src="../../../images/index/shoppingCar1.png" alt="购物车">
      <p>购物车中空空哒~</p>
      <p v-if="!alreadyLog">登录后同步购物车中的商品</p>
      <mu-raised-button label="登录" class="logIn_btn" v-if="!alreadyLog" @click="logInHandler"/>
    </div>
    <div class="needclick checkPos">
      <el-checkbox class="checkAll needclick" v-if="gwcGoods.length" v-model="selectaLL" @change="handleCheckAllChange">
        全选
      </el-checkbox>
    </div>
    <div class="scroll-wrapper" ref="wrapper">
      <ul class="shoppingList">
        <li v-for="(good, index) in gwcGoods" :key="good.itemPropertyInfo">
          <mt-cell-swipe
            :right="[{
              content: '收藏',
              style: { background: '#dcdcdc', fontSize: '3.7vw',  height: '30.4vw', lineHeight: '30.4vw', color: '#666', textAlign: 'center'},
              handler: () => collectHandler(good, index)
            },
            {
              content: '删除',
              style: { background: '#d81e06', fontSize: '3.7vw', height: '30.4vw', lineHeight: '30.4vw', color: '#fff', textAlign: 'center'},
              handler: () => deleteHandler(good, index)
            }
          ]">
            <div class="fl item-img needclick">
              <div class="check-wrap needclick fl">
                <el-checkbox v-model="good.checked" v-if="good.state === 1" class="if-check needclick"></el-checkbox>
                <span class="invalid" v-else>失效</span>
              </div>
              <div class="img-wrap fl" @click="goProductDetail(good)">
                <img :src="good.pic+'?imageView2/1/w/80/h/80'" alt="已购买商品">
              </div>
            </div>
            <div class="item-info fr" @click="goProductDetail(good)">
              <h5>{{good.name}}</h5>
              <i>
                <span v-if="good.itemBrandName">{{good.itemBrandName}}</span>
              </i>
              <p>
                <span v-if="good.itemPropertyInfo">{{good.itemPropertyInfo}}</span>
                <span v-if="good.itemPropertyTwoValue">；{{good.itemPropertyTwoValue}}</span>
                <span v-if="good.itemPropertyThreeValue">；{{good.itemPropertyThreeValue}}</span>
                <span v-if="good.itemPropertyFourValue">；{{good.itemPropertyFourValue}}</span>
                <span v-if="good.itemPropertyFiveValue">；{{good.itemPropertyFiveValue}}</span>
                <span v-if="good.itemPropertySixValue">；{{good.itemPropertySixValue}}</span>
              </p>
              <em>￥{{good.price}}</em>
            </div>
            <div class="btns" v-if="good.state === 1">
              <span class="reduce" :class="{disable: good.num === 1}" v-on:click="reduceGood(index, good)">-</span>
              <span class="num-place"><input type="number" pattern="[1-9]*" v-model="good.num"
                                             @keyup="keyupHandler(index, good, $event)"
                                             @blur="blurHandler(index, good, $event)"></span>
              <span class="add" :class="{disable: good.num >= good.goodLeaveNum}"
                    v-on:click="addGood(index, good)">+</span>
            </div>
          </mt-cell-swipe>
        </li>
      </ul>
    </div>
    <div class="shopping-footer" v-if="gwcGoods.length">
      <div class="border needclick fl">
        <el-checkbox class="check-all needclick" v-model="selectaLL" @change="handleCheckAllChange">全选</el-checkbox>
        <span class="total">合计： <i>￥{{allMoeny}}</i></span>
      </div>
      <div class="settlement fr" @click="goToSuborder">结算<span>{{'（' + haveSelectedGoodNum + '）'}}</span></div>
    </div>
  </div>
</template>

<script>
  import {Toast, Indicator, CellSwipe, MessageBox} from 'mint-ui'
  import {tokenMethods} from '../../../vuex/util'
  export default {
    name: 'shoppingCar',
    data() {
      return {
        selectaLL: false,
        jiwsuanbtnFixed: false,
        gwcGoods: [],
        haveSelectedGoodNum: 0,
        allMoeny: 0,
        sendDataList: [],
        alreadyLog: true
      }
    },
    created() {
      var that = this;
      that.getGwcList();
      that.$emit('listenToChildEvent', 'shopping_cart');
      if (!tokenMethods.getWapToken()) {
        that.alreadyLog = false;
      }
      that.gBack();

    },
    watch: {
      gwcGoods: {
        handler: function () {
          this.allMoeny = 0;
          this.haveSelectedGoodNum = 0;
          this.sendDataList = [];
          var flag = true;
          for (let a = 0; a < this.gwcGoods.length; a++) {
            if (this.gwcGoods[a].checked && this.gwcGoods[a].state === 1) {
              this.allMoeny += this.gwcGoods[a].price * this.gwcGoods[a].num;
              this.haveSelectedGoodNum += parseInt(this.gwcGoods[a].num);
              this.sendDataList.push(this.gwcGoods[a]);
            } else {
              flag = false;
            }
          }
          let arr = this.gwcGoods.filter((item) => {
            return item.state === 1
          })
          if(arr.length === this.sendDataList.length){
            flag = true;
          }
          if (flag) {
            this.selectaLL = true;
          } else {
            this.selectaLL = false;
          }
        },
        deep: true
      }
    },
    methods: {
      blurHandler(index, row, $event) {
        let numVal = parseInt(this.gwcGoods[index].num) || 0
        numVal = numVal < 1 ? 1 : numVal
        if (numVal > this.gwcGoods[index].goodLeaveNum) {
          Toast({message: '数量超出范围！', duration: 1500})
        }
        this.gwcGoods[index].num = numVal > this.gwcGoods[index].goodLeaveNum ? this.gwcGoods[index].goodLeaveNum : numVal
        this.updataNum(this.gwcGoods[index].num, row)
      },
      keyupHandler(index, row, $event) {
        let keyCode = $event.keyCode ? $event.keyCode : $event.charCode;
        if (keyCode !== 8) {
          let numVal = parseInt(this.gwcGoods[index].num) || 0
          numVal = numVal < 1 ? 1 : numVal
          if (numVal > this.gwcGoods[index].goodLeaveNum) {
            Toast({message: '数量超出范围！', duration: 1500})
          }
          this.gwcGoods[index].num = numVal > this.gwcGoods[index].goodLeaveNum ? this.gwcGoods[index].goodLeaveNum : numVal
          this.updataNum(this.gwcGoods[index].num, row)
        }
      },
      collectHandler(item, index) {
        var obj = {
          itemId: item.itemId,
          token: tokenMethods.getWapToken(),
          itemSKU: item.itemSKU
        }
        this.$store.dispatch('COLLECT_CARGO', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            Toast({message: '收藏成功！', duration: 1500})
            this.getGwcList()
          }
        });
      },
      deleteHandler(item, index) {
        var that = this
        MessageBox.confirm('确定将该商品移出购物车吗?').then(action => {
          var obj = {
            phone: tokenMethods.getWapUser().phone,
            itemSKU: item.itemSKU,
            token: tokenMethods.getWapToken()
          };
          that.$store.dispatch('DEL_CAR_GOODS', obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              Toast('已移出购物车！')
              that.gwcGoods.splice(index, 1);
            }
          })
        }).catch(err => {
        })
      },
      logInHandler() {
        this.$router.push({path: '/logIn'})
      },
      back: function () {
        this.$router.go(-1)
      },
      goToSuborder: function () {
        var that = this;
        var sendData = {};
        sendData.allMoney = that.allMoeny;
        if (sendData.allMoney > 0) {
          var certData = tokenMethods.getWapUser().certification
          //第30天是否完善资质信息
          if( (tokenMethods.getWapUser().created && new Date().getTime() > tokenMethods.getWapUser().created + 30 * 24 * 3600 * 1000) &&    (certData.type === 1 && (certData.doctorPic === '' || certData.doctorPic === null)) || (certData.type === 2 && (certData.businessLicense === '' || certData.businessLicense === null || certData.medicalLicense === '' || certData.medicalLicense === null || certData.taxRegistration === '' || certData.taxRegistration === null))  ){
            MessageBox.confirm('', {
              message: '请先完善资质信息！',
              title: '',
              confirmButtonText: '立即完善',
              cancelButtonText: '下次再说'
            }).then(action => {
              if (action == 'confirm') {
                window.scroll(0, 0)
                this.$router.push({path: '/personalData'})              }
            }).catch(err => {
              if (err == 'cancel') {
              }
            });
          } else {
            for (let i in that.sendDataList) {
              that.sendDataList[i].totalMoney = that.sendDataList[i].price * that.sendDataList[i].num;
              that.sendDataList[i].itemName = that.sendDataList[i].name;
              that.sendDataList[i].picPath = that.sendDataList[i].pic;
              that.sendDataList[i].goodBrandName = that.sendDataList[i].itemBrandName;
              that.sendDataList[i].goodSort = that.sendDataList[i].itemSort;
            }
            sendData.details = that.sendDataList;
            sendData.haveSelectedGoodNum = that.haveSelectedGoodNum;
            window.sessionStorage.setItem("suborderData", JSON.stringify(sendData));
            sessionStorage.setItem('backJudgeDS','shopCar');
            that.$router.push({path: '/suborder', query: {backJudge: 'shopCar'}})
          }
        }else{
          Toast('请至少选择一件商品！');
        }
      },
      reduceGood: function (index, good) {
        var that = this;
        if (this.gwcGoods[index].num > 1) {
          this.gwcGoods[index].num--;
          that.updataNum(this.gwcGoods[index].num, good);
        }
      },
      addGood: function (index, good) {
        var that = this;
        if (this.gwcGoods[index].num < this.gwcGoods[index].goodLeaveNum) {
          this.gwcGoods[index].num++;
          that.updataNum(this.gwcGoods[index].num, good);
        }
      },
      updataNum: function (num, good) {
        var that = this;
        var obj = {
          phone: tokenMethods.getWapUser().phone,
          itemSKU: good.itemSKU,
          token: tokenMethods.getWapToken(),
          num: num
        };
        that.$store.dispatch('UPDATE_GOODS_NUM', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            // this.gwcGoods.splice(index,1);
            // this.$message({type: 'success',  message: '商品收藏成功!' });
          }
        })
      },
      handleCheckAllChange: function () {
        if (this.selectaLL) {
          for (var i = 0; i < this.gwcGoods.length; i++) {
            var data = this.gwcGoods[i];
            data.checked = true;
            this.gwcGoods.splice(i, 1, data);
          }
        } else {
          for (var i = 0; i < this.gwcGoods.length; i++) {
            var data = this.gwcGoods[i];
            data.checked = false;
            this.gwcGoods.splice(i, 1, data);
          }
        }
        this.selectaLL = !this.selectaLL;
      },
      getGwcList: function () {
        var that = this;
        var obj = {
          token: tokenMethods.getWapToken()
        };
        Indicator.open();
        that.$store.dispatch('GET_CAR_LIST', obj).then((res) => {
          if (res.callStatus === 'SUCCEED') {
            var data = res.data;
            for (let i in data) {
              data[i].checked = false;
              data[i].totalMoney = data[i].num * data[i].price;
            }
            this.gwcGoods = data;
          } else {
            Indicator.close()
          }
        }).catch(() => {
          Indicator.close()
        })
      },
      // 未登录时
      toLog: function () {
        var that = this
        that.$router.push({path: '/logIn'})
      },
      // 跳转详情
      goProductDetail(good) {
        sessionStorage.setItem('backJudgeSL', 'shopCar');
        this.$router.push({path: '/details/' + good.itemId, query: {name: good.name, itemId: good.itemId}});
        window.scroll(0, 0)
      },
    }
  }
</script>
<style>
  .shoppingCar .mint-cell-title {
    display: none;
  }

  .shoppingCar .mint-cell-value {
    margin-top: 8px;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .scroll-wrapper {
    position: fixed;
    left: 0;
    width: 100%;
    top: px2vw(188);
    bottom: px2vw(208);
    z-index: 10;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .logWithCode {
    width: px2vw(260);
  }
  .logIn_header {
    position: fixed;
    top: 0;
    background: #3676B5;
    z-index: 99;
  }
  .checkPos {
    width: 100%;
    height: px2vw(98);
    position: fixed;
    top: px2vw(88);
    z-index: 99;
    background: #fff;
  }
  .shoppingCar .mint-cell-swipe {
    height: px2vw(228);
    border-bottom: px2vw(1) dotted #dcdcdc;
  }
  .disable {
    background: #fafafa;
  }
  .shoppingCar {
    height: 100vh;
    font-size: px2vw(32);
    .empty_car {
      text-align: center;
      position: absolute;
      top: px2vw(190);
      left: 50%;
      transform: translateX(-50%);
      z-index: 99;
      img {
        width: px2vw(140);
        margin-bottom: px2vw(20);
      }
      p {
        font-size: px2vw(28);
        color: #999;
        margin-top: px2vw(7);
      }
      .logIn_btn {
        width: px2vw(580);
        height: px2vw(90);
        line-height: px2vw(90);
        font-size: px2vw(34);
        background-color: $themeColor;
        color: #fff;
        margin: px2vw(75) auto;
        text-align: center;
        box-shadow: 0 0 7px $themeColor;
        display: block;
      }
    }
    .checkAll {
      height: px2vw(100);
      line-height: px2vw(100);
      border-bottom: px2vw(1) dotted #e5e5e5;
      display: block;
      position: relative;
      left: px2vw(20);
    }
    .check-wrap {
      width: px2vw(70);
      height: px2vw(188);
      position: relative;
      .if-check {
        width: px2vw(70);
        height: px2vw(188);
        line-height: px2vw(188);
        position: absolute;
        top: px2vw(0);
      }
      .invalid{
        position: absolute;
        border-radius: px2vw(6);
        width: px2vw(64);
        height: px2vw(30);
        line-height: px2vw(30);
        text-align: center;
        top: 50%;
        transform: translateY(-50%);
        background: rgb(214, 214, 214);
        font-size: px2vw(24);
        color: #fff;
      }
    }
    .shopping-footer {
      width: 100%;
      display: flex;
      background: #fff;
      position: fixed;
      bottom: px2vw(96);
      z-index: 99;
      height: px2vw(102);
      line-height: px2vw(100);
      .border {
        flex: 3;
        border-top: px2vw(1) solid #dcdcdc;
        border-bottom: px2vw(1) solid #f7f7f7;
      }
      .check-all {
        width: px2vw(188);
        position: relative;
        left: px2vw(20);
      }
      .total {
        font-size: px2vw(32);
        i {
          font-style: normal;
          color: #d81e06;
        }
      }
      .settlement {
        width: px2vw(285);
        display: inline-block;
        background: $themeColor;
        color: #fff;
        text-align: center;
        box-sizing: border-box;
      }
    }
    .title-bg {
      background: #fff;
      height: px2vw(87);
      line-height: px2vw(87);
      font-size: px2vw(32);
      color: #333;
      border-bottom: px2vw(1) solid #e5e5e5;
    }
    .shoppingList {
      /* padding: px2vw(188) 0 px2vw(208) 0; */
      li {
        .item-img {
          .img-wrap {
            position: relative;
            border: px2vw(1) solid #dcdcdc;
            width: px2vw(188);
            height: px2vw(188);
            over-flow: hidden;
            text-align: center;
            img {
              width: px2vw(170);
              height: px2vw(170);
              vertical-align: middle;
              display: block;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }
      }
    }
    .item-info {
      height: px2vw(188);
      padding-left: px2vw(20);
      position: relative;
      h5 {
        font-weight: normal;
        font-size: px2vw(28);
        color: #333;
      }
      i {
        position: absolute;
        bottom: px2vw(90);
        color: #999;
        font-size: px2vw(24);
        font-style: normal;
      }
      p {
        position: absolute;
        bottom: px2vw(50);
        color: #999;
        font-size: px2vw(24);
      }
      em {
        position: absolute;
        bottom: px2vw(2);
        font-style: normal;
        color: #d81e06;
        font-size: px2vw(28);
      }
    }
  }

  .btns {
    position: absolute;
    right: px2vw(20);
    bottom: 0;
    width: px2vw(150);
    display: flex;
    span {
      flex: 1;
      line-height: px2vw(50);
      display: inline-block;
      text-align: center;
      color: #666;
      border: px2vw(1) solid #dcdcdc;
      box-sizing: border-box;
    }
    .num-place {
      overflow: hidden;
      border-left: none;
      border-right: none;
      background: #fff;
      input {
        width: px2vw(50);
        text-align: center;
        border: none;
        font-size: px2vw(24);
      }
    }
  }
</style>

