<template>
  <div class="classifyBox">

    <div class="Box_list1" @click="gotoProductList(classify.cl1)">
      <div class="Box_list1_img1">

        <div>
          <span class="upText">
            {{classify.cl1}}
          </span>

        </div>
        <div>
          X 射线
        </div>
        <img class="Box_img" src="../../../images/index/Box_list1_img1.jpg" alt="img">
      </div>
      <div class="Box_list1_img2" @click="gotoProductList(classify.cl2)">
        <div>
          <span class="upText">{{classify.cl2}}</span>
        </div>
        <div>
          C B/C T
        </div>
        <img class="Box_img" src="../../../images/index/Box_list1_img2.jpg" alt="img">
      </div>
      <div class="Box_list1_img3" @click="gotoProductList(classify.cl3)">
        <div>
          <span class="upText">{{classify.cl3}}</span>
        </div>
        <div>
          预成牙
        </div>
        <img class="Box_img" src="../../../images/index/Box_list1_img3.jpg" alt="img">
      </div>
    </div>
    <div class="Box_list2">
      <div class="Box_list2_img1" @click="gotoProductList(classify.cl4)">

        <div>
          <span class="upText">{{classify.cl4}}</span>
        </div>
        <div>
          冷弯制品
        </div>
        <img class="Box_img" src="../../../images/index/Box_list2_img1.jpg" alt="img">
      </div>
      <div class="Box_list2_img2" @click="gotoProductList(classify.cl5)">
        <div>
          <span class="upText">{{classify.cl5}}</span>
        </div>
        <div>
          软组织材料
        </div>
        <img class="Box_img" src="../../../images/index/Box_list2_img2.jpg" alt="img">
      </div>
    </div>

  </div>
</template>

<script>
  import {SAVE_ROOT_ROUTER} from '../../../vuex/types'
  import {mapState} from 'vuex'

export default {
  name: 'classifyBox',
  computed:{
  },
  data () {
    return {
      classify:{
        cl1:'口腔外科',
        cl2:'口腔内科',
        cl3:'口腔修复',
        cl4:'口腔正畸',
        cl5:'口腔种植',
      }
    }
  },
  created: function() {
  },
  methods: {
    gotoProductList(classify){
//      this.$store.dispatch('SAVE_ROOT_ROUTER', 1) //跳转判断

      sessionStorage.setItem('backJudgeIndex', 'index');

      this.$router.push({ name: 'productList', params: { oneClassify: classify , twoClassify: ''}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
@import "../../../common/sass/factory";
  .classifyBox{
    margin: px2vw(30) px2vw(20);
  }
  .Box_list1, .Box_list2{
    overflow: hidden;
  }
  .Box_img{
    width: 100%;
    position: absolute;
    left: 0;
    top:0;
    z-index: -1;
  }
  .Box_list1_img1{
    width: px2vw(280);
    height: px2vw(280);
    float: left;
    position: relative;
  }
.Box_list1_img1>div:nth-child(1),.Box_list1_img1>div:nth-child(2),.Box_list1_img2>div:nth-child(1),.Box_list1_img2>div:nth-child(2),.Box_list1_img3>div:nth-child(1),.Box_list1_img3>div:nth-child(2),.Box_list2_img1>div:nth-child(1),.Box_list2_img1>div:nth-child(2),.Box_list2_img2>div:nth-child(1),.Box_list2_img2>div:nth-child(2){
  width: px2vw(164);
  height: px2vw(140);
  margin: 0 auto;
  /*line-height: px2vw(140);*/
  border-bottom: px2vw(2) solid white;
  text-align: center;
  color: white;
  font-size: px2vw(26);
  position: relative;

}
.Box_list1_img1>div:nth-child(2),.Box_list1_img2>div:nth-child(2),.Box_list1_img3>div:nth-child(2),.Box_list2_img1>div:nth-child(2),.Box_list2_img2>div:nth-child(2){
  border-bottom: none;
  padding-top:px2vw(20)
}

  .Box_list1_img2{
    width: px2vw(205);
    height: px2vw(280);
    float: left;
    margin: 0 px2vw(10);
    position: relative;
  },
  .Box_list1_img3{
    width: px2vw(205);
    height: px2vw(280);
    float: left;
    position: relative;
  }

  .Box_list2{
    margin-top: px2vw(10);
  }
  .Box_list2_img1{
    width: px2vw(350);
    height: px2vw(280);
    float: left;
    position: relative;
    margin-right: px2vw(10);
  }
  .Box_list2_img2{
    width: px2vw(350);
    height: px2vw(280);
    float: left;
    position: relative;
  }
  .upText{
    position: absolute;
    bottom: px2vw(24);
    left: 0;
    width: 100%;
    text-align: center;
  }

</style>

