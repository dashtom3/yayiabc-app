<template>
  <div>
    <div class="header">
      <span class="back-click-area" @click="goBack"></span>
      <div class="headerTitle">我的收藏</div>
    </div>
    <div class="router">
      <span v-for="(value,key) in routerClassify" @click="changeClass(key)" :class="{'changeClass': key === routerNum}">{{value}}</span>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data(){
      return{
        routerClassify:['商品','病例','视频','问答','资料'],
        routerNum:0,
      }
    },
    methods:{
      goBack(){
        this.$router.push({path:'/yayi/mine'})
      },
      changeClass(index){
        this.routerNum = index;
        switch (true){
          case index === 0:
            this.$router.push({path:'/collect/goodCollect',query:{collectType:index}});
            break;
          case index === 1:
            this.$router.push({path:'/collect/caseOfIllnessCollect',query:{collectType:index}});
            break;
          case index === 2:
            this.$router.push({path:'/collect/videocollect',query:{collectType:index}});
            break;
          case index === 3:
//            this.$router.push({path:'/collect/goodCollect',query:{collectType:index}});
            break;
          case index === 4:
            this.$router.push({path:'/collect/datumcollect',query:{collectType:index}});
            break;
        }
      }
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
  }
  .router{
    width: 100%;
    position: fixed;
    top:px2vw(88);
    left: 0;
    height: px2vw(90);
    display: flex;
    justify-content: space-between;
    padding: 0 px2vw(100);
    border-bottom: 1px solid #e5e5e5;
    span{
      font-size: px2vw(30);
      width: px2vw(90);
      text-align: center;
      color: #999;
      line-height: px2vw(90);
    }
    .changeClass{
      color: $themeColor;
      border-bottom: 3px solid $themeColor;
    }
  }
  .container{
    position: fixed;
    top: px2vw(178);
    bottom: 0;
    overflow: scroll;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    z-index: -1;
  }
</style>
