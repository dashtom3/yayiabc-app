<template>
  <div class="wrap">
    <div class="eachBox eachBox1">
      <div class="imgBox" @click="shareHref('WXSceneSession')">
        <img src="../../../images/case/wxPal.png" alt="">
      </div>
      <p>微信好友</p>
    </div>
    <div class="eachBox eachBox2" @click="shareHref('WXSceneTimeline')">
      <div class="imgBox">
        <img src="../../../images/case/wxCircle.png" alt="">
      </div>
      <p>朋友圈</p>
    </div>
      <shareBg v-if="shareBg" ></shareBg>
  </div>


</template>

<script type="text/ecmascript-6">
import shareBg from './../../Wap/index/shareBg'
  import { tokenMethods } from '../../../vuex/util'
  import { MessageBox} from 'mint-ui';
import global from './../../Wap/global/global.js'
  export default {
    data(){
      return{
        shareBg:false
      }
    },
    created(){
      if(this.pointLogin()){
        console.log(tokenMethods.getWapUser())
        console.log()
        global.wxShare({type:"register",userId:tokenMethods.getWapUser().userId,userType:"1",title:tokenMethods.getWapUser().trueName+"邀请您注册yayiabc社区",desc:"注册即享60元优惠！",link:window.location.href,},this)
      }
    },
    components: {shareBg},
    // props:[
    //   'userId','resType'
    // ],
    methods:{
      shareHref(){
        if(this.pointLogin()){
          this.shareBg = !this.shareBg
          // alert(this.userId,this.resType)

          setTimeout(() => {
            this.shareBg = !this.shareBg;
            // this.cancelShare();
          }, 3000)
        } else {
          this.isLogin()
        }

      },
      //判断是否登录
      pointLogin() {
        let userToken = tokenMethods.getWapToken();
        return userToken;
      },
      //提示需要登录
      isLogin() {
        MessageBox.confirm("请先登录!").then(action => {
          this.$router.push({
            path: "/logIn",
            query: { backName: this.$route.fullPath }
          });
        }).catch(function(error) {
          return "";
        });
      }
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
    .eachBox1{
      padding-right: px2vw(50);
    }
    .eachBox2{
      padding-left: px2vw(50);
    }
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
