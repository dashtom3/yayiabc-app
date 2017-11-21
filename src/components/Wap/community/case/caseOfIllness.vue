<template>
<div ref="scrollBox" class="wrap loading">
    <mt-loadmore :top-method="loadMore" :auto-fill=false ref="loadmore"  v-on:top-status-change="isState">
      <topLoadMore ref="topLoadMore" slot="top" :loading="isLoading" :loaded="isLoaded"></topLoadMore>

    <div  v-infinite-scroll="getCaseListMore" infinite-scroll-immediate-check="true">
      <div @click="goCaseDetailed(item.postId)" v-for="(item, index) in listCaseData" class="caseBox">
        <div class="userBox " :class="{'addChange1': item.cover !== ''}">
          <div class="userPicture">
            <img src="../../../../images/mine/zhifubao.png" alt="">
            <span class="userName">{{item.writer}}</span>
            <span class="userName userTime">5分钟前</span>
          </div>
          <div class="caseContent">
            {{item.headline}}
          </div>
        </div>
        <div v-if="item.cover !== ''" class="userImgBox" :class="{'addChange2': item.cover !== ''}">
          <img :src="item.cover" alt="">
        </div>

        <div class="readeBox">
          <span class="readeClass">{{item.classify}}</span>
          <span class="readeNum">{{item.readNumber==null?0: item.readNumber}} 阅读</span>
          <span class="readeNum2">· {{item.commentNumber}}评论</span>
          <span class="readeNum2">· {{item.postFavour}}赞</span>
          <span class="coin"> {{item.chargeNumber==null?0: item.chargeNumber}}乾币</span>
        </div>
      </div>
    </div>
    </mt-loadmore>
    <!--编辑按钮-->
    <div class="edit" @click="gotoPage('/newCase')" v-if="showNewCase">
      <img src="../../../../images/case/caseOfIllness/editer.png" alt="">
    </div>
    <!--编辑按钮-->

</div>

</template>

<script>
  import { InfiniteScroll, LoadMore } from 'mint-ui';
  import Util from '../../../../vuex/util'
  import topLoadMore from '../../../salesWap/index/topLoadMore.vue';
  import {mapGetters} from 'vuex';
  export default {
    data (){
      return{
        caseDate: {
          totalPage: 1
        },
        caseListArgs: {
          classify: null,
          currentPage: 1,
          numberPerPage: 10,
          order: 0,
          totalPage: -1,
          postStater:1,
        },
        caseSearchArgs:{
          keyWord:'',
          type:1,
          classify:'',
          currentPage:1,
          totalPage: -1,
          numberPerPage:10
        },
        timeStamp: '', //时间戳
        isLoading:false,
        listCaseData: [],//获取到列表的数据
        showNewCase: true,
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
      this.timeStamp = Date.parse(new Date());
      if(this.$router.history.current.name === 'caseOfIllnessSearch'){
        this.showNewCase = false;
        this.caseSearchArgs.keyWord = this.saveCaseSearching;
      }
    },
    computed: {
    ...mapGetters([
        'saveCaseDressing', //分类筛选的值  不限 外科 内科等一栏
        'saveCaseOrder',   //order 筛选按钮的值
        'saveCaseSearching', //
      ]),
    },
    watch: {
      saveCaseDressing: function (newVal, oldVal) {
        this.dressing(this.saveCaseDressing);
        console.log(this.saveCaseDressing);
        this.$refs.scrollBox.scrollTop = 0;
      },
      saveCaseOrder: function (newVal, oldVal) {
        this.dressingFunction(this.saveCaseOrder);
        console.log(this.saveCaseOrder);
        this.$refs.scrollBox.scrollTop = 0;
      },
      saveCaseSearching:function () {
        this.searching(this.saveCaseSearching);
        console.log(this.saveCaseSearching);
        this.$refs.scrollBox.scrollTop = 0;
      }
    },
    methods: {
      //时间计算
      time(item){
        switch (true){
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
            item.momentTime = Util.formatDate.format(new Date(item.momentTime),'yy.MM.dd hh:mm').substring(2);
            break;
        }
      },
      goCaseDetailed(id){
        this.$router.push({path: '/caseDetailed', query:{'id': id}})
      },
      getCaseListMore (){
        if(this.caseDate.totalPage < this.caseListArgs.currentPage)
        {
          return
        }else if(this.caseSearchArgs.totalPage < this.caseSearchArgs.currentPage){
          return
        }
        else {
          this.getCaseList();
        }
      },
      getCaseList (){
        console.log(this.$router.history.current.name,'aa');
        if(this.$router.history.current.name === 'caseOfIllnessSearch'){
          this.$store.dispatch('SEARCH_CASE_LIST', this.caseSearchArgs).then( (res) => {
            this.listCaseData = this.listCaseData.concat(res.data);
            this.caseSearchArgs.totalPage = res.totalPage;
            this.caseSearchArgs.currentPage = res.currentPage;
            this.isLoading = false;
          })
        }else {
          this.$store.dispatch('GET_CASE_LIST', this.caseListArgs).then( (res) => {
            this.listCaseData = this.listCaseData.concat(res.data);
            this.caseListArgs.totalPage = res.totalPage;
            this.caseListArgs.currentPage = res.currentPage;
            this.isLoading = false;
          })
        }
      },
      //下拉刷新
      loadMore (id){
        this.timeStamp = Date.parse(new Date());
        this.$refs.scrollBox.scrollTop = 0;
        this.caseListArgs.currentPage = 1;
        this.caseSearchArgs.currentPage = 1;
        this.listCaseData = [];
        this.caseDate.dressingSwitch = false;
        this.isLoading = true;
        this.getCaseList();
//        this.$store.dispatch('GET_CASE_LIST', this.caseListArgs).then( (res) => {
//          this.listCaseData = res.data;
//          this.caseDate.totalPage = res.totalPage;
//          this.caseListArgs.currentPage += 1;
//        })
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
      dressingFunction (index){
        this.caseListArgs.currentPage = 1;
        this.caseListArgs.order = index;
        this.caseDate.totalPage = 1;
        this.caseDate.dressingSwitch = false;
        this.listCaseData = [];
        this.getCaseList();
      },
      //上部筛选功能栏
      dressing (item){
        if(this.$router.history.current.name === 'caseOfIllnessSearch'){
          this.caseSearchArgs.currentPage = 1;
          this.caseSearchArgs.classify = item;
        }else {
          this.caseListArgs.currentPage = 1;
          this.caseListArgs.classify = item;
        }
        this.caseDate.totalPage = 1;
        this.listCaseData = [];
        this.getCaseList();
      },
      searching(val){
        this.caseSearchArgs.currentPage = 1;
        this.caseSearchArgs.keyWord = val;
        this.caseDate.totalPage = 1;
        this.listCaseData = [];
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

<style lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";
  .loading .mint-loadmore{
    min-height:px2vw(100);
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../../common/sass/factory";

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

    /*<!--.wrap{-->
     <!--position: fixed;-->
     <!--z-index: -1;-->
     <!--top: px2vw(208);-->
     <!--bottom: 0;-->
     <!--overflow: scroll;-->
     <!--width: 100%;-->
     <!-- -webkit-overflow-scrolling: touch;-->
   <!--}-->*/
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

   .fade-enter-active, .fade-leave-active {
     transition: opacity .5s
   }
   .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
      opacity: 0
    }
</style>

