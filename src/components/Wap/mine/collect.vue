<template>
  <div class="top_box">
    <div class="top_nox">
      <div class="hehe">我的收藏</div>

      <div @click="back" class="img_bx">&nbsp;&nbsp;&nbsp;
      <img class="header_back" src="../../../images/logIn/back.png" alt="">
      </div>

    </div>

    <!--收藏列表开始-->
    <div class="c-content">
    <div class="box_position" v-if="collectData !=0">

      <div class="collect" v-for="(item,index) in collectData" :key="index">
        <mt-cell-swipe
          :right="[
    {
      content: '取消收藏',
      style: { background: '#3676B5',  padding: '0.8vw', color: '#fff', fontSize: '3.733333vw', lineHeight:'800%'},
        handler: () => deleteHandler(item, index)
    }
  ]">
        <!--左边图片-->
        <div class="collect_img">
          <img :src="item.item_pica" alt="" @click="goProductDetail(item)">
        </div>
        <!--右边收藏商品信息-->
        <div class="collect_right">
          <p class="goods_color">{{item.item_name}}</p>
          <span class="state" v-if="item.state == 0">失效</span>
          <p class="goods_color1">{{item.itemBrandName}}</p>
          <p class="money">￥{{item.item_price}}</p>
        </div>
      </mt-cell-swipe>
      </div>
    </div>
    <!--收藏列表结束-->

    <!--无数据显示图片-->
    <div v-else class="collect_pic">
      <img  src="../../../images/mine/collect_pic.png" alt="">
    </div>
    </div>
    <!--末尾-->
  </div >
</template>

<script>
  import { Toast } from 'mint-ui'
  import { CellSwipe } from 'mint-ui'
  import { MessageBox } from 'mint-ui'
  import { tokenMethods } from '../../../vuex/util'
  export default {
    name: 'collect',
    data () {
      return {
        collectData:'',
        startX: 0,       //触摸位置
        moveX: 0,       //滑动时的位置
        disX: 0,       //移动距离
      }
    },
    created: function () {
      this.inits();
      this.mBack("back");
    },
    methods:{
      deleteHandler(item, index) {
        var that = this;
        MessageBox.confirm('确定取消收藏么?').then(action => {
          var obj = {
            itemId: item.itemId,
            token: tokenMethods.getWapToken()
          };
          that.$store.dispatch('CANCEL_CARGO', obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              Toast('取消收藏成功!');
              that.collectData.splice(index,1);
              // that.getGwcList()
            }
          })
        }).catch(err => {
        })
      },
      back(){
        this.$router.push({path:'/yayi/mine'})
      },
      inits:function () {
        var obj = {
          phone: tokenMethods.getWapUser().phone,
          token: tokenMethods.getWapToken()
        }
        //获取收藏商品的信息
        this.$store.dispatch('GET_GOODS_COLLECT', obj).then((res) => {
          console.log(res,'s');
          this.collectData = res.data;
        })
      },
      // 跳转详情
      goProductDetail(item) {
//        this.$store.dispatch('SAVE_CLASSIFY_BACK', 2) //商品详情跳转判断
        sessionStorage.setItem('backJudgeSL', 'collect');
        this.$router.push({path: '/details/' + item.itemId, query: {name: item.item_name, itemId: item.itemId}})
        window.scroll(0, 0)
      },
    }
  }



</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .mint-msgbox-confirm{
    color: $themeColor !important;
  }
  /*.mint-cell:last-child{*/
    /*background-image: none;*/
  /*}*/
  /*.mint-cell-swipe{*/
    /*background-image: none;*/
  /*}*/
  /*.mint-cell-wrapper{*/
    /*background-image: none;*/
  /*}*/
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  @import "../../../../node_modules/mint-ui/src/style/var.css";

  .hehe {
    position: absolute;
    top:0;
    width: px2vw(180);
    left: px2vw(282);
    text-align: center;
  }
  .img_bx{
    position: absolute;
    top:0;
    left: 0;
    z-index: 300;
    width: px2vw(95);
    height: px2vw(88);
  }
  .box_position{
    width: 100%;
    height: 94vh;
    background-color: #f4f4f4;
  }
  .top_nox {
    height: px2vw(88);
    line-height: px2vw(88);
    color: white;
    font-size: px2vw(32);
    background: $themeColor;
    position: fixed;
    top:0;
    z-index: 200;
    width: 100vw;
    text-align: center;
  }
  .c-content{
    position: fixed;
    top: px2vw(88);
    width: 100%;
    bottom: 0;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .header_bo {
    position: fixed;
    top:0;
    left: 0;
    z-index: 999;
  }
  .top_box{
    padding-top: px2vw(88);
  }
  .max_warp {
    position: fixed;
    width: 100%;
    height: 100%;

    z-index: 2;
  }

  .logIn_header {
    width: 100vw;
    padding-bottom: 10vw;
    text-align: center;
    background-color: $themeColor;
    border-bottom: none;
  }

  .header_back {
    width: px2vw(18);
    height: px2vw(29);
    position: absolute;
    top:px2vw(29);
    left: px2vw(15);
  }
  .logWithCode {
    background-color: $themeColor;
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
  .collect {
    margin-top: -1px;
    /*border-bottom: 1px solid #e5e5e5;*/
  }
  .collect_img {
    border: 1px solid #dcdcdc;
    position: relative;
    margin: px2vw(20) 0 px2vw(20) 0;
    width: px2vw(200);
    height: px2vw(200);
  }
  .collect_img img{
    width: px2vw(150);
    height: px2vw(150);
    vertical-align: middle;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .header_top {
    background-color: $themeColor;
    height: px2vw(88);
    border-bottom: px2vw(1) solid $borderColor;
  }
  .header_img_box{
    width: px2vw(100);
    height: px2vw(72);
    position: absolute;
    left: px2vw(20);
    line-height:px2vw(76) ;
  }
  .collect_right {
    padding: px2vw(20) 0 px2vw(20) 0;
    position: relative;
    margin-left:px2vw(20) ;
    width: px2vw(470);
    height: px2vw(219);
  }
  .goods_color{
    margin-top: px2vw(20);
    font-size: 3.7333333vw;
    color: #111;
  }
  .state{
    margin-top: px2vw(10);
    width: px2vw(70);
    display: inline-block;
    height: px2vw(40);
    line-height: px2vw(40);
    background-color: #ddd;
    color: #fff;
    text-align: center;
    font-size: px2vw(24);
  }
  .goods_color1{
    position: absolute;
    bottom:px2vw(60);
    left: 0;
    font-size: 3.3333333vw;
  }
  .money{
    position: absolute;
    bottom: px2vw(20);
    left: 0;
    font-size: 3.7333333vw;
    color: #d81e06;
  }
  .bulue {
    margin-top: px2vw(30);
    font-size: 3.2vw;
    color: #b6b6b6;
  }
  .collect_pic{
    width: 100vw;
    height: 100%;
    position: fixed;
    z-index: 999;
    background-color: #f4f4f4;
  }
  .collect_pic>img{
    width: px2vw(220);
    height: px2vw(204);
    position: absolute;
    margin: 0 auto;
    top: px2vw(400);

    right: 0;
    left: 0;
  }
</style>

