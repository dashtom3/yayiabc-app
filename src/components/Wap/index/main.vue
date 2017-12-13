<template>
  <div class="index">
    <div class="search-box">
      <input class="search-word" type="text" @focus="searchActive" v-model="searchCargo" autocomplete="on" placeholder="请输入关键字">
      <img class="search-img" src="../../../images/index/search.png" alt="img">
      <img class="search-qr" src="../../../images/index/qrCode.png" alt="扫码">
    </div>
    <carousel></carousel>
    <div class="tip-wrapper">
      <img src="../../../images/index/info.png" alt="消息">
      <span class="tip-text">【牙医abc快报】</span>
      <span class="tip-phone">156****1555</span>
      <span class="tip-info">提现了60元</span>
    </div>
    <div class="banner-wrapper">
      <div class="banner-left">
        <img src="../../../images/index/img1.png" alt="牙医注册">
      </div>
      <div class="banner-right">
        <img src="../../../images/index/img2.png" alt="牙医销售">
      </div>
    </div>
    <div class="main-wrapper">
      <div class="main-item" @click="goToPage('/caseOfIllness')">
        <img class="item-icon" src="../../../images/index/case.png" alt="病例">
        <span class="item-name">病例</span>
      </div>
      <div class="main-item" @click="goToPage('/video')">
        <img class="item-icon" src="../../../images/index/video.png" alt="视频">
        <span class="item-name">视频</span>
      </div>
      <div class="main-item" @click="goToPage('/productList')">
        <img class="item-icon" src="../../../images/index/shop.png" alt="商城">
        <span class="item-name">商城</span>
      </div>
      <div class="main-item" @click="goToPage('/QandAList')">
        <img class="item-icon" src="../../../images/index/faq.png" alt="问答">
        <span class="item-name">问答</span>
      </div>
      <div class="main-item" @click="goToPage('')">
        <img class="item-icon" src="../../../images/index/database.png" alt="资料库">
        <span class="item-name">资料库</span>
      </div>
      <div class="main-item" @click="goToPage('/enterpriseRecord')">
        <img class="item-icon" src="../../../images/index/page.png" alt="企业录">
        <span class="item-name">企业录</span>
      </div>
      <div class="main-item" @click="goToPage('/register')">
        <img class="item-icon" src="../../../images/index/register.png" alt="注册">
        <span class="item-name">注册</span>
      </div>
      <div class="main-item" @click="goToPage()">
        <img class="item-icon" src="../../../images/index/ckSale.png" alt="客服代表">
        <span class="item-name">客服代表</span>
      </div>
    </div>
    <div class="split"></div>
    <div class="hot-wrapper">
      <div class="hot-header">
        <span class="hot-item" v-for="(hot, index) in hotClass" :key="index" :class="{'active': index === activeIndex}" @click.stop="refreshTo(index)">{{ hot }}</span>
      </div>
      <div class="hot-container">
        <router-view></router-view>
      </div>
    </div>
    <div class="redPacketWrapper" v-show="isShow2">
      <img class="redPacket" src="../../../images/index/redPacket.png">
      <div class="btn-use" @click.stop="useRedPacket"></div>
      <img class="close" src="../../../images/index/close.png" @click.stop="hideRedPacket">
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
  </div>
</template>

