<template>
  <div ref="scrollBox" class="yayi-wrapper">
    <div v-if="yayiDataList != null" class="scrollBox" v-infinite-scroll="getListMore" infinite-scroll-immediate-check="true">
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
    <div class="end-wrapper" v-show="endShow">
      <span class="end">-End-</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "yayi",
  data () {
    return {
      yayiDataList: [],
      isLoading:false,
      listParams: {
        currentPage: 1,
        numberPerPage: 10,
      },
      totalPage: 0,
      endShow: false
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
          console.log(this.yayiDataList)
          this.totalPage = res.totalPage;
        }
      })
    },
    getListMore (){
      if (this.totalPage <= this.listParams.currentPage){
        this.endShow = true
      } else {
        this.listParams.currentPage = Number(this.listParams.currentPage) + 1;
        this.getYayiData();
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../common/sass/factory";
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