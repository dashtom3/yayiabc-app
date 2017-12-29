<template>
  <div class="indexDetail">
    <!--头部-->
    <div class="header_top">
      <div class="header_btn" @click="back">
        <img class="header_img" src="../../../images/logIn/back3.png" alt="back">
      </div>
      <div class="header">
        业绩详情
      </div>
    </div>
    <div class="kehuInfo customer title_1">客户信息</div>
    <div class="div1">
      <div class="div1_img1">
        <img :src="userPic" alt="headImg" v-if="userPic!==''">
        <img src="../../../images/saleman/saleIndexHead.png" v-else alt="headImg">
      </div>
      <span class="div1_span">{{detailObj.userPhone + '（' + detailObj.userName + '）'}}</span>
    </div>
    <div class="kehuInfo orderInfo">订单信息</div>
    <div class="detail_info">
      <div class="info_div1">
        <span>下单时间：{{detailObj.orderCreated}}</span>
        <span>订单状态：{{orderState}}</span>
      </div>
      <ul class="detail_ul" v-for="(item, index) in detailObj.orderInfoVoList" :key="index">
        <li>
          <div class="detail_li_div1">
            <img :src="item.picPath" alt="picPath">
          </div>
          <div class="detail_li_spans">
            <p class="detail_li_span1">
              {{item.itemName}}
            </p>
            <p class="detail_li_span1">
              <span>{{item.itemPropertyNamea}}</span><span v-if="item.itemPropertyNameb">;</span>
              <span>{{item.itemPropertyNameb}}</span><span v-if="item.itemPropertyNamec">;</span>
              <span>{{item.itemPropertyNamec}}</span>
            </p>
            <p class="detail_li_span2">
              ￥{{item.price}}*{{item.num}}
            </p>
          </div>
        </li>
      </ul>
      <div class="detail_li_footer">
        <span>商品总价：￥</span>
        <span>{{sumAmt}}</span>
      </div>
      <div class="kehuInfo orderDetail">订单明细</div>
      <table class="tableInfo">
        <tr class="first_tr">
          <td class="gongJu" style="border-left: none!important;"></td>
          <td>销售额（元）</td>
          <td>已退款金额（元）</td>
          <td style="border-right: none!important;">实际销售额（元）</td>
        </tr>
        <tr>
          <td style="border-left: none!important;">耗材类</td>
          <td>{{orderDetailList[0].orderMoneyHaocai}}</td>
          <td>{{orderDetailList[0].refundMoneyHaocai}}</td>
          <td style="border-right: none!important;">{{orderDetailList[0].actualMoneyHaocai}}</td>
        </tr>
        <tr>
          <td style="border-left: none!important;">工具设备类</td>
          <td>{{orderDetailList[1].orderMoneyGongju}}</td>
          <td>{{orderDetailList[1].refundMoneyGongju}}</td>
          <td style="border-right: none!important;">{{orderDetailList[1].actualMoneyGongju}}</td>
        </tr>
        <tr>
          <td style="border-left: none!important;">合计</td>
          <td>{{sumOrderMoney}}</td>
          <td>{{sumRefundMoney}}</td>
          <td style="border-right: none!important;">{{sumActualMoney}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
    import { Indicator } from 'mint-ui'
    import { GET_SALES_ORDERDETAIL } from '@vuex/types'
    export default {
      name: 'indexDetail',
      data(){
        return {
          orderId: this.$route.query.orderId,
          userPic: this.$route.query.userPic,
          detailObj: {},
          sumAmt: 0,
          sumOrderMoney: 0,
          sumRefundMoney: 0,
          sumActualMoney: 0,
          orderDetailList: [{
            itemName: '耗材类',
            salesAmt: 0,
            refundAmt: 0,
            realSaleAmt: 0
          },
          {
            itemName: '工具设备类',
            salesAmt: 0,
            refundAmt: 0,
            realSaleAmt: 0
          }],
        }
      },
      created(){
        this.queryDetailHandler()
      },
      computed: {
        orderState: function(){
          if(this.detailObj.orderState === '1'){
            return '等待买家付款'
          }else if(this.detailObj.orderState === '2'){
            return '买家已付款'
          }else if(this.detailObj.orderState === '3'){
            return '卖家已发货'
          }else if(this.detailObj.orderState === '4'){
            return '交易成功'
          }else if(this.detailObj.orderState === '5'){
            return '订单已确认'
          }else if(this.detailObj.orderState === '5'){
            return '退货中'
          }else if(this.detailObj.orderState === '9'){
            return '交易成功'
          }else if(this.detailObj.orderState === '0'){
            return '交易关闭'
          }
        }
      },
      methods:{
        queryDetailHandler(){
          var that = this;
          let params = {
            orderId: this.orderId,
          }
          Indicator.open();
          this.$store.dispatch('sale/'+ GET_SALES_ORDERDETAIL, params).then((res) => {
            if (res.callStatus === 'SUCCEED') { 
              this.detailObj = res.data
              this.infoList = res.data.orderInfoVoList
              that.sumAmt = 0
              that.sumOrderMoney = 0
              that.sumRefundMoney = 0
              that.sumActualMoney = 0
              //计算商品总价
              for(var i=0;i<this.infoList.length;i++){
                that.sumAmt += this.infoList[i].total
              }
              
              this.orderDetailList[0] = {
                itemName: '耗材类',
                orderMoneyHaocai: res.data.orderMoneyHaocai,
                refundMoneyHaocai: res.data.refundMoneyHaocai,
                actualMoneyHaocai: res.data.actualMoneyHaocai
              }
              this.orderDetailList[1] = {
                itemName: '工具设备类',
                orderMoneyGongju: res.data.orderMoneyGongju,
                refundMoneyGongju: res.data.refundMoneyGongju,
                actualMoneyGongju: res.data.actualMoneyGongju
              }
              //合计
              that.sumOrderMoney = this.orderDetailList[0].orderMoneyHaocai + this.orderDetailList[1].orderMoneyGongju
              that.sumRefundMoney = this.orderDetailList[0].refundMoneyHaocai + this.orderDetailList[1].refundMoneyGongju
              that.sumActualMoney = this.orderDetailList[0].actualMoneyHaocai + this.orderDetailList[1].actualMoneyGongju
              Indicator.close();
            }
          })   
        },
        back(){
          this.$router.go(-1);
        }
      }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../common/sass/factory";
    .first_tr td{
      border-top: none!important;
    }
    .gongJu{
      width: px2vw(160); 
    }
    .tableInfo{
      width: 100%;
      height: px2vw(295);
      border-collapse: collapse;
      td{
        border: px2vw(1) solid #e5e5e5;
        text-align: center;
      }
    }
    .indexDetail{
      background: #e5e5e5;
    }
    .header_top {
      width: 100%;
      height: px2vw(88);
      line-height: px2vw(88);
      background-color: $themeColor;
      margin-bottom: px2vw(10);
      position: fixed;
      top: 0;
      z-index: 99;
    }
    .header_btn{
      width: px2vw(88);
      height:  px2vw(88);
    }
    .header_img {
      width: px2vw(19);
      height:  px2vw(31);
      margin-left: 2vw;
      margin-top: 4vw;
      float: left;
    }
    .header{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 80vw;
      height: px2vw(88);
      line-height: px2vw(88);
      display: inline-block;
      text-align: center;
      font-size: 4.26667vw;
      color: white;
    }
    .customer{
      background: url(../../../images/saleman/person.png) no-repeat, #fff;
      background-size: px2vw(21);
      background-position: px2vw(21) center;
    }
    .orderInfo{
      background: url(../../../images/saleman/book.png) no-repeat, #fff;
      background-size: px2vw(24);
      background-position: px2vw(21) center;
    }
    .orderDetail{
      background: url(../../../images/saleman/order.png) no-repeat, #fff;
      background-size: px2vw(24);
      background-position: px2vw(21) center;
    }
  .kehuInfo{
    color: #999;
    height: px2vw(70);
    border-bottom: px2vw(1) solid #E5E5E5;
    line-height: px2vw(70);
    padding-left: px2vw(54);
    font-size: px2vw(26);
  }
  .div1{
    height: px2vw(106);
    width: 100%;
    background: white;
    padding: 0 px2vw(20);
    margin-bottom: px2vw(13);
  }
  .title_1{
    margin-top: px2vw(88);
  }
  .div1_img1{
    float: left;
    width: px2vw(66);
    height: px2vw(66);
    border-radius: 50%;
    overflow: hidden;
    margin-top: px2vw(20);
    img{
      width: 100%;
      height: 100%;
    }
  }
  .div1_span{
    float: left;
    line-height: px2vw(46);
    margin-top: px2vw(30);
    margin-left: px2vw(14);
  }
  .detail_info{
    width: 100%;
    height: auto;
    background: #fff;
    margin-bottom: px2vw(130);
  }
  .info_div1{
    width: 100%;
    height: px2vw(60);
    line-height: px2vw(78);
    padding: 0 px2vw(20);
  }
  .info_div1>span:nth-child(1){
    float: left;
    font-size: px2vw(26);
    line-height: px2vw(40);
    margin-top: px2vw(16);
    color: #666;
  }
    .info_div1>span:nth-child(2){
    float: right;
    font-size: px2vw(26);
    line-height: px2vw(40);
    margin-top: px2vw(16);
    color: #666;
  }
  .detail_ul{
    width: 100%;
  }
  .detail_ul>li{
    height: px2vw(160);
    border-bottom: px2vw(1) solid #E5E5E5;
    padding: px2vw(15) px2vw(20);
    position: relative;
  }
  .detail_li_div1{
    float: left;
    width: px2vw(130);
    height: px2vw(130);
    overflow: hidden;
    border: px2vw(1) solid #E5E5E5;
    img{
      width: px2vw(130);
      height: px2vw(130);
    }
  }
  .detail_li_spans{
    float: left;
    padding-left: px2vw(28);
  }
  .detail_li_span1{
    width: px2vw(330);
    text-align: left;
    font-size: px2vw(28);
  }
  .detail_li_span2{
    font-size: px2vw(28);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: px2vw(20);
  }
  .detail_li_footer{
    height: px2vw(98);
    line-height: px2vw(85);
    color: #ab0000;
    text-align: right;
    padding-right: px2vw(20);
    border-bottom: px2vw(13) solid #e5e5e5;
  }
</style>
