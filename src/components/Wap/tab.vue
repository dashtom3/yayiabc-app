<template>
  <div class="tab">
    <div class="right_box">
      <!-- 点击导航后要切换的内容 -->
<!--       <transition name="component-fade" mode="out-in"> -->
        <router-view  v-on:listenToChildEvent="MsgFromChild"></router-view>
<!--       </transition> -->
    </div>
    <mu-paper  class="big_box">
      <mu-bottom-nav :value="bottomNav" @change="handleChange">
        <mu-bottom-nav-item value="index" title="首页" icon="home"/>
        <mu-bottom-nav-item value="classify" title="商城" icon="class"/>
        <mu-bottom-nav-item value="caseOfIllness" title="社区" icon="toys"/>
        <mu-bottom-nav-item value="yayiCircle" title="牙医圈" icon="camera"/>
        <mu-bottom-nav-item value="mine" title="我的" icon="person"/>
      </mu-bottom-nav>
    </mu-paper>
  </div>
</template>

<script>
  // import Vue from 'vue'
  // import index from './index/index'
  import index from './index/main'
  import classifyIndex from './classify/classifyIndex'
  import { GET_CAR_ROUTERSTATE } from '@vuex/types'
  import global from './global/global.js'
  // var tab03 = Vue.extend({
  //   template: '<div>this is 待评价03</div>',
  // });
  export default {
    name: 'tab',
    data () {
      return {
        tabSwitch: true,
        selected: '',
        bottomNav: 'index'
      }
    },
    //*******导航钩子*********//
    beforeRouteEnter (to, from, next) {
      // 通过 `vm` 访问组件实例
      next(vm => {
        var that = vm;
        console.log("触发vm:"+that.$router.history.current.name);
        if(that.$router.history.current.name == 'caseOfIllness' || that.$router.history.current.name == 'video' || that.$router.history.current.name == 'QandAList'){
          that.bottomNav = 'caseOfIllness'
        } else if(that.$router.history.current.name == 'yayiCircle'){
          that.bottomNav = 'yayiCircle'
        } else if(that.$router.history.current.name == 'mine'){
          that.bottomNav = 'mine'
        }
      })
    },
    created: function() {
      var that = this
      // alert(global.webFrom())
    },
    methods: {
      handleChange (val) {
        this.bottomNav = val
        this.goToPage(val)
      },
      goToPage (val) {
        var that = this
        if (val == 'index') {
          that.$router.push({path: '/yayi/index'});
        } else if (val == 'classify') {
          that.$router.push({ name: 'productList', params: { oneClassify: '展会推荐' , twoClassify: ''}});
        } else if (val == 'caseOfIllness') {
          that.$router.push({path: '/yayi/find'});
        } else if (val == 'yayiCircle') {
          that.$router.push({path: '/yayi/yayiCircle'});
        } else if (val == 'mine') {
          that.$router.push({path: '/yayi/mine'});
        }
      },
      MsgFromChild (data) {
        this.goToPage(data)
      },
    },
    watch: {
      '$route' (to, from) {
        var that = this;
        if (to.name == 'caseOfIllness' || to.name == 'video' || to.name == 'QandAList') {
          that.bottomNav = 'caseOfIllness'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
@import "../../common/sass/factory";
.mu-buttom-item{
  min-width: 0;
}
.mu-bottom-item-active .mu-bottom-item-icon {
  color: $themeColor !important;
}
.mu-bottom-item-active .mu-bottom-item-text {
  font-size: px2vw(28) !important;
  color: $themeColor !important;
}
.mu-bottom-item-icon {
  font-size: px2vw(48) !important;
}
.mu-bottom-item-text {
  margin-top: px2vw(-18) !important;
  font-size: px2vw(24) !important;
}
</style>
<style scoped lang="scss" rel="stylesheet/scss">
@import "../../common/sass/factory";
.tab {
  width: 100vw;
  height: 100vh;
}
.spe {
  color: #5DB7E7 !important;
}
.big_box {
  width: 100vw;
  height: px2vw(100);
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
}
.left_item {
  width: 25vw;
  height: 13vw;
  line-height: 11.33vw;
  text-align: center;
  color: #666666;
  font-size: 2.66vw;
  background-color: #fff;
  position: relative;
  float: left;
}
.right_box {
  width: 100vw;
  -webkit-overflow-scrolling: touch;
  height: 100vh;
}
.item_img {
  width: 7.46vw;
  height: 8.5vw;
  position: absolute;
  right: 0;
  left: 0;
  top: 1vw;
  margin: auto;
}
/*.speImg {
  box-shadow: 1px 1px 5px #5DB7E7;
}*/
.item_word {
  transform: translateY(4.5vw);
}
</style>
