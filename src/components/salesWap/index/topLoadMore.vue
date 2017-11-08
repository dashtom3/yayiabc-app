<template>
  <div class="mint-loadmore-top wrap" :class="{'myCre-load':loading && text == 'loading'}">
    <img src='../../../images/saleman/topPullImg.png' alt="" v-if="pullImg" class="upDown">
    <img src='../../../images/saleman/topDropImg.png' alt="" v-if="dropImg" class="upDown">
    <img src='../../../images/index/loading.gif' alt="" v-if="loadingImg" id="loadingImg">
    <div class="text">{{ text }}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'topLoadMore',
    props:{
      //判断数据是否加载完成的布尔值
      loading:{
        type:Boolean,
        default: false
      },
      //数据加载完成后的回调
      loaded:{
        type:Function,
      }
    },
    data(){
      return{
        pullText: '下拉刷新',
        dropText: '释放更新',
        loadingText: '加载中...',
        pullImg: true,
        dropImg: false,
        loadingImg: false,
        text:'',
      }
    },
    methods:{
      states(val){
        switch (val) {
          case 'pull':
            this.text = this.pullText;
            this.pullImg = true;
            this.dropImg = false;
            this.loadingImg = false;
            break;
          case 'drop':
            this.text = this.dropText;
            this.pullImg = false;
            this.dropImg = true;
            this.loadingImg = false;
            break;
          case 'loading':
            this.text = this.loadingText;
            this.pullImg = false;
            this.dropImg = false;
            this.loadingImg = true;
            break;
        }
      }
    },
    watch:{
      loading:{
        handler:function (val) {
          if(!val){
            this.loaded();
          }
        }
      }
    },
    created(){
      this.text = this.pullText;
      this.pullImg = true;
      this.dropImg = false;
      this.loadingImg = false;
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .myCre-load{
    margin-top:0;
  }
</style>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .upDown{
    margin-top: px2vw(30);
    height: px2vw(30);
  }
  .text{
    display: inline-block;
    height: 100%;
    font-size: px2vw(24);
    text-align: center;
    line-height: 50px;
    vertical-align: top;
    color: #999;
  }
  #loadingImg{
    height: px2vw(80);
  }
</style>
