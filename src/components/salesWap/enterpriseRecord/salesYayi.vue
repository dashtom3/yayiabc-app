<template>
  <div>
    <div class="search-wrapper">
      <div class="address-wrapper" @click="openPicker">
        <span v-text="listParams.cityName"></span>
        <img src="../../../images/salesWap/customer/down.png" alt="下拉">
      </div>
      <div class="search-box">
        <span @click="searchInfo">
          <img src="../../../images/salesWap/customer/search-c.png" alt="搜索">
        </span>
        <input v-model="listParams.state" @keydown.enter="searchInfo" type="text" placeholder="请输入关键字">
        <span v-show="closeShow" class="close-wrapper" @click="closeKeyWord">
          <img class="close" src="../../../images/saleman/close.png" alt="关闭">
        </span>
      </div>
    </div>
    <div ref="scrollBox" class="yayi-wrapper">
      <div v-if="yayiDataList.length > 0" class="scrollBox" v-infinite-scroll="getListMore" infinite-scroll-immediate-check="true">
        <div class="yayi-item"  v-for="(item, index) in yayiDataList" :key="index">
          <div class="item-left clearfix">
            <img v-if="item.userPic" :src="item.userPic + '?imageView2/1/w/200/h/200'" alt="头像">
            <img v-else src="../../../images/mine/defaultHead.png" alt="头像">
          </div>
          <div class="item-right">
            <div class="info-top">
              <span class="user-name">{{ item.trueName }}</span>
              <span class="shop-name">{{ item.certification.companyName }}</span>
            </div>
            <div class="info-bottom">
              <img src="../../../images/salesWap/customer/address.png" alt="icon">
              <span>{{ item.certification.part }}</span>
            </div>
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
import addressPickers from '../../wx_user/addressPickers.vue'
export default {
  name: "yayi",
  components: {
    addressPickers,
  },
  data () {
    return {
      yayiDataList: [],
      isLoading:false,
      listParams: {
        cityName: '上海市',
        state: '',
        currentPage: 1,
        numberPerPage: 10,
      },
      totalPage: 0,
      endShow: false,
      closeShow: false,
    };
  },
  created() {
    this.getYayiData();
  },
  methods: {
    getYayiData() {
      this.$store.dispatch('GET_YAYI_DATA', this.listParams).then((res) => {
        if (res.callStatus === 'SUCCEED') {
          this.yayiDataList = this.yayiDataList.concat(res.data);
          this.totalPage = res.totalPage;
        }
      })
    },
    getListMore (){
      if ((this.totalPage <= this.listParams.currentPage && this.yayiDataList.length > 0) || this.totalPage == 1){
        this.endShow = true
      } else {
        this.listParams.currentPage = Number(this.listParams.currentPage) + 1;
        this.getYayiData();
      }
    },
    searchInfo() {
      this.yayiDataList = [];
      this.listParams.currentPage = 1
      this.getYayiData();
    },
    closeKeyWord() {
      this.listParams.state = '';
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
    'listParams.state': {
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

<style lang="scss" scoped>
@import "../../../common/sass/factory";
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
      padding: 0 0 0 px2vw(8);
      margin: px2vw(16) 0 0 0;
      width: px2vw(390);
      height: px2vw(30);
      line-height: px2vw(30);
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
.yayi-wrapper{
  padding-top: px2vw(90);
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
.yayi-item{
  width: 100%;
  height: px2vw(167);
  border-bottom: px2vw(2) solid $borderColor;
}
.item-left{
  float: left;
  margin: px2vw(39) px2vw(20) 0 px2vw(22);
  width: px2vw(91);
  height: px2vw(91);
  border-radius: 50%;
  font-size: 0;
  overflow: hidden;
  img{
    width: px2vw(91);
    height: px2vw(91);
  }
}
.item-right{
  float: left;
  width: px2vw(600);
  .info-top{
    margin: px2vw(48) 0 px2vw(14) 0;
    height: px2vw(40);
    overflow: hidden;
  }
  .user-name{
    height: px2vw(30);
    line-height: px2vw(30);
    font-size: px2vw(32);
    color: rgb(16,16,16);
  }
  .shop-name{
    height: px2vw(30);
    line-height: px2vw(30);
    font-size: px2vw(26);
    color: rgb(51,51,51);
  }
  .info-bottom{
    height: px2vw(25);
    line-height: px2vw(25);
    color: rgb(100,100,100);
    font-size: 0;
    span{
      font-size: px2vw(26);
      line-height: px2vw(25);
    }
  }
  img{
    display: inline-block;
    vertical-align: top;
    margin: 0 px2vw(8) 0 0;
    width: px2vw(20);
    height: px2vw(24);
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