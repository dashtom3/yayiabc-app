<template>
  <div class="">
    <div class="logIn_header">
      <div class="header_box" @click="back">
        <img class="header_back" src="../../../images/logIn/back.png" alt="img">
      </div>
      <span class="logWithCode">注册账号，领60乾币</span>
    </div>
    <div class="invite-info">
      <p class="info-one">邀请您注册牙医abc账号</p>
      <p class="info-two">注册成功，可领<span>60</span>乾币！</p>
      <p class="info-three">下单可<span>直接抵扣60元！</span></p>
    </div>
    <div class="invite-text"><i class="line"></i><span>申请牙医abc账号</span><i class="line"></i></div>
    <div class="invite-formWrap form-wrap">
      <mt-field @click.native="focus" label="手机号" class="first-field must" placeholder="请输入手机号" v-model="registerData.phone">
        <i class="red">*</i>
      </mt-field>
      <mt-field @click.native="focus" label="验证码" v-model="registerData.rg_code" placeholder="请输入验证码" class="code-box must">
        <i class="red">*</i>
        <span class="code_btn" v-text="rg_Yzm" v-if="rg_hYzm" @click.stop="rg_hasYzm(registerData.phone)"></span>
        <span class="code_btn" v-text="rg_Yzm1" v-else></span>
      </mt-field>
      <mt-field @click.native="focus" label="密码" v-show="pwd_input" class="pwd_eye must" type="password" placeholder="请输入密码"
                v-model="registerData.password">
        <i class="red">*</i>
        <div class="eye_btn" @click="tabpwdHandler">
          <img src="../../../images/saleman/eye.png" alt="密码">
        </div>
      </mt-field>
      <mt-field @click.native="focus" label="密码" v-show="!pwd_input" class="pwd_eye must" placeholder="请输入密码" v-model="registerData.password">
        <i class="red">*</i>
        <div class="eye_btn" @click="tabpwdHandler">
          <img src="../../../images/saleman/eye2.png" alt="密码">
        </div>
      </mt-field>
      <mt-field @click.native="focus" label="真实姓名" class="must" placeholder="请输入真实姓名" v-model="registerData.trueName">
        <i class="red">*</i>
      </mt-field>
      <mt-field @click.native="focus" label="单位名称" placeholder="请输入单位名称" class="must" v-model="registerData.companyName" disableClear>
        <i class="red">*</i>
      </mt-field>
      <a class="mint-cell mint-field must">
        <div class="mint-cell-wrapper username input_arrow" @click="openPicker('cityAddressPicker')">
          <div class="mint-cell-text">
            <span>单位所在地<i class="red">*</i></span>
          </div>
          <div class="mint-cell-value">
            <span v-text="registerData.part"></span>
          </div>
        </div>
      </a>
      <mt-field @click.native="focus" label="详细地址" placeholder="请输入详细地址" class="must" v-model="registerData.workAddress" disableClear>
        <i class="red">*</i>
      </mt-field>
      <div class="submit-wrap" @click="registerHandler">
        <mu-raised-button label="注册" class="reg-button" primary/>
      </div>
      <p class="yyMP" @click="gotoYYMP">点击“注册”，即同意《牙医abc注册协议》</p>
      <!--性别-->
      <mt-actionsheet :actions="sexs" v-model="sexVisible" v-show="sexVisible" cancel-text="取消"></mt-actionsheet>
      <!--出生日期选择框-->
      <birth-date-picker ref="birthDatePicker" @birthdatechange="saveBirthDate"></birth-date-picker>
      <!--城市选择框-->
      <address-picker ref="cityAddressPicker" @addresschange="saveAddress"></address-picker>
    </div>
  </div>
</template>

