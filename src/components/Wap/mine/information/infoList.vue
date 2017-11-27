<template>
  <div>
    <div class="header">
      <span class="back-click-area" @click="goBack"></span>
      {{headerText}}
    </div>
    <div class="container">
      <div class="innerContainerWrap">
        <!--有内容-->
        <div v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" class="innerContainer" v-if="list">
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
        <div class="noRes" v-if="!list && !isLoading">
          <img src="../../../../images/mine/noRes.png" alt="">
          <p>暂无内容</p>
        </div>
      </div>
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
          this.list = JSON.parse(tokenMethods.getInfoList()) ? JSON.parse(tokenMethods.getInfoList()) : [];
          break;
        case this.$route.query.type === 2:
          this.list = JSON.parse(tokenMethods.getAnswerList()) ? JSON.parse(tokenMethods.getAnswerList()) : [];
      }
      console.log(this.list)
      this.getList();
    },
    methods:{
      goBack(){
        this.$router.go(-1);
        this.$destroy()
      },
      getList(){
        this.$store.dispatch(GET_INFO_DETAIL, this.args).then(res =>{
          console.log(res)
          if(res.data){
            this.list = res.data.concat(this.list);
            console.log(this.list);
            this.setList(this.list);
            this.currentPage = res.currentPage;
            this.totalPage = res.totalPage;
          }
        })
      },
      setList(val){
        switch (true) {
          case this.$route.query.type === 1:
            tokenMethods.setInfoList(val)
            tokenMethods.setInfoNum(val.length);
            break;
          case this.$route.query.type === 2:
            tokenMethods.setAnswerList(val)
            tokenMethods.setAnswerNum(val.length);
            break;
        }

      },
      goPage(item,key){
        //这个是需要传一个obj的。
        if(this.$route.query.type === 1) {
          let obj = {
            momentId: item.typeId
          }
          console.log(this.list,key)
          this.list.splice(key, 1)
          if(this.list) {
            this.setList(this.list);
          }else {
            console.log('no')
            switch (true) {
              case this.$route.query.type === 1:
                tokenMethods.removeInfoList(val)
                tokenMethods.setInfoNum(0);
                break;
              case this.$route.query.type === 2:
                tokenMethods.removeAnswerList(val)
                tokenMethods.setAnswerNum(0);
                break;
            }
          }
          this.$router.push({path: '/infoDetail', query: obj})
          console.log(JSON.parse(tokenMethods.getInfoList()),'whh')
//        this.$destroy()
        }
        else if(this.$route.query.type === 2){

        }
      },
      loadMore(){
        if(this.args.currentPage >= this.totalPage){
          this.noMoreData = true;
        }else {
          this.args.currentPage = this.args.currentPage + 1;
          this.noMoreData = false;
          this.created();
//          //  再加载下一页
        }
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
    height: 91vh;
    min-height: 91vh;
    top: px2vw(88);
    bottom: 0;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .innerContainerWrap{
      width: 100%;
      .innerContainer{
        width:100%;
        height: 91vh;
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
      .noRes{
        width: 100%;
        text-align: center;
        img{
          width: px2vw(108);
          margin-top: px2vw(430);
        }
        p{
          line-height: px2vw(60);
          font-size: px2vw(30);
          color: #666;
        }
      }
    }
  }
</style>
