<template>
  <div class="orderComponent-container">
    <div class="order-content" @click="goOrderDetail(order.orderId)">
      <div class="orderDetail-info">
        <i class="order-state-text">{{orderStateText}}</i>
        <span class="qb-feedback">赠送<strong class="num">{{order.giveQb}}</strong>乾币</span>
      </div>
      <ul class="product-container">
        <li class="product-content" :key="index" v-for="(item,index) in order.orderitemList">
           <div class="product-image"><!-- @click.stop.prevent="goDetails(item)" -->
            <img :src="item.picPath +'?imageView2/1/w/400/h/400'" :alt="item.itemInfo.itemName" class="image" width="100%" height="100%">
          </div>
          <ul class="product-detail">
            <li class="product-detail-name">
              <p class="title">{{item.itemInfo.itemName}}<br/><span class="brand_name">{{item.itemBrandName}}</span></p>
              <p class="price">￥{{item.price | transformMoney}}</p>
            </li>
            <li class="product-detail-desc">
              <p class="desc">{{item.itemPropertyNamea}}<span v-if="item.itemPropertyNameb">；</span>{{item.itemPropertyNameb}}<span v-if="item.itemPropertyNamec">；</span>{{item.itemPropertyNamec}}</p>
              <p class="num">&times;{{item.num}}</p>
            </li>
          </ul>
        </li>
      </ul>
      <div class="orderPrice-info">
        <p class="qb-relief">乾币抵扣：￥{{order.qbDed}}</p>
        <p class="order-price">合计：
          <span class="price">￥{{order.actualPay | transformMoney}}</span>（含运费￥{{order.postFee | transformMoney}}）</p>
      </div>
    </div>
    <!--等待买家付款-->
    <div class="action-btn-container" v-if="orderState===1">
      <span class="action-btn cancel-btn" @click="cancelOrder(order.orderId)">取消订单</span>
      <span class="action-btn enter-btn" @click="payOrder">付款</span>
    </div>
    <!--等待卖家发货-->

    <!--卖家已发货-->
    <div class="action-btn-container" v-if="orderState===3">
      <span class="action-btn cancel-btn" @click="goLogistics">查看物流</span>
      <span class="action-btn enter-btn" @click="confirmOrder(order.orderId)">确认收货</span>
    </div>
    <!--交易成功未评价-->
    <div class="action-btn-container" v-if="orderState===4">
      <span class="action-btn enter-btn" @click="goComment">评价</span>
    </div>
    <!--交易成功未评价-->
    <div class="action-btn-container" v-if="orderState===9">
      <span class="evaluation">评价成功</span>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  import {CANCEL_USER_ORDER, GET_ORDER_LIST, SAVE_ORDERS_DETAILS, CONFIRM_ORDER} from '../../../vuex/types'
  import {Toast, Indicator, MessageBox} from 'mint-ui'
  import {tokenMethods} from '@vuex/util'

  export default {
    data() {
      return {
        orderStateText: '',
        orderState: 0
      }
    },
    props: {
      order: {
        default: [],
        type: Object
      }
    },
    methods: {
      init() {
        //初始化订单的详情
        this.orderState = this.order.state
        switch (this.orderState) {
          case 0:
            this.orderStateText = '交易关闭'   //0
            break
          case 1:
            this.orderStateText = '等待买家付款' //1
            break
          case 2:
            this.orderStateText = '等待卖家发货'  //2
            break
          case 3:
            this.orderStateText = '卖家已发货'   //3
            break
          case 4:
            this.orderStateText = '交易成功' //4 交易成功未评价
            break
          case 5:
            this.orderStateText = '等待卖家发货' //2
            break
          case 9:
            this.orderStateText = '交易成功' //4交易成功已评价
            break
          default:
            break
        }
      },
      cancelOrder(orderId) {
        MessageBox.confirm('确定取消订单吗？')
          .then(action => {
            this.$store.dispatch(CANCEL_USER_ORDER, {orderId})
              .then(res => {
                //将订单状态改为0
                this.order.state = 0
                console.log(this.order.state)
                this.init()
                this.$emit('cancelorder', orderId)
                Toast({message: '删除订单成功', duration: 1500})
              })
          })
          .catch(err => {
          })
      },
      goOrderDetail(orderId) {
        let orderDetail = Object.assign(this.order, {orderStateText: this.orderStateText})
        this.$store.commit(SAVE_ORDERS_DETAILS, orderDetail)
        sessionStorage.setItem('toOrder', 'detail')
        this.$router.push({name: 'orderDetail'})
        window.scroll(0, 0)
      },
      // goDetails(good) {
      //   this.$router.push({path: '/details/' + good.itemId, query: {name: good.name, itemId: good.itemId}});
      //   window.scroll(0, 0)
      // },
      goLogistics() {
        //查看物流
        this.$store.commit(SAVE_ORDERS_DETAILS, this.order)
        this.$router.push({name: 'logistics'})
        window.scroll(0, 0)
      },
      goComment() {
        //跳转到评论
        this.$store.commit(SAVE_ORDERS_DETAILS, this.order)
        this.$router.push({name: 'comment'})
        window.scroll(0, 0)
      },
      payOrder() {
        let orderPay = {
          actualPay: this.order.actualPay,
          OrderId: this.order.orderId
        }
        try {
          window.sessionStorage.setItem('order', JSON.stringify(orderPay))
        } catch (e) {
          Toast(e)
        }
        this.$router.push({name: 'pay'})
      },
      confirmOrder(orderId) {
        MessageBox.confirm('确定收到商品了吗？')
          .then(action => {
            this.$store.dispatch(CONFIRM_ORDER, {orderId})
              .then(res => {
                //将订单状态改为4
                this.order.state = 4
                this.init()
                this.$emit('confirmorder', orderId)
                Toast({message: '确定收货成功', duration: 1500})
                this.$router.replace({name: 'orderSubpage', params: {order_state: 4}})
              })
          })
          .catch(err => {
          })
      }
    },
    filters: {
      transformMoney(val) {
        if (!val) return '0.00'
        let temp = val.toString().split('.'),
          transMoney = ''
        if (temp.length === 1) {
          return (val + '.00')
        }
        transMoney = temp[1].length === 2 ? temp[1] : temp[1].toString().padEnd(2, '0')
        return `${temp[0]}.${transMoney}`
      }
    },
    created() {
      console.log(this.order)
      this.init()
    },
    watch: {
      order() {
        this.init()
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  $primary-font-color: #999;
  $light-font-color: #d81e06;
  $active-color: #005aab;

  .orderComponent-container {
    width: 100%;
    background-color: #fff;
    margin-bottom: px2vw(20);
    padding: 0 px2vw(20);
    overflow: hidden;
    &:last-child {
      margin-bottom: 0;
    }
    .orderDetail-info {
      box-sizing: border-box;
      height: px2vw(64);
      font-size: px2vw(24);
      padding-top: px2vw(24);
      margin-bottom: px2vw(20);
      border-bottom: px2vw(1) solid $borderColor;
      @include clearfix;
      .order-state-text {
        float: left;
        font-style: normal;
        color: $primary-font-color;
      }
      .qb-feedback {
        float: right;
        .num {
          font-weight: normal;
          color: $light-font-color;
        }
      }
    }
    .product-container {
      .product-content {
        display: flex;
        margin-bottom: px2vw(30);
        @at-root .product-image {
          flex: none;
          width: px2vw(150);
          height: px2vw(150);
          .image {
            border: 1px solid $borderColor;
          }
        }
        @at-root .product-detail {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-left: px2vw(36);
          .product-detail-name {
            flex: 1;
            display: flex;
            font-size: px2vw(28);
            .title {
              flex: none;
              position: relative;
              width: px2vw(360);
              color: #333;
              .brand_name{
                position: absolute;
                bottom: px2vw(4);
                padding: 0 px2vw(3);
                border-radius: px2vw(3);
                background: rgb(54, 118, 180);
                font-size: px2vw(22);
                color: rgb(255, 255, 255);
              }
            }
            .price {
              color: $light-font-color;
              flex: 1;
              text-align: right;
            }
          }

          .product-detail-desc {
            flex: none;
            height: px2vw(30);
            display: flex;
            font-size: px2vw(24);
            color: $primary-font-color;
            .desc {
              flex: 1;
            }
            .num {
              flex: none;
            }
          }
        }
      }
      margin-bottom: px2vw(-10);
    }
    .orderPrice-info {
      height: px2vw(86);
      line-height: px2vw(86);
      font-size: px2vw(22);
      color: $primary-font-color;
      border-top: 1px solid $borderColor;
      @include clearfix;
      .qb-relief {
        float: left;
      }
      .order-price {
        float: right;
        .price {
          font-size: px2vw(28);
          color: #333;
        }
      }
    }
    .action-btn-container {
      text-align: right;
      padding: px2vw(20) 0;
      border-top: 1px solid $borderColor;
      margin-right: px2vw(-28);
      .action-btn {
        display: inline-block;
        width: px2vw(150);
        height: px2vw(50);
        line-height: px2vw(50);
        font-size: px2vw(28);
        text-align: center;
        border: 1px solid #333;
        color: #333;
        border-radius: px2vw(50);
        margin-right: px2vw(28);
        &.enter-btn {
          border: 1px solid $active-color;
          color: $active-color;
        }
      }
      .evaluation {
        height: px2vw(50);
        line-height: px2vw(50);
        font-size: px2vw(28);
        color: $light-font-color;
        margin-right: px2vw(30);
      }
    }
  }
</style>
