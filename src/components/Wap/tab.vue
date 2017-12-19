<template>
  <div class="tab">
<!--     <div class="big_box">
      <div class="left_item" :class="{spe: isActive1}" @click="changeActive1()">
        <img v-if="isTouch1" class="item_img speImg" src="../../images/index/home_blue.png" alt="img">
        <img v-else class="item_img" src="../../images/index/home.png" alt="img">
        <p class="item_word">首页</p>
      </div>
      <div class="left_item" :class="{spe: isActive2}" @click="changeActive2()">
        <img v-if="isTouch2" class="item_img speImg" src="../../images/index/classify_blue.png" alt="img">
        <img v-else class="item_img" src="../../images/index/classify.png" alt="img">
        <p class="item_word">分类</p>
      </div>
      <div class="left_item" :class="{spe: isActive3}" @click="changeActive3()">
        <img v-if="isTouch3" class="item_img speImg" src="../../images/index/shoppingCar_blue.png" alt="img">
        <img v-else class="item_img" src="../../images/index/shoppingCar.png" alt="img">
        <p class="item_word">购物车</p>
      </div>
      <div class="left_item" :class="{spe: isActive4}" @click="changeActive4()">
        <img v-if="isTouch4" class="item_img speImg" src="../../images/index/personal_blue.png" alt="img">
        <img v-else class="item_img" src="../../images/index/personal.png" alt="img">
        <p class="item_word">我的</p>
      </div>
      <div class="clearfix"></div>
    </div> -->
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
  // var tab03 = Vue.extend({
  //   template: '<div>this is 待评价03</div>',
  // });
  export default {
    name: 'tab',
    data () {
      return {
        tabSwitch: true,
        selected: '',
        isActive1: true,
        isActive2: false,
        isActive3: false,
        isActive4: false,
        isActive5: false,
        isTouch1: true,
        isTouch2: false,
        isTouch3: false,
        isTouch4: false,
        isTouch5: false,
        bottomNav: 'index'
      }
    },
    //*******导航钩子*********//
    beforeRouteEnter (to, from, next) {
      // 通过 `vm` 访问组件实例
      next(vm => {
        var that = vm;
        if (that.$router.history.current.path == '/main/caseOfIllness') {
          that.isActive1 = true;
          that.isActive2 = false;
          that.isActive3 = false;
          that.isActive4 = false;
          that.isActive5 = false;
          that.isTouch1 = true;
          that.isTouch2 = false;
          that.isTouch3 = false;
          that.isTouch4 = false;
          that.isTouch5 = false;
        } else if(that.$router.history.current.name == 'classifyIndex'){
          that.isActive1 = false;
          that.isActive2 = true;
          that.isActive3 = false;
          that.isActive4 = false;
          that.isActive5 = false;
          that.isTouch1 = false;
          that.isTouch2 = true;
          that.isTouch3 = false;
          that.isTouch4 = false;
          that.isTouch5 = false;
        } else if(that.$router.history.current.name == 'caseOfIllness' || that.$router.history.current.name == 'video' || that.$router.history.current.name == 'QandAList'){
          that.isActive1 = false;
          that.isActive2 = false;
          that.isActive3 = true;
          that.isActive4 = false;
          that.isActive5 = false;
          that.isTouch1 = false;
          that.isTouch2 = false;
          that.isTouch3 = true;
          that.isTouch4 = false;
          that.isTouch5 = false;
          that.bottomNav = 'caseOfIllness'
        } else if(that.$router.history.current.name == 'yayiCircle'){
          that.isActive1 = false;
          that.isActive2 = false;
          that.isActive3 = false;
          that.isActive4 = true;
          that.isActive5 = false;
          that.isTouch1 = false;
          that.isTouch2 = false;
          that.isTouch3 = false;
          that.isTouch4 = true;
          that.isTouch5 = false;
          that.bottomNav = 'yayiCircle'
        } else if(that.$router.history.current.name == 'mine'){
          that.isActive1 = false;
          that.isActive2 = false;
          that.isActive3 = false;
          that.isActive4 = false;
          that.isActive5 = true;
          that.isTouch1 = false;
          that.isTouch2 = false;
          that.isTouch3 = false;
          that.isTouch4 = false;
          that.isTouch5 = true;
        }
      })
    },
    created: function() {
      var that = this
    },
    methods: {
      handleChange (val) {
        var that = this
        if (val == 'index') {
          that.changeActive1()
        } else if (val == 'classify') {
          that.changeActive2()
        } else if (val == 'caseOfIllness') {
          that.changeActive3()
        } else if (val == 'yayiCircle') {
          that.changeActive4()
        } else if (val == 'mine') {
          that.changeActive5()
        }
        that.bottomNav = val
      },
      MsgFromChild: function(data) {
        var that = this
        if (data == 'index') {
          that.changeActive1()
        } else if (data == 'classify') {
          that.changeActive2()
        } else if (data == 'caseOfIllness') {
          that.changeActive3()
        } else if (data == 'yayiCircle') {
          that.changeActive4()
        } else if (data == 'mine') {
          that.changeActive5()
        }
      },
      changeActive1: function() {
        var that = this
        that.$router.push({path: '/yayi/index'});
        that.isActive1 = true;
        that.isActive2 = false;
        that.isActive3 = false;
        that.isActive4 = false;
        that.isActive5 = false;
        that.isTouch1 = true;
        that.isTouch2 = false;
        that.isTouch3 = false;
        that.isTouch4 = false;
        that.isTouch5 = false;
        that.bottomNav = 'index'
      },
      changeActive2: function() {
        var that = this
        that.$router.push({ name: 'productList', params: { oneClassify: '展会推荐' , twoClassify: ''}});
        that.isActive1 = false;
        that.isActive2 = true;
        that.isActive3 = false;
        that.isActive4 = false;
        that.isActive5 = false;
        that.isTouch1 = false;
        that.isTouch2 = true;
        that.isTouch3 = false;
        that.isTouch4 = false;
        that.isTouch5 = false;
        that.bottomNav = 'classify'
      },
      changeActive3: function() {
        var that = this
        that.$router.push({path: '/yayi/find'});
        that.isActive1 = false;
        that.isActive2 = false;
        that.isActive3 = true;
        that.isActive4 = false;
        that.isActive5 = false;
        that.isTouch1 = false;
        that.isTouch2 = false;
        that.isTouch3 = true;
        that.isTouch4 = false;
        that.isTouch5 = false;
        that.bottomNav = 'caseOfIllness'
      },
      changeActive4: function() {
        var that = this
        that.$router.push({path: '/yayi/yayiCircle'});
        that.isActive1 = false;
        that.isActive2 = false;
        that.isActive3 = false;
        that.isActive4 = true;
        that.isActive5 = false;
        that.isTouch1 = false;
        that.isTouch2 = false;
        that.isTouch3 = false;
        that.isTouch4 = true;
        that.isTouch5 = false;
        that.bottomNav = 'yayiCircle'
      },
      changeActive5: function() {
        var that = this
        that.$router.push({path: '/yayi/mine'});
        that.isActive1 = false;
        that.isActive2 = false;
        that.isActive3 = false;
        that.isActive4 = false;
        that.isActive5 = true;
        that.isTouch1 = false;
        that.isTouch2 = false;
        that.isTouch3 = false;
        that.isTouch4 = false;
        that.isTouch5 = true;
        that.bottomNav = 'mine'
      },
    },
    watch: {
      '$route' (to, from) {
        var that = this;
        if (to.name == 'caseOfIllness' || to.name == 'video' || to.name == 'QandAList') {
          that.isActive1 = false;
          that.isActive2 = false;
          that.isActive3 = true;
          that.isActive4 = false;
          that.isActive5 = false;
          that.isTouch1 = false;
          that.isTouch2 = false;
          that.isTouch3 = true;
          that.isTouch4 = false;
          that.isTouch5 = false;
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
  height: 13vw;
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
