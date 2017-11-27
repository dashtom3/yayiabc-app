<template>
    <div>

      <!--背景颜色-->
      <div class="background"></div>
      <!--背景颜色-->

      <!--暂无内容图片 样式开始-->
      <div class="noneDatum">
        <div class="imgNull">
          <img src="../../../../images/mine/colloct/noneData.png" alt="">
        </div>
        <div class="none">暂无内容</div>
      </div>
      <!--暂无内容图片 样式结束-->


      <div class="container">
        <!--这里 v-for -->
        <div class="listWrap">
          <div class="listTitle">
            这是病例标题这是病例标题
          </div>

          <div class="listContent">
            这是问题答案, 这是问题答案, 这是问题答案, 这是问题答案, 这是问题答案
          </div>


          <div class="listClassBox">
            <span>口腔外科</span>
            <span>22人阅读</span>
          </div>

        </div>
      </div>





      <!--末尾-->
    </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../../common/sass/factory";
  .none{
    font-size: px2vw(30);
    color: #666666;
  }
  .noneDatum{
    position: fixed;
    top: px2vw(560);
    left: 0;
    width: 100vw;
    text-align: center;
  }
  .imgNull img{
    width: px2vw(108);
    height: px2vw(147);
  }
  .container{
    padding: 0 px2vw(20);
  }
  .listWrap{
    border-bottom: 1px solid #e5e5e5;
    color: #333333;
  }
  .listTitle{
    font-size: px2vw(36);
    height: px2vw(95);
    line-height: px2vw(95);
  }
  .listContent{
    font-size: px2vw(30);
  }
  .listClassBox{
    margin-top: px2vw(25) ;
    margin-bottom: px2vw(25);
  }
  .listClassBox span:nth-child(1){
    display: inline-block;
    color: $themeColor;
    border: 1px solid $themeColor;
    border-radius: px2vw(8);
    padding:0 px2vw(4);
  }
  .listClassBox span:nth-child(2){
    float: right;
    color: #999999;
  }
</style>

