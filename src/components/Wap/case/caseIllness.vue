<template>
    <div>
      <div class="wrapBCG"></div>
      <div class="headerBox">
        <!--搜索按钮开始-->
        <span class="searchImgBox">
          <img src="../../../images/case/caseOfIllness/search.png" alt="img">
        </span>
        <!--搜索按钮结束-->

        <!--分类功能开始-->
        <div class="classBox">
          <span v-for="(item, index) in caseDate.caseClass" @click="changeClass(index)" :class="{'changeClass': index === caseDate.caseClassNum}">{{item}}</span>
        </div>
        <!--分类功能结束-->

        <!--提示铃开始-->
        <span class="tsImgBox">
          <span class="numBox">
            <span class="tsNum">5</span>
          </span>
          <img src="../../../images/case/caseOfIllness/tishi.png" alt="">
        </span>
        <!--提示铃结束-->
      </div>
      <!--头部结束-->


      <!--内容开始-->
      <div class="container">
        <router-view></router-view>
      </div>
      <!--内容结束-->

    </div>
</template>

<script>
  export default {
    data (){
      return{
        caseDate: {
          caseClass: ['病例', '视频', '培训'],
          caseClassNum: 0,
        }
      }
    },
    methods: {
      // 病例 视频 培训分类
      changeClass (index){
        this.caseDate.caseClassNum = index;
        if(index === 0)
        {
          this.$router.push({path:'/caseOfIllness'});
        }else if(index === 1)
        {
          this.$router.push({path:'/video'});
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .container{
    position: fixed;
    z-index: -1;
    top: px2vw(208);
    bottom: 0;
    overflow: scroll;
    width: 100%;
    -webkit-overflow-scrolling: touch;
  }

  .DressingColor{
    color: #3676b6;
  }

  .tsNum{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -48%);
  }
  .numBox{
    position: absolute;
    top:px2vw(10);
    left: px2vw(32);
    text-align: center;
    font-size: px2vw(32);
    color: #ffffff;
    border-radius: 50%;
    background-color: red;
    width: px2vw(40);
    height: px2vw(40);
    transform:scale(0.66,0.66);
    -ms-transform:scale(0.66,0.66); 	/* IE 9 */
    -moz-transform:scale(0.66,0.66); 	/* Firefox */
    -webkit-transform:scale(0.66,0.66); /* Safari 和 Chrome */
    -o-transform:scale(0.66,0.66);
  }
  .tsImgBox{
    position: relative;
    display: inline-block;
    height:px2vw(88);
    padding-right: px2vw(33);
    padding-left: px2vw(20);
    vertical-align: top;
    float: right;
    img{
      width: px2vw(31);
      height: px2vw(40);
      margin-top: px2vw(26);
    }
  }
  .classBox{
    display: inline-block;
    height: px2vw(88);
    font-size: px2vw(36);
    color: #cccccc;
    vertical-align: top;
    margin-left: px2vw(90);
  }
  .classBox span{
    display: inline-block;
    height: px2vw(88);
    padding-top: px2vw(22);
    width: px2vw(100);
    text-align: center;
  }
  .changeClass{
    border-bottom: 2px solid #ffffff;
    color: #ffffff;
  }
  .classBox span:nth-child(n+2){
    margin-left: px2vw(30);
  }
  .searchImgBox{
    display: inline-block;
    height: px2vw(88);
    padding-left: px2vw(20);
    padding-right: px2vw(20);
    img{
      margin-top: px2vw(24);
      width: px2vw(40);
      height: px2vw(41);
    }
  }
  .headerBox {
    position: fixed;
    top:0;
    width: 100vw;
    height: px2vw(88);
    background-color: $themeColor;
  }
  .wrapBCG{
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background-color: #f4f4f4;
  }

</style>

