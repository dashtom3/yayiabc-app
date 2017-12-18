<template>
  <div class="comment-container">
    <order-header component="comment" @publish="publish">发表评论</order-header>
    <div class="product-comment-container" v-for="(item,index) in order.orderitemList" :key="index">
      <div class="product-container">
        <div class="image">
          <img :src="item.picPath" alt="item.itemPropertyNamea" width="100%" height="100%">
        </div>
        <div class="product-info">
          <p class="name">{{item.itemInfo.itemName}}</p>
          <p class="type">{{item.itemInfo.itemPnamea}} {{item.itemInfo.itemPnameb}} {{item.itemInfo.itemPnamec}}</p>
        </div>
      </div>
      <div class="rate needclick">
        <el-rate v-model="productRate[index]" :colors="['#99A9BF', '#005aab', '#005aab']" @change="getRate"
                 show-text></el-rate>
      </div>
      <div class="field">
        <el-input type="textarea" :rows="4" v-model="desc[index]"></el-input>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {PUBLISH_COMMENT} from '@vuex/types'
  import orderHeader from '../orderHeader.vue'
  import {Toast, MessageBox} from 'mint-ui'

  export default {
    name: 'comment',
    data() {
      return {
        productRate: [],
        desc: []
      }
    },
    components: {orderHeader},
    methods: {
      getRate() {
        console.log(this.productRate[0])
      },
      async publish() {
        try {
          await MessageBox.confirm('您确定发表此评论吗？')
        } catch (e) {
          return
        }
        let itemIdList = this.order.orderitemList.map((item, index) => {
          return {
            itemId: item.itemId,
            itemSKU: item.itemSKU,
            score: this.productRate[index] || 5,
            data: this.desc[index] || '默认好评'
          }
        })
        let params = {
          itemIdList: JSON.stringify(itemIdList),
          orderId: this.order.orderId
        }
        let res = await this.$store.dispatch(PUBLISH_COMMENT, params).catch(e => Toast(e))
        Toast('恭喜您，发表评论成功！')
        this.$router.replace({name: 'orderSubpage', params: {order_state: 4}})
      }
    },
    computed: {
      order() {
        return this.$store.state.index.orderDetails
      }
    },
    created() {
      console.log(this.order)
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  .comment-container {
    background-color: #f4f4f4;
    padding-top: px2vw(88);
    .product-comment-container {
      background-color: #fff;
      width: 100vw;
      margin-bottom: px2vw(20);
      .product-container {
        display: flex;
        height: px2vw(120);
        padding: px2vw(25) 0;
        border-bottom: px2vw(1) solid $borderColor;
        .image {
          flex: none;
          margin: 0 px2vw(20);
          width: px2vw(74);
          height: px2vw(74);
          border: 1px solid $borderColor;
        }
        .product-info {
          flex: auto;
          .type {
            font-size: px2vw(24);
            color: #999999;
          }
        }
      }
      .rate {
        padding: px2vw(40) px2vw(20) px2vw(30);
      }
      .field {
        padding: 0 px2vw(20);
        .el-textarea {
          min-height: px2vw(200);
        }
      }
    }
    .el-rate__icon {
      font-size: px2vw(38) !important;
    }
    .el-rate__item {
      margin-right: px2vw(38);
    }
    .el-rate__text {
      font-size: px2vw(30);
    }
  }
</style>
