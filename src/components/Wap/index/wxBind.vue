<template>
	<div>
		<div class="logIn_header">
      <span class="logWithCode">绑定手机号</span>
    </div>
    <div class="wx_title">
      <p class="t_state">微信已成功绑定牙医abc账号</p>
      <p class="t_info">请先完善您的个人资料</p>
    </div>
    <div class="form-wrap">
      <mt-field label="真实姓名*" class="first-field" placeholder="请输入真实姓名" v-model="wx_personInfo.trueName"></mt-field>
      <a class="mint-cell mint-field">  
        <div class="mint-cell-wrapper" @click="sexVisible = true">  
          <div class="mint-cell-text">  
            <span>性别</span>  
          </div>  
          <div class="mint-cell-value">  
            <span v-text="wx_personInfo.sexText"></span> 
          </div>  
        </div>  
      </a>
      <a class="mint-cell mint-field"> 
        <div class="mint-cell-wrapper needclick" @click="openPicker('birthDatePicker')">
          <div class="mint-cell-text">
            <span>生日</span>
          </div>
          <div class="mint-cell-value">
            <span v-text="wx_personInfo.birthday"></span>
          </div>
        </div>
      </a>
      <mt-field label="单位名称*" placeholder="请输入单位名称" v-model="wx_personInfo.companyName" disableClear></mt-field>
      <a class="mint-cell mint-field">  
        <div class="mint-cell-wrapper username" @click="openPicker('cityAddressPicker')">
          <div class="mint-cell-text">
            <span>单位所在地*</span>
          </div>
          <div class="mint-cell-value">
            <span v-text="wx_personInfo.part"></span>
          </div>
        </div>
      </a>
      <mt-field label="详细地址*" placeholder="请输入详细地址" v-model="wx_personInfo.workAddress" disableClear></mt-field>
      <a class="mint-cell mint-field">    
        <div class="mint-cell-wrapper" @click="typeVisible = true">
          <div class="mint-cell-text">  
            <span>类型</span>  
          </div>  
          <div class="mint-cell-value">  
            <span v-text="wx_personInfo.typeText"></span> 
          </div>   
        </div>  
      </a>
      <div class="mint-cell-wrapper" v-show="wx_personInfo.typeText === '个人'">
        <el-upload
          class="avatar-uploader needclick"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile10"
          :data="qiNiuToken"
          >
          <div class="mint-cell-text fl head-wrap">口腔执业医生资格证</div>
          <img v-if="wx_personInfo.imageUrl_doctorPic" :src="wx_personInfo.imageUrl_doctorPic" class="avatar fl">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
      </div>
      <div class="mint-cell-wrapper" v-show="wx_personInfo.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile1"
          :data="qiNiuToken"
          >
          <div class="mint-cell-text fl head-wrap">医疗机构执业许可证</div>
          <img v-if="wx_personInfo.imageUrl_medical" :src="wx_personInfo.imageUrl_medical" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
      </div>
      <div class="mint-cell-wrapper" v-show="wx_personInfo.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile2"
          :data="qiNiuToken"
          >
          <div class="mint-cell-text fl head-wrap">营业执照</div>
          <img v-if="wx_personInfo.imageUrl_business" :src="wx_personInfo.imageUrl_business" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
      </div>
      <div class="mint-cell-wrapper" v-show="wx_personInfo.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile3"
          :data="qiNiuToken"
          >
          <div class="mint-cell-text fl head-wrap">税务登记证</div>
          <img v-if="wx_personInfo.imageUrl_tax" :src="wx_personInfo.imageUrl_tax" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
      </div>
      <div class="mint-cell-wrapper" v-show="wx_personInfo.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile4"
          :data="qiNiuToken"
          >
          <div class="mint-cell-text fl head-wrap">开户许可证</div>
          <img v-if="wx_personInfo.imageUrl_open_permit" :src="wx_personInfo.imageUrl_open_permit" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
      </div>
      <div class="mint-cell-wrapper" v-show="wx_personInfo.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile5"
          :data="qiNiuToken"
          >
          <div class="mint-cell-text fl head-wrap">医师职业资格证</div>
          <img v-if="wx_personInfo.imageUrl_doctor" :src="wx_personInfo.imageUrl_doctor" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
      </div>
      <div class="mint-cell-wrapper" v-show="wx_personInfo.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile6"
          :data="qiNiuToken"
          >
          <div class="mint-cell-text fl head-wrap">放射诊疗许可证</div>
          <img v-if="wx_personInfo.imageUrl_treatment" :src="wx_personInfo.imageUrl_treatment" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
      </div>
      <div class="mint-cell-wrapper" v-show="wx_personInfo.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile7"
          :data="qiNiuToken"
          >
          <div class="mint-cell-text fl head-wrap">法人身份证（正面）</div>
          <img v-if="wx_personInfo.imageUrl_id_front" :src="wx_personInfo.imageUrl_id_front" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
      </div>
      <div class="mint-cell-wrapper" v-show="wx_personInfo.typeText === '机构'">
        <el-upload
          class="avatar-uploader needclick"
          :action="qiNiuConfig.url"
          :show-file-list="false"
          :on-success="uploadFile8"
          :data="qiNiuToken"
          >
          <div class="mint-cell-text fl head-wrap">法人身份证（反面）</div>
          <img v-if="wx_personInfo.imageUrl_id_back" :src="wx_personInfo.imageUrl_id_back" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon fl"></i>
        </el-upload>
      </div>
      <div class="submit-wrap" @click="submitHandler">
        <mu-raised-button label="确认" class="demo-raised-button" primary/>
      </div>
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
  import { Picker } from 'mint-ui'
  import { Toast } from 'mint-ui'
  import { Indicator } from 'mint-ui'
  import { MessageBox } from 'mint-ui'
  import { Field } from 'mint-ui'
  import util from '../../../vuex/util'
  import { tokenMethods } from '../../../vuex/util'
  import birthDatePicker from '../../wx_user/birthDatePicker.vue'
  import addressPicker from '../../wx_user/addressPicker.vue'
  import {GET_UPLOAD_TOKEN} from '../../../vuex/types'
  var crypto = require('crypto')
	export default{
		name: 'wxBind',
		data(){
			return {
				qiNiuToken: {},
				sexVisible: false,
				typeVisible: false,
        qiNiuConfig: {
          url: 'http://upload-z2.qiniu.com/',
          ShUrl: 'http://orl5769dk.bkt.clouddn.com/'
        },
        pwd_input: true,
        wx_personInfo: {
          trueName: '',
          sex: 1,
          sexText: '男',
          birthday: '1970-01-01',
          type: 1,
          typeText: '个人',
          companyName: '',
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
      })
    },
    mounted(){
      this.init()
    },
    computed: {
      wxUserInfo() {
        return this.$store.state.wx.wxUserInfo
      }
    },
		methods: {
      tabpwdHandler(){
        this.pwd_input = !this.pwd_input
      },
      init(){
        let userInfo = this.wxUserInfo
        this.wx_personInfo.trueName = userInfo.trueName
        this.wx_personInfo.sex = userInfo.sex || 1
        this.wx_personInfo.birthday = userInfo.birthday || '1970-01-01'
        this.wx_personInfo.companyName = userInfo.companyName
        this.wx_personInfo.workAddress = userInfo.workAddress
        this.wx_personInfo.type = userInfo.type || 1
        this.wx_personInfo.part = userInfo.part && userInfo.part.split(',').join('/') || '北京/北京市/东城区'
        this.wx_personInfo.imageUrl_doctorPic = userInfo.doctorPic
        this.wx_personInfo.imageUrl_head = userInfo.userPic
        this.wx_personInfo.imageUrl_doctor = userInfo.doctorPic
        this.wx_personInfo.imageUrl_medical = userInfo.medicalLicense
        this.wx_personInfo.imageUrl_business = userInfo.businessLicense
        this.wx_personInfo.imageUrl_tax = userInfo.taxRegistration
        this.wx_personInfo.imageUrl_open_permit = userInfo.openingPermit
        this.wx_personInfo.imageUrl_treatment = userInfo.radiologicalPermit
        this.wx_personInfo.imageUrl_id_front = userInfo.idCardPositive
        this.wx_personInfo.imageUrl_id_back = userInfo.idCardOtherside
        if(this.wx_personInfo.sex === 1){
          this.wx_personInfo.sexText ='男'
        }else if(this.wx_personInfo.sex === 2){
          this.wx_personInfo.sexText ='女'
        }

        if(this.wx_personInfo.type === 1){
          this.wx_personInfo.typeText = '个人'
        }else if(this.wx_personInfo.type === 2){
          this.wx_personInfo.typeText = '机构'
        }
      },
      submitHandler() {
        var params = {}
        //个人
        if(this.wx_personInfo.type === 1){
          params = {
            trueName: this.wx_personInfo.trueName,
            phone: this.$route.query.phone,
            sex: this.wx_personInfo.sex,
            birthday: this.wx_personInfo.birthday,
            openid: this.$route.query.openid,
            number: this.wxUserInfo.number
          }
          params['certification.type'] = this.wx_personInfo.type;
          params['certification.companyName'] = this.wx_personInfo.companyName;
          params['certification.part'] = this.wx_personInfo.part;
          params['certification.workAddress'] = this.wx_personInfo.workAddress;
          params['certification.doctorPic'] = this.wx_personInfo.imageUrl_doctorPic;
          
        }else{
          //机构
          params = {
            trueName: this.wx_personInfo.trueName,
            phone: this.$route.query.phone,
            sex: this.wx_personInfo.sex,
            birthday: this.wx_personInfo.birthday,
            openid: this.$route.query.openid,
            number: this.wxUserInfo.number
          }
          params['certification.type'] = this.wx_personInfo.type;
          params['certification.companyName'] = this.wx_personInfo.companyName;
          params['certification.part'] = this.wx_personInfo.part;
          params['certification.workAddress'] = this.wx_personInfo.workAddress;
          params['certification.doctorPic'] = this.wx_personInfo.imageUrl_doctor;
          params['certification.medicalLicense'] = this.wx_personInfo.imageUrl_medical;
          params['certification.businessLicense'] = this.wx_personInfo.imageUrl_business;
          params['certification.taxRegistration'] = this.wx_personInfo.taxRegistration;
          params['certification.openingPermit'] = this.wx_personInfo.imageUrl_open_permit;
          params['certification.radiologicalPermit'] = this.wx_personInfo.imageUrl_treatment;
          params['certification.idCardPositive'] = this.wx_personInfo.imageUrl_id_front;
          params['certification.idCardOtherside'] = this.wx_personInfo.imageUrl_id_back;
        }
        switch (true) {
          case !this.wx_personInfo.trueName:
            Toast({message: '请填写您的真实姓名', duration: 4000});
            return
          case !this.wx_personInfo.companyName:
            Toast({message: '请填写您的单位名称', duration: 4000});
            return
          case !this.wx_personInfo.part:
            Toast({message: '请选择您的单位所在地', duration: 4000});
            return
          case !this.wx_personInfo.workAddress:
            Toast({message: '请填写您的单位详细地址', duration: 4000});
            return
          default:
            break
        }
        console.log(JSON.stringify(params))
        this.$store.dispatch('UPDATE_USER_INFO', params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            Toast('登录成功')
            tokenMethods.setWapToken(res.data.token)
            tokenMethods.setWapUser(res.data.data)
            this.$router.replace({name: 'index'})
          }else{
            Toast(res.data.msg)
          }
        })
      },
      uploadFile1(res, file) {
        this.wx_personInfo.imageUrl_medical = this.qiNiuConfig.ShUrl + file.response.key
      },
      uploadFile2(res, file) {
        this.wx_personInfo.imageUrl_business = this.qiNiuConfig.ShUrl + file.response.key
      },
      uploadFile3(res, file) {
        this.wx_personInfo.imageUrl_tax = this.qiNiuConfig.ShUrl + file.response.key
      },
      uploadFile4(res, file) {
        this.wx_personInfo.imageUrl_open_permit = this.qiNiuConfig.ShUrl + file.response.key
      },
      uploadFile5(res, file) {
        this.wx_personInfo.imageUrl_doctor = this.qiNiuConfig.ShUrl + file.response.key
      },
      uploadFile6(res, file) {
        this.wx_personInfo.imageUrl_treatment = this.qiNiuConfig.ShUrl + file.response.key
      },
      uploadFile7(res, file) {
        this.wx_personInfo.imageUrl_id_front = this.qiNiuConfig.ShUrl + file.response.key
      },
      uploadFile8(res, file) {
        this.wx_personInfo.imageUrl_id_back = this.qiNiuConfig.ShUrl + file.response.key
      },
      uploadFile10(res, file) {
        this.wx_personInfo.imageUrl_doctorPic = this.qiNiuConfig.ShUrl + file.response.key
      },
      openPicker(name) {
        this.$refs[name].open()
      },
      saveAddress(e) {
        let part = e.split(' ').join('/')
        this.wx_personInfo.part = part
      },
      saveBirthDate(value) { 
        this.wx_personInfo.birthday = value
      },
      fillZero(val) {
        return val<10 ? '0'+ val : val
      },
      open(picker) {  
        this.dateValue = this.wx_personInfo.birthday  
        this.$refs[picker].open()  
      }, 
      selectMan() {  
        this.wx_personInfo.sex = 1  
        this.wx_personInfo.sexText = '男'  
      },  
      selectWoman() {  
        this.wx_personInfo.sex = 2  
        this.wx_personInfo.sexText = '女'  
      },
      selectPerson(){
        this.wx_personInfo.type = 1  
        this.wx_personInfo.typeText = '个人'
      },
      selectOutfit(){
        this.wx_personInfo.type = 2  
        this.wx_personInfo.typeText = '机构'
      }
		}
	}
