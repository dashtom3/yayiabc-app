<template>
  <div class="top_top" :class="{'fixed':dialog == true}">
    <div class="wrap_box">
      <div class="header">
        <div class="header_img" @click="toSuborder">
          <img src="../../../images/logIn/back.png" alt="">
        </div>
        <span>发票信息</span>
        <div class="invoice_know">
          <mu-raised-button label="发票须知" rippleColor="withe" class="invoice_know_button" @click="open"/>
          <mu-dialog :open="dialog" >
            <div class="invoice_know_zy">发票须知</div>
            <div class="invoice_know_body">
              一、 开具发票注意事项：<br>
              1. 通过牙医ABC（www.yayiabc.com）订购商品，您可选择开具发票。<br>
              2. 牙医ABC可提供普通发票和增值税专用发票两种，皆可用作单位报销使用。每个订单只能选择一种发票。 您在开具普通发票，选择发票性质为“个人”时，发票抬头为“个人”两字，如需开具公司名称，请选择发票性质为“公司”，填写名称必须和营业执照上的公司名称一致，且必须填写企业纳税识别号或统一社会信用代码；<br>
              3. 订单中未指定何种发票或不需发票的，我们将随商品为您开具“发货单”以使您的售后服务得以保障；<br>
              4. 如需开增值税专用发票，您需提供一般纳税人资格，并提交详细的开票信息。专票在10个工作日内寄出（免快递费）。<br>
              5. 发票金额包含：下单时，乾币（购买途径获得的）支付的金额，但不包含运费金额。<br>
              6. 发票内容：按20170701新规，按所购商品开具明细。<br>
              7. 补开、更换发票：<br>
              a. 补开发票以当月订单为准，即只可补开当月发票；<br>
              b. 因发票抬头、内容或金额等情形需更换发票时，请您与牙医ABC客服中心联系确认，并将"发货单及发票联退回"，我们收到后将予以重开;<br>
              c. 请您提供正确的发票收件地址，我们会在补开、更换发票后以快递的方式为您寄出，请注意查收；<br>
              d. 若因客户个人原因导致更换或补开发票，需由客户承担发票快递费用；<br>
              e. 因客户个人原因导致发票丢失、作废或失效，一般不予重开;<br>
              二、 增值税专用发票：<br>
              增值税专用发票是由国家税务总局监制设计印制的，只限于增值税一般纳税人领购使用的，既作为纳税人反映经济活动中的重要会计凭证又是兼记销货方纳税义务和购货方进项税额的合法证明；是增值税计算和管理中重要的决定性的合法的专用发票。（如何开具专用发票：企业需要提供一般纳税人资质证明方可开具）<br>
              二、 发票信息相关问题<br>
              1) 为什么我的发票金额和我的订单金额不一致？<br>
              发票金额一般是您本次的实际支付金额。乾币抵扣不开发票。<br>
              2) 收到商品为何没有发票？<br>
              a. 如开具的是普通发票，建议您先在包裹里仔细查找，若发现无发票，请您联系牙医<br>
              ABC客服为您查询处理发票事宜。<br>
              b. 如开具的是增值税专用发票，建议您先在包裹里仔细查找，若发现确实无发票或遗失，请提供一份纸质的发票遗失证明加盖公章，请您联系牙医ABC客服为您查询处理发票事宜。<br>
              3) 怎么换发票？<br>
              您在收到发票后，如果发现因商家原因所致票据抬头、内容错误，请在自开票日期起60日内联系客服人员为您安排办理换发票事宜，往返快递费用由责任方承担。<br>
              您可将发票寄到以下地址：<br>
              收件人：牙医ABC<br>
              联系方式：400-001-4980<br>
              地址：（详细地址请联系客服）
            </div>
            <mu-flat-button class="invoice_know_close" label="我知道了" slot="actions" primary @click="close"/>
          </mu-dialog>
        </div>
      </div>
    </div>

    <div>
      <div class="border_bottom">
      <mu-tabs class="tab_box" :value="activeTab" @change="handleTabChange">
        <mu-tab class="tab1" value="0" title="普通发票"/>
        <mu-tab class="tab2" value="1" title="增值税发票"/>
      </mu-tabs>
      </div>
      <div v-if="activeTab === '0'">
        <div class="person">
          <span class="invoice_nature">发票性质</span>
          <span class="radio_tab1">
          <mu-radio name="group" nativeValue="1" v-model="tab" />
          </span>
          <span class="company" :class="{'company_color': tab == 1}">公司</span>
          <span class="radio_tab2">
          <mu-radio name="group" nativeValue="0" v-model="tab"/>
          </span>
          <span class="person_1" :class="{'company_color': tab == 0}">个人</span>
        </div>
        <div v-show="tab == 1">
        <div class="_boxCompany" >
          <span class="_headerCompany">公司抬头*</span>
          <input class="_inputCompany" v-model="companyName1" type="text">
        </div>
          <div class="num_box">
            <span>纳税人识别号*</span>
            <input v-model="taxpayerNum" type="text">
          </div>
          <div class="content">
            <span class="font_content">发票内容</span>
            <span class="font_coin">发票明细</span>
          </div>
        </div>
        <div class="person_box" v-show="tab == 0">
          <div>
            <div class="company_box " >
              <span class="company_header">发票抬头*</span>
              <input v-model="companyName2" type="text">
            </div>
            <div class="content contents">
              <span class="font_content">发票内容</span>
              <span class="font_coin">发票明细</span>
            </div>
          </div>
        </div>
        <div class="button_box">
          <mu-raised-button label="保存" class="save_button" @click="saveInvoice"/>
          <mu-raised-button label="不开发票" class="no_save" @click="no_saves" />
        </div>
      </div>
      <div v-show="activeTab === '1'">
        <tax-invoice ref="childMethod"></tax-invoice>
      </div>
      <!--<mu-dialog :open="backlog" @close="backClose">-->
        <!--<div class="log">注意</div>-->
        <!--<div class="log_log">-->
          <!--确定退出发票编辑吗<br>-->
          <!--如果选择确定则视为不开发票-->
        <!--</div>-->
        <!--<mu-flat-button class="log_button_close" slot="actions" @click="backClose" primary label="取消"/>-->
        <!--<mu-flat-button class="log_button1_open" slot="actions" primary @click="tobackClose" label="确定"/>-->
      <!--</mu-dialog>-->
    </div>
    <!--末尾-->
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import { Toast } from 'mint-ui';
  import taxInvoice from './taxInvoice.vue';
  export default {
    name: 'invoice',
    data () {
      return {
        activeTab: '0', //普通发票0  增值税发票1
        tab: '1', //公司发票 1  个人发票 0
        invoiceHand: '', //是否开发票 开发票为1，不开发票为0
        companyName1 : '',//公司抬头
        companyName2 : '',//个人抬头
        taxpayerNum: '', //纳税人识别号
        dialog: false,//发票须知窗开关
        backlog : false
      }
    },
    created (){
      this.mBack('toSuborder');
      this.activeTab = this.COMPANY_INVOICE.invoiceStyle.toString();
      if (this.COMPANY_INVOICE.invoiceStyle == '0') {
        setTimeout(() => {
          this.judgeIsSaveed();
        }, 20)
      } else {
        setTimeout(() => {
          this.$refs.childMethod.judgeIsSaveed();
        }, 20)
      }
      // this.judgeIsSaveed();
    },
    mounted (){
    //  this.$refs.childMethod.judgeIsSaveed();
    },
    computed:{
      ...mapGetters([
        'COMPANY_INVOICE', //获取普通公司发票信息
      ]),
    },
    methods: {
      judgeIsSaveed (){
        let saveData = this.COMPANY_INVOICE;
        // this.activeTab = saveData.invoiceStyle;
        if(saveData.invoiceStyle == '0' && saveData.invoiceState == '1')
        {
          this.activeTab = saveData.invoiceStyle;
          this.tab = saveData.invoiceState;
          this.companyName1 = saveData.companyName;
          this.taxpayerNum = saveData.taxpayerNum;
          this.invoiceHand = saveData.invoiceHand;
        }
        if(saveData.invoiceStyle == '0' && saveData.invoiceState == '0')
        {
          this.activeTab = saveData.invoiceStyle;
          this.tab = saveData.invoiceState;
          this.companyName2 = saveData.companyName;
          this.invoiceHand = saveData.invoiceHand;
        }else {
          return
        }
      },
//      tobackClose(){
//        this.backlog = false;
//        let obj = {
//          value : 4
//        };
//        this.$store.dispatch('COMPANY_INVOICE' , obj);
//        this.$router.push({path:'/suborder'})
//      },
//      backClose(){
//        this.backlog = false
//      },
      handleTabChange (val) {
        this.activeTab = val
      },
      toSuborder(){
//        this.backlog = true
        this.$router.push({path: '/suborder'});
      },
      //判断有无空格 以及空字符串
      hasSpace(obj){
        if ( obj == "" ){
          return true;
        }
        let regu = "^[ ]+$";
        let re = new RegExp(regu);
        return re.test(obj);
      },
      //保存按钮发票信息
      saveInvoice(){
        this.invoiceHand = 1; //1为开发票
        if(this.tab == 1) //判断是公司1 还是个人发票0
        {
          let obj = {
            invoiceStyle: this.activeTab,
            invoiceState: this.tab,
            companyName : this.companyName1,
            taxpayerNum : this.taxpayerNum,
            invoiceHand : this.invoiceHand,
            value : 1,  //判断是哪类发票 1为普通公司发票 2为普通个人发票 3为增值税票
            updateInvoice: true
          }
          for(let item in obj)
          {
           if(this.hasSpace(obj[item]))
           {
             Toast({message: '请填写完整的发票信息', duration: 1500})
             return;
           }
          }
          this.$store.dispatch('COMPANY_INVOICE' , obj);
          Toast({message: '保存发票信息成功', duration: 1500})
          this.$router.push({path:'/suborder'})
        }
        //个人发票
        else {
          let obj = {
            invoiceStyle: this.activeTab,
            invoiceState: this.tab,
            companyName : this.companyName2,
            invoiceHand : this.invoiceHand,
            value : 1,  //判断是哪类发票 1为普通公司发票 2为普通个人发票 3为增值税票
            updateInvoice: true
          }
          for(let item in obj)
          {
            if(this.hasSpace(obj[item]))
            {
              Toast({message: '发票信息不能为空', duration: 1500})
              return;
            }
          }
          this.$store.dispatch('COMPANY_INVOICE' , obj);
          Toast({message: '保存发票信息成功', duration: 1500})
          this.$router.push({path:'/suborder'})
        }
      },
      no_saves(){
        // let obj = {
        //   value : 0,
        //   updateInvoice: false
        // };
        let obj = this.COMPANY_INVOICE
        this.$store.dispatch('COMPANY_INVOICE' , obj);
        this.$router.push({path:'/suborder'})
      },
      open () {
        this.dialog = true
      },
      close () {
        this.dialog = false
      }
    },
    components: {
      taxInvoice
    }
  }
