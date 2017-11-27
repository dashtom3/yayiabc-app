<template>
  <div>
    <div class="header">
      <span class="back-click-area" @click="goBack"></span>
      <span class="share"></span>
      <span class="collect"></span>
    </div>
    <div class="container">
      <div class="eachContainer">
        <div class="headLine">
          <div class="headImg">
            <img src="../../../../images/mine/defaultHead.png" alt="">
          </div>
          <div class="name">
            王林娟
          </div>
          <div class="time">1分钟前</div>
        </div>
        <div class="title">
          标题
        </div>
        <div class="answer" :class="{overWord:isDisplayOrFold}">
          回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答
        </div>
        <div v-html="isDisplayOrFold?'全文':'收起'" @click="displayOrFold" class="isDisplayOrFold"></div>
        <div class="images">

        </div>
        <div class="other">
          <span class="classify">口内</span>
          <span class="num"><span>4</span>评论</span>
          <span class="clr"></span>
        </div>
      </div>
      <div class="answerList">
        <div class="eachAnswer">
          <div class="headLine">
            <div class="headImg">
              <img src="../../../../images/mine/defaultHead.png" alt="">
            </div>
            <div class="name">
              王林娟
            </div>
            <div class="time">1分钟前</div>
          </div>
          <div class="answer">
            回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data(){
      return{
        isDisplayOrFold:true,
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1);
        this.$destroy()
      },
      displayOrFold(){
        this.isDisplayOrFold = !this.isDisplayOrFold
      },
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: px2vw(88);
    z-index: 999;
    line-height: px2vw(88);
    text-align: center;
    background-color: $themeColor;
    color: #fff;
    font-size: px2vw(36);
    .back-click-area {
      position: absolute;
      top: 0;
      height: 100%;
      left: 0;
      width: px2vw(150);
      background: url("../../../../images/logIn/back.png") px2vw(20) center no-repeat;
      background-size: px2vw(18) px2vw(29);
    }
    .share {
      position: absolute;
      top: 0;
      height: 100%;
      right: 0;
      width: px2vw(80);
      background: url("../../../../images/mine/share.png") px2vw(20) center no-repeat;
      background-size: px2vw(34) px2vw(36);
    }
    .collect {
      position: absolute;
      top: 0;
      height: 100%;
      right: px2vw(80);
      width: px2vw(80);
      background: url("../../../../images/mine/star.png") px2vw(20) center no-repeat;
      background-size: px2vw(40) px2vw(38);
    }
  }
  .container{
    position: fixed;
    top: px2vw(88);
    bottom: 0;
    overflow: scroll;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    .eachContainer{
      padding: px2vw(20) px2vw(20) 0;
      width: 100%;
      border-bottom: px2vw(20) solid #f4f4f4;
      .headLine{
        width: 100%;
        height: px2vw(120);
        float: left;
        .headImg{
          display: inline-block;
          width: px2vw(60);
          height: px2vw(60);
          border-radius: 50%;
          overflow: hidden;
          vertical-align: middle;
          img{
            width: 100%;
            line-height: px2vw(60);
          }
        }
        .name{
          line-height: px2vw(120);
          display: inline-block;
          font-size: px2vw(26);
          color: #333;
          font-weight: bold;
          margin-left: px2vw(10);
        }
        .time{
          line-height: px2vw(120);
          display: inline-block;
          font-size: px2vw(24);
          color: #999;
          margin-left: px2vw(10);
        }
      }
      .title{
        width: 100%;
        font-size: px2vw(30);
        color: #333;
        margin-bottom: px2vw(20);
        font-weight: bold;
      }
      .answer{
        width: 100%;
        font-size: px2vw(28);
        color: #333;
        margin-bottom: px2vw(20);
      }
      .isDisplayOrFold{
        color: $themeColor;
        font-size: px2vw(28);
        line-height: px2vw(30);
        height: px2vw(60);
      }
      .overWord{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .other{
        padding-bottom: px2vw(30);
        height: px2vw(70);
        .classify{
          font-size: px2vw(22);
          border: 1px solid $themeColor;
          color: $themeColor;
          border-radius: px2vw(5);
          float: left;
        }
        .num{
          float: right;
          font-size: px2vw(24);
          color: #999;
          span{
            color: $themeColor;
          }
        }
        .clr{
          clear: both;
        }
      }
    }
    .eachAnswer{
      padding: px2vw(20) px2vw(20) 0;
      width: 100%;
      border-bottom: 1px solid #e5e5e5;
      .headLine{
        width: 100%;
        height: px2vw(120);
        float: left;
        .headImg{
          display: inline-block;
          width: px2vw(60);
          height: px2vw(60);
          border-radius: 50%;
          overflow: hidden;
          vertical-align: middle;
          img{
            width: 100%;
            line-height: px2vw(60);
          }
        }
        .name{
          font-weight: bold;
          line-height: px2vw(120);
          display: inline-block;
          font-size: px2vw(26);
          color: #333;
          margin-left: px2vw(10);
        }
        .time{
          line-height: px2vw(120);
          display: inline-block;
          font-size: px2vw(24);
          color: #999;
          margin-left: px2vw(10);
        }
      }
      .answer{
        width: 100%;
        font-size: px2vw(28);
        color: #333;
        margin-bottom: px2vw(20);
      }
    }
  }

</style>
