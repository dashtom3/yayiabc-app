<template>
  <div>
    <div class="index-wrapper">
      <div class="search-box">
        <input class="search-word" type="text" @focus="searchActive" v-model="searchCargo" autocomplete="on" placeholder="请输入关键字">
        <img class="search-img" src="../../../images/index/search.png" alt="img">
        <a href="./static/barcode.html" class="scan-wrapper" ref="scan" id="scan">
          <img class="search-qr" src="../../../images/index/qrCode.png" alt="扫码">
        </a>
      </div>
      <div class="index">
        <carousel></carousel>
        <div class="tip-wrapper">
          <span class="tip-text"><img src="../../../images/index/info.png" alt="消息"><span>【牙医abc快报】</span></span>
          <div class="contanier" ref="contanier">
            <ul
              class="info-wrapper"
              ref="wrapper"
              :class="{anim:animate==true}">
              <li class="info-item" v-for="(item, index) in list" :key="index">
                <span class="tip-phone">{{ item.phone.substring(0,3)}}****{{item.phone.substring(7,11)}}</span>
                <span class="tip-info">提现了{{ item.withMoney }}元</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="banner-wrapper">
          <div class="banner-left" @click.stop="goToPage('/inviteRegister')">
            <img src="../../../images/index/img1.png" alt="牙医注册">
          </div>
          <div class="banner-right" @click.stop="goToPage('/inviteSaleRegister')">
            <img src="../../../images/index/img2.png" alt="牙医销售">
          </div>
        </div>
        <div class="main-wrapper">
          <div class="main-item" @click="goToPage('/caseOfIllness')">
            <span class="item-img"><img class="item-icon" src="../../../images/index/case.png" alt="病例"></span>
            <span class="item-name">病例</span>
          </div>
          <div class="main-item" @click="goToPage('/video')">
            <span class="item-img"><img class="item-icon" src="../../../images/index/video.png" alt="视频"></span>
            <span class="item-name">视频</span>
          </div>
          <div class="main-item" @click="back">
            <span class="item-img"><img class="item-icon" src="../../../images/index/shop.png" alt="商城"></span>
            <span class="item-name">商城</span>
          </div>
          <div class="main-item" @click="goToPage('/QandAList')">
            <span class="item-img"><img class="item-icon" src="../../../images/index/faq.png" alt="问答"></span>
            <span class="item-name">问答</span>
          </div>
          <div class="main-item" @click="goToPage('/database')">
            <span class="item-img"><img class="item-icon" src="../../../images/index/database.png" alt="资料库"></span>
            <span class="item-name">资料库</span>
          </div>
          <div class="main-item" @click="goToPage('/enterpriseRecord')">
            <span class="item-img"><img class="item-icon" src="../../../images/index/page.png" alt="企业录"></span>
            <span class="item-name">企业录</span>
          </div>
          <div class="main-item" @click="goToPage('/register')">
            <span class="item-img"><img class="item-icon" src="../../../images/index/register.png" alt="注册"></span>
            <span class="item-name">注册</span>
          </div>
          <div class="main-item" @click="goToPage('/salesIndex')">
            <span class="item-img"><img class="item-icon" src="../../../images/index/ckSale.png" alt="客服代表"></span>
            <span class="item-name">客服代表</span>
          </div>
        </div>
        <div class="split"></div>
        <div class="hot-wrapper">
          <div class="hot-header">
            <span class="hot-item" v-for="(hot, index) in hotClass" :key="index" :class="{'active': index === activeIndex}" @click.stop="refreshTo(index)">{{ hot }}</span>
          </div>
          <div class="hot-container" @scroll.stop.prevent>
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog_wrapper reg" v-show="isShow2">
      <div class="dialog">
        <div class="dialog_body">
          <h2 class="title">注册成功</h2>
          <span class="info">现在完善资质信息，赠您60 乾币！</span>
          <span class="text-info"><br/>(首单满120元，可直接抵扣 60 元！)</span>
        </div>
        <div class="dialog_footer">
          <span class="dialog_bottom">
            <button @click="goToPage('/account')" type="button" class="btn-half button_primary"><span>立即认证</span></button>
            <button @click="isShow2 = false" type="button" class="btn-half"><span>下次再说</span></button>
          </span>
        </div>
      </div>
    </div>
    <div class="dialog_wrapper" v-show="isShow">
      <div class="dialog">
        <div class="dialog_body">
          <h2 class="title">发现新版本</h2>
          <span class="text">快快升级，体验我们的新版本！</span>
        </div>
        <div class="dialog_footer">
          <span class="dialog_bottom">
            <button type="button" class="btn button_primary" @click="downWgt"><span>立即更新</span></button>
          </span>
        </div>
      </div>
    </div>
    <div class="dialog_wrapper" v-show="progressShow">
      <div class="progress-wrapper">
        <mt-progress :value="progress">
          <div slot="end">{{ progress }}%</div>
        </mt-progress>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from "./carousel";
