<template>
    <div>
      <div class="wrapBCG"></div>
      <div class="headerBox">
        <!--搜索按钮开始-->
        <span class="searchImgBox">
          <img src="../../../../images/case/caseOfIllness/search.png" alt="img">
        </span>
        <!--搜索按钮结束-->

        <!--分类功能开始-->
        <div class="classBox">
          <span v-for="(item, index) in caseDate.caseClass" @click="changeClass(index)" :class="{'changeClass': index === caseDate.caseClassNum}">{{item}}</span>
        </div>
        <!--分类功能结束-->

        <!--提示铃开始-->
        <span class="tsImgBox">
          <span class="numBox">
            <span class="tsNum">5</span>
          </span>
          <img src="../../../../images/case/caseOfIllness/tishi.png" alt="">
        </span>
        <!--提示铃结束-->
      </div>
      <!--头部结束-->

      <!--筛选功能栏开始-->
      <div  class="container">
        <div class="dressingBox">
          <span v-for="(item, index) in caseDate.dressing" @click="dressing(item)"  :class="{'DressingColor': caseListArgs.classify === item}">{{item == null ? '不限':item}}</span>

          <!--筛选按钮-->
          <span @click="caseDate.dressingSwitch = !caseDate.dressingSwitch" class="dressingBtn">
            <img src="../../../../images/case/caseOfIllness/classflsy.png" alt="">
            <transition name="fade">
            <span v-show="caseDate.dressingSwitch" class="dressingFunction" :class="{'dressingSecond': caseDate.caseClassNum === 0, 'dressingThree': caseDate.caseClassNum === 1}">
              <span :class="{'DressingColor': index === caseListArgs.order}" @click.stop="dressingFunction(index)" class="updata" v-for="(item, index) in caseDate.updataTime">
                {{item}}
                <img v-show="caseListArgs.order === index" src="../../../../images/case/caseOfIllness/yes.png" alt="">
              </span>
              <span class="before"></span>
            </span>
          </transition>
          </span>
        </div>
        <!--筛选功能栏结束-->
        <!--内容开始-->
        <div class="wrap">
          <router-view></router-view>
        </div>

        <!--内容结束-->
      </div>
    </div>
</template>

