<template>
  <div class="exchangeDeatail" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true">
    <div class="detail_list" v-for="item in getData" :key="item.userId" v-if="item.qbRget">
        <div>
          <h3 >收入</h3>
          <span class="color1">{{item.qbTime}}</span>
        </div>
        <div class="right_box">
          <span class="detail_list_alert">{{item.qbRget}}</span>
          <div class="color1 fontSizeY">{{item.remark}}</div>
        </div>
    </div>
    <div class="detail_list" v-else>
      <div class="box_H3">
        <h3 >支出</h3>
        <span class="color2">{{item.qbTime}}</span>
      </div>
      <div class="right_box2">
        <div class="color3">{{item.qbRout}}</div>
        <span class="color2 box_z">{{item.remark}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import Util from '../../../vuex/util'
  import {tokenMethods} from '../../../vuex/util'
  import {Toast} from 'mint-ui'
  import {Indicator, InfiniteScroll,Popup} from 'mint-ui'
  export default{
    name: 'exchangeDetail',
    data(){
      return {
        getData: [],
        currentPage: 1,
        totalCount:0
      }
    },
    created: function() {
      var that = this
      that.getMoneyList()
    },
    methods: {
      // 优惠码兑换乾币
      getMoneyList:function(){
        Indicator.open();
        var that = this
        var obj = {
          token: tokenMethods.getWapToken(),
          currentPage:this.currentPage
        }
        that.$store.dispatch('QB_DETAIL', obj).then((res) => {
          if (res.callStatus === 'SUCCEED') {
//            if(res.data.length > 0) {
              // console.log(res.data.data)
              // // that.currentMoney = res.data.data[0].user.qbBalance;
              // for(let i in res.data.data) {
              //   res.data.data[i].qbTime = Util.formatDate.format(new Date(res.data.data[i].qbTime),'yyyy-MM-dd hh:mm:ss' )
              // }
//            }
            res.data.forEach(function (item) {
              that.getData.push(item);
            })
            that.totalCount = res.totalPage;
            Indicator.close();
            // this.childConfig.pageNum = parseInt(this.getData.length/this.everyPageShowNum)+1;
          } else {
            Indicator.close();
            // that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      loadMore() {
        if(this.currentPage == this.totalCount){
          Toast({message:'没有更多信息了',duration:3000})
        }else {
          this.currentPage = this.currentPage + 1;
          this.getMoneyList();
        }
      },
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .exchangeDeatail{
    margin-bottom: px2vw(30);
  }
  .fontSizeY{
    font-size: px2vw(24);
    line-height: px2vw(36);
  }
  .detail_list {
    max-width: px2vw(710);
    min-height: px2vw(130);
    margin: px2vw(30) auto 0;
    border: px2vw(1) solid #dcdcdc;
    padding: px2vw(20) 0;
  }
  .detail_list:after {
    content: '';
    display: block;
    clear: both;
  }

  .detail_list > div:nth-child(1) {
    vertical-align: middle;
    max-width: px2vw(200);
    min-height: px2vw(90);
    display: inline-block;
  }

  .detail_list > div:nth-child(1) > h3, .detail_list > div:nth-child(2) > h3 {
    text-align: center;
    font-size: px2vw(30);
    line-height: px2vw(50);
  }

  .detail_list > div:nth-child(2) > .detail_list_alert {
    font-size: px2vw(26);
    color: #005aab;
    margin-bottom: px2vw(8);
  }

  .detail_list > div:nth-child(1) > span, .detail_list > div:nth-child(2) > span {
    text-align: center;
    display: block;
    width: 100%;
    font-size: px2vw(24);
    line-height: px2vw(20);
  }

  .detail_list > div:nth-child(2) {
    border-left: px2vw(1) solid #dcdcdc;
    display: inline-block;
    text-align: center;
    min-width: px2vw(490);
    min-height: px2vw(90);
    vertical-align: middle;
    padding-left: px2vw(4);
  }
  .detail_list > div:nth-child(2):last-child{
    margin-bottom: px2vw(20);
  }
  .color1 {
    color: #999999;
    width: px2vw(450);
    text-align: center;
    margin: 0 auto;
    word-wrap: break-word;
    white-space: pre-wrap;
  }

  .box_z{
    width: px2vw(450) !important;
    text-align: center;
    margin: 0 auto;
    word-wrap: break-word;
    white-space: pre-wrap;
    font-size: px2vw(24) !important;
    line-height: px2vw(36) !important;
  }
  .color2 {
    color: #999999;
  }


  .color3 {
    color: #d81e06;
    font-size: px2vw(26);
    margin-bottom: px2vw(5);
  }
  .right_box2{
    width: px2vw(500);
   float: right;
  }

  .right_box{
    width: px2vw(495);
    padding-top: px2vw(20);
  }
  .box_H3 {
    display: inline-block;
  }

</style>
