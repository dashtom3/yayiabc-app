<template>
  <div class="logIn">
    <div class="logIn_header">
      <div class="header_box" @click="back">
        <img class="header_back" src="../../../images/logIn/back.png" alt="img">
      </div>
      <span class="logWithCode">登录</span>
    </div>
    <div class="content_wrap">
      <div>
        <mu-tabs :value="activeTab" @change="handleTabChange" class="tab_btns">
          <mu-tab :class="{ active: isActive1}" value="tab1" title="密码登录"/>
          <mu-tab :class="{ active: isActive2}" value="tab2" title="短信登录"/>
        </mu-tabs>
      </div>
      <div v-if="activeTab === 'tab1'">
        <div class="mobilePhone_box">
          <input class="mobilePhone" v-model="mobilePhone" type="text" placeholder="请输入手机号">
          <transition name="shake">
            <p v-show="mPhone_alert" class="error">请输入正确的手机号!</p>
          </transition>
        </div>
        <div class="pwd_box">
          <input class="pwd" v-model="password" type="password" placeholder="请输入密码">
          <transition name="shake">
            <p v-show="mPwd_alert" class="error">请输入正确的密码!</p>
          </transition>
        </div>
        <div class="forget_pwd"><span @click="forgetPwd">忘记密码</span></div>
        <mu-raised-button label="登录" class="logIn_btn" @click="logIn"/>
        <div class="rg_btn"><span @click="register">注册</span></div>
      </div>
      <div v-if="activeTab === 'tab2'">
        <logMsg></logMsg>
      </div>
    </div>
    <!-- <div class="third_btn">其他方式登录</div>
    <img class="wx_btn" src="../../../images/saleman/wechart.png" alt="img"> -->
    <div class="third_btn">第三方账号登录</div>
    <img @click="checkState" class="wx_btn" src="../../../images/logIn/wx.png" alt="img">
  </div>
</template>

