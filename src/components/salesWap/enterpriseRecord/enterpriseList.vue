<template>
  <div class="wrapper">
    <div class="search-wrapper">
      <div class="address-wrapper" @click="openPicker">
        <span v-text="listParams.cityName"></span>
        <img src="../../../images/salesWap/customer/down.png" alt="下拉">
      </div>
      <div class="search-box">
        <span @click="searchInfo">
          <img src="../../../images/salesWap/customer/search-c.png" alt="搜索">
        </span>
        <!-- 将软键盘的换行改为搜索 -->
        <form @submit.prevent>
          <input v-model="listParams.keyWord" @keydown.enter="searchInfo" type="search" placeholder="请输入关键字">
        </form>
        <span v-show="closeShow" class="close-wrapper" @click="closeKeyWord">
          <img class="close" src="../../../images/saleman/close.png" alt="关闭">
        </span>
      </div>
      <div class="map-wrapper">
        <img src="../../../images/salesWap/customer/map.png" alt="地图">
        <span>地图</span>
      </div>
    </div>
    <div class="enterprise-list">
      <div v-if="tipsShow" class="tips-wrapper">
        <span class="tips">客服代表登录后，即可查看联系方式！</span><span class="login" @click="goToLogin">立即登录</span>
      </div>
      <div v-if="enterpriseList.length > 0" class="scroll-box" v-infinite-scroll="getListMore" infinite-scroll-immediate-check="true">
        <div class="enterprise-item" v-for="(item, index) in enterpriseList" :key="index">
          <div class="item-top clearfix">
            <h2 class="item-title">{{ item.poiname }}</h2>
            <p v-if="!tipsShow" class="item-phone">{{ item.telephone !== null ? item.telephone : '暂无联系方式' }}</p>
            <p v-else class="item-phone">{{ item.telephone | formatPhone }}</p>
          </div>
          <div class="item-bottom">
            <img src="../../../images/salesWap/customer/address.png" alt="地址">
            <span class="item-address">{{ item.address }}</span>
          </div>
        </div>
      </div>
      <div v-else class="no-result">
        <img src="../../../images/saleman/no-result.png" alt="暂无结果">
        <div class="no-info">暂无相关信息~</div>
      </div>
      <div class="end-wrapper" v-show="endShow">
        <span class="end">-End-</span>
      </div>
    </div>
    <!--城市选择框-->
    <address-pickers ref="cityAddressPickers" @addresschange="saveAddress"></address-pickers>
  </div>
</template>

<script>
import { InfiniteScroll, LoadMore,Toast,MessageBox } from 'mint-ui';
import { tokenMethods } from '../../../vuex/util'
import addressPickers from '../../wx_user/addressPickers.vue'

export default {
  name: "enterpriseList",
  components: {
    addressPickers,
  },
  data() {
    return {
      enterpriseList: [],
      isLoading:false,
      listParams: {
        cityName: '北京市',
        keyWord: '',
        currentPage: 1,
        numberPerPage: 10,
      },
      totalPage: 0,
      endShow: false,
      tipsShow: true,
      closeShow: false,
    };
  },
  created() {
    this.getEnterPriseData();
    if (tokenMethods.getSalesToken() != null) {
      this.tipsShow = false
    } else {
      this.tipsShow = true
    }
  },
  methods: {
    getEnterPriseData() {
      this.$store.dispatch('GET_ENTERPRISE_DATA', this.listParams).then((res) => {
        if (res.callStatus === 'SUCCEED') {
          this.enterpriseList = this.enterpriseList.concat(res.data);
          this.totalPage = res.totalPage;
        }
      })
    },
    getListMore (){
      if ((this.totalPage <= this.listParams.currentPage && this.enterpriseList.length > 0) || this.totalPage == 1){
        this.endShow = true
      } else {
        this.listParams.currentPage = Number(this.listParams.currentPage) + 1;
        this.getEnterPriseData();
      }
    },
    goToLogin() {
      this.$router.push({path:'/salesLogin'});
    },
    searchInfo() {
      this.enterpriseList = [];
      this.listParams.currentPage = 1;
      this.getEnterPriseData();
    },
    closeKeyWord() {
      this.listParams.keyWord = '';
      this.enterpriseList = [];
      this.listParams.currentPage = 1;
      this.getEnterPriseData();
    },
    openPicker() {
      this.$refs.cityAddressPickers.open()
    },
    saveAddress(e) {
      this.listParams.cityName = e.split(' ').join('/')
      this.enterpriseList = [];
      this.listParams.currentPage = 1;
      this.getEnterPriseData();
    },
  },
  watch: {
    'listParams.keyWord': {
      handler: function (val) {
        if (val == '') {
          this.closeShow = false
        } else {
          this.closeShow = true
        }
      }
    }
  }
}
</script>
<style>
a{
  text-decoration: underline
}
</style>

