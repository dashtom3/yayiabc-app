<template>
  <div>
    <div class="holder"></div>
    <div class="inputArea">
      <textarea name="" id="" cols="30" rows="10" :placeholder="placeHolder" v-model="commentContent" @focus="writeComment" class="inputArea" autofocus></textarea>
      <div class="buttons">
        <button @click="releaseComment">发表</button>
        <button @click="cancelComment">取消</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {ADD_COMMENT} from '../../../vuex/types'
  import {Toast} from 'mint-ui'

  export default {
    data(){
      return{
        commentContent:'',
        placeHolder:'',
      }
    },
    props:{
      args:{
        type:Object
      }
    },
    created(){
      document.body.classList.add('full-body-commentArea')
    },
    mounted(){
      this.placeHolder = "回复 " + this.args.userName ? this.args.userName : ''
    },
    methods:{
      releaseComment(){
        if(!this.commentContent){
          Toast({message: '请输入内容！', duration: 1500});
          return
        }
        let obj = {
          type:this.args.type,
          beCommentedId:this.args.id,
          commentContent:this.commentContent,
          parentId:this.args.parentId ? this.args.parentId : '',
        }
        console.log(obj,'obj')
        this.$store.dispatch(ADD_COMMENT, obj).then(res=>{
          if(res.callStatus === 'SUCCEED'){
            console.log(res)
            Toast({message: '发布成功！', duration: 1500});
            this.$emit('commentRes',res.data);
            this.commentContent = ''
          }
        })
      },
      writeComment(){

      },
      cancelComment(){
        console.log(false)
        document.body.classList.remove('full-body-commentArea')
        this.$emit('cancelComment',false)
      },
    },
    watch:{
      args:{
        deep:true,
        handler:function () {
          this.commentContent = ''
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  body {
    &.full-body-commentArea{
      position: fixed !important;
      top: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
      overflow: hidden !important;
      .inputArea{
        position: absolute !important;
      }
    }
  }
</style>

<style scoped lang="scss" rel="stylesheet/scss">
  .holder{
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 20;
  }
  .inputArea{
    min-height: px2vw(120);
    max-height: px2vw(200) !important;
    _height: px2vw(120);
    /*outline: 0;*/
    /*border: 1px solid #a0b3d6;*/
    /*font-size: px2vw(26);*/
    /*line-height: 24px;*/
    /*padding:px2vw(2);*/
    /*word-wrap: break-word;*/
    /*overflow-x: hidden;*/
    /*overflow-y: auto;*/
    /*box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);*/
    /*vertical-align: middle;*/
    /*display: inline-block;*/
    /*margin-left: 2%;*/
    width: 78%;
    position: absolute;
    bottom: 0;
    left:0;
    z-index: 50;
    background-color: #fff;
  }
  .buttons{
    float: right;
  }
</style>
