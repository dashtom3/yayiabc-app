<template>
  <div class="cargoUse">
    <!-- v-html="itemDetail.itemUse" -->
    <div v-if="isActive" class="instruction">
      <!-- <video-play :isVideo="typeVideo" ref="videoPlay"  v-if="videoSwitch">
        <video slot="video" webkit-playsinline="true" playsinline="true" class="video">
          <source slot="sourceSrc" type="video/mp4"></source>
        </video>
      </video-play> -->
      <video class="video-play" webkit-playsinline controls :src="itemDetail.video"></video>
    </div>
    <div class="noInfo" v-else>
      <img class="useInfo_img" src="../../../images/details/useInfo.png" alt="img">
      <p class="useInfo_word">使用说明（图文和视频）正在紧急制作中～</p>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import {Indicator} from 'mint-ui'
// import videoPlay from '@/components/Wap/community/video/videoPlay.vue'
export default {
  name: 'cargoUse',
  data () {
    return {
      typeVideo: 'videoDetail',
      videoSwitch: false,
      itemDetail: {},
      isActive: true,
    }
  },
  components: {
    // videoPlay
  },
  created: function() {
    var that = this
    Indicator.open()
    that.getNowGoodDetail()
  },
  methods: {
    // 获取商品详情
    getNowGoodDetail: function() {
      var that = this;
      var obj = {
        itemId:that.$route.params.goodId,
      };
      that.$store.dispatch('GET_ITEM_DETAIL', obj).then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          Indicator.close()
          let nowGoodDetails = res.data.data;
          that.itemDetail = nowGoodDetails.itemDetail;
          if (that.itemDetail.video == null) {
            that.isActive = false
          } else {
            that.isActive = true
          }
        }
      })
    },
  }
}
</script>
<style >
 .instruction img{
  max-width: 100% !important;
  display: block;
  margin: 20px auto;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
@import "../../../common/sass/factory";
.goodIntroduce {
  width: 90vw;
  margin: 0 auto;
  font-size: 2.73vw;
  padding: 4vw 2vw 4vw 2vw;
  border: 1px solid #F3F3F3;
}
.good_item {
  margin-bottom: 5vw;
}
.noInfo {
  width: 100%;
  height: 100%;
  text-align: center;
}
.useInfo_img {
  width: px2vw(137);
  height: px2vw(137);
  margin-top: px2vw(300);
  margin-bottom: px2vw(30);
}
.useInfo_word {
  font-size: px2vw(28);
  color: #999;
}
.video-play{
  width: 100%;
}
</style>

