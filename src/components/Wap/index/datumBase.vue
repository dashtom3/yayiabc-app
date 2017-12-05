<template>
  <div class="dutam-wrapper">
    <div class="box-top">
      <div class="header-top">
        <div @click="toBack" class="header-img-box">
          <img class="header-img" src="../../../images/logIn/back.png" alt="">
        </div>
        <div class="header">
          资料库
        </div>
        <div class="search-img-box">
          <img src="../../../images/case/caseOfIllness/search.png" alt="img">
        </div>
      </div>
      <div class="dressing-box">
        <span v-for="(item, index) in caseDate.dressing"
              :key="index"
              @click="dressing(index)"
              :class="{'dressing-color': (caseListArgs.classify==''?0:caseListArgs.classify) === index}">{{item == '' ? '不限':item}}</span>
      </div>
      <div class="split"></div>
    </div>
    <div class="content-wrapper">
      <v-datum></v-datum>
    </div>
  </div>
</template>

<script>
import VDatum from '@/components/Wap/mine/collect/datum'
export default {
  name: "datum",
  components: {
    VDatum,
  },
  data () {
    return {
      caseDate: {
        dressing: ['', '外科', '内科', '修复', '种植', '正畸'],
        dressingSwitch: false,
      },
      caseListArgs: {
        classify: '',
        currentPage: 1,
        numberPerPage: 10,
        order: 0,
      },
    };
  },
  methods: {
    toBack(){
      this.$router.go(-1);
    },
    dressing (index){
      this.$store.dispatch('SAVE_CASE_DRESSING',  index);
      this.caseListArgs.classify = index;
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../common/sass/factory";
.box-top {
  z-index: 100;
  position: fixed;
  top:0;
  left: 0;
  width: 100vw;
  height: px2vw(198);
}
.header-top {
  background-color: $themeColor;
  height: px2vw(88);
  border-bottom: px2vw(1) solid $borderColor;
}
.header-img-box{
  width: px2vw(100);
  height: px2vw(88);
  position: absolute;
  left: px2vw(20);
  line-height:px2vw(98) ;
}
.header-img {
  width: 2.4vw;
  height: 3.86667vw;
}
.header{
  position: absolute;
  top: px2vw(7);
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 80vw;
  height: px2vw(88);
  line-height: 9.73333vw;
  display: inline-block;
  text-align: center;
  font-size: 4.26667vw;
  color: white;
}
.search-img-box{
  position: relative;
  height: px2vw(88);
  padding-left: px2vw(20);
  padding-right: px2vw(20);
  img{
    position: absolute;
    top: px2vw(24);
    right: px2vw(21);
    width: px2vw(40);
    height: px2vw(41);
  }
}
.dressing-color{
  color: #3676b6;
}
.dressing-box{
  position: relative;
  display: flex;
  top: 0;
  width: 100vw;
  height: px2vw(90);
  font-size: px2vw(30);
  background-color: #ffffff;
  z-index: 10;
  span{
    flex: 1;
    width: px2vw(106);
    height: px2vw(90);
    line-height: px2vw(90);
    text-align: center;
  }
}
.content-wrapper{
  margin-top: px2vw(198);
}
.split{
  width: 100%;
  height: px2vw(20);
  background: #f4f4f4;
}
</style>