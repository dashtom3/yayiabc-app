<template>
  <!--筛选功能栏开始-->
  <div ref="scrollBox" class="container">
  <div class="dressingBox">
    <span v-for="(item, index) in caseDate.dressing" @click="dressing(item)"  :class="{'DressingColor': caseListArgs.classify === item}">{{item == null ? '不限':item}}</span>

    <!--筛选按钮-->
    <span @click="caseDate.dressingSwitch = !caseDate.dressingSwitch" class="dressingBtn">
            <img src="../../../../images/case/caseOfIllness/classflsy.png" alt="">
            <transition name="fade">
            <span v-show="caseDate.dressingSwitch" class="dressingFunction">
              <span :class="{'DressingColor': index === caseListArgs.order}" @click.stop="dressingFunction(index)" class="updata" v-for="(item, index) in caseDate.updataTime">
                {{item}}
                <img v-show="caseListArgs.order === index" src="../../../images/case/caseOfIllness/yes.png" alt="">
              </span>
              <span class="before"></span>
            </span>
          </transition>
          </span>
  </div>

  <!--筛选功能栏结束-->
    <mt-loadmore :top-method="loadMore" :auto-fill=false ref="loadmore"  v-on:top-status-change="isState">
      <topLoadMore ref="topLoadMore" slot="top" :loading="isLoading" :loaded="isLoaded"></topLoadMore>

    <div  v-infinite-scroll="getCaseListMore" infinite-scroll-immediate-check="true">
      <div v-for="(item, index) in listCaseData" class="caseBox">
        <div class="userBox addChange1">
          <div class="userPicture">
            <img src="../../../../images/mine/zhifubao.png" alt="">
            <span class="userName">{{item.writer}}</span>
            <span class="userName userTime">5分钟前</span>
          </div>
          <div class="caseContent">
            {{item.headline}}
          </div>
        </div>
        <div class="userImgBox addChange2">
          <img src="../../../../images/case/caseOfIllness/1.png" alt="">
        </div>

        <div class="readeBox">
          <span class="readeClass">{{item.classify}}</span>
          <span class="readeNum">1200 阅读</span>
          <span class="readeNum2">· 31评论</span>
          <span class="readeNum2">· 20赞</span>
          <span class="coin"> {{item.charge_Number}}乾币</span>
        </div>
      </div>
    </div>
    </mt-loadmore>
    <!--编辑按钮-->
    <div class="edit" @click.stop="gotoPage(newCase)">
      <img src="../../../../images/case/caseOfIllness/editer.png" alt="">
    </div>
    <!--编辑按钮-->


  </div>
</template>

