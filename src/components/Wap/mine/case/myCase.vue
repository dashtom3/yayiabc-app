<template>
    <div class="case-wrapper">
      <div class="backgroundImg"></div>
      <div class="wrapTop">
        <span class="title">我的病例</span>
        <span class="backImgBox" @click="goBack">
          <img src="../../../../images/case/backer.png" alt="">
        </span>
        <span @click="toWriteCase()" class="writeCaseImgBox">
          <img src="../../../../images/case/myCase/writeCase.png" alt="">
          写病历
        </span>
      </div>
      <div class="classBox">
        <span @click="changeClass(index)" :class="{'changeColor': change == index}"  v-for="(item, index) in classArgs" :key="index">
          {{item}}
          <div :class="{'changeBorder': change == index}"></div>
        </span>
      </div>
      <div class="container">
        <!-- <mt-loadmore  :top-method="loadMore" :auto-fill=false ref="loadmore"  v-on:top-status-change="isState"> -->
          <!-- <topLoadMore ref="topLoadMore" slot="top" :loading="isLoading" :loaded="isLoaded"></topLoadMore> -->
          <div v-infinite-scroll="getListMore" infinite-scroll-immediate-check="true">
            <div v-for="(item,index) in myCaseList" :key="index">
              <div @click="toGoCase(item.postId)"  v-if="myCaseList" class="caseBox">
                <div class="userBox " :class="{'addChange1': item.cover}">
                  <div class="userPicture">
                    <img v-if="change == 2" :src=" item.printUrl == null? require('../../../../images/mine/zhifubao.png') : item.printUrl" alt="">
                    <span v-if="change == 2" class="userName" :class="{'userWrite': change != 2}">{{item.writer}}</span>
                    <span class="userName userTime"><span v-if="change != 2">更新于</span>{{item.postTime}}</span>
                  </div>
                  <div class="caseContent">
                    {{item.headline}}
                  </div>
                </div>
                <div v-if="item.cover" :class="{'addChange2': item.cover}" class="userImgBox ">
                  <img :src="item.cover" alt="">
                </div>
                <div class="readeBox">
                  <span class="readeClass">{{item.classify}}</span>
                  <span v-if="change != 0" class="readeNum">{{item.readNumber}} 阅读</span>
                  <span v-if="change != 0" class="readeNum2">· {{item.commentNumber}}评论</span>
                  <span v-if="change != 0" class="readeNum2">· {{item.postFavour}}赞</span>
                  <span v-if="item.chargeNumber" class="coin"> {{item.chargeNumber}}乾币</span>
                </div>
              </div>
            </div>
          </div>
        <!-- </mt-loadmore> -->
        <div v-if="change == 0 && myCaseList.length == 0" class="spaceImgBox">
          <img class="spaceImgFont" src="../../../../images/case/myCase/caogao.png" alt="">
          <div class="spaceSize">还没有草稿</div>
          <div class="spaceFont">(未发布的病例会存储在这里)</div>
        </div>
        <div v-if="change == 1 && myCaseList.length == 0" class="spaceImgBox">
          <img class="spaceImg" src="../../../../images/case/myCase/fabu.png" alt="">
          <div class="spaceSize">尚未发布病例</div>
          <div class="spaceColor">去写病例~</div>
        </div>

        <div v-if="change == 2 && myCaseList.length == 0" class="spaceImgBox">
          <img class="spaceImg" src="../../../../images/case/myCase/goumai.png" alt="">
          <div class="spaceSize">还没有购买病例</div>
          <div class="spaceColor">发现更多病例</div>
        </div>
      </div>
      <!--末尾-->
    </div>
</template>

