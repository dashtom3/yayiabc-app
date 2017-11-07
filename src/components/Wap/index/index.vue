<template>
  <div class="index">
    <div class="search_box">
<!--       <img class="book_menu" src="../../../images/index/book.png" @click="book_up" alt="img"> -->
      <input class="search_word" type="text" @focus="searchActive" @keyup.enter="search_cargo" v-model="searchCargo" autocomplete="on" placeholder="请输入关键字">
      <img class="search_img" src="../../../images/index/search.png" alt="img">
    </div>
    <!--  左侧按钮弹出 开始 -->
<!--     <mt-popup v-model="popupVisible" position="left">
      <div class="book_up_box">
        <div class="classify_item" v-for="item in $store.state.index.classifyList" @click="goToList(item)">{{item.oneClassify}}</div>
      </div>
    </mt-popup> -->
    <!--  左侧按钮弹出 结束 -->
    <Carousel></Carousel>
    <mainEnter></mainEnter>
    <classifyBox></classifyBox>
<!--     <Brand></Brand>
    <Classify></Classify> -->
    <div class="dialog_wrapper" v-show="isShow">
      <div class="dialog">
        <div class="dialog_body">
          <h2 class="title">发现新版本</h2>
          <span class="text">快快升级，体验我们的新版本！</span>
        </div>
        <div class="dialog_footer">
          <span class="dialog_bottom">
            <button type="button" class="btn button_default" @click="hide"><span>关闭</span></button>
            <button type="button" class="btn button_primary" @click="downWgt"><span>立即更新</span></button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from './carousel'
