<template>
  <div  class="titleWrap">
    <div class="backgroundImg"></div>
    <div class="wrapTop">
      <span class="title">病例详情</span>
      <span @click="back()" class="backImgBox">
        <img src="../../../../images/case/backer.png" alt="">
      </span>
    </div>

    <div class="container">
      <div class="titleContainer">
        <div class="titleContent">
          {{caseDetailArgs.headline}}
        </div>
      </div>

      <div class="header">
        <img class="headPic" src="../../../../images/case/caseOfIllness/1.png" alt="">
        <span class="headName">{{caseDetailArgs.writer}}</span>
        <span class="class">{{caseDetailArgs.classify}}</span>
        <span class="class">免费</span>
      </div>

      <div class="read">
        <span class="readS">{{caseDetailArgs.readNumber}}阅读</span><span class="drop">&nbsp;·</span><span class="readS">&nbsp;评论&nbsp;</span><span class="drop">·</span><span class="readS">&nbsp;20赞</span>
        <span class="readTime">{{caseDetailArgs.postTime}}</span>
      </div>

      <!--病历内容-->
      <div class="content">
        <div class="padding_Box" v-html="caseDetailArgs.freeContent"></div>
        <!--付费内容-->
        <div class="padding_Box" v-if="caseDetailArgs.chargeContent !== null" v-html="caseDetailArgs.chargeContent"></div>
        <div class="payBox" v-if="caseDetailArgs.chargeContent === null">
          <span class="payText">查看完整病例,&nbsp;需要支付2乾币~</span>
          <span class="payNow">
            <span class="payNowText">立即支付</span>
            <img src="../../../../images/case/back_1.png" alt="">
          </span>
        </div>

      </div>
    </div>


    <div>
      <comment :types="'病例'"></comment>
    </div>

  </div>
</template>

<script>
  import comment from './comment.vue';
  export default {
    data(){
      return{
        caseDetailArgs: [], //病例详情的内容数据
      }
    },
    created (){
      this.getCaseData();
    },
    mounted (){

    },
    methods:{
      //获取病例数据
      getCaseData(){
        this.$store.dispatch('GET_CASE_DETAIL', {postId: 645}).then((res) => {
          this.caseDetailArgs = res.data;

        })
      },
      back (){
        this.$router.go(-1);
      },
      //子组件返回按钮
      backChild(){
        let reg = new RegExp("(\\s|^)" + "changeFixed" + "(\\s|$)");
        let _html = document.getElementsByTagName("html")[0];
        _html.className = _html.className.replace(reg, " ");

        this.commentChild.switchShow = false;
      },
    },
    components:{comment}
  }
</script>

<style>
  body{
    height: 100% !important;
    overflow-x: hidden !important;
    overflow-y: hidden !important;
  }
  .changeFixed{
    height: 100% !important;
    overflow-x: hidden !important;
    overflow-y: hidden !important;
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";



  .backgroundWrap{
    position: fixed;
    bottom: 0;
    top:0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: #f8f8f8;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .commentChildBox{
    position: fixed;
    bottom: 0;
    top:0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: #f8f8f8;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .padding_Box{
    padding: px2vw(40) px2vw(20) px2vw(0) px2vw(20);
  }

  .payBox{
    width: 100vw;
    display: table;
    vertical-align: middle;
    height: px2vw(90);
    font-size: px2vw(28);
    color: white;
    background-color: $themeColor;
    padding-left: px2vw(22);
    padding-right: px2vw(10);
    margin-top: px2vw(20);
    box-shadow: px2vw(0) px2vw(5) px2vw(8) darkgray ;
  }
  .payBox span{
    display: table-cell;
    vertical-align: middle;
  }
  .payBox span img{
    width: px2vw(15) !important;
    height: px2vw(25);
    vertical-align: middle;
  }
  .payNowText{
    display: inline-block !important;
  }
  .payNow{
    width: px2vw(170);
  }
  .areaShow{
    position: absolute;
    top:0;
    left: 0;
    z-index: -2;
  }




  #write{
    border: none;
    vertical-align: middle;
  }





  .backgroundImg{
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f4f4f4;
    z-index: -1;
  }
  .wrapTop{
    z-index: 999;
    position: fixed;
    height: px2vw(88);
    top:0;
    width: 100vw;
    background-color: $themeColor;
    text-align: center;
    color: #ffffff;
    font-size: px2vw(36);
  }
  .title{
    display: table-cell;
    vertical-align: middle;
    height: px2vw(88);
    width: 100vw;
    text-align: center;
  }
  .backImgBox{
    position: absolute;
    padding: px2vw(23) px2vw(35) 0 px2vw(20);
    top:0;
    left: 0;
    height: px2vw(88);
  }
  .backImgBox>img{
    width: px2vw(24);
    height: px2vw(42);
  }
  .container{
    position: absolute;
    top:px2vw(88);
    overflow: scroll;
    width: 100%;
    -webkit-overflow-scrolling: touch;
  }
  .titleContainer{
    background-color: white;
    padding-left: px2vw(20);
    padding-right: px2vw(20);
  }
  .titleContent{
    padding-top: px2vw(38);
    font-size: px2vw(36);
    color: #333333;
  }
  .header{
    background-color: white;
    padding-top: px2vw(37);
    padding-left: px2vw(20);
  }
  .headPic{
    border: 1px solid red;
    width: px2vw(50);
    height: px2vw(50);
    border-radius: 50%;
    margin-right: px2vw(20);
    vertical-align: middle;
  }
  .class{
    display: inline-block;
    height: px2vw(40);
    vertical-align: middle;
    text-align: center;
    line-height: px2vw(40);
    font-size: px2vw(24);
    color: #3676b6;
    border: 1px solid #3676b6;
    border-radius: px2vw(6);
    padding-left: px2vw(4);
    padding-right: px2vw(4);
    margin-top: px2vw(10);
    margin-left: px2vw(18);
  }
  .headName{
    vertical-align: middle;
    font-size: px2vw(32);
    color: #333333;
  }
  .read{
    height: px2vw(80);
    background-color: white;
    padding-left: px2vw(20);
    font-size: px2vw(24);
    color: #999999;
    border-bottom: px2vw(1) solid #dcdcdc;
  }
  .drop{
    font-size: px2vw(50);
    vertical-align: middle;
  }
  .readS{
    vertical-align: middle;
  }
  .readTime{
    float: right;
    margin-top: px2vw(20);
    margin-right: px2vw(20);
  }
  .content{
    background-color: white;
    width: 100vw;
    padding-bottom: px2vw(52);
  }
  .contentImgBox{
    display: inline-block;
    min-width: px2vw(20);
    max-width: 100%;
    height: auto;
  }
  .content img{
    width: 100% !important;
    height: auto;
  }


  .likeBox span{
    vertical-align: middle;
  }


  .title2{
    display: table-cell;
    vertical-align: middle;
    height: px2vw(88);
    width: 100vw;
    text-align: center;
  }
  .backImgBox2{
    position: absolute;
    padding: px2vw(23) px2vw(35) 0 px2vw(20);
    top:0;
    left: 0;
    height: px2vw(88);
  }
  .backImgBox2>img{
    width: px2vw(24);
    height: px2vw(42);
  }

  .changeIndex{
    position: fixed;
    top: 0;
    left: 0;
    z-index: -10;

  }
</style>

