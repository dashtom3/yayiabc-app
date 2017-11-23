<template>
  <div class="personal_data">
    <div class="logIn_header">
      <div class="header_box" @click="back">
        <img class="header_back" src="../../../images/logIn/back.png" alt="img">
      </div>
      <span class="logWithCode">个人资料</span>
      <span class="submit-btn" @click="savePersonInfo">保存</span>
    </div>
    <div class="edit-info">
      <!--头像-->
      <div class="mint-cell-wrapper ml" style="background-image: none;">
        <el-upload
          class="avatar-uploader head-upload needclick"
          :disabled="ifPass"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile"
          :data="qiNiuToken"
          >
          <div class="mint-cell-text fl head-wrap">头像</div>
          <img v-if="personInfo.imageUrl_head" :src="personInfo.imageUrl_head" class="avatar head-img">
          <!-- <img v-else src="../../../images/mine/loadUserImg3.png" alt="img" class="head-img"> -->
          <img v-else src="static/images/defaultPic.png" alt="img" class="head-img">
        </el-upload>
      </div>
      <!--用户名-->
      <mt-field class="ml" label="用户名" placeholder="请输入用户名" v-model="personInfo.phone" readonly disableClear></mt-field>
      <!--真实姓名-->
      <div class="must-wrapper">
        <span class="must">*</span>
        <mt-field @click.native="focus" label="真实姓名" placeholder="请输入真实姓名" class="input_arrow pl" v-model="personInfo.trueName" disableClear></mt-field>
      </div>
      <!--性别-->
      <a class="mint-cell mint-field input_arrow pl bb select">
        <div class="mint-cell-wrapper" @click="sexVisible = true && !ifPass">
          <div class="mint-cell-text">
            <span>性别</span>
          </div>
          <div class="mint-cell-value">
            <span v-text="personInfo.sexText" class="unset"></span>
          </div>
        </div>
      </a>
      <!--出生日期-->
      <a class="mint-cell mint-field input_arrow pl select">
        <div class="mint-cell-wrapper needclick" @click="openPicker('birthDatePicker')">
          <div class="mint-cell-text">
            <span>出生日期</span>
          </div>
          <div class="mint-cell-value">
            <span v-text="personInfo.birthday" class="unset"></span>
          </div>
        </div>
      </a>
      <!--单位名称-->
      <div class="must-wrapper">
        <span class="must">*</span>
        <mt-field @click.native="focus" label="单位名称" class="input_arrow pl" placeholder="请输入单位名称" v-model="personInfo.companyName" disableClear></mt-field>
      </div>
      <!--详细地址-->
      <div class="must-wrapper btm-border">
        <span class="must">*</span>
        <mt-field @click.native="focus" label="单位地址" class="input_arrow pl" placeholder="请输入详细地址" v-model="personInfo.workAddress" disableClear></mt-field>
      </div>
      <!--性别-->
      <mt-actionsheet :actions="sexs" v-model="sexVisible" v-show="sexVisible  && isEdit" cancel-text="取消"></mt-actionsheet>
      <!--类型-->
      <!-- <mt-actionsheet :actions="types" v-model="typeVisible" v-show="typeVisible && isEdit" cancel-text="取消"></mt-actionsheet> -->
      <!--出生日期选择框-->
      <birth-date-picker ref="birthDatePicker" @birthdatechange="saveBirthDate"></birth-date-picker>
      <!--城市选择框-->
      <!-- <address-picker ref="cityAddressPicker" @addresschange="saveAddress"></address-picker> -->
    </div>
  </div>
