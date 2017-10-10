<template>
    <div>
      <div class="imgBackBoxs">
        <sales-header headerText="客户详情"></sales-header>
      </div>

      <!--头像开始-->
      <div class="headSculptureBox">
        <div class="SculptureBox">
          <img class="headSculpture" v-if="customerData.userPic" :src="customerData.userPic" alt="">
          <img class="headSculpture" src="../../../images/saleman/saleIndexHead.png" alt="" v-else>
        </div>
        <div class="headName">{{customerData.trueName}}</div>
      </div>
      <!--头像结束-->

      <!--详细信息开始-->

      <ul class="detailBox">
        <li class="imgBoxCircle">
          <img class="imgCircleFirst" src="../../../images/salesWap/customer/circle.png" alt="">
          <img class="imgCircleSecond" src="../../../images/salesWap/customer/circle.png" alt="">
        </li>

        <li>
          联系方式:&nbsp;{{customerData.phone}}
        </li>
        <li>
          单位名称:&nbsp;<span class="hospitalName">{{customerData.companyName}}</span>
        </li>
        <li>
          单位地址:&nbsp;<span class="hospitalName">{{customerData.workAddress}}</span>
        </li>
        <li>
          绑定时间:&nbsp; {{customerData.bindTime}}
        </li>
        <li>
          累计订单数:&nbsp;{{customerData.orderaCount}}
        </li>
        <li>
          累计消费&nbsp;(元)&nbsp;:&nbsp;{{customerData.orderaMoneyCount}}
        </li>
        <li>
          最近一次下单时间:&nbsp;{{customerData.latelyOrderDate}}
        </li>
        <li class="height_box"></li>
      </ul>
      <!--详细信息结束-->
      <div class="shadowBox"></div>
      <sales-footer bottomNav="customer"></sales-footer>
    </div>
</template>

<script>
  import salesHeader from '../salesHeader.vue'
  import salesFooter from '../salesFooter.vue'

  export default {
    name: 'customerDetails',
    data (){
      return{
        iphone: '',
        customerData: []
      }
    },
    created(){
      this.iphone = sessionStorage.getItem('iphone');
      this.getCustomerDetail();
    },
    destroyed(){
      sessionStorage.removeItem('iphone');
    },
    methods:{
      goback(){
//        this.$router.push({ path: '/myCustomer'})
        this.$router.go(-1)
      },
      getCustomerDetail(){
        let obj = {
          phone : this.iphone
        }
        this.$store.dispatch('sale/GET_CUSTOMER_DETAIL', obj).then((res) => {
            this.space(res)
            this.customerData = res
        })
      },
      space(res) {
          let data = res;
          if(data.trueName === null)
          {
            res['trueName'] = '暂无姓名'
          }
          if (data.phone === null) {
            res['phone'] = '暂无联系电话'
          }
          if (data.companyName === null) {
            res['companyName'] = '暂无单位名称'
          }
          if (data.workAddress === null) {
            res['workAddress'] = '暂无单位地址'
          }
          if (data.bindTime === null) {
            res['bindTime'] = '暂无单位名称'
          }
          if (data.bindTime === null) {
            res['bindTime'] = '暂无绑定'
          }
          if (data.orderaCount === null) {
            res['orderaCount'] = '暂无订单'
          }
          if (data.orderaMoneyCount === null) {
            res['orderaMoneyCount'] = '暂无消费'
          }
          if (data.latelyOrderDate === null) {
            res['latelyOrderDate'] = '暂无订单'
          }
//          if (data.userPic === null) {
//            res['userPic'] = '/static/img/topBackGround.4e3f36c.png'
//          }

      }
    },
    components: {
      salesHeader,
      salesFooter
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../common/sass/factory";


    .height_box{
      height: px2vw(10);
    }
    .imgBackBoxs {
      position: relative;
      width: 100vw;
    }
    .customerImgBack {
      height: px2vw(88);
      width: px2vw(75);
      float: left;
    }
    .ImgBack{
      position: absolute;
      top:px2vw(25);
      left: px2vw(19);
      width: px2vw(24);
      height: px2vw(40);
    }


    .salesHeader{
      position: static !important;
    }

    .headSculptureBox {
      border-bottom: px2vw(10) solid $borderColor;
      border-top: px2vw(10) solid $borderColor;
      width: 100vw;
      padding-top: px2vw(100);
      padding-bottom: px2vw(8);
      text-align: center;
      background-color: white;
    }

    .headSculpture {
      border-radius: 50%;
      border: px2vw(5) solid #ebebeb;
      width: px2vw(145);
      height: px2vw(145);
    }

    .headName {
      font-size: px2vw(36);
    }


    .detailBox {
      background-color: white;
      padding-left: px2vw(37);
      padding-right: px2vw(35);
      font-size: px2vw(30);
      box-shadow: 0 px2vw(8) px2vw(10) #acacac;
      -webkit-box-shadow: 0 px2vw(8) px2vw(10) #acacac;
      -moz-box-shadow: 0 px2vw(8) px2vw(10) #acacac;
    }
    .imgBoxCircle {
      height: px2vw(78);
    }
    .imgBoxCircle:after{
      content: '';
      display: block;
      clear: both;
    }
    .imgCircleFirst {
      margin-top: px2vw(27);
      margin-left: px2vw(22);
      float: left;
      width: px2vw(20);
      height: px2vw(20);
    }
    .imgCircleSecond {
      margin-top: px2vw(27);
      margin-right: px2vw(22);
      float: right;
      width: px2vw(20);
      height: px2vw(20);
    }
    .detailBox li:nth-child(n+2){
      margin-bottom: px2vw(24);
    }

    .shadowBox {
      position: fixed;
      top:0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: -2;
      background-color: #ebebeb;
    }

    .hospitalName {
      display: inline-block;
      width: px2vw(522);
      vertical-align: top;
    }
</style>

