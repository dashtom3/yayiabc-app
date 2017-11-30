<template>
  <div class="top_wrap">
    <div class="header_top">
      <div @click="toBack" class="img_box_img">
        <img class="header_img"  src="../../../images/logIn/back.png" alt="">
      </div>
      <div class="header">
        {{title}}
      </div>
      <span class="save" @click="saveData">
          保存
      </span>
    </div>

    <!--地址栏开始-->
    <div class="addressR">
      <input v-model="addressData.receiverName" type="text" placeholder="收货人">
    </div>
    <div class="addressR">
      <input v-model="addressData.phone" type="text" placeholder="联系电话">
    </div>
    <div @click="openPicker('cityAddressPicker')" class="addressR">
      <input class="city" v-model="addressR" type="text" placeholder="所在地区" disabled="false">
      <img class="addressR_img" src="../../../images/mine/back.png" alt="">
    </div>
    <div class="addressR">
      <input v-model="addressData.receiverDetail" type="text" placeholder="详细地址">
    </div>

      <div class="fontAddress buttonDefaultBox needclick" @click="changeColor">
        <!--<div  class="checkBox" :class="{'checkBoxColor': addressData.isDefault == false}">-->
          <!--<div class="checkBox2"></div>-->
        <!--</div>-->
        <input class="needclick" v-model="addressData.isDefault" type="checkbox" id="selected"/>
        <label class="label_a" for="selected"></label>
        <span class="cssColor">设为默认地址</span>
      </div>
    <!--地址栏结束-->
    <!--城市选择框-->
    <address-picker ref="cityAddressPicker" @addresschange="saveAddress"></address-picker>
    <!--末尾-->
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import {MessageBox} from 'mint-ui';
  import {tokenMethods} from '../../../vuex/util';
  import addressPicker from '../../wx_user/addressPicker.vue'
  import {Picker} from 'mint-ui';

  export default {
    name: 'addAddress',
    data() {
      return {
        emptys: '',//判断是添加 或者 修改
        title: '',
        addressData: {
          receiverName : '',
          phone : '',
          city : '',
          county : '',
          receiverDetail : '',
          isDefault : false
        },
        addressR: '',
        isToGoAddress: ''
      }
    },
    created: function () {
      this.mBack('toBack');
      if (this.$route.query.editJudge == -1) {
        this.emptys = true;
        this.title = "添加地址";
        this.addressData.receiverName = '';
        this.addressData.phone = '';
        this.addressData.city = '';
        this.addressData.county = '';
        this.addressData.receiverDetail = '';
        this.addressData.isDefault = false;
        this.isToGoAddress = true
      }
      else if(this.$route.query.editJudge == -2)
      {
        if (!tokenMethods.getWapUser()) return
        var obj = {
          phone: tokenMethods.getWapUser().phone,
          token: tokenMethods.getWapToken()
        }
        this.emptys = true;
        this.title = "添加地址";
        this.$store.dispatch('GET_PERSON_LIST', obj).then((res) => {
          console.log(res)
          if (res.callStatus === 'SUCCEED') {
            let strAddress = ''
            strAddress = res.data.part.split('/')
            this.addressData.receiverName = res.data.trueName
            this.addressData.phone = res.data.phone
            this.addressData.province = strAddress[0]
            this.addressData.city = strAddress[1]
            this.addressData.county = strAddress[2]
            this.addressR = strAddress.join('')
            this.addressData.receiverDetail = res.data.workAddress
            this.addressData.isDefault = false
            this.isToGoAddress = false
            // this.emptys = true;
            // this.title = "添加地址";
            // this.addressData.receiverName = '';
            // this.addressData.phone = '';
            // this.addressData.city = '';
            // this.addressData.county = '';
            // this.addressData.receiverDetail = '';
            // this.addressData.isDefault = false;
            // this.isToGoAddress = false
          }
        })
      }
      else if(this.$route.query.editJudge >= 0){
        this.emptys = false;
        this.title = "编辑地址";
        this.getMyAddress();
      }
    },
    methods: {
      getMyAddress: function() {
        var that = this;
        var obj = {
          token: tokenMethods.getWapToken(),
        };
        that.$store.dispatch('GET_ADDRESS', obj).then((res) => {
          if (res.callStatus === 'SUCCEED') {
            this.addressData = res.data[this.$route.query.editJudge];
            this.addressR = this.addressData.city + this.addressData.county;
          }
        })
      },
      //判断有无空格 以及空字符串
      hasSpace(obj){
        if ( obj == "" ){
          return true;
        }
        let regu = "^[ ]+$";
        let re = new RegExp(regu);
        return re.test(obj);
      },
      saveData() {
        if (this.emptys == false) {
          let that = this;
          var obj = {
            token: tokenMethods.getWapToken(),
            receiverId: that.addressData.receiverId,
            province: that.addressData.province,
            city: that.addressData.city,
            county: that.addressData.county,
            receiverName: that.addressData.receiverName,
            receiverDetail: that.addressData.receiverDetail,
            phone: that.addressData.phone,
            isDefault: that.addressData.isDefault,
          }
          for(let item in obj)
          {
            if(item == 'isDefault')
            {
              continue;
            }
            if(this.hasSpace(obj[item]))
            {
              console.log(obj[item]);
              Toast({message: '请添加收货地址', duration: 1500})
              return;
            }
            if(that.addressData.receiverName.length > 30)
            {
              console.log(that.addressData.receiverName.length);
              Toast({message: '姓名太长了，请控制在30字内', duration: 1500});
              return;
            }
          }
          MessageBox.confirm('确定保存此地址吗?').then(action => {
            that.$store.dispatch('EDIT_ADDRESS', obj).then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                Toast('成功保存地址!');
                this.$router.push({path:'/address'})
              }
              })
              }).catch(err => {
              })
        }
        //保存地址信息
        else {
          var that = this;
          var obj = {
            token: tokenMethods.getWapToken(),
            province: that.addressData.province,
            city: that.addressData.city,
            county: that.addressData.county,
            receiverName: that.addressData.receiverName,
            receiverDetail: that.addressData.receiverDetail,
            phone: that.addressData.phone,
            isDefault: that.addressData.isDefault,
          }
          for(let item in obj)
          {
            if(item == 'isDefault')
            {
              continue;
            }
            if(this.hasSpace(obj[item]))
            {
              Toast({message: '请添加收货地址', duration: 1500})
              return;
            }
            if(that.addressData.receiverName.length > 30)
            {
              console.log(that.addressData.receiverName.length);
              Toast({message: '姓名太长了，请控制在30字内', duration: 1500});
              return;
            }
          }
          MessageBox.confirm('确定保存此地址吗?').then(action => {
            console.log(121);
            that.$store.dispatch('SAVE_ADDRESS', obj).then((res) => {
              console.log(res);
              if (res.data.callStatus === 'SUCCEED') {
                Toast('成功保存地址!');
                if(this.isToGoAddress)
                {
                  this.$router.push({path:'/address'})
                }else {
                  this.$router.push({path:'/suborder'})
                }
              }
            })
          }).catch(err => {
          })
        }
      },
      saveAddress(e) {
        let addr = e.split(' ')
        this.addressR = addr[0] + addr[1] + addr[2];
        this.addressData.province = addr[0];
        this.addressData.city = addr[1];
        this.addressData.county = addr[2];
      },
      openPicker(name) {
        this.$refs[name].open()
      },
      changeColor(){
        this.addressData.isDefault = !this.addressData.isDefault
      },
      toBack (){
        if(this.$route.query.editJudge == -1)
        {
          this.$router.push({path: '/address'});
        }else if(this.$route.query.editJudge == -2)
        {
          this.$router.push({path: '/suborder'});
        }else if(this.$route.query.editJudge >= 0)
        {
          this.$router.push({path: '/address'});
        }
//        this.$router.go(-1)
      }
    },
    components: {
      addressPicker
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  #selected{
    display: none;
  }
  .header {
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
    font-size: 4.26667vw;
    color: white;
  }

  .img_box_img{
    width: px2vw(100);
    height: px2vw(88);
  }
  .header_img {
    width: 2.4vw;
    height: 3.86667vw;
    margin-left: 2vw;
    margin-top: px2vw(27);
    float: left;
  }

  .header_top {
    width: 100vw;
    background-color: $themeColor;
    height: px2vw(88);
    border-bottom: px2vw(1) solid $borderColor;
  }

  input:disabled{
    color:#333;
    opacity: 1;
    -webkit-text-fill-color: #333;
  }
  .save {
    color: white;
    font-size: 3.76666vw;
    position: absolute;
    right: 2.933333vw;
    top:px2vw(14);
    padding: px2vw(10) 0 0 px2vw(10);
  }

  .addressR {
    font-size: 3.733333vw;
    padding: px2vw(30) 2.6666667vw;
    border-bottom: px2vw(1) solid $borderColor;
  }
  .addressR input {
    border: none;
    padding: 0;
    outline: medium;
    width: 80vw;
    margin-bottom: 0;
  }

  .addressR_img {
    margin-top: px2vw(8);
    margin-right: 1vw;
    float: right;
    width: 2vw;
    height: px2vw(25);
  }

  .city[disabled] {
    background: white;
    color: black;
  }



  .fontAddress {
    display: inline-block;
    padding-top: px2vw(20);
    color: $themeColor;
    font-size: 3.7333333vw;
    padding-bottom: px2vw(20);
  }
  .label_a{
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
  #selected:checked+.label_a{
    background-color: $themeColor !important;
  }
  .label_a:after{
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
  .checkBox {
    display: inline-block;
    vertical-align: middle;
    position: absolute;
    top:px2vw(15);
    width: px2vw(31);
    height: px2vw(31);
    background-color: $themeColor;
    border-radius: 50%;
    border: px2vw(1) solid $themeColor;
  }
  .checkBox2{
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
  .checkBoxColor{
    display: inline-block;
    background-color: white !important;
  }

  .buttonDefaultBox {
    padding-bottom: px2vw(20);
    padding-left: px2vw(16);
  }

  .top_wrap {
    width: 100vw;
  }

  .cssColor {
    margin-left: px2vw(10);
    display: inline-block;
  }
</style>

