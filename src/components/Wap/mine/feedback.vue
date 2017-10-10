<template>
  <div class="box">
    <salesHeader headerText="意见反馈"></salesHeader>
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
        })
        .catch(err=>{
          console.log(err);
          Indicator.close();
        });
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

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
