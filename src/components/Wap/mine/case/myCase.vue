<template>
    <div>

      <div class="backgroundImg"></div>
      <div class="wrapTop">
        <span class="title">我的病例</span>
        <span class="backImgBox">
          <img src="../../../../images/case/backer.png" alt="">
        </span>
        <span class="writeCaseImgBox">
          <img src="../../../../images/case/myCase/writeCase.png" alt="">
          写病历
        </span>
      </div>
      <div class="classBox">
          <span @click="changeClass(index)" :class="{'changeColor': change == index}"  v-for="(item, index) in classArgs">
            {{item}}
            <div :class="{'changeBorder': change == index}"></div>
          </span>
      </div>

      <div class="container">

        <div @click="toGoCase(item.postId)" v-for="(item,index) in myCaseList"  v-if="myCaseList"  class="caseBox">
          <div class="userBox addChange1" >
            <div class="userPicture">
              <img v-if="change == 2" :src=" item.printUrl == null? require('../../../../images/mine/zhifubao.png') : item.printUrl" alt="">
              <span class="userName" :class="{'userWrite': change != 2}">{{item.writer}}</span>
              <span class="userName userTime">5分钟前</span>
            </div>
            <div class="caseContent">
              标题
            </div>
          </div>
          <div  class="userImgBox addChange2">
            <img src="../../../../images/mine/topBackGround.png" alt="">
          </div>

          <div v-if="change != 0" class="readeBox">
            <span class="readeClass">{{item.classify}}</span>
            <span class="readeNum">{{item.readNumber}} 阅读</span>
            <span class="readeNum2">· {{item.commentNumber}}评论</span>
            <span class="readeNum2">· {{item.postFavour}}赞</span>
            <span class="coin"> {{item.chargeNumber}}乾币</span>
          </div>
        </div>


        <div v-if="change == 0 && myCaseList == null" class="spaceImgBox">
          <img class="spaceImgFont" src="../../../../images/case/myCase/caogao.png" alt="">
          <div class="spaceSize">还没有草稿</div>
          <div class="spaceFont">(未发布的病例会存储在这里)</div>
        </div>

        <div v-if="change == 1 && myCaseList == null" class="spaceImgBox">
          <img class="spaceImg" src="../../../../images/case/myCase/fabu.png" alt="">
          <div class="spaceSize">尚未发布病例</div>
          <div class="spaceColor">去写病例~</div>
        </div>

        <div v-if="change == 2 && myCaseList == null" class="spaceImgBox">
          <img class="spaceImg" src="../../../../images/case/myCase/goumai.png" alt="">
          <div class="spaceSize">还没有购买病例</div>
          <div class="spaceColor">发现更多病例</div>
        </div>

      </div>

      <!--末尾-->
    </div>
</template>

