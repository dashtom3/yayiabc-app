<template>
    <div class="comment-wrapper">
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
              <img v-if="item.userPic" :src="item.userPic" alt="头像">
              <img v-else src="../../../../images/case/hPic.png" alt="头像">
              <!-- <img src="../../../../images/case/caseOfIllness/4.jpg" alt=""> -->
            </div>
            <div class="commentsRightBox">
              <div class="clearFix">
                <div class="nameWrap">
                  <div class="userRightName">{{commentChild.comment.userName}}</div>
                  <div class="rightTime">{{commentChild.comment.commentTime}}</div>
                </div>

                <div @click="like('three','','')" class="likeBox">

                  <span class="commentImgBoxs">
                    <img :src="commentChild.comment.isZan == 1? require('../../../../images/case/iszan.png'):require('../../../../images/case/caseOfIllness/like.png')" alt="">
                  </span>
                  <span>{{commentChild.comment.zan}}</span>
                </div>

                <div @click="write('two')" class="likeBox">
                  <span class="commentImgBox2">
                    <img src="../../../../images/case/caseOfIllness/comment.png" alt="">
                  </span>
                  <span>回复</span>
                </div>

              </div>

              <div class="commentContent">
                {{commentChild.comment.commentContent}}
              </div>
            </div>
            <div style="clear: both"></div>
          </div>
          <div v-for="(item, index) in commentChild.comment.subCommentList" class="comments commentBox2" :key="index">
            <div class="headReadPicBox">
              <img v-if="item.userPic" :src="item.userPic" alt="头像">
              <img v-else src="../../../../images/case/hPic.png" alt="头像">
              <!-- <img src="../../../../images/case/caseOfIllness/4.jpg" alt=""> -->
            </div>
            <div class="commentsRightBox">
              <div class="clearFix">
                <div class="nameWrap">
                  <div class="userRightName">{{item.userName}}</div>
                  <div class="rightTime">{{item.commentTime}}</div>
                </div>
                <div class="likeBox">
                  <div v-if="item.userId != myUserId" @click="write('two',item.userName)" class="replyBox">
                  <span class="commentImgBox2">
                    <img src="../../../../images/case/caseOfIllness/comment.png" alt="">
                  </span>
                  <span>回复</span>
                  </div>
                  <div @click="like('two',index, item.commentId)" class="likeBox">
                  <span class="commentImgBoxs">
                   <img :src="item.isZan == 1? require('../../../../images/case/iszan.png'):require('../../../../images/case/caseOfIllness/like.png')" alt="">
                  </span>
                  <span>{{item.zan}}</span>
                  </div>
                  <div @click="_delete('two',item.commentId, index)" v-if="item.userId == myUserId" class="likeBox">
                  <span class="commentImgBox2">
                    <img src="../../../../images/case/caseOfIllness/delete.png" alt="">
                  </span>
                    <span>删除</span>
                  </div>
                </div>
              </div>
              <div class="commentContent">
                回复&nbsp;<span class="fontColor">{{item.replyUserName}}</span>:&nbsp;{{item.commentContent}}
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
        <div id="allCount" class="allCount ">
          全部评论&nbsp;({{detailedCommentArgs.data.length}})
        </div>
        <div v-if="detailedCommentArgs.data.length == 0" class="noneComment">
          <div class="sofaImg">
            <img src="../../../../images/case/myCase/sarfa.png" alt="">
          </div>
          <div class="sofaText">
            <span>暂无评论,&nbsp;&nbsp;快来<span class="knock">抢沙发</span>吧~</span>
          </div>
        </div>
        <div v-for="(item, index) in detailedCommentArgs.data" class="comments" :key="index">
          <div class="headReadPicBox">
            <img v-if="item.userPic" :src="item.userPic" alt="头像">
            <img v-else src="../../../../images/case/hPic.png" alt="头像">
          </div>
          <div class="commentsRightBox">
            <div class="clearFix">
              <div class="nameWrap">
                <div class="userRightName">{{item.userName}}</div>
                <div class="rightTime">{{item.commentTime}}</div>
              </div>
              <div class="likeBox">
                <div v-if="item.userId != myUserId" @click="write('three','',index)" class="likeBox">
                  <span class="commentImgBox2">
                    <img src="../../../../images/case/caseOfIllness/comment.png" alt="">
                  </span>
                  <span>回复</span>
                </div>
                <div @click="_delete('one',item.commentId, index)" v-if="item.userId == myUserId" class="likeBox">
                  <span class="commentImgBox2">
                    <img src="../../../../images/case/caseOfIllness/delete.png" alt="">
                  </span>
                  <span>删除</span>
                </div>
                <div @click="like('one', index, item.commentId)" class="likeBox">
                  <span class="commentImgBoxs">
                    <img :src="item.isZan == 1? require('../../../../images/case/iszan.png'):require('../../../../images/case/caseOfIllness/like.png')" alt="">
                  </span>
                  <!--1级-->
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
        </div>
        <div v-if="detailedCommentArgs.data.length != 0" class="endFonts">-End-</div>
      </div>
      <doComment class="doComment" v-if="isComment" :args="commentInfo" v-on:commentRes="isCommentRes" v-on:cancelComment="escBtn"></doComment>
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
            <div class="tabButtonBox" @click="likeThisCase">
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
            <div @click="shareCase(detailedCommentParameter.beCommentedId,detailedCommentParameter.type)" class="tabButtonBox">
              <div>
                <img class="img4" src="../../../../images/case/caseOfIllness/fenxiang.png" alt="">
              </div>
              <div>分享</div>
            </div>
          </div>
        </div>
      </div>
      <share v-if="isShareShow" v-on:cancelShare="isShareShow = false" :shareData="shareData"></share>
    </div>
