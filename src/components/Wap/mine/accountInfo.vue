<template>
  <div class="account-wrapper">
    <!-- 顶部返回 -->
    <div class="top">
      <div class="back" @click="back">
         <img src="../../../images/logIn/back.png" alt="返回">
      </div>
      <span>账户设置</span>
    </div>
    <!-- 账户设置 -->
    <div class="account">
      <div class="info clearfix">
        <div class="avatar-wrapper">
          <div class="avatar">
            <img src="static/images/defaultPic.png" width="94%" height="94%" alt="头像">
          </div>
        </div>
        <div class="text">
          <h1>{{name}}</h1>
          <p>{{phone}}</p>
        </div>
        <div class="editor" @click="goEditor">
          <span>编辑个人资料</span>
          <img src="../../../images/mine/back.png">
        </div>
      </div>
      <div class="split"></div>
      <div class="qualifications clearfix">
        <span class="handle">资质认证</span>
        <div @click="goQualifications" class="Qua-wrapper">
          <span class="status" :class="state.color">{{state.text}}</span>
          <img src="../../../images/mine/back.png">
        </div>
      </div>
      <!-- <div class="split"></div>
      <div class="invoice"></div> -->
    </div>
  </div>
</template>

<script>
import {tokenMethods} from '../../../vuex/util'
export default {
  name: "accountInfo",
  data () {
    return {
      picImg: 'static/images/defaultPic.png',
      name: '',
      phone: '',
      status: ''
    };
  },
  created () {
    if (!tokenMethods.getWapUser()){
      this.$router.push({path: '/logIn'})
      return
    }
    this.init();
  },
  methods: {
    //获取个人信息
    init: function () {
      let that = this
      if (!tokenMethods.getWapUser()) return
      var obj = {
        phone: tokenMethods.getWapUser().phone,
        token: tokenMethods.getWapToken()
      }
      //查询个人信息
      that.$store.dispatch('GET_PERSON_LIST', obj).then((res) => {
        this.showLogin = true;
        if (res.errorCode === 'RE_LOGIN') {
          this.showLogin = false;
          this.userPic = 'static/images/defaultPic.png';
          tokenMethods.removeMsg();
          if (tokenMethods.getWapUser() === null || tokenMethods.getWapUser() === undefined) {
            this.showLogin = false;
            this.userPic = 'static/images/defaultPic.png';
            return
          }
          return false
        }
        if (res.data.userPic === '' || res.data.userPic === null || res.data.userPic === undefined) {
          this.userPic = 'static/images/defaultPic.png'
        } else {
          that.userPic = res.data.userPic
        }
        if (res.callStatus === 'SUCCEED') {
          that.picImg = res.data.userPic;
          that.phone = res.data.phone;
          that.name = res.data.trueName;
          that.status = res.data.state;
          if (!res.data.userPic) {
            that.picImg = res.data.userPic
          } else {
            that.picImg = 'static/images/defaultPic.png'
          }
        }
      })
    },
    goEditor() {
      this.$router.push({path: '/account/editor'})
    },
    goQualifications() {
      this.$router.push({path: '/account/qualifications'})
    },
    back() {
      this.$router.push({path: '/yayi/mine'})
    }
  },
  computed: {
    state() {
      let obj = {}
      if (this.status === 1) {
        obj.color = 'status-red'
        obj.text = '审核中'
      } else if (this.status === 2) {
        obj.color = ''
        obj.text = '已认证'
      } else {
        obj.color = 'status-blue'
        obj.text = '立即认证'
      }
      return obj
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../common/sass/factory";
.account-wrapper{
  height: 100vh;
  background: #f4f4f4;
  color: rgb(51, 51, 51);
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
      top: px2vw(28);
      left: px2vw(26);
      width: px2vw(40);
      height: px2vw(40);
      font-size: 0;
      img{
        vertical-align: top;
        width: px2vw(17);
        height: px2vw(32);
      }
    }
    span{
      font-size: px2vw(36)
    }
  }
  .account{
    padding-top: px2vw(88);
    background: #fff;
    @at-root .info{
      width: 100%;
      .avatar-wrapper{
        position: relative;
        float: left;
        width: px2vw(136);
        height: px2vw(240);
      }
      .avatar{
        position: absolute;
        top: px2vw(64);
        right: 0;
        width: px2vw(112);
        height: px2vw(112);
        font-size: 0;
        border: 1px solid rgba(51, 51, 51, .3);
        border-radius: 50%;
        img{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .text{
        float: left;
        width: px2vw(266);
        height: px2vw(240);
        margin-left: px2vw(41);
        h1{
          margin: px2vw(78) 0 0 0;
          height: px2vw(34);
          line-height: px2vw(34);
          font-size: px2vw(36);
        }
        p{
          margin: px2vw(28) 0 0 0;
          height: px2vw(22);
          line-height: px2vw(22);
          font-size: px2vw(28);
          color: rgb(51, 51, 51);
        }
      }
      .editor{
        position: relative;
        float: left;
        width: px2vw(307);
        height: px2vw(240);
        text-align: right;
        font-size: 0;
        span{
          display: inline-block;
          margin-top:px2vw(106);
          margin-right: px2vw(59);
          height: px2vw(28);
          line-height: px2vw(28);
          font-size: px2vw(30);
        }
        img{
          position: absolute;
          top: px2vw(104);
          right: px2vw(22);
          width: px2vw(16);
          height: px2vw(31);
        }
      }
    }
  }
  .qualifications{
    position: relative;
    height: px2vw(120);
    background: #fff;
    font-size: 0;
    .handle{
      float: left;
      margin: px2vw(46) 0 0 px2vw(29);
      height: px2vw(28);
      line-height: px2vw(28);
      font-size: px2vw(30);
    }
    .Qua-wrapper{
      float: right;
      height: px2vw(120);
    }
    .status{
      display: inline-block;
      margin: px2vw(46) px2vw(60) 0 0;
      height: px2vw(27);
      line-height: px2vw(27);
      font-size: px2vw(28);
    }
    .status-red{
      color: rgb(216, 30, 6);
    }
    .status-blue{
      color: rgb(54,118,182);
    }
    img{
      position: absolute;
      top: px2vw(46);
      right: px2vw(21);
      width: px2vw(15);
      height: px2vw(28);
    }
  }
  .split{
    width: 100%;
    height: px2vw(20);
    background: #f4f4f4;
  }
}
</style>