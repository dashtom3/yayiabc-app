<template>
  <div class="new-case-wrapper">
    <div class="header" @click="blurClass">
      <div class="backIco" @click="closePage"></div>
      <div class="saveAndRelease">
        <div class="release" @click="postCase(1)">
          <img src="../../../../images/case/release.png" alt="">
          发布
        </div>
        <!-- <div class="save" @click="postCase(2)" v-if="args.postStater == 2"> -->
        <div class="save" @click="postCase(2)">
          <img src="../../../../images/case/save.png" alt="">
          保存
        </div>
      </div>
    </div>
    <div class="newCaseWrap">
      <div class="inputTitle" @click="blurClass">
        <input class="textArea"  v-model="args.headline" placeholder="请输入标题">
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
      <div class="others">
        <div class="line"  v-if="args.chargeContent" @click="selectClassify(1)">
          <span>价格（乾币）</span>
          <span class="othersSelect" >
            <span v-html="chargeNumN?chargeNumN:'请选择价格'"></span>
            <img src="../../../../images/mine/coin_img1.png" alt="">
          </span>
        </div>
        <div class="line" @click="selectClassify(0)">
          <span>分类</span>
          <span class="othersSelect" >
            <span v-html="classifyName?classifyName:'请选择分类'"></span>
            <img src="../../../../images/mine/coin_img1.png" alt="">
          </span>
        </div>
        <!-- <div class="line" v-if="args.postStater == 2"> -->
        <div class="line">
          <el-checkbox @change="isShare" fill="'#3676B5'" class="needclick"></el-checkbox><span @click.stop="labelFor"> 分享到牙医圈</span>
        </div>
      </div>
      <!--<div class="blur" @click="blurClass"></div>-->
    </div>
    <mt-picker :slots="slots" @change="onValuesChange" :showToolbar="true" class="pickers" v-show="isClassPicker">
      <div class="classPicker">
        <span class="classPickerCancel" @click="onClassPicker(0)">取消</span>
        选择分类
        <span class="classPickerConfirm" @click="onClassPicker(1)">完成</span>
      </div>
    </mt-picker>
    <mt-picker :slots="sloty" @change="onChargeChange" :showToolbar="true" class="pickers" v-show="isClassPickerN">
      <div class="classPicker">
        <span class="classPickerCancel" @click="onClassPickerN(0)">取消</span>
        选择价格
        <span class="classPickerConfirm" @click="onClassPickerN(1)">完成</span>
      </div>
    </mt-picker>
    <!--一个不可见的上传图片的功能-->
    <el-upload
      class="avatar-uploader needclick"
      style="display: none;"
      :action="qiNiuConfig.url"
      :show-file-list="false"
      :on-success="uploadFile"
      :before-upload="beforeUploading"
      :data="qiNiuToken"
      :on-progress="upLoading"
    ></el-upload>
  </div>
</template>

