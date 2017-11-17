<template>
  <div class="searchWord">
    <div class="search_box">
      <form action="http://47.93.48.111:6181/api/item/itemSearch" method="post" enctype="multipart/form-data" v-on:submit.prevent="search_cargo">
        <input class="search_word" type="search" name="keyWord" @focus="searchActive()" v-focus autofocus="autofocus" @keyup.enter="search_cargo" v-model="searchCargo" autocomplete="on" placeholder="请输入关键字" >
      </form>
      <img class="search_img" src="../../../images/index/search.png" alt="img">
      <div class="cancel_btn" @click="cancelSearch">取消</div>
    </div>
    <div class="history_box">
      <div class="history_container">
        <p class="history_word">历史搜索</p>
        <img class="delete_img" @click="deleteHistory" src="../../../images/index/delete.png" alt="img">
      </div>
      <div>
        <span class="historyBtn" v-for="(item,index) in userHistory" v-if="index<8" @click="search_cargo(item)">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import  comTop  from './comTop.vue'
  import { Toast, MessageBox } from 'mint-ui'
  import { tokenMethods } from '../../../vuex/util'

  export default {
    name: 'searchWord',
    data () {
      return {
        searchCargo: '',
        userHistory: [],
        autofocus: true,
      }
    },
    components: {
      comTop
    },
    created: function() {
      var that = this
      if (JSON.parse(tokenMethods.getCommunityHistory())) {
        that.userHistory = JSON.parse(tokenMethods.getCommunityHistory()).reverse()
      }

    },
    directives: {
      focus: {
        inserted: function (el, {value}) {
          el.focus();
        }
      }
    },
    methods: {
      //搜索框
      search_cargo: function(item,index) {
        var that = this;
        if (typeof(item) !== 'object') {
          that.searchCargo = item
        }
        if (that.searchCargo == '') {
          Toast({message: '请输入查询条件！', duration: 1500})
          return false
        }
        var obj = {
          keyWord: that.searchCargo,
        }
        that.$store.dispatch('', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            console.log(res.data,'searchWord')
            if (res.data.data.length !== 0) {
              if (JSON.parse(tokenMethods.getCommunityHistory()) == null) {
                that.userHistory = []
                that.userHistory.push(that.searchCargo)
              } else {
                that.userHistory = JSON.parse(tokenMethods.getCommunityHistory())
                that.userHistory.push(that.searchCargo)
                var userHistoryData = []
                for (var i = 0; i < that.userHistory.length; i++) {
                  if (userHistoryData.indexOf(that.userHistory[i]) == -1) {
                    userHistoryData.push(that.userHistory[i])
                  }
                }
                that.userHistory = userHistoryData
                console.log(that.userHistory,'9999')
              }
              tokenMethods.setCommunityHistory(that.userHistory)
            }
            that.$router.push({ name: 'caseOfIllness'});
            window.scroll(0,0);
          } else {
            Toast({message: '网络出错，请稍后再试！', duration: 1500})
          }
        })
      },
      //去商品列表页
      goToList: function(classify) {
        var that = this
        that.$router.push({ name: 'productList', params: { oneClassify: classify.oneClassify, twoClassify: '', threeClassify: ''}})

      },
      searchActive: function() {
      },
      // 删除历史搜索
      deleteHistory: function() {
        var that = this
        MessageBox.confirm('确定删除历史搜索？').then(action => {
          tokenMethods.removeCommunityHistory()
          that.userHistory = []
        })
      },
      // 取消搜索
      cancelSearch: function() {
        let that = this
        let timer1=window.setTimeout(function(){
          that.$router.go(-1);
          window.clearTimeout(timer1);
        },350)
      },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  form {
    position: absolute;
  }
  input[type=search]::-webkit-search-cancel-button{
    -webkit-appearance: none;//此处就是去掉默认的小×
  }
  .searchWord {
    width: 100vw;
  }
  .search_box {
    width: 100vw;
    height: 12vw;
    position: relative;
    background-color: $themeColor;
    border-bottom: 1px solid #E5E5E5;
  }
  .search_word {
    width: px2vw(606);
    height: px2vw(64);
    border: none;
    // border: 1px solid #e9e9e9;
    border-radius: px2vw(28);
    background-color: #fff;
    outline: medium;
    color: #333;
    padding-left: px2vw(80);
    margin-left: px2vw(30);
    margin-top: px2vw(13);
  }
  .search_img {
    width: 4.75vw;
    height: 4.75vw;
    position: absolute;
    top: px2vw(26);
    left: px2vw(61);
  }
  .cancel_btn {
    float: right;
    color: #fff;
    line-height: 12vw;
    font-size: px2vw(28);
    margin-right: px2vw(28);
  }
  .history_box {
    width: 100vw;
    padding: px2vw(23) px2vw(17);
    .history_container {
      width: 100&;
      height: px2vw(50);
      .history_word {
        font-size: px2vw(30);
        float: left;
      }
      .delete_img {
        width: px2vw(29);
        height: px2vw(29);
        float: right;
        margin-top: px2vw(10);
      }
    }
    .historyBtn {
      display: inline-block;
      height: px2vw(60);
      line-height: px2vw(25);
      font-size: px2vw(28);
      background-color: #F3F3F3;
      border-radius: px2vw(26);
      padding: px2vw(20) px2vw(31) px2vw(20) px2vw(31);
      margin-top: px2vw(20);
      margin-right: px2vw(20);
    }
  }
</style>

