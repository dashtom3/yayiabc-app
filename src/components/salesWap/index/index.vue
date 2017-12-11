<template>
  <div class="salesIndex" :class="{ bg_grey: noPerformance }">
    <div class="logIn_header">
      <span class="back-click-area" @click="goBack"></span>
      <span class="logWithCode">我的业绩</span>
    </div>
    <div class="content">
      <ul class="content_title">
        <li>历年累计收入:¥ {{orderData.allCommission}}</li>
        <li @click="handleStandard">创客收益标准?</li>
      </ul>
      <ul class="content_main clearfix">
        <li @click="openPicker('picker')">
          <h3>{{args.year}}年</h3>
          <div class="date_sel">
            <div class="month">
              <span>{{args.month}}月</span>
              <img src="../../../images/saleman/drop.png" alt="drop">
            </div>
          </div>
        </li>
        <li>
          <h3>实际销售总额</h3>
          <span>¥ {{orderData.saleAllMoney}}</span>
        </li>
        <li>
          <h3>耗材类</h3>
          <span>¥ {{orderData.haocaiAllMoney}}</span>
        </li>
        <li>
          <h3>工具设备类</h3>
          <span>¥ {{orderData.gongjuAllMoney}}</span>
        </li>
      </ul>
      <div id="myChart" :style="{ height: '50vw', margin: 'auto', position: 'relative', top: '5vw'}"
           v-show="!noPerformance"></div>
    </div>
    <!--无数据显示图片-->
    <div class="sales_index" v-show="noPerformance">
      <img src="../../../images/salesWap/index/myOrder.png" alt="暂无业绩">
      <p>本月暂无业绩</p>
    </div>


    <div :style="{'-webkit-overflow-scrolling': scrollMode}" v-show="!noPerformance">
      <mt-loadmore :bottom-method="loadBottom" class="loadmore" :auto-fill="false"
                   :bottom-all-loaded="args.currentPage == args.totalPage" ref="loadmore">
        <div class="sales_index_detail">
          <div class="detail_li">
            <ul class="detail_next_ul" v-for="(item, index) in orderList" :key="index">
              <li class="next_ul_li1">
                <div class="detail_img">
                  <img src="../../../images/saleman/saleIndexHead.png" v-if="!item.userPic" alt="headImg">
                  <img :src="item.userPic" alt="headImg" v-if="item.userPic">
                </div>
                <span class="detail_touch">{{item.userPhone + '（' + item.userName + '）'}}</span>
                <span class="detail_time">{{item.orderCreated}}</span>
              </li>
              <li class="next_ul_li2">
                <span class="li2_span1">实际销售总额（元）：{{item.actualMoney.toFixed(2)}}</span>
              </li>
              <li class="next_ul_li2">
                <span class="li2_span1">耗材类（元）：{{item.haocaiMoney.toFixed(2)}}</span>
                <span class="li2_span2" @click="orderDetailHandler(item.orderId, item.userPic)">查看详情></span>
              </li>
              <li class="next_ul_li2">
                <span class="li2_span1">工具设备类（元）：{{item.gongjuMoney.toFixed(2)}}</span>
              </li>
            </ul>
          </div>
        </div>
      </mt-loadmore>
    </div>
    <salesFooter bottomNav="achievement"></salesFooter>
    <!--<mt-datetime-picker-->
    <!--v-model="pickerValue"-->
    <!--ref="picker"-->
    <!--type="date"-->
    <!--:startDate="new Date(new Date().getFullYear(), 0, 1)"-->
    <!--:endDate="new Date(new Date().getFullYear()+10, 1, 1)"-->
    <!--year-format="{value} 年"-->
    <!--month-format="{value} 月"-->
    <!--@confirm="handleConfirm">-->
    <!--</mt-datetime-picker>-->
    <picker ref="picker" @dateChange="dateChange"></picker>

  </div>
</template>

