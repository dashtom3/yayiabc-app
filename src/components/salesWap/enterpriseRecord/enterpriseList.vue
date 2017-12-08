<template>
  <div ref="scrollBox" class="enterprise-list">
    <div v-if="tipsShow" class="tips-wrapper">
      <span class="tips">客服代表登录后，即可查看联系方式！</span><span class="login" @click="goToLogin">立即登录</span>
    </div>
    <div v-if="enterpriseList != null" class="scrollBox" v-infinite-scroll="getListMore" infinite-scroll-immediate-check="true">
      <div class="enterprise-item" v-for="(item, index) in enterpriseList" :key="index">
        <div class="item-top clearfix">
          <h2 class="item-title">{{ item.poiname }}</h2>
          <p v-if="tipsShow" class="item-phone">{{ item.telephone !== null ? item.telephone : '暂无联系方式' }}</p>
          <p v-else class="item-phone">{{ item.telephone | formatPhone }}</p>
        </div>
        <div class="item-bottom">
          <img src="../../../images/salesWap/customer/address.png" alt="地址">
          <span class="item-address">{{ item.address }}</span>
        </div>
      </div>
    </div>
    <div v-else class="no-result">
      <img src="../../../images/saleman/no-result.png" alt="暂无结果">
      <span class="no-info">暂无相关信息~</span>
    </div>
    <div class="end-wrapper" v-show="endShow">
      <span class="end">-End-</span>
    </div>
  </div>
</template>

<script>
import { InfiniteScroll, LoadMore,Toast,MessageBox } from 'mint-ui';
import { tokenMethods } from '../../../vuex/util'
export default {
  name: "enterpriseList",
  data() {
    return {
      enterpriseList: [],
      isLoading:false,
      listParams: {
        keyWords: '',
        currentPage: 1,
        numberPerPage: 10,
      },
      totalPage: 0,
      endShow: false,
      tipsShow: true
    };
  },
  created() {
    this.getEnterPriseData();
    this.listParams.keyWords = this.$route.query.keyWord;
    if (tokenMethods.getSalesToken() != null) {
      this.tipsShow = false
    } else {
      this.tipsShow = true
    }
  },
  methods: {
    getEnterPriseData() {
      this.$store.dispatch('GET_ENTERPRISE_DATA', this.listParams).then((res) => {
        if (res.callStatus === 'SUCCEED') {
          this.enterpriseList = this.enterpriseList.concat(res.data);
          this.totalPage = res.totalPage;
        }
      })
    },
    getListMore (){
      if (this.totalPage <= this.listParams.currentPage){
        this.endShow = true
      } else {
        this.listParams.currentPage = Number(this.listParams.currentPage) + 1;
        this.getEnterPriseData();
      }
    },
    goToLogin() {
      this.$router.push({path:'/salesLogin'});
    }
  }
}
</script>
<style>
a{
  text-decoration: underline
}
</style>

<style lang="scss" scoped>
@import "../../../common/sass/factory";
.tips-wrapper{
  position: fixed;
  top: px2vw(180);
  left: 0;
  width: 100%;
  height: px2vw(80);
  color: #fff;
  background: rgba(54, 118, 182, .8);
  .tips{
    line-height: px2vw(80);
    font-size: px2vw(28);
  }
  .login{
    line-height: px2vw(80);
    font-family: 'PingFangSC-Medium' !important;
    font-size: px2vw(28);
    border-bottom: px2vw(2) solid #fff;
  }
}
.enterprise-item{
  width: 100%;
  height: px2vw(167);
  border-bottom: px2vw(2) solid $borderColor;
}
.item-title{
  float: left;
  margin: px2vw(40) 0 0 px2vw(21);
  height: px2vw(31);
  line-height: px2vw(31);
  font-size: px2vw(32);
}
.item-phone{
  float: right;
  margin: px2vw(47) px2vw(21) 0 0;
  height: px2vw(20);
  line-height: px2vw(20);
  font-size: px2vw(26);
}
.item-bottom{
  font-size: 0;
  margin: px2vw(29) 0 0 px2vw(21);
  img{
    display: inline-block;
    vertical-align: top;
    width: px2vw(20);
    height: px2vw(24);
  }
  span{
    display: inline-block;
    margin: 0 0 0 px2vw(8);
    height: px2vw(25);
    line-height: px2vw(25);
    font-size: px2vw(26);
  }
}
.end-wrapper{
  font-size: 0;
  height: px2vw(17);
  margin: px2vw(24) 0;
  text-align: center;
  .end{
    display: inline-block;
    width: px2vw(100);
    margin: auto;
    line-height: px2vw(17);
    font-size: px2vw(20);
    text-align: center;
    color: rgb(153,153,153);
  }
}
</style>