<script>
  import {Picker, Toast, Indicator, MessageBox, Field} from 'mint-ui'
  import util from '../../../vuex/util'
  import {tokenMethods} from '../../../vuex/util'
  import birthDatePicker from '../../wx_user/birthDatePicker.vue'
  import addressPicker from '../../wx_user/addressPicker.vue'
  import {GET_UPLOAD_TOKEN} from '../../../vuex/types'
  var crypto = require('crypto')
  export default {
    name: 'inviteRegist',
    data() {
      return {
        qiNiuToken: {},
        sexVisible: false,
        typeVisible: false,
        qiNiuConfig: {
          url: 'http://upload-z2.qiniu.com/',
          ShUrl: 'http://orl5769dk.bkt.clouddn.com/'
        },
        pwd_input: true,
        rg_hYzm: true,
        rg_Yzm1: '',
        rg_Yzm: '获取验证码',
        registerData: {
          phone: '',
          rg_code: '',
          password: '',
          trueName: '',
          sex: 1,
          sexText: '男',
          birthday: '1970-01-01',
          type: 1,
          companyName: '',
          state: 0,
          part: '北京/北京市/东城区',
          workAddress: '',
        },
        sexs: [{
          name: '男',
          method: this.selectMan
        }, {
          name: '女',
          method: this.selectWoman
        }],
      }
    },
    components: {
      addressPicker,
      birthDatePicker
    },
    created() {
      this.mBack("back");
      //获取七牛token,防止重复请求
      this.$store.dispatch(GET_UPLOAD_TOKEN).then(res => {
        this.qiNiuToken = {
          token: res.msg
        }
      })
    },
    mounted() {
      window.onresize = function(){
        console.log(window.innerHeight)
      }
    },
    methods: {
      focus(event) {
        let target = ''
        if (event.target.className === 'mint-cell-wrapper') {
          target = event.target
          // console.log(event.target)
        }
        else if (event.target.className === 'mint-cell-title') {
          target = event.target.parentNode
          // console.log(event.target.parentNode)
        } else if (event.target.className === 'mint-cell-text') {
          target = event.target.parentNode.parentNode
          // console.log(event.target.parentNode.parentNode)
        } else {
          return false
        }
        target.children[1].children[0].focus()
      },
      tabpwdHandler() {
        this.pwd_input = !this.pwd_input
      },
      registerHandler() {
        var params = {};
        var md5sum = crypto.createHash('md5')
        md5sum.update(this.registerData.password)
        var strPwd = md5sum.digest('hex')

        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        //个人
        if (this.registerData.type === 1) {
          params = {
            phone: this.registerData.phone,
            code: this.registerData.rg_code,
            pwd: strPwd,
            trueName: this.registerData.trueName,
            sex: this.registerData.sex,
            birthday: this.registerData.birthday,
            userType: this.$route.query.type,
            userId:this.$route.query.userId,
          }
          params['certification.type'] = this.registerData.type;
          params['certification.companyName'] = this.registerData.companyName;
          params['certification.part'] = this.registerData.part;
          params['certification.workAddress'] = this.registerData.workAddress;
        } else {
          //机构
          params = {
            phone: this.registerData.phone,
            code: this.registerData.rg_code,
            pwd: strPwd,
            trueName: this.registerData.trueName,
            sex: this.registerData.sex,
            birthday: this.registerData.birthday,
            userType: this.$route.query.type,
            userId:this.$route.query.userId,
          }
          params['certification.type'] = this.registerData.type;
          params['certification.companyName'] = this.registerData.companyName;
          params['certification.part'] = this.registerData.part;
          params['certification.workAddress'] = this.registerData.workAddress;
        }
        switch (true) {
          case !(this.registerData.phone && mb.test(this.registerData.phone)):
            Toast({message: '请输入正确的手机号', duration: 4000});
            return
          case !(this.registerData.rg_code && this.registerData.rg_code.length === 4):
            Toast({message: '请输入正确的验证码', duration: 4000});
            return
          case !(this.registerData.password && this.registerData.password.length > 5 && this.registerData.password.length < 17):
            Toast({message: '密码只能为6到16位', duration: 4000});
            return
          case !this.registerData.trueName:
            Toast({message: '请填写您的真实姓名', duration: 4000});
            return
          case !this.registerData.companyName:
            Toast({message: '请填写您的单位名称', duration: 4000});
            return
          case !this.registerData.part:
            Toast({message: '请选择您的单位所在地', duration: 4000});
            return
          case !this.registerData.workAddress:
            Toast({message: '请填写您的单位详细地址', duration: 4000});
            return
          default:
            break
        }
        Indicator.open();
        this.$store.dispatch('REGISTER_MSG', params).then(res => {
          Indicator.close()
          if (res.data.callStatus === 'SUCCEED') {
            Toast('恭喜您，注册成功')
            Indicator.close();
            try{
              tokenMethods.setWapToken(res.data.token)
              tokenMethods.setWapUser(res.data.data)
              this.$router.push({name: 'index', params: {redPacket: true}})
            }catch(e){
              console.log(e)
            }
            this.$destroy(true)
          } else {
            Toast(res.data.msg)
          }
        })
      },
      rg_hasYzm(rg_mobilephone) {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var sec = 60;
        if (that.registerData.phone === '' || !mb.test(that.registerData.phone)) {
          Toast('请输入正确的手机号');
        } else {
          var params = {phone: that.registerData.phone, type: 1}
          this.$store.dispatch('GET_IDENTICODE', params).then(res => {
            if (res.data.callStatus === 'SUCCEED') {
              for (let i = 0; i <= 60; i++) {
                window.setTimeout(function () {
                  if (sec != 0) {
                    that.rg_hYzm = false;
                    that.rg_Yzm1 = sec + "秒后重发";
                    sec--;
                  } else {
                    sec = 60;//如果倒计时结束就让  获取验证码显示出来
                    that.rg_hYzm = true;
                    that.rg_Yzm = '获取验证码';
                  }
                }, i * 1000)
              }
            } else if (res.data.errorCode === "Username_Already_Exist") {
              Toast('该手机号已存在！请直接登录');
            } else {
              Toast('获取验证码失败');
            }
          })
        }
      },
      openPicker(name) {
        this.$refs[name].open()
      },
      saveAddress(e) {
        let part = e.split(' ').join('/')
        this.registerData.part = part
      },
      saveBirthDate(value) {
        this.registerData.birthday = value
      },
      fillZero(val) {
        return val < 10 ? '0' + val : val
      },
      open(picker) {
        this.dateValue = this.registerData.birthday
        this.$refs[picker].open()
      },
      selectMan() {
        this.registerData.sex = 1
        this.registerData.sexText = '男'
      },
      selectWoman() {
        this.registerData.sex = 2
        this.registerData.sexText = '女'
      },
      selectPerson() {
        this.registerData.type = 1
        this.registerData.typeText = '个人'
      },
      selectOutfit() {
        this.registerData.type = 2
        this.registerData.typeText = '机构'
      },
      back() {
        this.$router.go(-1)
      },
      gotoYYMP() {
        this.$router.push('/yyMP');
        window.scroll(0, 0)
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .form-wrap .mint-cell-wrapper {
    background-image: none !important;
  }
  .must{
    border-bottom: px2vw(1) solid rgb(229,229,229);
  }
  .must .mint-cell-wrapper .mint-cell-text{
    margin-left: px2vw(14)
  }
  .edit-info .el-upload, .input_arrow .mint-cell-value{
    position: relative;
    background: url(../../../images/mine/back.png) no-repeat;
    background-position: center right;
    background-size: px2vw(16) px2vw(30);
  }
  .mint-cell-value .mint-field-other{
    position: static;
  }
  .mint-cell-text{
    font-size: px2vw(28) !important;
  }
  .invite-formWrap {
    // position: fixed;
    // position: absolute;
    // top: px2vw(88);
    // bottom: 0;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .code_btn {
      font-size: px2vw(26);
      height: px2vw(88);
      line-height: px2vw(88);
      display: inline-block;
      color: #207bce;
    }
    .pwd_eye {
      .eye_btn {
        width: px2vw(88);
        height: px2vw(88);
        position: relative;
        img {
          width: px2vw(30);
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
      }
    }
    .username .mint-cell-value{
      margin-left: px2vw(-14);
    }
    .mint-cell-title, .mint-cell-text {
      min-width: px2vw(340);
      font-size: px2vw(30) !important;
    }
    .mint-cell-value {
      font-size: px2vw(26);
    }
    input[type="text"], input[type="password"] {
      border: none;
      padding: 0;
      margin: 0;
      font-size: px2vw(28);
    }
    .avatar-uploader {
      width: 100%;
      height: px2vw(200);
      line-height: px2vw(200);
      .el-upload {
        width: 100%;
        text-align: left;
        padding-top: px2vw(28);
        .mint-cell-text {
          height: px2vw(88);
          line-height: px2vw(88);
        }
        i {
          width: px2vw(150);
          height: px2vw(150);
          line-height: px2vw(150);
          font-size: px2vw(40);
          color: #8c939d;
          border: 1px dashed #d9d9d9;
          text-align: center;
        }
        img {
          width: px2vw(150);
          height: px2vw(150);
          line-height: px2vw(150);
        }
      }
    }
  }
  span{
    vertical-align: middle
  }
</style>
<style scoped lang="scss">
@import "../../../common/sass/factory";
.logIn_header {
  padding-bottom: 0;
  position: fixed;
  top: 0;
  left: 0;
  .logWithCode{
    width: px2vw(300)
  }
}
.invite-info{
  margin-top: px2vw(88);
  padding-top: px2vw(39);
  width: 100%;
  height: px2vw(240);
  text-align: center;
  background: #fff;
  font-family: 'PingFangSC-Regular';
  color: rgb(51,51,51);
  span{
    color: rgb(216,30,6);
  }
  .info-one{
    height: px2vw(25);
    line-height: px2vw(25);
    font-size: px2vw(26);
    color: rgb(0,90,171);
  }
  .info-two{
    margin-top: px2vw(40);
    height: px2vw(34);
    line-height: px2vw(34);
    font-size: px2vw(36);
  }
  .info-three{
    margin-top: px2vw(24);
    height: px2vw(28);
    line-height: px2vw(28);
    font-size: px2vw(30);
  }
}
.invite-text{
  width: 100%;
  height: px2vw(88);
  line-height: px2vw(88);
  text-align: center;
  background: rgb(244,244,244);
  .line{
    display: inline-block;
    margin: 0 px2vw(23);
    width: px2vw(44);
    height: px2vw(2);
    vertical-align: middle;
    background: rgb(153,153,153);
  }
}
.submit-wrap {
  width: 100%;
  margin: px2vw(90) 0 px2vw(30) 0;
  padding: 0 px2vw(20);
  text-align: center;
  .reg-button {
    width: 100%;
    height: px2vw(88);
    font-size: px2vw(32);
    background-color: $themeColor;
  }
}
.yyMP {
  margin: px2vw(10) 0 px2vw(30);
  font-size: px2vw(24);
  text-align: center;
  color: #666;
}
.red{
  position: absolute;
  left: px2vw(20);
  top: px2vw(38);
  color: rgb(216,30,6);
  font-style: normal;
}
</style>
