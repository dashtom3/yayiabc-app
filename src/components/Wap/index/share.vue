<template>
  <div class="wrap">
    <div class="shadow"></div>
    <div class="fixBox">
    <div class="shareBox">
      <div class="eachBox">
        <div class="imgBox" @click="shareWxPal">
          <img src="../../../images/case/wxPal.png" alt="">
        </div>
        <p>微信好友</p>
      </div>
      <div class="eachBox">
        <div class="imgBox">
          <img src="../../../images/case/wxCircle.png" alt="">
        </div>
        <p>朋友圈</p>
      </div>
      <div class="eachBox" @click="shareYayiCircle">
        <div class="imgBox">
          <img src="../../../images/case/yayiCircle.png" alt="">
        </div>
        <p>牙医圈</p>
      </div>
      <div class="eachBox">
        <div class="imgBox">
          <img src="../../../images/case/copyUrl.png" alt="">
        </div>
        <p>复制链接</p>
      </div>
    </div>
    <div class="cancel" @click="cancelShare">
      取消
    </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return{

      }
    },
    props:{
      shareData:{
        type:Object
      }
    },
    created(){
      document.body.classList.add('shareBox-ggKula');
    },
    mounted(){
      switch (true){
        case this.shareData.momentType === '病例':
          this.shareData.momentType = 3;
          break;
        case this.shareData.momentType === '问答':
          this.shareData.momentType = 4;
          break;
        case this.shareData.momentType === '视频':
          this.shareData.momentType = 2;
          break;
        case this.shareData.momentType === '牙医圈':
          this.shareData.momentType = 1;
          break;
      }
      console.log(this.shareData,'ll')
    },
    methods:{
      shareYayiCircle(){
        this.$router.push({path:'/shareToYayiCircle',query:this.shareData})
        this.$emit('cancelShare',false)
      },
      cancelShare(){
        this.$emit('cancelShare',false)
        document.body.classList.remove('shareBox-ggKula');
        this.$destroy()
      },
      shareWxPal(){

      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  body {
    &.shareBox-ggKula{
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
      .wrap{
        /*background-color: red;*/
        /*.ql-toolbar.ql-snow {*/
        position: absolute !important;
        display: block !important;
        bottom: 0 !important;
        left: 0 !important;
        z-index: 900;
        width: 100%;
        /*}*/
      }
    }
  }

</style>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .shadow{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top:0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 901;
  }
  .fixBox{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 910;
    .shareBox{
      width: 100vw;
      height: px2vw(260);
      padding: px2vw(60);
      display: flex;
      justify-content:space-around;
      background-color: #f4f4f4;
      border-bottom: px2vw(1) solid #eee;
      .eachBox{
        height: px2vw(140);
        text-align: center;
        color: #333;
        font-size: px2vw(24);
        .imgBox{
          display: inline-block;
          width: px2vw(110);
          height: px2vw(110);
          img{
            width: 100%;
          }
        }
        p{
          line-height: px2vw(30);
        }
      }
    }
    .cancel{
      background-color: #f4f4f4;
      height: px2vw(90);
      width: 100%;
      font-size: px2vw(28);
      line-height: px2vw(90);
      color: $themeColor;
      text-align: center;
      z-index: 920;
    }
  }

</style>
