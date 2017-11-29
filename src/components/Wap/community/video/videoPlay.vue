<template>
    <div >

      <!--视频区域开始-->
      <div  class="fullScreen videoBox videoEl" >
        <!--<video poster="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1510884409&di=1217e09e096bb11a78d1b585ff9b7b70&src=http://pic.baike.soso.com/p/20140619/20140619113120-670398887.jpg" webkit-playsinline="true" playsinline="true" class="video">-->

          <!--<slot name="sourceSrc"></slot>-->

          <!--<p>设备不支持</p>-->
        <!--</video>-->

        <slot name="video">
          <slot name="sourceSrc"></slot>
          <p>设备不支持</p>
        </slot>


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
            <span @click="allScreen" class="allVideo">
              全屏
            </span>
          </div>
        </transition>
        <!--视频控制条结束-->
      </div>
      <!--视频区域结束-->


    </div>
</template>

<script>
  export default {
    props:{

    },
    data(){
      return{
        videoId: 22, //获取的视频ID
        videos:{
          centerPlayImg: true, //中间的播放按钮
          allTime: '00:00:00', //总时长
          currPlayTime: '00:00:00', //当前播放时间
          controlShow: false,  //显示视频下部控件开关
          fullScreen: false,  //全屏
        },
      }
    },
    created(){

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
      let videoElWith = this.$el.querySelector('.videoEl').offsetLeft; //最外边边框宽度




//      let backgroundEl = this.$el.querySelector('.backgroundEl'); //封面背景
//      console.log(video.getAttribute("posterSrc"));
//      let poster = video.getAttribute("posterSrc");
//      backgroundEl.style.backgroundImage="url("+ poster + ")"; //设置封面
//      backgroundEl.style.backgroundSize="100% 100%"; //设置封面







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
        video.currentTime = (distance / progressBoxWith) * duration;

      });


      expand.addEventListener('click',function () {

      },false);




//      progressBox.addEventListener('touchmove',function (event) {
//        if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
//        let touch = event.targetTouches[0].target;
//
//        event.preventDefault(); //阻止触摸事件的默认行为，即阻止滚屏
//
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
        return h+":"+m+":"+s;
      }
    },
    computed:{

    },
    methods:{
      allScreen(){

        if(this.fullScreen)  //全屏
        {
          this.$emit('full', this.fullScreen);
        }else {//半屏
          this.$emit('full', this.fullScreen);
        }

      }

    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../../common/sass/factory";


    video{
      /*object-fit: contain;*/
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
      width: 30%;
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
      margin-right: px2vw(20);
    }
    .playCount{
      display: inline-block;
      width: px2vw(100);
    }

    .videoBox{
      line-height: 0;
      position: relative;
      width: 100%;
      height: auto;
      border: 1px solid gray;
    }
    .videoBox .vplay{
      position: absolute;
      width: 15%;
      z-index: 999;
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
      z-index: 10;
    }

    /*.fullScreen{
      position: fixed;
      -ms-transform-origin:28% 49.8%;
      -o-transform-origin:28% 49.8%;
      -moz-transform-origin:28% 49.8%;
      -webkit-transform-origin:28% 49.8%;
      transform-origin:50% 50%;
      transform: rotate(90deg);
      width: 102vh ;
      height: 102vw ;
      z-index: 20000;
      transition: all 0.4s;
      top:22%;
      left:-38%;
    }  */


</style>

