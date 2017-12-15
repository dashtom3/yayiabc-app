<template>
  <div class="invite-wrapper">
    <div class="invite-header">
      <span class="header-title">邀请好友，赢钱币</span>
      <span @click="goBack()" class="back-img">
        <img src="../../../images/case/backer.png" alt="">
      </span>
    </div>
    <div class="invite-banner">
      <img src="../../../images/logIn/reg-top.png" alt="牙医注册">
    </div>
    <div class="info-wrapper">
      <div class="invite-info">
        <div class="text-wrapper">
          <span class="info-text">您将获得10乾币</span>
          <span class="info-text">TA可获得60乾币</span>
        </div>
      </div>
      <p class="invite-text">邀请好友注册牙医abc账号，<b>受邀好友可获得60乾币</b>。<br/>每邀请一位好友，<b>您可以获得10乾币</b>（下单可抵扣10元）。<br/>*邀请好友注册，获得的乾币不可提现！</p>
    </div>
    <div class="split"></div>
    <div class="invite-type">
      <h2 class="title"><i class="line"></i>邀请方式<i class="line"></i></h2>
      <div class="type-box">
        <div class="box">
          <img src="../../../images/logIn/weixin.png" alt="牙医邀请">
          <span>微信好友</span>
        </div>
        <div class="box">
          <img src="../../../images/logIn/pengyouquan.png" alt="牙医邀请">
          <span>朋友圈</span>
        </div>
      </div>
    </div>
    <div class="split"></div>
    <div class="invite-footer">
      <h2 class="title"><i class="line"></i>我邀请的好友<i class="line"></i></h2>
      <div class="friend-box">
        <p class="friend-info"><span class="friend-name">真实姓名</span><span class="friend-phone">151****0809</span></p>
        <p class="friend-info"><span class="friend-name">真实姓名</span><span class="friend-phone">151****0809</span></p>
        <p class="friend-info"><span class="friend-name">真实姓名</span><span class="friend-phone">151****0809</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "inviteRegister",
  data () {
    return {
      
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../common/sass/factory";
.invite-wrapper{
  width: 100vw;
  background: #fff;
}
.invite-header{
  z-index: 2000;
  position: fixed;
  height: px2vw(88);
  top:0;
  width: 100vw;
  background-color: $themeColor;
  text-align: center;
  color: #ffffff;
  font-size: px2vw(36);
  .header-title{
    display: table-cell;
    vertical-align: middle;
    height: px2vw(88);
    width: 100vw;
    text-align: center;
  }
  .back-img{
    position: absolute;
    padding: px2vw(23) px2vw(35) 0 px2vw(20);
    top:0;
    left: 0;
    height: px2vw(88);
  }
  .back-img>img{
    width: px2vw(24);
    height: px2vw(42);
  }
}
.invite-banner{
  padding: px2vw(88) 0 0 0;
  height: px2vw(468);
  img{
    width: 100%;  
  }
}
.info-wrapper{
  height: px2vw(295);
  .invite-info{
    position: relative;
    height: px2vw(124);
    background-image: url("../../../images/logIn/reg-bg.png");
    background-size: 100% px2vw(88);
    background-repeat: no-repeat;
    background-position: left bottom;
  }
  .text-wrapper{
    position: absolute;
    width: px2vw(680);
    height: px2vw(64);
    left: px2vw(34);
    bottom: px2vw(12);
    border-radius: px2vw(32);
  }
  .info-text{
    display: inline-block;
    width: px2vw(334);
    height: px2vw(64);
    text-align: center;
    line-height: px2vw(64);
    font-size: px2vw(31);
    color: rgb(251,164,26);
  }
  .invite-text{
    margin: px2vw(32) 0 0 0;
    padding: 0 px2vw(16) 0 px2vw(26);
    font-family: "SourceHanSansCN-Medium";
    font-size: px2vw(26);
    color: rgb(102,102,102);
    b{
      margin: 0 px2vw(10);
      font-weight: normal;
      color: rgb(14,95,139);
    }
  }
}
.split{
  width: 100%;
  height: px2vw(1);
  background: $borderColour;
}
.line{
  display: inline-block;
  vertical-align: top;
  margin: px2vw(16) px2vw(30) 0 px2vw(30);
  width: px2vw(23);
  height: px2vw(2);
  background: rgb(54,118,182);
}
.title{
  margin-top: px2vw(50);
  height: px2vw(34);
  line-height: px2vw(34);
  text-align: center;
  font-family: 'SourceHanSansCN-Regular';
  font-size: px2vw(36);
  font-weight: normal;
  color: rgb(1,92,162);
}
.type-box{
  display: flex;
  justify-content: space-around;
  padding: px2vw(50) px2vw(170) px2vw(26);
  .box{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    width: px2vw(120);
    height: px2vw(146);
  }
}
.type-box .box:nth-child(1) img{
  width: px2vw(66);
  height: px2vw(53);
}
.type-box .box:nth-child(2) img{
  width: px2vw(60);
  height: px2vw(60);
}
.invite-footer{
  .line{
    width: px2vw(34);
  }
}
.invite-footer{
  .title{
    padding-bottom: px2vw(66);
  }
}
.friend-info{
  padding: px2vw(18) px2vw(10);
  text-align: center;
  font-size: px2vw(26);
  color: rgb(51,51,51);
  .friend-name{
    display: inline-block;
    margin-right: px2vw(70);
  }
}
</style>