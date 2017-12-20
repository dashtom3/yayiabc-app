<template>
  <div>
    <div class="header">
      <span @click="closePage">取消</span>
      <span>分享到牙医圈</span>
      <span @click="release">发布</span>
    </div>
    <div class="container">
      <div class="inputArea">
        <textarea name="" id="" cols="30" rows="10" placeholder="分享我的想法" v-model="shareData.momentContent"></textarea>
      </div>
      <div class="casePreview">
        <div class="coverImg" v-if="caseDetailArgs.cover">
          <img :src="caseDetailArgs.cover" alt="" v-if="caseDetailArgs.cover">
          <img src="../../../images/yayiCircle/noImgDefault.png" alt="" v-else>
        </div>
        <div class="caseTitle">
          {{caseDetailArgs.headline}}
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {GET_CASE_DETAIL, NEW_TREND} from '../../../vuex/types'
  import {Toast, MessageBox } from 'mint-ui'

  export default {
    data(){
      return{
        shareData: '',
        caseDetailArgs:{
          headline:'',
          cover:''
        },
      }
    },
    created(){
      this.shareData = this.$route.query;
      console.log(this.shareData)
    },
    mounted(){
      switch (true){
        case this.shareData.momentType == 4:
          this.$store.dispatch('FAQ_DETAIL', {faqQuestionId: this.shareData.momentContentId}).then((res) => {
//            this.caseDetailArgs = res.data;
            this.caseDetailArgs.headline = res.data.faqQuestionTitle
            console.log(this.caseDetailArgs)
          });
          break;
        case this.shareData.momentType == 3:
          this.$store.dispatch('GET_CASE_DETAIL', {postId: this.shareData.momentContentId}).then((res) => {
            this.caseDetailArgs = res.data;
          });
          break;
        case this.shareData.momentType == 2:
          break;
      }
    },
    methods:{
      closePage(){
        this.$router.go(-1)
        this.$destroy()
      },
      release(){
        this.$store.dispatch(NEW_TREND,this.shareData).then(res => {
          Toast({message: '发布成功！', duration: 1500})
          this.$router.push(this.$route.query.backName);
          this.$destroy()
        })
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .header {
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
    span:nth-child(1){
      display: inline-block;
      width: px2vw(100);
      float: left;
      font-size: px2vw(30);
    }
    span:nth-child(2){
      display: inline-block;
      font-size: px2vw(36);
    }
    span:nth-child(3){
      display: inline-block;
      width: px2vw(100);
      float: right;
      font-size: px2vw(30);
    }
  }
  .container{
    padding: 0 px2vw(20);
    position: fixed;
    top: px2vw(88);
    bottom: 0;
    overflow: scroll;
    width: 100%;
    .inputArea{
      width: 100%;
      height: px2vw(220);
      margin-bottom: px2vw(20);
      textarea{
        width: 100%;
        height: 100%;
        resize: none;
        border: none;
        font-size: px2vw(28);
        padding-top: px2vw(20);
      }
    }
    .casePreview{
      width: 100%;
      height: px2vw(180);
      border: px2vw(1) solid #eee;
      .coverImg{
        width:px2vw(180);
        height: px2vw(180);
        float: left;
        img{
          width: 100%;
        }
      }
      .caseTitle{
        height: px2vw(100);
        font-size: px2vw(30);
        line-height: px2vw(50);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin: px2vw(40) px2vw(20);
        width: px2vw(480);
        float: right;
      }
     }
  }
</style>
