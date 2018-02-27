<template>
  <div class="dutam-wrapper">
    <div class="box-top">
      <div class="header-top">
        <div @click="toBack" class="header-img-box">
          <img class="header-img" src="../../../images/logIn/back.png" alt="">
        </div>
        <div class="header">
          <span v-for="(item, index) in classify" :key="index" @click="changeIndex(index)" :class="{'change-class': index === classIndex}">{{ item }}</span>
        </div>
        <div @click="toCustomer" class="person-img-box">
          <img src="../../../images/salesWap/customer/preson-favor.png" alt="img">
        </div>
      </div>
    </div>
    <div class="content-wrapper" @scroll.stop.prevent>
      <router-view></router-view>
    </div>
    <!-- 底部 -->
    <salesFooter bottomNav="customer"></salesFooter>
  </div>
</template>

<script>
import salesFooter from "../salesFooter.vue";
export default {
  name: "enterpriseRecord",
  components: {
    salesFooter
  },
  data() {
    return {
      classIndex: 0,
      classify: ["门诊", "牙医"],
      mapIconShow: true
    };
  },
  created() {
    this.mBack('toBack');
  },
  methods: {
    toBack() {
      this.$router.push({ path: "/yayi/index" });
    },
    toCustomer() {
      this.$router.push({
        path: "/myCustomer",
        query: { backJudge: "enterpriseRecord" }
      });
    },
    changeIndex(index) {
      this.classIndex = index;
      if (index === 0) {
        this.mapIconShow = true;
        this.$router.push({ path: "/enterpriseList" });
      } else {
        this.mapIconShow = false;
        this.$router.push({ path: "/salesYayi" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../common/sass/factory";
// .dutam-wrapper{
//   height: 163vw;
//   overflow: scroll;
// }
.box-top {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: px2vw(88);
}
.header-top {
  position: relative;
  background-color: $themeColor;
  height: px2vw(88);
  border-bottom: px2vw(1) solid $borderColor;
}
.header-img-box {
  width: px2vw(100);
  height: px2vw(88);
  position: absolute;
  left: px2vw(20);
  line-height: px2vw(98);
}
.header-img {
  width: 2.4vw;
  height: 3.86667vw;
}
.header {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 80vw;
  height: px2vw(88);
  line-height: 9.73333vw;
  display: inline-block;
  text-align: center;
  font-size: px2vw(36);
  color: #ccc;
}
.header span {
  display: inline-block;
  padding: px2vw(4) 0 0 0;
  height: px2vw(88);
  line-height: px2vw(88);
  width: px2vw(100);
  text-align: center;
}
.header span:nth-child(n + 2) {
  margin-left: px2vw(30);
}
.change-class {
  border-bottom: 2px solid #fff;
  color: #fff;
}
.person-img-box {
  position: absolute;
  width: px2vw(88);
  height: px2vw(88);
  top: 0;
  right: 0;
  padding-left: px2vw(20);
  padding-right: px2vw(20);
  img {
    position: absolute;
    top: px2vw(26);
    right: px2vw(21);
    width: px2vw(40);
    height: px2vw(32);
  }
}
.content-wrapper {
  width: 100%;
  margin-top: px2vw(88);
  -webkit-overflow-scrolling: touch;
  // overflow: hidden;
  // padding-bottom: px2vw(112);
}
.split {
  width: 100%;
  height: px2vw(1);
  background: #f4f4f4;
}
</style>
