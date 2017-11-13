<template>
  <div >

    <div class="container">
    <div  class="comments commentBox">
      <div class="headReadPicBox">
        <img src="../../../../images/case/caseOfIllness/4.jpg" alt="">
      </div>
      <div class="commentsRightBox">
        <div class="clearFix">
          <div class="nameWrap">
            <div class="userRightName">{{comment.userName}}</div>
            <div class="rightTime">{{comment.commentTime}}</div>
          </div>

          <div class="likeBox">
                  <span class="commentImgBox2">
                    <img src="../../../../images/case/caseOfIllness/comment.png" alt="">
                  </span>
            <span>回复</span>
            <span class="commentImgBoxs">
                    <img src="../../../../images/case/caseOfIllness/like.png" alt="">
                  </span>
            <span>{{comment.zan}}</span>
          </div>
        </div>

        <div class="commentContent">
          {{comment.commentContent}}
        </div>
      </div>
      <div style="clear: both"></div>
    </div>


      <div v-for="(item, index) in comment.subCommentList" class="comments commentBox2">
        <div class="headReadPicBox">
          <img src="../../../../images/case/caseOfIllness/4.jpg" alt="">
        </div>
        <div class="commentsRightBox">
          <div class="clearFix">
            <div class="nameWrap">
              <div class="userRightName">{{item.userName}}</div>
              <div class="rightTime">{{item.commentTime}}</div>
            </div>

            <div class="likeBox">
                  <span class="commentImgBox2">
                    <img src="../../../../images/case/caseOfIllness/comment.png" alt="">
                  </span>
              <span>回复</span>
              <span class="commentImgBoxs">
                    <img src="../../../../images/case/caseOfIllness/like.png" alt="">
                  </span>
              <span>{{item.zan}}</span>
            </div>
          </div>

          <div class="commentContent">
           回复&nbsp;<span class="fontColor">{{comment.userName}}</span>:&nbsp;{{item.commentContent}}
          </div>
        </div>
        <div style="clear: both"></div>
      </div>


      <div @click="sss" class="e ndFonts">-End-</div>

    </div>


  </div>
</template>

<script>
  export default{
    data (){
      return {

      }
    },
    props:{
      comment:{
        type: Object,
        default: {}
      }
    },
    methods:{
      back(){

      },
      sss(){
        console.log(this.comment);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../../common/sass/factory";
    .fontColor{
      color: $themeColor;
    }
    .commentBox2{
      padding: px2vw(48) px2vw(20) px2vw(0) px2vw(20) !important;
      border-bottom: 1px solid #dcdcdc;
    }
    .commentBox{
      padding: px2vw(48) px2vw(20) px2vw(0) px2vw(20) !important;
      background-color: white;
      border-bottom: 1px solid #dcdcdc;
    }
    .container{
      position: absolute;
      top:px2vw(88);
      width: 100vw;
      left: 0;
    }
    .headReadPicBox{
      width: px2vw(50);
      height: px2vw(50);
      float: left;
    }
    .headReadPicBox:after{
      content: '';
      display: block;
      clear: both;
    }
    .headReadPicBox img{
      margin-top: px2vw(7);
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .comments{
      padding-top: px2vw(36);
    }
    .comments:after{
      content: '';
      display: block;
      clear: both;
    }
    .commentsRightBox{
      text-align: left;
      width: px2vw(638);
      float: right;
      padding-bottom: px2vw(30);
    }
    .commentsRightBox:after{
      content: '';
      display: block;
      clear: both;
    }
    .commentsRightBox{
      text-align: left;
      width: px2vw(638);
      float: right;
      padding-bottom: px2vw(30);
    }
    .commentsRightBox:after{
      content: '';
      display: block;
      clear: both;
    }
    .clearFix:after{
      content: '';
      display: block;
      clear: both;
    }
    .nameWrap{
      max-width: px2vw(250);
      float: left;
    }
    .userRightName{
      max-width: px2vw(250);
      font-size: px2vw(24);
      color: #333333;
    }
    .rightTime{
      max-width: px2vw(250);
      font-size: px2vw(20);
      color: #999999;
    }
    .userRightName{
      max-width: px2vw(250);
      font-size: px2vw(24);
      color: #333333;
    }
    .likeBox{
      float: right;
      margin-top: px2vw(8);
    }
    .likeBox span:nth-child(2){
      margin-left: px2vw(6);
      margin-right: px2vw(16);
    }
    .likeBox span:nth-child(2),.likeBox span:nth-child(4){
      font-size: px2vw(20);
      color: #2a2a2a;
    }
    .likeBox span:nth-child(3){
      margin-right: px2vw(6);
    }
    .commentImgBox2{
      display: inline-block;
      width: px2vw(32);
      height: px2vw(28);
    }
    .commentImgBox2 img {
      width: 100%;
      height: 100%;
    }
    .commentImgBoxs{
      display: inline-block;
      width: px2vw(30);
      height: px2vw(30);
    }
    .commentImgBoxs img{
      width: 100%;
      height: 100%;
    }
    .commentContent{
      margin-top: px2vw(24);
      margin-bottom: px2vw(24);
      font-size: px2vw(28);
      color: #333333;
    }
    .endFonts{
      font-size: px2vw(20);
      color: #999999;
      text-align: center;
      margin-top: px2vw(35);
    }
</style>

