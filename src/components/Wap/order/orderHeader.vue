<template>
  <div class="order-header-container">
    <p class="order-header">
      <slot></slot>
    </p>
    <div class="click-area" @click="goBack"></div>
    <div class="click-area-right" @click="publishEvent" v-if="component === 'comment'">发布</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      goBack() {
        if (sessionStorage.getItem('toOrder') === 'detail') {
          let state = sessionStorage.getItem('ORDER_STATE')
          // let go = this.$router.push.bind(this.$router)
          this.$router.push({path: '/order/orderSubpage/' + state})
          sessionStorage.removeItem('toOrder')
        } else {
          this.$router.go(-1)
        }
        window.scroll(0, 0)
      },
      publishEvent() {
        this.$emit('publish')
      }
    },
    props: ['component']
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .order-header-container {
    position: fixed;
    z-index: 100;
    top: 0;
    width: 100%;
    height: px2vw(88);
    line-height: px2vw(88);
    text-align: center;
    background-color: #3676b6;
    .order-header {
      color: #fff;
      font-size: px2vw(32);
      background: url("../../../images/logIn/back.png") px2vw(20) center no-repeat;
      background-size: px2vw(18) px2vw(29);
    }
    .click-area {
      position: absolute;
      left: 0;
      top: 0;
      height: px2vw(88);
      width: px2vw(180);
      z-index: 1;
    }
    .click-area-right {
      position: absolute;
      right: 0;
      top: 0;
      height: px2vw(88);
      line-height: px2vw(88);
      text-align: right;
      padding-right: px2vw(20);
      width: px2vw(180);
      z-index: 1;
      color: #fff;
      font-size: px2vw(30);
    }
  }
</style>
