<template>
  <div class="personal_data">
    <div class="logIn_header">
      <div class="header_box" @click="back">
        <img class="header_back" src="../../../images/logIn/back.png" alt="img">
      </div>
      <span class="logWithCode">确认订单</span>
    </div>
    <div class="list_sub">
      <!--选择收货地址 开始-->
      <div v-if="addressShow" class="backRightL username" @click="toGoAddress">
        <span class="add_address">添加收货地址</span>
        <img class="backRightJ" src="../../../images/mine/back.png" alt="img">
      </div>
      <!--选择收货地址 结束-->
      <!--默认地址显示开始-->
      <div @click="toGoAddress" v-if="!addressShow" class="address_select">
        <div>
          <span>收货人:</span>
          <span class="address_color address_name">{{addressData.receiverName}}</span>
          <span class="address_color address_iphone">{{addressData.phone}}</span>
        </div>
        <div class="receive_box">
          <span>收货地址:</span>
          <span class="address_color address_address">{{addressData.city}}{{addressData.county}}{{addressData.receiverDetail}}</span>
        </div>
        <img class="right_back" src="../../../images/mine/back.png" alt="img">
      </div>
      <!--默认地址显示结束-->
      <!-- 商品清单 开始-->
      <div class="cargo_box">
        <div class="cargo_word">商品清单</div>
        <div class="collect" v-for="(item,index) in orderItem">
          <div class="collect_img">
            <img :src="item.picPath" alt="img">
            <!-- +'?imageView2/1/w/120/h/120' -->
          </div>
          <div class="collect_right">
            <p class="goods_color">{{item.itemName}}</p>
            <p class="goods_brand">{{item.goodBrandName}}</p>
            <p class="bulue">
              <span v-if="item.itemPropertyInfo">{{item.itemPropertyInfo}}</span>
              <span v-if="item.itemPropertyTwoValue">{{'；'+item.itemPropertyTwoValue}}</span>
              <span v-if="item.itemPropertyThreeValue">{{'；'+item.itemPropertyThreeValue}}</span>
              <span v-if="item.itemPropertyFourValue">{{'；'+item.itemPropertyFourValue}}</span>
              <span v-if="item.itemPropertyFiveValue">{{'；'+item.itemPropertyFiveValue}}</span>
              <span v-if="item.itemPropertySixValue">{{'；'+item.itemPropertySixValue}}</span>
            </p>
            <p class="money">¥{{item.price}}</p>
            <p class="number">×{{item.num}}</p>
          </div>
        </div>
      </div>
      <!-- 商品清单 结束-->
      <!--使用乾币 开始-->
      <a class="mint-cell mint-field">
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper sex">
          <div class="mint-cell-title">
            <span class="mint-cell-text">使用乾币</span>
          </div>
          <div class="mint-cell-value">
            <div class="mint-cell-value is_link" @click="qbVisible = true">
              <p v-text="data.qbText" class="mint-field-core text-right" readonly="readonly" style="text-align: right;">{{data.qbText}}</p>
              <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
            </div>
          </div>
          <img class="back_right" src="../../../images/mine/back.png" alt="img">
          <mt-actionsheet :actions="qb" v-model="qbVisible" cancel-text="取消"></mt-actionsheet>
        </div>
      </a>
      <div class="mint-cell-wrapper sex" v-show="qb_input">
        <div class="mint-cell-title">
         <input type="text" placeholder="请输入本次使用的乾币数" v-model="qianbi_des" @input="changeQb" @blur="qbDed">
         <span class="qb_attention" v-if="!hasCount">（最多可使用{{nowQb}}乾币）</span>
         <span class="already_dk" v-else>已抵扣<span style="color: #d81e06;">{{qianbi_des}}</span>元</span>
        </div>
      </div>