</script>	
<style>
  .first-field .mint-cell-wrapper {
    background-image: none !important;
  }
</style>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .wx_title{
    width: 100%;
    text-align: center;
    margin-top: px2vw(88);
    margin-bottom: px2vw(50);
    .t_state{
      font-size: px2vw(32);
      padding-top: px2vw(28);
    }
    .t_info{
      font-size: px2vw(24);
      margin-top: px2vw(24);
      color: #7a7a7a;
    }
  }
	.form-wrap{
		padding: 0 px2vw(20);
    .code_btn{
      font-size: px2vw(26);
      color: #207bce;
    }
    .pwd_eye{
      .eye_btn{
        width: px2vw(88);
        height: px2vw(88);
        position: relative;
        img{
          width: px2vw(30);
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
      }
    }
		.mint-cell-title, .mint-cell-text{
			min-width: 170px;
		}
    .mint-cell-value{
      font-size: px2vw(26);
    }
    input[type="text"], input[type="password"]{
      border: none;
      padding: 0;
      margin: 0;
      font-size: px2vw(26);
    }
		.avatar-uploader{
			width: 100%;
			height: px2vw(200); 
			line-height: px2vw(200); 
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
	} 
</style>
<style scoped lang="scss" rel="stylesheet/scss">
	@import "../../../common/sass/factory";
  .logIn_header{
    padding-bottom: 0;
    position: fixed;
    z-index: 99;
    top: 0;
  }
  .submit-wrap{
    width: 100%;
    margin: px2vw(30) 0;
    text-align: center;
    .mu-raised-button{
      width: 100%;
      height: px2vw(88);
      background-color: $themeColor;
    }
  }
</style>