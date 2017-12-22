<template>
  <div>
    <div class="header">
      <span class="back-click-area" @click="goBack"></span>
      <div class="headerTitle">邀请客户</div>
    </div>
    <div class="container">
      <div class="imgs">
        <img src="../../../images/salePersonal/inviteTitle.jpg" alt="">
        <img src="../../../images/salePersonal/inviteInfo.png" alt="">
        <p>邀请客户注册牙医abc账号，若客户<span>注册成功</span>，</p>
        <p>系统将<span>自动</span>把该客户与您<span>绑定</span>；</p>
        <p>一旦该<span>客户下单</span>，您可获得<span>收益</span>。</p>
      </div>
      <div class="line">
        <p>- 邀请方式 -</p>
        <shareToWx  :userId="myUserId" :resType="1"></shareToWx>
      </div>
      <div class="line">
        <p>- 我的客户 -</p>

      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import shareToWx from '../index/shareToWx.vue'
  import { tokenMethods } from '../../../vuex/util';

  export default {
    data(){
      return{
        myUserId:tokenMethods.getWapUser() ? tokenMethods.getWapUser().userId:'',
      }
    },
    components:{
      shareToWx
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      }
    }
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
    font-size: px2vw(36);
    .back-click-area {
      position: absolute;
      top: 0;
      height: 100%;
      left: 0;
      width: px2vw(150);
      background: url("../../../images/logIn/back.png") px2vw(20) center no-repeat;
      background-size: px2vw(18) px2vw(29);
    }
  }
  .container{
    position: fixed;
    top: px2vw(88);
    bottom: 0;
    overflow: scroll;
    width: 100%;
    height: 94vh;
    -webkit-overflow-scrolling: touch;
    background-color: #fff;
    .imgs{
      text-align: center;
      padding-bottom: px2vw(30);
      border-bottom: px2vw(1) solid #e5e5e5;
      img:nth-child(1){
        width: 100%;
      };
      img:nth-child(2){
        width: 100%;
        padding: px2vw(30) 10%;
      };
      p{
        font-size: px2vw(26);
        color: #666;
        line-height: px2vw(50);
        span{
          color: $themeColor;
        }
      }
    }
    .line{
      border-bottom: px2vw(1) solid #e5e5e5;
      p{
        font-size: px2vw(36);
        color: $themeColor;
        text-align: center;
        line-height: px2vw(100);
      }
    }
  }
</style>
