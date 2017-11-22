<template>
    <div>
      <div class="caseBox">
        <div class="userBox addChange1">
          <div class="userPicture">
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
      </div>


      <div class="spaceImgBox">
        <img class="spaceImg" src="../../../../images/case/myCase/caogao.png" alt="">
        <div class="spaceSize">还没有草稿</div>
        <div class="spaceColor">(未发布的病例会存储在这里)</div>
      </div>


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
      width: px2vw(98);
      height: px2vw(97);
    }
    .spaceSize{
      color: #666666;
    }
    .spaceImgBox .spaceColor{
      color: #666666;
      font-size: px2vw(24);
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

</style>

