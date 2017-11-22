<template>
    <div>

      <div class="caseBox">
        <div class="userBox addChange1" >
          <div class="userPicture">
            <img src="../../../../images/mine/zhifubao.png" alt="">
            <span class="userName">作者</span>
            <span class="userName userTime">5分钟前</span>
          </div>
          <div class="caseContent">
            标题
          </div>
        </div>
        <div  class="userImgBox addChange2">
          <img src="../../../../images/mine/topBackGround.png" alt="">
        </div>

        <div class="readeBox">
          <span class="readeClass">分类</span>
          <span class="readeNum">20 阅读</span>
          <span class="readeNum2">· 20评论</span>
          <span class="readeNum2">· 20赞</span>
          <span class="coin"> 20乾币</span>
        </div>
      </div>




      <div class="spaceImgBox">
        <img class="spaceImg" src="../../../../images/case/myCase/goumai.png" alt="">
        <div class="spaceSize">还没有购买病例</div>
        <div class="spaceColor">发现更多病例</div>
      </div>

      <!--末尾-->
    </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../../common/sass/factory";

    .spaceImgBox{
      position: fixed;
      top:44%;
      text-align: center;
      width: 100vw;
    }
    .spaceImg{
      width: px2vw(108);
      height: px2vw(147);
    }
    .spaceSize{
      color: #666666;
    }
    .spaceColor{
      color: $themeColor;
    }
    .caseBox{
      background-color: #ffffff;
      border-bottom: 1px solid #f4f4f4;
      padding: px2vw(36) px2vw(17) px2vw(35) px2vw(17);
    }
    /* 有图添加样式 */
    .addChange2{
      display: inline-block !important;
      float: right;
      margin-top: px2vw(10);

    }
    .addChange1{
      display: inline-block !important;
      width: px2vw(508) !important;
    }
    /* 有图添加样式 */

    .userPicture img{
      vertical-align: middle;
      width: px2vw(56);
      height: px2vw(56);
      border-radius: 50%;
    }
    .userName{
      margin-left: px2vw(20);
      font-size: px2vw(26);
      vertical-align: middle;
    }
    .userName.userTime{
      font-size: px2vw(24);
      color: #999999;
    }
    .caseContent{
      min-height: px2vw(100);
      margin-top: px2vw(24);
      font-size: px2vw(36);
    }
    .userImgBox>img{
      width: px2vw(160);
      height: px2vw(160);
      border-radius: px2vw(10);
    }
    .readeBox{
      margin-top: px2vw(28);
    }
    .readeClass{
      width: px2vw(98);
      height: px2vw(26);
      border: 1px solid #3676b6;
      text-align: center;
      color: #3676b6;
      line-height: 0;
      padding-bottom: px2vw(2);
      border-radius: px2vw(8);
    }
    .readeNum{
      margin-left: px2vw(18);
      color: #999999;
    }
    .readeNum2{
      margin-left: px2vw(8);
      color: #999999;
    }
    .coin{
      float: right;
      font-size: px2vw(24);
      color: #d81e06;
    }
</style>

