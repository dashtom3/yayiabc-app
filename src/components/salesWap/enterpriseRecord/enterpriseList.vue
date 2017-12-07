<template>
  <div class="enterprise-list">
    <div class="enterprise-item" v-for="(item, index) in enterpriseList" :key="index">
      <div class="item-top clearfix">
        <h2 class="item-title">{{ item.poiname }}</h2>
        <p class="item-phone">{{ item.telephone }}</p>
      </div>
      <div class="item-bottom">
        <img src="../../../images/salesWap/customer/address.png" alt="地址">
        <span class="item-address">{{ item.address }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "enterpriseList",
  data() {
    return {
      enterpriseList: [],
    };
  },
  created() {
    this.getEnterPriseData();
  },
  methods: {
    getEnterPriseData() {
      let params = {
         currentPage: 1,
         numberPerpage: 10,
      }
      this.$store.dispatch('GET_ENTERPRISE_DATA', params).then((res) => {
        if (res.callStatus === 'SUCCEED') {
          this.enterpriseList = res.data;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../common/sass/factory";
.enterprise-item{
  width: 100%;
  height: px2vw(167);
  border-bottom: px2vw(2) solid $borderColor;
}
.item-title{
  float: left;
  margin: px2vw(40) 0 0 px2vw(21);
  height: px2vw(31);
  line-height: px2vw(31);
  font-size: px2vw(32);
}
.item-phone{
  float: right;
  margin: px2vw(47) px2vw(21) 0 0;
  height: px2vw(20);
  line-height: px2vw(20);
  font-size: px2vw(26);
}
.item-bottom{
  font-size: 0;
  margin: px2vw(29) 0 0 px2vw(21);
  img{
    display: inline-block;
    vertical-align: top;
    width: px2vw(20);
    height: px2vw(24);
  }
  span{
    display: inline-block;
    margin: 0 0 0 px2vw(8);
    height: px2vw(25);
    line-height: px2vw(25);
    font-size: px2vw(26);
  }
}
</style>