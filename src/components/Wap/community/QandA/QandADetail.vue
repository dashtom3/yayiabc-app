<template>
  <div>
    <div class="header">
      <span class="back-click-area" @click="goBack"></span>
      <span class="share"></span>
      <span class="collect"></span>
    </div>
    <div class="container">
      <div class="eachContainer">
        <div class="headLine">
          <div class="headImg">
            <img :src="detailData.userPic" alt="" v-if="detailData.userPic">
            <img src="../../../../images/mine/defaultHead.png" alt="" v-else>
          </div>
          <div class="name">
            {{detailData.userName}}
          </div>
          <div class="time">{{detailData.faqQuestionTime}}</div>
        </div>
        <div class="title">
          {{detailData.faqQuestionTitle}}
        </div>
        <div class="answer" :class="{overWord:isDisplayOrFold}" v-if="detailData.faqQuestionContent">
          {{detailData.faqQuestionContent}}
        </div>
        <div v-html="isDisplayOrFold?'全文':'收起'" @click="displayOrFold" class="isDisplayOrFold" v-if="showFoldSwitch"></div>
        <div class="images">

        </div>
        <div class="other">
          <span class="classify">{{detailData.faqQuestionType}}</span>
          <span class="num"><span>{{detailData.faqAnswerNum}}</span>评论</span>
          <span class="clr"></span>
        </div>
      </div>
      <div class="answerList" v-infinite-scroll="getAnswerMore" infinite-scroll-immediate-check="true" v-if="answerList.length > 0">
        <div class="eachAnswer" v-for="(value,index) in answerList">
          <div class="headLine">
            <div class="headImg">
              <img :src="value.userPic" alt="" v-if="value.userPic">
              <img src="../../../../images/mine/defaultHead.png" alt="" v-else>
            </div>
            <div class="name">
              {{value.userName}}
            </div>
            <div class="time">{{value.faqAnswerTime}}</div>
          </div>
          <div class="answer">
            {{value.faqAnswerContent}}
          </div>
        </div>
      </div>
      <div class="noAnswer" v-else-if="!isLoading">
        <img src="../../../../images/question/noAnswer.png" alt="">
        <div>
          <p>还没有人回答</p>
          <p>快点帮帮TA吧</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {FAQ_DETAIL, } from '../../../../vuex/types'
  import { InfiniteScroll} from 'mint-ui';
  import Util from '../../../../vuex/util'

  export default {
    data(){
      return{
        isLoading:false,
        isDisplayOrFold:true,
        args:{
          faqQuestionId:this.$route.query.faqQuestionId,
          currentPage:1,
        },
        totalPage:0,
        timeStamp:null,
        detailData:{},
        answerList:[],
        showFoldSwitch:false,
      }
    },
    created(){
      this.timeStamp = Date.parse(new Date());
      this.getdetail();
    },
    methods:{
      getdetail(){
        this.isLoading = true;
        this.$store.dispatch(FAQ_DETAIL, this.args).then(res=>{
          console.log(res.data);
          this.detailData = res.data;
          this.dataCompute(this.detailData);
          if(this.detailData.faqQuestionContent){
            if(this.detailData.faqQuestionContent.length > 50){
              this.showFoldSwitch = true
            }
          }
          res.data.faqAnswerList.forEach(item =>{
            switch (true){
              //几分钟前
              case this.timeStamp - item.faqAnswerTime < 3600000:
                item.faqAnswerTime = Math.ceil((this.timeStamp - item.faqAnswerTime) / 1000 / 60) + '分钟前';
                break;
              //几小时前
              case this.timeStamp - item.faqAnswerTime >= 3600000 && this.timeStamp - item.faqAnswerTime < 86400000:
                item.faqAnswerTime = Math.floor((this.timeStamp - item.faqAnswerTime) / 1000 / 60 / 60) + '小时前';
                break;
              //日期
              case this.timeStamp - item.faqAnswerTime >= 86400000:
                item.faqAnswerTime = Util.formatDate.format(new Date(item.faqAnswerTime),'yy.MM.dd hh:mm').substring(2);
                break;
            }
          });
          this.answerList = res.data.faqAnswerList.concat(this.answerList);
          this.isLoading = false;
        })
      },
      getAnswerMore(){

      },
      dataCompute(item){
        switch (true){
          //几分钟前
          case this.timeStamp - item.faqQuestionTime < 3600000:
            item.faqQuestionTime = Math.ceil((this.timeStamp - item.faqQuestionTime) / 1000 / 60) + '分钟前';
            break;
          //几小时前
          case this.timeStamp - item.faqQuestionTime >= 3600000 && this.timeStamp - item.faqQuestionTime < 86400000:
            item.faqQuestionTime = Math.floor((this.timeStamp - item.faqQuestionTime) / 1000 / 60 / 60) + '小时前';
            break;
          //日期
          case this.timeStamp - item.faqQuestionTime >= 86400000:
            item.faqQuestionTime = Util.formatDate.format(new Date(item.faqQuestionTime),'yy.MM.dd hh:mm').substring(2);
            break;
        }
        switch (true){
          case item.faqQuestionType == 1:
            item.faqQuestionType = '口腔外科'
            break
          case item.faqQuestionType == 2:
            item.faqQuestionType = '口腔内科'
            break
          case item.faqQuestionType == 3:
            item.faqQuestionType = '口腔修复'
            break
          case item.faqQuestionType == 4:
            item.faqQuestionType = '口腔种植'
            break
          case item.faqQuestionType == 5:
            item.faqQuestionType = '口腔正畸'
            break
        }
      },
      goBack(){
        this.$router.go(-1);
        this.$destroy()
      },
      displayOrFold(){
        this.isDisplayOrFold = !this.isDisplayOrFold
      },
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
    font-size: px2vw(36);
    .back-click-area {
      position: absolute;
      top: 0;
      height: 100%;
      left: 0;
      width: px2vw(150);
      background: url("../../../../images/logIn/back.png") px2vw(20) center no-repeat;
      background-size: px2vw(18) px2vw(29);
    }
    .share {
      position: absolute;
      top: 0;
      height: 100%;
      right: 0;
      width: px2vw(80);
      background: url("../../../../images/mine/share.png") px2vw(20) center no-repeat;
      background-size: px2vw(34) px2vw(36);
    }
    .collect {
      position: absolute;
      top: 0;
      height: 100%;
      right: px2vw(80);
      width: px2vw(80);
      background: url("../../../../images/mine/star.png") px2vw(20) center no-repeat;
      background-size: px2vw(40) px2vw(38);
    }
  }
  .container{
    position: fixed;
    top: px2vw(88);
    bottom: 0;
    overflow: scroll;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    .eachContainer{
      padding: px2vw(20) px2vw(20) 0;
      width: 100%;
      border-bottom: px2vw(20) solid #f4f4f4;
      .headLine{
        width: 100%;
        height: px2vw(120);
        float: left;
        .headImg{
          display: inline-block;
          width: px2vw(60);
          height: px2vw(60);
          border-radius: 50%;
          overflow: hidden;
          vertical-align: middle;
          img{
            width: 100%;
            line-height: px2vw(60);
          }
        }
        .name{
          line-height: px2vw(120);
          display: inline-block;
          font-size: px2vw(26);
          color: #333;
          font-weight: bold;
          margin-left: px2vw(10);
        }
        .time{
          line-height: px2vw(120);
          display: inline-block;
          font-size: px2vw(24);
          color: #999;
          margin-left: px2vw(10);
          padding-bottom: px2vw(20);
        }
      }
      .title{
        width: 100%;
        font-size: px2vw(30);
        color: #333;
        margin-bottom: px2vw(20);
        font-weight: bold;
      }
      .answer{
        width: 100%;
        font-size: px2vw(28);
        color: #333;
        margin-bottom: px2vw(20);
      }
      .isDisplayOrFold{
        color: $themeColor;
        font-size: px2vw(28);
        line-height: px2vw(30);
        height: px2vw(60);
      }
      .overWord{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .other{
        padding-bottom: px2vw(30);
        height: px2vw(70);
        .classify{
          font-size: px2vw(22);
          border: 1px solid $themeColor;
          color: $themeColor;
          border-radius: px2vw(5);
          float: left;
        }
        .num{
          float: right;
          font-size: px2vw(24);
          color: #999;
          span{
            color: $themeColor;
          }
        }
        .clr{
          clear: both;
        }
      }
    }
    .eachAnswer{
      padding: px2vw(20) px2vw(20) px2vw(20);
      width: 100%;
      border-bottom: 1px solid #e5e5e5;
      .headLine{
        width: 100%;
        height: px2vw(120);
        float: left;
        .headImg{
          display: inline-block;
          width: px2vw(60);
          height: px2vw(60);
          border-radius: 50%;
          overflow: hidden;
          vertical-align: middle;
          img{
            width: 100%;
            line-height: px2vw(60);
          }
        }
        .name{
          font-weight: bold;
          line-height: px2vw(120);
          display: inline-block;
          font-size: px2vw(26);
          color: #333;
          margin-left: px2vw(10);
        }
        .time{
          line-height: px2vw(120);
          display: inline-block;
          font-size: px2vw(24);
          color: #999;
          margin-left: px2vw(10);
        }
      }
      .answer{
        width: 100%;
        font-size: px2vw(28);
        color: #333;
        margin-bottom: px2vw(20);
      }
    }
    .noAnswer{
      width: 100%;
      min-height: 50vh;
      padding-top: 20vh;
      text-align: center;
      img{
        width: px2vw(105);
        height: px2vw(140);
      }
      div{
        margin: px2vw(20) auto 0;
        color: #666;
      }
    }
  }

</style>
