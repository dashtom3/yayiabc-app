<template>
  <div class="mint-loadmore-bottom wrap" :class="{'myCre-load2':loading && text == 'loading'}">
    <img src='../../../images/index/loading.gif' alt="" id="loadingImg">
    <div class="text">{{ text }}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return{
        pullText: '上拉加载',
        dropText: '释放刷新',
        loadingText: '加载中...',
      }
    },
    name:'bottomLoadMore',
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
    methods:{
      states(val){
        switch (val) {
          case 'pull':
            this.text = this.pullText;
            break;
          case 'drop':
            this.text = this.dropText;
            break;
          case 'loading':
            this.text = this.loadingText;
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
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .myCre-load2{
    margin-bottom:0;
  }
</style>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .wrap{
    z-index: 15;
    background-color: #f4f4f4;
  }
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