<!--       <div class="mint-cell mint-field">
        <mt-field label="数字" placeholder="请输入数字" type="number" v-model="number"></mt-field>
      </div> -->
      <!--使用乾币 结束-->
      <!--发票信息 开始-->
      <a class="mint-cell mint-field">
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper sex" @click="toInvoice">
          <div class="mint-cell-title">
            <span class="mint-cell-text">是否开发票</span>
          </div>
          <div class="mint-cell-value"></div>
          <span class="mint-field2">{{invoiceText}}</span>
          <img class="back_right" src="../../../images/mine/back.png" alt="img">
        </div>
      </a>
      <!--发票信息 结束-->
      <!--产品注册证 开始-->
      <a class="mint-cell mint-field">
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper sex">
          <div class="mint-cell-title">
            <span class="mint-cell-text">产品注册证（纸质）</span>
          </div>
          <div class="mint-cell-value">
            <div class="mint-cell-value is_link" @click="paperVisible = true">
              <p v-text="data.paperText" class="mint-field-core text-right" readonly="readonly" style="text-align: right;">{{data.paperText}}</p>
              <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
            </div>
          </div>
          <img class="back_right" src="../../../images/mine/back.png" alt="img">
          <mt-actionsheet :actions="paper" v-model="paperVisible" cancel-text="取消"></mt-actionsheet>
        </div>
      </a>
      <!--产品注册证 结束-->
      <!--留言开始-->
      <div class="leaveWord">
        <textarea @change="Departure" class="leaveWord_textarea" placeholder="选填给商家留言" v-model="leave_des"></textarea>
      </div>
      <!--留言结束-->
    </div>
    <!--价钱开始-->
    <div class="price">
      <div>
        <span>商品金额</span>
        <span class="color_red">¥ {{gwcTotal}}</span>
      </div>
      <div>
        <span>运费</span>
        <span class="color_red">¥ {{freight}}</span>
      </div>
      <div>
        <span>乾币抵扣</span>
        <span class="color_blue">-¥ {{qbdk}}</span>
      </div>
      <div>
        <span>乾币赠送</span>
        <span class="color_blue">{{canHasCoin}}</span>
      </div>
    </div>
    <!--价钱结束-->
    <!--底部提交订单开始-->
    <div class="submit_order">
      <div class="price_box">
        <span>实付款:</span>
        <span class="color_margin">¥{{gwcTotal+freight-qbdk}}</span>
      </div>
<!--       <mu-raised-button label="提交订单" class="submit_button" @click="submitOrder"/> -->
      <div class="submit_button" @click="submitOrder">
        提交订单
      </div>
    </div>
    <!--底部提交订单结束-->
  </div>
