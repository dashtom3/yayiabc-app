<template>
  <div  class="titleWrap">
    <!--删除成功样式-->
    <div v-if="delSwitch" class="delSuccess">
      <div class="delImg">
        <img src="../../../../images/case/myCase/yyyyy.png" alt="img">
      </div>
      <div>删除成功</div>
    </div>
    <!--<div class="backgroundImg"></div>-->
    <div class="wrapTop">
      <span class="title">病例详情</span>
      <span @click="back()" class="backImgBox">
        <img src="../../../../images/case/backer.png" alt="">
      </span>
      <span @click="deleter()" v-if="$route.query.draft == 1" class="del">
        <img src="../../../../images/case/myCase/dele.png" alt="">
      </span>
      <span v-if="$route.query.myCase" @click.stop="editClose()" class="backRightImgBox">
        <img src="../../../../images/case/caseOfIllness/point.png" alt="">
        <div v-if="editSwitch" class="editBox">
          <div @click.stop="edit()">
            <img src="../../../../images/case/caseOfIllness/write.png" alt="编辑">
            <span>编辑</span>
          </div>
          <i class="line"></i>
          <div @click.stop="deleter()">
            <img src="../../../../images/case/caseOfIllness/delete.png" alt="删除">
            <span>删除</span>
          </div>
        </div>
      </span>
    </div>
    <div class="container">
    <!-- 遮罩层 -->
    <div :class="{bgc : changes}"></div>


      <div class="titleContainer">
        <div class="titleContent">
          {{caseDetailArgs.headline}}
        </div>
      </div>
      <div class="header">
        <img class="headPic" :src="userPic? userPic + '?imageView2/1/w/200/h/200' : require('../../../../images/case/hPic.png')" alt="">
        <span class="headName">{{caseDetailArgs.writer}}</span>
        <span class="class">{{caseDetailArgs.classify}}</span>
        <span class="class" v-if="caseDetailArgs.chargeNumber == null">免费</span>
        <span class="class1" v-if="caseDetailArgs.chargeNumber != null">{{caseDetailArgs.chargeNumber}}乾币</span>
      </div>
      <div class="read">
        <span class="readS">{{caseDetailArgs.readNumber}}阅读</span><span class="drop">&nbsp;·</span><span class="readS">&nbsp;{{caseDetailArgs.commentNum}}评论&nbsp;</span><span class="drop">·</span><span class="readS">&nbsp;{{caseDetailArgs.zanNum}}赞</span>
        <span class="readTime">{{caseDetailArgs.postTime}}</span>
      </div>
      <!--病历内容-->
      <div class="content">
        <div class="padding_Box" v-html="caseDetailArgs.freeContent"></div>
        <!--付费内容-->
        <div class="padding_Box" v-if="caseDetailArgs.chargeContent !== null" v-html="caseDetailArgs.chargeContent"></div>
        <div class="payBox" v-if="caseDetailArgs.chargeContent == null && caseDetailArgs.chargeNumber !== null">
          <span class="payText">查看完整病例,&nbsp;需要支付{{caseDetailArgs.chargeNumber}}乾币~</span>
          <span @click="payNowFun()" class="payNow">
            <span class="payNowText">立即支付</span>
            <img src="../../../../images/case/back_1.png" alt="">
          </span>
        </div>
      </div>
      <comment v-if="$route.query.draft != 1" :types="'病例'" v-on:refreshDetail="refreshData"></comment>
      <div class="bottomWrite" v-else-if="$route.query.draft == 1">
        <div class="bottomLeft" @click="releaseCase(1)">
          <span>
            <img src="../../../../images/case/myCase/send.png" alt="">
          </span>
          <span>发布</span>
        </div>
        <div class="bottomRight" @click="releaseCase(0)">
          <span>
            <img src="../../../../images/case/myCase/write.png" alt="">
          </span>
          <span>编辑</span>
        </div>
      </div>
    </div>

    <div v-if="payNow" @touchmove.prevent class="bgBg">
      <div class="bgBox">
        <div @click="closePay()" class="closeBox">
          <img src="../../../../images/case/caseOfIllness/close.png" alt="">
        </div>
        <div class="payTexts">你需支付{{caseDetailArgs.chargeNumber}}乾币</div>
        <div class="coinBox">
          <span :class="{'noPay': userCoins < caseDetailArgs.chargeNumber}" class="payCoinText">
             乾币余额:&nbsp;{{userCoins}}&nbsp;
          </span>
        <span v-if="userCoins < caseDetailArgs.chargeNumber" class="noCoin">余额不足, 立即充值</span>
        </div>
        <div  class="payRel2" v-if="userCoins < caseDetailArgs.chargeNumber">确认支付</div>
        <div @click="payRel(caseDetailArgs.chargeNumber)" class="payRel" v-else>确认支付</div>
      </div>
    </div>
  </div>
