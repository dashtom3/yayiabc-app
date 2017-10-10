// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Global from './components/Wap/global/global'
import Vuex from 'vuex'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './vuex/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import VueLazyload from 'vue-lazyload'

const FastClick = require('fastclick')

Vue.use(Vuex)
Vue.use(MintUI)
Vue.use(ElementUI)
Vue.use(MuseUI)

// Vue.component(Rate.name, Rate)

//vue-lazyLoad图片懒加载插件
Vue.use(VueLazyload, {
  loading: './static/loading.gif',
})


//安卓返回键
Vue.prototype.mBack = function (functions){
  let that = this;
  mui.back = function () {
    that[functions]();
  }
};
//安卓返回键 返回首页
Vue.prototype.gBack = function (){
  let that = this;
  mui.back = function () {
    that.$router.push({path:'/'});
  }
};
//安卓返回键 返回首页
Vue.prototype.salesBack = function (){
  let that = this;
  mui.back = function () {
    that.$router.push({path:'/salesIndex'});
  }
};

//微信端生成二位码库
Vue.prototype.QRCode = QRCode
Vue.config.productionTip = false
//设置全局global
Vue.prototype.global = Global
//绑定fastClick
FastClick.attach(document.body)

Vue.config.productionTip = false;
// simple history management
const history = window.sessionStorage;
let historyCount = history.getItem('count') * 1;
router.beforeEach(function (to, from, next) {
  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('UPDATE_DIRECTION', {direction: 'forward'})
    } else {
      store.commit('UPDATE_DIRECTION', {direction: 'reverse'})
    }
  } else {
    ++historyCount;
    history.setItem('count', historyCount);
    to.path !== '/' && history.setItem(to.path, historyCount);
    store.commit('UPDATE_DIRECTION', {direction: 'forward'})
  }
  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1];
    window.location.href = `http${url}`
  } else {
    next()
  }
});

// Polyfill  padStart
if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
    padString = String(padString || ' ');
    if (this.length > targetLength) {
      return String(this);
    }
    else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
      }
      return padString.slice(0, targetLength) + String(this);
    }
  };
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