</template>
<script>
  import { Picker, Indicator, Toast, MessageBox} from 'mint-ui'
  import Util from '../../../vuex/util'
  import { tokenMethods } from '../../../vuex/util'
  import {mapGetters} from 'vuex'
  export default {
    name: 'suborder',
    data () {
      return {
        fromGwc: '',
      	orderItem: '',
        gwcTotal: '',
        haveSelectedGoodNum: '',
        leave_des: '', //买家留言
        leave_word: 0, //产品注册证
        freight: 0, //运费
        qbdk: 0,  //乾币抵扣
        canHasCoin: 0, //可赠送乾币
        invoice_style: '',  //发票类型 普通发票为1，增值税发票为2
        invoice_state: '',  //发票性质 普通发票个人为0 普通发票公司为1 增值税为''
        invoiceHand: '', //发票抬头
        company_name: '',
        taxpayer_num: '',
        registered_address: '',
        registered_phone: '',
        open_bank: '',
        bank_number: '',
        stick_name: '',
        stick_phone: '',
        stick_address: '',
        payVisible: false,
        qbVisible: false,
        paperVisible: false,
        addressShow:true, //是否显示选择地址节点
        addressData: '',//储存默认地址信息并显示
        isDefault: '', //判断有无默认地址
        qb_input: true,
        // qb_input: false,
        allQb: '', //用户QB总额
        nowQb: '',
        qianbi_des: '', //用户输入的乾币
        hasCount: false,
        value: '默认文字',
        judge: '', //跳转判断
        invoiceText: '不开发票',
        data: {
          pay: '',
          qb: '',
          tax: '',
          paper: '',
          payText: '请选择支付方式',
          qbText: '使用',
          // qbText: '是否使用乾币',
          taxText: '是否需要',
          paperText: '不需要',
        },
        pays: [{
          name: '支付宝',
          method: this.selectAli
        }, {
          name: '微信',
          method: this.selectWx
        }], //支付方式
        qb: [{
          name: '使用',
          method: this.selectUse
        }, {
          name: '不使用',
          method: this.selectNoUse
        }],   //使用乾币
        tax: [{
          name: '需要',
          method: this.selectTax
        }, {
          name: '不需要',
          method: this.selectNoTax
        }],  //发票信息
        paper: [{
          name: '需要',
          method: this.selectPaper
        },
        {
          name: '不需要',
          method: this.selectNoPaper
        }],  //产品注册证
      }
    },
    components: {
    },
    //*******导航钩子*********//
    beforeRouteEnter (to, from, next) {
      // 通过 `vm` 访问组件实例
      next(vm => {
        var that = vm;
        if (that.fromGwc == null) {
          that.$router.push({path:'/yayi/shoppingCar'})
        }else {
          that.canHasCoin = Util.goodToMoney(that.fromGwc.details)
          // console.log(that.fromGwc.details,'uiuiuiu')
          // console.log(that.global.goodToMoney(that.fromGwc.details),'papapap')
        }
      })
    },
    watch: {
      qianbi_des: function() {
        var that = this;
        if (that.qianbi_des > that.nowQb) {
          Toast({message: '本单最多只可使用' + that.nowQb + '乾币！', duration: 1500})
          that.qianbi_des = that.nowQb
        } else if (that.qianbi_des == '') {
          that.hasCount = false
        }
      },
       //发票信息
      taxRadio: function() {
        var that = this
        if (that.taxRadio == '1') {
          that.taxActive1 = true
          that.taxActive2 = false
        } else {
          that.taxActive1 = false
          that.taxActive2 = true
        }
      },
      freight: function() {
        var that = this
        let total = that.gwcTotal + that.freight
        if (that.allQb >= total) {
          that.nowQb = total
          that.qianbi_des = that.nowQb
          Toast({message: '本单最多只可使用' + that.nowQb + '乾币！', duration: 1500})
        }
      }
    },
    created: function() {
      this.mBack('back');
      this.getDeparture();
      this.getSessionPaper();
      this.initInvoice();
      var that = this
      var arr = JSON.parse(window.sessionStorage.getItem('suborderData'))
      // console.log(arr,'array')
      that.fromGwc = arr
      that.orderItem = arr.details
      that.gwcTotal = arr.allMoney
      that.haveSelectedGoodNum = arr.haveSelectedGoodNum
      that.canHasCoin = Util.goodToMoney(arr.details) //乾币赠送
      that.getMyAddress();
      that.getQbNow();
      that.Address();
    },
    computed:{
      ...mapGetters([
        'COMPANY_INVOICE', //获取普通公司发票信息
      ]),
    },
    methods: {
      changeQb: function() {
        var that = this;
        that.hasCount = false;
      },
      toInvoice(){
        this.$router.push({path:'/invoice'});
      },
      //失去焦点时
      qbDed: function() {
        var that = this;
        var r = /^\+?[1-9][0-9]*$/　　//正整数
        if (!r.test(that.qianbi_des)) {
          Toast({message: '请输入整数！', duration: 1500})
          return false
        }
        Indicator.open()
        window.setTimeout(function(){
        if (that.qianbi_des !== '') {
          if (that.qianbi_des > that.nowQb) {
            Toast({message: '本单最多只可使用' + that.nowQb + '乾币！', duration: 1500})
            that.hasCount = false
            that.qbdk = 0
            that.qianbi_des = that.nowQb
            return false
          }
          var obj = {
            token: tokenMethods.getWapToken(),
            qbnum: parseInt(that.qianbi_des),
          }
          that.$store.dispatch('GET_QB_DK', obj).then((res) => {
            if (res.callStatus === 'SUCCEED') {
              if (res.msg == '余额充足') {
                that.hasCount = true
                that.qbdk = that.qianbi_des
                window.sessionStorage.setItem('qbCount', that.qbdk)
                Indicator.close()
              } else {
                Toast({message: '乾币余额不足！', duration: 1500})
                that.hasCount = false
                Indicator.close()
              }
            }
          })
        } else {
          that.checked2 = false
          that.hasCount = false
          Indicator.close()
          that.qbdk = 0
          Toast({message: '请输入乾币数！', duration: 1500})
        }
        },1000)
      },
      // 用户查询QB余额
      getQbNow: function() {
        var that = this
        that.$store.dispatch('GET_QB_NOW').then((res) => {
          console.log(res,'df')
          if (res.callStatus === 'SUCCEED') {
              that.allQb = res.fl;
              that.nowQb = res.fl;
              that.qianbi_des = that.nowQb
              let total = that.gwcTotal + that.freight
              if (that.allQb >= total) {
                that.nowQb = total
              }
          }
          that.qbDed();
        })
      },
      //获取收货地址列表信息
      getMyAddress: function() {
        var that = this;
        var obj = {
          token: tokenMethods.getWapToken()
        };
        Indicator.open()
        that.$store.dispatch('GET_ADDRESS', obj).then((res) => {
          if (res.callStatus === 'SUCCEED') {
            // console.log(res,'地址的信息');
            Indicator.close()
            this.addressData = res.data;
            // console.log(this.addressData,'1');
            //判断  无地址存储

            if(that.addressData.length == 0) {
              that.addressShow = true;
            }
            //判断  有地址存储
            else {
              that.addressShow = false;
              //判断他是否点击选择地址   无点击情况的处理
              if(sessionStorage.getItem('selectAddress') === null)
              {
                for (let i=0,len=this.addressData.length; i < len;i++)
                {
                  if(that.addressData[i].isDefault)
                  {
                    that.isDefault = true;
                    that.addressData = that.addressData[i]
                    break;
                  }
                }
                //无默认地址地址情况的处理
                if(that.isDefault == false)
                {
                  that.addressData = that.addressData[0]
                  console.log(that.addressData[0]);
                }
              }else {
                //有点击选择地址
                let index = sessionStorage.getItem('selectAddress');
                this.addressData = this.addressData[index];
              }
              that.getPostfee()   //根据地址计算运费
            }
          }
        })
        Indicator.close()
      },
      // 根据地址计算运费
      getPostfee: function() {
        var that = this
        var arr = JSON.parse(window.sessionStorage.getItem('suborderData'))
        var freight = {
          receiverId: that.addressData.receiverId,
          sumPrice: arr.allMoney,
          itemSum: arr.haveSelectedGoodNum,
        }
        that.$store.dispatch('GET_FREIGHT', freight).then((res) => {
          if (res.callStatus === 'SUCCEED') {
            // console.log(res.data.postFee,'freight')
            that.freight = res.data.postFee
            let total = that.gwcTotal + that.freight
            if (that.allQb >= total) {
              that.nowQb = total
            }
            var qbCount = window.sessionStorage.getItem('qbCount')
            if (qbCount) {
              that.selectUse()
              that.qbdk = qbCount
              that.hasCount = true
              that.qianbi_des = that.qbdk
              // console.log(qbCount,that.nowQb,'qbcount')
            }
          }
        })
      },
      // 提交订单
      submitOrder: function() {
        var that = this
        if (that.receiverId == '') {
          Toast({message: '请选择一个收货地址！', duration: 1500})
          return false
        }
        // that.isLoading = true;
        for (var i = 0; i < that.orderItem.length; i++) {
          // that.orderItem[i].itemName = that.orderItem[i].name
          // that.orderItem[i].picPath = that.orderItem[i].pic
          delete that.orderItem[i].name
          delete that.orderItem[i].pic
          delete that.orderItem[i].userId
          delete that.orderItem[i].updated
          delete that.orderItem[i].totalMoney
          delete that.orderItem[i].itemPropertyNamea
          delete that.orderItem[i].itemPropertyNameb
          delete that.orderItem[i].itemPropertyNamec
          delete that.orderItem[i].cartId
          delete that.orderItem[i].checked
          delete that.orderItem[i].created
          delete that.orderItem[i].goodLeaveNum
          delete that.orderItem[i].itemPropertyName
          delete that.orderItem[i].itemPropertyInfo
          delete that.orderItem[i].itemPropertyNameTwo
          delete that.orderItem[i].itemPropertyTwoValue
          delete that.orderItem[i].itemPropertyNameThree
          delete that.orderItem[i].itemPropertyThreeValue
          delete that.orderItem[i].itemPropertyFourName
          delete that.orderItem[i].itemPropertyFourValue
          delete that.orderItem[i].itemPropertyFiveName
          delete that.orderItem[i].itemPropertyFiveValue
          delete that.orderItem[i].itemPropertySixName
          delete that.orderItem[i].itemPropertySixValue
        }
        var orderItem = JSON.stringify(that.orderItem)
        var obj = {
          // totalFee: that.gwcTotal, //总价
          // actualPay: that.gwcTotal-that.qianbi_des, //实际付款
          // token: that.global.getToken(),
          // invoiceHand: that.tax_des, //发票抬头
          receiverId: parseInt(that.addressData.receiverId), //收货地址id
          postFee: that.freight,
          isRegister: that.leave_word, //是否需要产品注册证
          qbDed: that.qbdk, //钱币抵扣
          buyerMessage: that.leave_des, //买家留言
          orderItem: orderItem, //JSON数组
          invoiceStyle: that.invoice_style, // 发票类型 普通发票为1，增值税发票为2
          InvoiceState: that.invoice_state, // 发票性质 普通发票个人为0 普通发票公司为1 增值税为''
          invoiceHand: that.invoiceHand, //是否开发票 开发票为1，不开发票为0
          companyName: that.company_name, //单位名称
          taxpayerNum: that.taxpayer_num, //纳税人识别号
          registeredAddress: that.registered_address, //注册地址
          registeredPhone: that.registered_phone, //注册电话
          opneBank: that.open_bank,  // 开户银行
          bankNumber: that.bank_number, // 银行账号
          stickNanme: that.stick_name,  // 收票人姓名
          stickPhone: that.stick_phone, // 收票人手机
          stickaddress: that.stick_address, // 收票人地址
        }
        console.log(obj,'提交订单的值')
        // console.log(this.COMPANY_INVOICE,'我的值')
        //判断有误地址存储
        if(that.addressShow)
        {
          console.log('没有收货地址');
          Toast({message: '请选择收货地址', duration: 1500});
          window.scroll(0,0);
          return
        }
        Indicator.open()
        that.$store.dispatch('GET_SUBMIT', obj).then((res) => {
          console.log(res,'lihui')
          if (res.data.callStatus === 'SUCCEED') {
            if (res.data.data == null) {
              Indicator.close()
              Toast({message: '提交订单失败！', duration: 1500})
            } else{
              if (res.data.data.actualPay == 0) {
                Indicator.close()
                window.sessionStorage.removeItem('qbCount')
                window.sessionStorage.removeItem('paper');
                window.sessionStorage.removeItem('departure');
                that.$router.push({ name: 'paySucced', params: {orderId: res.data.data.OrderId, payMoney: res.data.data.actualPay, canHasCoin: that.canHasCoin}})
              } else {
                Indicator.close();
                let orderD = res.data.data;
                window.sessionStorage.setItem('order', JSON.stringify(orderD))
                window.sessionStorage.removeItem('suborderData')
                window.sessionStorage.removeItem('qbCount')
                this.$store.dispatch('COMPANY_INVOICE' , {});//重置发票信息为空
                window.sessionStorage.removeItem('paper');
                window.sessionStorage.removeItem('departure');
                that.$router.push({ path:'/pay' })
              }
            }
          } else {
            Toast({message: '提交订单失败！', duration: 1500})
          }
        })
      },
      initInvoice(){
        //调用之前传过来的值
        let invoice = '';
        if (this.COMPANY_INVOICE.updateInvoice === true && this.COMPANY_INVOICE.value === 1) {
          invoice = this.COMPANY_INVOICE;
          if(invoice.invoiceStyle == '0' && invoice.invoiceState == '0')
            {
              this.invoice_state = invoice.invoiceState;
              this.company_name = invoice.companyName;
              this.invoiceHand = invoice.invoiceHand;
              this.invoice_style = invoice.invoiceStyle;
              this.invoiceText = this.company_name;
            }
            else if(invoice.invoiceStyle == '0' && invoice.invoiceState == '1')
            {
              this.invoice_state =invoice.invoiceState;
              this.company_name = invoice.companyName;
              this.invoiceHand = invoice.invoiceHand;
              this.invoice_style = invoice.invoiceStyle;
              this.taxpayer_num = invoice.taxpayerNum;
              this.invoiceText = this.company_name;
            }
            else if(invoice.invoiceStyle == '1')
            {
              this.invoice_state = invoice.invoiceState;
              this.bank_number = invoice.bankNumber;
              this.company_name = invoice.companyName;
              this.invoiceHand = invoice.invoiceHand;
              this.invoice_style = invoice.invoiceStyle;
              this.open_bank = invoice.opneBank;
              this.registered_address = invoice.registeredAddress;
              this.registered_phone = invoice.registeredPhone;
              this.stick_name = invoice.stickNanme;
              this.stick_phone = invoice.stickPhone;
              this.stick_address = invoice.stickaddress;
              this.taxpayer_num = invoice.taxpayerNum;
              this.invoiceText = this.company_name;
            } else {
                this.invoice_style = '' ;// 发票类型 普通发票为1，增值税发票为2
                this.invoice_state = ''; // 发票性质 普通发票个人为0 普通发票公司为1 增值税为''
                this.invoiceHand = '';//是否开发票 开发票为1，不开发票为0
                this.company_name = '';//单位名称
                this.taxpayer_num = '' ;//纳税人识别号
                this.registered_address = ''; //注册地址
                this.registered_phone = '' ;//注册电话
                this.open_bank = '';  // 开户银行
                this.bank_number = ''; // 银行账号
                this.stick_name = '';  // 收票人姓名
                this.stick_phone = ''; // 收票人手机
                this.stick_address = ''; // 收票人地址
                this.invoiceText = '不开发票';
            }
        } else {
          this.$store.dispatch('GET_ORDER_INVOICE').then((res) => {
            if (res.callStatus === 'SUCCEED' && res.data !== null) {
              let obj = Object.assign(res.data, {value: this.COMPANY_INVOICE.value})
              invoice = res.data
              this.$store.dispatch('COMPANY_INVOICE' , invoice);
              if(invoice.invoiceStyle == '0' && invoice.invoiceState == '0')
              {
                this.invoice_state = invoice.invoiceState;
                this.company_name = invoice.companyName;
                this.invoiceHand = invoice.invoiceHand;
                this.invoice_style = invoice.invoiceStyle;
                this.invoiceText = this.company_name;
              }
              else if(invoice.invoiceStyle == '0' && invoice.invoiceState == '1')
              {
                this.invoice_state =invoice.invoiceState;
                this.company_name = invoice.companyName;
                this.invoiceHand = invoice.invoiceHand;
                this.invoice_style = invoice.invoiceStyle;
                this.taxpayer_num = invoice.taxpayerNum;
                this.invoiceText = this.company_name;
                console.log(this.invoiceText, '')
              }
              else if(invoice.invoiceStyle == '1')
              {
                this.invoice_state = invoice.invoiceState;
                this.bank_number = invoice.bankNumber;
                this.company_name = invoice.companyName;
                this.invoiceHand = invoice.invoiceHand;
                this.invoice_style = invoice.invoiceStyle;
                this.open_bank = invoice.opneBank;
                this.registered_address = invoice.registeredAddress;
                this.registered_phone = invoice.registeredPhone;
                this.stick_name = invoice.stickNanme;
                this.stick_phone = invoice.stickPhone;
                this.stick_address = invoice.stickaddress;
                this.taxpayer_num = invoice.taxpayerNum;
                this.invoiceText = this.company_name;
              } else {
                  this.invoice_style = '' ;// 发票类型 普通发票为1，增值税发票为2
                  this.invoice_state = ''; // 发票性质 普通发票个人为0 普通发票公司为1 增值税为''
                  this.invoiceHand = '';//是否开发票 开发票为1，不开发票为0
                  this.company_name = '';//单位名称
                  this.taxpayer_num = '' ;//纳税人识别号
                  this.registered_address = ''; //注册地址
                  this.registered_phone = '' ;//注册电话
                  this.open_bank = '';  // 开户银行
                  this.bank_number = ''; // 银行账号
                  this.stick_name = '';  // 收票人姓名
                  this.stick_phone = ''; // 收票人手机
                  this.stick_address = ''; // 收票人地址
                  this.invoiceText = '不开发票';
              }
            }
          })
        }
      },
      selectAli: function () {
        this.data.pay = '1';
        this.data.payText = '支付宝'
      },
      selectUse: function () {
        this.data.qb = '1';
        this.data.qbText = '使用';
        this.qb_input = true
        this.qbDed();
      },
      selectNoUse: function () {
        this.data.qb = '0';
        this.data.qbText = '不使用';
        this.qb_input = false;
        this.qbdk = 0;
        window.sessionStorage.removeItem('qbCount')
      },
      selectWx: function () {
        this.data.pay = '0';
        this.data.payText = '微信'
      },
      getSessionPaper(){
        let paperData = JSON.parse( window.sessionStorage.getItem('paper'));

        if(paperData === null)
        {
          console.log(paperData);
          return
        }else if (paperData.paper === 1){
          this.data.paper = '1';
          this.data.paperText = '需要';
          this.leave_word = 1;
        }else if(paperData.paper === 0)
        {
          this.data.paper = '0';
          this.data.paperText = '不需要';
          this.leave_word = 0;
        }else {
          return
        }
      },
      getDeparture (){
       let departure =  window.sessionStorage.getItem('departure');
       if(departure  !== null)
       {
         this.leave_des = departure;
       }
       else {
         return
       }
      },
      //保存留言session
      Departure(){
        window.sessionStorage.setItem('departure', this.leave_des);
        console.log(window.sessionStorage.getItem('departure'));
      },
      saveSessionPaper (paper, paperText, leave_word){
        let papers = {
          paper : paper,
          paperText : paperText,
          leave_word : leave_word,
        };
        window.sessionStorage.setItem('paper', JSON.stringify(papers));
        console.log(JSON.parse( window.sessionStorage.getItem('paper')));
      },
      selectPaper: function () {
        this.data.paper = '1';
        this.data.paperText = '需要';
        this.leave_word = 1;
        this.saveSessionPaper(1, '需要', 1);
      },
      selectNoPaper: function () {
        this.data.paper = '0';
        this.data.paperText = '不需要';
        this.leave_word = 0;
        this.saveSessionPaper(0, '不需要', 0);
      },
      back: function() {
        this.$store.dispatch('COMPANY_INVOICE' , {});//重置发票信息为空
        if(sessionStorage.getItem('backJudgeDS') === 'shopCar') //返回判断
        {
          window.sessionStorage.removeItem('paper');
          window.sessionStorage.removeItem('departure');
          this.$router.push({path:'/yayi/shoppingCar'});
          window.sessionStorage.removeItem('qbCount')
        }else if( sessionStorage.getItem('backJudgeDS') === 'details')
        {
          let id = sessionStorage.getItem('backParamsDetailsID');
          let name = sessionStorage.getItem('backParamsDetailsName');
          window.sessionStorage.removeItem('paper');
          window.sessionStorage.removeItem('departure');
          this.$router.push({path:'/details/' + id,query: {name:name, itemId: id}});
          window.sessionStorage.removeItem('qbCount')
        }else if(sessionStorage.getItem('backJudgeDS') === 'shoppingCarEntry')  //shoppingCarEntry
        {
          window.sessionStorage.removeItem('paper');
          window.sessionStorage.removeItem('departure');
          this.$router.push({path:'/shoppingCarEntry'});
          window.sessionStorage.removeItem('qbCount')
        }
        else {
          window.sessionStorage.removeItem('paper');
          window.sessionStorage.removeItem('departure');
          this.$router.push({path:'/yayi/index'});
          window.sessionStorage.removeItem('qbCount')
        }
      },
      //获取收货地址列表信息
      Address: function() {
        var that = this;
        var obj = {
          token: tokenMethods.getWapToken(),
        };
        that.$store.dispatch('GET_ADDRESS', obj).then((res) => {
          if (res.callStatus === 'SUCCEED') {
            this.judge = res.data;
          }
        })
      },
      toGoAddress(){
        if(this.judge.length === 0)
        {
          this.$store.state.index.addressBack = 1;
          this.$router.push({path:'/addAddress', query:{editJudge: -2}});
        }else {
          // this.$router.push({path:'/confirmAddress'});
          sessionStorage.setItem('backJudgeAddress', 'fromAddressSuborder');
          this.$router.push({path: '/address'});
        }

      }
    }
  }
