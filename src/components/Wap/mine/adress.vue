<template>
  <div class="address_wrap">
    <div class="box_top">
      <div class="header_top">
        <div @click="toBack" class="header_img_box">
          <img class="header_img" src="../../../images/logIn/back.png" alt="">
        </div>
        <div class="header">
          收货地址
        </div>
      </div>
    </div>

    <div class="top_top" v-if="addressData.length > 0">
    <!--地址开始-->
      <div class="address-box" v-for="(item,index) in addressData" @click="selectAddress(index)" :key="index">
        <div class="address-info clearfix">
          <div class="info-left fl">
            <h2 class="title">{{item.receiverName}}</h2>
            <p class="toAddress">{{item.city}}{{item.county}}{{item.receiverDetail}}</p>
          </div>
          <div class="info-right">
            <span>{{item.phone}}</span>
          </div>
        </div>
        <div class="address-opt">
          <div class="opt-left needsclick" @click.stop="setDefault(item)">
            <input class="needsclick" v-model="item.isDefault" type="checkbox" :id="index"/>
            <label class="check needsclick" :for="index"></label>
            <label class="css-color needsclick" :for="index">默认地址</label>
          </div>
          <div class="opt-right">
            <span class="text" @click.stop="goToAddAddress(index)">
              <span class="edit">编辑</span>
            </span>
            <span class="text"  @click.stop="deleteAddress(item.receiverId,index)">
              <span class="delete">删除</span>
            </span>
          </div>
        </div>
        <div class="split"></div>
      </div>
    <!--地址结束-->
    <!--末尾-->
    </div>
    <!--无地址显示图片-->
    <div  class="address_pic" v-else>
      <img  src="../../../images/mine/address_pic.png" alt="" v-if="isLoaded">
    </div>
    <!--添加地址开始-->
    <div class="addAddress" @click="goToAddAddress(-1)">
      添加地址
    </div>
    <!--添加地址结束-->
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  import { tokenMethods } from '../../../vuex/util';
  export default {
    name: 'address',
    data(){
      return{
        addressData:'',
        isLoaded:false,
      }
    },
    created: function () {
      this.mBack('toBack');
      if( sessionStorage.getItem('fromAddressMine') === true)
      {
        sessionStorage.setItem('backJudgeAddress','');
        console.log(123445)
      }
      this.getMyAddress();
    },
    methods:{
      deleteAddress(receiverId,index){
        MessageBox.confirm('确定删除此地址吗?').then(action => {
          var obj = {
            receiverId: receiverId,
          };
          this.$store.dispatch('DEL_ADDRESS', obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              Toast('成功删除地址!');
              this.addressData.splice(index,1);
              if (index == sessionStorage.getItem('selectAddress')) {
                sessionStorage.removeItem('selectAddress')
              }
            }
          })
        }).catch(err => {
        })
      },
      getMyAddress: function() {
        var that = this;
        var obj = {
          token: tokenMethods.getWapToken(),
        };
        that.$store.dispatch('GET_ADDRESS', obj).then((res) => {
          if (res.callStatus === 'SUCCEED') {
            this.addressData = res.data;
            this.isLoaded = true
          } else {
          }
        })
      },
      //编辑true  添加地址false
      goToAddAddress(item){
        this.$store.state.index.address = item;
        this.$router.push({path:'/addAddress', query: {editJudge: item}})
      },
      toBack(){
        //sessionStorage.getItem('backJudgeAddress')
        // if(sessionStorage.getItem('backJudgeAddress') === "confirmAddress")
        // {
        //   this.$router.push({path:'/confirmAddress'})
        // }else 
        if (sessionStorage.getItem('backJudgeAddress') === "fromAddressSuborder") {
          this.$router.push({path: '/suborder', query: {backJudge: 'address'}})
        } else {
          this.$router.push({path:'/yayi/mine'})
        }
      },
      setDefault(value) {
        this.addressData = this.addressData.map((item) => {
          if (value.receiverId == item.receiverId) {
            item.isDefault = !item.isDefault
          } else {
            item.isDefault = false
          }
          return item
        })
        var that = this;
        var obj = {
            token: tokenMethods.getWapToken(),
            receiverId: value.receiverId,
            province: value.province,
            city: value.city,
            county: value.county,
            receiverName: value.receiverName,
            receiverDetail: value.receiverDetail,
            phone: value.phone,
            isDefault: value.isDefault,
          }
        // var obj = Object.assign(value, {token: tokenMethods.getWapToken()})
        that.$store.dispatch('EDIT_ADDRESS', obj).then((res) => {
          console.log(res);
          if (res.data.callStatus === 'SUCCEED') {
            // Toast('成功保存地址!');
            // that.getMyAddress()
            return
          }
          Toast('设置默认地址失败！!');
        })
      },
      selectAddress(index) {
         if (sessionStorage.getItem('backJudgeAddress') === "fromAddressSuborder") {
          this.toGoAddressSelect(index);
        }
        return
      },
      toGoAddressSelect(index){
        // this.$store.dispatch('ADDRESS_SELECT', index);
        sessionStorage.setItem('selectAddress',index)
        this.$router.push({path:'/suborder'});
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .top_top{
    position: fixed;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    left: 0;
    top: px2vw(88);
    background-color: #f4f4f4;
    height: 86.5vh;
    width: 100%;
  }
  .header{
    position: absolute;
    top: px2vw(7);
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 80vw;
    height: px2vw(88);
    line-height: 9.73333vw;
    display: inline-block;
    text-align: center;
    font-size: 4.26667vw;
    color: white;
  }
  .header_img_box{
    width: px2vw(100);
    height: px2vw(88);
    position: absolute;
    left: px2vw(20);
    line-height:px2vw(98) ;
  }
  .header_img {
    width: 2.4vw;
    height: 3.86667vw;
  }
  .header_top {
    background-color: $themeColor;
    height: px2vw(88);
    border-bottom: px2vw(1) solid $borderColor;
  }
  .address-box{
    position: relative;
    height: px2vw(272);
    background: #fff;
    .address-info{
      position: relative;
      padding-bottom: px2vw(39);
      border-bottom: 1px solid $borderColor;
    }
    .title{
      margin: px2vw(30) 0 0 px2vw(25);
      height: px2vw(30);
      line-height: px2vw(30);
      font-size: px2vw(32);
      color: rgb(51, 51, 51);
    }
    .toAddress{
      margin: px2vw(30) 0 0 px2vw(24);
      height: px2vw(25);
      line-height: px2vw(25);
      font-size: px2vw(26);
      color: rgb(102, 102, 102)
    }
    .info-right{
      position: absolute;
      top: px2vw(32);
      right: px2vw(25);
      height: px2vw(23);
      line-height: px2vw(23);
      font-size: px2vw(30);
      color: rgb(102, 102, 102)
    }
    input{
      display: none;
    }
  }
  .css-color {
    margin-left: px2vw(10);
    display: inline-block;
    height: px2vw(24);
    line-height: px2vw(24);
    font-size: px2vw(26);
    color: rgb(102, 102, 102);
  }
  .check{
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin-top: px2vw(-8);
    border-radius: 50%;
    border: px2vw(1) solid $themeColor;
    width: px2vw(31);
    height: px2vw(31);
    background-color: white;
  }
  input:checked+.check{
    background-color: $themeColor !important;
  }
  .check:after{
    content: '';
    display: block;
    position: absolute;
    top:px2vw(8);
    left: px2vw(2);
    width: px2vw(25);
    height: px2vw(8);
    background: transparent;
    border: px2vw(2) solid white;
    border-top: none;
    border-right: none;
    -webkit-transform: rotate(-48deg);
    -moz-transform: rotate(-48deg);
    -o-transform: rotate(-48deg);
    -ms-transform: rotate(-48deg);
    transform: rotate(-48deg);
  }
  .address-opt{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: px2vw(96);
    padding: 0 px2vw(25) 0 px2vw(28);
  }
  .opt-right{
    font-size: 0;
    .text{
      display: inline-block;
      height: px2vw(25);
      line-height: px2vw(25);
      font-size: px2vw(26);
      color: rgb(102, 102, 102);
      .edit{
        margin-right: px2vw(14);
        border-right: 1px solid $borderColor;
        padding-right: px2vw(14);
      }
    }
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .split{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: px2vw(20);
    background: #f4f4f4;
  }
  .addAddress {
    position: fixed;
    bottom: 0;
    // padding: px2vw(28) 0;
    height: px2vw(90);
    line-height: px2vw(90);
    text-align: center;
    width: 100vw;
    background-color: $themeColor;
    color: white;
    font-size: px2vw(30);
  }
  .address_pic{
    /*width: px2vw(196);*/
    /*!*height: px2vw(145);*!*/
    /*position: fixed;*/
    /*top:px2vw(513);*/
    /*left: px2vw(277);*/

    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #f4f4f4;
  }
  .address_pic>img{
    width: px2vw(192);
    height: px2vw(195);
    position: absolute;
    top:50%;
    left: 50%;
    transform:translate(-40%,-70%);
    -ms-transform:translate(-50%,-70%); 	/* IE 9 */
    -moz-transform:translate(-50%,-70%); 	/* Firefox */
    -webkit-transform:translate(-50%,-70%); /* Safari 和 Chrome */
    -o-transform:translate(-50%,-70%); 	/* Opera */
  }
  .box_top {
    z-index: 100;
    position: fixed;
    top:0;
    left: 0;
    width: 100vw;
  }
</style>

