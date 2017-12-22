<template>
  <div class="searchWord">
    <div class="search_box">
      <input class="search_word" type="search" name="keyWord" @focus="searchActive()" v-focus autofocus="autofocus"
             @keyup.enter="search_cargo" v-model="searchCargo" autocomplete="on" placeholder="请输入关键字">
      <img class="search_img" src="../../../../images/index/search.png" alt="img">
      <div class="cancel_btn" @click="cancelSearch">取消</div>
    </div>
    <div v-if="searching">
      <div class="history_box">
        <div class="history_container">
          <p class="history_word">历史搜索</p>
          <img class="delete_img" @click="deleteHistory" src="../../../../images/index/delete.png" alt="img">
        </div>
        <div>
          <span class="historyBtn" v-for="(item,index) in userHistory" v-if="index<8" @click="search_cargo(item)">{{item}}</span>
        </div>
      </div>
    </div>
    <div v-else>
      <datum :keyWords="keyWord"></datum>
    </div>
  </div>
</template>

<script>
  import {SAVE_SEARCH_WORD} from '../../../../vuex/types'
  import {Toast, MessageBox} from 'mint-ui'
  import {tokenMethods} from '../../../../vuex/util'
  import datum from '../../mine/collect/datum.vue'

  export default {
    name: 'searchWord',
    data() {
      return {
        popupVisible: false,
        searchCargo: '',
        userHistory: [],
        autofocus: true,
        searching:true,
        keyWord:'',
      }
    },
    components: {datum},
    created: function () {
      var that = this
      if (JSON.parse(tokenMethods.getDataHistory())) {
        that.userHistory = JSON.parse(tokenMethods.getDataHistory()).reverse()
      }
//    if (that.$route.query.data == 'focus') {
//      that.searchActive()
//    }
      that.$store.dispatch('GET_CLASSIFY_QUERY')

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
      search_cargo: function (item, index) {
        if (typeof(item) !== 'object') {
          this.searchCargo = item
        }
        if (this.searchCargo == '') {
          Toast({message: '请输入查询条件！', duration: 1500})
          return false
        }
        this.keyWord = this.searchCargo;
        if (JSON.parse(tokenMethods.getDataHistory()) == null) {
          this.userHistory = []
          this.userHistory.push(this.searchCargo)
        } else {
          this.userHistory = JSON.parse(tokenMethods.getDataHistory())
          this.userHistory.push(this.searchCargo)
          let userHistoryData = []
          for (let i = 0; i < this.userHistory.length; i++) {
            if (userHistoryData.indexOf(this.userHistory[i]) == -1) {
              userHistoryData.push(this.userHistory[i])
            }
          }
          this.userHistory = userHistoryData;
        }
        tokenMethods.setDataHistory(this.userHistory);
        this.searching = false;
      },
      searchActive: function () {
        this.searching = true;
      },
      // 删除历史搜索
      deleteHistory: function () {
        var that = this
        MessageBox.confirm('确定删除历史搜索？').then(action => {
          tokenMethods.removeDataHistory()
          that.userHistory = []
        })
      },
      // 取消搜索
      cancelSearch: function () {
        let that = this
        let timer1 = window.setTimeout(function () {
          that.$router.go(-1);
          window.clearTimeout(timer1);
        }, 350)
      },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  form {
    position: absolute;
  }

  input[type=search]::-webkit-search-cancel-button {
    -webkit-appearance: none; //此处就是去掉默认的小×
  }

  .searchWord {
    width: 100vw;
  }

  .search_box {
    width: 100vw;
    height: 12vw;
    position: relative;
    background-color: $themeColor;
    border-bottom: px2vw(1) solid #E5E5E5;
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
      width: 100 &;
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

