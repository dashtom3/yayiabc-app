<template>
  <!--<div :class="['walletDetail-container',{'no-wallet-info':!walletDetail.length}]">-->
  <div :class="['walletDetail-container',{'no-wallet-info':!walletDetail.length}]">
    <sales-header headerText="钱包明细" component="walletdetails"></sales-header>
    <div class="walletDetail-picker-container">
      <div class="walletDetail-state-container">
        <p class="current-state" @click="(model  = true ) && (stateChange = true)">
          {{walletDetailParams.state ? (walletDetailParams.state + '明细') : '全部明细'}}&nbsp;&gt;</p>
        <ul class="walletDetail-state" v-show="stateChange">
          <li class="walletDetail-state-item" @click="changeState(1)">全部明细</li>
          <li class="walletDetail-state-item" @click="changeState(2)">进账明细</li>
          <li class="walletDetail-state-item" @click="changeState(3)">出账明细</li>
        </ul>
      </div>
      <div class="walletDetail-dataPicker">
        <span class="data-picker" @click="openPicker(true)">{{walletDetailParams.starTime}}</span>
        <span class="text">&nbsp;&nbsp;~&nbsp;&nbsp;</span>
        <span class="data-picker" @click="openPicker(false)">{{walletDetailParams.endTime}}</span>
      </div>
    </div>
    <div class="wallet-count-detail">
      <div class="wallet-count-in">
        <p>进账总额（元）</p>
        <p class="in-style">{{countDetail.jzze | transformMoney}}</p>
      </div>
      <div class="wallet-count-out">
        <p>出账总额（元）</p>
        <p class="out-style">{{countDetail.czze | transformMoney}}</p>
      </div>
    </div>
    <ul class="wallet-count-list">
      <li class="wallet-count-item" v-for="(item,index) in walletDetails"
          @click="gotoDetail(item.describey,item.time,item.balanceId)" :key="index">
        <p v-if="item.describey.slice(0,2) === '进账'" class="content">
          <span class="left in-style">进账</span><span class="right time">{{item.time}}</span>
        </p>
        <p class="content" v-else>
          <span class="left out-style">出账</span><span class="right time">{{item.time}}</span>
        </p>
        <p class="content" v-if="item.describey.slice(0,2) === '进账'">
          <span class="left">余额（元）：{{item.balance | transformMoney}}</span><span
          class="right in-style">+{{item.balanceIn}}</span>
        </p>
        <p class="content" v-else>
          <span class="left">余额（元）：{{item.balance | transformMoney}}</span><span
          class="right out-style">-{{item.balanceOut}}</span>
        </p>
      </li>
    </ul>
    <div class="model" v-show="model" @click="!(model  = false ) && !(stateChange = false)"></div>
    <data-picker ref="datePicker" @datechange="changeDate"></data-picker>
  </div>
</template>

