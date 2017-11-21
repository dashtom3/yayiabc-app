<template>
  <div>
    <div class="header">
      <span class="back-click-area" @click="goBack"></span>
      {{headerText}}
    </div>
    <div class="container">
      <mt-loadmore :top-method="loadTop" :auto-fill=false ref="loadmore"  v-on:top-status-change="isState" class="innerContainerWrap">
        <topLoadMore ref="topLoadMore" slot="top" :loading="isLoading" :loaded="isLoaded"></topLoadMore>
        <!--有内容-->
        <div v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" class="innerContainer">
          <div class="line" @click="goPage(item,key)" v-for="(item,key) in list"><!--v-for开始-->
            <span class="thisTitle">
              {{item.message}}
            </span>
            <div class="floatRight">
              <span></span>
              <img src="../../../../images/mine/right.png" alt="">
            </div>
          </div>
        </div>
        <!--无内容-->
        <div>

        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import topLoadMore from '../../../salesWap/index/topLoadMore.vue'
  import {Indicator, InfiniteScroll,Popup, LoadMore, Toast, MessageBox} from 'mint-ui'
  import { GET_INFO_DETAIL } from '../../../../vuex/types'
  import { tokenMethods } from '../../../../vuex/util'

  export default {
    data(){
      return{
        headerText:this.$route.query.type === 1 ? '评论列表' : '我的问答',
        isLoading:false,
        list:[],
        args:{
          type : this.$route.query.type,
          numberPerPage : 15
        },
        currentPage:1,
        totalPage:0,
        noMoreData:false
      }
    },
    components:{
      topLoadMore
    },
    watch:{

    },
    created(){
      switch (true){
        case this.$route.query.type === 1:
          this.list = JSON.parse(tokenMethods.getInfoList());
          break;
        case this.$route.query.type === 2:
          this.list = JSON.parse(tokenMethods.getAnswerList());
      }
      this.getList();
    },
    methods:{
      goBack(){
        this.$router.go(-1);
        this.$destroy()
      },
      getList(){
        this.$store.dispatch(GET_INFO_DETAIL, obj).then(res =>{
          console.log(res)
          this.list.concat(res.data);
          this.setList(this.list);
          this.currentPage = res.currentPage;
          this.totalPage = res.totalPage;
        })
      },
      setList(val){
        console.log(val);
        switch (true){
          case this.$route.query.type === 1:
            tokenMethods.setInfoList(val)
            break;
          case this.$route.query.type === 2:
            tokenMethods.setAnswerList(val)
        }
      },
      goPage(item,key){
        //这个是需要传一个obj的。
        let obj = {
          myType : 1,//单条动态
        }
        this.$router.push({path:'/yayiCircle',query:obj})
        this.list.splice(key,1)
        this.setList(this.list);
        this.$destroy()
      },
      loadMore(){
        if(this.args.currentPage >= this.totalPage){
          this.noMoreData = true;
        }else {
          this.args.currentPage = this.args.currentPage + 1;
          this.noMoreData = false;
          this.getList();
//          //  再加载下一页
        }
      },
      loadTop(){
        this.currentPage = 1;
        this.totalPage = 0;
        this.noMoreData = false;
        this.list = [];
        this.getList();
      },
      //mt中接受的val值作为参数传入我的组件里
      isState(val){
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
  .container{
    width: 100%;
    position: fixed;
    top: px2vw(88);
    bottom: 0;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .innerContainerWrap{
      width: 100%;
      .innerContainer{
        width:100%;
        .line{
          width: px2vw(710);
          height: px2vw(120);
          margin: 0 px2vw(20);
          border-bottom: 1px solid #e5e5e5;
          .thisTitle{
            margin-left: px2vw(10);
            line-height: px2vw(120);
            font-size: px2vw(30);
          }
          .floatRight{
            float: right;
            height: 100%;
            line-height: px2vw(120);
            span{
              display: inline-block;
              width: 0;
              height: 0;
              background-color: #ff0000;
              border: px2vw(8) solid #ff0000;
              border-radius: 50%;
              margin-right: px2vw(10);
            }
            img{
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
</style>
