  <template>
<div ref="scrollBox" class="wrap loading">
  <div v-if="listCaseData.length == 0" class="noTrend">
    <img src="../../../../images/case/myCase/fabu.png" alt="">
    <p>暂无任何病例~</p>
  </div>
  <mt-loadmore :top-method="loadMore" :bottom-method="getCaseListMore" :bottom-all-loaded="allLoaded" :auto-fill=false ref="loadmore"  v-on:top-status-change="isState" v-on:bottom-status-change="isStateB">
    <topLoadMore ref="topLoadMore" slot="top" :loading="topLoading" :loaded="isLoaded"></topLoadMore>
    <div class="scrollBox" v-if="listCaseData.length != 0">
      <div @click="goCaseDetailed(item)" v-for="(item, index) in listCaseData" class="caseBox" :key="index">
        <div class="userBox" :class="{'addChange1': item.cover !== ''}">
          <div class="userPicture">
            <img :src="item.user != undefined ? item.user.userPic + '?imageView2/1/w/200/h/200' : require('../../../../images/case/hPic.png')" alt="">
            <span class="userName">{{item.writer}}</span>
            <span class="userName userTime">{{item.postTime}}</span>
          </div>
          <div class="caseContent">{{item.headline}}</div>
        </div>
        <div v-if="item.cover !== '' && item.cover != null" class="userImgBox" :class="{'addChange2': item.cover !== ''}">
          <img :src="item.cover+global.getSmallImageStr(160,160)" alt="">
        </div>
        <div class="readeBox">
          <span class="readeClass">{{item.classify}}</span>
          <span class="readeNum">{{item.readNumber==null?0: item.readNumber}} 阅读</span>
          <span class="readeNum2">· {{item.commentNum}} 评论</span>
          <span class="readeNum2">· {{item.zanNum}} 赞</span>
          <span v-if="item.chargeNumber && item.userToPost == null" class="coin"> {{item.chargeNumber}}乾币</span>
          <span v-if="item.userToPost != null" class="coin2"> 已购买</span>
        </div>
      </div>
      <div v-if="listCaseData.length != 0 && caseDate.currentPage == caseDate.totalPage" class="noMoreData">
        - End -
      </div>
      <div v-if="listCaseData.length != 0 && caseDate.currentPage == caseDate.totalPage" class="noMoreData2"></div>

    </div>

    <bottomLoadMore ref="bottomLoadMore" slot="bottom" :loading="bottomLoading" :loaded="isLoadedB"></bottomLoadMore>

  </mt-loadmore>
  <!--编辑按钮-->
  <!-- <div class="edit" @click="gotoPage('/newCase')" v-if="showNewCase">
    <img src="../../../../images/case/caseOfIllness/editer.png" alt="">
  </div> -->
  <!--编辑按钮-->
</div>
</template>

