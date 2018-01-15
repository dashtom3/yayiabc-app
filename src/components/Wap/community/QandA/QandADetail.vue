  <template>
  <div>
    <div class="header">
      <span class="back-click-area" @click="goBack"></span>
      <span class="share" @click="isSharing(detailData.faqQuestionId)"></span>
      <span class="collect" @click="collect" v-if="detailData.isCollect == 0"></span>
      <span class="isCollected" @click="collect" v-else></span>
    </div>
    <div class="container">
      <div class="eachContainer">
        <div class="headLine">
          <div class="headImg">
            <img :src="detailData.userPic + '?imageView2/1/w/200/h/200'" alt="" v-if="detailData.userPic">
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
          <span class="num">已有<span>{{detailData.faqAnswerNum}}</span>人回答</span>
          <span class="clr"></span>
        </div>
      </div>
      <div class="answerList" v-infinite-scroll="getAnswerMore" infinite-scroll-immediate-check="true" v-if="answerList.length > 0">
        <div class="eachAnswer" v-for="(value,index) in answerList">
          <div class="headLine">
            <div class="headImg">
              <img :src="value.userPic + '?imageView2/1/w/200/h/200'" alt="" v-if="value.userPic">
              <img src="../../../../images/mine/defaultHead.png" alt="" v-else>
            </div>
            <div class="name">
              {{value.userName}}
            </div>
            <div class="time" v-if="value.faqAnswerTime != null">{{value.faqAnswerTime}}</div>
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
    <div class="answerBtn" v-if="showAnswerBtn" @click="isCommenting">我要回答</div>
    <doComment v-if="isComment" :args="commentInfo" v-on:commentRes="isCommentRes" v-on:cancelComment="isComment = false"></doComment>
    <share v-if="isShareShow" v-on:cancelShare="isShareShow = false" :shareData="shareData"></share>
  </div>
</template>

