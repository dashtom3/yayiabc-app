<template>
  <div class="salesCustomer">
    <div class="wrap_box">
      <div class="top_box">
        <span class="back-click-area" @click="goBack"></span>
        <span>发现客户</span>
      </div>
    <div class="login">
      <div class="loginBox">
        <span :class="{'changeColor': changeLoginColor}" class="loginFont" @click="btnLogin(true)">已注册,待绑定</span>
        <span @click="btnLogin(false)" :class="{'changeColor': !changeLoginColor}" class=" loginFonts">未注册</span>
        <div class="person_box">
          <img class="personImg" src="../../../images/salesWap/customer/person.png" alt="">
          <span class="personText" @click="toMyCoustomer">我的客户</span>
        </div>
      </div>
    </div>
      <div class="searchBox">
      <div class="searchImgBox">
        <img class="searchImg" src="../../../images/salesWap/customer/search.png" alt="">
        <form @submit.prevent class="fromInput">
          <input v-model="searchText" @change="space" @keyup.enter.stop.prevent="searchClick" placeholder="请输入联系人、手机号或单位名称查询" type="search" class="searchInput">
        </form>
      </div>
    </div>
    </div>
    <!--搜索框开始-->


    <!--搜索框结束-->
    <!--详细信息开始-->
    <mt-loadmore v-if="!dataShow" class="top_warp" :top-method="loadTop" :auto-fill=false ref="loadmore"  v-on:top-status-change="isState">
      <!--loading:判断加载状态布尔值，loaded：加载完成后的回调-->
      <topLoadMore ref="topLoadMore" slot="top" :loading="isLoading" :loaded="isLoaded"></topLoadMore>
      <div v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true">
        <div class="ms_wrap" v-for="item in loginData">
          <img src="../../../images/mine/topBackGround.png" class="ms_img" alt="">
          <div class="ms_right">
            <div class="ms_top">
              <span :class="{'changeFont': item.contacts == '暂无姓名'}" class="name">{{item.contacts}}</span>
              <span class="phone_name">(&nbsp;<img class="phoneImg" src="../../../images/salesWap/customer/phone.png" alt="">&nbsp;{{item.contactsPhone}})</span>
            </div>
            <div class="hospital_name_box">
              <span class="hospital_name">{{item.unitName}}</span>
            </div>
            <div class="ms_bottom">
              <img class="addressImg" src="../../../images/salesWap/customer/address.png" alt="">
              <div class="address_name">{{item.unitAddress}}</div>
            </div>
          </div>
        </div>
        <div class="noMore" v-if="noMore">- End -</div>
      </div>
      <div class="fixed"></div>
    </mt-loadmore>

    <!--详细信息结束-->
    <div class="top_warp2"></div>
    <salesFooter bottomNav="customer"></salesFooter>
    <div class="salesBox"></div>

    <mt-loadmore class="textCenter" v-if="dataShow" :top-method="loadTop" :auto-fill=false ref="loadmore">
      <img src="../../../images/salesWap/customer/noyeji.png" alt="">
      <div >暂无客户</div>
    </mt-loadmore>

  </div>
</template>

