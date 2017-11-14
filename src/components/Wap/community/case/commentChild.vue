<template>
  <div >

    <div class="container">
    <div  class="comments commentBox">
      <div class="headReadPicBox">
        <img src="../../../../images/case/caseOfIllness/4.jpg" alt="">
      </div>
      <div class="commentsRightBox">
        <div class="clearFix">
          <div class="nameWrap">
            <div class="userRightName">{{comment.userName}}</div>
            <div class="rightTime">{{comment.commentTime}}</div>
          </div>

          <div class="likeBox">
                  <span class="commentImgBox2">
                    <img src="../../../../images/case/caseOfIllness/comment.png" alt="">
                  </span>
            <span>回复</span>
            <span class="commentImgBoxs">
                    <img src="../../../../images/case/caseOfIllness/like.png" alt="">
                  </span>
            <span>{{comment.zan}}</span>
          </div>
        </div>

        <div class="commentContent">
          {{comment.commentContent}}
        </div>
      </div>
      <div style="clear: both"></div>
    </div>


      <div v-for="(item, index) in comment.subCommentList" class="comments commentBox2">
        <div class="headReadPicBox">
          <img src="../../../../images/case/caseOfIllness/4.jpg" alt="">
        </div>
        <div class="commentsRightBox">
          <div class="clearFix">
            <div class="nameWrap">
              <div class="userRightName">{{item.userName}}</div>
              <div class="rightTime">{{item.commentTime}}</div>
            </div>

            <div class="likeBox">
                  <span class="commentImgBox2">
                    <img src="../../../../images/case/caseOfIllness/comment.png" alt="">
                  </span>
              <span>回复</span>
              <span class="commentImgBoxs">
                    <img src="../../../../images/case/caseOfIllness/like.png" alt="">
                  </span>
              <span>{{item.zan}}</span>
            </div>
          </div>

          <div class="commentContent">
           回复&nbsp;<span class="fontColor">{{comment.userName}}</span>:&nbsp;{{item.commentContent}}
          </div>
        </div>
        <div style="clear: both"></div>
      </div>


      <div @click="sss" class="e ndFonts">-End-</div>

    </div>


  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  import { tokenMethods } from '../../../../vuex/util'
  export default{
    data (){
      return {
        textArea: '',
      }
    },
    props:{
      comment:{
        type: Object,
        default: {}
      }
    },
    methods:{

      back(){

      },
      sss(){
        console.log(this.comment);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../../../common/sass/factory";

</style>

