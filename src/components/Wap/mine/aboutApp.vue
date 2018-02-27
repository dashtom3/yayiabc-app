<template>
  <div class="box">
    <div class="top">
      <div class="back" @click="goBack">
         <img src="../../../images/logIn/back.png" alt="返回">
      </div>
      <span>关于牙医app</span>
    </div>
    <div class="setting-wrap">
      <div class="img-wrap">
        <img src="../../../images/mine/logo.jpg" alt="">
      </div>
      <div class="version">
        v1.2.7
      </div>
      <div class="setting-box">
        <div class="line" @click="goto('/comIntro')">
          <span>公司简介</span>
          <img src="../../../images/mine/right.png" alt="">
        </div>
        <div class="line" @click="goto('/yyMP')">
          <span>注册协议</span>
          <img src="../../../images/mine/right.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import salesHeader from '../../salesWap/salesHeader.vue'

  export default {
    components:{
      salesHeader
    },
    data(){
      return {
        wgtVer: null,
        path:'appSetting'
      }
    },
    created: function(){
      this.mBack("goBack")
      var that = this
      if (window.plus) {
        that.plusReady();
      } else {
        document.addEventListener('plusready',that.plusReady,false);
      }
    },
    methods:{
      goto(it){
        this.$router.push(it)
      },
      goBack(){
        this.$router.push({path: this.path})
      },
      plusReady: function(){
        // 获取本地应用资源版本号
        var that = this
        plus.runtime.getProperty(plus.runtime.appid,function(inf){
          that.wgtVer=inf.version;
        });
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .top{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: px2vw(88);
    line-height: px2vw(88);
    text-align: center;
    font-size: 0;
    color: #fff;
    background: rgb(54,118,182);
    .back{
      position: absolute;
      top: px2vw(29);
      left: px2vw(3);
      width: px2vw(40);
      height: px2vw(40);
      font-size: 0;
      img{
        vertical-align: top;
        width: px2vw(18);
        height: px2vw(29);
      }
    }
    span{
      font-size: px2vw(36)
    }
  }
  .box{
    height: 93.2vh;
    background-color: #f4f4f4;
  }
  .setting-wrap{
    margin-top: px2vw(88);
    background-color: #fff;
  }
  .img-wrap{
    width: 100%;
    padding-top: px2vw(40);
  }
  .img-wrap img{
    width: px2vw(400);
    margin: 0 px2vw(175);
  }
  .setting-box{
    margin-bottom: px2vw(20);
    border-bottom: px2vw(1) solid #e5e5e5;
  }
  .version{
    width: 100%;
    height: px2vw(170);
    text-align: center;
    padding-top: px2vw(25);
  }
  .line{
    height: px2vw(88);
    width: 100%;
    padding: 0 px2vw(35);
    line-height: px2vw(88);
    border-top: 1px solid #e5e5e5;
    font-size: px2vw(30);
    color: #333;
  }
  .line > span{
    float: left;
  }
  .line > img{
    margin-top: px2vw(32);
    height: px2vw(24);
    float: right;
  }
</style>
