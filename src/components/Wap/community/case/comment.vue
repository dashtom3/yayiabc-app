<template>
    <div>

      <!--二级评论开始-->
      <div v-if="commentChild.switchShow" class="back_Ground"></div>
      <div v-if="commentChild.switchShow">
        <div class="wrapTop">
          <span class="title">{{commentChild.comment.subCommentList.length}}条回复</span>
          <span @click="backChild()" class="backImgBox2">
        <img src="../../../../images/case/backer.png" alt="">
      </span>
        </div>
        <div class="container">
          <div  class="comments commentBox">
            <div class="headReadPicBox">
              <img src="../../../../images/case/caseOfIllness/4.jpg" alt="">
            </div>
            <div class="commentsRightBox">
              <div class="clearFix">
                <div class="nameWrap">
                  <div class="userRightName">{{commentChild.comment.userName}}</div>
                  <div class="rightTime">{{commentChild.comment.commentTime}}</div>
                </div>

                <div class="likeBox">
                  <span class="commentImgBox2">
                    <img src="../../../../images/case/caseOfIllness/comment.png" alt="">
                  </span>
                  <span>回复</span>
                  <span class="commentImgBoxs">
                    <img src="../../../../images/case/caseOfIllness/like.png" alt="">
                  </span>
                  <span>{{commentChild.comment.zan}}</span>
                </div>
              </div>

              <div class="commentContent">
                {{commentChild.comment.commentContent}}
              </div>
            </div>
            <div style="clear: both"></div>
          </div>


          <div v-for="(item, index) in commentChild.comment.subCommentList" class="comments commentBox2">
            <div class="headReadPicBox">
              <img src="../../../../images/case/caseOfIllness/4.jpg" alt="">
            </div>
            <div class="commentsRightBox">
              <div class="clearFix">
                <div class="nameWrap">
                  <div class="userRightName">{{item.userName}}</div>
                  <div class="rightTime">{{item.commentTime}}</div>
                </div>

                <div @click="write('two',item.userName)" class="likeBox">
                  <div class="replyBox">
                  <span class="commentImgBox2">
                    <img src="../../../../images/case/caseOfIllness/comment.png" alt="">
                  </span>
                  <span>回复</span>
                  </div>


                  <div class="likeBox">
                  <span class="commentImgBoxs">
                    <img src="../../../../images/case/caseOfIllness/like.png" alt="">
                  </span>
                  <span>{{item.zan}}</span>
                  </div>
                </div>
              </div>

              <div class="commentContent">
                回复&nbsp;<span class="fontColor">{{comment.userName}}</span>:&nbsp;{{item.commentContent}}
              </div>
            </div>
            <div style="clear: both"></div>
          </div>

          <div class="e ndFonts">-End-</div>

        </div>



      </div>
      <!--二级评论结束-->




<!--一级评论-->
      <!--<div :class="{'changeHeight':commentChild.switchShow == true}" class="commentBoxOnce">-->
      <div v-show="!commentChild.switchShow" class="commentBoxOnce">
      <div  id="allCount" class="allCount ">
        全部评论&nbsp;({{detailedCommentArgs.totalNumber}})
      </div>

      <div v-for="(item, index) in detailedCommentArgs.data" class="comments">
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
              <div v-if="item.userId != myUserId" @click="write('one')" class="likeBox">
                  <span class="commentImgBox2">
                    <img src="../../../../images/case/caseOfIllness/comment.png" alt="">
                  </span>
              <span>回复</span>
               </div>


              <div @click="_delete()" v-if="item.userId == myUserId" class="likeBox">
                  <span class="commentImgBox2">
                    <img src="../../../../images/case/caseOfIllness/delete.png" alt="">
                  </span>
                <span>删除</span>
              </div>


              <div class="likeBox">
              <span class="commentImgBoxs">
                    <img src="../../../../images/case/caseOfIllness/like.png" alt="">
                  </span>
              <span>{{item.zan}}</span>
              </div>
            </div>
          </div>

          <div class="commentContent">
            {{item.commentContent}}
          </div>

          <div @click="childComment(index)" v-if="item.subCommentList.length != 0" class="conmentsBox">{{item.subCommentList[0].replyUserName}}<span v-if="item.subCommentList.length != 1">等人</span>共{{item.subCommentList.length}}条回复&nbsp;></div>
        </div>
        <div style="clear: both"></div>

        <div class="endFonts">
          -End-
        </div>
      </div>



      <!--下部导航栏-->
      <div v-show="writeSwitch"  class="tabDevBox">
        <div>  <!--开关-->
          <div v-show="commentSwitch" class="writeCommentBox">
            <div @click="write('one')" class="writeCommentBoxSecond">
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
              <div>评论{{detailedCommentArgs.totalNumber}}</div>
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
            <div @click="shareCase(detailedCommentParameter.beCommentedId)" class="tabButtonBox">
              <div>
                <img class="img4" src="../../../../images/case/caseOfIllness/fenxiang.png" alt="">
              </div>
              <div>分享</div>
            </div>
          </div>
        </div>
      </div>
      </div>


      <doComment class="doComment" v-if="isComment" :args="commentInfo" v-on:commentRes="isCommentRes" v-on:cancelComment="escBtn"></doComment>

      <share v-if="isShareShow" v-on:cancelShare="isShareShow = false" :shareData="shareData"></share>
    </div>
