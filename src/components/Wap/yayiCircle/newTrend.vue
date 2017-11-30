<template>
  <div>
    <div class="header">
      <span @click="closePage">取消</span>
      <span>发动态</span>
      <span :class="{isInput:inputer || imageUrl.length > 0}" class="noInput" @click="release">发布</span>
    </div>
    <div class="container">
      <div class="inputArea">
        <textarea name="" id="" cols="30" rows="10" v-model="inputer" placeholder="这一刻的想法..."></textarea>
      </div>
      <div>
        <el-upload
          :limit = '9'
          :action="qiNiuConfig.url"
          :data="qiNiuToken"
          list-type="picture-card"
          :on-remove="handleRemove"
          :on-success="uploadFile">
          <!--:on-preview="handlePictureCardPreview"-->
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {GET_UPLOAD_TOKEN, NEW_TREND } from '../../../vuex/types'
  import {mapState} from 'vuex'
  import {Toast, MessageBox } from 'mint-ui'

  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        inputer:'',
        qiNiuToken:{},
        qiNiuConfig:this.$store.state.index.qiNiuConfig,
        imageUrl:[],
      };
    },
    methods: {
      handleRemove(file, fileList) {
        let r = this.imageUrl.indexOf(file.response.key);
        this.imageUrl.splice(r,1)
      },
//      handlePictureCardPreview(file) {
//        this.dialogImageUrl = file.url;
//        this.dialogVisible = true;
//      },
      uploadFile(response, file, fileList){
        this.imageUrl.push(file.response.key)
      },
      release(){
        if(!this.inputer && this.imageUrl.length === 0){
          return
        }
        let args = {
          momentType: 1,
          momentContent: '',
          momentPicture: '',
          momentContentId:''
        };
        if(this.imageUrl) {
          let tmp = this.imageUrl.map((val, index, arr) => {
            return this.qiNiuConfig.ShUrl + val;
          })
          args.momentPicture = tmp.join(";")
        }
        args.momentContent = this.inputer
        console.log(args);
        this.$store.dispatch(NEW_TREND,args).then(res => {
          Toast({message: '发布成功！', duration: 1500})
          this.$router.push('/yayi/yayiCircle')
        })
      },
      closePage(){
        MessageBox.confirm('是否退出本次编辑?').then(action => {
          this.$router.go(-1)
        })
      }
    },
    created(){
      this.$store.dispatch(GET_UPLOAD_TOKEN).then(res => {
        this.qiNiuToken = {
          token: res.msg
        }
      })
    }
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
  }
  .noInput{
    width: px2vw(100);
    float: right;
    display: inline-block;
    font-size: px2vw(30);
    color: #ddd;
  }
  .isInput{
    color: #fff !important;
  }
  .container{
    position: fixed;
    top: px2vw(88);
    bottom: 0;
    overflow: scroll;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    .inputArea{
      width: 100%;
      min-height: px2vw(380);
      textarea{
        width: 100%;
        padding: px2vw(20);
        min-height: px2vw(380);
        resize: none;
        border: none;
      }
    }
  }
</style>
