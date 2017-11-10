<template>
  <div>
    <div class="header" @click="blurClass">
      <div class="backIco" @click="closePage"></div>
      <div class="saveAndRelease">
        <div class="release" @click="postCase(1)">
          <img src="../../../../images/case/release.png" alt="">
          发布
        </div>
        <div class="save" @click="postCase(2)">
          <img src="../../../../images/case/save.png" alt="">
          保存
        </div>
      </div>
    </div>
    <div class="newCaseWrap">
      <div class="inputTitle" @click="blurClass">
        <input class="textArea"  v-model="args.headLine" placeholder="请输入标题">
      </div>
      <div id="quillFee">
        <quill-editor ref="editorFee"
                      :content="args.freeContent"
                      :options = "editorOptionFee"
                      @change="onEditorChangeFee($event)"
                      @focus="onEditorFocusFee($event)">
        </quill-editor>
      </div>
      <div id="quillCharge">
        <quill-editor ref="editorCharge"
                      :content="args.chargeContent"
                      :options = "editorOptionCharge"
                      @change="onEditorChangeCharge($event)"
                      @focus="onEditorFocusCharge($event)">
        </quill-editor>
      </div>
      <div class="others" @click="blurClass">
        <div class="line"  v-if="args.chargeContent">
          <span>价格（乾币）</span>
          <input type="number" placeholder="请输入付费内容的价格" class="othersInput" v-model="args.feeNumber">
        </div>
        <div class="line">
          <span>分类</span>
          <span class="othersSelect" >
            <span v-html="args.classify?args.classify:'请选择分类'" @click="selectClassify"></span>
            <img src="../../../../images/mine/coin_img1.png" alt="">
          </span>
        </div>
        <div class="line" v-if="!this.args.postId">
          <el-checkbox @change="isShare"></el-checkbox><span @click.stop="labelFor"> 分享到牙医圈</span>
        </div>
      </div>
    </div>
    <mt-picker :slots="slots" @change="onValuesChange" :showToolbar="true" class="pickers" v-show="isClassPicker">
      <div class="classPicker">
        <span class="classPickerCancel" @click="onClassPicker(0)">取消</span>
        选择分类
        <span class="classPickerConfirm" @click="onClassPicker(1)">完成</span>
      </div>
    </mt-picker>
    <!--一个不可见的上传图片的功能-->
    <el-upload
      class="avatar-uploader needclick"
      style="display: none;"
      :action="qiNiuConfig.url"
      :show-file-list="false"
      :on-success="uploadFile"
      :data="qiNiuToken"
      :on-progress="upLoading"
    ></el-upload>
  </div>
</template>

