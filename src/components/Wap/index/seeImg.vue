<template>
  <div class="module" @click="layOut">
    <img :src="url" alt="" id="images"><span></span>
    <!--<div style="width: 100%;height:1px;"></div>-->
  </div>
</template>

<script type="text/ecmascript-6">
import EXIF  from  "../../../common/exif/exif"

  export default {
    props:{
      url:{
        type:String
      }
    },
    methods:{
      layOut(){
        this.$emit('closeImgHolder',false)
        this.$destroy()
      }
     }
 }
</script>

<style lang="scss" rel="stylesheet/scss">
  body{
    overflow: hidden;
  }

</style>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .module{
    position: fixed;
    top: 0;
    left: 0;
    background-color: #000;
    width: 100vw;
    height: 100vh;
    overflow: scroll;
    z-index: 2000;
    text-align:center;
    vertical-align: middle;
  }

  #images{
    max-width: 100vw;
    vertical-align: middle;
  }
  span{
    display:inline-block;
    height: 50%;
  }

</style>