<script>
  var crypto = require('crypto')
  import {Toast} from 'mint-ui'
  import {tokenMethods} from '../../../vuex/util'
  import {SALE_LOGIN} from '../../../vuex/types'
  import logMsg from './logInMsg'

  export default {
    name: 'salesLogin',
    data() {
      return {
        mobilePhone: '',
        password: '',
        mPhone_alert: false,
        mPwd_alert: false,
        activeTab: 'tab1',
        isActive1: false,
        isActive2: true,
      }
    },
    created: function () {
      var that = this;
      that.mBack("back");
    },
    components: {
      logMsg,
    },
    watch: {
      //监听密码登录手机号验证
      mobilePhone: function () {
        var that = this
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/
        if (that.mobilePhone !== '' && mb.test(that.mobilePhone)) {
          that.mPhone_alert = false
        }
      },
      //监听密码登录密码验证
      password: function () {
        var that = this;
        if (that.password.length > 5 && that.password.length < 17 && that.password !== '') {
          that.mPwd_alert = false
        }
      },
    },
    methods: {
      handleTabChange(val) {
        var that = this
        that.activeTab = val
        if (that.activeTab === 'tab1') {
          that.isActive1 = false
          that.isActive2 = true
        } else {
          that.isActive1 = true
          that.isActive2 = false
        }
      },
      // 微信登录认证信息
      authUserInfo: function(channal) {
        var that = this
        var s
        for (var i = 0; i < auths.length; i++) {
          if (auths[i].id == channal) {
            s = auths[i]
            break
          }
        }
        if (!s.authResult) {
          plus.nativeUI.alert("未授权登录！")
        } else {
            s.getUserInfo(function(e) {
                // var josnStr = JSON.stringify(s.userInfo)
                var jsonObj = s.userInfo
                // console.log("获取用户信息成功：" + josnStr)
                var obj = {
                  openid: jsonObj.unionid,
                  state: 'ck',
                }
                console.log(JSON.stringify(obj))
                plus.nativeUI.showWaiting()
                that.$store.dispatch('WX_LOGIN_SEARCH', obj).then((res) => {
                  console.log(JSON.stringify(res.data),'lihui')
                  plus.nativeUI.closeWaiting()
                  if (res.data.callStatus === 'SUCCEED') {
                    tokenMethods.setSalesToken(res.data.token)
                    // tokenMethods.setWapUser(res.data.data)
                    // plus.nativeUI.alert("登录成功")
                    Toast({message: '登录成功', duration: 1500})
                    that.$router.push({path: '/salesIndex'})
                  } else {
                    if (res.data.errorCode == 'OPENID_NOT_EXIST') {
                      that.$router.push({path: '/wxLogBindPhone' , query: {openid: jsonObj.unionid}})
                    } else if (res.data.errorCode == 'Error') {
                      plus.nativeUI.alert(res.data.msg,'dd')
                    }
                    // Toast({message: res.data.msg, duration: 3000})
                  }
                })
                // s.userInfo.openId
                // showData(type,jsonObj);
                // authLogout();
            }, function(e) {
              plus.nativeUI.alert("获取用户信息失败：" + e.message + " - " + e.code)
            });
        }
      },
      // 微信登录
      wxLog: function () {
        var that = this
        var type = 'weixin'
        var s
        for (var i = 0; i < auths.length; i++) {
          if (auths[i].id == type) {
            s = auths[i]
            break
          }
        }
        if (!s.authResult) {
          s.login(function(e) {
            // plus.nativeUI.alert("登录认证成功！")
            var channal = 'weixin'
            that.authUserInfo(channal)
          }, function(e) {
            plus.nativeUI.alert("登录认证失败！")
          })
        } else {
          plus.nativeUI.alert("已经登录认证！")
          that.authUserInfo(channal)
          // s.getUserInfo(function(e) {
          //     var josnStr = JSON.stringify(s.userInfo);
          //     var jsonObj = s.userInfo;
          //     console.log("获取用户信息成功：" + josnStr);
          // })
        }
      },
      //微信登录注销
      authLogout: function() {
        for (var i in auths) {
          var s = auths[i];
          if (s.authResult) {
            s.logout(function(e) {
              console.log("注销登录认证成功！");
            }, function(e) {
              console.log("注销登录认证失败！");
            });
          }
        }
      },
      // 显示用户头像信息
      showData: function(type,data) {
        console.log(data,'data')
         mui.toast(data)
        // switch (type){
        //     case 'weixin':
        //         headImage.src = data.headimgurl;
        //         break;
        //     case 'qq':
        //         headImage.src = data.figureurl_qq_2;
        //         break;
        //     case 'sinaweibo':
        //         headImage.src = data.avatar_large;
        //         break;
        //     default:
        //         break;
        // }
      },
      //check登录状态
      checkState: function () {
        var that = this;
        console.log(tokenMethods.getWapToken(),'sdsd')
        if (tokenMethods.getWapToken()) {
          var obj = {
            token: tokenMethods.getWapToken()
          }
          that.$store.dispatch('GET_LOGIN_OUT', obj).then((res) => {
            console.log(JSON.stringify(res),'resyehu')
            if (res.callStatus === 'SUCCEED') {
              that.authLogout()
              tokenMethods.removeSalesToken()
              that.wxLog()
              // Toast({message: '退出成功！', duration: 1500})
            } else {
              that.authLogout()
              that.wxLog()
            }
          })
        } else {
          that.authLogout()
          that.wxLog()
        }
      },
      // 登录
      logIn: function () {
        var that = this
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (!mb.test(that.mobilePhone) || that.mobilePhone == '') {
          that.mPhone_alert = true
          return false
        }
        if (that.password.length < 6 || that.password.length > 16 || that.password == '') {
          that.mPwd_alert = true
          return false
        }
        var md5sum = crypto.createHash('md5')
        md5sum.update(that.password)
        var str = md5sum.digest('hex')
        var obj = {
          phone: that.mobilePhone,
          password: str,
        }
        that.$store.dispatch(`sale/${SALE_LOGIN}`, obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            tokenMethods.setSalesToken(res.data.token)
            Toast({message: '登录成功', duration: 3000})
            that.mobilePhone = ''
            that.password = ''
            that.$router.push({path: '/salesIndex'})
          } else {
            Toast({message: res.data.msg, duration: 3000})
          }
        })
      },
      // 忘记密码
      forgetPwd: function () {
        var that = this
        that.$router.push({path: '/salesForgetPwd'})
      },
      register: function () {
        var that = this
        that.$router.push({path: '/salesRegister'})
      },
      back: function () {
        this.$router.push({path: '/'})
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .mu-tab-link-highlight {
    background-color: $themeColor !important;
  }
</style>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .mu-tabs {
    background-color: #fff;
    color: $themeColor;
    width: px2vw(470);
    margin: auto;
  }

  .mu-tab-active, .mu-tab-link {
    color: $themeColor;
  }

  .active {
    color: #333;
  }

  .logIn {
    position: absolute;
    top: 0;
    bottom: 0;
  }

  .mobilePhone, .pwd {
    width: px2vw(580);
    height: px2vw(90);
    border: 1px solid $borderColor;
    padding-left: px2vw(40);
    color: #333333;
  }

  .mobilePhone:focus, .pwd:focus {
    border: 1px solid $themeColor !important;
  }

  .mobilePhone_box {
    text-align: center;
    margin-top: px2vw(69);
  }

  .pwd_box {
    text-align: center;
    margin-top: px2vw(69);
  }

  .forget_pwd {
    width: px2vw(580);
    height: px2vw(90);
    font-size: px2vw(28);
    margin: auto;
    margin-top: 1vw;
    text-align: right;
    color: $themeColor;
  }

  .logIn_btn {
    width: px2vw(580);
    height: px2vw(90);
    line-height: px2vw(90);
    font-size: px2vw(34);
    background-color: $themeColor;
    color: #fff;
    margin: auto;
    text-align: center;
    box-shadow: 0 0 7px $themeColor;
    display: block;
  }

  .rg_btn {
    width: px2vw(580);
    height: px2vw(90);
    line-height: px2vw(90);
    font-size: px2vw(28);
    margin: auto;
    text-align: center;
    margin-bottom: px2vw(130);
  }

  .third_btn {
    width: px2vw(580);
    height: px2vw(90);
    line-height: px2vw(90);
    font-size: px2vw(28);
    margin: auto;
    margin-bottom: px2vw(80);
    text-align: center;
    position: relative;
  }

  .third_btn:before {
    position: absolute;
    top: px2vw(44);
    left: 0px;
    width: px2vw(160);
    height: 1px;
    border: 1px solid $borderColor;
    content: "";
    background-color: $borderColor;
  }

  .third_btn:after {
    position: absolute;
    top: px2vw(44);
    right: 0px;
    width: px2vw(160);
    height: 1px;
    border: 1px solid $borderColor;
    content: "";
    background-color: $borderColor;
  }

  .wx_btn {
    display: block;
    width: px2vw(580);
    height: px2vw(90);
    line-height: px2vw(90);
    margin: auto;
    width: px2vw(64);
    height: px2vw(88);
  }

  .error {
    position: absolute;
    left: px2vw(90);
    font-size: px2vw(26);
    color: #cb1700;
  }
</style>

