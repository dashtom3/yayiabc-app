<template>
  <div class="personal_data">
    <div class="logIn_header">
      <div class="header_box" @click="back">
        <img class="header_back" src="../../../images/logIn/back.png" alt="img">
      </div>
      <span class="logWithCode">资质认证</span>
      <span class="submit-btn" @click="savePersonInfo">提交</span>
      <!-- <span class="submit-btn" v-show="!ifPass" @click="editHandler">提交</span> -->
    </div>
    <div class="tips" v-show="audited_validate || pending_validate">
      <transition name="shake">
        <p v-show="audited_validate" class="adopt">资质审核通过！</p>
      </transition>
      <transition name="shake">
        <p v-show="pending_validate" class="adopt">您的认证信息我们会尽快审核，请耐心等待~</p>
      </transition>
    </div>
    <div class="f_wrap" v-bind:class="{ f_wrap_abs: (audited_validate || pending_validate) }">
      <!--类型-->
      <a class="mint-cell mint-field bb input_arrow">
        <div class="mint-cell-wrapper" @click="typeVisible = true && !ifPass">
          <div class="mint-cell-text">
            <span><span class="fred">*</span>类型</span>
          </div>
          <div class="mint-cell-value">
            <span v-text="personInfo.typeText" class="unset"></span>
          </div>
        </div>
      </a>
      <!--口腔执业医生资格证-->
      <div class="mint-cell-wrapper" v-show="personInfo.typeText === '个人'">
        <el-upload
          class="avatar-uploader needclick"
          :disabled="ifPass"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile10"
          :data="qiNiuToken"
          >
          <div class="mint-cell-text fl head-wrap"><span class="fred">*</span>口腔执业医生资格证</div>
          <img v-if="personInfo.imageUrl_doctorPic" :src="personInfo.imageUrl_doctorPic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
        <img class="goto" src="../../../images/mine/back.png" alt="">
      </div>
      <!--医疗机构执业许可证-->
      <div class="mint-cell-wrapper bb" v-show="personInfo.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :disabled="ifPass"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile1"
          :data="qiNiuToken"
          >
          <div class="mint-cell-text fl head-wrap"><span class="fred">*</span>医疗机构执业许可证</div>
          <img v-if="personInfo.imageUrl_medical" :src="personInfo.imageUrl_medical" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
        <img class="goto" src="../../../images/mine/back.png" alt="">
      </div>
      <!--营业执照-->
      <div class="mint-cell-wrapper bb" v-show="personInfo.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :disabled="ifPass"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile2"
          :data="qiNiuToken"
          >
          <div class="mint-cell-text fl head-wrap"><span class="fred">*</span>营业执照</div>
          <img v-if="personInfo.imageUrl_business" :src="personInfo.imageUrl_business" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
        <img class="goto" src="../../../images/mine/back.png" alt="">
      </div>
      <!--税务登记证-->
      <div class="mint-cell-wrapper bb" v-show="personInfo.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :disabled="ifPass"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile3"
          :data="qiNiuToken"
          >
          <div class="mint-cell-text fl head-wrap"><span class="fred">*</span>税务登记证</div>
          <img v-if="personInfo.imageUrl_tax" :src="personInfo.imageUrl_tax" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
        <img class="goto" src="../../../images/mine/back.png" alt="">
      </div>
      <!--开户许可证-->
      <div class="mint-cell-wrapper bb" v-show="personInfo.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :disabled="ifPass"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile4"
          :data="qiNiuToken"
          >
          <div class="mint-cell-text fl head-wrap">开户许可证</div>
          <img v-if="personInfo.imageUrl_open_permit" :src="personInfo.imageUrl_open_permit" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
        <img class="goto" src="../../../images/mine/back.png" alt="">
      </div>
      <!--医师职业资格证-->
      <div class="mint-cell-wrapper bb" v-show="personInfo.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :disabled="ifPass"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile5"
          :data="qiNiuToken"
          >
          <div class="mint-cell-text fl head-wrap">医师职业资格证</div>
          <img v-if="personInfo.imageUrl_doctor" :src="personInfo.imageUrl_doctor" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
        <img class="goto" src="../../../images/mine/back.png" alt="">
      </div>
      <!--放射诊疗许可证-->
      <div class="mint-cell-wrapper bb" v-show="personInfo.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :disabled="ifPass"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile6"
          :data="qiNiuToken"
          >
          <div class="mint-cell-text fl head-wrap">放射诊疗许可证</div>
          <img v-if="personInfo.imageUrl_treatment" :src="personInfo.imageUrl_treatment" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
        <img class="goto" src="../../../images/mine/back.png" alt="">
      </div>
      <!--法人身份证（正面）-->
      <div class="mint-cell-wrapper bb" v-show="personInfo.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :disabled="ifPass"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile7"
          :data="qiNiuToken"
          >
          <div class="mint-cell-text fl head-wrap">法人身份证（正面）</div>
          <img v-if="personInfo.imageUrl_id_front" :src="personInfo.imageUrl_id_front" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
        <img class="goto" src="../../../images/mine/back.png" alt="">
      </div>
      <!--法人身份证（反面）-->
      <div class="mint-cell-wrapper" v-show="personInfo.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :disabled="ifPass"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile8"
          :data="qiNiuToken"
          >
          <div class="mint-cell-text fl head-wrap">法人身份证（反面）</div>
          <img v-if="personInfo.imageUrl_id_back" :src="personInfo.imageUrl_id_back" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
        <img class="goto" src="../../../images/mine/back.png" alt="">
      </div>
      <!--类型-->
    </div>
    <mt-actionsheet :actions="types" v-model="typeVisible" v-show="typeVisible && isEdit" cancel-text="取消"></mt-actionsheet>
  </div>
