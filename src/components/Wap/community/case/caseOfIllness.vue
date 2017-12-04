<template>
<div ref="scrollBox" class="wrap loading">
  <mt-loadmore :top-method="loadMore" :auto-fill=false ref="loadmore"  v-on:top-status-change="isState">
    <topLoadMore ref="topLoadMore" slot="top" :loading="isLoading" :loaded="isLoaded"></topLoadMore>
    <div v-if="listCaseData != null" class="scrollBox" v-infinite-scroll="getCaseListMore" infinite-scroll-immediate-check="true">
      <div @click="goCaseDetailed(item)" v-for="(item, index) in listCaseData" class="caseBox" :key="index">
        <div class="userBox " :class="{'addChange1': item.cover !== ''}">
          <div class="userPicture">
            <img :src="item.user != undefined ? item.user.userPic : require('../../../../images/case/hPic.png')" alt="">
            <span class="userName">{{item.writer}}</span>
            <span class="userName userTime">{{item.postTime}}</span>
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
          <span v-if="item.chargeNumber" class="coin"> {{item.chargeNumber}}乾币</span>
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
  import { InfiniteScroll, LoadMore,Toast,MessageBox } from 'mint-ui';
  import Util from '../../../../vuex/util'
  import { tokenMethods } from '../../../../vuex/util'
  import topLoadMore from '../../../salesWap/index/topLoadMore.vue';
  import {mapGetters, mapMutations} from 'vuex';
  import {COLLECT_CASE} from '../../../../vuex/types'
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
          type:1,
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
    created() {
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
        this.$refs.scrollBox.scrollTop = 0;
      },
      saveCaseOrder: function (newVal, oldVal) {
        this.dressingFunction(this.saveCaseOrder);
        this.$refs.scrollBox.scrollTop = 0;
      },
      saveCaseSearching:function () {
        this.searching(this.saveCaseSearching);
        this.$refs.scrollBox.scrollTop = 0;
      }
    },
    methods: {
      //时间计算
      time(res,rs){
        res.forEach(item => {
          if (this.timeStamp - item.postTime < 3600000) {                                                        //几分钟前
            item.postTime = Math.ceil((this.timeStamp - item.postTime) / 1000 / 60) + '分钟前';
          } else if (this.timeStamp - item.postTime >= 3600000 && this.timeStamp - item.postTime < 86400000) {   //几小时前
            item.postTime = Math.floor((this.timeStamp - item.postTime) / 1000 / 60 / 60) + '小时前';
          } else {
            item.postTime = Util.formatDate.format(new Date(item.postTime),'yyyy-MM-dd').substring(0);      //日期
          }
          // switch (true){
          //   //几分钟前
          //   case this.timeStamp - item.postTime < 3600000:
          //     item.postTime = Math.ceil((this.timeStamp - item.postTime) / 1000 / 60) + '分钟前';
          //     break;
          //     //几小时前
          //   case this.timeStamp - item.postTime >= 3600000 && this.timeStamp - item.postTime < 86400000:
          //     item.postTime = Math.floor((this.timeStamp - item.postTime) / 1000 / 60 / 60) + '小时前';
          //     break;
          //     //日期
          //   case this.timeStamp - item.postTime >= 86400000:
          //     item.postTime = Util.formatDate.format(new Date(item.postTime),'yy.MM.dd hh:mm').substring(2);
          //     break;
          // }
        });
      },
      ...mapMutations({
        saveCaseIllness: 'SAVE_CASEOFILLNESS'
      }),
      goCaseDetailed(item){
        this.saveCaseIllness(item)
        this.$router.push({path: '/caseDetailed', query:{'id': item.postId}})
      },
      getCaseListMore (){
        if(this.caseDate.totalPage <= this.caseListArgs.currentPage)
        {
          return
        }
        else if(this.$router.history.current.name === 'caseOfIllnessSearch' && this.caseSearchArgs.totalPage < this.caseSearchArgs.currentPage){
          return
        }
        else {
          this.caseListArgs.currentPage = Number(this.caseListArgs.currentPage) + 1;
          this.getCaseList();
        }
      },
      getCaseList (more){
        if(this.$router.history.current.name === 'caseOfIllnessSearch'){
          this.$store.dispatch('SEARCH_CASE_LIST', this.caseSearchArgs).then( (res) => {
            if(res.data){
              this.time(res.data)
              this.classifyCompute(res.data);
              this.listCaseData = this.listCaseData.concat(res.data);
              this.caseSearchArgs.totalPage = res.totalPage;
              this.caseSearchArgs.currentPage = res.currentPage;
            }
            this.isLoading = false;
          })
        }else if(this.$router.history.current.name === 'caseOfIllnessCollect') {
          this.$store.dispatch('COLLECT', this.caseListArgs).then((res) => {
            if(res.data) {
              this.time(res.data)
              this.classifyCompute(res.data);
              this.listCaseData = this.listCaseData.concat(res.data);
              this.caseListArgs.totalPage = res.totalPage;
              this.caseListArgs.currentPage = res.currentPage;
            }
            this.isLoading = false;
          })
        }else {
          this.$store.dispatch('GET_CASE_LIST', this.caseListArgs).then( (res) => {
            if(res.data) {
              this.time(res.data)
              this.classifyCompute(res.data);
              this.listCaseData = this.listCaseData.concat(res.data);
              this.caseListArgs.totalPage = res.totalPage;
              this.caseDate.totalPage = res.totalPage;
              this.caseListArgs.currentPage = res.currentPage;
              this.isLoading = false;
            }
          })
        }
      },
      classifyCompute(res){
        res.forEach(function (item, index, array) {
          if(item.classify === 1)
          {
            item.classify = '口腔外科'
          }else if(item.classify === 2)
          {
            item.classify = '口腔内科'
          }else if(item.classify === 3)
          {
            item.classify = '口腔修复'
          }else if(item.classify === 4)
          {
            item.classify = '口腔种植'
          }else if(item.classify === 5)
          {
            item.classify = '口腔正畸'
          }
        });
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
        if(!tokenMethods.getWapToken()){
          MessageBox.confirm('请先登录!').then(action => {
            this.$router.push({path: '/logIn', query: {backName: '/caseOfIllness'}});
          })
          return
        }
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
     padding: 0 px2vw(4);
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