</template>

<script>
  import doComment from '../../index/doComment.vue';
  import { tokenMethods } from '../../../../vuex/util';
  import {MessageBox  } from 'mint-ui';
  import share from '../../index/share.vue'


  export default {
    props:{
      types:{
        type: String,
        default: ''
      }
    },
    data(){
      return{
        commentIndex: '',
        commentSwitch: false,
        writeSwitch: true,
        containerScrollTop: 0,
        detailedCommentArgs: [], //获取详情评论的数据
        detailedCommentParameter: {  //获取详情评论的参数
          beCommentedId: 645, //病例id
          currentPage: 1,//当前页数
          numberPerPage: 10, //每页显示多少条
          type: '病例'
        },
        //获取当前登录账号的userID
        myUserId:tokenMethods.getWapUser() ? tokenMethods.getWapUser().userId:'',
        commentChild:{
          comment: [],
          switchShow: false
        },
        isComment: false,
        commentInfo:{}, //评论子组件传值
        isShareShow:false, //是否显示分享按钮
        shareData:{}  //传给分享组件的对象
      }
    },
    created(){
      this.getCaseComment();
    },
    methods:{
      //删除按钮
      _delete(){

      },
      //隐藏二级评论
      backChild(){
        this.commentChild.switchShow = false;
      },
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
      shareCase(postId){
        this.shareData = {
          momentType: 3,
          momentContent: null,
          momentPicture: null,
          momentContentId: postId
        }
        this.isShareShow = true;
      },
      //评论取消按钮
      escBtn(){
        this.isComment = false;
        window.scroll(0,this.containerScrollTop);
        this.writeSwitch = true;
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
      //评论子组件品论完回调
      //发布按钮
      isCommentRes(res){
        console.log(res,'结果');
        this.isComment = false;
        window.scroll(0,this.containerScrollTop);
      },
      write(type, name){
        name = name || '';
        if(this.pointLogin())
        {
          this.containerScrollTop = window.document.body.scrollTop;
          this.writeSwitch = false;
          if(type === 'one')
          {
            //一级评论
            this.isComment = true;
            this.commentInfo = {
              type: this.types,
              index:'',
              id: this.detailedCommentParameter.beCommentedId,
              userName:'',
              parentId:''
            }
          }else {
            //二级评论
            console.log(name, '姓名');
            this.isComment = true;
            this.commentInfo = {
              type: this.types,
              index: this.commentIndex,
              id: this.detailedCommentParameter.beCommentedId,
              userName: name,
              parentId: this.commentChild.comment.commentId
            }
          }
        }else {
          this.isLogin();
        }
      },
      //获取病例评论数据
      getCaseComment(){
        this.$store.dispatch('GET_CASE_COMMENT', this.detailedCommentParameter).then((res) => {
          this.detailedCommentArgs = res;
        })
      },
      //子组件 跳转二级评论
      childComment(index){
        this.commentIndex= index;
        this.commentChild.comment = this.detailedCommentArgs.data[index];
        this.commentChild.switchShow = true;
      },
      //判断是否登录
      pointLogin(){
        let userToken = tokenMethods.getWapToken();
        return userToken;
      },
       //提示需要登录
      isLogin() {
        MessageBox.confirm('请先登录!').then(action => {
          this.$router.push({path: '/logIn'})
        }).catch(function (error) {
          return '';
        });
      },
    },
    components:{doComment,share}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../../common/sass/factory";

    .changeHeight{
      height: 0 !important;
      overflow: hidden !important;
    }
    .replyBox{
      display: inline-block;
      vertical-align: middle;
    }
    .back_Ground{
      position: fixed;
      top:0;
      bottom: 0;
      left:0;
      right: 0;
      background-color: #f4f4f4;
      z-index: 1000;
    }

    .userRightName{
      max-width: px2vw(250);
      font-size: px2vw(24);
      color: #333333;
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
    .comments{
      padding-top: px2vw(36);
    }
    .comments:after{
      content: '';
      display: block;
      clear: both;
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
    .allCount{
      margin-bottom: px2vw(4);
      font-size: px2vw(32);
      color: #3676b6;
    }
    .rightTime{
      max-width: px2vw(250);
      font-size: px2vw(20);
      color: #999999;
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

    .endFonts{
      font-size: px2vw(20);
      color: #999999;
      text-align: center;
      margin-top: px2vw(35);
    }
    .tabDevBox{
      position: fixed;
      width: 100vw;
      bottom: 0;
      left: 0;
      border-top: 1px solid #eeeeee;
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
    .writeImgBox{
      display: inline-block;
      width: px2vw(30);
      height: px2vw(30);
      vertical-align: middle;
    }
    .writeImgBox>img{
      width: 100%;
    }
    .tabDev{
      display: table;
      height: px2vw(88);
      width: 100vw;
      background-color: white;
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
      top:px2vw(0);
      width: 100vw;
      left: 0;
      z-index:1001;
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

    .wrapTop{
      z-index: 2000;
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
    .commentBoxOnce{
      padding: px2vw(36) px2vw(25) px2vw(45) px2vw(17);
      margin-top: px2vw(20);
      background-color: white;
      margin-bottom: px2vw(88);
    }
  .doComment{
    position: relative !important;
    z-index: 20000 !important;
  }
</style>

