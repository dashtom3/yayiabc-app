<template>
  <div class="searchWord">
    <div class="search_box">
      <form action="http://47.93.48.111:6181/api/item/itemSearch" method="post" enctype="multipart/form-data" v-on:submit.prevent="search_cargo">
        <input class="search_word" type="search" name="keyWord" @focus="searchActive()" v-focus autofocus="autofocus" @keyup.enter="search_cargo" v-model="searchCargo" autocomplete="on" placeholder="请输入关键字" >
      </form>
      <img class="search_img" src="../../../images/index/search.png" alt="img">
      <div class="cancel_btn" @click="cancelSearch">取消</div>
    </div>
    <div class="history_box" v-if="isSearching">
      <div class="history_container">
        <p class="history_word">历史搜索</p>
        <img class="delete_img" @click="deleteHistory" src="../../../images/index/delete.png" alt="img">
      </div>
      <div>
        <span class="historyBtn" v-for="(item,index) in userHistory" v-if="index<8" @click="search_cargo(item)">{{item}}</span>
      </div>
    </div>
    <div v-else class="searchWrap">
      <div class="firstClassify">
        <div class="firstClassifyName" >
          <div @click="changeClass(0)" :class="{isCheckDiv:caseClassNum === 0}">病例</div>
          <div @click="changeClass(1)"  :class="{isCheckDiv:caseClassNum === 1}">视频</div>
          <div @click="changeClass(2)"  :class="{isCheckDiv:caseClassNum === 2}">问答</div>
        </div>
        <div class="secondClassifyName">
          <div class="theSecondClassifyName" @click="isChooseSecondClassify">
            {{secondClassify}}
            <img src="../../../images/ProductList/Plist.png" alt="">
          </div>
          <div class="secondClassifyList" v-if="secondClassifyShow">
            <div class="triOut"></div>
            <div class="triIn"></div>
            <ul>
              <li v-for="(item,key) in secondClassifyArr" @click="chooseSecondClassify(item,key)" :class="{isCheckLi:item == secondClassify}">
                {{item}}
                <img src="../../../images/ProductList/brandChecked.png" alt="" v-if="item == secondClassify">
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="searchRes">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
  import { Toast, MessageBox } from 'mint-ui'
  import { tokenMethods } from '../../../vuex/util'

  export default {
    name: 'searchWord',
    data () {
      return {
        searchCargo: '',
        userHistory: [],
        autofocus: true,
        isSearching : false,
        secondClassifyArr:['不限','外科','内科','修复','种植','正畸'],
        secondClassify: '不限',
        secondClassifyShow: false,
        caseClassNum: 0,
//        caseListArgs: {
//          classify: null,
//          currentPage: 1,
//          numberPerPage: 10,
//          order: 0,
//        },
      }
    },
    components: {
    },
    created: function() {
      var that = this
      that.isSearching = true;
      if (JSON.parse(tokenMethods.getCommunityHistory())) {
        that.userHistory = JSON.parse(tokenMethods.getCommunityHistory()).reverse()
      }

    },
    beforeRouteEnter (to, from, next) {
      // 通过 `vm` 访问组件实例
      next(vm => {
//        console.log(vm.$router.history.current.name);
        if (vm.$router.history.current.name === '/communitySearch/caseOfIllness') {
          vm.caseClassNum = 0
        } else if(vm.$router.history.current.name === '/communitySearch/video') {
          vm.caseClassNum = 1
        } else if(vm.$router.history.current.name === '') {
          vm.caseClassNum = 2
        }
      })
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
          that.$store.dispatch('SAVE_CASE_SEARCHING',  that.searchCargo);
          console.log(that.userHistory,'9999')
        }
        tokenMethods.setCommunityHistory(that.userHistory);
        that.caseClassNum = 0;
        that.isSearching = false
        document.getElementsByClassName('search_word')[0].blur();
        window.scroll(0,0);
      },
      changeClass(index){
        console.log(index)
        this.caseClassNum = index;
        if(index === 0)
        {
          this.$router.push({path:'/communitySearch/caseOfIllness'});
        }else if(index === 1)
        {
          this.$router.push({path:'/communitySearch/video'});
        }
        else if(index === 2)
        {
          this.$router.push({path:'/communitySearch/QAndASearch'});
        }
        this.$store.dispatch('SAVE_CASE_ORDER',  index);
      },
      isChooseSecondClassify(){
        this.secondClassifyShow = !this.secondClassifyShow
      },
      chooseSecondClassify(val,index){
        this.secondClassify = val;
        this.secondClassifyShow = false
        if( this.caseClassNum === 0)
        {
          this.$store.dispatch('SAVE_CASE_DRESSING',index);
        }
//        this.caseListArgs.classify = val;
        //做点什么
      },
      searchActive: function() {
        this.isSearching = true;
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
//        this.isSearching = false
        //记得把这个解开，上面的代码是调试用的
        let timer1=window.setTimeout(() =>{
          this.$router.push('/caseOfIllness');
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
    height: px2vw(88);
    position: relative;
    background-color: $themeColor;
    border-bottom: px2vw(1) solid #E5E5E5;
  }
  .search_word {
    width: px2vw(606);
    height: px2vw(64);
    border: none;
    // border: px2vw(1) solid #e9e9e9;
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

  .searchWrap{
    .firstClassify{
      position: fixed;
      top:px2vw(88);
      left: 0;
      width: 100%;
      height: px2vw(90);
      text-align: center;
      background-color: #fff;
      border-bottom: px2vw(1) solid #e5e5e5;
      .firstClassifyName{
        margin: 0 auto;
        height: px2vw(90);
        display: flex;
        width: px2vw(320);
        justify-content: space-between;
        div{
          width: px2vw(90);
          height: px2vw(90);
          line-height: px2vw(86);
          font-size: px2vw(36);
          color: #999;
        }
        .isCheckDiv{
          color: $themeColor;
          border-bottom: 3px solid $themeColor;
        }
      }
      .secondClassifyName{
        position: absolute;
        right: px2vw(20);
        top: 0;
        height: px2vw(90);
        line-height: px2vw(90);
        font-size: px2vw(30);
        color: $themeColor;
        z-index: 100;
        .theSecondClassifyName{
          img{
            margin-left: px2vw(10);
          }
        }
        .secondClassifyList{
          .triOut{
            border: px2vw(12) solid transparent;
            border-bottom: px2vw(11) solid #9ac8f6;
            position: absolute;
            z-index: 104;
            right: px2vw(20);
            top: px2vw(59);
          }
          .triIn{
            border: px2vw(10) solid transparent;
            border-bottom: px2vw(10) solid #fff;
            position: absolute;
            z-index: 104;
            right: px2vw(22);
            top: px2vw(62);
          }
          ul{
            position: absolute;
            right: 0;
            top: px2vw(80);
            border: px2vw(1) solid #9ac8f6;
            width: px2vw(200);
            padding: 0 px2vw(10);
            border-radius: px2vw(10);
            background-color: #fff;
            z-index: 201;
            li{
              border-bottom: px2vw(1) solid #e5e5e5;
              width: 100%;
              height: px2vw(90);
              line-height: px2vw(90);
              color: #999;
              text-align: left;
              padding-left: px2vw(20);
              font-size: px2vw(28);
              img{
                width: px2vw(26);
                margin-left: px2vw(40);
              }
            }
            .isCheckLi{
              color: $themeColor;
            }
          }
        }
      }
    }
    .searchRes{
      position: fixed;
      top: px2vw(178);
      bottom: 0;
      overflow: scroll;
      width: 100%;
      -webkit-overflow-scrolling: touch;
      /*z-index: -1;*/
    }
  }
</style>

