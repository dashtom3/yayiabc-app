<template>
  <div>
    <div class="header">
      <div class="headerTitle">牙医圈</div>
      <div class="newTrend" @click="newTrend">
        <img src="../../../images/yayiCircle/newTrend.png" alt="">
        <div>发动态</div>
      </div>
    </div>
    <div class="container">
      <mt-loadmore :top-method="loadTop" :auto-fill=false ref="loadmore"  v-on:top-status-change="isState">
        <topLoadMore ref="topLoadMore" slot="top" :loading="isLoading" :loaded="isLoaded"></topLoadMore>
        <!--有数据的状态-->
        <div v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true">
          <div v-for="(item,index) in yayiCircleData">
            <div>
              <img src="" alt="">
            </div>
            <div>

            </div>
          </div>
        </div>
          <!--数据到底-->

        <!--请求完毕后，无数据显示状态-->
      </mt-loadmore>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import topLoadMore from '../../salesWap/index/topLoadMore.vue'
  import {YAYI_CIRCLE, } from '../../../vuex/types'
  import Util from '../../../vuex/util'
  import {Indicator, InfiniteScroll,Popup, LoadMore} from 'mint-ui'

  export default {
    data(){
      return{
        isLoading:false,      //判断是否在加载中
        args:{                //请求牙医圈列表接口参数
          currentPage:2,
        },
        totalPage: null,      //总页数
        yayiCircleData:[],    //请求结果保存的数组
        noMoreData:false,     //没有更多数据
        timeStamp:null,       //进入页面获取当前时间戳，下拉刷新会更新，但是加载更多不会
      }
    },
    components:{
      topLoadMore
    },
    created(){
      this.timeStamp = Date.parse(new Date());
      let tmp = new Date(this.timeStamp).getHours();
      console.log(tmp)
      this.getYayiCircle();
    },
    methods:{
      newTrend(){
        this.$router.push('/newTrend')
      },
      getYayiCircle(){
        this.isLoading = true;
        console.log(this.timeStamp);
        this.$store.dispatch(YAYI_CIRCLE, this.args).then(res =>{
          res.data.forEach(item => {
            //图片字符串转数组
            if(item.momentPicture) {
              item.momentPicture = item.momentPicture.split(';');
            }
            //时间转换
            switch (true){
              //几分钟前
              case this.timeStamp - item.momentTime < 3600000:
                item.momentTime = new Date(this.timeStamp).getMinutes() - new Date(item.momentTime).getMinutes() + '分钟前';
                break;
              //几小时前
              case this.timeStamp - item.momentTime >= 3600000 && this.timeStamp - item.momentTime < 86400000:
                item.momentTime = new Date(this.timeStamp).getHours() - new Date(item.momentTime).getHours() + '小时前';
                break;
              //日期
              case this.timeStamp - item.momentTime >= 86400000:
                item.momentTime = Util.formatDate.format(new Date(item.momentTime),'yy.MM.dd hh:mm').substring(2);
                break;
            }
            this.yayiCircleData.push(item)
            console.log(item);
          })
          this.totalPage = res.totalPage
          //控制是否显示加载到底的一个判断值，虽然我觉得基本上用不到。
          if(this.args.currentPage === res.totalPage && this.args.currentPage > 1){
            this.noMoreData = true
          }
        })
      }
    },
    loadMore(){
      if(this.args.currentPage >= this.args.totalPage){
//          this.noMoreGood = true;
      }else {
        this.args.currentPage = this.args.currentPage + 1;
        //  再加载下一页
      }
    },
    loadTop(){
      //把所有参数回归为初始值，并且重新获得时间戳
    },
    //mt中接受的val值作为参数传入我的组件里
    isState(val){
      this.$refs.topLoadMore.states(val)
    },
    //把下拉刷新完成之后回调的mt的方法传入我的组件里
    isLoaded(){
      this.$refs.loadmore.onTopLoaded();
    }
  }
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
    font-size: px2vw(36);
    .newTrend{
      position: absolute;
      right: 0;
      top: 0;
      display: inline-block;
      width: px2vw(200);
      div{
        display: inline-block;
        line-height: px2vw(88);
        vertical-align: top;
        font-size: px2vw(30);
      }
      img{
        height: px2vw(50);
        margin-top: px2vw(19);
      }
    }
  }
  .contianer{
    position: fixed;
    top: px2vw(88);
    bottom: 0;
    overflow: scroll;
    width: 100%;
    -webkit-overflow-scrolling: touch;
  }
</style>
