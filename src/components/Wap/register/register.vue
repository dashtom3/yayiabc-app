<template>
  <div class="">
    <div class="logIn_header">
      <div class="header_box" @click="back">
        <img class="header_back" src="../../../images/logIn/back3.png" alt="img">
      </div>
      <span class="logWithCode">注册</span>
    </div>
    <div class="formWrap form-wrap">
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
      <!-- <a class="mint-cell mint-field">
        <div class="mint-cell-wrapper input_arrow" @click="sexVisible = true">
          <div class="mint-cell-text">
            <span>性别</span>
          </div>
          <div class="mint-cell-value">
            <span v-text="registerData.sexText"></span>
          </div>
        </div>
      </a> -->
      <!-- <a class="mint-cell mint-field">
        <div class="mint-cell-wrapper needclick input_arrow" @click="openPicker('birthDatePicker')">
          <div class="mint-cell-text">
            <span>出生日期</span>
          </div>
          <div class="mint-cell-value">
            <span v-text="registerData.birthday"></span>
          </div>
        </div>
      </a> -->
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
      <!-- <a class="mint-cell mint-field">
        <div class="mint-cell-wrapper input_arrow" @click="typeVisible = true">
          <div class="mint-cell-text">
            <span>类型</span>
          </div>
          <div class="mint-cell-value">
            <span v-text="registerData.typeText"></span>
          </div>
        </div>
      </a> -->
      <!-- <div class="mint-cell-wrapper" v-show="registerData.typeText === '个人'">
        <el-upload
          class="avatar-uploader needclick"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile10"
          :data="qiNiuToken"
        >
          <div class="mint-cell-text fl head-wrap">口腔执业医生资格证</div>
          <img v-if="registerData.imageUrl_doctorPic" :src="registerData.imageUrl_doctorPic" class="avatar fl">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
      </div>
      <div class="mint-cell-wrapper" v-show="registerData.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile1"
          :data="qiNiuToken"
        >
          <div class="mint-cell-text fl head-wrap">医疗机构执业许可证</div>
          <img v-if="registerData.imageUrl_medical" :src="registerData.imageUrl_medical" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
      </div>
      <div class="mint-cell-wrapper" v-show="registerData.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile2"
          :data="qiNiuToken"
        >
          <div class="mint-cell-text fl head-wrap">营业执照</div>
          <img v-if="registerData.imageUrl_business" :src="registerData.imageUrl_business" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
      </div>
      <div class="mint-cell-wrapper" v-show="registerData.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile3"
          :data="qiNiuToken"
        >
          <div class="mint-cell-text fl head-wrap">税务登记证</div>
          <img v-if="registerData.imageUrl_tax" :src="registerData.imageUrl_tax" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
      </div>
      <div class="mint-cell-wrapper" v-show="registerData.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile4"
          :data="qiNiuToken"
        >
          <div class="mint-cell-text fl head-wrap">开户许可证</div>
          <img v-if="registerData.imageUrl_open_permit" :src="registerData.imageUrl_open_permit" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
      </div>
      <div class="mint-cell-wrapper" v-show="registerData.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile5"
          :data="qiNiuToken"
        >
          <div class="mint-cell-text fl head-wrap">医师职业资格证</div>
          <img v-if="registerData.imageUrl_doctor" :src="registerData.imageUrl_doctor" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
      </div>
      <div class="mint-cell-wrapper" v-show="registerData.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile6"
          :data="qiNiuToken"
        >
          <div class="mint-cell-text fl head-wrap">放射诊疗许可证</div>
          <img v-if="registerData.imageUrl_treatment" :src="registerData.imageUrl_treatment" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
      </div>
      <div class="mint-cell-wrapper" v-show="registerData.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile7"
          :data="qiNiuToken"
        >
          <div class="mint-cell-text fl head-wrap">法人身份证（正面）</div>
          <img v-if="registerData.imageUrl_id_front" :src="registerData.imageUrl_id_front" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
      </div>
      <div class="mint-cell-wrapper" v-show="registerData.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile8"
          :data="qiNiuToken"
        >
          <div class="mint-cell-text fl head-wrap">法人身份证（反面）</div>
          <img v-if="registerData.imageUrl_id_back" :src="registerData.imageUrl_id_back" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
      </div> -->
      <mt-field @click.native="focus" label="邀请人ID" class="must" placeholder="邀请人ID" :readonly="inviteTrue" v-model="registerData.id" v-if="registerData.id != null">
        <!-- <i class="red">*</i> -->
      </mt-field>
      <div class="submit-wrap" @click="registerHandler">
        <mu-raised-button label="注册" class="reg-button" primary/>
      </div>
      <p class="yyMP" @click="gotoYYMP">点击“注册”，即同意《牙医abc注册协议》</p>
      <!--性别-->
      <mt-actionsheet :actions="sexs" v-model="sexVisible" v-show="sexVisible" cancel-text="取消"></mt-actionsheet>
      <!--类型-->
      <mt-actionsheet :actions="types" v-model="typeVisible" v-show="typeVisible" cancel-text="取消"></mt-actionsheet>
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
    name: 'register',
    data() {
      return {
        qiNiuToken: {},
        sexVisible: false,
        typeVisible: false,
        qiNiuConfig: {
          url: 'http://upload-z2.qiniu.com/',
          ShUrl: 'http://orl5769dk.bkt.clouddn.com/'
        },
        inviteTrue: true,
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
          typeText: '个人',
          companyName: '',
          state: 0,
          part: '北京/北京市/东城区',
          workAddress: '',
          imageUrl_doctorPic: '',
          imageUrl_head: '',
          imageUrl_doctor: '',
          imageUrl_medical: '',
          imageUrl_business: '',
          imageUrl_tax: '',
          imageUrl_open_permit: '',
          imageUrl_treatment: '',
          imageUrl_id_front: '',
          imageUrl_id_back: '',
          id:null,
          userType:1
        },
        sexs: [{
          name: '男',
          method: this.selectMan
        }, {
          name: '女',
          method: this.selectWoman
        }],
        types: [{
          name: '个人',
          method: this.selectPerson
        }, {
          name: '机构',
          method: this.selectOutfit
        }]
      }
    },
    components: {
      addressPicker,
      birthDatePicker
    },
    created() {
      this.mBack("back");
      this.registerData.id = this.$route.query.userId
      this.registerData.userType = this.$route.query.userType != null ? this.$route.query.userType : 1
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
        let target = '';
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
            userType: this.registerData.userType,
            id:this.registerData.id
          }
          params['certification.type'] = this.registerData.type;
          params['certification.companyName'] = this.registerData.companyName;
          params['certification.part'] = this.registerData.part;
          params['certification.workAddress'] = this.registerData.workAddress;
          // params['certification.doctorPic'] = this.registerData.imageUrl_doctorPic;
        } else {
          //机构
          params = {
            phone: this.registerData.phone,
            code: this.registerData.rg_code,
            pwd: strPwd,
            trueName: this.registerData.trueName,
            sex: this.registerData.sex,
            birthday: this.registerData.birthday,
            userType: 1
          }
          params['certification.type'] = this.registerData.type;
          params['certification.companyName'] = this.registerData.companyName;
          params['certification.part'] = this.registerData.part;
          params['certification.workAddress'] = this.registerData.workAddress;
          // params['certification.doctorPic'] = this.registerData.imageUrl_doctor;
          // params['certification.medicalLicense'] = this.registerData.imageUrl_medical;
          // params['certification.businessLicense'] = this.registerData.imageUrl_business;
          // params['certification.taxRegistration'] = this.registerData.imageUrl_tax;
          // params['certification.openingPermit'] = this.registerData.imageUrl_open_permit;
          // params['certification.radiologicalPermit'] = this.registerData.imageUrl_treatment;
          // params['certification.idCardPositive'] = this.registerData.imageUrl_id_front;
          // params['certification.idCardOtherside'] = this.registerData.imageUrl_id_back;
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
            // MessageBox({
            //   title:'注册成功',
            //   message:'现在完善资质信息，赠您60乾币！(首单满120元)，可直接抵扣60元',
            //   confirmButtonText:"立即认证",
            //   cancelButtonText:"下次再说",
            //   showCancelButton: true
            // });
            MessageBox.confirm("现在完善资质信息，赠您60乾币！(首单满120元)，可直接抵扣60元,是否前往？",'注册成功').then(action => {
                 window.location.href = "#/account/qualifications";
            })
            Indicator.close();
            try{
              tokenMethods.setWapToken(res.data.token)
              tokenMethods.setWapUser(res.data.data)
              this.$router.push({name: 'index', params: {redPacket: true}})
              // sessionStorage.setItem("redPacket", true);
            }catch(e){
              console.log(e)
            }
            this.$destroy(true)
            // this.$router.push('/')
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
      // uploadFile(res, file) {
      //   this.registerData.imageUrl_head = this.qiNiuConfig.ShUrl + file.response.key
      // },
      // uploadFile1(res, file) {
      //   this.registerData.imageUrl_medical = this.qiNiuConfig.ShUrl + file.response.key
      // },
      // uploadFile2(res, file) {
      //   this.registerData.imageUrl_business = this.qiNiuConfig.ShUrl + file.response.key
      // },
      // uploadFile3(res, file) {
      //   this.registerData.imageUrl_tax = this.qiNiuConfig.ShUrl + file.response.key
      // },
      // uploadFile4(res, file) {
      //   this.registerData.imageUrl_open_permit = this.qiNiuConfig.ShUrl + file.response.key
      // },
      // uploadFile5(res, file) {
      //   this.registerData.imageUrl_doctor = this.qiNiuConfig.ShUrl + file.response.key
      // },
      // uploadFile6(res, file) {
      //   this.registerData.imageUrl_treatment = this.qiNiuConfig.ShUrl + file.response.key
      // },
      // uploadFile7(res, file) {
      //   this.registerData.imageUrl_id_front = this.qiNiuConfig.ShUrl + file.response.key
      // },
      // uploadFile8(res, file) {
      //   this.registerData.imageUrl_id_back = this.qiNiuConfig.ShUrl + file.response.key
      // },
      // uploadFile10(res, file) {
      //   this.registerData.imageUrl_doctorPic = this.qiNiuConfig.ShUrl + file.response.key
      // },
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
  .formWrap {
    position: fixed;
    // position: absolute;
    top: px2vw(88);
    bottom: 0;
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
</style>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .logIn_header {
    padding-bottom: 0;
    position: absolute;
    top: 0;
    left: 0;
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
