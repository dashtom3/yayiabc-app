<template>
    <div>
      <!--视频区域开始-->
      <div :class="{'fullScreen': full}" class="videoBox videoEl" >
        <!--<video poster="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1510884409&di=1217e09e096bb11a78d1b585ff9b7b70&src=http://pic.baike.soso.com/p/20140619/20140619113120-670398887.jpg" webkit-playsinline="true" playsinline="true" class="video">-->
          <!--<slot name="sourceSrc"></slot>-->
          <!--<p>设备不支持</p>-->
        <!--</video>-->
        <slot name="video">
          <slot name="sourceSrc"></slot>
          <p>设备不支持</p>
        </slot>
        <div class="video-mask" v-show="videos.centerPlayImg">
          <h2 class="video-title">{{ title }}</h2>
        </div>
        <div class="video-image">
        <img v-show="videos.centerPlayImg && videos.videoState == 1" class="vplay" src="../../../../images/video/play.png"/>
        <img v-show="videos.centerPlayImg && videos.videoState == 0" class="vplay2" src="../../../../images/video/wait.png"/>
        <img v-show="videos.centerPlayImg && videos.videoState == 2" class="vplay3" src="../../../../images/video/load.png"/>
        </div>
        <transition name="fade">
          <!--视频控制条开始-->
          <div v-show="videos.controlShow" class="controls">
            <!-- <span class="playImgBox">
              <img src="../../../../images/video/playRight.png" alt="">
            </span> -->
            <span>
              {{videos.currPlayTime}}
            </span>
            <!--进度条-->
            <div class="progressBox">
            <span class="progress">
              <span class="progressBlue"></span>
              <span class="proCircle"></span>
            </span>
            </div>
            <span>
              <!--总时长-->
              {{videos.allTime}}
            </span>
            <span  class="allVideo" v-if="this.isVideo != 'videoProduct'">
              <img src="../../../../images/video/fullScreen.png" alt="" v-if="!full">
              <img src="../../../../images/video/smallScreen.png" alt="" v-if="full">
            </span>
          </div>
        </transition>
        <!--视频控制条结束-->
      </div>
      <!--视频区域结束-->
    </div>
</template>

