<template>
  <div class="mainEnter">
    <div class="main_box">
      <div class="main_item"  @click="goToServiceHandler">
        <img class="customService" src="../../../images/index/customService.png" alt="img">
        <p class="main_item_word">客服代表</p>
      </div>
      <div class="main_item" @click="goToRegisterHandler">
        <img class="customService" src="../../../images/index/signUp.png" alt="img">
        <p class="main_item_word">注册通道</p>
      </div>
      <div class="main_item" @click="goToQb">
        <img class="customService" src="../../../images/index/rmb.png" alt="img">
        <p class="main_item_word">乾币充值</p>
      </div>
    </div>
  </div>
</template>

<script>
import {tokenMethods} from '../../../vuex/util'
import {Toast,MessageBox} from 'mint-ui'
export default {
  name: 'mainEnter',
  data () {
    return {
    }
  },
  created: function() {
  },
  methods: {
    goToRegisterHandler(){
      this.$router.push('/register')
    },
    goToServiceHandler(){
      this.$router.push('/salesLogin')
    },
    goToQb(){
      if(tokenMethods.getWapToken()) {
        this.$store.dispatch('SAVE_JUMP_INDEX',1)
        this.$router.push('/coinDetail')
      } else {
        this.$router.push({path: '/logIn', query: {backName: '/'}});
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
@import "../../../common/sass/factory";
.main_box {
  width: 100vw;
  height: px2vw(190);
  border-bottom: px2vw(20) solid #F4F4F4;
}
.main_item {
  width: px2vw(115);
  height: px2vw(103);
  float: left;
  text-align: center;
  margin-top: px2vw(20);
  margin-left: px2vw(103);
}
.customService {
  width: px2vw(73);
  height: px2vw(73);
}
.main_item_word {
  font-size: px2vw(28);
  color: #999;
  margin-top: px2vw(6);
}
</style>