<script>
import Util from "../../../../vuex/util";
import { InfiniteScroll, LoadMore } from "mint-ui";
import topLoadMore from "../../../salesWap/index/topLoadMore.vue";
export default {
  data() {
    return {
      src: "../../../../images/mine/zhifubao.png",
      change: 0,
      allLoaded: false,
      isLoading: false,
      classArgs: ["草稿箱", "已发布", "已购买"],
      myCase: {
        //'草稿箱''已发布' 请求的数据
        currentPage: 1,
        numberPerPage: 10,
        type: 2,
        order: 0,
        postStater: 2
      },
      myCaseList: [],
      timeStamp: 0,
      totalPage: 0
    };
  },
  created() {
    this.getCaseList();
    if (this.$route.query.state == undefined) {
      return;
    }
    this.changeClass(this.$route.query.state);
  },
  methods: {
    //mt中接受的val值作为参数传入我的组件里
    isState(val) {
      this.$refs.topLoadMore.states(val);
    },
    //把下拉刷新完成之后回调的mt的方法传入我的组件里
    isLoaded() {
      // this.$refs.loadmore.onTopLoaded();
    },
    goBack() {
      this.$router.push("/yayi/mine");
    },
    getPayedList() {
      this.$store.dispatch("GET_PAY_CASE", this.myCase).then(res => {
        this.myCaseList = res.data;
        if (this.myCaseList) {
          this.timeStamp = Date.parse(new Date());
          this.time(this.myCaseList);
          this.myCaseList.forEach(function(item, index, array) {
            if (item.classify === 1) {
              item.classify = "口腔外科";
            } else if (item.classify === 2) {
              item.classify = "口腔内科";
            } else if (item.classify === 3) {
              item.classify = "口腔修复";
            } else if (item.classify === 4) {
              item.classify = "口腔种植";
            } else if (item.classify === 5) {
              item.classify = "口腔正畸";
            }
          });
        }
        this.isLoaded();
      });
    },
    getCaseList() {
      let params = {
        type: 2,
        currentPage: this.myCase.currentPage,
        numberPerPage: this.myCase.numberPerPage
      }
      if (this.change == 0) {
        params.postStater = 2
      } else if (this.change == 1) {
        params.postStater = 1
      }
      this.$store
        .dispatch("GET_MY_CASE", params)
        .then(res => {
          // this.myCaseList = res.data;
          if (res.data != null) {
            this.myCaseList = this.myCaseList.concat(res.data);
          }
          this.totalPage = res.totalPage;
          if (this.myCaseList) {
            this.timeStamp = Date.parse(new Date());
            this.time(this.myCaseList);
            this.myCaseList.forEach(function(item, index, array) {
              if (item.classify === 1) {
                item.classify = "口腔外科";
              } else if (item.classify === 2) {
                item.classify = "口腔内科";
              } else if (item.classify === 3) {
                item.classify = "口腔修复";
              } else if (item.classify === 4) {
                item.classify = "口腔种植";
              } else if (item.classify === 5) {
                item.classify = "口腔正畸";
              }
            });
          }
          this.isLoaded();
        });
    },
    getListMore (){
      if (this.totalPage <= this.myCase.currentPage){
        // this.endShow = true
      } else {
        this.myCase.currentPage = Number(this.myCase.currentPage) + 1;
        this.getCaseList();
      }
    },
    time(res) {
      if (res) {
        res.forEach(item => {
          switch (true) {
            //几分钟前
            case this.timeStamp - item.postTime < 3600000:
              //              console.log(this.timeStamp - item.postTime)
              item.postTime =
                Math.ceil((this.timeStamp - item.postTime) / 1000 / 60) + "分钟前";
              break;
            //几小时前
            case this.timeStamp - item.postTime >= 3600000 &&
              this.timeStamp - item.postTime < 86400000:
              //              console.log(this.timeStamp - item.postTime)
              item.postTime =
                Math.floor((this.timeStamp - item.postTime) / 1000 / 60 / 60) +
                "小时前";
              break;
            //日期
            case this.timeStamp - item.postTime >= 86400000:
              item.postTime = Util.formatDate.format(new Date(item.postTime), "yyyy-MM-dd hh:mm").substring(0);
              break;
          }
        });
      } else {
      }
    },
    toGoCase(postId) {
      if (this.change === 0) {
        //草稿
        this.$router.push({
          path: "/caseDetailed",
          query: { id: postId, draft: 1, backLocal: '/myCase'}
        });
      } else if (this.change === 1) {
        //发布
        this.$router.push({
          path: "/caseDetailed",
          query: { id: postId, myCase: 1, backLocal: '/myCase' }
        });
      } else {
        //已购买
        this.$router.push({ path: "/caseDetailed", query: { id: postId, backLocal: '/myCase' } });
      }
    },
    //下拉刷新
    loadMore() {
      if (this.change === 0) {
        //草稿
        this.myCase.currentPage = 1;
        this.myCase.postStater = 2;
        this.getCaseList();
      } else if (this.change === 1) {
        //发布
        this.myCase.currentPage = 1;
        this.myCase.postStater = 1;
        this.getCaseList();
      } else {
        //已购买
        this.getPayedList();
      }
    },
    toWriteCase() {
      this.$router.push({ path: "/newCase", query: { state: this.change } });
    },
    changeClass(index) {
      this.myCase.currentPage = 1;
      this.myCaseList = [];
      this.change = index;
      if (index === 0) {
        //草稿
        this.myCase.postStater = 2;
        this.myCaseList = [];
        this.getCaseList();
      } else if (index === 1) {
        //发布
        this.myCaseList = [];
        this.myCase.postStater = 1;
        this.getCaseList();
      } else {
        //已购买
        this.myCaseList = [];
        this.getPayedList();
      }
    }
  },
  components: { topLoadMore }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
@import "../../../../common/sass/factory";
.case-wrapper{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: scroll;
}
.spaceImgFont {
  width: px2vw(98);
  height: px2vw(97);
}
.spaceFont {
  color: #666666;
  font-size: px2vw(24);
}
.spaceImgBox {
  position: fixed;
  top: 44%;
  text-align: center;
  width: 100vw;
}
.spaceImg {
  width: px2vw(108);
  height: px2vw(147);
}
.spaceSize {
  color: #666666;
  font-size: px2vw(30);
}
.spaceColor {
  color: $themeColor;
}
.caseBox {
  background-color: #ffffff;
  border-bottom: px2vw(1) solid #f4f4f4;
  padding: px2vw(36) px2vw(17) px2vw(35) px2vw(17);
}
/* 有图添加样式 */
.addChange2 {
  display: inline-block !important;
  // float: right;
  margin-top: px2vw(10);
}
.addChange1 {
  display: inline-block !important;
  width: px2vw(508) !important;
}
/* 有图添加样式 */
.userPicture img {
  vertical-align: middle;
  width: px2vw(56);
  height: px2vw(56);
  border-radius: 50%;
}
.userName {
  // margin-left: px2vw(20);
  font-size: px2vw(26);
  vertical-align: middle;
}
.userName.userTime {
  font-size: px2vw(24);
  color: #999999;
}
.caseContent {
  min-height: px2vw(100);
  margin-top: px2vw(24);
  font-size: px2vw(36);
}
.userImgBox{
  width: px2vw(160);
  height: px2vw(160);
  overflow: hidden;
}
.userImgBox > img {
  width: 100%;
  border-radius: px2vw(10);
}
.readeBox {
  margin-top: px2vw(28);
}
.readeClass {
  width: px2vw(98);
  height: px2vw(26);
  border: 1px solid #3676b6;
  text-align: center;
  color: #3676b6;
  line-height: 0;
  border-radius: px2vw(8);
  padding: 0 px2vw(4);
}
.readeNum {
  margin-left: px2vw(18);
  color: #999999;
}
.readeNum2 {
  margin-left: px2vw(8);
  color: #999999;
}
.coin {
  float: right;
  font-size: px2vw(24);
  color: #d81e06;
}
.writeCaseImgBox {
  position: absolute;
  padding: px2vw(23) px2vw(24) 0 px2vw(20);
  top: 0;
  right: 0;
  height: px2vw(88);
  font-size: px2vw(30);
}
.writeCaseImgBox img {
  width: px2vw(30);
  height: px2vw(30);
  vertical-align: middle;
}
.backImgBox {
  position: absolute;
  padding: px2vw(23) px2vw(35) 0 px2vw(20);
  top: 0;
  left: 0;
  height: px2vw(88);
}
.backImgBox > img {
  width: px2vw(18);
  // height: px2vw(42);
}
.title {
  display: table-cell;
  vertical-align: middle;
  height: px2vw(88);
  width: 100vw;
  text-align: center;
}
.wrapTop {
  z-index: 2000;
  position: fixed;
  height: px2vw(88);
  top: 0;
  left: 0;
  width: 100vw;
  background-color: $themeColor;
  text-align: center;
  color: #ffffff;
  font-size: px2vw(36);
}
.backgroundImg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #f4f4f4;
  z-index: -2;
}
.classBox {
  z-index: 100;
  font-size: px2vw(30);
  background-color: white;
  position: fixed;
  top: px2vw(88);
  height: px2vw(88);
  width: 100vw;
  color: #999999;
  text-align: center;
  border-bottom: px2vw(1) solid #f4f4f4;
}

.classBox > span {
  display: inline-block;
  height: px2vw(88);
  line-height: px2vw(88);
  padding-left: px2vw(23);
  padding-right: px2vw(23);
  position: relative;
}

.changeColor {
  color: $themeColor !important;
}
.changeBorder {
  position: absolute;
  bottom: 0;
  border-bottom: px2vw(4) solid $themeColor;
  width: 69%;
}
.container {
  position: absolute;
  top: 0;
  left: 0;
  padding-top: px2vw(176);
  -webkit-overflow-scrolling: touch;
  width: 100%;
}
.userWrite {
  margin-left: px2vw(2) !important;
}
</style>