<script>
import global from "../../global/global.js"


  export default {

    props:{
      isVideo:{
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      }
    },
    data(){
      return{
        videoId: 22, //获取的视频ID
        videos:{
          centerPlayImg: true, //中间的播放按钮
          allTime: '00:00:00', //总时长
          currPlayTime: '00:00:00', //当前播放时间
          controlShow: false,  //显示视频下部控件开关
          video: null,
          currentTime: null,
          videoState: 1,
        },
        //暂停 播放按钮
        full: false,  //全屏
      }
    },

    created(){
      this.mBack("goBack");

    },
    methods:{
      goBack(){
        
      },
      fullScreen(){
        let _this = this
        let video = this.$el.querySelector('.video');
        let Screen = _this.$el.querySelector('.videoEl'); //最外边边框
        let container = document.getElementsByClassName('container')[0]
        let instruction = document.getElementsByClassName('instruction')[0]
        let cc = document.getElementsByClassName('mu-paper')[0]
        _this.full = !_this.full;
        let conW = window.screen.width ;  //屏幕的宽
        // let conH = global.webFrom()=="WEIXIN" ? document.body.clientHeight : window.screen.height; //屏幕的高
        let conH = document.body.clientHeight;
        if (window.plus) {
          if(_this.full) {
            plus.navigator.setFullscreen(true);
            conH = conH + plus.navigator.getStatusbarHeight()
          } else {
            plus.navigator.setFullscreen(false);
          }
        }
        if(_this.isVideo === "video") //视频列表
        {
          if(_this.full)  //全屏的时候
          {
            console.log(1);
            // video.style.height = 'auto';
            video.style.height = '100%';
            cc.style.display = "none";
            container.style.zIndex = "9999";
            container.style.overflow = "visible";
            Screen.style.width = conH + "px";
            Screen.style.height = conW + "px";
            Screen.style.transformOrigin = "center center";
            Screen.style.transform = "rotate(90deg) translate("+((conH-conW)/2)+"px,"+((conH-conW)/2)+"px)";
            Screen.style.top = 0;
            Screen.style.left = 0;
          }else {  //非全屏
            console.log(2);
            video.style.height = '56.533vw';
            // video.style.width = "100% !import";
            cc.style.display = "block";
            container.style.zIndex = "0";
            Screen.style.width = conW + "px";
            Screen.style.height = "auto";
            Screen.style.transform = "rotate(0deg) translate(0,0)";
            container.style.overflow = "scroll";
          }
        }else {  //视频详情  商品详情
          if(_this.full)  //全屏的时候
          {
            console.log(3);
            // video.style.height = conH+"px";
            video.style.height = '100%';
            Screen.style.width = conH + "px";
            if(instruction) {
              instruction.style.zIndex = "9999";
              instruction.style.overflow = "visible";
            }
            Screen.style.height = conW + "px";
            Screen.style.transformOrigin = "center center";
            Screen.style.transform = "rotate(90deg) translate("+((conH-conW)/2)+"px,"+((conH-conW)/2)+"px)";
            Screen.style.top = 0;
            Screen.style.left = 0;
          }else {  //非全屏
            console.log(4);
            video.style.height = '56.533vw';
            Screen.style.width = conW + "px";
            Screen.style.height = "auto";
            video.style.width = "100% !import";
            Screen.style.transform = "rotate(0deg) translate(0,0)";
          }
        }
      }
    },
    mounted(){
      let timer;
      let _this = this;
      //当视频可播放的时候
      let controls = this.$el.querySelector('.controls'); //控件的最高级父级节点
      let video = this.$el.querySelector('.video');
      let videoMask = this.$el.querySelector('.video-mask');
      let progress = this.$el.querySelector('.progressBlue'); //进度条
      let proCircle = this.$el.querySelector('.proCircle'); //进度条 圆
      let progressBox = this.$el.querySelector('.progressBox'); //进度条父级BOX
      let expand = this.$el.querySelector('.allVideo'); //全屏按钮
      // let playImgBox = this.$el.querySelector('.playImgBox'); //控件左下角的播放按钮
      let vplay = this.$el.querySelector('.vplay'); //中间的播放按钮
      let vplay2 = this.$el.querySelector('.vplay2'); //中间的播放按钮
      let videoElWith = this.$el.querySelector('.videoEl').offsetLeft; //最外边边框宽度
      _this.videos.video = video
      video.controls=false; //隐藏原有控件
      vplay.addEventListener('click',function () {
        _this.videos.videoState = 0;
        _this.videos.centerPlayImg = true;
        _this.videos.controlShow = true;
          video.play();
          if(_this.videos.currentTime != null) {
            video.currentTime = _this.videos.currentTime;
            _this.videos.currentTime = null;
          }
          _this.$store.commit('VIDEO_PLAY',_this.videos)
      },false);
      vplay2.addEventListener('click',function () {
        _this.videos.videoState = 1;
        video.pause();
          _this.videos.centerPlayImg = true;
          _this.videos.controlShow = true;
          timerFuc();
      },false);
      videoMask.addEventListener('click', function () {
        if(_this.videos.controlShow == true) {
          _this.videos.controlShow = false;
          _this.videos.centerPlayImg = false;
        }
      },false);
      video.addEventListener('click', function () {
        _this.videos.controlShow = true;
        _this.videos.centerPlayImg = true;
        timerFuc();
      },false);
      //计时隐藏控制条
      function timerFuc() {
        window.clearTimeout(timer);
        timer = window.setTimeout(function () {
          _this.videos.controlShow = false;
          _this.videos.centerPlayImg = false;
          _this.videos.videoState = true;
        },4500)
      }
      video.onwaiting = function(){
        _this.videos.videoState = 2;
      };
      video.onplaying = function(){
        _this.videos.videoState = 0;
      }
      video.oncanplay = function(){
        //显示视频总时长
        if(video.duration)
        {
          let time = video.duration;
          _this.videos.allTime =  getFormatTime(time);
        }
      };
      video.onended = function(){
        _this.videos.controlShow = true;
        _this.videos.centerPlayImg = true;
      };
      //进度计算
      video.ontimeupdate = function(){
        let currTime = this.currentTime,    //当前播放时间
          duration = this.duration;       // 视频总时长
        //计算百分比
        let proPre = currTime / duration * 100 + "%";
        //显示进度条
        progress.style.width = proPre; //蓝线进度
        proCircle.style.left = proPre; //圆圈进度
        //显示当前播放进度时间
        _this.videos.currPlayTime = getFormatTime(currTime);
      };
      //拖动播放监听
      progressBox.addEventListener('touchmove',function (event) {
        if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
        let touch = event.targetTouches[0];
        event.preventDefault(); //阻止触摸事件的默认行为，即阻止滚屏
        if(_this.full)  //全屏的时候
        {
          //计算拖动距离
          let distance = touch.pageY - this.offsetLeft - videoElWith;
          let progressBoxWith = progressBox.offsetWidth;
          if(distance > progressBoxWith || distance < 0)
          {
            return;
          }
          timerFuc();
          //计算百分比
          let proPre = distance / progressBoxWith;
          //显示进度条
          progress.style.width = (proPre * 100) + '%'; //蓝线进度
          proCircle.style.left = (proPre * 100) + '%'; //圆圈进度
          let duration = video.duration;
          //改变播放时间
          _this.videos.videoState = 2;
          video.currentTime = (distance / progressBoxWith) * duration;
        }else {
          //计算拖动距离
          let distance = touch.pageX - this.offsetLeft - videoElWith;
          let progressBoxWith = progressBox.offsetWidth;
          if(distance > progressBoxWith || distance < 0)
          {
            return;
          }
          timerFuc();
          //计算百分比
          let proPre = distance / progressBoxWith;
          //显示进度条
          progress.style.width = (proPre * 100) + '%'; //蓝线进度
          proCircle.style.left = (proPre * 100) + '%'; //圆圈进度
          let duration = video.duration;
          //改变播放时间
          _this.videos.videoState = 2;
          video.currentTime = (distance / progressBoxWith) * duration;
        }
      });
      //监听手机旋转
//      let evt = "onorientationchange" in window ? "orientationchange" : "resize";
//      function resize(fals) {
//        if(window.orientation == 0 || window.orientation == 180) {
//          Screen.style.transformOrigin = "center center";
//          Screen.style.transform = "rotate(90deg) translate("+((conH-conW)/2)+"px,"+((conH-conW)/2)+"px)";
//        }else if(window.orientation == 90 || window.orientation == 270)
//        {
//          Screen.style.transformOrigin = "center center";
//          Screen.style.transform = "rotate(0deg) ";
//          Screen.style.top = 0;
//          Screen.style.left = 0;
//        }
//      }
      let Screen = _this.$el.querySelector('.videoEl'); //最外边边框
      let container = document.getElementsByClassName('container')[0]
      let instruction = document.getElementsByClassName('instruction')[0]
      let cc = document.getElementsByClassName('mu-paper')[0]
      // let W = Screen.offsetWidth;  //视频的宽
      // let H = Screen.offsetHeight; //视频的高
      // 全屏按钮 ~~~~~~~

      if(expand){
        expand.addEventListener('click',this.fullScreen,false);
      }

//      progressBox.addEventListener('touchmove',function (event) {
//        if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
//        let touch = event.targetTouches[0].target;
//        event.preventDefault(); //阻止触摸事件的默认行为，即阻止滚屏
//        //计算拖动距离
//
//
//        timerFuc();
//
//        //计算百分比
//        let proPre = distance / progressBoxWith;
//
//        //显示进度条
//        progress.style.width = (proPre * 100) + '%'; //蓝线进度
//        proCircle.style.left = (proPre * 100) + '%'; //圆圈进度
//
//        let duration = video.duration;
//        //改变播放时间
//        video.currentTime = (distance / progressBoxWith) * duration;
//
//      });


      //点击跳跃播放
      progressBox.onclick = function (e) {
        let event = e || window.event;
        _this.videos.videoState = 2;
        video.currentTime = (event.offsetX / this.offsetWidth) * video.duration;
        timerFuc();
      };

      //计算播放时间
      function getFormatTime(time) {
        let h = parseInt(time/3600),
          m = parseInt(time%3600/60),
          s = parseInt(time%60);
        h = h < 10 ? "0"+h : h;
        m = m < 10 ? "0"+m : m;
        s = s < 10 ? "0"+s : s;
        return h == "00" ? m+":"+s : h+":"+m+":"+s;
      }
    },
    computed:{

    }
  }
  function fullScreen(){
    _this.full = !_this.full;
    if (window.plus) {
      console.log("DDD")
      if(_this.full) {
        plus.navigator.setFullscreen(true);
      } else {
        plus.navigator.setFullscreen(false);
      }
    }
    let conW = window.screen.width ;  //屏幕的宽
    // let conH = global.webFrom()=="WEIXIN" ? document.body.clientHeight : window.screen.height; //屏幕的高
    let conH = document.body.clientHeight;
    console.log("高1:"+document.body.clientHeight);
    console.log("高2:"+window.screen.height)
    console.log("高3:"+screen.height)
    if(_this.isVideo === "video") //视频列表
    {
      if(_this.full)  //全屏的时候
      {
        console.log(1);
        // video.style.height = 'auto';
        video.style.height = '100%';
        cc.style.display = "none";
        container.style.zIndex = "9999";
        container.style.overflow = "visible";
        Screen.style.width = conH + "px";
        Screen.style.height = conW + "px";
        Screen.style.transformOrigin = "center center";
        Screen.style.transform = "rotate(90deg) translate("+((conH-conW)/2)+"px,"+((conH-conW)/2)+"px)";
        Screen.style.top = 0;
        Screen.style.left = 0;
      }else {  //非全屏
        console.log(2);
        video.style.height = '56.533vw';
        // video.style.width = "100% !import";
        cc.style.display = "block";
        container.style.zIndex = "0";
        Screen.style.width = W + "px";
        Screen.style.height = "auto";
        Screen.style.transform = "rotate(0deg) translate(0,0)";
        container.style.overflow = "scroll";
      }
    }else {  //视频详情  商品详情
      if(_this.full)  //全屏的时候
      {
        console.log(3);
        // video.style.height = conH+"px";
        video.style.height = '100%';
        Screen.style.width = conH + "px";
        if(instruction) {
          instruction.style.zIndex = "9999";
          instruction.style.overflow = "visible";
        }
        Screen.style.height = conW + "px";

        Screen.style.transformOrigin = "center center";
        Screen.style.transform = "rotate(90deg) translate("+((conH-conW)/2)+"px,"+((conH-conW)/2)+"px)";
        Screen.style.top = 0;
        Screen.style.left = 0;
        // plus.navigator.setFullscreen(true);
      }else {  //非全屏
        console.log(4);
        video.style.height = '56.533vw';
        Screen.style.width = W + "px";
        Screen.style.height = "auto";
        video.style.width = "100% !import";
        Screen.style.transform = "rotate(0deg) translate(0,0)";
        // plus.navigator.setFullscreen(false);
      }
    }
//        if(_this.full)  //添加手机监听旋转事件
//        {
//          window.addEventListener(evt,resize,false);
//        }else {
//          window.removeEventListener(evt,resize);
//      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../../common/sass/factory";


    .videoBox{
      position: relative;
      background-color: black;
      z-index: 1;
    }
    .video-mask{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, .1);
      box-shadow:0 0 px2vw(140) black inset;
      -webkit-box-shadow:0 0 px2vw(140) black inset;
      -moz-box-shadow:0 0 px2vw(140) black inset;
      -o-box-shadow:0 0 px2vw(140) black inset;
      color: #fff;
    }
    .video-mask h2{
      margin: px2vw(29) 0 0 px2vw(19);
      line-height: px2vw(28);
      font-size: px2vw(30);
      font-weight: normal;
    }
    video{
      object-fit: contain;
    }
    .video{
      width: 100%;
    }
    .backgroundEl{
      position: relative;
      z-index: 1;
    }

    .playImgBox{
      display: inline-block;
      width: px2vw(21);
      height: px2vw(30);
    }
    .playImgBox img{
      width: 100%;
      height: 100%;
      margin-left: px2vw(20);
    }
    .progressBox{
      z-index: 999;
      width: 65%;
      height: 100%;
      position: relative;
    }
    .progress{
      display: inline-block;
      width: 100%;
      height: px2vw(2);
      background-color: white;
      position: absolute;
      top:50%;
    }
    .progressBlue{
      position: absolute;
      top:0;
      left:0;
      display: inline-block;
      width: 0;
      height: 100%;
      background-color: $themeColor;
    }
    .proCircle{
      display: inline-block;
      position: absolute;
      top:0;
      left: 0;
      width: px2vw(18);
      height: px2vw(18);
      border-radius: 50%;
      background-color: white;
      -webkit-transform: translate(0, -50%);
      transform: translate(0, -50%);

    }

    .allVideo{
      img {
        height: px2vw(24);
        // width: px2vw(20);
      }
    }

    .playCount{
      display: inline-block;
      width: px2vw(100);
    }

    .videoBox{
      transition: all 0.4s;
      line-height: 0;
      position: relative;
      width: 100%;
      height: px2vw(424);
    }
    // .video-image {
    //   text-align: center;
    // }
    .videoBox .vplay{
      position: absolute;
      width: px2vw(65);
      height: px2vw(65);
      z-index: 999;
      top: 50%;
      left: 50%;
      margin-left: px2vw(-32);margin-top: px2vw(-32);
      // -webkit-transform: translate(-50%, -50%);
      // transform: translate(-50%, -50%);
    }
    .videoBox .vplay2{
      position: absolute;
      width: px2vw(65);
      height: px2vw(65);
      z-index: 999;
      top: 50%;
      left: 50%;
      margin-left: px2vw(-32);margin-top: px2vw(-32);
      // -webkit-transform: translate(-50%, -50%);
      // transform: translate(-50%, -50%);
    }
    .videoBox .vplay3{
      position: absolute;
      width: px2vw(65);
      height: px2vw(65);
      z-index: 999;
      top: 50%;
      left: 50%;
      margin-left: px2vw(-32);margin-top: px2vw(-32);
      // -webkit-transform: translate(-50%, -50%);
      // transform: translate(-50%, -50%);
      animation:rotating 1.2s linear infinite;
    }
    .videoBox .controls{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: px2vw(60);
      // background-color: rgba(0,0,0,0.4);
      display: flex;
      display: -webkit-flex;
      font-size: px2vw(20);
      color: white;
      justify-content: space-between;
      align-items: center;
      z-index: 10;
      padding-left: px2vw(20);
      padding-right: px2vw(20);
    }

    .fullScreen{
      background-color: black;
      position: fixed;
      /*-ms-transform-origin:28% 49.8%;*/
      /*-o-transform-origin:28% 49.8%;*/
      /*-moz-transform-origin:28% 49.8%;*/
      /*-webkit-transform-origin:28% 49.8%;*/
      /*transform-origin:50% 50%;*/
      /*transform: rotate(90deg);*/
      z-index: 20000;
     /* top:21.88%;
      left:-39%;*/
    }
</style>
