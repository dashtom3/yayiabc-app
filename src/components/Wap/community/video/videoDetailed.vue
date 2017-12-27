<template>
    <div>
      <div class="backgroundImg"></div>
      <div class="wrapTop">
        <span class="title">视频详情</span>
        <span @click="goBack()" class="backImgBox">
          <img src="../../../../images/case/backer.png" alt="">
        </span>
      </div>
      <div class="container">
        <video-play :isVideo="typeVideo" ref="videoPlay"  v-if="videoSwitch">
          <video :poster="videoArgs.vedioPic" slot="video" webkit-playsinline="true" playsinline="true" class="video" preload="none">
            <source slot="sourceSrc" :src="videoArgs.vidRoute" type="video/mp4"></source>
          </video>
        </video-play>
        <!--标题内容开始-->
        <div  class="titleBox">{{ videoArgs.vidName }}</div>
        <!--标题内容结束-->
        <!--相关产品开始-->
        <div class="productBox" v-if='videoArgs.itemInfo != null'>
          <div class="productTitle">相关产品</div>
          <div class="productContent">
            <!--左-->
            <span class="productImgBox">
              <img src="" alt="">
            </span>
            <!--右-->
            <div class="productNameBox">
              <div class="productName">{{videoArgs.itemInfo.itemName}}</div>
              <div class="classBox">
                <span>{{videoArgs.itemInfo.itemBrand}}</span>
                <span>销量:{{videoArgs.itemInfo.sales != null ? videoArgs.itemInfo.sales : 0}}</span>
              </div>
              <div class="productPrice">
                ¥&nbsp;{{videoArgs.itemInfo.itemPrice}}
              </div>
              <img src="../../../../images/mine/back.png" alt="">
            </div>
          </div>
        </div>
        <!--相关产品结束-->
        <div>
          <comment :types="'视频'">
            aaa
          </comment>
        </div>
      </div>
      <!--结尾-->
    </div>
</template>
<script>
  import videoPlay from './videoPlay.vue'
  import comment from '../case/comment.vue'
  export default {
    data(){
      return{
        typeVideo: 'videoDetail',
        all: false,
        videoSwitch: false,
        src: 'http://orl5769dk.bkt.clouddn.com/lsnqQYcJMcnTQzYmtKiVy16WRMs1',
        videoArgs:{}
      }
    },
    created(){
      this.getVideosDetail();
      this.mBack("goBack");
    },
    methods:{
      getVideosDetail(){
        this.$store.dispatch('GET_VIDEOS_DETAIL', {viId: this.$route.query.id}).then((res)=>{
          this.videoArgs = res.data;
          this.videoSwitch = true
        });
      },
      goBack(){
        if(this.$route.query.backName){
          console.log(this.$route.query.backName)
          this.$router.push({path:this.$route.query.backName})
        }else {
          this.$router.go(-1);
        }
        this.$destroy()
      },
    },
    components:{
      videoPlay,
      comment
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../../common/sass/factory";
    .boxBox{
      min-height: px2vw(422);
      transition: all 0.5s;
    }
    .productBox{
      margin-top: px2vw(20);
      padding: px2vw(40) px2vw(20) px2vw(26) px2vw(18);
      background-color: white;
    }
    .titleBox{
      padding: px2vw(30) px2vw(25);
      background-color: white;
      font-size: px2vw(36);
      color: #333333;
    }
    .container{
      position: absolute;
      top:px2vw(88);
      width: 100vw;
    }
    .wrapTop{
      z-index: 2000;
      position: fixed;
      height: px2vw(88);
      top:0;
      width: 100vw;
      background-color: $themeColor;
      text-align: center;
      color: #ffffff;
      font-size: px2vw(36);
    }
    .title{
      display: table-cell;
      vertical-align: middle;
      height: px2vw(88);
      width: 100vw;
      text-align: center;
    }
    .backImgBox{
      position: absolute;
      padding: px2vw(23) px2vw(35) 0 px2vw(20);
      top:0;
      left: 0;
      height: px2vw(88);
    }
    .backImgBox>img{
      width: px2vw(24);
      height: px2vw(42);
    }
    .backgroundImg{
      position: fixed;
      top:0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: #f4f4f4;
      z-index: -1;
    }
  .productTitle{
    font-size: px2vw(32);
    color: #333333;
  }
  .productContent{
    padding-top: px2vw(28);
  }
  .productImgBox{
    display: inline-block;
    width: px2vw(171);
    height: px2vw(175);
    border: 1px solid black;
    vertical-align: middle;
  }
  .productImgBox img{
    width: 100%;
    height: 100%;
  }
  .productNameBox{
    position: relative;
    display: inline-block;
    width: px2vw(467);
    vertical-align: middle;
    margin-left: px2vw(30);
    img{
      position: absolute;
      top: px2vw(70);
      right: px2vw(-10);
      width: px2vw(19);
      height: px2vw(36);
    }
  }
  .productName{
    font-size: px2vw(28);
    color: #333333;
  }
  .classBox{
    margin-top: px2vw(18);
  }
  .classBox span:nth-child(1){
    background-color: $themeColor;
    border-radius: px2vw(6);
    font-size: px2vw(22);
    text-align: center;
    color: white;
    padding: px2vw(4);
    vertical-align: middle;
  }
  .classBox span:nth-child(2){
    font-size: px2vw(22);
    color: #999999;
    vertical-align: middle;
    margin-left: px2vw(20);
  }
  .productPrice{
    font-size: px2vw(30);
    color: #d81e06;
    margin-top: px2vw(10);
  }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .6s
    }
    .fade-enter, .fade-leave-to  {
      opacity: 0
    }
    .container video{
      height: 56.533vw;
    }




</style>
