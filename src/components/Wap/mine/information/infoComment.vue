<template>
  <div>
    <div class="header">
      <span class="back-click-area" @click="goBack"></span>
      评论详情
    </div>
    <div class="container">
      <div class="headImg">
        <div>
          <img src="../../../../images/mine/defaultHead.png" alt="">
        </div>
      </div>
      <div class="innerContainer">
        <div class="user">
          用户名
        </div>
        <div class="comment">
          评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容
        </div>
        <div class="reComment">
          <div class="reCommentContainer">
<span>

</span>
            <span>
{{text}}
</span>
          </div>
          <div :class="{isComment:text.length > 0,noComment:text.length == 0}">
            标题标题标题标题标题标题标题标题标题标题标题
          </div>
        </div>
        <div class="time">
          时间
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        text: ''
      }
    },
    created(){
      this.mBack("goBack")
    },
    methods: {
      goBack() {
        this.$router.go(-1);
        this.$destroy()
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
    font-size: px2vw(32);
    .back-click-area {
      position: absolute;
      top: 0;
      height: 100%;
      left: 0;
      width: px2vw(150);
      background: url("../../../../images/logIn/back.png") px2vw(20) center no-repeat;
      background-size: px2vw(18) px2vw(29);
    }
  }

  .container {
    color: #333;
    width: 100%;
    position: fixed;
    top: px2vw(90);
    left: 0;
    .headImg {
      width: px2vw(130);
      float: left;
      text-align: center;
      div {
        display: inline-block;
        width: px2vw(90);
        height: px2vw(90);
        border-radius: 50%;
        overflow: hidden;
        margin: px2vw(40) auto 0;
        img {
          width: 100%;
        }
      }

    }
    .innerContainer {
      float: right;
      width: px2vw(620);
      padding-right: px2vw(20);
      .user {
        margin-top: px2vw(15);
        font-size: px2vw(30);
        color: $themeColor;
        line-height: px2vw(120);
      }
      .comment {
        font-size: px2vw(30);
        margin-bottom: px2vw(30);
      }
      .reComment {
        padding: px2vw(10) px2vw(10) px2vw(30);
        width: 100%;
        background-color: #f6f6f6;
        .reCommentContainer {
          padding: px2vw(20) px2vw(20) 0;
          font-size: px2vw(28);
          span:nth-child(1) {
            /*加粗*/
          }
          span:nth-child(2) {

          }
        }
        .isComment {
          margin: px2vw(5) px2vw(5) 0;
          padding: px2vw(15);
          background-color: #fff;
          font-size: px2vw(26);
          color: #333;
        }
        .noComment {
          padding: 0 px2vw(20) 0;
          font-size: px2vw(28);
        }
      }
      .time {
        height: px2vw(80);
        line-height: px2vw(80);
        color: #999;
        font-size: px2vw(24);
      }
    }
  }
</style>
