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
      <div class="mint-cell-wrapper headerWrapper ml bb" style="background-image: none;">
        <el-upload
          class="avatar-uploader head-upload needclick"
          :disabled="ifPass"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile"
          :data="qiNiuToken"
          >
          <div class="mint-cell-text fl head-wrap">头像</div>
          <span class="avatar head-img">
            <img v-if="personInfo.imageUrl_head" :src="personInfo.imageUrl_head">
            <img v-else src="../../../images/mine/loadUserImg3.png" alt="img">
          </span>
        </el-upload>
      </div>
      <!--用户名-->
      <mt-field class="ml bb" label="用户名" placeholder="请输入用户名" v-model="personInfo.phone" readonly disableClear></mt-field>
      <!--真实姓名-->
      <div class="require-wrapper ml nameTrue">
        <span class="require">*</span>
        <mt-field @click.native="focus" label="真实姓名" placeholder="请输入真实姓名" class="input_arrow pl" v-model="personInfo.trueName" disableClear></mt-field>
      </div>
      <!--性别-->
      <a class="mint-cell mint-field input_arrow pl select bb">
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
      <a class="mint-cell mint-field input_arrow pl select bb">
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
      <div class="require-wrapper">
        <span class="require">*</span>
        <mt-field @click.native="focus" label="单位名称" class="input_arrow pl" placeholder="请输入单位名称" v-model="personInfo.companyName" disableClear></mt-field>
      </div>
      <!--单位所在地-->
      <a class="mint-cell mint-field pl input_arrow bb">
        <div class="mint-cell-wrapper" @click="openPicker('cityAddressPicker')">
          <div class="mint-cell-text">
            <span><span class="fred">*</span>所在地区</span>
          </div>
          <div class="mint-cell-value">
            <span v-text="personInfo.part" class="unset"></span>
          </div>
        </div>
      </a>
      <!--详细地址-->
      <div class="require-wrapper">
        <span class="require">*</span>
        <mt-field @click.native="focus" label="单位地址" class="input_arrow pl" placeholder="请输入详细地址" v-model="personInfo.workAddress" disableClear></mt-field>
      </div>
      <!--性别-->
      <mt-actionsheet :actions="sexs" v-model="sexVisible" v-show="sexVisible  && isEdit" cancel-text="取消"></mt-actionsheet>
      <!--类型-->
      <!-- <mt-actionsheet :actions="types" v-model="typeVisible" v-show="typeVisible && isEdit" cancel-text="取消"></mt-actionsheet> -->
      <!--出生日期选择框-->
      <birth-date-picker ref="birthDatePicker" @birthdatechange="saveBirthDate"></birth-date-picker>
      <!--城市选择框-->
      <address-picker ref="cityAddressPicker" @addresschange="saveAddress"></address-picker>
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
          companyName: '',
          // judge: 0,
          state: 0,
          part: '',
          workAddress: '',
          imageUrl_head: '',
        },
        sexs: [{
          name: '男',
          method: this.selectMan
        }, {
          name: '女',
          method: this.selectWoman
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
            // this.personInfo.judge = res.data.judge
            // this.personInfo.state = res.data.state
            this.personInfo.failReason = res.data.failReason || '无'
            this.personInfo.trueName = res.data.trueName
            // this.personInfo.state = res.data.state
            this.personInfo.imageUrl_head = res.data.userPic
            if(this.personInfo.sex === '1'){
              this.personInfo.sexText ='男'
            }else if(this.personInfo.sex === '2'){
              this.personInfo.sexText ='女'
            }
          }
        })
      },
      //保存个人信息
      savePersonInfo(){
        var params = {}
        params = {
          phone: tokenMethods.getWapUser().phone,
          token: tokenMethods.getWapToken(),
          trueName: this.personInfo.trueName,
          sex: this.personInfo.sex,
          birthday: this.personInfo.birthday && util.formatDate.format(new Date(this.personInfo.birthday)) || '1970-01-01',
          userPic: this.personInfo.imageUrl_head,
          type: this.personInfo.type,
          // part: this.personInfo.part,
          // companyName: this.personInfo.companyName,
          // workAddress: this.personInfo.workAddress,
          // judge: this.personInfo.judge
        }
        params['certification.companyName'] = this.personInfo.companyName
        params['certification.part'] = this.personInfo.part
        params['certification.workAddress'] = this.personInfo.workAddress
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
        //保存个人信息
        this.$store.dispatch('SAVE_PERSON_LIST', params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            Toast('你的信息保存成功');
            // this.$store.dispatch('SAVE_CERTIFICATION', params).then((res) => {
            //   if (res.data.callStatus === 'SUCCEED') {
            //     Toast('你的信息保存成功');
            //   }
            // })
          }
        });
      },
      uploadFile(res, file) {
        this.personInfo.imageUrl_head = this.qiNiuConfig.ShUrl + file.response.key
      },
      openPicker(name) {
        this.$refs[name].open()
      },
      saveAddress(e) {
        let part = e.split(' ').join('/')
        this.personInfo.part = part
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
  .edit-info .el-upload, .headerWrapper .mint-cell-value{
    width: px2vw(710);
    height: px2vw(120);
  }
  .personal_data .el-upload--picture-card:hover, .el-upload:focus{
    color: #333;
  }
  .personal_data .ml .mint-cell-wrapper .mint-field-core{
    padding: 0 px2vw(22) 0 0;
  }
  .require-wrapper .mint-cell-wrapper .mint-cell-text{
    padding-left: px2vw(16)
  }
  .require-wrapper.nameTrue .mint-cell-wrapper .mint-cell-text{
    padding-left: 0;
  }
  .personal_data .edit-info .mint-cell-wrapper{
    width: 100%;
    padding: 0;
    position: relative;
    background-size: 120% 0;
    background-image: none;
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
      font-size: px2vw(30) !important;
    }
    .avatar.head-img{
      position: absolute;
      width: px2vw(70);
      height: px2vw(70);
      top: px2vw(25);
      right: px2vw(62);
      font-size: 0;
      border-radius: 50%;
      overflow: hidden;
      img{
        width: 100%;
      }
    }
    .head-img{
      width: px2vw(70);
      height: px2vw(70);
      vertical-align: middle;
      margin-left: px2vw(260);
      border-radius: 50%;
    }
  }
  
  .personal_data .mint-field-core{
    background-position: center right;
    background-size: px2vw(12) px2vw(26);
  }
  .personal_data .mint-field .mint-cell-title{
    width: 170px;
  }
  .fred{
    color: rgb(216,30,6);
  }
  .personal_data .select .mint-cell-wrapper .mint-cell-value .unset{
    width: 100%;
    text-align: right;
    margin-right: px2vw(42);
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
    background: #f4f4f4;
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
    // bottom: 0;
    left: 0;
    right: 0;
    padding: 0 px2vw(22) 0 0;
    // overflow: scroll;
    background: #fff;
    -webkit-overflow-scrolling: touch;
  }
  .submit-btn{
    color: #fff;
    float: right;
    margin-right: px2vw(28);
  }
  .avatar-uploader.head-upload{
    position: relative;
    width: 100%;
    height: px2vw(120);
    .el-upload.el-upload--text{
      position: relative;
      width: 100%;
      text-align: left;
      padding-top: px2vw(28);
      .mint-cell-text{
        width: px2vw(710);
        height: px2vw(120);
        line-height: px2vw(120);
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
        width: 100%;
      }
    }
  }
  .avatar-uploader .el-upload .mint-cell-text.head-wrap{
    position: absolute;
    top: 0;
    left: 0;
    height: px2vw(118);
    line-height: px2vw(118);
    text-align: left;
  }
  .mint-cell-value .unset{
    width: 100%;
    font-size: px2vw(28);
    text-align: right;
    margin-right: px2vw(42);
    height: px2vw(120);
    line-height: px2vw(120);
    color: #333;
  }
  // margin-left
  .ml{
    width: 100%;
    height: px2vw(118);
    margin-left: px2vw(20);
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
    border-bottom: 1px solid rgb(229,229,229);
  }
  // .bb{
  //   position: relative;
  // }
  // .bb::after{
  //   content:"";
  //   position: absolute;
  //   left: px2vw(30);
  //   bottom: 0;
  //   width: 100%;
  //   height: 1px;
  //   transform-origin: 0 0;
  //   background: rgb(229,229,229);
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
  .require-wrapper{
    position: relative;
    height: px2vw(118);
    line-height: px2vw(118);
    .require{
      position: absolute;
      top: px2vw(5);
      left: px2vw(20);
      font-size: px2vw(30);
      color: rgb(216,30,6);
      z-index: 2000;
    }
  }
  .require-wrapper.nameTrue{
    .require{
      left: 0;
    }
  }
  // .require{
  //   height: 100%;
  //   vertical-align: middle;
  //   line-height: 100%;
  //   text-align: center;
  //   color: #c00;
  // }
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