</template>
<script>
  import { Picker, Toast, MessageBox, Field } from 'mint-ui'
  import util from '../../../vuex/util'
  import { tokenMethods } from '../../../vuex/util'
  import birthDatePicker from '../../wx_user/birthDatePicker.vue'
  import addressPicker from '../../wx_user/addressPicker.vue'
  import { GET_UPLOAD_TOKEN } from '../../../vuex/types'
  export default {
    name: 'personalData',
    data () {
      return {
        isEdit: false,
        qiNiuToken: {},
        audited_validate: false,
        pending_validate: false,
        sexVisible: false,
        ifPass: false,
        typeVisible: false,
        imageUrl: '',
        qiNiuConfig: {
          url: 'http://upload-z2.qiniu.com/',
          ShUrl: 'http://orl5769dk.bkt.clouddn.com/'
        },
        personInfo: {
          phone: tokenMethods.getWapUser().phone,
          trueName: '',
          sex: '1',
          sexText: '男',
          birthday: '请选择日期',
          type: '1',
          typeText: '个人',
          companyName: '',
          judge: 0,
          state: 0,
          part: '',
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
      //获取七牛token,防止重复请求
      this.$store.dispatch(GET_UPLOAD_TOKEN).then(res => {
        this.qiNiuToken = {
          token: res.msg
        }
      });
      this.queryHandler();
      this.mBack("back");
    },
    methods: {
      editHandler(){
        this.isEdit = true
      },
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
        }
        target.children[1].children[0].focus()
      },
      queryHandler(){
        var that = this
        var obj = {
          phone: tokenMethods.getWapUser().phone,
          token: tokenMethods.getWapToken()
        }
        that.$store.dispatch('GET_PERSON_LIST', obj).then((res) => {
          if (res.callStatus === 'SUCCEED') {
            this.personInfo.trueName = res.data.trueName
            this.personInfo.birthday = res.data.birthday && util.formatDate.format(new Date(res.data.birthday)) || util.formatDate.format(new Date('1970-01-01'))
            this.personInfo.sex = res.data.sex && res.data.sex.toString() || '1'
            this.personInfo.companyName = res.data.companyName
            this.personInfo.type = res.data.type && res.data.type.toString() || '1'
            this.personInfo.part = res.data.part && res.data.part.split(',').join('/') || '北京/北京市/东城区'
            this.personInfo.workAddress = res.data.workAddress
            this.personInfo.judge = res.data.judge
            this.personInfo.state = res.data.state
            this.personInfo.failReason = res.data.failReason || '无'
            this.personInfo.trueName = res.data.trueName
            this.personInfo.state = res.data.state
            this.personInfo.imageUrl_doctorPic = res.data.doctorPic
            this.personInfo.imageUrl_head = res.data.userPic
            this.personInfo.imageUrl_doctor = res.data.doctorPic
            this.personInfo.imageUrl_medical = res.data.medicalLicense
            this.personInfo.imageUrl_business = res.data.businessLicense
            this.personInfo.imageUrl_tax = res.data.taxRegistration
            this.personInfo.imageUrl_open_permit = res.data.openingPermit
            this.personInfo.imageUrl_treatment = res.data.radiologicalPermit
            this.personInfo.imageUrl_id_front = res.data.idCardPositive
            this.personInfo.imageUrl_id_back = res.data.idCardOtherside
            this.ert(this.personInfo.failReason);
            //集中处理图片
            this.imageUrl_list =[{
              title: '口腔执业医生资格证',
              url: this.personInfo.imageUrl_doctorPic
            },{
              title: '医疗机构执业许可证',
              url: this.personInfo.imageUrl_medical
            },{
              title: '营业执照',
              url: this.personInfo.imageUrl_business
            },{
              title: '税务登记证',
              url: this.personInfo.imageUrl_tax
            },{
              title: '开户许可证',
              url: this.personInfo.imageUrl_open_permit
            },{
              title: '医师职业资格证',
              url: this.personInfo.imageUrl_doctorPic
            },{
              title: '放射诊疗许可证',
              url: this.personInfo.imageUrl_treatment
            },{
              title: '法人身份证（正面）',
              url: this.personInfo.imageUrl_id_front
            },{
              title: '法人身份证（反面）',
              url: this.personInfo.imageUrl_id_back
            }]

            if(this.personInfo.sex === '1'){
              this.personInfo.sexText ='男'
            }else if(this.personInfo.sex === '2'){
              this.personInfo.sexText ='女'
            }

            if(this.personInfo.type === '1'){
              this.personInfo.typeText = '个人'
              this.imageUrl_list = this.imageUrl_list.slice(0, 1)
            }else if(this.personInfo.type === '2'){
              this.personInfo.typeText = '机构'
              this.imageUrl_list = this.imageUrl_list.slice(1)
            }
          }
        })
      },
      saveJudge(){
        var params = {
          phone: tokenMethods.getWapUser().phone,
          token: tokenMethods.getWapToken(),
          type: this.personInfo.type,
          companyName: this.personInfo.companyName,
          part: this.personInfo.part,
          workAddress: this.personInfo.workAddress,
          judge: this.personInfo.judge
        }
        //保存个人信息
        this.$store.dispatch('SAVE_CERTIFICATION', params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.ifPass = true
          }
        })
      },
      //保存个人信息
      savePersonInfo(){
        var params = {}
        //个人时
        if(this.personInfo.typeText === '个人'){
          params = {
            phone: tokenMethods.getWapUser().phone,
            token: tokenMethods.getWapToken(),
            trueName: this.personInfo.trueName,
            sex: this.personInfo.sex,
            birthday: this.personInfo.birthday && util.formatDate.format(new Date(this.personInfo.birthday)) || '1970-01-01',
            userPic: this.personInfo.imageUrl_head,
            type: this.personInfo.type,
            companyName: this.personInfo.companyName,
            part: this.personInfo.part,
            workAddress: this.personInfo.workAddress,
            doctorPic: this.personInfo.imageUrl_doctorPic,//医师职业资格证
            medicalLicense: '',//医疗机构执业许可证
            businessLicense: '',//营业执照
            taxRegistration: '',//税务登记证
            openingPermit: '',//开户许可证
            radiologicalPermit: '',//放射诊疗许可证
            idCardPositive: '',//法人身份证（正面）
            idCardOtherside: '',//法人身份证（反面）
            judge: this.personInfo.judge
          }
        }else{
          params = {
            phone: tokenMethods.getWapUser().phone,
            token: tokenMethods.getWapToken(),
            trueName: this.personInfo.trueName,
            sex: this.personInfo.sex,
            birthday: this.personInfo.birthday && util.formatDate.format(new Date(this.personInfo.birthday)) || '1970-01-01',
            userPic: this.personInfo.imageUrl_head,
            type: this.personInfo.type,
            companyName: this.personInfo.companyName,
            part: this.personInfo.part,
            workAddress: this.personInfo.workAddress,
            doctorPic: this.personInfo.imageUrl_doctor,//医师职业资格证
            medicalLicense: this.personInfo.imageUrl_medical,//医疗机构执业许可证
            businessLicense: this.personInfo.imageUrl_business,//营业执照
            taxRegistration: this.personInfo.imageUrl_tax,//税务登记证
            openingPermit: this.personInfo.imageUrl_open_permit,//开户许可证
            radiologicalPermit: this.personInfo.imageUrl_treatment,//放射诊疗许可证
            idCardPositive: this.personInfo.imageUrl_id_front,//法人身份证（正面）
            idCardOtherside: this.personInfo.imageUrl_id_back,//法人身份证（反面）
            judge: this.personInfo.judge
          }
        }
        //验证姓名
        if(this.personInfo.trueName === '' || this.personInfo.trueName === null){
          Toast('请输入姓名')
          return
        }
        //验证单位名称
        if(this.personInfo.companyName === '' || this.personInfo.companyName === null){
          Toast('请输入单位名称')
          return
        }
        //验证详细地址
        if(this.personInfo.workAddress === '' || this.personInfo.workAddress === null){
          Toast('请输入详细地址')
          return
        }
        if(this.personInfo.type === '1'){
          //验证医师职业资格证
          if(this.personInfo.imageUrl_doctorPic === '' || this.personInfo.imageUrl_doctorPic === null){
            Toast('请上传口腔执业医师资格证')
            return
          }
        }else{
          //验证医疗机构执业许可证
          if(this.personInfo.imageUrl_medical === '' || this.personInfo.imageUrl_medical === null){
            Toast('请上传医疗机构执业许可证')
            return
          }
          //验证营业执照
          if(this.personInfo.imageUrl_business === '' || this.personInfo.imageUrl_business === null){
            Toast('请上传营业执照')
            return
          }
          //验证税务登记证
          if(this.personInfo.imageUrl_tax === '' || this.personInfo.imageUrl_tax === null){
            Toast('请上传税务登记证')
            return
          }
        }

        //保存个人信息
        this.$store.dispatch('SAVE_PERSON_LIST', params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.$store.dispatch('SAVE_CERTIFICATION', params).then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                Toast('您的认证信息我们会尽快审核，请耐心等待~');
                this.queryHandler()
                this.ifPass = true;
                this.isEdit = false;
                this.pending_validate = true;
              }
            })
          }
        });
      },
      uploadFile(res, file) {
        this.personInfo.imageUrl_head = this.qiNiuConfig.ShUrl + file.response.key
      },
      uploadFile1(res, file) {
        this.personInfo.imageUrl_medical = this.qiNiuConfig.ShUrl + file.response.key
      },
      uploadFile2(res, file) {
        this.personInfo.imageUrl_business = this.qiNiuConfig.ShUrl + file.response.key
      },
      uploadFile3(res, file) {
        this.personInfo.imageUrl_tax = this.qiNiuConfig.ShUrl + file.response.key
      },
      uploadFile4(res, file) {
        this.personInfo.imageUrl_open_permit = this.qiNiuConfig.ShUrl + file.response.key
      },
      uploadFile5(res, file) {
        this.personInfo.imageUrl_doctor = this.qiNiuConfig.ShUrl + file.response.key
      },
      uploadFile6(res, file) {
        this.personInfo.imageUrl_treatment = this.qiNiuConfig.ShUrl + file.response.key
      },
      uploadFile7(res, file) {
        this.personInfo.imageUrl_id_front = this.qiNiuConfig.ShUrl + file.response.key
      },
      uploadFile8(res, file) {
        this.personInfo.imageUrl_id_back = this.qiNiuConfig.ShUrl + file.response.key
      },
      uploadFile10(res, file) {
        this.personInfo.imageUrl_doctorPic = this.qiNiuConfig.ShUrl + file.response.key
      },
      openPicker(name) {
        this.$refs[name].open()
      },
      saveAddress(e) {
        let part = e.split(' ').join('/')
        this.personInfo.part = part
      },
      ert:function(msg){
        if(this.personInfo.state===1 && (this.personInfo.judge===0 || this.personInfo.judge===null)){
          MessageBox.confirm('您的认证信息我们会尽快审核，请耐心等待~').then(action => {
            //提交后台改变状态
            this.personInfo.judge = 1;
            this.saveJudge();
          }).catch(err => {
          })
          this.ifPass = true;
          this.audited_validate = false;
          this.pending_validate = true;
        }else if(this.personInfo.state===1 && this.personInfo.judge===1){
          this.ifPass = true;
          this.audited_validate = false;
          this.pending_validate = true;
        }else if(this.personInfo.state===2 && this.personInfo.judge===0){
          MessageBox.confirm('您的认证信息已审核通过').then(action => {
            //提交后台改变状态
            this.personInfo.judge = 1;
            this.saveJudge();
          }).catch(err => {
          })
          this.ifPass = true;
          this.audited_validate = true;
          this.pending_validate = false;
        }else if(this.personInfo.state===2 && this.personInfo.judge===1){
          this.ifPass = true;
          this.audited_validate = true;
          this.pending_validate = false;
        }else if(this.personInfo.state===3 && this.personInfo.judge===0){
          MessageBox.confirm('抱歉，您的认证信息审核不通过，原因：'+ msg +',请重新填写！').then(action => {
            this.ifPass = false
          }).catch(err => {
          });
        }
      },
      saveBirthDate: function (value) {
        this.personInfo.birthday = value
      },
      fillZero: function(val){
        return val<10 ? '0'+ val : val
      },
      selectMan: function () {
        this.personInfo.sex = '1'
        this.personInfo.sexText = '男'
      },
      selectWoman: function () {
        this.personInfo.sex = '2'
        this.personInfo.sexText = '女'
      },
      selectPerson: function(){
        this.personInfo.type = '1'
        this.personInfo.typeText = '个人'
      },
      selectOutfit: function(){
        this.personInfo.type = '2'
        this.personInfo.typeText = '机构'
      },
      back: function() {
        this.$router.go(-1)
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .edit-info .el-upload, .input_arrow .mint-cell-value{
    background: url(../../../images/mine/back.png) no-repeat;
    background-position: center right;
    background-size: px2vw(16) px2vw(30);
  }
  .text-wrap input{
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .f_wrap{
    position: fixed;
    top: px2vw(88);
    bottom: 0;
    left: 0;
    right: 0;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    &.f_wrap_abs {
      top: px2vw(168);
    }
  }
  .show-info{
    min-height: px2vw(96);
    line-height: px2vw(96);
    img{
      width: px2vw(150);
      height: px2vw(150);
      margin-top: px2vw(28);
    }
  }
  .avatar-uploader{
    width: 100%;
    height: px2vw(200);
    .el-upload{
      width: 100%;
      text-align: left;
      padding-top: px2vw(28);
      .mint-cell-text{
        height: px2vw(88);
        line-height: px2vw(88);
      }
      i{
        width: px2vw(150);
        height: px2vw(150);
        line-height: px2vw(150);
        font-size: px2vw(40);
        color: #8c939d;
        border: 1px dashed #d9d9d9;
        text-align: center;
      }
      img{
        width: px2vw(150);
        height: px2vw(150);
        line-height: px2vw(150);
      }
    }
  }
  .personal_data .ml .mint-cell-wrapper .mint-field-core{
    padding: 0 px2vw(22) 0 0;
  }
  .must-wrapper .mint-cell-wrapper .mint-cell-text{
    padding-left: px2vw(16)
  }
  .personal_data .mint-cell-wrapper{
    padding: 0;
    position: relative;
    input[type="text"]{
      border: none;
      margin: 0;
      text-align: right;
      font-size: px2vw(28);
      color: #333;
    }
    .mint-cell-text{
      width: 170px;
      display: inline-block;
      font-size: px2vw(30);
    }
    .mint-cell-value .unset{
      font-size: px2vw(26);
      text-align: center;
      height: px2vw(96);
      line-height: px2vw(96);
      color: #333;
    }
    .head-img{
      width: px2vw(70);
      height: px2vw(70);
      vertical-align: middle;
      margin-left: px2vw(260);
      border-radius: 50%;
    }
  }
  .head-upload{
    height: px2vw(118);
    padding: 0 px2vw(20) 0 0;
    .el-upload{
      height: px2vw(118);
      line-height: px2vw(118);
      padding-top: 0;
    }
  }
  .personal_data .mint-field-core{
    background-position: center right;
    background-size: px2vw(12) px2vw(26);
  }
  .personal_data .mint-field .mint-cell-title{
    width: 170px;
  }
  .avatar-uploader .el-upload .mint-cell-text.head-wrap{
    height: px2vw(118);
    line-height: px2vw(118);
    text-align: left;
  }
  .personal_data .select .mint-cell-wrapper .mint-cell-value .unset{
    width: 100%;
    text-align: right;
    margin-right: px2vw(30);
  }
  .head-box .el-upload{
    display: block!important;
    height: px2vw(135);
    text-align: left;
    line-height: px2vw(135);
    position: relative;
    img{
      width: px2vw(150);
      height: px2vw(150);
    }
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .personal_data{
    height: 100vh;
  }
  .logIn_header{
    padding-bottom: 0;
    position: fixed;
    z-index: 0;
    top: 0;
  }
  .edit-info{
    // margin-top: px2vw(88);
    position: fixed;
    top: px2vw(88);
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 px2vw(22) 0 0;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .submit-btn{
    color: #fff;
    float: right;
    margin-right: px2vw(28);
  }
  // margin-left
  .ml{
    width: 100%;
    height: px2vw(118);
    margin-left: px2vw(20);
    border-bottom: 1px solid rgb(229,229,229);
  }
  // padding-left
  .pl{
    padding-right: px2vw(22);
    width: px2vw(750);
    height: px2vw(118);
    line-height: px2vw(118);
    padding-left: px2vw(20);
  }
  // border-bottom
  .bb{
    border-bottom: 1px solid rgb(229,229,229)
  }
  .must-wrapper{
    position: relative;
    height: px2vw(118);
    line-height: px2vw(118);
    .must{
      position: absolute;
      top: 0;
      left: px2vw(20);
      font-size: px2vw(30);
      color: rgb(216,30,6);
      z-index: 2000;
    }
  }
  .personal_data .must-wrapper.btm-border{
    border-bottom: 1px solid rgb(229,229,229);
    margin-right: px2vw(-20);
    height: px2vw(122);
  }
  .require{
    height: 100%;
    vertical-align: middle;
    line-height: 100%;
    text-align: center;
    color: #c00;
  }
  .back-btn{
    width: px2vw(88);
    height: px2vw(73);
  }
  .mint-cell-value input{
    font-size: px2vw(28);
  }
  .mint-field .mint-cell-title{
    width: 150px;
  }
  .right-img{
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(px2vw(-10))
  }
  .tips{
    width: 100%;
    height: px2vw(80);
    line-height: px2vw(80);
    padding-left: px2vw(20);
    color: #fff;
    background: #669ccd;
    position: absolute;
    top: px2vw(88);
    z-index: 10;
  }
</style>