<script type="text/ecmascript-6">
  import { quillEditor } from 'vue-quill-editor'
  import {GET_UPLOAD_TOKEN, UPLOAD_CASE, NEW_TREND} from '../../../../vuex/types'
  import {Indicator, Picker, Toast, MessageBox  } from 'mint-ui'

  export default {
    data(){
      return{
        inputTitle:'',
        editorOptionFee: {                    //富文本编辑器设置
          // something config
          placeholder: '*请输入正文（免费内容）',
          modules:{
            toolbar: [
              'bold', 'italic',        // toggled buttons
              { 'color': [] }, { 'background': [] },          // dropdown with defaults from theme
              { 'align': [] },
              'image'
            ]
          }
        },
        editorOptionCharge: {                    //富文本编辑器设置
          // something config
          placeholder: '请输入正文（付费内容）',
          modules:{
            toolbar: [
              'bold', 'italic',        // toggled buttons
              { 'color': [] }, { 'background': [] },          // dropdown with defaults from theme
              { 'align': [] },
              'image'
            ]
          }
        },
        articleDataFee:{
          content:'',
        },
        articleDataCharge:{
          content:'',
        },
        isFee:false,
        qiNiuConfig: {
          url: 'http://upload-z2.qiniu.com/',
          ShUrl: 'http://orl5769dk.bkt.clouddn.com/'
        },
        qiNiuToken:{},
        contImgList:[],
        args:{
          headLine:'',
          classify:'',
          freeContent:'',
          chargeContent:'',
          writer:'',
          feeNumber:null,
          postStater:1,
          cover:'',
          postId:null,
        },
        slots: [
          {
            flex: 1,
            values: ['口腔种植', '口腔正畸', '口腔外科', '口腔内科', '口腔修复'],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        isClassPicker:false,
        classify:'',
        share:false
      }
    },
    component:{
      quillEditor
    },
    computed: {
      editorFee() {
        return this.$refs.editorFee.quill
      },
      editorCharge(){
        return this.$refs.editorCharge.quill
      }
    },
    methods:{
      //监听是否显示出富文本编辑的框，和保存输入的内容
      blurClass(){
        document.body.classList.remove('full-body');
        document.body.classList.remove('full-body2')
      },
      onEditorFocusFee({editor, html, text}){
        document.body.classList.remove('full-body2')
        document.body.classList.add('full-body')
      },
      onEditorChangeFee({editor, html, text}) {
        this.args.freeContent = html.replace(/img/g,"img style='max-width:100%;'");
        document.body.classList.add('full-body')
      },
      onEditorFocusCharge({editor, html, text}){
        document.body.classList.remove('full-body')
        document.body.classList.add('full-body2')
      },
      onEditorChangeCharge({editor, html, text}) {
        this.args.chargeContent = html.replace(/img/g,"img style='max-width:100%;'");
        document.body.classList.add('full-body2')
      },
      //初始化两个富文本编辑器
      initFee(file){
        let that = this;
        that.editorFee.on('text-change',(delta,oldDelta,source)=>{
          if(source == 'user'){
            that.articleDataFee.content = that.editorFee.container.firstChild.innerHTML;
          }
        })
        var toolbar1 = that.editorFee.getModule('toolbar');
        toolbar1.addHandler('image',()=>{
          that.isFee = true
          var s1 = document.getElementsByClassName("el-upload__input")
          s1[0].click();
        })
      },
      initCharge(file){
        let that = this;
        that.editorCharge.on('text-change',(delta,oldDelta,source)=>{
          if(source == 'user'){
            that.articleDataCharge.content = that.editorCharge.container.firstChild.innerHTML;
          }
        })
        var toolbar2 = that.editorCharge.getModule('toolbar');
        toolbar2.addHandler('image',()=>{
          that.isFee = false
          var s2 = document.getElementsByClassName("el-upload__input")
          s2[0].click();
        })
      },
      labelFor(){
        var labels = document.getElementsByClassName("el-checkbox__original")
        labels[0].click();
      },
      //上传图片
      upLoading(){
        Indicator.open('图片上传中...');
      },
      uploadFile(res,file){
        console.log('cg')
        let that = this
        this.contImgList.push(that.qiNiuConfig.ShUrl + file.response.key);
        if(this.isFee) {
          this.editorFee.insertEmbed(10, 'image', this.qiNiuConfig.ShUrl + file.response.key)
        }else {
          this.editorCharge.insertEmbed(10, 'image', this.qiNiuConfig.ShUrl + file.response.key)
        }
        Indicator.close();
//        console.log(this.contImgList)
      },
      selectClassify(){
        this.isClassPicker =true;
      },
      //监听选择病例类型变化
      onValuesChange(picker, values) {
        this.classify = values[0];
      },
      //病例选择的确定&取消时的方法，0取消，1确定
      onClassPicker(num){
        if(num){
          if(!this.classify){
            this.args.classify = '口腔外科'
          }else {
            this.args.classify = this.classify;
          }
        }else {
//          this.args.classify = ''
        }
//        console.log(this.args.classify);
        this.isClassPicker = false
      },
      //保存和发布的方法。
      postCase(num){
        this.args.postStater = num;
        this.args.postId = this.args.postId ? this.args.postId : 0;
        for(let i = 0;i < this.contImgList.length;i++){
          if(this.args.freeContent.indexOf(this.contImgList[i]) !== -1){
            this.args.cover = this.contImgList[i];
            break;
          }
        }
        //下面就要调用接口了
        console.log(this.args)
//        switch (true){
//          case !this.args.headLine:
//            Toast({message: '标题不能为空', duration: 1500});
//            return
//          case !this.args.freeContent:
//            Toast({message: '一定要有免费内容喔', duration: 1500});
//            return
//          case !this.args.classify:
//            Toast({message: '请选择一个分类', duration: 1500});
//            return
//          case this.args.chargeContent && !this.args.feeNumber:
//            Toast({message: '请输入价格', duration: 1500});
//            return
//        }
//        this.$store.dispatch(UPLOAD_CASE,this.args).then(res => {
//          console.log(res)
//          if(this.args.postStater === 1) {
//            Toast({message: '病例发布成功！', duration: 1500});
//            if(this.share){
//              //把返回结果的postid传进去
////              this.shareCase();
//            }
//          }else {
//            Toast({message: '病例保存成功！', duration: 1500});
//          }
////          this.$router.push()
//        })
      },
      //是否分享到牙医圈功能
      isShare(){
        this.share = !this.share;
        console.log(this.share)
      },
      shareCase(postId){
        let obj = {
          momentType: 3,
          momentContent: null,
          momentPicture: null,
          momentContentId: postId
        }
        this.$store.dispatch(NEW_TREND,obj).then(res => {})
      },
      closePage(){
        MessageBox.confirm('是否保存为草稿方便下次继续编辑?').then(action => {
          this.postCase(2);
          console.log('save')
        }).catch(reject =>{
          console.log('cancel')
          this.$router.go(-1)
        });
      }
    },
    created() {
//      this.mBack("back");
      //获取七牛token,防止重复请求
      this.$store.dispatch(GET_UPLOAD_TOKEN).then(res => {
        this.qiNiuToken = {
          token: res.msg
        }
      })
      //获取postId，请求数据
      //获取旧的文章接口数据，有数据就返到args里
    },
    mounted() {
      this.initFee();
      this.initCharge();
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
    .saveAndRelease{
      line-height: px2vw(52);
      .save{
        float: right;
        display: inline-block;
        width: px2vw(100);
      }
      .release{
        float: right;
        display: inline-block;
        width: px2vw(100);
      }
    }
    img{
      margin: px2vw(8) auto 0;
      height: px2vw(36);
      display: block;
    }
  }
  .newCaseWrap{
    position: fixed;
    top: px2vw(88);
    bottom: 0;
    overflow: scroll;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    .inputTitle{
      width: 100%;
      min-height: px2vw(90);
      .textArea{
        padding: 0 3%;
        width: 100%;
        font-size:px2vw(36);
        min-height: px2vw(90);
        line-height: px2vw(90);
        border: none;
        border-bottom: 1px solid #ddd;
      }
    }
    .others{
      border-top: px2vw(20) solid #f4f4f4;
      color: #333;
      width: 100%;
      font-size: px2vw(30);
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

  .ql-toolbar.ql-snow .ql-formats{
    margin-right: 0;
  }
  .ql-snow .ql-formats {
    display: flex;
    vertical-align: middle;
    justify-content: space-around;
  }
  .ql-toolbar.ql-snow{
    display: none;
    border: none;
    background-color: #fff;
    border-top: 1px solid #ddd;
  }
  .ql-container.ql-snow{
    border: none;
    min-height: px2vw(300);
    border-bottom: 1px solid #ddd;
  }
  .ql-container.ql-snow:first-child{
    border-bottom: 1px solid #ddd;
  }
  .ql-blank{
    color: red;
  }
  .picker{
    background-color: #fff;
    border-top: 1px solid #ddd;
  }
  .ql-picker-options{
    margin-top: -131px;
  }
</style>