<script>
  export default {
    data (){
      return{
        caseDate: {
          caseClass: ['病例', '视频', '培训'],
          caseClassNum: 0,
          dressing: [null, '外科', '内科', '修复', '种植', '正畸'],
          dressingSwitch: false,
          updataTime: ['最新发布', '最多评论', '最多赞'],
        },
        caseListArgs: {
          classify: null,
          currentPage: 1,
          numberPerPage: 10,
          order: 0,
        },
      }
    },
    //*******导航钩子*********//
    beforeRouteEnter (to, from, next) {
      // 通过 `vm` 访问组件实例
      next(vm => {
        console.log(vm.$router.history.current.name);
        if (vm.$router.history.current.name === 'caseOfIllness') {
          vm.caseDate.caseClassNum = 0
        } else if(vm.$router.history.current.name === 'video') {
          vm.caseDate.caseClassNum = 1
        } else if(vm.$router.history.current.name === '') {
          vm.caseDate.caseClassNum = 2
        }
      })
    },
    watch: {
      'caseDate.caseClassNum': function (newVal, odlVal) {
        if(newVal === 0)
        {
          this.caseDate.updataTime = ['最新发布', '最多评论','最多赞'];
        }else if(newVal === 1)
        {
          this.caseDate.updataTime = ['最多播放', '最多评论'];
        }
      }
    },
    methods: {
      dressingFunction (index){
        if( this.caseDate.caseClassNum === 0)
        {
          this.$store.dispatch('SAVE_CASE_ORDER',  index);
        }

        this.caseListArgs.order = index;
        this.caseDate.dressingSwitch = false;
      },
      //上部筛选功能栏
      dressing (item){
        if( this.caseDate.caseClassNum === 0)
        {
          this.$store.dispatch('SAVE_CASE_DRESSING',  item);
        }
        this.caseListArgs.classify = item;
      },
      gotoPage(page){
        this.$router.push(page)
      },
      // 病例 视频 培训分类
      changeClass (index){
        this.caseDate.caseClassNum = index;
        if(index === 0)
        {
          this.$router.push({path:'/caseOfIllness'});
        }else if(index === 1)
        {
          this.$router.push({path:'/video'});
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";
  .wrap{
    position: fixed;
    z-index: -1;
    top: px2vw(208);
    bottom: 0;
    overflow: scroll;
    width: 100%;
    -webkit-overflow-scrolling: touch;
  }
  .DressingColor{
    color: #3676b6;
  }

  .tsNum{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -48%);
  }
  .numBox{
    position: absolute;
    top:px2vw(10);
    left: px2vw(32);
    text-align: center;
    font-size: px2vw(32);
    color: #ffffff;
    border-radius: 50%;
    background-color: red;
    width: px2vw(40);
    height: px2vw(40);
    transform:scale(0.66,0.66);
    -ms-transform:scale(0.66,0.66); 	/* IE 9 */
    -moz-transform:scale(0.66,0.66); 	/* Firefox */
    -webkit-transform:scale(0.66,0.66); /* Safari 和 Chrome */
    -o-transform:scale(0.66,0.66);
  }
  .tsImgBox{
    position: relative;
    display: inline-block;
    height:px2vw(88);
    padding-right: px2vw(33);
    padding-left: px2vw(20);
    vertical-align: top;
    float: right;
    img{
      width: px2vw(31);
      height: px2vw(40);
      margin-top: px2vw(26);
    }
  }
  .classBox{
    display: inline-block;
    height: px2vw(88);
    font-size: px2vw(36);
    color: #cccccc;
    vertical-align: top;
    margin-left: px2vw(90);
  }
  .classBox span{
    display: inline-block;
    height: px2vw(88);
    padding-top: px2vw(22);
    width: px2vw(100);
    text-align: center;
  }
  .changeClass{
    border-bottom: 2px solid #ffffff;
    color: #ffffff;
  }
  .classBox span:nth-child(n+2){
    margin-left: px2vw(30);
  }
  .searchImgBox{
    display: inline-block;
    height: px2vw(88);
    padding-left: px2vw(20);
    padding-right: px2vw(20);
    img{
      margin-top: px2vw(24);
      width: px2vw(40);
      height: px2vw(41);
    }
  }
  .headerBox {
    position: fixed;
    top:0;
    width: 100vw;
    height: px2vw(88);
    background-color: $themeColor;
  }
  .wrapBCG{
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background-color: #f4f4f4;
  }


  .container{
    position: fixed;
    z-index: -1;
    top: px2vw(208);
    bottom: 0;
    overflow: scroll;
    width: 100%;
    -webkit-overflow-scrolling: touch;
  }
  .dressingBox>.dressingBtn{
    z-index: 999;
    position: absolute;
    width: px2vw(80);
    right: px2vw(6);
    top: 0;
    padding-top: px2vw(26);
  }
  .dressingBox .dressingFunction>.updata{
    display: block;
    width: 90%;
    margin: 0 auto;
    line-height: px2vw(90);
    font-size: px2vw(28);
    text-align: left;
    padding-left: px2vw(6);
    img{
      width: px2vw(26);
      height: px2vw(21);
      float: right;
      margin-top: px2vw(35);
      margin-right: px2vw(12);
    }
  }
  .dressingSecond{
    height: px2vw(275) !important;
  }
  .dressingThree{
    height: px2vw(185) !important;
  }
  .dressingBox .dressingFunction>.updata:nth-child(2){
    border-bottom: 1px solid #dcdcdc;
    border-top: 1px solid #dcdcdc;
  }
  .dressingBox .dressingThree>.updata:nth-child(2){
    border-bottom: none;
  }
  .dressingBox .before{
    display: inline-block;
    width: 0;
    position: absolute;
    top:px2vw(-90);
    right: px2vw(16);
    border-top: px2vw(20) solid transparent;
    border-right: px2vw(12) solid transparent;
    border-left: px2vw(12) solid transparent;
    border-bottom: px2vw(20) solid #9ac8f6;
    border-radius: px2vw(6);
  }
  .dressingBox .before::after{
    content: '';
    display: inline-block;
    width: 0;
    position: absolute;
    top:px2vw(38);
    right: px2vw(-10);
    border-top: px2vw(16) solid transparent;
    border-right: px2vw(10) solid transparent;
    border-left: px2vw(10) solid transparent;
    border-bottom: px2vw(16) solid white;

  }
  .dressingBox .dressingFunction{
    display: inline-block;
    position: absolute;
    top: px2vw(80);
    left: px2vw(-128);
    border: 1px solid #9ac8f6;
    width: px2vw(200);
    border-radius: px2vw(10);
    background-color: white;
    z-index: 1000;
  }
  .dressingBox{
    position: fixed;
    top:px2vw(88);
    width: 100vw;
    height: px2vw(90);
    font-size: px2vw(30);
    background-color: #ffffff;
    span{
      display: table-cell;
      width: px2vw(106);
      height: px2vw(90);
      vertical-align: middle;
      text-align: center;
    }
  }

  .dressingBtn img{
    width: px2vw(30);
    height: px2vw(29);
  }
  .DressingColor{
    color: #3676b6;
  }
</style>

