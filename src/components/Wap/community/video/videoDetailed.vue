<template>
    <div>
      <div class="backgroundImg"></div>
      <div class="wrapTop">
        <span class="title">视频详情</span>
        <span class="backImgBox">
        <img src="../../../../images/case/backer.png" alt="">
      </span>
      </div>


      <div class="container">


        <!--视频区域开始-->
        <div class="videoBox">
          <video webkit-playsinline="true" playsinline="true" class="video">
            <source src='./test.mp4' type="video/mp4"></source>
            <p>设备不支持</p>
           </video>
           <img v-show="videos.centerPlayImg" class="vplay" src="../../../../images/video/play.png"/>



          <transition name="fade">
          <!--视频控制条开始-->
          <div v-show="videos.controlShow" class="controls">
            <span class="playImgBox">
              <img src="../../../../images/video/playRight.png" alt="">
            </span>
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
            <span class="playCount">
              2.6万播放
            </span>
            <span  class="allVideo">
              全屏
            </span>
          </div>
          </transition>
          <!--视频控制条结束-->
        </div>
        <!--视频区域结束-->

        <!--标题内容开始-->
        <div class="titleBox">
          这是标题这是标题这是标题这是标题这是标题
          这是标题这是标题这是标题这是标题这是标题
        </div>
        <!--标题内容结束-->

        <!--相关产品开始-->
        <div class="productBox">
          <div class="productTitle">相关产品</div>
          <div class="productContent">
            <!--左-->
            <span class="productImgBox">
              <img src="" alt="">
            </span>
            <!--右-->
            <div class="productNameBox">
              <div class="productName">
                麦迪康/MEDICOM普通一()抗敏感/麦迪康
              </div>
              <div class="classBox">
                <span>上海到帮</span>
                <span>销量:254</span>
              </div>
              <div class="productPrice">
                ¥&nbsp;20
              </div>
            </div>
          </div>
        </div>
        <!--相关产品结束-->


      </div>


      <!--结尾-->
    </div>
</template>

<script>
  export default {
    data(){
      return{

        videoId: 22, //获取的视频ID

        videos:{
          centerPlayImg: true, //中间的播放按钮
          allTime: '00:00:00', //总时长
          currPlayTime: '00:00:00', //当前播放时间
          controlShow: false,  //显示视频下部控件开关
        },
      }
    },
    created(){
      this.getVideos();
    },
    mounted(){
      let timer ;
      let _this = this;
      //当视频可播放的时候
      let controls = this.$el.querySelector('.controls'); //控件的最高级父级节点
      let video = this.$el.querySelector('.video');
      let progress = this.$el.querySelector('.progressBlue'); //进度条
      let proCircle = this.$el.querySelector('.proCircle'); //进度条 圆
      let progressBox = this.$el.querySelector('.progressBox'); //进度条父级BOX
      let expand = this.$el.querySelector('.allVideo'); //全屏按钮
      let playImgBox = this.$el.querySelector('.playImgBox'); //控件左下角的播放按钮
      let vplay = this.$el.querySelector('.vplay'); //中间的播放按钮

      video.controls=false; //隐藏原有控件


      //控件左下角的播放按钮
      playImgBox.addEventListener('click',function () {
        if(video.paused) {
          video.play();
          _this.videos.controlShow = true;
          _this.videos.centerPlayImg = false;
          timerFuc();
        } else {
          video.pause();
          _this.videos.centerPlayImg = true;
          timerFuc();
        }
      },false);

      //中间的播放按钮
      vplay.addEventListener('click',function () {
        video.play();
        _this.videos.controlShow = true;
        _this.videos.centerPlayImg = false;
        timerFuc();
      },false);

      video.addEventListener('click', function () {
        _this.videos.controlShow = !_this.videos.controlShow;
        if(_this.videos.controlShow)
        {
          timerFuc();
        }
      },false);

      //计时隐藏控制条
      function timerFuc() {
        window.clearTimeout(timer);
        timer = window.setTimeout(function () {
          console.log(1);
          _this.videos.controlShow = false;
        },4500)
      }

      video.oncanplay = function(){
        //显示视频总时长
        let time = video.duration;
        _this.videos.allTime =  getFormatTime(time);
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

        //计算拖动距离
        let distance = touch.pageX - this.offsetLeft;

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
        video.currentTime = (distance / progressBoxWith) * duration;

      });


      //点击跳跃播放
      progressBox.touchstart = function (e) {
        let event = e || window.event;
        video.currentTime = (event.offsetX / this.offsetWidth) * video.duration;

      };
      progressBox.onclick = function (e) {
        let event = e || window.event;
        video.currentTime = (event.offsetX / this.offsetWidth) * video.duration;
      };

      expand.onclick = function(){
        video.webkitRequestFullScreen();
      };

      //计算播放时间
      function getFormatTime(time) {
        let h = parseInt(time/3600),
          m = parseInt(time%3600/60),
          s = parseInt(time%60);
        h = h < 10 ? "0"+h : h;
        m = m < 10 ? "0"+m : m;
        s = s < 10 ? "0"+s : s;
        return h+":"+m+":"+s;
      }
    },
    computed:{

    },
    methods:{
      //获取视频
      getVideos (){
        this.$store.dispatch('GET_PLAY_VIDEOS', {viId: this.videoId}).then( (res)=>{
          console.log(res);
        });
      }
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../../common/sass/factory";

    .video{
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .videoBox{
      line-height: 0;
      position: relative;
      width: 100vw;
      height: auto;
      border: 1px solid gray;
      overflow: hidden;
    }
    .videoBox .vplay{
      position: absolute;
      width: 15%;
      z-index: 100;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
    .videoBox .controls{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: px2vw(50);
      background-color: rgba(0,0,0,0.4);
      display: flex;
      display: -webkit-flex;
      font-size: px2vw(20);
      color: white;
      justify-content: space-between;
      align-items: center;
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
      width: px2vw(250);
      height: 100%;
      position: relative;
    }
    .progress{
      display: inline-block;
      width: px2vw(250);
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
      margin-right: px2vw(20);
    }
    .playCount{
      display: inline-block;
      width: px2vw(100);
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
      z-index: 999;
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
    display: inline-block;
    width: px2vw(467);
    vertical-align: middle;
    margin-left: px2vw(30);
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
</style>

