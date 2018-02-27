<template>
  <div>
    <div class="header">
      <span class="back-click-area" @click="goBack" v-if="headTitle === '我的动态'"></span>
      <div class="headerTitle">{{headTitle}}</div>
      <div class="newTrend" @click="newTrend">
        <img src="../../../images/yayiCircle/newTrend.png" alt="">
        <div>发动态</div>
      </div>
    </div>
    <div class="container inputAreaAB"  :class="{myYayiCircle:headTitle === '我的动态'}">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :auto-fill=false ref="loadmore"  v-on:top-status-change="isState" v-on:bottom-status-change="isStateB" class="innerContainerWrap">
        <topLoadMore ref="topLoadMore" slot="top" :loading="topLoading" :loaded="isLoaded"></topLoadMore>
        <!--有数据的状态-->
        <div class="innerContainer">
          <div v-for="(item,index) in yayiCircleData" class="eachContainer" :key="index">
            <div class="headerImgBox">
              <div class="imgBox">
                <img :src="item.userPic + '?imageView2/1/w/200/h/200'" alt="" v-if="item.userPic">
                <img src="../../../images/mine/defaultHead.png" alt="" v-else>
              </div>
            </div>
            <div class="details">
              <div class="userName">{{item.userName}}</div>
              <div v-if="item.momentType == 1" class="type1">
                <div>
                  <div :class="{overWord:isDisplayOrFold}">{{item.momentContent}}</div>
                  <div v-if="item.momentContent.length > 100" v-html="isDisplayOrFold?'全文':'收起'" @click="displayOrFold" class="isDisplayOrFold"></div>
                </div>

                <div class="pictures">
                  <div v-for="(pic,picIndex) in item.momentPicture" :class="{onePic:item.momentPicture.length < 2,twoPic:item.momentPicture.length > 1}" :key="picIndex">
                    <img :src="pic + '?imageView2/1/w/300/h/300'" alt="" v-if="item.momentPicture.length < 2" @click="seeBigPic(pic)">
                    <img :src="pic + '?imageView2/1/w/300/h/300'" alt="" v-else @click="seeBigPic(pic)">
                  </div>
                </div>
              </div>
              <div class="typeOther" v-else>
                <div class="shareContent">
                  {{item.momentContent}}
                </div>
                <div class="shareBox" @click="gotoPage(item.momentType,item.momentContentId)">
                  <div class="shareBoxImg">
                    <img :src="item.momentPicture" alt="" v-if="item.momentPicture">
                    <img src="../../../images/yayiCircle/noImgDefault.png" alt="" v-else>
                  </div>
                  <div class="shareTitle">{{item.momentContentTitle}}</div>
                  <div class="clr"></div>
                </div>
              </div>
              <div class="menuBar">
                <span>{{item.momentTime}}</span>
                <span v-if="myUserId == item.userId" class="deleteBtn" @click="deleteTrend(item.momentId,index)">删除</span>
                <span class="commentAndLike" @click="likeThisTrend(index,item.momentId)">
                  <img src="../../../images/yayiCircle/dislike2.png" alt="" v-if="item.isZan === 0">
                  <img src="../../../images/yayiCircle/like2.png" alt="" v-else>
                  {{item.zanNumber}}
                </span>
                <span class="commentAndLike" @click.stop="commenting(index,item.momentId)">
                  <img src="../../../images/yayiCircle/comment2.png" alt="">
                  {{item.subCommentList.length}}
                </span>
              </div>
              <div class="commentBox" v-if="item.subCommentList.length > 0">
                <ul>
                  <li v-for="(comments,commentsIndex) in item.subCommentList" @click.stop="commenting(index,item.momentId,item.userId,comments.userId,comments.userName,comments.commentId)" :key="commentsIndex">
                    <span class="commentUserName">{{comments.userName}}</span>
                    <span v-if="comments.replyUserName" class="commentUserName">回复 {{comments.replyUserName}}</span>
                    <span class="commentUserName">:</span>
                    <span>{{comments.commentContent}}</span>
                    <span v-if="myUserId == comments.userId" class="deleteComment" @click.stop="deleteTheComment(index,commentsIndex,item.momentId,comments.commentId)">删除</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="clr"></div>
          </div>
        </div>
          <!--数据到底-->
        <div v-if="yayiCircleData.length !=0 && allLoaded" class="noMoreData">
          - End -
        </div>
        <!--请求完毕后，无数据显示状态-->
        <!-- <div class="noTrend" v-if="(noData && yayiCircleData.length == 0) ||(noData && !yayiCircleData)"> -->
        <div class="noTrend" v-if="yayiCircleData.length == 0 || !yayiCircleData">
          <img src="../../../images/yayiCircle/new.png" alt="">
          <p><span @click="newTrend">立即发布新动态~</span></p>
        </div>
        <bottomLoadMore ref="bottomLoadMore" slot="bottom" :loading="bottomLoading" :loaded="isLoadedB"></bottomLoadMore>
      </mt-loadmore>
    </div>
    <doComment v-if="isComment" :args="commentInfo" v-on:commentRes="isCommentRes" v-on:cancelComment="isComment = false"></doComment>
    <seeImg :url="picUrl" v-if="showPic" v-on:closeImgHolder="showPic = false"></seeImg>
  </div>