<script>
  import { InfiniteScroll, LoadMore } from 'mint-ui';
  import topLoadMore from '../../salesWap/index/topLoadMore.vue'
  export default {
    data (){
      return{
        caseDate: {
          dressing: [null, '外科', '内科', '修复', '种植', '正畸'],
          dressingSwitch: false,
          updataTime: ['最新发布', '最多评论', '最多赞'],
          totalPage: 1
        },
        caseListArgs: {
          classify: null,
          currentPage: 1,
          numberPerPage: 10,
          order: 0,
        },
        isLoading:false,
        listCaseData: [] //获取到列表的数据
//        listCaseData: {
//          totalPage: null,
//          totalNumber: null,
//          headPic : null,
//          charge_Number: 5,   // 乾币数
//          classify: "外科",
//          cover: "img" null,
//          headline: "标题",
//          post_favour: 12 点赞,
//          post_id: 1 病例详情id,
//          post_time: 5分钟之前,
//          read_number: 12,
//          writer: "用户名",
//        }
      }
    },
    created (){
      this.getCaseList();
    },
    methods: {
      getCaseListMore (){
        if(this.caseDate.totalPage < this.caseListArgs.currentPage)
        {
          return
        }else {
          this.$store.dispatch('GET_CASE_LIST', this.caseListArgs).then( (res) => {
            for(var i = 0; i < res.data.length; i++)
            {
              this.listCaseData.push(res.data[i])
            }
            this.caseDate.totalPage = res.totalPage;
            this.caseListArgs.currentPage += 1;
          })
        }
      },
      getCaseList (){
        this.$store.dispatch('GET_CASE_LIST', this.caseListArgs).then( (res) => {
          this.listCaseData = res.data;
          this.caseDate.totalPage = res.totalPage;
          this.caseListArgs.currentPage += 1;
        })
      },
      //下拉刷新
      loadMore (id){
        this.$refs.scrollBox.scrollTop = 0;
        this.caseDate.totalPage = 1;
        this.caseListArgs.currentPage = 1;
        this.caseDate.dressingSwitch = false;
        this.isLoading = true;
        this.$store.dispatch('GET_CASE_LIST', this.caseListArgs).then( (res) => {
          this.listCaseData = res.data;
          this.caseDate.totalPage = res.totalPage;
          this.caseListArgs.currentPage += 1;
          this.isLoading = false;
        })
      },
      //mt中接受的val值作为参数传入我的组件里
      isState(val){
        this.$refs.topLoadMore.states(val)
      },
      //把下拉刷新完成之后回调的mt的方法传入我的组件里
      isLoaded(){
        this.$refs.loadmore.onTopLoaded();
      },
      dressingFunction (index){
        this.$refs.scrollBox.scrollTop = 0;
        this.caseDate.totalPage = 1;
        this.caseListArgs.currentPage = 1;
        this.caseListArgs.order = index;
        this.caseDate.dressingSwitch = false;
        this.getCaseList();
      },
      //上部筛选功能栏
      dressing (item){
        this.$refs.scrollBox.scrollTop = 0;
        this.caseDate.totalPage = 1;
        this.caseListArgs.currentPage = 1;
        this.caseListArgs.classify = item;
        this.getCaseList();
      },
      gotoPage(page){
        this.$router.push(page)
      }
    },
    components:{
      topLoadMore
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../../common/sass/factory";

    .container{
      position: fixed;
      z-index: -1;
      top: px2vw(208);
      bottom: 0;
      overflow: scroll;
      width: 100%;
      -webkit-overflow-scrolling: touch;
    }
    /* 有图添加样式 */
    .addChange2{
      display: inline-block !important;
      float: right;
      margin-top: px2vw(10);

    }
    .addChange1{
      display: inline-block !important;
      width: px2vw(508) !important;
    }
    /* 有图添加样式 */

    .edit{
      width: px2vw(100);
      height: px2vw(100);
      position: fixed;
      bottom: px2vw(148);
      right: px2vw(50);
      img{
        width: 100%;
        height: 100%;
      }
    }
    .userImgBox>img{
      width: px2vw(160);
      height: px2vw(160);
      border: 1px solid red;
      border-radius: px2vw(10);
    }
    .coin{
      float: right;
      font-size: px2vw(24);
      color: #d81e06;
    }
    .readeNum{
      margin-left: px2vw(18);
      color: #999999;
    }
    .readeNum2{
      margin-left: px2vw(8);
      color: #999999;
    }
    .readeBox{
      margin-top: px2vw(28);
    }
    .readeClass{
      width: px2vw(98);
      height: px2vw(26);
      border: 1px solid #3676b6;
      text-align: center;
      color: #3676b6;
      line-height: 0;

      padding-bottom: px2vw(2);
      border-radius: px2vw(8);
    }
    .caseContent{
      min-height: px2vw(100);
      margin-top: px2vw(24);
      font-size: px2vw(36);
    }
    .userName{
      margin-left: px2vw(20);
      font-size: px2vw(26);
      vertical-align: middle;
    }
    .userName.userTime{
      font-size: px2vw(24);
      color: #999999;

    }
    .userPicture img{
      vertical-align: middle;
      width: px2vw(56);
      height: px2vw(56);
      border-radius: 50%;
    }
    .caseBox{
      background-color: #ffffff;
      border-bottom: 1px solid #f4f4f4;
      padding: px2vw(36) px2vw(17) px2vw(35) px2vw(17);
    }

    .dressingBtn img{
      width: px2vw(30);
      height: px2vw(29);
    }
    .dressingBox>.dressingBtn{
      z-index: 999;
      position: absolute;
      width: px2vw(80);
      right: px2vw(6);
      top: 0;
      padding-top: px2vw(26);
    }
    .dressingBox .dressingFunction>.updata{
      display: block;
      width: 90%;
      margin: 0 auto;
      line-height: px2vw(90);
      font-size: px2vw(28);
      text-align: left;
      padding-left: px2vw(6);
      img{
        width: px2vw(26);
        height: px2vw(21);
        float: right;
        margin-top: px2vw(35);
        margin-right: px2vw(12);
      }
    }
    .dressingBox .dressingFunction>.updata:nth-child(2){
      border-bottom: 1px solid #dcdcdc;
      border-top: 1px solid #dcdcdc;
    }
    .dressingBox .before{
      display: inline-block;
      width: 0;
      position: absolute;
      top:px2vw(-90);
      right: px2vw(16);
      border-top: px2vw(20) solid transparent;
      border-right: px2vw(12) solid transparent;
      border-left: px2vw(12) solid transparent;
      border-bottom: px2vw(20) solid #9ac8f6;
      border-radius: px2vw(6);
    }
    .dressingBox .before::after{
      content: '';
      display: inline-block;
      width: 0;
      position: absolute;
      top:px2vw(38);
      right: px2vw(-10);
      border-top: px2vw(16) solid transparent;
      border-right: px2vw(10) solid transparent;
      border-left: px2vw(10) solid transparent;
      border-bottom: px2vw(16) solid white;

    }
    .dressingBox .dressingFunction{
      display: inline-block;
      position: absolute;
      top: px2vw(80);
      left: px2vw(-128);
      border: 1px solid #9ac8f6;
      width: px2vw(200);
      height: px2vw(280);
      border-radius: px2vw(10);
      background-color: white;
      z-index: 1000;
    }
    .dressingBox{
      position: fixed;
      top:px2vw(88);
      width: 100vw;
      height: px2vw(90);
      font-size: px2vw(30);
      background-color: #ffffff;
      span{
        display: table-cell;
        width: px2vw(106);
        height: px2vw(90);
        vertical-align: middle;
        text-align: center;
      }
    }
    .DressingColor{
      color: #3676b6;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
      opacity: 0
    }
</style>

