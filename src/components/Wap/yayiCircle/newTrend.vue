<template>
  <div>
    <div class="header">
      <span>取消</span>
      <span>发动态</span>
      <span :class="{isInput:inputer}" class="noInput">发布</span>
    </div>
    <div class="container">
      <div class="inputArea">
        <textarea name="" id="" cols="30" rows="10" v-model="inputer"></textarea>
      </div>
      <div>
        <el-upload
          v-if="imageUrl.length < 10"
          :action="qiNiuConfig.url"
          :data="qiNiuToken"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-success="uploadFile">
          <!--:on-remove="handleRemove">-->
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny"  v-for="(item,index) in imageUrl">
          <img width="100%" :src="item" alt="">
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {GET_UPLOAD_TOKEN} from '../../../vuex/types'
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        inputer:'',
        qiNiuToken:{},
        qiNiuConfig:{},
        imageUrl:[],
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
//        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadFile(response, file, fileList){
        this.imageUrl.push(this.qiNiuConfig.ShUrl + file.response.key)
        console.log(this.imageUrl)
      },
      removeImg(index){
        console.log(index)
      }
    },
//    watch:{
//      imageUrl:{
//        handler:function (val) {
//          console.log(val)
//        }
//      }
//    },
    created(){
      this.$store.dispatch(GET_UPLOAD_TOKEN).then(res => {
        this.qiNiuToken = {
          token: res.msg
        }
      })
      this.qiNiuConfig = this.$store.state.index.qiNiuConfig
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
