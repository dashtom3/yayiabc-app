<template>
  <div class="orderDetail-container">
    <order-header>订单详情</order-header>
    <div class="receiver-info">
      <p class="title">收货信息</p>
      <p class="receiver" v-if="order.receiver">
        <span class="receiver-item name">{{order.receiver.receiverName}}</span>
        <span class="receiver-item phone">{{order.receiver.phone}}</span>
        <span
          class="receiver-item address">{{receiverAddress}}</span>
      </p>
    </div>
    <div class="order-info">
      <p class="title">订单信息</p>
      <p class="order-item"><span class="item-title">订单编号：</span><span class="order-id">{{order.orderId}}</span></p>
      <p class="order-item"><span class="item-title">创建时间：</span>{{createDate}}</p>
    </div>
    <div class="order-product">
      <p class="order-state">{{order.orderStateText}}</p>
      <ul class="product-container">
        <li class="product-content" :key="index" v-for="(item,index) in order.orderitemList"
            @click.stop.prevent="goDetails(item)">
          <div class="product-image">
            <img :src="item.picPath" :alt="item.itemInfo.itemName" class="image" width="100%" height="100%">
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
      <div class="qb-info">
        <span class="qb-style">
          <img src="../../../../images/order/qb1.png" class="img" height="100%">
          <span class="text">{{qbDes[0] || 0}}</span>
        </span>
        <span class="qb-style">
          <img src="../../../../images/order/qb2.png" class="img" height="100%">
          <span class="text">{{qbDes[3] || 0}}</span>
        </span>
        <span class="qb-style">
          <img src="../../../../images/order/qb3.png" class="img" height="100%">
          <span class="text">{{qbDes[2] || 0}}</span>
        </span>
        <span class="qb-style">
          <img src="../../../../images/order/qb4.png" class="img" height="100%">
          <span class="text">{{qbDes[1] || 0}}</span>
        </span>
      </div>
      <p class="order-price">实际付款：<span class="price">￥{{order.actualPay | transformMoney}}</span>（含运费：<i
        class="primary">￥{{order.postFee | transformMoney}}</i>；乾币抵扣：<i class="primary">{{order.qbDed }}</i>）</p>
    </div>
    <div class="payment-container">
      <div class="payment-info">
        <ul class="payment-list">
          <li class="payment-item"><span class="item-title">支付方式：</span>{{payType}}</li>
          <li class="payment-item"><span class="item-title">发票：</span>
            <mu-raised-button v-if="!invoice.invoiceHand" label="查看" backgroundColor="#3676b6" color="#fff"
                              class="muse-button" primary @click="popupVisible = true"/>
            <span class="no-invoice-text" v-else>不申请发票</span>
          </li>
          <li class="payment-item"><span class="item-title">产品注册证：</span>{{productRegister}}</li>
          <li class="payment-item message"><span class="item-title">订单留言：</span>{{order.buyerMessage || '无'}}</li>
        </ul>
      </div>
      <p class="qb-feedback"><span class="item-title">乾币赠送：</span>本单赠送乾币<i class="primary">{{order.giveQb}}</i>个</p>
    </div>
    <!--显示发票-->
    <mt-popup v-model="popupVisible" popup-transition="popup-fade">
      <div class="invoice-title">发票详情</div>
      <ul :class="['invoice-list',{'no-invoice-info':invoice.invoiceHand}]">
        <li class="invoice-item" v-if="invoice.invoiceHand">不申请发票</li>
        <li class="invoice-item" v-if="invoice.invoiceStyle === '增值税发票'">发票类型：{{invoice.invoiceStyle}}</li>
        <li class="invoice-item" v-if="invoice.invoiceStyle === '普通发票'">发票类型：{{invoice.invoiceStyle}}</li>
        <li class="invoice-item" v-if="invoice.invoiceStyle === '普通发票'">发票性质：{{invoice.invoiceState}}</li>
        <li class="invoice-item" v-if="invoice.companyName ">单位名称：{{invoice.companyName}}</li>
        <li class="invoice-item" v-if="invoice.invoiceHead && invoice.invoiceState === '个人'">发票抬头：{{invoice.invoiceHead}}</li>
        <li class="invoice-item" v-if="invoice.invoiceHead && invoice.invoiceState === '公司'">公司抬头：{{invoice.invoiceHead}}</li>
        <li class="invoice-item" v-if="invoice.taxpayerNum">纳税人识别号：{{invoice.taxpayerNum}}</li>
        <li class="invoice-item" v-if="invoice.registeredAddress">注册地址：{{invoice.registeredAddress}}</li>
        <li class="invoice-item" v-if="invoice.registeredPhone">注册电话：{{invoice.registeredPhone}}</li>
        <li class="invoice-item" v-if="invoice.opneBank">开户银行：{{invoice.opneBank}}</li>
        <li class="invoice-item" v-if="invoice.opneBank">银行账号：{{invoice.bankNumber}}</li>
        <li class="invoice-item" v-if="invoice.stickNanme">收票人姓名：{{invoice.stickNanme}}</li>
        <li class="invoice-item" v-if="invoice.stickPhone">收票人手机号：{{invoice.stickPhone}}</li>
        <li class="invoice-item" v-if="invoice.stickaddress">收票人地址：{{invoice.stickaddress}}</li>
      </ul>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import {QUERY_ORDER_DEATILS, QUERY_ORDER_INVOICE} from '@vuex/types'
  import {Toast, Indicator, MessageBox} from 'mint-ui'
  import orderHeader from '../orderHeader.vue'
  import {mapState, mapActions} from 'vuex'
  import util from '@vuex/util'

  export default {
    name: 'orderDetail',
    data() {
      return {
        invoice: {},
        popupVisible: false,
        qbDes: []
      }
    },
    computed: {
      ...mapState({
        order: state => state.index.orderDetails
      }),
      createDate() {
//        return util.formatDate.format(new Date(this.order.created), 'yyyy-MM-dd hh:mm:ss')
        return this.order.created
      },
      receiverAddress() {
        let order = this.order
        return order.receiver.province + order.receiver.city + order.receiver.county + order.receiver.receiverDetail
      },
      payType() {
        if (!this.order.payType && this.order.payType !== 0) {
          return '无'
        }
        let payTypeText = ''
        switch (this.order.payType) {
          case 0:
            payTypeText = '支付宝支付'
            break
          case 1:
            payTypeText = '微信支付'
            break
          case 2:
            payTypeText = '银联支付'
            break
          case 3:
            payTypeText = '乾币支付'
            break
          default:
            break
        }
        return payTypeText
      },
      productRegister() {
        return this.order.isRegister === 0 ? '不需要产品注册证' : '需要产品注册证'
      }
    },
    filters: {
      transformMoney(val) {
        if (!val) return 0
        let temp = val.toString().split('.'),
          transMoney = ''
        if (temp.length === 1) {
          return (val + '.00')
        }
        transMoney = temp[1].length === 2 ? temp[1] : temp[1].toString().padEnd(2, '0')
        return `${temp[0]}.${transMoney}`
      }
    },
    methods: {
      ...mapActions({QUERY_ORDER_INVOICE}),
      async showInvoice() {
        let res = null
        Indicator.open()
        try {
          res = await this[QUERY_ORDER_INVOICE]({orderId: this.order.orderId})
        } catch (e) {
          Toast(e)
        }
        if (res.data.callStatus === 'SUCCEED') {
          Indicator.close();
          let invoice = res.data.data
          if (invoice) {
            if (invoice.invoiceStyle === '0') {
              //普通发票
              this.invoice = {
                invoiceStyle: '普通发票',
                invoiceState: (invoice.invoiceState === '1' ? '公司' : '个人'),
                taxpayerNum: (invoice.taxpayerNum ? invoice.taxpayerNum : undefined),
                invoiceHead: (invoice.companyName ? invoice.companyName : undefined)
              }
            } else {
              //增值税发票
              this.invoice = {
                //增值税发票
                invoiceStyle: '增值税发票',
                companyName: (invoice.companyName ? invoice.companyName : undefined),
                taxpayerNum: (invoice.taxpayerNum ? invoice.taxpayerNum : undefined),
                registeredAddress: (invoice.registeredAddress ? invoice.registeredAddress : undefined),
                registeredPhone: (invoice.registeredPhone ? invoice.registeredPhone : undefined),
                opneBank: (invoice.opneBank ? invoice.opneBank : undefined),
                //TODO 银行账号
                bankNumber: (invoice.bankNumber ? invoice.bankNumber : undefined),
                stickNanme: (invoice.stickNanme ? invoice.stickNanme : undefined),
                stickPhone: (invoice.stickPhone ? invoice.stickPhone : undefined),
                stickaddress: (invoice.stickaddress ? invoice.stickaddress : undefined),
              }
            }
          } else {
            this.invoice = {invoiceHand: '此订单未开发票'}
          }
        } else {
          Toast(res.msg)
        }
      },
      goDetails(good) {
        sessionStorage.setItem('backJudgeSL', 'order')
        this.$router.push({path: '/details/' + good.itemId, query: {name: good.itemInfo.itemName, itemId: good.itemId}});
        window.scroll(0, 0)
      }
    },
    created() {
      this.showInvoice()
      this.qbDes = this.order.qbDes.split(',').map(item => +item)
    },
    components: {
      orderHeader
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  .orderDetail-container {
    background-color: #f4f4f4;
    color: #333;
    font-size: px2vw(28);
    padding-bottom: px2vw(30);
    .receiver-info {
      box-sizing: border-box;
      padding: px2vw(103) px2vw(18) px2vw(20);
      background-color: #fff;
      margin-bottom: px2vw(22);
      .title {
        font-size: px2vw(30);
        color: #999999;
        padding-bottom: px2vw(10);
      }
      .receiver-item {
        margin-right: px2vw(30);
      }
    }
    .order-info {
      background-color: #fff;
      padding: px2vw(30) px2vw(18) px2vw(16);
      border-bottom: 1px solid $borderColor;
      .title {
        font-size: px2vw(30);
        color: #999999;
        padding-bottom: px2vw(10);
      }
      .order-item {
        line-height: px2vw(50);
        .item-title {
          color: #999999;
          width: auto;
        }
      }
    }
    .order-product {
      background-color: #fff;
      .order-state {
        padding: 0 px2vw(16);
        height: px2vw(76);
        line-height: px2vw(86);
      }
      .product-container {
        padding-bottom: px2vw(40);
        border-bottom: 1px solid $borderColor;
        .product-content {
          background-color: #f4f4f4;
          display: flex;
          padding: px2vw(12);
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
                width: px2vw(410);
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
                flex: 1;
                text-align: right;
                color: #d81e06;
              }
            }

            .product-detail-desc {
              flex: none;
              height: px2vw(30);
              display: flex;
              font-size: px2vw(24);
              color: #999999;
              .desc {
                flex: 1;
                // line-height: 1;
              }
              .num {
                flex: none;
              }
            }
          }
        }
      }
      .qb-info {
        box-sizing: border-box;
        height: px2vw(100);
        border-bottom: 1px solid $borderColor;
        .qb-style {
          float: left;
          margin-left: px2vw(30);
          height: px2vw(100);
          line-height: px2vw(120);
          .text {
            display: inline-block;
            position: relative;
            top: px2vw(-9);
            font-size: px2vw(26);
            height: px2vw(100);
          }
          .img {
            height: px2vw(40);
          }
        }
      }
      .order-price {
        text-align: right;
        font-size: px2vw(26);
        height: px2vw(84);
        line-height: px2vw(84);
        margin-bottom: px2vw(20);
        .price {
          color: #d81e06;
          font-size: px2vw(29);
        }
      }
    }
    .payment-info {
      background-color: #fff;
      margin-bottom: px2vw(20);
      .payment-item {
        padding: px2vw(40) px2vw(16) 0;
        &.message {
          padding-bottom: px2vw(40);
        }
      }
    }
    .qb-feedback {
      background-color: #fff;
      padding: 0 px2vw(16);
      height: px2vw(88);
      line-height: px2vw(88);
      margin-bottom: px2vw(0);
    }
    .item-title {
      display: inline-block;
      width: px2vw(200);
      color: #999;
    }
    .primary {
      font-style: normal;
      color: #3676b6;
      font-size: px2vw(29);
    }
    .muse-button {
      height: px2vw(50);
      font-size: px2vw(28);
      border-radius: px2vw(10);
      margin-left: px2vw(-10);
    }
    .no-invoice-text {
      margin-left: px2vw(-10);
    }
    .invoice-title {
      text-align: center;
      width: px2vw(600);
      line-height: px2vw(100);
      height: px2vw(100);
      border-bottom: 1px solid $borderColor;
      margin-bottom: px2vw(30);
    }
    .invoice-list {
      width: px2vw(600);
      min-height: px2vw(150);
      border-radius: px2vw(20);
      font-size: px2vw(28);
      padding-left: px2vw(40);
      line-height: px2vw(56);
      padding-bottom: px2vw(40);
      .invoice-item {

      }
      &.no-invoice-info {
        line-height: px2vw(150);
      }
    }
    .mint-popup {
      border-radius: px2vw(8);
    }
  }

</style>