<style lang="scss" scoped>
@import "../../../common/sass/factory";
.wrapper{
  width: 100%;
  overflow: hidden;
}
.search-wrapper{
  position: absolute;
  display: flex;
  top: px2vw(88);
  left: 0;
  width: 100vw;
  height: px2vw(90);
  font-size: 0;
  background-color: rgb(244,244,244);
  z-index: 10;
  img{
    display: inline-block;
    vertical-align: top;
  }
  .address-wrapper{
    width: px2vw(195);
    padding: 0 0 0 px2vw(19);
    img{
      margin: px2vw(39) 0 0 px2vw(21);
      width: px2vw(22);
      height: px2vw(12);
    }
  }
  .search-box{
    position: relative;
    margin: px2vw(18) 0;
    width: px2vw(450);
    height: px2vw(60);
    border-radius: px2vw(30);
    background: #fff;
    overflow: hidden;
    span{
      display: inline-block;
      width: px2vw(60);
      height: px2vw(60);
      overflow: hidden;
    }
    img{
      margin: px2vw(13) 0 0 0;
      width: px2vw(34);
      height: px2vw(34);
    }
    input{
      position: absolute;
      top: 0;
      right: 0;
      padding: 0 0 px2vw(8) px2vw(8);
      margin: px2vw(16) 0 0 0;
      width: px2vw(390);
      height: px2vw(36);
      vertical-align:middle;
      line-height: px2vw(36);
      font-size: px2vw(26);
      outline: none;
      border: none;
    }
    .close-wrapper{
      position: absolute;
      top: px2vw(2);
      right: px2vw(20)
    }
  }
  .map-wrapper{
    position: relative;
    padding: px2vw(22) 0 0 px2vw(6);
    width: px2vw(105);
    img{
      position: absolute;
      top: px2vw(12);
      right: px2vw(27);
      width: px2vw(34);
      height: px2vw(34);
    }
    span{
      display: inline-block;
    }
  }
  span{
    flex: 1;
    width: px2vw(106);
    height: px2vw(90);
    font-size: px2vw(30);
    line-height: px2vw(90);
    text-align: center;
    color: #3676b6;
  }
}
.enterprise-list{
  padding-top: px2vw(90)
}
.scroll-box{
  width: 100%;
  height: px2vw(1044);
  overflow: scroll;
}
.tips-wrapper{
  position: fixed;
  top: px2vw(180);
  left: 0;
  width: 100%;
  height: px2vw(80);
  color: #fff;
  background: rgba(54, 118, 182, .8);
  .tips{
    line-height: px2vw(80);
    font-size: px2vw(28);
  }
  .login{
    line-height: px2vw(80);
    font-family: 'PingFangSC-Medium' !important;
    font-size: px2vw(28);
    border-bottom: px2vw(2) solid #fff;
  }
}
.no-result{
  height: 139vw;
  background: rgba(188,188,188,0.49);
  font-size: 0;
  img{
    display: inline-block;
    margin: px2vw(400) 0 px2vw(40) px2vw(308);
    width: px2vw(134);
    height: px2vw(124);
  }
  div{
    font-size: px2vw(30);
    text-align: center;
  }
}
.enterprise-item{
  width: 100%;
  height: px2vw(167);
  border-bottom: px2vw(2) solid $borderColor;
  // overflow: hidden;
}
.item-title{
  float: left;
  width: px2vw(510);
  margin: px2vw(40) 0 0 px2vw(21);
  // height: px2vw(31);
  line-height: px2vw(34);
  font-size: px2vw(32);
}
.item-phone{
  float: right;
  margin: px2vw(47) px2vw(21) 0 0;
  width: px2vw(180);
  height: px2vw(20);
  line-height: px2vw(20);
  font-size: px2vw(26);
}
.item-top{
  margin-bottom: px2vw(26);
}
.item-bottom{
  font-size: 0;
  margin: 0 0 0 px2vw(21);
  display: flex;
  img{
    display: inline-block;
    vertical-align: top;
    margin-top: px2vw(2);
    width: px2vw(20);
    height: px2vw(24);
  }
  span{
    display: inline-block;
    margin: 0 0 0 px2vw(8);
    height: px2vw(25);
    line-height: px2vw(28);
    font-size: px2vw(26);
  }
}
.end-wrapper{
  font-size: 0;
  height: px2vw(17);
  margin: px2vw(24) 0;
  text-align: center;
  .end{
    display: inline-block;
    width: px2vw(100);
    margin: auto;
    line-height: px2vw(17);
    font-size: px2vw(20);
    text-align: center;
    color: rgb(153,153,153);
  }
}
</style>