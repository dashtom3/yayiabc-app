<template>
    <div>
      <!--头部开始-->
      <div class="titleWrap">
        资料详情

        <!--左上角 返回按钮-->
        <div class="back">
          <img src="../../../../images/mine/colloct/back.png" alt="img">
        </div>

        <!--右上角收藏 分享收藏按钮-->
        <div class="collectBox">
          <span class="starBox">
            <img class="starImg" src="../../../../images/mine/colloct/star.png" alt="img">
          </span>
          <span class="enjoyBox">
            <img class="enjoyImg" src="../../../../images/mine/colloct/enjoy.png" alt="img">
          </span>
        </div>

      </div>
      <!--头部结束-->

      <div class="container">
        <!--标题-->
        <div class="headLine">
           这是回答标题. 这是病例 这是病例标题
        </div>
        <div class="classBox">
          <span>口腔外科</span>
          <span>12人阅读</span>
        </div>

        <!--资料内容开始-->
        <div class="contentWrap">
          这是内容
        </div>
        <!--资料内容结束-->

      </div>






      <!--末尾-->
    </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../../common/sass/factory";

  .titleWrap{
    position: fixed;
    height: px2vw(88);
    background-color: $themeColor;
    width: 100vw;
    text-align: center;
    line-height: px2vw(88);
    color: white;
    font-size: px2vw(36);
  }
  .back{
    position: absolute;
    top:0;
    left: 0;
    height: px2vw(88);
    padding-top: px2vw(6);
    padding-left: px2vw(20);
    padding-right: px2vw(26);
  }
  .back>img{
    width: px2vw(21);
    height: px2vw(36);
  }
  .collectBox{
    position: absolute;
    right: 0;
    top:0;
  }
  .starImg{
    width: px2vw(40);
    height: px2vw(38);
  }
  .enjoyImg{
    width: px2vw(34);
    height: px2vw(36);
  }
  .starBox{
    display: inline-block;
    height: px2vw(88);
    padding-top: px2vw(8);
    padding-left: px2vw(25);
    padding-right: px2vw(16);
  }
  .enjoyBox{
    padding-top: px2vw(8);
    padding-left: px2vw(16);
    padding-right: px2vw(20);
    display: inline-block;
    height: px2vw(88);
  }
  .container{
    position: absolute;
    top:px2vw(88);
    left: 0;
    width: 100vw;
    padding-left:  px2vw(22);
    padding-right:  px2vw(22);
    padding-top:  px2vw(35);
  }
  .headLine{
    font-size: px2vw(36);
    color: #333333;
  }
  .classBox{
    margin-top: px2vw(24);
  }
  .classBox span:nth-child(1){
    border: px2vw(1) solid $themeColor;
    font-size: px2vw(22);
    padding: px2vw(4);
    color: $themeColor;
    border-radius: px2vw(8);
    vertical-align: middle;
  }
  .classBox span:nth-child(2){
    vertical-align: middle;
    font-size: px2vw(24);
    color: #999999;
    margin-left: px2vw(20);
  }
  .contentWrap{
    margin-top: px2vw(50);
  }
</style>

