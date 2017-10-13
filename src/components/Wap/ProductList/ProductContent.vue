<template>
  <div class="ProductContent">
    <div class="Content_header">
      <div @click="brandShow">
        <span>{{args.itemBrandName == null ? '全部品牌': args.itemBrandName}}</span>
        <img class="brandDown" src="../../../images/ProductList/searchDown.png" alt="">
        <ul :class="['allProduct',{allProductHidden:showBrand}]">
          <li v-for="(item,index) in brandList" @click="brandSearch(item.itemBrandName,index)" :class="{brand_li:item.itemBrandName == args.itemBrandName}">
            {{item.itemBrandName == null ? '全部品牌': item.itemBrandName}}
            <img v-show="item.itemBrandName == args.itemBrandName" class="brand_checked" src="../../../images/ProductList/brandChecked.png" alt="">
          </li>
        </ul>
        <div class="line_right"></div>
      </div>
      <ul class="content_ul">
        <li @click="changeOrder(1)" :class="{active_li:args.rule == 1}">新品</li>
        <li @click="changeOrder(2)" :class="{active_li:args.rule == 2}">销量</li>
        <li @click="changeOrder(3)" class="price_checked" :class="{active_li:args.rule == 3 || args.rule == 4 }">
          价格
          <img v-if="orderPriceUp" class="searchUP"  src="../../../images/ProductList/searchUp.png" alt="">
          <img v-else class="searchUP"  src="../../../images/ProductList/searchUpBlue.png" alt="">
          <img v-if="orderPriceDown" class="searchDown" src="../../../images/ProductList/searchDown.png" alt="">
          <img v-else class="searchDown" src="../../../images/ProductList/searchDownBlue.png" alt="">
        </li>
      </ul>
    </div>
    <!--产品列表-->
    <div class="Content_main gridlist-demo-container">
      <!--<mu-grid-list class="gridlist-demo">-->
      <div class="Content_list" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" >
        <div v-for="(item,index) in productData" @click="goProductDetail(item)">
          <div>
            <img class="product_pic" :src=item.itemDetail.itemPica alt="">
          </div>
          <div>
            <h3>{{item.itemName}}</h3>
            <span class="brandStyle">{{item.itemBrand.itemBrandName}}</span><span class="salesNum">销量：{{item.sales}}</span>
            <i>¥ {{item.itemPrice}}</i>
          </div>
          <div class="Content_list_computed">
            <div class="product_computed" v-if="item.itemValueList.length == 1">
              <div v-show="productNum[index]>=1" @click.stop="decrementNum(item,index)">
                <img src="../../../images/ProductList/pReduce.png" alt="">
              </div>
              <div v-show="productNum[index]>=1">{{productNum[index]}}</div>
              <div @click.stop="incrementNum(item,index)">
                <img  src="../../../images/ProductList/pPlus.png" alt="">
              </div>
            </div>
            <div @click.stop="showModule(item,index)" class="Content_list_change" v-else="">
              选规格
              <!--span里显示的是购物车中该商品的数量-->
              <span v-show="productNum[index]>=1">{{productNum[index]}}</span>
            </div>
          </div>
        </div>
      </div>
      <!--</mu-grid-list>-->
    </div>
    <!--模态框-->
    <div :class="['cover',{cover_hidden:moduleHidden}]">
      <div class="cover_close" @click="closeModule"></div>
      <div class="content">
        <div class="content_title">
          <h3>{{moduleName}}</h3>
          <span @click="closeModule" class="content_close">&times</span>
        </div>
        <div class="shuxingWrap" style="height:auto">
          <div v-for="(item, index1) in items" v-if="item.propertyName" :key="item.propertyName">
            <div class="property_name">{{item.propertyName}}：</div>
            <div class="shuxing">
              <button :class="{ attSty2: index2 == item.checkWhich,attSty3:!oneAttrVal.enabled}" class="attSty1" v-on:click="changeAttSty(index2,item,index1)" v-for="(oneAttrVal,index2) in item.propertyInfoList" :key="oneAttrVal.enabled" :disabled= "!oneAttrVal.enabled">
                {{oneAttrVal.data}}
              </button>
              <div class="clearfix"></div>
            </div>
          </div>
          <div class="clearfix"></div>
          <div class="content_compute">
            <div>
              <h3>￥ {{nowGoodDetails.itemPrice}} <span>(库存:{{nowStock}})</span></h3>
            </div>
            <div class="product_computed">
              <div v-show="productNum[moduleIndex]>=1" @click="moduleReduce(moduleIndex)">
                <img src="../../../images/ProductList/pReduce.png" alt="">
              </div>
              <div v-show="productNum[moduleIndex]>=1">{{productNum[moduleIndex]}}</div>
              <div @click="modulePlus(moduleIndex)">
                <img src="../../../images/ProductList/pPlus.png" alt="">
              </div>
            </div>
          </div>
        </div>
 <!--       <h3 class="content_chance">规格:</h3>
        <div class="content_detail" v-if="moduleData">
          <span >{{moduleData.itemPnamea}}</span>
          <span :class="{detail_checked:detail_checked2}">{{moduleData.itemPnameb}}</span>
          <span :class="{detail_checked:detail_checked3}">{{moduleData.itemPnamec}}</span>
        </div>
         -->
      </div>
    </div>

    <!--产品数据为空显示-->
    <div v-show="productData.length==0" class="noData">
      <img class="noDataPic1" src="../../../images/ProductList/noDataPic1.png" alt="">
      <img class="noDataPic2" src="../../../images/ProductList/noDataPic2.png" alt="">
      <p class="noData_text">您搜索的商品正在招募中,敬请期待!</p>
    </div>

    <!--进入购物车-->
    <div class="in_car">
      <img @click="goCar"  src="../../../images/ProductList/inCar.png" alt="">
      <span v-show="carNum!==0">{{carNum}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {GET_BRAND_LIST,QUERY_ITEM_SEARCH_POST,GET_MAIN_PULL_PRODUCT,SEARCH_WORD,ADD_IN_CAR,GET_CAR_LIST,DEL_CAR_GOODS} from '../../../vuex/types'
  import { GET_CAR_ROUTERSTATE } from '@vuex/types'
  import {mapState} from 'vuex'
  import { Toast, MessageBox } from 'mint-ui';
  import { tokenMethods } from '../../../vuex/util'
  import MuseUI from 'muse-ui'
  import {Indicator, InfiniteScroll,Popup} from 'mint-ui'

  export default {
    data() {
      return {
        orderPriceUp: true,
        orderPriceDown: true,
        clickTime: 0,
        brandList: [{itemBrandName:null}],
        showBrand: true,
        args:{
          currentPage:1,
          totalPage: null,
          rule:1,
          keyWord: this.$store.state.index.searchKeyWord,
          oneClassify:this.$store.state.index.brandAndClassify.oneClassify,
          twoClassify:this.$store.state.index.brandAndClassify.classifyTwoName,
          itemBrandName:null
        },
//        args2:{
//          currentPage:1,
//          rule:1,
//          keyWord:'',
//        },
        moduleHidden: true,
        productData: [],
        productNum: [],
        moduleData: {},
        moduleNum: '',
        moduleName: '',
        detail_checked1: true,
        detail_checked2: false,
        detail_checked3: false,
        carNum:0,
        carData:[],
        claasifList:'',
        getSearchData:{},
        getSearchWord:'',
        nowGoodDetails:{},
        kuCunBuZu: true,
        moduleIndex:0,
        nowStock:'',
        totalNum:0,
        items: [],
        itemKey:[["itemPropertyName","itemPropertyInfo"],["itemPropertyNameTwo","itemPropertyTwoValue"],["itemPropertyNameThree","itemPropertyThreeValue"],["itemPropertyFourName","itemPropertyFourValue"],["itemPropertyFiveName","itemPropertyFiveValue"],["itemPropertySixName","itemPropertySixValue"]],
        allLoaded:false,
//        pages:1,
//        totalPage:1,
      }
    },
    props:['chuanClaasif'],
    created() {
      var self = this;
      Indicator.open();
      self.args.oneClassify = self.$route.params.oneClassify;
      self.args.twoClassify = self.$route.params.twoClassify;
//      this.args.keyWord = this.$route.params.word;
//      console.log(this.getSearchData,this.getSearchWord,'返回的数据');
      this.getBrandList();
      this.getCarList();
    },
    mounted(){
      let self = this;
      this.getProductList();
      this.$store.watch(
        function (state) {
          return state.index.brandAndClassify;
        },
        function () {
          Indicator.open();
          self.args.oneClassify = self.$store.state.index.brandAndClassify.oneClassify;
          self.args.twoClassify = self.$store.state.index.brandAndClassify.classifyTwoName;
          //do something on data change
          self.args.currentPage = 1;
          self.args.totalPage = 1;
          self.productData = [];
          self.productNum = [];
          self.getProductList()
        },
        {
          deep: true, //add this if u need to watch object properties change etc.
        }
      );
      this.$store.watch(
        function (state) {
          return state.index.searchKeyWord;
        },
        function () {
          Indicator.open();
          self.args.keyWord = self.$store.state.index.searchKeyWord;
          self.args.currentPage = 1;
          self.args.totalPage = 1;
          self.productData = [];
          self.productNum = [];
          self.getProductList();
//          Indicator.close();
        },
        {
          deep: true, //add this if u need to watch object properties change etc.
        }
      );
    },
    methods: {
      //获取购物车产品数量
      getCarList(){
        this.$store.dispatch(GET_CAR_LIST,{})
          .then(res=>{
            if(tokenMethods.getWapToken()) {
              this.carData = res.data;
              this.carNum = res.data.length;
              console.log(this.carNum);
            }
          })
          .catch(err=>{
            console.log(err);
          });
      },
      //获取品牌列表
      getBrandList() {
        this.$store.dispatch(GET_BRAND_LIST, {})
          .then(res => {
            // this.brandList = res;
            for(var i=0;i<res.length;i++){
              this.brandList.push(res[i]);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      //获取产品列表
      getProductList(){
        let that = this;
        this.$store.dispatch(QUERY_ITEM_SEARCH_POST, this.args)
          .then(res => {
            res.data.data.forEach(function (item) {
              that.productData.push(item);
            })
            that.args.totalPage = res.data.totalPage;
            console.log('aaaaa',this.args,res.data);
//              this.productNum = this.productData.map(item => []);  //返回0
            if(tokenMethods.getWapToken()) {
//              let count = 0;
//              let sku = 0;
              that.productNum = [];
              that.productData.forEach(function (item) {
                that.carData.forEach(function (item1) {
                  if (item1.itemId == item.itemId) {
                    item.num = item1.num;
//                    sku = item1.itemSKU;
                  }
                })
                if (!item.num) {
                  item.num = 0
                }
//                that.productNum[count]={"itemSku":sku ,"itemNum": item.num};
//                count++;
                that.productNum.push(item.num);
              })
            }
            that.getCarList();
            Indicator.close();
          })
          .catch(err => {
            console.log(err);
          });
      },
      brandSearch(brand,index){
        console.log(brand)
        this.args.itemBrandName = brand;
        console.log(this.args.itemBrandName);
        this.productData = [];
        this.productNum = [];
        this.args.currentPage = 1;
        this.args.rule = 1;
        this.orderPriceDown = true;
        this.orderPriceUp = true;
        this.getProductList();
      },
      addInCar(index,itemSku,n){
          //加入购物车
          this.$store.dispatch(ADD_IN_CAR, {num: n, itemSKU: itemSku}).then(res => {
            let nums = this.productNum[index] + n;
            this.$set(this.productNum, index, nums);
            if(this.productNum[index] == 0){
              this.deleteHandler(itemSku);
              Toast({message: '已从购物车中移除!', duration: 1000});
            }else {
              Toast({message: '加入购物车成功!', duration: 1000});
            }
            console.log('加入购物车', this.productNum[index],nums,this.productNum,index);
            //获取购物车产品数量
            this.getCarList();
          }).catch(err => {
            console.log(err);
          })
      },
      decrementNum(item,index) {
        if(tokenMethods.getWapToken()) {
          this.addInCar(index, item.itemValueList[0].itemSKU, -1)
        }else{
          MessageBox.confirm('请先登录!').then(action => {
            this.$router.push({path: '/logIn'})
          })
        }
      },
      incrementNum(item,index) {
        var self = this
        if(tokenMethods.getWapToken()){
          var obj = {
            itemId: item.itemId,
            token: tokenMethods.getWapToken(),
          }
          self.$store.dispatch('GET_ITEM_DETAIL', obj).then((res) => {
            self.totalNum = res.data.data.itemValueList[0].stockNum;
            console.log(self.totalNum);
            if(self.totalNum == 0){
              Toast({message: '该商品库存为0!', duration: 1500});
              return
            }else if(this.productNum[index] < self.totalNum) {
              self.addInCar(index,item.itemValueList[0].itemSKU,1);
            }else {
              Toast({message:'没有更多商品了',duration:3000});
              return;
            }
          })

        }else{
          MessageBox.confirm('请先登录!').then(action => {
            self.$router.push({path: '/logIn'})
          })
        }
      },

      //商品列表触发商品详情跳转(backJudgeDSK)productListFirst
      goProductDetail(item) {
        this.$router.push({path: '/details/' + item.itemId, query: {name: item.itemName, itemId: item.itemId, backJudge: 'productList'}});
        window.scroll(0, 0)
      },

      //商品列表跳转new购物车(backJudgeDSK)Second
      goCar(){
        this.$router.push({path: '/shoppingCarEntry'});
      },
      changeOrder(index) {
        this.args.currentPage = 1;
        this.productData = [];
        this.productNum = [];
        if(index == 3) {
          this.args.rule = this.orderPriceDown == true ? 3 : 4;
          if(this.clickTime == 0){
            this.orderPriceDown = !this.orderPriceDown;
            this.clickTime = 1;
            this.args.rule = 3;
            console.log(this.clickTime)
          }
          else{
            this.orderPriceUp = !this.orderPriceUp;
            this.orderPriceDown = !this.orderPriceDown;
            this.clickTime = 0;
            this.args.rule = 4;
            console.log(this.clickTime)
          }
        } else {
          this.args.rule = index;
          this.orderPriceDown = true;
          this.orderPriceUp = true;
          this.clickTime = 0;
          console.log(this.clickTime)
        }
        this.getProductList();
      },
      // 计算SKU
      jiSuanSku: function() {
        var that = this;
        var returnObj = {};
        var havaSelectVals = [];
        var nowGoodValLength = 0;
        var list2 = that.nowGoodDetails.propertyList;
        for(let a in list2){
          if(list2[a].propertyName){
            nowGoodValLength = parseInt(a) + 1;
          }
          if(list2[a].checkWhich>=0 && list2[a].checkWhich!=null){
            havaSelectVals.push(list2[a].propertyInfoList[list2[a].checkWhich].data);
          }else{
            continue;
          }
        }
        var list1 = that.nowGoodDetails.itemValueList;
        for(let i in list1){
          var valsArr = [];
          if(list1[i].itemPropertyInfo){
            valsArr.push(list1[i].itemPropertyInfo);
          }
          if(list1[i].itemPropertyTwoValue){
            valsArr.push(list1[i].itemPropertyTwoValue);
          }
          if(list1[i].itemPropertyThreeValue){
            valsArr.push(list1[i].itemPropertyThreeValue);
          }
          if(list1[i].itemPropertyFourValue){
            valsArr.push(list1[i].itemPropertyFourValue);
          }
          if(list1[i].itemPropertyFiveValue){
            valsArr.push(list1[i].itemPropertyFiveValue);
          }
          if(list1[i].itemPropertySixValue){
            valsArr.push(list1[i].itemPropertySixValue);
          }
          list1.arr = valsArr;
          if(havaSelectVals.length==nowGoodValLength){
            var flag = true;
            for(let c in havaSelectVals){
              if(havaSelectVals[c]==valsArr[c]){

              }else{
                flag = false;
              }
            }
            if(flag){
              returnObj.sku = list1[i].itemSKU;
              returnObj.obj= list1[i];
              break;
            }else{
              continue;
            }
          }else{
            continue;
          }
        }
        return returnObj;
      },
      // SKU
      nowGoodSKUDefault:function(){
        var that =this;
        var obj = {};
        var attrs = [];
        var LIST = that.nowGoodDetails.itemValueList;
        for(let i in LIST) {
          if(LIST[i].itemSKU == that.nowGoodSKU) {
            obj = LIST[i];
            break;
          }
        }
        if (LIST.length == 1 && LIST[0].itemPropertyName=='') {
          that.$store.state.index.goodSku = LIST[0].itemSKU
        }
      },
      showModule(item, index) {
        if(tokenMethods.getWapToken()){
        var that = this
        that.moduleHidden = false;
        that.moduleNum = item.num;
        that.moduleData = item.itemValueList;
        that.moduleName = item.itemName;
        that.moduleIndex = index;
        var obj = {
          itemId: item.itemId,
          token: tokenMethods.getWapToken(),
        }
        that.$store.dispatch('GET_ITEM_DETAIL', obj).then((res) => {
          console.log(res.data,"getNowGoodDetail")
          if (res.data.callStatus === 'SUCCEED') {
            that.nowGoodSKU = res.data.msg;
            that.nowGoodDetails = res.data.data;
            // that.$store.state.index.nowGoodDetails = res.data.data;
            // console.log(that.$store.state.index.nowGoodDetails,'90')
            that.sureGoodAttr = that.nowGoodDetails.itemValueList[0].itemPropertyInfo;
            that.items = that.nowGoodDetails.propertyList;
            that.nowStock = that.nowGoodDetails.itemValueList[0].stockNum
            that.$store.state.index.nowStock = that.nowGoodDetails.itemValueList[0].stockNum
            for(let i in that.nowGoodDetails.propertyList){
              if(that.nowGoodDetails.propertyList.propertyName){
                that.attrLength+=1;
              }
              for(var j=0;j<that.nowGoodDetails.propertyList[i].propertyInfoList.length;j++){
                that.nowGoodDetails.propertyList[i].propertyInfoList[j] = {data:that.nowGoodDetails.propertyList[i].propertyInfoList[j],enabled:true}
              }
            }
            if(that.nowGoodDetails.itemValueList[0].stockNum==0){
              that.kuCunBuZu = false;
            }
            that.nowGoodSKUDefault();
          }
        })
        }else{
          MessageBox.confirm('请先登录!').then(action => {
            this.$router.push({path: '/logIn'})
          })
        }
      },
      // 计算库存
      jiSuanKuCun:function(){
        var that = this
        var jiSuanSkuObj = that.jiSuanSku()
        if(jiSuanSkuObj.sku) {
          that.nowGoodDetails.itemPrice = jiSuanSkuObj.obj.itemSkuPrice
          var kuCun = jiSuanSkuObj.obj.stockNum
          if(that.goodDefaultNum >= kuCun) {
            that.kuCunBuZu = false
            that.goodDefaultNum = kuCun
            that.$store.state.index.goodNum = that.goodDefaultNum
            that.$store.state.index.goodSku = that.jiSuanSku().sku
            that.noStock = true
          }else{
            that.kuCunBuZu = true
            that.$store.state.index.goodNum = that.goodDefaultNum
            that.$store.state.index.goodSku = that.jiSuanSku().sku
          }
        }
      },
      //indexC 子数组第几位 item 数组第几行的数据  indexP  当前数组第几行
      changeAttSty:function(indexC,item,indexP){
        var that = this;
        if (item.checkWhich == indexC) {
          that.nowGoodDetails.propertyList.splice(indexP,1,{propertyInfoList:item.propertyInfoList,propertyName:item.propertyName,checkWhich: null })
          that.$store.state.index.goodSku = that.jiSuanSku().sku
        } else {
          that.nowGoodDetails.propertyList.splice(indexP,1,{propertyInfoList:item.propertyInfoList,propertyName:item.propertyName,checkWhich: indexC })
        }
        for(var i=0;i<that.nowGoodDetails.propertyList.length;i++){
          for(var j=0;j<that.nowGoodDetails.propertyList[i].propertyInfoList.length;j++){
            if(that.nowGoodDetails.propertyList[i].checkWhich == j) {
              that.nowGoodDetails.propertyList[i].propertyInfoList[j].enabled = true
            } else {
              that.nowGoodDetails.propertyList[i].propertyInfoList[j].enabled = false
            }
          }
        }
        //propertyList  循环数据 itemValueList 所有属性组合
        for(var j=0;j<that.nowGoodDetails.itemValueList.length;j++){
          if(that.nowGoodDetails.itemValueList[j].canUse == 1){
            var tempNum = 0
            var temp = []
            var temp2 = []
            for(var i=0;i<that.nowGoodDetails.propertyList.length;i++){
              if(that.nowGoodDetails.itemValueList[j][that.itemKey[i][0]] != "") {
                if(that.nowGoodDetails.propertyList[i].checkWhich == null) {
                  temp2.push(i)
                }else if(that.nowGoodDetails.propertyList[i].propertyInfoList[that.nowGoodDetails.propertyList[i].checkWhich].data != that.nowGoodDetails.itemValueList[j][that.itemKey[i][1]]) {
                  tempNum++
                  if(tempNum>1){
                    break;
                  }
                  temp.push(i)
                }
              }
            }
            if(tempNum == 0){
              for(var i = 0;i<temp2.length;i++){
                for(var k=0;k<that.nowGoodDetails.propertyList[temp2[i]].propertyInfoList.length;k++){
                  if(that.nowGoodDetails.propertyList[temp2[i]].propertyInfoList[k].data == that.nowGoodDetails.itemValueList[j][that.itemKey[temp2[i]][1]] ) {
                    that.nowGoodDetails.propertyList[temp2[i]].propertyInfoList[k].enabled = true
                  }
                }
              }
            }else if(tempNum == 1){
              for(var i = 0;i<temp.length;i++){
                for(var k=0;k<that.nowGoodDetails.propertyList[temp[i]].propertyInfoList.length;k++){
                  if(that.nowGoodDetails.propertyList[temp[i]].propertyInfoList[k].data == that.nowGoodDetails.itemValueList[j][that.itemKey[temp[i]][1]] ) {
                    that.nowGoodDetails.propertyList[temp[i]].propertyInfoList[k].enabled = true
                  }
                }
              }
            }
          }
        }
        this.jiSuanKuCun();
      },
      closeModule() {
        this.moduleHidden = true;
      },
      brandShow() {
        this.showBrand = !this.showBrand;
      },
      modulePlus(index) {
        if(tokenMethods.getWapToken()){
          var moduleSku = this.jiSuanSku().sku;
          if(moduleSku) {
            this.addInCar(index, moduleSku,1);
          }else {
            Toast({message:'请选择商品属性',duration:3000});
            return;
          }
        }else{
          MessageBox.confirm('请先登录!').then(action => {
            this.$router.push({path: '/logIn'})
          })
        }
      },
      moduleReduce(index) {
        Toast({message:'多规格的商品只能在购物车里删除哦~',duration:1500})
//        if(tokenMethods.getWapToken()){
//          var moduleSku = this.jiSuanSku().sku;
//          if(moduleSku) {
//            this.addInCar(index, moduleSku,-1);
//          }else {
//            Toast({message:'请选择商品属性',duration:3000});
//            return;
//          }
//        } else{
//          MessageBox.confirm('请先登录!').then(action => {
//          self.$router.push({path: '/logIn'})
//        })
//    }
      },
      loadMore() {
        if(this.args.currentPage == this.args.totalPage){
          Toast({message:'没有更多商品了',duration:3000})
        }else {
          this.args.currentPage = this.args.currentPage + 1;
          this.getProductList();
        }
      },
      deleteHandler(itemSKU){
        var obj = {
          phone: tokenMethods.getWapUser().phone,
          itemSKU: itemSKU,
          token: tokenMethods.getWapToken()
        };
        this.$store.dispatch('DEL_CAR_GOODS', obj).then((res) => {
          console.log(res,'移除');
          this.getCarList();
        })
      },
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .ProductContent{
    z-index: 601;
  }
  .Content_header {
    /*width: 100%;*/
    width: 75.73333vw;
    height: px2vw(100);
    /*overflow: hidden;*/
    padding: 0 px2vw(15);
    border-bottom: px2vw(2) solid #f4f4f4;
    position: fixed;
    top: px2vw(88);
    right: 0;
    background: white;
    z-index: 100;
  }

  .Content_header > div:nth-child(1) {
    width: px2vw(165);
    height: 100%;
    line-height: px2vw(100);
    /*border-right: px2vw(2) solid #f4f4f4;*/
    font-size: px2vw(26);
    text-align: center;
    float: left;
    position: relative;
  }
  .line_right{
    width: 0;
    position: absolute;
    right: 0;
    top:px2vw(40);
    height: px2vw(18);
    border-right: px2vw(2) solid #dcdcdc;
  }
  .Content_header > div:nth-child(1)>span{
    display: block;
    width: px2vw(120);
    text-overflow: ellipsis;
    overflow:hidden;text-overflow:ellipsis; -o-text-overflow:ellipsis;white-space:nowrap;
    font-size: px2vw(28);
  }

  .brandDown {
    width: px2vw(14);
    position: absolute;
    right:px2vw(10);
    top:px2vw(45);
  }

  .content_ul {
    float: right;
    /*overflow: hidden;*/
    height: 100%;
    width: px2vw(360);

  }

  .content_ul > li {
    float: left;
    /*height: px2vw(90);*/
    height: 13.33333vw;
    margin-top: px2vw(4);
    line-height: px2vw(90);
    width: 33%;
    text-align: center;
    text-indent: px2vw(2);
    font-size: px2vw(28);
  }

  .content_ul > .active_li {
    border-bottom: 2px solid #3676b6;
    color: #3676b6;
    height: 12.73333vw;
  }

  .Content_main {
    padding: 0 px2vw(15);
    margin-top: px2vw(140);
  }

  .Content_list {
    width: 100%;
    height: 85vh;
    overflow: scroll;
  }

  .Content_list > div {
    height: px2vw(210);
    width: 100%;
    margin-bottom: px2vw(25);
    overflow: hidden;
    position: relative;
  }

  .Content_list > div > div:nth-child(1) {
    width: px2vw(175);
    height: px2vw(180);
    /*background: red;*/
    float: left;
    border: px2vw(1) solid #f4f4f4;
    overflow: hidden;
    position: relative;
  }

  .product_pic {
    width: px2vw(150);
    height: px2vw(150);
    vertical-align: middle;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .Content_list > div > div:nth-child(2) {
    width: px2vw(340);
    height: px2vw(180);
    float: right;
    position: relative;
  }

  .Content_list > div > div:nth-child(2) > h3 {
    font-size: px2vw(28);
    margin-bottom: px2vw(20);
  }

  .brandStyle {
    background-color: #3676b6;
    color: #fff;
    font-size: px2vw(22);
    border-radius: px2vw(3);
    position: absolute;
    padding: 0 px2vw(3);
    top:px2vw(90);
    left:0;
  }

  .salesNum{
    position: absolute;
    font-size: px2vw(22);
    top:px2vw(90);
    left: px2vw(120);
    color: #999;
  }
  .Content_list > div > div:nth-child(2) > i {
    color: #d81e06;
    text-decoration: none;
    font-style: normal;
    display: block;
    font-size: px2vw(30);
    position: absolute;
    left: 0;
    bottom: 0;

    /*margin-top: px2vw(10);*/
  }

  .Content_list_computed {
    width: px2vw(340);
    height: auto;
    position: absolute;
    right: 0;
    bottom: 3.33333vw;
  }

  .Content_list_computed > .product_computed {
    padding-top: 0;
    margin-right: px2vw(10);
    margin-bottom: px2vw(5);
  }

  .Content_list_change {
    background: #3676b6;
    border-radius: px2vw(25);
    height: px2vw(50);
    width: px2vw(100);
    color: white;
    font-size: px2vw(24);
    /*position: absolute;*/
    /*right: 0;*/
    /*bottom: px2vw(5);*/
    float: right;
    text-align: center;
    line-height: px2vw(50);
    position: relative;

  }

  .Content_list_change > span {
    background: red;
    color: white;
    border-radius: 100%;
    width: px2vw(30);
    height: px2vw(30);
    display: block;
    text-align: center;
    font-size: px2vw(16);
    line-height: px2vw(30);
    position: absolute;
    top: -1.86667vw;
    right: 0;
  }

  .allProduct {
    /*width: 100%;*/

    width: 75.73333vw;
    /*height: auto;*/
    position: absolute;
    left: -2vw;
    top: px2vw(100);
    z-index: 101;
    background: white;
    overflow: hidden;
    box-shadow: 0 px2vw(5) px2vw(5) #cbcbcb;

  }

  .allProduct > li {
    border-bottom: px2vw(1) solid #f4f4f4;
    float: left;
    text-align: center;
    width: 50%;
  }

  .Content_header > div:nth-child(1) > .allProductHidden {
    display: none;
  }

  .cover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(204, 204, 204, 0.5);
    /*opacity: 0.8;*/
    z-index: 605;
  }

  .cover_hidden {
    display: none;
  }

  .cover_close{
    position: absolute;
    z-index: 700;
    width: 100%;
    height: 100%;
  }

  .content {
    width: px2vw(546);
    /*height: px2vw(500);*/
    background: white;
    border-radius: px2vw(15);
    opacity: 1;
    /*margin: px2vw(492) auto 0;*/
    /*padding: px2vw(20);*/
    padding-left: px2vw(30);
    position: absolute;
    top:50%;
    left:50%;
    margin-left: px2vw(-273);
    margin-top: px2vw(-250);
    z-index: 800;
  }

  .content_title {
    margin-top: px2vw(25);
    height: auto;
    position: relative;
  }

  .content_title > h3 {
    width: px2vw(360);
    height: auto;
    font-size: px2vw(30);
    margin: 0 auto;
    text-align: center;
    padding-right: px2vw(30);
  }

  .content_close {
    font-size: px2vw(60);
    position: absolute;
    top: -3.33333vw;
    right: 3.33333vw;
  }

  .content_chance {
    font-size: px2vw(26);
    margin-bottom: px2vw(24);
  }

  .content_detail {
    width: 100%;

  }

  .content_detail > button {
    float: left;
    width: px2vw(140);
    height: px2vw(46);
    text-align: center;
    font-size: px2vw(18);
    font-weight: bold;
    border: px2vw(2) solid #2b5e92;
    margin-right: px2vw(20);
  }

  .content_detail > .detail_checked {
    background: #476b91;
    color: white;
  }

  .content_compute {
    width: px2vw(546);
    height: px2vw(100);
    background: #f4f4f4;
    position: absolute;
    left: 0;
    bottom: 0;
    border-bottom-left-radius: px2vw(15);
    border-bottom-right-radius: px2vw(15);
    padding: 0 px2vw(26);
  }

  .content_compute > div:nth-child(1) {
    float: left;
    height: 100%;

  }

  .content_compute > div:nth-child(1) > h3 {
    color: red;
    height: 100%;
    font-size: px2vw(32);
    line-height: px2vw(100);
  }

  .content_compute > div:nth-child(1) > h3 > span {
    font-size: px2vw(28);
    color: black;
  }

  .product_computed {
    float: right;
    width: px2vw(166);
    height: 100%;
    padding-top: px2vw(30);

  }

  .product_computed > div:nth-child(1) {
    padding: px2vw(5);
    width: px2vw(50);
    height: px2vw(50);
    text-align: center;
    line-height: px2vw(50);
    font-size: px2vw(18);
    float: left;
    margin-right: px2vw(8);

  }

  .product_computed > div:nth-child(2) {
    padding: px2vw(5);
    width: px2vw(50);
    height: px2vw(50);
    line-height: px2vw(40);
    font-size: px2vw(24);
    float: left;
    text-align: center;
    font-weight: bold;
  }

  .product_computed > div:nth-child(3) {
    padding: px2vw(5);
    width: px2vw(50);
    height: px2vw(50);

    text-align: center;
    line-height: px2vw(50);
    font-size: px2vw(18);
    /*background: #3676b6;*/
    color: white;
    float: right;
  }

  .product_computed > div:nth-child(3) > img {
    width: 100%;
  }

  .product_computed > div:nth-child(1) > img {
    width: 100%;
  }

  .content_ul > .price_checked {
    position: relative;
    /*text-align: left;*/
  }

  .searchUP {
    position: absolute;
    top: px2vw(32);
    right: 0;
    width: px2vw(14);

  }

  .searchDown {
    position: absolute;
    top: px2vw(50);
    right: 0;
    width: px2vw(14);
  }
  .brand_li{
    color:#3676b6;
  }
  .brand_checked{
    width: px2vw(26);
  }
  .in_car{
    width: px2vw(80);
    position: fixed;
    right: 0;
    bottom: px2vw(98);
  }
  .in_car>img{
    width: 100%;
  }
  .in_car>span{
    position: absolute;
    right: px2vw(10);
    top:px2vw(15);
    background: #d81e06;
    border-radius: 100%;
    width: px2vw(25);
    height: px2vw(25);
    line-height: px2vw(25);
    color: white;
    font-size: px2vw(12);
    text-align: center;
  }
  .noData{
    width: px2vw(400);
    height: px2vw(216);
    position: fixed;
    right: px2vw(84);
    top:px2vw(512);
    text-align: center;
  }
  .noData_text{
    color: #999999;
    font-size: px2vw(24);
  }
  .noDataPic1{
    width: px2vw(57);
  }
  .noDataPic2{
    width: px2vw(113);
  }
  .gridlist-demo-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .gridlist-demo{
    width: 100%;
    height: 85vh;/*这里可能会出问题*/
    overflow-y: auto;
  }

  .onePxLine{
    width: 97vw;
    margin: auto;
    border: none;
    border-top: 1px solid #e5e5e5;
    background:#e5e5e5;
    border-color:#e5e5e5;
    margin-bottom: 4.5vw;
  }
  .btnDef{
    background: #e5e5e5;
  }
  .shuxing{
    height:auto;
    margin-left: 2vw;
    margin-bottom: 4vw;
  }
  .shuxingWrap{
    padding-bottom: px2vw(100);
  }
  .attSty1 {
    float: left;
    width: px2vw(140);
    height: px2vw(46);
    text-align: center;
    font-size: px2vw(18);
    font-weight: bold;
    border: px2vw(2) solid #2b5e92;
    margin-right: px2vw(20);
    background-color: #fff;
    /*display: inline-block;*/
    /*width: 22.8vw;*/
    /*height: 8vw;*/
    /*line-height: 8vw;*/
    /*font-size: 3.2vw;*/
    /*text-align: center;*/
    /*border-radius: 7px;*/
    /*margin-right: 2vw;*/
    /*background-color: #F3F3F3;*/
    /*color: #333;*/
  }
  .attSty2 {
    color: #fff;
    background-color: $themeColor;
  }
  .attSty3{
    background-color: #f4f4f4;
    border: 1px solid #d3d3d3;
    color: #d3d3d3;
  }
  .property_name {
    width: 23.46vw;
    font-size: 3.73vw;
    margin-left: 2vw;
    margin-bottom: 3vw;
  }
</style>
