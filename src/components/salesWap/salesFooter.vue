<template>
  <div class="salesFooter">
    <mu-paper class="big_box">
      <mu-bottom-nav :value="bottomVal" @change="handleChange">
        <mu-bottom-nav-item value="achievement" title="业绩" icon="sort"/>
        <mu-bottom-nav-item value="range" title="排行榜" icon="equalizer"/>
        <mu-bottom-nav-item value="customer" title="客户" icon="supervisor_account"/>
        <mu-bottom-nav-item value="personal" title="个人中心" icon="person"/>
      </mu-bottom-nav>
    </mu-paper>
    <!--<mt-tabbar v-model="bottomNav">-->
      <!--<mt-tab-item id="achievement">-->
        <!--<img slot="icon" src="../../images/salesWap/Footer/achievement.png">-->
        <!--业绩-->
      <!--</mt-tab-item>-->
      <!--<mt-tab-item id="range">-->
        <!--<img slot="icon" src="../../images/salesWap/Footer/range.png">-->
        <!--排行榜-->
      <!--</mt-tab-item>-->
      <!--<mt-tab-item id="customer">-->
        <!--<img slot="icon" src="../../images/salesWap/Footer/customer.png">-->
        <!--客户-->
      <!--</mt-tab-item>-->
      <!--<mt-tab-item id="personal">-->
        <!--<img slot="icon" src="../../images/salesWap/Footer/personal.png">-->
        <!--个人中心-->
      <!--</mt-tab-item>-->
    <!--</mt-tabbar>-->
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      data(){
        return{
          bottomVal:''

        }
      },
      props:['bottomNav'],
      created(){
        this.bottomVal=this.bottomNav;
      },
      methods:{
        handleChange(val){
          console.log(val);
          this.bottomVal=val;
          if(val==='achievement'){
            this.$router.push({path: '/salesIndex'});
          }else if(val==='range'){
            this.$router.push({path: '/salesRange'});
          }else if(val==='customer'){
            this.$router.push({path: '/salesCustomer'});
          }else if(val==='personal'){
            this.$router.push({path: '/salePersonal'});
          }

        }
      }
    }
</script>

<style  lang="scss" rel="stylesheet/scss">
    @import "../../common/sass/factory";
  .salesFooter{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }
 .salesFooter .mu-bottom-item-active .mu-bottom-item-icon{
   color: #3676B5;
 }
 .mu-bottom-item-active .mu-bottom-item-text{
  color: #3676B5;
 }
</style>