<script type="text/ecmascript-6">
  import salesFooter from '../salesFooter.vue'
  import topLoadMore from '../index/topLoadMore.vue'
  import {InfiniteScroll, LoadMore} from 'mint-ui'

    export default {
      name: 'salesCustomer',
      data () {
        return{
          changeLoginColor: true,
          isLogin : true , //判断是否注册
          searchText : '',
          loginData: [],
          dataShow: false,
          currentPage: 1,
          totalPage:1,
          noMore: false,
          isLoading:false
        }
      },
      created(){
        this.salesBack();
        this.getLogined();
      },
      watch:{
        changeLoginColor:{
          deep:true,
          handler:function () {
            this.currentPage = 1;
            this.totalPage = 1;
            this.loginData = [];
            this.searchText = '';
            this.isLogin = !this.isLogin;
            this.getLogined();
          }
        }
      },
      methods: {
        // 返回app页面
        goBack() {
          this.$router.push({path:'/yayi/index'})
        },
        toMyCoustomer(){
          this.$router.push({path:'/myCustomer', query:{backJudge: 'salesCustomer'}})
        },
        searchClick(){
          this.getLogined();
        },
        btnLogin (bln) {
          this.changeLoginColor = bln;
        },
        space(){
          if(this.searchText === '')
          {
            this.getLogined();
          }
        },
        //获取已注册的信息
        getLogined(){
          this.isLoading = true;
          let obj = {
            state : this.searchText,
            currentPage: this.currentPage,
          }
          if(this.isLogin)
          {
            this.$store.dispatch('GET_LOGINED', obj).then((res) => {
//                this.loginData = ''; //初始化
              if(res.data.length == 0) {
                this.dataShow = true;
                return
                }
              else {
                for(var i = 0,len=res.data.length; i < len; i++) {
                  let data = res.data[i];
                  let arr = {}
                  if (data.phone === null) {
                    arr['contactsPhone'] = '暂无联系电话'
                  }else {
                    arr['contactsPhone'] = data.phone
                  }
                  if (data.trueName === null) {
                    arr['contacts'] = '暂无姓名'
                  }else {
                    arr['contacts'] = data.trueName
                  }
                  if(data.certification !== null)
                  {
                    if (data.certification.companyName === null) {
                      arr['unitName'] = '暂无单位名称'
                    }else {
                      arr['unitName'] = data.certification.companyName
                    }
                    if (data.certification.workAddress === null) {
                      arr['unitAddress'] = '暂无单位名称'
                    }else {
                      arr['unitAddress'] = data.certification.workAddress
                    }
                  }else {
                    arr['unitName'] = '暂无单位名称'
                    arr['unitAddress'] = '暂无详细地址'
                  }
                  this.loginData.push(arr)
                }
                this.dataShow = false;
              }
              this.totalPage = res.totalPage;
              this.isLoading = false;
            })
          }else {
            this.$store.dispatch('GET_NO_LOGINED', obj).then((res) => {
              if(res.data.length == 0)
              {
                this.dataShow = true;
                return
              }else {
                for(let i = 0,len=res.data.length; i < len; i++)
                {
                  let data = res.data[i];
                  if(data.contacts.length == 0)
                  {
                    res.data[i].contacts = '暂无姓名'
                  }
                  if(data.contactsPhone.length == 0)
                  {
                    res.data[i].contactsPhone = '暂无联系电话'
                  }
                  if(data.unitAddress.length == 0)
                  {
                    res.data[i].unitAddress = '暂无详细地址'
                  }
                  if(data.unitName.length == 0)
                  {
                    res.data[i].unitName = '暂无单位名称'
                  }
                  this.loginData.push(data);
                }
                this.dataShow = false;
              }
              this.totalPage = res.totalPage;
              this.isLoading = false;
            })
          }
          if(this.currentPage === this.totalPage && this.loginData.length > 6){
            this.noMore = true;
          }
        },
        loadMore(){
          if(this.currentPage >= this.totalPage){
//          this.noMoreGood = true;
          }else {
            this.currentPage = this.currentPage + 1;
            this.noMore = false;
            this.getLogined();
          }
        },
        loadTop(){
          this.dataShow = false;
          this.currentPage = 1;
          this.loginData = [];
          this.searchText = '';
          this.getLogined();
        },
        //mt中接受的val值作为参数传入我的组件里
        isState(val){
          this.$refs.topLoadMore.states(val)
        },
        //把下拉刷新完成之后回调的mt的方法传入我的组件里
        isLoaded(){
          this.$refs.loadmore.onTopLoaded();
        }
      },
      components:{
        salesFooter,
        topLoadMore
      }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../common/sass/factory";
    .textCenter{
      margin-top: px2vw(170);
      text-align: center;
      font-size: px2vw(30);
      height: 71vh;
    }
    .textCenter img{
      width: px2vw(116);
      height: px2vw(110);
    }
    .top_box{
      line-height: px2vw(88);
      height: px2vw(88);
      font-size: px2vw(32);
      background-color: $themeColor;
      color: white;
      text-align: center;
      width: 100vw;
    }
    .wrap_box{
      position: fixed;
      top:0;
      left: 0;
      z-index: 998;
      .back-click-area {
        position: absolute;
        top: 0;
        height: px2vw(88);
        left: 0;
        width: px2vw(150);
        background: url("../../../images/logIn/back.png") px2vw(20) center no-repeat;
        background-size: px2vw(18) px2vw(29);
      }
    }
    .salesBox{
      background: #e5e5e5;
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    .login{
      background-color: white;
      border-top: px2vw(10) solid $borderColor;
      font-size: px2vw(28);
      color: #666666;
      padding-bottom: px2vw(10);
    }
    .changeFont{
      font-size: px2vw(28) !important;
    }
    .loginBox{
      border-bottom:px2vw(1) solid $borderColor;
      margin-top: px2vw(22);
      padding-left: px2vw(21);
      padding-right: px2vw(21);
      height: px2vw(52);
    }

    .changeColor {
      color: $themeColor;
      font-size: px2vw(30) !important;
      border-bottom: px2vw(1) solid $themeColor;
    }

    .loginFont {
      letter-spacing: px2vw(1);
      display: inline-block;
      min-width: px2vw(200);
      margin-right: px2vw(24);
      height: px2vw(51);
    }

    .loginFonts {
      letter-spacing: px2vw(1);
      height: px2vw(51);
      display: inline-block;
      width: px2vw(100);
    }

    .person_box {
      font-size: px2vw(30);
      color: $themeColor;
      float: right;
    }

    .personImg {
      width: px2vw(30);
      height: px2vw(24);
    }

    .personText {
      vertical-align: top;
    }

    .searchBox {
      background-color:#e5e5e5;
      padding: px2vw(10) px2vw(34);
    }
    .searchImgBox{
      padding: px2vw(10) px2vw(28);
      background-color: #f6f6f6;
      border-radius: px2vw(40);
    }

    .searchImg {
      vertical-align: middle;
      width: px2vw(30);
      height: px2vw(30);
    }

    input[type="search"]::-webkit-search-cancel-button{
      display: none;
    }
    .searchInput {
      -webkit-appearance: none;
      background: transparent;
      vertical-align: middle;
      outline: none;
      border: none;
      font-size: px2vw(28);
      width: px2vw(570);
      padding-top: 0;
      padding-bottom:0 ;
      padding-left: px2vw(15);
      margin-top: px2vw(4);
      margin-bottom: px2vw(4);
    }
    .fromInput{
      padding: 0;
      margin: 0;
      vertical-align: middle;
      width: px2vw(570);
      display: inline-block;
    }
    .salesHeader{
      position: static !important;
    }

    .ms_wrap {
      border-bottom: px2vw(1) solid $borderColor;
      background: white;
      padding: px2vw(30) px2vw(17) px2vw(20) px2vw(19);
    }

    .ms_img {
      width: px2vw(92);
      height: px2vw(92);
      border-radius: 100%;
      vertical-align: middle;
      margin-right: px2vw(23);
    }

    .phoneImg {
      vertical-align: middle;
      width: px2vw(20);
      height: px2vw(22);
    }

    .addressImg {
      vertical-align: middle;
      margin-top: px2vw(-2);
      width: px2vw(20);
      height: px2vw(24);
    }
    .address_name{
      vertical-align: text-top;
      display: inline-block;
      font-size: px2vw(26);
      color: #646464;
      width: px2vw(500);

    }

    .ms_right {
      display: inline-block;
      vertical-align: middle;
    }

    .name {
      font-size: px2vw(36);
    }

    .phone_name {
      color: #646464;
      font-size: px2vw(26);
    }
    .hospital_name{
      font-size: px2vw(26);
    }

    .hospital_name{
      font-size: px2vw(28);
    }
    .top_warp{
      position: fixed;
      bottom: 0;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      top: px2vw(270);
      min-height: 72vh;
      width: 100%;
      background-color: #e5e5e5;
      .fixed{
        height: px2vw(101);
        width: 100%;
      }
    }
    .top_warp2 {
      height: px2vw(101);
      background: #e5e5e5 !important;
    }

    .hospital_name_box {
      margin-bottom: px2vw(8);
    }
    .noMore{
      color: #999;
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: px2vw(28);
      background-color: #f4f4f4;
    }
</style>