</template>
<script>
  import { Picker, Toast, MessageBox, Field } from 'mint-ui'
  import util from '../../../vuex/util'
  import { tokenMethods } from '../../../vuex/util'
  import { GET_UPLOAD_TOKEN } from '../../../vuex/types'
  export default {
    name: 'personalData',
    data () {
      return {
        isEdit: false,
        qiNiuToken: {},
        audited_validate: false,
        pending_validate: false,
        ifPass: false,
        typeVisible: false,
        imageUrl: '',
        qiNiuConfig: {
          url: 'http://upload-z2.qiniu.com/',
          ShUrl: 'http://orl5769dk.bkt.clouddn.com/'
        },
        imageUrl_list: [{
          title: '口腔执业医生资格证',
          url: ''
        },{
          title: '医疗机构执业许可证',
          url: ''
        },{
          title: '营业执照',
          url: ''
        },{
          title: '税务登记证',
          url: ''
        },{
          title: '开户许可证',
          url: ''
        },{
          title: '医师职业资格证',
          url: ''
        },{
          title: '放射诊疗许可证',
          url: ''
        },{
          title: '法人身份证（正面）',
          url: ''
        },{
          title: '法人身份证（反面）',
          url: ''
        }],
        personInfo: {
          type: '1',
          typeText: '个人',
          judge: 0,
          state: 0,
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
        types: [{
          name: '个人',
          method: this.selectPerson
        }, {
          name: '机构',
          method: this.selectOutfit
        }]
      }
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
            this.personInfo.type = res.data.type && res.data.type.toString() || '1'
            this.personInfo.judge = res.data.judge
            this.personInfo.state = res.data.state
            this.personInfo.failReason = res.data.failReason || '无'
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
            // companyName: this.personInfo.companyName,
            // part: this.personInfo.part,
            // workAddress: this.personInfo.workAddress,
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
            // companyName: this.personInfo.companyName,
            // part: this.personInfo.part,
            // workAddress: this.personInfo.workAddress,
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
        //保存资质审核信息
        this.$store.dispatch('SAVE_CERTIFICATION', params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            Toast('您的认证信息我们会尽快审核，请耐心等待~');
            this.queryHandler()
            this.ifPass = true;
            this.isEdit = false;
            this.pending_validate = true;
          }
        })
        // this.$store.dispatch('SAVE_PERSON_LIST', params).then((res) => {
        //   if (res.data.callStatus === 'SUCCEED') {
            
        //   }
        // });
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
  .personal_data .mint-field-core{
    background-position: center right;
    background-size: px2vw(12) px2vw(26);
  }
  .personal_data .mint-field .mint-cell-title{
    width: 170px;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .personal_data {
    position: relative;
    height: 100vh;
    background: #f4f4f4;
  }
  .logIn_header{
    padding-bottom: 0;
    position: fixed;
    z-index: 2;
    top: 0;
  }
  .f_wrap{
    position: absolute;
    top: px2vw(86);
    left: 0;
    // bottom: 0;
    // right: 0;
    background: #fff;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    &.f_wrap_abs {
      top: px2vw(168);
    }
  }
  .submit-btn{
    color: #fff;
    float: right;
    margin-right: px2vw(28);
  }
  .input_arrow{
    margin-left: px2vw(20)
  }
  .personal_data .f_wrap .mint-cell-wrapper{
    position: relative;
    margin: 0 0 0 px2vw(20);
    padding: 0;
    width: px2vw(730);
    height: px2vw(150);
    background-size: 120% 0;
    input[type="text"]{
      border: none;
      padding: 0;
      margin: 0;
      font-size: px2vw(26);
      color: #333;
    }
    .mint-cell-text{
      font-size: px2vw(30);
      width: 170px;
      display: inline-block;
      color: rgb(51,51,51);
    }
    .mint-cell-value .unset{
      width: 100%;
      padding-right: px2vw(42);
      font-size: px2vw(28);
      text-align: right;
      height: px2vw(96);
      line-height: px2vw(96);
      color: rgb(51,51,51);
    }
  }
  .personal_data .input_arrow .mint-cell-wrapper{
    margin: 0;
    padding-right: px2vw(21);
    height: px2vw(90);
    border: 0;
  }
  .bb{
    border-bottom: 1px solid rgb(229,229,229);
  }
  .mint-actionsheet{
    z-index: 2003;
  }
  // .personal_data .f_wrap .bb{
  //   position: relative;
  //   &::after{
  //     content:"";
  //     position: absolute;
  //     left: px2vw(30);
  //     bottom: 0;
  //     width: 100%;
  //     height: 1px;
  //     transform-origin: 0 0;
  //     background: rgb(229,229,229);
  //   }
  // }
  // @media (-webkit-min-device-pixel-ratio:1.5), (min-device-pixel-ratio: 1.5){
  //   .bb::after{
  //     transform: scaleY(0.7);
  //   }
  // }
  // @media (-webkit-min-device-pixel-ratio:2), (min-device-pixel-ratio: 2){
  //   .bb::after{
  //     transform: scaleY(0.5);
  //   }
  // }
  .mint-cell-wrapper .el-upload .head-wrap{
    margin-top: px2vw(30);
    height: px2vw(150);
    line-height: px2vw(150);
    text-align: left;
  }
  .avatar-uploader{
    width: 100%;
    height: px2vw(150);
    line-height: px2vw(150);
    .el-upload{
      width: 100%;
      text-align: left;
      // padding-top: px2vw(28);
      height: px2vw(150);
      line-height: px2vw(150);
      .mint-cell-text{
        height: px2vw(88);
        line-height: px2vw(88);
      }
      i{
        width: px2vw(90);
        height: px2vw(90);
        line-height: px2vw(90);
        margin: px2vw(30) 0 0 px2vw(230);
        font-size: px2vw(40);
        color: rgb(204,204,204);
        border: 1px dashed #d9d9d9;
        text-align: center;
      }
      img{
        margin: px2vw(30) 0 0 px2vw(230);
        width: px2vw(90);
        height: px2vw(90);
        line-height: px2vw(90);
      }
    }
  }
  .goto{
    width: px2vw(15);
    height: px2vw(28);
    margin-right: px2vw(21);
  }
  .fred{
    color: rgb(216,30,6);
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
    z-index: 1;
  }
</style>