</template>

<script>
  import comment from './comment.vue';
  import { MessageBox,Toast } from 'mint-ui';
  import { tokenMethods } from '../../../../vuex/util';
  import Util from '../../../../vuex/util'
  import {mapGetters} from 'vuex'
  export default {
    data(){
      return{
        changes: false,
        editSwitch: false,
        caseDetailArgs: {}, //病例详情的内容数据
        payNow: false,
        userCoins: 0,
        timeStamp: '', //时间戳
        delSwitch: false,
        //获取当前登录账号的userID
        myUserId:tokenMethods.getWapUser() ? tokenMethods.getWapUser().userId:'',
        args:{
          headline:'',
          classify:'',
          freeContent:'',
          chargeContent:'',
          chargeNumber:'',
          postStater:0,
          cover:'',
          postId:this.$route.query.id,
          userId:'',
        },
        // 头像
        userPic: ''
      }
    },
    computed: {
      ...mapGetters([
        'caseOfIllness'
      ])
    },
    created (){
      this.getCaseData();
      this.getUserCoin();
      this.timeStamp = Date.parse(new Date());
      this.mBack('back')
    },
    mounted(){
      if(this.args.userId == this.myUserId){
        this.payRel(this.args.chargeNumber);
      }
    },
    methods:{
      //确认支付
      payRel(payCoins){
        this.$store.dispatch('PAY_CASE_DETAIL', {
          postId: this.$route.query.id,
          chargeNumber: payCoins,
        }).then((res) => {
          if(res.msg === "支付成功")
          {
            Toast({message: '支付成功', duration: 1000});
            this.getCaseData();
            this.payNow = false;
          }else {
            this.payNow = false;
            Toast({message: res.msg, duration: 1000});
          }
        });
      },
      refreshData() {
        this.getCaseData();
      },
      closePay(){
        this.payNow = false;
      },
      editClose(){
        this.editSwitch = !this.editSwitch
      },
      //编辑病例
      edit() {
        this.$router.push({path:'/newCase',query:{id:this.$route.query.id}})
      },
      //删除病例
      deleter(){
        MessageBox.confirm('是否要删除病例!').then(action => {
          this.$store.dispatch('DELETE_MYCASE', {postId: this.$route.query.id}).then((res) => {
            if(res.msg === "删除成功")
            {
              this.delSwitch = true;
              let _this = this;
              setTimeout(function () {
                _this.delSwitch = false;
                _this.$router.go(-1);
              },1000)
            }
          })
        }).catch(function (error) {
          return '';
        });
      },
      //立即支付
      payNowFun(){
        if(this.pointLogin())
        {
          this.payNow = true;
        }else {
          this.isLogin();
        }
      },
      //获取用户的乾币数量
      getUserCoin(){
        this.$store.dispatch('GET_USERS_DATA', {qbnum: 0}).then((res) => {
          this.userCoins = res.data.fl;
        })
      },
      //获取病例数据
      getCaseData(){
        this.$store.dispatch('GET_CASE_DETAIL', {postId: this.$route.query.id}).then((res) => {
          this.caseDetailArgs = res.data
          this.userPic = res.fl
          this.args.headline = res.data.headline
          this.args.classify = res.data.classify
          this.args.freeContent = res.data.freeContent
          this.args.chargeContent = res.data.chargeContent
          this.args.chargeNumber = res.data.chargeNumber
          this.args.cover = res.data.cover
          this.args.userId = res.data.userId
          if (this.caseDetailArgs.classify === 1) {
            this.caseDetailArgs.classify = '口腔外科'
          } else if (this.caseDetailArgs.classify === 2) {
            this.caseDetailArgs.classify = '口腔内科'
          } else if (this.caseDetailArgs.classify === 3) {
            this.caseDetailArgs.classify = '口腔修复'
          } else if (this.caseDetailArgs.classify === 4) {
            this.caseDetailArgs.classify = '口腔种植'
          } else if (this.caseDetailArgs.classify === 5) {
            this.caseDetailArgs.classify = '口腔正畸'
          }
          this.time(this.caseDetailArgs);
        })
      },
      time(item){
        item.postTime = Util.formatDate.format(new Date(item.postTime),'yyyy-MM-dd hh:mm').substring(0);
      },
      writeComment(){

      },
      releaseCase(type){
        if(type){
          MessageBox.confirm('以当前状态直接发布？').then(action => {
            this.$store.dispatch('UPLOAD_CASE',this.args).then(res => {
              this.$router.push('/caseOfIllness');
              // this.$destroy();
            })
          }).catch(reject =>{

          });
        }else {
          this.$router.push({path:'newCase',query:{id:this.$route.query.id}})
        }
      },
      back (){
        this.$router.push({path: this.$route.query.backName})
        // this.$router.go(-1);
        this.$destroy();
      },
      //子组件返回按钮
      backChild(){
        let reg = new RegExp("(\\s|^)" + "changeFixed" + "(\\s|$)");
        let _html = document.getElementsByTagName("html")[0];
        _html.className = _html.className.replace(reg, " ");
        this.commentChild.switchShow = false;
      },
      //判断是否登录
      pointLogin(){
        let userToken = tokenMethods.getWapToken();
        return userToken;
      },
      //提示需要登录
      isLogin() {
        MessageBox.confirm('请先登录!').then(action => {
          this.$router.push({path: '/logIn', query: { backName: this.$route.fullPath}})
        }).catch(function (error) {
          return '';
        });
      },
    },
    components:{comment}
  }
