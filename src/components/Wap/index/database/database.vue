<template>
  <div>
    <div class="header">
      <span class="back-click-area" @click="goBack"></span>
      <div class="headerTitle">资料库</div>
      <span class="search-click-area"></span>
    </div>
    <div class="classify">
      <div class="classifyList">
        <span v-for="(value,index) in isSelect">{{value}}</span>
      </div>
      <div class="showMore" @click="changeClassifyShow">
        +
      </div>
    </div>
    <datum></datum>
    <div v-if="classifyShow" class="classifyModule">
      <div @click="changeClassifyShow" class="closeIt">
        x
      </div>
      <div class="area">
        <div class="title">
          <span class="titleHead">我的分类</span>
          <span class="titleDes">点击删除分类</span>
        </div>
        <div class="classifyForm">
          <span v-for="(value,index) in isSelect" @click="addClassify">{{value}}</span>
        </div>
      </div>
      <div class="area">
        <div class="title">
          <span class="titleHead">推荐分类</span>
          <span class="titleDes">点击添加分类</span>
        </div>
        <div class="classifyForm">
          <span v-for="(value,index) in notSelect" @click="deleteClassify">+{{value}}</span>
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
        isSelect:['1','2','3','4','5'],
        notSelect:['6','7','8','9','10','11','12','12','14','15','16','17','18','19','20'],
        classifyShow:false
      }
    },
    components:[datum],
    methods:{
      addClassify(index){
        this.isSelect.push(this.notSelect[index]);
        this.notSelect.splice(index,1)
      },
      deleteClassify(index){
        this.notSelect.push(this.isSelect[index]);
        this.isSelect.splice(index,1)
      },
      changeClassifyShow(){
        this.classifyShow = !this.classifyShow;
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
    z-index: 999;
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
      width: px2vw(150);
      background: url("../../../../images/case/caseOfIllness/search.png") px2vw(20) center no-repeat;
      background-size: px2vw(18) px2vw(29);
    }
  }
</style>