<script type="text/ecmascript-6">
  import { quillEditor } from 'vue-quill-editor'
  import {GET_UPLOAD_TOKEN, UPLOAD_CASE, NEW_TREND , GET_CASE_DETAIL} from '../../../../vuex/types'
  import {mapState} from 'vuex'
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
//        articleDataFee:{
//          content:'',
//        },
//        articleDataCharge:{
//          content:'',
//        },
        isFee:false,
        qiNiuConfig:this.$store.state.index.qiNiuConfig,
        qiNiuToken:{},
        contImgList:[],
        args:{
          headline:'',
          classify:'',
          freeContent:'',
          chargeContent:'',
          chargeNumber:'',
          postStater:2,
          cover:'',
          postId:null,
        },
        slots: [
          {
            flex: 1,
            values: [ '口腔外科', '口腔内科', '口腔修复','口腔种植', '口腔正畸'],
            className: 'slot1',
            textAlign: 'center',
            defaultIndex:2,
          }
        ],
        sloty: [
          {
            flex: 1,
            values: [ '1乾币', '2乾币', '5乾币','10乾币'],
            className: 'slot1',
            textAlign: 'center',
            defaultIndex:2,
          }
        ],
        isClassPicker:false,
        isClassPickerN:false,
        classify:'',
        classifyName:null,
        chargeNum:'',
        chargeNumN:'',
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
//        that.editorFee.on('text-change',(delta,oldDelta,source)=>{
//          if(source == 'user'){
//            that.articleDataFee.content = that.editorFee.container.firstChild.innerHTML;
//          }
//        })
        var toolbar1 = that.editorFee.getModule('toolbar');
        toolbar1.addHandler('image',()=>{
          that.isFee = true
          var s1 = document.getElementsByClassName("el-upload__input")
          this.$store.dispatch(GET_UPLOAD_TOKEN).then(res => {
            this.qiNiuToken = {
              token: res.msg
            }
          })
          s1[0].click();
        })
      },
      initCharge(file){
        let that = this;
//        that.editorCharge.on('text-change',(delta,oldDelta,source)=>{
//          if(source == 'user'){
//            that.articleDataCharge.content = that.editorCharge.container.firstChild.innerHTML;
//          }
//        })
        var toolbar2 = that.editorCharge.getModule('toolbar');
        toolbar2.addHandler('image',()=>{
          that.isFee = false
          var s2 = document.getElementsByClassName("el-upload__input")
          this.$store.dispatch(GET_UPLOAD_TOKEN).then(res => {
            this.qiNiuToken = {
              token: res.msg
            }
          })
          s2[0].click();
        })
      },
      labelFor(){
        this.isShare();
        var labels = document.getElementsByClassName("el-checkbox__original")
        labels[0].click();
      },
      //上传图片
      upLoading(){
        Indicator.open('图片上传中...');
      },
      beforeUploading(){

      },
      uploadFile(res,file){
        let that = this
        this.contImgList.push(that.qiNiuConfig.ShUrl + file.response.key);
        if(this.isFee) {
          this.editorFee.insertEmbed(10, 'image', this.qiNiuConfig.ShUrl + file.response.key)
        }else {
          this.editorCharge.insertEmbed(10, 'image', this.qiNiuConfig.ShUrl + file.response.key)
        }
        Indicator.close();
      },
      selectClassify(num){
        this.blurClass();
        if(num){
          console.log(num)
          this.isClassPickerN = true;
        }else {
          console.log(num)
          this.isClassPicker =true;
        }
      },
      foucsInput() {
        this.$refs.moneyInput.focus()
      },
      //监听选择病例类型变化
      onValuesChange(picker, values) {
        this.classify = this.slots[0].values.indexOf(values[0]) + 1;
        this.classifyName = this.slots[0].values[parseInt(this.classify) - 1]
      },
      onChargeChange(picker,values){
        this.chargeNum = this.sloty[0].values.indexOf(values[0]);
        this.chargeNumN = this.sloty[0].values[parseInt(this.chargeNum)]
      },
      getCaseData(){
        this.$store.dispatch(GET_CASE_DETAIL, {postId: this.$route.query.id}).then((res) => {
          this.args.headline = res.data.headline;
          this.args.classify = res.data.classify;
          this.classify = res.data.classify;
          this.classifyName = this.slots[0].values[parseInt(this.classify) - 1]
          this.args.freeContent = res.data.freeContent;
          this.args.chargeContent = res.data.chargeContent;
          this.chargeNumN = this.args.chargeContent ? this.args.chargeContent + '乾币' :'';
          this.args.chargeNumber = res.data.chargeNumber;
          this.args.postStater = res.data.postStater;
          this.args.cover = res.data.cover;
          this.args.postId = this.$route.query.id;
          let tmp = this.args.freeContent.split("src=\"");
          tmp.forEach(item=>{
            let reg = 'http'
            if(item.substr(0,4) === reg){
              this.contImgList.push(item.split("\"")[0])
            }
          })
//          console.log(this.contImgList)
        })
      },
      //病例选择的确定&取消时的方法，0取消，1确定
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
      onClassPickerN(num){
        if(num){
          let arr = [1,2,5,10]
          if(this.chargeNum < 0){
            this.args.chargeNumber = arr[this.chargeNum]
            this.chargeNumN = this.sloty[0].values[0]
          }else {
            this.args.chargeNumber = arr[this.chargeNum];
            this.chargeNumN = this.sloty[0].values[this.chargeNum]
          }
        }else {
          this.chargeNum = -1;
          this.args.chargeNumber = '';
          this.chargeNumN = ''
        }
//        console.log(this.args.classify);
        this.isClassPickerN = false
      },
      //保存和发布的方法。
      postCase(num){
        this.args.postStater = num;
        this.args.postId = this.args.postId ? this.args.postId : null;
        for(let i = 0;i < this.contImgList.length;i++){
          if(this.args.freeContent.indexOf(this.contImgList[i]) !== -1){
            this.args.cover = this.contImgList[i];
            break;
          }
        }
        //下面就要调用接口了
        switch (true){
          case !this.args.headline:
            Toast({message: '标题不能为空', duration: 1500});
            return
          case !this.args.freeContent:
            Toast({message: '一定要有免费内容喔', duration: 1500});
            return
          case this.args.classify == '' || this.args.classify < 0:
            Toast({message: '请选择一个分类', duration: 1500});
            // this.args.postStater = 2;
            return
          case this.args.chargeContent && !this.args.chargeNum < 0:
            Toast({message: '请输入价格', duration: 1500});
            return
        }
        this.$store.dispatch(UPLOAD_CASE,this.args).then(res => {
          if (this.args.postStater === 1) {
            Toast({message: '病例发布成功！', duration: 1500});
            if (this.share) {
              //把返回结果的postid传进去
              this.shareCase(res.data.num);
            }
          }
          else {
            Toast({message: '病例保存成功！', duration: 1500});
          }
          // this.$router.push('/caseOfIllness');
           this.$router.go(-1);
          //this.$router.push({path: '/myCase', query: {state: this.$route.query.state}})
          this.$destroy();
        })
      },
      //是否分享到牙医圈功能
      isShare(){
        this.share = !this.share;
      },
      shareCase(postId){
        let obj = {
          momentType: 3,
          momentContent: null,
          momentPicture: null,
          momentContentId: postId
        }
        this.$store.dispatch(NEW_TREND,obj).then(res => {
          console.log('分享成功')
        })
      },
      //动态获取七牛token，需要就用