</template>

<script type="text/ecmascript-6">
  import topLoadMore from '../../salesWap/index/topLoadMore.vue'
  import bottomLoadMore from '../../salesWap/index/bottomLoadMore.vue';
  import {YAYI_CIRCLE, DELETE_TREND, ADD_COMMENT, LIKE, DELETE_COMMENT, MY_YAYI_CIRCLE, ONE_YAYI_CIRCLE} from '../../../vuex/types'
  import Util from '../../../vuex/util'
  import { tokenMethods } from '../../../vuex/util'
  import {Indicator, InfiniteScroll,Popup, LoadMore, Toast, MessageBox} from 'mint-ui'
  import doComment from '../index/doComment.vue'
  import seeImg from '../index/seeImg.vue'

  export default {
    data(){
      return{
        headTitle:'',         //标题
        topLoading:false,      //判断是否在加载中
        bottomLoading:false,
        allLoaded:false,
        args:{                //请求牙医圈列表接口参数
          currentPage:1,
        },
        totalPage: null,      //总页数
        yayiCircleData:[],    //请求结果保存的数组
        noMoreData:false,     //没有更多数据
        timeStamp:null,       //进入页面获取当前时间戳，下拉刷新会更新，但是加载更多不会
        isDisplayOrFold:true, //显示全部和折叠按钮
        myUserId:tokenMethods.getWapUser() ? tokenMethods.getWapUser().userId:'',     //获取当前登录账号的userID
        isComment:false,      //显示评论框
        commentContent:'',    //评论内容
        commentInfo: {        //点击评论按钮时，暂存的数据
          index:'',
          id:'',
          userName:'',
          parentId:''
        },
        picUrl:'',            //查看大图的url
        showPic:false,        //查看大图的开关
        noData:false,         //无数据
      }
    },
    components:{
      topLoadMore,
      bottomLoadMore,
      doComment,
      seeImg
    },
    created(){
      // Indicator.open();
      this.timeStamp = Date.parse(new Date());
      this.getYayiCircle();
      this.mBack("goBack");
    },
    methods:{
      newTrend(){
        if(!tokenMethods.getWapToken()){
          MessageBox.confirm('请先登录!').then(action => {
            this.$router.push({path: '/logIn', query: {backName: '/yayi/yayiCircle'}});
          })
          return
        }
        this.$router.push('/newTrend')
        this.$destroy()
      },
      goBack(){
        this.$router.go(-1);
        this.$destroy()
      },
      getYayiCircle(){
        var self = this;
        if(this.$router.history.current.name === 'myYayiCircle'){
          this.headTitle = '我的动态';
          this.$store.dispatch(MY_YAYI_CIRCLE, this.args).then(res =>{
            self.yayiCircleData = res.currentPage == 1 ? [] : self.yayiCircleData;
            self.dataCompute(res.data);
            self.topLoading = false;
            self.bottomLoading = false;
            self.totalPage = res.totalPage
            self.isAllLoaded();
            // Indicator.close();
          })
        }
        else if(this.$router.history.current.name === 'yayiCircle'){
          this.headTitle = '牙医圈';
          this.$store.dispatch(YAYI_CIRCLE, this.args).then(res =>{
            // console.log(11)
            self.yayiCircleData = res.currentPage == 1 ? [] : self.yayiCircleData;
            self.dataCompute(res.data);
            self.topLoading = false;
            self.bottomLoading = false;
            self.totalPage = res.totalPage
            self.isAllLoaded();
            // Indicator.close();
          })
          // this.closeTopBottomLoading();
        }
      },
      dataCompute(res){
        if(res) {
          res.forEach(item => {
            //图片字符串转数组
            if (item.momentPicture) {
              item.momentPicture = item.momentPicture.split(';');
            }
            //分享内容转换
            if (!item.momentContent) {
              if (item.momentType == 4) {
                item.momentContent = item.momentContent ? item.momentContent : '分享了问答'
              }
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
                let tmp = Math.ceil((this.timeStamp - item.momentTime) / 1000 / 60) < 1 ? 1 :Math.ceil((this.timeStamp - item.momentTime) / 1000 / 60)
                item.momentTime = tmp + '分钟前';
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
            this.yayiCircleData.push(item)
          });
          //控制是否显示加载到底的一个判断值，虽然我觉得基本上用不到。
//          if (this.args.currentPage === res.totalPage && this.args.currentPage > 1) {
//            this.noMoreData = true
//          }
        }
        else {
          this.noData = true;
//          Toast({message: '啊哦！出错了请稍后重试', duration: 1500});
        }
      },
      //删除动态
      deleteTrend(id,index){
        MessageBox.confirm('确定删除吗？').then(action => {
          this.$store.dispatch(DELETE_TREND, {momentId:id}).then(res=>{
            if(res.callStatus === 'SUCCEED'){
              Toast({message: '删除成功！', duration: 1500});
              this.yayiCircleData.splice(index,1)
            }
          })
        })
      },
      commenting(index,id,userId,commentUserId,userName,parentId){
        if(!tokenMethods.getWapToken()){
          MessageBox.confirm('请先登录!').then(action => {
            this.$router.push({path: '/logIn', query: {backName: '/yayi/yayiCircle'}});
          })
          return
        }
        // console.log(userId,commentUserId)
        if(this.myUserId && commentUserId && this.myUserId == commentUserId){
          return
        }
        this.isComment = true;
        this.commentInfo = {
          type:'牙医圈',
          index:index,
          id:id,
          userName:userName,
          parentId:parentId
        }
      },
      isCommentRes(res){
        let index = this.commentInfo.index;
        this.yayiCircleData[index].subCommentList.push(res)
        this.isComment = false;
      },
      deleteTheComment(index,num,id,thisId){
        MessageBox.confirm('确定删除吗？').then(action => {
          let obj = {
            type:'牙医圈',
            beCommentedId:id,
            parentId:thisId,
//          presentId:''
          }
          this.$store.dispatch(DELETE_COMMENT, obj).then(res=>{
            if(res.callStatus === 'SUCCEED'){
              Toast({message: '删除成功！', duration: 1500});
              this.yayiCircleData[index].subCommentList.splice(num,1)
            }
          })
        })
      },
      likeThisTrend(index,id){
        if(!tokenMethods.getWapToken()){
          MessageBox.confirm('请先登录!').then(action => {
            this.$router.push({path: '/logIn', query: {backName: '/yayi/yayiCircle'}});
          })
          return
        }
        let obj = {
          type : '牙医圈',
          typeId : id,
        }
        this.$store.dispatch(LIKE, obj).then(res=>{
          //改变是否点赞的图标
          this.yayiCircleData[index].isZan = this.yayiCircleData[index].isZan ? 0 : 1;
          //点完之后真，+1，假，-1
          this.yayiCircleData[index].zanNumber = this.yayiCircleData[index].isZan ? this.yayiCircleData[index].zanNumber + 1 : this.yayiCircleData[index].zanNumber - 1;
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
            this.$router.push({path:'/videoDetailed',query:{id:postId}})
            break
          case type == 3:
            this.$router.push({path:'/caseDetailed',query:{id:postId}})
            break
          case type == 4:
            this.$router.push({path:'/QandADetail',query:{faqQuestionId:postId}})
            break
        }
      },
      loadMore(){
        this.bottomLoading = true
        if(this.args.currentPage >= this.totalPage){
          if(!this.bottomLoading){
            this.noMoreData = true;
          }
        }else {
          this.args.currentPage = this.args.currentPage + 1;
          this.noMoreData = false;
          this.getYayiCircle();
          //  再加载下一页
        }
      },
      loadTop(){
        this.args.currentPage = 1;
        this.timeStamp = Date.parse(new Date());
        // this.yayiCircleData = [];
        this.topLoading = true;
        this.getYayiCircle();
        //把所有参数回归为初始值，并且重新获得时间戳
      },
      //mt中接受的val值作为参数传入我的组件里
      isState(val){
        this.$refs.topLoadMore.states(val)
      },
      //把下拉刷新完成之后回调的mt的方法传入我的组件里
      isLoaded(){
        this.$refs.loadmore.onTopLoaded();
      },
      displayOrFold(){
        this.isDisplayOrFold = !this.isDisplayOrFold
      },
      isStateB(val){
        console.log(val)
        this.$refs.bottomLoadMore.states(val)
      },
      isLoadedB(){
        this.$refs.loadmore.onBottomLoaded();
      },
      isAllLoaded(){
        this.allLoaded = this.totalPage <= this.args.currentPage ? true : false;
        // console.log(this.allLoaded);
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

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
      background: url("../../../images/logIn/back.png") px2vw(20) center no-repeat;
      background-size: px2vw(18) px2vw(29);
    }
    .newTrend{
      position: absolute;
      right: 0;
      top: 0;
      display: inline-block;
      width: px2vw(200);
      div{
        display: inline-block;
        line-height: px2vw(88);
        vertical-align: top;
        font-size: px2vw(30);
      }
      img{
        height: px2vw(50);
        margin-top: px2vw(19);
      }
    }
  }
  .container{
    position: fixed;
    top: px2vw(88);
    bottom: 0;
    overflow: scroll;
    width: 100%;
    height: 86vh;
    -webkit-overflow-scrolling: touch;
    padding-top: px2vw(0);
    background-color: #f4f4f4;
    .innerContainerWrap{
      min-height: px2vw(100);
      .innerContainer{
        width: 100%;
        background-color: #fff;
        .eachContainer{
          width:100%;
          padding: 0 px2vw(20) px2vw(30) 0;
          border-bottom: px2vw(1) solid #e5e5e5;
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
                    width: 100%;
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
        margin-top: px2vw(-1);
        background-color: #fff;
        width: 100%;
        height: px2vw(80);
        font-size: px2vw(26);
        margin-bottom: px2vw(12);
        color: #999;
        text-align: center;
        line-height: px2vw(80);
        background-color: #f4f4f4;
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
  .myYayiCircle{
    height: 94vh;
  }
  .clr{
    clear: both;
  }
</style>
