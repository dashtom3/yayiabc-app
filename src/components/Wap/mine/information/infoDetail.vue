<template>
  <div>
    <div class="header">
      <span class="back-click-area" @click="goBack"></span>
      <div class="headerTitle">{{headTitle}}</div>
    </div>
    <div class="container">
      <div class="innerContainerWrap">
        <!--有数据的状态-->
        <div class="innerContainer">
          <div class="eachContainer">
            <div class="headerImgBox">
              <div class="imgBox">
                <img :src="yayiCircleData.userPic" alt="" v-if="yayiCircleData.userPic">
                <img src="../../../../images/mine/defaultHead.png" alt="" v-else>
              </div>
            </div>
            <div class="details">
              <div class="userName">{{yayiCircleData.userName}}</div>
              <div v-if="yayiCircleData.momentType == 1" class="type1">
                <div>
                  <div :class="{overWord:isDisplayOrFold}">{{yayiCircleData.momentContent}}</div>
                  <div v-if="yayiCircleData.momentContent.length > 100" v-html="isDisplayOrFold?'全文':'收起'" @click="displayOrFold" class="isDisplayOrFold"></div>
                </div>

                <div class="pictures">
                  <div v-for="(pic,picIndex) in yayiCircleData.momentPicture" :class="{onePic:yayiCircleData.momentPicture.length < 2,twoPic:yayiCircleData.momentPicture.length > 1}">
                    <img :src="pic" alt="" v-if="yayiCircleData.momentPicture.length < 2" @click="seeBigPic(pic)">
                    <img :src="pic" alt="" v-else @click="seeBigPic(pic)">
                  </div>
                </div>
              </div>
              <div class="typeOther" v-else>
                <div class="shareContent">
                  {{yayiCircleData.momentContent}}
                </div>
                <div class="shareBox" @click="gotoPage(yayiCircleData.momentType,yayiCircleData.momentContentId)">
                  <div class="shareBoxImg">
                    <img :src="yayiCircleData.momentPicture" alt="" v-if="yayiCircleData.momentPicture">
                    <img src="../../../../images/yayiCircle/noImgDefault.png" alt="" v-else>
                  </div>
                  <div class="shareTitle">{{yayiCircleData.momentContentTitle}}</div>
                  <div class="clr"></div>
                </div>
              </div>
              <div class="menuBar">
                <span>{{yayiCircleData.momentTime}}</span>
                <!--<span v-if="myUserId == yayiCircleData.userId" class="deleteBtn" @click="deleteTrend(yayiCircleData.momentId,index)">删除</span>-->
                <span class="commentAndLike" @click="likeThisTrend(yayiCircleData.momentId)">
                  <img src="../../../../images/yayiCircle/dislike.png" alt="" v-if="yayiCircleData.isZan === 0">
                  <img src="../../../../images/yayiCircle/like.png" alt="" v-else>
                  {{yayiCircleData.zanNumber}}
                </span>
                <span class="commentAndLike" @click="commenting(yayiCircleData.momentId)">
                  <img src="../../../../images/yayiCircle/comment.png" alt="">
                  {{yayiCircleData.subCommentList.length}}
                </span>
              </div>
              <div class="commentBox" v-if="yayiCircleData.subCommentList.length > 0">
                <ul>
                  <li v-for="(comments,commentsIndex) in yayiCircleData.subCommentList" @click.stop="commenting(yayiCircleData.momentId,comments.userName,comments.commentId)">
                    <span class="commentUserName">{{comments.userName}}</span>
                    <span v-if="comments.replyUserName" class="commentUserName">回复{{comments.replyUserName}}</span>
                    <span class="commentUserName">:</span>
                    <span>{{comments.commentContent}}</span>
                    <span v-if="myUserId == comments.userId" class="deleteComment" @click.stop="deleteTheComment(commentsIndex,yayiCircleData.momentId,comments.commentId)">删除</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="clr"></div>
          </div>
        </div>
      </div>
    </div>
    <doComment v-if="isComment" :args="commentInfo" v-on:commentRes="isCommentRes" v-on:cancelComment="isComment = false"></doComment>
    <seeImg :url="picUrl" v-if="showPic" v-on:closeImgHolder="showPic = false"></seeImg>
  </div>
</template>

