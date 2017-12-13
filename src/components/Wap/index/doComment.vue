<template>
  <div>
    <div class="holder" @click.stop="cancelComment"></div>
    <div class="inputArea1">
      <textarea name="" id="" cols="30" rows="10" :placeholder="placeHolder" v-model="commentContent" @focus="writeComment" class="textArea"></textarea>
      <div class="buttons">
        <button @click="releaseComment">发表</button>
        <button @click="cancelComment">取消</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {ADD_COMMENT, ADD_ANSWER} from '../../../vuex/types'
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
      if(this.args.userName){
        this.placeHolder = "回复 " + this.args.userName
      }
      let a = document.getElementsByClassName('textArea');
      a[0].focus();
    },
    methods:{
      releaseComment(){
        if(!this.commentContent){
          Toast({message: '请输入内容！', duration: 1500});
          return
        }
        if(this.args.star === 1){
          let obj = {
            faqQuestionId : this.args.faqQuestionId,
            faqAnswerContent : this.commentContent,
            type: this.args.type,
            parentId:this.args.parentId ? this.args.parentId : '',
          }
          this.$store.dispatch(ADD_ANSWER, obj).then(res=>{
            if(res.callStatus === 'SUCCEED'){
//            console.log(res)
              Toast({message: '发布成功！', duration: 1500});
              let timer1=window.setTimeout(() => {
                this.$emit('commentRes',res.data);
                this.commentContent = ''
                document.body.classList.remove('full-body-commentArea')
                window.clearTimeout(timer1);
              },350)
            }
            else {
              Toast({message: '发布失败！请重试', duration: 1500});
            }
          })
        }
        else {
          let obj = {
            type:this.args.type,
            beCommentedId:this.args.id,
            commentContent:this.commentContent,
            parentId:this.args.parentId ? this.args.parentId : '',
          }
//        console.log(obj,'obj')
          this.$store.dispatch(ADD_COMMENT, obj).then(res=>{
            if(res.callStatus === 'SUCCEED'){
//            console.log(res)
              Toast({message: '发布成功！', duration: 1500});
              let timer1=window.setTimeout(() => {
                this.$emit('commentRes',res.data);
                this.commentContent = ''
                document.body.classList.remove('full-body-commentArea')
                window.clearTimeout(timer1);
              },350)
            }
            else {
              Toast({message: '发布失败！请重试', duration: 1500});
            }
          })
        }

      },
      writeComment(){

      },
      cancelComment(){
        let timer1=window.setTimeout(() => {
          console.log(false)
          document.body.classList.remove('full-body-commentArea')
          this.$emit('cancelComment',false)
          this.$destroy()
          window.clearTimeout(timer1);
        },350)

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
  @import "../../../common/sass/factory";
  body {
    &.full-body-commentArea{
      position: absolute !important;
      top: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
      overflow: hidden !important;
      .inputArea1{
        position: absolute !important;
      }
    }
  }
</style>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .holder{
    background-color: rgba(0,0,0,0.5);
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 2100;
    top:0;
    left:0;
  }
  .inputArea1{
    width: 100%;
    position: fixed;
    bottom: 0;
    left:0;
    z-index: 2110;
    background-color: #fff;
    .textArea{
      border: none;
      background-color: #f4f4f4;
      resize: none;
      width: px2vw(710);
      margin: px2vw(20) px2vw(20) 0;
      padding: px2vw(10);
      border-radius: px2vw(10);
      height: px2vw(180);
    }
    .buttons{
      width: px2vw(710);
      height: px2vw(80);
      line-height: px2vw(80);
      z-index: 2120;
      margin: 0 px2vw(20);
      button{
        width: px2vw(120);
        height: px2vw(50);
        line-height: px2vw(50);
        margin: px2vw(10) 0 0;
        background-color: #fff;
        border-radius: px2vw(10);
        font-size: px2vw(24);
      }
      button:nth-child(1){
        float: right;
        border: 1px solid $themeColor;
        background-color: $themeColor;
        color: white;
      }
      button:nth-child(2){
        float: left;
        color: #999;
      }
    }
  }

</style>
