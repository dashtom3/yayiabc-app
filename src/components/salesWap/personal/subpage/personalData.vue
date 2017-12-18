<template>
  <div class="personalData-container">
    <div class="logIn_header">
      <div class="header_box" @click="back">
        <img class="header_back" src="../../../../images/logIn/back.png" alt="img">
      </div>
      <span class="logWithCode">个人资料</span>
    </div>
    <!--点击切换展示和更改页面按钮-->
    <div class="edit-button" @click="edit" v-show="!isEditing">编辑</div>
    <div class="edit-button" @click="saveEdit" v-show="isEditing">保存</div>
    <div class="personal-container">
      <!--个人资料展示-->
      <div class="showPage" v-show="!isEditing">
        <div class="headPhoto-container">
          <p class="detailTitle">头像</p>
          <div class="headPhoto">
            <img class="avatar" v-if="!saleInfo.salePic " src="../../../../images/salePersonal/avatar.jpg" alt="" width="100%" height="100%">
            <img class="avatar" :src="saleInfo.salePic" alt="" width="100%" height="100%" v-else>
          </div>
        </div>
        <div class="thin-height">
          <p class="detailTitle">真实姓名*</p>
          <p class="detail" v-if="saleInfo.trueName">{{saleInfo.trueName}}</p>
          <p class="detail" v-else>未设置</p>
        </div>
        <div class="thin-height">
          <p class="detailTitle">性别*</p>
          <p class="detail" v-if="saleInfo.sex == 1">男</p>
          <p class="detail" v-else-if="saleInfo.sex == 2">女</p>
          <p class="detail" v-else>未设置</p>
        </div>
        <div class="thin-height">
          <p class="detailTitle">身份证号*</p>
          <p class="detail" v-if="saleInfo.idCard">{{saleInfo.idCard}}</p>
          <p class="detail" v-else>未设置</p>
        </div>
        <div class="thin-height">
          <p class="detailTitle">工作单位*</p>
          <p class="detail" v-if="saleInfo.workUnit">{{saleInfo.workUnit}}</p>
          <p class="detail" v-else>未设置</p>
        </div>
        <div class="thin-height">
          <p class="detailTitle">工作职位*</p>
          <p class="detail" v-if="saleInfo.workPosition">{{saleInfo.workPosition}}</p>
          <p class="detail" v-else>未设置</p>
        </div>
        <div class="thin-height">
          <p class="detailTitle">单位所在地*</p>
          <p class="detail" v-if="saleInfo.part">{{saleInfo.part}}</p>
          <p class="detail" v-else>未设置</p>
        </div>
        <div class="wide-height">
          <p class="detailTitle">详细地址*</p>
          <div class="detailAddr">
            <p class="detail" v-if="saleInfo.address">{{saleInfo.address}}</p>
            <p class="detail" v-else>未设置</p>
          </div>
        </div>
        <div class="thin-height">
          <p class="detailTitle">推荐人姓名</p>
          <p class="detail" v-if="saleInfo.referrals">{{saleInfo.referrals}}</p>
          <p class="detail" v-else>未设置</p>
        </div>
        <div class="thin-height">
          <p class="detailTitle">出生日期</p>
          <p class="detail" v-if="saleInfo.birthday">{{saleInfo.birthday}}</p>
          <p class="detail" v-else>未设置</p>
        </div>
        <div class="thin-height">
          <p class="detailTitle">学历</p>
          <p class="detail" v-if="saleInfo.education">{{saleInfo.education}}</p>
          <p class="detail" v-else>未设置</p>
        </div>
        <div class="thin-height">
          <p class="detailTitle">微信号</p>
          <p class="detail" v-if="saleInfo.weChar">{{saleInfo.weChar}}</p>
          <p class="detail" v-else>未设置</p>
        </div>
        <div class="thin-height">
          <p class="detailTitle">邮箱</p>
          <p class="detail" v-if="saleInfo.email">{{saleInfo.email}}</p>
          <p class="detail" v-else>未设置</p>
        </div>
      </div>
      <!--个人资料更改-->
      <div class="showPage" v-show="isEditing">
        <div class="headPhoto-container">
          <p class="detailTitle">头像</p>
            <el-upload class="headPhoto needclick"
              :disabled="ifPass"
              :action="qiNiuConfig.url"
              :show-file-list="false"
              :on-success="uploadFile"
              :data="qiNiuToken"
            >
            <img class="avatar" v-if="!saleInfo.salePic " src="../../../../images/salePersonal/avatar.jpg" alt="" width="100%" height="100%">
            <img class="avatar" :src="saleInfo.salePic" alt="" width="100%" height="100%" v-else>
            </el-upload>
        </div>
        <div class="thin-height">
          <label for="name" class="detailTitle">真实姓名*</label>
          <input id="name" class="detail" type="text" placeholder="请输入您的姓名" v-model="saleInfo.trueName">
        </div>
        <div class="thin-height">
          <label @click="selectSex" class="detailTitle">性别*</label>
          <div @click="sexVisible = true">
            <p class="detail" v-if="saleInfo.sex == 1">男 ></p>
            <p class="detail" v-else-if="saleInfo.sex == 2">女 > </p>
            <p class="detail" v-else>未设置 > </p>
          </div>
        </div>
        <div class="thin-height">
          <label for="idCard" class="detailTitle">身份证号*</label>
          <input id="idCard" class="detail" type="text" placeholder="请输入您的身份证号" v-model="saleInfo.idCard">
        </div>
        <div class="thin-height">
          <label for="workUnit" class="detailTitle">工作单位*</label>
          <input id="workUnit" class="detail" type="text" placeholder="请输入工作单位" v-model="saleInfo.workUnit">
        </div>
        <div class="thin-height">
          <label for="workPosition" class="detailTitle">工作职位*</label>
          <input id="workPosition" class="detail" type="text" placeholder="请输入您的职位" v-model="saleInfo.workPosition">
        </div>
        <div class="thin-height">
          <label @click="openPicker('cityAddressPicker')" class="detailTitle">单位所在地*</label>
          <div @click="openPicker('cityAddressPicker')">
            <p class="detail" v-if="saleInfo.part">{{saleInfo.part}} ></p>
            <p class="detail" v-else>请选择 ></p>
          </div>
        </div>
        <div class="wide-height">
          <label for="address" class="detailTitle">详细地址*</label>
          <div class="detailAddr">
            <input id="address" type="text" class="detail" placeholder="请输入您的详细地址" v-model="saleInfo.address">
          </div>
        </div>
        <div class="thin-height">
          <label for="referrals" class="detailTitle">推荐人姓名</label>
          <input id="referrals" class="detail" type="text" placeholder="请输入您的推荐人姓名" v-model="saleInfo.referrals">
        </div>
        <div class="thin-height">
          <label @click="openPicker('birthDatePicker')" class="detailTitle">出生日期</label>
          <div @click="openPicker('birthDatePicker')">
            <p class="detail" v-if="saleInfo.birthday">{{saleInfo.birthday}} ></p>
            <p class="detail" v-else>请选择 ></p>
          </div>
        </div>
        <div class="thin-height">
          <label for="education" class="detailTitle">学历</label>
          <input id="education" class="detail" type="text" placeholder="请输入您的学历" v-model="saleInfo.education">
        </div>
        <div class="thin-height">
          <label for="weChar" class="detailTitle">微信号</label>
          <input id="weChar" class="detail" type="text" placeholder="请输入您的微信号" v-model="saleInfo.weChar">
        </div>
        <div class="thin-height">
          <label for="email" class="detailTitle">邮箱</label>
          <input id="email" class="detail" type="text" placeholder="请输入您的邮箱号" v-model="saleInfo.email">
        </div>
        <!--出生日期选择框-->
        <birth-date-picker ref="birthDatePicker" @birthdatechange="saveBirthDate"></birth-date-picker>
        <!--城市选择框-->
        <address-picker ref="cityAddressPicker" @addresschange="saveAddress"></address-picker>
        <!--性别-->
        <mt-actionsheet :actions="sexs" v-model="sexVisible" v-show="sexVisible" cancel-text="取消"></mt-actionsheet>
      </div>
      <div class="blankDiv"></div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import salesHeader from '../../salesHeader.vue'
  import salesFooter from '../../salesFooter.vue'
  import util from '../../../../vuex/util'
  import { tokenMethods } from '../../../../vuex/util'
  import birthDatePicker from '../../../wx_user/birthDatePicker.vue'
  import addressPicker from '../../../wx_user/addressPicker.vue'
  import {mapState} from 'vuex'
  import { ActionSheet } from 'mint-ui'
  import { MessageBox } from 'mint-ui'
  import { Toast } from 'mint-ui'
  import { GET_UPLOAD_TOKEN } from '../../../../vuex/types'
  import { Upload } from 'element-ui'

  export default {
    name: 'salePersonalData',
    data() {
      return {
        qiNiuToken: {},
        ifPass: false,
        isEditing : false,
        sexVisible: false,
        sexs: [{
          name: '男',
          method: this.selectMan
        }, {
          name: '女',
          method: this.selectWoman
        }],
        qiNiuConfig: {
          url: 'http://upload-z2.qiniu.com/',
          ShUrl: 'http://orl5769dk.bkt.clouddn.com/'
        },
      }
    },
    components: {
      salesHeader,
      salesFooter,
      birthDatePicker,
      addressPicker
    },
    computed:{
      ...mapState('sale',{
        saleInfo: state => state.saleInfo,
      })
    },
    created(){
      this.$store.dispatch(GET_UPLOAD_TOKEN).then(res => {
        this.qiNiuToken = {
          token: res.msg
        }
      })
    },
    methods:{
      edit() {
        this.isEditing = !this.isEditing;
        console.log(this.saleInfo);
      },
      selectSex() {
        this.sexVisible = true
      },
      saveEdit() {
        var params ={};

        var idCardReg = /^(\d{15}|\d{17}[\dxX])$/;

        params = {
          trueName : this.saleInfo.trueName,//1
          idCard :this.saleInfo.idCard,//1,
          weChar :this.saleInfo.weChar,//1,
          email :this.saleInfo.email,//0,
          sex :this.saleInfo.sex,//1,
          birthday : this.saleInfo.birthday,//0,
          part : this.saleInfo.part,//0,
          address : this.saleInfo.address,//0,
          education : this.saleInfo.education,//0,
          workUnit : this.saleInfo.workUnit,//0,
          workPosition :this.saleInfo.workPosition,//0,
          salePic : this.saleInfo.salePic,//0,
          referrals:this.saleInfo.referrals,
          userPic: this.saleInfo.salePic,
        };

        switch (true) {
          case !this.saleInfo.trueName:
            Toast({message: '请填写您的真实姓名', duration: 4000});
            return
          case !this.saleInfo.sex:
            Toast({message: '请选择您的性别', duration: 4000});
            return
          case !(this.saleInfo.idCard && idCardReg.test(this.saleInfo.idCard)):
            Toast({message: '请输入正确的身份证号码', duration: 4000});
            return
          case !this.saleInfo.workUnit:
            Toast({message: '请填写您的单位名称', duration: 4000});
            return
          case !this.saleInfo.workPosition:
            Toast({message: '请填写您的工作职位', duration: 4000});
            return
          case !this.saleInfo.part:
            Toast({message: '请选择您的单位所在地', duration: 4000});
            return
          case !this.saleInfo.address:
            Toast({message: '请填写您的单位详细地址', duration: 4000});
            return
          default:
            break
        }

        this.$store.dispatch('sale/POST_EDIT_SALEINFO', params).then(res => {
          this.ifPass = true;
          console.log(res)
        })
        this.isEditing = !this.isEditing;
      },
      openPicker(name) {
        this.$refs[name].open()
      },
      saveBirthDate(e) {
        this.saleInfo.birthday = e;
        console.log("yes",e)
      },
      saveAddress(e) {
        let part = e.split(' ').join('/')
        this.saleInfo.part = part
      },
      selectMan() {
        this.saleInfo.sex = 1
        console.log(this.saleInfo.sex)
      },
      selectWoman() {
        this.saleInfo.sex = 2
        console.log(this.saleInfo.sex)
      },
      uploadFile(res, file) {
        this.saleInfo.salePic = this.qiNiuConfig.ShUrl + file.response.key
      },
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  .logIn_header{
    padding-bottom: 0;
    position: fixed;
    z-index: 99;
    top: 0;
  }

  .personalData-container {
    background-color: #f4f4f4;
    padding-top: px2vw(88);
    width: 100%;
    .edit-button{
      position: fixed;
      z-index: 1000;
      top:px2vw(20);
      right: px2vw(20);
      color: #fff;
      font-size: px2vw(28);
    }
    .personal-container{
      width: 100%;
      font-size: px2vw(32);
      position: fixed;
      top: px2vw(88);
      bottom: 0;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      .thin-height{
        width: 100%;
        height: px2vw(92);
        line-height: px2vw(92);
        border-bottom: pc2vw(1) solid #e5e5e5;
        /*margin-bottom: px2vw(20);*/
        background-color: #fff;
        position: relative;
        .detailTitle{
          position: absolute;
          left: px2vw(20);
          right: 0;
          top:0;
        }
        .detail{
          outline: none;
          border: none;
          text-align: right;
          position: absolute;
          color:#999999;
          height: px2vw(90);
          font-size: px2vw(28);
          right: px2vw(20);
          top:0;
        }
        .detail::placeholder{
          text-align: right;
          color: #999999;
        }
      }
      .headPhoto-container{
        width: 100%;
        height: px2vw(160);
        line-height: px2vw(160);
        /*margin-bottom: px2vw(20);*/
        border-bottom: px2vw(1) solid #e5e5e5;
        background-color: #fff;
        position: relative;
        .detailTitle{
          position: absolute;
          left: px2vw(20);
          top:0;
        }
        .headPhoto{
          height: px2vw(120);
          width: px2vw(120);
          float: right;
          margin: px2vw(20) px2vw(20) 0 0;
          z-index: 10;
          border-radius: 50%;
          overflow: hidden;
          .avatar{
            width: 100%;
            height: 100%;
          }
        }
      }
      .wide-height{
        width: 100%;
        height: px2vw(200);
        line-height: px2vw(80);
        border-bottom: px2vw(1) solid #e5e5e5;
        /*margin-bottom: px2vw(20);*/
        background-color: #fff;
        position: relative;
        .detailTitle{
          position: absolute;
          left: px2vw(20);
          right: 0;
          top:0;
        }
        .detailAddr{
          position: absolute;
          bottom: px2vw(20);
          left:px2vw(20);
          width: px2vw(710);
          height: px2vw(100);
          background-color: #f4f4f4;
          overflow: scroll;
          font-size: px2vw(28);
          color: #999999;
          .detail{
            padding: 0;
            margin: px2vw(20);
            width: px2vw(670);
            background-color: #f4f4f4;
            border: none;
            outline: none;
            color: #999999;
            font-size: px2vw(28);
            line-height: px2vw(32);
          }
        }
        .detailAddr::placeholder{
          font-size: px2vw(28);
          margin: px2vw(20) px2vw(20) auto auto;
        }
      }
    }
  }
  .blankDiv{
    background-color: #f4f4f4;
    height: px2vw(30);
    width: 100%;
  }
</style>
