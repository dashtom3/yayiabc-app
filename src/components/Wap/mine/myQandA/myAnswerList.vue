<template>
  <div class="container">
    <mt-loadmore :top-method="loadMore" :auto-fill=false ref="loadmore"  v-on:top-status-change="isState">
      <topLoadMore ref="topLoadMore" slot="top" :loading="isLoading" :loaded="isLoaded"></topLoadMore>
      <div class="eachContainer"  @click="gotoDetail()">
        <div class="headLine">
          <div class="headImg">
            <img src="../../../../images/mine/defaultHead.png" alt="">
          </div>
          <div class="name">
            王林娟
          </div>
          <div class="time">1分钟前</div>
        </div>
        <div class="title">
          标题
        </div>
        <div class="answer">
          回答回答回答回答
        </div>
        <div class="other">
          <span class="classify">口内</span>
          <span class="num"><span>4</span>评论</span>
          <span class="clr"></span>
        </div>
      </div>
    </mt-loadmore>
  </div>
</template>

<script type="text/ecmascript-6">
  import { InfiniteScroll, LoadMore } from 'mint-ui';
  import topLoadMore from '../../../salesWap/index/topLoadMore.vue';

  export default {
    data(){
      return{
        isLoading:false,
      }
    },
    components:{
      topLoadMore
    },
    methods:{
      //下拉刷新
      loadMore (id){

      },
      gotoDetail(id){
        this.$router.push({path:'/QandADetail',params:{}})
      },
      //mt中接受的val值作为参数传入我的组件里
      isState(val){
        console.log(val)
        this.$refs.topLoadMore.states(val)
      },
      //把下拉刷新完成之后回调的mt的方法传入我的组件里
      isLoaded(){
        this.$refs.loadmore.onTopLoaded();
      },
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  .container{
    width: 100%;
    height: 100%;
    min-height: 30vh;
    .eachContainer{
      padding: px2vw(20) px2vw(20) 0;
      width: 100%;
      .headLine{
        width: 100%;
        height: px2vw(120);
        float: left;
        .headImg{
          display: inline-block;
          width: px2vw(60);
          height: px2vw(60);
          border-radius: 50%;
          overflow: hidden;
          vertical-align: middle;
          img{
            width: 100%;
            line-height: px2vw(60);
          }
        }
        .name{
          line-height: px2vw(120);
          display: inline-block;
          font-size: px2vw(26);
          color: #333;
          margin-left: px2vw(10);
        }
        .time{
          line-height: px2vw(120);
          display: inline-block;
          font-size: px2vw(24);
          color: #999;
          margin-left: px2vw(10);
        }
      }
      .title{
        width: 100%;
        font-size: px2vw(30);
        color: #333;
        margin-bottom: px2vw(20);
        font-weight: bold;
      }
      .answer{
        width: 100%;
        font-size: px2vw(28);
        color: #333;
        margin-bottom: px2vw(20);
      }
      .other{
        padding-bottom: px2vw(30);
        border-bottom: 1px solid #e5e5e5;
        height: px2vw(70);
        .classify{
          font-size: px2vw(22);
          border: 1px solid $themeColor;
          color: $themeColor;
          border-radius: px2vw(5);
          float: left;
        }
        .num{
          float: right;
          font-size: px2vw(24);
          color: #999;
          span{
            color: $themeColor;
          }
        }
        .clr{
          clear: both;
        }
      }
    }
  }
</style>
