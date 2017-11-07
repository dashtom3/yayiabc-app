<template>
  <div class="header">
    <div class="backIco">返回</div>
    <div class="saveAndRelease">
      <div class="release">发布</div>
      <div class="save">保存</div>
      <div class="clr"></div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">

</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

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
    .backIco{
      float: left;
      width: px2vw(150);
      display: inline-block;
    }
    .saveAndRelease{
      .save{
        float: right;
        display: inline-block;
        width: px2vw(100);
      }
      .release{
        float: right;
        display: inline-block;
        width: px2vw(100);
      }
    }
  }
</style>
