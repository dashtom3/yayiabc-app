<template>
  <div class="FAQContainer" ref="scrollBox">
    <div class="noData" v-if="questList.length == 0">
      <img src="../../../../images/question/noQuestionList.png" alt="">
      <p>暂无任何问题~</p>
    </div>
    <mt-loadmore :top-method="loadMore" :bottom-method="getQuestListMore" :bottom-all-loaded="allLoaded" :auto-fill=false ref="loadmore"  v-on:top-status-change="isState" v-on:bottom-status-change="isStateB" class="loadMore" v-if="questList.length != 0">
      <topLoadMore ref="topLoadMore" slot="top" :loading="topLoading" :loaded="isLoaded"></topLoadMore>
      <div class="scrollBox" >
        <div class="eachContainer" @click="gotoDetail(value.faqQuestionId)" v-for="(value,index) in questList" v-if="questList.length > 0">
          <div class="headLine">
            <div class="headImg">
              <img :src="value.userPic  + '?imageView2/1/w/200/h/200'" alt="" v-if="value.userPic">
              <img src="../../../../images/mine/defaultHead.png" alt="" v-else>
            </div>
            <div class="name">
              {{value.userName}}
            </div>
            <div class="time">{{value.faqQuestionTime}}</div>
          </div>
          <div class="title">
            {{value.faqQuestionTitle}}
          </div>
          <div class="other">
            <span class="classify">{{value.faqQuestionType}}</span>
            <span class="num">已有<span>{{value.faqAnswerNum}}</span>人回答</span>
            <span class="clr"></span>
          </div>
        </div>
        <div v-if="questList.length != 0 && args.currentPage == totalPage" class="noMoreData">
          - End -
        </div>
        <!-- <div class="noData" v-if="(noData && !questList)||(noData && questList.length == 0)"> -->

      </div>
      <bottomLoadMore ref="bottomLoadMore" slot="bottom" :loading="bottomLoading" :loaded="isLoadedB"></bottomLoadMore>
    </mt-loadmore>
    <!-- <div class="edit" @click="gotoPage('/newQuest')" v-if="showNewQuest">
      <img src="../../../../images/question/newQuestion.png" alt="">
    </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
  import { LoadMore, MessageBox} from 'mint-ui';
  import {mapGetters} from 'vuex';
  import { tokenMethods } from '../../../../vuex/util'
  import topLoadMore from '../../../salesWap/index/topLoadMore.vue';
  import bottomLoadMore from '../../../salesWap/index/bottomLoadMore.vue';
  import {COLLECT, FAQ_LIST, MY_QUESTION, SEARCH_CASE_LIST} from '../../../../vuex/types'
  import Util from '../../../../vuex/util'

  export default {
    data(){
      return{
        topLoading:false,
        bottomLoading:false,
        allLoaded:false,
        args:{
          currentPage:1,
          faqQuestionType:null,
          keyWord:'',
          order:0,
          type:4,
          numberPerPage:10
        },
        collectArgs: {
          classify: null,
          numberPerPage: 10,
          userId:tokenMethods.getWapUser() == null ? null : tokenMethods.getWapUser().userId,
          type:'问答', //1 病例列表 2 我的病例列表
        },
        questList:[],
        totalPage:0,
        timeStamp:null,
        showNewQuest:false,
        noData:false,
        backName:''
      }
    },
    components:{
      topLoadMore,bottomLoadMore
    },
    computed: {
      ...mapGetters([
        'saveCaseDressing', //分类筛选的值  不限 外科 内科等一栏
        'saveCaseOrder',   //order 筛选按钮的值
        'saveCaseSearching', //
      ]),
    },
    watch: {
      saveCaseDressing: {
        handler:function (val) {
          this.noData = false;
          this.args.faqQuestionType = val;
          this.loadMore();
        }
      },
      saveCaseOrder: {
        handler:function (val) {
          this.noData = false;
          this.args.order = val;
          this.loadMore();
        }
      }
    },
    created(){
      this.timeStamp = Date.parse(new Date());
      if(this.saveCaseSearching){
        this.args.keyWord = this.saveCaseSearching;
        this.args.type = 3
      }
      this.getQuestList();//这里可能会有问题

    },
    methods:{
      //下拉刷新
      loadMore (id){
        this.timeStamp = Date.parse(new Date());
        this.allLoaded = false;
        this.args.currentPage = 1;
        this.totalPage = 0;
        this.questList = [];
        this.topLoading = true;
//        this.$refs.scrollBox.scrollTop = 0;
        this.getQuestList();
      },
      closeTopBottomLoading(){
        this.topLoading = false;
        this.bottomLoading = false;
      },
      getQuestList(){
        console.log(this.$router.history.current.name)
        switch (true){
          case this.$router.history.current.name === 'QandAList':
            // this.showNewQuest =true;
            //发现
            this.backName = '/QandAList'
            this.$store.dispatch(FAQ_LIST, this.args).then(res=>{
              if(res.data){
                this.dataCompute(res.data)
                this.questList = this.questList.concat(res.data);
                this.totalPage = res.totalPage;
                this.closeTopBottomLoading();
                this.isAllLoaded();
                console.log(res,1)
              }else {
                this.closeTopBottomLoading();
                this.noData = true;
              }
            }).catch(()=>{

              this.closeTopBottomLoading();
            });
            break;
          case this.$router.history.current.name === 'myQuestion':
            this.backName = '/myQandA/myQuestion'
            this.$store.dispatch(MY_QUESTION, this.args).then(res=>{
              if(res.data){
                this.dataCompute(res.data)
                this.questList = this.questList.concat(res.data);
                this.totalPage = res.totalPage;
                this.closeTopBottomLoading();
                this.isAllLoaded();
                console.log(res,2)
              }else {
                this.noData = true;
              }
            }).catch(()=>{
              this.closeTopBottomLoading();
            });
            //我的
            break;
          case this.$router.history.current.name === 'questCollect':
            this.collectArgs.currentPage = this.args.currentPage;
            this.$store.dispatch(COLLECT, this.collectArgs).then(res=>{
              if(res.data){
                this.dataCompute(res.data)
                this.questList = this.questList.concat(res.data);
                this.totalPage = res.totalPage;
                this.closeTopBottomLoading();
                this.isAllLoaded();
                console.log(res,3)
              }else {
                this.noData = true;
              }
            }).catch(()=>{
              this.closeTopBottomLoading();
            });
            //收藏
            break;
          case this.$router.history.current.name === 'QASearch':
            this.backName = '/communitySearch/QAndASearch'
            this.$store.dispatch(SEARCH_CASE_LIST, this.args).then(res=>{
              if(res.data){
                this.dataCompute(res.data)
                this.questList = this.questList.concat(res.data);
                this.totalPage = res.totalPage;
                this.closeTopBottomLoading();
                this.isAllLoaded();
                console.log(res,3)
              }else {
                this.noData = true;
              }
            }).catch(()=>{
              this.closeTopBottomLoading();
            });
            //搜索
            break;
          default:
            // this.showNewQuest =true;
            //发现
            this.backName = '/QandAList'
            this.$store.dispatch(FAQ_LIST, this.args).then(res=>{
              if(res.data){
                this.dataCompute(res.data)
                this.questList = this.questList.concat(res.data);
                this.totalPage = res.totalPage;
                this.isLoading = false;
                this.isAllLoaded();
                console.log(res,1)
              }else {
                this.noData = true;
              }
            }).catch(()=>{
              this.closeTopBottomLoading();
            });
            break;
        }
      },
      getQuestListMore(){
        if(this.totalPage <= this.args.currentPage){
          return
        }else {
          this.args.currentPage += 1;
          this.bottomLoading = true;
          this.getQuestList();
        }
      },
      dataCompute(res){
        res.forEach(item => {
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
        });
      },
//      gotoPage(router){
//        if(!tokenMethods.getWapToken()){
//          MessageBox.confirm('请先登录!').then(action => {
//            this.$router.push({path: '/logIn', query: {backName: '/yayiCircle'}});
//          })
//          return
//        }
//        this.$router.push(router)
//      },
      gotoDetail(id){
        this.$router.push({path:'/QandADetail',query:{faqQuestionId:id,backName:this.backName}})
      },
      //mt中接受的val值作为参数传入我的组件里
      isState(val){
        console.log(val)
        this.$refs.topLoadMore.states(val)
      },
      //把下拉刷新完成之后回调的mt的方法传入我的组件里
      isLoaded(){
        this.$refs.loadmore.onTopLoaded();
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
        console.log(this.allLoaded);
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  .FAQContainer{
    width: 100%;
    height: 100%;
    min-height: 79vh;
    background-color: #f4f4f4;
    .loadMore{
      min-height: 79vh;
      .scrollBox{
        min-height: 79vh;
        width: 100%;
        height: 100%;
        background-color: #f4f4f4;
        .eachContainer{
        padding: px2vw(0) px2vw(20) 0;
        background-color: #fff;
        width: 100%;
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
          .title{
            width: 100%;
            font-size: px2vw(32);
            color: #333;
            margin-bottom: px2vw(30);
            // font-weight: bold;
          }
          .other{
            padding-bottom: px2vw(30);
            border-bottom: px2vw(1) solid #e5e5e5;
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
      }

    }
    .noData{
      z-index: 9999;
      // position: fixed;

      left: 50%;
      // transform: translate(-50%,0);
      font-size: px2vw(30);
      color: #666666;
      text-align: center;
      height: 79vh;
      // width: 100%;
      // text-align: center;
      img{
        margin-top: 43%;
        // margin:px2vw(400) auto px2vw(30);
        width: px2vw(150);
      }
      p{
        font-size: px2vw(30);
        // color:$themeColor;
      }
    }
    .edit{
      width: px2vw(100);
      height: px2vw(100);
      position: fixed;
      bottom: px2vw(148);
      right: px2vw(50);
      img{
        width: 100%;
      }
    }
    .noMoreData{
      margin-top: px2vw(-1);
      background-color: #f4f4f4;
      margin: px2vw(2) auto;
      height: px2vw(80);
      font-size: px2vw(26);
      color: #999;
      text-align: center;
      line-height: px2vw(80);
      margin-bottom:  px2vw(20);

    }
  }
</style>
