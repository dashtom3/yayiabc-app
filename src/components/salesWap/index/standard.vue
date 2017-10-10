<template>
  <div>
    <sales-header headerText="创客收益标准" class="headers"></sales-header>
    <div class="ckMPContainer">
      <p class="text">上海庄乾牙科科技有限公司（以下称本公司）</p>
      <p class="text">yayiabc.com（以下称本平台）</p>
      <div class="container">
        <p class="subTitle">创客销售收益标准（2017年7-8月）</p>
        <div class="text">
          <p>第1条 本标准有效期：自颁布之日起至2017年8月31日止。</p>
          <p>第2条 本标准之产品分为牙科耗材类产品与工具设备类产品两大类别，在同一次销售行为中，该两大类产品分别计算/无合并计算关系。</p>
          <p>第3条 特别规定：本标准之销售额等于7至8月的销售额之和；此后，所有销售额均按月计算。</p>
          <p>第4条 本期创客销售之耗材类产品的收益计算标准如下：</p>
          <ul>
          	<li>(1) 当期销售额未达1000元，按其实际销售额乘以5%计算收益；</li>
          	<li>(2) 当期销售额满1000元未达2000元，按其实际销售额乘以8%计算收益；</li>
          	<li>(3) 当期销售额满2000元未达3000元，按其实际销售额乘以12%计算收益；</li>
          	<li>(4) 当期销售额达到3000元及其以上，按其实际销售额乘以16%计算收益。</li>
          </ul>
          <p>第5条 本期创客之销售工具设备类产品的收益计算标准如下：</p>
          <ul>
          	<li>(1) 当期销售额未达10000元，按其实际销售额乘以8%计算收益；</li>
          	<li>(2) 当期销售额达到10000元及其以上，按其实际销售额乘以15%计算收益。</li>
          </ul>
          <p>第6条 本期创客销售之排名奖励标准如下：</p>
          <ul>
          	<li>(1) 当期创客销售第一名，另行奖励800元；</li>
          	<li>(2) 当期创客销售第二名，另行奖励500元；</li>
          	<li>(3) 当期创客销售第三名，另行奖励300元。</li>
          </ul>
          <p>第7条 本期创客特别奖励条款：</p>
          <ul>
          	<li>(1) 前30位创客注册会员，获赠1000股上海庄翼投资管理中心（以下称庄翼）股权；</li>
          	<li>(2) 第31-100位创客注册会员，获赠500股庄翼股权；</li>
          	<li>(3) 以《创客管理协议》第9条为确认标准，创客每绑定一个客户，获赠80股庄翼股权；</li>
          	<li>(4) 以《创客管理协议》第9条为确认标准，当期绑定客户达到10个，获赠800股庄翼股权；</li>
          	<li>(5) 以《创客管理协议》第9条为确认标准，当期绑定客户达到20个，获赠1500股庄翼股权；</li>
          	<li>(6) 以《创客管理协议》第9条为确认标准，当期绑定客户达到30个，获赠3000股庄翼股权；</li>
          	<li>(7) 当期销售总额达到一万元，获赠1000股庄翼股权；该销售总额等于耗材类产品与工具设备类产品销售之和（以下同）；</li>
          	<li>(8) 当期销售总额达到两万元，获赠2000股庄翼股权。</li>
          </ul>
          <p>第8条 根据《创客管理协议》第15条第（4）款之约定，当期创客销售收益的结算日期为2017年9月18日。</p>
					<p>第9条 本公司拥有对本标准的最终解释权。</p>
					<p>2017年7月4日</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import salesHeader from '../../salesWap/salesHeader.vue'

  export default {
    name: 'standard',
    components: {
      salesHeader,
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .ckMPContainer {
    margin: px2vw(88) 0 px2vw(30);
    padding: px2vw(10) px2vw(20) 0;
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
