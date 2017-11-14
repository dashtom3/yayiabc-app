<template>
    <div ref="wrap" class="wrap">
      <div class="areaBox">
        <textarea v-model="textArea" autofocus="autofocus" id="area" ></textarea>

        <div class="btnBox">
          <div class="sendBtn2" @click="send">取消</div>
          <div class="sendBtn" @click="send">发布</div>
        </div>
      </div>
    </div>
</template>

<script>
  export default{
    props:{
      commentId: {
        type: Object,
        default: {}
      }
    },
    data(){
      return{
        textArea: '',
      }
    },
    created(){

    },

    methods:{
      //发布按钮
      send(){
        if(this.textArea.length === 0)
        {
          return
        }
        let ooj  = {
          type: this.commentId.type,
          beCommentedId: this.commentId.beCommentedId,
          commentContent: this.textArea,
          parentId: ''
        }
        console.log(ooj);
        this.$store.dispatch('ADD_COMMENT', ooj).then((res)=>{
          console.log(res);
        });
      },
      //位置居下
      toBottom(){
        let area = this.$el.querySelector('#area');
        area.focus();
        this.$nextTick(()=>{
          let area2 = this.$refs.wrap;
          setTimeout(function () {

          window.scrollTo(0,area2.scrollHeight);
          },300);
        });


      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../../common/sass/factory";

    .btnBox{
      display: inline-block;
      width: 17.8%;
      vertical-align: middle;
      height: 100%;
    }
    .sendBtn2{
      color: grey;
      display: inline-block;
      text-align: center;
      width: 100%;
      height: 50%;
      line-height: px2vw(60);
      font-size: px2vw(28);
      border: 1px solid gray;
      border-radius: px2vw(10);
    }
    .sendBtn{
      margin-top: px2vw(5);
      color: $themeColor;
      display: inline-block;
      text-align: center;
      width: 100%;
      height: px2vw(60);
      line-height: px2vw(60);
      font-size: px2vw(28);
      border: 1px solid $themeColor;
      border-radius: px2vw(10);
    }
    .wrap{
      position: fixed;
      bottom: 0;
      top: 0;
      left: 0;
      right: 0;
      background-color: rgba(0,0,0,0.3);
      z-index: 9999;
    }
    #area{
      resize:none;
      height: px2vw(128) !important;
      border-radius: px2vw(6);
      outline: 0;
      border: 1px solid #a0b3d6;
      font-size: px2vw(26);
      line-height: 24px;
      padding:px2vw(2);
      word-wrap: break-word;
      overflow-x: hidden;
      overflow-y: auto;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
      vertical-align: middle;
      display: inline-block;
      margin-left: 2%;
      width: 78%;
    }
    .areaBox{
      padding-top: px2vw(14);
      padding-bottom: px2vw(14);
      background-color: white;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100vw;
      min-height: px2vw(150);
      height: auto;
    }
</style>

