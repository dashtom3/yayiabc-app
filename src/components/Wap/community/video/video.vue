<template>
    <div>
      <mt-loadmore  :top-method="loadMore" :auto-fill=false ref="loadmore"  v-on:top-status-change="isState">
        <topLoadMore ref="topLoadMore" slot="top" :loading="isLoading" :loaded="isLoaded"></topLoadMore>

      <!-- v-for -->
        <div v-infinite-scroll="getCaseListMore" infinite-scroll-immediate-check="true">
      <div v-for="(item, index) in videoArgs" class="videoWrap">
        <div class="boxBox">

          <!--这里放视频-->
          <div class="videoBox">
            <video-play v-if="videoSwitch">
              <!--<video  src=""  controls="" x5-playsinline="" playsinline="" webkit-playsinline="" poster="" preload="auto"></video>-->
              <!--posterSrc:视频封面地址  slot必须带class="video"-->
              <video :poster="item.vedioPic"  slot="video" webkit-playsinline="true" playsinline="true" class="video">
              <source slot="sourceSrc" :src="item.vidRoute" type="video/mp4"></source>
              </video>
            </video-play>
          </div>
          <!--这里放视频-->

          <!--底部开始-->
          <div class="bottomBox">

            <span class="nameBox">
              <img class="prcImg" src="../../../../images/video/prc.png" alt="">
              <span>{{item.vidName}}</span>
            </span>

            <span @click="toVideo(item.viId)" class="commentBox">
              <img class="commentImg" src="../../../../images/video/comment.png" alt="">
              <span>{{item.vedioCommentNumber }}</span>
            </span>

            <span @click="collect(item.viId, item.isStar, index)" class="collectionBox">
              <img class="collectionImg" src="../../../../images/video/collection.png" alt="">
              <span>{{item.starNumber == null? 0:item.starNumber }}</span>
            </span>
          </div>
          <!--底部结束-->
        </div>
      </div>
        </div>
      </mt-loadmore>
      <!--结束-->
    </div>
</template>