<script>
  import { Indicator, LoadMore,Toast,MessageBox } from 'mint-ui';
  import Util from '../../../../vuex/util'
  import { tokenMethods } from '../../../../vuex/util'
  import topLoadMore from '../../../salesWap/index/topLoadMore.vue';
  import bottomLoadMore from '../../../salesWap/index/bottomLoadMore.vue';
  import {mapGetters, mapMutations} from 'vuex';
  import {COLLECT_CASE} from '../../../../vuex/types'
  export default {
    data (){
      return{
        caseDate: {
          totalPage: -1,
          currentPage:1
        },
        caseListArgs: {
          classify: null,
          numberPerPage: 10,
          order: 0,
          postStater:1,
          type:1, //1 病例列表 2 我的病例列表
        },
        collectArgs: {
          classify: null,
          numberPerPage: 10,
          userId:tokenMethods.getWapUser() == null ? null : tokenMethods.getWapUser().userId,
          type:'病例', //1 病例列表 2 我的病例列表
        },
        caseSearchArgs:{
          keyWord:'',
          type:1,
          classify:'',
          numberPerPage:10
        },
        timeStamp: '', //时间戳
        topLoading:false,
        bottomLoading:false,
        allLoaded:false,
        listCaseData: [],//获取到列表的数据
        showNewCase: true,
        noData:false,         //无数据
      }
    },
    created() {
      // console.log(tokenMethods.getWapUser())
      this.getCaseList();
      this.timeStamp = Date.parse(new Date());
      if(this.$router.history.current.name === 'caseOfIllnessSearch'){
        // this.showNewCase = false;
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
        });
      },
      ...mapMutations({
        saveCaseIllness: 'SAVE_CASEOFILLNESS'
      }),
      goCaseDetailed(item){
        this.saveCaseIllness(item)
        this.$router.push({path: '/caseDetailed', query:{'id': item.postId, backName: this.$route.fullPath}})
      },
      getCaseListMore (){
          this.caseDate.currentPage = Number(this.caseDate.currentPage) + 1;
          this.bottomLoading = true;
          this.getCaseList();
      },
      closeTopBottomLoading(){
        this.topLoading = false;
        this.bottomLoading = false;
      },
      operateDate(res) {
        this.time(res.data)
        this.classifyCompute(res.data);
        this.listCaseData = res.currentPage == 1 ? res.data : this.listCaseData.concat(res.data);
        this.caseDate.totalPage = res.totalPage;
        this.caseDate.currentPage = res.currentPage;
        this.closeTopBottomLoading();
        this.allLoaded = this.caseDate.totalPage == this.caseDate.currentPage ? true : false;
      },
      getCaseList (){
        console.log(this.$router.history.current.name)
        var self = this
        switch (true){
          case this.$router.history.current.name === 'caseOfIllnessSearch':
            this.caseSearchArgs.currentPage = this.caseDate.currentPage;
            this.$store.dispatch('SEARCH_CASE_LIST', this.caseSearchArgs).then( (res) => {
              if(res.data){
                this.operateDate(res)
              }else {
                this.listCaseData = [];
              }
            }).catch(()=>{
              this.closeTopBottomLoading()
            })
            break;
          case this.$router.history.current.name === 'caseOfIllnessCollect':
            this.caseListArgs.currentPage = this.caseDate.currentPage;
            this.$store.dispatch('COLLECT', this.collectArgs).then((res) => {
              if(res.data) {
                this.operateDate(res)
              }else {
                this.listCaseData = [];
              }
            }).catch(()=>{
              this.closeTopBottomLoading()
            })
            break

          default:
            this.caseListArgs.currentPage = this.caseDate.currentPage;
            if(this.$router.history.current.name === "caseOfIllnessIndex") {
              this.caseListArgs.order = 1;
            }
            this.$store.dispatch('GET_CASE_LIST', this.caseListArgs).then( (res) => {
              if(res.data) {
                this.operateDate(res)
              } else {
                this.listCaseData = [];
              }
            }).catch(()=>{
              this.closeTopBottomLoading()
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
        this.caseDate.dressingSwitch = false;
        this.topLoading = true;
        this.getCaseList();
      },
      //mt中接受的val值作为参数传入我的组件里
      isState(val){
        console.log(val)
        this.$refs.topLoadMore.states(val)
      },
      //把下拉刷新完成之后回调的mt的方法传入我的组件里
      isLoaded(val){
        console.log(val)
        this.$refs.loadmore.onTopLoaded();
      },
      isStateB(val){
        console.log(val)
        // this.$refs.bottomLoadMore.states(val)
      },
      isLoadedB(){
        this.$refs.loadmore.onBottomLoaded();
      },
      dressingFunction (index){
        this.caseListArgs.currentPage = 1;
        this.caseListArgs.order = index;
        this.caseDate.totalPage = 1;
        this.caseDate.dressingSwitch = false;
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
        this.getCaseList();
      },
      searching(val){
        this.caseSearchArgs.currentPage = 1;
        this.caseSearchArgs.keyWord = val;
        this.caseDate.totalPage = 1;
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
      topLoadMore,bottomLoadMore
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";
  .loading .mint-loadmore{
    // min-height:px2vw(100);
    // height: 100%;
    // height: 100%;
    // -webkit-overflow-scrolling: touch;
    // overflow: scroll;
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../../common/sass/factory";

    .noTrend{
      z-index: 9999;
      // position: fixed;
      font-size: px2vw(30);
      color: #666666;
      text-align: center;
      height:79vh;
      width: 100%;
      // text-align: center;
      img{
        // margin:px2vw(400) auto px2vw(30);
        margin-top: 43%;
        left: 50%;
        // transform: translate(-50%,0);
        width: px2vw(150);
      }
      p{
        font-size: px2vw(30);
        // color:$themeColor;
      }
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

   .edit{
     width: px2vw(100);
     height: px2vw(100);
     position: fixed;
     top: px2vw(1085);
     right: px2vw(50);
     img{
       width: 100%;
      //  height: 100%;
     }
   }
   .scrollBox{
     min-height: 79vh;
     background-color: #f4f4f4;
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
   .coin2{
     float: right;
     font-size: px2vw(24);
     color: #999999;
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
     font-size: px2vw(24);
   }
   .readeClass{
     width: px2vw(98);
     height: px2vw(26);
     border: 1px solid #3676b6;
     text-align: center;
     color: #3676b6;
     font-size: px2vw(24);
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
     border-bottom: px2vw(1) solid #e5e5e5;
     padding: px2vw(36) px2vw(17) px2vw(35) px2vw(17);
   }


   .fade-enter-active, .fade-leave-active {
     transition: opacity .5s
   }
   .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
      opacity: 0
    }
    .noMoreData{
      margin-top: px2vw(-1);
      background-color: #f4f4f4;
      width: 100%;
      height: px2vw(80);
      font-size: px2vw(26);
      color: #999;
      text-align: center;
      line-height: px2vw(80);
      padding-bottom:  px2vw(20);
    }
     .noMoreData2{
      width: 100%;
      height: px2vw(20);
      background-color: #f4f4f4
     }
</style>
