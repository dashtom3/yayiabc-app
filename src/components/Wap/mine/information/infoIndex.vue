<template>
  <div>
    <div class="header">
      <span class="back-click-area" @click="goBack"></span>
      消息中心
    </div>
    <div class="container">
      <div class="line" @click="gotoPage('评论')">
        <div class="logoImg">
          <img src="../../../../images/mine/commentInfo.png" alt="">
        </div>
        <div class="detail">
          <span class="title">评论</span>
          <div class="floatRight">
            <span class="infoNum" v-if="myInfo > 0">{{myInfo}}</span>
            <img src="../../../../images/mine/right.png" alt="">
          </div>
        </div>
        <div class="clr"></div>
      </div>
      <div  class="line" @click="gotoPage('问答')">
        <div  class="logoImg">
          <img src="../../../../images/mine/answerInfo.png" alt="">
        </div>
        <div  class="detail">
          <span class="title">问答</span>
          <div  class="floatRight">
            <span  class="infoNum"  v-if="myAnswer > 0">{{myAnswer}}</span>
            <img src="../../../../images/mine/right.png" alt="">
          </div>
        </div>
        <div class="clr"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import commonHeader from '../../../salesWap/salesHeader.vue'
import { GET_INFO_NUM } from '../../../../vuex/types'
import { tokenMethods } from '../../../../vuex/util'

export default {
  data(){
    return{
      myInfo:'',
      myAnswer:'',
      args_info:{
        type:"评论",
        token : tokenMethods.getWapToken(),    
      },
      args_answer:{
        type:"问答",
        token : tokenMethods.getWapToken(),
      },
    }
  },
  components:{
    commonHeader,
  },
  created(){
    this.inits();
    this.getAnswer();
  },
  methods:{
    inits(){
      this.$store.dispatch(GET_INFO_NUM,this.args_info).then(res =>{
        if(parseInt(tokenMethods.getInfoNum())){
          this.myInfo = res.data.commentNumber === 0 ? "": Number(res.data.commentNumber);
        }else {
          this.myInfo = Number(res.data.commentNumber);
        }
        tokenMethods.setInfoNum(this.myInfo);
      })
    },
    getAnswer(){
         this.$store.dispatch(GET_INFO_NUM,this.args_answer).then(res =>{
        if(parseInt(tokenMethods.getInfoNum())){
          this.myAnswer = res.data.commentNumber === 0 ? "" : Number(res.data.commentNumber);
        }else {
          this.myAnswer= Number(res.data.commentNumber);
        }
        tokenMethods.setInfoNum(this.myAnswer);
      })
    },
    gotoPage(str){
      this.$router.push({path:'/infoList',query:{type:str,backName:'/infoIndex',star:this.$route.query.star}});
      this.$destroy()
    },
    goBack(){
      this.$router.push(this.$route.query.backName)
      this.$destroy()
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: px2vw(88);
    z-index: 999;
    line-height: px2vw(88);
    text-align: center;
    background-color: $themeColor;
    color: #fff;
    font-size: px2vw(32);
    .back-click-area {
      position: absolute;
      top: 0;
      height: 100%;
      left: 0;
      width: px2vw(150);
      background: url("../../../../images/logIn/back.png") px2vw(20) center no-repeat;
      background-size: px2vw(18) px2vw(29);
    }
  }
  .container{
    width: 100%;
    margin-top: px2vw(88);
    .line{
      width: 100%;
      height: px2vw(130);
      .logoImg{
        width: px2vw(160);
        float: left;
        text-align: center;
        img{
          margin: px2vw(20) auto 0;
          width: px2vw(90);
        }
      }
      .detail{
        float: right;
        width: px2vw(590);
        border-bottom: px2vw(1) solid #e5e5e5;
        .title{
          font-size: px2vw(30);
          line-height: px2vw(130);
        }
        .floatRight{
          line-height: px2vw(130);
          float: right;
          .infoNum{
            font-size: px2vw(28);
            color: #fff;
            background-color: #ff0000;
            padding: 0 px2vw(10);
            border-radius: px2vw(15);
          }
          img{
            vertical-align: sub;
            margin: 0 px2vw(20);
          }
        }
      }
      .clr{
        clear: both;
      }
    }
  }
</style>
