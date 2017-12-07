<template>
    <div>
      <!--无视频样式-->
      <div v-if="isShow" class="noneVideo">
        <div class="noneV">
          <img src="../../../../images/video/noneVideo.png" alt="">
        </div>
        <div>暂无相关视频</div>
      </div>
      <!--<mt-loadmore  :top-method="loadMore" :auto-fill=false ref="loadmore"  v-on:top-status-change="isState">-->
      <!--<topLoadMore ref="topLoadMore" slot="top" :loading="isLoading" :loaded="isLoaded"></topLoadMore>-->
      <!-- v-for -->
      <div v-infinite-scroll="getCaseListMore" infinite-scroll-immediate-check="true">
        <div v-for="(item, index) in videoArgs" class="videoWrap" :key="index">
          <div class="boxBox">
            <!--这里放视频-->
            <div class="videoBox">
              <video-play :isVideo="typeVideo" v-if="videoSwitch" :title="item.vidName">
                <!--<video  src=""  controls="" x5-playsinline="" playsinline="" webkit-playsinline="" poster="" preload="auto"></video>-->
                <!--posterSrc:视频封面地址  slot必须带class="video"-->
                <video  webkit-playsinline :src="item.vidRoute" :poster="item.vedioPic"  slot="video"  class="video">
                <!--<source slot="sourceSrc"  type="video/mp4"></source>-->
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
              <div class="bottom-right">
                <span @click="toVideo(item.viId)" class="commentBox">
                  <img class="commentImg" src="../../../../images/video/comment.png" alt="">
                  <span class="commentNum">{{item.vedioCommentNumber}}</span>
                  <!-- <span class="commentNum">806</span> -->
                </span>
                <span @click="collect(item.viId, item.isStar, index)" class="collectionBox">
                  <img class="collectionImg" src="../../../../images/video/collection.png" alt="">
                  <!-- <span>{{item.starNumber == null? 0:item.starNumber }}</span> -->
                  <span class="collection-text">{{ item.isStar == 1 ? '已收藏' : '收藏' }}</span>
                </span>
              </div>
            </div>
            <!--底部结束-->
          </div>
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
          this.$store.dispatch('SEARCH_CASE_LIST', this.caseSearchArgs).then((res) => {
            this.videoArgs = this.videoArgs.concat(res.data);
            this.caseSearchArgs.totalPage = res.totalPage;
            this.caseSearchArgs.currentPage = res.currentPage;
            this.isLoading = false;
            if (this.videoArgs == 0) {
              this.isShow = true
            }
          })
        } else if (this.$router.history.current.name === 'videoCollect') {
          this.$store.dispatch('COLLECT', this.caseSearchArgs).then( (res) => {
            this.videoArgs = this.videoArgs.concat(res.data);
            this.caseSearchArgs.totalPage = res.totalPage;
            this.caseSearchArgs.currentPage = res.currentPage;
            this.isLoading = false;
            if (this.videoArgs == 0) {
              this.isShow = true
            }
          })
        } else {
          this.$store.dispatch('GET_VIDEO_LIST', this.videoListArgs).then((res) => {
            this.videoSwitch = false;
            this.$nextTick( ()=>{
              this.videoSwitch = true;
            });
            if(res.msg !== "服务器错误")
            {
              this.videoArgs = res.data;
              this.videoArgs['totalPage'] = res.totalPage;
              this.isLoading = false;
              return
            }
            if (this.videoArgs == 0) {
              this.isShow = true
            }
          });
        }
      },
      getChangeList(){
        this.$store.dispatch('GET_VIDEO_LIST', this.videoListArgs).then((res) => {
          this.videoArgs = res.data;
          this.videoArgs['totalPage'] = res.totalPage;
          this.videoArgs['currentPage'] = res.currentPage;
          this.videoArgs = this.videoArgs.filter((item) =>{
            if(item.vidRoute.substr(0,4) === "http")
            {
              return true;
            }else{
              return false;
            }
          });
          this.isLoaded();
        });
      },
      //无限滚动
      getCaseListMore (){
        this.videoListArgs.currentPage++;
        if(this.videoArgs.totalPage < this.videoListArgs.currentPage)
        {
          return
        }
        else if(this.caseSearchArgs.totalPage < this.caseSearchArgs.currentPage){
          return
        }
        else {
          this.$store.dispatch('GET_VIDEO_LIST', this.videoListArgs).then((res) => {
            let datas = res.data.filter((item) =>{
              if(item.vidRoute.substr(0,4) === "http")
              {
                return true;
              }else{
                return false;
              }
            });
            this.videoArgs = this.videoArgs.concat(datas);
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
//        this.$refs.loadmore.onTopLoaded();
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
  margin-right: px2vw(10);
  font-size: px2vw(0);
}
.commentBox{
  float: right;
  height: px2vw(88);
  line-height: px2vw(88);
  font-size: 0;
}
</style>