</template>

<script>
import doComment from "../../index/doComment.vue";
import { tokenMethods } from "../../../../vuex/util";
import { MessageBox, Toast } from "mint-ui";
import share from "../../index/share.vue";
import Util from "../../../../vuex/util";

export default {
  props: {
    types: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      commentIndex: "",
      commentSwitch: true,
      writeSwitch: true,
      containerScrollTop: 0,
      detailedCommentArgs: {
        data: []
      }, //获取详情评论的数据
      detailedCommentParameter: {
        //获取详情评论的参数
        beCommentedId: 100, //病例id
        currentPage: 1, //当前页数
        numberPerPage: 10, //每页显示多少条
        type: this.types
      },
      //获取当前登录账号的userID
      myUserId: tokenMethods.getWapUser()
        ? tokenMethods.getWapUser().userId
        : "",
      commentChild: {
        comment: [],
        switchShow: false
      },
      deleteArgs: {
        type: this.types, // 类别:
        beCommentedId: 100, //上述内容的id
        parentId: "", //一级评论的Id
        presentId: "" //二级评论的id
      },
      timeStamp: "", //时间计算
      isComment: false,
      commentInfo: {}, //评论子组件传值
      isShareShow: false, //是否显示分享按钮
      shareData: {} //传给分享组件的对象
    };
  },
  created() {
    [
      this.detailedCommentParameter.beCommentedId,
      this.deleteArgs.beCommentedId
    ] = [this.$route.query.id, this.$route.query.id];
    this.getCaseComment();
  },
  methods: {
    //删除按钮
    _delete(type, commentId, index) {
      if (this.pointLogin()) {
        if (type === "one") {
          //one 一级评论
          this.deleteArgs.parentId = commentId;
          this.deleteArgs.presentId = "";

          this.$store.dispatch("DELETE_COMMENT", this.deleteArgs).then(res => {
            console.log(res);
            if (res.callStatus === "SUCCEED") {
              this.detailedCommentArgs.data.splice(index, 1);
              Toast({ message: "删除成功", duration: 1000 });
            } else {
              Toast({ message: "删除失败", duration: 1500 });
            }
          });
        }
        else {
          //two 二级评论
          this.deleteArgs.parentId = this.commentIndex;
          this.deleteArgs.presentId = commentId;
          this.$store.dispatch("DELETE_COMMENT", this.deleteArgs).then(res => {
            console.log(res);
            if (res.callStatus === "SUCCEED") {
              this.detailedCommentArgs.data[
                this.commentIndex
              ].subCommentList.splice(index, 1);
              Toast({ message: "删除成功", duration: 1000 });
            } else {
              Toast({ message: "删除失败", duration: 1500 });
            }
          });
        }
      } else {
        this.isLogin();
      }
    },
    //隐藏二级评论
    backChild() {
      this.commentChild.switchShow = false;
      this.commentSwitch = true;
    },
    //收藏按钮
    collect() {
      if (this.pointLogin()) {
        this.$store.dispatch("CASE_COLLECT", { postId: this.$route.query.id }).then(res => {
            if (res.callStatus === "SUCCEED") {
              Toast({ message: "收藏成功", duration: 1500 });
            }
          });
      } else {
        this.isLogin();
      }
    },
    //赞  -----------------------
    like(type, index, commentId) {
      if (this.pointLogin()) {
        if (type === "one") {
          let obj = {
            type: this.types,
            typeId: this.deleteArgs.beCommentedId,
            parentId: commentId,
            presentId: ""
          };
          this.$store.dispatch("LIKE", obj).then(res => {
            if (res.callStatus === "SUCCEED") {
              if (this.detailedCommentArgs.data[index].isZan) {
                this.detailedCommentArgs.data[index].zan =
                  Number(this.detailedCommentArgs.data[index].zan) - 1;
                this.detailedCommentArgs.data[index].isZan = 0;
                Toast({ message: "取消成功", duration: 1000 });
              } else {
                this.detailedCommentArgs.data[index].zan =
                  Number(this.detailedCommentArgs.data[index].zan) + 1;
                this.detailedCommentArgs.data[index].isZan = 1;
                Toast({ message: "点赞成功", duration: 1000 });
              }
            } else {
              Toast({ message: "请求失败", duration: 1500 });
            }
          });
        } else if (type === "two") {
          let obj = {
            type: this.types,
            typeId: this.deleteArgs.beCommentedId,
            parentId: this.commentIndex,
            presentId: commentId
          };
          this.$store.dispatch("LIKE", obj).then(res => {
            if (res.callStatus === "SUCCEED") {
              if (
                this.detailedCommentArgs.data[this.commentIndex].subCommentList[
                  index
                ].isZan
              ) {
                let zan =
                  Number(
                    this.detailedCommentArgs.data[this.commentIndex]
                      .subCommentList[index].zan
                  ) - 1;
                this.detailedCommentArgs.data[this.commentIndex].subCommentList[
                  index
                ].zan = zan;
                this.detailedCommentArgs.data[this.commentIndex].subCommentList[
                  index
                ].isZan = 0;
                Toast({ message: "取消成功", duration: 1000 });
              } else {
                let zan =
                  Number(
                    this.detailedCommentArgs.data[this.commentIndex]
                      .subCommentList[index].zan
                  ) + 1;
                this.detailedCommentArgs.data[this.commentIndex].subCommentList[
                  index
                ].zan = zan;
                this.detailedCommentArgs.data[this.commentIndex].subCommentList[
                  index
                ].isZan = 1;
                Toast({ message: "点赞成功", duration: 1000 });
              }
            } else {
              Toast({ message: "请求失败", duration: 1500 });
            }
          });
        } else {
          //二级评论的最上部一级点赞
          let obj = {
            type: this.types,
            typeId: this.deleteArgs.beCommentedId,
            parentId: this.detailedCommentArgs.data[this.commentIndex]
              .commentId,
            presentId: ""
          };
          this.$store.dispatch("LIKE", obj).then(res => {
            if (res.callStatus === "SUCCEED") {
              if (this.detailedCommentArgs.data[this.commentIndex].isZan) {
                this.detailedCommentArgs.data[this.commentIndex].zan =
                  Number(this.detailedCommentArgs.data[this.commentIndex].zan) -
                  1;
                this.detailedCommentArgs.data[this.commentIndex].isZan = 0;
                Toast({ message: "取消成功", duration: 1000 });
              } else {
                this.detailedCommentArgs.data[this.commentIndex].zan =
                  Number(this.detailedCommentArgs.data[this.commentIndex].zan) +
                  1;
                this.detailedCommentArgs.data[this.commentIndex].isZan = 1;
                Toast({ message: "点赞成功", duration: 1000 });
              }
            } else {
              Toast({ message: "请求失败", duration: 1500 });
            }
          });
        }
      } else {
        this.isLogin();
      }
    },
    likeThisCase(){
      if (this.pointLogin()) {
        this.$store.dispatch("LIKE", {type:2,typeId:this.$route.query.id}).then(res => {

        })
      }else {
        this.isLogin();
      }
    },
    //分享按钮
    shareCase(postId, type) {
      if(this.pointLogin()){
        this.shareData = {
          momentType: type,
          momentContent: null,
          momentPicture: null,
          momentContentId: postId
        };
        this.isShareShow = true;
      }else {
        this.isLogin();
      }
    },
    //评论取消按钮
    escBtn() {
      this.isComment = false;
      window.scroll(0, this.containerScrollTop);
      this.writeSwitch = true;
    },
    //底部评论按钮
    comment() {
      let that = this;
      this.commentSwitch = !this.commentSwitch;
      if (this.commentSwitch) {
        //记录点击评论时的scroll位置
        this.containerScrollTop = window.document.body.scrollTop;
        let scrollPosition = this.$el.querySelector("#allCount").offsetTop;
        window.scroll(0, scrollPosition);
      } else {
        window.scroll(0, that.containerScrollTop);
      }
    },
    //评论子组件品论完回调
    //发布按钮
    isCommentRes(res) {
      console.log("fdsfsd"+res)
      this.writeSwitch = true;
      this.isComment = false;
      window.scroll(0, this.containerScrollTop);
      if (res.replyUserId) {
        //二级评论
        this.detailedCommentArgs.data[this.commentIndex][
          "subCommentList"
        ].unshift(res);
      } else {
        //一级评论
        res.subCommentList = [];
        this.detailedCommentArgs.data.unshift(res);
      }
    },
    write(type, name, index) {
      name = name || "";
      index = index || "";
      if (this.pointLogin()) {
        this.containerScrollTop = window.document.body.scrollTop;
        this.writeSwitch = false;
        if (type === "one") {
          //一级评论
          this.isComment = true;
          this.commentInfo = {
            type: this.types,
            index: "",
            id: this.detailedCommentParameter.beCommentedId,
            userName: "",
            parentId: ""
          };
        } else if (type === "two") {
          //二级评论
          this.isComment = true;
          this.commentInfo = {
            type: this.types,
            index: this.commentIndex,
            id: this.detailedCommentParameter.beCommentedId,
            userName: name,
            parentId: this.commentChild.comment.commentId
          };
        } else {
          this.commentIndex = index;
          this.commentChild.comment = this.detailedCommentArgs.data[index];
          //二级评论
          this.isComment = true;
          this.commentInfo = {
            type: this.types,
            index: this.commentIndex,
            id: this.detailedCommentParameter.beCommentedId,
            userName: name,
            parentId: this.commentChild.comment.commentId
          };
        }
      } else {
        this.isLogin();
      }
    },
    //获取病例评论数据
    getCaseComment() {
      this.timeStamp = Date.parse(new Date());
      this.$store
        .dispatch("GET_CASE_COMMENT", this.detailedCommentParameter)
        .then(res => {
          console.log(res.data,'comment')
          this.detailedCommentArgs = res;
          this.time(this.detailedCommentArgs.data);
        });
    },
    //子组件 跳转二级评论
    childComment(index) {
      this.commentIndex = index;
      this.commentChild.comment = this.detailedCommentArgs.data[index];
      this.commentChild.switchShow = true;
    },
    time(res) {
      if (res) {
        res.forEach(item => {
          switch (true) {
            //几分钟前
            case this.timeStamp - item.commentTime < 3600000:
              //                console.log(this.timeStamp - item.commentTime)
              item.commentTime =
                Math.ceil((this.timeStamp - item.commentTime) / 1000 / 60) +
                "分钟前";
              break;
            //几小时前
            case this.timeStamp - item.commentTime >= 3600000 &&
              this.timeStamp - item.postTime < 86400000:
              //                console.log(this.timeStamp - item.commentTime)
              item.commentTime =
                Math.floor(
                  (this.timeStamp - item.commentTime) / 1000 / 60 / 60
                ) + "小时前";
              break;
            //日期
            case this.timeStamp - item.commentTime >= 86400000:
              item.commentTime = Util.formatDate
                .format(new Date(item.commentTime), "yy.MM.dd hh:mm")
                .substring(2);
              break;
          }
        });
      } else {
      }
    },
    //判断是否登录
    pointLogin() {
      let userToken = tokenMethods.getWapToken();
      return userToken;
    },
    //提示需要登录
    isLogin() {
      MessageBox.confirm("请先登录!")
        .then(action => {
          this.$router.push({
            path: "/logIn",
            query: { backName: this.$route.fullPath }
          });
        })
        .catch(function(error) {
          return "";
        });
    }
  },
  components: { doComment, share }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