import { tokenMethods } from "@vuex/util";
import { Progress } from 'mint-ui'
export default {
  name: "index",
  components: {
    Carousel
  },
  data() {
    return {
      searchCargo: "",
      hotClass: ["热门病例", "热门视频", "热门问答"],
      activeIndex: 0,
      isShow: false,
      isShow2: false,
      wgtVer: null,
      newVer: null,
      list: [],   //消息列表
      animate: false,
      intervalId: null,
      qrShow: false,
      progressShow: false,
      progress: 0,
      pIntervalId: null
    };
  },
  created() {
    var that = this;
    console.log(tokenMethods.getWapToken())
    // 检查更新的弹框是否显示
    if (sessionStorage.getItem("isShow") === null) {
      if (window.plus) {
        that.plusReady();
      } else {
        document.addEventListener("plusready", that.plusReady, false);
      }
    }
    // 判断是否注册成功是否显示
    if (this.$route.params.redPacket === true) {
      this.isShow2 = true;
    } else {
      this.isShow2 = false;
    }
    mui.back = function() {
      mui.confirm("确定要退出应用吗？", "牙医abc", ["确定", "取消"], function(
        e
      ) {
        if (e.index === 0) {
          plus.runtime.quit();
        }
      });
      return false;
    };
    //  that.$store.dispatch("GET_CLASSIFY_QUERY");
    that.$emit("listenToChildEvent", "index");
    that.getList();
    setInterval(that.getList, 3600000);
    that.intervalId = setInterval(that.scroll, 2000);
  },
  destroyed() {
    clearInterval(this.intervalId);
  },
  methods: {
    back(){
      this.$router.push({ name: 'productList', params: { oneClassify: '展会推荐' , twoClassify: ''}});
    },
    searchActive: function() {
      this.$router.push({ path: "/searchWord", query: { data: "focus" } });
    },
    //搜索框
    search_cargo: function() {
      var that = this;
    },
    refreshTo(index) {
      console.log("11111")
      this.activeIndex = index;
      if (index === 0) {
        this.$router.push({ path: "/main/caseOfIllness" });
      } else if (index === 1) {
        this.$router.push({ path: "/main/video" });
      } else {
        this.$router.push({ path: "/main/QandAList" });
      }
    },
    goToPage(url) {
      if (url == "/salesIndex") {
        // 判断是否登录
        if (!tokenMethods.getSalesToken()) {
          this.$router.push({
            path: "/salesLogin",
            query: { toPath: "/salesIndex" }
          });
          return;
        }
      }
      this.isShow2 = false;
      this.$router.push({ path: url, query: { backName: "yayi/index" } });
    },
    // 得到消息列表
    getList() {
      var self = this;
      this.$store.dispatch("GET_TIPS_LIST").then(res => {
          console.log(res)
          self.list = res;
      });
    },
    plusReady: function() {
      // 获取本地应用资源版本号
      var that = this;
      plus.runtime.getProperty(plus.runtime.appid, function(inf) {
        that.wgtVer = inf.version;
        that.checkUpdate();
      });
    },
    checkUpdate: function() {
      var that = this;
      plus.nativeUI.showWaiting();
      mui.get(this.$store.state.index.baseUrl + "/appVer/Ver", function(data) {
        plus.nativeUI.closeWaiting();
        that.newVer = data.data[0].versionNumber;
        if (that.wgtVer && that.newVer && that.wgtVer != that.newVer) {
          that.isShow = true;
        } else {
          that.isShow = false;
        }
      });
    },
    downWgt: function() {
      this.isShow = false;
      var that = this;
      // 更新包的地址
      var wgtUrl = "http://www.yayiabc.com:6949/H53C638B9.wgt";
      // plus.nativeUI.showWaiting("正在更新...");
      that.progressShow = true;
      that.pIntervalId = setInterval(() => {
        that.progress++
        if (that.progress >= 88) {
          that.progress = 88
        }
      },400)
      plus.downloader.createDownload(wgtUrl, { filename: "_doc/update/" }, function(d, status) {
        if (status == 200) {
          that.installWgt(d.filename); // 安装wgt包
        } else {
          plus.nativeUI.alert("更新失败！");
          that.progressShow = false;
        }
        plus.nativeUI.closeWaiting();
      })
      .start();
    },
    installWgt: function(path) {
      // plus.nativeUI.showWaiting("正在更新...");
      var that = this;
      that.progressShow = true;
      // force:false进行版本号校验，如果将要安装应用的版本号不高于现有应用的版本号则终止安装，并返回安装失败
      plus.runtime.install(path,{ force: false },function() {
          plus.nativeUI.closeWaiting();
          clearInterval(that.pIntervalId);
          that.progress = 100;
          setTimeout(() => {
            that.progressShow = false
          }, 200)
          plus.nativeUI.alert("应用资源更新完成！", function() {
            that.progressShow = true;
            plus.runtime.restart();
          });
        },
        function(e) {
          plus.nativeUI.closeWaiting();
          console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
          plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);
        }
      );
    },
    scroll() {
      this.animate = true;
      var that = this;
      setTimeout(function() {
        that.list.push(that.list[0]);
        that.list.shift();
        that.animate = false;
      }, 1000);
    },
    startRecognize() {
      console.log('运行了startRecognize()')
      setTimeout(() => {
        this.qrShow = true;
        console.log('运行了setTimeout()')
        scan = new plus.barcode.Barcode("bcid");
        scan.onmarked = onmarked;
        scan.onmarked();
        this.startScan();
      }, 200);
    },
    startScan() {
      console.log('运行了scan.start()')
      scan.start();
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../../../common/sass/factory";
.index {
  width: 100vw;
  // height: px2vw(1234);
  height: 100vh;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  margin-top: px2vw(88);
}
.search-box {
  width: 100vw;
  height: px2vw(88);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  background-color: $themeColor;
}
.search-word {
  width: px2vw(632);
  height: px2vw(64);
  line-height: px2vw(64);
  margin: 0 auto;
  border: px2vw(1) solid #e9e9e9;
  box-sizing: border-box;
  border-radius: px2vw(28);
  background-color: #fff;
  outline: medium;
  padding-left: 10vw;
  margin-left: px2vw(20);
  margin-top: px2vw(13);
}
.search-img {
  width: 4.75vw;
  height: 4.75vw;
  position: absolute;
  top: 3.5vw;
  left: 6vw;
}
.scan-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  width: px2vw(88);
  height: px2vw(88);
}
.search-qr {
  position: absolute;
  top: 3.2vw;
  right: px2vw(26);
  width: px2vw(40);
  height: px2vw(40);
}
.anim {
  transition: all 0.8s;
  margin-top: px2vw(-36);
}
.tip-wrapper {
  display: flex;
  align-items: center;
  padding: px2vw(30) 0;
  // height: px2vw(36);
  font-size: px2vw(24);
  color: rgb(51, 51, 51);
  .img-wrapper {
    display: inline-block;
    margin-left: px2vw(21);
    padding-top: px2vw(1);
    width: px2vw(30);
    height: px2vw(28);
    line-height: px2vw(28);
    font-size: 0;
  }
  img {
    width: px2vw(30);
    height: px2vw(27);
    vertical-align: top;
    margin-left: px2vw(21);
  }
  .contanier {
    display: inline-block;
    margin-top: px2vw(4);
    width: px2vw(400);
    height: px2vw(36);
    overflow: hidden;
    transition: all 0.5s;
  }
  .tip-text {
    display: inline-block;
    margin-top: px2vw(4);
    font-size: px2vw(28);
    line-height: px2vw(28);
    height: px2vw(28);
    color: rgb(255, 156, 0);
    span {
      display: inline-block;
    }
  }
  .tip-phone {
    line-height: px2vw(28);
    height: px2vw(28);
    margin-right: px2vw(10);
  }
}
.banner-wrapper {
  display: flex;
  height: px2vw(162);
  justify-content: space-between;
  align-items: center;
  background: #f4f4f4;
  padding: 0 px2vw(22);
  div {
    width: px2vw(340);
    height: px2vw(120);
    img {
      width: 100%;
    }
  }
}
.main-wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  height: px2vw(364);
  background: #fff;
  .main-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: px2vw(187.5);
    padding: 0 px2vw(36) 0;
    font-size: px2vw(28);
    color: rgb(51, 51, 51);
  }
  .item-img {
    display: flex;
    justify-content: center;
    font-size: 0;
    width: 100%;
  }
  .item-name {
    margin-top: px2vw(18);
  }
}
.main-wrapper .main-item:nth-child(1) .item-icon {
  width: px2vw(60);
  height: px2vw(60);
}
.main-wrapper .main-item:nth-child(2) .item-icon {
  width: px2vw(61);
  height: px2vw(66);
}
.main-wrapper .main-item:nth-child(3) .item-icon {
  width: px2vw(65);
  height: px2vw(60);
}
.main-wrapper .main-item:nth-child(4) .item-icon {
  width: px2vw(68);
  height: px2vw(60);
}
.main-wrapper .main-item:nth-child(5) .item-icon {
  width: px2vw(53);
  height: px2vw(61);
}
.main-wrapper .main-item:nth-child(6) .item-icon {
  width: px2vw(60);
  height: px2vw(66);
}
.main-wrapper .main-item:nth-child(7) .item-icon {
  width: px2vw(65);
  height: px2vw(65);
}
.main-wrapper .main-item:nth-child(8) .item-icon {
  width: px2vw(60);
  height: px2vw(70);
}
.split {
  height: px2vw(18);
  background: #f4f4f4;
}
.hot-wrapper {
  padding-bottom: px2vw(104);
  .hot-header {
    display: flex;
    height: px2vw(90);
    justify-content: space-around;
    align-items: center;
    font-size: pxvw(28);
    color: rgb(51, 51, 51);
    border-bottom: px2vw(1) solid $borderColor;
  }
  .active {
    position: relative;
    font-size: px2vw(34);
    color: rgb(54, 118, 182);
  }
  .active::after {
    position: absolute;
    content: "";
    width: px2vw(80);
    height: px2vw(4);
    bottom: px2vw(-20);
    left: px2vw(28);
    border-radius: px2vw(2);
    background: rgb(54, 118, 182);
  }
}
.dialog_wrapper{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  overflow: auto;
  z-index: 9999;
  background: rgba(0,0,0,.3);
  font-family: "SourceHanSansCN-Regular"
}
.reg .dialog{
  padding-top: px2vw(42)
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
  overflow: hidden;
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
.dialog_body .text-info{
  position: relative;
  display: block;
  text-align: center;
  line-height: px2vw(26);
  font-size: px2vw(26);
  margin-top: px2vw(-8);
  padding-bottom: px2vw(40);
  color: #666666;
}
.dialog_body .info{
  position: relative;
  display: block;
  text-align: center;
  line-height: px2vw(26);
  font-size: px2vw(26);
  margin-top: px2vw(-8);
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
.text-info::after {
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
  .text-info::after{
    transform: scaleY(0.5);
  }
}
.btn{
  display: inline-block;
  line-height: 1;
  box-sizing: border-box;
  width: 100%;
  height: px2vw(90);
  line-height: px2vw(90);
  vertical-align: top;
  background: #fff;
  font-size: px2vw(36)
}
.btn-half.button_primary{
  border-right: 1px solid rgb(204, 204, 204);
}
.btn-half{
  display: inline-block;
  line-height: 1;
  box-sizing: border-box;
  width: 49%;
  height: px2vw(74);
  line-height: px2vw(74);
  vertical-align: top;
  background: #fff;
  font-size: px2vw(30)
}
.dialog_bottom .btn:nth-child(1){
  border-bottom-left-radius: 5px;
}
.button_primary{
  border-bottom-right-radius: 5px;
  text-align: center;
  color: rgb(54, 118, 182)
}
.progress-wrapper{
  margin-top: px2vw(600)
}
</style>