<script type="text/ecmascript-6">
  import {FAQ_DETAIL, FAQ_STAR} from '../../../../vuex/types'
  import { InfiniteScroll, MessageBox} from 'mint-ui';
  import Util from '../../../../vuex/util'
  import { tokenMethods } from '../../../../vuex/util'
  import doComment from '../../index/doComment.vue'
  import share from '../../index/share.vue';
  import global from '../../global/global.js'


  export default {
    data(){
      return{
        isLoading:false,
        isDisplayOrFold:true,
        args:{
          faqQuestionId:this.$route.query.faqQuestionId,
          currentPage:1,
        },
        collectArgs: {
          postId:this.$route.query.faqQuestionId,
          type:'问答', //1 病例列表 2 我的病例列表
        },
        totalPage:0,
        timeStamp:null,
        detailData:{},
        answerList:[],
        showFoldSwitch:false,
        myUserId:tokenMethods.getWapUser() == null ? null:tokenMethods.getWapUser().userId,
        showAnswerBtn:false,
        isComment:false,
        commentInfo:{},
        shareData:{},
        isShareShow:false,
        isStar:false
      }
    },
    components:{
      doComment,
      share
    },
    created(){
      this.timeStamp = Date.parse(new Date());
      this.getdetail();
      this.mBack('goBack');
    },
    methods:{
      getdetail(){
        this.isLoading = true;
        this.$store.dispatch(FAQ_DETAIL, this.args).then(res=>{
//          console.log(res.data);
          if(this.args.currentPage === 1){
            this.detailData = res.data;
            // this.detailData.isStar = res.data.isStar == 1 ? true : false;
            this.dataCompute(this.detailData);
            if(this.detailData.faqQuestionContent){
              if(this.detailData.faqQuestionContent.length > 50){
                this.showFoldSwitch = true
              }
            }
            this.$store.commit('SAVE_SHARE_DATA',{title:this.detailData.faqQuestionTitle,desc:null,link:window.location.href,imgUrl:null,momentContentId:this.$route.query.faqQuestionId,momentName:'问答'});
            global.wxShare({title:this.detailData.userName + "发表了问答:",desc:this.detailData.faqQuestionTitle,link:window.location.href,imgUrl:null,momentContentId:this.$route.query.faqQuestionId,momentName:"问答"},this)
          }
          res.data.faqAnswerList.forEach(item =>{
            if(item.faqAnswerTime!= null) {
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
            }
          });
          if(this.myUserId != res.data.userId){
            this.showAnswerBtn = true
          }
          // this.isStar = this.detailData.isStar ? true : false;
          this.answerList = res.data.faqAnswerList.concat(this.answerList);
          this.totalPage = res.totalPage
          this.isLoading = false;
        })
      },
      getAnswerMore(){
        if(this.totalPage <= this.args.currentPage){
          return
        }else {
          this.args.currentPage++;
          this.getdetail();
        }
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
        if(this.$route.query.collectType){
          this.$router.push(this.$route.query.backName)
        }else if(this.$route.query.backName != null){
          this.$router.push(this.$route.query.backName)
        }else {
          this.$router.go(-1);
        }
        this.$destroy()
      },
      collect(){
        if (this.pointLogin()) {
          this.$store.dispatch('CASE_COLLECT', this.collectArgs).then(res => {
            if (res.callStatus === 'SUCCEED') {
              this.detailData.isCollect = this.detailData.isCollect == 1 ? 0:1;
            }
          })
        }else {
          this.isLogin();
        }
      },
      isCommenting(){
        if (this.pointLogin()) {
          this.isComment = true;
          this.commentInfo = {
            faqQuestionId: this.$route.query.faqQuestionId,
            star: 1, //唯一标识
          }
        }else {
          this.isLogin();
        }
      },
      isCommentRes(res){
//        res.faqAnswerTime = Math.ceil((this.timeStamp - res.faqAnswerTime) / 1000 / 60) + '分钟前';
        // res.faqAnswerTime = '1分钟前';
        this.answerList.unshift(res);
        this.isComment = false;
      },
      isSharing(postId){
        if (this.pointLogin()) {
          this.shareData = {
            momentType: '问答',
            momentContent: null,
            momentPicture: null,
            momentContentId: postId
          }
          this.isShareShow = true;
        }else {
          this.isLogin();
        }
      },
//      isShared(){
//
//      },
      displayOrFold(){
        this.isDisplayOrFold = !this.isDisplayOrFold
      },
      //判断是否登录
      pointLogin() {
        let userToken = tokenMethods.getWapToken();
        return userToken;
      },
      //提示需要登录
      isLogin() {
        MessageBox.confirm("请先登录!").then(action => {
          this.$router.push({
            path: "/logIn",
            query: { backName: this.$route.fullPath }
          });
        }).catch(function(error) {
          return "";
        });
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
    font-size: px2vw(36);
    .back-click-area {
      position: absolute;
      top: 0;
      height: 100%;
      left: 0;
      width: px2vw(150);
      background: url("../../../../images/logIn/back3.png") px2vw(20) center no-repeat;
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
    .isCollected {
      position: absolute;
      top: 0;
      height: 100%;
      right: px2vw(80);
      width: px2vw(80);
      background: url("../../../../images/mine/collectWhite.png") px2vw(20) center no-repeat;
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
    background-color: #f4f4f4;
    .eachContainer{
      padding: px2vw(15) px2vw(20) 0;
      width: 100%;
      border-bottom: px2vw(20) solid #f4f4f4;
      background-color: #fff;
      .headLine{
        width: 100%;
        height: px2vw(110);
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
            line-height: px2vw(50);
          }
        }
        .name{
          line-height: px2vw(110);
          display: inline-block;
          font-size: px2vw(26);
          color: #333;
          font-weight: bold;
          margin-left: px2vw(10);
        }
        .time{
          line-height: px2vw(110);
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
         width: px2vw(98);
         height: px2vw(26);
         border: 1px solid #3676b6;
         text-align: center;
         color: #3676b6;
         line-height: 0;
         padding: 0 px2vw(4);
         border-radius: px2vw(8);
         font-size: px2vw(24);
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
    .answerList{
      margin-bottom: px2vw(120);
      background-color: #fff;
      .eachAnswer{
        padding: px2vw(15) px2vw(20) px2vw(6);
        width: 100%;
        border-bottom: px2vw(1) solid #e5e5e5;
        .headLine{
          width: 100%;
          height: px2vw(110);
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
            line-height: px2vw(110);
            display: inline-block;
            font-size: px2vw(26);
            color: #333;
            margin-left: px2vw(10);
          }
          .time{
            line-height: px2vw(110);
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
  .answerBtn{
    position: fixed;
    bottom: 0;
    left: 0;
    height: px2vw(98);
    width: 100%;
    background-color: $themeColor;
    color: #fff;
    line-height: px2vw(98);
    text-align: center;
    font-size: px2vw(32);
  }
</style>
