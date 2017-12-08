<template>
  <div class="dutam-wrapper">
    <div class="box-top">
      <div class="header-top">
        <div @click="toBack" class="header-img-box">
          <img class="header-img" src="../../../images/logIn/back.png" alt="">
        </div>
        <div class="header">
          <span v-for="(item, index) in classify" :key="index" @click="changeIndex(index)" :class="{'change-class': index === classIndex}">{{ item }}</span>
        </div>
        <div class="person-img-box">
          <img src="../../../images/salesWap/customer/preson-favor.png" alt="img">
        </div>
      </div>
      <div class="search-wrapper">
        <div class="address-wrapper" @click="openPicker">
          <span v-text="address"></span>
          <img src="../../../images/salesWap/customer/down.png" alt="下拉">
        </div>
        <div class="search-box">
          <span @click="searchInfo">
            <img src="../../../images/salesWap/customer/search-c.png" alt="搜索">
          </span>
          <input v-model="keyWords" type="text" placeholder="请输入关键字">
          <span v-show="closeShow" class="close-wrapper" @click="closeKeyWord">
            <img class="close" src="../../../images/saleman/close.png" alt="关闭">
          </span>
        </div>
        <div class="map-wrapper" v-show="mapIconShow">
          <img src="../../../images/salesWap/customer/map.png" alt="地图">
          <span>地图</span>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
    <!--城市选择框-->
    <address-pickers ref="cityAddressPickers" @addresschange="saveAddress"></address-pickers>
  </div>
</template>

<script>
import addressPickers from '../../wx_user/addressPickers.vue'
export default {
  name: "enterpriseRecord",
  components: {
    addressPickers
  },
  data () {
    return {
      classIndex: 0,
      classify: ['门诊', '牙医'],
      address: '上海市',
      mapIconShow: true,
      keyWords: '',
      closeShow: false,
    };
  },
  created () {
    
  },
  methods: {
    toBack(){
      this.$router.go(-1);
    },
    openPicker() {
      this.$refs.cityAddressPickers.open()
    },
    saveAddress(e) {
      this.address = e.split(' ').join('/')
    },
    changeIndex(index) {
      this.classIndex = index;
      if (index === 0) {
        this.mapIconShow = true
        this.$router.push({path:'/enterpriseList'});
      } else {
        this.mapIconShow = false
        this.$router.push({path:'/salesYayi'});
      }
    },
    searchInfo() {
      this.$router.push({path:'/enterpriseList', query: {'keyWord': this.keyWords}});
    },
    closeKeyWord() {
      this.keyWords = '';
    }
  },
  watch: {
    keyWords: {
      handler: function (val) {
        if (val == '') {
          this.closeShow = false
        } else {
          this.closeShow = true
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../common/sass/factory";
.box-top {
  z-index: 100;
  position: fixed;
  top:0;
  left: 0;
  width: 100vw;
  height: px2vw(180);
}
.header-top {
  position: relative;
  background-color: $themeColor;
  height: px2vw(88);
  border-bottom: px2vw(1) solid $borderColor;
}
.header-img-box{
  width: px2vw(100);
  height: px2vw(88);
  position: absolute;
  left: px2vw(20);
  line-height:px2vw(98) ;
}
.header-img {
  width: 2.4vw;
  height: 3.86667vw;
}
.header{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 80vw;
  height: px2vw(88);
  line-height: 9.73333vw;
  display: inline-block;
  text-align: center;
  font-size: px2vw(36);
  color: #ccc;
}
.header span{
  display: inline-block;
  padding: px2vw(4) 0 0 0;
  height: px2vw(88);
  line-height: px2vw(88);
  width: px2vw(100);
  text-align: center;
}
.header span:nth-child(n+2){
  margin-left: px2vw(30);
}
.change-class{
    border-bottom: 2px solid #fff;
    color: #fff;
  }
.person-img-box{
  position: absolute;
  width: px2vw(88);
  height: px2vw(88);
  top: 0;
  right: 0;
  padding-left: px2vw(20);
  padding-right: px2vw(20);
  img{
    position: absolute;
    top: px2vw(26);
    right: px2vw(21);
    width: px2vw(40);
    height: px2vw(32);
  }
}
.search-wrapper{
  position: relative;
  display: flex;
  top: 0;
  width: 100vw;
  height: px2vw(90);
  font-size: 0;
  background-color: rgb(244,244,244);
  z-index: 10;
  img{
    display: inline-block;
    vertical-align: top;
  }
  .address-wrapper{
    width: px2vw(195);
    padding: 0 0 0 px2vw(19);
    img{
      margin: px2vw(39) 0 0 px2vw(21);
      width: px2vw(22);
      height: px2vw(12);
    }
  }
  .search-box{
    position: relative;
    margin: px2vw(18) 0;
    width: px2vw(450);
    height: px2vw(60);
    border-radius: px2vw(30);
    background: #fff;
    overflow: hidden;
    span{
      display: inline-block;
      width: px2vw(60);
      height: px2vw(60);
      overflow: hidden;
    }
    img{
      margin: px2vw(13) 0 0 0;
      width: px2vw(34);
      height: px2vw(34);
    }
    input{
      position: absolute;
      top: 0;
      right: 0;
      padding: 0 0 0 px2vw(8);
      margin: px2vw(16) 0 0 0;
      width: px2vw(390);
      height: px2vw(30);
      line-height: px2vw(30);
      font-size: px2vw(26);
      outline: none;
      border: none;
    }
    .close-wrapper{
      position: absolute;
      top: px2vw(2);
      right: px2vw(20)
    }
  }
  .map-wrapper{
    position: relative;
    padding: px2vw(22) 0 0 px2vw(6);
    width: px2vw(105);
    img{
      position: absolute;
      top: px2vw(12);
      right: px2vw(27);
      width: px2vw(34);
      height: px2vw(34);
    }
    span{
      display: inline-block;
    }
  }
  span{
    flex: 1;
    width: px2vw(106);
    height: px2vw(90);
    font-size: px2vw(30);
    line-height: px2vw(90);
    text-align: center;
    color: #3676b6;
  }
}
.content-wrapper{
  margin-top: px2vw(180);
}
.split{
  width: 100%;
  height: px2vw(1);
  background: #f4f4f4;
}
</style>