<script>
  import salesFooter from '../salesFooter.vue'
  import checkedDate from './checkedDate.vue'
  import {Loadmore, Indicator} from 'mint-ui'
  import {tokenMethods} from '../../../vuex/util'
  import picker from './datePick.vue'
  import {GET_SALES_MY_ORDER, GET_SALES_ECHARTS, GET_SALES_ORDERLIST} from '@vuex/types'

  let echarts = require('../../../../node_modules/echarts/lib/echarts')
  // 引入折线图组件
  require('echarts/lib/chart/line');
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  export default {
    name: 'salesIndex',
    data() {
      return {
        orderData: {},
        args: {
          year: null,
          month: null,
          currentPage: 1,
          totalPage: null,
          pagesize: 10
        },
        dateSelect: '',
        pickerValue: '',
        orderPic: false,
        echartData: [],
        pagesize: 10,
        currentPage: 1,
        totalCount: 1,
        orderList: [],
        scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        maxEchartVal: 0,
        monthList: [],
        noPerformance: false
      }
    },
    components: {
      salesFooter,
      picker
    },
    created() {
      mui.back = function () {
        mui.confirm('确定要退出应用吗？', '牙医abc', ["确定", "取消"], function (e) {
          if (e.index === 0) {
            plus.runtime.quit();
          }
        });
        return false;
      };
      this.dateSelect = new Date().getFullYear() + '-' + this.fillZero(new Date().getMonth() + 1)
      this.args.year = this.dateSelect.split('-')[0]
      this.args.month = this.dateSelect.split('-')[1]
      this.queryHandler()
      this.loadPageList();
      for (var i = 0; i < 32; i++) {
        this.monthList.push(i)
      }
    },
    mounted() {
      this.echartPic()
    },
    watch: {
      echartData: function () {
        this.drawLine()
      }
    },
    methods: {
      dateChange(date) {
        this.args.year = date[0]
        this.args.month = date[1]
        this.queryHandler()
        this.orderList = []
        this.echartData = []
        this.echartPic()
        this.loadPageList()
      },
      handleStandard() {
        this.$router.push({path: '/standard'})
      },
      orderDetailHandler(orderId, userPic) {
        if (!userPic) {
          userPic = ''
        }
        this.$router.push({path: '/indexDetail', query: {orderId: orderId, userPic: userPic}})
      },
      drawLine() {
        var that = this;
        var myChart = document.getElementById('myChart');
        // 基于准备好的dom，初始化echarts实例
        var mainChart = echarts.getInstanceByDom(myChart);

        if (mainChart === undefined) {
          mainChart = echarts.init(myChart);
        }
        //自适应宽高
        var myChartContainer = function () {
          myChart.style.width = window.innerWidth + 'px';
        };
        myChartContainer();
        mainChart.clear();
        // 绘制图表
        mainChart.setOption({
          grid: {
            left: '3%',
            right: '4%',
            bottom: '6%',
            top: '8%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              //X轴刻度配置
              interval: 4 //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
            },
            data: this.monthList
          },
          yAxis: {
            type: 'value',
            splitLine: {
              show: false
            },
            max: this.maxEchartVal,
            min: 0,
            splitNumber: 10
          },
          series: [
            {
              name: '实际销售额（元）',
              type: 'line',
              data: this.echartData
            }
          ]
        });

        //浏览器大小改变时重置大小
        window.onresize = function () {
          myChartContainer();
        };
      },
      // 17621302939 13122390809
      loadBottom() {
        // 上拉加载
        this.args.currentPage += 1;
        this.loadPageList();
        this.$refs.loadmore.onBottomLoaded();
      },
      loadPageList() {
        this.$store.dispatch('sale/' + GET_SALES_ORDERLIST, this.args).then((res) => {
          if (res.data.length === 0) {
            this.noPerformance = true
          } else {
            this.noPerformance = false
          }
          this.orderList = this.orderList.concat(res.data);
          this.args.currentPage = res.currentPage
          this.args.totalPage = res.totalPage
          this.$nextTick(function () {
            this.scrollMode = "touch";
          });
        })
      },
      handleConfirm(val) {
        this.dateSelect = new Date(val).getFullYear() + '-' + this.fillZero(new Date(val).getMonth() + 1)
        this.args.year = this.dateSelect.split('-')[0]
        this.args.month = this.dateSelect.split('-')[1]
        this.queryHandler()
        this.orderList = []
        this.echartData = []
        this.echartPic()
        this.loadPageList();
      },
      fillZero(n) {
        return n < 10 ? '0' + n : n
      },
      //根据当前月份计算当月总天数
      getDaysInMonth(year, month) {
        month = parseInt(month, 10);
        var temp = new Date(year, month, 0);
        return temp.getDate();
      },
      //查询销售额
      echartPic() {
        let params = {
          year: this.args.year,
          month: this.args.month,
          token: tokenMethods.getSalesToken()
        }
        let day = 0
        let echartsArr = []
        this.echartData = []
        this.$store.dispatch('sale/' + GET_SALES_ECHARTS, params).then((res) => {
          if (res.callStatus === 'SUCCEED') {
            if (res.data.length === 0) {
              this.noPerformance = true
            } else {
              this.noPerformance = false
            }
            //是否为当前月份
            if (this.args.month === new Date().getMonth() + 1) {
              day = new Date().getDate() + 1
            } else {
              //找出最大天数
              day = this.getDaysInMonth(this.args.year, this.args.month) + 1
            }
            //初始化所有数据为0
            for (var j = 0; j < day; j++) {
              this.echartData.push({
                name: '(￥' + 0 + '， ' + 0 + '单)',
                value: 0
              })
            }

            //遍历数组替换初始化数据
            for (var i = 0; i < res.data.length; i++) {
              echartsArr.push(res.data[i].dayCommission)
              this.echartData.splice(new Date(res.data[i].created).getDate(), 1, {
                name: '(￥' + res.data[i].dayCommission + '， ' + res.data[i].dayOrderNum + '单)',
                value: res.data[i].dayCommission
              })
            }
            //根据数据设置一个最大值
            if (res.data.length) {
              this.maxEchartVal = Math.max.apply(null, echartsArr)
              this.maxEchartVal = (Math.ceil(this.maxEchartVal / 1000) * 1000) < 8000 ? 8000 : (Math.ceil(this.maxEchartVal / 1000) * 1000)
            } else {
              this.maxEchartVal = 8000
            }
          }
        })
      },
      queryHandler() {
        let params = {
          year: this.args.year,
          month: this.args.month
        }
        console.log(params)
        Indicator.open();
        this.$store.dispatch('sale/' + GET_SALES_MY_ORDER, params)
          .then(res => {
            this.orderData = res.data
          })
      },
      openPicker() {
        this.$refs.picker.open()
      },
      goBack() {
        this.$router.push({path: '/enterpriseRecord'})
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .logIn_header {
    padding-bottom: 0;
    position: fixed;
    z-index: 99;
    top: 0;
    .back-click-area {
      position: absolute;
      top: 0;
      height: 100%;
      left: 0;
      width: px2vw(150);
      background: url("../../../images/logIn/back.png") px2vw(20) center no-repeat;
      background-size: px2vw(18) px2vw(29);
    }
  }

  .logWithCode {
    font-size: px2vw(32);
  }

  .salesIndex .mu-dropDown-menu-text {
    width: 100%;
  }

  .salesIndex .mu-dropDown-menu-line {
    background: none;
  }

  .bg_grey {
    background: #e5e5e5 !important;
  }

  .salesIndex {
    background: #fff;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
  }

  .content {
    height: px2vw(210);
    width: 100%;
    background: #fff;
    margin-top: px2vw(88);
    border-top: px2vw(13) solid #e5e5e5;
  }

  .content_title {
    width: 100%;
    height: px2vw(80);
    overflow: hidden;
    border-bottom: px2vw(1) solid #e5e5e5;
    padding: 0 px2vw(20);
  }

  .content_title > li:nth-child(1) {
    float: left;
    color: #D81E06;
    height: 100%;
    line-height: px2vw(80);
  }

  .content_title > li:nth-child(2) {
    float: right;
    color: #317bbd;
    height: 100%;
    line-height: px2vw(80);
  }

  .loadmore {
    margin-top: px2vw(18);
  }

  .content_main {
    width: 100%;
    padding: px2vw(8) 0;
    border-bottom: px2vw(13) solid #e5e5e5;
    .date_sel {
      text-align: center;
      .month {
        position: relative;
        width: px2vw(100);
        margin: auto;
        span {
          padding-right: px2vw(28);
        }
      }
      img {
        width: px2vw(20);
        position: absolute;
        top: 50%;
        left: px2vw(70);
        transform: translateY(-50%);
      }
    }
  }

  .content_main > li {
    width: 25%;
    float: left;
    height: 100%;
    border-right: px2vw(2) solid #ddd;
    text-align: center;
    font-size: px2vw(26);
  }

  .content_main > li:last-child {
    border-right: none;
  }

  .content_main > li > h3 {
    height: 50%;
    font-weight: normal;
    line-height: px2vw(60);
    font-size: px2vw(26);
  }

  .content_main > li > span {
    display: block;
    font-size: px2vw(26);
  }

  .sales_index {
    width: px2vw(288);
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    img {
      width: px2vw(130);
    }
  }

  .sales_index_detail {
    width: 100%;
    border-top: px2vw(13) solid #e5e5e5;
    margin-top: px2vw(420);
    margin-bottom: px2vw(140);
    background: #fff;
  }

  .detail_li {
    width: px2vw(710);
    margin: 0 auto;
    padding: 0 px2vw(10);
  }

  .detail_next_ul {
    width: 100%;
    padding: px2vw(8) px2vw(13) px2vw(14) px2vw(13);
    border: px2vw(1) solid #dddddd;
    margin: px2vw(18) 0;
    .next_ul_li1 {
      height: px2vw(74);
    }
  }

  .detail_next_ul > li {
    width: 100%;
    height: px2vw(66);
    overflow: hidden;
  }

  .detail_img {
    width: px2vw(60);
    height: px2vw(60);
    border-radius: 50%;
    overflow: hidden;
    float: left;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .detail_touch {
    float: left;
    line-height: px2vw(40);
    font-size: px2vw(26);
    margin-top: px2vw(15);
    margin-left: px2vw(10);
    color: #333;
  }

  .detail_time {
    float: right;
    line-height: px2vw(40);
    font-size: px2vw(26);
    margin-top: px2vw(15);
    color: #666;
  }

  .next_ul_li1 {
    border-bottom: px2vw(1) solid #e5e5e5;
  }

  .li2_span1 {
    float: left;
    line-height: px2vw(40);
    margin-top: px2vw(15);
  }

  .li2_span2 {
    float: right;
    line-height: px2vw(40);
    margin-top: px2vw(15);
    color: #005aab;
  }
</style>
