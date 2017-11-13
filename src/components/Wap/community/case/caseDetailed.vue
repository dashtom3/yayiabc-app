<template>
  <div class="titleWrap">
    <div class="backgroundImg"></div>
    <div class="wrapTop">
      <span class="title">病例详情</span>
      <span @click="back()" class="backImgBox">
        <img src="../../../../images/case/backer.png" alt="">
      </span>
    </div>

    <div class="container">
      <div class="titleContainer">
        <div class="titleContent">
          {{caseDetailArgs.headline}}
        </div>
      </div>

      <div class="header">
        <img class="headPic" src="../../../../images/case/caseOfIllness/1.png" alt="">
        <span class="headName">{{caseDetailArgs.writer}}</span>
        <span class="class">{{caseDetailArgs.classify}}</span>
        <span class="class">免费</span>
      </div>

      <div class="read">
        <span class="readS">{{caseDetailArgs.readNumber}}阅读</span><span class="drop">&nbsp;·</span><span class="readS">&nbsp;31评论&nbsp;</span><span class="drop">·</span><span class="readS">&nbsp;20赞</span>
        <span class="readTime">{{caseDetailArgs.postTime}}</span>
      </div>

      <!--病历内容-->
      <div class="content">
        <div class="padding_Box" v-html="caseDetailArgs.freeContent"></div>
        <!--付费内容-->
        <div class="padding_Box" v-if="caseDetailArgs.chargeContent !== null" v-html="caseDetailArgs.chargeContent"></div>
        <div class="payBox" v-if="caseDetailArgs.chargeContent === null">
          <span class="payText">查看完整病例,&nbsp;需要支付2乾币~</span>
          <span class="payNow">
            <span class="payNowText">立即支付</span>
            <img src="../../../../images/case/back_1.png" alt="">
          </span>
        </div>

      </div>


      <div class="commentBox">
        <div id="allCount" class="allCount">
          全部评论&nbsp;(33)
        </div>
        <div class="comments">
          <div class="headReadPicBox">
            <img src="../../../../images/case/caseOfIllness/4.jpg" alt="">
          </div>

          <div class="commentsRightBox">
            <div class="clearFix">
              <div class="nameWrap">
                <div class="userRightName">小悟空</div>
                <div class="rightTime">2017.10.16 17:52</div>
              </div>

              <div class="likeBox">
                  <span class="commentImgBox2">
                    <img src="../../../../images/case/caseOfIllness/comment.png" alt="">
                  </span>
                  <span>回复</span>
                  <span class="commentImgBoxs">
                    <img src="../../../../images/case/caseOfIllness/like.png" alt="">
                  </span>
                  <span>500000</span>
              </div>
            </div>

            <div class="commentContent">
              我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论
            </div>

            <div class="conmentsBox">真实姓名B等人 共2条回复&nbsp;></div>
          </div>
          <div style="clear: both"></div>

          <div class="endFonts">
            -End-
          </div>
        </div>
      </div>
    </div>

    <!--下部导航栏-->
    <div  class="tabDevBox">
      <div :class="{'areaShow': writeSwitch === false}" class="areaBox">
        <div id="area" contenteditable="true"></div>
        <div class="sendBtn" @click="send">发布</div>
      </div>

    <div v-show="!writeSwitch">  <!--开关-->
      <div v-show="commentSwitch" class="writeCommentBox">
        <div @click="write()" class="writeCommentBoxSecond">
          <span class="writeImgBox">
            <img src="../../../../images/case/caseOfIllness/write.png" alt="">
          </span>
          <span>有想法就写下来吧&nbsp;.&nbsp;.&nbsp;.</span>
        </div>
      </div>

      <div class="tabDev">
      <div @click="comment()" class="tabButtonBox">
        <div>
          <img class="img1" src="../../../../images/case/caseOfIllness/comment.png" alt="">
        </div>
        <div>评论224</div>
      </div>
      <div @click="like()" class="tabButtonBox">
        <div>
          <img class="img2" src="../../../../images/case/caseOfIllness/like.png" alt="">
        </div>
        <div>赞</div>
      </div>
      <div @click="collect()" class="tabButtonBox">
        <div>
          <img class="img3" src="../../../../images/case/caseOfIllness/collect.png" alt="">
        </div>
        <div>收藏</div>
      </div>
      <div @click="share()" class="tabButtonBox">
        <div>
          <img class="img4" src="../../../../images/case/caseOfIllness/fenxiang.png" alt="">
        </div>
        <div>分享</div>
      </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  import { tokenMethods } from '../../../../vuex/util'
  export default {
    data(){
      return{
        commentSwitch: false,
        writeSwitch: false,
        containerScrollTop: 0,
        caseDetailArgs: [],
        postId: {
          postId: 162
        }
      }
    },
    created (){
      this.getCaseData();
      this.getCaseComment();
    },
    mounted (){

    },
    methods:{
      //收藏按钮
      collect(){
        if(this.pointLogin())
        {

        }else {
          this.isLogin();
        }
      },
      //赞
      like(){
        if(this.pointLogin())
        {

        }else {
          this.isLogin();
        }
      },
      //分享按钮
      share(){

      },
      //发布按钮
      send(){
        if(this.pointLogin())
        {

        }else {
          this.isLogin();
        }
      },
      write(){
        if(this.pointLogin())
        {
          this.writeSwitch = true;
          let area = this.$el.querySelector('#area');
          let area2 = this.$el.querySelector('.container');
          area.focus();

          setTimeout(function () {
            window.scrollTo(0,area2.scrollHeight);
          },300);
        }else {
          this.isLogin();
        }
      },
      //获取病例评论数据
      getCaseComment(){
        this.$store.dispatch('GET_CASE_COMMENT', {
          beCommentedId:this.postId.postId, //病例id
          currentPage: 0,//当前页数
          numberPerPage: 10, //每页显示多少条
          type: '病例'
        }).then((res) => {
            console.log(res);
        })
      },
      //获取病例数据
      getCaseData(){
        this.$store.dispatch('GET_CASE_DETAIL', this.postId).then((res) => {
          this.caseDetailArgs = res.data;
        })
      },
      //底部评论按钮
      comment (){
        let that = this;
        this.commentSwitch = !this.commentSwitch;
        if(this.commentSwitch)
        {
          //记录点击评论时的scroll位置
          this.containerScrollTop = window.document.body.scrollTop;
          let scrollPosition = this.$el.querySelector('#allCount').offsetTop;
          window.scroll(0,scrollPosition)
        }else {
          window.scroll(0,that.containerScrollTop);
        }
      },
      //提示需要登录
      pointLogin(){
        let userToken = tokenMethods.getWapToken();
        return userToken;
      },
      //判断是否登录
      isLogin() {
        MessageBox.confirm('请先登录!').then(action => {
          this.$router.push({path: '/logIn'})
        }).catch(function (error) {
          return '';
        });
      },
      back (){
        this.$router.go(-1);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

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
  .areaBox{
    padding-top: px2vw(14);
    padding-bottom: px2vw(14);
    background-color: white;
  }
  .sendBtn{
    color: green;
    display: inline-block;
    text-align: center;
    width: 17.8%;
    vertical-align: middle;
  }
  #area{
    min-height: px2vw(20);
    max-height: px2vw(200) !important;
    _height: px2vw(120);
    outline: 0;
    border: 1px solid #a0b3d6;
    font-size: px2vw(26);
    line-height: 24px;
    padding:px2vw(2);
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;

    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
    vertical-align: middle;
    display: inline-block;
    margin-left: 2%;
    width: 78%;

  }
  .conmentsBox{
    display: table-cell;
    vertical-align: middle;
    font-size: px2vw(24);
    color: #666666;
    padding-left: px2vw(20);
    height: px2vw(68);
    background-color:#f6f6f6;
    width: px2vw(638);
  }
  #write{
    border: none;
    vertical-align: middle;
  }
  .writeImgBox{
    display: inline-block;
    width: px2vw(30);
    height: px2vw(30);
    vertical-align: middle;
  }
  .writeImgBox>img{
    width: 100%;
  }
  .writeCommentBoxSecond span:nth-child(2){
    font-size: px2vw(24);
    color: #999999;
    vertical-align: middle;
  }
  .writeCommentBoxSecond{
    margin: 0 auto;
    border: 1px solid #eeeeee;
    border-radius: px2vw(10);
    height: px2vw(60);
    width: px2vw(710);
    background-color: #f4f4f4;
    padding-top: px2vw(8);
    padding-left: px2vw(19);
  }
  .writeCommentBox{
    background-color: white;
    padding: px2vw(10) px2vw(0) px2vw(15) px2vw(0);
  }
  .img4{
    width: px2vw(28);
    height: px2vw(28);
  }
  .img3{
    width: px2vw(32);
    height: px2vw(30);
  }
  .img2{
    width: px2vw(30);
    height: px2vw(30);
  }
  .img1{
    width: px2vw(32);
    height: px2vw(28);
  }
  .tabButtonBox{
    width: 25%;
    display: table-cell;
    vertical-align: middle;
    font-size: px2vw(20);
    color: #666666;
    text-align: center;
    height: px2vw(88);
    margin-left: px2vw(50);
  }
  .tabDevBox{
    position: fixed;
    width: 100vw;
    bottom: 0;
    left: 0;
    border-top: 1px solid #eeeeee;
  }
  .tabDev{
    display: table;
    height: px2vw(88);
    width: 100vw;
    background-color: white;
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
  .container{
    position: absolute;
    top:px2vw(88);
    overflow: scroll;
    width: 100%;
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
    border: 1px solid red;
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
    margin-top: px2vw(10);
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
  .commentBox{
    padding: px2vw(36) px2vw(25) px2vw(45) px2vw(17);
    margin-top: px2vw(20);
    background-color: white;
    margin-bottom: px2vw(88);
  }
  .allCount{
    margin-bottom: px2vw(4);
    font-size: px2vw(32);
    color: #3676b6;
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
  .commentsRightBox{
    text-align: left;
    width: px2vw(638);
    float: right;
    border-bottom: 1px solid #dcdcdc;
    padding-bottom: px2vw(30);
  }
  .commentsRightBox:after{
    content: '';
    display: block;
    clear: both;
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
  .likeBox span{
    vertical-align: middle;
  }
  .nameWrap{
    max-width: px2vw(250);
    float: left;
  }
  .clearFix:after{
    content: '';
    display: block;
    clear: both;
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

