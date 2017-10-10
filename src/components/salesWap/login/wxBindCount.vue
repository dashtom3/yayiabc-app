<template>
  <div>
    <div class="meng"></div>
    <salesHeader headerText="创客系统"></salesHeader>
    <div class="wxBindCount-container">
      <div class="bindSuccess">微信已成功绑定客服代表系统的账号！</div>
      <div class="logg">请先完善您的个人资料</div>
      <div class="form-wrap">
        <mt-field label="真实姓名*" class="first-field" placeholder="请输入您的姓名" v-model="saleInfo.trueName"></mt-field>
        <a class="mint-cell mint-field">
          <div class="mint-cell-wrapper" @click="sexVisible = true">
            <div class="mint-cell-text">
              <span>性别*</span>
            </div>
            <div class="mint-cell-value">
              <span v-text="saleInfo.sexText" class="spanWord"></span>
            </div>
          </div>
        </a>
        <mt-field label="身份证号*" placeholder="请输入您的身份证号" v-model="saleInfo.idCard"></mt-field>
        <mt-field label="工作单位*" placeholder="请输入单位名称" v-model="saleInfo.workUnit" disableClear></mt-field>
        <mt-field label="工作职位*" placeholder="请输入您的职位" v-model="saleInfo.workPosition" disableClear></mt-field>
        <a class="mint-cell mint-field">
          <div class="mint-cell-wrapper username" @click="openPicker('cityAddressPicker')">
            <div class="mint-cell-text">
              <span>所在地省市区*</span>
            </div>
            <div class="mint-cell-value">
              <span v-text="saleInfo.part" class="spanWord"></span>
              <!--<span v-if="!saleInfo.part">请选择 ></span>-->
            </div>
          </div>
        </a>
        <mt-field label="详细地址*" placeholder="请输入单位的详细地址" v-model="saleInfo.address" disableClear></mt-field>
        <mt-field label="推荐人姓名" placeholder="请输入您的推荐人" v-model="saleInfo.referrals" disableClear></mt-field>
        <a class="mint-cell mint-field">
          <div class="mint-cell-wrapper needclick" @click="openPicker('birthDatePicker')">
            <div class="mint-cell-text">
              <span>出生日期</span>
            </div>
            <div class="mint-cell-value">
              <span v-text="saleInfo.birthday"></span>
            </div>
          </div>
        </a>
        <mt-field label="学历" placeholder="请输入您的学历" v-model="saleInfo.education" disableClear></mt-field>
        <mt-field label="微信" placeholder="请输入您的微信号" v-model="saleInfo.weChar" disableClear></mt-field>
        <mt-field label="邮箱" placeholder="请输入您的邮箱" v-model="saleInfo.email" disableClear></mt-field>
        <div class="line"></div>
        <div class="submit-wrap" @click="registerHandler">
          <mu-raised-button label="确认" class="demo-raised-button" primary/>
        </div>
      </div>
    </div>

    <!--性别-->
    <mt-actionsheet :actions="sexs" v-model="sexVisible" v-show="sexVisible" cancel-text="取消"></mt-actionsheet>
    <!--出生日期选择框-->
    <birth-date-picker ref="birthDatePicker" @birthdatechange="saveBirthDate"></birth-date-picker>
    <!--城市选择框-->
    <address-picker ref="cityAddressPicker" @addresschange="saveAddress"></address-picker>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Picker } from 'mint-ui'
  import { Toast } from 'mint-ui'
  import { Indicator } from 'mint-ui'
  import { MessageBox } from 'mint-ui'
  import { Field } from 'mint-ui'
  import util from '../../../vuex/util'
  import { tokenMethods } from '../../../vuex/util'
  import birthDatePicker from '../../wx_user/birthDatePicker.vue'
  import addressPicker from '../../wx_user/addressPicker.vue'
  import {  UPDATE_SALE_INFO } from '../../../vuex/types'

  import salesHeader from '../salesHeader.vue'

  export default {
    name: 'wxBindCount',
    data(){
      return{
        sexVisible: false,
        saleInfo:{
          trueName:'',
          sex:1,
          sexText:'男',
          idCard:'',
          workUnit:'',
          workPosition:'',
          part:'北京/北京市/东城区',
          address:'',
          referrals:'',
          birthday:'1970-01-01',
          education:'',
          weChar:'',
          email:'',
          openId:'',
          phone:'',
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
      salesHeader,
      addressPicker,
      birthDatePicker
    },
    computed: {
      wxUserInfo() {
        return this.$store.state.wx.wxUserInfo
      }
    },
    created(){
      this.saleInfo.openid = this.$route.query.openid;
      this.saleInfo.phone = this.$route.query.phone

      let saleInfo = this.wxUserInfo
      this.saleInfo.trueName = saleInfo.trueName
      this.saleInfo.token = saleInfo.token
      this.saleInfo.phone = saleInfo.phone || this.$route.query.phone
      this.saleInfo.sex = (saleInfo.sex === 2 ? '女' : '男')
      this.saleInfo.idCard = saleInfo.idCard
      this.saleInfo.workUnit = saleInfo.workUnit
      this.saleInfo.workPosition = saleInfo.workPosition
//      this.saleInfo.part = saleInfo.part
      this.saleInfo.address = saleInfo.address
      this.saleInfo.referrals = saleInfo.referrals
//      this.saleInfo.birthday = saleInfo.birthday
      this.saleInfo.education = saleInfo.education
      this.saleInfo.weChar = saleInfo.weChar
      this.saleInfo.email = saleInfo.email
//      this.saleInfo.number = saleInfo.number //表示是否已经注册
      console.log(JSON.stringify(saleInfo),'ssz')
    },
    methods:{
      openPicker(name) {
        this.$refs[name].open()
      },
      saveAddress(e) {
        let part = e.split(' ').join('/')
        this.saleInfo.part = part
      },
      saveBirthDate(value) {
        this.saleInfo.birthday = value
      },
      selectMan() {
        this.saleInfo.sex = 1
        this.saleInfo.sexText = '男'
      },
      selectWoman() {
        this.saleInfo.sex = 2
        this.saleInfo.sexText = '女'
      },
      registerHandler(){
        let params = {};
        switch (true) {
          case !this.saleInfo.trueName:
            Toast({ message: '请填写您的真实姓名', duration: 4000 });
            return
          case !this.saleInfo.idCard:
            Toast({ message: '请填写您的身份证号', duration: 4000 });
            return
          case !this.saleInfo.workUnit:
            Toast({ message: '请填写您的工作单位', duration: 4000 });
            return
          case !this.saleInfo.workPosition:
            Toast({ message: '请填写您的工作职位', duration: 4000 });
            return
          case !this.saleInfo.part:
            Toast({ message: '请选择您所在的地区', duration: 4000 });
            return
          case !this.saleInfo.address:
            Toast({ message: '请填写您的详细地址', duration: 4000 });
            return
          default:
            break
        }
        params.trueName = this.saleInfo.trueName
        params.openid = this.saleInfo.openid
        params.phone = this.saleInfo.phone
        params.sex = (this.saleInfo.sex === '男' ? 1 : 2)
        params.idCard = this.saleInfo.idCard
        params.workUnit = this.saleInfo.workUnit
        params.workPosition = this.saleInfo.workPosition
        params.part = this.saleInfo.part
        params.address = this.saleInfo.address
        params.referrals = this.saleInfo.referrals
        params.birthday = this.saleInfo.birthday
        params.education = this.saleInfo.education
        params.weChar = this.saleInfo.weChar
        params.email = this.saleInfo.email
        params.number = this.wxUserInfo.number
        this.$store.dispatch(UPDATE_SALE_INFO, params).then(res => {
          tokenMethods.setSalesToken(res.data.token)
          Toast({ message: '客服代表账号绑定成功', duration: 4000 })
          //这要跳转到哪去？
          this.$router.push({path: '/salesIndex'})
          // query: { role: 'sale', phone: this.phone, token: (res.token) }
        })
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .form-wrap {
    margin: px2vw(50) px2vw(20) 0 0;
    padding: 0 px2vw(20);
    position: fixed;
    top: px2vw(88);
    bottom: 0;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .code_btn {
      font-size: px2vw(28);
      color: #207bce;
    }
    .mint-cell-title, .mint-cell-text {
      min-width: 170px;
    }
    input[type="text"], input[type="password"] {
      border: none;
      padding: 0;
      margin: 0;
      font-size: px2vw(28);
    }
    .line{
      width: px2vw(670);
      height: 1px;
      margin: 0 0 0 px2vw(20);
      background-color: #ddd;
    }
  }
  .spanWord{
    font-size: px2vw(28);
  }
</style>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .meng{
    position: fixed;
    z-index:2000;
    width: px2vw(200);
    height: px2vw(88);
    top:0;
    left: 0;
    background-color: $themeColor;
  }
  .wxBindCount-container{
    margin-top: px2vw(88);
    width: 100%;
    .bindSuccess {
      color: #333;
      font-size: px2vw(30);
      padding-top: px2vw(50);
      text-align: center;
    }
    .logg{
      color: #999;
      font-size: px2vw(28);
      text-align: center;
      margin-top: px2vw(30);
    }
  }
  .submit-wrap{
    width: px2vw(710);
    height: px2vw(90);
    margin: px2vw(30) auto;
    text-align: center;
    box-shadow: 0 0 7px $themeColor;
    font-size: px2vw(32);
    .mu-raised-button{
      width: 100%;
      height: 100%;
      background-color: $themeColor;
    }
  }

</style>
