<template>
  <div>
    <div class="header">
      <span class="back-click-area" @click="goBack"></span>
      <div class="headerTitle">资料库</div>
      <span class="search-click-area" @click="search"></span>
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
    <datum class="datum" :keyWords="keyWord"></datum>
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
          <span v-for="(value,index) in isSelect" @click="deleteClassify(index)" :class="{longText:value.length > 5}">{{value}}</span>
        </div>
      </div>
      <div class="area">
        <div class="title">
          <span class="titleHead">推荐分类</span>
          <span class="titleDes">点击添加分类</span>
        </div>
        <div class="classifyForm">
          <span v-for="(value,index) in notSelect" @click="addClassify(index)" :class="{longText:value.length > 5}">{{value}}</span>
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
        isSelect:localStorage.getItem('isSelectDataBase') ? JSON.parse(localStorage.getItem('isSelectDataBase')) : ['全部','全口种植','隐形正畸','牙齿矫正问答','口腔修复病例'],
//        isSelect: ['全部','全口种植','隐形正畸','牙齿矫正问答','口腔修复病例'],
        notSelect:localStorage.getItem('isSelectDataBase') ? JSON.parse(localStorage.getItem('notSelectDataBase')) :['龋齿','牙龈炎','儿童龋病','老年人龋病','慢性龈炎','鹅口疮'],
//        notSelect:['龋齿','牙龈炎','儿童龋病','老年人龋病','慢性龈炎','鹅口疮'],
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
          this.lengthCompute(val);
        }
      },
      deep:true
    },
    components:{datum},
    created(){
      console.log(this.$router.history.current.name);
    },
    mounted(){
      this.lengthCompute(this.isSelect)
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
        this.$router.push("/");
        this.$destroy();
      },
      dress(index,value){
        this.args.selected = index;
        this.keyWord = index > 0 ? value :'';
        console.log(index,value,this.keyWord)
        this.$store.commit('SAVE_DATABASE_KEYWORD',this.keyWord);
      },
      search(){
        this.$router.push('/dataSearch')
      },
      lengthCompute(val){
        let long = 0;
        for(let i = 0;i < val.length;i++){
          long += val[i].length;
        }
        console.log(long)
        document.getElementById('classifyWrap').style.width = 4 * long + 3.2 * val.length + 'vw';
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
      background: url("../../../../images/logIn/back3.png") px2vw(20) center no-repeat;
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
          height: px2vw(50);
          display: inline-block;
          padding: 0 px2vw(12);
          font-size: px2vw(30);
          color: #333;
          /*overflow: hidden;*/
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
    width: 100%;
    height: 86vh;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
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
          text-overflow:ellipsis;
        }
        .longText{
          font-size: px2vw(24);
          text-overflow:ellipsis;
        }
      }
    }
  }
</style>