<script type="text/ecmascript-6">
  import {DELETE_TREND, ADD_COMMENT, LIKE, DELETE_COMMENT, ONE_YAYI_CIRCLE} from '../../../../vuex/types'
  import Util from '../../../../vuex/util'
  import { tokenMethods } from '../../../../vuex/util'
  import {Indicator, InfiniteScroll,Popup, LoadMore, Toast, MessageBox} from 'mint-ui'
  import doComment from '../../index/doComment.vue'
  import seeImg from '../../index/seeImg.vue'

  export default {
    data(){
      return{
        headTitle:'我的动态',         //标题
        isLoading:false,      //判断是否在加载中
        yayiCircleData:[],    //请求结果保存的数组
        timeStamp:null,       //进入页面获取当前时间戳，下拉刷新会更新，但是加载更多不会
        isDisplayOrFold:true, //显示全部和折叠按钮
        myUserId:tokenMethods.getWapUser() ? tokenMethods.getWapUser().userId:'',     //获取当前登录账号的userID
        isComment:false,      //显示评论框
        commentContent:'',    //评论内容
        commentInfo: {        //点击评论按钮时，暂存的数据
          id:'',
          userName:'',
          parentId:''
        },
        picUrl:'',            //查看大图的url
        showPic:false,        //查看大图的开关
      }
    },
    components:{
      doComment,
      seeImg
    },
    created(){
      this.timeStamp = Date.parse(new Date());
      console.log(this.$router.history.current.name)
      this.getOneTrend();
    },
    methods:{
      getOneTrend(){
        this.isLoading = true;
        this.$store.dispatch(ONE_YAYI_CIRCLE, {momentId:this.$route.query.momentId}).then(res =>{
          console.log(res.data);
          let item = res.data
          if(res) {
            if (item.momentPicture) {
              item.momentPicture = item.momentPicture.split(';');
            }
            //分享内容转换
            if (!item.momentContent) {
              if (item.momentType == 3) {
                item.momentContent = item.momentContent ? item.momentContent : '分享了病例'
              }
              else if (item.momentType == 2) {
                item.momentContent = item.momentContent ? item.momentContent : '分享了视频'
              }
            }
            //时间转换
            switch (true) {
              //几分钟前
              case this.timeStamp - item.momentTime < 3600000:
//                console.log(this.timeStamp - item.momentTime)
                item.momentTime = Math.ceil((this.timeStamp - item.momentTime) / 1000 / 60) + '分钟前';
                break;
              //几小时前
              case this.timeStamp - item.momentTime >= 3600000 && this.timeStamp - item.momentTime < 86400000:
//                console.log(this.timeStamp - item.momentTime)
                item.momentTime = Math.floor((this.timeStamp - item.momentTime) / 1000 / 60 / 60) + '小时前';
                break;
                //日期
              case this.timeStamp - item.momentTime >= 86400000:
                item.momentTime = Util.formatDate.format(new Date(item.momentTime), 'yy.MM.dd hh:mm').substring(2);
                break;
              }
            this.yayiCircleData = item
            console.log(this.yayiCircleData, 'ww');
            //控制是否显示加载到底的一个判断值，虽然我觉得基本上用不到。
          }
          else {
            Toast({message: '啊哦！出错了请稍后重试', duration: 1500});
          }
          this.isLoading = false;
        })
      },
      //删除动态
//      deleteTrend(id,index){
//        this.$store.dispatch(DELETE_TREND, {momentId:id}).then(res=>{
//          console.log(res)
//          if(res.callStatus === 'SUCCEED'){
//            Toast({message: '删除成功！', duration: 1500});
//            this.yayiCircleData.splice(index,1)
//          }
//        })
//      },
      commenting(id,userName,parentId){
        if(!tokenMethods.getWapToken()){
          MessageBox.confirm('请先登录!').then(action => {
            this.$router.push({path: '/logIn', query: {backName: '/yayiCircle'}});
          })
          return
        }
        this.isComment = true;
        this.commentInfo = {
          type:'牙医圈',
          id:id,
          userName:userName,
          parentId:parentId
        }
      },
      isCommentRes(res){
//        console.log(index)
//        console.log(this.yayiCircleData[index],'当前')
//        console.log(this.yayiCircleData[index].subCommentList.push(res),'结果')
//        this.$set(this.yayiCircleData[index],'subCommentList',this.yayiCircleData[index].subCommentList.push(res))
        this.yayiCircleData.subCommentList.push(res)
        this.isComment = false;
      },
      deleteTheComment(num,id,thisId){
        let obj = {
          type:'牙医圈',
          beCommentedId:id,
          parentId:thisId,
//          presentId:''
        }
        this.$store.dispatch(DELETE_COMMENT, obj).then(res=>{
          if(res.callStatus === 'SUCCEED'){
            Toast({message: '删除成功！', duration: 1500});
//            this.$set(this.yayiCircleData[index],'subCommentList',this.yayiCircleData[index].subCommentList.splice(num,1))
            this.yayiCircleData.subCommentList.splice(num,1)
          }
        })
      },
      likeThisTrend(id){
        if(!tokenMethods.getWapToken()){
          MessageBox.confirm('请先登录!').then(action => {
            this.$router.push({path: '/logIn', query: {backName: '/yayiCircle'}});
          })
          return
        }
        let obj = {
          type : '牙医圈',
          typeId : id,
        }
        this.$store.dispatch(LIKE, obj).then(res=>{
          //改变是否点赞的图标
          this.yayiCircleData.isZan = this.yayiCircleData.isZan ? 0 : 1;
          //数字变化
//          let likeNum = this.yayiCircleData[index].zanNumber;
          //点完之后真，+1，假，-1
          this.yayiCircleData.zanNumber = this.yayiCircleData.isZan ? this.yayiCircleData.zanNumber + 1 : this.yayiCircleData.zanNumber - 1;
        })
      },
      seeBigPic(url){
        this.showPic = true;
        this.picUrl = url
      },
      gotoPage(type,postId){
        //页面跳转，携带参数？
        if(type == 1){
          return
        }
        switch (true){
          case type == 2:
            this.$router.push({path:'/caseOfIllness',query:{postId:postId}})
            break
          case type == 3:
            this.$router.push({path:'/video',query:{viId:viId}})
            break
          case type == 4:
            console.log(type);
            //别忘了做点什么！！
            break
        }
      },
      displayOrFold(){
        this.isDisplayOrFold = !this.isDisplayOrFold
      },
      goBack(){
        this.$router.push({path:this.$route.query.backName,query:{type:this.$route.query.type,backName:this.$route.query.backName}});
        this.$destroy()
      }
    },
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
  }
  .container{
    position: fixed;
    top: px2vw(88);
    bottom: 0;
    overflow: scroll;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    padding: px2vw(20) px2vw(20) 0 0;
    background-color: #fff;
    .innerContainerWrap{
      min-height: px2vw(100);
      .innerContainer{
        width: 100%;
        .eachContainer{
          width:100%;
          margin-bottom: px2vw(30);
          .headerImgBox{
            float: left;
            width: px2vw(130);
            .imgBox{
              margin: px2vw(40) auto 0;
              width: px2vw(90);
              height: px2vw(90);
              border-radius: 50%;
              overflow: hidden;
              img{
                width: 100%;
              }
            }
          }
          .details{
            margin: px2vw(40) 0 0;
            float: right;
            width: px2vw(600);
            .userName{
              height: px2vw(32);
              font-size: px2vw(32);
              color: $themeColor;
              line-height: px2vw(32);
            }
            .type1{
              width: 100%;
              font-size: px2vw(30);
              color: #333;
              margin-top: px2vw(34);
              line-height: px2vw(50);
              /*height: px2vw(250);*/
              .overWord{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 5;
                overflow: hidden;
              }
              .isDisplayOrFold{
                color: $themeColor;
                font-size: px2vw(30);
                line-height: px2vw(80);
                height: px2vw(60);
              }
              .pictures{
                margin: px2vw(20) 0;
                .onePic{
                  img{
                    max-height: px2vw(360);
                    max-width: 100%;
                  }
                }
                .twoPic{
                  display: inline-block;
                  margin: 0 px2vw(10) px2vw(4) 0;
                  width: px2vw(190);
                  height: px2vw(190);
                  overflow: hidden;
                  img{
                    max-width: px2vw(400);
                    max-height: px2vw(400);
                  }
                }
              }
            }
            .typeOther{
              width: 100%;
              font-size: px2vw(30);
              color: #333;
              margin-top: px2vw(10);
              line-height: px2vw(80);
              .shareContent{

              }
              .shareBox{
                background-color: #f4f4f4;
                width: 100%;
                margin-top: px2vw(10);
                height: px2vw(120);
                padding: px2vw(15);
                .shareBoxImg{
                  width: px2vw(90);
                  height: px2vw(90);
                  overflow: hidden;
                  float: left;
                  img{
                    width: 100%;
                  }
                }
                .shareTitle{
                  float: left;
                  width: px2vw(450);
                  margin: px2vw(5) px2vw(15);
                  font-size: px2vw(28);
                  line-height: px2vw(44);
                  color: #333;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                }
                .clr{
                  clear: both;
                }
              }
            }
            .menuBar{
              margin-top: px2vw(20);
              font-size: px2vw(24);
              color: #999;
              .deleteBtn{
                margin-left: px2vw(30);
                display: inline-block;
                color: $themeColor;
              }
              .commentAndLike{
                img{
                  width: px2vw(30);
                  vertical-align: sub;
                }
                float: right;
                display: inline-block;
                width: px2vw(100);
                text-align: right;
              }
            }
            .commentBox{
              color: #333;
              margin-top: px2vw(20);
              border-top: px2vw(1) solid #ddd;
              ul{
                margin: px2vw(30) 0;
                padding: 0 px2vw(10) px2vw(20);
                background-color: #f6f6f6;
                li{
                  padding: px2vw(20) px2vw(10) 0;
                  .commentUserName{
                    color: $themeColor;
                  }
                  .deleteComment{
                    color:$themeColor;
                  }
                }
              }
            }
          }
        }
      }
      .noMoreData{
        width: 100%;
        height: px2vw(40);
        font-size: px2vw(26);
        color: #999;
        text-align: center;
        line-height: px2vw(40);
      }
      .noTrend{
        width: 100%;
        height: 90vh;
        text-align: center;
        img{
          margin:px2vw(400) auto px2vw(30);
          width: px2vw(150);
        }
        p{
          font-size: px2vw(30);
          color:$themeColor;
        }
      }
    }

  }
  .clr{
    clear: both;
  }
</style>
