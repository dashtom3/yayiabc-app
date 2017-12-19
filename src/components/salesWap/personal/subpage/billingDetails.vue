<template>
  <div class="billingContent">
    <sales-header headerText="详情" class="headers"></sales-header>
    <div class="tableDiv" v-show="this.type.substring(0,6) === '进账每月结算'">
      <table cellspacing="0">
        <tr class="table_title">
          <th>{{time}}</th>
          <th>耗材类</th>
          <th>工具设备类</th>
          <th>合计</th>
        </tr>
        <tr class="table_detail">
          <td>销售额（元）</td>
          <td>{{datas.haocaiMoney}}</td>
          <td>{{datas.gongjuMoney}}</td>
          <td>{{totalMoney}}</td>
        </tr>
        <tr>
          <td>已退款金额（元）</td>
          <td>{{datas.haocaiRefund}}</td>
          <td>{{datas.gongjuRefund}}</td>
          <td>{{totalRefund}}</td>
        </tr>
        <tr>
          <td>实际销售额（元）</td>
          <td>{{datas.haoCaiIncome}}</td>
          <td>{{datas.gongJuIncome}}</td>
          <td>{{totalIncome}}</td>
        </tr>
        <tr class="last-tr">
          <td>收入（元）</td>
          <td>{{totalHaocai}}</td>
          <td>{{totalGongju}}</td>
          <td>{{totalGetMoney}}</td>
        </tr>
      </table>
    </div>
    <div class="other" v-show="this.type.substring(0,7) === '进账管理员增加'">
      <p>管理员增加￥{{balanceIn}}</p>
      <p class="times">{{dateWith}}</p>
    </div>
    <div class="other" v-show="this.type.substring(0,6) === '出账提现成功'">
      <p>提现￥{{balanceOut}}</p>
      <p class="times">{{dateWith}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import salesHeader from '../../salesHeader.vue'
  import {mapActions} from 'vuex'
  import {POST_BILL_DETAIL} from '@vuex/types'
  import utils from '@vuex/util'

  export default {
    name: 'billDetails',
    data() {
      return {
        type: '',
        time: '',
        oldDatas :[],
        datas:{
          haocaiMoney:'',
          haocaiRefund:'',
          haoCaiIncome:'',
          gongjuMoney:'',
          gongjuRefund:'',
          gongJuIncome:'',
        },
        totalMoney:'',
        totalRefund:'',
        totalIncome:'',
        totalHaocai : 0,
        totalGongju : 0,
        totalGetMoney:'',
        balanceIn: 0,
        balanceOut: 0,
        dateWith:''
      }
    },
    components: {
      salesHeader,
    },
    computed: {
      ...mapActions('sale', {
        POST_BILL_DETAIL
      }),
    },
    created() {
      this.type = this.$route.query.type;
      this.time = this.$route.query.time;
      this.balanceId = this.$route.query.id;
      let format = utils.transformDate;
      this.$store.dispatch('sale/POST_BILL_DETAIL', {balanceId: this.balanceId}).then(res => {
        console.log(res.data);
        this.oldDatas = [
          res.data.haocaiMoney,
          res.data.haocaiRefund,
          res.data.haoCaiIncome,
          res.data.gongjuMoney,
          res.data.gongjuRefund,
          res.data.gongJuIncome
        ]
        this.balanceIn = res.data.balanceIn;
        this.balanceOut = res.data.balanceOut;
        for(let i in this.datas){
          this.$set(this.datas,i, this.returnFloat(this.oldDatas[i]))
        }
        this.totalHaocai = this.haocaiIn(this.datas.haoCaiIncome);
        this.totalGongju = this.gongjuIn(this.datas.gongJuIncome);
        this.totalMoney = this.getTotal(this.datas.haocaiMoney,this.datas.gongjuMoney);
        this.totalRefund = this.getTotal(this.datas.haocaiRefund,this.datas.gongjuRefund);
        this.totalIncome = this.getTotal(this.datas.haoCaiIncome,this.datas.gongJuIncome);
        this.totalGetMoney = this.getTotal(this.totalHaocai,this.totalGongju);
        //其他部分
        let d = format(new Date(res.data.created))
        this.dateWith = d.year + '-' + d.month + '-' + d.date + ' ' + d.hours + ':' + d.minutes + ':' + d.seconds
      });
    },
    methods:{
      returnFloat(num){
        let value = num;
        if(!value){
          value = 0
        }
        value=Math.round(parseFloat(value)*100)/100;
        let xsd=value.toString().split(".");
        if(xsd.length==1){
          value=value.toString()+".00";
          return value;
        }
        if(xsd.length>1){
          if(xsd[1].length<2){
            value=value.toString()+"0";
            console.log(value)
          }
          return value;
        }
      },
      getTotal(num1,num2){
        let num = num1 +num2;
        return this.returnFloat(num);
      },
      haocaiIn(income){
        let total = 0;
        switch (true){
          case income < 1000 && income >=0:total = income * 0.05;break;
          case income < 2000 && income >=1000:total = income * 0.08;break;
          case income < 3000 && income >=2000:total = income * 0.12;break;
          case income >=3000:total = income * 0.16;break;
        }
        return this.returnFloat(total);
      },
      gongjuIn(income){
        let total = 0;
        switch (true){
          case income < 10000 && income >=0:total = income * 0.08;break;
          case income >= 10000:total = income * 0.15;break;
        }
        return this.returnFloat(total)
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  .headers{
    border-bottom: px2vw(10) solid #e5e5e5;
  }
  .billingContent{
    width: 100%;
    .tableDiv{
      margin-top: px2vw(120);
      table{
        font-size: px2vw(24);
        margin: 0 auto;
        tr{
          height: px2vw(79);
          td{
            text-align: center;
            border-right: px2vw(1) solid #e5e5e5;
            border-bottom: px2vw(1) solid #e5e5e5;
          }
          td:nth-child(1){
            border-left: px2vw(1) solid #e5e5e5;
            text-align: right;
          }
        }
        .table_title{
          color: #fff;
          th{
            width: px2vw(169);
            background-color: #3882c4;
            border-right: px2vw(1) solid #fff;
          }
          th:nth-child(1){
            width: px2vw(198);
            background-color: #3882c4;
            font-size: px2vw(22);
          }
        }
        .last-tr{
          font-size: px2vw(28);
          color: #3676b6;
        }
      }

    }
  }
  .other{
    margin-top: px2vw(150);
    font-size: px2vw(36);
    color: #666;
    text-align: center;
    .times{
      font-size: px2vw(24);
      color: #999;
      margin-top: px2vw(40);
    }
  }
</style>
