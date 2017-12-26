<template>
  <div class="wrap">
    <div class="eachBox">
      <div class="imgBox" @click="shareHref('WXSceneSession')">
        <img src="../../../images/case/wxPal.png" alt="">
      </div>
      <p>微信好友</p>
    </div>
    <div class="eachBox" @click="shareHref('WXSceneTimeline')">
      <div class="imgBox">
        <img src="../../../images/case/wxCircle.png" alt="">
      </div>
      <p>朋友圈</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data(){
      return{

      }
    },
    props:[
      'userId','resType'
    ],
    methods:{
      shareHref(ex){
        let ids = {
          id: "weixin",
          ex: ex  /*微信好友*//*微信朋友圈*/
        };
        alert(JSON.stringify(ids))
        this.shareAction(ids.id, ids.ex);
      },
      shareAction(id, ex){
        var so = shares[id];
        alert(JSON.stringify(so))
        if (so.authenticated) {
          alert("---已授权---");
          this.shareMessage(so, ex);
        } else {
          alert("---未授权---");
          so.authorize(function() {
            this.shareMessage(so, ex);
          }, function(e) {
            alert("认证授权失败");
          });
        }
      },
      shareMessage(s, ex){
        var msg = {
          content: '能提现的App|新上电镀金刚石车针，多种型号任你挑选。',
          href: 'http://wap.yayiabc.com/#/inviteRegist?userId=' + this.userId +'&type=' + this.resType,
          title: '注册牙医abc账号，领60乾币！（下单抵60元）',
          thumbs: ['../../../images/yayiCircle/noImgDefault.png'],
          pictures: ['../../../images/yayiCircle/noImgDefault.png'],
          extra: {
            scene: ex
          }
        };
        alert(JSON.stringify(msg))
        s.send(msg, function() {
          alert("分享成功!");
        }, function(e) {
          alert("分享失败!");
        });
      },
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .wrap{
    width: 100vw;
    height: px2vw(220);
    padding: px2vw(10) px2vw(150);
    display: flex;
    justify-content:space-around;
    .eachBox{
      height: px2vw(140);
      font-size: px2vw(30);
      text-align: center;
      color: #666;
      .imgBox{
        display: inline-block;
        width: px2vw(120);
        height: px2vw(110);
        img{
          width: 100%;
        }
      }
      p{
        line-height: px2vw(30);
      }
    }
  }
</style>
