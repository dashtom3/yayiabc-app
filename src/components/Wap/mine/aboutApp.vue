<template>
  <div class="box">
    <salesHeader headerText="设置"></salesHeader>
    <div class="setting-wrap">
      <div class="img-wrap">
        <img src="../../../images/mine/logo.jpg" alt="">
      </div>
      <div class="version">
        v1.2.4
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
    methods:{
      goto(it){
        this.$router.push(it)
      }
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
    border-bottom: 1px solid #e5e5e5;
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
