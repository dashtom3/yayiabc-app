<template>
  <div class="box">
    <salesHeader headerText="设置"></salesHeader>
    <div class="setting-wrap">
      <div class="setting-box">
        <!--<div class="line" @click="clearTmp">-->
          <!--<span>清除本地缓存</span>-->
          <!--<img src="../../../images/mine/right.png" alt="">-->
        <!--</div>-->
        <div class="line" @click="aboutApp">
          <span class="spanDes">关于牙医abc</span>
          <img src="../../../images/mine/right.png" alt="">
        </div>
      </div>
      <div class="setting-box">
        <div class="line" @click="goto">
          <span class="spanDes">意见反馈</span>
          <img src="../../../images/mine/right.png" alt="">
        </div>
        <div class="line">
          <span>联系客服</span>
          <a href="tel:4000014980"> 400-001-4980 </a>
        </div>
      </div>
      <!-- <div class="setting-box">
        <div class="line">
          <span class="spanDes">检查更新</span>
          <span class="checkingVer" v-if="checking">检查更新中...</span>
          <span class="checkingVer" v-else-if="checked">检测到新版本：{{newVer}}</span>
          <span class="checkingVer" v-else>已是最新版本</span>
          <img src="../../../images/mine/right.png" alt="" v-if="checked">
          <span class="nowVer" v-if="!checked">当前版本：{{ver}}</span>
          <span class="nowVer2" v-else @click="updateApp">点击更新</span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import salesHeader from '../../salesWap/salesHeader.vue'
  import {Toast, Indicator, MessageBox} from 'mint-ui'

  export default {
    data(){
      return {
        checking:true,
        ver:'',
        newVer:'',
        checked:false
      }
    },
    components:{
      salesHeader
    },
    created(){
      // plus.runtime.getProperty(plus.runtime.appid,function(inf){
        // this.ver=inf.version;
        // this.checkUpdate();
      // });
    },
    methods:{
      aboutApp(){
        this.$router.push('/aboutApp')
      },
//      clearTmp(){
//        MessageBox.confirm('清除后，图片视频等多媒体消息需要重新下载观看').then(action => {
//          //清缓存的内容写在这里，清除完成执行下面的回调
//          Toast({message:'清除缓存成功！',during:1500})
//        });
//      },
      goto(){
        this.$router.push('/feedback')
      },
    }
  }

</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .box{
    height: 93.2vh;
    background-color: #f4f4f4;
  }
  .setting-wrap{
    margin-top: px2vw(88);
  }
  .setting-box{
    margin-bottom: px2vw(20);
    border-bottom: 1px solid #e5e5e5;
  }
  .line{
    height: px2vw(88);
    width: 100%;
    padding: 0 px2vw(35);
    line-height: px2vw(88);
    border-top: 1px solid #e5e5e5;
    font-size: px2vw(30);
    color: #333;
    background-color: #fff;
  }

  .line > .spanDes{
    float: left;
    margin-right: px2vw(20);
  }
  .line > .checkingVer{
    float: left;
    font-size: px2vw(24);
    color: #999;
  }
  .line > .nowVer{
    float: right;
    font-size: px2vw(24);
    color: #999;
  }
  .line > .nowVer2{
    float: right;
    font-size: px2vw(24);
    color: #333;
  }
  .line > img{
    margin-top: px2vw(32);
    height: px2vw(24);
    float: right;
  }
  .line a{
    float: right;
    color: #999;
  }
</style>
