<template>
  <div>
    <sales-header headerText="创客管理协议" class="headers"></sales-header>
    <div class="ckMPContainer">
      <p class="title">甲方：上海庄乾牙科科技有限公司</p>
      <p class="title">乙方：注册用户</p>
      <div class="container">
        <p class="subTitle">1.总则</p>
        <div class="text">
          <p>第1条 本协议之甲方为yayiabc.com平台（以下称平台）的所有者与运营管理者，对于在平台上所发布的一切协议/规则/活动拥有最终解释权，并因此承担一切法律责任与后果。</p>
          <p>第2条 本协议之乙方为平台的注册用户，所谓“创客”专指在平台创客系统注册的/有义齿工厂销售背景的/自愿与平台进行销售/客服合作的注册用户：</p>
          <p>（1）注册前，必须认真阅读本协议条款；</p>
          <p>（2）注册行为完成，则表示乙方同意并自愿接受本协议条款，获得本协议条款所规定的权利/义务/责任，承担因违约带来的责任/后果。</p>
          <p>第3条 甲方有权根据平台之经营管理的需要与经营环境的变化，适时对本协议条款进行完善与修改，同时：</p>
          <p>（1）甲方对于协议条款的修改，必须先行在平台公示一个月/然后才能执行；</p>
          <p>（2）甲方对于协议条款的修改，以不损害乙方的既有利益为前提。</p>
        </div>
        <p class="subTitle">2. 注册规则</p>
        <div class="text">
          <p>第4条 乙方注册时必须完整/真实地填写注册内容，并承担因填写虚假信息所带来的一切法律后果与责任；乙方注册审核的周期为1个工作日。</p>
        </div>
        <p class="subTitle">3. 保密规则</p>
        <div class="text">
          <p>第5条 甲方对于乙方的注册信息承担保密义务与责任：</p>
          <p>(1) 甲方承诺：甲方不得向任何第三方透露乙方注册信息；未经乙方授权，甲方亦不得向任何商业合作方链接乙方注册信息；</p>
          <p>(2) 由于甲方的数据存储于第三方云端服务器，对于因第三方云端服务器安全原因导致的乙方注册信息泄露，甲方免担责任；但甲方有义务在乙方授权的前提下代表乙方向第三方云端服务器提供商进行交涉与索赔；</p>
          <p>(3) 因政府管理部门强制获取乙方注册信息的行为，导致乙方注册信息的泄露，甲方免担责任。</p>
          <p>(4) 因甲方原因，导致乙方的注册信息泄露给第三方，由甲方承担责任，并按国家有关法律规定进行处理。</p>
          <p>第6条 乙方对于在甲方获得的一切商业信息，必须承担保密义务与责任：</p>
          <p>(1) 该一切商业信息包括但不限于：甲方对乙方的培训内容与方法、甲方的销售计划与推广方式、乙方绑定的客户信息与采购数据、乙方的销售业绩与收入数据、甲方的利益分享方式与数据；</p>
          <p>(2) 对于乙方向任何第三方泄露甲方商业信息的行为，甲方保留采取一切责任追究与索赔的权力，包括关闭其注册账户。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import salesHeader from './salesHeader.vue'

  export default {
    name: 'ckMP',
    components: {
      salesHeader,
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/sass/factory";

  .ckMPContainer {
    margin: px2vw(88) 0 px2vw(30);
    padding: 0 px2vw(20);
  }

  .title {
    padding-top: px2vw(30);
    font-size: px2vw(30);
    color: #333;
  }

  .subTitle {
    padding-top: px2vw(30);
    font-size: px2vw(28);
    color: #333;
  }

  .text {
    font-size: px2vw(24);
    color: #666;
  }
</style>
