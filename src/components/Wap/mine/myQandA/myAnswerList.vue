<template>
  <div class="container">
    <mt-loadmore :top-method="loadMore" :auto-fill=false ref="loadmore"  v-on:top-status-change="isState">
      <topLoadMore ref="topLoadMore" slot="top" :loading="isLoading" :loaded="isLoaded"></topLoadMore>
      <div class="scrollBox" v-infinite-scroll="getAnswerListMore" infinite-scroll-immediate-check="true" v-if="answerList.length > 0">
        <div class="eachContainer"  @click="gotoDetail(value.id)" v-for="(value,index) in answerList">
          <div class="headLine">
            <div class="headImg">
              <img :src="value.userPic" alt="" v-if="value.userPic">
              <img src="../../../../images/mine/defaultHead.png" alt="" v-else="">
            </div>
            <div class="name">
              {{value.userName}}
            </div>
            <div class="time">{{value.time}}</div>
          </div>
          <div class="title">
            {{value.title}}
          </div>
          <div class="answer">
            {{value.answer}}
          </div>
          <div class="other">
            <span class="classify">{{value.classify}}</span>
            <span class="num">已有<span>{{value.commentNum}}</span>人回答</span>
            <span class="clr"></span>
          </div>
        </div>
        <div v-if="answerList.length != 0" class="noMoreData">
          - End -
        </div>
      </div>
      <!-- <div class="noData" v-if="(noData && !answerList) || (noData && answerList.length == 0)"> -->
      <div class="noData" v-if=" answerList.length == 0">
        <img src="../../../../images/question/noAnswerList.png" alt="">
        <p>暂无任何回答~</p>
      </div>
    </mt-loadmore>
  </div>
</template>

<script type="text/ecmascript-6">
  import { InfiniteScroll, LoadMore } from 'mint-ui';
  import topLoadMore from '../../../salesWap/index/topLoadMore.vue';
  import {MY_ANSWER } from '../../../../vuex/types'
  import Util from '../../../../vuex/util'

  export default {
    data(){
      return{
        isLoading:false,
        args:{
          currentPage:1
        },
        answerList:[],
        totalPage:0,
        timeStamp:'',
        noData:false,
      }
    },
    components:{
      topLoadMore
    },
    created(){
      this.timeStamp = Date.parse(new Date());
      this.getAnswerList();
    },
    methods:{
      //下拉刷新
      loadMore (){
        this.timeStamp = Date.parse(new Date());
        this.args.currentPage = 1;
        this.totalPage = 0;
        this.answerList = [];
        this.getAnswerList();
      },
      getAnswerList(){
        this.isLoading = true;
        this.$store.dispatch(MY_ANSWER, this.args).then(res=>{
          console.log(res.data[0].faqAnswerList);
          if(res.data){
            res.data.forEach(item =>{
              for(let i = 0;i < item.faqAnswerList.length;i++){
                let obj = {}
                obj.userName = item.faqAnswerList[i].userName;
                obj.userPic = item.faqAnswerList[i].userPic;
                obj.time = this.time(item.faqAnswerList[i].faqAnswerTime);
                obj.commentNum = item.faqAnswerList.length;
                obj.classify = this.classify(item.faqQuestionType);
                obj.answer = item.faqAnswerList[i].faqAnswerContent;
                obj.title = item.faqQuestionTitle;
                obj.id = item.faqQuestionId;
                obj.content = item.faqQuestionContent;
                this.answerList.push(obj);
              }
            })
            console.log(this.answerList,'l')
            this.isLoading = false;
          }else {
            this.noData = true;
            this.isLoading = false;
          }
        });
      },
      time(item){
        let tmpTime = '';
        switch (true) {
          //几分钟前
          case this.timeStamp - item < 3600000:
//                console.log(this.timeStamp - item)
            tmpTime = Math.ceil((this.timeStamp - item) / 1000 / 60) + '分钟前';
            break;
          //几小时前
          case this.timeStamp - item >= 3600000 && this.timeStamp - item < 86400000:
//                console.log(this.timeStamp - item)
            tmpTime = Math.floor((this.timeStamp - item) / 1000 / 60 / 60) + '小时前';
            break;
          //日期
          case this.timeStamp - item >= 86400000:
            tmpTime = Util.formatDate.format(new Date(item), 'yy.MM.dd hh:mm').substring(2);
            break;
        }
        return tmpTime
      },
      classify(item){
        let tmp = ''
        switch (true){
          case item == 1:
            tmp = '口腔外科'
            break
          case item == 2:
            tmp = '口腔内科'
            break
          case item == 3:
            tmp = '口腔修复'
            break
          case item == 4:
            tmp = '口腔种植'
            break
          case item == 5:
            tmp = '口腔正畸'
            break
        }
        return tmp
      },
      getAnswerListMore(){
        if(this.totalPage <= this.args.currentPage){
          return
        }else {
          this.args.currentPage += 1;
          this.getAnswerList();
        }
      },
      gotoDetail(id){
        this.$router.push({path:'/QandADetail',query:{faqQuestionId:id}})
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
    background-color: #f4f4f4;
    .scrollBox {
      width: 100%;
      height: 100%;
      background-color: #f4f4f4;
      min-height: 79vh;
      .eachContainer{
        padding: px2vw(0) px2vw(20) 0;
        background-color: #fff;
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
              height: 100%;
              line-height: px2vw(60);
            }
          }
          .name{
            line-height: px2vw(120);
            display: inline-block;
            font-size: px2vw(26);
            font-weight: bold;
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
          border-bottom: px2vw(1) solid #e5e5e5;
          height: px2vw(70);
          .classify{
            font-size: px2vw(22);
            border: px2vw(1) solid $themeColor;
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
    .noMoreData{
      margin-top: px2vw(-1);
      background-color: #f4f4f4;
      margin: px2vw(2) auto;
      height: px2vw(80);
      font-size: px2vw(26);
      color: #999;
      text-align: center;
      line-height: px2vw(80);
    }
    .noData{
      width: 100%;
      margin-top: px2vw(360);
      text-align: center;
      img{
        width: px2vw(120);
      }
      p{
        font-size: px2vw(28);
        color: #999;
        line-height: px2vw(60);
      };
    }
  }
</style>
