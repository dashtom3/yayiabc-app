<template>
  <div v-if="keep" class="ProductList">
    <div class="logIn_header">
      <div class="header_box" @click="goBack">
        <img class="header_back" src="../../../images/logIn/back.png" alt="img">
      </div>
      <div class="header_input">
        <img class="search_img" src="../../../images/index/search.png" alt="img">
        <input @click="productSearch" type="text" placeholder="请输入关键字" class="searchInput"
               v-model="$store.state.index.searchKeyWord">
      </div>
      <img @click="clearWord" class="pImg2" src="../../../images/ProductList/clearSearch.png" alt="">
    </div>

    <div  ref="scrollBoxLeft" class="product_left" @scroll.stop.prevent>
        <ProductLeft ></ProductLeft>
    </div>
    <div class="product_contain" @scroll.stop.prevent>
        <!--<ProductContent  v-on:child-keepAlive="keepAlives"></ProductContent>-->
        <ProductContent ></ProductContent>
    </div>
    <div class="clr"></div>
    <!--<ProductModule></ProductModule>-->


  </div>
</template>

<script type="text/ecmascript-6">
  import {SAVE_SEARCH_WORD} from '../../../vuex/types'
  import ProductHeader from './ProductHeader'
  import ProductLeft from './ProductLeft'
  import ProductContent from './ProductContent'
  import ProductModule from './ProductModule'
  import {mapGetters} from 'vuex'

  export default {
    name: 'productList',
    data() {
      return {
        keep: true, //动态缓存开关
        count: 0,
        keepSaveCount : 1,
        scrollTopLift: 0,
        chuanClassif: '',
        routes: '',
        searchWord: ''
      }
    },
    computed: {
      ...mapGetters([
        'saveRootRouter'
      ])
    },
    components: {
      ProductHeader,
      ProductLeft,
      ProductContent,
      ProductModule
    },
    activated (){
     if(this.$route.query.ListBack !== "detail" && this.$route.query.ListBack !== "carEntry")
     {
       this.keep = false;
       this.$nextTick(() => {
         this.keep = true;
       });
     }else {
       let scrollTopLeft = window.sessionStorage.getItem('scrollTopLeft');
       this.$refs.scrollBoxLeft.scrollTop = scrollTopLeft;
     }
    },

    deactivated (){
      let scrollTopLeft =  this.scrollTopLift;
      window.sessionStorage.setItem('scrollTopLeft',scrollTopLeft);
      this.$route.meta.count = 0;
      this.$route.meta.keepAlive = false
    },
    mounted (){
      let _this = this;
      this.$refs.scrollBoxLeft.onscroll = function () {
        _this.scrollTopLift = _this.$refs.scrollBoxLeft.scrollTop;
      };
    },
    created() {
      this.mBack('goBack');
      this.chuanClassif = this.$route.params;
      this.routes = this.$route.query.routes;
      if (this.$route.params.word) {
        this.searchWord = this.$route.params.word;
      }
    },
    methods: {
      productSearch() {
        this.$router.push({path: '/searchWord', query: {data: 'focus'}})
      },
      clearWord() {
        this.$store.commit(SAVE_SEARCH_WORD, null)
      },
      goBack() {
        this.$store.commit(SAVE_SEARCH_WORD, null)
        let index = sessionStorage.getItem('backJudgeIndex');
        if (index === 'class') {
          this.$router.push({path: '/yayi/classify'})
        } else if (index === 'index') {
          this.$router.push({path: '/yayi/index'})
        } else {
          this.$router.push({path: '/yayi/index'})
        }
//          if(this.routes){
//            if(this.saveRootRouter === 1)
//            {
//              this.$router.push({path: '/yayi/index'})
//            }else if(this.saveRootRouter === 2)
//            {
//              this.$router.push({path: '/yayi/classify'})
//            }else {
//              this.$router.go(-1)
//            }
//          }
//          else {
//            if(this.header_text){
//              this.$router.push({path: '/yayi/index'})
//            }else {
//              this.$router.go(-1)
//            }
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  html, body, #app {
    height: 100%;
  }

  .ProductList {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: #f4f4f4;
    /*position: relative;*/
  }

  .logIn_header {
    width: 100vw;
    height: px2vw(88);
    line-height: px2vw(88);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    padding-bottom: 10vw;
    border-bottom: px2vw(1) solid $borderColor;
    text-align: center;
    background-color: $themeColor;
  }

  .header_box {
    width: px2vw(70);
    height: px2vw(73);
    float: left;
    position: absolute;
    top: 0;
    left: 0;
  }

  .header_input {
    position: relative;
    float: left;
    left: px2vw(70);
  }

  .header_back {
    width: px2vw(18);
    height: px2vw(29);
    margin-left: 2vw;
    margin-top: 4vw;
    float: left;
  }

  .product_header > div:nth-child(1) {
    position: absolute;
    top: px2vw(22);
    left: px2vw(20);
    width: px2vw(50);
  }

  .header_text {
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

  .pImg2 {
    width: px2vw(36);
    height: px2vw(36);
    position: absolute;
    top: px2vw(26);
    right: 3vw;
  }

  .product_left {
    /*float: left;*/
    /*height: px2vw(920);*/
    /*min-height: px2vw(920);*/
    position: absolute;
    z-index: 0;
    padding-top: px2vw(88);
    top: px2vw(0);
    left: 0;
    bottom: 0;
    background: #f4f4f4;
    width: px2vw(173);
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .product_contain {
    background-color: #fff;
    /*float: right;*/
    position: fixed;
    z-index: 200;
    min-height: px2vw(200);
    width: px2vw(568);
    top: px2vw(88);
    right: 0;
    /*overflow: scroll;*/
    -webkit-overflow-scrolling: touch;
  }

  .searchInput {
    width: px2vw(606);
    height: px2vw(64);
    line-height: px2vw(64);
    border-radius: px2vw(32);
    border: none;
    background-color: #f3f3f3;
    padding-left: px2vw(80);
    /*margin-left: px2vw(30);*/
    margin-top: px2vw(13);
    outline: none;
    color: #999;
  }

  .searchInput::placeholder {
    color: #999;
  }

  .search_img {
    width: 4.75vw;
    height: 4.75vw;
    position: absolute;
    top: px2vw(26);
    left: px2vw(31);
  }
</style>
