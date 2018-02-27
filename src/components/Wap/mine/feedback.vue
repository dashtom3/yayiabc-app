<template>
  <div class="box">
    <div class="top">
      <div class="back" @click="goBack">
         <img src="../../../images/logIn/back.png" alt="返回">
      </div>
      <span>意见反馈</span>
    </div>
    <textarea type="text" placeholder="请留下您的宝贵意见和建议，我们将努力改进" style="resize:none" v-model="comments"></textarea>
    <input type="text" placeholder="请留下手机号码方便我们联系您" v-model="tel">
    <button @click="submit" :class="{act:comments.length > 0 && text1 == true}">提交</button>
  </div>
</template>

<script type="text/ecmascript-6">
import salesHeader from '../../salesWap/salesHeader.vue'
import {Toast, Indicator} from 'mint-ui'
import {APP_FEEDBACK} from '../../../vuex/types'

export default {
  data(){
    return{
      comments:'',
      tel:'',
      text1:false
    }
  },
  components:{
    salesHeader
  },
  mounted(){
    var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    this.$watch(
      function () {
        return mb.test(this.tel)
      },
      function () {
        if(mb.test(this.tel)){
          this.text1 = true
          console.log(this.text1)
        }else {
          this.text1 = false
          console.log(this.text1)
        }
      }
    )
  },
  created(){
    this.mBack("goBack")
  },
  methods:{
    submit(){
      if(this.comments.length <= 0){
        Toast({message: '请填写内容', duration: 1500});
        return
      }
      if(!(this.tel && this.text1)){
        Toast({message: '请输入正确的手机号', duration: 1500});
        return
      }
      Indicator.open();
      console.log('a',this.comments.length);
      let params ={};
      params.message = this.comments;
      params.phone = this.tel;
      this.$store.dispatch(APP_FEEDBACK,params)
        .then(res=>{
          console.log(res);
          Indicator.close();
          Toast({message: '提交成功！', duration: 1500});
          this.comments = '';
          this.tel = '';
          Indicator.close();
        })
        .catch(err=>{
          console.log(err);
          Indicator.close();
        });
    },
    goBack(){
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .top{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: px2vw(88);
    line-height: px2vw(88);
    text-align: center;
    font-size: 0;
    color: #fff;
    background: rgb(54,118,182);
    .back{
      position: absolute;
      top: px2vw(29);
      left: px2vw(3);
      width: px2vw(40);
      height: px2vw(40);
      font-size: 0;
      img{
        vertical-align: top;
        width: px2vw(18);
        height: px2vw(29);
      }
    }
    span{
      font-size: px2vw(36)
    }
  }
  .box{
    height: 100vh;
    background-color: #f4f4f4;
    textarea{
      width: px2vw(710);
      margin: px2vw(108) px2vw(20) px2vw(20);
      height: px2vw(300);
      border: none;
      outline: none;
      background-color: #fff;
      padding: px2vw(25);
      vertical-align: top;
    }
    textarea::placeholder{
      color: #999;
    }
    input{
      width: px2vw(710);
      height: px2vw(88);
      margin: 0 px2vw(20) px2vw(40);
      border: none;
      outline: none;
      background-color: #fff;
      padding-left: px2vw(25);
    }
    input::placeholder{
      color: #999;
    }
    button{
      width: px2vw(400);
      height: px2vw(88);
      margin: 0 px2vw(175);
      background-color: #dadada;
      color: #b5b5b5;
    }
    .act{
      color: #fff;
      background-color: $themeColor;
    }
  }
</style>