import mainEnter from './mainEnter'
import classifyBox from './classifyBox'
import Brand from './brand'
import Classify from './classify'
import * as api from '../../../vuex/modules/api';
export default {
  name: 'index',
  data () {
    return {
      popupVisible: false,
      searchCargo: '',
      isShow: false,
      device: '',
      wgtVer: null,
      newVer: null,
      dd: []
    }
  },
  components: {
    Carousel,
    mainEnter,
    classifyBox,
    Brand,
    Classify
  },
  created: function() {
    var that = this;
    if (sessionStorage.getItem('isShow')=== null) {
      if (window.plus) {
        that.plusReady();
      } else {
        document.addEventListener('plusready',that.plusReady,false);
  //      document.addEventListener('plusready',that.checkUpdate,false);
      }
    }
    mui.back = function () {
      mui.confirm('确定要退出应用吗？', '牙医abc', ["确定", "取消"], function (e) {
        if (e.index === 0) {
          plus.runtime.quit();
        }
      });
      return false;
    };

    that.$store.dispatch('GET_CLASSIFY_QUERY')
    that.$emit('listenToChildEvent','index')
  },
  methods: {
    //左侧弹出框
    book_up: function() {
      var that = this
      that.popupVisible = true
    },
    //搜索框
    search_cargo: function() {
      var that = this
    },
    //去商品列表页
    goToList: function(item) {
      var that = this
      that.$router.push({ name: 'productsList', params: { oneClassify: item.oneClassify, twoClassify: '', threeClassify: ''}})
    },
    searchActive: function() {
      var that = this
      that.$router.push({ path: '/searchWord', query: { data: 'focus' }})
    },
    hide: function() {
      // this.isShow = false;
      plus.runtime.quit();
      // sessionStorage.setItem('isShow', 'hide')
    },
    plusReady: function(){
      // 获取本地应用资源版本号
      var that = this
      plus.runtime.getProperty(plus.runtime.appid,function(inf){
        that.wgtVer=inf.version;
        that.checkUpdate();
      });
    },
    checkUpdate: function() {
      var that = this;
      plus.nativeUI.showWaiting();
      mui.get(this.$store.state.index.baseUrl +  "/appVer/Ver", function (data) {
        plus.nativeUI.closeWaiting();
        that.newVer = data.data[0].versionNumber;
        console.log(JSON.stringify(that.wgtVer))
        console.log(JSON.stringify(that.newVer))
        if(that.wgtVer && that.newVer && (that.wgtVer != that.newVer)){
          console.log(JSON.stringify('true'))
          that.isShow = true;
        }else{
          console.log(JSON.stringify('false'))
          that.isShow = false;
        }
      })
    },
    downWgt: function(){
      this.isShow = false;
      var that = this;
      var wgtUrl = "http://www.yayiabc.com:7758/H53C638B9.wgt";
      plus.nativeUI.showWaiting();
      plus.downloader.createDownload(wgtUrl, {filename:"_doc/update/"}, function(d,status){
        if (status == 200){
          console.log(JSON.stringify(d));
          that.installWgt(d.filename); // 安装wgt包
        } else {
          plus.nativeUI.alert("下载wgt失败！");
        }
        plus.nativeUI.closeWaiting();
      }).start();
    },
    installWgt: function(path){
      plus.nativeUI.showWaiting("安装wgt文件...");
      // force:false进行版本号校验，如果将要安装应用的版本号不高于现有应用的版本号则终止安装，并返回安装失败
      plus.runtime.install(path,{force:false},function(){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件成功！");
        plus.nativeUI.alert("应用资源更新完成！",function(){
          plus.runtime.restart();
        });
      },function(e){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
        plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);
      });
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
@import "../../../common/sass/factory";
.index {
  width: 100vw;
}
.book_menu {
  position: absolute;
  top: 4.3vw;
  left: 2vw;
  width: 5.4vw;
  height: 3.2vw;
}
.top_word {
  font-size: 4.615vw;
  text-align: center;
}
.book_up_box {
  width: 70vw;
  height: 100vh;
  background-color: #fff;
  z-index: 999;
}
.classify_item {
  text-align: center;
  width: 100%;
  height: 13.866vw;
  line-height: 13.866vw;
  border-bottom: 1px solid #e9e9e9;
}
.search_box {
  width: 100vw;
  height: px2vw(88);
  position: relative;
  background-color: $themeColor;
}
.search_word {
  width: px2vw(710);
  height: px2vw(64);
  line-height: px2vw(64);
  margin: 0 auto;
  border: 1px solid #e9e9e9;
  border-radius: px2vw(28);
  background-color: #fff;
  outline: medium;
  padding-left: 10vw;
  margin-left: px2vw(20);
  margin-top: px2vw(13);
}
.search_img {
  width: 4.75vw;
  height: 4.75vw;
  position: absolute;
  top: 3.5vw;
  left: 6vw;
}
.dialog_wrapper{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  overflow: auto;
  z-index: 2001;
  background: rgba(0,0,0,.3);
  font-family: "SourceHanSansCN-Regular"
}
.dialog{
  position: absolute;
  top: 50%;
  left: 50%;
  width: px2vw(500);
  height: px2vw(278);
  margin: 0 auto;
  padding-top: px2vw(50);
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,.3);
  box-sizing: border-box;
}
.dialog_body .title{
  margin-bottom: px2vw(27);
  text-align: center;
  line-height: px2vw(36);
  font-size: px2vw(36);
  color: rgb(51, 51, 51);
  font-weight: normal;
}
.dialog_body .text{
  position: relative;
  display: block;
  text-align: center;
  line-height: px2vw(30);
  font-size: px2vw(30);
  padding-bottom: px2vw(44);
  color: #666666;
}
.text::after {
  content:"";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  transform-origin: 0 0;
  background: rgb(204, 204, 204);
}
@media only screen and (-webkit-min-device-pixel-ratio: 2.0), only screen and (min-resolution: 2dppx) {
  .text::after{
    transform: scaleY(0.5);
  }
}
.btn{
  display: inline-block;
  line-height: 1;
  box-sizing: border-box;
  width: 49%;
  height: px2vw(90);
  line-height: px2vw(90);
  vertical-align: top;
  background: #fff;
  font-size: px2vw(32)
}
.dialog_bottom .btn:nth-child(1){
  border-bottom-left-radius: 5px;
}
.button_primary{
  border-bottom-right-radius: 5px;
  border-left: 1px solid rgb(204, 204, 204);
  color: rgb(54, 118, 182)
}
</style>