<script>
import Carousel from './carousel'
export default {
  name: "index",
  components: {
    Carousel
  },
  data() {
    return {
      searchCargo: '',
      hotClass: ['热门病例', '热门视频', '热门问答'],
      activeIndex: 0,
      isShow: false,
      isShow2: false,
      wgtVer: null,
      newVer: null,
    };
  },
  created () {
    var that = this;
    // 检查更新的弹框是否显示
    if (sessionStorage.getItem('isShow')=== null) {
      if (window.plus) {
        that.plusReady();
      } else {
        document.addEventListener('plusready',that.plusReady,false);
      }
    } 
    // 判断红包是否显示
    if (this.$route.params.redPacket === true) {
      this.isShow2 = true;
    } else {
      this.isShow2 = false;
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
    searchActive: function() {
      this.$router.push({ path: '/searchWord', query: { data: 'focus' }})
    },
    //搜索框
    search_cargo: function() {
      var that = this
    },
    refreshTo(index) {
      this.activeIndex = index
      if (index === 0) {
        this.$router.push({path: '/main/caseOfIllness'})
      } else if (index === 1) {
        this.$router.push({path: '/main/video'})
      } else {
        this.$router.push({path: '/main/QandAList'})
      }
    },
    goToPage(url) {
      this.$router.push({path: url, backName: 'yayi/index'})
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
        if(that.wgtVer && that.newVer && (that.wgtVer != that.newVer)){
          that.isShow = true;
        }else{
          that.isShow = false;
        }
      })
    },
    downWgt: function(){
      this.isShow = false;
      var that = this;
      var wgtUrl = "http://www.yayiabc.com:6949/H53C638B9.wgt";
      plus.nativeUI.showWaiting("正在更新...");
      plus.downloader.createDownload(wgtUrl, {filename:"_doc/update/"}, function(d,status){
        if (status == 200){
          console.log(JSON.stringify(d));
          that.installWgt(d.filename); // 安装wgt包
        } else {
          plus.nativeUI.alert("更新失败！");
        }
        plus.nativeUI.closeWaiting();
      }).start();
    },
    installWgt: function(path){
      plus.nativeUI.showWaiting("正在更新...");
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
    },
    useRedPacket() {
      this.isShow2 = false;
      this.$router.push({path: '/productList'})
    },
    hideRedPacket() {
      this.isShow2 = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../common/sass/factory";
.index {
  width: 100vw;
}
.search-box {
  width: 100vw;
  height: px2vw(88);
  position: relative;
  background-color: $themeColor;
}
.search-word {
  width: px2vw(632);
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
.search-img {
  width: 4.75vw;
  height: 4.75vw;
  position: absolute;
  top: 3.5vw;
  left: 6vw;
}
.search-qr{
  position: absolute;
  top: 3.5vw;
  right: px2vw(21);
  width: px2vw(40);
  height: px2vw(40);
}
.tip-wrapper{
  display: flex;
  align-items: center;
  height: px2vw(88);
  font-size: px2vw(24);
  color: rgb(51,51,51);
  img{
    width: px2vw(30);
    height: px2vw(27);
    margin-left: px2vw(21);
  }
  .tip-text{
    font-size: px2vw(28);
    color: rgb(255,156,0);
  }
  .tip-phone{
    margin-right: px2vw(10);
  }
}
.banner-wrapper{
  display: flex;
  height: px2vw(162);
  justify-content: space-around;
  align-items: center;
  background: #f4f4f4;
  div{
    width: px2vw(340);
    height: px2vw(120);
    img{
      width: 100%;
    }
  }
}
.main-wrapper{
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  height: px2vw(364);
  background: #fff;
  .main-item{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: px2vw(187.5);
    padding: 0 px2vw(36) 0;
    font-size: px2vw(28);
    color: rgb(51,51,51);
  }
}
.main-wrapper .main-item:nth-child(1) .item-icon{
  width: px2vw(60);
  height: px2vw(60);
}
.main-wrapper .main-item:nth-child(2) .item-icon{
  width: px2vw(61);
  height: px2vw(66);
}
.main-wrapper .main-item:nth-child(3) .item-icon{
  width: px2vw(65);
  height: px2vw(60);
}
.main-wrapper .main-item:nth-child(4) .item-icon{
  width: px2vw(68);
  height: px2vw(60);
}
.main-wrapper .main-item:nth-child(5) .item-icon{
  width: px2vw(53);
  height: px2vw(61);
}
.main-wrapper .main-item:nth-child(6) .item-icon{
  width: px2vw(60);
  height: px2vw(66);
}
.main-wrapper .main-item:nth-child(7) .item-icon{
  width: px2vw(65);
  height: px2vw(65);
}
.main-wrapper .main-item:nth-child(8) .item-icon{
  width: px2vw(60);
  height: px2vw(70);
}
.split{
  height: px2vw(18);
  background: #f4f4f4;
}
.hot-wrapper{
  padding-bottom: px2vw(104);
  .hot-header{
    display: flex;
    height: px2vw(90);
    justify-content: space-around;
    align-items: center;
    font-size: pxvw(28);
    color: rgb(51,51,51);
    border-bottom: px2vw(2) solid $borderColor;
  }
  .active{
    position: relative;
    font-size: px2vw(34);
    color: rgb(54,118,182);
  }
  .active::after{
    position: absolute;
    content: '';
    width: px2vw(80);
    height: px2vw(4);
    bottom: px2vw(-20);
    left: px2vw(28);
    border-radius: px2vw(2);
    background: rgb(54,118,182);
  }
}
</style>