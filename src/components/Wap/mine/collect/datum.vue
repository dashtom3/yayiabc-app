<template>
    <div>
      <!--暂无内容图片 样式开始-->
      <div class="none-datum" v-if="(noData && dataList.length == 0 )&&(noData && !dataList)">
        <div class="img-null">
          <img src="../../../../images/mine/colloct/noneData.png" alt="">
        </div>
        <div class="none">暂无内容</div>
      </div>
      <!--暂无内容图片 样式结束-->
      <mt-loadmore class="container" :bottom-method="getListMore" :bottom-all-loaded="allLoaded" :auto-fill=false ref="loadmore" v-on:bottom-status-change="isStateB">
        <!--这里 v-for -->
        <div class="list-wrap" v-for="(value,index) in dataList" @click="gotoDetail(value.id)">
          <div class="list-title">
            {{value.title}}
          </div>
          <div class="list-content">
            {{value.context ? value.context : '暂无详细内容'}}
          </div>
          <div class="list-class-box">
            <span>{{value.secondClassify}}</span>
            <span>22人阅读</span>
          </div>
        </div>
        <bottomLoadMore ref="bottomLoadMore" slot="bottom" :loading="isLoading" :loaded="isLoadedB"></bottomLoadMore>
      </mt-loadmore>
      <!--末尾-->
    </div>
</template>
<script>
  import {GET_MATER_LIST,COLLECT_MATER_LIST} from '../../../../vuex/types'
  import { LoadMore, MessageBox,Indicator } from 'mint-ui';

  export default {
    data(){
      return{
        timeStamp:null,
        isLoading:false,
        noData:false,
        args:{
          currentPage:1,
          keyWord:''
        },
        dataList:[],
        backName:'',
        allLoaded:false,
      }
    },
    props:{
      keyWords:{
        type:String
      }
    },
    watch:{
      keyWords:{
        handler:function (val) {
          this.args.keyWord = val;
          this.args.currentPage = 1;
          this.noData = false;
          this.loadMore();
        }
      }
    },
    created(){
      this.timeStamp = Date.parse(new Date());
      console.log(this.$router.history.current.name)
      Indicator.open();
      this.getList();
    },
    mounted(){
      console.log(this.args)
    },
    methods:{
      loadMore(){
        this.timeStamp = Date.parse(new Date());
        this.args.currentPage = 1;
        this.totalPage = 0;
        this.dataList = [];
        this.getList();
      },
      getList(){
        this.isLoading = true;
        switch (true){
          case this.$router.history.current.name === 'database':
            this.backName = '/database'
            this.$store.dispatch(GET_MATER_LIST, this.args).then(res=>{
              if(res.data.length > 0){
                console.log(res.data);
                this.dataList = res.data;
              }else {
                this.noData = true;
              }
              this.isAllLoaded();
              this.isLoading = false;
              Indicator.close();
            })
            break;
          case this.$router.history.current.name === 'datumcollect':
            this.backName = '/collect/datumcollect'
            console.log('k')
            this.$store.dispatch(COLLECT_MATER_LIST, this.args).then(res=>{    //要改这个接口
              if(res.data.length > 0){
                console.log(res.data);
                this.dataList = res.data;
              }else {
                this.noData = true;
              }
              this.isAllLoaded();
              this.isLoading = false;
              Indicator.close();
            })
            break;
        }
      },
      gotoDetail(id){
        this.$router.push({path:'/datumDetail',query:{backName:this.backName,id:id}})
      },
      getListMore(){
        if(this.totalPage <= this.args.currentPage){
          return
        }else {
          this.args.currentPage += 1;
          this.getList();
        }
      },
      isStateB(val){
        console.log(val)
        this.$refs.bottomLoadMore.states(val)
      },
      isLoadedB(){
        this.$refs.loadmore.onBottomLoaded();
      },
      isAllLoaded(){
        this.allLoaded = this.totalPage <= this.args.currentPage ? true : false;
        console.log(this.allLoaded);
      }
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

