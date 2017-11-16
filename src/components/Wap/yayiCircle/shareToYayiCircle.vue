<template>
  <div>
    <div class="header">
      <span @click="closePage">取消</span>
      <span>分享到牙医圈</span>
      <span @click="release">发布</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data(){
      return{
        shareData: '',
      }
    },
    created(){
      this.shareData = this.$route.query;
      console.log(this.shareData)
    },
    methods:{
      closePage(){

      },
      release(){

      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: px2vw(88);
    z-index: 999;
    line-height: px2vw(88);
    text-align: center;
    background-color: $themeColor;
    color: #fff;
    span:nth-child(1){
      display: inline-block;
      width: px2vw(100);
      float: left;
      font-size: px2vw(30);
    }
    span:nth-child(2){
      display: inline-block;
      font-size: px2vw(36);
    }
    span:nth-child(3){
      display: inline-block;
      width: px2vw(100);
      float: right;
      font-size: px2vw(30);
    }
  }
</style>
