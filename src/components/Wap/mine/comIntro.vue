<template>
  <div>
    <salesHeader headerText="公司简介"></salesHeader>
    <div class="wrap">
      <p>我们——yayiabc.com（牙医abc）—— 一个致力于构建牙科医疗服务系统的互联网平台；隶属于上海庄乾牙科科技有限公司。</p>
      <p>我们的愿望——汇聚资源/服务用户。</p>
      <p>我们希望通过对牙科行业之各方资源的汇聚/整合/流通/合作/增值/共享，实现对牙科医疗领域之从业人员与机构的专业服务，并由此兑现我们对用户的服务信条——“创造价值/共同成长”！</p>
      <p>我们将秉持“专注专业/恪守契约”的经营理念，通过牙科领域之专注的研究/专业的服务以及对契约精神的恪守，来确保我们对用户承诺的兑现。</p>
      <p>我们将秉承“己所不欲/勿施于人”的价值观，尊重人格/维护尊严，认真服务每一个客户，并进而与客户一起体验我们共同的成长经历……</p>
      <p>就让我们在平等/合作/共享/守约的基础上，共同成长吧！</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import salesHeader from '../../salesWap/salesHeader.vue'

  export default {
    components: {
      salesHeader
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .wrap{
    margin-top: px2vw(130);
    width: 100%;
    p{
      font-size: px2vw(26);
      color: #333;
      margin: 0 px2vw(35) px2vw(20);
    }
  }
</style>
