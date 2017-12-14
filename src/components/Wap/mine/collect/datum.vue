<template>
    <div>
      <!--暂无内容图片 样式开始-->
      <div class="none-datum">
        <div class="img-null">
          <img src="../../../../images/mine/colloct/noneData.png" alt="">
        </div>
        <div class="none">暂无内容</div>
      </div>
      <!--暂无内容图片 样式结束-->
      <div class="container">
        <!--这里 v-for -->
        <div class="list-wrap">
          <div class="list-title">
            这是病例标题这是病例标题
          </div>
          <div class="list-content">
            这是问题答案, 这是问题答案, 这是问题答案, 这是问题答案, 这是问题答案
          </div>
          <div class="list-class-box">
            <span>口腔外科</span>
            <span>22人阅读</span>
          </div>
        </div>
      </div>
      <!--末尾-->
    </div>
</template>
<script>
  import {GET_MATER} from '../../../../vuex/types'

  export default {
    data(){
      return{
        isLoading:false,
        noData:false,
        args:{
          currentPage:1,
          keyWord:this.keyWord
        }
      }
    },
    props:[keyWord],
    created(){

    },
    methods:{
      getList(){
        switch (true){
          case this.$router.history.current.name === 'database':
            this.$store.dispatch(GET_MATER, this.args).then(res=>{
              if(res.data.length > 0){

              }else {
                this.noData = true;
              }
            })
            break;
          case this.$router.history.current.name === 'datumcollect':
            this.$store.dispatch(GET_MATER, this.args).then(res=>{    //要改这个接口
              if(res.data.length > 0){

              }else {
                this.noData = true;
              }
            })
            break;
        }
      },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
@import "../../../../common/sass/factory";
.none{
  font-size: px2vw(30);
  color: #666666;
}
.none-datum{
  position: fixed;
  top: px2vw(560);
  left: 0;
  width: 100vw;
  text-align: center;
}
.img-null img{
  width: px2vw(108);
  height: px2vw(147);
}
.container{
  padding: 0 px2vw(20);
}
.list-wrap{
  border-bottom: 1px solid #e5e5e5;
  color: #333333;
}
.list-title{
  font-size: px2vw(36);
  height: px2vw(95);
  line-height: px2vw(95);
}
.list-content{
  font-size: px2vw(30);
}
.list-class-box{
  margin-top: px2vw(25) ;
  margin-bottom: px2vw(25);
}
.list-class-box span:nth-child(1){
  display: inline-block;
  color: $themeColor;
  border: 1px solid $themeColor;
  border-radius: px2vw(8);
  padding:0 px2vw(4);
}
.list-class-box span:nth-child(2){
  float: right;
  color: #999999;
}
</style>

