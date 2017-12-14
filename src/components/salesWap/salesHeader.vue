<template>
  <div class="sale-header">
    <span class="back-click-area" @click="goBack" v-if="!noBack"></span>
    {{headerText}}
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      headerText: {
        type: String
      },
      backTo: {
        type: String,
        default: '',
      },
      noBack: {
        type: Boolean,
        default: false
      }
    },
    created(){
      this.mBack("goBack");
    },
    methods: {
      goBack() {
        if (!this.backTo) {
          this.$router.push({path: '/yayi/index'})
        } else if (this.backTo == '/appSetting') {
          this.$router.push({path: '/yayi/mine'})
        }
        // this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/sass/factory";

  .sale-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: px2vw(88);
    z-index: 999;
    line-height: px2vw(88);
    text-align: center;
    background-color: $themeColor;
    color: #fff;
    font-size: px2vw(32);
    .back-click-area {
      position: absolute;
      top: 0;
      height: 100%;
      left: 0;
      width: px2vw(150);
      background: url("../../images/logIn/back.png") px2vw(20) center no-repeat;
      background-size: px2vw(18) px2vw(29);
    }
  }
</style>
