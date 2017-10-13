<template>
  <div class="order-container">
    <div class="order-top-bar">
      <div class="order-header">
        <span class="icon-container" @click="goBack">
          <img class="back-icon" src="../../../images/logIn/back.png" alt="img">
        </span>
        <span class="order-title">我的订单</span>
      </div>
      <ul class="order-list">
        <router-link to="/order/orderSubpage/0" class="order-item" tag="li" replace>全部</router-link>
        <router-link to="/order/orderSubpage/1" class="order-item" tag="li" replace>待付款</router-link>
        <router-link to="/order/orderSubpage/2" class="order-item" tag="li" replace>待发货</router-link>
        <router-link to="/order/orderSubpage/3" class="order-item" tag="li" replace>待收货</router-link>
        <router-link to="/order/orderSubpage/4" class="order-item" tag="li" replace>待评价</router-link>
      </ul>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">

  import {Toast, MessageBox} from 'mint-ui'

  export default {
    name: 'order',
    created() {
      this.mBack('toBack');
    },
    methods: {
      goBack() {
        this.$router.push({path: '/yayi/mine'})
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  $order-text-light-color: #999;
  .order-container {
    color: #333333;
    .order-top-bar {
      position: fixed;
      z-index: 1000;
      background-color: #fff;
      @at-root .order-header {
        height: px2vw(88);
        line-height: px2vw(88);
        background-color: #3676b6;
        border-bottom: px2vw(1) solid $borderColor;
        .icon-container {
          width: px2vw(150);
          height: px2vw(88);
          margin-left: 2vw;
          margin-top: px2vw(2);
          float: left;
          .back-icon {
            width: px2vw(18);
            height: px2vw(29);
          }
        }

        .order-title {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0 auto;
          width: px2vw(200);
          height: px2vw(88);
          line-height: px2vw(88);
          display: inline-block;
          text-align: center;
          font-size: px2vw(32);
          color: #fff;
        }
      }
      @at-root .order-list {
        display: flex;
        width: 100vw;
        height: px2vw(80);
        .order-item {
          flex: 1;
          text-align: center;
          line-height: px2vw(80);
          border-bottom: 1px solid $borderColor;
          font-size: px2vw(28);
          &.router-link-active {
            border-bottom-color: #005aab;
            color: #005aab;
          }
        }
      }
    }
  }

</style>
