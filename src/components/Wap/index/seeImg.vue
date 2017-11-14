<template>
  <div class="module" @click="layOut">
    <img :src="url" alt="" id="images">
  </div>
</template>

<script type="text/ecmascript-6">
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
  }

  #images{
    position: fixed;
    margin: 0 0 0 0;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
