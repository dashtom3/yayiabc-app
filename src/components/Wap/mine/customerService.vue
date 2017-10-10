<template>
	<div>
		<div class="logIn_header">
      <div class="header_box" @click="back">
        <img class="header_back" src="../../../images/logIn/back.png" alt="img">
      </div>
      <span class="logWithCode">指定客服代表</span>
      <mu-flat-button label="绑定" class="bind_btn" @click="bindHandler" v-if="showSearchInfo"/>
    </div>
    <div class="content-box">
    	<div v-if="saleData.isBindSale === '2'">
	    	<input type="text" placeholder="请输入客服代表手机号" v-model="willBindSale">
	    	<div v-show="showSearchInfo" class="showSearchInfoClass">
	        <span>真实姓名：{{findSaleName}}</span>
	      </div>
	      <div v-show="noSearchSale" class="showSearchInfoClass">
	        <span style="color:#cb1700;">非常抱歉，未找到该客服代表</span>
	      </div>
	    </div>
	    <div v-else class="binded">
	    	<p>
	        <span>客服代表手机号：</span>
	        <span>{{saleData.salePhone}}</span>
	      </p>
	      <p>
	        <span>真实姓名：</span>
	        <span>{{saleData.saleName}}</span>
	      </p>
	      <p class="colorRed">
	        <span>温馨提示：</span>
	        <span>若想重新绑定客服代表，可联系客服</span>
	      </p>
	      <p class="colorRed">
	        <span class="sale-phone">400-001-4980</span>
	      </p>
	    </div>
    </div>
	</div>
</template>
<script>
  import { tokenMethods } from '../../../vuex/util'
  import { Toast } from 'mint-ui'
	export default{
    name: 'customerService',
		data(){
			return {
				noSearchSale: false,
        showSearchInfo: false,
        willBindSale:null,
        findSaleName: '',
        saleData:{
          salePhone:'',
          saleName:'',
          isBindSale: ''
        }
			}
		},
		created(){
      this.queryHandler();
      this.mBack("back");
    },
    watch: {
      willBindSale: function(){
        if(this.willBindSale.length === 11){
          if(this.isPhone(this.willBindSale)){
            this.validateHandler()
          }else {
            this.showSearchInfo = false
            this.noSearchSale = true
          }
        }else if(!this.willBindSale.length){
          this.showSearchInfo = false
          this.noSearchSale = false
        }
      }
    },
		methods: {
			// 检查字符串是否为合法手机号码
      isPhone(str) {
        var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
      },
			//查询是否绑定
      queryHandler(){
        let params = {
          token: tokenMethods.getWapUser().phone
        }
        this.$store.dispatch('QUERY_BIND', params).then(res => {
          if(res.callStatus === 'SUCCEED'){
            this.saleData = res.data
            this.saleData.saleName = res.data.saleName || '未知'
          }
        })
      },
      //绑定客服代表
      bindHandler(){
        let params = {
          salePhone: this.willBindSale,
          userPhone: tokenMethods.getWapUser().phone,
          token: tokenMethods.getWapToken()
        }
        //验证手机号码
        if(!this.isPhone(this.willBindSale)){
          this.noSearchSale = true
          this.showSearchInfo = false
          return false
        }
        this.$store.dispatch('BIND_CUSTOMER', params).then(res => {
          if(res.data.callStatus === 'SUCCEED'){
            Toast('绑定成功')
            this.queryHandler()
            this.showSearchInfo = false
          }
        })
      },
      validateHandler(){
        let params = {
          salePhone: this.willBindSale,
          state: 2,
          token: tokenMethods.getWapToken()
        }
        this.$store.dispatch('QUERY_BIND', params).then(res => {
          if(res.callStatus === 'SUCCEED'){
            if(res.data){
              this.findSaleName = res.data.true_name || '未知'
              this.showSearchInfo = true
              this.noSearchSale = false
            }else{
              this.noSearchSale = true
              this.showSearchInfo = false
            }
          }
        })
      },
			back() {
        this.$router.go(-1)
      }
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "../../../common/sass/factory";
.logWithCode{
  width: px2vw(300);
}
.bind_btn{
  position: absolute;
  top: 50%;
  color: #fff;
  right: 0;
  transform: translateY(-50%);
}
.content-box{
  padding-top: px2vw(30);
	input{
		width: 100%;
		height: px2vw(88);
		font-size: px2vw(28);
		background: #f4f4f4;
		border: none;
		padding: 0 px2vw(30);
	}
	.showSearchInfoClass{
		color: $themeColor;
		margin-top: px2vw(30);
		padding-left: px2vw(30);
	}
	.binded{
		p{
			font-size: px2vw(28);
			color: $themeColor;
			height: px2vw(88);
			line-height: px2vw(88);
			padding: 0 px2vw(20);
		}
		.colorRed{
			color: #cb1700;
		}
		.sale-phone{
			padding-left: px2vw(152);
		}
	}
}
</style>