</script>

<style>
  .mu-radio-icon-uncheck{
    color: #999999 !important;
  }
</style>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .mu-tab-link-highlight {
    background-color: $themeColor !important;
  }
  .mu-radio-icon-checked.mu-radio-svg-icon{
    color: $themeColor!important;
  }
  .mu-radio input[type=radio]:checked+.mu-radio-wrapper .mu-radio-ripple-wrapper{
    color: $themeColor!important;;
  }
  .mu-dialog-body{
    padding: px2vw(30) px2vw(24);
    border-bottom: px2vw(1) solid $borderColor;
  }
  .mu-dialog-actions{
    padding: 0;
    height: px2vw(86);
  }

  .top_top {
    margin-top: px2vw(88);
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../common/sass/factory";

    .wrap_box {
      z-index: 100;
      position: fixed;
      top:0;
      left: 0;
      width: 100vw;
    }
  .header{
    width: 100vw;
    color: white;
    box-sizing : border-box;
    font-size: px2vw(32);
    position: relative;
    text-align: center;
    padding: px2vw(20);
    background-color: $themeColor;
  }
  .header_img{
    position: absolute;
    top:px2vw(0);
    left: 0;
    width: px2vw(80);
    height:  px2vw(88);
  }
  .header_img img{
    position: absolute;
    top:px2vw(25);
    left: px2vw(20);
    width: px2vw(19);
    height:  px2vw(31);
  }
  .invoice_know{
    font-size: px2vw(28);
    position: absolute;
    right:px2vw(-20);
    top:px2vw(18);

  }
  .log_log{
    text-align: center;
    font-size: px2vw(29);

  }
  .log{
    font-size: px2vw(34);
    text-align: center;
    line-height: px2vw(35);
    margin-bottom: px2vw(25);
  }
  .invoice_know_body{
    font-size: px2vw(26);
    line-height: px2vw(45);
    height: px2vw(700);
    overflow: scroll;
  }
  .invoice_know_button{
    height: px2vw(50);
    color: white;
    background-color: $themeColor;
    box-shadow: none;
    min-width: 0;
    width: px2vw(190);
    line-height: normal;
  }
  .invoice_know_close{
    min-width: 0;
    width: 100%;
    font-size: px2vw(26);
    color: $themeColor;
  }
  .invoice_know_zy{
    min-width: 0;
    width: 100%;
    text-align: center;
    font-size: px2vw(28);
  }
  .tab_box{
    background-color: white;
    width: 52vw;
    line-height: normal;
  }

  .tab1,.tab2{
    padding-bottom: px2vw(16);
    min-height: inherit;
    font-size: px2vw(28);
    color: $baseColor;
    min-width: inherit;
  }
    .mu-tab-link-highlight{
      height: 0;
    }
    .border_bottom {
      border-bottom: px2vw(1) solid $borderColor;
    }

    .person {
      font-size: px2vw(28);
      position: relative;
      height: px2vw(120);
    }
    .invoice_nature{
      position: absolute;
      top:px2vw(35);
      left: px2vw(40);
    }
    .radio_tab1{
      position: absolute;
      top:px2vw(33);
      left: px2vw(200);
    }
  .company{
    color:#999999;
    position: absolute;
    top:px2vw(35);
    left: px2vw(262);
  }
    .radio_tab2{
      position: absolute;
      top:px2vw(33);
      left: px2vw(350);
    }
    .person_1{
      color:#999999;
      position: absolute;
      top:px2vw(35);
      left: px2vw(416);
    }
    .font_content{
      font-size: px2vw(26);
    }
  .company_color{
    color: $themeColor;
  }

  ._headerCompany{
    font-size: px2vw(26);
    margin-left: px2vw(40);
  }
    ._inputCompany{
      width: px2vw(500);
      height: px2vw(90);
      outline: none;
      border: 1px solid $borderColor;
      font-size: px2vw(28);
      padding-left: px2vw(20);
      margin-left: px2vw(42);
    }
  .company_box{
    padding: 0 0 0 px2vw(40);
  }
  .company_box input{
    font-size: px2vw(28);
    border: 1px solid $borderColor;
    outline: none;
    width: px2vw(500);
    height: px2vw(90);
    padding-left: px2vw(20);
    margin-left: px2vw(42);
  }
  .company_header{
    font-size: px2vw(26);
    vertical-align: text-top;
  }
  .num_box{
    font-size: px2vw(26);
    padding: px2vw(40) px2vw(0) ;
  }
    .num_box span{
      margin-left: 2.5333vw!important;
      font-size: px2vw(26);
    }
  .num_box input{
    font-size: px2vw(26);
    border: 1px solid $borderColor;
    outline: none;
    width: px2vw(500);
    height: px2vw(90);
    padding-left: px2vw(20);
    margin-left: px2vw(12);
  }
  .content{
    padding-left: px2vw(40);
  }
  .font_coin{
    margin-left: px2vw(54);
    color: #999999;
    font-size: px2vw(28);
  }
  .button_box{
    margin-top: px2vw(100);
    margin-bottom: px2vw(30);
  }
  .save_button{
    min-width: 0;
    width: px2vw(250);
    height: px2vw(88);
    margin-left: px2vw(102);
    background-color: $themeColor;
    color: white;
    font-size: px2vw(28);
  }
  .no_save{
    min-width: 0;
    width: px2vw(250);
    font-size: px2vw(28);
    height: px2vw(88);
    margin-left: px2vw(47);
    background-color: #e5e5e5;
  }
  .contents{
    margin-top: px2vw(40);
  }
  .log_button_close{
    width: 50%;
    min-width: 0;
    color: $themeColor;
    font-size: px2vw(20);
  }
  .log_button1_open{
    width: 50%;
    min-width: 0;
    font-size: px2vw(20);
    color: $themeColor;
  }
  .fixed{
    position: fixed;
    top:0;
    left: 0;
  }
</style>

