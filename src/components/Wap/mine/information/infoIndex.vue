<template>
  <div>
    <commonHeader :headerText="'消息中心'"></commonHeader>
    <div class="container">
      <div class="line" @click="gotoPage(1)">
        <div class="logoImg">
          <img src="../../../../images/mine/commentInfo.png" alt="">
        </div>
        <div class="detail">
          <span class="title">评论</span>
          <div class="floatRight">
            <span class="infoNum" v-if="myInfo > 0">{{myInfo}}</span>
            <img src="../../../../images/mine/right.png" alt="">
          </div>
        </div>
        <div class="clr"></div>
      </div>
      <div  class="line" @click="gotoPage(2)">
        <div  class="logoImg">
          <img src="../../../../images/mine/commentInfo.png" alt="">
        </div>
        <div  class="detail">
          <span class="title">问答</span>
          <div  class="floatRight">
            <span  class="infoNum"  v-if="myAnswer > 0">{{myAnswer}}</span>
            <img src="../../../../images/mine/right.png" alt="">
          </div>
        </div>
        <div class="clr"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import commonHeader from '../../../salesWap/salesHeader.vue'
import { GET_INFO_NUM } from '../../../../vuex/types'
import { tokenMethods } from '../../../../vuex/util'

export default {
  data(){
    return{
      myInfo:'',
      myAnswer:'',
    }
  },
  components:{
    commonHeader,
  },
  created(){
    this.$store.dispatch(GET_INFO_NUM,{}).then(res =>{
      this.myInfo = res.data.commentNumber + parseInt(tokenMethods.getInfoNum());
      tokenMethods.setInfoNum(this.myInfo);
    })
  },
  methods:{
    gotoPage(num){
      this.$router.push({path:'/infoList',query:{type:num}});
      this.$destroy()
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  .container{
    width: 100%;
    margin-top: px2vw(88);
    .line{
      width: 100%;
      height: px2vw(130);
      .logoImg{
        width: px2vw(160);
        float: left;
        text-align: center;
        img{
          margin: px2vw(20) auto 0;
          width: px2vw(90);
        }
      }
      .detail{
        float: right;
        width: px2vw(590);
        border-bottom: px2vw(1) solid #e5e5e5;
        .title{
          font-size: px2vw(30);
          line-height: px2vw(130);
        }
        .floatRight{
          line-height: px2vw(130);
          float: right;
          .infoNum{
            font-size: px2vw(28);
            color: #fff;
            background-color: #ff0000;
            padding: 0 px2vw(10);
            border-radius: px2vw(15);
          }
          img{
            vertical-align: sub;
            margin: 0 px2vw(20);
          }
        }
      }
      .clr{
        clear: both;
      }
    }
  }
</style>