<script>
  export default {
    data(){
      return{
        src: '../../../../images/mine/zhifubao.png',
        change: 0,
        classArgs: ['草稿箱', '已发布', '已购买'],
        myCase: {    //'草稿箱''已发布' 请求的数据
          currentPage: 1,
          numberPerPage: 10,
          type: 2,
          order: 0,
          postStater: 2
        },
        myCaseList: []
      }
    },
    created(){
      this.getCaseList();
    },
    methods:{
      getPayedList(){
        this.$store.dispatch('GET_PAY_CASE', {}).then( (res)=>{
          console.log(res , 'haha');
          this.myCaseList = res.data;
        });
      },
      getCaseList(){
        this.$store.dispatch('GET_MY_CASE', this.myCase).then( (res)=>{
          this.myCaseList = res.data;
          console.log(this.myCaseList);
        });
      },

      toGoCase(postId){
        if(this.change === 0) //草稿
        {

        }else if(this.change === 1) //发布
        {
          this.$router.push({path: '/caseDetailed', query:{id: postId, myCase: 1}})
        }else {               //已购买
          this.$router.push({path: '/caseDetailed', query:{id: postId}})
        }
      },

      changeClass(index){
        this.change = index;
        if(index === 0) //草稿
        {
          this.myCase.postStater = 2;
          this.getCaseList();
        }else if(index === 1) //发布
        {
          this.myCase.postStater = 1;
          this.getCaseList();
        }else { //已购买
          this.getPayedList();
        }

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../../common/sass/factory";

    .spaceImgFont{
      width: px2vw(98);
      height: px2vw(97);
    }
    .spaceFont{
      color: #666666;
      font-size: px2vw(24);
    }

    .spaceImgBox{
      position: fixed;
      top:44%;
      text-align: center;
      width: 100vw;
    }
    .spaceImg{
      width: px2vw(108);
      height: px2vw(147);
    }
    .spaceSize{
      color: #666666;
      font-size: px2vw(30);
    }
    .spaceColor{
      color: $themeColor;
    }
    .caseBox{
      background-color: #ffffff;
      border-bottom: 1px solid #f4f4f4;
      padding: px2vw(36) px2vw(17) px2vw(35) px2vw(17);
    }
    /* 有图添加样式 */
    .addChange2{
      display: inline-block !important;
      float: right;
      margin-top: px2vw(10);

    }
    .addChange1{
      display: inline-block !important;
      width: px2vw(508) !important;
    }
    /* 有图添加样式 */

    .userPicture img{
      vertical-align: middle;
      width: px2vw(56);
      height: px2vw(56);
      border-radius: 50%;
    }
    .userName{
      margin-left: px2vw(20);
      font-size: px2vw(26);
      vertical-align: middle;
    }
    .userName.userTime{
      font-size: px2vw(24);
      color: #999999;
    }
    .caseContent{
      min-height: px2vw(100);
      margin-top: px2vw(24);
      font-size: px2vw(36);
    }
    .userImgBox>img{
      width: px2vw(160);
      height: px2vw(160);
      border-radius: px2vw(10);
    }
    .readeBox{
      margin-top: px2vw(28);
    }
    .readeClass{
      width: px2vw(98);
      height: px2vw(26);
      border: 1px solid #3676b6;
      text-align: center;
      color: #3676b6;
      line-height: 0;
      padding-bottom: px2vw(2);
      border-radius: px2vw(8);
    }
    .readeNum{
      margin-left: px2vw(18);
      color: #999999;
    }
    .readeNum2{
      margin-left: px2vw(8);
      color: #999999;
    }
    .coin{
      float: right;
      font-size: px2vw(24);
      color: #d81e06;
    }
    .writeCaseImgBox{
      position: absolute;
      padding: px2vw(23) px2vw(24) 0 px2vw(20);
      top:0;
      right: 0;
      height: px2vw(88);
      font-size: px2vw(30);
    }
    .writeCaseImgBox img{
      width: px2vw(30);
      height: px2vw(30);
      vertical-align: middle;
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
    .title{
      display: table-cell;
      vertical-align: middle;
      height: px2vw(88);
      width: 100vw;
      text-align: center;
    }
    .wrapTop{
      z-index: 2000;
      position: fixed;
      height: px2vw(88);
      top:0;
      width: 100vw;
      background-color: $themeColor;
      text-align: center;
      color: #ffffff;
      font-size: px2vw(36);
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
  .classBox{
    z-index: 100;
    font-size: px2vw(30);
    background-color: white;
    position: fixed;
    top:px2vw(88);
    height: px2vw(88);
    width: 100vw;
    color: #999999;
    text-align: center;
    border-bottom: 1px solid #f4f4f4;
  }

  .classBox>span{
    display: inline-block;
    height: px2vw(88);
    line-height: px2vw(88);
    padding-left: px2vw(23);
    padding-right: px2vw(23);
    position: relative;
  }

  .changeColor{
    color: $themeColor !important;

  }
  .changeBorder{
    position: absolute;
    bottom: 0;
    border-bottom: px2vw(4) solid $themeColor;
    width: 69%;
  }
  .container{
    position: absolute;
    top:px2vw(176);
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
    width: 100%;
  }
  .userWrite{
    margin-left: px2vw(2) !important;
  }
</style>

