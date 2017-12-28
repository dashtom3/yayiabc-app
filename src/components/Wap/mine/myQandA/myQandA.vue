<template>
  <div>
    <div class="header">
      <span class="back-click-area" @click="goBack"></span>
      <div class="headerTitle">我的问答</div>
    </div>
    <div class="firstClassifyName">
      <span @click="changeClass(0)" :class="{isCheckDiv:caseClassNum === 0}">我的提问</span>
      <span @click="changeClass(1)" :class="{isCheckDiv:caseClassNum === 1}">我的回答</span>
    </div>
    <div class="searchRes">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data(){
      return{
        caseClassNum : 0,
        a : this.$route.fullPath,
        b : this.$route.fullPath
      }
    },
    methods:{
      changeClass(index){
        this.caseClassNum = index;
        console.log(this.$route)
        if(index === 0)
        {
          this.$router.push({path:'/myQandA/myQuestion'});
        }else if(index === 1)
        {
          this.$router.push({path:'/myQandA/myAnswer'});
        }
      },
      goBack(){
        this.$router.push('/yayi/mine');
        this.$destroy()
      }
    },
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
    font-size: px2vw(34);
    .back-click-area {
      position: absolute;
      top: 0;
      height: 100%;
      left: 0;
      width: px2vw(150);
      background: url("../../../../images/logIn/back3.png") px2vw(20) center no-repeat;
      background-size: px2vw(18) px2vw(29);
    }
  }
  .firstClassifyName{
    margin: px2vw(88) auto 0;
    height: px2vw(90);
    display: flex;
    padding: 0 px2vw(215);
    justify-content: space-between;
    line-height: px2vw(90);
    border-bottom: px2vw(1) solid #e5e5e5;
    width: 100%;
    span{
      width: px2vw(128);
      height: px2vw(90);
      line-height: px2vw(86);
      font-size: px2vw(30);
      color: #999;
      text-align: center;
    }
    .isCheckDiv{
      color: $themeColor;
      border-bottom: 3px solid $themeColor;
    }
  }
  .searchRes{
    position: fixed;
    top: px2vw(178);
    bottom: 0;
    overflow: scroll;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    z-index: -1;
  }
</style>