@import "../../../../common/sass/factory";
.sofaText .knock {
  color: $themeColor;
}
.sofaText {
  font-size: px2vw(28);
  margin-top: px2vw(35);
}
.noneComment {
  text-align: center;
  margin-top: px2vw(45);
}
.sofaImg img {
  width: px2vw(140);
  height: px2vw(140);
}
.changeHeight {
  height: 0 !important;
  overflow: hidden !important;
}
.replyBox {
  display: inline-block;
  vertical-align: middle;
}
.back_Ground {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f4f4f4;
  z-index: 1000;
}
.userRightName {
  max-width: px2vw(250);
  font-size: px2vw(24);
  color: #333333;
}
.nameWrap {
  max-width: px2vw(250);
  float: left;
}
.clearFix:after {
  content: "";
  display: block;
  clear: both;
}
.commentsRightBox {
  text-align: left;
  width: px2vw(638);
  float: right;
  padding-bottom: px2vw(30);
}
.commentsRightBox:after {
  content: "";
  display: block;
  clear: both;
}
.comments {
  padding-top: px2vw(36);
}
.comments:after {
  content: "";
  display: block;
  clear: both;
}
.headReadPicBox {
  width: px2vw(50);
  height: px2vw(50);
  float: left;
}
.headReadPicBox:after {
  content: "";
  display: block;
  clear: both;
}
.headReadPicBox img {
  margin-top: px2vw(7);
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.allCount {
  margin-bottom: px2vw(4);
  font-size: px2vw(32);
  color: #3676b6;
}
.rightTime {
  max-width: px2vw(250);
  font-size: px2vw(20);
  color: #999999;
}

.likeBox {
  float: right;
  margin-top: px2vw(8);
}
.likeBox span:nth-child(2) {
  margin-left: px2vw(6);
  margin-right: px2vw(16);
}
.likeBox span:nth-child(2),
.likeBox span:nth-child(4) {
  font-size: px2vw(20);
  color: #2a2a2a;
}
.likeBox span:nth-child(3) {
  margin-right: px2vw(6);
}
.commentImgBox2 {
  display: inline-block;
  width: px2vw(32);
  height: px2vw(28);
}
.commentImgBox2 img {
  width: 100%;
  height: 100%;
}

.commentImgBoxs {
  display: inline-block;
  width: px2vw(30);
  height: px2vw(30);
}
.commentImgBoxs img {
  width: 100%;
  height: 100%;
}

.commentContent {
  margin-top: px2vw(24);
  margin-bottom: px2vw(24);
  font-size: px2vw(28);
  color: #333333;
}
.conmentsBox {
  display: table-cell;
  vertical-align: middle;
  font-size: px2vw(24);
  color: #666666;
  padding-left: px2vw(20);
  height: px2vw(68);
  background-color: #f6f6f6;
  width: px2vw(638);
}

.endFonts {
  font-size: px2vw(20);
  color: #999999;
  text-align: center;
  margin-top: px2vw(35);
}
.tabDevBox {
  position: fixed;
  width: 100vw;
  bottom: 0;
  left: 0;
  border-top: 1px solid #eeeeee;
  z-index: 900;
}
.writeCommentBoxSecond span:nth-child(2) {
  font-size: px2vw(24);
  color: #999999;
  vertical-align: middle;
}
.writeCommentBoxSecond {
  margin: 0 auto;
  border: 1px solid #eeeeee;
  border-radius: px2vw(10);
  height: px2vw(60);
  width: px2vw(710);
  background-color: #f4f4f4;
  padding-top: px2vw(8);
  padding-left: px2vw(19);
}
.writeCommentBox {
  background-color: white;
  padding: px2vw(10) px2vw(0) px2vw(15) px2vw(0);
}
.writeImgBox {
  display: inline-block;
  width: px2vw(30);
  height: px2vw(30);
  vertical-align: middle;
}
.writeImgBox > img {
  width: 100%;
}
.tabDev {
  display: table;
  height: px2vw(88);
  width: 100vw;
  background-color: white;
}
.tabButtonBox {
  width: 25%;
  display: table-cell;
  vertical-align: middle;
  font-size: px2vw(20);
  color: #666666;
  text-align: center;
  height: px2vw(88);
  margin-left: px2vw(50);
}
.img4 {
  width: px2vw(28);
  height: px2vw(28);
}
.img3 {
  width: px2vw(32);
  height: px2vw(30);
}
.img2 {
  width: px2vw(30);
  height: px2vw(30);
}
.img1 {
  width: px2vw(32);
  height: px2vw(28);
}

.fontColor {
  color: $themeColor;
}
.commentBox2 {
  padding: px2vw(48) px2vw(20) px2vw(0) px2vw(20) !important;
  border-bottom: px2vw(1) solid #dcdcdc;
}
.commentBox {
  padding: px2vw(48) px2vw(20) px2vw(0) px2vw(20) !important;
  background-color: white;
  border-bottom: px2vw(1) solid #dcdcdc;
}
.container {
  position: absolute;
  top: px2vw(88);
  width: 100vw;
  left: 0;
  z-index: 900;
}
.headReadPicBox {
  width: px2vw(50);
  height: px2vw(50);
  float: left;
}
.headReadPicBox:after {
  content: "";
  display: block;
  clear: both;
}
.headReadPicBox img {
  margin-top: px2vw(7);
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.comments {
  padding-top: px2vw(36);
}
.comments:after {
  content: "";
  display: block;
  clear: both;
}
.commentsRightBox {
  text-align: left;
  width: px2vw(638);
  float: right;
  padding-bottom: px2vw(30);
}
.commentsRightBox:after {
  content: "";
  display: block;
  clear: both;
}
.commentsRightBox {
  text-align: left;
  width: px2vw(638);
  float: right;
  padding-bottom: px2vw(30);
}
.commentsRightBox:after {
  content: "";
  display: block;
  clear: both;
}
.clearFix:after {
  content: "";
  display: block;
  clear: both;
}
.nameWrap {
  max-width: px2vw(250);
  float: left;
}
.userRightName {
  max-width: px2vw(250);
  font-size: px2vw(24);
  color: #333333;
}
.rightTime {
  max-width: px2vw(250);
  font-size: px2vw(20);
  color: #999999;
}
.userRightName {
  max-width: px2vw(250);
  font-size: px2vw(24);
  color: #333333;
}
.likeBox {
  float: right;
  margin-top: px2vw(8);
}
.likeBox span:nth-child(2) {
  margin-left: px2vw(6);
  margin-right: px2vw(16);
}
.likeBox span:nth-child(2),
.likeBox span:nth-child(4) {
  font-size: px2vw(20);
  color: #2a2a2a;
}
.likeBox span:nth-child(3) {
  margin-right: px2vw(6);
}
.commentImgBox2 {
  display: inline-block;
  width: px2vw(32);
  height: px2vw(28);
}
.commentImgBox2 img {
  width: 100%;
  height: 100%;
}
.commentImgBoxs {
  display: inline-block;
  width: px2vw(30);
  height: px2vw(30);
}
.commentImgBoxs img {
  width: 100%;
  height: 100%;
}
.commentContent {
  margin-top: px2vw(24);
  margin-bottom: px2vw(24);
  font-size: px2vw(28);
  color: #333333;
}
.endFonts {
  font-size: px2vw(20);
  color: #999999;
  text-align: center;
  margin-top: px2vw(35);
}

.wrapTop {
  z-index: 2000;
  position: fixed;
  height: px2vw(88);
  top: 0;
  width: 100vw;
  background-color: $themeColor;
  text-align: center;
  color: #ffffff;
  font-size: px2vw(36);
}

.title {
  display: table-cell;
  vertical-align: middle;
  height: px2vw(88);
  width: 100vw;
  text-align: center;
}
.backImgBox2 {
  position: absolute;
  padding: px2vw(23) px2vw(35) 0 px2vw(20);
  top: 0;
  left: 0;
  height: px2vw(88);
}
.backImgBox2 > img {
  width: px2vw(24);
  height: px2vw(42);
}
.commentBoxOnce {
  padding: px2vw(36) px2vw(25) px2vw(45) px2vw(17);
  border-top: px2vw(20) solid #f4f4f4;
  background-color: white;
  margin-bottom: px2vw(88);
}
// .mb {
//   margin-bottom: px2vw(476);
// }
.doComment {

  position: relative !important;
  z-index: 20000 !important;
}
</style>
