<template>
    <div class="out">
      <!--无视频样式-->
      <div v-if="(isShow && !videoArgs) || (isShow && videoArgs.length == 0)" class="noneVideo">
        <div class="noneV">
          <img src="../../../../images/video/noneVideo.png" alt="">
        </div>
        <div>暂无相关视频</div>
      </div>
      <!--<mt-loadmore  :top-method="loadMore" :auto-fill=false ref="loadmore"  v-on:top-status-change="isState">-->
      <!--<topLoadMore ref="topLoadMore" slot="top" :loading="isLoading" :loaded="isLoaded"></topLoadMore>-->
      <!-- v-for -->
      <div v-infinite-scroll="getCaseListMore" infinite-scroll-immediate-check="false"  v-else>
        <div v-for="(item, index) in videoArgs" class="videoWrap" :key="index">
          <div class="boxBox">
            <!--这里放视频-->
            <div class="videoBox" v-if="!videoArgs || videoArgs.length > 0">
              <video-play :isVideo="typeVideo" v-if="videoSwitch" :title="item.vidName">
                <!--<video  src=""  controls="" x5-playsinline="" playsinline="" webkit-playsinline="" poster="" preload="auto"></video>-->
                <!--posterSrc:视频封面地址  slot必须带class="video"-->
                <video  webkit-playsinline :src="item.vidRoute" :poster="item.vedioPic"  slot="video"  class="video" preload="none">
                <!--<source slot="sourceSrc"  type="video/mp4"></source>-->
                </video>
              </video-play>
            </div>
            <!--这里放视频-->
            <!--底部开始-->
            <div class="bottomBox">
              <span class="nameBox" v-if="item.itemInfo != null" @click = "toProductDetail(item.itemInfo)">
                <img class="prcImg" src="../../../../images/video/prc.png" alt="">
                <span>{{item.itemInfo.itemName}}</span>
              </span>
              <div class="bottom-right">
                <span @click="toVideo(item.viId)" class="commentBox">
                  <img class="commentImg" src="../../../../images/video/comment.png" alt="">
                  <span class="commentNum">{{item.vedioCommentNumber}}</span>
                  <!-- <span class="commentNum">806</span> -->
                </span>
                <span @click="collect(item.viId, item.isStar, index)" class="collectionBox">
                  <img class="collectionImg" v-if="item.isStar == 1" src="../../../../images/case/iscollect.png" alt="">
                  <img class="collectionImg" v-else src="../../../../images/video/collection.png" alt="">
                  <!-- <span>{{item.starNumber == null? 0:item.starNumber }}</span> -->
                  <span class="collection-text">{{ item.isStar == 1 ? '已收藏' : '收藏' }}</span>
                </span>
              </div>
            </div>
            <!--底部结束-->
          </div>
        </div>
        <div v-if="videoArgs.length != 0 && pageAll.currentPage == pageAll.totalPage" class="noMoreData">
          - End -
        </div>
      </div>
      <!--</mt-loadmore>-->
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
        typeVideo: 'video',
        //获取当前登录账号的userID
        myUserId:tokenMethods.getWapUser() ? tokenMethods.getWapUser().userId:'',
        videoSwitch: true,
        isLoading:true,
        videoListArgs:{
          rule: '',         //1,最多播放2.最多评论3.时间倒叙  (非必须)
          videoCategory: '', //视频分类:1.外科2.内科3.修复4.种植5.正畸6全部 (非必须)  //当前第几页
          numberPerPage:10, //每页显示多少条视频
          type:2
        },
        caseSearchArgs:{
          keyWord:'',
          type:2,
          classify:'',
          currentPage:1,
          numberPerPage:10
        },
        pageAll:{
          totalPage:-1,
          currentPage:1
        },
        isShow: false,
        videoArgs:[],
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
        this.pageAll.currentPage = 1;
        this.videoArgs = [];
        this.isShow = false;
        this.getVideoList();
      },
      saveCaseOrder: function (newVal,oldVal) {
        this.videoListArgs.rule = this.saveCaseOrder;
        this.pageAll.currentPage = 1;
        this.videoArgs = [];
        this.isShow = false;
        this.getVideoList();
      },
    },
    created(){
      if(this.$router.history.current.name === 'videoSearch'){
        this.caseSearchArgs.keyWord = this.saveCaseSearching;
        this.videoArgs = [];
        this.isShow = false;
      }
      this.getVideoList()
    },
    mounted(){

    },
    methods:{
      collect (vid, isStar, index){
        if(this.pointLogin())
        {
          this.$store.dispatch('SAVE_COLLECT', {viId: vid}).then((res)=>{
              if(res.callStatus === "SUCCEED")
              {
                if(isStar === 0)  //未收藏
                {
                  this.videoArgs[index].isStar = 1;
                  this.videoArgs[index].starNumber = Number(this.videoArgs[index].starNumber) + 1;
                  Toast({message: '收藏成功', duration: 1500})
                }else {
                  MessageBox.confirm('确定取消收藏?').then(action => {
                    if(this.$router.history.current.name === 'videoCollect'){
                      this.videoArgs.splice(index,1);
                    }
                    this.videoArgs[index].isStar = 0;
                    this.videoArgs[index].starNumber = Number(this.videoArgs[index].starNumber) - 1;
                    Toast({message: '已取消收藏', duration: 1500})
                  }).catch(reject =>{});
                }
              }else {
                Toast({message: '收藏失败', duration: 1500})
              }
          })
        }else {
          this.isLogin();
        }
      },
      toProductDetail(itemInfo) {
        sessionStorage.setItem('backJudgeSL', 'video');
        this.$router.push({path: '/details/'+itemInfo.itemId, query: {name:itemInfo.itemName,itemId:itemInfo.itemId,backJudge:'video'}});
      },
      getVideoList(){
        this.isLoading = true
        if(this.$router.history.current.name === 'videoSearch'){
          this.caseSearchArgs.currentPage = this.pageAll.currentPage
          this.$store.dispatch('SEARCH_CASE_LIST', this.caseSearchArgs).then((res) => {
            this.videoArgs = this.videoArgs.concat(res.data);
            this.pageAll.totalPage = res.totalPage;
            this.pageAll.currentPage = res.currentPage;
            this.isLoading = false;
            this.videoArgs = this.videoArgs.filter((item) =>{
              if(item.vidRoute.substr(0,4) === "http")
              {
                return true;
              }else{
                return false;
              }
            });
            if (this.videoArgs.length == 0) {
              this.isShow = true
            }
          })
        } else if (this.$router.history.current.name === 'videoCollect') {
          this.caseSearchArgs.currentPage = this.pageAll.currentPage
          this.$store.dispatch('COLLECT', this.caseSearchArgs).then( (res) => {
            this.videoArgs = this.videoArgs.concat(res.data);
            this.videoArgs.forEach(item =>{
              item.isStar = 1
            })
            this.pageAll.totalPage = res.totalPage;
            this.pageAll.currentPage = res.currentPage;
            this.isLoading = false;
            this.videoArgs = this.videoArgs.filter((item) =>{
              if(item.vidRoute.substr(0,4) === "http")
              {
                return true;
              }else{
                return false;
              }
            });
            if (this.videoArgs.length == 0) {
              this.isShow = true
            }
          })
        } else {
          this.videoListArgs.currentPage = this.pageAll.currentPage
          if (this.$router.history.current.name === 'videoIndex') {
            this.videoListArgs.rule = 2
          }
          this.$store.dispatch('GET_VIDEO_LIST', this.videoListArgs).then((res) => {
            this.videoSwitch = false;
            this.$nextTick( ()=>{
              this.videoSwitch = true;
            });
            if(res.data.length > 0)
            {
              console.log(res.data)
              this.videoArgs = this.videoArgs.concat(res.data);
              this.pageAll.totalPage = res.totalPage;
              this.pageAll.currentPage = res.currentPage;
              // this.videoArgs['totalPage'] = res.totalPage;
              this.isLoading = false;
              this.videoArgs = this.videoArgs.filter((item) =>{
                if(item.vidRoute.substr(0,4) === "http")
                {
                  return true;
                }else{
                  return false;
                }
              });
            }
            else {
              console.log(this.videoArgs,res.data)
              this.isShow = true
            }
          });
        }
      },
      //无限滚动
      getCaseListMore (){
        if(this.pageAll.currentPage < this.pageAll.totalPage || this.pageAll.totalPage == -1){
          this.pageAll.currentPage++;
            this.getVideoList();
        }
      },

      //下拉刷新
      loadMore (id){
        this.pageAll.currentPage = 1;
        this.getChangeList();
      },
      //把下拉刷新完成之后回调的mt的方法传入我的组件里
      isLoaded(){
//        this.$refs.loadmore.onTopLoaded();
      },
      //mt中接受的val值作为参数传入我的组件里
      isState(val){
        console.log(val);
        this.$refs.topLoadMore.states(val)
      },
      toVideo(id){
        this.$router.push({path:'/videoDetailed',query:{id: id,backName:this.$router.history.current.fullPath}});
      },
      //判断是否登录
      pointLogin(){
        let userToken = tokenMethods.getWapToken();
        return userToken;
      },
      //提示需要登录
      isLogin() {
        MessageBox.confirm('请先登录!').then(action => {
          this.$router.push({path: '/logIn',query:{backName:'video'}})
        }).catch(function (error) {
          return '';
        });
      },
    },
    components:{
      videoPlay,topLoadMore
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
@import "../../../../common/sass/factory";
.out{
  width: 100%;
  min-height: 79vh;
}
.noneVideo{
  z-index: 9999;
  position: fixed;
  top: 43%;
  left: 50%;
  transform: translate(-50%,0);
  font-size: px2vw(30);
  color: #666666;
  text-align: center;
}
.noneV img{
  width: px2vw(150);
  height: px2vw(149);
}
.videoWrap{
  width: 100%;
}
.videoWrap:nth-child(1){
  padding-top: 0 !important;
}
.videoBox{
  width: 100%;
  overflow: hidden;
}
.videoBox video{
  height: 56.533vw;
}
.boxBox{
  box-shadow: 0 px2vw(0) px2vw(10) gray;
  background-color: white;
  overflow: hidden;
}
.bottomBox{
  position: relative;
  line-height: px2vw(88);
  height: px2vw(88);
  border-top:px2vw(1) solid #cccccc ;
}
.bottom-right{
  position: absolute;
  top: 0;
  right: px2vw(21);
  line-height: px2vw(88);
  height: px2vw(88);
}
.prcImg{
  vertical-align: top;
  margin-top: px2vw(27);
  width: px2vw(32);
  height: px2vw(32);
}
.collectionImg{
  width: px2vw(32);
  height: px2vw(30);
}
.collection-text{
  display: inline-block;
  width: px2vw(78);
  margin-left: px2vw(10);
  font-size: px2vw(26);
}
.commentImg{
  width: px2vw(32);
  height: px2vw(29);
}
.commentNum{
  display: inline-block;
  margin-left: px2vw(9);
  font-size: px2vw(30);
}
.bottom-right>span img,.bottom-right>span>span{
  vertical-align: middle;
}
.bottomBox>span{
  display: inline-block;
  height: 100%;
}
.nameBox{
  color: $themeColor;
  margin-left: px2vw(20);
}
.collectionBox{
  float: right;
  line-height: px2vw(88);
  height: px2vw(88);
  margin-right: px2vw(20);
  font-size: px2vw(0);
}
.commentBox{
  float: right;
  height: px2vw(88);
  line-height: px2vw(88);
  font-size: 0;
}
.noMoreData{
  margin-top: px2vw(-1);
  background-color: #fff;
  width: 100%;
  height: px2vw(80);
  font-size: px2vw(26);
  color: #999;
  text-align: center;
  line-height: px2vw(80);
}
</style>
