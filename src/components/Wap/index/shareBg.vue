<template>
  <div class="shareBg">
    <img src="../../../images/index/shareBg.png" alt=""></div>
  </div>
</template>

<script type="text/ecmascript-6">
// import global from './../global/global.js'
  export default {
    data(){
      return{
      }
    },
    created(){

    },
    mounted(){

      // console.log(this.shareData,'ll')
    },
    methods:{
    }
  }
</script>



<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
.shareBg{
  z-index: 10000;
  position: fixed;
  top:0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  img{
    width: 100%;
  }
}

</style>
