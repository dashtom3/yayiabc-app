<template>
  <div :class="['orderSubpage-container',{noOrder:!orderList.length && !isLoading}]">
    <div class="order-wrap" v-show="orderList" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <!-- <mt-loadmore class="orders" :top-method="loadTop" :auto-fill=false ref="loadmore" v-on:top-status-change="isState" v-infinite-scroll="loadMore"
       infinite-scroll-disabled="busy" infinite-scroll-distance="10"> -->
        <!-- <topLoadMore ref="topLoadMore" slot="top" :loading="isLoading" :loaded="isLoaded"></topLoadMore> -->
        <order-component :key="index" v-for="(item,index) in orderList" :order="item"
                     class="order-content"></order-component>
      <!-- </mt-loadmore> -->
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import orderComponent from '../orderComponent.vue'
  import {GET_ORDER_LIST, SAVE_ORDERS_LIST} from '../../../../vuex/types'
  import {tokenMethods} from '../../../../vuex/util'
  import {Toast, MessageBox, Indicator, Loadmore, InfiniteScroll} from 'mint-ui'
  import {mapActions} from 'vuex'
  import topLoadMore from '../../../salesWap/index/topLoadMore.vue'

  export default {
    name: 'allOrders',
    data() {
      return {
        orderList: [],
        currentPage: 1,
        loading: false,
        totalPage: 1,
        isLoading:false,
      }
    },
    components: {
      orderComponent,
      topLoadMore
    },
    computed: {
      busy: {
        set() {
        },
        get() {
          return this.loading || this.currentPage >= this.totalPage
        }
      }
    },
    methods: {
      _init() {
        this.isLoading = true;
        let phone = tokenMethods.getWapUser() && tokenMethods.getWapUser().phone
        if (!phone) MessageBox.alert('请先进行登录').then(() => {
          this.$router.push({name: 'logIn'})
        })
        let orderState = this.$route.params.order_state
        if (!(+orderState)) orderState = ''
        this.param = {
          currentPage: this.currentPage,
//          numberPerpage: 5,
          state: orderState,
        }
        this.updateOrderList(this.currentPage)
      },
      ...mapActions({
        GET_ORDER_LIST
      }),
      async updateOrderList(currentPage) {
        this.param.currentPage = currentPage
        this.busy = true
        let res = null
        try {
          res = await this[GET_ORDER_LIST](this.param)
          if (res.data.callStatus == 'FAILED') {
            tokenMethods.removeMsg()
          }
          this.isLoading = false
          this.orderList = this.orderList.concat(res.data.data)
          this.busy = false
          this.totalPage = res.data.totalPage
          Indicator.close()
        } catch (e) {
          console.error(e)
          Indicator.close()
        }
      },
      loadMore() {
        this.currentPage = this.currentPage + 1
        this.updateOrderList(this.currentPage)
      },
      loadTop(){
        this.orderList = []
        this.currentPage = 1
        Indicator.open()
        this._init();
      },
      isState(val){
        this.$refs.topLoadMore.states(val)
      },
      //把下拉刷新完成之后回调的mt的方法传入我的组件里
      isLoaded(){
        this.$refs.loadmore.onTopLoaded();
      }
    },
    created(){
    //安卓返回键 返回首页
        let that = this;
        mui.back = function () {
          that.$router.push({path:'/yayi/mine'});
        }
    },
    mounted() {
      Indicator.open()
      this._init()
    },
    watch: {
      '$route'(to, from) {
        this.currentPage = 1
        this.orderList = []
        this.isLoading = false
        Indicator.open()
        this._init()
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  .orderSubpage-container {
    padding-top: px2vw(170);
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    background-color: #f4f4f4;
    min-height: 100vh;
    .order-wrap{
      width: 100%;
      position: fixed;
      top:px2vw(170);
      left: 0;
      height: 87vh;
      overflow: scroll;
    }
    &.noOrder {
      background-image: url("../../../../images/order/zanwu.png");
      background-position: center center;
      background-repeat: no-repeat;
      background-size: px2vw(136) px2vw(199);
    }
  }
  .orders{
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
</style>