</script>

<style>
  body{
    height: 100% !important;
    overflow-x: hidden !important;
    overflow-y: hidden !important;
  }
  .changeFixed{
    height: 100% !important;
    overflow-x: hidden !important;
    overflow-y: hidden !important;
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  .delImg img{
    width: px2vw(62);
    height: px2vw(44);
  }
  .delImg{
    margin-top: px2vw(40);
    margin-bottom: px2vw(35);
  }
  .delSuccess{
    position: fixed;
    background-color: rgba(0,0,0,0.8);
    top:40%;
    left: 50%;
    transform:translate(-50%, 0);
    width: px2vw(300);
    height: px2vw(200);
    border-radius: px2vw(10);
    z-index: 999;
    text-align: center;
    font-size: px2vw(36);
    color: white;
  }
  .del{
    display: inline-block;
    position: absolute;
    top:0;
    right: 0;
    height: px2vw(88);
    padding-top: px2vw(25);
    padding-right: px2vw(20);
    padding-left: px2vw(35);
  }
  .del img{
    width: px2vw(40);
    height: px2vw(40);
  }
  .payRel2{
    font-size: px2vw(32);
    color: white;
    width: px2vw(480);
    height: px2vw(70);
    background-color: #cccccc;
    line-height: px2vw(70);
    margin: 0 auto;
    margin-top: px2vw(40);
  }
  .coinBox{
    margin-top: px2vw(40);
  }
  .noCoin{
    color: #d81e06;
    font-size: px2vw(26);
    vertical-align: middle;
    border-bottom: px2vw(1) solid #d81e06;
  }
  .noPay{
    color: #000000!important;
  }
  .payRel{
    font-size: px2vw(32);
    color: white;
    width: px2vw(480);
    height: px2vw(70);
    background-color: $themeColor;
    line-height: px2vw(70);
    margin: 0 auto;
    margin-top: px2vw(40);
  }
  .payCoinText{
    vertical-align: middle;
    font-size: px2vw(32);
    color: $themeColor;
  }
  .payTexts{
    font-size: px2vw(36);
    color: #333333;
    margin-top: px2vw(50);
  }
  .closeBox{
    display: inline-block;
    position: absolute;
    top:px2vw(0);
    text-align: center;
    right: px2vw(0);
    width: px2vw(60);
    padding: px2vw(10);
  }
  .closeBox>img{
    width: px2vw(24);
    height: px2vw(24);
  }
  .bgBox{
    text-align: center;
    width: px2vw(600);
    height: px2vw(350);
    background-color: white;
    border-radius: px2vw(10);
    position: absolute;
    margin: 0 auto;
    top:35%;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .editBox{
    position: absolute;
    top:px2vw(50);
    right: px2vw(16);
    width: px2vw(200);
    height: px2vw(191);
    background-image: url("../../../../images/case/caseOfIllness/editBox.png");
    background-size: px2vw(200) px2vw(191);
    background-repeat: no-repeat;
    font-size: 0;
    color: black;
    div{
      padding: 0 px2vw(10);
    }
    img{
      width: px2vw(30);
      height: px2vw(30);
      vertical-align: top;
      margin: px2vw(26) px2vw(31) 0 0;
    }
    span{
      display: inline-block;
      height: px2vw(84);
      line-height: px2vw(84);
      color: rgb(51,51,51);
      font-size: px2vw(28)
    }
  }
  .line{
    display: inline-block;
    height: px2vw(2);
    width: px2vw(180);
    margin: 0 auto;
    background: rgb(220,220,220);
  }
  .editBox div:nth-child(1){
    margin-top: px2vw(18);
  }
  .bgBg{
    position: fixed;
    z-index: 3000;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.4);
    overflow: hidden;
  }

  .backgroundWrap{
    position: fixed;
    bottom: 0;
    top:0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: #f8f8f8;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .commentChildBox{
    position: fixed;
    bottom: 0;
    top:0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: #f8f8f8;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .padding_Box{
    padding: px2vw(40) px2vw(20) px2vw(0) px2vw(20);
  }

  .payBox{
    width: 100vw;
    display: table;
    vertical-align: middle;
    height: px2vw(90);
    font-size: px2vw(28);
    color: white;
    background-color: $themeColor;
    padding-left: px2vw(22);
    padding-right: px2vw(10);
    margin-top: px2vw(20);
    box-shadow: px2vw(0) px2vw(5) px2vw(8) darkgray ;
  }
  .payBox span{
    display: table-cell;
    vertical-align: middle;
  }
  .payBox span img{
    width: px2vw(15) !important;
    height: px2vw(25);
    vertical-align: middle;
  }
  .payNowText{
    display: inline-block !important;
  }
  .payNow{
    width: px2vw(170);
  }
  .areaShow{
    position: absolute;
    top:0;
    left: 0;
    z-index: -2;
  }


  #write{
    border: none;
    vertical-align: middle;
  }


  .backgroundImg{
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f4f4f4;
    z-index: -1;
  }
  .wrapTop{
    z-index: 999;
    position: fixed;
    height: px2vw(88);
    top:0;
    width: 100vw;
    background-color: $themeColor;
    text-align: center;
    color: #ffffff;
    font-size: px2vw(36);
  }
  .title{
    display: table-cell;
    vertical-align: middle;
    height: px2vw(88);
    width: 100vw;
    text-align: center;
  }
  .backImgBox{
    position: absolute;
    padding: px2vw(23) px2vw(35) 0 px2vw(20);
    top:0;
    left: 0;
    height: px2vw(88);
  }
  .backImgBox>img{
    width: px2vw(24);
    height: px2vw(42);
  }
  .backRightImgBox{
    position: absolute;
    padding: px2vw(10) px2vw(20) 0 px2vw(20);
    top:0;
    right: 0;
    height: px2vw(88);
  }
  .backRightImgBox>img{
    width: px2vw(40);
    height: px2vw(8);
  }
  .container{
    position: absolute;
    top:px2vw(88);
    overflow: scroll;
    width: 100%;
    min-height: px2vw(1206);
    -webkit-overflow-scrolling: touch;
  }
  .titleContainer{
    background-color: white;
    padding-left: px2vw(20);
    padding-right: px2vw(20);
  }
  .titleContent{
    padding-top: px2vw(38);
    font-size: px2vw(36);
    color: #333333;
  }
  .header{
    background-color: white;
    padding-top: px2vw(37);
    padding-left: px2vw(20);
  }
  .headPic{
    width: px2vw(50);
    height: px2vw(50);
    border-radius: 50%;
    margin-right: px2vw(20);
    vertical-align: middle;
  }
  .class{
    display: inline-block;
    height: px2vw(40);
    vertical-align: middle;
    text-align: center;
    line-height: px2vw(40);
    font-size: px2vw(24);
    color: #3676b6;
    border: 1px solid #3676b6;
    border-radius: px2vw(6);
    padding-left: px2vw(4);
    padding-right: px2vw(4);
    margin-top: px2vw(4);
    margin-left: px2vw(18);
  }
  .class1{
    display: inline-block;
    height: px2vw(40);
    vertical-align: middle;
    text-align: center;
    line-height: px2vw(40);
    font-size: px2vw(24);
    color: #d81e06;
    border: 1px solid #d81e06;
    border-radius: px2vw(6);
    padding-left: px2vw(4);
    padding-right: px2vw(4);
    margin-top: px2vw(4);
    margin-left: px2vw(18);
  }
  .headName{
    vertical-align: middle;
    font-size: px2vw(32);
    color: #333333;
  }
  .read{
    height: px2vw(80);
    background-color: white;
    padding-left: px2vw(20);
    font-size: px2vw(24);
    color: #999999;
    border-bottom: px2vw(1) solid #dcdcdc;
  }
  .drop{
    font-size: px2vw(50);
    vertical-align: middle;
  }
  .readS{
    vertical-align: middle;
  }
  .readTime{
    float: right;
    margin-top: px2vw(20);
    margin-right: px2vw(20);
  }
  .content{
    background-color: white;
    width: 100vw;
    padding-bottom: px2vw(52);
  }
  .contentImgBox{
    display: inline-block;
    min-width: px2vw(20);
    max-width: 100%;
    height: auto;
  }
  .content img{
    width: 100% !important;
    height: auto;
  }


  .likeBox span{
    vertical-align: middle;
  }


  .title2{
    display: table-cell;
    vertical-align: middle;
    height: px2vw(88);
    width: 100vw;
    text-align: center;
  }
  .backImgBox2{
    position: absolute;
    padding: px2vw(23) px2vw(35) 0 px2vw(20);
    top:0;
    left: 0;
    height: px2vw(88);
  }
  .backImgBox2>img{
    width: px2vw(24);
    height: px2vw(42);
  }
  .changeIndex{
    position: fixed;
    top: 0;
    left: 0;
    z-index: -10;
  }
  .bottomWrite{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: px2vw(90);
    padding-top: px2vw(10);
    padding-bottom: px2vw(10);
    font-size: px2vw(30);
    border-top:px2vw(1) solid #cccccc;
    background: #fff;
  }
  .bottomWrite span img{
    vertical-align: text-bottom;
    margin-right: px2vw(34);
  }
  .bottomLeft{
     display: inline-block;
     color: #999999;
    height: px2vw(70);
    line-height: px2vw(70);
    width: 49%;
    text-align: center;
   }
  .bottomLeft img{
    width: px2vw(34);
    height: px2vw(40);
  }
  .bottomRight{
    display: inline-block;
    height: px2vw(70);
    color: $themeColor;
    line-height: px2vw(70);
    width: 49%;
    border-left: px2vw(1) solid #999999;
    text-align: center;
  }
  .bottomRight img{
    width: px2vw(40);
    height: px2vw(40);
  }
</style>
