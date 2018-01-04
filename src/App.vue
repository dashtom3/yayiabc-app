<template>
  <div id="app">
     <!--<transition :name="'vux-pop-' + ($store.state.index.direction === 'forward' ? 'in' : 'out')">-->
      <keep-alive :include="['register', 'salesRegister', 'wxlogIn', 'productList', 'video' , 'caseOfIllness','QandAList']">
        <router-view></router-view>
      </keep-alive>
    <!--<keep-alive>-->
      <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
    <!--</keep-alive>-->
    <!--&lt;!&ndash; 这里不会被keepalive &ndash;&gt;-->
    <!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->
    <!--</transition>-->
  </div>
</template>

<script>
  import Vue from "vue"
  import {Indicator} from 'mint-ui'

  export default {
    name: 'app',
    data() {
      return {
        include:['register', 'salesRegister', 'wxlogIn', 'productList']
      }
    },
    components: {},
    created: function () {
//      mui.back = function () {
//        mui.confirm('确定要退出应用吗？', '牙医abc', ["确定", "取消"], function (e) {
//          if (e.index === 0) {
//            //plus.runtime.quit();
//            that.$router.push({path:'/yayi/mine'})
//          }
//        });
//        return false;
//      }

        var originalHeight=document.documentElement.clientHeight || document.body.clientHeight;
console.log("app.vue"+originalHeight);
        window.onresize=function(){
          console.log(document);
//软键盘弹起与隐藏  都会引起窗口的高度发生变化
var  resizeHeight=document.documentElement.clientHeight || document.body.clientHeight;
    console.log(originalHeight,resizeHeight);
    if(resizeHeight*1<originalHeight*1){ //resizeHeight<originalHeight证明窗口被挤压了
      
    plus.webview.currentWebview().setStyle({
        height:originalHeight
    });
      }
    }
    },
    computed: {
    },
  }
</script>

<style>
   body {
    height: 100%;
    margin: 0 0 0 0;
    }
  .mint-indicator-wrapper {
    z-index: 2000;
  }
  * {
    padding: 0;
    margin: 0;
  }

  #app {
    font-family: 'Microsoft YaHei', Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
  }

  .clearfix:after {
    content: '';
    clear: both;
    display: block;
  }

  .clearfix {
    zoom: 1;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  a {
    text-decoration: none;
    color: #83868E;
  }

  ul {
    list-style-type: none;
  }

  button {
    outline: none;
    border: none;
    list-style-type: none;
  }

  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
  }

  /*-------animation start------*/
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }

  .component-fade-enter, .component-fade-leave-active {
    opacity: 0;
  }

  .shake-enter-active {
    animation: shake .5s;
  }

  .shake-leave-active {
    transition: all 0.3s ease;
    opacity: 0;
  }

  @-webkit-keyframes shake {
    from, to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    10%, 30%, 50%, 70%, 90% {
      -webkit-transform: translate3d(-7px, 0, 0);
      transform: translate3d(-7px, 0, 0);
    }

    20%, 40%, 60%, 80% {
      -webkit-transform: translate3d(7px, 0, 0);
      transform: translate3d(7px, 0, 0);
    }
  }

  @keyframes shake {
    from, to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    10%, 30%, 50%, 70%, 90% {
      -webkit-transform: translate3d(-7px, 0, 0);
      transform: translate3d(-7px, 0, 0);
    }

    20%, 40%, 60%, 80% {
      -webkit-transform: translate3d(7px, 0, 0);
      transform: translate3d(7px, 0, 0);
    }
  }

  .shake {
    -webkit-animation-name: shake;
    animation-name: shake;
  }

  .mint-swipe-indicator.is-active {
    background-color: #3676B5 !important;
  }
  .mint-indicator{
    position: relative;
    z-index: 9999;
  }
  .mint-swipe-indicator {
    opacity: 1 !important;
    filter: alpha(opacity=100) !important;
    background: #eaeaea !important;
  }
  .mt-progress > *{
    color: #fff;
  }
  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    transition: transform .35s ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*backface-visibility: hidden;*/
    overflow: hidden;
    /*perspective: 1000px;*/
  }

  .vux-pop-out-enter {
    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active {
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-enter {
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-leave-active {
    transform: translate3d(-100%, 0, 0);
  }
</style>
<style lang="scss" rel="stylesheet/scss">
  @import "./common/sass/factory";

  body {
    &.full-body{
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
      .bottom_box_a{
        position: absolute !important;
      }
      .brandDesHeadWrap_a{
        position: absolute !important;
      }
      #quillFee .ql-toolbar.ql-snow {
        width: 100%;
        position: fixed !important;
        display: block !important;
        bottom: 0 !important;
        left: 0 !important;
        z-index: 100;
      }
    }
  }
  body {
    &.full-body2{
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
      #quillCharge .ql-toolbar.ql-snow {
        /*background-color: red;*/
        /*.ql-toolbar.ql-snow {*/
        width: 100%;
        position: fixed !important;
        display: block !important;
        bottom: 0 !important;
        left: 0 !important;
        z-index: 100;
        /*}*/
      }
    }
  }
  .logIn_header {
    width: 100vw;
    height: px2vw(88);
    line-height: px2vw(88);
    position: relative;
    padding-bottom: 10vw;
    border-bottom: px2vw(1) solid $borderColor;
    text-align: center;
    background-color: $themeColor;
    .header_back {
      width: px2vw(18);
      height: px2vw(29);
      margin-left: 2vw;
      margin-top: 4vw;
      float: left;
    }
    .header_box {
      width: px2vw(70);
      height: px2vw(73);
      float: left;
    }
    .logWithCode {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: px2vw(200);
      height: px2vw(88);
      line-height: px2vw(88);
      display: inline-block;
      text-align: center;
      font-size: px2vw(32);
      color: #fff;
    }
  }
  .picker-item.picker-selected{
    color: $themeColor;
  }
</style>
