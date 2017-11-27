<template>
  <div>
    <div class="header" @click="blurClass">
      <div class="backIco" @click="closePage"></div>
      <div class="release" @click="postQuest">
          提交
      </div>
    </div>
    <div class="container">
      <div class="line">
        <span>分类</span>
        <span class="othersSelect" >
            <span v-html="classifyName?classifyName:'请选择分类'" @click="selectClassify"></span>
            <img src="../../../../images/mine/coin_img1.png" alt="">
          </span>
      </div>
      <div class="title">
        <textarea maxlength="50"></textarea>
      </div>
    </div>
    <mt-picker :slots="slots" @change="onValuesChange" :showToolbar="true" class="pickers" v-show="isClassPicker">
      <div class="classPicker">
        <span class="classPickerCancel" @click="onClassPicker(0)">取消</span>
        选择分类
        <span class="classPickerConfirm" @click="onClassPicker(1)">完成</span>
      </div>
    </mt-picker>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Indicator, Picker, Toast, MessageBox  } from 'mint-ui'

  export default {
    data(){
      return{
        isClassPicker:false,
        classify:'',
        classifyName:'',
        slots: [
          {
            flex: 1,
            values: [ '口腔外科', '口腔内科', '口腔修复','口腔种植', '口腔正畸'],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        args:{
          headline:'',
          classify:'',
          freeContent:'',
          chargeContent:'',
          chargeNumber:null,
          postStater:1,
          cover:'',
          postId:null,
        },
      }
    },
    methods:{
      blurClass(){

      },
      closePage(){

      },
      postQuest(){

      },
      selectClassify(){
        this.isClassPicker =true;
      },
      onValuesChange(picker, values) {
        console.log(this.slots[0].values.indexOf(values[0]));
        this.classify = this.slots[0].values.indexOf(values[0]) + 1;
      },
      onClassPicker(num){
        if(num){
          if(this.classify < 0){
            this.args.classify = 1
          }else {
            this.args.classify = this.classify;
            this.classifyName = this.slots[0].values[parseInt(this.classify) - 1]
          }
        }else {
//          this.args.classify = ''
        }
//        console.log(this.args.classify);
        this.isClassPicker = false
      },
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: px2vw(88);
    z-index: 999;
    /*line-height: px2vw(88);*/
    text-align: center;
    background-color: $themeColor;
    color: #fff;
    font-size: px2vw(24);
    .backIco{
      position: absolute;
      top: 0;
      height: 100%;
      left: 0;
      width: px2vw(150);
      background: url("../../../../images/case/close.png") px2vw(20) center no-repeat;
      background-size: px2vw(30) px2vw(30);
    }
    .release{
      line-height: px2vw(88);
      font-size: px2vw(32);
      float: right;
      display: inline-block;
      width: px2vw(100);
    }
  }
  .container{
    position: fixed;
    top: px2vw(88);
    bottom: 0;
    overflow: scroll;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    .line{
      width: 100%;
      padding: 0 3%;
      height: px2vw(90);
      line-height: px2vw(90);
      border-bottom: 1px solid #ddd;
      .othersInput{
        float: right;
        min-height: px2vw(88);
        line-height: px2vw(88);
        border: none;
        text-align: right;
        color: #999;
      }
      .othersInput::placeholder{
        color: #999;
      }
      .othersSelect{
        float: right;
        color: #999;
      }
      img{
        margin-left: px2vw(6);
        width: px2vw(14);
      }
    }
  }
  .pickers{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    .classPicker{
      text-align: center;
      color: #000;
      font-size: px2vw(32);
      height: 40px;
      line-height: 40px;
      .classPickerCancel{
        color: $themeColor;
        float: left;
        width: px2vw(150);
      }
      .classPickerConfirm{
        color: $themeColor;
        float: right;
        width: px2vw(150);
      }
    }
  }
</style>
