<template>
  <div>
    <div class="header">
      <span class="back-click-area" @click="goBack"></span>
      <div class="headerTitle">资料库</div>
      <span class="search-click-area"></span>
    </div>
    <div class="classify">
      <div class="classifyList">
        <div id="classifyWrap">
          <span v-for="(value,index) in isSelect" :class="{select:index == args.selected}" @click="dress(index,value)">{{value}}</span>
        </div>
      </div>
      <div class="showMore" @click="changeClassifyShow">
        +
      </div>
    </div>
    <datum class="datum" :keyWord="keyWord"></datum>
    <div v-if="classifyShow" class="classifyModule">
      <div @click="changeClassifyShow" class="closeIt">
        <div></div>
      </div>
      <div class="area">
        <div class="title">
          <span class="titleHead">我的分类</span>
          <span class="titleDes">点击删除分类</span>
        </div>
        <div class="classifyForm">
          <span v-for="(value,index) in isSelect" @click="deleteClassify(index)">{{value}}</span>
        </div>
      </div>
      <div class="area">
        <div class="title">
          <span class="titleHead">推荐分类</span>
          <span class="titleDes">点击添加分类</span>
        </div>
        <div class="classifyForm">
          <span v-for="(value,index) in notSelect" @click="addClassify(index)">+{{value}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import datum from '../../mine/collect/datum.vue'

  export default {
    data(){
      return{
        isSelect:localStorage.getItem('isSelectDataBase') ? JSON.parse(localStorage.getItem('isSelectDataBase')) : ['1','2','3','4','5'],
        //isSelect: ['1','2','3','4','5'],
        notSelect:localStorage.getItem('isSelectDataBase') ? JSON.parse(localStorage.getItem('notSelectDataBase')) :['6','7','8','9','10','11','12','12','14','15','16','17','18','19','20'],
        //notSelect:['6','7','8','9','10','11','12','12','14','15','16','17','18','19','20'],
        classifyShow:false,
        args:{
          selected:0,
        },
        keyWord:'',
      }
    },
    watch:{
      isSelect:{
        handler:function (val) {
          document.getElementById('classifyWrap').style.width = 14.4 * val.length + 'vw';
        }
      },
      deep:true
    },
    components:{datum},
    created(){
      console.log(this.$router.history.current.name)
    },
    methods:{
      addClassify(index){
        this.isSelect.push(this.notSelect[index]);
        this.notSelect.splice(index,1);
        localStorage.setItem('isSelectDataBase', JSON.stringify(this.isSelect))
        localStorage.setItem('notSelectDataBase', JSON.stringify(this.notSelect))
      },
      deleteClassify(index){
        this.notSelect.push(this.isSelect[index]);
        this.isSelect.splice(index,1);
        localStorage.setItem('isSelectDataBase', JSON.stringify(this.isSelect))
        localStorage.setItem('notSelectDataBase', JSON.stringify(this.notSelect))
      },
      changeClassifyShow(){
        this.classifyShow = !this.classifyShow;
      },
      goBack(){
        this.$router.go(-1);
      },
      dress(index,value){
        this.args.selected = index;
        this.keyWord = value
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: px2vw(88);
    z-index: 998;
    line-height: px2vw(88);
    text-align: center;
    background-color: $themeColor;
    color: #fff;
    font-size: px2vw(36);
    .back-click-area {
      position: absolute;
      top: 0;
      height: 100%;
      left: 0;
      width: px2vw(150);
      background: url("../../../../images/logIn/back.png") px2vw(20) center no-repeat;
      background-size: px2vw(18) px2vw(29);
    }
    .search-click-area {
      position: absolute;
      top: 0;
      height: 100%;
      right: 0;
      width: px2vw(88);
      background: url("../../../../images/case/caseOfIllness/search.png") px2vw(20) center no-repeat;
      background-size: px2vw(45) px2vw(45);
    }
  }
  .classify{
    width: 100%;
    height: px2vw(110);
    position: fixed;
    top:px2vw(88);
    left: 0;
    padding: px2vw(20);
    background-color: #fff;
    border-bottom: px2vw(20) solid #f4f4f4;
    .classifyList{
      width: px2vw(650);
      border-right: px2vw(1) solid #e5e5e5;
      height: px2vw(50);
      line-height: px2vw(50);
      overflow-x: scroll;
      overflow-y: hidden;
      display: inline-block;
      #classifyWrap{
        height: px2vw(50);
        line-height: px2vw(50);
        span{
          text-align: center;
          display: inline-block;
          width: px2vw(108);
          font-size: px2vw(30);
          color: #333;
        }
        .select{
          color: $themeColor;
        }
      }
    }
    .showMore{
      text-align: center;
      display: inline-block;
      width: px2vw(50);
      line-height: px2vw(50);
      font-size: px2vw(50);
      color: $themeColor;
      vertical-align: top;
    }
  }
  .datum{
    position: fixed;
    top:px2vw(198);
    left: 0;
  }
  .classifyModule{
    position: fixed;
    z-index: 999;
    bottom: 0;
    left: 0;
    height: px2vw(1294);
    width: 100%;
    border-top-left-radius: px2vw(20);
    border-top-right-radius: px2vw(20);
    background-color: #fff;

    .closeIt{
      height: px2vw(65);
      width: 100%;
      div{
        width: px2vw(150);
        height: px2vw(65);
        background: url("../../../../images/index/close2.png") px2vw(20) center no-repeat;
        background-size: px2vw(35) px2vw(35);
      }
    }
    .area{
      .title{
        padding: 0 px2vw(20);
        height: px2vw(100);
        line-height: px2vw(100);
        border-bottom:px2vw(1) solid #e5e5e5;
        .titleHead{
          font-size: px2vw(32);
          color: #181818;
        }
        .titleDes{
          font-size: px2vw(24);
          color: #999;
        }
      }
      .classifyForm{
        padding: 0 px2vw(15);
        margin: px2vw(15) 0;
        overflow: scroll;
        span{
          border-radius: px2vw(10);
          display: inline-block;
          width: px2vw(150);
          height: px2vw(60);
          line-height: px2vw(60);
          background-color: #efefef;
          margin: px2vw(15);
          text-align: center;
          font-size: px2vw(26);
          color: #666;
        }
      }
    }
  }
</style>