</script>
<style>
  .list_sub .mint-cell-wrapper {
    background-size: 120% 0px !important;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .add_address{
    font-size: px2vw(32);
    font-weight: 500;
  }
  input {
    width: 45vw;
    height: px2vw(70);
    line-height: px2vw(70);
    border: none;
    outline: medium;
    font-size: px2vw(28);
    padding: 0 px2vw(7) 0 px2vw(7);
  }
  input:focus {
  }
  .logIn_header {
    width: 100vw;
    height: px2vw(88);
    line-height: px2vw(88);
    position: fixed;
    top: 0;
    z-index: 100;
    padding-bottom: 10vw;
    border-bottom:  px2vw(1) solid $borderColor;
    text-align: center;
    background-color: $themeColor;
  }
  .header_box {
    width: px2vw(70);
    height: px2vw(73);
    float: left;
  }
  .header_back {
    width: px2vw(18);
    height: px2vw(29);
    margin-left: 2vw;
    margin-top: 4vw;
    float: left;
  }
  .logWithCode {
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
    font-size: px2vw(32);
    color: #fff;
  }
  .cargo_box {
    width: 100%;
    height: 100%;
    border-bottom: px2vw(20) solid #F4F4F4;
  }
  .cargo_word {
  	font-size: px2vw(32);
  	margin-top: px2vw(26);
  	padding-left: px2vw(20);
  	padding-bottom: px2vw(16);
  	border-bottom: px2vw(1) solid $borderColor;
  }
  .collect {
    display: flex;
    width: 100vw;
    height: px2vw(235);
  }
  .collect_img {
    width: px2vw(186);
    height: px2vw(186);
    margin-top: px2vw(26);
    margin-left: px2vw(26);
    border: px2vw(1) solid $borderColor;
  }
  .collect_img img{
    width: 100%;
    height: 100%;
  }
  .header_top {
    height: px2vw(72);
    border: px2vw(1) solid $borderColor;
  }
  .collect_right {
    padding: px2vw(20) 0 px2vw(20) 0;
    position: relative;
    margin-left:px2vw(20) ;
    width: px2vw(470);
    height: px2vw(219);
  }
  .goods_color{
  	width: 55vw;
    font-size: 3.7333333vw;
    // margin-top: px2vw(20);
  }
  .goods_brand {
  	width: 55vw;
    font-size: 3.2vw;
    margin-top: px2vw(42);
    color: #b6b6b6;
  }
  .money {
    position: absolute;
    top: px2vw(20);
    right: 0;
    font-size: 3.7333333vw;
    color: #d81e06;
  }
  .number {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 3.2vw;
    color: #b6b6b6;
  }
  .bulue {
    margin-top: px2vw(40);
    font-size: 3.2vw;
    color: #b6b6b6;
  }
  .text-right {
  	font-size: px2vw(28);
  	color: #999999;
  }
  .back_right {
    width: px2vw(15);
    height: px2vw(25);
  }
  .is_link {
  	margin-right: px2vw(15);
  }
  .mint-field .mint-cell-title {
    width: px2vw(350);
  }

  .list_sub {
    font-size: px2vw(32);
    margin-top: px2vw(88);
    .username {
      width: 100vw;
      height: px2vw(180);
      line-height: px2vw(170) !important;
      border-bottom: px2vw(20) solid #F4F4F4;
      img {
        vertical-align: middle;
      }
    }
    .realname {
      width: 100vw;
      height: px2vw(108);
      line-height: px2vw(108);
      border-bottom: px2vw(20) solid #F4F4F4;
      img {
        vertical-align: middle;
      }
    }
  }
  .mint-cell-title span {
    // font-size: px2vw(32);
  }
  .mint-cell-text{
    font-size: px2vw(28);
  }
  .sex {
    width: 100vw;
    height: px2vw(108);
    line-height: px2vw(108);
    border-bottom: px2vw(20) solid #F4F4F4;
    img {
      vertical-align: middle;
    }
  }
  .address_select {
    font-size:3.73333vw ;
    border-bottom: px2vw(20) solid #F4F4F4;
    position: relative;
    padding: px2vw(30) px2vw(20);
  }
  .address_color{
    color:#999999;
  }
  .receive_box {
    margin-top: px2vw(40);
  }
  .right_back{
    width: px2vw(15);
    height: px2vw(25);
    position: absolute;
    right: px2vw(20);
    top:px2vw(70);
  }
  .address_name,.address_address {
    margin-left: px2vw(20);
  }
  .address_iphone {
    margin-left: 10vw;
  }
  .leaveWord{
    border-bottom: px2vw(20) solid #F4F4F4;
    padding: px2vw(30) px2vw(20);
  }
  .leaveWord_textarea{
    padding: px2vw(20);
    width: 94.6vw;
    height: px2vw(103);
    background-color: #F4F4F4;
    resize:none;
    border: none;
    outline: none;
    font-size: 3.733333vw;
  }
  .price {
    padding:px2vw(30) px2vw(20);
    font-size: 3.7333333vw;
    margin-bottom: px2vw(110);
  }
  .price div:nth-child(n+2){
    margin-top: px2vw(36);
  }
  .color_blue{
    float: right;
    color: $themeColor;
  }
  .color_red{
    color: #d81e06;
    float: right;
  }
  .color_margin{
    color: #d81e06;
    margin-left: 3.6vw;
  }
  .submit_order {
    background-color: white;
    width: 100vw;
    height: px2vw(90);
    font-size: 4.266667vw;
    position: fixed;
    bottom: 0;
    border-top: px2vw(1) solid $borderColor;
  }
  .price_box{
    text-align: center;
    display: inline-block;
    float: left;
    width: 60vw;
    padding: px2vw(20) 0;
  }
  .submit_button{
    // padding: px2vw(33) 0;
    width: 38vw;
    height: px2vw(90);
    line-height: px2vw(90);
    display: inline-block;
    float: right;
    font-size: 3.733333vw;
    text-align: center;
    color: white;
    background-color: $themeColor;
  }
  .qb_attention {
    color: #D81E06;
    font-size: px2vw(28);
  }
  .already_dk {
    font-size: px2vw(28);
    float: right;
  }

  .mint-field2 {
    font-size: px2vw(28);
    margin-right: px2vw(20);
    color: #999999;
  }
  .backRightJ{
    width: px2vw(15) !important;
    height: px2vw(25) !important;
    float: right;
    margin-top: px2vw(68);
    margin-right: px2vw(20);
  }
  .backRightL {
    font-size: 3.76vw;
    padding-left: px2vw(20);
    line-height: px2vw(90) !important;
  }
</style>
