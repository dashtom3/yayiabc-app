<template>
  <div class="box">
    <salesHeader :back-to="path" headerText="设置"></salesHeader>
    <div class="setting-wrap">
      <div class="setting-box">
        <!--<div class="line" @click="clearTmp">-->
          <!--<span>清除本地缓存</span>-->
          <!--<img src="../../../images/mine/right.png" alt="">-->
        <!--</div>-->
        <div class="line" @click="aboutApp">
          <span class="spanDes">关于牙医abc</span>
          <img src="../../../images/mine/right.png" alt="">
        </div>
      </div>
      <div class="setting-box">
        <div class="line no-line" @click="goto">
          <span class="spanDes">意见反馈</span>
          <img src="../../../images/mine/right.png" alt="">
        </div>
        <div class="line">
          <span>联系客服</span>
          <a href="tel:4000014980"> 400-001-4980 </a>
        </div>
      </div>
      <!-- <div class="setting-box">
        <div class="line">
          <span class="spanDes">检查更新</span>
          <span class="checkingVer" v-if="checking">检查更新中...</span>
          <span class="checkingVer" v-else-if="checked">检测到新版本：{{newVer}}</span>
          <span class="checkingVer" v-else>已是最新版本</span>
          <img src="../../../images/mine/right.png" alt="" v-if="checked">
          <span class="nowVer" v-if="!checked">当前版本：{{ver}}</span>
          <span class="nowVer2" v-else @click="updateApp">点击更新</span>
        </div>
      </div> -->
      <!--退出按钮开始-->
      <div class="esc_background" v-if="logOutShow">
        <mu-raised-button class="esc" label="退出登录" v-on:click="logOut"/>
      </div>
      <!--退出按钮结束-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import salesHeader from '../../salesWap/salesHeader.vue'
  import {Toast, Indicator, MessageBox} from 'mint-ui'
  import {tokenMethods} from '../../../vuex/util'
  export default {
    data(){
      return {
        checking:true,
        ver:'',
        newVer:'',
        logOutShow:true,
        path: '',
      }
    },
    components:{
      salesHeader
    },
    created(){
      // plus.runtime.getProperty(plus.runtime.appid,function(inf){
        // this.ver=inf.version;
        // this.checkUpdate();
      // });
     this.path = this.$route.fullPath
      if (tokenMethods.getWapToken() == null) {
        this.logOutShow = false
      }
    },
    methods:{
      aboutApp(){
        this.$router.push('/aboutApp')
      },
//      clearTmp(){
//        MessageBox.confirm('清除后，图片视频等多媒体消息需要重新下载观看').then(action => {
//          //清缓存的内容写在这里，清除完成执行下面的回调
//          Toast({message:'清除缓存成功！',during:1500})
//        });
//      },
      goto(){
        this.$router.push('/feedback')
      },
      // 登出
      logOut: function () {
        var that = this;
        var obj = {
          token: tokenMethods.getWapToken()
        }
        that.$store.dispatch('GET_LOGIN_OUT', obj).then((res) => {
          // console.log("1111"+res);
          if (res.callStatus === 'FAILED') {
            tokenMethods.removeMsg()
            this.$router.push({path: '/logIn'})
          }
          if (res.callStatus === 'SUCCEED') {
            tokenMethods.removeMsg()
            Toast({message: '退出成功！', duration: 1500});
            this.$router.push({path: '/logIn', query: {backName: '/yayi/mine'}});
            try {
              that.authLogout()
            } catch (e) {
              console.log(e)
            }
          } else {
            this.$router.push({path: '/logIn'})
            tokenMethods.removeMsg()
            try {
              that.authLogout()
            } catch (e) {
              console.log(e)
            }
            // Toast({message: '退出失败！', duration: 3000})
          }
        })
      },
    }
  }

</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .box{
    height: 93.2vh;
    background-color: #f4f4f4;
  }
  .setting-wrap{
    margin-top: px2vw(88);
  }
  .setting-box{
    margin-bottom: px2vw(20);
    // border-bottom: 1px solid #e5e5e5;
  }
  .line{
    height: px2vw(88);
    width: 100%;
    padding: 0 px2vw(35);
    line-height: px2vw(88);
    border-top: px2vw(1) solid #e5e5e5;
    font-size: px2vw(30);
    color: #333;
    background-color: #fff;
  }
  .line.no-line{
    border: none;
  }
  .line > .spanDes{
    float: left;
    margin-right: px2vw(20);
  }
  .line > .checkingVer{
    float: left;
    font-size: px2vw(24);
    color: #999;
  }
  .line > .nowVer{
    float: right;
    font-size: px2vw(24);
    color: #999;
  }
  .line > .nowVer2{
    float: right;
    font-size: px2vw(24);
    color: #333;
  }
  .line > img{
    margin-top: px2vw(32);
    height: px2vw(24);
    float: right;
  }
  .line a{
    float: right;
    color: #999;
  }
  .esc_background {
    height: 120px;
  }
  .esc {
    margin-left: px2vw(55);
    margin-top: px2vw(102);
    text-align: center;
    height: px2vw(100);
    font-size: px2vw(30);
    line-height: normal;
    background-color: $themeColor;
    color: white;
    width: px2vw(640);
    box-shadow: 0 0 px2vw(25) $themeColor;
  }
</style>
