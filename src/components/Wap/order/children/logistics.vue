<template>
  <div class="logistics-container">
    <order-header>物流信息</order-header>
    <div class="order-info">
      <div class="image">
        <img :src="order.orderitemList[0].picPath" alt="" width="100%" height="100%">
      </div>
      <div class="logistics-info">
        <p class="logistics-company"><span class="title">物流公司：</span>{{EBusinessCompany}}</p>
        <p class="logistics-id"><span class="title">快递单号：</span>{{LogisticCode}}</p>
      </div>
    </div>
    <div class="logistics-timeline">
      <time-line v-for="(item,index) in logistics.Traces" :key="index">
        <span slot="time">{{item.AcceptTime}}</span>
        <span slot="dec">{{item.AcceptStation}}</span>
      </time-line>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import timeLine from '../timeLine'
  import orderHeader from '../orderHeader.vue'
  import {QUERY_ORDER_LOG} from '@vuex/types'
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'logistics',
    data() {
      return {
        logistics: {},
      }
    },
    components: {
      timeLine,
      orderHeader
    },
    computed: {
      ...mapState({order: state => state.index.orderDetails}),
      LogisticCode() {
        return this.logistics.LogisticCode
      },
      EBusinessCompany() {
        let eBusinessCompany = ''
        switch (this.logistics.ShipperCode) {
          case 'STO':
            eBusinessCompany = '申通'
            break
          case 'SF':
            eBusinessCompany = '顺丰'
            break
          default:
            break
        }
        return eBusinessCompany
      }
    },
    methods: {
      ...mapActions({QUERY_ORDER_LOG}),
      goBack() {
        this.$router.go(-1)
      }
    },
    async created() {
      let res = await this[QUERY_ORDER_LOG]({orderId: this.order.orderId}).catch(err => console.log(err))
      if (res.data.callStatus === 'SUCCEED') {
        if (!res.data.data) return
        this.logistics = JSON.parse(res.data.data)
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  .logistics-container {
    background-color: #f4f4f4;
    .logistics-header {
      position: fixed;
      top: 0;
      width: 100vw;
      height: px2vw(88);
      line-height: px2vw(88);
      padding-bottom: 10vw;
      color: #fff;
      background-color: #3676b6;
      border-bottom: px2vw(1) solid $borderColor;
      text-align: center;
      .icon-container {
        display: inline-block;
        height: px2vw(88);
        line-height: px2vw(88);
        width: px2vw(150);
        text-align: left;
        margin-left: 2vw;
        float: left;
        .back-icon {
          width: px2vw(18);
          height: px2vw(29);
        }
      }
      .logistics-title {
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
      }
    }
    .order-info {
      display: flex;
      padding: px2vw(103) px2vw(20) px2vw(30);
      background-color: #fff;
      margin-bottom: px2vw(20);
      .image {
        width: px2vw(120);
        height: px2vw(120);
        margin-right: px2vw(20);
        border: 1px solid $borderColor;
        flex: none;
      }
      .logistics-info {
        flex: 1;
        .logistics-company {
          margin-bottom: px2vw(26);
        }
      }
    }
    .logistics-timeline {
      background-color: #fff;
    }
  }
</style>
