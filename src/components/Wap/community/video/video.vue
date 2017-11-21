<template>
    <div>


      <!-- v-for -->
      <div v-for="(item, index) in videoArgs" class="videoWrap">
        <div class="boxBox">

          <!--这里放视频-->
          <div class="videoBox">
            <video-play>

              <!--<video  src=""  controls="" x5-playsinline="" playsinline="" webkit-playsinline="" poster="" preload="auto"></video>-->
              <!--posterSrc:视频封面地址  slot必须带class="video"-->
              <video :poster="item.vedioPic" :posterSrc="item.vedioPic" slot="video" webkit-playsinline="true" playsinline="true" class="video">
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

            <span class="commentBox">
              <img class="commentImg" src="../../../../images/video/comment.png" alt="">
              <span>{{item.vedioCommentNumber }}</span>
            </span>

            <span class="collectionBox">
              <img class="collectionImg" src="../../../../images/video/collection.png" alt="">
              <span>{{item.starNumber == null? 0:item.starNumber }}</span>
            </span>
          </div>
          <!--底部结束-->
        </div>
      </div>

      <!--结束-->
    </div>
</template>

<script>
  import videoPlay from './videoPlay.vue'
  import {mapGetters} from 'vuex';
  export default {
    data(){
      return{
        videoListArgs:{
          rule: '',         //1,最多播放2.最多评论3.时间倒叙  (非必须)
          videoCategory: '', //视频分类:1.外科2.内科3.修复4.种植5.正畸6全部 (非必须)
          currentPage: 1,  //当前第几页
          numberPerPage: 10 //每页显示多少条视频
        },
        caseSearchArgs:{
          keyWord:'',
          type:2,
          classify:'',
          currentPage:1,
          totalPage: -1,
          numberPerPage:10
        },
        videoArgs:[]
      }
    },
    created(){
      if(this.$router.history.current.name === 'videoSearch'){
        this.caseSearchArgs.keyWord = this.saveCaseSearching;
      }
      console.log(this.$router.history.current.name)
      this.getVideoList()
    },
    mounted(){},
    methods:{
      getVideoList(){
        if(this.$router.history.current.name === 'videoSearch'){
          this.$store.dispatch('SEARCH_CASE_LIST', this.caseSearchArgs).then( (res) => {
            this.videoArgs = this.videoArgs.concat(res.data);
            this.caseSearchArgs.totalPage = res.totalPage;
            this.caseSearchArgs.currentPage = res.currentPage;
            this.isLoading = false;
          })
        }else {
          this.$store.dispatch('GET_VIDEO_LIST', this.videoListArgs).then((res) => {
            this.videoArgs = res.data;
            console.log(this.videoArgs, '时间');
          });
        }
      }
    },
    computed: {
      ...mapGetters([
        'saveCaseDressing', //分类筛选的值  不限 外科 内科等一栏
        'saveCaseOrder',   //order 筛选按钮的值
        'saveCaseSearching', //
      ]),

    },
    components:{
      videoPlay
    }
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

