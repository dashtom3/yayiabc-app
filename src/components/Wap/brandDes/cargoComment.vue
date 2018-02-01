<template>
  <div class="cargoComment">
    <div class="commentList" v-if="hasComment">
      <div v-for="comment in commentList" :key="comment.commentId" class="commentItem border-1px" v-if="comment.userPhone">
        <div class="firstLine">
          <p class="commentUser">{{comment.userPhone | filterUserName}}</p>
          <el-rate class="commentRate" v-model="comment.commentGrade" disabled text-color="#ff9900" text-template="{value}"></el-rate>
          <p class="commentDate" >{{comment.created}}</p>
        </div>
        <div class="clearfix"></div>
        <p class="commentDes">{{comment.commentContent}}</p>
        <p class="commentReply" v-if="comment.replyContent">
          <span class="replyWord">商家回复：</span>
          {{comment.replyContent}}
        </p>
      </div>
    </div>
    <!--无数据显示图片-->
    <div v-else class="comment_pic">
      <img src="../../../images/mine/comment_pic.png" alt="" v-if="isLoaded">
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import {Indicator} from 'mint-ui'
import Util from '../../../vuex/util'
export default {
  name: 'cargoComment',
  data () {
    return {
      commentStar: 5,
      commentList: [],
      hasComment: true,
      isLoaded:false,
    }
  },
  components: {
  },
  created: function() {
    var that = this
    Indicator.open()
    that.getNowGoodDetail()
  },
  methods: {
    // 获取商品详情
    getNowGoodDetail: function() {
      var that = this;
      var userToken = that.global.getToken();
      if(!userToken){
        userToken = "111";
      }
      var obj = {
        itemId: that.$route.params.goodId,
        token: userToken
      };
      that.$store.dispatch('GET_ITEM_DETAIL', obj).then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          Indicator.close()
          // 过滤出用户名不为空的数据
          that.commentList = res.data.data.commentList.filter((item) => {
            return item.userPhone != null
          });
          // that.commentList = res.data.data.commentList;
          for (var i = 0; i < that.commentList.length; i++) {
            that.commentList[i].created = Util.formatDate.format(new Date(that.commentList[i].created),'yyyy-MM-dd hh:mm:ss' )
          }
          // console.log(that.commentList,'09090')
          if (that.commentList.length == 0) {
            that.hasComment = false
          }
          that.isLoaded = true
        }
      })
    },
  },
  filters: {
    filterUserName (value) {
      if (value == null) {
        return value
      }
      let regtext = ''
      let Reg = null
      regtext = '(\\w{' + 3 + '})\\w{' + 5 + '}(\\w{' + 3 + '})';
      Reg = new RegExp(regtext);
      let replaceCount = "*****"
      return value.replace(Reg, "$1" + replaceCount + "$2");
    }
  }
}
</script>
<style>
.el-rate__icon {
  font-size: 2.93vw;
}
.el-icon-star-on {
  color: #3676B5 !important;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
.firstLine {
  margin-top: 4vw;
}
.commentList {
  width: 100vw;
  // margin-top: px2vw(164)
}
.commentItem{
  padding: px2vw(10) 0;
  margin-left: 5vw
}
.border-1px {
	position: relative;
	&:after{
		display: block;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		border-top: 1px solid #e5e5e5;
		content: '';
	}
}
.commentUser {
  float: left;
  font-size: 2.93vw;
  color: #999;
  // margin-left: 5vw;
  margin-right: 3vw;
}
.commentRate {
  float: left;
  color: #999;
}
.commentDate {
  float: right;
  font-size: 2.93vw;
  color: #999;
  margin-right: 5vw;
}
.commentDes {
  // margin-left: 5vw;
  margin-top: 4vw;
  // margin-bottom: 4.5vw;
  font-size: 3.73vw;
  color: #333;
}
.commentReply {
  width: 90vw;
  padding: 1vw 3vw;
  background-color: #F3F3F3;
  // margin: 0 auto;
  margin-top: px2vw(20);
  font-size: 3.73vw;
  color: #999;
}
.replyWord {
  color: #333;
}
  .comment_pic{
    width: px2vw(140);
    position: fixed;
    top:px2vw(512);
    left: px2vw(305);
  }
  .comment_pic>img{
    width: 100%;
  }
</style>
