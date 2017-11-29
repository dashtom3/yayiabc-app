<template>
  <div>
    <div class="header" @click.stop="blurFocus">
      <div class="backIco" @click="closePage"></div>
      <div class="release" @click="postQuest">
          提交
      </div>
    </div>
    <div class="container" @click.stop="blurFocus">
      <div class="line"  @click.stop="blurFocus">
        <span>分类</span>
        <span class="othersSelect" >
            <span v-html="classifyName?classifyName:'请选择分类'" @click="selectClassify"></span>
            <img src="../../../../images/mine/coin_img1.png" alt="">
          </span>
      </div>
      <div class="title">
        <textarea maxlength="50" rows="3" v-model="args.faqQuestionTitle" placeholder="你的问题（必填，5到50字以内）" @click.stop="focusDetail(0)"></textarea>
        <span>{{args.faqQuestionTitle.length}}/50</span>
      </div>
      <div class="detail">
        <textarea  v-model="args.faqQuestionContent" placeholder="补充说明（选填）" @click.stop="focusDetail(1)" ></textarea>
      </div>
    </div>
    <mt-picker :slots="slots" @change="onValuesChange" :showToolbar="true" class="pickers" v-show="isClassPicker">
      <div class="classPicker">
        <span class="classPickerCancel" @click="onClassPicker(0)">取消</span>
        选择分类
        <span class="classPickerConfirm" @click="onClassPicker(1)">完成</span>
      </div>
    </mt-picker>
    <div class="newQuestionUpLoadIcon" v-if="showUploadIco">
      <div class="newQuestionImgIco" @click="chooseImg"></div>
    </div>
    <el-upload
      class="avatar-uploader needclick"
      style="display: none;"
      :limit='9'
      :action="qiNiuConfig.url"
      :show-file-list="false"
      :on-success="uploadFile"
      :before-upload="beforeUploading"
      :data="qiNiuToken"
      :on-progress="upLoading"
    ></el-upload>
    <!--<div class="blur" @click.stop="blurFocus"></div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import {Indicator, Picker, Toast, MessageBox  } from 'mint-ui'
  import {GET_UPLOAD_TOKEN, ADD_QUESTION} from '../../../../vuex/types'
  import {mapState} from 'vuex'

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
            textAlign: 'center',
            defaultIndex:2,
          }
        ],
        args:{
          faqQuestionTitle:'',
          faqQuestionType:'',
          faqQuestionContent:'',

        },
        qiNiuConfig:this.$store.state.index.qiNiuConfig,
        qiNiuToken:{},
        showUploadIco:false,
        contImgList:[],
      }
    },
    methods:{
      closePage(){
        MessageBox.confirm('是否退出本次编辑?').then(action => {
          this.$router.go(-1)
          console.log('save')
        }).catch(reject =>{});
      },
      postQuest(){
        switch (true){
          case this.args.classify < 0:
            Toast({message: '请选择一个分类', duration: 1500});
            return
          case !this.args.faqQuestionTitle:
            Toast({message: '请输入你的问题', duration: 1500});
            return
        }
        this.$store.dispatch(ADD_QUESTION, this.args).then(res=>{
          if(res.callStatus === 'SUCCEED'){
            Toast('发布成功！');
            this.$router.push('/QandAList');
          }
        })
      },
      selectClassify(){
        this.isClassPicker =true;
      },
      focusDetail(num){
        document.body.classList.add('newQuestBody')
        if(num){
          this.showUploadIco = true
        }else {
          this.showUploadIco = false;
        }
      },
      blurFocus(num){
        document.body.classList.remove('newQuestBody');
        this.showUploadIco = false;
      },
      onValuesChange(picker, values) {
        console.log(this.slots[0].values.indexOf(values[0]));
        this.classify = this.slots[0].values.indexOf(values[0]) + 1;
      },
      onClassPicker(num){
        if(num){
          if(this.classify < 1){
            this.args.classify = 2
            this.classifyName = this.slots[0].values[2]
          }else {
            this.args.classify = this.classify;
            this.classifyName = this.slots[0].values[this.args.classify - 1]
          }
        }else {
          this.classify = -1;
          this.args.classify = '';
          this.classifyName = ''
        }
//        console.log(this.args.classify);
        this.isClassPicker = false
      },
      chooseImg(){
        var s1 = document.getElementsByClassName("el-upload__input")
        this.$store.dispatch(GET_UPLOAD_TOKEN).then(res => {
          this.qiNiuToken = {
            token: res.msg
          }
          console.log(this.qiNiuToken)
        })
        s1[0].click();
      },
      upLoading(){
        Indicator.open('图片上传中...');
      },
      beforeUploading(){

      },
      uploadFile(res,file){
        let that = this
        this.contImgList.push(that.qiNiuConfig.ShUrl + file.response.key);
        Indicator.close();
//        console.log(this.contImgList)
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
      border-bottom: px2vw(1) solid #ddd;
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
    .title{
      width: 100%;
      height: px2vw(265);
      border-bottom: px2vw(1) solid #e5e5e5;
      textarea{
        border: none;
        resize: none;
        width: 100%;
        height: 100%;
        padding: px2vw(20) px2vw(20) 0;
        line-height: px2vw(60);
        font-size: px2vw(30);
        color: #333;
      }
      span{
        position: absolute;
        right: px2vw(20);
        top: px2vw(300);
        font-size: px2vw(28);
        color: #999;
      }
    }
    .detail{
      width: 100%;
      height: px2vw(360);
      border-bottom: px2vw(1) solid #e5e5e5;
      textarea{
        border: none;
        resize: none;
        width: 100%;
        height: 100%;
        padding: px2vw(20) px2vw(20) 0;
        line-height: px2vw(60);
        font-size: px2vw(30);
        color: #333;
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

<style lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  body {
    &.newQuestBody{
      position: fixed !important;
      top: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
      overflow: hidden !important;
      .newQuestionUpLoadIcon{
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1000;
        width: 100%;
        height: px2vw(80);
        border-top: px2vw(1) solid #e5e5e5;
        border-bottom: px2vw(1) solid #e5e5e5;
        .newQuestionImgIco{
          width: px2vw(80);
          height: px2vw(80);
          margin-left: px2vw(30);
          background: url("../../../../images/question/imgIco.png") px2vw(20) center no-repeat;
          background-size: px2vw(39) px2vw(34);
          z-index: 1001;
        }
      }
    }

    .picker-item{
      height: px2vw(90);
      line-height: px2vw(90);
      font-size: px2vw(30);
    }
    .picker-selected{
      color: $themeColor!important;
    }
  }
</style>