<script>
  import videoPlay from './videoPlay.vue'
  import {mapGetters} from 'vuex';
  import { InfiniteScroll, LoadMore ,MessageBox, Toast} from 'mint-ui';
  import topLoadMore from '../../../salesWap/index/topLoadMore.vue';
  import { tokenMethods } from '../../../../vuex/util';
  export default {
    data(){
      return{
        //获取当前登录账号的userID
        myUserId:tokenMethods.getWapUser() ? tokenMethods.getWapUser().userId:'',
        videoSwitch: true,
        isLoading:false,
        videoListArgs:{
          rule: '',         //1,最多播放2.最多评论3.时间倒叙  (非必须)
          videoCategory: '', //视频分类:1.外科2.内科3.修复4.种植5.正畸6全部 (非必须)
          currentPage: 1,  //当前第几页
          numberPerPage:10, //每页显示多少条视频
          type:2
        },
        caseSearchArgs:{
          keyWord:'',
          type:2,
          classify:'',
          currentPage:1,
          totalPage: 1,
          numberPerPage:10
        },
        videoArgs:[]
      }
    },
    computed: {
      ...mapGetters([
        'saveCaseDressing', //分类筛选的值  不限 外科 内科等一栏
        'saveCaseOrder',   //order 筛选按钮的值
        'saveCaseSearching', //
      ]),
    },
    watch:{
      saveCaseDressing: function (newVal,oldVal) {
        this.videoListArgs.videoCategory = this.saveCaseDressing;
        this.videoListArgs.currentPage = 1;

        this.getChangeList();
      },
      saveCaseOrder: function (newVal,oldVal) {
        this.videoListArgs.rule = this.saveCaseOrder;
        this.videoListArgs.currentPage = 1;
        this.getChangeList();
      },
    },
    created(){
      if(this.$router.history.current.name === 'videoSearch'){
        this.caseSearchArgs.keyWord = this.saveCaseSearching;
      }
      console.log(this.$router.history.current.name);
      this.getVideoList()
    },
    mounted(){

    },
    methods:{
      collect (vid, isStar, index){
        console.log(isStar);
        if(this.pointLogin())
        {
          this.$store.dispatch('SAVE_COLLECT', {viId: vid}).then((res)=>{
              console.log(res);
              if(res.callStatus === "SUCCEED")
              {

                if(isStar === 0)  //未收藏
                {
                  this.videoArgs[index].isStar = 1;
                  this.videoArgs[index].starNumber = Number(this.videoArgs[index].starNumber) + 1;
                  Toast({message: '收藏成功', duration: 1500})
                }else {
                  this.videoArgs[index].isStar = 0;
                  this.videoArgs[index].starNumber = Number(this.videoArgs[index].starNumber) - 1;
                  Toast({message: '已取消收藏', duration: 1500})
                }
              }else {
                Toast({message: '收藏失败', duration: 1500})
              }
          })
        }else {
          this.isLogin();
        }
      },
      getVideoList(){
        this.isLoading = true
        if(this.$router.history.current.name === 'videoSearch'){
          this.$store.dispatch('SEARCH_CASE_LIST', this.caseSearchArgs).then( (res) => {
            this.videoArgs = this.videoArgs.concat(res.data);
            this.caseSearchArgs.totalPage = res.totalPage;
            this.caseSearchArgs.currentPage = res.currentPage;
            this.isLoading = false;
          })
        }else if(this.$router.history.current.name === 'videocollect'){
          this.$store.dispatch('COLLECT', this.caseSearchArgs).then( (res) => {
            this.videoArgs = this.videoArgs.concat(res.data);
            this.caseSearchArgs.totalPage = res.totalPage;
            this.caseSearchArgs.currentPage = res.currentPage;
            this.isLoading = false;
          })
        }
        else {
          this.$store.dispatch('GET_VIDEO_LIST', this.videoListArgs).then((res) => {
            this.videoSwitch = false;
            this.$nextTick( ()=>{
              this.videoSwitch = true;
            });

            this.videoArgs = res.data;
            this.videoArgs['totalPage'] = res.totalPage;
            this.isLoading = false;


            console.log(res, '时间');
          });
        }
      },
      getChangeList(){
        this.$store.dispatch('GET_VIDEO_LIST', this.videoListArgs).then((res) => {
          this.videoArgs = res.data;
          this.videoArgs['totalPage'] = res.totalPage;
          this.videoArgs['currentPage'] = res.currentPage;
          console.log(res, '时间');
          this.isLoaded();
        });
      },

      //无限滚动
      getCaseListMore (){
        this.videoArgs['currentPage']++;
        if(this.videoArgs.totalPage < this.videoListArgs.currentPage)
        {
          return
        }else if(this.caseSearchArgs.totalPage < this.caseSearchArgs.currentPage){
          return
        }
        else {
          console.log(1);

          this.$store.dispatch('GET_VIDEO_LIST', this.videoListArgs).then((res) => {
            this.videoArgs = this.videoArgs.concat(res.data);
            this.videoArgs['totalPage'] = res.totalPage;
            this.videoArgs['currentPage'] = res.currentPage;
          });
        }
      },

      //下拉刷新
      loadMore (id){
        this.videoListArgs.currentPage = 1;
        this.getChangeList();
      },
      //把下拉刷新完成之后回调的mt的方法传入我的组件里
      isLoaded(){
        this.$refs.loadmore.onTopLoaded();
      },
      //mt中接受的val值作为参数传入我的组件里
      isState(val){
        console.log(val);
        this.$refs.topLoadMore.states(val)
      },
      toVideo(id){
        this.$router.push({path:'/videoDetailed',query:{id: id}});
      },
      //判断是否登录
      pointLogin(){
        let userToken = tokenMethods.getWapToken();
        return userToken;
      },
      //提示需要登录
      isLogin() {
        MessageBox.confirm('请先登录!').then(action => {
          this.$router.push({path: '/logIn'})
        }).catch(function (error) {
          return '';
        });
      },
    },
    components:{videoPlay,topLoadMore}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../../common/sass/factory";

  .videoWrap{
    width: 100%;
    padding-left: px2vw(20);
    padding-top: px2vw(25);
    padding-right: px2vw(20);

  }
  .videoWrap:nth-child(1){
    padding-top: 0 !important;
  }
  .videoBox{
    width: 100%;
  }
  .boxBox{
    box-shadow: 0 px2vw(0) px2vw(10) gray;
    background-color: white;
    border-radius: px2vw(8);
    overflow: hidden;
  }
  .bottomBox{
    line-height: px2vw(94);
    height: px2vw(94);

  }
  .prcImg{
    width: px2vw(32);
    height: px2vw(32);
  }
  .collectionImg{
    width: px2vw(32);
    height: px2vw(30);
  }
  .commentImg{
    width: px2vw(32);
    height: px2vw(29);
  }

  .bottomBox>span img,.bottomBox>span>span{
    vertical-align: middle;
  }
  .bottomBox>span{
    display: inline-block;
    height: 100%;
  }
  .nameBox{
    margin-left: px2vw(28);
  }
  .collectionBox{
    float: right;
    padding-right: px2vw(13);
  }
  .commentBox{
    float: right;
    margin-right: px2vw(10);
    padding-right: px2vw(20);
    padding-left: px2vw(14);
  }
</style>