//      qiNiuToken(){
//
//      },
      closePage(){
        MessageBox.confirm('是否保存为草稿方便下次继续编辑?').then(action => {
          this.postCase(2);
          this.$destroy();
        }).catch(reject =>{
          this.$router.go(-1)
        });
      }
    },
    created() {
//      this.mBack("back");
//      this.qiNiuConfig = this.$store.state.index.qiNiuConfig
      //获取postId，请求数据
      //获取旧的文章接口数据，有数据就返到args里
      if(this.$route.query.id){
        this.getCaseData();
      }
    },
    mounted() {
      this.initFee();
      this.initCharge();
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";
  .new-case-wrapper{
    height: 100vh;
  }
  .header {
    position: absolute;
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
    z-index: 100;
    -webkit-overflow-scrolling: touch;
    .inputTitle{
      width: 100%;
      height: px2vw(90);
      .textArea{
        padding: 0 3%;
        width: 100%;
        font-size:px2vw(36);
        height: px2vw(90);
        /*line-height: px2vw(90);*/
        border: none;
        border-bottom: px2vw(1) solid #ddd;
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
    }
  }
  .pickers{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 101;
    .classPicker{
      text-align: center;
      color: #000;
      font-size: px2vw(32);
      height: px2vw(90);
      line-height: px2vw(90);
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
  .blur{
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
</style>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  .picker-item{
    height: px2vw(90);
    line-height: px2vw(90);
    font-size: px2vw(30);
  }
  .picker-selected{
    color: $themeColor ;
  }
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
    border-top: px2vw(1) solid #ddd;
  }
  .ql-container.ql-snow{
    border: none;
    min-height: px2vw(300);
    border-bottom: px2vw(1) solid #ddd;
  }
  .ql-container.ql-snow:first-child{
    border-bottom: px2vw(1) solid #ddd;
  }
  .ql-blank{
    color: red;
  }
  .picker{
    background-color: #fff;
    border-top: px2vw(1) solid #ddd;
  }
  .ql-picker-options{
    margin-top: -131px!important;
  }
</style>