<script type="text/ecmascript-6">
  import salesHeader from '../../salesHeader.vue'
  import {mapActions, mapMutations} from 'vuex'

  import {Toast, Indicator, MessageBox} from 'mint-ui'
  import {GET_WALLET_DETAIL, SAVE_BALANCE_ID} from '@vuex/types'
  import dataPicker from '../dataPicker.vue'
  import utils from '@vuex/util'

  export default {
    name: 'walletDetail',
    data() {
      return {
        walletDetailParams: {
          starTime: '',
          endTime: '',
          state: '',
          currentPage: 1,
          numberPerPage: 10
        },
        model: false,
        stateChange: false,
        walletDetail: [],
        countDetail: {}
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
    computed: {
      walletDetails() {
        // console.log(this.walletDetail)
        if (!this.walletDetail) return
        let format = utils.transformDate
        return this.walletDetail.map((item, index) => {
          let d = format(new Date(item.created))
          // let a = format(new Date(item.adoptTime))
          if (item.adoptTime === null) {
            return {...item, time: `${d.year}年${d.month}月${d.date}日 ${d.hours}:${d.minutes}:${d.date}`}
          } else {
            let a = format(new Date(item.adoptTime))
            return {...item, time: `${a.year}年${a.month}月${a.date}日 ${a.hours}:${a.minutes}:${a.date}`}
          }
        })
      }
    },
    components: {salesHeader, dataPicker},
    methods: {
      ...mapActions('sale', {
        GET_WALLET_DETAIL
      }),
      ...mapMutations('sale', {
        SAVE_BALANCE_ID
      }),
      openPicker(isStart) {
        if (isStart) {
          this.isFirstDate = true
          this.$refs.datePicker.setStartDate(new Date(new Date().getFullYear() - 1, 1, 1))
        } else {
          this.isFirstDate = false
          let d = new Date(this.walletDetailParams.starTime)
          this.$refs.datePicker.setStartDate(new Date(d.getFullYear(), d.getMonth(), d.getDate()))
        }
        this.$refs.datePicker.open()
      },
      changeDate(e) {
        if (this.isFirstDate === true) {
          this.$set(this.walletDetailParams, 'starTime', e)
        } else {
          this.$set(this.walletDetailParams, 'endTime', e)
        }
        Indicator.open()
        this.fetchData()
      },
      async changeState(state) {
        this.model = false
        switch (state) {
          case 1:
            this.walletDetailParams.state = ''
            break
          case 2:
            this.walletDetailParams.state = '进账'
            break
          case 3:
            this.walletDetailParams.state = '出账'
            break
          default:
            break
        }
        //修改参数
        let params = this.walletDetailParams
        this.stateChange = false
        Indicator.open()
        this.fetchData()
      },
      gotoDetail(type, time, id) {
        this.$router.push({path: '/salePersonal/billDetails/', query: {type: type, time: time, id: id}})
      },
      async fetchData(param = this.walletDetailParams) {
        let res = await this[GET_WALLET_DETAIL](param).catch(e => Toast(e))
        this.walletDetail = res.data
        if (!res.data.length) {
          this.countDetail = {
            jzze: 0,
            czze: 0
          }
        } else {
          this.countDetail = {
            jzze: res.data[0].jzze,
            czze: res.data[0].czze
          }
        }
      }
    },
    created() {
      //初始化时间请求参数
      let d = new Date()
      let startD = utils.transformDate(new Date())
      let endD = utils.transformDate(new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()))
      this.$set(this.walletDetailParams, 'starTime', `${startD.year}-${startD.month}-01`)
      this.$set(this.walletDetailParams, 'endTime', `${endD.year}-${endD.month}-${startD.date}`)
      //发送请求
      Indicator.open()
      this.fetchData()
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  .walletDetail-container {
    background-color: #e5e5e5;
    width: 100%;
    &.no-wallet-info {
      background-image: url("../../../../images/salePersonal/noWallet.png");
      background-position: center center;
      background-repeat: no-repeat;
      background-size: px2vw(121) px2vw(172);
    }
    min-height: 100vh;
    padding-top: px2vw(88);
    .walletDetail-picker-container {
      position: relative;
      background-color: #fff;
      height: px2vw(120);
      padding: 0 px2vw(25);
      box-shadow: 0 px2vw(5) px2vw(5) 0 rgba(0, 0, 0, 0.12);
      border-bottom: px2vw(1) solid $borderColor;
      @at-root .walletDetail-state-container {
        position: relative;
        font-size: px2vw(24);
        line-height: px2vw(120);
        float: right;
        padding-right: px2vw(30);
        .walletDetail-state {
          background-color: #fff;
          position: absolute;
          top: px2vw(100);
          right: px2vw(-10);
          width: px2vw(180);
          text-align: center;
          box-shadow: 0 px2vw(1) px2vw(5) 0 rgba(0, 0, 0, 0.2);
          z-index: 100;
          .walletDetail-state-item {
            height: px2vw(80);
            line-height: px2vw(80);
          }
          &:after {
            content: '';
            position: absolute;
            top: px2vw(-30);
            left: px2vw(75);
            width: 0;
            height: 0;
            border: px2vw(16) solid transparent;
            border-bottom-color: #f4f4f4;
          }
        }
      }
      @at-root .walletDetail-dataPicker {
        @include clearfix;
        .data-picker {
          position: relative;
          margin-top: px2vw(36);
          float: left;
          width: px2vw(190);
          height: px2vw(44);
          line-height: px2vw(44);
          background-color: #f4f4f4;
          border-radius: px2vw(10);
          font-size: px2vw(24);
          white-space: nowrap;
          padding: 0 px2vw(12);
          &:after {
            content: '';
            position: absolute;
            top: px2vw(12);
            right: px2vw(16);
            width: px2vw(23);
            height: px2vw(21);
            background: url("../../../../images/salePersonal/日期.png") no-repeat;
            background-size: cover;
          }
        }

        .text {
          float: left;
          line-height: px2vw(120);
        }
      }
    }
    .wallet-count-detail {
      margin-bottom: px2vw(10);
      height: px2vw(174);
      padding: px2vw(36) 0;
      background-color: #fff;
      display: flex;
      font-size: px2vw(30);
      line-height: 1.8;
      text-align: center;
      @at-root .wallet-count-in {
        flex: 1;
        border-right: 1px solid #7facd5;
        .in-style {
          font-size: px2vw(28);
        }
      }
      .wallet-count-out {
        flex: 1;
        .out-style {
          font-size: px2vw(28);
        }
      }

    }
    .wallet-count-list {
      @at-root .wallet-count-item {
        background-color: #fff;
        height: px2vw(130);
        padding: 0 px2vw(20);
        margin-bottom: px2vw(10);
        font-size: px2vw(30);
        .content {
          @include clearfix;
          line-height: px2vw(65);
          .left {
            &.in-style, &.out-style {
              font-size: px2vw(28);
            }
          }
          .time {
            font-size: px2vw(24);
            color: #666;
          }
        }

        @at-root .left {
          float: left;
        }
        @at-root .right {
          float: right;
        }
      }
    }

    .model {
      position: fixed;
      display: flex;
      top: 0;
      width: 100vw;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, .2);
      z-index: 99;
    }
    .in-style {
      color: $ckThemeColor;
    }
    .out-style {
      color: $ckOutColor;
    }
  }
</style>
